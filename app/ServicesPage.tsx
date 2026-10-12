import { personalCopy } from "./servicesCopy";
import { servicePaths, toTraditional, type Lang } from "./servicesLanguage";
import "./services.css";

const homePaths: Record<Lang, string> = { "zh-Hans": "/zh", en: "/", "zh-Hant": "/zh-hant" };
const traditionalCopy = toTraditional(personalCopy.zh);
const pageCopy = {
  zh: {
    brand: "临界创新",
    title: "服务与交流",
    intro: "企业 AI 诊断、个人咨询与培训，以及正在做的 AI 产品。先找到与你的问题相关的方向，再一起确认下一步。",
    back: "返回公司首页",
    email: "邮件联系",
    contents: "浏览服务",
    enterprise: "企业 AI 诊断",
    consulting: "付费咨询",
    training: "AI 培训",
    products: "产品体验",
    about: "关于我",
    stages: "按四个职业阶段提供咨询",
    formats: "培训形式",
    resume: "简历",
    contactTitle: "说说你想解决什么。",
    contactBody: "邮件里写下你的背景、问题和期望，再确认交流范围、时间与费用。",
    skip: "跳至服务内容",
    footer: "临界创新 · Critical Point",
  },
  en: {
    brand: "临界创新",
    title: "Services & Conversations",
    intro: "Enterprise AI assessment, personal consulting and training, alongside AI products in progress. Find the area relevant to your question, then we can agree on the next step.",
    back: "Back to company home",
    email: "Contact by email",
    contents: "Browse services",
    enterprise: "Enterprise AI",
    consulting: "Paid consulting",
    training: "AI training",
    products: "Products",
    about: "About me",
    stages: "Consulting across four career stages",
    formats: "Training formats",
    resume: "Résumé",
    contactTitle: "Share the question you want to resolve.",
    contactBody: "Email your context, question and goals. We will agree on scope, timing and fees before proceeding.",
    skip: "Skip to service content",
    footer: "Critical Point · 临界创新",
  },
} as const;
const traditionalPageCopy = toTraditional(pageCopy.zh);

