export const wrap = "relative mx-auto w-[min(1440px,calc(100%-32px))]";
export const wrapPad = "relative mx-auto w-full max-w-[1440px] px-8 sm:px-12 nav:px-16";
export const wrapCenter = `${wrap} text-center`;

export const btn =
  "inline-flex items-center justify-center gap-2 rounded-btn px-6 py-3 text-base font-medium leading-[22px] min-h-[50px] transition duration-200 hover:-translate-y-px";
export const btnPrimary = `${btn} bg-brand text-white shadow-card`;
export const btnGhost = `${btn} border border-white/28 bg-white/14 text-white hover:bg-white/22`;
export const btnOnDark = `${btn} bg-white text-blue-dark hover:shadow-[0_8px_24px_rgb(16_24_40/0.2)]`;
export const btnGreen = `${btn} bg-green-grad text-white shadow-card`;
export const btnPrimaryEnd = `${btnPrimary} shrink-0 self-end`;

export const sectionBrand =
  "relative mx-4 mt-6 mb-10 overflow-hidden rounded-[20px] bg-brand-down py-16 text-white max-nav:py-12";
export const sectionCta = "mt-7 text-center";
export const sectionJourney = "overflow-visible pt-10 pb-0";

export const h2 = "mt-2 text-[clamp(28px,3.2vw,40px)] leading-[1.15] font-bold tracking-[-0.02em]";
export const h2Flush = `${h2} mt-0`;
export const subOnNavy = "mt-3 text-base text-white/72";
export const subMuted = "mt-3 text-base text-dark-gray";

export const hero =
  "relative mx-4 overflow-hidden rounded-[20px] bg-brand px-20 pt-12 pb-32 text-white max-nav:px-5 max-nav:pt-14 max-nav:pb-7 before:pointer-events-none before:absolute before:-top-[120px] before:-right-20 before:size-[520px] before:rounded-full before:bg-[radial-gradient(circle,rgb(255_255_255/0.12),transparent_68%)] before:content-['']";
export const pageHero =
  "relative mx-4 overflow-hidden rounded-[20px] bg-brand px-20 pt-12 pb-12 text-white max-nav:px-5 max-nav:pt-14 max-nav:pb-14 before:pointer-events-none before:absolute before:-top-[140px] before:-right-[90px] before:size-[420px] before:rounded-full before:bg-[radial-gradient(circle,rgb(255_255_255/0.12),transparent_68%)] before:content-['']";
export const heroGrid =
  "relative grid grid-cols-1 items-center gap-8 nav:grid-cols-[minmax(0,1.1fr)_minmax(16rem,0.9fr)] nav:gap-10";
export const pageHeroGrid =
  `${wrap} relative grid grid-cols-1 items-start gap-8 nav:grid-cols-[minmax(0,1.55fr)_minmax(11rem,0.45fr)] nav:gap-4`;
export const heroTitle =
  "text-[clamp(32px,4.4vw,52px)] leading-[1.12] font-bold tracking-[-0.02em]";
export const pageHeroTitle =
  "mt-2 text-[clamp(28px,4vw,44px)] leading-[1.15] font-bold tracking-[-0.02em]";
export const lead = "mt-4 max-w-xl text-base leading-6 font-normal text-white/86";
export const leadWide = `${lead} max-w-2xl`;
export const heroCta = "mt-7 flex flex-wrap gap-3 max-sm:flex-col max-sm:[&>a]:w-full";

export const phones =
  "relative mx-auto aspect-[5/6] w-full max-w-[440px] max-nav:aspect-[5/8] max-nav:max-w-[340px] max-sm:max-w-[280px] sm:max-nav:max-w-[300px]";
export const phonesSolo = `${phones} max-nav:mx-auto nav:ml-auto nav:mr-0`;

export const apps = "mt-10 mb-8 grid grid-cols-2 gap-5 max-nav:grid-cols-1";
export const appCard =
  "grid grid-cols-1 items-stretch gap-6 rounded-[20px] border border-border bg-white p-7 shadow-card sm:grid-cols-[minmax(0,1fr)_auto]";
export const appCardAlt =
  "grid grid-cols-1 items-stretch gap-6 rounded-[20px] border-0 bg-app-alt p-7 text-white sm:grid-cols-[minmax(0,1fr)_auto]";
export const appCol = "flex min-w-0 flex-col";
export const appCardFoot = "mt-auto pt-6";
export const badge =
  "inline-flex rounded-pill px-2.5 py-1 text-[11px] font-bold tracking-[0.04em] text-blue-dark uppercase bg-blue-soft";
export const badgeAlt =
  "inline-flex rounded-pill bg-white/12 px-2.5 py-1 text-[11px] font-bold tracking-[0.04em] text-white uppercase";

export const checkList = "mt-6 grid gap-2.5 text-[15px] font-medium";
export const check = "font-bold text-green-light";
export const checkRow = "flex items-center gap-2.5";
export const checkRowStart = "flex items-start gap-2.5";

