// ===== PARTICLES =====
const particlesContainer = document.getElementById('particles');
for (let i = 0; i < 60; i++) {
  const p = document.createElement('div');
  p.classList.add('particle');
  p.style.left = Math.random() * 100 + 'vw';
  p.style.animationDuration = (Math.random() * 15 + 8) + 's';
  p.style.animationDelay = (Math.random() * 10) + 's';
  p.style.width = (Math.random() * 3 + 1) + 'px';
  p.style.height = p.style.width;
  const colors = ['#00ff88', '#00d4ff', '#ff6b35', '#7c3aed'];
  p.style.background = colors[Math.floor(Math.random() * colors.length)];
  particlesContainer.appendChild(p);
}

// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// ===== HAMBURGER =====
const hamburger = document.getElementById('hamburger');
const navLinks  = document.querySelector('.nav-links');
hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ===== TYPING NAME =====
const names   = ['Kanchan Kumari', 'a Unity Game Developer'];
let nameIdx   = 0, charIdx = 0, deleting = false;
const typedEl = document.getElementById('typed-name');

function typeWriter() {
  const current = names[nameIdx];
  typedEl.textContent = deleting
    ? current.substring(0, charIdx--)
    : current.substring(0, charIdx++);
  typedEl.style.borderRight = '3px solid #00ff88';
  let delay = deleting ? 60 : 100;
  if (!deleting && charIdx === current.length + 1) { delay = 2000; deleting = true; }
  else if (deleting && charIdx === 0) { deleting = false; nameIdx = (nameIdx + 1) % names.length; delay = 400; }
  setTimeout(typeWriter, delay);
}
typeWriter();

// ===== CODE ANIMATION =====
const codeLines = [
  '<span style="color:#c678dd">public class</span> <span style="color:#e5c07b">PlayerController</span> : MonoBehaviour',
  '{',
  '    <span style="color:#c678dd">void</span> <span style="color:#61afef">Start</span>()',
  '    {',
  '        <span style="color:#61afef">ChangeState</span>(<span style="color:#c678dd">new</span> <span style="color:#e5c07b">IdleState</span>());',
  '    }',
  '',
  '    <span style="color:#c678dd">void</span> <span style="color:#61afef">Update</span>()',
  '    {',
  '        currentState?.<span style="color:#61afef">Update</span>(<span style="color:#e06c75">this</span>);',
  '    }',
  '',
  '    <span style="color:#c678dd">public void</span> <span style="color:#61afef">ChangeState</span>(<span style="color:#e5c07b">IPlayerState</span> s)',
  '    {',
  '        currentState?.<span style="color:#61afef">Exit</span>(<span style="color:#e06c75">this</span>);',
  '        currentState = s;',
  '        currentState.<span style="color:#61afef">Enter</span>(<span style="color:#e06c75">this</span>);',
  '    }',
  '}',
  '',
  '<span style="color:#98c379">// 🎮 State Pattern in action!</span>',
];
const codeEl = document.getElementById('code-animation');
let lineIdx = 0;
function animateCode() {
  if (lineIdx < codeLines.length) {
    codeEl.innerHTML += codeLines[lineIdx] + '\n';
    lineIdx++;
    setTimeout(animateCode, 80);
  }
}
setTimeout(animateCode, 800);

// ===== COUNTER =====
function animateCounter(el) {
  const target = parseInt(el.dataset.target);
  const step = target / (2000 / 16);
  let current = 0;
  const timer = setInterval(() => {
    current += step;
    if (current >= target) { el.textContent = target; clearInterval(timer); }
    else el.textContent = Math.floor(current);
  }, 16);
}

// ===== SKILL BARS =====
function animateSkills() {
  document.querySelectorAll('.skill-fill').forEach(bar => {
    bar.style.width = bar.dataset.width + '%';
  });
}

// ===== INTERSECTION OBSERVER =====
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('visible');
    if (entry.target.classList.contains('hero-content') || entry.target.classList.contains('hero')) {
      document.querySelectorAll('.stat-number').forEach(animateCounter);
    }
    if (entry.target.closest('.skills')) animateSkills();
    observer.unobserve(entry.target);
  });
}, { threshold: 0.15 });

document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

// ===== PROJECT FILTER =====
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    document.querySelectorAll('.project-card').forEach(card => {
      const cat = card.dataset.category || '';
      card.classList.toggle('hidden', filter !== 'all' && !cat.includes(filter));
    });
  });
});

// ===== ACTIVE NAV =====
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY + 120;
  sections.forEach(section => {
    const link = document.querySelector(`.nav-links a[href="#${section.getAttribute('id')}"]`);
    if (link) link.style.color = (scrollY >= section.offsetTop && scrollY < section.offsetTop + section.offsetHeight) ? 'var(--accent)' : '';
  });
});

// ===== CONTACT FORM =====
document.getElementById('contactForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = e.target.querySelector('button[type="submit"]');
  btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
  btn.style.background = '#00cc6a';
  setTimeout(() => {
    btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
    btn.style.background = '';
    e.target.reset();
  }, 3000);
});

// ===== CURSOR GLOW =====
const glow = document.createElement('div');
glow.style.cssText = `position:fixed;pointer-events:none;z-index:9999;width:300px;height:300px;border-radius:50%;background:radial-gradient(circle,rgba(0,255,136,0.04) 0%,transparent 70%);transform:translate(-50%,-50%);transition:left 0.1s,top 0.1s;`;
document.body.appendChild(glow);
document.addEventListener('mousemove', e => { glow.style.left = e.clientX + 'px'; glow.style.top = e.clientY + 'px'; });
