/* =====================================
   SIVA AI LOADER
===================================== */

window.addEventListener("load", () => {

    const loader = document.getElementById("loader");
    const progressBar = document.querySelector(".progress-bar");
    const loadingText = document.getElementById("loading-text");

    if (!loader || !progressBar || !loadingText) return;

    const messages = [
        "Initializing Portfolio...",
        "Loading AI Models...",
        "Loading Projects...",
        "Preparing Experience...",
        "Loading Research...",
        "Optimizing Interface...",
        "Almost Ready...",
        "Welcome to Siva AI Portfolio"
    ];

    let progress = 0;
    let messageIndex = 0;

    const interval = setInterval(() => {

        progress++;

        progressBar.style.width = progress + "%";

        if (
            progress % 15 === 0 &&
            messageIndex < messages.length - 1
        ) {

            messageIndex++;
            loadingText.textContent = messages[messageIndex];

        }

        if (progress >= 100) {

            clearInterval(interval);

            loadingText.textContent = "Launching Portfolio...";

            setTimeout(() => {

                loader.classList.add("hide");

                document.body.style.overflow = "auto";

                // Show greeting popup after loader
                const greeting = document.querySelector(".chat-greeting");

                if (greeting) {

                    setTimeout(() => {

                        greeting.classList.add("show");

                        const hi = document.querySelector(".greeting-hi");
                        const intro = document.querySelector(".greeting-intro");
                        const help = document.querySelector(".greeting-help");

                        setTimeout(() => {

                            hi?.classList.add("show");

                        }, 300);

                        setTimeout(() => {

                            intro?.classList.add("show");

                        }, 900);

                        setTimeout(() => {

                            help?.classList.add("show");

                        }, 1500);

                    }, 500);

                }

                setTimeout(() => {

                    loader.remove();

                }, 1000);

            }, 600);

        }

    }, 30);

});

/* =====================================
   BACKGROUND PARTICLES
===================================== */

const loader = document.getElementById("loader");

if (loader) {

    for (let i = 0; i < 35; i++) {

        const particle = document.createElement("div");

        particle.className = "loader-particle";

        particle.style.left = Math.random() * 100 + "%";

        particle.style.animationDuration =
            5 + Math.random() * 8 + "s";

        particle.style.animationDelay =
            Math.random() * 5 + "s";

        particle.style.opacity =
            0.15 + Math.random() * 0.4;

        loader.appendChild(particle);

    }

}