"use client";

import { useEffect, useState } from "react";
import type { FormEvent } from "react";

type Lang = "en" | "zh-Hans" | "zh-Hant";

const copy = {
  zh: {
    nav: [
      ["能力", "#capabilities"],
      ["方法", "#approach"],
      ["实践", "#work"],
      ["专家网络", "#network"],
      ["创始人", "#founder"],
    ],
    navCta: "讨论一个场景",
    heroEyebrow: "AI 产品策略与构建工作室",
    heroTitleA: "AI 真正难的，",
    heroTitleB: "不是能不能做，",
    heroTitleC: "而是做什么、不做什么，以及如何验证。",
    heroBrand: "临界创新",
    heroBody:
      "将复杂经营问题转化为明确的 AI 机会、可验证的产品方案，以及能够持续运行和演化的智能工作系统。",
    heroPrimary: "讨论一个场景",
    heroSecondary: "了解我们的方法",
    proof: [
      ["17 年", "阿里巴巴产品与数字化经验"],
      ["P8+ 网络", "大厂产品与技术专家"],
      ["跨区域", "香港 · 内地 · 新加坡"],
    ],
    systemLabel: "决策协议 / 01",
    systemStatus: "运行中",
    systemTitle: "从判断到系统",
    systemRows: [
      ["01", "问题", "什么真正值得解决？"],
      ["02", "机会", "AI 应该进入哪里？"],
      ["03", "产品", "最小验证是什么？"],
      ["04", "系统", "如何持续运行？"],
    ],
    systemFoot: "判断 → 验证 → 系统",
    capabilitiesKicker: "能力 / 01",
    capabilitiesTitle: "不出售工具清单。\n提供关键产品能力。",
    capabilitiesIntro:
      "把商业、用户、技术与组织约束放在同一张图上，找到 AI 真正应该介入的位置。",
    capabilities: [
      [
        "01",
        "AI 产品策略与设计",
        "从模糊需求到清晰决策：问题定义、机会排序、产品架构、MVP 与验证路线。",
        "STRATEGY",
      ],
      [
        "02",
        "智能代理与工作流",
        "围绕真实任务设计 Agent、知识、工具和人的协作方式，而不是堆叠功能。",
        "SYSTEM",
      ],
      [
        "03",
        "定制开发与部署",
        "把已验证方向做成可用系统，覆盖原型、集成、私有化部署与持续技术支持。",
        "BUILD",
      ],
      [
        "04",
        "培训与组织采用",
        "让 AI 进入日常工作：场景化培训、操作规范、工作流重构与使用优化。",
        "ADOPTION",
      ],
    ],
    approachKicker: "方法 / 02",
    approachTitle: "先把问题系统化，\n再把系统智能化。",
    approachBody:
      "技术能力变化很快，关键产品判断不会。我们从业务结果出发，用最小代价验证最重要的不确定性，再决定是否扩大投入。",
    approachSteps: [
      ["01", "诊断", "看清目标、约束与真正问题"],
      ["02", "定义", "把机会转化为产品决策"],
      ["03", "验证", "用最小闭环证明或证伪"],
      ["04", "构建", "形成可运行的产品系统"],
      ["05", "演化", "从真实使用中持续优化"],
    ],
    workKicker: "精选实践 / 03",
    workTitle: "三种场景，\n一条能力主线。",
    workIntro:
      "客户标签保留真实地域与行业信息，仅对可识别名称做必要脱敏。每项内容均来自实际签约与交付。",
    cases: [
      {
        no: "01",
        client: "江西 ×× 医药公司",
        type: "AI 助理 / 私有化",
        title: "管理层 AI 助理",
        body: "为企业管理层梳理核心需求，完成私有化 AI 助理的产品定义、定制开发与部署支持。",
        tags: ["需求分析", "定制开发", "部署支持"],
      },
      {
        no: "02",
        client: "杭州 ×× 量化科技公司",
        type: "产品设计 / 决策支持",
        title: "AI 智能预警与复盘模块",
        body: "围绕量化软件的智能预警解读与 AI 复盘场景，完成产品架构、交互逻辑与技术设计文档。",
        tags: ["产品架构", "交互设计", "技术方案"],
      },
      {
        no: "03",
        client: "武汉 ×× 数据智能科技公司",
        type: "组织采用 / 培训",
        title: "企业智能代理工作流培训",
        body: "以实际工作任务为入口，帮助团队理解并应用智能代理、自动化与多 Agent 协作方式。",
        tags: ["场景培训", "工作流实操", "采用支持"],
      },
    ],
    founderKicker: "创始人 / 04",
    founderRole: "创始人 · AI 产品战略与构建",
    founderTitle: "鄒燃 / Ran Zou",
    founderIntro:
      "17 年阿里巴巴互联网产品与数字化经验，长期从事产品规划、跨团队项目管理与商业化落地。",
    founderQuote:
      "我长期做的，是在商业、用户、技术与组织约束之间找到关键问题；判断先做什么、暂时不做什么，再把这种判断变成可运行、可验证、可持续演化的产品系统。",
    founderPillars: ["定义问题", "判断优先级", "做关键取舍", "推动真实落地"],
    teamKicker: "专家网络 / 04",
    teamTitle: "资深团队，按问题组织。",
    teamBody:
      "每个项目由创始人直接负责，并根据场景组织多位大厂 P8 级产品、技术与 AI 应用专家参与方案评审、架构设计和关键交付。客户面对的是一套完整能力，而不是单一顾问。",
    teamStats: [
      ["FOUNDER-LED", "创始人直接负责"],
      ["P8+ NETWORK", "资深产品与技术专家"],
      ["PROJECT-BASED", "按场景灵活组队"],
    ],
    teamRoles: [
      ["产品判断", "AI Product Strategy"],
      ["方案架构", "AI & Solution Architecture"],
      ["应用工程", "Application & Integration"],
      ["采用交付", "Training & Delivery"],
    ],
    regionKicker: "区域与公司 / 06",
    regionTitle: "立足香港，连接区域市场与产品能力。",
    regionBody:
      "临界创新以香港为业务承接、产品管理与跨境商业化主体，连接内地的客户与技术协作资源，并持续探索新加坡及东南亚市场。",
    locations: [
      ["香港", "业务、产品管理与跨境商业化"],
      ["内地", "客户场景、市场验证与技术协作"],
      ["新加坡", "东南亚需求、伙伴与区域拓展"],
    ],
    contactKicker: "开始对话 / 07",
    contactTitle: "不必先从工具开始。",
    contactBody: "告诉我们：你的业务里，哪一个重要问题还没有被真正解决？",
    contactCta: "发送邮件",
    contactNote: "通常在 2 个工作日内回复",
    briefKicker: "项目简报 / 3 分钟",
    briefTitle: "先说问题，不必先写方案。",
    briefProblem: "你最希望改善哪一段工作？",
    briefProblemPlaceholder: "例如：团队每周需要人工整理多份数据，仍然难以及时发现风险……",
    briefStage: "目前处于哪个阶段？",
    briefStages: ["尚在判断", "已有流程", "已有原型", "准备落地"],
    briefContact: "如何联系你？",
    briefContactPlaceholder: "邮箱、微信或 WhatsApp",
    briefSubmit: "提交一个场景",
    briefSending: "正在提交……",
    briefSuccess: "已收到，我们会尽快联系你。",
    briefError: "暂时未能提交，请直接发送邮件。",
    briefNote: "提交内容只用于项目沟通，不会公开显示。",
    briefSubject: "临界创新｜项目场景简报",
    footerLegal: "临界创新互联网技术服务有限公司",
    footerTag: "AI 产品与智能工作流落地伙伴",
  },
  en: {
    nav: [
      ["Capabilities", "#capabilities"],
      ["Approach", "#approach"],
      ["Work", "#work"],
      ["Network", "#network"],
      ["Founder", "#founder"],
    ],
    navCta: "Explore a project",
    heroEyebrow: "AI PRODUCT STRATEGY & BUILD STUDIO",
    heroTitleA: "The hard part of AI",
    heroTitleB: "is no longer what can be built.",
    heroTitleC: "It is what to build, what not to build, and how to prove it.",
    heroBrand: "CRITICAL POINT ",
    heroBody:
      "turns complex business problems into focused AI opportunities, testable product directions, and intelligent systems built to run and evolve.",
    heroPrimary: "Explore a project",
    heroSecondary: "Our approach",
    proof: [
      ["17 years", "of product and digital work at Alibaba"],
      ["P8+ network", "senior product and engineering experts"],
      ["Cross-market", "Hong Kong · China · Singapore"],
    ],
    systemLabel: "DECISION PROTOCOL / 01",
    systemStatus: "ACTIVE",
    systemTitle: "From judgment to system",
    systemRows: [
      ["01", "Problem", "What is worth solving?"],
      ["02", "Opportunity", "Where should AI enter?"],
      ["03", "Product", "What is the minimum proof?"],
      ["04", "System", "How will it keep working?"],
    ],
    systemFoot: "JUDGMENT → PROOF → SYSTEM",
    capabilitiesKicker: "CAPABILITIES / 01",
    capabilitiesTitle: "No catalogue of tools.\nThe product capability that matters.",
    capabilitiesIntro:
      "We bring business, user, technology, and organizational constraints into one frame to find where AI truly belongs.",
    capabilities: [
      [
        "01",
        "AI Product Strategy & Design",
        "From ambiguity to decision: problem definition, opportunity ranking, product architecture, MVP, and validation roadmap.",
        "STRATEGY",
      ],
      [
        "02",
        "AI Agents & Intelligent Workflows",
        "Designing how agents, knowledge, tools, and people work around real tasks—not a pile of features.",
        "SYSTEM",
      ],
      [
        "03",
        "Custom Development & Deployment",
        "Turning validated directions into usable systems, from prototypes and integration to private deployment and support.",
        "BUILD",
      ],
      [
        "04",
        "Training & Organizational Adoption",
        "Bringing AI into daily work through scenario-based training, operating standards, workflow redesign, and optimization.",
        "ADOPTION",
      ],
    ],
    approachKicker: "APPROACH / 02",
    approachTitle: "Systemize the problem.\nThen make the system intelligent.",
    approachBody:
      "Technology changes quickly. Sound product judgment does not. We begin with the business outcome, test the most important uncertainty at minimum cost, and expand only when the evidence supports it.",
    approachSteps: [
      ["01", "Diagnose", "Clarify the outcome, constraints, and real problem"],
      ["02", "Define", "Turn opportunities into product decisions"],
      ["03", "Validate", "Prove or disprove with the smallest loop"],
      ["04", "Build", "Create a product system that works"],
      ["05", "Evolve", "Improve continuously through real use"],
    ],
    workKicker: "SELECTED WORK / 03",
    workTitle: "Three contexts.\nOne coherent capability.",
    workIntro:
      "Client labels retain the real location and industry; only identifying words are masked. Every entry reflects contracted, delivered work.",
    cases: [
      {
        no: "01",
        client: "JIANGXI ×× PHARMA COMPANY",
        type: "AI ASSISTANT / PRIVATE DEPLOYMENT",
        title: "Executive AI Assistant",
        body: "Defined the needs of an enterprise leadership team and supported product definition, custom development, and private deployment.",
        tags: ["Discovery", "Custom build", "Deployment"],
      },
      {
        no: "02",
        client: "HANGZHOU ×× QUANT TECHNOLOGY",
        type: "PRODUCT DESIGN / DECISION SUPPORT",
        title: "AI Alert & Review Modules",
        body: "Designed the product architecture, interaction logic, and technical specifications for intelligent alert interpretation and AI-assisted review modules.",
        tags: ["Architecture", "Interaction", "Technical design"],
      },
      {
        no: "03",
        client: "WUHAN ×× DATA INTELLIGENCE",
        type: "ADOPTION / TRAINING",
        title: "Enterprise Agent Workflow Training",
        body: "Helped teams understand and apply AI agents, automation, and multi-agent collaboration through real operating scenarios.",
        tags: ["Training", "Workflow practice", "Adoption"],
      },
    ],
    founderKicker: "FOUNDER / 04",
    founderRole: "FOUNDER · AI PRODUCT STRATEGY & BUILD",
    founderTitle: "Ran Zou / 鄒燃",
    founderIntro:
      "17 years at Alibaba across internet products and digital transformation, with deep experience in product planning, cross-functional delivery, and commercialization.",
    founderQuote:
      "My work is about finding the decisive problem across business, user, technology, and organizational constraints—deciding what to build now, what to leave out, and turning that judgment into a system that can run, be tested, and evolve.",
    founderPillars: [
      "Define the problem",
      "Set priorities",
      "Make critical trade-offs",
      "Drive real-world delivery",
    ],
    teamKicker: "EXPERT NETWORK / 04",
    teamTitle: "Senior capability, assembled around the problem.",
    teamBody:
      "Every engagement is founder-led and supported, as needed, by a network of P8-level product, engineering, and AI application leaders from major technology companies. Clients engage a complete delivery capability—not a lone consultant.",
    teamStats: [
      ["FOUNDER-LED", "Direct senior ownership"],
      ["P8+ NETWORK", "Senior product & engineering experts"],
      ["PROJECT-BASED", "The right team for each context"],
    ],
    teamRoles: [
      ["Product judgment", "AI Product Strategy"],
      ["Solution design", "AI & Solution Architecture"],
      ["Engineering", "Application & Integration"],
      ["Adoption", "Training & Delivery"],
    ],
    regionKicker: "REGION & COMPANY / 06",
    regionTitle: "Based in Hong Kong. Connected across the region.",
    regionBody:
      "CRITICAL POINT uses Hong Kong as its center for client engagement, product management, and cross-border commercialization—connecting customer and technical resources in mainland China with emerging opportunities in Singapore and Southeast Asia.",
    locations: [
      ["Hong Kong", "Business, product management, and commercialization"],
      ["Mainland China", "Client contexts, market validation, and technical collaboration"],
      ["Singapore", "Southeast Asian demand, partners, and regional growth"],
    ],
    contactKicker: "START A CONVERSATION / 07",
    contactTitle: "Do not start with the tool.",
    contactBody: "Tell us: what important problem in your business has not truly been solved?",
    contactCta: "Send an email",
    contactNote: "We usually respond within two business days",
    briefKicker: "PROJECT BRIEF / 3 MIN",
    briefTitle: "Describe the problem before the solution.",
    briefProblem: "What part of the work needs to improve?",
    briefProblemPlaceholder: "For example: the team consolidates several data sources every week, but still identifies risk too late…",
    briefStage: "Where are you now?",
    briefStages: ["Exploring", "Existing workflow", "Working prototype", "Ready to implement"],
    briefContact: "How should we reach you?",
    briefContactPlaceholder: "Email, WeChat, or WhatsApp",
    briefSubmit: "Share a scenario",
    briefSending: "Sending…",
    briefSuccess: "Received. We will be in touch shortly.",
    briefError: "Unable to send right now. Please email us directly.",
    briefNote: "Your information is used only to discuss this project and is not published.",
    briefSubject: "Critical Point | Project scenario brief",
    footerLegal: "CRITICAL POINT INTERNET TECHNOLOGY SERVICE LIMITED",
    footerTag: "AI Product & Intelligent Workflow Partner",
  },
} as const;