export const benefits =
  "mt-6 grid grid-cols-4 items-stretch gap-4 max-nav:grid-cols-2 max-sm:grid-cols-1";
export const benefitGlass =
  "flex h-full flex-col rounded-btn border border-white/28 bg-white/14 p-5 text-white transition duration-200 hover:bg-white/22";
export const benefitTitle = "text-base font-medium";
export const benefitText = "mt-2 text-sm text-white/72";

export const faqCard =
  "flex h-full flex-col overflow-hidden rounded-[20px] border border-border bg-white p-7 shadow-card";
export const faqItem = `group ${faqCard}`;
export const faqCta =
  "flex h-full items-stretch justify-between gap-4 overflow-hidden rounded-[20px] border border-border bg-white p-7 shadow-card";
export const faqTitle = "text-base font-bold text-text";
export const faqBody = "mt-3 text-sm leading-[21px] text-dark-gray";
export const chip =
  "rounded-[22px] bg-blue-soft px-3.5 py-2 text-[13px] font-bold text-blue-dark aria-pressed:bg-brand aria-pressed:text-white";
export const chipGreen =
  "rounded-[22px] px-3.5 py-2 text-[13px] font-bold aria-[pressed=false]:bg-blue-soft aria-[pressed=false]:text-blue-dark aria-pressed:bg-green-grad aria-pressed:text-white aria-pressed:shadow-card";

export const logoLink = "flex shrink-0 items-center gap-2.5";
export const storeBadge =
  "inline-flex h-12 shrink-0 overflow-hidden rounded-[8px] outline-offset-2 transition duration-200 hover:-translate-y-px hover:shadow-card focus-visible:outline-2 focus-visible:outline-blue-light";

export const shotImg = "h-full w-full object-cover object-top";

export const howRoot = "mt-4 w-full";
export const howPad = "px-8 pt-5 sm:px-12 nav:px-16";
export const howScroll =
  "how-journey-scroll w-full overflow-x-auto overscroll-x-contain [scrollbar-width:thin] [scrollbar-color:var(--color-blue-light)_rgb(70_107_185_/_0.12)] [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-track]:bg-[rgb(70_107_185/0.12)] [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[linear-gradient(90deg,var(--color-blue-dark),var(--color-blue-light))] [&::-webkit-scrollbar-thumb:hover]:bg-blue-mid";
export const howStep =
  "how-step group relative aspect-[9/19] w-full cursor-pointer overflow-hidden rounded-[20px] border border-border bg-bg-soft pb-2 shadow-card transition duration-300 outline-none [-webkit-tap-highlight-color:transparent] motion-reduce:transition-none hover:-translate-y-1 focus:-translate-y-1 data-[open]:-translate-y-1 motion-reduce:hover:translate-y-0 motion-reduce:focus:translate-y-0 motion-reduce:data-[open]:translate-y-0";
export const howShot =
  "how-step-shot absolute inset-x-[18%] top-2.5 overflow-hidden rounded-[16px] bg-[#101820] p-[5px] shadow-[0_8px_24px_rgb(16_24_40/0.18)] transition-all duration-500 ease-out motion-reduce:transition-none group-hover:inset-0 group-focus:inset-0 group-data-[open]:inset-0 group-hover:rounded-[20px] group-focus:rounded-[20px] group-data-[open]:rounded-[20px] group-hover:p-0 group-focus:p-0 group-data-[open]:p-0 group-hover:shadow-none group-focus:shadow-none group-data-[open]:shadow-none";
export const howShotInner =
  "how-step-shot-inner h-full overflow-hidden rounded-[12px] group-hover:rounded-none group-focus:rounded-none group-data-[open]:rounded-none";
export const howScrim =
  "how-step-scrim pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(180deg,transparent_0%,transparent_48%,rgb(15_24_42/0.45)_68%,rgb(15_24_42/0.9)_100%)] opacity-0 transition-opacity duration-500 motion-reduce:transition-none group-hover:opacity-100 group-focus:opacity-100 group-data-[open]:opacity-100";
export const howCaption =
  "how-step-caption absolute inset-x-0 bottom-0 z-10 flex flex-col justify-center bg-white text-text transition-all duration-500 motion-reduce:transition-none group-hover:min-h-0 group-focus:min-h-0 group-data-[open]:min-h-0 group-hover:justify-end group-focus:justify-end group-data-[open]:justify-end group-hover:bg-transparent group-focus:bg-transparent group-data-[open]:bg-transparent group-hover:pt-10 group-focus:pt-10 group-data-[open]:pt-10 group-hover:pb-3.5 group-focus:pb-3.5 group-data-[open]:pb-3.5 group-hover:text-white group-focus:text-white group-data-[open]:text-white";
export const howText =
  "how-step-text mt-1.5 line-clamp-3 text-dark-gray group-hover:text-white/85 group-focus:text-white/85 group-data-[open]:text-white/85";
