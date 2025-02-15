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
            cursorElement.style.display = "none"; // Verwijder de cursor na het typen
        }
    }
    
    setTimeout(typeWriterEffect, 500); // Start het type-effect na een halve seconde
});
