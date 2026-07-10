import { Component, inject, signal } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

type Season = 'summer' | 'winter' | 'exotic';
type Language = 'mk' | 'en';

interface NavItem {
  label: string;
  target: string;
}

interface Destination {
  name: string;
  country: string;
  season: Season;
  region: string;
  heroImage: string;
  description: string;
  tags: string[];
  alt: string;
}

interface TravelPackage {
  title: string;
  destination: string;
  season: Season;
  priceLabel: string;
  duration: string;
  transportType: string;
  dates: string;
  hotelRating: string;
  highlights: string[];
  image: string;
  inquiryCta: string;
  alt: string;
}

interface PartnerEmbed {
  title: string;
  providerName: string;
  iframeUrl?: string;
  destinationTags: string[];
  description: string;
  fallbackUrl: string;
  active: boolean;
}

interface SafePartnerEmbed extends PartnerEmbed {
  safeUrl: SafeResourceUrl | null;
  unavailableReason: string | null;
}

interface FeaturedOffer {
  title: string;
  label: string;
  description: string;
  target: string;
}

interface ContactLink {
  label: string;
  href: string;
  style: 'primary' | 'secondary';
  external?: boolean;
}

interface PageContent {
  documentLanguage: string;
  navAriaLabel: string;
  brandAriaLabel: string;
  brandImageUrl: string;
  brandImageAlt: string;
  contactAgency: string;
  languageLabel: string;
  heroEyebrow: string;
  heroTitle: string;
  heroDescription: string;
  viewOffers: string;
  openPartnerOffers: string;
  socialProofLabel: string;
  heroStats: Array<{ value: string; label: string }>;
  quickJumpLabel: string;
  featuredOffersTitle: string;
  featuredOffersDescription: string;
  featuredOffers: FeaturedOffer[];
  travelHighlightsAriaLabel: string;
  highlightCards: Array<{ label: string; title: string; description: string }>;
  summerEyebrow: string;
  summerTitle: string;
  summerDescription: string;
  summerPackagesLabel: string;
  winterEyebrow: string;
  winterTitle: string;
  winterDescription: string;
  winterPackagesLabel: string;
  exoticEyebrow: string;
  exoticTitle: string;
  exoticDescription: string;
  exoticCta: string;
  partnersEyebrow: string;
  partnersTitle: string;
  partnersDescription: string;
  openPartnerOffer: string;
  loadingPartner: string;
  partnerUnavailable: string;
  missingIframeReason: string;
  blockedIframeReason: string;
  inactiveIframeReason: string;
  invalidIframeReason: string;
  aboutEyebrow: string;
  aboutTitle: string;
  aboutDescription: string;
  trustCards: Array<{ title: string; description: string }>;
  contactEyebrow: string;
  contactTitle: string;
  contactDescription: string;
  facebookCta: string;
  primaryContactLinks: ContactLink[];
  emailSubjectBase: string;
  emailSubjectPackage: string;
  fieldLabels: {
    duration: string;
    transport: string;
    dates: string;
    stay: string;
  };
  destinations: Destination[];
  packages: TravelPackage[];
  partnerEmbeds: PartnerEmbed[];
  navItems: NavItem[];
}

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  host: {
    '[attr.lang]': 'content.documentLanguage',
  },
})
export class App {
  private readonly sanitizer = inject(DomSanitizer);
  private readonly allowedIframeHosts = new Set([
    'www.google.com',
    'maps.google.com',
    'www.booking.com',
    'savatours-mk.com',
    'www.savatours-mk.com',
  ]);

  protected readonly agencyName = 'VEL-JAN Travel Agency';
  protected readonly facebookUrl = 'https://www.facebook.com/TA.Vel.Jan/';
  protected readonly languages: Array<{ code: Language; label: string }> = [
    { code: 'mk', label: 'MK' },
    { code: 'en', label: 'EN' },
  ];