function enquiryHref(topic: string, lang: Lang, resume = false) {
  const english = lang === "en";
  const subject = `${english ? "Critical Point" : "临界创新"}｜${topic}`;
  const body = resume
    ? english
      ? "Purpose of requesting the résumé:\n\nOrganisation / role and publicly verifiable information:\n\nPreferred contact details:\n"
      : "查看简历的来意与用途：\n\n所在机构 / 角色及可核实身份的信息（例如公开介绍链接）：\n\n方便联系的方式：\n"
    : english
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
    ["enterprise", ui.enterprise],
    ["consulting", ui.consulting],
    ["training", ui.training],
    ["products", ui.products],
    ["about", ui.about],
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
          <a className="services-header-contact" href={enquiryHref(ui.title, lang)}>{ui.email}<span aria-hidden="true">↗</span></a>
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

        <section className="services-section services-container" id="enterprise">
          <div className="services-section-heading"><p className="services-kicker">01 / {t.enterprise.eyebrow}</p><h2>{t.enterprise.title}</h2></div>
          <article className="services-enterprise-panel">
            <div><p className="services-lead">{t.enterprise.body}</p><a className="services-button" href={enquiryHref(t.enterprise.title, lang)}>{t.enterprise.cta}<span aria-hidden="true">↗</span></a></div>
            <div className="services-enterprise-details"><strong className="services-enterprise-price">{t.enterprise.price}</strong><ol>{t.enterprise.deliverables.map((item, index) => <li key={item}><span>0{index + 1}</span>{item}</li>)}</ol><p className="services-note">{t.enterprise.note}</p></div>
          </article>
        </section>

        <section className="services-section services-container" id="consulting">
          <div className="services-section-heading"><p className="services-kicker">02 / {t.consulting.eyebrow}</p><h2>{ui.consulting}</h2><p>{t.consulting.intro}</p><strong className="services-price">{t.consulting.price}</strong></div>
          <div className="services-consulting-grid">
            {t.consulting.cards.map((card, index) => <article className="services-card" key={card.id}>
              <span className="services-card-number">0{index + 1}</span><h3>{card.title}</h3><p>{card.body}</p>
              {card.id === "career" && <div className="services-career-stages"><p>{ui.stages}</p><ol>{t.consulting.careerStages.map(stage => <li key={stage}>{stage}</li>)}</ol></div>}
              <ul className="services-list">{card.details.map(detail => <li key={detail}>{detail}</li>)}</ul>
              <a className="services-text-link" href={enquiryHref(card.title, lang)}>{card.cta}<span aria-hidden="true">→</span></a>
            </article>)}
          </div>
          <p className="services-note">{t.consulting.note}</p>
        </section>

        <section className="services-section services-training-section" id="training">
          <div className="services-container">
            <div className="services-section-heading"><p className="services-kicker">03 / {t.training.eyebrow}</p><h2>{t.training.title}</h2><p>{t.training.intro}</p></div>
            <div className="services-training-grid">{t.training.cards.map((card, index) => <article className="services-training-card" key={card.id}><span className="services-card-number">0{index + 1}</span><h3>{card.title}</h3><p>{card.body}</p><strong className="services-price">{card.price}</strong><a className="services-text-link" href={enquiryHref(card.title, lang)}>{card.cta}<span aria-hidden="true">→</span></a></article>)}</div>
            <div className="services-training-formats"><h3>{ui.formats}</h3><ul>{t.training.formats.map(format => <li key={format}>{format}</li>)}</ul></div><p className="services-note">{t.training.note}</p>
          </div>
        </section>

        <section className="services-section services-container" id="products">
          <div className="services-section-heading"><p className="services-kicker">04 / {t.products.eyebrow}</p><h2>{ui.products}</h2><p>{t.products.intro}</p></div>
          <div className="services-products-grid">{t.products.cards.map((card, index) => <article className="services-product-card" key={card.title}><div className={`services-product-art services-product-art-${index}`} aria-hidden="true">{index === 0 ? "Aa / 你好" : index === 1 ? "ᓚᘏᗢ" : "▂ ▄ ▆ █"}</div><div className="services-product-body"><span className="services-status">{card.status}</span><h3>{card.title}</h3><p>{card.body}</p></div></article>)}</div>
        </section>

        <section className="services-section services-container" id="about">
          <div className="services-section-heading"><p className="services-kicker">05 / {t.about.eyebrow}</p><h2>{ui.about}</h2></div>
          <div className="services-about-grid"><div><h3 className="services-about-name">{t.about.title}</h3><p className="services-about-role">{t.about.role}</p><p className="services-lead">{t.about.intro}</p><div className="services-resume"><p className="services-kicker">{ui.resume}</p><h3>{t.about.resumeTitle}</h3><p>{t.about.resumeBody}</p><a className="services-text-link" href={enquiryHref(ui.resume, lang, true)}>{t.about.resumeCta}<span aria-hidden="true">→</span></a></div></div><dl className="services-accounts">{t.about.accounts.map(account => <div key={account.label}><dt>{account.label}</dt><dd>{account.href ? <a href={account.href} target={account.href.startsWith("mailto:") ? undefined : "_blank"} rel={account.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}>{account.value}<span aria-hidden="true">↗</span></a> : account.value}</dd></div>)}</dl></div>
        </section>

        <section className="services-contact"><div className="services-container services-contact-content"><div><h2>{ui.contactTitle}</h2><p>{ui.contactBody}</p></div><a className="services-button" href={enquiryHref(ui.title, lang)}>rance811@gmail.com<span aria-hidden="true">↗</span></a></div></section>
      </main>
      <footer className="services-footer services-container"><span>{ui.footer}</span><a href={homePaths[lang]}>{ui.back}<span aria-hidden="true">↗</span></a></footer>
    </div>
  );
}
