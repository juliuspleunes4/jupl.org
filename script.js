document.addEventListener("DOMContentLoaded", () => {
    // Typewriter-effect voor "JUPL"
    const textElement = document.getElementById("typed-text");
    const cursorElement = document.querySelector(".cursor");
    const juplText = document.querySelector(".jupl-text");

    const fullText = "JUPL";
    let index = 0;

    function typeWriterEffect() {
        juplText.classList.remove("hidden"); // Zorgt ervoor dat de outline zichtbaar is
        if (index < fullText.length) {
            textElement.textContent += fullText[index];
            index++;
            setTimeout(typeWriterEffect, 300); // Snelheid van het typen
        } else {
            // Laat de cursor 5 sec knipperen voordat alles verdwijnt
            setTimeout(eraseText, 8000);
        }
    }

    function eraseText() {
        if (textElement.textContent.length > 0) {
            textElement.textContent = textElement.textContent.slice(0, -1);
            setTimeout(eraseText, 100); // Snellere delete-snelheid
        } else {
            cursorElement.style.display = "none"; // Verberg de cursor tijdelijk
            juplText.classList.add("hidden"); // Verberg de outline tijdens de lege fase
            setTimeout(restartTyping, 1000); // 1 sec pauze voordat het opnieuw begint
        }
    }

    function restartTyping() {
        index = 0;
        cursorElement.style.display = "inline"; // Cursor weer laten verschijnen
        typeWriterEffect(); // Start opnieuw
    }

    // Start het type-effect na een halve seconde
    setTimeout(typeWriterEffect, 800);
    
    // Laad de aarde-animatie
    fetch("earth/earth.html")
        .then(response => response.text())
        .then(html => {
            document.getElementById("earth-container").innerHTML = html;
        })
        .catch(error => console.error("Error loading Earth UI:", error));

    // ---------------------------
    // TWINKELENDE STERREN ACHTERGROND
    // ---------------------------
    const canvas = document.createElement("canvas");
    document.body.appendChild(canvas);
    canvas.id = "starfield";
    canvas.style.position = "fixed";
    canvas.style.top = "0";
    canvas.style.left = "0";
    canvas.style.width = "100vw";
    canvas.style.height = "100vh";
    canvas.style.zIndex = "-1"; // Zet het achter alle andere elementen

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
                radius: Math.random() * 2 + 0.5, // Willekeurige grootte
                opacity: Math.random(), // Willekeurige starttransparantie
                fadeSpeed: Math.random() * 0.005 + 0.002, // Langzamere fading
                direction: Math.random() > 0.5 ? 1 : -1 // Willekeurige fade-richting
            });
        }
    }

    function animateStars() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "white";

        stars.forEach(star => {
            ctx.globalAlpha = star.opacity; // Stel de transparantie in
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
            ctx.fill();

            // Sterren laten twinkelen
            star.opacity += star.fadeSpeed * star.direction;

            if (star.opacity >= 1) {
                star.opacity = 1;
                star.direction = -1; // Begin met dimmen
            } else if (star.opacity <= 0.2) {
                star.opacity = 0.2;
                star.direction = 1; // Begin met oplichten
            }
        });

        ctx.globalAlpha = 1; // Reset de alpha
        requestAnimationFrame(animateStars);
    }

    window.addEventListener("resize", resizeCanvas);

    // Initialiseren
    resizeCanvas();
    animateStars();
});
