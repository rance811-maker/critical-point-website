import type { Lang } from "./servicesLanguage";
import ProductExperiences from "./ProductExperiences";
import "./grammar-quest-showcase.css";

const copy = {
  "zh-Hans": {
    title: "AI 教育",
    status: "开放体验",
    video: "Grammar Quest 产品介绍短视频",
    fallback: "打开介绍视频",
  },
  "zh-Hant": {
    title: "AI 教育",
    status: "開放體驗",
    video: "Grammar Quest 產品介紹短影片",
    fallback: "開啟介紹影片",
  },
  en: {
    title: "AI Education",
    status: "Available to try",
    video: "Grammar Quest product introduction video (Chinese)",
    fallback: "Open the introduction video",
  },
};

const video = "/media/grammar-quest-promo-portrait.mp4";

export default function GrammarQuestShowcase({ lang }: { lang: Lang }) {
  const t = copy[lang];
  return <article className="grammar-quest-showcase" aria-labelledby="ai-education-title">
    <div className="grammar-quest-description">
      <span className="services-status">{t.status}</span>
      <h3 id="ai-education-title">{t.title}</h3>
      <ProductExperiences group="education" lang={lang} />
    </div>
    <div className="grammar-quest-media">
      <video controls playsInline preload="metadata" poster="/media/grammar-quest-promo-poster.jpg" width="1080" height="1920" aria-label={t.video}>
        <source src={video} type="video/mp4" />
        <a href={video}>{t.fallback}</a>
      </video>
      <p className="grammar-quest-caption">{t.video}</p>
    </div>
  </article>;
}
