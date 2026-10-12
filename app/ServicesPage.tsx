import { personalCopy } from "./servicesCopy";
import { servicePaths, toTraditional, type Lang } from "./servicesLanguage";
import ServiceEnquiryForm from "./ServiceEnquiryForm";
import "./services.css";

const homePaths: Record<Lang, string> = { "zh-Hans": "/zh", en: "/", "zh-Hant": "/zh-hant" };
const traditionalCopy = toTraditional(personalCopy.zh);
const pageCopy = {
  zh: {
    brand: "临界创新",
    title: "更多服务",
    intro: "除一单一议的企业 AI 诊断及方案外，也提供主题、范围和价格明确的标准化个人咨询、AI 与产品培训，并陆续开放免费的 AI 产品体验。",
    back: "返回公司首页",
    email: "邮件联系",
    contactNav: "联系",
    contents: "浏览服务",
    consulting: "付费咨询",
    training: "AI 培训",
    products: "产品体验（免费）",
    contact: "联系与社交账号",
    stages: "按四个职业阶段提供咨询",
    formats: "培训形式",
    resume: "简历",
    contactTitle: "先说说你的需求。",
    contactBody: "选择一个方向，说明你的背景、问题和期望，再一起确认交流范围、时间与费用。也可以直接通过邮件联系。",
    skip: "跳至服务内容",
    footer: "临界创新 · Critical Point",
  },
  en: {
    brand: "临界创新",
    title: "More Services",
    intro: "Alongside enterprise AI assessment and solutions quoted by project, I offer standard personal consulting and AI and product training with clearly defined topics and rates. Free AI product experiences will also become available over time.",
    back: "Back to company home",
    email: "Contact by email",
    contactNav: "Contact",
    contents: "Browse services",
    consulting: "Paid consulting",
    training: "AI training",
    products: "Products (free)",
    contact: "Contact & social accounts",
    stages: "Consulting across four career stages",
    formats: "Training formats",
    resume: "Résumé",
    contactTitle: "Tell me what you need.",
    contactBody: "Choose a topic and share your context, question and goals. We will agree on scope, timing and fees. You can also contact me directly by email.",
    skip: "Skip to service content",
    footer: "Critical Point · 临界创新",
  },
} as const;
const traditionalPageCopy = toTraditional(pageCopy.zh);

function enquiryHref(topic: string, lang: Lang) {
  const english = lang === "en";
  const subject = `${english ? "Critical Point" : "临界创新"}｜${topic}`;
  const body = english
      ? `Service of interest: ${topic}\n\nMy background:\n\nQuestion or learning goal:\n\nPreferred format and timing:\n`
      : `咨询 / 培训方向：${topic}\n\n我的背景：\n\n想解决的问题或学习目标：\n\n希望的交流方式与时间：\n`;
  const localSubject = lang === "zh-Hant" ? toTraditional(subject) : subject;
  const localBody = lang === "zh-Hant" ? toTraditional(body) : body;
  return `mailto:rance811@gmail.com?subject=${encodeURIComponent(localSubject)}&body=${encodeURIComponent(localBody)}`;
}

