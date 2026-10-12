"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { personalCopy } from "./servicesCopy";
import { toTraditional, type Lang } from "./servicesLanguage";
import {
  enterpriseStageLabels, enquiryEmailSubject, enquiryFormName, enquiryMailbox,
  isServiceTopic, resolveServiceTopic, serviceTopicIds, serviceTopicLabels, submitServiceEnquiry,
  type EnquiryValidationError, type ServiceTopic,
} from "./service-enquiry";
import "./service-enquiry.css";

const copy = {
  zh: {
    title: "先说说，你想解决什么。",
    topic: "想聊哪个方向？", chooseTopic: "请选择交流方向", goal: "你的背景、问题与目标是什么？",
    goalPlaceholder: "简要说说你目前的情况、遇到的问题，以及希望这次交流帮你推进什么。",
    resumeGoal: "请说明申请简历的来意、用途，并提供可核实的机构 / 角色或公开介绍链接。",
    stage: "企业需求目前处于哪个阶段？", contact: "留下你的联系方式",
    contactPlaceholder: "邮箱、微信或 WhatsApp", submit: "提交需求", sending: "正在提交……",
    note: "提交需求免费，不会自动收费或确认预约。内容只用于此次沟通，不会公开显示。",
    storedTitle: "需求已保存", stored: "已收到你的需求，我会尽快联系你。",
    emailTitle: "还需要发送邮件", email: "已打开预填邮件；网站尚未收到你的需求，请在邮箱中点击发送。若邮箱没有打开，可点击下方按钮。",
    errorTitle: "需求尚未保存", error: "暂时未能保存，已尝试通知邮箱。你填写的内容仍保留在这里，也已填入邮件；请点击下方按钮并在邮箱中发送。",
    emailCta: "打开预填邮件", blocked: "暂时无法提交，请直接邮件联系。",
    validation: {
      topic: "请选择一个有效的交流方向。", goal: "请用 10–1600 个字说明你的背景、问题与目标。",
      contact: "请填写联系方式，长度为 3–500 个字。", stage: "请选择企业需求目前所处的阶段。",
    },
    training: "培训从小白到高阶，线上线下一个价。线上只接一对一；线下可接一对一、一对二。具体时间、地点和一对二费用在开始前确认。",
  },
  en: {
    title: "What would you like to work through?",
    topic: "What would you like to discuss?", chooseTopic: "Choose a topic", goal: "What is your background, question and goal?",
    goalPlaceholder: "Describe your situation, your question, and what you hope to move forward through this conversation.",
    resumeGoal: "Explain why you are requesting my résumé and how you will use it. Include your organisation / role or a public link that allows me to verify your identity.",
    stage: "What stage is your business enquiry at?", contact: "Leave your contact details",
    contactPlaceholder: "Email, WeChat, or WhatsApp", submit: "Share your needs", sending: "Sending…",
    note: "Submitting an enquiry is free and does not charge you or confirm a booking. Your details are used for this conversation and are not displayed publicly.",
    storedTitle: "Enquiry saved", stored: "Your enquiry has been received. I will be in touch shortly.",
    emailTitle: "Please send the email", email: "A prefilled email has been opened. The website has not received your enquiry yet; click Send in your email app. If it did not open, use the button below.",
    errorTitle: "Enquiry not saved", error: "Your enquiry could not be saved. An inbox notification was attempted. Your details remain here and in the prefilled email; use the button below and send it in your email app.",
    emailCta: "Open prefilled email", blocked: "Unable to submit. Please contact me by email.",
    validation: {
      topic: "Choose a valid topic.", goal: "Describe your background, question and goal in 10–1600 characters.",
      contact: "Enter contact details using 3–500 characters.", stage: "Choose the current stage of your business enquiry.",
    },
    training: "Training is available from beginner to advanced, at the same rates online and in person. Online sessions are one-to-one only; in-person sessions can be one-to-one or one-to-two. Timing, location and one-to-two fees are confirmed before we begin.",
  },
};

