import type { Metadata } from "next";
import { langPaths, type Lang } from "./i18n";

export const siteUrl = "https://meetcriticalpoint.com";

// Paste the codes from Google Search Console / 百度搜索资源平台 here once issued.
const verification: Metadata["verification"] = {
  google: undefined,
  other: {},
};

const languageAlternates = {
  en: langPaths.en,
  "zh-Hans": langPaths["zh-Hans"],
  "zh-Hant": langPaths["zh-Hant"],
  "x-default": langPaths.en,
};

const seoCopy: Record<Lang, { title: string; description: string; ogTitle: string; ogDescription: string; locale: string }> = {
  en: {
    title: "CRITICAL POINT | AI Product Strategy & Intelligent Workflows",
    description:
      "Critical Point turns complex business problems into focused AI opportunities, testable product directions, and intelligent systems built to run and evolve.",
    ogTitle: "CRITICAL POINT | AI Product Strategy & Build Studio",
    ogDescription: "What to build. What not to build. How to prove it.",
    locale: "en_US",
  },
  "zh-Hans": {
    title: "临界创新 CRITICAL POINT | AI 产品策略、智能代理与工作流咨询",
    description:
      "临界创新（Critical Point）是 AI 产品策略与构建工作室，创始人邹燃拥有 17 年阿里巴巴产品经验，提供 AI 产品策略与设计、智能代理与工作流、定制开发与私有化部署、企业 AI 培训，服务香港、内地与新加坡。",
    ogTitle: "临界创新 CRITICAL POINT | AI 产品策略与构建工作室",
    ogDescription: "AI 真正难的，不是能不能做，而是做什么、不做什么，以及如何验证。",
    locale: "zh_CN",
  },
  "zh-Hant": {
    title: "臨界創新 CRITICAL POINT | AI 產品策略、智能代理與工作流諮詢",
    description:
      "臨界創新（Critical Point）是 AI 產品策略與構建工作室，創辦人鄒燃擁有 17 年阿里巴巴產品經驗，提供 AI 產品策略與設計、智能代理與工作流、定製開發與私有化部署、企業 AI 培訓，服務香港、內地與新加坡。",
    ogTitle: "臨界創新 CRITICAL POINT | AI 產品策略與構建工作室",
    ogDescription: "AI 真正難的，不是能不能做，而是做什麼、不做什麼，以及如何驗證。",
    locale: "zh_HK",
  },
};

export function buildMetadata(lang: Lang): Metadata {
  const c = seoCopy[lang];
  const path = langPaths[lang];
  return {
    metadataBase: new URL(siteUrl),
    title: c.title,
    description: c.description,
    alternates: { canonical: path, languages: languageAlternates },
    icons: { icon: "/critical-point-logo.jpg", shortcut: "/critical-point-logo.jpg" },
    verification,
    openGraph: {
      type: "website",
      url: path,
      siteName: "CRITICAL POINT",
      locale: c.locale,
      title: c.ogTitle,
      description: c.ogDescription,
      images: [{ url: "/og.png", width: 1729, height: 910, alt: "CRITICAL POINT" }],
    },
    twitter: {
      card: "summary_large_image",
      title: c.ogTitle,
      description: c.ogDescription,
      images: ["/og.png"],
    },
  };
}

export function StructuredData({ lang }: { lang: Lang }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "CRITICAL POINT",
    alternateName: ["临界创新", "臨界創新", "Critical Point Internet Technology Service Limited", "临界创新互联网技术服务有限公司"],
    url: siteUrl + langPaths[lang],
    logo: siteUrl + "/critical-point-logo.jpg",
    image: siteUrl + "/og.png",
    description: seoCopy[lang].description,
    inLanguage: lang,
    areaServed: ["Hong Kong", "Mainland China", "Singapore", "Southeast Asia"],
    address: { "@type": "PostalAddress", addressRegion: "Hong Kong", addressCountry: "HK" },
    founder: {
      "@type": "Person",
      name: "Ran Zou",
      alternateName: ["邹燃", "鄒燃"],
      jobTitle: "Founder",
      image: siteUrl + "/ran-zou.jpg",
    },
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
