// Matrix Rain Effect
const canvas = document.getElementById('matrix-canvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$+-*/=%""\'#&_(),.;:?!\\|{}<>[]^~日ﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍ'.split('');
const fontSize = 14;
let columns = canvas.width / fontSize;
let drops = [];

function initDrops() {
    columns = canvas.width / fontSize;
    drops = [];
    for (let x = 0; x < columns; x++) drops[x] = Math.random() * canvas.height;
}
initDrops();
window.addEventListener('resize', initDrops);

function drawMatrix() {
    ctx.fillStyle = 'rgba(2, 6, 23, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.font = fontSize + 'px monospace';
    
    for (let i = 0; i < drops.length; i++) {
        // Randomly choose colors to simulate binary/matrix mix
        const isCyan = Math.random() > 0.8;
        ctx.fillStyle = isCyan ? '#22d3ee' : '#a855f7';
        
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}
setInterval(drawMatrix, 35);

// Floating Particles
const particlesContainer = document.getElementById('particles');
function createParticle() {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    const size = Math.random() * 4 + 1;
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    
    particle.style.left = Math.random() * 100 + 'vw';
    particle.style.animationDuration = Math.random() * 10 + 5 + 's';
    
    particlesContainer.appendChild(particle);
    
    setTimeout(() => {
        particle.remove();
    }, 15000);
}
setInterval(createParticle, 300);

// Typing Effect
const typedTextSpan = document.querySelector(".typed-text");
const textArray = [
    "Python Developer", 
    "React Specialist", 
    "Machine Learning", 
    "AI Enthusiast"
];
const typingDelay = 100;
const erasingDelay = 50;
const newTextDelay = 2000;
let textArrayIndex = 0;
let charIndex = 0;

function type() {
    if (charIndex < textArray[textArrayIndex].length) {
        typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, typingDelay);
    } else {
        setTimeout(erase, newTextDelay);
    }
}

function erase() {
    if (charIndex > 0) {
        typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, erasingDelay);
    } else {
        textArrayIndex++;
        if (textArrayIndex >= textArray.length) textArrayIndex = 0;
        setTimeout(type, typingDelay + 500);
    }
}
setTimeout(type, newTextDelay);

// Language Progress Bars
const languages = [
    { name: 'Python', percent: 90, colors: 'from-blue-500 to-cyan-500' },
    { name: 'JavaScript', percent: 85, colors: 'from-yellow-400 to-orange-500' },
    { name: 'TypeScript', percent: 80, colors: 'from-blue-600 to-cyan-400' },
    { name: 'HTML/CSS', percent: 95, colors: 'from-orange-500 to-red-500' },
    { name: 'SQL', percent: 75, colors: 'from-purple-500 to-pink-500' },
    { name: 'C++', percent: 70, colors: 'from-indigo-500 to-purple-500' }
];

const langContainer = document.getElementById('language-bars');
languages.forEach(lang => {
    langContainer.innerHTML += `
        <div>
            <div class="flex justify-between mb-1 font-mono text-sm">
                <span class="text-slate-300">${lang.name}</span>
                <span class="text-purple-400">${lang.percent}%</span>
            </div>
            <div class="progress-container">
                <div class="progress-bar bg-gradient-to-r ${lang.colors} w-0" data-width="${lang.percent}%"></div>
            </div>
        </div>
    `;
});

// Animate progress bars on scroll
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const bars = entry.target.querySelectorAll('.progress-bar');
            bars.forEach(bar => {
                bar.style.width = bar.getAttribute('data-width');
            });
            observer.unobserve(entry.target);
        }
    });
});
observer.observe(document.getElementById('skills'));

// Fetch GitHub Projects
async function fetchGitHubProjects() {
    const container = document.getElementById('github-projects');
    try {
        const res = await fetch('https://api.github.com/users/mahmoudkhafagy1/repos?sort=stars&per_page=100');
        if (!res.ok) throw new Error('Failed to fetch');
        
        const repos = await res.json();
        const filtered = repos.filter(r => !r.fork).sort((a, b) => b.stargazers_count - a.stargazers_count).slice(0, 6);
        
        let html = '';
        filtered.forEach(repo => {
            html += `
                <div class="card-hover bg-slate-900/50 border border-slate-800 rounded-xl p-6 flex flex-col h-full backdrop-blur-sm">
                    <div class="flex justify-between items-start mb-4">
                        <i class="fa-regular fa-folder text-3xl text-purple-400"></i>
                        <div class="flex gap-3">
                            ${repo.homepage ? `<a href="${repo.homepage}" target="_blank" class="text-slate-400 hover:text-cyan-400 transition-colors"><i class="fa-solid fa-arrow-up-right-from-square"></i></a>` : ''}
                            <a href="${repo.html_url}" target="_blank" class="text-slate-400 hover:text-purple-400 transition-colors"><i class="fa-brands fa-github text-xl"></i></a>
                        </div>
                    </div>
                    <h3 class="text-xl font-bold text-white mb-2">${repo.name}</h3>
                    <p class="text-slate-400 text-sm mb-6 flex-grow">${repo.description || 'No description provided.'}</p>
                    <div class="flex flex-wrap gap-2 mt-auto">
                        ${repo.language ? `<span class="text-xs font-mono text-cyan-400 bg-cyan-400/10 px-2 py-1 rounded border border-cyan-400/20">#${repo.language}</span>` : ''}
                        ${repo.stargazers_count > 0 ? `<span class="text-xs font-mono text-purple-400 bg-purple-400/10 px-2 py-1 rounded border border-purple-400/20 flex items-center gap-1"><i class="fa-solid fa-star text-[10px]"></i> ${repo.stargazers_count}</span>` : ''}
                    </div>
                </div>
            `;
        });
        container.innerHTML = html;
    } catch (error) {
        container.innerHTML = `<div class="col-span-full text-center p-6 bg-red-500/10 border border-red-500/30 rounded-xl"><p class="text-red-400"><i class="fa-solid fa-triangle-exclamation"></i> Failed to load GitHub projects. Please try again later.</p></div>`;
    }
}
fetchGitHubProjects();
