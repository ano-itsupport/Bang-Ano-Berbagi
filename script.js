// === HAMBURGER MENU ===
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  hamburger.classList.toggle('active');
});
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.classList.remove('active');
  });
});

// === ANIMASI SCROLL (MUNCUL & HILANG) ===
const fadeElems = document.querySelectorAll(".fade-scroll");
function handleScroll() {
  fadeElems.forEach(el => {
    const rect = el.getBoundingClientRect();
    const inView = rect.top < window.innerHeight - 100 && rect.bottom > 100;
    if (inView) {
      el.classList.add("visible");
      el.classList.remove("hidden");
    } else {
      el.classList.remove("visible");
      el.classList.add("hidden");
    }
  });
}
window.addEventListener("scroll", handleScroll);
window.addEventListener("load", handleScroll);

// === PARTIKEL INTERAKTIF ===
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray = [];
const numParticles = 80;

// Membuat partikel
class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2 + 1;
    this.speedX = (Math.random() - 0.5) * 0.4;
    this.speedY = (Math.random() - 0.5) * 0.4;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
    if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(0, 123, 255, 0.7)";
    ctx.fill();
  }
}
function init() {
  particlesArray = [];
  for (let i = 0; i < numParticles; i++) {
    particlesArray.push(new Particle());
  }
}
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particlesArray.forEach(p => {
    p.update();
    p.draw();
  });
  connectParticles();
  requestAnimationFrame(animate);
}
function connectParticles() {
  for (let a = 0; a < particlesArray.length; a++) {
    for (let b = a; b < particlesArray.length; b++) {
      const dx = particlesArray[a].x - particlesArray[b].x;
      const dy = particlesArray[a].y - particlesArray[b].y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < 100) {
        ctx.strokeStyle = "rgba(0, 123, 255, 0.15)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
        ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
        ctx.stroke();
      }
    }
  }
}

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  init();
});

init();
animate();

// === EFEK TOMBOL KEAHLIAN MENGAMBANG ===
const skillButtons = document.querySelectorAll(".skill-btn");
skillButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    btn.classList.remove("clicked"); // reset animasi
    void btn.offsetWidth; // trigger reflow agar animasi bisa diulang
    btn.classList.add("clicked");
  });
});
