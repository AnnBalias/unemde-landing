import i18next from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import AOS from "aos";
import "aos/dist/aos.css";

import uk from "../locales/uk.json";
import en from "../locales/en.json";
import cs from "../locales/cs.json";
import kk from "../locales/kk.json";
import ru from "../locales/ru.json";
import { mountLayout } from "./layout.js";

const LANGS = ["en", "uk", "cs", "kk", "ru"];
const page = document.body.dataset.page || "home";

mountLayout(page);

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
    const attr = el.getAttribute("data-i18n-attr");
    const value = i18next.t(key);
    if (attr) el.setAttribute(attr, value);
    else el.textContent = value;
  });

  const langSelect = document.getElementById("langSelect");
  const menuBtn = document.getElementById("menuBtn");
  if (langSelect) langSelect.value = i18next.resolvedLanguage || "en";
  if (menuBtn) menuBtn.setAttribute("aria-label", i18next.t("nav.menu"));
  if (refreshMotion) AOS.refresh();
}

async function setLang(lang) {
  if (!LANGS.includes(lang)) return;
  await i18next.changeLanguage(lang);
  localStorage.setItem("unemde-lang", lang);
  applyI18n(true);
}

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
  supportedLngs: LANGS,
  nonExplicitSupportedLngs: true,
  load: "languageOnly",
  interpolation: { escapeValue: false },
  detection: {
    order: ["localStorage"],
    lookupLocalStorage: "unemde-lang",
    caches: ["localStorage"],
  },
});

applyI18n();

AOS.init({
  duration: 780,
  easing: "ease-out-cubic",
  offset: 72,
  once: true,
  disable: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
});

document.getElementById("langSelect")?.addEventListener("change", (event) => {
  setLang(event.target.value);
});

const nav = document.getElementById("nav");
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

window.addEventListener(
  "scroll",
  () => {
    nav?.classList.toggle("scrolled", window.scrollY > 8);
  },
  { passive: true },
);

menuBtn?.addEventListener("click", () => {
  navLinks?.classList.toggle("open");
});

navLinks?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => navLinks.classList.remove("open"));
});

document.querySelectorAll(".faq-item > button").forEach((btn) => {
  btn.addEventListener("click", () => {
    const item = btn.parentElement;
    const wasOpen = item.classList.contains("open");
    document.querySelectorAll(".faq-item").forEach((el) => el.classList.remove("open"));
    if (!wasOpen) item.classList.add("open");
  });
});

document.querySelectorAll("[data-faq-filter]").forEach((chip) => {
  chip.addEventListener("click", () => {
    const cat = chip.dataset.faqFilter;
    document.querySelectorAll("[data-faq-filter]").forEach((el) => {
      el.classList.toggle("active", el === chip);
    });
    let visible = 0;
    document.querySelectorAll(".faq-item").forEach((item) => {
      const show = cat === "all" || item.dataset.cat === cat;
      item.hidden = !show;
      if (!show) item.classList.remove("open");
      if (show) visible += 1;
    });
    const empty = document.getElementById("faqEmpty");
    if (empty) empty.hidden = visible > 0;
  });
});

document.getElementById("partnerForm")?.addEventListener("submit", (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  if (!form.reportValidity()) return;
  form.reset();
  const ok = document.getElementById("partnerOk");
  if (ok) ok.hidden = false;
});
