import AOS from "aos";
import i18next from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import cs from "../i18n/locales/cs.json";
import en from "../i18n/locales/en.json";
import kk from "../i18n/locales/kk.json";
import ru from "../i18n/locales/ru.json";
import uk from "../i18n/locales/uk.json";
import { LANGS, LANG_OPTIONS, type Lang } from "../i18n/config";

let i18nReady = false;
let listenersBound = false;

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
  document.documentElement.lang = i18next.resolvedLanguage || "en";
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
  return LANG_OPTIONS.find((item) => item.value === lang)?.label ?? "EN";
}

function syncLangSwitch() {
  const lang = i18next.resolvedLanguage || "en";
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

function closeReachPins() {
  document.querySelectorAll("[data-reach-pin]").forEach((el) => el.removeAttribute("data-open"));
}

function raiseReachPin(pin: Element) {
  const wrap = pin.parentElement;
  const parent = wrap?.parentElement;
  if (!wrap || !parent || parent.lastElementChild === wrap) return;
  parent.appendChild(wrap);
}

function setReachPinOpen(pin: Element | null, map?: Element | null) {
  const root = map ?? pin?.closest("[data-reach-map]") ?? document;
  root.querySelectorAll("[data-reach-pin]").forEach((el) => {
    el.toggleAttribute("data-open", el === pin);
  });
}

function initAppJourney() {
  document.querySelectorAll<HTMLElement>("[data-app-journey]").forEach((root) => {
    const existing = Number(root.dataset.appTimer || "");
    if (existing) window.clearInterval(existing);
    delete root.dataset.appTimer;

    const steps = [...root.querySelectorAll<HTMLElement>("[data-how-step]")];
    if (steps.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const isPaused = () => root.matches(":hover, :focus-visible, :focus-within");

    const show = (index: number) => {
      closeHowSteps();
      const step = steps[index];
      step.setAttribute("data-open", "");
      const item = step.closest("li") ?? step;
      const rootBox = root.getBoundingClientRect();
      const itemBox = item.getBoundingClientRect();
      root.scrollTo({
        left: root.scrollLeft + (itemBox.left + itemBox.width / 2) - (rootBox.left + rootBox.width / 2),
        behavior: "smooth",
      });
    };

    let index = 0;
    show(index);

    const id = window.setInterval(() => {
      if (isPaused()) return;
      index = (index + 1) % steps.length;
      show(index);
    }, 2400);
    root.dataset.appTimer = String(id);
  });
}

function initShotCarousels() {
  document.querySelectorAll<HTMLElement>("[data-shot-carousel]").forEach((root) => {
    const existing = Number(root.dataset.shotTimer || "");
    if (existing) window.clearInterval(existing);
    delete root.dataset.shotTimer;

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
    root.dataset.shotTimer = String(id);
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
      uk: { translation: uk },
      en: { translation: en },
      cs: { translation: cs },
      kk: { translation: kk },
      ru: { translation: ru },
    },
    lng: "en",
    fallbackLng: "en",
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

function bindListeners() {
  if (listenersBound) return;
  listenersBound = true;

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

    const reachPin = target.closest("[data-reach-pin]");
    if (reachPin) {
      closeHowSteps();
      raiseReachPin(reachPin);
      setReachPinOpen(reachPin);
      return;
    }
    closeHowSteps();
    closeReachPins();

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

  document.addEventListener("pointerover", (event) => {
    const pin = event.target instanceof Element ? event.target.closest("[data-reach-pin]") : null;
    if (!pin) return;
    raiseReachPin(pin);
    if (event.pointerType === "mouse") setReachPinOpen(pin);
  });

  document.addEventListener("pointerout", (event) => {
    if (event.pointerType !== "mouse") return;
    const pin = event.target instanceof Element ? event.target.closest("[data-reach-pin]") : null;
    if (!pin) return;
    const next = event.relatedTarget instanceof Element ? event.relatedTarget.closest("[data-reach-pin]") : null;
    if (next === pin) return;
    pin.removeAttribute("data-open");
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
      const focusedPin = document.activeElement?.closest?.("[data-reach-pin]");
      closeHowSteps();
      closeReachPins();
      if (focusedStep instanceof HTMLElement) focusedStep.blur();
      if (focusedPin instanceof HTMLElement) focusedPin.blur();
    }

    const howStep = event.target instanceof HTMLElement ? event.target.closest("[data-how-step]") : null;
    if (howStep instanceof HTMLElement && howStep === event.target && (event.key === "Enter" || event.key === " ")) {
      event.preventDefault();
      toggleHowStep(howStep);
      return;
    }

    const reachPinKey = event.target instanceof Element ? event.target.closest("[data-reach-pin]") : null;
    if (reachPinKey && (event.key === "Enter" || event.key === " ")) {
      event.preventDefault();
      raiseReachPin(reachPinKey);
      const wasOpen = reachPinKey.hasAttribute("data-open");
      const map = reachPinKey.closest("[data-reach-map]");
      map?.querySelectorAll("[data-reach-pin]").forEach((el) => {
        el.toggleAttribute("data-open", !wasOpen && el === reachPinKey);
      });
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

  document.addEventListener("submit", (event) => {
    const form = (event.target as HTMLElement | null)?.closest?.("#partnerForm");
    if (!form || !(form instanceof HTMLFormElement)) return;
    event.preventDefault();
    if (!form.reportValidity()) return;
    form.reset();
    const ok = document.getElementById("partnerOk");
    if (ok) ok.hidden = false;
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
  AOS.init({
    duration: 780,
    easing: "ease-out-cubic",
    offset: 72,
    once: true,
    disable: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  });
  AOS.refreshHard();
  document.getElementById("nav")?.toggleAttribute("data-scrolled", window.scrollY > 8);
  const hashId = window.location.hash.slice(1);
  if (hashId) document.getElementById(hashId)?.scrollIntoView();
}

document.addEventListener("astro:page-load", () => {
  void onPageLoad();
});
