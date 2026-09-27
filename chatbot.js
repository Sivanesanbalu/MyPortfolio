/**
 * SIVANESAN B - RESUME & PORTFOLIO AI ASSISTANT (ROVISA 2.0)
 * Intelligent Dual-Engine: Instant On-Device Knowledge Base + Groq Llama-3.3 fallback
 */

const SIVA_KNOWLEDGE_BASE = {
  name: "Sivanesan B",
  title: "GenAI Executive & AI/ML Engineer",
  location: "Coimbatore, India",
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
      role: "GenAI Executive & Prompt Engineer",
      company: "Nunes Instruments",
      period: "Aug 2026 – Present",
      details: "Developing LLM-based business automation applications, multi-agent workflows, and prompt engineering pipelines for structured extraction from unstructured enterprise data."
    },
    {
      role: "AI Coder (Graduate Apprentice)",
      company: "Madhu Jayanti International Pvt. Ltd.",
      period: "Jul 2026 – Aug 2026",
      details: "Built operational report automations using openpyxl, processed real-time IoT machine data, and created shift-end email/WhatsApp notification pipelines."
    },
    {
      role: "Innovation Engineer Trainee",
      company: "Forge Innovation & Ventures",
      period: "Jan 2025 – Jul 2025",
      details: "Built an offline voice-driven inventory assistant with Whisper STT and quantized Qwen LLM with FAISS RAG, slashing stock-lookup time by 45% across 3 warehouse pilots."
    },
    {
      role: "Data Networking & Infrastructure Intern",
      company: "BSNL (Bharat Sanchar Nigam Limited)",
      period: "Jun 2022 – Jul 2022",
      details: "Observed live telecom routing, optical fiber networks, and low-latency network performance across enterprise nodes."
    }
  ],

  projects: [
    {
      name: "WhatsApp Product & Price Intelligence",
      tech: "Python, GenAI, LLMs, Prompt Engineering, SQLite, Flask, WhatsApp Export",
      summary: "Autonomous system analyzing unstructured WhatsApp chats to extract product names, prices, and quotation details into structured database archives."
    },
    {
      name: "TestPilot AI",
      tech: "Python, LangChain, Groq, PostgreSQL, AI Agents",
      summary: "Production-ready autonomous AI software test engineer performing UI, API, accessibility, and security testing with automated root cause analysis."
    },
    {
      name: "AI Book Scanner",
      tech: "Flutter, Firebase, FastAPI, PyTorch, ConvNeXt, FAISS, Vision LLM",
      summary: "Mobile app with 92% detection accuracy across 1000+ test images using fine-tuned ConvNeXt and FastAPI serving 100+ concurrent users with semantic search."
    },
    {
      name: "AI Recruiter",
      tech: "Next.js, JavaScript, OpenRouter API, Supabase, BlazeFace, Vapi",
      summary: "Voice interview platform conducting dynamic interviews, evaluated across 50+ sessions, reducing screening time by 70% with 30 FPS <50ms CV proctoring."
    },
    {
      name: "Offline Voice Assistant",
      tech: "Python, Whisper, FAISS, RAG, Quantized Qwen",
      summary: "100% offline, privacy-first voice assistant running on local hardware for warehouse inventory queries."
    }
  ],

  skills: {
    ai_ml: ["Large Language Models (LLMs)", "Vision LLMs (VLMs)", "AI Agents", "LangChain & LangGraph", "RAG Pipelines", "PyTorch", "Hugging Face", "LoRA / QLoRA", "Computer Vision (OpenCV, ConvNeXt)"],
    dev_cloud: ["Python", "TypeScript", "FastAPI", "Flask", "Docker", "PostgreSQL", "Supabase", "Firebase", "Google Cloud", "Git/GitHub"],
    certifications: ["IBM AI Engineering Professional Certificate", "AWS AI & ML Scholars (Udacity)", "Tata GenAI Job Simulation (Forage)"]
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

    // Research / Eco-Transformers
    if (q.includes('eco') || q.includes('transformer') || q.includes('paper') || q.includes('research') || q.includes('ieee') || q.includes('publication')) {
      return `📄 **Eco-Transformers Research (IEEE Published)**\n\nSivanesan authored **"Eco-Transformers: Carbon-Efficient and Accelerated Inference through Self-Pruning and Activation Freezing in LLMs"** at ICNGCS-2025.\n\n• **Impact:** 58% reduction in CO2 emissions & 56% faster inference across Falcon-RW, GPT-Neo, OPT, and GPT2-XL.\n• **Award:** Best Final Year Project Award (KCT AI & DS).\n• **DOI:** [10.1109/ICNGCS64900.2025.11183217](https://doi.org/10.1109/ICNGCS64900.2025.11183217).`;
    }

    // Projects
    if (q.includes('project') || q.includes('creations') || q.includes('built') || q.includes('scanner') || q.includes('recruiter') || q.includes('testpilot') || q.includes('whatsapp')) {
      return `🚀 **Sivanesan's Top AI Projects:**\n\n1. **WhatsApp Price & Product Intelligence** – Enterprise GenAI pipeline extracting product/pricing from chats into SQLite.\n2. **TestPilot AI** – Autonomous QA Agent testing APIs, UI, accessibility & security.\n3. **AI Book Scanner** – ConvNeXt vision model (92% accuracy across 1000+ images) + FastAPI + FAISS.\n4. **AI Recruiter** – Voice interview platform with Vapi, OpenRouter, and BlazeFace proctoring (<50ms).\n5. **Offline Voice Assistant** – Whisper STT + quantized Qwen LLM for warehouse inventory (zero internet).`;
    }

    // Experience / Jobs
    if (q.includes('experience') || q.includes('work') || q.includes('job') || q.includes('career') || q.includes('nunes') || q.includes('forge') || q.includes('madhu')) {
      return `💼 **Experience & Roles:**\n\n• **GenAI Executive & Prompt Engineer** at *Nunes Instruments* (Aug 2026 – Present)\n• **AI Coder (Graduate Apprentice)** at *Madhu Jayanti International* (Jul 2026 – Aug 2026)\n• **Innovation Engineer Trainee** at *Forge Innovation & Ventures* (Jan 2025 – Jul 2025)\n• **Data Networking Intern** at *BSNL* (Jun 2022 – Jul 2022)`;
    }

    // Skills / Tech stack
    if (q.includes('skill') || q.includes('tech') || q.includes('python') || q.includes('stack') || q.includes('framework') || q.includes('tools')) {
      return `🛠 **Core Technical Stack:**\n\n• **AI / GenAI:** LLMs, VLMs, AI Agents, LangChain, LangGraph, RAG, PyTorch, LoRA/QLoRA, Hugging Face, FAISS.\n• **Languages:** Python, TypeScript, SQL, C++.\n• **Backend & Cloud:** FastAPI, Flask, Docker, Supabase, Firebase, GCP, PostgreSQL.\n• **Computer Vision:** OpenCV, ConvNeXt, BlazeFace.`;
    }

    // Contact & Hiring
    if (q.includes('contact') || q.includes('email') || q.includes('hire') || q.includes('resume') || q.includes('phone') || q.includes('call') || q.includes('interview')) {
      return `📬 **Get in Touch with Sivanesan:**\n\n• **Email:** [apsiva69@gmail.com](mailto:apsiva69@gmail.com)\n• **Phone:** +91-8438692752\n• **Location:** Coimbatore, India\n• **LinkedIn:** [linkedin.com/in/sivanesan-b-871ba7264](https://www.linkedin.com/in/sivanesan-b-871ba7264)\n• **GitHub:** [github.com/Sivanesanbalu](https://github.com/Sivanesanbalu)\n\nYou can also download his updated resume directly from the hero section!`;
    }

    // Education
    if (q.includes('education') || q.includes('college') || q.includes('degree') || q.includes('kct') || q.includes('kumaraguru')) {
      return `🎓 **Education:**\n\n• **B.Tech in Artificial Intelligence & Data Science**\nKumaraguru College of Technology (2023 – 2026) | CGPA: 8.02/10\n\n• **Diploma in Computer Engineering**\nTamilnadu Government Polytechnic College (2020 – 2023) | CGPA: 8.0/10`;
    }

    // Default polite response
    return `Hello! I'm Sivanesan's AI Portfolio Assistant. I can tell you about his:\n• **Eco-Transformers research paper (IEEE)**\n• **AI Agents & LLM projects** (TestPilot AI, WhatsApp Intelligence, Voice AI)\n• **Work experience** at Nunes Instruments & Forge Labs\n• **Tech stack & skills**\n• **Contact & resume details**\n\nWhat would you like to explore?`;
  }
});