type FormStatus = "idle" | "sending" | "stored" | "email" | "error" | "validation" | "blocked";

export default function ServiceEnquiryForm({ lang }: { lang: Lang }) {
  const ui = lang === "en" ? copy.en : lang === "zh-Hant" ? toTraditional(copy.zh) : copy.zh;
  const services = lang === "en" ? personalCopy.en : lang === "zh-Hant" ? toTraditional(personalCopy.zh) : personalCopy.zh;
  const [topic, setTopic] = useState<ServiceTopic | "">("");
  const [goal, setGoal] = useState("");
  const [stage, setStage] = useState("");
  const [contact, setContact] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");
  const [validationError, setValidationError] = useState<EnquiryValidationError>("goal");
  const [mailto, setMailto] = useState(`mailto:${enquiryMailbox}`);
  const honeypot = useRef<HTMLInputElement>(null);
  const submitting = useRef(false);
  const locationTopic = useRef<string | null | undefined>(undefined);

  useEffect(() => {
    function syncFromLocation() {
      const value = new URL(window.location.href).searchParams.get("service");
      if (value === locationTopic.current) return;
      locationTopic.current = value;
      const selected = resolveServiceTopic(value);
      if (selected) {
        setTopic(selected);
        setStage("");
        setStatus("idle");
        // Older service links used the broad contact section as their target.
        // Keep those links useful while sending enquiries straight to the form.
        if (window.location.hash === "#contact") {
          const target = new URL(window.location.href);
          target.hash = "enquiry";
          window.location.replace(target.toString());
        }
      }
    }
    const timer = window.setTimeout(syncFromLocation, 0);
    window.addEventListener("popstate", syncFromLocation);
    window.addEventListener("hashchange", syncFromLocation);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("popstate", syncFromLocation);
      window.removeEventListener("hashchange", syncFromLocation);
    };
  }, []);

  const training = topic === "ai-usage" || topic === "product";
  const selectedConsultation = services.consulting.cards.find(card => card.id === topic);
  const price = !topic ? undefined : topic === "enterprise" ? services.enterprise.price
    : training ? services.training.cards.find(card => card.id === topic)?.price
      : topic === "resume" ? undefined : services.consulting.price;

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting.current) return;
    submitting.current = true;
    setStatus("sending");
    try {
      const result = await submitServiceEnquiry({
        input: { topic, goal, stage, contact, honeypot: honeypot.current?.value ?? "" },
        lang, sourceUrl: window.location.href,
        supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
        supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      });
      if (result.status === "validation") {
        setValidationError(result.error);
        setStatus("validation");
      } else if (result.status === "blocked") {
        setStatus("blocked");
      } else if (result.status === "stored") {
        setStatus("stored");
        setGoal("");
        setStage("");
        setContact("");
      } else {
        setMailto(result.mailto);
        setStatus(result.status);
        if (result.status === "email") window.location.href = result.mailto;
      }
    } finally {
      submitting.current = false;
    }
  }

  return (
    <>
      <form name={enquiryFormName} data-netlify="true" data-netlify-honeypot="bot-field" hidden aria-hidden="true">
        <input type="hidden" name="form-name" value={enquiryFormName} />
        <input type="hidden" name="subject" value={enquiryEmailSubject} data-remove-prefix />
        <input type="text" name="bot-field" readOnly />
        <textarea name="problem" readOnly /><input type="text" name="stage" readOnly />
        <input type="text" name="contact" readOnly /><input type="text" name="locale" readOnly />
        <input type="text" name="source_url" readOnly /><input type="text" name="storage_status" readOnly />
      </form>
      <form className="services-form" name={enquiryFormName} method="POST" onSubmit={onSubmit} aria-label={ui.title}>
        <input type="hidden" name="form-name" value={enquiryFormName} />
        <label className="services-form-honeypot" aria-hidden="true">
          Leave this field empty<input ref={honeypot} type="text" name="bot-field" tabIndex={-1} autoComplete="off" />
        </label>
        <div className="services-form-head"><h3>{ui.title}</h3></div>
        <label className="services-field" htmlFor="service-topic"><span>01</span><strong>{ui.topic}</strong>
          <select id="service-topic" value={topic} required disabled={status === "sending"} onChange={event => { const value = event.target.value; if (value === "" || isServiceTopic(value)) setTopic(value); setStage(""); setStatus("idle"); }}>
            <option value="">{ui.chooseTopic}</option>
            {serviceTopicIds.map(id => <option key={id} value={id}>{serviceTopicLabels[lang][id]}</option>)}
          </select>
        </label>
        {price && <p className="services-form-note">{price}</p>}
        {training && <p className="services-form-note">{ui.training}</p>}
        {topic === "identity" && <p className="services-form-note">{selectedConsultation?.body} {selectedConsultation?.subtopics?.map(region => `${region.title}${region.body ? ` (${region.body})` : ""}`).join(lang === "en" ? "; " : "、")}</p>}
        {topic === "finance" && <p className="services-form-note">{selectedConsultation?.body}</p>}
        {topic === "resume" && <p className="services-form-note">{services.about.resumeBody}</p>}
        <label className="services-field" htmlFor="service-goal"><span>02</span><strong>{ui.goal}</strong>
          <textarea id="service-goal" name="problem" value={goal} disabled={status === "sending"} onChange={event => { setGoal(event.target.value); setStatus("idle"); }} placeholder={topic === "resume" ? ui.resumeGoal : ui.goalPlaceholder} minLength={10} maxLength={1600} rows={5} required />
        </label>
        {topic === "enterprise" && <fieldset className="services-field"><legend><span>03</span><strong>{ui.stage}</strong></legend>
          <div className="services-form-options">{enterpriseStageLabels[lang].map((label, index) => <label key={label}>
            <input type="radio" name="brief-stage" value={index} checked={stage === String(index)} disabled={status === "sending"} onChange={event => { setStage(event.target.value); setStatus("idle"); }} required />
            <span>{label}</span>
          </label>)}</div>
        </fieldset>}
        <label className="services-field" htmlFor="service-contact"><span>{topic === "enterprise" ? "04" : "03"}</span><strong>{ui.contact}</strong>
          <input id="service-contact" name="contact" type="text" value={contact} disabled={status === "sending"} onChange={event => { setContact(event.target.value); setStatus("idle"); }} placeholder={ui.contactPlaceholder} minLength={3} maxLength={500} autoComplete="off" required />
        </label>
        <button className="services-submit" type="submit" disabled={status === "sending"}>{status === "sending" ? ui.sending : ui.submit}<span aria-hidden="true">↗</span></button>
        {(status === "stored" || status === "error" || status === "email") && <div className={`services-form-feedback ${status === "stored" ? "is-success" : status === "email" ? "is-email" : "is-error"}`} role={status === "error" ? "alert" : "status"}>
          <strong>{status === "stored" ? ui.storedTitle : status === "email" ? ui.emailTitle : ui.errorTitle}</strong>
          <p>{status === "stored" ? ui.stored : status === "email" ? ui.email : ui.error}</p>
          {status !== "stored" && <a href={mailto}>{ui.emailCta}<span aria-hidden="true"> ↗</span></a>}
        </div>}
        {status === "validation" && <p className="services-form-feedback is-error" role="alert">{ui.validation[validationError]}</p>}
        {status === "blocked" && <p className="services-form-feedback is-error" role="alert">{ui.blocked} <a href={`mailto:${enquiryMailbox}`}>{enquiryMailbox}</a></p>}
        <p className="services-form-note">{ui.note}</p>
      </form>
    </>
  );
}
