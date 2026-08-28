export const wrap = "relative mx-auto w-[min(1440px,calc(100%-32px))]";
export const wrapPad = "relative mx-auto w-full max-w-[1440px] px-8 sm:px-12 nav:px-16";

export const btn =
  "inline-flex items-center justify-center gap-2 rounded-btn px-6 py-3 text-base font-medium leading-[22px] min-h-[50px] transition duration-200 hover:-translate-y-px";
export const btnPrimary = `${btn} bg-brand text-white shadow-card`;
export const btnGhost = `${btn} border border-white/28 bg-white/14 text-white hover:bg-white/22`;
export const btnOnDark = `${btn} bg-white text-blue-dark hover:shadow-[0_8px_24px_rgb(16_24_40/0.2)]`;
export const btnGreen = `${btn} bg-green-grad text-white shadow-card`;
export const btnSm = "min-h-10 px-4 py-2 text-sm";

export const section = "py-20";
export const sectionSoft = "bg-bg-soft py-20";
export const sectionNavy = "bg-blue-dark py-20 text-white";
export const sectionBrand =
  "relative mx-4 mt-6 mb-10 overflow-hidden rounded-[20px] bg-brand-down py-16 text-white max-nav:py-12";
export const sectionCta = "mt-7 text-center";

export const kicker = "text-xs font-bold tracking-[0.08em] text-blue-light uppercase";
export const kickerLight = "text-xs font-bold tracking-[0.08em] text-[#9eb6e8] uppercase";
export const h2 = "mt-2 text-[clamp(28px,3.2vw,40px)] leading-[1.15] font-bold tracking-[-0.02em]";
export const sub = "mt-3 max-w-xl text-base text-dark-gray";
export const subOnNavy = "mt-3 text-base text-white/72";

export const hero =
  "relative mx-4 overflow-hidden rounded-[20px] bg-brand px-20 pt-8 pb-32 text-white max-nav:px-5 max-nav:pt-16 max-nav:pb-7 before:pointer-events-none before:absolute before:-top-[120px] before:-right-20 before:size-[520px] before:rounded-full before:bg-[radial-gradient(circle,rgb(255_255_255/0.12),transparent_68%)] before:content-['']";
export const pageHero =
  "relative mx-4 overflow-hidden rounded-[20px] bg-brand px-20 py-12 text-white max-nav:px-5 max-nav:py-14 before:pointer-events-none before:absolute before:-top-[140px] before:-right-[90px] before:size-[420px] before:rounded-full before:bg-[radial-gradient(circle,rgb(255_255_255/0.12),transparent_68%)] before:content-['']";
export const heroGrid =
  "relative grid grid-cols-1 items-center gap-8 nav:grid-cols-[minmax(0,1.1fr)_minmax(16rem,0.9fr)] nav:gap-10";
export const heroTitle =
  "text-[clamp(32px,4.4vw,52px)] leading-[1.12] font-bold tracking-[-0.02em]";
export const pageHeroTitle =
  "mt-2 text-[clamp(28px,4vw,44px)] leading-[1.15] font-bold tracking-[-0.02em]";
export const lead = "mt-4 max-w-xl text-base leading-6 font-normal text-white/86";
export const heroCta = "mt-7 flex flex-wrap gap-3 max-sm:flex-col max-sm:[&>a]:w-full";
export const pageHeroCta = "mt-6 flex flex-wrap gap-3 max-sm:flex-col max-sm:[&>a]:w-full";

export const phones =
  "relative mx-auto aspect-[5/6] w-full max-w-[440px] max-nav:aspect-[5/8] max-nav:max-w-[340px] max-sm:max-w-[280px] sm:max-nav:max-w-[300px]";
export const phonesInline = phones;

export const steps =
  "mt-10 grid grid-cols-4 gap-4 max-nav:grid-cols-2 max-sm:grid-cols-1";
export const step =
  "min-h-[220px] rounded-card border border-border bg-white px-5 pt-[22px] pb-6 shadow-card";
export const stepNum =
  "grid size-9 place-items-center rounded-xl bg-brand text-sm font-bold text-white";

