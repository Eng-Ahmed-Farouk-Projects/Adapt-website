(() => {
  'use strict';

  const CONFIG = window.ADAPT_CONFIG || {};
  const DATA = window.ADAPT_DATA || {};
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const escapeHTML = (value = '') => String(value).replace(/[&<>"']/g, (char) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[char]));

  const navigation = [
    { label: 'Home', href: './index.html', key: 'home' },
    { label: 'About', href: './about.html', key: 'about' },
    { label: 'Ecosystem', href: './ecosystem.html', key: 'ecosystem' },
    { label: 'Programs', href: './programs.html', key: 'programs' },
    { label: 'Hackathons', href: './hackathons.html', key: 'hackathons' },
    { label: 'Incubation', href: './incubation.html', key: 'incubation' },
    { label: 'Projects', href: './projects.html', key: 'projects' },
    { label: 'Global Network', href: './global-network.html', key: 'global' },
    { label: 'Partners', href: './partners.html', key: 'partners' },
  ];

  function renderHeader() {
    const header = $('#site-header');
    if (!header) return;
    const current = document.body.dataset.page || 'home';
    const logo = CONFIG.brand?.logoPrimary || './assets/adapt-logo-placeholder.svg';
    header.innerHTML = `
      <div class="site-nav" id="site-nav">
        <div class="container nav-inner">
          <a class="brand" href="./index.html" aria-label="Adapt Community home"><img src="${escapeHTML(logo)}" alt="Adapt Community"></a>
          <button class="nav-toggle" type="button" aria-label="Open navigation" aria-controls="primary-navigation" aria-expanded="false"><span></span><span></span><span></span></button>
          <nav class="primary-nav" id="primary-navigation" aria-label="Primary navigation">
            ${navigation.map(item => `<a class="nav-link ${item.key === current ? 'active' : ''}" href="${item.href}" ${item.key === current ? 'aria-current="page"' : ''}>${item.label}</a>`).join('')}
            <a class="nav-cta" href="./join.html">Join Adapt <span>↗</span></a>
          </nav>
        </div>
      </div>`;

    const toggle = $('.nav-toggle', header);
    const nav = $('.primary-nav', header);
    toggle?.addEventListener('click', () => {
      const open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!open));
      toggle.setAttribute('aria-label', open ? 'Open navigation' : 'Close navigation');
      nav?.classList.toggle('open', !open);
      document.body.classList.toggle('nav-open', !open);
    });
    $$('.primary-nav a', header).forEach(link => link.addEventListener('click', () => {
      nav?.classList.remove('open');
      toggle?.setAttribute('aria-expanded', 'false');
      toggle?.setAttribute('aria-label', 'Open navigation');
      document.body.classList.remove('nav-open');
    }));

    const updateHeader = () => $('#site-nav')?.classList.toggle('scrolled', window.scrollY > 22);
    updateHeader();
    window.addEventListener('scroll', updateHeader, { passive: true });
  }

  function renderFooter() {
    const footer = $('#site-footer');
    if (!footer) return;
    const email = CONFIG.contact?.email || '';
    footer.innerHTML = `
      <div class="footer-top"><div class="container footer-grid">
        <div class="footer-brand-block"><a href="./index.html" class="footer-brand"><img src="${escapeHTML(CONFIG.brand?.logoWhite || './assets/adapt-logo-placeholder.svg')}" alt="Adapt Community"></a><p>Empowering teenagers through STEAM, entrepreneurship, freelancing, leadership, innovation, and community development.</p><span class="footer-origin">ORIGINATING IN ALEXANDRIA, EGYPT</span></div>
        <div class="footer-nav-col"><h3>Explore</h3><a href="./about.html">About Adapt</a><a href="./ecosystem.html">The ecosystem</a><a href="./programs.html">Programs</a><a href="./hackathons.html">Hackathons</a></div>
        <div class="footer-nav-col"><h3>Build</h3><a href="./incubation.html">Projecta incubation</a><a href="./projects.html">Projects</a><a href="./global-network.html">Global network</a><a href="./partners.html">Wider network</a></div>
        <div class="footer-contact-col"><h3>Connect</h3><p>Interested in learning, volunteering, mentoring, or collaborating?</p>${email ? `<a class="footer-email" href="mailto:${escapeHTML(email)}">${escapeHTML(email)} ↗</a>` : ''}<a class="btn btn-small btn-outline" href="./join.html">Find your pathway</a></div>
      </div></div>
      <div class="footer-bottom"><div class="container footer-bottom-inner"><span>© <span id="footer-year"></span> Adapt Community</span><span>Learning meets doing.</span><a href="#top" class="back-top">Back to top ↑</a></div></div>`;
    const year = $('#footer-year');
    if (year) year.textContent = new Date().getFullYear();
  }

  function projectCard(project, compact = false) {
    const img = CONFIG.assets?.projectLogos?.[project.id] || '';
    const art = img
      ? `<img src="${escapeHTML(img)}" alt="${escapeHTML(project.name)} project logo" loading="lazy">`
      : `<span class="project-symbol-text">${escapeHTML(project.symbol || 'AD')}</span>`;
    return `<article class="project-card reveal" data-project-category="${escapeHTML(project.category)}">
      <div class="project-card-visual"><div class="project-card-mark">${art}</div><span class="project-card-type">${escapeHTML(project.type)}</span><span class="project-card-number">${String(DATA.projects.indexOf(project) + 1).padStart(2, '0')}</span></div>
      <div class="project-card-copy"><h3>${escapeHTML(project.name)}</h3><p>${escapeHTML(project.description)}</p><a class="text-link" href="${escapeHTML(project.detail)}">Explore profile <span>↗</span></a></div>
    </article>`;
  }

  function renderProjectCards() {
    const home = $('#home-project-grid');
    if (home) home.innerHTML = (DATA.projects || []).slice(0, 3).map(p => projectCard(p, true)).join('');
    const full = $('#projects-directory-grid');
    if (full) full.innerHTML = (DATA.projects || []).map(p => projectCard(p)).join('');
    const incubation = $('#incubation-project-grid');
    if (incubation) incubation.innerHTML = (DATA.projects || []).map(p => projectCard(p, true)).join('');
  }

  function pillarCard(pillar) {
    return `<article class="pillar-card reveal"><div class="pillar-card-head"><span class="pillar-icon">${escapeHTML(pillar.icon)}</span><span class="pillar-tag">${escapeHTML(pillar.tag)}</span></div><h3>${escapeHTML(pillar.title)}</h3><p>${escapeHTML(pillar.text)}</p><a class="card-arrow" href="${escapeHTML(pillar.link)}" aria-label="Explore ${escapeHTML(pillar.title)}">↗</a></article>`;
  }
  function renderPillars() {
    const grid = $('#home-pillar-grid');
    if (grid) grid.innerHTML = (DATA.pillars || []).map(pillarCard).join('');
  }

  function renderJourney() {
    const holder = $('#home-journey');
    if (!holder) return;
    holder.innerHTML = (DATA.journey || []).map((step, index) => `<article class="journey-step reveal"><div class="journey-step-top"><span>${escapeHTML(step.n)}</span><i>${index === 5 ? '✳' : '↗'}</i></div><h3>${escapeHTML(step.title)}</h3><p>${escapeHTML(step.text)}</p>${index < DATA.journey.length - 1 ? '<span class="journey-connector" aria-hidden="true"></span>' : ''}</article>`).join('');
  }

  function partnerWordmark(partner) {
    const path = CONFIG.assets?.partnerLogos?.[partner.id] || '';
    return path
      ? `<img src="${escapeHTML(path)}" alt="${escapeHTML(partner.name)} logo" loading="lazy">`
      : `<span class="partner-wordmark">${escapeHTML(partner.short || partner.name)}</span>`;
  }

  function renderPartnerWall() {
    const wall = $('#home-partner-wall');
    if (!wall) return;
    wall.innerHTML = (DATA.partners || []).map(partner => `<a class="partner-tile" href="${partner.url ? escapeHTML(partner.url) : './partners.html'}" ${partner.url ? 'target="_blank" rel="noopener noreferrer"' : ''} aria-label="${escapeHTML(partner.name)} — wider network reference"><span class="partner-tile-logo">${partnerWordmark(partner)}</span><span class="partner-tile-name">${escapeHTML(partner.name)}</span></a>`).join('');
  }

  function renderPartnerDirectory() {
    const holder = $('#partner-directory');
    if (!holder) return;
    holder.innerHTML = (DATA.partners || []).map(partner => {
      const verified = partner.status !== 'Needs confirmation';
      const logo = partnerWordmark(partner);
      const external = partner.url ? `<a class="text-link" href="${escapeHTML(partner.url)}" target="_blank" rel="noopener noreferrer">Official website <span>↗</span></a>` : '<span class="muted-link">Official website not confirmed</span>';
      const source = partner.source ? `<a class="source-link" href="${escapeHTML(partner.source)}" target="_blank" rel="noopener noreferrer">Verification source ↗</a>` : '';
      const logoSource = partner.assetSource ? `<span class="asset-note">Official logo resource identified in source review; add a local file in assets/partners and update config.js.</span>` : '';
      return `<article class="partner-profile-card reveal" data-partner-status="${verified ? 'verified' : 'needs-confirmation'}">
        <div class="partner-profile-top"><div class="partner-logo-box">${logo}</div><span class="verification-pill ${verified ? 'verified' : 'pending'}">${escapeHTML(partner.status)}</span></div>
        <div class="eyebrow">${escapeHTML(partner.category)}</div><h3>${escapeHTML(partner.name)}</h3><p class="partner-verification">${escapeHTML(partner.verification)}</p>
        <div class="partner-relationship"><strong>Adapt relationship note</strong><p>${escapeHTML(partner.relation)}</p></div>
        <div class="partner-card-links">${external}${source}</div>${logoSource}
      </article>`;
    }).join('');
  }

  function initFilters() {
    $$('[data-filter-group]').forEach(group => {
      const groupName = group.dataset.filterGroup;
      const buttons = $$('[data-filter]', group);
      buttons.forEach(button => button.addEventListener('click', () => {
        buttons.forEach(b => b.classList.toggle('active', b === button));
        const filter = button.dataset.filter;
        if (groupName === 'projects') {
          $$('[data-project-category]').forEach(card => {
            card.hidden = filter !== 'all' && card.dataset.projectCategory !== filter;
          });
        } else if (groupName === 'programs') {
          $$('[data-program-category]').forEach(card => {
            card.hidden = filter !== 'all' && card.dataset.programCategory !== filter;
          });
        } else if (groupName === 'partners') {
          $$('[data-partner-status]').forEach(card => {
            card.hidden = filter !== 'all' && card.dataset.partnerStatus !== filter;
          });
        }
      }));
    });

    const search = $('[data-search="programs"]');
    search?.addEventListener('input', () => {
      const query = search.value.trim().toLowerCase();
      $$('[data-program-category]').forEach(card => {
        const text = `${card.textContent} ${card.dataset.searchText || ''}`.toLowerCase();
        card.hidden = Boolean(query) && !text.includes(query);
      });
    });
  }

  function initCountries() {
    const panel = $('#country-detail');
    if (!panel || !Array.isArray(DATA.countries)) return;
    const show = (id) => {
      const country = DATA.countries.find(item => item.id === id);
      if (!country) return;
      panel.innerHTML = `<span class="country-role">${escapeHTML(country.role)}</span><h2>${escapeHTML(country.name)}</h2><div class="country-place">${escapeHTML(country.place)}</div><p>${escapeHTML(country.text)}</p>`;
      $$('[data-country]').forEach(button => button.classList.toggle('active', button.dataset.country === id));
    };
    $$('[data-country]').forEach(button => button.addEventListener('click', () => show(button.dataset.country)));
  }

  function initContactForm() {
    const form = $('#adapt-contact-form');
    if (!form) return;
    const status = $('#form-status');
    const endpoint = CONFIG.contact?.formEndpoint?.trim() || '';
    const email = CONFIG.contact?.email || '';

    $$('[data-set-interest]').forEach(link => link.addEventListener('click', () => {
      const select = $('#interest-select');
      if (select) {
        const target = link.dataset.setInterest;
        const option = [...select.options].find(item => item.value === target || item.textContent === target);
        if (option) select.value = option.value || option.textContent;
      }
    }));

    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      status.textContent = '';
      status.className = 'form-status';
      if (!form.reportValidity()) return;
      const values = Object.fromEntries(new FormData(form).entries());
      const message = [
        `Name: ${values.name || ''}`,
        `Email: ${values.email || ''}`,
        `Interest: ${values.interest || ''}`,
        `Location: ${values.location || 'Not provided'}`,
        `Age: ${values.age || 'Not provided'}`,
        `Area of interest: ${values.area || 'Not provided'}`,
        '',
        `Message: ${values.message || ''}`,
      ].join('\n');

      if (endpoint) {
        const submit = $('button[type="submit"]', form);
        const originalText = submit.innerHTML;
        submit.disabled = true;
        submit.innerHTML = 'Sending…';
        try {
          const response = await fetch(endpoint, { method: 'POST', body: new FormData(form), headers: { 'Accept': 'application/json' } });
          if (!response.ok) throw new Error(`Request failed (${response.status})`);
          status.textContent = 'Your inquiry was submitted successfully.';
          status.classList.add('success');
          form.reset();
        } catch (error) {
          status.textContent = 'The form could not be sent. Please try again or email Adapt directly.';
          status.classList.add('error');
        } finally {
          submit.disabled = false;
          submit.innerHTML = originalText;
        }
        return;
      }

      if (!email) {
        status.textContent = 'The form is validated, but no contact email or submission endpoint is configured. Add one in assets/js/config.js.';
        status.classList.add('error');
        return;
      }
      const subject = encodeURIComponent(`Adapt Community inquiry — ${values.interest || 'General inquiry'}`);
      const body = encodeURIComponent(message);
      status.textContent = 'Your email application should open with a draft. Review the details and press Send there. Nothing has been sent yet.';
      status.classList.add('notice');
      window.location.href = `mailto:${encodeURIComponent(email)}?subject=${subject}&body=${body}`;
    });
  }

  function initReveal() {
    const items = $$('.reveal:not(.is-visible)');
    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      items.forEach(item => item.classList.add('is-visible'));
      return;
    }
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -36px 0px' });
    items.forEach(item => observer.observe(item));
  }

  function initParticles() {
    const canvas = $('#hero-particles');
    if (!canvas || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let width = 0, height = 0, points = [], raf = 0;
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      width = rect.width; height = rect.height;
      canvas.width = Math.round(width * dpr); canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.max(24, Math.min(62, Math.floor(width / 18)));
      points = Array.from({ length: count }, () => ({
        x: Math.random() * width, y: Math.random() * height,
        vx: (Math.random() - .5) * .16, vy: (Math.random() - .5) * .16,
        r: Math.random() * 1.5 + .4,
      }));
    };
    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      points.forEach((p, i) => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(90, 165, 255, .55)'; ctx.fill();
        for (let j = i + 1; j < points.length; j++) {
          const q = points[j]; const dx = p.x - q.x, dy = p.y - q.y; const d = Math.hypot(dx, dy);
          if (d < 118) {
            ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `rgba(54, 113, 255, ${.12 * (1 - d / 118)})`;
            ctx.lineWidth = .7; ctx.stroke();
          }
        }
      });
      raf = requestAnimationFrame(draw);
    };
    resize(); draw();
    window.addEventListener('resize', resize, { passive: true });
    window.addEventListener('pagehide', () => cancelAnimationFrame(raf), { once: true });
  }

  function initSmoothAnchors() {
    $$('a[href^="#"]').forEach(link => {
      link.addEventListener('click', (event) => {
        const target = $(link.getAttribute('href'));
        if (!target) return;
        event.preventDefault();
        target.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
      });
    });
  }

  renderHeader();
  renderFooter();
  renderPillars();
  renderPartnerWall();
  renderPartnerDirectory();
  renderJourney();
  renderProjectCards();
  initFilters();
  initCountries();
  initContactForm();
  initReveal();
  initParticles();
  initSmoothAnchors();

  // Cards added by the central content registry need reveal observation after rendering.
  if ('IntersectionObserver' in window) {
    const later = $$('.pillar-card.reveal, .project-card.reveal, .journey-step.reveal, .partner-tile.reveal, .partner-profile-card.reveal');
    const observer = new IntersectionObserver((entries, obs) => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); obs.unobserve(entry.target); }
    }), { threshold: .12 });
    later.forEach(item => observer.observe(item));
  }
})();
