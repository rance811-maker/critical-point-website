import type { Metadata } from "next";
import { servicePaths, toTraditional, type Lang } from "./servicesLanguage";

export function buildServicesMetadata(lang: Lang): Metadata {
  const title = lang === "en" ? "More Services | Critical Point" : lang === "zh-Hant" ? "更多服務｜臨界創新" : "更多服务｜临界创新";
  const descriptionText = "除一单一议的企业 AI 诊断及方案外，临界创新也提供主题、范围和价格明确的标准化个人咨询、AI 与产品培训，并提供免费的 AI 产品体验。查看服务、收费、联系方式与社交账号。";
  const description = lang === "en" ? "Alongside enterprise AI assessment and solutions quoted by project, Critical Point offers personal consulting and AI and product training with clearly defined topics and rates, plus free AI product experiences. Explore services, fees, contact details and social accounts." : lang === "zh-Hant" ? toTraditional(descriptionText) : descriptionText;
  return {
    metadataBase: new URL("https://meetcriticalpoint.com"),
    title,
    description,
    alternates: { canonical: servicePaths[lang], languages: { ...servicePaths, "x-default": "/services" } },
    openGraph: {
      type: "website", title, description,
      url: servicePaths[lang], siteName: "CRITICAL POINT",
      locale: lang === "en" ? "en_US" : lang === "zh-Hant" ? "zh_HK" : "zh_CN",
      images: [{ url: "/og.png", width: 1729, height: 910, alt: "CRITICAL POINT" }],
    },
    twitter: { card: "summary_large_image", title, description, images: ["/og.png"] },
  };
}
