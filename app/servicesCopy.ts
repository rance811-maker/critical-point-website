export type PersonalServiceId =
  | "enterprise"
  | "career"
  | "talent"
  | "finance"
  | "identity"
  | "ai-usage"
  | "product"
  | "resume";

export interface PersonalCopy {
  metadata: { title: string; description: string };
  nav: readonly (readonly [string, string])[];
  hero: {
    eyebrow: string;
    name: string;
    title: readonly string[];
    intro: string;
    primary: string;
    secondary: string;
    note: string;
  };
  enterprise: {
    eyebrow: string;
    title: string;
    body: string;
    price: string;
    deliverables: readonly string[];
    note: string;
    cta: string;
  };
  consulting: {
    eyebrow: string;
    title: string;
    intro: string;
    price: string;
    note: string;
    careerStages: readonly string[];
    cards: readonly {
      id: PersonalServiceId;
      title: string;
      body: string;
      details: readonly string[];
      summary?: string;
      subtopics?: readonly { title: string; body?: string; details?: readonly string[] }[];
      cta: string;
    }[];
  };
  training: {
    eyebrow: string;
    intro: string;
    price: string;
    cards: readonly {
      id: PersonalServiceId;
      title: string;
      body: string;
      cta: string;
    }[];
    formats: readonly string[];
    note: string;
  };
  products: {
    eyebrow: string;
    title: string;
    intro: string;
    cards: readonly { title: string; body: string; status: string }[];
  };
  about: {
    eyebrow: string;
    title: string;
    role: string;
    intro: string;
    resumeTitle: string;
    resumeBody: string;
    resumeCta: string;
    accounts: readonly { label: string; value: string; href?: string }[];
  };
  faqs: {
    title: string;
    items: readonly { question: string; answer: string }[];
  };
  contact: {
    eyebrow: string;
    title: string;
    body: string;
    steps: readonly string[];
    cta: string;
    note: string;
    emailLabel: string;
  };
  footer: { name: string; tag: string; rights: string };
}

