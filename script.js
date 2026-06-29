// CURSOR
const cursor = document.getElementById('cursor');
const trail = document.getElementById('cursor-trail');
const glow = document.getElementById('mouseGlow');
let mx = 0, my = 0, tx = 0, ty = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cursor.style.left = mx + 'px';
  cursor.style.top = my + 'px';
  glow.style.left = mx + 'px';
  glow.style.top = my + 'px';
});
setInterval(() => {
  tx += (mx - tx) * 0.12;
  ty += (my - ty) * 0.12;
  trail.style.left = tx + 'px';
  trail.style.top = ty + 'px';
}, 16);
document.querySelectorAll('button, a, .project-card, .skill-card, .social-link').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.width = '20px'; cursor.style.height = '20px';
    cursor.style.background = 'var(--p2)';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.width = '12px'; cursor.style.height = '12px';
    cursor.style.background = 'var(--acc)';
  });
});

// SCROLL PROGRESS
window.addEventListener('scroll', () => {
  const pct = (scrollY / (document.body.scrollHeight - innerHeight)) * 100;
  document.getElementById('scroll-bar').style.width = pct + '%';
  const nav = document.getElementById('navbar');
  nav.classList.toggle('scrolled', scrollY > 50);
});

// LOADER
const loaderBar = document.getElementById('loaderBar');
const loaderPct = document.getElementById('loaderPct');
let p = 0;
const loadInterval = setInterval(() => {
  p += Math.random() * 15;
  if(p >= 100) { p = 100; clearInterval(loadInterval); setTimeout(() => { document.getElementById('loader').classList.add('hidden'); }, 300); }
  loaderBar.style.width = p + '%';
  loaderPct.textContent = Math.floor(p) + '%';
}, 120);

// TYPING ANIMATION
const phrases = ['React Developer', 'Spring Boot Expert', 'UI/UX Enthusiast', 'Open Source Contributor', 'Problem Solver'];
let pi = 0, ci = 0, deleting = false;
const el = document.getElementById('typingText');
function type() {
  const word = phrases[pi];
  if(!deleting) {
    el.textContent = word.slice(0, ++ci);
    if(ci === word.length) { deleting = true; setTimeout(type, 1800); return; }
    setTimeout(type, 80);
  } else {
    el.textContent = word.slice(0, --ci);
    if(ci === 0) { deleting = false; pi = (pi+1) % phrases.length; setTimeout(type, 300); return; }
    setTimeout(type, 40);
  }
}
setTimeout(type, 1500);

// PARTICLES
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
let particles2 = [];
function resizeCanvas() { canvas.width = innerWidth; canvas.height = innerHeight; }
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

class Particle {
  constructor() { this.reset(); }
  reset() {
    this.x = Math.random() * innerWidth;
    this.y = innerHeight + 10;
    this.vx = (Math.random() - 0.5) * 0.5;
    this.vy = -(Math.random() * 0.8 + 0.3);
    this.size = Math.random() * 2 + 0.5;
    this.opacity = 0;
    this.maxOp = Math.random() * 0.4 + 0.1;
    this.life = 0;
    this.maxLife = Math.random() * 300 + 200;
  }
  update() {
    this.x += this.vx; this.y += this.vy; this.life++;
    const half = this.maxLife / 2;
    this.opacity = this.life < half ? (this.life/half)*this.maxOp : ((this.maxLife-this.life)/half)*this.maxOp;
    if(this.life >= this.maxLife) this.reset();
  }
  draw() {
    ctx.globalAlpha = this.opacity;
    ctx.fillStyle = '#C084FC';
    ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI*2); ctx.fill();
  }
}

for(let i = 0; i < 80; i++) {
  const p2 = new Particle();
  p2.y = Math.random() * innerHeight;
  p2.life = Math.floor(Math.random() * p2.maxLife);
  particles2.push(p2);
}

function animParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles2.forEach(p2 => { p2.update(); p2.draw(); });
  requestAnimationFrame(animParticles);
}
animParticles();

