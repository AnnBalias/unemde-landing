export const LANGS = ["ru", "kk", "en"] as const;
export type Lang = (typeof LANGS)[number];
export const DEFAULT_LANG: Lang = "ru";

export const LANG_OPTIONS: { value: Lang; label: string }[] = [
  { value: "ru", label: "RU" },
  { value: "kk", label: "KK" },
  { value: "en", label: "EN" },
];

export const PAGES = ["home", "venue", "faq"] as const;
export type PageId = (typeof PAGES)[number];

export const NAV_LINKS = [
  { href: "/venue", key: "nav.business", page: "venue", label: "For venues" },
  { href: "/faq", key: "nav.faq", page: "faq", label: "FAQ" },
] as const;

export const PAGE_META: Record<PageId, { titleKey: string; descKey: string }> = {
  home: { titleKey: "meta.title", descKey: "meta.description" },
  venue: { titleKey: "meta.venueTitle", descKey: "meta.venueDescription" },
  faq: { titleKey: "meta.faqTitle", descKey: "meta.faqDescription" },
};
