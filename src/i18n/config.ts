export const LANGS = ["en", "uk", "cs", "kk", "ru"] as const;
export type Lang = (typeof LANGS)[number];

export const LANG_OPTIONS: { value: Lang; label: string }[] = [
  { value: "en", label: "EN" },
  { value: "uk", label: "UA" },
  { value: "cs", label: "CS" },
  { value: "kk", label: "KK" },
  { value: "ru", label: "RU" },
];

export const PAGES = ["home", "guest", "venue", "faq"] as const;
export type PageId = (typeof PAGES)[number];

export const NAV_LINKS = [
  { href: "/guest", key: "nav.guests", page: "guest", label: "For guests" },
  { href: "/venue", key: "nav.business", page: "venue", label: "For venues" },
  { href: "/faq", key: "nav.faq", page: "faq", label: "FAQ" },
] as const;

export const PAGE_META: Record<PageId, { titleKey: string; descKey: string }> = {
  home: { titleKey: "meta.title", descKey: "meta.description" },
  guest: { titleKey: "meta.guestTitle", descKey: "meta.guestDescription" },
  venue: { titleKey: "meta.venueTitle", descKey: "meta.venueDescription" },
  faq: { titleKey: "meta.faqTitle", descKey: "meta.faqDescription" },
};