// INTERSECTION OBSERVER
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting) {
      const el = entry.target;
      const delay = parseInt(el.dataset.delay) || 0;
      setTimeout(() => {
        el.classList.add('visible');
        el.querySelectorAll('.skill-bar').forEach(bar => {
          bar.style.width = bar.dataset.width + '%';
        });
      }, delay);
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// MOBILE NAV
document.getElementById('hamburger').addEventListener('click', () => {
  document.getElementById('mobileNav').classList.add('open');
});
document.getElementById('mobileClose').addEventListener('click', () => {
  document.getElementById('mobileNav').classList.remove('open');
});
document.querySelectorAll('.mobile-link').forEach(a => {
  a.addEventListener('click', () => document.getElementById('mobileNav').classList.remove('open'));
});

const modalData = {
  cineworld: {
    title: 'CineWorld — Deep Dive',
    content: `
      <div style="margin-bottom:1.5rem;">
        <div style="width:100%;height:180px;background:linear-gradient(135deg,rgba(123,47,247,0.3),rgba(192,132,252,0.1));border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:4rem;margin-bottom:1.5rem;border:1px solid rgba(168,85,247,0.2);">🎬</div>
        <div style="font-family:'Syne',sans-serif;font-size:1.6rem;font-weight:800;color:#fff;margin-bottom:0.5rem;">CineWorld</div>
        <div style="color:#C4B5FD;font-size:0.9rem;line-height:1.7;margin-bottom:1.2rem;">A global movie discovery platform integrating TMDB API. Users can search, discover, and track movies with a personalized watchlist feature and social sharing capabilities.</div>
        <div style="margin-bottom:1.2rem;">
          <div style="font-family:'JetBrains Mono',monospace;font-size:0.75rem;color:#A855F7;letter-spacing:0.1em;margin-bottom:0.6rem;">KEY FEATURES</div>
          <ul style="color:#C4B5FD;font-size:0.88rem;line-height:1.8;padding-left:1.2rem;">
            <li>TMDB API integration with 500K+ movie database</li>
            <li>JWT authentication + Google OAuth</li>
            <li>Real-time notifications via WebSocket</li>
            <li>Advanced filtering (genre, year, rating, language)</li>
            <li>Personal watchlists and rating system</li>
            <li>Responsive design with dark/light mode</li>
          </ul>
        </div>
        <div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:1.5rem;">
          \${['React','Node.js','Express','MongoDB','JWT','Socket.io','TMDB API','Tailwind CSS','Docker'].map(t=>\`<span style="font-family:'JetBrains Mono',monospace;font-size:0.68rem;padding:0.3rem 0.7rem;background:rgba(123,47,247,0.12);color:#C084FC;border:1px solid rgba(168,85,247,0.25);border-radius:50px;">\${t}</span>\`).join('')}
        </div>
        <div style="display:flex;gap:0.8rem;">
          <a href="#" style="padding:0.6rem 1.3rem;background:linear-gradient(135deg,#7B2FF7,#A855F7);color:#fff;border-radius:8px;font-family:'Space Grotesk',sans-serif;font-size:0.85rem;font-weight:600;text-decoration:none;">Live Demo ↗</a>
          <a href="#" style="padding:0.6rem 1.3rem;background:transparent;color:#C4B5FD;border:1px solid rgba(168,85,247,0.3);border-radius:8px;font-family:'Space Grotesk',sans-serif;font-size:0.85rem;font-weight:600;text-decoration:none;">GitHub</a>
        </div>
      </div>
    `
  },
  fitness_tracker: {
    title: 'Fitness-Tracker — Deep Dive',
    content: `
      <div style="margin-bottom:1.5rem;">
        <div style="width:100%;height:180px;border-radius:12px;overflow:hidden;margin-bottom:1.5rem;border:1px solid rgba(168,85,247,0.2);position:relative;">
          <img src="Screenshot 2026-06-29 165802.png" style="width:100%;height:100%;object-fit:cover;position:relative;z-index:1;" alt="Fitness Tracker">
          <div style="position:absolute;inset:0;background:linear-gradient(135deg,rgba(123,47,247,0.3),transparent);z-index:2;pointer-events:none;"></div>
        </div>
        <div style="font-family:'Syne',sans-serif;font-size:1.6rem;font-weight:800;color:#fff;margin-bottom:0.5rem;">Fitness-Tracker</div>
        <div style="color:#C4B5FD;font-size:0.9rem;line-height:1.7;margin-bottom:1.2rem;">A comprehensive fitness tracking platform to monitor workouts, set health goals, and track daily progress. Features secure user authentication, personalized dashboard analytics, and a modern interactive UI.</div>
        <div style="margin-bottom:1.2rem;">
          <div style="font-family:'JetBrains Mono',monospace;font-size:0.75rem;color:#A855F7;letter-spacing:0.1em;margin-bottom:0.6rem;">KEY FEATURES</div>
          <ul style="color:#C4B5FD;font-size:0.88rem;line-height:1.8;padding-left:1.2rem;">
            <li>Secure authentication and authorization using JWT</li>
            <li>Interactive workout builder and scheduler</li>
            <li>Personalized dashboards tracking calories and logs</li>
            <li>Progress history visualization and health goal setting</li>
            <li>Responsive layouts for desktop, tablet, and mobile</li>
          </ul>
        </div>
        <div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:1.5rem;">
          \${['React','Node.js','Express','MongoDB','JWT','Tailwind CSS','Vercel'].map(t=>\`<span style="font-family:'JetBrains Mono',monospace;font-size:0.68rem;padding:0.3rem 0.7rem;background:rgba(123,47,247,0.12);color:#C084FC;border:1px solid rgba(168,85,247,0.25);border-radius:50px;">\${t}</span>\`).join('')}
        </div>
        <div style="display:flex;gap:0.8rem;">
          <a href="https://fitness-tracker-omega-opal.vercel.app/" target="_blank" rel="noopener" style="padding:0.6rem 1.3rem;background:linear-gradient(135deg,#7B2FF7,#A855F7);color:#fff;border-radius:8px;font-family:'Space Grotesk',sans-serif;font-size:0.85rem;font-weight:600;text-decoration:none;">Live Demo ↗</a>
          <a href="https://github.com/Manvrndra955/portfolio.git" target="_blank" rel="noopener" style="padding:0.6rem 1.3rem;background:transparent;color:#C4B5FD;border:1px solid rgba(168,85,247,0.3);border-radius:8px;font-family:'Space Grotesk',sans-serif;font-size:0.85rem;font-weight:600;text-decoration:none;">GitHub</a>
        </div>
      </div>
    `
  }
};

function openModal(id) {
  const modal = document.getElementById('modal');
  const content = document.getElementById('modalContent');
  if(modalData[id]) {
    content.innerHTML = modalData[id].content;
    modal.classList.add('open');
  }
}
function closeModal() {
  document.getElementById('modal').classList.remove('open');
}
document.getElementById('modal').addEventListener('click', e => {
  if(e.target === document.getElementById('modal')) closeModal();
});

// CONTACT FORM
function handleSubmit() {
  const name = document.querySelector('.contact-form .form-input').value;
  const subject = document.querySelectorAll('.contact-form .form-input')[2].value || 'Portfolio Inquiry';
  const message = document.querySelector('.form-textarea').value;
  const mailto = `mailto:manvendraprataps064@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Hi Manvendra,\n\n${message}\n\n— ${name}`)}`;
  window.location.href = mailto;
  const btn = document.querySelector('.form-submit');
  btn.textContent = '✓ Opening Email Client...';
  btn.style.background = 'linear-gradient(135deg,#22C55E,#16A34A)';
  setTimeout(() => { btn.textContent = 'Send Message →'; btn.style.background = ''; }, 3000);
}

// THEME TOGGLE (light mode)
let isLight = false;
document.getElementById('themeToggle').addEventListener('click', () => {
  isLight = !isLight;
  document.documentElement.style.setProperty('--bg', isLight ? '#F8F4FF' : '#070014');
  document.documentElement.style.setProperty('--bg2', isLight ? '#F0EAFF' : '#0d0020');
  document.documentElement.style.setProperty('--txt', isLight ? '#0D0020' : '#FFFFFF');
  document.documentElement.style.setProperty('--txt2', isLight ? '#4C1D95' : '#C4B5FD');
  document.documentElement.style.setProperty('--txt3', isLight ? '#7C3AED' : '#7C6FAA');
  document.documentElement.style.setProperty('--card', isLight ? 'rgba(123,47,247,0.05)' : 'rgba(123,47,247,0.06)');
  document.documentElement.style.setProperty('--glass', isLight ? 'rgba(248,244,255,0.8)' : 'rgba(7,0,20,0.7)');
  document.getElementById('themeToggle').textContent = isLight ? '🌙' : '☀️';
});

// TILT EFFECT ON PROJECT CARDS
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left; const y = e.clientY - rect.top;
    const cx = rect.width/2; const cy = rect.height/2;
    const rx = (y - cy) / cy * 4;
    const ry = (cx - x) / cx * 4;
    card.style.transform = `translateY(-4px) scale(1.01) rotateX(${rx}deg) rotateY(${ry}deg)`;
    card.style.perspective = '800px';
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});
