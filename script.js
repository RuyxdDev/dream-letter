document.addEventListener('DOMContentLoaded', () => {
    const snowContainer = document.querySelector('.snow-container');
    const button = document.querySelector('.send-btn');
    const btnText = document.querySelector('.btn-text');
    const tiltWrapper = document.querySelector('.tilt-wrapper');
    const letterCard = document.querySelector('.letter-card');

    // 1. Enhanced Snow Animation
    const createSnow = () => {
        for(let i = 0; i < 40; i++) {
            const snow = document.createElement('div');
            snow.classList.add('snow');
            
            // Random properties
            snow.style.left = Math.random() * 100 + '%';
            snow.style.animationDuration = (Math.random() * 10 + 5) + 's'; 
            snow.style.animationDelay = (Math.random() * 5 * -1) + 's'; // Start immediately randomly
            snow.style.opacity = Math.random() * 0.7 + 0.3;
            
            const size = Math.random() * 6 + 2 + 'px';
            snow.style.width = size;
            snow.style.height = size;

            snowContainer.appendChild(snow);
        }
    };
    createSnow();

    // 2. 3D Tilt Effect
    if (window.matchMedia("(min-width: 768px)").matches) {
        document.addEventListener('mousemove', (e) => {
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;

            // Calculate rotation (clamped)
            const rotateX = (y - 0.5) * 20; // -10 to 10 degrees
            const rotateY = (x - 0.5) * -20; // -10 to 10 degrees

            // Apply transform to the wrapper
            // We use requestAnimationFrame for smooth performance
            requestAnimationFrame(() => {
                tiltWrapper.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            });
        });
        
        // Reset on mouse leave
        document.addEventListener('mouseleave', () => {
            tiltWrapper.style.transform = `rotateX(0deg) rotateY(0deg)`;
        });
    }

    // 3. Button Interaction & Confetti
    button.addEventListener('click', () => {
        // Change button state
        button.style.background = 'linear-gradient(135deg, #059669 0%, #10b981 100%)';
        button.style.boxShadow = '0 10px 20px rgba(16, 185, 129, 0.4), 0 0 0 4px rgba(16, 185, 129, 0.2)';
        btnText.textContent = 'Отправлено! 🎅';
        
        // Play sound effect (optional, not included file, so skipping)

        // Launch Confetti
        createConfettiBurst();
    });

    function createConfettiBurst() {
        // Center burst
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;

        for(let i = 0; i < 60; i++) {
            createConfettiParticle(centerX, centerY);
        }
    }

    function createConfettiParticle(x, y) {
        const confetti = document.createElement('div');
        const emojis = ['✨', '🎄', '🎁', '❄️', '⭐', '🍪'];
        confetti.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        
        confetti.style.position = 'fixed';
        confetti.style.left = x + 'px';
        confetti.style.top = y + 'px';
        confetti.style.fontSize = (Math.random() * 20 + 10) + 'px';
        confetti.style.pointerEvents = 'none';
        confetti.style.zIndex = '1000';
        confetti.style.transition = 'all 1.5s cubic-bezier(0.25, 1, 0.5, 1)';
        
        document.body.appendChild(confetti);

        // Random destination
        const angle = Math.random() * Math.PI * 2;
        const velocity = 300 + Math.random() * 400;
        const destX = Math.cos(angle) * velocity;
        const destY = Math.sin(angle) * velocity;
        const rotate = Math.random() * 720 - 360;

        // Animate
        requestAnimationFrame(() => {
            confetti.style.transform = `translate(${destX}px, ${destY}px) rotate(${rotate}deg)`;
            confetti.style.opacity = '0';
        });

        // Cleanup
        setTimeout(() => {
            confetti.remove();
        }, 1500);
    }
});
