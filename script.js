/* ============================================================
   DEVTRICA AI AGENCY — SCRIPT
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- NAVBAR SCROLL STATE ---------- */
  const navbar = document.getElementById('navbar');
  if (navbar) {
    const onScroll = () => {
      navbar.classList.toggle('scrolled', window.scrollY > 12);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---------- MOBILE MENU ---------- */
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  if (hamburger && mobileMenu) {
    const closeMobileMenu = () => {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    };

    hamburger.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('open');
      hamburger.classList.toggle('open', isOpen);
      hamburger.setAttribute('aria-expanded', String(isOpen));
      // Stop the page scrolling behind the menu on iOS
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeMobileMenu);
    });

    // Close on Escape and when the viewport grows back to desktop
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileMenu.classList.contains('open')) closeMobileMenu();
    });
    window.addEventListener('resize', () => {
      if (window.innerWidth > 860 && mobileMenu.classList.contains('open')) closeMobileMenu();
    }, { passive: true });
  }

  /* ---------- ACTIVE NAV LINK ON SCROLL ---------- */
  const sections = document.querySelectorAll('main section[id], .hero[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const setActiveLink = (id) => {
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
    });
  };

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) setActiveLink(entry.target.id);
    });
  }, { rootMargin: '-40% 0px -55% 0px', threshold: 0 });

  sections.forEach(sec => navObserver.observe(sec));

  /* ---------- SCROLL REVEAL ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(el => revealObserver.observe(el));

  /* ---------- ANIMATED COUNTERS ---------- */
  const animateCounter = (el) => {
    const target = parseFloat(el.dataset.target);
    const prefix = el.dataset.prefix || '';
    const suffix = el.dataset.suffix || '';
    const duration = 1400;
    const start = performance.now();

    const formatNumber = (n) => Math.round(n).toLocaleString('en-US');

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      const value = target * eased;
      el.textContent = `${prefix}${formatNumber(value)}${suffix}`;
      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        el.textContent = `${prefix}${formatNumber(target)}${suffix}`;
      }
    };
    requestAnimationFrame(tick);
  };

  // Static values such as "24/7" are written in directly, not animated
  document.querySelectorAll('[data-static]').forEach(el => {
    el.textContent = el.dataset.static;
  });

  const counterEls = document.querySelectorAll('[data-counter]');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });
  counterEls.forEach(el => counterObserver.observe(el));

  /* ---------- POS FILTER (SAMPLE DATA SWAP) ---------- */
  const posDataSets = {
    today: { sales: 128450, orders: 248, profit: 42680, sold: 684,
      points: '0,150 70,120 140,135 210,90 280,100 350,60 420,80 490,40 560,55 630,20 700,35' },
    '7d': { sales: 812300, orders: 1540, profit: 268400, sold: 4120,
      points: '0,170 70,150 140,160 210,120 280,130 350,95 420,110 490,70 560,90 630,50 700,60' },
    '30d': { sales: 3145000, orders: 6320, profit: 980500, sold: 17840,
      points: '0,180 70,140 140,155 210,100 280,120 350,70 420,95 490,55 560,75 630,30 700,45' },
    custom: { sales: 450000, orders: 1245, profit: 170000, sold: 2380,
      points: '0,160 70,130 140,145 210,105 280,115 350,80 420,100 490,60 560,80 630,40 700,55' }
  };

  const posFilter = document.getElementById('posFilter');
  const posStats = document.getElementById('posStats');
  const posChartLine = document.getElementById('posChartLine');

  if (posFilter && posStats && posChartLine) {
  posFilter.addEventListener('click', (e) => {
    const btn = e.target.closest('.filter-btn');
    if (!btn) return;

    posFilter.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const range = btn.dataset.range;
    const data = posDataSets[range];
    if (!data) return;

    const statEls = posStats.querySelectorAll('.pos-stat-value');
    const configs = [
      { el: statEls[0], target: data.sales, prefix: 'Rs. ' },
      { el: statEls[1], target: data.orders, prefix: '' },
      { el: statEls[2], target: data.profit, prefix: 'Rs. ' },
      { el: statEls[3], target: data.sold, prefix: '' }
    ];
    configs.forEach(cfg => {
      cfg.el.dataset.target = cfg.target;
      cfg.el.dataset.prefix = cfg.prefix;
      animateCounter(cfg.el);
    });

    posChartLine.setAttribute('points', data.points);
    const fill = posChartLine.nextElementSibling;
    if (fill) fill.setAttribute('points', `${data.points} 700,220 0,220`);
  });
  }

  /* ---------- CUSTOM DATE REPORT DEMO ---------- */
  const generateReportBtn = document.getElementById('generateReportBtn');
  const demoResults = document.getElementById('demoResults');
  const fromDateInput = document.getElementById('fromDate');
  const toDateInput = document.getElementById('toDate');

  if (generateReportBtn && demoResults && fromDateInput && toDateInput) {
  generateReportBtn.addEventListener('click', () => {
    const from = new Date(fromDateInput.value);
    const to = new Date(toDateInput.value);

    if (!fromDateInput.value || !toDateInput.value || to < from) {
      fromDateInput.style.borderColor = '#E0475C';
      toDateInput.style.borderColor = '#E0475C';
      return;
    }
    fromDateInput.style.borderColor = '';
    toDateInput.style.borderColor = '';

    // Front-end demo only: derive sample figures from the selected day span.
    const dayCount = Math.max(1, Math.round((to - from) / (1000 * 60 * 60 * 24)) + 1);
    const sales = dayCount * 14500;
    const expenses = Math.round(sales * 0.62);
    const profit = sales - expenses;
    const orders = dayCount * 40;

    const statEls = demoResults.querySelectorAll('.demo-stat-value');
    const configs = [
      { el: statEls[0], target: sales, prefix: 'Rs. ' },
      { el: statEls[1], target: expenses, prefix: 'Rs. ' },
      { el: statEls[2], target: profit, prefix: 'Rs. ' },
      { el: statEls[3], target: orders, prefix: '' }
    ];
    configs.forEach(cfg => {
      cfg.el.dataset.target = cfg.target;
      cfg.el.dataset.prefix = cfg.prefix;
      animateCounter(cfg.el);
    });
  });
  }

  /* ---------- CONTACT FORM -> WHATSAPP ---------- */
  const contactForm = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');
  const WHATSAPP_NUMBER = '923140409219';

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const fields = {
      name: document.getElementById('fName'),
      phone: document.getElementById('fPhone'),
      email: document.getElementById('fEmail'),
      businessType: document.getElementById('fBusiness'),
      service: document.getElementById('fService'),
      message: document.getElementById('fMessage')
    };

    let valid = true;

    Object.values(fields).forEach(field => {
      const group = field.closest('.form-group');
      let fieldValid = field.value.trim().length > 0;
      if (field === fields.email && fieldValid) {
        fieldValid = emailPattern.test(field.value.trim());
      }
      group.classList.toggle('invalid', !fieldValid);
      if (!fieldValid) valid = false;
    });

    if (!valid) return;

    const values = {
      name: fields.name.value.trim(),
      phone: fields.phone.value.trim(),
      email: fields.email.value.trim(),
      businessType: fields.businessType.value.trim(),
      service: fields.service.value,
      message: fields.message.value.trim()
    };

    const messageText =
