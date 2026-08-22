const LOGO = (gradId, light = false) => {
  const fill = light ? "#FFFFFF" : `url(#${gradId})`;
  const mark = light ? "#9EB6E8" : "#314B82";
  return `
  <span class="logo-mark"><img src="assets/icon.png" alt="" /></span>
  <svg viewBox="0 0 313 120" aria-hidden="true">
    <defs>
      <linearGradient id="${gradId}" x1="157" y1="36.48" x2="157" y2="88.8">
        <stop offset="0" stop-color="#1F3053" />
        <stop offset="1" stop-color="#456BB9" />
      </linearGradient>
    </defs>
    <path fill="${fill}" d="M28.12 88.8q-7.2 0-12.56-2.32a18.4 18.4 0 0 1-8.24-6.88q-2.88-4.56-2.88-11.2V36.48h12.88V67.2q0 5.36 2.8 8t8 2.64 8-2.64 2.8-8V36.48H51.8V68.4q0 6.64-2.96 11.2a18 18 0 0 1-8.24 6.88q-5.28 2.32-12.48 2.32m31.4-.8V36.48h11.05l21.92 30.8v-30.8h12.95V88H94.34L72.4 57.28V88zm54.07 0V36.48h38v9.92h-25.12v10.8h22.16v10.08h-22.16v10.8h25.12V88zm44.14 0V36.48h12.72l14 28.56 13.92-28.56H211V88h-12.88V58.4l-10.16 20.8h-7.12L170.6 58.4V88zm61.4 0V36.48h22.33q7.83 0 13.2 2.64a17.2 17.2 0 0 1 8.16 8.32q2.8 5.69 2.8 15.12 0 13.27-6.17 19.36-6.08 6.08-18 6.08zm12.88-9.92h7.69q4.16 0 6.96-1.2a8.4 8.4 0 0 0 4.31-4.64q1.53-3.36 1.53-9.68 0-6.4-1.37-9.84-1.27-3.52-4.16-4.88-2.8-1.44-7.28-1.44h-7.68zM272.19 88V36.48h38v9.92h-25.12v10.8h22.16v10.08h-22.16v10.8h25.12V88z"/>
    <path fill="${mark}" stroke="${mark}" stroke-linejoin="round" stroke-width="0.5" d="M7.4 67.5c.4-.8 0-2.5-.24-3.25 1.8.4 1.91 2.5 1.75 3.5 2-.4 2.66.67 2.75 1.25.2 1.2-1.09 1.5-1.75 1.5.8-.53.5-1.22.25-1.5-1.2-.6-1.67.25-1.75.75 0 1.4 1.16 2.08 1.75 2.25 2 .25 2.54-1.15 2.75-2 .5-2-1.25-3.5-2.25-4.25 0 .8-.5 1-.75 1 .4-2-1.25-3.25-2-4.25-.75-.75-1.15-2.75-.75-3.75.8-2 2.58-2.33 3.5-2.25 3.4.2 3.41 3.42 3 5-.4.6 0 2.92.25 4-1.8-1.2-1.92-3-1.75-3.75h-.5c-1.8.2-2.09-1.25-2-2 .2-1 .91-1.08 1.25-1-.4 1.4.33 1.75.75 1.75 1 0 .91-1 .75-1.5-.6-1-1.75-1.25-2.25-1.25-2 0-2.34 1.67-2.25 2.5 0 1.2 1.5 2.67 2.25 3.25 0-.4.33-.67.5-.75-.2 1.2.58 2.17 1 2.5 1 1 1.58 1.92 1.75 2.25.8 1.2.47 3.07.25 3.5-.5 1-1.5 2-3.25 2s-2.75-1.42-3-2c-.25-.5-.5-2.5 0-3.5Z"/>
    <path fill="${mark}" stroke="${mark}" stroke-linejoin="round" stroke-width="0.5" d="M13.92 51.01c-.4-.8 0-2.5.24-3.25-1.8.4-1.91 2.5-1.75 3.5-2-.4-2.66.67-2.75 1.25-.2 1.2 1.09 1.5 1.75 1.5-.8-.53-.5-1.22-.25-1.5 1.2-.6 1.67.25 1.75.75 0 1.4-1.16 2.08-1.75 2.25-2 .25-2.53-1.15-2.75-2-.5-2 1.25-3.5 2.25-4.25 0 .8.5 1 .75 1-.4-2 1.25-3.25 2-4.25.75-.75 1.15-2.75.75-3.75-.8-2-2.58-2.33-3.5-2.25-3.4.2-3.41 3.42-3 5 .4.6 0 2.92-.25 4 1.8-1.2 1.92-3 1.75-3.75h.5c1.8.2 2.09-1.25 2-2-.2-1-.91-1.08-1.25-1 .4 1.4-.33 1.75-.75 1.75-1 0-.91-1-.75-1.5.6-1 1.75-1.25 2.25-1.25 2 0 2.34 1.67 2.25 2.5 0 1.2-1.5 2.67-2.25 3.25 0-.4-.33-.67-.5-.75.2 1.2-.58 2.17-1 2.5-1 1-1.58 1.92-1.75 2.25-.8 1.2-.46 3.07-.25 3.5.5 1 1.5 2 3.25 2s2.75-1.42 3-2c.25-.5.5-2.5 0-3.5Z"/>
  </svg>
`;
};

