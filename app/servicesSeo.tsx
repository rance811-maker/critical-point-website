import type { Metadata } from "next";
import { personalCopy } from "./servicesCopy";
import { servicePaths, toTraditional, type Lang } from "./servicesLanguage";

export function buildServicesMetadata(lang: Lang): Metadata {
  const copy = lang === "en" ? personalCopy.en : lang === "zh-Hant" ? toTraditional(personalCopy.zh) : personalCopy.zh;
  const title = lang === "en" ? "Services & Conversations | Critical Point · Ran Zou" : lang === "zh-Hant" ? "服務與交流｜臨界創新 · 鄒燃" : "服务与交流｜临界创新 · 邹燃";
  return {
    metadataBase: new URL("https://meetcriticalpoint.com"),
    title,
    description: copy.metadata.description,
    alternates: { canonical: servicePaths[lang], languages: { ...servicePaths, "x-default": "/services" } },
    openGraph: {
      type: "website", title, description: copy.metadata.description,
      url: servicePaths[lang], siteName: "CRITICAL POINT",
      locale: lang === "en" ? "en_US" : lang === "zh-Hant" ? "zh_HK" : "zh_CN",
      images: [{ url: "/og.png", width: 1729, height: 910, alt: "CRITICAL POINT" }],
    },
    twitter: { card: "summary_large_image", title, description: copy.metadata.description, images: ["/og.png"] },
  };
}
