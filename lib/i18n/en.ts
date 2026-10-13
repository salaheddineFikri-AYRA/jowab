import type { Dictionary } from "./ar";

export const en: Dictionary = {
  meta: {
    title: "Jowab — AI that answers your customers in Arabic and English",
    description:
      "Jowab is a Gulf-built AI agent platform. We build voice and chat agents that answer every customer question across WhatsApp, voice, web chat, email, and ticketing — bilingual Arabic + English, plugged directly into your stack. Live in a week.",
    ogLocale: "en_US",
  },

  common: {
    brandName: "jowab",
    homeLabel: "Jowab home",
    bookDemo: "Book a demo",
    seeItAnswer: "See it answer",
    email: "contact@jowab.ai",
    demoSubject: "Jowab demo request",
    salesSubject: "Talk to Jowab sales",
    skipToContent: "Skip to content",
    agentName: "Jowab Agent",
    typing: "Jowab is typing…",
    language: {
      label: "Language",
      ar: "ع",
      en: "EN",
      arName: "العربية",
      enName: "English",
    },
  },

  nav: {
    label: "Main",
    product: "Product",
    integrations: "Integrations",
    pricing: "Pricing",
    faq: "FAQ",
  },

  brands: {
    whatsapp: "WhatsApp",
    instagram: "Instagram",
    messenger: "Messenger",
    telegram: "Telegram",
    meta: "Meta",
    salla: "Salla",
    foodics: "Foodics",
    zoho: "Zoho CRM",
    bayzat: "Bayzat",
    tally: "Tally",
    quickbooks: "QuickBooks",
    salesforce: "Salesforce",
    hubspot: "HubSpot",
    zendesk: "Zendesk",
    freshdesk: "Freshdesk",
    linkedin: "LinkedIn",
  },

  channels: {
    whatsapp: "WhatsApp",
    voice: "Phone calls",
    web: "Web chat",
    email: "Email",
    instagram: "Instagram",
    messenger: "Messenger",
    telegram: "Telegram",
    sms: "SMS",
  },

  hero: {
    headline: "Never miss a customer answer again.",
    highlight: "answer",
    subheadline:
      "Jowab's AI agents reply on WhatsApp, voice, chat, and email — bilingual, instant, and plugged straight into your stack.",
    proofRated: "Top Rated on Upwork",
    proofProjects: "50+ projects delivered",
    trustLine: "Built in the Gulf, for Gulf operators.",
    tablistLabel: "Jowab channels",
    windowLabel: "Jowab window, view:",
    surfaces: {
      whatsapp: {
        label: "WhatsApp",
        caption: "Answers on WhatsApp in seconds, with order status pulled live from Salla.",
      },
      voice: {
        label: "Call",
        caption:
          "Real Arabic voice agents that answer your phones and book appointments — Khaleeji, Hejazi, Egyptian, and English.",
      },
      web: {
        label: "Web chat",
        caption:
          "Code-switched Arabic + English in the same message. Order pulled in real time. Zero handoff to a human.",
      },
      email: {
        label: "Email",
        caption: "Pulls the order, invoice, or booking live from your stack, and replies before you open your inbox.",
      },
      actions: {
        label: "Actions",
        caption:
          "Updates orders, pulls invoices, books deliveries, closes tickets. The same things your team does, around the clock.",
      },
    },
  },

  heroPhone: {
    statusTime: "9:41",
    whatsapp: {
      business: "Oud Riyadh",
      businessMeta: "Business account",
      typing: "typing…",
      unread: "24",
      today: "Today",
      notice:
        "This business uses a secure service from Meta to manage this chat. Tap to learn more.",
      customer1: "Hi, where is my order? Order #4827",
      agent1:
        "Hi! Your order is on the way 🚚 Expected arrival is 4:00 PM. Should I send you the tracking link?",
      customer2: "Yes please, thank you",
      agent2: "Here you go. It arrives today by 4:00 PM 🚚",
      link: "Track order #4827",
      linkMeta: "oud-riyadh.salla.sa",
      time1: "9:41 PM",
      time2: "9:42 PM",
      input: "",
    },
    voice: {
      business: "Ibtisama Clinic",
      status: "Answered by Jowab",
      you: "You",
      captions: "Live Captions · Answered by Jowab",
      lines: [
        { who: "you", text: "هلا، أبي أحجز موعد تنظيف أسنان بكرة الصبح لو فيه" },
        { who: "agent", text: "Of course! Tomorrow at 10 AM is open with Dr. Sara. Shall I book it?" },
        { who: "you", text: "Perfect، ثبّته باسم نورة" },
      ],
      dialects: { khaleeji: "Khaleeji", english: "English", egyptian: "Egyptian" },
      booked: "Ibtisama Clinic · Appointment",
      bookedValue: "Sun · 10:00 AM",
      bookedDetail: "Dr. Sara · Dental cleaning",
      bookedBy: "Booked by Jowab",
      controls: ["Speaker", "FaceTime", "Mute", "More", "End", "Keypad"],
    },
    web: {
      url: "lamsa-boutique.com",
      store: "Lamsa Boutique",
      widget: "Online · replies instantly",
      customer1: "حابة أرجع الأوردر اللي وصلني أمس، الـsize مو مظبوط",
      agent1: "أكيد، شفت الطلب رقم #5130. حابة استبدال أو استرجاع كامل؟",
      quick: ["Exchange size", "Full refund"],
      customer2: "Exchange for a size M please",
      agent2: "Done ✓ I created an exchange for size M. The courier picks it up tomorrow.",
      input: "Message",
    },
    email: {
      back: "Inbox",
      subject: "Copy of the March invoice",
      fromName: "Nakhla Supplies",
      fromInitials: "NS",
      to: "To: Khalid Al Otaibi",
      time: "10:12 AM",
      reply:
        "Hi Khalid, attached is a copy of the March invoice (INV-2041), including our VAT number. If you need a full statement, I can send it right away.",
      signature: "Jowab · Nakhla Supplies assistant",
      attachment: "INV-2041.pdf",
      attachmentMeta: "84 KB",
      quoteAuthor: "Khalid Al Otaibi wrote:",
      quote: "Good morning, we need a copy of the March invoice for accounting, with your VAT number please.",
    },
    actions: {
      carrier: "stc",
      date: "Monday, October 12",
      notifications: [
        { title: "Delivery for order #4827 moved to tomorrow, 2 PM", time: "now" },
        { title: "Table for 4 booked tonight at 9 PM", time: "4m ago" },
        { title: "New lead added: Al Rayyan Trading Co.", time: "11m ago" },
        { title: "Noura was told she has 12 days of leave left", time: "18m ago" },
        { title: "Ticket #10293 resolved and closed", time: "26m ago" },
      ],
      by: "Jowab",
    },
  },

  problem: {
    eyebrow: "The problem",
    headline: "Every missed message is lost revenue.",
    subheadline: "In Arabic, in English, on WhatsApp, on the phone — and especially after midnight.",
    pains: [
      "4 in 10 messages go unanswered after working hours.",
      "Replies come slow, in the wrong language, or miss the context.",
      "Staff can't see the order, invoice, or booking fast enough to help.",
    ],
    solution:
      "Jowab answers all of them. Same brain, every channel, in the language your customer actually wrote in.",
    without: "Without Jowab",
    with: "With Jowab",
    toggleLabel: "Compare a full day of messages",
    stats: [
      { value: "4 in 10", label: "messages missed after hours" },
      { value: "6", label: "answered slow or wrong" },
      { value: "24/7", label: "Jowab answers them all" },
    ],
    dial: {
      label: "A full day of customer messages across 24 hours",
      hours: ["12 AM", "6 AM", "12 PM", "6 PM"],
      workHours: "Working hours",
      missed: "Missed",
      slow: "Slow reply",
      answered: "Answered",
      of: "of",
    },
  },

  features: {
    eyebrow: "Why Jowab",
    headline: "Built for operators, not engineers.",
    subheadline: "The outcomes that matter — without the cost, the complexity, or the wait.",
    items: {
      speed: {
        title: "Answers in seconds",
        body: "Every message answered in seconds, around the clock.",
      },
      channels: {
        title: "Same brain, every channel",
        body: "WhatsApp, calls, web chat, email, Instagram, Messenger, and Telegram — one agent answers them all.",
      },
      dialects: {
        title: "Bilingual by default",
        body: "Arabic and English in the same conversation, dialect-aware and culturally fluent.",
      },
      actions: {
        title: "Acts, not just reads",
        body: "Updates orders, pulls invoices, books deliveries, closes tickets.",
      },
      residency: {
        title: "Your data, secured",
        body: "Regional data residency (KSA + UAE) and encryption built in from the start.",
      },
      handoff: {
        title: "Hands off when it should",
        body: "Answers what it can and hands off to your team the moment a human is needed.",
      },
    },
    keyboard: {
      typing: "Customer is typing",
      replied: "Jowab replied in",
      unit: "s",
    },
    channel: {
      incoming: "Incoming from",
      live: "Live",
    },
    dialect: {
      speaker: "Speaker",
      footer: "Replies in the dialect the customer wrote in",
      rows: [
        { dialect: "Khaleeji", text: "وش صار على طلبي؟" },
        { dialect: "Egyptian", text: "ممكن أغيّر الميعاد؟" },
        { dialect: "English", text: "Can I pay on delivery?" },
      ],
    },
    actions: {
      title: "Actions from this chat",
      progress: "{done} of {total} done",
      tasks: [
        { text: "Move delivery to tomorrow 2 PM", meta: "Salla · #4827" },
        { text: "Send a copy of the March invoice", meta: "Zoho · INV-2041" },
        { text: "Book Sunday 10 AM", meta: "Calendar · Dr. Sara" },
      ],
    },
    residency: {
      store: "Your store",
      region: "Riyadh · Dubai",
      outside: "Outside the region",
      sent: "Data that left the Gulf",
      sentValue: "0 bytes",
      training: "Shared models trained on your data",
      trainingValue: "Never",
    },
    handoff: {
      message: "Can I talk to a person please?",
      to: "Handed to",
      agent: "Noura · Support team",
      initial: "N",
      context: ["Order #4827", "Wants a size exchange", "Khaleeji · in a hurry"],
      footer: "Full context moved over. The customer repeats nothing.",
    },
  },

  steps: {
    eyebrow: "Onboarding",
    headline: "From signed contract to live agent in 7 days.",
    subheadline: "Not months. Not quarters. A week.",
    items: [
      {
        title: "Connect your channels",
        body: "WhatsApp, calls, web chat, email, Zendesk, Freshdesk — plug in what you already use.",
      },
      {
        title: "Connect your stack",
        body: "Salla, Zoho, Bayzat, or your custom API. Jowab reads orders, customers, menus, and bookings directly.",
      },
      {
        title: "Train and ship",
        body: "We tune the agent on your historical conversations and your tone of voice. You approve. It goes live.",
      },
    ],
    connect: {
      placeholder: "Your store URL",
      url: "oud-riyadh.salla.sa",
      connected: "Connected",
    },
    train: {
      working: "Getting ready",
      ready: "Agent ready",
      rows: ["Trained on 3,200 past conversations", "Tuned to your brand's tone", "You approve, it goes live"],
    },
    days: {
      label: "Onboarding week",
      day: "Day {n}",
      launch: "Launch",
    },
  },

  devices: {
    headline: "Every answer. Every channel.",
    subheadline: "Built in the Gulf, for Gulf operators.",
    cards: {
      web: {
        title: "Web chat in your store",
        body: "Answers shoppers while they browse, with stock and delivery pulled live from Salla.",
        alt: "A laptop showing the Oud Riyadh store with the Jowab chat widget open.",
      },
      social: {
        title: "Instagram and Messenger",
        body: "Answers Instagram and Messenger DMs with the same brain and the same dialect, with products and prices pulled live from your store.",
        alt: "A phone showing an Instagram chat with Oud Riyadh about a perfume size and price.",
      },
      voice: {
        title: "Calls in a real Arabic voice",
        body: "Answers calls 24/7, books appointments straight into your calendar, and hands off when needed.",
        alt: "An iPad at a clinic front desk showing a call answered by Jowab and a booking confirmation.",
      },
    },
    laptop: {
      url: "oud-riyadh.com",
      store: "Oud Riyadh",
      nav: ["Perfumes", "Bakhoor", "Gifts"],
      badge: "Best seller",
      product: "Royal oud oil",
      size: "12 ml · Cambodian",
      price: "SAR 240",
      add: "Add to bag",
      widget: "Jowab · online",
      question: "Do you deliver in Riyadh today?",
      answer: "Yes, order before 5 PM and it arrives tonight 🚚",
      input: "Type a message...",
    },
    phone: {
      time: "9:41",
      store: "Oud Riyadh",
      handle: "oud.riyadh",
      active: "Active now",
      story: "Replied to your story",
      m1: "Do you have this one in a smaller size?",
      m2: "Yes, it comes in 6 ml for SAR 130. Want the order link?",
      m3: "Yes please 🙏",
      link: "Royal oud oil · 6 ml",
      linkMeta: "Salla · SAR 130",
      seen: "Seen",
      input: "Message...",
    },
    tablet: {
      clinic: "Ibtisama Clinic",
      desk: "Front desk · Today",
      incoming: "Incoming call · Jowab answering",
      caller: "+966 5•• ••• 214",
      duration: "00:42",
      lines: [
        { who: "caller", text: "أبي موعد تنظيف بكرة الصبح" },
        { who: "agent", text: "10 AM is open with Dr. Sara. Book it?" },
        { who: "caller", text: "Perfect، باسم نورة" },
      ],
      booked: "Booked",
      slot: "Sunday · 10:00 AM · Dr. Sara",
      confirm: "Confirmation sent on WhatsApp",
      queueTitle: "Today's calls",
      queue: [
        { name: "New booking", time: "9:10 AM" },
        { name: "Rescheduled", time: "9:45 AM" },
      ],
    },
  },

  industries: {
    eyebrow: "Who it's for",
    headline: "Built for the businesses that live on messages.",
    subheadline:
      "If your customers reach you on WhatsApp, call your front desk, or DM you at midnight — Jowab answers.",
    listLabel: "Industries Jowab serves",
    link: "Don't see your industry? Talk to us",
    items: {
      ecommerce: {
        business: "Oud Riyadh",
        result: "Order status from Salla",
        title: "E-commerce",
        description: "Order status, returns, and product questions — pulled live from Salla.",
        q: "Where's my order? #4827",
        a: "On the way 🚚 arriving 4 PM",
      },
      restaurants: {
        business: "Najd Grill",
        result: "Table booked in Foodics",
        title: "Restaurants & cafés",
        description: "Reservations, menus, and delivery updates across WhatsApp and calls.",
        q: "Table for 4 tonight?",
        a: "Yes, 9 PM is free. Book it?",
      },
      clinics: {
        business: "Ibtisama Clinic",
        result: "Appointment moved in the calendar",
        title: "Clinics & dental",
        description: "Books, reschedules, and confirms appointments — and chases the no-shows.",
        q: "Can I move tomorrow's visit?",
        a: "Done ✅ now Sunday 10 AM",
      },
      realestate: {
        business: "Malqa Homes",
        result: "Lead saved in HubSpot",
        title: "Real estate",
        description: "Qualifies leads, books viewings, and answers listing questions instantly.",
        q: "Is the Malqa flat still free?",
        a: "It is. Viewing tomorrow 5 PM?",
      },
      hr: {
        business: "Al Rayyan Group",
        result: "Balance pulled from Bayzat",
        title: "HR & operations",
        description: "Answers staff on leave, payroll, and policy — wired into Bayzat.",
        q: "How much leave do I have?",
        a: "12 days left, per Bayzat",
      },
      salons: {
        business: "Reem Salon",
        result: "Slot booked",
        title: "Salons & gyms",
        description: "Salons and gyms — every booking handled, day or night.",
        q: "Any slot Thursday evening?",
        a: "Thursday 7 PM is open. Book?",
      },
      tours: {
        business: "AlUla Trips",
        result: "Seats updated live",
        title: "Tour operators",
        description: "Tour operators — every booking and question handled, day or night.",
        q: "When is the next AlUla trip?",
        a: "Friday, 4 seats left",
      },
    },
  },

  pricing: {
    eyebrow: "Pricing",
    headline: "Transparent pricing. Built for operators.",
    subheadline: "Three plans. Pick one. Ship in a week.",
    slider: {
      label: "How many conversations a month?",
      unit: "conversations / month",
      fit: "Best fit",
    },
    amount: "AED {amount}",
    period: "/ month",
    custom: "Custom",
    tiers: {
      starter: {
        name: "Starter",
        badge: "",
        description: "Best for SMBs starting one channel.",
        lead: "",
        features: [
          "1 channel (WhatsApp OR voice OR web chat)",
          "Up to 1,000 conversations / month",
          "2 integrations (Salla, Foodics, etc.)",
          "Bilingual Arabic + English",
          "Email support",
          "Setup in 7 days",
        ],
        cta: "Start with Starter",
      },
      growth: {
        name: "Growth",
        badge: "Most popular",
        description: "For operators running multi-channel.",
        lead: "Everything in Starter, plus:",
        features: [
          "Unlimited channels",
          "Up to 10,000 conversations / month",
          "Unlimited integrations",
          "Voice agents included",
          "Custom agent training on your data",
          "Priority support (4-hour response)",
          "Analytics dashboard",
        ],
        cta: "Start with Growth",
      },
      enterprise: {
        name: "Enterprise",
        badge: "",
        description: "For chains, franchises, and large teams.",
        lead: "Everything in Growth, plus:",
        features: [
          "Unlimited conversations",
          "Dedicated customer success manager",
          "99.95% uptime SLA",
          "MENA data residency (KSA / UAE)",
          "Custom integrations + private API access",
          "Single Sign-On (SSO)",
          "Quarterly business reviews",
        ],
        cta: "Talk to sales",
      },
    },
  },

  comparison: {
    eyebrow: "The honest comparison",
    headline: "Jowab vs. the alternatives.",
    subheadline: "How Jowab compares to the two options most operators weigh up.",
    highlight: "Most picked",
    columns: {
      jowab: "Jowab",
      hiring: "Hiring a team",
      generic: "Generic chatbot",
    },
    rows: {
      availability: {
        label: "Answers 24/7",
        jowab: "Always on",
        hiring: "Working hours",
        generic: "Always on",
      },
      arabic: {
        label: "Native Arabic + dialects",
        jowab: "Khaleeji, Hejazi, Egyptian",
        hiring: "Depends on who you hire",
        generic: "Translated, misses dialects",
      },
      speed: {
        label: "Reply speed",
        jowab: "~1.2 seconds",
        hiring: "Minutes to hours",
        generic: "Instant",
      },
      actions: {
        label: "Acts on your stack",
        jowab: "Orders, invoices, bookings",
        hiring: "Yes",
        generic: "Chat only",
      },
      setup: {
        label: "Time to launch",
        jowab: "7 days, done for you",
        hiring: "Weeks to hire & train",
        generic: "Days, DIY",
      },
      cost: {
        label: "Cost to scale",
        jowab: "Pay per use",
        hiring: "Salaries + overhead",
        generic: "Low, but limited",
      },
    },
  },

  faq: {
    eyebrow: "FAQ",
    headline: "Questions, answered.",
    subheadline: "Everything you need to know before you book a demo.",
    items: [
      {
        question: "Which languages and dialects does Jowab support?",
        answer:
          "Modern Standard Arabic plus Khaleeji, Hejazi, and Egyptian dialects, and English — including code-switching within the same message or call.",
      },
      {
        question: "What can Jowab connect to?",
        answer:
          "WhatsApp, web chat, phone calls, email, Instagram, Messenger, and ticketing tools like Zendesk — plus platforms like Salla, Foodics, Zoho, and Bayzat, or your own API.",
      },
      {
        question: "How long does setup take?",
        answer:
          "Most agents go from signed contract to live in about seven days. We connect your channels, plug into your stack, and train on your past conversations.",
      },
      {
        question: "Is my data secure?",
        answer:
          "Yes. We use regional data residency (KSA + UAE) and encryption, and your data is never used to train shared models.",
      },
      {
        question: "How does pricing work?",
        answer:
          "Pricing depends on your channels and volume. Book a demo and we'll send a tailored quote once we understand your setup.",
      },
      {
        question: "Can it hand off to a human?",
        answer:
          "Always. Jowab answers what it can and hands off to your team the moment a human is needed.",
      },
    ],
  },

  cta: {
    eyebrow: "Every answer. Every channel.",
    headline: "Built to answer.",
    subheadline: "One agent. Every channel. In Arabic and English. Live in a week.",
    trust: ["Hosted in KSA and the UAE", "Encryption built in", "Top Rated on Upwork"],
    countriesLabel: "Gulf countries we serve",
    countries: {
      sa: "Saudi Arabia",
      ae: "UAE",
      kw: "Kuwait",
      qa: "Qatar",
      bh: "Bahrain",
      om: "Oman",
    },
    reviews: {
      label: "Client reviews",
      via: "via Upwork",
      rating: "Rated 5 out of 5",
      projects: "50+ projects delivered",
      quotes: [
        {
          text: "Delivered exactly what we needed, communicated clearly the whole way, and shipped on time. One of the best teams we've worked with.",
          author: "M. A.",
          role: "Founder, E-commerce",
        },
        {
          text: "Fast, professional, and the quality was excellent. The agent handles Arabic and English flawlessly.",
          author: "K. R.",
          role: "Operations Lead",
        },
        {
          text: "Understood the brief immediately and went above and beyond. Smooth from start to finish — will hire again.",
          author: "S. H.",
          role: "Product Manager",
        },
      ],
    },
  },

  integrations: {
    eyebrow: "Integrations",
    headline: "Plugs into the platforms you already pay for",
    subheadline: "Native integrations with the tools MENA businesses actually run on.",
    cta: "Don't see your tool? Talk to us",
  },

  footer: {
    tagline: "Built to answer.",
    madeIn: "Built in the Gulf, for the operators who built the Gulf.",
    copyright: "© 2026 Jowab. All rights reserved.",
    contactTitle: "Contact",
    columns: [
      {
        title: "Product",
        links: [
          { label: "Voice Agents", href: "#features" },
          { label: "Integration Agents", href: "#integrations" },
          { label: "Pricing", href: "#pricing" },
          { label: "FAQ", href: "#faq" },
        ],
      },
      {
        title: "Solutions",
        links: [
          { label: "E-commerce (Salla)", href: "#industries" },
          { label: "Restaurants", href: "#industries" },
          { label: "HR & Operations (Bayzat)", href: "#industries" },
          { label: "Accounting (Tally / QuickBooks)", href: "#integrations" },
        ],
      },
      {
        title: "Trust",
        links: [
          { label: "Data residency (KSA + UAE)", href: "#faq" },
          { label: "The honest comparison", href: "#comparison" },
          { label: "Client reviews", href: "#reviews" },
        ],
      },
    ],
  },
};
