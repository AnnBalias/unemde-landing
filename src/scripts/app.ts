import AOS from "aos";
import { navigate } from "astro:transitions/client";
import i18next from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import en from "../i18n/locales/en.json";
import kk from "../i18n/locales/kk.json";
import ru from "../i18n/locales/ru.json";
import { DEFAULT_LANG, LANGS, LANG_OPTIONS, type Lang } from "../i18n/config";

let i18nReady = false;
let listenersBound = false;
let aosReady = false;
let pendingScrollId = "";
const journeyTimers: number[] = [];
const shotTimers: number[] = [];

function clearTimers(ids: number[]) {
  for (const id of ids) window.clearInterval(id);
  ids.length = 0;
}

function syncActiveNav() {
  const page = document.body.dataset.page;
  document.querySelectorAll("#navLinks a, footer nav a").forEach((link) => {
    const href = link.getAttribute("href");
    const current = Boolean(page && href === `/${page}`);
    if (current) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  });
}

function applyI18n(refreshMotion = false) {
  document.documentElement.lang = i18next.resolvedLanguage || DEFAULT_LANG;
  const titleKey = document.body.dataset.titleKey || "meta.title";
  document.title = i18next.t(titleKey);

  const desc = document.querySelector('meta[name="description"]');
  if (desc) {
    const descKey = document.body.dataset.descKey || "meta.description";
    desc.setAttribute("content", i18next.t(descKey));
  }

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (!key) return;
    const attr = el.getAttribute("data-i18n-attr");
    const value = i18next.t(key);
    if (attr) el.setAttribute(attr, value);
    else el.textContent = value;
  });

  const langBtn = document.getElementById("langBtn");
  const menuBtn = document.getElementById("menuBtn");
  syncLangSwitch();
  if (langBtn) langBtn.setAttribute("aria-label", i18next.t("nav.lang"));
  if (menuBtn) menuBtn.setAttribute("aria-label", i18next.t("nav.menu"));
  if (refreshMotion) AOS.refresh();
}

function langLabel(lang: string) {
  return LANG_OPTIONS.find((item) => item.value === lang)?.label ?? "RU";
}

function syncLangSwitch() {
  const lang = i18next.resolvedLanguage || DEFAULT_LANG;
  const current = document.getElementById("langCurrent");
  if (current) current.textContent = langLabel(lang);
  document.querySelectorAll<HTMLElement>("[data-lang]").forEach((btn) => {
    btn.setAttribute("aria-selected", String(btn.dataset.lang === lang));
  });
}

function closeNavMenu() {
  document.getElementById("navLinks")?.removeAttribute("data-open");
  document.getElementById("menuBtn")?.setAttribute("aria-expanded", "false");
}

function closeLangMenu() {
  const btn = document.getElementById("langBtn");
  const menu = document.getElementById("langMenu");
  btn?.setAttribute("aria-expanded", "false");
  if (menu) menu.hidden = true;
}

function closeHowSteps() {
  document.querySelectorAll("[data-how-step]").forEach((el) => el.removeAttribute("data-open"));
}

