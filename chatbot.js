/**
 * SIVANESAN B - RESUME & PORTFOLIO AI ASSISTANT (ROVISA 2.0)
 * Intelligent Dual-Engine: Instant On-Device Knowledge Base + Groq Llama-3.3 fallback
 */

const SIVA_KNOWLEDGE_BASE = {
  name: "Sivanesan B",
  title: "AI/ML Engineer & Forward Deployed Engineer (FDE)",
  location: "Coimbatore, Tamil Nadu, India",
  email: "apsiva69@gmail.com",
  phone: "+91-8438692752",
  github: "https://github.com/Sivanesanbalu",
  linkedin: "https://www.linkedin.com/in/sivanesan-b-871ba7264",
  portfolio: "https://sivanesanbalu.netlify.app",
  
  research: {
    title: "Eco-Transformers: Carbon-Efficient and Accelerated Inference through Self-Pruning and Activation Freezing in Large Language Models",
    conference: "3rd International Conference on Next Generation Computing Systems (ICNGCS-2025)",
    publisher: "IEEE",
    doi: "10.1109/ICNGCS64900.2025.11183217",
    doiUrl: "https://doi.org/10.1109/ICNGCS64900.2025.11183217",
    award: "Best Final Year Project Award from KCT AI & DS Department (Aug 2025)",
    metrics: "58% reduction in CO2 emissions and 56% faster inference across Falcon-RW-1B, GPT-Neo-1.3B, OPT-1.3B, and GPT2-XL using PyTorch forward hooks without retraining."
  },

  experience: [
    {
      role: "GenAI Executive & Forward Deployed Engineer (FDE)",
      company: "Nunes Instruments",
      period: "Aug 2026 – Present",
      details: "Develop and integrate LLM-powered applications, AI agents, and Retrieval-Augmented Generation (RAG) workflows to automate business processes. Engineer AI-driven document processing, information extraction, and classification workflows using prompt engineering and REST API integration. Built a Flask-based WhatsApp business-intelligence dashboard that turns chat exports into searchable insights, and automated ERP-based Excel reporting in Python, replacing manual daily report preparation."
    },
    {
      role: "Innovation Engineer Trainee",
      company: "Forge Innovation & Ventures",
      period: "Jan 2025 – Jul 2025",
      details: "Developed an offline voice-enabled AI inventory assistant using Whisper STT and a quantized local LLM, integrating FAISS semantic search with on-device inference for context-aware stock retrieval without internet, reducing lookup times by 45% across pilot deployments."
    }
  ],

  projects: [
    {
      name: "NUNES AI Live Call Translator (Tamil ↔ Hindi)",
      tech: "Kotlin, Jetpack Compose, Plivo Voice API, Sarvam AI, Node.js, TypeScript, Fastify, WebSocket, PostgreSQL",
      summary: "AI-powered real-time Tamil↔Hindi voice call translation application. Applied Forward Deployed Engineering principles to design and implement a bidirectional speech processing pipeline (STT→Translation→TTS), integrating live transcripts, contact sync, and call history management."
    },
    {
      name: "AI Book Scanner APK",
      tech: "Flutter, Firebase, FastAPI, PyTorch, ConvNeXt, FAISS, VLM, LLM",
      summary: "Mobile app with 92% detection accuracy across 1,000+ test images using fine-tuned ConvNeXt and a FastAPI inference service designed for 100+ concurrent users with FAISS semantic retrieval."
    },
    {
      name: "WhatsApp BI & Automated ERP Reporting",
      tech: "Python, Flask, Prompt Engineering, SQLite, REST APIs, openpyxl",
      summary: "Flask-based WhatsApp business intelligence dashboard turning chat exports into searchable insights and automated daily ERP Excel report preparation in Python."
    },
    {
      name: "Offline Voice AI Inventory Assistant",
      tech: "Python, Whisper STT, Quantized LLM, FAISS, RAG, On-Device Inference",
      summary: "100% offline, privacy-first voice assistant running on local hardware for warehouse inventory queries without internet (slashing stock lookup by 45%)."
    },
    {
      name: "TestPilot AI",
      tech: "Python, LangChain, LangGraph, Groq, PostgreSQL, AI Agents",
      summary: "Autonomous AI software test engineer performing automated UI, API, accessibility, and security testing with root cause diagnosis."
    },
    {
      name: "AI Recruiter",
      tech: "Next.js, Vapi AI, OpenRouter API, Supabase, BlazeFace, WebRTC",
      summary: "Voice interview platform conducting dynamic interviews evaluated across 50+ sessions, reducing screening time by 70% with 30 FPS <50ms CV proctoring."
    }
  ],

  skills: {
    programming: ["Python", "SQL", "TypeScript", "Kotlin", "Dart/Flutter"],
    ai_ml: ["Machine Learning", "Deep Learning", "Generative AI", "Agentic AI", "LLMs", "VLMs", "Retrieval-Augmented Generation (RAG)", "AI Agents", "Voice AI", "Computer Vision", "NLP", "LLM Evaluation"],
    fde: ["AI Solution Development", "Business Requirements", "System Integration", "REST APIs", "AI Workflow Automation", "ERP Automation", "Model Deployment"],
    frameworks: ["PyTorch", "TensorFlow", "Hugging Face Transformers", "LangChain", "LangGraph", "FastAPI", "Flask", "OpenAI API", "Pandas", "NumPy", "scikit-learn"],
    llm_engineering: ["Prompt Engineering", "Fine-tuning", "LoRA", "QLoRA", "Embeddings", "Model Optimization", "Quantization", "FAISS", "ChromaDB", "Semantic Search"],
    cloud_devops: ["Docker", "Google Cloud", "AWS", "Firebase", "Supabase", "PostgreSQL", "SQLite", "Hugging Face Hub", "Git", "GitHub"],
    certifications: ["IBM AI Engineering Professional Certificate", "AWS AI & ML Scholars (Udacity)"]
  }
};

