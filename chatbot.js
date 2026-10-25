/**
 * SIVANESAN B - RESUME & PORTFOLIO AI ASSISTANT (ROVISA 2.0)
 * Dual-Engine: Instant On-Device Semantic Knowledge Engine + Netlify Groq Llama-3.3 Fallback
 * Strictly Grounded on Sivanesan's Resume, IEEE Publications, FDE Experience & Projects.
 */

const SIVA_RESUME_KNOWLEDGE = {
  name: "Sivanesan B",
  title: "AI/ML Engineer & Forward Deployed Engineer (FDE)",
  location: "Coimbatore, Tamil Nadu, India",
  availability: "Immediate Joining (Ready to start immediately / 0 days notice)",
  currentLocation: "Coimbatore, Tamil Nadu, India",
  relocationLocations: ["Coimbatore", "Chennai", "Bengaluru (Bangalore)", "Hyderabad", "Remote (Worldwide)"],
  targetRoles: [
    "Forward Deployed Engineer (FDE)",
    "Generative AI Engineer (GenAI)",
    "AI/ML Engineer",
    "LLM & Agentic AI Specialist",
    "Full-Stack AI Engineer"
  ],
  email: "apsiva69@gmail.com",
  phone: "+91-8438692752",
  github: "https://github.com/Sivanesanbalu",
  linkedin: "https://www.linkedin.com/in/sivanesan-b-871ba7264",
  portfolio: "https://sivanesan.tech",
  resumeUrl: "assets/Sivanesan_B.pdf",

  profileSummary: `AI/ML Engineer with hands-on experience in Machine Learning, Deep Learning, Generative AI, Large Language Models (LLMs), Retrieval-Augmented Generation (RAG), Agentic AI, and AI agent development. Currently working as a GenAI Executive & Forward Deployed Engineer at Nunes Instruments, building AI-powered applications and business automation solutions. IEEE-published researcher in carbon-efficient LLM inference (58% CO2 reduction, 56% faster inference), with experience in model optimization, computer vision, NLP, and end-to-end AI application development.`,

  experience: [
    {
      company: "Nunes Instruments",
      role: "GenAI Executive & Forward Deployed Engineer (FDE)",
      period: "Aug 2026 – Present",
      location: "Coimbatore, India",
      highlights: [
        "Develop and integrate LLM-powered applications, AI agents, and Retrieval-Augmented Generation (RAG) workflows to automate business processes.",
        "Engineer AI-driven document processing, information extraction, and classification workflows using prompt engineering and REST API integration.",
        "Built a Flask-based WhatsApp business-intelligence dashboard that turns chat exports into searchable insights.",
        "Automated ERP-based Excel reporting in Python, replacing manual daily report preparation and saving hours of administrative overhead daily.",
        "Engineered the NUNES AI Live Call Translator (Tamil ↔ Hindi) for real-time multilingual enterprise communication."
      ]
    },
    {
      company: "Forge Innovation & Ventures",
      role: "Innovation Engineer Trainee",
      period: "Jan 2025 – Jul 2025",
      location: "Coimbatore, India",
      highlights: [
        "Developed an offline voice-enabled AI inventory assistant using Whisper STT and a quantized local LLM.",
        "Integrated FAISS semantic search with on-device inference for context-aware stock retrieval without internet.",
        "Reduced stock lookup times by 45% across pilot warehouse deployments."
      ]
    }
  ],

  research: {
    title: "Eco-Transformers: Carbon-Efficient and Accelerated Inference through Self-Pruning and Activation Freezing in LLMs",
    conference: "3rd International Conference on Next Generation Computing Systems (IEEE ICNGCS 2025)",
    publisher: "IEEE",
    date: "August 2025",
    doi: "10.1109/ICNGCS64900.2025.11183217",
    doiUrl: "https://doi.org/10.1109/ICNGCS64900.2025.11183217",
    award: "Best Final Year Project Award from KCT AI & DS Department",
    metrics: "58% CO2 emission reduction and 56% faster inference across Falcon-RW-1B, GPT-Neo-1.3B, OPT-1.3B, and GPT2-XL using PyTorch forward hooks without retraining."
  },

  education: [
    {
      degree: "B.Tech in Artificial Intelligence and Data Science (Lateral Entry)",
      institution: "Kumaraguru College of Technology (KCT), Coimbatore",
      period: "2023 – 2026",
      cgpa: "8.02 / 10.0",
      award: "Best Final Year Project Award (Eco-Transformers)"
    },
    {
      degree: "Diploma in Computer Engineering",
      institution: "Tamilnadu Government Polytechnic College, Madurai",
      period: "2020 – 2023",
      cgpa: "8.0 / 10.0"
    }
  ],

  top10Projects: [
    {
      name: "NUNES AI Live Call Translator (Tamil ↔ Hindi)",
      category: "Voice AI & Forward Deployed Engineering",
      tech: "Kotlin, Jetpack Compose, Plivo Voice API, Sarvam AI, Node.js, TypeScript, Fastify, WebSocket, PostgreSQL",
      summary: "AI-powered real-time Tamil↔Hindi bidirectional voice call translation system with live transcripts, contact sync, and low-latency audio streaming.",
      github: "https://github.com/Sivanesanbalu/Live_Phone_Call_Translate"
    },
    {
      name: "AI Book Scanner APK",
      category: "Computer Vision & Edge API",
      tech: "Flutter, Firebase, FastAPI, PyTorch, ConvNeXt, FAISS, VLM, LLM",
      summary: "Fine-tuned ConvNeXt vision app achieving 92% detection accuracy across 1,000+ test images with a FastAPI inference backend serving 100+ concurrent users with FAISS semantic retrieval.",
      github: "https://github.com/Sivanesanbalu/AI-Book-Scanner-APK"
    },
    {
      name: "WhatsApp BI & Automated ERP Reporting",
      category: "Enterprise Automation (Nunes Instruments)",
      tech: "Python, Flask, Prompt Engineering, SQLite, REST APIs, openpyxl",
      summary: "Flask dashboard transforming raw WhatsApp chat exports into actionable BI metrics, plus automated daily Python ERP Excel reporting.",
      github: "https://github.com/Sivanesanbalu"
    },
    {
      name: "Offline Voice AI Inventory Assistant",
      category: "Edge AI & Speech (Forge Innovation)",
      tech: "Python, Whisper STT, Quantized Local LLM, FAISS, RAG, On-Device Inference",
      summary: "100% offline, privacy-preserving voice assistant running on edge hardware for warehouse inventory queries without internet (slashed lookup by 45%).",
      github: "https://github.com/Sivanesanbalu"
    },
    {
      name: "TestPilot AI",
      category: "Agentic AI & Autonomous QA",
      tech: "Python, LangChain, LangGraph, Groq Llama-3, PostgreSQL",
      summary: "Autonomous AI software test engineer performing automated UI, API, accessibility, and security testing suites with root cause failure diagnosis.",
      github: "https://github.com/Sivanesanbalu/TestPilot_AI"
    },
    {
      name: "AI Recruiter (Voice Interviewer & Proctor)",
      category: "Voice AI & Computer Vision",
      tech: "Next.js, Vapi AI, OpenRouter API, Supabase, BlazeFace CV, WebRTC",
      summary: "Real-time dynamic voice interview screening platform evaluated across 50+ sessions, reducing hiring time by 70% with 30 FPS <50ms face mesh proctoring.",
      github: "https://github.com/Sivanesanbalu/AI-Recruiter"
    },
    {
      name: "AI Multi-Tenant CRM Engine",
      category: "Enterprise SaaS & Agentic RAG",
      tech: "Fastify, TypeScript, PostgreSQL, Groq Llama-3, Multi-Tenant RAG",
      summary: "Scalable multi-tenant architecture with tenant-isolated knowledge bases, customer journey automations, and intelligent lead scoring.",
      github: "https://github.com/Sivanesanbalu"
    },
    {
      name: "Real-Time Sign Language Translator",
      category: "Computer Vision & Edge ML",
      tech: "MediaPipe Hands, PyTorch LSTM, OpenCV, Flask",
      summary: "Gesture recognition pipeline translating hand landmarks into spoken text and audio in real-time.",
      github: "https://github.com/Sivanesanbalu"
    },
    {
      name: "Real-Time Fall Detection System",
      category: "Computer Vision & Safety",
      tech: "YOLOv8-Pose, MobileNetV2, PyTorch, OpenCV",
      summary: "Multi-camera posture and velocity tracking for elderly care and industrial safety with automated alert dispatch.",
      github: "https://github.com/Sivanesanbalu"
    },
    {
      name: "Edge ML Face Mask Detection System",
      category: "Edge ML & Embedded Vision",
      tech: "MobileNetV2, OpenCV, TensorFlow Lite, Python",
      summary: "Lightweight 98.4% accuracy face mask detection running at 45+ FPS on resource-constrained embedded devices.",
      github: "https://github.com/Sivanesanbalu"
    }
  ],

  skills: {
    programming: ["Python", "SQL", "TypeScript", "Kotlin", "Dart/Flutter"],
    ai_ml: [
      "Machine Learning", "Deep Learning", "Natural Language Processing (NLP)",
      "Computer Vision", "Generative AI", "Agentic AI", "Large Language Models (LLMs)",
      "Vision-Language Models (VLMs)", "Retrieval-Augmented Generation (RAG)",
      "AI Agents", "Voice AI", "LLM Evaluation"
    ],
    fde: [
      "AI Solution Development", "Business Requirements Translation",
      "System Integration", "REST APIs", "AI Workflow Automation",
      "ERP Automation", "Model Deployment"
    ],
    frameworks: [
      "PyTorch", "TensorFlow", "Hugging Face Transformers", "LangChain",
      "LangGraph", "FastAPI", "Flask", "OpenAI API", "Pandas", "NumPy", "scikit-learn"
    ],
    llm_engineering: [
      "Prompt Engineering", "Fine-tuning", "LoRA", "QLoRA", "Embeddings",
      "Model Optimization", "Quantization", "FAISS", "ChromaDB", "Semantic Search"
    ],
    cloud_devops: [
      "Docker", "Google Cloud (GCP)", "AWS", "Firebase", "Supabase",
      "PostgreSQL", "SQLite", "Hugging Face Hub", "Git", "GitHub"
    ],
    certifications: [
      "IBM AI Engineering Professional Certificate",
      "AWS AI & ML Scholars (Udacity)"
    ]
  }
};