const traditionalCharacters: Record<string, string> = {
  "与": "與", "专": "專", "东": "東", "个": "個", "临": "臨", "为": "為",
  "义": "義", "亚": "亞", "产": "產", "们": "們", "优": "優", "会": "會",
  "伪": "偽", "体": "體", "价": "價", "关": "關", "内": "內", "决": "決",
  "划": "劃", "创": "創", "务": "務", "动": "動", "区": "區", "协": "協",
  "单": "單", "厂": "廠", "参": "參", "发": "發", "变": "變", "叠": "疊",
  "团": "團", "围": "圍", "图": "圖", "场": "場", "块": "塊", "处": "處",
  "复": "複", "够": "夠", "实": "實", "审": "審", "对": "對", "导": "導",
  "将": "將", "层": "層", "帮": "幫", "并": "並", "应": "應", "开": "開",
  "张": "張", "战": "戰", "户": "戶", "扩": "擴", "据": "據", "数": "數",
  "断": "斷", "时": "時", "暂": "暫", "术": "術", "机": "機", "杂": "雜",
  "条": "條", "构": "構", "标": "標", "档": "檔", "没": "沒", "灵": "靈",
  "环": "環", "盖": "蓋", "盘": "盤", "确": "確", "种": "種", "积": "積",
  "约": "約", "级": "級", "线": "線", "组": "組", "织": "織", "经": "經",
  "结": "結", "绕": "繞", "络": "絡", "统": "統", "续": "續", "网": "網",
  "联": "聯", "范": "範", "营": "營", "规": "規", "计": "計", "讨": "討",
  "让": "讓", "训": "訓", "议": "議", "论": "論", "设": "設", "证": "證",
  "评": "評", "识": "識", "诉": "訴", "诊": "診", "话": "話", "该": "該",
  "读": "讀", "负": "負", "责": "責", "资": "資", "践": "踐", "转": "轉",
  "软": "軟", "辑": "輯", "运": "運", "还": "還", "这": "這", "进": "進",
  "连": "連", "选": "選", "逻": "邏", "邮": "郵", "采": "採", "里": "裏",
  "键": "鍵", "长": "長", "闭": "閉", "问": "問", "间": "間", "队": "隊",
  "际": "際", "难": "難", "预": "預", "题": "題", "验": "驗", "业": "業",
  "医": "醫", "药": "藥", "汉": "漢", "简": "簡", "从": "從", "么": "麼",
  "别": "別", "过": "過", "仅": "僅", "项": "項", "来": "來", "称": "稱",
  "脱": "脫", "阶": "階", "准": "準", "备": "備", "点": "點", "击": "擊",
  "当": "當", "风": "風", "险": "險", "显": "顯", "错": "錯",
};

