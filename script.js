document.addEventListener("DOMContentLoaded", () => {
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
});
