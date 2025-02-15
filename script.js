document.addEventListener("DOMContentLoaded", () => {
    const textElement = document.getElementById("typed-text");
    const cursorElement = document.querySelector(".cursor");

    const fullText = "JUPL";
    let index = 0;

    function typeWriterEffect() {
        if (index < fullText.length) {
            textElement.textContent += fullText[index];
            textElement.style.color = "white"; // Zorg ervoor dat de tekst zichtbaar is
            index++;
            setTimeout(typeWriterEffect, 300); // Snelheid van het typen
        } else {
            // Laat de cursor 5 sec knipperen voordat alles verdwijnt
            setTimeout(eraseText, 5000);
        }
    }

    function eraseText() {
        if (textElement.textContent.length > 0) {
            textElement.textContent = textElement.textContent.slice(0, -1);
            setTimeout(eraseText, 100); // Snellere delete-snelheid
        } else {
            cursorElement.style.display = "none"; // Verberg de cursor tijdelijk
            setTimeout(restartTyping, 1000); // 1 sec pauze voordat het opnieuw begint
        }
    }

    function restartTyping() {
        index = 0;
        cursorElement.style.display = "inline"; // Cursor weer laten verschijnen
        textElement.style.color = "transparent"; // Reset de tekstkleur
        typeWriterEffect(); // Start opnieuw
    }

    // Start het type-effect na een halve seconde
    setTimeout(typeWriterEffect, 500);
});