function toTraditional<T>(value: T): T {
  if (typeof value === "string") {
    let converted = value
      .replaceAll("阿里巴巴", "__ALIBABA__")
      .replaceAll("定制", "定製")
      .replaceAll("复盘", "復盤")
      .replaceAll("回复", "回覆")
      .replaceAll("标签", "標籤")
      .replaceAll("签约", "簽約")
      .replaceAll("联系", "聯繫");

    converted = Array.from(converted, (character) => traditionalCharacters[character] ?? character).join("");
    return converted.replaceAll("__ALIBABA__", "阿里巴巴") as T;
  }

  if (Array.isArray(value)) {
    return value.map((item) => toTraditional(item)) as T;
  }

  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, item]) => [key, toTraditional(item)]),
    ) as T;
  }

  return value;
}

const localizedCopy = {
  en: copy.en,
  "zh-Hans": copy.zh,
  "zh-Hant": toTraditional(copy.zh),
} as const;

export default function Home() {
  const [lang, setLang] = useState<Lang>("en");
  const [briefProblem, setBriefProblem] = useState("");
  const [briefStage, setBriefStage] = useState("");
  const [briefContact, setBriefContact] = useState("");
  const [briefStatus, setBriefStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const t = localizedCopy[lang];

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  async function submitBrief(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const selectedStage = briefStage === "" ? "—" : t.briefStages[Number(briefStage)];
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      const message = [
        `${t.briefProblem}\n${briefProblem}`,
        `${t.briefStage}\n${selectedStage}`,
        `${t.briefContact}\n${briefContact}`,
      ].join("\n\n");
      window.location.href = `mailto:rance811@gmail.com?subject=${encodeURIComponent(t.briefSubject)}&body=${encodeURIComponent(message)}`;
      return;
    }

    setBriefStatus("sending");

    try {
      const response = await fetch(`${supabaseUrl}/rest/v1/critical_point_project_briefs`, {
        method: "POST",
        headers: {
          apikey: supabaseAnonKey,
          Authorization: `Bearer ${supabaseAnonKey}`,
          "Content-Type": "application/json",
          Prefer: "return=minimal",
        },
        body: JSON.stringify({
          problem: briefProblem.trim(),
          stage: selectedStage,
          contact: briefContact.trim(),
          locale: lang,
          source_url: window.location.href,
        }),
      });

      if (!response.ok) throw new Error("Submission failed");

      setBriefProblem("");
      setBriefStage("");
      setBriefContact("");
      setBriefStatus("success");
    } catch {
      setBriefStatus("error");
    }
  }

  return (
    <div className={`site ${lang === "en" ? "is-en" : "is-zh"}`}>
      <header className="topbar">
        <a className="brand" href="#top" aria-label="Critical Point home">
          <span className="brand-mark" aria-hidden="true">
            <img src="/critical-point-logo.jpg" alt="" />
          </span>
          <span className="brand-type">
            <strong>CRITICAL POINT</strong>
            <span>{lang === "zh-Hans" ? "临界创新" : "臨界創新"}</span>
          </span>
        </a>

        <nav className="desktop-nav" aria-label={lang === "en" ? "Main navigation" : lang === "zh-Hant" ? "主導航" : "主导航"}>
          {t.nav.map(([label, href]) => (
            <a key={href} href={href}>
              {label}
            </a>
          ))}
        </nav>

        <div className="nav-actions">
          <div className="lang-switch" aria-label="Language switcher">
            <button aria-pressed={lang === "en"} className={lang === "en" ? "active" : ""} onClick={() => setLang("en")}>
              EN
            </button>
            <span>/</span>
            <button aria-pressed={lang === "zh-Hans"} className={lang === "zh-Hans" ? "active" : ""} onClick={() => setLang("zh-Hans")}>
              简
            </button>
            <span>/</span>
            <button aria-pressed={lang === "zh-Hant"} className={lang === "zh-Hant" ? "active" : ""} onClick={() => setLang("zh-Hant")}>
              繁
            </button>
          </div>
          <a className="nav-cta" href="#contact">
            {t.navCta}
            <span aria-hidden="true">↗</span>
          </a>
        </div>
      </header>

      <main id="top">
        <section className="hero section-pad">
          <div className="hero-grid" aria-hidden="true" />
          <div className="hero-glow" aria-hidden="true" />
          <div className="hero-copy">
            <p className="eyebrow">
              <span /> {t.heroEyebrow}
            </p>
            <h1>
              <span>{t.heroTitleA}</span>
              <span>{t.heroTitleB}</span>
              <em>{t.heroTitleC}</em>
            </h1>
            <p className="hero-body"><strong>{t.heroBrand}</strong>{t.heroBody}</p>
            <div className="hero-actions">
              <a className="button button-primary" href="#contact">
                {t.heroPrimary}<span aria-hidden="true">↗</span>
              </a>
              <a className="button button-ghost" href="#approach">
                {t.heroSecondary}<span aria-hidden="true">↓</span>
              </a>
            </div>
          </div>

          <aside className="protocol-card" aria-label={t.systemTitle}>
            <div className="protocol-head">
              <span>{t.systemLabel}</span>
              <span className="active-dot">{t.systemStatus}</span>
            </div>
            <div className="protocol-orbit" aria-hidden="true">
              <div className="orbit orbit-a" />
              <div className="orbit orbit-b" />
              <div className="orbit-core">CP</div>
            </div>
            <h2>{t.systemTitle}</h2>
            <div className="protocol-rows">
              {t.systemRows.map(([no, name, question]) => (
                <div className="protocol-row" key={no}>
                  <span>{no}</span>
                  <strong>{name}</strong>
                  <p>{question}</p>
                </div>
              ))}
            </div>
            <div className="protocol-foot">{t.systemFoot}</div>
          </aside>

          <div className="proof-strip">
            {t.proof.map(([value, label]) => (
              <div className="proof-item" key={label}>
                <strong>{value}</strong>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="capabilities section-pad" id="capabilities">
          <div className="section-lead">
            <p className="section-kicker">{t.capabilitiesKicker}</p>
            <h2>{t.capabilitiesTitle}</h2>
            <p>{t.capabilitiesIntro}</p>
          </div>
          <div className="capability-grid">
            {t.capabilities.map(([no, title, body, tag]) => (
              <article className="capability-card" key={no}>
                <div className="card-index">{no}</div>
                <div className="card-corner" aria-hidden="true" />
                <span className="card-tag">{tag}</span>
                <h3>{title}</h3>
                <p>{body}</p>
                <div className="card-line" aria-hidden="true"><span /></div>
              </article>
            ))}
          </div>
        </section>

        <section className="approach section-pad" id="approach">
          <div className="approach-copy">
            <p className="section-kicker">{t.approachKicker}</p>
            <h2>{t.approachTitle}</h2>
            <p>{t.approachBody}</p>
          </div>
          <div className="approach-steps">
            {t.approachSteps.map(([no, title, body], index) => (
              <div className="approach-step" key={no}>
                <div className="step-rail">
                  <span>{no}</span>
                  {index < t.approachSteps.length - 1 && <i />}
                </div>
                <div>
                  <h3>{title}</h3>
                  <p>{body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="work section-pad" id="work">
          <div className="work-head">
            <div>
              <p className="section-kicker">{t.workKicker}</p>
              <h2>{t.workTitle}</h2>
            </div>
            <p>{t.workIntro}</p>
          </div>
          <div className="case-list">
            {t.cases.map((item) => (
              <article className="case" key={item.no}>
                <div className="case-no">{item.no}</div>
                <div className="case-main">
                  <span className="case-client">{item.client}</span>
                  <span className="case-type">{item.type}</span>
                  <h3>{item.title}</h3>
                </div>
                <p className="case-body">{item.body}</p>
                <div className="case-tags">
                  {item.tags.map((tag) => <span key={tag}>{tag}</span>)}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="expert-network section-pad" id="network">
          <div className="network-copy">
            <p className="section-kicker">{t.teamKicker}</p>
            <h2>{t.teamTitle}</h2>
            <p>{t.teamBody}</p>
            <div className="network-stats">
              {t.teamStats.map(([label, body]) => (
                <div key={label}>
                  <strong>{label}</strong>
                  <span>{body}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="expert-map" aria-label={t.teamTitle}>
            <div className="map-grid" aria-hidden="true" />
            <div className="map-core">
              <span>CRITICAL</span>
              <strong>POINT</strong>
              <small>FOUNDER-LED</small>
            </div>
            <div className="map-ring map-ring-a" aria-hidden="true" />
            <div className="map-ring map-ring-b" aria-hidden="true" />
            {t.teamRoles.map(([role, detail], index) => (
              <article className={`expert-node expert-node-${index + 1}`} key={detail}>
                <span>0{index + 1}</span>
                <strong>{role}</strong>
                <p>{detail}</p>
              </article>
            ))}
            <span className="map-status"><i /> EXPERT NETWORK · ACTIVE</span>
          </div>
        </section>

        <section className="founder section-pad" id="founder">
          <div className="founder-photo">
            <img src="/ran-zou.jpg" alt={lang === "en" ? "Ran Zou, founder of Critical Point" : t.founderTitle} />
            <div className="photo-grid" aria-hidden="true" />
            <span className="photo-caption">HONG KONG · 2026</span>
          </div>
          <div className="founder-copy">
            <p className="section-kicker">{t.founderKicker}</p>
            <span className="founder-role">{t.founderRole}</span>
            <h2>{t.founderTitle}</h2>
            <p className="founder-intro">{t.founderIntro}</p>
            <blockquote>{t.founderQuote}</blockquote>
            <div className="founder-pillars">
              {t.founderPillars.map((pillar, index) => (
                <span key={pillar}><b>0{index + 1}</b>{pillar}</span>
              ))}
            </div>
          </div>
        </section>

        <section className="region section-pad">
          <div className="region-copy">
            <p className="section-kicker">{t.regionKicker}</p>
            <h2>{t.regionTitle}</h2>
            <p>{t.regionBody}</p>
          </div>
          <div className="region-network">
            <div className="network-line" aria-hidden="true" />
            {t.locations.map(([city, role], index) => (
              <div className={`location location-${index + 1}`} key={city}>
                <span className="location-node" aria-hidden="true" />
                <strong>{city}</strong>
                <p>{role}</p>
              </div>
            ))}
            <span className="network-code">22.3193° N · 114.1694° E</span>
          </div>
        </section>

        <section className="contact section-pad" id="contact">
          <div className="contact-grid" aria-hidden="true" />
          <div className="contact-layout">
            <div className="contact-copy">
              <p className="section-kicker">{t.contactKicker}</p>
              <h2>{t.contactTitle}</h2>
              <p className="contact-body">{t.contactBody}</p>
              <a className="contact-email" href="mailto:rance811@gmail.com">
                <span>rance811@gmail.com</span>
                <b>{t.contactCta} ↗</b>
              </a>
              <p className="contact-note"><span />{t.contactNote}</p>
            </div>

            <form className="project-brief" onSubmit={submitBrief}>
              <div className="brief-head">
                <span>{t.briefKicker}</span>
                <h3>{t.briefTitle}</h3>
              </div>

              <label className="brief-field" htmlFor="brief-problem">
                <span>01</span>
                <strong>{t.briefProblem}</strong>
                <textarea
                  id="brief-problem"
                  value={briefProblem}
                  onChange={(event) => setBriefProblem(event.target.value)}
                  placeholder={t.briefProblemPlaceholder}
                  rows={4}
                  required
                />
              </label>

              <fieldset className="brief-field brief-stage">
                <legend><span>02</span><strong>{t.briefStage}</strong></legend>
                <div className="stage-options">
                  {t.briefStages.map((stage, index) => (
                    <label key={stage}>
                      <input
                        type="radio"
                        name="brief-stage"
                        value={index}
                        checked={briefStage === String(index)}
                        onChange={(event) => setBriefStage(event.target.value)}
                        required
                      />
                      <span>{stage}</span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <label className="brief-field" htmlFor="brief-contact">
                <span>03</span>
                <strong>{t.briefContact}</strong>
                <input
                  id="brief-contact"
                  type="text"
                  value={briefContact}
                  onChange={(event) => setBriefContact(event.target.value)}
                  placeholder={t.briefContactPlaceholder}
                  autoComplete="email"
                  required
                />
              </label>

              <button className="brief-submit" type="submit" disabled={briefStatus === "sending"}>
                {briefStatus === "sending" ? t.briefSending : t.briefSubmit}<span aria-hidden="true">↗</span>
              </button>
              <p className={`brief-note ${briefStatus}`} aria-live="polite">
                {briefStatus === "success"
                  ? t.briefSuccess
                  : briefStatus === "error"
                    ? t.briefError
                    : t.briefNote}
              </p>
            </form>
          </div>
        </section>
      </main>

      <footer>
        <div className="footer-brand">
          <strong>CRITICAL POINT</strong>
          <span>{t.footerTag}</span>
        </div>
        <div className="footer-legal">
          <span>{t.footerLegal}</span>
          <span>© 2026 CRITICAL POINT</span>
        </div>
      </footer>
    </div>
  );
}