document.addEventListener('DOMContentLoaded', () => {
  const triggerBtn = document.getElementById('chatbot-toggle');
  const chatWindow = document.getElementById('chatbot-window');
  const closeBtn = document.getElementById('chat-close');
  const sendBtn = document.getElementById('chat-send');
  const chatInput = document.getElementById('chat-input');
  const messagesContainer = document.getElementById('chat-messages');
  const suggestionChips = document.querySelectorAll('.suggestion-chip');

  if (!triggerBtn || !chatWindow) return;

  triggerBtn.addEventListener('click', () => {
    chatWindow.classList.toggle('open');
    if (chatWindow.classList.contains('open')) {
      chatInput.focus();
    }
  });

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

  sendBtn.addEventListener('click', () => {
    const val = chatInput.value.trim();
    if (val) handleUserMessage(val);
  });

  chatInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const val = chatInput.value.trim();
      if (val) handleUserMessage(val);
    }
  });

  async function handleUserMessage(text) {
    appendMessage(text, 'user');
    chatInput.value = '';

    // Typing indicator
    const typingIndicator = createTypingIndicator();
    messagesContainer.appendChild(typingIndicator);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    let botResponse = null;

    // Check if Netlify serverless function is available (when deployed on Netlify)
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3500);

      const res = await fetch('/.netlify/functions/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
        body: JSON.stringify({
          messages: [
            {
              role: 'system',
              content: 'You are ROVISA 2.0, the AI Portfolio Assistant for Sivanesan B (AI Engineer, IEEE-published researcher, GenAI Executive at Nunes Instruments). Answer helpfully and concisely using markdown.'
            },
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
      // Local or offline fallback
    }

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
    ind.innerHTML = '<span>.</span><span>.</span><span>.</span>';
    return ind;
  }

  function formatMarkdown(str) {
    return str
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" style="color:var(--accent-cyan);">$1</a>')
      .replace(/\n/g, '<br>');
  }

  function generateSmartAnswer(query) {
    const q = query.toLowerCase();

    // Live Call Translator / Voice AI
    if (q.includes('call') || q.includes('translat') || q.includes('tamil') || q.includes('hindi') || q.includes('sarvam') || q.includes('plivo') || q.includes('kotlin') || q.includes('voip')) {
      return `🎙️ **NUNES AI Live Call Translator (Tamil ↔ Hindi)**\n\nSivanesan developed a real-time voice call translation Android application and backend service:\n\n• **Speech Pipeline:** Real-time bidirectional STT → Translation → TTS with Sarvam AI & Plivo Voice API.\n• **Tech Stack:** Kotlin, Jetpack Compose, Plivo, Sarvam AI, Node.js, TypeScript, Fastify WebSocket streaming, and PostgreSQL.\n• **Features:** Low-latency translated audio routing, live call transcripts, contact sync, and call history tracking.\n• **GitHub:** [github.com/Sivanesanbalu/Live_Phone_Call_Translate](https://github.com/Sivanesanbalu/Live_Phone_Call_Translate)`;
    }

    // Forward Deployed Engineering (FDE)
    if (q.includes('fde') || q.includes('forward deployed') || q.includes('deployment') || q.includes('integration') || q.includes('automation')) {
      return `⚡ **Forward Deployed Engineering (FDE) Expertise**\n\nSivanesan currently works as a **GenAI Executive & Forward Deployed Engineer (FDE) at Nunes Instruments**:\n\n• Translating complex business workflows into production AI applications.\n• Built WhatsApp BI dashboard + automated Python ERP Excel reporting, replacing manual daily report preparation.\n• Built real-time multilingual voice translation systems and document extraction pipelines with REST APIs & WebSockets.`;
    }

    // Research / Eco-Transformers
    if (q.includes('eco') || q.includes('transformer') || q.includes('paper') || q.includes('research') || q.includes('ieee') || q.includes('publication') || q.includes('co2')) {
      return `📄 **Eco-Transformers Research (IEEE Published)**\n\nSivanesan authored **"Eco-Transformers: Carbon-Efficient and Accelerated Inference through Self-Pruning and Activation Freezing in LLMs"** at IEEE ICNGCS-2025.\n\n• **Impact:** 58% reduction in CO2 emissions & 56% faster inference across Falcon-RW-1B, GPT-Neo-1.3B, OPT-1.3B, and GPT2-XL.\n• **Award:** Best Final Year Project Award (KCT AI & DS).\n• **DOI:** [10.1109/ICNGCS64900.2025.11183217](https://doi.org/10.1109/ICNGCS64900.2025.11183217).`;
    }

    // Projects
    if (q.includes('project') || q.includes('creations') || q.includes('built') || q.includes('scanner') || q.includes('recruiter') || q.includes('testpilot') || q.includes('whatsapp') || q.includes('inventory')) {
      return `🚀 **Sivanesan's Featured Projects:**\n\n1. **NUNES AI Live Call Translator** – Real-time Tamil↔Hindi bidirectional voice translation using Kotlin, Plivo & Sarvam AI.\n2. **AI Book Scanner** – ConvNeXt vision model (92% accuracy on 1000+ images) with FastAPI (100+ concurrent users) & FAISS.\n3. **WhatsApp BI & Automated ERP Reporting** – Flask dashboard + Python ERP Excel automation for Nunes Instruments.\n4. **Offline Voice Inventory Assistant** – Whisper STT + quantized local LLM for warehouse queries without internet (slashed lookup by 45%).\n5. **TestPilot AI** – Autonomous QA Agent for UI, API, accessibility & security tests.\n6. **AI Recruiter** – Voice interview platform with Vapi AI & BlazeFace proctoring (<50ms).`;
    }

    // Experience / Jobs
    if (q.includes('experience') || q.includes('work') || q.includes('job') || q.includes('career') || q.includes('nunes') || q.includes('forge')) {
      return `💼 **Professional Journey:**\n\n• **GenAI Executive & Forward Deployed Engineer (FDE)** at *Nunes Instruments* (Aug 2026 – Present)\n  - Developing LLM applications, RAG workflows, WhatsApp BI & automated ERP reporting.\n• **Innovation Engineer Trainee** at *Forge Innovation & Ventures* (Jan 2025 – Jul 2025)\n  - Built offline voice-enabled inventory assistant with Whisper STT & quantized LLM (45% faster stock retrieval).`;
    }

    // Skills / Tech stack
    if (q.includes('skill') || q.includes('tech') || q.includes('python') || q.includes('stack') || q.includes('framework') || q.includes('tools')) {
      return `🛠 **Core Technical Stack:**\n\n• **AI & ML:** Generative AI, Agentic AI, LLMs, VLMs, RAG, AI Agents, Voice AI, Computer Vision, NLP, LLM Evaluation.\n• **Forward Deployed:** AI Solution Development, Business Requirements, System Integration, REST APIs, AI Workflow Automation, ERP Automation.\n• **Frameworks:** PyTorch, TensorFlow, Transformers, LangChain, LangGraph, FastAPI, Flask, OpenAI API, Pandas, NumPy.\n• **Languages:** Python, SQL, TypeScript, Kotlin, Flutter/Dart.\n• **Cloud & Data:** Docker, GCP, AWS, Supabase, Firebase, PostgreSQL, SQLite, FAISS, ChromaDB.`;
    }

    // Contact & Hiring
    if (q.includes('contact') || q.includes('email') || q.includes('hire') || q.includes('resume') || q.includes('phone') || q.includes('call') || q.includes('interview')) {
      return `📬 **Get in Touch with Sivanesan:**\n\n• **Email:** [apsiva69@gmail.com](mailto:apsiva69@gmail.com)\n• **Phone:** +91-8438692752\n• **Location:** Coimbatore, India\n• **LinkedIn:** [linkedin.com/in/sivanesan-b-871ba7264](https://www.linkedin.com/in/sivanesan-b-871ba7264)\n• **GitHub:** [github.com/Sivanesanbalu](https://github.com/Sivanesanbalu)\n\nYou can download his updated resume directly using the button in the header and hero sections!`;
    }

    // Education
    if (q.includes('education') || q.includes('college') || q.includes('degree') || q.includes('kct') || q.includes('kumaraguru') || q.includes('polytechnic')) {
      return `🎓 **Education:**\n\n• **B.Tech in Artificial Intelligence & Data Science (Lateral Entry)**\nKumaraguru College of Technology (2023 – 2026) | CGPA: 8.02/10\n*Honored with Best Final Year Project Award*\n\n• **Diploma in Computer Engineering**\nTamilnadu Government Polytechnic College (2020 – 2023) | CGPA: 8.0/10`;
    }

    // Default polite response
    return `Hello! I'm Sivanesan's AI Assistant. I can tell you all about his:\n• **NUNES AI Live Call Translator (Tamil ↔ Hindi)**\n• **Eco-Transformers IEEE publication (58% CO2 cut)**\n• **Forward Deployed Engineering work at Nunes Instruments**\n• **Offline Voice AI & ConvNeXt Book Scanner**\n• **Technical skills, education & contact details**\n\nWhat would you like to explore?`;
  }
});