document.addEventListener('DOMContentLoaded', () => {
  initLottieBot();

  const triggerBtn = document.getElementById('chatbot-toggle');
  const chatWindow = document.getElementById('chatbot-window');
  const closeBtn = document.getElementById('chat-close');
  const sendBtn = document.getElementById('chat-send');
  const chatInput = document.getElementById('chat-input');
  const messagesContainer = document.getElementById('chat-messages');
  const suggestionChips = document.querySelectorAll('.suggestion-chip');

  if (!triggerBtn || !chatWindow) return;

  const toggleChat = () => {
    chatWindow.classList.toggle('open');
    if (chatWindow.classList.contains('open')) {
      if (chatInput) chatInput.focus();
    }
  };

  triggerBtn.addEventListener('click', toggleChat);

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      chatWindow.classList.remove('open');
    });
  }

  suggestionChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const query = chip.getAttribute('data-query') || chip.textContent;
      handleUserMessage(query);
    });
  });

  if (sendBtn) {
    sendBtn.addEventListener('click', () => {
      const val = chatInput.value.trim();
      if (val) handleUserMessage(val);
    });
  }

  if (chatInput) {
    chatInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const val = chatInput.value.trim();
        if (val) handleUserMessage(val);
      }
    });
  }

  async function handleUserMessage(text) {
    appendMessage(text, 'user');
    chatInput.value = '';

    // Create and show typing indicator
    const typingIndicator = createTypingIndicator();
    messagesContainer.appendChild(typingIndicator);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    let botResponse = null;

    // 1. Try Netlify Serverless Function (backed by Groq llama-3.3-70b-versatile)
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 4500);

      const res = await fetch('/.netlify/functions/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
        body: JSON.stringify({
          messages: [
            { role: 'user', content: text }
          ]
        })
      });
      clearTimeout(timeoutId);

      if (res.ok) {
        const data = await res.json();
        if (data && data.choices && data.choices[0] && data.choices[0].message) {
          botResponse = data.choices[0].message.content;
        }
      }
    } catch (err) {
      // Local preview or offline fallback
    }

    // 2. Intelligent On-Device Grounded Knowledge Engine fallback
    if (!botResponse) {
      botResponse = generateSmartAnswer(text);
    }

    typingIndicator.remove();
    appendMessage(botResponse, 'bot');
  }

  function appendMessage(text, sender) {
    const bubble = document.createElement('div');
    bubble.className = `msg-bubble ${sender}`;
    bubble.innerHTML = formatMarkdown(text);
    messagesContainer.appendChild(bubble);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  function createTypingIndicator() {
    const ind = document.createElement('div');
    ind.className = 'msg-bubble bot typing-indicator';
    ind.innerHTML = '<span></span><span></span><span></span>';
    return ind;
  }

  function formatMarkdown(str) {
    return str
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
      .replace(/\n/g, '<br>');
  }

  /**
   * COMPREHENSIVE ON-DEVICE RESUME KNOWLEDGE ENGINE
   * Maps user intents and keywords to grounded resume data.
   */
  function generateSmartAnswer(query) {
    const rawQ = query.toLowerCase().trim();
    // Strip trailing punctuation for clean keyword matching
    const q = rawQ.replace(/[?!.,;:()]/g, ' ').replace(/\s+/g, ' ').trim();

    // 0. GREETINGS & CASUAL INTERACTION
    if (
      q === 'hi' ||
      q === 'hello' ||
      q === 'hey' ||
      q.startsWith('hi ') ||
      q.startsWith('hello ') ||
      q.startsWith('hey ') ||
      q.includes('good morning') ||
      q.includes('good evening') ||
      q.includes('what can you do') ||
      q.includes('help')
    ) {
      return `👋 **Hello! I'm Siva AI Assistant.**\n\n` +
        `I am trained on Sivanesan's resume, IEEE research, and production code.\n\n` +
        `💼 **For Recruiters & Hiring Managers:**\n` +
        `• **Availability:** ⚡ **Immediate Joining** (0 days notice)\n` +
        `• **Locations:** Coimbatore | Open to relocate to **Chennai, Bengaluru, Hyderabad** | Remote\n` +
        `• **Focus Roles:** **Forward Deployed Engineer (FDE)**, **GenAI Engineer**, **AI/ML Engineer**\n\n` +
        `You can ask me anything about his background, or tap any quick suggestion above!`;
    }

    // 0A. IMMEDIATE JOINING & NOTICE PERIOD (RECRUITER PRIORITY)
    if (
      q.includes('immediate') ||
      q.includes('notice') ||
      q.includes('when can he join') ||
      q.includes('joining date') ||
      q.includes('start date') ||
      q.includes('join immediately') ||
      q.includes('join right away') ||
      q.includes('availability')
    ) {
      return `⚡ **Immediate Joining & Availability:**\n\n` +
        `• **Notice Period:** **IMMEDIATE JOINING (0 Days Notice)**\n` +
        `• **Status:** Sivanesan is available to join and start working on Day 1 without any transition delay.\n` +
        `• **Locations:** Coimbatore | Open to immediate relocation to **Chennai, Bengaluru (Bangalore), Hyderabad** | Or **Remote**.\n` +
        `• **Target Roles:** AI-related roles (Forward Deployed Engineer, GenAI, AI/ML, Agentic AI).\n\n` +
        `📞 *Ready to extend an offer or schedule a screening?* Call/WhatsApp him directly at [+91-8438692752](tel:+918438692752) or email [apsiva69@gmail.com](mailto:apsiva69@gmail.com).`;
    }

    // 0B. LOCATION & RELOCATION (COIMBATORE, CHENNAI, BENGALURU, HYDERABAD, REMOTE)
    if (
      q.includes('location') ||
      q.includes('relocat') ||
      q.includes('chennai') ||
      q.includes('bangalore') ||
      q.includes('bengaluru') ||
      q.includes('hyderabad') ||
      q.includes('coimbatore') ||
      q.includes('city') ||
      q.includes('cities') ||
      q.includes('where is he') ||
      q.includes('remote')
    ) {
      return `📍 **Location & Relocation Flexibility:**\n\n` +
        `• **Current Location:** Coimbatore, Tamil Nadu, India.\n` +
        `• **Immediate Relocation Available To:**\n` +
        `  - 🏙️ **Chennai**\n` +
        `  - 🏙️ **Bengaluru (Bangalore)**\n` +
        `  - 🏙️ **Hyderabad**\n` +
        `  - 🏙️ **Coimbatore** (Local)\n` +
        `• **Remote Work:** 100% equipped for full-time remote opportunities across Indian and global time zones (US, UK, Europe, APAC).\n` +
        `• **Joining Time:** **Immediate Joining** (0 days notice).`;
    }

    // 0C. TARGET AI ROLES (FDE, GENAI, AI/ML, LLM)
    if (
      q.includes('target role') ||
      q.includes('ai related') ||
      q.includes('what roles') ||
      q.includes('role is he looking for') ||
      q.includes('positions') ||
      q.includes('ai roles') ||
      q.includes('looking for') ||
      (q.includes('role') && (q.includes('open') || q.includes('target') || q.includes('interest') || q.includes('apply')))
    ) {
      return `🎯 **Target AI Roles for Sivanesan B:**\n\n` +
        `Sivanesan is targeting **AI-related engineering roles** where he can apply his research rigor and production deployment skills:\n\n` +
        `1. **Forward Deployed Engineer (FDE)** – Integrating enterprise AI, automating business workflows (ERP, WhatsApp BI, Voice VoIP).\n` +
        `2. **Generative AI Engineer (GenAI)** – Designing RAG architectures, LLM agents, prompt optimization, and fine-tuning (LoRA/QLoRA).\n` +
        `3. **AI/ML Engineer** – Developing PyTorch/TensorFlow models, model optimization (58% CO2 cut), and edge deployment.\n` +
        `4. **LLM & Agentic AI Specialist** – Building autonomous agents using LangChain, LangGraph, and vector databases (FAISS, ChromaDB).\n` +
        `5. **Full-Stack AI Developer** – FastAPI/Fastify APIs + WebSockets + Kotlin/Flutter mobile apps.\n\n` +
        `⚡ *Availability:* **Immediate Joining** in Coimbatore, Chennai, Bengaluru, Hyderabad, or Remote.`;
    }

    // 0D. RECRUITER MESSAGE & INTERVIEW INVITE (Takes priority over general screening)
    if (
      q.includes('message') ||
      q.includes('interview') ||
      q.includes('schedule') ||
      q.includes('invite') ||
      q.includes('book call') ||
      q.includes('send invite')
    ) {
      return `✉️ **Message Sivanesan & Schedule an Interview:**\n\n` +
        `You can connect with Sivanesan right away:\n\n` +
        `• 📧 **Email with Pre-filled Interview Request:**\n` +
        `  [Click to Email apsiva69@gmail.com](mailto:apsiva69@gmail.com?subject=Interview%20Invitation%20for%20Sivanesan%20B%20-%20AI%20Role&body=Hi%20Sivanesan,%0D%0A%0D%0AWe%20reviewed%20your%20portfolio%20and%20resume%20and%20would%20love%20to%20schedule%20a%20screening%20call%20with%20you%20for%20an%20AI%20role.%0D%0A%0D%0ACompany:%20%0D%0ARole:%20%0D%0APreferred%20Time:%20%0D%0A%0D%0ABest%20regards,)\n\n` +
        `• 💬 **Direct WhatsApp Message:**\n` +
        `  [Chat on WhatsApp (+91-8438692752)](https://wa.me/918438692752?text=Hi%20Sivanesan,%20I%20reviewed%20your%20portfolio%20and%20would%20like%20to%20connect%20with%20you%20regarding%20an%20AI%20engineering%20opportunity.)\n\n` +
        `• 📞 **Direct Phone Call:** [+91-8438692752](tel:+918438692752)\n` +
        `• 🔗 **LinkedIn:** [linkedin.com/in/sivanesan-b-871ba7264](https://www.linkedin.com/in/sivanesan-b-871ba7264)\n\n` +
        `*Notice Period:* **Immediate Joining** (0 days). Ready for interviews today!`;
    }

    // 0E. 1-MINUTE RECRUITER SCREENING CHEAT SHEET
    if (
      q.includes('recruiter') ||
      q.includes('fast screen') ||
      q.includes('screening') ||
      q.includes('candidate summary') ||
      q.includes('cheat sheet') ||
      q.includes('1-min') ||
      q.includes('1 min')
    ) {
      return `📋 **1-Minute Recruiter Fast Screen (Sivanesan B)**\n\n` +
        `• **Candidate:** Sivanesan B | AI/ML & Forward Deployed Engineer (FDE)\n` +
        `• **Availability:** ⚡ **IMMEDIATE JOINING** (0 Days Notice)\n` +
        `• **Locations:** Coimbatore | Open to relocate to **Chennai, Bengaluru, Hyderabad** | Remote\n` +
        `• **Target Roles:** Forward Deployed Engineer, GenAI Engineer, AI/ML Engineer, LLM/Agentic AI\n` +
        `• **Current Experience:** GenAI Executive & FDE at *Nunes Instruments* (Aug 2026 – Present)\n` +
        `• **Research Credential:** Published Author at **IEEE ICNGCS 2025** (*Eco-Transformers*, 58% CO2 cut, 56% speedup) + Best Final Year Project Award\n` +
        `• **Academics:** B.Tech AI & Data Science (KCT, CGPA: 8.02/10) | Diploma CE (CGPA: 8.0/10)\n` +
        `• **Core Stack:** Python, PyTorch, Fastify, FastAPI, Kotlin, Flutter, Docker, LangGraph, FAISS, PostgreSQL\n` +
        `• **Quick Contact:** [apsiva69@gmail.com](mailto:apsiva69@gmail.com) | [+91-8438692752](tel:+918438692752)\n` +
        `• **Resume:** [Download Verified 1-Page PDF](assets/Sivanesan_B.pdf)`;
    }

    // 1. WHY HIRE SIVANESAN / VALUE PROPOSITION / STRENGTHS
    if (
      q.includes('why hire') ||
      q.includes('why should we hire') ||
      q.includes('hire sivanesan') ||
      q.includes('strengths') ||
      q.includes('value proposition') ||
      q.includes('fit') ||
      q.includes('why choose')
    ) {
      return `🌟 **Why Hire Sivanesan B?**\n\n` +
        `• **Dual Theoretical & Production Rigor:** Sivanesan is an **IEEE-published author** (achieved a **58% CO2 cut and 56% speedup** in LLM inference) combined with real-world **Forward Deployed Engineering** experience at *Nunes Instruments*.\n\n` +
        `• **End-to-End Delivery:** He doesn't just train models — he engineers full production stacks: from model quantization and PyTorch forward hooks, up to FastAPI/Fastify backends, WebSockets, and Kotlin/Flutter mobile applications.\n\n` +
        `• **Proven Business Impact:** At Nunes Instruments, he automated daily ERP reporting in Python and built a WhatsApp BI dashboard that replaced hours of manual daily administrative operations.\n\n` +
        `• **Rapid Problem Solver:** High ownership mindset, ready to step in on Day 1 as an AI/ML Engineer, GenAI Specialist, or Forward Deployed Engineer (FDE).\n\n` +
        `📬 *Let's talk:* Reach out directly at [apsiva69@gmail.com](mailto:apsiva69@gmail.com) or call **+91-8438692752**.`;
    }

    // 2. FORWARD DEPLOYED ENGINEERING (FDE)
    if (
      q.includes('fde') ||
      q.includes('forward deployed') ||
      q.includes('deployed engineer') ||
      q.includes('client integration') ||
      q.includes('business automation')
    ) {
      return `⚡ **Forward Deployed Engineering (FDE) Background:**\n\n` +
        `Sivanesan works as a **GenAI Executive & Forward Deployed Engineer at Nunes Instruments** (Aug 2026 – Present):\n\n` +
        `• **Translating Business to AI:** Bridges raw client/business pain points with scalable, production-ready AI applications.\n` +
        `• **Production Enterprise Automations:** Engineered a WhatsApp BI dashboard converting unstructured chat logs into searchable business intelligence, and built Python automated ERP Excel reporting that eliminated daily manual report tasks.\n` +
        `• **Real-Time Voice Architecture:** Architected the **NUNES AI Live Call Translator (Tamil ↔ Hindi)** with a bidirectional STT → Translation → TTS pipeline using Plivo Voice API, Sarvam AI, and Fastify WebSockets.\n` +
        `• **Key FDE Toolkit:** System Integration, REST APIs, WebSockets, RAG Workflows, Model Deployment, Prompt Engineering, and ERP Automation.`;
    }

    // 3. RESEARCH / ECO-TRANSFORMERS / IEEE PUBLICATION / CO2 REDUCTION
    if (
      q.includes('eco-transformer') ||
      q.includes('eco transformer') ||
      q.includes('paper') ||
      q.includes('research') ||
      q.includes('ieee') ||
      q.includes('publication') ||
      q.includes('co2') ||
      q.includes('carbon') ||
      q.includes('pruning') ||
      q.includes('freezing') ||
      q.includes('doi') ||
      q.includes('icngcs')
    ) {
      return `📄 **Eco-Transformers Research (IEEE Published)**\n\n` +
        `• **Title:** *"Eco-Transformers: Carbon-Efficient and Accelerated Inference through Self-Pruning and Activation Freezing in LLMs"*\n` +
        `• **Conference:** IEEE 3rd International Conference on Next Generation Computing Systems (ICNGCS 2025)\n` +
        `• **Publication Date:** August 2025\n` +
        `• **DOI:** [10.1109/ICNGCS64900.2025.11183217](https://doi.org/10.1109/ICNGCS64900.2025.11183217)\n` +
        `• **Award:** **Best Final Year Project Award** – Department of AI & DS, Kumaraguru College of Technology (KCT).\n\n` +
        `🔬 **Key Technical Findings:**\n` +
        `• Achieved a **58% reduction in CO2 emissions** and **56% faster inference** across foundation models including *Falcon-RW-1B*, *GPT-Neo-1.3B*, *OPT-1.3B*, and *GPT2-XL*.\n` +
        `• Implemented dynamic forward hooks in PyTorch for self-pruning redundant heads and freezing stable layer activations at inference time **without requiring costly retraining**.`;
    }

    // 4. NUNES AI LIVE CALL TRANSLATOR
    if (
      q.includes('call translator') ||
      q.includes('phone call') ||
      q.includes('tamil') ||
      q.includes('hindi') ||
      q.includes('sarvam') ||
      q.includes('plivo') ||
      q.includes('voice call') ||
      q.includes('voip')
    ) {
      return `🎙️ **NUNES AI Live Call Translator (Tamil ↔ Hindi)**\n\n` +
        `A real-time bidirectional voice call translation system engineered by Sivanesan for seamless cross-lingual phone calls:\n\n` +
        `• **Bidirectional Speech Pipeline:** Real-time STT → Translation → TTS pipeline utilizing Sarvam AI and Plivo Voice API.\n` +
        `• **Mobile App:** Native Android APK developed in Kotlin & Jetpack Compose with live call transcript viewing, contact synchronization, and call history.\n` +
        `• **Backend Architecture:** Node.js, TypeScript, and Fastify streaming audio frames via WebSockets connected to PostgreSQL for low-latency call logging.\n` +
        `• **GitHub:** [github.com/Sivanesanbalu/Live_Phone_Call_Translate](https://github.com/Sivanesanbalu/Live_Phone_Call_Translate)`;
    }

    // 5. AI BOOK SCANNER APK
    if (
      q.includes('book scanner') ||
      q.includes('scanner apk') ||
      q.includes('convnext') ||
      q.includes('fastapi') && q.includes('scanner')
    ) {
      return `📚 **AI Book Scanner APK**\n\n` +
        `A mobile-first computer vision and semantic book recognition platform:\n\n` +
        `• **Model Performance:** Fine-tuned **ConvNeXt** vision architecture achieving **92% detection accuracy** across 1,000+ real-world test images.\n` +
        `• **Inference Microservice:** Built with FastAPI, architected to support 100+ concurrent requests, coupled with FAISS vector indexing for sub-second semantic retrieval.\n` +
        `• **Multimodal Enrichment:** Integrated with Vision-Language Models (VLM) and LLMs to provide instant summaries, author details, and related book discovery.\n` +
        `• **Tech Stack:** Flutter, Firebase, FastAPI, PyTorch, ConvNeXt, FAISS, VLM/LLM.\n` +
        `• **GitHub:** [github.com/Sivanesanbalu/AI-Book-Scanner-APK](https://github.com/Sivanesanbalu/AI-Book-Scanner-APK)`;
    }

    // 6. WHATSAPP BI & AUTOMATED ERP REPORTING
    if (
      q.includes('whatsapp') ||
      q.includes('erp') ||
      q.includes('excel') ||
      q.includes('reporting') ||
      q.includes('openpyxl')
    ) {
      return `📊 **WhatsApp BI & Automated ERP Reporting (Nunes Instruments)**\n\n` +
        `Production enterprise business automation engineered by Sivanesan:\n\n` +
        `• **WhatsApp BI Dashboard:** Flask-based analytics engine that parses exported chat logs, extracting sales queries, client intent, and customer inquiries into searchable metrics.\n` +
        `• **Automated Daily ERP Reporting:** Python automation engine utilizing openpyxl and REST APIs to pull transactional data and format daily executive Excel reports automatically, eliminating manual daily preparation.\n` +
        `• **Tech Stack:** Python, Flask, Prompt Engineering, SQLite, openpyxl, REST APIs.`;
    }

    // 7. OFFLINE VOICE AI INVENTORY ASSISTANT (FORGE)
    if (
      q.includes('inventory') ||
      q.includes('offline voice') ||
      q.includes('forge') ||
      q.includes('trainee') ||
      q.includes('whisper') && q.includes('offline')
    ) {
      return `📦 **Offline Voice AI Inventory Assistant (Forge Innovation & Ventures)**\n\n` +
        `Developed during Sivanesan's tenure as an Innovation Engineer Trainee (Jan 2025 – Jul 2025):\n\n` +
        `• **100% Offline Edge Operation:** Designed for warehouse facilities with zero or spotty internet connectivity.\n` +
        `• **Voice Pipeline:** Whisper Speech-to-Text paired with an on-device quantized local LLM for context-aware stock queries.\n` +
        `• **Semantic Vector Search:** Embedded FAISS index on edge hardware, cutting inventory lookup time by **45%** across pilot deployments.\n` +
        `• **Tech Stack:** Python, Whisper STT, Quantized LLM, FAISS, On-Device RAG.`;
    }

    // 8. TESTPILOT AI & AI RECRUITER
    if (
      q.includes('testpilot') ||
      q.includes('qa agent') ||
      q.includes('recruiter') ||
      q.includes('interview') ||
      q.includes('blazeface') ||
      q.includes('vapi')
    ) {
      return `🤖 **Autonomous AI Agents & Platforms:**\n\n` +
        `• **TestPilot AI:** Autonomous software QA agent built with LangChain, LangGraph, Groq Llama-3, and PostgreSQL. Executes automated UI, API, accessibility, and security test suites with intelligent root cause failure diagnosis.\n` +
        `  *Repo:* [github.com/Sivanesanbalu/TestPilot_AI](https://github.com/Sivanesanbalu/TestPilot_AI)\n\n` +
        `• **AI Recruiter:** Automated voice interview screening platform powered by Vapi AI, OpenRouter, and Supabase. Features real-time 30 FPS <50ms BlazeFace face mesh computer vision proctoring, reducing recruitment screening time by 70%.\n` +
        `  *Repo:* [github.com/Sivanesanbalu/AI-Recruiter](https://github.com/Sivanesanbalu/AI-Recruiter)`;
    }

    // 9. TOP 10 PROJECTS OVERVIEW
    if (
      q.includes('project') ||
      q.includes('top 10') ||
      q.includes('top 3') ||
      q.includes('repos') ||
      q.includes('github') ||
      q.includes('what did he build') ||
      q.includes('portfolio')
    ) {
      return `🚀 **Sivanesan's Top 10 Curated Projects:**\n\n` +
        `1. **NUNES AI Live Call Translator:** Real-time Tamil↔Hindi bidirectional voice translation (Kotlin, Plivo, Sarvam AI, Fastify, WebSockets).\n` +
        `2. **AI Book Scanner APK:** 92% accuracy ConvNeXt mobile app + FastAPI microservice with FAISS (100+ concurrent users).\n` +
        `3. **WhatsApp BI & Automated ERP Reporting:** Production Flask dashboard & Python ERP Excel report automation at Nunes Instruments.\n` +
        `4. **Offline Voice AI Inventory Assistant:** Whisper STT + Quantized LLM + FAISS running 100% offline (45% faster stock lookup).\n` +
        `5. **TestPilot AI:** Autonomous software test engineering agent with LangChain & LangGraph.\n` +
        `6. **AI Recruiter:** Voice interview agent with BlazeFace CV proctoring (<50ms latency, 70% screening time reduction).\n` +
        `7. **AI Multi-Tenant CRM Engine:** Fastify + PostgreSQL + Groq multi-tenant agentic customer pipeline.\n` +
        `8. **Real-Time Sign Language Translator:** MediaPipe Hands + PyTorch LSTM gesture translation pipeline.\n` +
        `9. **Real-Time Fall Detection System:** YOLOv8-Pose + MobileNetV2 computer vision safety system.\n` +
        `10. **Edge ML Face Mask Detection System:** MobileNetV2 + TFLite 98.4% accuracy embedded vision at 45+ FPS.\n\n` +
        `Explore all code on [GitHub Profile](https://github.com/Sivanesanbalu)!`;
    }

    // 10. WORK EXPERIENCE / JOBS / COMPANIES
    if (
      q.includes('experience') ||
      q.includes('work') ||
      q.includes('job') ||
      q.includes('career') ||
      q.includes('employment') ||
      q.includes('company') ||
      q.includes('nunes')
    ) {
      return `💼 **Professional Work Experience:**\n\n` +
        `• **GenAI Executive & Forward Deployed Engineer (FDE)** | *Nunes Instruments* (Aug 2026 – Present)\n` +
        `  - Develop production LLM applications, RAG pipelines, and autonomous AI agents for business workflows.\n` +
        `  - Built WhatsApp BI dashboard and automated ERP-based Excel report generation in Python.\n` +
        `  - Architected real-time multilingual voice translation systems and document extraction tools.\n\n` +
        `• **Innovation Engineer Trainee** | *Forge Innovation & Ventures* (Jan 2025 – Jul 2025)\n` +
        `  - Built an offline voice-enabled AI inventory assistant using Whisper STT and quantized local LLMs with FAISS, reducing lookup times by 45%.`;
    }

    // 11. TECHNICAL SKILLS / TOOLS / FRAMEWORKS
    if (
      q.includes('skill') ||
      q.includes('tech stack') ||
      q.includes('technologies') ||
      q.includes('tools') ||
      q.includes('languages') ||
      q.includes('framework') ||
      q.includes('python') ||
      q.includes('pytorch') ||
      q.includes('docker') ||
      q.includes('fastapi') ||
      q.includes('rag')
    ) {
      return `🛠️ **Sivanesan's Technical Toolkit:**\n\n` +
        `• **Programming Languages:** Python, SQL, TypeScript, Kotlin, Flutter/Dart\n` +
        `• **AI & Machine Learning:** Generative AI, LLMs, VLMs, Agentic AI, RAG, AI Agents, Voice AI, Computer Vision, NLP, LLM Evaluation\n` +
        `• **Forward Deployed Engineering:** AI Solution Development, Business Requirements Translation, System Integration, REST APIs, ERP Automation\n` +
        `• **Frameworks & Libraries:** PyTorch, TensorFlow, Hugging Face Transformers, LangChain, LangGraph, FastAPI, Flask, Pandas, NumPy, scikit-learn\n` +
        `• **LLM Engineering:** Prompt Engineering, Fine-tuning, LoRA, QLoRA, Embeddings, Quantization, FAISS, ChromaDB, Semantic Search\n` +
        `• **Cloud & Databases:** Docker, GCP, AWS, Supabase, Firebase, PostgreSQL, SQLite, Git, GitHub\n` +
        `• **Certifications:** IBM AI Engineering Professional Certificate, AWS AI & ML Scholars (Udacity)`;
    }

    // 12. EDUCATION, COLLEGE, CGPA & ACADEMICS
    if (
      q.includes('education') ||
      q.includes('college') ||
      q.includes('degree') ||
      q.includes('kct') ||
      q.includes('kumaraguru') ||
      q.includes('polytechnic') ||
      q.includes('cgpa') ||
      q.includes('gpa') ||
      q.includes('marks') ||
      q.includes('study') ||
      q.includes('studies') ||
      q.includes('graduat')
    ) {
      return `🎓 **Educational Background:**\n\n` +
        `• **B.Tech in Artificial Intelligence & Data Science (Lateral Entry)**\n` +
        `  *Kumaraguru College of Technology (KCT), Coimbatore* (2023 – 2026)\n` +
        `  • **CGPA:** 8.02 / 10.0\n` +
        `  • **Honors:** Awarded the **Best Final Year Project Award** for Eco-Transformers research.\n\n` +
        `• **Diploma in Computer Engineering**\n` +
        `  *Tamilnadu Government Polytechnic College, Madurai* (2020 – 2023)\n` +
        `  • **CGPA:** 8.0 / 10.0`;
    }

    // 13. AWARDS & ACHIEVEMENTS
    if (
      q.includes('award') ||
      q.includes('honor') ||
      q.includes('achievement') ||
      q.includes('prize') ||
      q.includes('recognition')
    ) {
      return `🏆 **Honors & Achievements:**\n\n` +
        `• **Best Final Year Project Award (Aug 2025):** Awarded by the Department of Artificial Intelligence & Data Science at Kumaraguru College of Technology for the Eco-Transformers carbon-efficient LLM framework.\n` +
        `• **IEEE Published Author:** Research published in the IEEE 3rd International Conference on Next Generation Computing Systems (ICNGCS 2025) with verified DOI: [10.1109/ICNGCS64900.2025.11183217](https://doi.org/10.1109/ICNGCS64900.2025.11183217).\n` +
        `• **Enterprise Business Impact:** Automated daily ERP reporting and WhatsApp BI systems currently running in production at Nunes Instruments.`;
    }

    // 14. CERTIFICATIONS
    if (
      q.includes('certificat') ||
      q.includes('ibm') ||
      q.includes('udacity') ||
      q.includes('course')
    ) {
      return `📜 **Professional Certifications:**\n\n` +
        `• **IBM AI Engineering Professional Certificate:** Comprehensive mastery of Deep Learning, Machine Learning with Python, Computer Vision, and NLP algorithms.\n` +
        `• **AWS AI & ML Scholars (Udacity):** Machine learning foundation models, AWS SageMaker deployment, and cloud-native AI pipeline development.`;
    }

    // 15. CONTACT, RESUME, LOCATION, RELOCATION & HIRING
    if (
      q.includes('contact') ||
      q.includes('email') ||
      q.includes('phone') ||
      q.includes('mobile') ||
      q.includes('reach') ||
      q.includes('resume') ||
      q.includes('cv') ||
      q.includes('location') ||
      q.includes('remote') ||
      q.includes('relocat') ||
      q.includes('available') ||
      q.includes('interview')
    ) {
      return `📬 **Get in Touch with Sivanesan B:**\n\n` +
        `• **Email:** [apsiva69@gmail.com](mailto:apsiva69@gmail.com)\n` +
        `• **Phone / WhatsApp:** [+91-8438692752](tel:+918438692752)\n` +
        `• **Location:** Coimbatore, Tamil Nadu, India\n` +
        `• **Work Availability:** Open to Onsite (Coimbatore, Bangalore, Chennai, etc.), Hybrid, and Remote opportunities worldwide.\n` +
        `• **LinkedIn:** [linkedin.com/in/sivanesan-b-871ba7264](https://www.linkedin.com/in/sivanesan-b-871ba7264)\n` +
        `• **GitHub:** [github.com/Sivanesanbalu](https://github.com/Sivanesanbalu)\n\n` +
        `📄 *Download Resume:* Click the **Download Resume** button in the top navigation bar or hero section to download his latest verified CV.`;
    }

    // 16. GENERAL PROFILE / BIO / WHO IS SIVANESAN
    if (
      q.includes('who is') ||
      q.includes('about') ||
      q.includes('bio') ||
      q.includes('summary') ||
      q.includes('profile') ||
      q.includes('tell me about') ||
      q.includes('introduce')
    ) {
      return `👨‍💻 **About Sivanesan B:**\n\n` +
        `Sivanesan is an **AI/ML Engineer & Forward Deployed Engineer (FDE)** currently driving AI automation and LLM application development at **Nunes Instruments**.\n\n` +
        `• **Research:** IEEE-published researcher behind **Eco-Transformers** (achieved a 58% CO2 emission reduction and 56% faster inference across LLMs).\n` +
        `• **Engineering:** Expert in Generative AI, RAG pipelines, Agentic AI, PyTorch, Fastify, Kotlin, Flutter, and Docker.\n` +
        `• **Academics:** B.Tech in AI & Data Science from Kumaraguru College of Technology (CGPA: 8.02/10), winner of the Best Final Year Project Award.\n` +
        `• **Location:** Coimbatore, India (Open to Relocation & Remote roles globally).`;
    }

    // 17. DEFAULT CONTEXTUAL FALLBACK
    return `💡 **Siva AI Assistant Grounded Response:**\n\n` +
      `Sivanesan B is an **AI/ML Engineer & Forward Deployed Engineer (FDE)** at *Nunes Instruments*, and an **IEEE-published author** for the Eco-Transformers framework (58% CO2 cut in LLMs).\n\n` +
      `You can ask me specifically about:\n` +
      `• **Experience:** His role at Nunes Instruments or Forge Innovation\n` +
      `• **Research:** Eco-Transformers IEEE publication metrics & DOI\n` +
      `• **Projects:** Live Call Translator, AI Book Scanner, WhatsApp BI, or TestPilot AI\n` +
      `• **Skills:** PyTorch, Fastify, Kotlin, RAG, Agentic AI, or Docker\n` +
      `• **Hiring & Contact:** Email [apsiva69@gmail.com](mailto:apsiva69@gmail.com) or phone **+91-8438692752**\n\n` +
      `Feel free to tap any of the quick suggestions above!`;
  }

  function initLottieBot() {
    function startAnimation() {
      if (typeof lottie === 'undefined' || !window.ROBOT_LOTTIE_DATA) {
        setTimeout(startAnimation, 120);
        return;
      }

      const triggerContainer = document.getElementById('lottie-robot-trigger');
      if (triggerContainer && !triggerContainer.hasChildNodes()) {
        lottie.loadAnimation({
          container: triggerContainer,
          renderer: 'svg',
          loop: true,
          autoplay: true,
          animationData: window.ROBOT_LOTTIE_DATA
        });
      }

      const headerContainer = document.getElementById('lottie-robot-header');
      if (headerContainer && !headerContainer.hasChildNodes()) {
        lottie.loadAnimation({
          container: headerContainer,
          renderer: 'svg',
          loop: true,
          autoplay: true,
          animationData: window.ROBOT_LOTTIE_DATA
        });
      }
    }

    startAnimation();
  }
});
