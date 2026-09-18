// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const primaryNav = document.getElementById('primaryNav');
navToggle.addEventListener('click', () => {
  const open = primaryNav.classList.toggle('is-open');
  navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  primaryNav.style.display = open ? 'flex' : 'none';
  primaryNav.style.flexDirection = 'column';
  primaryNav.style.position = 'absolute';
  primaryNav.style.top = '76px';
  primaryNav.style.left = '0';
  primaryNav.style.right = '0';
  primaryNav.style.background = '#f4f1ea';
  primaryNav.style.padding = '18px 28px';
  primaryNav.style.borderBottom = '1px solid rgba(27,36,31,0.14)';
  primaryNav.style.gap = '16px';
});
primaryNav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  if (window.innerWidth <= 860){ primaryNav.style.display = 'none'; navToggle.setAttribute('aria-expanded','false'); }
}));

// TikTok strip scroll buttons
const strip = document.getElementById('tiktokStrip');
document.getElementById('stripPrev').addEventListener('click', () => strip.scrollBy({left: -240, behavior:'smooth'}));
document.getElementById('stripNext').addEventListener('click', () => strip.scrollBy({left: 240, behavior:'smooth'}));

// Testimonial carousel
const testimonials = Array.from(document.querySelectorAll('.testimonial'));
const dotsWrap = document.getElementById('testDots');
let testIndex = 0;
testimonials.forEach((_, i) => {
  const dot = document.createElement('button');
  dot.className = 'dot' + (i === 0 ? ' active' : '');
  dot.setAttribute('aria-label', 'Go to testimonial ' + (i + 1));
  dot.addEventListener('click', () => showTestimonial(i));
  dotsWrap.appendChild(dot);
});
function showTestimonial(i){
  testimonials[testIndex].classList.remove('active');
  dotsWrap.children[testIndex].classList.remove('active');
  testIndex = (i + testimonials.length) % testimonials.length;
  testimonials[testIndex].classList.add('active');
  dotsWrap.children[testIndex].classList.add('active');
}
document.getElementById('testPrev').addEventListener('click', () => showTestimonial(testIndex - 1));
document.getElementById('testNext').addEventListener('click', () => showTestimonial(testIndex + 1));

// Booking form -> WhatsApp
const WHATSAPP_NUMBER = '923018748449'; // international format, no + or leading 0
const bookForm = document.getElementById('bookForm');
const formStatus = document.getElementById('formStatus');

bookForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('fName').value.trim();
  const phone = document.getElementById('fPhone').value.trim();
  const condition = document.getElementById('fCondition').value.trim();
  const time = document.getElementById('fTime').value.trim();

  if (!name || !phone || !condition){
    formStatus.textContent = "Please fill in your name, phone and what's going on.";
    formStatus.style.color = '#c0432c';
    return;
  }

  const lines = [
    'New appointment request',
    'Name: ' + name,
    'Phone: ' + phone,
    'Condition: ' + condition
  ];
  if (time) lines.push('Preferred time: ' + time);

  const message = encodeURIComponent(lines.join('\n'));
  const url = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + message;

  formStatus.textContent = 'Opening WhatsApp…';
  formStatus.style.color = '';
  window.open(url, '_blank');
  bookForm.reset();
});

document.getElementById('year').textContent = new Date().getFullYear();
