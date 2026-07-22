/* =====================================
   ELEMENTS
===================================== */

const btn = document.getElementById("ai-chat-btn");
const chatbot = document.getElementById("chatbot");
const closeBtn = document.getElementById("close-chat");
const greeting = document.querySelector(".chat-greeting");
const greetingClose = document.querySelector(".greeting-close");
const hi = document.querySelector(".greeting-hi");
const intro = document.querySelector(".greeting-intro");
const help = document.querySelector(".greeting-help");
const sendBtn = document.getElementById("send-btn");
const input = document.getElementById("user-input");

const chatBody = document.querySelector(".chat-body");

/* =====================================
   STATE
===================================== */

let chatHistory = [];
let initialized = false;
let isLoading = false;

/* =====================================
   SYSTEM PROMPT
===================================== */

const SYSTEM_PROMPT = `
You are Siva AI, the AI portfolio assistant of Sivanesan B.

Your responsibility is to answer ONLY questions related to Sivanesan.

Topics you can answer:

• About
• Skills
• Projects
• Experience
• Education
• Research
• Resume
• Achievements
• Contact

If the question is unrelated to Sivanesan or his portfolio,
politely reply that you are designed only for portfolio-related questions.

Be professional, friendly and concise.
`;

/* =====================================
   OPEN CHAT
===================================== */

btn.addEventListener("click", () => {

    chatbot.classList.add("active");

    input.focus();

    if (initialized) return;

    initialized = true;

    addBotMessage(`
# 👋 Welcome to Siva AI

Hi! I'm **Siva AI**, your AI portfolio assistant.

### How may I help you today?

You can ask me about:

• 🚀 Projects
• 💼 Experience
• 🧠 Skills
• 🎓 Education
• 📄 Research
• 🏆 Achievements
• 📧 Contact

### Try asking:

• Tell me about yourself

• Show your AI projects

• Explain TestPilot AI

• What are your technical skills?
`);

});

if (btn && greeting) {
    btn.addEventListener("click", () => {
        greeting.style.display = "none";
    });
}

if (greetingClose && greeting) {
    greetingClose.addEventListener("click", () => {
        greeting.style.display = "none";
    });
}

/* =====================================
   CLOSE CHAT
===================================== */

if (closeBtn && chatbot) {
    closeBtn.addEventListener("click", () => {
        chatbot.classList.remove("active");
    });
}

if (sendBtn) {
    sendBtn.addEventListener("click", sendMessage);
}

if (input) {
    input.addEventListener("keydown", (e) => {
        if (e.key === "Enter" && !e.shiftKey && !isLoading) {
            e.preventDefault();
            sendMessage();
        }
    });
}

/* =====================================
   ESC KEY
===================================== */

document.addEventListener("keydown", (e) => {

    if (e.key === "Escape") {

        chatbot.classList.remove("active");

    }

});

/* =====================================
   SECURITY
===================================== */

function escapeHTML(text) {

    const div = document.createElement("div");

    div.textContent = text;

    return div.innerHTML;

}

/* =====================================
   GROQ API
===================================== */

async function askGroq(history) {

    const messages = [
        {
            role: "system",
            content: SYSTEM_PROMPT
        },
        ...history
    ];

    const response = await fetch(
        "https://api.groq.com/openai/v1/chat/completions",
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json",

                // 🔑 Replace with your actual Groq API Key
                "Authorization": "Bearer YOUR_GROQ_API_KEY"
            },

            body: JSON.stringify({

                model: "llama-3.3-70b-versatile",

                messages,

                temperature: 0.4,

                max_tokens: 700,

                top_p: 0.9,

                stream: false

            })

        }
    );

    if (!response.ok) {

        let errorMessage = `HTTP ${response.status}`;

        try {

            const errorData = await response.json();

            if (errorData.error?.message) {

                errorMessage = errorData.error.message;

            }

        } catch (_) {}

        throw new Error(errorMessage);

    }

    const data = await response.json();

    if (
        !data.choices ||
        !data.choices.length ||
        !data.choices[0].message
    ) {

        throw new Error("Invalid response received from Groq.");

    }

    return data.choices[0].message.content.trim();

}
/* =====================================
   USER MESSAGE
===================================== */

function addUserMessage(text) {

    const safeText = escapeHTML(text);

    chatBody.insertAdjacentHTML(
        "beforeend",
        `
        <div class="message user">

            <div class="message-content">

                ${safeText}

            </div>

        </div>
        `
    );

    scrollBottom();

}

/* =====================================
   BOT MESSAGE
===================================== */

function addBotMessage(text) {

    const formatted = formatMessage(text);

    chatBody.insertAdjacentHTML(
        "beforeend",
        `
        <div class="message bot">

            <div class="bot-avatar">

                🤖

            </div>

            <div class="message-content">

                ${formatted}

            </div>

        </div>
        `
    );

    scrollBottom();

}
/* =====================================
   FORMAT MESSAGE
===================================== */

