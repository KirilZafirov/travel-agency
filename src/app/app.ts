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
    'partner.example.com',
    'www.booking.com',
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
      heroTitle: 'ВЕЛ-ЈАН од Кочани: летувања во Грција и Бугарија, ски одмори и егзотични патувања.',
      heroDescription:
        'Разгледајте сезонски аранжмани со фокус на Сончев Брег, Банско, Халкидики и други барани дестинации.',
      viewOffers: 'Погледни понуди',
      openPartnerOffers: 'Партнерски понуди',
      socialProofLabel: 'Проверена Facebook страница за актуелни понуди',
      heroStats: [
        { value: 'Кочани', label: 'локална агенција' },
        { value: '93k+', label: 'Facebook допаѓања' },
        { value: 'Лето + зима', label: 'сезонски фокус' },
      ],
      quickJumpLabel: 'Брз избор',
      featuredOffersTitle: 'Најбарани понуди',
      featuredOffersDescription: 'Ставете ги главните VEL-JAN дестинации пред корисникот веднаш по првиот екран.',
      featuredOffers: [
        {
          title: 'Сончев Брег',
          label: 'лето / Бугарија',
          description: 'Море, хотели, ноќен живот и value пакети за брза летна одлука.',
          target: 'summer',
        },
        {
          title: 'Банско',
          label: 'зима / ски',
          description: 'Ски, спа и празнични аранжмани со јасен пат до барање понуда.',
          target: 'winter',
        },
        {
          title: 'Халкидики',
          label: 'лето / Грција',
          description: 'Семејни плажи, апартмани и автобуски аранжмани за летната сезона.',
          target: 'summer',
        },
      ],
      travelHighlightsAriaLabel: 'Главни патувачки категории',
      highlightCards: [
        {
          label: 'Летен фокус',
          title: 'Грција и Бугарија',
          description: 'Халкидики, острови, континентални ресорти, семејни хотели, младински патувања и море.',
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
        'Грција и Бугарија се организирани како јасни колекции за лесно пребарување по брег, превоз, хотел и буџет.',
      summerPackagesLabel: 'Летни аранжмани',
      winterEyebrow: 'Снежна сезона',
      winterTitle: 'Зимска Бугарија',
      winterDescription:
        'Банско и Пампорово имаат посебен простор за ски, спа, празнични, групни и семејни аранжмани.',
      winterPackagesLabel: 'Зимски аранжмани',
      exoticEyebrow: 'Патувања по мерка',
      exoticTitle: 'Егзотични дестинации',
      exoticDescription:
        'Малдиви, Дубаи, Занзибар, Тајланд, Египет, сафари комбинации, медени месеци и сезонски чартер патувања.',
      exoticCta: 'Побарај аранжман',
      partnersEyebrow: 'Партнерски интеграции',
      partnersTitle: 'Партнерски понуди',
      partnersDescription:
        'Секој партнерски слот има јасен наслов, надворешен линк и резервна состојба кога понудата не може да се прикаже.',
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
        'VEL-JAN Travel Agency е туристичка агенција од Кочани со силен фокус на Сончев Брег, Банско, Халкидики и сезонски аранжмани.',
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
        { label: 'Лето', target: 'summer' },
        { label: 'Зима', target: 'winter' },
        { label: 'Егзотика', target: 'exotic' },
        { label: 'Партнери', target: 'partners' },
        { label: 'За нас', target: 'about' },
        { label: 'Контакт', target: 'contact' },
      ],
      destinations: [
        {
          name: 'Грчки острови',
          country: 'Грција',
          season: 'summer',
          region: 'Егејско и Јонско крајбрежје',
          heroImage:
            'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80',
          description:
            'Островски одмори за парови, семејства и друштва на Крит, Лефкада, Крф, Закинтос, Родос и други дестинации.',
          tags: ['острови', 'семејно', 'плажа', 'млади'],
          alt: 'Поглед кон грчки остров',
        },
        {
          name: 'Грчки континентални ресорти',
          country: 'Грција',
          season: 'summer',
          region: 'Халкидики, Олимпик Бич, Тасос',
          heroImage:
            'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
          description:
            'Проверени летни аранжмани со хотели, апартмани, автобуски превоз и планови фокусирани на плажа.',
          tags: ['ресорти', 'апартмани', 'автобус', 'вредност'],
          alt: 'Песочна плажа во Грција',
        },
        {
          name: 'Бугарско Црноморие',
          country: 'Бугарија',
          season: 'summer',
          region: 'Сончев Брег, Несебар, Златни Песоци',
          heroImage:
            'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1200&q=80',
          description:
            'Морски пакети за семејства, хотелски престои, ноќен живот и летувања со добар буџет.',
          tags: ['море', 'семејно', 'ноќен живот', 'хотел'],
          alt: 'Морски брег во Бугарија',
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
          title: 'Семејна недела на Халкидики',
          destination: 'Грчки континентални ресорти',
          season: 'summer',
          priceLabel: 'од 249 EUR',
          duration: '7 ноќевања',
          transportType: 'Автобус или сопствен превоз',
          dates: 'јуни до септември',
          hotelRating: '3-4 ѕвездички',
          highlights: ['Плитки плажи', 'Апартмански опции', 'Семејни соби'],
          image:
            'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80',
          inquiryCta: 'Побарај летен аранжман',
          alt: 'Семејно летување на Халкидики',
        },
        {
          title: 'Избор на хотели на грчки острови',
          destination: 'Грчки острови',
          season: 'summer',
          priceLabel: 'од 399 EUR',
          duration: '7 до 10 ноќевања',
          transportType: 'Авион или фери пакет',
          dates: 'јули и август',
          hotelRating: '3-5 ѕвездички',
          highlights: ['Крит и Крф', 'Хотели на плажа', 'Парови и групи'],
          image:
            'https://images.unsplash.com/photo-1601581875309-fafbf2d3ed3a?auto=format&fit=crop&w=900&q=80',
          inquiryCta: 'Погледни островски понуди',
          alt: 'Грчки островски хотел',
        },
        {
          title: 'Сончев Брег value пакет',
          destination: 'Бугарско Црноморие',
          season: 'summer',
          priceLabel: 'од 219 EUR',
          duration: '6 ноќевања',
          transportType: 'Автобуски пакет',
          dates: 'неделни поаѓања',
          hotelRating: '3 ѕвездички',
          highlights: ['Централни хотели', 'Ноќен живот во близина', 'За млади'],
          image:
            'https://images.unsplash.com/photo-1526761122248-c31f3b0f5a38?auto=format&fit=crop&w=900&q=80',
          inquiryCta: 'Прашај за Бугарија лето',
          alt: 'Летување на Сончев Брег',
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
          title: 'Преглед на хотелска мапа',
          providerName: 'Доверлив хотелски партнер',
          iframeUrl:
            'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d26674.163812111558!2d23.4609554!3d41.8375912',
          destinationTags: ['Банско', 'зима', 'хотел'],
          description: 'Жив партнерски слот за мапи, хотелски инвентари, booking алатки или агенциски widget.',
          fallbackUrl: 'https://www.google.com/maps',
          active: true,
        },
        {
          title: 'Сезонски партнерски feed',
          providerName: 'Партнерски iframe placeholder',
          iframeUrl: 'https://partner.example.com/summer-offers',
          destinationTags: ['Грција', 'лето', 'пакети'],
          description: 'Заменете го овој конфигуриран URL кога партнер ќе достави iframe за актуелни понуди.',
          fallbackUrl: 'https://partner.example.com',
          active: true,
        },
        {
          title: 'Се очекува хотелски инвентар',
          providerName: 'Хотелски добавувач',
          destinationTags: ['Бугарија', 'лето'],
          description: 'Овој слот е подготвен за иден iframe, но моментално прикажува чист fallback.',
          fallbackUrl: 'https://example.com',
          active: true,
        },
        {
          title: 'Блокиран тест партнер',
          providerName: 'Неодобрен извор',
          iframeUrl: 'https://unapproved.example.net/offers',
          destinationTags: ['security test'],
          description: 'Неодобрените iframe host-ови намерно се блокираат и не се рендерираат во страницата.',
          fallbackUrl: 'https://unapproved.example.net',
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
      heroTitle: 'VEL-JAN from Kocani: Greece and Bulgaria holidays, ski stays, and exotic escapes.',
      heroDescription:
        'Browse seasonal arrangements focused on Sunny Beach, Bansko, Halkidiki, and other high-demand destinations.',
      viewOffers: 'View offers',
      openPartnerOffers: 'Partner offers',
      socialProofLabel: 'Verified Facebook page for current offers',
      heroStats: [
        { value: 'Kocani', label: 'local agency' },
        { value: '93k+', label: 'Facebook likes' },
        { value: 'Summer + winter', label: 'seasonal focus' },
      ],
      quickJumpLabel: 'Quick jump',
      featuredOffersTitle: 'Most requested offers',
      featuredOffersDescription: 'Put VEL-JAN’s core destinations in front of visitors right after the first screen.',
      featuredOffers: [
        {
          title: 'Sunny Beach',
          label: 'summer / Bulgaria',
          description: 'Sea, hotels, nightlife, and value packages for a fast summer decision.',
          target: 'summer',
        },
        {
          title: 'Bansko',
          label: 'winter / ski',
          description: 'Ski, spa, and holiday arrangements with a clear route to inquiry.',
          target: 'winter',
        },
        {
          title: 'Halkidiki',
          label: 'summer / Greece',
          description: 'Family beaches, apartments, and bus arrangements for the summer season.',
          target: 'summer',
        },
      ],
      travelHighlightsAriaLabel: 'Travel highlights',
      highlightCards: [
        {
          label: 'Summer focus',
          title: 'Greece and Bulgaria',
          description: 'Halkidiki, islands, mainland resorts, family hotels, youth trips, and seaside arrangements.',
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
        'Greece and Bulgaria are organized as practical collections so travelers can scan by coast, transport, hotel type, and budget.',
      summerPackagesLabel: 'Summer packages',
      winterEyebrow: 'Snow season',
      winterTitle: 'Winter Bulgaria',
      winterDescription:
        'Bansko and Pamporovo get dedicated space for ski, spa, holiday, group, and family arrangements.',
      winterPackagesLabel: 'Winter packages',
      exoticEyebrow: 'Tailor-made trips',
      exoticTitle: 'Exotic destinations',
      exoticDescription:
        'Maldives, Dubai, Zanzibar, Thailand, Egypt, safari combinations, honeymoons, and seasonal charter arrangements.',
      exoticCta: 'Request arrangement',
      partnersEyebrow: 'Partner integrations',
      partnersTitle: 'Iframe-ready partner offers',
      partnersDescription:
        'Each partner slot has a clear title, external link, and fallback state when an offer cannot be displayed.',
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
        'VEL-JAN Travel Agency is based in Kocani, with a strong focus on Sunny Beach, Bansko, Halkidiki, and seasonal arrangements.',
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
        { label: 'Summer', target: 'summer' },
        { label: 'Winter', target: 'winter' },
        { label: 'Exotic Trips', target: 'exotic' },
        { label: 'Partner Offers', target: 'partners' },
        { label: 'About', target: 'about' },
        { label: 'Contact', target: 'contact' },
      ],
      destinations: [
        {
          name: 'Greek Islands',
          country: 'Greece',
          season: 'summer',
          region: 'Aegean and Ionian coast',
          heroImage:
            'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80',
          description:
            'Island holidays for couples, families, and friends across Crete, Lefkada, Corfu, Zakynthos, Rhodes, and more.',
          tags: ['islands', 'family', 'beach', 'youth'],
          alt: 'Greek island travel view',
        },
        {
          name: 'Greek Mainland Resorts',
          country: 'Greece',
          season: 'summer',
          region: 'Halkidiki, Olympic Riviera, Thasos',
          heroImage:
            'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
          description:
            'Reliable summer arrangements with hotels, apartments, bus transport, and beach-first itineraries.',
          tags: ['resorts', 'apartments', 'bus', 'value'],
          alt: 'Greek mainland beach',
        },
        {
          name: 'Bulgarian Black Sea',
          country: 'Bulgaria',
          season: 'summer',
          region: 'Sunny Beach, Nessebar, Golden Sands',
          heroImage:
            'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1200&q=80',
          description:
            'Seaside packages for easy family travel, hotel stays, nightlife, and budget-friendly summer breaks.',
          tags: ['seaside', 'family', 'nightlife', 'hotel'],
          alt: 'Bulgarian seaside',
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
          title: 'Halkidiki family beach week',
          destination: 'Greek Mainland Resorts',
          season: 'summer',
          priceLabel: 'from EUR 249',
          duration: '7 nights',
          transportType: 'Bus or own transport',
          dates: 'June to September',
          hotelRating: '3-4 star hotels',
          highlights: ['Shallow beaches', 'Apartment options', 'Family rooms'],
          image:
            'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80',
          inquiryCta: 'Request summer arrangement',
          alt: 'Halkidiki family beach week',
        },
        {
          title: 'Greek island hotel selection',
          destination: 'Greek Islands',
          season: 'summer',
          priceLabel: 'from EUR 399',
          duration: '7 to 10 nights',
          transportType: 'Flight or ferry package',
          dates: 'July and August',
          hotelRating: '3-5 star hotels',
          highlights: ['Crete and Corfu', 'Beach hotels', 'Couples and groups'],
          image:
            'https://images.unsplash.com/photo-1601581875309-fafbf2d3ed3a?auto=format&fit=crop&w=900&q=80',
          inquiryCta: 'View island offers',
          alt: 'Greek island hotel selection',
        },
        {
          title: 'Sunny Beach value break',
          destination: 'Bulgarian Black Sea',
          season: 'summer',
          priceLabel: 'from EUR 219',
          duration: '6 nights',
          transportType: 'Bus package',
          dates: 'Weekly departures',
          hotelRating: '3 star hotels',
          highlights: ['Central hotels', 'Nightlife nearby', 'Youth-friendly'],
          image:
            'https://images.unsplash.com/photo-1526761122248-c31f3b0f5a38?auto=format&fit=crop&w=900&q=80',
          inquiryCta: 'Ask for Bulgaria summer',
          alt: 'Sunny Beach value break',
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
          title: 'Hotel map preview',
          providerName: 'Trusted hotel partner',
          iframeUrl:
            'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d26674.163812111558!2d23.4609554!3d41.8375912',
          destinationTags: ['Bansko', 'winter', 'hotel'],
          description:
            'A live partner embed area for maps, hotel inventories, booking tools, or agency widgets.',
          fallbackUrl: 'https://www.google.com/maps',
          active: true,
        },
        {
          title: 'Seasonal partner feed',
          providerName: 'Partner iframe placeholder',
          iframeUrl: 'https://partner.example.com/summer-offers',
          destinationTags: ['Greece', 'summer', 'packages'],
          description:
            'Replace this configurable URL when a partner provides an iframe for current offers.',
          fallbackUrl: 'https://partner.example.com',
          active: true,
        },
        {
          title: 'Awaiting hotel inventory',
          providerName: 'Hotel supplier',
          destinationTags: ['Bulgaria', 'summer'],
          description:
            'This slot is ready for a future iframe but currently uses a clean fallback state.',
          fallbackUrl: 'https://example.com',
          active: true,
        },
        {
          title: 'Blocked sample partner',
          providerName: 'Unapproved source',
          iframeUrl: 'https://unapproved.example.net/offers',
          destinationTags: ['security test'],
          description:
            'Disallowed iframe hosts are intentionally blocked and never rendered inside the page.',
          fallbackUrl: 'https://unapproved.example.net',
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
