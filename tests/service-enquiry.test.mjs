import test from "node:test";
import assert from "node:assert/strict";
import {
  enterpriseStageLabels, enquiryFormName, enquiryNotificationEndpoint,
  isServiceTopic, resolveServiceTopic, serializeServiceEnquiry, serviceEnquiryMailto,
  serviceTopicIds, serviceTopicLabels, submitServiceEnquiry, validateServiceEnquiry,
} from "../app/service-enquiry.ts";

const input = { topic: "career", goal: "希望讨论我的下一步职业发展与团队管理。", stage: "", contact: "contact@example.test", honeypot: "" };
const options = {
  input, lang: "zh-Hans", sourceUrl: "https://meetcriticalpoint.com/services?service=career#contact",
  supabaseUrl: "https://database.example.test/", supabaseAnonKey: "test-key",
};
const noNetwork = async () => { throw new Error("Unexpected external request"); };

test("old Talent Pass links select residency planning without a duplicate topic", () => {
  assert.equal(serviceTopicIds.includes("talent"), false);
  assert.equal(isServiceTopic("talent"), false);
  assert.equal(resolveServiceTopic("talent"), "identity");
  for (const topic of serviceTopicIds) assert.equal(resolveServiceTopic(topic), topic);
  for (const value of [null, "", "other", "__proto__"]) assert.equal(resolveServiceTopic(value), undefined);
});

test("all supported topics validate; unknown or prototype topic names do not", () => {
  for (const topic of serviceTopicIds) {
    assert.equal(isServiceTopic(topic), true);
    assert.equal(validateServiceEnquiry({ ...input, topic, stage: "0" }).status, "valid");
  }
  for (const topic of ["other", "", "__proto__", "toString"]) {
    assert.equal(isServiceTopic(topic), false);
    assert.deepEqual(validateServiceEnquiry({ ...input, topic }), { status: "validation", error: "topic" });
  }
});

test("goal/contact validation trims input and enforces schema-compatible boundaries", () => {
  const trimmed = validateServiceEnquiry({ ...input, goal: `  ${input.goal}  `, contact: `  ${input.contact}  ` });
  assert.equal(trimmed.status, "valid");
  assert.equal(trimmed.input.goal, input.goal);
  assert.equal(trimmed.input.contact, input.contact);
  for (const goal of [" ", "短于十个字", "a".repeat(1601)]) {
    assert.deepEqual(validateServiceEnquiry({ ...input, goal }), { status: "validation", error: "goal" });
  }
  for (const contact of ["  ", "ab", "a".repeat(501)]) {
    assert.deepEqual(validateServiceEnquiry({ ...input, contact }), { status: "validation", error: "contact" });
  }
  assert.equal(validateServiceEnquiry({ ...input, goal: "a".repeat(1600), contact: "b".repeat(500) }).status, "valid");
});

test("enterprise stage is required and must be one of the actual four choices", () => {
  for (const stage of ["0", "1", "2", "3"]) {
    assert.equal(validateServiceEnquiry({ ...input, topic: "enterprise", stage }).status, "valid");
  }
  for (const stage of ["", "-1", "4", "1.0", "Exploring"]) {
    assert.deepEqual(validateServiceEnquiry({ ...input, topic: "enterprise", stage }), { status: "validation", error: "stage" });
  }
  assert.equal(validateServiceEnquiry({ ...input, stage: "" }).status, "valid");
});

test("honeypot content blocks all requests even when other details are valid", async () => {
  for (const honeypot of ["bot", " "]) {
    const result = await submitServiceEnquiry({ ...options, input: { ...input, honeypot }, fetcher: noNetwork });
    assert.deepEqual(result, { status: "blocked" });
  }
});

test("invalid enquiries never contact storage or notification endpoints", async () => {
  for (const invalid of [{ ...input, topic: "other" }, { ...input, goal: "短" }, { ...input, topic: "enterprise", stage: "" }]) {
    const result = await submitServiceEnquiry({ ...options, input: invalid, fetcher: noNetwork });
    assert.equal(result.status, "validation");
  }
});

