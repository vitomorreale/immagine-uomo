// ==========================================================================
// Immagine Uomo — shared interactivity
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  /* ---------- Active nav link ---------- */
  const current = (location.pathname.split('/').pop() || 'index.html');
  document.querySelectorAll('.nav-link[data-nav]').forEach(link => {
    if (link.getAttribute('data-nav') === current) {
      link.classList.add('text-gold');
      link.setAttribute('aria-current', 'page');
    }
  });

  /* ---------- Footer year ---------- */
  document.querySelectorAll('[data-year]').forEach(el => {
    el.textContent = new Date().getFullYear();
  });

  /* ---------- Sticky header shadow ---------- */
  const header = document.querySelector('header.site-header');
  if (header) {
    const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---------- Mobile menu ---------- */
  const menuBtn = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      const isOpen = mobileMenu.style.maxHeight && mobileMenu.style.maxHeight !== '0px';
      mobileMenu.style.maxHeight = isOpen ? '0px' : mobileMenu.scrollHeight + 'px';
      menuBtn.setAttribute('aria-expanded', String(!isOpen));
      menuBtn.classList.toggle('is-open', !isOpen);
    });
  }

  /* ---------- Testimonial carousel (simple dot-based) ---------- */
  document.querySelectorAll('[data-carousel]').forEach(carousel => {
    const track = carousel.querySelector('[data-carousel-track]');
    const slides = Array.from(track ? track.children : []);
    const dotsWrap = carousel.querySelector('[data-carousel-dots]');
    if (!track || slides.length === 0) return;
    let index = 0;

    if (dotsWrap) {
      slides.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.className = 'step-dot' + (i === 0 ? ' active' : '');
        dot.setAttribute('aria-label', `Vai alla recensione ${i + 1}`);
        dot.addEventListener('click', () => goTo(i));
        dotsWrap.appendChild(dot);
      });
    }

    function goTo(i) {
      index = (i + slides.length) % slides.length;
      track.style.transform = `translateX(-${index * 100}%)`;
      if (dotsWrap) {
        Array.from(dotsWrap.children).forEach((d, di) => d.classList.toggle('active', di === index));
      }
    }

    carousel.querySelector('[data-carousel-prev]')?.addEventListener('click', () => goTo(index - 1));
    carousel.querySelector('[data-carousel-next]')?.addEventListener('click', () => goTo(index + 1));

    let auto = setInterval(() => goTo(index + 1), 6000);
    carousel.addEventListener('mouseenter', () => clearInterval(auto));
    carousel.addEventListener('mouseleave', () => { auto = setInterval(() => goTo(index + 1), 6000); });
  });

  /* ---------- Booking widget (multi-step, no backend — sends via WhatsApp/email) ---------- */
  const booking = document.getElementById('booking-widget');
  if (booking) {
    const steps = Array.from(booking.querySelectorAll('.booking-step'));
    const dots = Array.from(booking.querySelectorAll('.booking-progress .step-dot'));
    let current = 0;
    const state = { category: '', service: '', staff: 'Nessuna preferenza', date: '', time: '', name: '', phone: '' };

    function render() {
      steps.forEach((s, i) => s.classList.toggle('active', i === current));
      dots.forEach((d, i) => d.classList.toggle('active', i <= current));
    }

    booking.querySelectorAll('[data-chip-group]').forEach(group => {
      group.querySelectorAll('.chip').forEach(chip => {
        chip.addEventListener('click', () => {
          group.querySelectorAll('.chip').forEach(c => c.classList.remove('selected'));
          chip.classList.add('selected');
          state[group.dataset.chipGroup] = chip.dataset.value || chip.textContent.trim();
          if (group.dataset.chipGroup === 'service') {
            const summary = booking.querySelector('[data-selected-service]');
            if (summary) summary.textContent = state.service;
          }
        });
      });
    });

    booking.querySelectorAll('[data-next]').forEach(btn => {
      btn.addEventListener('click', () => {
        if (current < steps.length - 1) { current++; render(); }
      });
    });
    booking.querySelectorAll('[data-back]').forEach(btn => {
      btn.addEventListener('click', () => {
        if (current > 0) { current--; render(); }
      });
    });

    const dateInput = booking.querySelector('#booking-date');
    const timeInput = booking.querySelector('#booking-time');
    const nameInput = booking.querySelector('#booking-name');
    const phoneInput = booking.querySelector('#booking-phone');

    const summaryBox = booking.querySelector('[data-summary]');
    const finalBtn = booking.querySelector('[data-finalize]');

    finalBtn?.addEventListener('click', (e) => {
      e.preventDefault();
      state.date = dateInput?.value || '';
      state.time = timeInput?.value || '';
      state.name = nameInput?.value || '';
      state.phone = phoneInput?.value || '';

      if (!state.service || !state.date || !state.time || !state.name) {
        summaryBox.innerHTML = '<p class="text-red-600 text-sm font-semibold">Completa servizio, data, ora e nome prima di inviare la richiesta.</p>';
        return;
      }

      const msg = [
        'Ciao Immagine Uomo! Vorrei prenotare:',
        `Servizio: ${state.service}`,
        `Professionista: ${state.staff}`,
        `Data preferita: ${state.date}`,
        `Ora preferita: ${state.time}`,
        `Nome: ${state.name}`,
        state.phone ? `Telefono: ${state.phone}` : ''
      ].filter(Boolean).join('\n');

      const waLink = `https://wa.me/393200987400?text=${encodeURIComponent(msg)}`;

      summaryBox.innerHTML = `
        <div class="rounded-2xl bg-[var(--color-cream-2)] border border-gold/30 p-5 text-sm space-y-2">
          <p class="font-semibold text-base mb-1">Riepilogo richiesta</p>
          <p><strong>Servizio:</strong> ${state.service}</p>
          <p><strong>Professionista:</strong> ${state.staff}</p>
          <p><strong>Data/ora:</strong> ${state.date} — ${state.time}</p>
          <p><strong>Nome:</strong> ${state.name}${state.phone ? ' · ' + state.phone : ''}</p>
          <p class="pt-2 text-xs text-[var(--color-ink-soft)]">Nessun sistema di calendario è collegato in questa demo: invia la richiesta su WhatsApp per la conferma definitiva della disponibilità.</p>
        </div>`;

      const waBtn = booking.querySelector('[data-wa-confirm]');
      if (waBtn) waBtn.href = waLink;
      const waStep = booking.querySelector('[data-wa-step]');
      if (waStep) waStep.classList.remove('hidden');
    });

    render();
  }
});
