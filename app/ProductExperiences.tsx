import { toTraditional, type Lang } from "./servicesLanguage";
import "./product-experiences.css";

export type ProductGroup = "education" | "cat" | "finance";
type Experience = { name: string; href: string; description: string; privacy?: string; };

const copy: Record<"zh" | "en", { cta: string; groups: Record<ProductGroup, Experience[]> }> = {
  zh: {
    cta: "打开体验",
    groups: {
      education: [
        { name: "Grammar Quest", href: "https://www.grammar-quest.net", description: "先摸底，再按目标与水平练语法；支持自定义课程和 AI 写作批改。" },
        { name: "Spoken Grammar", href: "https://spoken-grammar.netlify.app", description: "录下你说的英语，找出反复出现的语法错误。" },
      ],
      cat: [
        { name: "猫伴", href: "https://xiaofei-cat.netlify.app", description: "陪伴儿童有趣地完成每日任务。可自定义任务，也可提供素材自定义宠物。" },
      ],
      finance: [
        { name: "VigorWealth", href: "https://vigorwealth.netlify.app/", description: "用产品化工具梳理家庭资产与投资决策。", privacy: "隐私保护目标：隐私数据全部留存在你的本地。本地存储升级中。" },
        { name: "大额人民币资金投资决策工具", href: "https://vigorwealth-rmb.netlify.app/", description: "不预测，靠结构。", privacy: "你录入的财务数据保存在当前浏览器本地。" },
      ],
    },
  },
  en: {
    cta: "Try the product",
    groups: {
      education: [
        { name: "Grammar Quest", href: "https://www.grammar-quest.net", description: "Start with an assessment, then practise grammar around your goals and level. Includes custom courses and AI writing feedback." },
        { name: "Spoken Grammar", href: "https://spoken-grammar.netlify.app", description: "Record your spoken English and identify recurring grammar mistakes." },
      ],
      cat: [
        { name: "Mao Ban · 猫伴", href: "https://xiaofei-cat.netlify.app", description: "A playful companion that helps children complete daily tasks. Customise tasks and use your own materials to customise pets." },
      ],
      finance: [
        { name: "VigorWealth", href: "https://vigorwealth.netlify.app/", description: "Product tools for organising household assets and investment decisions.", privacy: "Privacy goal: keep private data on your device. Local storage is being developed." },
        { name: "RMB Investment Decision Tool", href: "https://vigorwealth-rmb.netlify.app/", description: "Structure, rather than prediction.", privacy: "The financial data you enter is saved in your current browser." },
      ],
    },
  },
};

export default function ProductExperiences({ group, lang }: { group: ProductGroup; lang: Lang }) {
  const t = lang === "en" ? copy.en : lang === "zh-Hant" ? toTraditional(copy.zh) : copy.zh;
  return <div className={`services-experiences services-experiences-${group}`}>
    {t.groups[group].map(product => <div className="services-experience" key={product.href}>
      {group !== "cat" && <h4>{product.name}</h4>}
      <p>{product.description}</p>
      <a className="services-experience-link" href={product.href} target="_blank" rel="noopener noreferrer">{t.cta}<span aria-hidden="true">↗</span></a>
      {product.privacy && <p className="services-experience-privacy">{product.privacy}</p>}
    </div>)}
  </div>;
}
