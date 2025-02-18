document.addEventListener("DOMContentLoaded", () => {
    // Typewriter-effect for "JUPL"
    const textElement = document.getElementById("typed-text");
    const cursorElement = document.querySelector(".cursor");
    const juplText = document.querySelector(".jupl-text");

    const fullText = "JUPL";
    let index = 0;

    function typeWriterEffect() {
        juplText.classList.remove("hidden"); // Outline
        if (index < fullText.length) {
            textElement.textContent += fullText[index];
            index++;
            setTimeout(typeWriterEffect, 300); // Type speed
        } else {
            // Blink for 8 seconds
            setTimeout(eraseText, 8000);
        }
    }

    function eraseText() {
        if (textElement.textContent.length > 0) {
            textElement.textContent = textElement.textContent.slice(0, -1);
            setTimeout(eraseText, 100); // Deletion speed
        } else {
            cursorElement.style.display = "none"; // Hide cursor
            juplText.classList.add("hidden"); // Hide outline
            setTimeout(restartTyping, 1000); // 1 sec break
        }
    }

    function restartTyping() {
        index = 0;
        cursorElement.style.display = "inline"; // Cursor 
        typeWriterEffect(); // Start again
    }

    // Start typing effect
    setTimeout(typeWriterEffect, 800);
    
    // Load Earth animation
    fetch("earth/earth.html")
        .then(response => response.text())
        .then(html => {
            document.getElementById("earth-container").innerHTML = html;
        })
        .catch(error => console.error("Error loading Earth UI:", error));

    // ---------------------------
    // STARRY BACKGROUND
    // ---------------------------
    const canvas = document.createElement("canvas");
    document.body.appendChild(canvas);
    canvas.id = "starfield";
    canvas.style.position = "fixed";
    canvas.style.top = "0";
    canvas.style.left = "0";
    canvas.style.width = "100vw";
    canvas.style.height = "100vh";
    canvas.style.zIndex = "-1"; // Placement

    const ctx = canvas.getContext("2d");
    let stars = [];
    const numStars = 200;

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        generateStars();
    }

    function generateStars() {
        stars = [];
        for (let i = 0; i < numStars; i++) {
            stars.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                radius: Math.random() * 2 + 0.5, // Random size
                opacity: Math.random(), // Random transparency
                fadeSpeed: Math.random() * 0.005 + 0.002, // Fading
                direction: Math.random() > 0.5 ? 1 : -1 // Random fading direction
            });
        }
    }

    function animateStars() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "white";

        stars.forEach(star => {
            ctx.globalAlpha = star.opacity; // Transparency
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
            ctx.fill();

            // Sterren laten twinkelen
            star.opacity += star.fadeSpeed * star.direction;

            if (star.opacity >= 1) {
                star.opacity = 1;
                star.direction = -1; // Start fading
            } else if (star.opacity <= 0.2) {
                star.opacity = 0.2;
                star.direction = 1; // Reverse fading
            }
        });

        ctx.globalAlpha = 1; // Reset alpha
        requestAnimationFrame(animateStars);
    }

    window.addEventListener("resize", resizeCanvas);

    // Initialise
    resizeCanvas();
    animateStars();
});
