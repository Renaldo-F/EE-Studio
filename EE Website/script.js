/* ═══════════════════════════════════════════════
   Edge & Elegance Beauty & Barber Studio
   script.js — Slideshow Controller
   ═══════════════════════════════════════════════ */

const slides   = document.querySelectorAll('aside figure');
const dots     = document.querySelectorAll('.slide-dots span');
const progress = document.querySelector('aside progress');
const DURATION = 5000; // ms per slide

let current      = 0;
let timer        = null;
let progressTimer = null;
let startTime    = null;

/* Go to a specific slide by index */
function goTo(index) {
  slides[current].classList.remove('active');
  dots[current].classList.remove('active');

  current = (index + slides.length) % slides.length;

  slides[current].classList.add('active');
  dots[current].classList.add('active');

  resetProgress();
}

/* Animate the progress bar for the current slide */
function resetProgress() {
  clearInterval(progressTimer);
  startTime = Date.now();

  progressTimer = setInterval(() => {
    const elapsed = Date.now() - startTime;
    const pct = Math.min((elapsed / DURATION) * 100, 100);
    progress.value = pct;
    if (pct >= 100) clearInterval(progressTimer);
  }, 30);
}

/* Start (or restart) the auto-advance timer */
function startAuto() {
  clearInterval(timer);
  timer = setInterval(() => goTo(current + 1), DURATION);
}

/* ─── Event Listeners ─── */

document.getElementById('next-btn').addEventListener('click', () => {
  goTo(current + 1);
  startAuto();
});

document.getElementById('prev-btn').addEventListener('click', () => {
  goTo(current - 1);
  startAuto();
});

dots.forEach((dot, i) => {
  dot.addEventListener('click', () => {
    goTo(i);
    startAuto();
  });
});

/* Pause on hover, resume on leave */
const asideEl = document.querySelector('aside');
asideEl.addEventListener('mouseenter', () => {
  clearInterval(timer);
  clearInterval(progressTimer);
});
asideEl.addEventListener('mouseleave', () => {
  startAuto();
  resetProgress();
});

/* ─── Init ─── */
startAuto();
resetProgress();