`Hello Devtrica AI Agency,

I would like to discuss a project.

Name: ${values.name}
Phone: ${values.phone}
Email: ${values.email}
Business Type: ${values.businessType}
Service: ${values.service}

Message:
${values.message}

Please contact me regarding this project.`;

    const encodedMessage = encodeURIComponent(messageText);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

    formSuccess.classList.add('show');

    setTimeout(() => {
      window.open(whatsappUrl, '_blank', 'noopener');
    }, 600);
  });

  // Clear invalid state as the user fixes a field
  contactForm.querySelectorAll('input, select, textarea').forEach(field => {
    field.addEventListener('input', () => {
      field.closest('.form-group').classList.remove('invalid');
      formSuccess.classList.remove('show');
    });
    field.addEventListener('change', () => {
      field.closest('.form-group').classList.remove('invalid');
    });
  });
  }

  /* ---------- FAQ: one answer open at a time ---------- */
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    item.addEventListener('toggle', () => {
      if (!item.open) return;
      faqItems.forEach(other => {
        if (other !== item) other.open = false;
      });
    });
  });

  /* ---------- CURRENT PAGE HIGHLIGHT (multi-page nav) ---------- */
  const here = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link, .mobile-link, .footer-col a').forEach(link => {
    const href = link.getAttribute('href') || '';
    if (href === here) link.classList.add('active');
  });

});