test("serialization preserves the existing five-field schema and actual selected topic", () => {
  for (const lang of ["zh-Hans", "zh-Hant", "en"]) {
    for (const topic of serviceTopicIds) {
      const fields = serializeServiceEnquiry({ ...input, topic, stage: "2" }, lang, options.sourceUrl);
      assert.deepEqual(Object.keys(fields), ["problem", "stage", "contact", "locale", "source_url"]);
      assert.ok(fields.problem.includes(serviceTopicLabels[lang][topic]));
      assert.ok(fields.problem.endsWith(input.goal));
      assert.equal(fields.stage, topic === "enterprise" ? enterpriseStageLabels[lang][2] : serviceTopicLabels[lang][topic]);
      assert.equal(fields.contact, input.contact);
      assert.equal(fields.locale, lang);
      assert.ok(fields.stage.length >= 2 && fields.stage.length <= 120);
    }
  }
  assert.equal(serializeServiceEnquiry(input, "zh-Hans", "a".repeat(1100)).source_url.length, 1000);
});

test("mail fallback retains topic, complete multiline content, contact, source and Unicode", () => {
  const fields = serializeServiceEnquiry({ ...input, topic: "resume", goal: "查看简历的来意：产品合作。\n公开资料：https://example.test/about?q=名字&role=产品\n希望交流完整经历。", contact: "微信：测试用户" }, "zh-Hant", options.sourceUrl);
  const href = serviceEnquiryMailto(fields);
  const mail = new URL(href);
  assert.equal(mail.protocol, "mailto:");
  assert.equal(mail.pathname, "rance811@gmail.com");
  assert.ok(mail.searchParams.get("subject").includes("服務需求"));
  const body = mail.searchParams.get("body");
  assert.ok(body.includes(fields.problem));
  assert.ok(body.includes(fields.stage));
  assert.ok(body.includes(fields.contact));
  assert.ok(body.includes(fields.source_url));
});

test("missing storage configuration returns an unsent email without any network request", async () => {
  for (const missing of [{ supabaseUrl: undefined }, { supabaseAnonKey: undefined }, { supabaseUrl: "", supabaseAnonKey: "" }]) {
    const result = await submitServiceEnquiry({ ...options, ...missing, fetcher: noNetwork });
    assert.equal(result.status, "email");
    assert.ok(result.mailto.startsWith("mailto:"));
    assert.equal(result.fields.contact, input.contact);
  }
});

test("storage success remains success if the notification request fails", async () => {
  const calls = [];
  const result = await submitServiceEnquiry({ ...options, fetcher: async (url, init) => {
    calls.push({ url, init });
    if (calls.length === 1) return { ok: true };
    throw new Error("Notification unavailable");
  } });
  assert.equal(result.status, "stored");
  assert.equal(calls.length, 2);
  assert.equal(calls[0].url, "https://database.example.test/rest/v1/critical_point_project_briefs");
  assert.deepEqual(JSON.parse(calls[0].init.body), result.fields);
  assert.equal(calls[1].url, enquiryNotificationEndpoint);
  assert.equal(calls[1].init.mode, "no-cors");
  const notification = new URLSearchParams(calls[1].init.body);
  assert.equal(notification.get("form-name"), enquiryFormName);
  assert.equal(notification.get("storage_status"), "stored");
  assert.equal(notification.get("problem"), result.fields.problem);
  assert.equal(notification.get("bot-field"), "");
});

test("an opaque or pending notification cannot delay or overturn saved status", async () => {
  let calls = 0;
  const result = await submitServiceEnquiry({ ...options, fetcher: async () => {
    calls += 1;
    return calls === 1 ? { ok: true } : await new Promise(() => {});
  } });
  assert.equal(result.status, "stored");
  assert.equal(calls, 2);
});

test("storage failure keeps the full request and attempts a marked notification", async () => {
  const calls = [];
  const result = await submitServiceEnquiry({ ...options, fetcher: async (url, init) => {
    calls.push({ url, init });
    return { ok: false };
  } });
  assert.equal(result.status, "error");
  assert.equal(calls.length, 2);
  assert.ok(result.fields.problem.endsWith(input.goal));
  assert.ok(new URL(result.mailto).searchParams.get("body").includes(input.goal));
  const notification = new URLSearchParams(calls[1].init.body);
  assert.equal(notification.get("storage_status"), "failed");
  assert.ok(notification.get("subject").includes("NOT SAVED"));
  assert.equal(notification.get("problem"), result.fields.problem);
});

test("a network failure in both channels still returns a complete email fallback", async () => {
  let calls = 0;
  const result = await submitServiceEnquiry({ ...options, fetcher: async () => {
    calls += 1;
    throw new Error("Offline");
  } });
  assert.equal(result.status, "error");
  assert.equal(calls, 2);
  assert.ok(result.fields.problem.endsWith(input.goal));
  assert.ok(new URL(result.mailto).searchParams.get("body").includes(input.contact));
});