export const split = "grid grid-cols-2 items-center gap-14 max-nav:grid-cols-1";
export const featureList = "mt-6 grid gap-3.5";
export const featureGrid = "mb-7 grid grid-cols-3 gap-4 max-nav:grid-cols-1";
export const feature = "grid grid-cols-[44px_1fr] items-start gap-3";
export const iconBox =
  "grid size-11 place-items-center rounded-[14px] bg-blue-soft text-blue-dark";

export const apps = "mt-10 mb-8 grid grid-cols-2 gap-5 max-nav:grid-cols-1";
export const appCard =
  "grid grid-cols-1 items-stretch gap-6 rounded-[20px] border border-border bg-white p-7 shadow-card sm:grid-cols-[minmax(0,1fr)_auto]";
export const appCardAlt =
  "grid grid-cols-1 items-stretch gap-6 rounded-[20px] border-0 bg-app-alt p-7 text-white sm:grid-cols-[minmax(0,1fr)_auto]";
export const badge =
  "inline-flex rounded-pill px-2.5 py-1 text-[11px] font-bold tracking-[0.04em] text-blue-dark uppercase bg-blue-soft";
export const badgeAlt =
  "inline-flex rounded-pill bg-white/12 px-2.5 py-1 text-[11px] font-bold tracking-[0.04em] text-white uppercase";

export const shotRow =
  "mt-10 grid grid-cols-4 gap-4 max-nav:grid-cols-2 max-sm:grid-cols-1";
export const shotCard =
  "overflow-hidden rounded-[20px] border border-border bg-white shadow-card transition duration-[350ms] hover:-translate-y-2 hover:shadow-float motion-reduce:transition-none";

export const stats = "mt-10 grid grid-cols-3 gap-4 max-nav:grid-cols-1";
export const statsCompact = "mt-5 grid grid-cols-1 gap-4";
export const stat = "rounded-card border border-border bg-white p-[22px] shadow-card";

export const checkList = "mt-6 grid gap-2.5 text-[15px] font-medium";
export const check = "font-bold text-green-light";

export const benefits =
  "mt-6 grid grid-cols-4 items-stretch gap-4 max-nav:grid-cols-2 max-sm:grid-cols-1";
export const benefit = "rounded-card bg-white p-5 text-text shadow-card";
export const benefitBordered = `${benefit} border border-border`;
export const benefitGlass =
  "flex h-full flex-col rounded-btn border border-white/28 bg-white/14 p-5 text-white transition duration-200 hover:bg-white/22";
export const cities =
  "mt-6 mb-10 grid grid-cols-5 gap-3 max-nav:grid-cols-2 max-sm:grid-cols-1";
export const city = "rounded-card bg-white p-5 text-center text-text shadow-card";

export const partnerGrid =
  "grid grid-cols-1 items-start gap-8 sm:grid-cols-2 nav:grid-cols-[0.9fr_1.1fr]";
export const partnerForm = "grid gap-3 rounded-[20px] bg-white p-6 text-text shadow-card";
export const field = "grid gap-1.5 text-[13px] font-semibold";
export const input =
  "min-h-[46px] w-full rounded-2xl border border-border bg-white px-3.5 py-2.5 text-sm font-medium text-text shadow-card";

export const faqCard =
  "flex h-full flex-col overflow-hidden rounded-[20px] border border-border bg-white p-7 shadow-card";
export const faqItem = `group ${faqCard}`;
export const faqCta =
  "flex h-full items-stretch justify-between gap-4 overflow-hidden rounded-[20px] border border-border bg-white p-7 shadow-card";
export const chip =
  "rounded-[22px] bg-blue-soft px-3.5 py-2 text-[13px] font-bold text-blue-dark aria-pressed:bg-brand aria-pressed:text-white";
export const chipGreen =
  "rounded-[22px] px-3.5 py-2 text-[13px] font-bold aria-[pressed=false]:bg-blue-soft aria-[pressed=false]:text-blue-dark aria-pressed:bg-green-grad aria-pressed:text-white aria-pressed:shadow-card";
