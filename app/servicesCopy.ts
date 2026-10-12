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
      cta: string;
    }[];
  };
  training: {
    eyebrow: string;
    title: string;
    intro: string;
    cards: readonly {
      id: PersonalServiceId;
      title: string;
      body: string;
      price: string;
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
        "我能提供的，是工作与生活实践中的经验和判断。先把你的处境、困惑与期待的结果说清楚，我们再确认这次咨询聊什么。",
      price: "120 新币 / 小时 · 600 人民币 / 小时",
      note: "以下咨询按小时收费，具体时长与使用币种在开始前确认。",
      careerStages: ["应届生", "职场进阶", "团队管理者", "产品负责人一号位"],
      cards: [
        {
          id: "career",
          title: "职场与产品职业发展",
          body: "从第一份工作，到带团队、承担产品负责人职责，不同阶段聊不同的问题。",
          details: ["面试技巧与简历指点", "晋升与和老板相处", "团队管理与产品负责人角色"],
          cta: "说明职场问题",
        },
        {
          id: "talent",
          title: "香港高才通 A 类相关",
          body: "围绕办理、续签与实际成本，帮助你梳理有哪些事情要做，以及是否值得继续。",
          details: [
            "自己办理与自雇续签的经验交流",
            "公司注册、运营与审计相关事项梳理",
            "成本核算与是否继续的决策讨论",
          ],
          cta: "说明高才相关问题",
        },
        {
          id: "finance",
          title: "理财实践交流",
          body: "只聊我自己实践过的内容。你可以先说明问题，我会确认它是否在我的经验范围内。",
          details: ["梳理你的具体问题与目标", "交流亲自实践过的方法与经验", "讨论需要进一步核实的信息"],
          cta: "说明理财问题",
        },
        {
          id: "identity",
          title: "身份规划相关",
          body: "只围绕香港、加拿大和新加坡交流，结合你的家庭安排与实际目标讨论选择。",
          details: ["香港", "加拿大", "新加坡"],
          cta: "说明身份规划需求",
        },
      ],
    },
    training: {
      eyebrow: "AI 培训",
      title: "从小白到高阶，\n按你的起点来学。",
      intro: "可以从一个真实任务或产品想法开始。先了解你的基础与目标，再确定内容和节奏。",
      cards: [
        {
          id: "ai-usage",
          title: "怎么用 AI",
          body: "从入门使用到更进阶的应用，围绕你想完成的任务学习与练习。",
          price: "100 新币 / 小时 · 500 人民币 / 小时",
          cta: "说明 AI 学习需求",
        },
        {
          id: "product",
          title: "怎么做产品",
          body: "从理解问题与用户需求开始，学习如何把想法整理成产品，再逐步深入。",
          price: "120 新币 / 小时 · 600 人民币 / 小时",
          cta: "说明产品学习需求",
        },
      ],
      formats: ["线上：只接一对一", "线下：可接一对一、一对二", "线上线下一个价"],
      note: "一对二的具体费用、地点和课程安排，在开始前确认。",
    },
    products: {
      eyebrow: "AI 产品体验",
      title: "我正在做的产品。",
      intro: "陆续上新。体验入口开放后，会在这里更新。",
      cards: [
        { title: "AI 教育", body: "语法与口语学习相关的 AI 产品体验。", status: "陆续上新" },
        { title: "猫伴", body: "猫伴的产品体验与进展将在这里更新。", status: "陆续上新" },
        {
          title: "AI 家庭理财管理系统",
          body: "围绕家庭理财管理的 AI 产品体验。",
          status: "陆续上新",
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
            "个人咨询和「怎么做产品」培训为 120 新币 / 小时或 600 人民币 / 小时；「怎么用 AI」培训为 100 新币 / 小时或 500 人民币 / 小时。企业 AI 服务一单一议。具体范围、时长、币种与费用在开始前确认。",
        },
        {
          question: "提交需求后就算预约了吗？",
          answer:
            "还没有。提交需求是免费了解彼此是否匹配的第一步，不会自动收费或确认预约。双方先确认交流范围、时间与费用，再安排咨询或培训。",
        },
        {
          question: "培训适合什么基础，可以怎么上课？",
          answer:
            "从小白到高阶都可以先说明目标。线上只接一对一；线下可接一对一或一对二，线上线下一个价。一对二的具体费用与地点另行确认。",
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
        "I share experience and judgment drawn from my own work and life. Tell me about your situation, your question and the outcome you hope for, so we can agree on what to cover.",
      price: "SGD 120 / hour · RMB 600 / hour",
      note: "Consulting is charged by the hour. Duration and payment currency are confirmed before we begin.",
      careerStages: ["New graduates", "Career progression", "Team managers", "Head of Product"],
      cards: [
        {
          id: "career",
          title: "Career & Product Leadership",
          body: "From your first job to managing a team or taking on the Head of Product role, we focus on the questions relevant to your stage.",
          details: ["Interview skills and résumé feedback", "Promotion and working with your manager", "Team management and product leadership"],
          cta: "Share your career question",
        },
        {
          id: "talent",
          title: "Hong Kong Top Talent Pass Scheme (TTPS): Category A",
          body: "Discuss application, renewal and practical costs, so you can understand the work involved and decide whether to continue.",
          details: [
            "Experience with applying yourself and renewal through self-employment",
            "Company registration, operations and audit considerations",
            "Cost estimates and the decision to continue",
          ],
          cta: "Share your Talent Pass question",
        },
        {
          id: "finance",
          title: "Personal Finance Experience",
          body: "I only cover approaches I have personally put into practice. Share your question first so I can confirm whether it falls within my experience.",
          details: ["Clarify your question and goals", "Discuss methods and lessons from personal practice", "Identify information that needs further checking"],
          cta: "Share your finance question",
        },
        {
          id: "identity",
          title: "Residency Planning",
          body: "I only discuss Hong Kong, Canada and Singapore, considering your family plans and practical goals.",
          details: ["Hong Kong", "Canada", "Singapore"],
          cta: "Share your residency planning needs",
        },
      ],
    },
    training: {
      eyebrow: "AI Training",
      title: "From beginner to advanced,\nstart where you are.",
      intro: "Bring a real task or product idea. We clarify your starting point and goals, then agree on the content and pace.",
      cards: [
        {
          id: "ai-usage",
          title: "How to Use AI",
          body: "Learn and practise AI use, from the basics to more advanced applications, around the tasks you want to complete.",
          price: "SGD 100 / hour · RMB 500 / hour",
          cta: "Share your AI learning goals",
        },
        {
          id: "product",
          title: "How to Build Products",
          body: "Start by understanding problems and user needs, then learn how to turn an idea into a product and develop your skills further.",
          price: "SGD 120 / hour · RMB 600 / hour",
          cta: "Share your product learning goals",
        },
      ],
      formats: ["Online: one-to-one only", "In person: one-to-one or one-to-two", "Same rates online and in person"],
      note: "Fees for one-to-two sessions, location and lesson arrangements are confirmed before we begin.",
    },
    products: {
      eyebrow: "AI Products",
      title: "What I'm building.",
      intro: "Launching over time. Experience links will appear here when they are ready.",
      cards: [
        { title: "AI Education", body: "AI products for grammar and speaking practice.", status: "Coming soon" },
        { title: "猫伴 · Mao Ban", body: "Product progress and experience updates will appear here.", status: "Coming soon" },
        {
          title: "AI Household Finance Management",
          body: "An AI product focused on managing household finances.",
          status: "Coming soon",
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
            "Personal consulting and product training cost SGD 120 or RMB 600 per hour. AI usage training costs SGD 100 or RMB 500 per hour. Enterprise AI work is quoted by project. Scope, duration, currency and fees are confirmed before we begin.",
        },
        {
          question: "Does submitting a request book a session?",
          answer:
            "No. Sharing your needs is a free first step to see whether we're a good fit. It does not automatically charge you or confirm a booking. We agree on scope, timing and fees before arranging consulting or training.",
        },
        {
          question: "Who is training for, and how are sessions delivered?",
          answer:
            "Beginners and advanced learners can share their goals. Online sessions are one-to-one only. In-person sessions can be one-to-one or one-to-two, with the same rates online and in person. Fees and location for one-to-two sessions are confirmed separately.",
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
