// Add hover effect with gradient border
document.querySelector('.grok-text').addEventListener('mousemove', (e) => {
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    e.target.style.setProperty('--x', `${x}px`);
    e.target.style.setProperty('--y', `${y}px`);
});

// Optional: Add parallax effect to GROK text
document.addEventListener('mousemove', (e) => {
    const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
    const moveY = (e.clientY - window.innerHeight / 2) * 0.01;
    
    document.querySelector('.grok-text').style.transform = 
        `translate(${moveX}px, ${moveY}px)`;
});