function initAppJourney() {
  clearTimers(journeyTimers);
  document.querySelectorAll<HTMLElement>("[data-app-journey]").forEach((root) => {
    const steps = [...root.querySelectorAll<HTMLElement>("[data-how-step]")];
    if (steps.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const isPaused = () => root.matches(":hover, :focus-visible, :focus-within");

    const show = (index: number, smooth = true) => {
      for (const el of steps) el.toggleAttribute("data-open", el === steps[index]);
      const step = steps[index];
      const item = step.closest("li") ?? step;
      const rootBox = root.getBoundingClientRect();
      const itemBox = item.getBoundingClientRect();
      root.scrollTo({
        left: root.scrollLeft + (itemBox.left + itemBox.width / 2) - (rootBox.left + rootBox.width / 2),
        behavior: smooth ? "smooth" : "instant",
      });
    };

    let index = 0;
    show(index, false);

    const id = window.setInterval(() => {
      if (isPaused()) return;
      index = (index + 1) % steps.length;
      show(index);
    }, 2400);
    journeyTimers.push(id);
  });
}

function initShotCarousels() {
  clearTimers(shotTimers);
  document.querySelectorAll<HTMLElement>("[data-shot-carousel]").forEach((root) => {
    const slides = [...root.querySelectorAll<HTMLElement>("[data-shot]")];
    if (slides.length < 2) return;

    slides.forEach((slide, i) => slide.classList.toggle("is-active", i === 0));
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let index = 0;
    const isPaused = () => root.matches(":hover, :focus-visible, :focus-within");

    const id = window.setInterval(() => {
      if (isPaused()) return;
      slides[index].classList.remove("is-active");
      index = (index + 1) % slides.length;
      slides[index].classList.add("is-active");
    }, 1500);
    shotTimers.push(id);
  });
}

function toggleHowStep(step: HTMLElement) {
  const wasOpen = step.hasAttribute("data-open");
  closeHowSteps();
  if (wasOpen) {
    step.blur();
    return;
  }
  step.setAttribute("data-open", "");
  step.focus();
}

function openLangMenu() {
  const btn = document.getElementById("langBtn");
  const menu = document.getElementById("langMenu");
  if (!menu) return;
  btn?.setAttribute("aria-expanded", "true");
  menu.hidden = false;
  const active =
    menu.querySelector<HTMLElement>('[data-lang][aria-selected="true"]') ?? menu.querySelector("[data-lang]");
  active?.focus();
}

function toggleLangMenu() {
  const menu = document.getElementById("langMenu");
  if (menu?.hidden) openLangMenu();
  else closeLangMenu();
}

function focusLangOption(offset: number) {
  const options = [...document.querySelectorAll<HTMLElement>("[data-lang]")];
  if (!options.length) return;
  const index = options.findIndex((el) => el === document.activeElement);
  const next = options[(index + offset + options.length) % options.length];
  next?.focus();
}

async function setLang(lang: string) {
  if (!LANGS.includes(lang as Lang)) return;
  await i18next.changeLanguage(lang);
  localStorage.setItem("unemde-lang", lang);
  applyI18n(true);
}

async function ensureI18n() {
  if (i18nReady) return;
  await i18next.use(LanguageDetector).init({
    resources: {
      ru: { translation: ru },
      kk: { translation: kk },
      en: { translation: en },
    },
    lng: DEFAULT_LANG,
    fallbackLng: DEFAULT_LANG,
    supportedLngs: [...LANGS],
    nonExplicitSupportedLngs: true,
    load: "languageOnly",
    interpolation: { escapeValue: false },
    detection: {
      order: ["localStorage"],
      lookupLocalStorage: "unemde-lang",
      caches: ["localStorage"],
    },
  });
  i18nReady = true;
}

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function navOffset() {
  return (document.getElementById("nav")?.getBoundingClientRect().height ?? 60) + 12;
}

function scrollToId(id: string, smooth = true) {
  const el = document.getElementById(id);
  if (!el) return false;
  const top = Math.max(0, window.scrollY + el.getBoundingClientRect().top - navOffset());
  window.scrollTo({
    top,
    behavior: smooth && !prefersReducedMotion() ? "smooth" : "instant",
  });
  return true;
}

function scrollToPendingHash(smooth = false) {
  const id = window.location.hash.slice(1) || pendingScrollId;
  pendingScrollId = "";
  if (!id) return;
  if (id && !window.location.hash) history.replaceState(null, "", `#${id}`);
  scrollToId(id, smooth);
  requestAnimationFrame(() => scrollToId(id, false));
}

function bindListeners() {
  if (listenersBound) return;
  listenersBound = true;

  document.addEventListener(
    "click",
    (event) => {
      const link = (event.target as HTMLElement | null)?.closest("a[href]");
      if (!(link instanceof HTMLAnchorElement) || event.defaultPrevented || event.button !== 0) return;
      if (link.target && link.target !== "_self") return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const url = new URL(link.href, window.location.href);
      if (url.origin !== window.location.origin || !url.hash) return;
      const id = decodeURIComponent(url.hash.slice(1));
      if (!id) return;

      event.preventDefault();
      event.stopImmediatePropagation();
      closeNavMenu();

      const onThisPage = document.getElementById(id);
      if (onThisPage && url.pathname === window.location.pathname) {
        history.pushState(null, "", url.hash);
        scrollToId(id);
        return;
      }

      pendingScrollId = id;
      const dest =
        url.pathname === window.location.pathname ? `/${url.hash}` : `${url.pathname}${url.hash}`;
      void navigate(dest);
    },
    true,
  );

  document.addEventListener("click", (event) => {
    const target = event.target as HTMLElement | null;
    if (!target) return;

    if (target.closest("#langBtn")) {
      toggleLangMenu();
      return;
    }

    const langOption = target.closest<HTMLElement>("[data-lang]");
    if (langOption?.dataset.lang) {
      void setLang(langOption.dataset.lang);
      closeLangMenu();
      document.getElementById("langBtn")?.focus();
      return;
    }

    if (!target.closest("#langSwitch")) closeLangMenu();

    if (target.closest("#menuBtn")) {
      closeLangMenu();
      const links = document.getElementById("navLinks");
      const open = Boolean(links?.toggleAttribute("data-open"));
      document.getElementById("menuBtn")?.setAttribute("aria-expanded", String(open));
      return;
    }

    if (target.closest("#navLinks a")) {
      closeNavMenu();
    } else if (!target.closest("#navLinks")) {
      closeNavMenu();
    }

    const howStep = target.closest<HTMLElement>("[data-how-step]");
    if (howStep) {
      toggleHowStep(howStep);
      return;
    }
    closeHowSteps();

    const faqBtn = target.closest("[data-faq-item] > button");
    if (faqBtn) {
      const item = faqBtn.parentElement;
      if (!item) return;
      const wasOpen = item.hasAttribute("data-open");
      document.querySelectorAll("[data-faq-item]").forEach((el) => el.removeAttribute("data-open"));
      if (!wasOpen) item.setAttribute("data-open", "");
      return;
    }

    const chip = target.closest<HTMLElement>("[data-faq-filter]");
    if (chip) {
      const cat = chip.dataset.faqFilter;
      document.querySelectorAll("[data-faq-filter]").forEach((el) => {
        el.setAttribute("aria-pressed", String(el === chip));
      });
      let visible = 0;
      document.querySelectorAll<HTMLElement>("[data-faq-item]").forEach((item) => {
        const show = cat === "all" || item.dataset.cat === cat;
        item.hidden = !show;
        if (!show) item.removeAttribute("data-open");
        if (show) visible += 1;
      });
      const empty = document.getElementById("faqEmpty");
      if (empty) empty.hidden = visible > 0;
    }
  });

  document.addEventListener("keydown", (event) => {
    const menu = document.getElementById("langMenu");
    const open = Boolean(menu && !menu.hidden);

    if (event.key === "Escape" && open) {
      event.preventDefault();
      closeLangMenu();
      document.getElementById("langBtn")?.focus();
      return;
    }

    if (event.key === "Escape") {
      closeNavMenu();
      const focusedStep = document.activeElement?.closest?.("[data-how-step]");
      closeHowSteps();
      if (focusedStep instanceof HTMLElement) focusedStep.blur();
    }

    const howStep = event.target instanceof HTMLElement ? event.target.closest("[data-how-step]") : null;
    if (howStep instanceof HTMLElement && howStep === event.target && (event.key === "Enter" || event.key === " ")) {
      event.preventDefault();
      toggleHowStep(howStep);
      return;
    }

    if (!open) {
      if ((event.key === "ArrowDown" || event.key === "Enter" || event.key === " ") && document.activeElement?.id === "langBtn") {
        event.preventDefault();
        openLangMenu();
      }
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      focusLangOption(1);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      focusLangOption(-1);
    } else if (event.key === "Home") {
      event.preventDefault();
      document.querySelector<HTMLElement>("[data-lang]")?.focus();
    } else if (event.key === "End") {
      event.preventDefault();
      const options = document.querySelectorAll<HTMLElement>("[data-lang]");
      options[options.length - 1]?.focus();
    }
  });

  window.addEventListener(
    "scroll",
    () => {
      document.getElementById("nav")?.toggleAttribute("data-scrolled", window.scrollY > 8);
    },
    { passive: true },
  );
}

async function onPageLoad() {
  await ensureI18n();
  applyI18n();
  syncActiveNav();
  closeLangMenu();
  closeNavMenu();
  bindListeners();
  initShotCarousels();
  initAppJourney();
  if (!aosReady) {
    AOS.init({
      duration: 780,
      easing: "ease-out-cubic",
      offset: 72,
      once: false,
      disable: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    });
    aosReady = true;
  } else {
    AOS.refreshHard();
  }
  document.getElementById("nav")?.toggleAttribute("data-scrolled", window.scrollY > 8);
  scrollToPendingHash(false);
}

document.addEventListener("astro:before-swap", () => {
  clearTimers(journeyTimers);
  clearTimers(shotTimers);
  closeHowSteps();
});

document.addEventListener("astro:page-load", () => {
  void onPageLoad();
});
