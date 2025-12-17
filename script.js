// Simple JS to add more interactivity to the snow or buttons

document.addEventListener('DOMContentLoaded', () => {
    const snowContainer = document.querySelector('.snow-container');
    const button = document.querySelector('.send-btn');

    // Add more snow dynamically with random properties
    for(let i = 0; i < 30; i++) {
        const snow = document.createElement('div');
        snow.classList.add('snow');
        
        // Random positioning and delay
        snow.style.left = Math.random() * 100 + '%';
        snow.style.animationDuration = (Math.random() * 10 + 5) + 's'; // 5-15s
        snow.style.animationDelay = Math.random() * 5 + 's';
        snow.style.opacity = Math.random();
        
        // Random size
        const size = Math.random() * 5 + 3 + 'px';
        snow.style.width = size;
        snow.style.height = size;

        snowContainer.appendChild(snow);
    }

    // Button interaction
    button.addEventListener('click', () => {
        button.textContent = 'Отправлено! 🎅';
        button.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
        button.style.boxShadow = '0 10px 20px rgba(16, 185, 129, 0.3)';
        
        // Confetti effect (simulated with emojis)
        createConfetti();
    });

    function createConfetti() {
        for(let i = 0; i < 20; i++) {
            const confetti = document.createElement('div');
            confetti.textContent = ['✨', '🎄', '🎁', '❄️'][Math.floor(Math.random() * 4)];
            confetti.style.position = 'fixed';
            confetti.style.left = '50%';
            confetti.style.top = '50%';
            confetti.style.fontSize = '24px';
            confetti.style.pointerEvents = 'none';
            confetti.style.transition = 'all 1s ease-out';
            
            document.body.appendChild(confetti);

            // Animate out
            setTimeout(() => {
                const angle = Math.random() * Math.PI * 2;
                const velocity = 200 + Math.random() * 200;
                const x = Math.cos(angle) * velocity;
                const y = Math.sin(angle) * velocity;
                
                confetti.style.transform = `translate(${x}px, ${y}px) rotate(${Math.random() * 360}deg)`;
                confetti.style.opacity = '0';
            }, 50);

            // Cleanup
            setTimeout(() => {
                confetti.remove();
            }, 1000);
        }
    }
});
