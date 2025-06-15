// mobile menu toggle
const toggle = document.querySelector('.menu-toggle');
const menu = document.getElementById('mobileMenu');
if (toggle && menu) {
  toggle.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', !expanded);
    menu.hidden = expanded;
  });
}

// update year
document.getElementById('year').textContent = new Date().getFullYear();

// analytics hook for booking buttons
function trackBook() {
  if (typeof gtag === 'function') {
    gtag('event', 'book_btn');
  }
}

document.querySelectorAll('.book-link').forEach(btn => {
  btn.addEventListener('click', trackBook);
});

// analytics hook for contact buttons
function trackContact(label) {
  if (typeof gtag === 'function') {
    gtag('event', 'contact_click', { 'event_label': label });
  }
}

document.querySelectorAll('a[href^="tel:"]').forEach(el => {
  el.addEventListener('click', () => trackContact('phone'));
});

document.querySelectorAll('a[href^="mailto:"]').forEach(el => {
  el.addEventListener('click', () => trackContact('email'));
});
