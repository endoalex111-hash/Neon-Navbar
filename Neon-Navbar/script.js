const items = document.querySelectorAll('.nav-item');
const highlight = document.querySelector('.highlight');
const sound = document.getElementById('clickSound');

// Colors per icon
const colors = ["#00f2ff","#ff00c8","#00ff88","#ffae00","#ff3b3b"];

// Move highlight to active item
function moveHighlight(element) {
    const rect = element.getBoundingClientRect();
    const parentRect = element.parentElement.getBoundingClientRect();
    const centerOffset = (rect.left - parentRect.left) + (rect.width/2) - (highlight.offsetWidth/2);
    highlight.style.transform = `translate(${centerOffset}px, -50%)`;
}

// Initial highlight
moveHighlight(document.querySelector('.nav-item.active'));

// Particle effect
let particleCount = 0;

function createParticles(x, y, color) {
    if (particleCount> 100) return;
    particleCount += 12;

    for (let i = 0; i < 12; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        particle.style.background = color;

        const angle = Math.random() * 2 * Math.PI;
        const distance = Math.random() * 40;

        particle.style.setProperty('--x', `${Math.cos(angle)*distance}px`);
        particle.style.setProperty('--y', `${Math.sin(angle)*distance}px`);

        particle.style.left = x + 'px';
        particle.style.top = y + 'px';

        document.body.appendChild(particle);
        setTimeout(() => {
            particle.remove();
            particleCount--;
        }, 600);
    }
}

// Click event
items.forEach((item, index) => {
    item.addEventListener('click', (e) => {
        // Activate item
        items.forEach(i => i.classList.remove('active'));
        item.classList.add('active');

        // Move highlight
        moveHighlight(item);

        // Update highlight color & glow
        const color = colors[index];
        highlight.style.backgroundColor = color;
        highlight.style.boxShadow = `0 0 20px ${color}, 0 0 40px ${color}`;

        // Play sound
        sound.currentTime = 0;
        sound.play().catch(() => {});

        // Particle effect
        const rect = item.getBoundingClientRect();
        const x = rect.left + rect.width/2;
        const y = rect.top + rect.height/2;
        createParticles(x, y, color);
    });

    // Magnetic hover effect
    item.addEventListener('mousemove', (e) => {
        const rect = item.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width/2;
        const y = e.clientY - rect.top - rect.height/2;
        item.style.transform = `translate(${x*0.2}px, ${y*0.2}px) scale(1.2)`;
    });

    item.addEventListener('mouseleave', () => {
        item.style.transform = 'translate(0,0) scale(1)';
    });

    item.addEventListener('touchstart', () => {
        item.style.transform = 'scale(1.1)';
    });

    item.addEventListener('touchend', () => {
        item.style.transform = 'scale(1)';
    });

});