const LINKS = [
  { href: "guest.html", key: "nav.guests", page: "guest", fallback: "For guests" },
  { href: "venue.html", key: "nav.business", page: "venue", fallback: "For venues" },
  { href: "partner.html", key: "nav.partner", page: "partner", fallback: "Become a Partner" },
  { href: "faq.html", key: "nav.faq", page: "faq", fallback: "FAQ" },
];

function navLinks(page, className) {
  return LINKS.map(
    (item) =>
      `<a class="${className}${page === item.page ? " active" : ""}" href="${item.href}" data-i18n="${item.key}">${item.fallback}</a>`,
  ).join("");
}

export function mountLayout(page) {
  const header = document.getElementById("site-header");
  const footer = document.getElementById("site-footer");
  if (!header || !footer) return;

  header.innerHTML = `
    <header class="nav" id="nav">
      <div class="wrap nav-inner">
        <a class="logo" href="index.html" aria-label="UNEMDE">${LOGO("navGrad")}</a>
        <nav class="nav-links" id="navLinks">${navLinks(page, "")}</nav>
        <div class="nav-actions">
          <label class="lang">
            <span class="sr-only" data-i18n="nav.lang">Language</span>
            <select id="langSelect" data-i18n="nav.lang" data-i18n-attr="aria-label">
              <option value="en">EN</option>
              <option value="uk">UA</option>
              <option value="cs">CS</option>
              <option value="kk">KK</option>
              <option value="ru">RU</option>
            </select>
          </label>
          <a class="btn btn-primary btn-sm" href="#stores" data-i18n="nav.cta">Get the app</a>
          <button class="menu-btn" id="menuBtn" type="button" aria-label="Menu">
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>
    </header>
  `;

  footer.innerHTML = `
    <footer class="footer" id="stores">
      <div class="wrap footer-grid">
        <a class="logo footer-logo" href="index.html" aria-label="UNEMDE">${LOGO("footGrad", true)}</a>
        <nav class="footer-nav">${navLinks(page, "")}</nav>
        <div class="socials">
          <a class="social" href="https://www.linkedin.com/" target="_blank" rel="noreferrer" data-i18n="footer.linkedin" data-i18n-attr="aria-label" aria-label="LinkedIn">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true"><path d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.24 8.25h4.52V24H.24zM8.34 8.25h4.33v2.14h.06c.6-1.14 2.08-2.34 4.28-2.34 4.58 0 5.42 3.01 5.42 6.93V24h-4.52v-7.69c0-1.83-.03-4.19-2.55-4.19-2.55 0-2.94 1.99-2.94 4.05V24H8.34z"/></svg>
          </a>
          <a class="social" href="https://apps.apple.com/" target="_blank" rel="noreferrer" data-i18n="footer.appstore" data-i18n-attr="aria-label" aria-label="App Store">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true"><path d="M16.7 12.6c0-2.4 2-3.6 2.1-3.7-1.1-1.7-2.9-1.9-3.5-1.9-1.5-.2-2.9.9-3.6.9s-1.9-1-3.1-.9c-1.6 0-3.1 1-3.9 2.4-1.7 2.9-.4 7.2 1.2 9.5.8 1.1 1.7 2.4 3 2.3 1.2-.1 1.6-.7 3.1-.7s1.8.7 3.1.7 2-.1 3-2.3c1.1-1.2 1.5-2.4 1.5-2.5-.1 0-2.9-1.1-2.9-4.8zM14.6 5.3c.6-.8 1.1-1.9.9-3-1 .1-2.2.7-2.9 1.5-.6.7-1.2 1.8-1 2.9 1.1.1 2.2-.5 3-1.4z"/></svg>
          </a>
          <a class="social" href="https://play.google.com/store/apps" target="_blank" rel="noreferrer" data-i18n="footer.play" data-i18n-attr="aria-label" aria-label="Google Play">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true"><path d="M3.2 2.3c-.3.2-.5.6-.5 1.1v17.2c0 .5.2.9.5 1.1l.1.1 9.6-9.6v-.3L3.3 2.3zm12.1 7.1-2.2 2.2 2.3 2.3 5.2-3c.6-.4.6-1 0-1.3zm-3.1 3.1L3.6 21.6c.2 0 .4 0 .5-.1l10-5.7zm.9-5.2L4.1 2.5c-.2 0-.4-.1-.5-.1l8.6 8.6z"/></svg>
          </a>
        </div>
      </div>
      <div class="wrap footer-copy">
        <span data-i18n="footer.rights">© 2026 UNEMDE</span>
        <span data-i18n="footer.note">Guests and venues · local deals · on-site activation</span>
      </div>
    </footer>
  `;
}
