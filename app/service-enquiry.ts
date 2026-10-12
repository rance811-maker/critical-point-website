import type { Lang } from "./servicesLanguage";

export const serviceTopicIds = [
  "enterprise", "career", "finance", "identity", "ai-usage", "product", "resume",
] as const;
export type ServiceTopic = (typeof serviceTopicIds)[number];

export const serviceTopicLabels: Record<Lang, Record<ServiceTopic, string>> = {
  "zh-Hans": {
    enterprise: "企业 AI 诊断及方案", career: "职场与产品职业发展",
    finance: "理财实践交流", identity: "身份规划相关", "ai-usage": "怎么用 AI",
    product: "怎么做产品", resume: "申请了解完整经历 / 简历",
  },
  "zh-Hant": {
    enterprise: "企業 AI 診斷及方案", career: "職場與產品職業發展",
    finance: "理財實踐交流", identity: "身份規劃相關", "ai-usage": "怎麼用 AI",
    product: "怎麼做產品", resume: "申請了解完整經歷 / 簡歷",
  },
  en: {
    enterprise: "Enterprise AI assessment & solutions", career: "Career & product leadership",
    finance: "Personal finance experience",
    identity: "Residency planning", "ai-usage": "How to use AI", product: "How to build products",
    resume: "Request my background / résumé",
  },
};

export const enterpriseStageLabels: Record<Lang, readonly string[]> = {
  "zh-Hans": ["尚在判断", "已有流程", "已有原型", "准备落地"],
  "zh-Hant": ["尚在判斷", "已有流程", "已有原型", "準備落地"],
  en: ["Exploring", "Existing workflow", "Working prototype", "Ready to implement"],
};

export const enquiryFormName = "critical-point-project-brief";
export const enquiryEmailSubject = "Critical Point | New project brief";
export const enquiryNotificationEndpoint = "https://meetcriticalpoint.com/";
export const enquiryMailbox = "rance811@gmail.com";

export function isServiceTopic(value: string): value is ServiceTopic {
  return (serviceTopicIds as readonly string[]).includes(value);
}

export function resolveServiceTopic(value: string | null): ServiceTopic | undefined {
  if (value === "talent") return "identity";
  return value && isServiceTopic(value) ? value : undefined;
}

export interface ServiceEnquiryInput {
  topic: string;
  goal: string;
  stage: string;
  contact: string;
  honeypot: string;
}

export type EnquiryValidationError = "topic" | "goal" | "contact" | "stage";
type ValidInput = ServiceEnquiryInput & { topic: ServiceTopic };
export type EnquiryValidation =
  | { status: "blocked" }
  | { status: "validation"; error: EnquiryValidationError }
  | { status: "valid"; input: ValidInput };

export function validateServiceEnquiry(input: ServiceEnquiryInput): EnquiryValidation {
  if (input.honeypot.length > 0) return { status: "blocked" };
  if (!isServiceTopic(input.topic)) return { status: "validation", error: "topic" };
  const goal = input.goal.trim();
  const contact = input.contact.trim();
  if (goal.length < 10 || goal.length > 1600) return { status: "validation", error: "goal" };
  if (contact.length < 3 || contact.length > 500) return { status: "validation", error: "contact" };
  if (input.topic === "enterprise" && !["0", "1", "2", "3"].includes(input.stage)) {
    return { status: "validation", error: "stage" };
  }
  return { status: "valid", input: { ...input, topic: input.topic, goal, contact } };
}

export interface EnquiryFields {
  problem: string;
  stage: string;
  contact: string;
  locale: Lang;
  source_url: string;
}

export function serializeServiceEnquiry(input: ValidInput, lang: Lang, sourceUrl: string): EnquiryFields {
  const topic = serviceTopicLabels[lang][input.topic];
  const topicHeading = lang === "en" ? "Service of interest" : lang === "zh-Hant" ? "交流方向" : "交流方向";
  return {
    problem: `${topicHeading}：${topic}\n\n${input.goal}`,
    // The existing schema accepts 2–120 characters of text. For personal
    // enquiries, record the topic the visitor chose, without inventing a stage.
    stage: input.topic === "enterprise" ? enterpriseStageLabels[lang][Number(input.stage)] : topic,
    contact: input.contact,
    locale: lang,
    source_url: sourceUrl.slice(0, 1000),
  };
}

export function serviceEnquiryMailto(fields: EnquiryFields): string {
  const english = fields.locale === "en";
  const traditional = fields.locale === "zh-Hant";
  const subject = english ? "Critical Point | Service enquiry" : traditional ? "臨界創新｜服務需求" : "临界创新｜服务需求";
  const stageLabel = english ? "Stage / topic" : traditional ? "階段 / 方向" : "阶段 / 方向";
  const contactLabel = english ? "Preferred contact details" : traditional ? "聯絡方式" : "联系方式";
  const sourceLabel = english ? "Source page" : traditional ? "來源頁面" : "来源页面";
  const body = `${fields.problem}\n\n${stageLabel}：${fields.stage}\n\n${contactLabel}：${fields.contact}\n\n${sourceLabel}：${fields.source_url}`;
  return `mailto:${enquiryMailbox}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export type EnquirySubmissionResult =
  | Exclude<EnquiryValidation, { status: "valid" }>
  | { status: "email" | "error"; fields: EnquiryFields; mailto: string }
  | { status: "stored"; fields: EnquiryFields };

interface SubmissionOptions {
  input: ServiceEnquiryInput;
  lang: Lang;
  sourceUrl: string;
  supabaseUrl?: string;
  supabaseAnonKey?: string;
  fetcher?: typeof fetch;
}

export async function submitServiceEnquiry({ input, lang, sourceUrl, supabaseUrl, supabaseAnonKey, fetcher = fetch }: SubmissionOptions): Promise<EnquirySubmissionResult> {
  const validation = validateServiceEnquiry(input);
  if (validation.status !== "valid") return validation;
  const fields = serializeServiceEnquiry(validation.input, lang, sourceUrl);
  const mailto = serviceEnquiryMailto(fields);
  if (!supabaseUrl || !supabaseAnonKey) return { status: "email", fields, mailto };

  async function notify(storageStatus: "stored" | "failed") {
    // Netlify's cross-origin response is opaque. This request is an attempted
    // notification, never evidence that an email arrived in the inbox.
    try {
      await fetcher(enquiryNotificationEndpoint, {
        method: "POST", mode: "no-cors", keepalive: true,
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          "form-name": enquiryFormName, "bot-field": "",
          subject: storageStatus === "stored" ? enquiryEmailSubject : `[存储失败 / NOT SAVED] ${enquiryEmailSubject}`,
          storage_status: storageStatus,
          ...fields,
        }).toString(),
      });
    } catch {
      // Keep storage success independent from the secondary notification.
    }
  }

  try {
    const response = await fetcher(`${supabaseUrl.replace(/\/$/, "")}/rest/v1/critical_point_project_briefs`, {
      method: "POST",
      headers: {
        apikey: supabaseAnonKey, Authorization: `Bearer ${supabaseAnonKey}`,
        "Content-Type": "application/json", Prefer: "return=minimal",
      },
      body: JSON.stringify(fields),
    });
    if (!response.ok) throw new Error("Submission failed");
    void notify("stored");
    return { status: "stored", fields };
  } catch {
    void notify("failed");
    return { status: "error", fields, mailto };
  }
}