export const personalCopy: Record<"zh" | "en", PersonalCopy> = {
  zh: {
    metadata: {
      title: "邹燃 Ran Zou｜AI、产品与个人咨询",
      description:
        "临界创新服务与交流：企业 AI 诊断与方案、职场与个人决策咨询、AI 与产品培训，以及陆续开放的 AI 产品体验。先说明你的问题，再确认交流范围、时间与费用。",
    },
    nav: [
      ["咨询服务", "#services"],
      ["AI 与产品培训", "#training"],
      ["产品体验", "#products"],
      ["关于我", "#about"],
    ],
    hero: {
      eyebrow: "AI · 产品 · 个人实践",
      name: "邹燃 / Ran Zou",
      title: ["把你的问题说清楚，", "一起找到下一步。"],
      intro:
        "我有 17 年阿里巴巴产品与数字化经验。现在，我做企业 AI 诊断与方案，提供职场和个人决策咨询，也教你怎么用 AI、怎么做产品。",
      primary: "说明我的需求",
      secondary: "看看我能帮什么",
      note: "先了解背景与目标，再确认是否适合合作。",
    },
    enterprise: {
      eyebrow: "企业服务",
      title: "企业 AI 诊断及方案提供",
      body:
        "如果你在考虑把 AI 用到业务里，可以先从一个具体问题开始。我会结合现有流程、资源与限制，梳理问题，讨论适合的方案和推进方式。",
      price: "一单一议",
      deliverables: ["现状与问题诊断", "AI 应用方案方向", "下一步行动建议"],
      note: "项目范围、交付内容、时间与报价，在合作前单独确认。",
      cta: "描述企业需求",
    },
    consulting: {
      eyebrow: "付费咨询",
      title: "带着一个具体问题来。",
      intro:
        "我能提供的，是工作与生活实践中的经验和决策逻辑。先把你的处境、困惑与期待的结果说清楚，我们再确认这次咨询聊什么。",
      price: "700 港币 / 小时 · 600 人民币 / 小时",
      note: "以下咨询按小时收费，具体时长与使用币种在开始前确认。",
      careerStages: ["应届生", "职场进阶", "团队管理者", "产品负责人一号位"],
      cards: [
        {
          id: "career",
          title: "职场与产品职业发展",
          body: "",
          details: [],
          summary: "面试技巧/简历指点/晋升答辩/和老板相处/带团队",
          cta: "说明职场问题",
        },
        {
          id: "finance",
          title: "理财实践交流",
          body: "只聊我自己实践过的内容。你可以先说明问题，我会确认它是否在我的经验范围内。",
          details: ["只做稳健理财", "只做价值投资", "了解境内外税务情况", "有产品化工具辅助"],
          cta: "说明理财问题",
        },
        {
          id: "identity",
          title: "身份规划相关",
          body: "只围绕以下地区交流，核心为技术类移民：",
          details: [],
          subtopics: [
            {
              title: "中国香港地区",
              body: "高才通 A 类相关",
            },
            { title: "加拿大" },
            { title: "新加坡" },
            { title: "澳洲" },
          ],
          cta: "说明身份规划需求",
        },
      ],
    },
    training: {
      eyebrow: "AI 培训",
      intro: "可以从一个真实任务或产品想法开始。先了解你的基础与目标，再确定内容和节奏。",
      price: "700 港币 / 小时 · 600 人民币 / 小时",
      cards: [
        {
          id: "ai-usage",
          title: "怎么用 AI",
          body: "从入门使用到更进阶的应用，围绕你想完成的任务学习与练习。",
          cta: "说明 AI 学习需求",
        },
        {
          id: "product",
          title: "怎么做产品",
          body: "从理解问题与用户需求开始，学习如何把想法整理成产品，再逐步深入。",
          cta: "说明产品学习需求",
        },
      ],
      formats: ["线上：只接一对一", "线下：可接一对一、一对二", "线上线下一个价"],
      note: "",
    },
    products: {
      eyebrow: "AI 产品体验",
      title: "我正在做的产品。",
      intro: "以下产品可直接打开体验。",
      cards: [
        { title: "AI 教育", body: "语法与口语学习的 AI 产品。", status: "开放体验" },
        { title: "猫伴", body: "", status: "开放体验" },
        {
          title: "AI 家庭理财管理系统",
          body: "家庭资产管理与投资决策工具。",
          status: "开放体验",
        },
      ],
    },
    about: {
      eyebrow: "关于我",
      title: "邹燃 / Ran Zou",
      role: "产品与数字化实践者",
      intro:
        "我有 17 年阿里巴巴互联网产品与数字化经验，长期从事产品规划、跨团队项目管理与商业化落地。这里记录我正在做的事，也提供一个入口，让有具体问题的人找到我。",
      resumeTitle: "需要了解我的完整经历？",
      resumeBody: "说明来意、核实身份后，我可以向你分享简历。",
      resumeCta: "申请了解完整经历",
      accounts: [
        { label: "小红书", value: "月以煜乎夜" },
        { label: "微信公众号", value: "月以煜乎夜" },
        { label: "X", value: "rance11", href: "https://x.com/rance11" },
        { label: "GitHub", value: "rance811-maker", href: "https://github.com/rance811-maker" },
        { label: "邮箱", value: "rance811@gmail.com", href: "mailto:rance811@gmail.com" },
      ],
    },
    faqs: {
      title: "开始之前，你可能想知道。",
      items: [
        {
          question: "费用怎么确认？",
          answer:
            "个人咨询、「怎么用 AI」与「怎么做产品」培训均为 700 港币 / 小时或 600 人民币 / 小时。企业 AI 服务一单一议。具体范围、时长、币种与费用在开始前确认。",
        },
        {
          question: "提交需求后就算预约了吗？",
          answer:
            "还没有。提交需求是免费了解彼此是否匹配的第一步，不会自动收费或确认预约。双方先确认交流范围、时间与费用，再安排咨询或培训。",
        },
        {
          question: "培训可以怎么上课？",
          answer:
            "先说明你的基础与目标。线上只接一对一；线下可接一对一或一对二，线上线下同价，为 700 港币 / 小时或 600 人民币 / 小时。",
        },
        {
          question: "能直接下载你的简历吗？",
          answer: "请先说明来意并提供可核实的身份信息。核实身份后，我可以向你分享简历。",
        },
      ],
    },
    contact: {
      eyebrow: "开始交流",
      title: "先说说，你现在想解决什么。",
      body: "不用写成完整方案。选择一个方向，告诉我你的背景、问题，以及希望这次交流帮你推进什么。",
      steps: ["选择咨询或学习方向", "说明背景、问题与目标", "双方确认范围、时间和费用"],
      cta: "填写咨询需求",
      note: "提交需求免费，不会自动收费或确认预约。",
      emailLabel: "也可以直接邮件联系",
    },
    footer: {
      name: "邹燃 / Ran Zou",
      tag: "AI · 产品 · 个人实践",
      rights: "保留所有权利。",
    },
  },
  en: {
    metadata: {
      title: "Ran Zou | AI, Product & Personal Consulting",
      description:
        "Services and conversations with Ran Zou at Critical Point: enterprise AI assessment and solutions, career and personal decision consulting, AI and product training, and upcoming AI products. Share your needs before agreeing on scope, timing and fees.",
    },
    nav: [
      ["Consulting", "#services"],
      ["AI & Product Training", "#training"],
      ["Products", "#products"],
      ["About", "#about"],
    ],
    hero: {
      eyebrow: "AI · Product · Personal Experience",
      name: "Ran Zou / 邹燃",
      title: ["Make your question clear.", "Find your next step."],
      intro:
        "I bring 17 years of product and digital transformation experience at Alibaba. I now offer enterprise AI assessment and solutions, career and personal decision consulting, and training in using AI and building products.",
      primary: "Share your needs",
      secondary: "Explore how I can help",
      note: "We start with your context and goals, then decide whether we're a good fit.",
    },
    enterprise: {
      eyebrow: "For Businesses",
      title: "Enterprise AI Assessment & Solutions",
      body:
        "If you're considering AI for your business, start with a specific problem. Together, we can examine your current workflows, resources and constraints, then discuss suitable solutions and how to move forward.",
      price: "Quoted by project",
      deliverables: ["Current situation and problem assessment", "AI solution direction", "Recommended next steps"],
      note: "Scope, deliverables, timeline and fees are agreed before the project starts.",
      cta: "Describe your business needs",
    },
    consulting: {
      eyebrow: "Paid Consulting",
      title: "Bring a specific question.",
      intro:
        "I share experience and decision-making logic drawn from my own work and life. Tell me about your situation, your question and the outcome you hope for, so we can agree on what to cover.",
      price: "HKD 700 / hour · RMB 600 / hour",
      note: "Consulting is charged by the hour. Duration and payment currency are confirmed before we begin.",
      careerStages: ["New graduates", "Career progression", "Team managers", "Head of Product"],
      cards: [
        {
          id: "career",
          title: "Career & Product Leadership",
          body: "",
          details: [],
          summary: "Interview skills / résumé feedback / promotion presentations / working with your manager / leading a team",
          cta: "Share your career question",
        },
        {
          id: "finance",
          title: "Personal Finance Experience",
          body: "I only cover approaches I have personally put into practice. Share your question first so I can confirm whether it falls within my experience.",
          details: ["A conservative approach to personal finance", "Value investing only", "Familiarity with domestic and overseas tax matters", "Product tools to support the process"],
          cta: "Share your finance question",
        },
        {
          id: "identity",
          title: "Residency Planning",
          body: "I only discuss the following locations, with a focus on skilled migration:",
          details: [],
          subtopics: [
            {
              title: "Hong Kong, China",
              body: "TTPS Category A",
            },
            { title: "Canada" },
            { title: "Singapore" },
            { title: "Australia" },
          ],
          cta: "Share your residency planning needs",
        },
      ],
    },
    training: {
      eyebrow: "AI Training",
      intro: "Bring a real task or product idea. We clarify your starting point and goals, then agree on the content and pace.",
      price: "HKD 700 / hour · RMB 600 / hour",
      cards: [
        {
          id: "ai-usage",
          title: "How to Use AI",
          body: "Learn and practise AI use, from the basics to more advanced applications, around the tasks you want to complete.",
          cta: "Share your AI learning goals",
        },
        {
          id: "product",
          title: "How to Build Products",
          body: "Start by understanding problems and user needs, then learn how to turn an idea into a product and develop your skills further.",
          cta: "Share your product learning goals",
        },
      ],
      formats: ["Online: one-to-one only", "In person: one-to-one or one-to-two", "Same rates online and in person"],
      note: "",
    },
    products: {
      eyebrow: "AI Products",
      title: "What I'm building.",
      intro: "Open the products below to try them.",
      cards: [
        { title: "AI Education", body: "AI products for grammar and speaking practice.", status: "Available to try" },
        { title: "猫伴 · Mao Ban", body: "", status: "Available to try" },
        {
          title: "AI Household Finance Management",
          body: "Tools for household assets and investment decisions.",
          status: "Available to try",
        },
      ],
    },
    about: {
      eyebrow: "About Me",
      title: "Ran Zou / 邹燃",
      role: "Product & Digital Transformation Practitioner",
      intro:
        "I have 17 years of internet product and digital transformation experience at Alibaba, working on product planning, cross-team project management and commercial delivery. This site shares what I'm working on and gives people with specific questions a way to reach me.",
      resumeTitle: "Want to know my full background?",
      resumeBody: "I can share my résumé after you explain your purpose and I verify your identity.",
      resumeCta: "Request my full background",
      accounts: [
        { label: "Xiaohongshu", value: "月以煜乎夜" },
        { label: "WeChat Official Account", value: "月以煜乎夜" },
        { label: "X", value: "rance11", href: "https://x.com/rance11" },
        { label: "GitHub", value: "rance811-maker", href: "https://github.com/rance811-maker" },
        { label: "Email", value: "rance811@gmail.com", href: "mailto:rance811@gmail.com" },
      ],
    },
    faqs: {
      title: "Before we begin.",
      items: [
        {
          question: "How are fees confirmed?",
          answer:
            "Personal consulting, AI usage training and product training all cost HKD 700 or RMB 600 per hour. Enterprise AI work is quoted by project. Scope, duration, currency and fees are confirmed before we begin.",
        },
        {
          question: "Does submitting a request book a session?",
          answer:
            "No. Sharing your needs is a free first step to see whether we're a good fit. It does not automatically charge you or confirm a booking. We agree on scope, timing and fees before arranging consulting or training.",
        },
        {
          question: "How are training sessions delivered?",
          answer:
            "Share your starting point and goals. Online sessions are one-to-one only. In-person sessions can be one-to-one or one-to-two. The same rate applies online and in person: HKD 700 or RMB 600 per hour.",
        },
        {
          question: "Can I download your résumé directly?",
          answer: "Please explain your purpose and provide information that allows me to verify your identity. I can then share my résumé.",
        },
      ],
    },
    contact: {
      eyebrow: "Start a Conversation",
      title: "What would you like to work through?",
      body: "You don't need a complete brief. Choose a topic, share your background and question, and tell me what you hope to move forward.",
      steps: ["Choose a consulting or learning topic", "Share your background, question and goals", "Agree on scope, timing and fees"],
      cta: "Share your consultation needs",
      note: "Submitting a request is free and does not automatically charge you or confirm a booking.",
      emailLabel: "You can also email me directly",
    },
    footer: {
      name: "Ran Zou / 邹燃",
      tag: "AI · Product · Personal Experience",
      rights: "All rights reserved.",
    },
  },
};