  protected readonly currentLanguage = signal<Language>('mk');
  protected readonly brandImageFailed = signal(false);
  protected readonly contentByLanguage: Record<Language, PageContent> = {
    mk: {
      documentLanguage: 'mk',
      navAriaLabel: 'Главна навигација',
      brandAriaLabel: 'Почетна страница на Vel Jan',
      brandImageUrl: 'https://graph.facebook.com/100064874010405/picture?type=large',
      brandImageAlt: 'Лого на VEL-JAN Travel Agency',
      contactAgency: 'Контактирај агенција',
      languageLabel: 'Избор на јазик',
      heroEyebrow: 'Лето во продажба',
      heroTitle: 'ВЕЛ-ЈАН од Кочани: Турција, Египет, Тунис и зимска Бугарија во фокус.',
      heroDescription:
        'Летните понуди започнуваат со Antalya преку партнерскиот Sava Tours систем, со Bodrum, Hurghada и Тунис како главни насоки.',
      viewOffers: 'Погледни понуди',
      openPartnerOffers: 'Партнерски понуди',
      socialProofLabel: 'Проверена Facebook страница за актуелни понуди',
      heroStats: [
        { value: 'Кочани', label: 'локална агенција' },
        { value: '93k+', label: 'Facebook допаѓања' },
        { value: 'Лето + зима', label: 'сезонски фокус' },
      ],
      quickJumpLabel: 'Брз избор',
      featuredOffersTitle: 'Летни понуди во фокус',
      featuredOffersDescription: 'Брз пристап до партнерските понуди за Турција, Египет и Тунис. Лето води директно кон Antalya.',
      featuredOffers: [
        {
          title: 'Antalya',
          label: 'лето / Турција',
          description: 'Главна летна понуда со директен Sava Tours iframe за хотели, термини и цени.',
          target: 'partners',
        },
        {
          title: 'Bodrum',
          label: 'лето / Турција',
          description: 'Втора турска насока за летни аранжмани преку партнерскиот систем.',
          target: 'partners',
        },
        {
          title: 'Hurghada',
          label: 'лето / Египет',
          description: 'Египет во фокус со понуди за Hurghada, хотели и летни пакети.',
          target: 'partners',
        },
        {
          title: 'Тунис',
          label: 'лето / Тунис',
          description: 'Тунис останува во фокус за следни партнерски банери и рачни барања.',
          target: 'exotic',
        },
      ],
      travelHighlightsAriaLabel: 'Главни патувачки категории',
      highlightCards: [
        {
          label: 'Летен фокус',
          title: 'Турција, Египет и Тунис',
          description: 'Antalya, Bodrum, Hurghada и Тунис се поставени како главни летни насоки.',
        },
        {
          label: 'Зимски фокус',
          title: 'Банско и Пампорово',
          description: 'Банско, Пампорово, ски, спа, Нова година, групни и семејни зимски аранжмани.',
        },
        {
          label: 'Партнерски податоци',
          title: 'Iframe слотови',
          description: 'Партнерски понуди со резервен линк кога надворешниот извор не е достапен.',
        },
      ],
      summerEyebrow: 'Плажа сезона',
      summerTitle: 'Летни дестинации',
      summerDescription:
        'Лето е насочено кон Antalya прво, потоа Bodrum, Hurghada и Тунис, со партнерски iframe понуди веднаш достапни погоре.',
      summerPackagesLabel: 'Летни аранжмани',
      winterEyebrow: 'Снежна сезона',
      winterTitle: 'Зимска Бугарија',
      winterDescription:
        'Банско и Пампорово имаат посебен простор за ски, спа, празнични, групни и семејни аранжмани.',
      winterPackagesLabel: 'Зимски аранжмани',
      exoticEyebrow: 'Патувања по мерка',
      exoticTitle: 'Егзотични дестинации',
      exoticDescription:
        'Тунис, Малдиви, Дубаи, Занзибар, Тајланд, Египет, сафари комбинации, медени месеци и сезонски чартер патувања.',
      exoticCta: 'Побарај аранжман',
      partnersEyebrow: 'Партнерски интеграции',
      partnersTitle: 'Sava Tours B2C понуди',
      partnersDescription:
        'Antalya е прва затоа што копчето Лето води тука. Потоа следуваат Bodrum, Hurghada и Бугарија зима.',
      openPartnerOffer: 'Отвори партнерска понуда',
      loadingPartner: 'Се вчитуваат партнерски информации...',
      partnerUnavailable: 'Партнерските податоци не се достапни',
      missingIframeReason: 'Партнерската понуда сè уште не е поврзана.',
      blockedIframeReason: 'Овој партнерски извор моментално не може безбедно да се прикаже тука.',
      inactiveIframeReason: 'Оваа партнерска понуда моментално не е активна.',
      invalidIframeReason: 'Партнерскиот iframe URL не е валиден.',
      aboutEyebrow: 'Ветување на агенцијата',
      aboutTitle: 'Направено за брзо и сигурно планирање патувања',
      aboutDescription:
        'VEL-JAN Travel Agency е туристичка агенција од Кочани со летен фокус на Турција, Египет и Тунис, зимски фокус на Банско и Пампорово, и дополнителни егзотични аранжмани по барање.',
      trustCards: [
        {
          title: 'Сезонски прво',
          description: 'Летните и зимските колекции се веднаш видливи без корисниците да пребаруваат низ општи менија.',
        },
        {
          title: 'Барање со контекст',
          description: 'Линковите за барање го носат избраниот аранжман за агентите веднаш да знаат што бара клиентот.',
        },
        {
          title: 'Подготвено за партнери',
          description: 'Партнерските понуди имаат надворешен линк и јасна резервна состојба.',
        },
      ],
      contactEyebrow: 'Контакт',
      contactTitle: 'Подготвени сте да побарате аранжман?',
      contactDescription: 'Испратете барање, јавете се или пишете на WhatsApp за побрза понуда.',
      facebookCta: 'Отвори Facebook страница',
      primaryContactLinks: [
        { label: 'Facebook страница', href: 'https://www.facebook.com/TA.Vel.Jan/', style: 'primary', external: true },
        { label: 'Email барање', href: 'mailto:hello@veljan.travel', style: 'secondary' },
        { label: 'WhatsApp', href: 'https://wa.me/38970000000', style: 'secondary', external: true },
      ],
      emailSubjectBase: 'Барање за патување до VEL-JAN Travel Agency',
      emailSubjectPackage: 'Барање за патување',
      fieldLabels: {
        duration: 'Траење',
        transport: 'Превоз',
        dates: 'Термини',
        stay: 'Сместување',
      },
      navItems: [
        { label: 'Лето', target: 'partners' },
        { label: 'Зима', target: 'winter' },
        { label: 'Егзотика', target: 'exotic' },
        { label: 'Партнери', target: 'partners' },
        { label: 'За нас', target: 'about' },
        { label: 'Контакт', target: 'contact' },
      ],
      destinations: [
        {
          name: 'Antalya',
          country: 'Турција',
          season: 'summer',
          region: 'Турска ривиера',
          heroImage:
            'https://images.unsplash.com/photo-1597212720410-f72c8f4e1a55?auto=format&fit=crop&w=1200&q=80',
          description:
            'Главна летна насока со партнерски Sava Tours понуди за хотели, термини, летови и all-inclusive аранжмани.',
          tags: ['Турција', 'лето', 'all inclusive', 'семејно'],
          alt: 'Медитерански брег во Antalya',
        },
        {
          name: 'Bodrum',
          country: 'Турција',
          season: 'summer',
          region: 'Егејско крајбрежје',
          heroImage:
            'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=80',
          description:
            'Летни хотели и ресорти за патници кои бараат Турција со поинаква атмосфера, море и вечерен живот.',
          tags: ['Турција', 'ресорти', 'летови', 'море'],
          alt: 'Летен хотелски базен во Bodrum',
        },
        {
          name: 'Hurghada',
          country: 'Египет',
          season: 'summer',
          region: 'Црвено Море',
          heroImage:
            'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1200&q=80',
          description:
            'Египетски летни пакети со хотели, плажа, нуркање и топла сезона за патници кои сакаат подалечен одмор.',
          tags: ['Египет', 'Црвено Море', 'плажа', 'лето'],
          alt: 'Ресорт на Црвено Море',
        },
        {
          name: 'Банско',
          country: 'Бугарија',
          season: 'winter',
          region: 'Пирин Планина',
          heroImage:
            'https://images.unsplash.com/photo-1483664852095-d6cc6870702d?auto=format&fit=crop&w=1200&q=80',
          description: 'Ски аранжмани, спа хотели, новогодишни пакети и семејни зимски одмори.',
          tags: ['ски', 'спа', 'семејно', 'нова година'],
          alt: 'Зимски ресорт во Банско',
        },
        {
          name: 'Пампорово',
          country: 'Бугарија',
          season: 'winter',
          region: 'Родопи',
          heroImage:
            'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=80',
          description: 'Мирни ски престои со патеки за почетници, удобни хотели и празнични групни аранжмани.',
          tags: ['ски школа', 'групи', 'празници', 'снег'],
          alt: 'Снежен предел во Пампорово',
        },
        {
          name: 'Егзотични патувања',
          country: 'Свет',
          season: 'exotic',
          region: 'Азија, Африка, Кариби, Блиски Исток',
          heroImage:
            'https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=1200&q=80',
          description: 'Премиум далечни патувања, медени месеци, сафари комбинации и внимателно избрани ресорти.',
          tags: ['премиум', 'меден месец', 'далечни патувања', 'по мерка'],
          alt: 'Егзотична плажа',
        },
      ],
      packages: [
        {
          title: 'Antalya all-inclusive избор',
          destination: 'Antalya',
          season: 'summer',
          priceLabel: 'партнерска понуда',
          duration: '7 ноќевања',
          transportType: 'Авионски пакет',
          dates: 'јуни до септември',
          hotelRating: '3-5 ѕвездички',
          highlights: ['Sava Tours iframe', 'All-inclusive хотели', 'Семејни опции'],
          image:
            'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80',
          inquiryCta: 'Отвори Antalya понуда',
          alt: 'All-inclusive одмор во Antalya',
        },
        {
          title: 'Bodrum летен аранжман',
          destination: 'Bodrum',
          season: 'summer',
          priceLabel: 'партнерска понуда',
          duration: '7 ноќевања',
          transportType: 'Авионски пакет',
          dates: 'јули и август',
          hotelRating: '3-5 ѕвездички',
          highlights: ['Егејско море', 'Хотели на плажа', 'Партнерски термини'],
          image:
            'https://images.unsplash.com/photo-1601581875309-fafbf2d3ed3a?auto=format&fit=crop&w=900&q=80',
          inquiryCta: 'Отвори Bodrum понуда',
          alt: 'Летен хотел во Bodrum',
        },
        {
          title: 'Hurghada Црвено Море',
          destination: 'Hurghada',
          season: 'summer',
          priceLabel: 'партнерска понуда',
          duration: '7 ноќевања',
          transportType: 'Авионски пакет',
          dates: 'сезонски термини',
          hotelRating: '4-5 ѕвездички',
          highlights: ['Црвено Море', 'Плажа и нуркање', 'Sava Tours понуди'],
          image:
            'https://images.unsplash.com/photo-1526761122248-c31f3b0f5a38?auto=format&fit=crop&w=900&q=80',
          inquiryCta: 'Отвори Hurghada понуда',
          alt: 'Одмор на Црвено Море во Hurghada',
        },
        {
          title: 'Банско ски и спа',
          destination: 'Банско',
          season: 'winter',
          priceLabel: 'од 299 EUR',
          duration: '4 ноќевања',
          transportType: 'Автобус или сопствен превоз',
          dates: 'декември до март',
          hotelRating: '4 ѕвездички спа хотели',
          highlights: ['Близу ски лифт', 'Спа содржини', 'Новогодишни термини'],
          image:
            'https://images.unsplash.com/photo-1605540436563-5bca919ae766?auto=format&fit=crop&w=900&q=80',
          inquiryCta: 'Побарај ски пакет',
          alt: 'Ски и спа во Банско',
        },
        {
          title: 'Пампорово семеен снег пакет',
          destination: 'Пампорово',
          season: 'winter',
          priceLabel: 'од 259 EUR',
          duration: '5 ноќевања',
          transportType: 'Автобуски пакет',
          dates: 'училишни распусти',
          hotelRating: '3-4 ѕвездички',
          highlights: ['Патеки за почетници', 'Ски школа', 'Групни цени'],
          image:
            'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=900&q=80',
          inquiryCta: 'Планирај зимски одмор',
          alt: 'Семеен зимски престој во Пампорово',
        },
        {
          title: 'Малдиви и Дубаи комбинации',
          destination: 'Егзотични патувања',
          season: 'exotic',
          priceLabel: 'по барање',
          duration: '7 до 12 ноќевања',
          transportType: 'Авионски пакет',
          dates: 'целa година',
          hotelRating: '4-5 ѕвездички ресорти',
          highlights: ['За меден месец', 'Трансфери до ресорт', 'Термини по мерка'],
          image:
            'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?auto=format&fit=crop&w=900&q=80',
          inquiryCta: 'Побарај егзотична понуда',
          alt: 'Малдиви и Дубаи егзотичен пакет',
        },
      ],
      partnerEmbeds: [
        {
          title: 'Antalya',
          providerName: 'Sava Tours B2C',
          iframeUrl: 'https://savatours-mk.com/partner/69/?t=170',
          destinationTags: ['Турција', 'лето', 'Antalya'],
          description: 'Главниот летен iframe банер. Овде се отвора партнерската понуда за Antalya.',
          fallbackUrl: 'https://www.savatours-mk.com/partner/69/?t=170',
          active: true,
        },
        {
          title: 'Bodrum',
          providerName: 'Sava Tours B2C',
          iframeUrl: 'https://savatours-mk.com/partner/69/?t=209',
          destinationTags: ['Турција', 'лето', 'Bodrum'],
          description: 'Партнерски iframe за летните понуди за Bodrum.',
          fallbackUrl: 'https://www.savatours-mk.com/partner/69/?t=209',
          active: true,
        },
        {
          title: 'Hurghada',
          providerName: 'Sava Tours B2C',
          iframeUrl: 'https://savatours-mk.com/partner/69/?t=227',
          destinationTags: ['Египет', 'лето', 'Hurghada'],
          description: 'Партнерски iframe за Hurghada и летни пакети за Египет.',
          fallbackUrl: 'https://www.savatours-mk.com/partner/69/?t=227',
          active: true,
        },
        {
          title: 'Бугарија зима',
          providerName: 'Sava Tours B2C',
          iframeUrl: 'https://savatours-mk.com/partner/69/?t=215',
          destinationTags: ['Бугарија', 'зима', 'ски'],
          description: 'Партнерски iframe за зимските понуди за Бугарија.',
          fallbackUrl: 'https://www.savatours-mk.com/partner/69/?t=215',
          active: true,
        },
      ],
    },
    en: {
      documentLanguage: 'en',
      navAriaLabel: 'Primary navigation',
      brandAriaLabel: 'VEL-JAN Travel Agency home',
      brandImageUrl: 'https://graph.facebook.com/100064874010405/picture?type=large',
      brandImageAlt: 'VEL-JAN Travel Agency logo',
      contactAgency: 'Contact agency',
      languageLabel: 'Language selector',
      heroEyebrow: 'Summer now booking',
      heroTitle: 'VEL-JAN from Kocani: Turkey, Egypt, Tunisia, and winter Bulgaria in focus.',
      heroDescription:
        'Summer opens with Antalya through the Sava Tours partner system, with Bodrum, Hurghada, and Tunisia as the main directions.',
      viewOffers: 'View offers',
      openPartnerOffers: 'Partner offers',
      socialProofLabel: 'Verified Facebook page for current offers',
      heroStats: [
        { value: 'Kocani', label: 'local agency' },
        { value: '93k+', label: 'Facebook likes' },
        { value: 'Summer + winter', label: 'seasonal focus' },
      ],
      quickJumpLabel: 'Quick jump',
      featuredOffersTitle: 'Summer offers in focus',
      featuredOffersDescription: 'Fast access to partner offers for Turkey, Egypt, and Tunisia. Summer leads directly to Antalya.',
      featuredOffers: [
        {
          title: 'Antalya',
          label: 'summer / Turkey',
          description: 'Main summer offer with a direct Sava Tours iframe for hotels, dates, and prices.',
          target: 'partners',
        },
        {
          title: 'Bodrum',
          label: 'summer / Turkey',
          description: 'Second Turkey direction for summer arrangements through the partner system.',
          target: 'partners',
        },
        {
          title: 'Hurghada',
          label: 'summer / Egypt',
          description: 'Egypt in focus with Hurghada hotels and summer packages.',
          target: 'partners',
        },
        {
          title: 'Tunisia',
          label: 'summer / Tunisia',
          description: 'Tunisia stays in focus for the next partner banners and manual inquiries.',
          target: 'exotic',
        },
      ],
      travelHighlightsAriaLabel: 'Travel highlights',
      highlightCards: [
        {
          label: 'Summer focus',
          title: 'Turkey, Egypt, and Tunisia',
          description: 'Antalya, Bodrum, Hurghada, and Tunisia are set as the main summer directions.',
        },
        {
          label: 'Winter focus',
          title: 'Bansko and Pamporovo',
          description: 'Bansko, Pamporovo, ski, spa, New Year, group, and family snow packages.',
        },
        {
          label: 'Partner data',
          title: 'Iframe-ready slots',
          description: 'Partner offers with fallback links when an external source is not available.',
        },
      ],
      summerEyebrow: 'Beach season',
      summerTitle: 'Summer destinations',
      summerDescription:
        'Summer is now oriented around Antalya first, then Bodrum, Hurghada, and Tunisia, with partner iframe offers available above.',
      summerPackagesLabel: 'Summer packages',
      winterEyebrow: 'Snow season',
      winterTitle: 'Winter Bulgaria',
      winterDescription:
        'Bansko and Pamporovo get dedicated space for ski, spa, holiday, group, and family arrangements.',
      winterPackagesLabel: 'Winter packages',
      exoticEyebrow: 'Tailor-made trips',
      exoticTitle: 'Exotic destinations',
      exoticDescription:
        'Tunisia, Maldives, Dubai, Zanzibar, Thailand, Egypt, safari combinations, honeymoons, and seasonal charter arrangements.',
      exoticCta: 'Request arrangement',
      partnersEyebrow: 'Partner integrations',
      partnersTitle: 'Sava Tours B2C offers',
      partnersDescription:
        'Antalya is first because the Summer navigation leads here. Bodrum, Hurghada, and Bulgaria winter follow.',
      openPartnerOffer: 'Open partner offer',
      loadingPartner: 'Loading partner information...',
      partnerUnavailable: 'Partner data unavailable',
      missingIframeReason: 'This partner offer has not been connected yet.',
      blockedIframeReason: 'This partner source cannot be displayed safely here right now.',
      inactiveIframeReason: 'This partner offer is currently inactive.',
      invalidIframeReason: 'Partner iframe URL is not valid.',
      aboutEyebrow: 'Agency promise',
      aboutTitle: 'Built for fast, confident trip planning',
      aboutDescription:
        'VEL-JAN Travel Agency is based in Kocani, with a summer focus on Turkey, Egypt, and Tunisia, a winter focus on Bansko and Pamporovo, and additional exotic arrangements on request.',
      trustCards: [
        {
          title: 'Seasonal first',
          description: 'Summer and winter collections are always visible without making travelers hunt through generic menus.',
        },
        {
          title: 'Inquiry context',
          description: 'Package request links include the selected arrangement so agents know what the traveler wants.',
        },
        {
          title: 'Partner-ready',
          description: 'Partner offers include an external link and a clear fallback state.',
        },
      ],
      contactEyebrow: 'Contact',
      contactTitle: 'Ready to request an arrangement?',
      contactDescription: 'Send the agency a package inquiry, call the team, or use WhatsApp for a quicker quote.',
      facebookCta: 'Open Facebook page',
      primaryContactLinks: [
        { label: 'Facebook page', href: 'https://www.facebook.com/TA.Vel.Jan/', style: 'primary', external: true },
        { label: 'Email inquiry', href: 'mailto:hello@veljan.travel', style: 'secondary' },
        { label: 'WhatsApp', href: 'https://wa.me/38970000000', style: 'secondary', external: true },
      ],
      emailSubjectBase: 'Travel inquiry for VEL-JAN Travel Agency',
      emailSubjectPackage: 'Travel inquiry',
      fieldLabels: {
        duration: 'Duration',
        transport: 'Transport',
        dates: 'Dates',
        stay: 'Stay',
      },
      navItems: [
        { label: 'Summer', target: 'partners' },
        { label: 'Winter', target: 'winter' },
        { label: 'Exotic Trips', target: 'exotic' },
        { label: 'Partner Offers', target: 'partners' },
        { label: 'About', target: 'about' },
        { label: 'Contact', target: 'contact' },
      ],
      destinations: [
        {
          name: 'Antalya',
          country: 'Turkey',
          season: 'summer',
          region: 'Turkish Riviera',
          heroImage:
            'https://images.unsplash.com/photo-1597212720410-f72c8f4e1a55?auto=format&fit=crop&w=1200&q=80',
          description:
            'Main summer direction with Sava Tours partner offers for hotels, dates, flights, and all-inclusive arrangements.',
          tags: ['Turkey', 'summer', 'all inclusive', 'family'],
          alt: 'Mediterranean coast in Antalya',
        },
        {
          name: 'Bodrum',
          country: 'Turkey',
          season: 'summer',
          region: 'Aegean coast',
          heroImage:
            'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=80',
          description:
            'Summer hotels and resorts for travelers who want Turkey with a different atmosphere, sea, and evening life.',
          tags: ['Turkey', 'resorts', 'flights', 'sea'],
          alt: 'Summer hotel pool in Bodrum',
        },
        {
          name: 'Hurghada',
          country: 'Egypt',
          season: 'summer',
          region: 'Red Sea',
          heroImage:
            'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1200&q=80',
          description:
            'Egypt summer packages with hotels, beach time, diving, and a warm-season option for longer holidays.',
          tags: ['Egypt', 'Red Sea', 'beach', 'summer'],
          alt: 'Red Sea resort',
        },
        {
          name: 'Bansko',
          country: 'Bulgaria',
          season: 'winter',
          region: 'Pirin Mountains',
          heroImage:
            'https://images.unsplash.com/photo-1483664852095-d6cc6870702d?auto=format&fit=crop&w=1200&q=80',
          description:
            'Ski arrangements, spa hotels, New Year packages, and family winter holidays in Bulgaria.',
          tags: ['ski', 'spa', 'family', 'new year'],
          alt: 'Bansko winter resort',
        },
        {
          name: 'Pamporovo',
          country: 'Bulgaria',
          season: 'winter',
          region: 'Rhodope Mountains',
          heroImage:
            'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=80',
          description:
            'Calm ski stays with beginner-friendly slopes, cozy hotels, and holiday group arrangements.',
          tags: ['ski school', 'groups', 'holiday', 'snow'],
          alt: 'Pamporovo winter resort',
        },
        {
          name: 'Exotic Escapes',
          country: 'Worldwide',
          season: 'exotic',
          region: 'Asia, Africa, Caribbean, Middle East',
          heroImage:
            'https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=1200&q=80',
          description:
            'Premium long-haul travel, honeymoon escapes, safari combinations, and curated beach resorts.',
          tags: ['premium', 'honeymoon', 'long-haul', 'tailor-made'],
          alt: 'Exotic beach escape',
        },
      ],
      packages: [
        {
          title: 'Antalya all-inclusive selection',
          destination: 'Antalya',
          season: 'summer',
          priceLabel: 'partner offer',
          duration: '7 nights',
          transportType: 'Flight package',
          dates: 'June to September',
          hotelRating: '3-5 star hotels',
          highlights: ['Sava Tours iframe', 'All-inclusive hotels', 'Family options'],
          image:
            'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80',
          inquiryCta: 'Open Antalya offer',
          alt: 'All-inclusive holiday in Antalya',
        },
        {
          title: 'Bodrum summer arrangement',
          destination: 'Bodrum',
          season: 'summer',
          priceLabel: 'partner offer',
          duration: '7 nights',
          transportType: 'Flight package',
          dates: 'July and August',
          hotelRating: '3-5 star hotels',
          highlights: ['Aegean Sea', 'Beach hotels', 'Partner dates'],
          image:
            'https://images.unsplash.com/photo-1601581875309-fafbf2d3ed3a?auto=format&fit=crop&w=900&q=80',
          inquiryCta: 'Open Bodrum offer',
          alt: 'Summer hotel in Bodrum',
        },
        {
          title: 'Hurghada Red Sea',
          destination: 'Hurghada',
          season: 'summer',
          priceLabel: 'partner offer',
          duration: '7 nights',
          transportType: 'Flight package',
          dates: 'Seasonal dates',
          hotelRating: '4-5 star hotels',
          highlights: ['Red Sea', 'Beach and diving', 'Sava Tours offers'],
          image:
            'https://images.unsplash.com/photo-1526761122248-c31f3b0f5a38?auto=format&fit=crop&w=900&q=80',
          inquiryCta: 'Open Hurghada offer',
          alt: 'Red Sea holiday in Hurghada',
        },
        {
          title: 'Bansko ski and spa',
          destination: 'Bansko',
          season: 'winter',
          priceLabel: 'from EUR 299',
          duration: '4 nights',
          transportType: 'Bus or own transport',
          dates: 'December to March',
          hotelRating: '4 star spa hotels',
          highlights: ['Ski lift access', 'Spa facilities', 'New Year dates'],
          image:
            'https://images.unsplash.com/photo-1605540436563-5bca919ae766?auto=format&fit=crop&w=900&q=80',
          inquiryCta: 'Request ski package',
          alt: 'Bansko ski and spa',
        },
        {
          title: 'Pamporovo family snow stay',
          destination: 'Pamporovo',
          season: 'winter',
          priceLabel: 'from EUR 259',
          duration: '5 nights',
          transportType: 'Bus package',
          dates: 'School holiday periods',
          hotelRating: '3-4 star hotels',
          highlights: ['Beginner slopes', 'Ski school options', 'Group rates'],
          image:
            'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=900&q=80',
          inquiryCta: 'Plan winter holiday',
          alt: 'Pamporovo family snow stay',
        },
        {
          title: 'Maldives and Dubai combinations',
          destination: 'Exotic Escapes',
          season: 'exotic',
          priceLabel: 'on request',
          duration: '7 to 12 nights',
          transportType: 'Flight package',
          dates: 'Year-round',
          hotelRating: '4-5 star resorts',
          highlights: ['Honeymoon ready', 'Resort transfers', 'Custom dates'],
          image:
            'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?auto=format&fit=crop&w=900&q=80',
          inquiryCta: 'Request exotic quote',
          alt: 'Maldives and Dubai combinations',
        },
      ],
      partnerEmbeds: [
        {
          title: 'Antalya',
          providerName: 'Sava Tours B2C',
          iframeUrl: 'https://savatours-mk.com/partner/69/?t=170',
          destinationTags: ['Turkey', 'summer', 'Antalya'],
          description: 'Main summer iframe banner. This opens the partner offer for Antalya.',
          fallbackUrl: 'https://www.savatours-mk.com/partner/69/?t=170',
          active: true,
        },
        {
          title: 'Bodrum',
          providerName: 'Sava Tours B2C',
          iframeUrl: 'https://savatours-mk.com/partner/69/?t=209',
          destinationTags: ['Turkey', 'summer', 'Bodrum'],
          description: 'Partner iframe for Bodrum summer offers.',
          fallbackUrl: 'https://www.savatours-mk.com/partner/69/?t=209',
          active: true,
        },
        {
          title: 'Hurghada',
          providerName: 'Sava Tours B2C',
          iframeUrl: 'https://savatours-mk.com/partner/69/?t=227',
          destinationTags: ['Egypt', 'summer', 'Hurghada'],
          description: 'Partner iframe for Hurghada and Egypt summer packages.',
          fallbackUrl: 'https://www.savatours-mk.com/partner/69/?t=227',
          active: true,
        },
        {
          title: 'Bulgaria winter',
          providerName: 'Sava Tours B2C',
          iframeUrl: 'https://savatours-mk.com/partner/69/?t=215',
          destinationTags: ['Bulgaria', 'winter', 'ski'],
          description: 'Partner iframe for Bulgaria winter offers.',
          fallbackUrl: 'https://www.savatours-mk.com/partner/69/?t=215',
          active: true,
        },
      ],
    },
  };