function formatMessage(text) {

    let html = escapeHTML(text);

    // Bold
    html = html.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

    // Italic
    html = html.replace(/\*(.*?)\*/g, "<em>$1</em>");

    // Inline code
    html = html.replace(/`(.*?)`/g, "<code>$1</code>");

    // URLs
    html = html.replace(
        /(https?:\/\/[^\s]+)/g,
        '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>'
    );

    // Bullet lists
    html = html.replace(/^- (.*)$/gm, "• $1");

    // Heading
    html = html.replace(/^### (.*)$/gm, "<h5>$1</h5>");
    html = html.replace(/^## (.*)$/gm, "<h4>$1</h4>");
    html = html.replace(/^# (.*)$/gm, "<h3>$1</h3>");

    // Line breaks
    html = html.replace(/\n/g, "<br>");

    return html;

}
/* =====================================
   TYPING INDICATOR
===================================== */

function showTyping() {

    removeTyping();

    chatBody.insertAdjacentHTML(
        "beforeend",
        `
        <div class="message bot" id="typing">

            <div class="bot-avatar">
                🤖
            </div>

            <div class="typing">

                <span></span>
                <span></span>
                <span></span>

            </div>

        </div>
        `
    );

    scrollBottom();

}

/* =====================================
   REMOVE TYPING
===================================== */

function removeTyping() {

    const typing = document.getElementById("typing");

    if (typing) {

        typing.remove();

    }

}

/* =====================================
   AUTO SCROLL
===================================== */

function scrollBottom() {

    requestAnimationFrame(() => {

        chatBody.scrollTo({

            top: chatBody.scrollHeight,

            behavior: "smooth"

        });

    });

}
/* =====================================
   LINK DETECTION
===================================== */

function convertLinks(text) {

    return text.replace(

        /(https?:\/\/[^\s]+)/g,

        '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>'

    );

}
/* =====================================
   QUICK QUESTIONS
===================================== */

function sendQuickQuestion(question) {

    if (isLoading) return;

    input.value = question;

    sendMessage();

}

/* =====================================
   CLEAR CHAT
===================================== */

function clearChat() {

    chatBody.innerHTML = "";

    chatHistory = [];

    initialized = false;

}

/* =====================================
   RESET CONVERSATION
===================================== */

function resetConversation() {

    chatHistory = [];

    chatBody.innerHTML = "";

    initialized = true;

    addBotMessage(`
# 👋 Conversation Reset

Your previous conversation has been cleared.

How can I help you today?
`);

}
/* =====================================
   SEND MESSAGE
===================================== */

async function sendMessage() {

    if (isLoading) return;

    const question = input.value.trim();

    if (!question) return;

    addUserMessage(question);

    chatHistory.push({
        role: "user",
        content: question
    });

    input.value = "";

    isLoading = true;

    sendBtn.disabled = true;
    input.disabled = true;

    showTyping();

    try {

        const answer = await askGroq(chatHistory);

        removeTyping();

        addBotMessage(answer);

        chatHistory.push({
            role: "assistant",
            content: answer
        });

        if (chatHistory.length > 20) {
            chatHistory = chatHistory.slice(-20);
        }

    } catch (error) {

        console.error(error);

        removeTyping();

        addBotMessage(`
❌ **Connection Failed**

Sorry, I couldn't connect to the AI server.

Please try again later.
`);

    } finally {

        isLoading = false;

        sendBtn.disabled = false;

        input.disabled = false;

        input.focus();

    }

}

/* =====================================
   COPY MESSAGE
===================================== */

async function copyMessage(text) {

    try {

        await navigator.clipboard.writeText(text);

        console.log("✅ Copied");

    } catch (error) {

        console.error(error);

    }

}

/* =====================================
   WINDOW CLICK
===================================== */

window.addEventListener("click", (e) => {

    if (

        chatbot.classList.contains("active") &&

        !chatbot.contains(e.target) &&

        !btn.contains(e.target)

    ) {

        // Optional
        // chatbot.classList.remove("active");

    }

});
/* =====================================
   STARTUP ANIMATION
===================================== */

window.addEventListener("DOMContentLoaded", () => {

    if (!greeting) return;

    greeting.classList.remove("show");

    hi?.classList.remove("show");
    intro?.classList.remove("show");
    help?.classList.remove("show");

    setTimeout(() => {

        greeting.classList.add("show");

    }, 500);

    setTimeout(() => {

        hi?.classList.add("show");

    }, 900);

    setTimeout(() => {

        intro?.classList.add("show");

    }, 1500);

    setTimeout(() => {

        help?.classList.add("show");

    }, 2100);

});

/* =====================================
   GREETING CLOSE
===================================== */

greetingClose?.addEventListener("click", () => {

    greeting.classList.remove("show");

});

/* =====================================
   CHAT BUTTON
===================================== */

btn?.addEventListener("click", () => {

    greeting.classList.remove("show");

    chatbot.classList.add("active");

});
/* =====================================
   GREETING STARTUP
===================================== */

window.addEventListener("load", () => {

    if (!greeting) return;

    greeting.classList.remove("show");

    hi.classList.remove("show");
    intro.classList.remove("show");
    help.classList.remove("show");

    requestAnimationFrame(() => {

        setTimeout(() => {

            greeting.classList.add("show");

        }, 500);

        setTimeout(() => {

            hi.classList.add("show");

        }, 1000);

        setTimeout(() => {

            intro.classList.add("show");

        }, 1700);

        setTimeout(() => {

            help.classList.add("show");

        }, 2400);

    });

});

console.log("🚀 Siva AI Chatbot Ready");