export default function ServicesPage({ lang }: { lang: Lang }) {
  const t = lang === "en" ? personalCopy.en : lang === "zh-Hant" ? traditionalCopy : personalCopy.zh;
  const ui = lang === "en" ? pageCopy.en : lang === "zh-Hant" ? traditionalPageCopy : pageCopy.zh;
  const sections = [
    ["consulting", ui.consulting],
    ["training", ui.training],
    ["products", ui.products],
    ["contact", ui.contact],
  ] as const;

  return (
    <div className="services-page" lang={lang}>
      <a className="services-skip" href="#services-main">{ui.skip}</a>
      <header className="services-header">
        <a className="services-brand" href={homePaths[lang]} aria-label={`${ui.brand} · Critical Point`}>
          <span className="services-logo" aria-hidden="true"><img src="/critical-point-logo.jpg" alt="" width="60" height="60" /></span>
          <span><strong>CRITICAL POINT</strong><small>{ui.brand}</small></span>
        </a>
        <div className="services-header-actions">
          <nav className="services-languages" aria-label="Language / 语言">
            {([ ["zh-Hans", "简"], ["zh-Hant", "繁"], ["en", "EN"] ] as const).map(([value, label]) => (
              <a key={value} href={servicePaths[value]} hrefLang={value} aria-current={lang === value ? "page" : undefined}>{label}</a>
            ))}
          </nav>
          <a className="services-header-contact" href="#contact">{ui.contactNav}<span aria-hidden="true">↗</span></a>
        </div>
      </header>

      <main id="services-main">
        <section className="services-intro services-container">
          <a className="services-back" href={homePaths[lang]}><span aria-hidden="true">←</span>{ui.back}</a>
          <p className="services-kicker">CRITICAL POINT / SERVICES</p>
          <h1>{ui.title}<span aria-hidden="true">.</span></h1>
          <p className="services-intro-body">{ui.intro}</p>
          <nav className="services-directory" aria-label={ui.contents}>
            {sections.map(([id, label], index) => <a key={id} href={`#${id}`}><span>0{index + 1}</span>{label}<b aria-hidden="true">↓</b></a>)}
          </nav>
        </section>

        <section className="services-section services-container" id="consulting">
          <div className="services-section-heading"><p className="services-kicker">01 / {t.consulting.eyebrow}</p><h2>{ui.consulting}</h2><p>{t.consulting.intro}</p><strong className="services-price">{t.consulting.price}</strong></div>
          <div className="services-consulting-grid">
            {t.consulting.cards.map((card, index) => <article className={`services-card${card.id === "identity" ? " services-card-identity" : ""}`} key={card.id}>
              <span className="services-card-number">0{index + 1}</span><h3>{card.title}</h3><p>{card.body}</p>
              {card.id === "career" && <div className="services-career-stages"><p>{ui.stages}</p><ol>{t.consulting.careerStages.map(stage => <li key={stage}>{stage}</li>)}</ol></div>}
              {card.details.length > 0 && <ul className="services-list">{card.details.map(detail => <li key={detail}>{detail}</li>)}</ul>}
              {card.subtopics && <div className="services-subtopics">{card.subtopics.map(subtopic => <div className="services-subtopic" key={subtopic.title}><h4>{subtopic.title}</h4>{subtopic.body && <p>{subtopic.body}</p>}{subtopic.details && <ul className="services-list">{subtopic.details.map(detail => <li key={detail}>{detail}</li>)}</ul>}</div>)}</div>}
              <a className="services-text-link" href={`${servicePaths[lang]}?service=${card.id}#contact`}>{card.cta}<span aria-hidden="true">→</span></a>
            </article>)}
          </div>
          <p className="services-note">{t.consulting.note}</p>
        </section>

        <section className="services-section services-training-section" id="training">
          <div className="services-container">
            <div className="services-section-heading"><p className="services-kicker">02 / {t.training.eyebrow}</p><h2>{ui.training}</h2><p className="services-training-tagline">{t.training.title}</p><p>{t.training.intro}</p></div>
            <div className="services-training-grid">{t.training.cards.map((card, index) => <article className="services-training-card" key={card.id}><span className="services-card-number">0{index + 1}</span><h3>{card.title}</h3><p>{card.body}</p><strong className="services-price">{card.price}</strong><a className="services-text-link" href={`${servicePaths[lang]}?service=${card.id}#contact`}>{card.cta}<span aria-hidden="true">→</span></a></article>)}</div>
            <div className="services-training-formats"><h3>{ui.formats}</h3><ul>{t.training.formats.map(format => <li key={format}>{format}</li>)}</ul></div><p className="services-note">{t.training.note}</p>
          </div>
        </section>

        <section className="services-section services-container" id="products">
          <div className="services-section-heading"><p className="services-kicker">03 / {t.products.eyebrow}</p><h2>{ui.products}</h2><p>{t.products.intro}</p></div>
          <div className="services-products-grid">{t.products.cards.map((card, index) => <article className="services-product-card" key={card.title}><div className={`services-product-art services-product-art-${index}`} aria-hidden="true">{index === 0 ? "Aa / 你好" : index === 1 ? "ᓚᘏᗢ" : "▂ ▄ ▆ █"}</div><div className="services-product-body"><span className="services-status">{card.status}</span><h3>{card.title}</h3><p>{card.body}</p></div></article>)}</div>
        </section>

        <section className="services-section services-container" id="contact">
          <div className="services-section-heading"><p className="services-kicker">04 / CONTACT</p><h2>{ui.contact}</h2></div>
          <div className="services-contact-grid"><dl className="services-accounts">{t.about.accounts.map(account => <div key={account.label}><dt>{account.label}</dt><dd>{account.href ? <a href={account.href} target={account.href.startsWith("mailto:") ? undefined : "_blank"} rel={account.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}>{account.value}<span aria-hidden="true">↗</span></a> : account.value}</dd></div>)}</dl><div className="services-resume"><p className="services-kicker">{ui.resume}</p><h3>{t.about.resumeTitle}</h3><p>{t.about.resumeBody}</p><a className="services-text-link" href={`${servicePaths[lang]}?service=resume#contact`}>{t.about.resumeCta}<span aria-hidden="true">→</span></a></div></div>
          <div className="services-enquiry-panel"><div className="services-enquiry-intro"><div><h3>{ui.contactTitle}</h3><p>{ui.contactBody}</p></div><a className="services-button" href={enquiryHref(ui.title, lang)}>{ui.email}<span aria-hidden="true">↗</span></a></div><ServiceEnquiryForm lang={lang} /></div>
        </section>
      </main>
      <footer className="services-footer services-container"><span>{ui.footer}</span><a href={homePaths[lang]}>{ui.back}<span aria-hidden="true">↗</span></a></footer>
    </div>
  );
}