  protected get content(): PageContent {
    return this.contentByLanguage[this.currentLanguage()];
  }

  protected setLanguage(language: Language): void {
    this.currentLanguage.set(language);
    this.brandImageFailed.set(false);
  }

  protected markBrandImageFailed(): void {
    this.brandImageFailed.set(true);
  }

  protected packagesBySeason(season: Season): TravelPackage[] {
    return this.content.packages.filter((travelPackage) => travelPackage.season === season);
  }

  protected destinationsBySeason(season: Season): Destination[] {
    return this.content.destinations.filter((destination) => destination.season === season);
  }

  protected safePartnerEmbeds(): SafePartnerEmbed[] {
    return this.content.partnerEmbeds.map((embed) => ({
      ...embed,
      ...this.resolvePartnerEmbed(embed),
    }));
  }

  protected inquiryLink(packageTitle?: string): string {
    const subject = packageTitle
      ? `${this.content.emailSubjectPackage}: ${packageTitle}`
      : this.content.emailSubjectBase;

    return `mailto:hello@veljan.travel?subject=${encodeURIComponent(subject)}`;
  }

  private resolvePartnerEmbed(embed: PartnerEmbed): Pick<SafePartnerEmbed, 'safeUrl' | 'unavailableReason'> {
    if (!embed.active) {
      return { safeUrl: null, unavailableReason: this.content.inactiveIframeReason };
    }

    if (!embed.iframeUrl) {
      return { safeUrl: null, unavailableReason: this.content.missingIframeReason };
    }

    try {
      const parsedUrl = new URL(embed.iframeUrl);

      if (!this.allowedIframeHosts.has(parsedUrl.hostname)) {
        return {
          safeUrl: null,
          unavailableReason: this.content.blockedIframeReason,
        };
      }

      return {
        safeUrl: this.sanitizer.bypassSecurityTrustResourceUrl(embed.iframeUrl),
        unavailableReason: null,
      };
    } catch {
      return { safeUrl: null, unavailableReason: this.content.invalidIframeReason };
    }
  }
}
