import type { Lang } from "./servicesLanguage";
import "./grammar-quest-showcase.css";

const copy = {
  "zh-Hans": {
    eyebrow: "AI 教育 / 产品介绍",
    intro: "先摸底，再按目标与水平练语法。",
    features: [
      ["了解起点", "通过摸底测评，了解当前语法水平。"],
      ["按目标练习", "围绕学习目标选择课程，也可自定义学习内容。"],
      ["写作批改", "结合 AI 写作批改，在练习中发现语法问题。"],
    ],
    cta: "体验 Grammar Quest",
    note: "支持手机与电脑使用。",
    video: "Grammar Quest 产品介绍短视频",
    fallback: "打开介绍视频",
  },
  "zh-Hant": {
    eyebrow: "AI 教育 / 產品介紹",
    intro: "先摸底，再按目標與水平練語法。",
    features: [
      ["了解起點", "透過摸底測評，了解目前的語法水平。"],
      ["按目標練習", "圍繞學習目標選擇課程，也可自訂學習內容。"],
      ["寫作批改", "結合 AI 寫作批改，在練習中發現語法問題。"],
    ],
    cta: "體驗 Grammar Quest",
    note: "支援手機與電腦使用。",
    video: "Grammar Quest 產品介紹短影片",
    fallback: "開啟介紹影片",
  },
  en: {
    eyebrow: "AI EDUCATION / PRODUCT INTRODUCTION",
    intro: "Assess your level, then practise grammar around your goals.",
    features: [
      ["Find your starting point", "Begin with an assessment of your current grammar level."],
      ["Practise with a goal", "Choose courses around your goals or customise learning content."],
      ["Get writing feedback", "Use AI writing feedback to identify grammar mistakes as you practise."],
    ],
    cta: "Try Grammar Quest",
    note: "Available on mobile and desktop.",
    video: "Grammar Quest product introduction video (Chinese)",
    fallback: "Open the introduction video",
  },
};

const video = "/media/grammar-quest-promo-portrait.mp4";

export default function GrammarQuestShowcase({ lang }: { lang: Lang }) {
  const t = copy[lang];
  return <article className="grammar-quest-showcase" aria-labelledby="grammar-quest-title">
    <div className="grammar-quest-media">
      <video controls playsInline preload="metadata" poster="/media/grammar-quest-promo-poster.jpg" width="1080" height="1920" aria-label={t.video}>
        <source src={video} type="video/mp4" />
        <a href={video}>{t.fallback}</a>
      </video>
      <p className="grammar-quest-caption">{t.video}</p>
    </div>
    <div className="grammar-quest-description">
      <p className="services-kicker">{t.eyebrow}</p>
      <h3 id="grammar-quest-title">Grammar Quest</h3>
      <p className="grammar-quest-intro">{t.intro}</p>
      <dl className="grammar-quest-features">{t.features.map(([title, body]) => <div key={title}><dt>{title}</dt><dd>{body}</dd></div>)}</dl>
      <a className="services-button" href="https://www.grammar-quest.net" target="_blank" rel="noopener noreferrer">{t.cta}<span aria-hidden="true">↗</span></a>
      <p className="grammar-quest-note">{t.note}</p>
    </div>
  </article>;
}
