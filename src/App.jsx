import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  Plane, Search, MapPin, Calendar, Users, ArrowLeftRight, Shield, Globe,
  Sun, Moon, ChevronDown, Check, X, Sparkles, Clock,
  Briefcase, CreditCard, Award, Filter,
  SlidersHorizontal, Plus, Minus, Trash2, Printer,
  CheckCircle2, Info, Compass, Layers,
  RefreshCw, Lock, User, FileText, ArrowRight,
  TrendingUp, Activity, Server, Bookmark, Heart, Menu, Box
} from 'lucide-react';

// ============================================================================
// 1. VALYUTA KONVERTERI VA 100% O'ZBEKCHA LOKALIZATSIYA TIZIMI (UZ / EN / RU)
// ============================================================================

const CURRENCIES = {
  UZS: { symbol: "so'm ", rate: 12850, label: 'UZS', decimals: 0 },
  USD: { symbol: '$', rate: 1, label: 'USD ($)', decimals: 0 },
  EUR: { symbol: '€', rate: 0.92, label: 'EUR (€)', decimals: 0 },
  GBP: { symbol: '£', rate: 0.79, label: 'GBP (£)', decimals: 0 },
  AED: { symbol: 'AED ', rate: 3.67, label: 'AED', decimals: 0 },
  TRY: { symbol: '₺', rate: 34.2, label: 'TRY (₺)', decimals: 0 },
};

const TRANSLATIONS = {
  uz: {
    slogan: "MANZILLARDAN HAM ORTIQ. KUTILGANIDAN HAM A'LO.",
    heroTitle: 'KEYINGI DUNYONGIZ SIZNI KUTMOQDA.',
    heroSub: "Parvoz qilishning aqlli usuli bilan ajoyib manzillarni kashf eting.",
    navDiscover: 'Kashf etish',
    navFlights: 'Parvozlar',
    navDestinations: 'Manzillar',
    navStatus: 'Parvoz holati',
    navMyTrips: 'Shaxsiy kabinet',
    navAdmin: 'Boshqaruv paneli',
    roundTrip: 'Borish-kelish',
    oneWay: 'Bir tomonga',
    multiCity: "Ko'p shaharli",
    from: 'Qayerdan',
    to: 'Qayerga',
    departure: 'Uchish sanasi',
    returnDate: 'Qaytish sanasi',
    passengers: "Yo'lovchilar va Klass",
    searchFlights: 'Parvozlarni qidirish',
    trendingTitle: 'Ommabop Xalqaro Yo‘nalishlar',
    whyTitle: 'Talabchan Sayohatchilar Uchun Yaratilgan',
    demoDisclaimer: "DEMO REJIM — NAMUNA REYSLAR VA SIMULYATSIYA NARXLARI",
    fxNotice: "Ko'rsatilgan narxlar ma'lumotnoma kurslari bo'yicha hisoblangan (Yangilangan: 22-Noyabr 2026, 12:00 UTC+5). Asosiy hisob-kitob valyutasi: USD.",
    selectFlight: 'Reysni tanlash',
    compare: 'Taqqoslash',
    bookNow: "O'rindiq tanlashga o'tish",
    confirmPay: "Sinov to'lovini yakunlash",
    cabinClasses: {
      Economy: 'Ekonom',
      'Premium Economy': 'Premium Ekonom',
      Business: 'Biznes',
      'First Class': 'Birinchi klass'
    },
    travelerLabel: "Yo'lovchi",
    adultsLabel: 'Kattalar (12+ yosh)',
    childrenLabel: 'Bolalar (2–11 yosh)',
    infantsLabel: 'Chaqaloqlar (<2 yosh)',
    applyTravelers: 'Tasdiqlash',
    popularCorridors: 'Mashhur to‘g‘ridan-to‘g‘ri yo‘nalishlar:',
    exploreAllDest: 'Barcha manzillarni ko‘rish',
    sampleFrom: 'Namuna narxlar',
    discoverFlightsBtn: 'Parvozlarni ko‘rish',
    globeBadge: '3D INTERAKTIV YER SHARI VA TELEMETRIYA',
    globeTitle: '3D Qit’alararo Parvoz Yo‘laklari Xaritasi',
    globeDesc: "3D Yer sharini sichqoncha bilan aylantiring va istalgan xalqaro aeroport mayoqchasini bosib yangi parvoz yo‘lagini hisoblang.",
    modifySearch: 'Qidiruvni o‘zgartirish',
    filtersTitle: 'Filtrlar',
    resetFilters: 'Tozalash',
    maxPriceLabel: 'Maksimal asosiy tarif',
    stopsLabel: 'To‘xtashlar soni',
    allStops: 'Barcha parvoz variantlari',
    directOnly: 'Faqat to‘g‘ridan-to‘g‘ri reyslar',
    oneStopOnly: '1 ta almashinuv bilan',
    carriersLabel: 'Aviakompaniyalar',
    flexOnlyLabel: 'Qaytariladigan / Moslashuvchan tariflar',
    sortRecommended: 'Tavsiya etilgan',
    sortCheapest: 'Eng arzon',
    sortFastest: 'Eng tezkor',
    sortEarliest: 'Eng erta uchish',
    directText: 'To‘g‘ridan-to‘g‘ri',
    backToResults: '← Qidiruv natijalariga qaytish',
    step1: "1. 3D Salon o'rindiqlari",
    step2: "2. Qo'shimcha xizmatlar",
    step3: "3. Yo'lovchi ma'lumotlari",
    step4: "4. Sinov to'lovi (Checkout)",
  },
  en: {
    slogan: 'BEYOND DESTINATIONS. BEYOND EXPECTATIONS.',
    heroTitle: 'YOUR NEXT WORLD IS WAITING.',
    heroSub: 'Discover extraordinary destinations with a smarter way to fly.',
    navDiscover: 'Discover',
    navFlights: 'Flights',
    navDestinations: 'Destinations',
    navStatus: 'Flight Status',
    navMyTrips: 'My Trips',
    navAdmin: 'Admin',
    roundTrip: 'Round Trip',
    oneWay: 'One Way',
    multiCity: 'Multi-City',
    from: 'Origin',
    to: 'Destination',
    departure: 'Departure',
    returnDate: 'Return',
    passengers: 'Passengers & Cabin',
    searchFlights: 'Search Flights',
    trendingTitle: 'Trending Global Corridors',
    whyTitle: 'Engineered for Discerning Travelers',
    demoDisclaimer: 'DEMO MODE — SAMPLE AVAILABILITY & SIMULATED PRICING',
    fxNotice: 'Display conversions use reference FX rates (Updated: 22 Nov 2026 12:00 UTC+5). Settlement currency: USD.',
    selectFlight: 'Select Flight',
    compare: 'Compare',
    bookNow: 'Continue to Seat Map',
    confirmPay: 'Complete Sandbox Payment',
    cabinClasses: {
      Economy: 'Economy',
      'Premium Economy': 'Premium Economy',
      Business: 'Business Class',
      'First Class': 'First Suite'
    },
    travelerLabel: 'Traveler',
    adultsLabel: 'Adults (12+ yrs)',
    childrenLabel: 'Children (2–11 yrs)',
    infantsLabel: 'Infants (<2 yrs)',
    applyTravelers: 'Apply Travelers',
    popularCorridors: 'Popular Direct Corridors:',
    exploreAllDest: 'Explore All Destinations',
    sampleFrom: 'Sample Fare From',
    discoverFlightsBtn: 'Discover Flights',
    globeBadge: '3D INTERACTIVE TELEMETRY GLOBE',
    globeTitle: '3D Intercontinental Route Intelligence',
    globeDesc: 'Drag the 3D globe to rotate and click any airport beacon to plot great-circle flight arcs.',
    modifySearch: 'Modify Search',
    filtersTitle: 'Filters',
    resetFilters: 'Reset',
    maxPriceLabel: 'Max Base Fare',
    stopsLabel: 'Stops',
    allStops: 'All Flight Options',
    directOnly: 'Direct Non-Stop Only',
    oneStopOnly: '1 Stop Connections',
    carriersLabel: 'Operating Carriers',
    flexOnlyLabel: 'Refundable / Flexible Fare Rules',
    sortRecommended: 'Recommended',
    sortCheapest: 'Cheapest',
    sortFastest: 'Fastest',
    sortEarliest: 'Earliest',
    directText: 'Direct Non-Stop',
    backToResults: '← Back to Search Results',
    step1: '1. 3D Cabin Seat Map',
    step2: '2. Ancillary Services',
    step3: '3. Passenger Details',
    step4: '4. Sandbox Checkout',
  },
  ru: {
    slogan: 'ЗА ПРЕДЕЛАМИ НАПРАВЛЕНИЙ. ВЫШЕ ОЖИДАНИЙ.',
    heroTitle: 'ВАШ СЛЕДУЮЩИЙ МИР ЖДЕТ ВАС.',
    heroSub: 'Открывайте выдающиеся направления с более умным подходом к перелетам.',
    navDiscover: 'Обзор',
    navFlights: 'Рейсы',
    navDestinations: 'Направления',
    navStatus: 'Статус рейса',
    navMyTrips: 'Мои поездки',
    navAdmin: 'Админ',
    roundTrip: 'Туда и обратно',
    oneWay: 'В одну сторону',
    multiCity: 'Сложный маршрут',
    from: 'Откуда',
    to: 'Куда',
    departure: 'Вылет',
    returnDate: 'Обратно',
    passengers: 'Пассажиры и класс',
    searchFlights: 'Найти рейсы',
    trendingTitle: 'Популярные мировые направления',
    whyTitle: 'Создано для взыскательных путешественников',
    demoDisclaimer: 'ДЕМО-РЕЖИМ — ОБРАЗЕЦ РАСПИСАНИЯ И ЦЕН',
    fxNotice: 'Конвертация по справочному курсу (Обновлено: 22 нояб. 2026, 12:00 UTC+5). Валюта расчета: USD.',
    selectFlight: 'Выбрать рейс',
    compare: 'Сравнить',
    bookNow: 'Перейти к выбору мест',
    confirmPay: 'Завершить тестовую оплату',
    cabinClasses: {
      Economy: 'Эконом',
      'Premium Economy': 'Премиум Эконом',
      Business: 'Бизнес-класс',
      'First Class': 'Первый класс'
    },
    travelerLabel: 'Пассажир',
    adultsLabel: 'Взрослые (12+ лет)',
    childrenLabel: 'Дети (2–11 лет)',
    infantsLabel: 'Младенцы (<2 лет)',
    applyTravelers: 'Применить',
    popularCorridors: 'Популярные прямые маршруты:',
    exploreAllDest: 'Все направления',
    sampleFrom: 'Демо-тариф от',
    discoverFlightsBtn: 'Смотреть рейсы',
    globeBadge: '3D ИНТЕРАКТИВНЫЙ ГЛОБУС ТЕЛЕМЕТРИИ',
    globeTitle: '3D-карта межконтинентальных маршрутов',
    globeDesc: 'Вращайте 3D-глобус мышью и нажимайте на маяки аэропортов для построения маршрута.',
    modifySearch: 'Изменить поиск',
    filtersTitle: 'Фильтры',
    resetFilters: 'Сбросить',
    maxPriceLabel: 'Макс. базовый тариф',
    stopsLabel: 'Пересадки',
    allStops: 'Все варианты перелета',
    directOnly: 'Только прямые рейсы',
    oneStopOnly: 'С 1 пересадкой',
    carriersLabel: 'Авиакомпании',
    flexOnlyLabel: 'Возвратные / Гибкие билеты',
    sortRecommended: 'Рекомендуемые',
    sortCheapest: 'Самые дешевые',
    sortFastest: 'Самые быстрые',
    sortEarliest: 'Ранний вылет',
    directText: 'Прямой рейс',
    backToResults: '← Назад к результатам',
    step1: '1. 3D-карта салона',
    step2: '2. Доп. услуги',
    step3: '3. Данные пассажиров',
    step4: '4. Тестовая оплата',
  }
};

// ============================================================================
// 2. AVIATSIYA MA'LUMOTLAR BAZASI VA YUQORI SIFATLI FOTOGRAFIYALAR
// ============================================================================

const HERO_IMAGE = 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=2000&q=80';
const CABIN_IMAGE = 'https://images.unsplash.com/photo-1540339832862-474599807836?auto=format&fit=crop&w=1200&q=80';

const AIRPORTS = [
  { code: 'TAS', name: 'Islom Karimov nomidagi Toshkent Xalqaro Aeroporti', city: 'Toshkent', country: "O'zbekiston", flag: '🇺🇿', region: 'Markaziy Osiyo', tz: 'UTC+5', lat: 41.257, lon: 69.281, desc: "O'zbekistonning asosiy xalqaro havo darvozasi." },
  { code: 'IST', name: 'Istanbul Xalqaro Aeroporti', city: 'Istanbul', country: 'Turkiya', flag: '🇹🇷', region: 'Yevropa / Yaqin Sharq', tz: 'UTC+3', lat: 41.275, lon: 28.751, desc: 'Sharq va G‘arbni bog‘lovchi ulkan aviatsiya xabi.' },
  { code: 'DXB', name: 'Dubay Xalqaro Aeroporti', city: 'Dubay', country: 'BAA', flag: '🇦🇪', region: 'Yaqin Sharq', tz: 'UTC+4', lat: 25.253, lon: 55.365, desc: 'Global lyuks tranzit va uzoq masofali parvozlar markazi.' },
  { code: 'LHR', name: 'London Xitrou Aeroporti', city: 'London', country: 'Buyuk Britaniya', flag: '🇬🇧', region: "G'arbiy Yevropa", tz: 'UTC+0', lat: 51.470, lon: -0.454, desc: 'Yevropaning yetakchi transatlantik aviatsiya markazi.' },
  { code: 'JFK', name: 'Jon F. Kennedi Xalqaro Aeroporti', city: 'Nyu-York', country: 'AQSH', flag: '🇺🇸', region: 'Shimoliy Amerika', tz: 'UTC-5', lat: 40.641, lon: -73.778, desc: 'Shimoliy Amerikaning eng mashhur xalqaro darvozasi.' },
  { code: 'HND', name: 'Tokio Xaneda Xalqaro Aeroporti', city: 'Tokio', country: 'Yaponiya', flag: '🇯🇵', region: 'Sharqiy Osiyo', tz: 'UTC+9', lat: 35.549, lon: 139.779, desc: 'Aniqlik va yuqori texnologiyalar bilan mashhur Tokio xabi.' },
  { code: 'ICN', name: 'Incheon Xalqaro Aeroporti', city: 'Seul', country: 'Janubiy Koreya', flag: '🇰🇷', region: 'Sharqiy Osiyo', tz: 'UTC+9', lat: 37.460, lon: 126.440, desc: 'Shimoli-Sharqiy Osiyoning ilg‘or texnologik aeroporti.' },
  { code: 'FRA', name: 'Frankfurt Aeroporti', city: 'Frankfurt', country: 'Germaniya', flag: '🇩🇪', region: 'Markaziy Yevropa', tz: 'UTC+1', lat: 50.037, lon: 8.562, desc: 'Markaziy Yevropaning eng yirik qit’alararo tuguni.' },
  { code: 'CDG', name: 'Sharl de Goll Aeroporti', city: 'Parij', country: 'Fransiya', flag: '🇫🇷', region: "G'arbiy Yevropa", tz: 'UTC+1', lat: 49.009, lon: 2.547, desc: 'Fransiya va jahon moda poytaxtining havo darvozasi.' },
  { code: 'SIN', name: 'Singapur Changi Aeroporti', city: 'Singapur', country: 'Singapur', flag: '🇸🇬', region: 'Janubi-Sharqiy Osiyo', tz: 'UTC+8', lat: 1.364, lon: 103.991, desc: 'Me’moriy mo‘jiza va Osiyo-Tinch okeani xabi.' },
];

const AIRLINES = {
  HY: { code: 'HY', name: 'Uzbekistan Airways', alliance: 'Milliy Aviahamkor', color: '#00A8E8', rating: 4.7 },
  TK: { code: 'TK', name: 'Turkish Airlines', alliance: 'Star Alliance', color: '#E30A17', rating: 4.8 },
  EK: { code: 'EK', name: 'Emirates', alliance: 'Global Luxury', color: '#D71921', rating: 4.9 },
  BA: { code: 'BA', name: 'British Airways', alliance: 'oneworld', color: '#2E5C99', rating: 4.5 },
  JL: { code: 'JL', name: 'Japan Airlines', alliance: 'oneworld', color: '#CC0000', rating: 4.9 },
  SQ: { code: 'SQ', name: 'Singapore Airlines', alliance: 'Star Alliance', color: '#F5A623', rating: 4.95 },
  LH: { code: 'LH', name: 'Lufthansa', alliance: 'Star Alliance', color: '#05164D', rating: 4.6 },
};

const SAMPLE_FLIGHTS = [
  {
    id: 'FL-901',
    airlineCode: 'HY',
    flightNumber: 'HY-271',
    origin: 'TAS',
    destination: 'IST',
    depTime: '08:15',
    arrTime: '11:35',
    depHour: 8,
    durationMins: 320,
    stops: 0,
    layover: null,
    aircraft: 'Boeing 787-8 Dreamliner',
    terminalDep: 'Terminal 2',
    terminalArr: 'Terminal 1',
    gate: 'B14',
    basePriceUSD: 440,
    baggage: '2 × 23kg Bagaj + 8kg Qo‘l yuki',
    flexible: true,
    co2: '312 kg (-14% o‘rtacha)',
    status: "O'Z VAQTIDA",
    dataSource: 'DEMO JADVAL',
    fareRules: {
      cancellation: "Uchishdan 24 soat oldin $65 ma'muriy yig'im bilan qaytariladi.",
      changes: "Sana bir marta bepul o'zgartiriladi; tarif farqi qo'llaniladi.",
      meals: "Issiq milliy va xalqaro ko'p bosqichli taomlar kiritilgan.",
    }
  },
  {
    id: 'FL-902',
    airlineCode: 'TK',
    flightNumber: 'TK-369',
    origin: 'TAS',
    destination: 'IST',
    depTime: '02:45',
    arrTime: '06:00',
    depHour: 2,
    durationMins: 315,
    stops: 0,
    layover: null,
    aircraft: 'Airbus A330-300',
    terminalDep: 'Terminal 2',
    terminalArr: 'Asosiy Terminal',
    gate: 'A08',
    basePriceUSD: 495,
    baggage: '30kg Bagaj + 8kg Qo‘l yuki',
    flexible: true,
    co2: '328 kg (O‘rtacha)',
    status: "O'Z VAQTIDA",
    dataSource: 'DEMO JADVAL',
    fareRules: {
      cancellation: "Parvozdan oldin $80 jarima bilan qaytariladi.",
      changes: "$45 to'lov + tarif farqi evaziga o'zgartirish mumkin.",
      meals: "Oshpazlar tomonidan tayyorlangan turk va xalqaro taomlar.",
    }
  },
  {
    id: 'FL-903',
    airlineCode: 'EK',
    flightNumber: 'EK-214',
    origin: 'TAS',
    destination: 'LHR',
    depTime: '10:30',
    arrTime: '18:45',
    depHour: 10,
    durationMins: 675,
    stops: 1,
    layover: { airport: 'DXB', duration: '2s 15d', city: 'Dubay' },
    aircraft: 'Boeing 777-300ER / A380-800',
    terminalDep: 'Terminal 2',
    terminalArr: 'Terminal 3',
    gate: 'C04',
    basePriceUSD: 780,
    baggage: '35kg Bagaj + 7kg Qo‘l yuki',
    flexible: true,
    co2: '640 kg (-8% o‘rtacha)',
    status: "RO'YXATDAN O'TISH",
    dataSource: "KESH MA'LUMOTI",
    fareRules: {
      cancellation: "Birinchi segmentdan oldin $100 yig'im bilan to'liq qaytariladi.",
      changes: "$50 yig'im bilan cheksiz sana o'zgartirish.",
      meals: "Gurme taomlar va ICE ko'ngilochar tizimi kiritilgan.",
    }
  },
  {
    id: 'FL-904',
    airlineCode: 'TK',
    flightNumber: 'TK-1985',
    origin: 'TAS',
    destination: 'LHR',
    depTime: '09:10',
    arrTime: '16:50',
    depHour: 9,
    durationMins: 640,
    stops: 1,
    layover: { airport: 'IST', duration: '1s 55d', city: 'Istanbul' },
    aircraft: 'Airbus A350-900',
    terminalDep: 'Terminal 2',
    terminalArr: 'Terminal 2',
    gate: 'B02',
    basePriceUSD: 690,
    baggage: '30kg Bagaj + 8kg Qo‘l yuki',
    flexible: false,
    co2: '590 kg (-18% o‘rtacha)',
    status: "O'Z VAQTIDA",
    dataSource: 'DEMO JADVAL',
    fareRules: {
      cancellation: "Qaytarilmaydigan tarif (aeroport soliqlari qaytariladi).",
      changes: "$95 + tarif farqi evaziga o'zgartirish mumkin.",
      meals: "Ikkala reysda ham issiq ovqat va ichimliklar bepul.",
    }
  },
  {
    id: 'FL-905',
    airlineCode: 'HY',
    flightNumber: 'HY-101',
    origin: 'TAS',
    destination: 'JFK',
    depTime: '06:40',
    arrTime: '10:35',
    depHour: 6,
    durationMins: 775,
    stops: 0,
    layover: null,
    aircraft: 'Boeing 787-9 Dreamliner',
    terminalDep: 'Terminal 2',
    terminalArr: 'Terminal 1',
    gate: 'A01',
    basePriceUSD: 960,
    baggage: '2 × 23kg Bagaj + 10kg Qo‘l yuki',
    flexible: true,
    co2: '710 kg (-15% o‘rtacha)',
    status: "O'Z VAQTIDA",
    dataSource: 'DEMO JADVAL',
    fareRules: {
      cancellation: "48 soat oldin $120 yig'im bilan qaytariladi.",
      changes: "Birinchi sana o'zgartirish mutlaqo bepul.",
      meals: "Ikki marta to'liq transatlantik ovqatlanish xizmati.",
    }
  },
  {
    id: 'FL-906',
    airlineCode: 'JL',
    flightNumber: 'JL-044',
    origin: 'LHR',
    destination: 'HND',
    depTime: '19:00',
    arrTime: '15:55',
    depHour: 19,
    durationMins: 775,
    stops: 0,
    layover: null,
    aircraft: 'Airbus A350-1000',
    terminalDep: 'Terminal 3',
    terminalArr: 'Terminal 3',
    gate: 'G12',
    basePriceUSD: 1120,
    baggage: '2 × 23kg Bagaj + 10kg Qo‘l yuki',
    flexible: true,
    co2: '695 kg (-21% o‘rtacha)',
    status: "O'Z VAQTIDA",
    dataSource: 'DEMO JADVAL',
    fareRules: {
      cancellation: "$150 yig'im bilan qaytariladi.",
      changes: "Bo'sh o'rinlar mavjud bo'lganda bepul o'zgartiriladi.",
      meals: "Kayseki uslubidagi yapon va yevropa taomlari.",
    }
  },
  {
    id: 'FL-907',
    airlineCode: 'SQ',
    flightNumber: 'SQ-321',
    origin: 'LHR',
    destination: 'SIN',
    depTime: '22:05',
    arrTime: '18:10',
    depHour: 22,
    durationMins: 785,
    stops: 0,
    layover: null,
    aircraft: 'Airbus A380-800',
    terminalDep: 'Terminal 2',
    terminalArr: 'Terminal 3',
    gate: 'B44',
    basePriceUSD: 1050,
    baggage: '30kg Bagaj + 7kg Qo‘l yuki',
    flexible: true,
    co2: '740 kg (-12% o‘rtacha)',
    status: '20 DAQIQA KECHIKISH',
    dataSource: "KESH MA'LUMOTI",
    fareRules: {
      cancellation: "$100 yig'im bilan qaytariladi.",
      changes: "72 soat oldin bepul sana o'zgartirish.",
      meals: "Book the Cook gurme menyusiga oldindan buyurtma.",
    }
  },
  {
    id: 'FL-910',
    airlineCode: 'HY',
    flightNumber: 'HY-333',
    origin: 'TAS',
    destination: 'DXB',
    depTime: '08:50',
    arrTime: '11:25',
    depHour: 8,
    durationMins: 215,
    stops: 0,
    layover: null,
    aircraft: 'Airbus A321neo LR',
    terminalDep: 'Terminal 2',
    terminalArr: 'Terminal 1',
    gate: 'B09',
    basePriceUSD: 320,
    baggage: '23kg Bagaj + 8kg Qo‘l yuki',
    flexible: true,
    co2: '215 kg (-22% o‘rtacha)',
    status: "O'Z VAQTIDA",
    dataSource: 'DEMO JADVAL',
    fareRules: {
      cancellation: "$45 yig'im bilan qaytariladi.",
      changes: "Bir marta bepul sana o'zgartirish.",
      meals: "Issiq taomlar va salqin ichimliklar kiritilgan.",
    }
  }
];

const DESTINATIONS_DATA = [
  {
    code: 'TAS',
    city: 'Toshkent',
    country: "O'zbekiston",
    image: 'https://images.unsplash.com/photo-1596484552834-6a58f850e0a1?auto=format&fit=crop&w=1200&q=80',
    tagline: "Buyuk Ipak Yo'li merosi va zamonaviy Markaziy Osiyo ulug'vorligi",
    bestSeason: 'Aprel – Iyun va Sentabr – Noyabr',
    sampleFromUSD: 320,
    attractions: ['Hazrati Imom majmuasi', 'Chorsu bozori', 'Toshkent metrosi san’at bekatlari', 'Amir Temur xiyoboni'],
    overview: "Yevroosiyo chorrahasida joylashgan monumental me'morchilik, yashil xiyobonlar va boy pazandalik madaniyatining betakror uyg'unligi."
  },
  {
    code: 'IST',
    city: 'Istanbul',
    country: 'Turkiya',
    image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=1200&q=80',
    tagline: 'Ikki qit’a Bosfor bo‘g‘ozi uzra tutashgan afsonaviy shahar',
    bestSeason: 'Aprel – May va Sentabr – Oktabr',
    sampleFromUSD: 440,
    attractions: ['Aya Sofiya va Moviy masjid', 'Bosfor bo‘ylab xususiy sayohat', 'Katta bozor va Karaköy', 'To‘pqopi saroyi'],
    overview: "Vizantiya va Usmonli imperiyalarining asriy ulug'vorligi, zamonaviy gastronomiya va dengiz shabadasi uyg'unlashgan maskan."
  },
  {
    code: 'DXB',
    city: 'Dubay',
    country: 'Birlashgan Arab Amirliklari',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80',
    tagline: "Me'moriy jasorat va sahro ufqidagi lyuks hashamat",
    bestSeason: 'Noyabr – Mart',
    sampleFromUSD: 320,
    attractions: ['Burj Xalifa', 'Kelajak muzeyi (Museum of the Future)', 'Al-Fahidi tarixiy mavzesi', 'Arab sahrosi qo‘riqxonasi'],
    overview: "Osmono'par binolar, xususiy sohil kurortlari va global aviaaloqa markazi — zamonaviy lyuks sayohat cho'qqisi."
  },
  {
    code: 'LHR',
    city: 'London',
    country: 'Buyuk Britaniya',
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1200&q=80',
    tagline: 'Qirollik an’analari va global madaniyat poytaxti',
    bestSeason: 'May – Sentabr',
    sampleFromUSD: 690,
    attractions: ['Meyfeyr va Naytsbrij', 'Britaniya muzeyi va Tate Modern', 'Vest-End teatrlari', 'Kensington bog‘lari'],
    overview: "Jahon darajasidagi galereyalar, Mishel yulduzli restoranlar va nufuzli transatlantik havo yo'llari markazi."
  },
  {
    code: 'HND',
    city: 'Tokio',
    country: 'Yaponiya',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1200&q=80',
    tagline: 'Yuqori texnologiyali futurizm va Dzen xotirjamligi',
    bestSeason: 'Mart – Aprel (Sakura) va Oktabr – Noyabr',
    sampleFromUSD: 940,
    attractions: ['Ginza va Shibuya Sky', 'Asakusa Senso-ji ibodatxonasi', 'Meydzi o‘rmoni', 'Tsukiji gastronomik bozori'],
    overview: "Mishel yulduzli oshpazlik san'ati, qadimiy ibodatxonalar va neon me'morchiligining mislsiz simfoniyasi."
  },
  {
    code: 'JFK',
    city: 'Nyu-York',
    country: 'AQSH',
    image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=1200&q=80',
    tagline: "Global ambitsiyalar va san'atning tengsiz poytaxti",
    bestSeason: 'Aprel – Iyun va Sentabr – Noyabr',
    sampleFromUSD: 960,
    attractions: ['Markaziy bog‘ va Beshinchi avenyu', 'Metropoliten san’at muzeyi', 'Hudson Yards & The Edge', 'SoHo va Tribeka'],
    overview: "Afsonaviy osmono'par siluetlar, jahon muzeylari va besh tumandagi tinimsiz ijodiy energiya."
  }
];

const ANCILLARY_OPTIONS = [
  { id: 'bag-23', name: "Qo'shimcha 23kg ro'yxatdan o'tgan bagaj", desc: "Ustuvor belgilangan yuk tashish ruxsatnomasi.", priceUSD: 55, icon: Briefcase },
  { id: 'lounge', name: 'SKYLINE X Horizon VIP Lounge chiptasi', desc: "A la carte restoran, dush xonalari va tinch ish hududi.", priceUSD: 68, icon: Sparkles },
  { id: 'fast-track', name: 'Fast-Track tezkor xavfsizlik va bortga chiqish', desc: "Alohida biometrik yo'lak va 1-guruh bortga chiqish.", priceUSD: 32, icon: Shield },
  { id: 'meal-gourmet', name: 'Bosh oshpazning maxsus bort taomnomasi', desc: "Oldindan buyurtma qilingan 4 bosqichli gurme taomlar.", priceUSD: 28, icon: Award },
  { id: 'flex-shield', name: "Reys kechikishidan himoya va moslashuvchanlik", desc: "Zudlik bilan qayta bron qilish krediti va kompensatsiya.", priceUSD: 42, icon: CheckCircle2 },
];

// ============================================================================
// 3. 3D PERSPECTIVE TILT KARTA KOMPONENTI (INTERAKTIV HARAKAT VA NUR EFFEKTI)
// ============================================================================

const Tilt3DCard = ({ children, className = '' }) => {
  const cardRef = useRef(null);
  const [transformStyle, setTransformStyle] = useState('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)');
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;
    setTransformStyle(`perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.015,1.015,1.015)`);
    setGlare({ x: (x / rect.width) * 100, y: (y / rect.height) * 100, opacity: 0.22 });
  };

  const handleMouseLeave = () => {
    setTransformStyle('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)');
    setGlare(prev => ({ ...prev, opacity: 0 }));
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform: transformStyle, transition: 'transform 180ms cubic-bezier(0.22, 1, 0.36, 1)' }}
      className={`relative will-change-transform ${className}`}
    >
      {children}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-300"
        style={{
          opacity: glare.opacity,
          background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(85, 214, 255, 0.45), transparent 65%)`
        }}
      />
    </div>
  );
};

// ============================================================================
// 4. HAQIQIY 3D AYLANUVCHI YER SHARI VA PARVOZ TELEMETRIYASI (HTML5 CANVAS 3D)
// ============================================================================

const Interactive3DGlobe = ({ originCode, destCode, onSelectRoute, t }) => {
  const canvasRef = useRef(null);
  const rotationRef = useRef({ lon: -55, lat: 24 });
  const isDraggingRef = useRef(false);
  const lastMouseRef = useRef({ x: 0, y: 0 });
  const projectedHubsRef = useRef([]);
  const [hoveredHub, setHoveredHub] = useState(null);

  // Focus globe smoothly when origin/destination changes
  useEffect(() => {
    const target = AIRPORTS.find(a => a.code === destCode) || AIRPORTS[0];
    rotationRef.current.lon = -target.lon;
  }, [destCode]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let pulsePhase = 0;

    // Convert Lat/Lon to 3D Cartesian coordinates on unit sphere
    const latLonTo3D = (lat, lon, radius, rotLonDeg, rotLatDeg) => {
      const phi = (lat * Math.PI) / 180;
      const theta = ((lon + rotLonDeg) * Math.PI) / 180;
      const tilt = (rotLatDeg * Math.PI) / 180;

      let x = radius * Math.cos(phi) * Math.sin(theta);
      let y = -radius * Math.sin(phi);
      let z = radius * Math.cos(phi) * Math.cos(theta);

      // Rotate around X axis for latitude tilt
      const y2 = y * Math.cos(tilt) - z * Math.sin(tilt);
      const z2 = y * Math.sin(tilt) + z * Math.cos(tilt);

      return { x, y: y2, z: z2 };
    };

    const render = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      if (canvas.width !== rect.width * dpr || canvas.height !== rect.height * dpr) {
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
      }

      ctx.save();
      ctx.scale(dpr, dpr);

      const w = rect.width;
      const h = rect.height;
      const cx = w / 2;
      const cy = h / 2;
      const radius = Math.min(w, h) * 0.39;

      if (!isDraggingRef.current) {
        rotationRef.current.lon += 0.18;
      }
      pulsePhase += 0.05;

      ctx.clearRect(0, 0, w, h);

      // Outer Atmospheric 3D Halo
      const haloGrad = ctx.createRadialGradient(cx, cy, radius * 0.78, cx, cy, radius * 1.24);
      haloGrad.addColorStop(0, 'rgba(85, 214, 255, 0.22)');
      haloGrad.addColorStop(0.6, 'rgba(139, 158, 255, 0.08)');
      haloGrad.addColorStop(1, 'rgba(7, 17, 31, 0)');
      ctx.fillStyle = haloGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, radius * 1.24, 0, Math.PI * 2);
      ctx.fill();

      // Core 3D Sphere Shading
      const sphereGrad = ctx.createRadialGradient(cx - radius * 0.3, cy - radius * 0.3, radius * 0.1, cx, cy, radius);
      sphereGrad.addColorStop(0, '#143152');
      sphereGrad.addColorStop(0.55, '#0B192A');
      sphereGrad.addColorStop(1, '#050C17');
      ctx.fillStyle = sphereGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = 'rgba(85, 214, 255, 0.35)';
      ctx.lineWidth = 1.3;
      ctx.stroke();

      const rotLon = rotationRef.current.lon;
      const rotLat = rotationRef.current.lat;

      // Draw 3D Latitude & Longitude Wireframe Meridians
      ctx.strokeStyle = 'rgba(85, 214, 255, 0.12)';
      ctx.lineWidth = 0.8;

      for (let lat = -60; lat <= 60; lat += 30) {
        ctx.beginPath();
        let started = false;
        for (let lon = -180; lon <= 180; lon += 6) {
          const p = latLonTo3D(lat, lon, radius, rotLon, rotLat);
          if (p.z > 0) {
            if (!started) { ctx.moveTo(cx + p.x, cy + p.y); started = true; }
            else ctx.lineTo(cx + p.x, cy + p.y);
          } else {
            started = false;
          }
        }
        ctx.stroke();
      }

      for (let lon = -180; lon < 180; lon += 30) {
        ctx.beginPath();
        let started = false;
        for (let lat = -90; lat <= 90; lat += 6) {
          const p = latLonTo3D(lat, lon, radius, rotLon, rotLat);
          if (p.z > 0) {
            if (!started) { ctx.moveTo(cx + p.x, cy + p.y); started = true; }
            else ctx.lineTo(cx + p.x, cy + p.y);
          } else {
            started = false;
          }
        }
        ctx.stroke();
      }

      // Draw Secondary Mesh Arcs from Tashkent
      const tas = AIRPORTS[0];
      AIRPORTS.slice(1, 6).forEach(target => {
        ctx.beginPath();
        let started = false;
        for (let step = 0; step <= 32; step++) {
          const frac = step / 32;
          const lat = tas.lat + (target.lat - tas.lat) * frac;
          const lon = tas.lon + (target.lon - tas.lon) * frac;
          const alt = radius + Math.sin(frac * Math.PI) * 14;
          const p = latLonTo3D(lat, lon, alt, rotLon, rotLat);
          if (p.z > -10) {
            if (!started) { ctx.moveTo(cx + p.x, cy + p.y); started = true; }
            else ctx.lineTo(cx + p.x, cy + p.y);
          } else {
            started = false;
          }
        }
        ctx.strokeStyle = 'rgba(139, 158, 255, 0.22)';
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      // Draw Active Elevated 3D Great-Circle Flight Trajectory
      const origAp = AIRPORTS.find(a => a.code === originCode) || AIRPORTS[0];
      const destAp = AIRPORTS.find(a => a.code === destCode) || AIRPORTS[1];

      const arcPoints = [];
      ctx.beginPath();
      let arcStarted = false;
      for (let step = 0; step <= 48; step++) {
        const frac = step / 48;
        const lat = origAp.lat + (destAp.lat - origAp.lat) * frac;
        const lon = origAp.lon + (destAp.lon - origAp.lon) * frac;
        const elevation = radius + Math.sin(frac * Math.PI) * (radius * 0.22);
        const p = latLonTo3D(lat, lon, elevation, rotLon, rotLat);
        arcPoints.push(p);
        if (p.z > -15) {
          if (!arcStarted) { ctx.moveTo(cx + p.x, cy + p.y); arcStarted = true; }
          else ctx.lineTo(cx + p.x, cy + p.y);
        } else {
          arcStarted = false;
        }
      }
      const arcGrad = ctx.createLinearGradient(cx - radius, cy, cx + radius, cy);
      arcGrad.addColorStop(0, '#55D6FF');
      arcGrad.addColorStop(1, '#8B9EFF');
      ctx.strokeStyle = arcGrad;
      ctx.lineWidth = 3;
      ctx.stroke();

      // Animated Flying Aircraft Beacon along the 3D Arc
      const flyerIdx = Math.floor(((pulsePhase * 8) % 48));
      const flyerPt = arcPoints[flyerIdx];
      if (flyerPt && flyerPt.z > 0) {
        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.arc(cx + flyerPt.x, cy + flyerPt.y, 3.8, 0, Math.PI * 2);
        ctx.fill();
      }

      // Project & Render 3D Airport Beacons
      const currentProjected = [];
      AIRPORTS.forEach(ap => {
        const p = latLonTo3D(ap.lat, ap.lon, radius, rotLon, rotLat);
        if (p.z > 0) {
          const sx = cx + p.x;
          const sy = cy + p.y;
          const isOrig = ap.code === originCode;
          const isDest = ap.code === destCode;
          const active = isOrig || isDest;

          currentProjected.push({ ...ap, sx, sy });

          if (active) {
            const pulseR = 8 + Math.sin(pulsePhase * 1.5) * 4;
            ctx.strokeStyle = isOrig ? 'rgba(85, 214, 255, 0.7)' : 'rgba(139, 158, 255, 0.7)';
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.arc(sx, sy, pulseR, 0, Math.PI * 2);
            ctx.stroke();
          }

          ctx.fillStyle = isOrig ? '#55D6FF' : isDest ? '#8B9EFF' : '#F7FAFF';
          ctx.beginPath();
          ctx.arc(sx, sy, active ? 5 : 3.5, 0, Math.PI * 2);
          ctx.fill();

          ctx.font = active ? 'bold 11px monospace' : '600 9.5px monospace';
          ctx.fillStyle = active ? '#55D6FF' : '#9BAFC5';
          ctx.fillText(ap.code, sx + 7, sy + 3);
        }
      });

      projectedHubsRef.current = currentProjected;
      ctx.restore();
      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [originCode, destCode]);

  const handlePointerDown = (e) => {
    isDraggingRef.current = true;
    lastMouseRef.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerMove = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;

    if (isDraggingRef.current) {
      const dx = e.clientX - lastMouseRef.current.x;
      const dy = e.clientY - lastMouseRef.current.y;
      rotationRef.current.lon += dx * 0.45;
      rotationRef.current.lat = Math.max(-45, Math.min(45, rotationRef.current.lat + dy * 0.3));
      lastMouseRef.current = { x: e.clientX, y: e.clientY };
      return;
    }

    const hit = projectedHubsRef.current.find(h => Math.hypot(h.sx - mx, h.sy - my) < 14);
    setHoveredHub(hit || null);
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
  };

  const handleClick = () => {
    if (hoveredHub && hoveredHub.code !== originCode) {
      onSelectRoute(originCode, hoveredHub.code);
    }
  };

  return (
    <div className="relative rounded-2xl border border-[#55D6FF]/30 bg-[#07111F] overflow-hidden select-none">
      <div className="absolute top-3 left-3 right-3 z-10 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
        <div className="px-3 py-1.5 rounded-xl bg-[#0B192A]/90 backdrop-blur border border-[#55D6FF]/35 text-xs text-[#F7FAFF] flex items-center gap-2">
          <Globe className="w-3.5 h-3.5 text-[#55D6FF] animate-spin" style={{ animationDuration: '12s' }} />
          <span className="font-semibold">3D Yo‘lak:</span>
          <span className="font-mono font-bold text-[#55D6FF]">{originCode} → {destCode}</span>
        </div>
        <span className="px-2.5 py-1 rounded-lg bg-[#0B192A]/85 border border-white/10 text-[10px] font-mono text-[#9BAFC5]">
          360° AYLANTIRISH UCHUN SURING
        </span>
      </div>

      <canvas
        ref={canvasRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        onClick={handleClick}
        className="w-full h-80 sm:h-96 cursor-grab active:cursor-grabbing block"
      />

      {hoveredHub && (
        <div className="absolute bottom-3 left-3 px-3.5 py-2 rounded-xl bg-[#0B192A]/95 border border-[#55D6FF]/50 text-xs text-[#F7FAFF] shadow-2xl">
          <div className="font-bold flex items-center gap-1.5">
            <span>{hoveredHub.flag}</span>
            <span>{hoveredHub.city} ({hoveredHub.code})</span>
            <span className="text-[#55D6FF] font-mono">• {hoveredHub.tz}</span>
          </div>
          <div className="text-[#9BAFC5] mt-0.5">{hoveredHub.name} — Yo‘nalish tanlash uchun bosing</div>
        </div>
      )}
    </div>
  );
};

// ============================================================================
// 5. MAXSUS SKYLINE X BREND LOGOTIPI
// ============================================================================

const SkylineLogo = ({ lightMode }) => (
  <div className="flex items-center gap-3 select-none group cursor-pointer">
    <div className="relative w-10 h-10 flex items-center justify-center rounded-xl bg-gradient-to-br from-[#55D6FF]/25 to-[#8B9EFF]/25 border border-[#55D6FF]/45 shadow-lg shadow-[#55D6FF]/15 group-hover:border-[#55D6FF] transition-all">
      <svg viewBox="0 0 40 40" className="w-7 h-7" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 26C14 24 22 18 34 9C28 19 22 25 14 29L6 26Z" fill="url(#wingGrad1)" />
        <path d="M11 31C19 29 26 24 35 16C30 24 24 30 16 33L11 31Z" fill="url(#wingGrad2)" opacity="0.85" />
        <circle cx="33" cy="9" r="2.3" fill="#55D6FF" />
        <defs>
          <linearGradient id="wingGrad1" x1="6" y1="26" x2="34" y2="9" gradientUnits="userSpaceOnUse">
            <stop stopColor="#55D6FF" />
            <stop offset="1" stopColor="#8B9EFF" />
          </linearGradient>
          <linearGradient id="wingGrad2" x1="11" y1="31" x2="35" y2="16" gradientUnits="userSpaceOnUse">
            <stop stopColor="#8B9EFF" />
            <stop offset="1" stopColor="#55D6FF" />
          </linearGradient>
        </defs>
      </svg>
    </div>
    <div>
      <div className="flex items-center gap-1.5">
        <span className={`font-extrabold tracking-[0.18em] text-lg leading-none ${lightMode ? 'text-slate-900' : 'text-[#F7FAFF]'}`}>
          SKYLINE
        </span>
        <span className="font-black text-lg leading-none text-[#55D6FF]">X</span>
      </div>
      <p className={`text-[9px] tracking-[0.2em] uppercase mt-1 font-semibold ${lightMode ? 'text-slate-500' : 'text-[#9BAFC5]'}`}>
        Global Aviatsiya Tizimi
      </p>
    </div>
  </div>
);

// ============================================================================
// 6. QAYTA ISHLATILUVCHI AEROPORT QIDIRUV KOMPONENTI
// ============================================================================

const AirportSelector = ({ label, value, onChange, excludeCode, lightMode }) => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const wrapperRef = useRef(null);

  const selectedAirport = AIRPORTS.find(a => a.code === value) || AIRPORTS[0];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return AIRPORTS.filter(a => a.code !== excludeCode).filter(a =>
      !q ||
      a.code.toLowerCase().includes(q) ||
      a.city.toLowerCase().includes(q) ||
      a.country.toLowerCase().includes(q) ||
      a.name.toLowerCase().includes(q)
    );
  }, [query, excludeCode]);

  return (
    <div ref={wrapperRef} className="relative flex-1 min-w-[200px]">
      <button
        type="button"
        onClick={() => { setOpen(!open); setQuery(''); }}
        className={`w-full text-left px-4 py-3 rounded-xl border transition-all flex items-center justify-between ${
          lightMode
            ? 'bg-slate-50 border-slate-200 hover:border-sky-400 text-slate-900'
            : 'bg-[#07111F]/90 border-[#55D6FF]/20 hover:border-[#55D6FF]/60 text-[#F7FAFF]'
        }`}
      >
        <div className="min-w-0 pr-2">
          <div className={`text-[11px] uppercase tracking-wider font-semibold ${lightMode ? 'text-slate-500' : 'text-[#9BAFC5]'}`}>
            {label}
          </div>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="font-bold text-base truncate">{selectedAirport.city}</span>
            <span className="px-1.5 py-0.5 text-xs font-mono font-bold rounded bg-[#55D6FF]/15 text-[#55D6FF]">
              {selectedAirport.code}
            </span>
          </div>
          <div className={`text-xs truncate ${lightMode ? 'text-slate-500' : 'text-[#9BAFC5]'}`}>
            {selectedAirport.name}
          </div>
        </div>
        <MapPin className="w-4 h-4 text-[#55D6FF] shrink-0" />
      </button>

      {open && (
        <div className={`absolute z-50 mt-2 w-80 sm:w-96 rounded-2xl border shadow-2xl overflow-hidden ${
          lightMode
            ? 'bg-white border-slate-200 text-slate-900'
            : 'bg-[#0B192A] border-[#55D6FF]/35 text-[#F7FAFF]'
        }`}>
          <div className={`p-3 border-b ${lightMode ? 'border-slate-100' : 'border-white/10'}`}>
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#55D6FF]" />
              <input
                type="text"
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Shahar, aeroport yoki IATA kod (masalan: TAS, IST)..."
                className={`w-full pl-9 pr-3 py-2 text-sm rounded-lg border outline-none ${
                  lightMode
                    ? 'bg-slate-50 border-slate-200 focus:border-sky-500'
                    : 'bg-[#07111F] border-white/15 focus:border-[#55D6FF]'
                }`}
              />
            </div>
          </div>
          <div className="max-h-64 overflow-y-auto divide-y divide-white/5">
            {filtered.length === 0 ? (
              <div className="p-4 text-sm text-center text-[#9BAFC5]">Mos keluvchi aeroport topilmadi.</div>
            ) : (
              filtered.map((airport) => (
                <button
                  key={airport.code}
                  type="button"
                  onClick={() => {
                    onChange(airport.code);
                    setOpen(false);
                  }}
                  className={`w-full text-left px-4 py-3 flex items-center justify-between transition-colors ${
                    lightMode ? 'hover:bg-sky-50' : 'hover:bg-[#10243A]'
                  }`}
                >
                  <div>
                    <div className="font-semibold text-sm flex items-center gap-2">
                      <span>{airport.flag}</span>
                      <span>{airport.city}, {airport.country}</span>
                    </div>
                    <div className={`text-xs ${lightMode ? 'text-slate-500' : 'text-[#9BAFC5]'}`}>
                      {airport.name} • {airport.tz}
                    </div>
                  </div>
                  <span className="font-mono font-bold text-xs px-2 py-1 rounded bg-[#55D6FF]/15 text-[#55D6FF]">
                    {airport.code}
                  </span>
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// ============================================================================
// 7. ASOSIY SKYLINE X ILOVASI
// ============================================================================

export default function App() {
  // O'zbek tili sukut bo'yicha (default: 'uz')
  const [lightMode, setLightMode] = useState(false);
  const [lang, setLang] = useState('uz');
  const [currency, setCurrency] = useState('UZS');
  const [activeView, setActiveView] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Foydalanuvchi sessiyasi
  const [currentUser] = useState({
    id: 'USR-7721',
    name: 'Amirbek Karimov',
    email: 'amirbek.karimov@skyline-x.uz',
    tier: 'SKYLINE X HORIZON PLATINUM',
    miles: 84250,
    role: 'ADMIN'
  });
  const [authModalOpen, setAuthModalOpen] = useState(false);

  // Qidiruv holati
  const [tripType, setTripType] = useState('round');
  const [origin, setOrigin] = useState('TAS');
  const [destination, setDestination] = useState('IST');
  const [depDate, setDepDate] = useState('2026-12-12');
  const [retDate, setRetDate] = useState('2026-12-19');
  const [passengers, setPassengers] = useState({ adults: 1, children: 0, infants: 0 });
  const [cabinClass, setCabinClass] = useState('Economy');
  const [paxDropdownOpen, setPaxDropdownOpen] = useState(false);
  const [multiSegments, setMultiSegments] = useState([
    { id: 1, origin: 'TAS', destination: 'IST', date: '2026-12-12' },
    { id: 2, origin: 'IST', destination: 'LHR', date: '2026-12-16' }
  ]);

  // Natijalar, Filtrlar va 3D Salon rejimi
  const [isSearching, setIsSearching] = useState(false);
  const [maxPriceFilter, setMaxPriceFilter] = useState(1500);
  const [stopsFilter, setStopsFilter] = useState('all');
  const [selectedAirlines, setSelectedAirlines] = useState([]);
  const [flexibleOnly, setFlexibleOnly] = useState(false);
  const [sortBy, setSortBy] = useState('recommended');
  const [compareIds, setCompareIds] = useState([]);
  const [compareModalOpen, setCompareModalOpen] = useState(false);
  const [savedFlightIds, setSavedFlightIds] = useState(['FL-901']);
  const [savedDestCodes, setSavedDestCodes] = useState(['IST', 'HND']);
  const [cabin3DView, setCabin3DView] = useState(true);

  // Bron qilish bosqichlari
  const [selectedFlight, setSelectedFlight] = useState(SAMPLE_FLIGHTS[0]);
  const [bookingStep, setBookingStep] = useState(1);
  const [selectedSeats, setSelectedSeats] = useState(['12A']);
  const [selectedAncillaries, setSelectedAncillaries] = useState(['fast-track']);
  const [passengerForms, setPassengerForms] = useState([
    {
      givenName: 'Amirbek',
      familyName: 'Karimov',
      dob: '1994-05-18',
      nationality: "O'zbekiston",
      docNumber: 'FA4829104',
      email: 'amirbek.karimov@skyline-x.uz',
      phone: '+998 90 123 45 67'
    }
  ]);
  const [formErrors, setFormErrors] = useState({});
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [latestConfirmation, setLatestConfirmation] = useState(null);

  // Bronlar ro'yxati
  const [bookings, setBookings] = useState([
    {
      pnr: 'SKX-8492A',
      flight: SAMPLE_FLIGHTS[0],
      date: '2026-12-12',
      cabin: 'Biznes',
      seats: ['2A'],
      ancillaries: ['lounge', 'fast-track'],
      passengers: [{ givenName: 'Amirbek', familyName: 'Karimov', docNumber: 'FA4829104' }],
      totalUSD: 718,
      status: 'TASDIQLANGAN (DEMO)',
      createdAt: '2026-11-20 14:22 UTC',
      paymentRef: 'TXN-99401-SBX'
    },
    {
      pnr: 'SKX-3109K',
      flight: SAMPLE_FLIGHTS[4],
      date: '2027-01-15',
      cabin: 'Ekonom',
      seats: ['18F'],
      ancillaries: ['bag-23'],
      passengers: [{ givenName: 'Amirbek', familyName: 'Karimov', docNumber: 'FA4829104' }],
      totalUSD: 1015,
      status: 'TASDIQLANGAN (DEMO)',
      createdAt: '2026-11-21 09:05 UTC',
      paymentRef: 'TXN-99812-SBX'
    }
  ]);

  const [statusQuery, setStatusQuery] = useState('');
  const [statusUpdatedAt, setStatusUpdatedAt] = useState('22-Noyabr 2026, 12:14 UTC+5');
  const [adminBookingSearch, setAdminBookingSearch] = useState('');

  const t = TRANSLATIONS[lang] || TRANSLATIONS.uz;
  const totalPaxCount = passengers.adults + passengers.children + passengers.infants;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const count = Math.max(1, passengers.adults + passengers.children);
    setPassengerForms(prev => {
      const next = [...prev];
      while (next.length < count) {
        next.push({
          givenName: '',
          familyName: '',
          dob: '1996-08-10',
          nationality: "O'zbekiston",
          docNumber: '',
          email: prev[0]?.email || '',
          phone: prev[0]?.phone || ''
        });
      }
      return next.slice(0, count);
    });
  }, [passengers.adults, passengers.children]);

  const formatPrice = (usdAmount) => {
    const cur = CURRENCIES[currency] || CURRENCIES.UZS;
    const converted = Math.round(usdAmount * cur.rate);
    return currency === 'UZS'
      ? `${converted.toLocaleString()} so'm`
      : `${cur.symbol}${converted.toLocaleString()}`;
  };

  const getCabinMultiplier = (cabin) => {
    switch (cabin) {
      case 'Premium Economy': return 1.35;
      case 'Business': return 2.4;
      case 'First Class': return 3.8;
      default: return 1;
    }
  };

  const formatDuration = (mins) => `${Math.floor(mins / 60)}s ${mins % 60}d`;

  const triggerSearch = (customOrigin, customDest) => {
    if (customOrigin) setOrigin(customOrigin);
    if (customDest) setDestination(customDest);
    setIsSearching(true);
    setActiveView('results');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => setIsSearching(false), 450);
  };

  const filteredFlights = useMemo(() => {
    const exactRouteMatches = SAMPLE_FLIGHTS.filter(
      f => f.origin === origin && f.destination === destination
    );
    const pool = exactRouteMatches.length > 0 ? exactRouteMatches : SAMPLE_FLIGHTS;
    const mult = getCabinMultiplier(cabinClass);

    return pool
      .map(f => ({
        ...f,
        computedPriceUSD: Math.round(f.basePriceUSD * mult)
      }))
      .filter(f => f.computedPriceUSD <= maxPriceFilter * mult)
      .filter(f => stopsFilter === 'all' ? true : f.stops === Number(stopsFilter))
      .filter(f => selectedAirlines.length === 0 ? true : selectedAirlines.includes(f.airlineCode))
      .filter(f => flexibleOnly ? f.flexible : true)
      .sort((a, b) => {
        if (sortBy === 'cheapest') return a.computedPriceUSD - b.computedPriceUSD;
        if (sortBy === 'fastest') return a.durationMins - b.durationMins;
        if (sortBy === 'earliest') return a.depHour - b.depHour;
        return (a.computedPriceUSD * 0.6 + a.durationMins * 0.4) - (b.computedPriceUSD * 0.6 + b.durationMins * 0.4);
      });
  }, [origin, destination, cabinClass, maxPriceFilter, stopsFilter, selectedAirlines, flexibleOnly, sortBy]);

  const hasExactRoute = useMemo(
    () => SAMPLE_FLIGHTS.some(f => f.origin === origin && f.destination === destination),
    [origin, destination]
  );

  const toggleCompare = (flightId) => {
    setCompareIds(prev => {
      if (prev.includes(flightId)) return prev.filter(id => id !== flightId);
      if (prev.length >= 3) return [...prev.slice(1), flightId];
      return [...prev, flightId];
    });
  };

  const startBooking = (flight) => {
    setSelectedFlight(flight);
    setBookingStep(1);
    setSelectedSeats(['14A']);
    setActiveView('booking');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getSeatPriceUSD = (seatCode) => {
    const row = parseInt(seatCode, 10);
    if (row <= 3) return 95;
    if (row === 10 || row === 11) return 45;
    return 18;
  };

  const bookingTotals = useMemo(() => {
    const mult = getCabinMultiplier(cabinClass);
    const unitFare = Math.round((selectedFlight?.basePriceUSD || 440) * mult);
    const paxCount = Math.max(1, passengers.adults + passengers.children);
    const baseFareTotal = unitFare * paxCount;
    const taxesTotal = Math.round(baseFareTotal * 0.14);
    const seatsTotal = selectedSeats.reduce((sum, s) => sum + getSeatPriceUSD(s), 0);
    const ancillariesTotal = selectedAncillaries.reduce((sum, id) => {
      const item = ANCILLARY_OPTIONS.find(a => a.id === id);
      return sum + (item ? item.priceUSD : 0);
    }, 0);
    return {
      unitFare,
      paxCount,
      baseFareTotal,
      taxesTotal,
      seatsTotal,
      ancillariesTotal,
      grandTotalUSD: baseFareTotal + taxesTotal + seatsTotal + ancillariesTotal
    };
  }, [selectedFlight, cabinClass, passengers, selectedSeats, selectedAncillaries]);

  const validatePassengers = () => {
    const errs = {};
    passengerForms.forEach((p, idx) => {
      if (!p.givenName.trim()) errs[`${idx}-givenName`] = 'Ism kiritilishi shart';
      if (!p.familyName.trim()) errs[`${idx}-familyName`] = 'Familiya kiritilishi shart';
      if (!p.docNumber.trim() || p.docNumber.length < 5) errs[`${idx}-docNumber`] = "To'g'ri pasport/hujjat raqamini kiriting";
      if (idx === 0 && (!p.email.includes('@'))) errs[`0-email`] = "To'g'ri elektron pochta manzilini kiriting";
    });
    setFormErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const completeSandboxCheckout = () => {
    setPaymentProcessing(true);
    setTimeout(() => {
      const randomCode = Math.random().toString(36).substring(2, 6).toUpperCase();
      const newBooking = {
        pnr: `SKX-${Math.floor(1000 + Math.random() * 9000)}${randomCode.charAt(0)}`,
        flight: selectedFlight,
        date: depDate,
        cabin: t.cabinClasses[cabinClass] || cabinClass,
        seats: selectedSeats,
        ancillaries: selectedAncillaries,
        passengers: passengerForms,
        totalUSD: bookingTotals.grandTotalUSD,
        status: 'TASDIQLANGAN (DEMO)',
        createdAt: new Date().toISOString().replace('T', ' ').slice(0, 16) + ' UTC',
        paymentRef: `TXN-${Math.floor(10000 + Math.random() * 89999)}-SBX`
      };
      setBookings(prev => [newBooking, ...prev]);
      setLatestConfirmation(newBooking);
      setPaymentProcessing(false);
      setActiveView('confirmation');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 900);
  };

  const bgPrimary = lightMode ? 'bg-slate-50 text-slate-900' : 'bg-[#07111F] text-[#F7FAFF]';
  const bgSecondary = lightMode ? 'bg-white border-slate-200' : 'bg-[#0B192A] border-[#55D6FF]/15';
  const bgCard = lightMode ? 'bg-white border-slate-200 shadow-sm' : 'bg-[#10243A] border-[#55D6FF]/20';
  const textMuted = lightMode ? 'text-slate-500' : 'text-[#9BAFC5]';

  return (
    <div className={`min-h-screen font-sans transition-colors duration-300 ${bgPrimary}`} style={{ fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Manrope:wght@600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        @keyframes heroZoom {
          0% { transform: scale(1.02) translate3d(0, 0, 0); }
          50% { transform: scale(1.09) translate3d(-14px, -10px, 0); }
          100% { transform: scale(1.02) translate3d(0, 0, 0); }
        }
        @keyframes float3D {
          0%, 100% { transform: perspective(900px) rotateX(8deg) rotateY(-4deg) translateY(0px); }
          50% { transform: perspective(900px) rotateX(4deg) rotateY(4deg) translateY(-10px); }
        }
        .animate-hero-cinema {
          animation: heroZoom 22s ease-in-out infinite;
        }
        .animate-float-3d {
          animation: float3D 7s ease-in-out infinite;
        }
      `}</style>

      {/* =====================================================================
          MA'LUMOTLAR SHAFFOFLIGI VA DEMO REJIM BILDIRISHNOMASI
         ===================================================================== */}
      <div className="bg-gradient-to-r from-[#07111F] via-[#10243A] to-[#07111F] border-b border-[#55D6FF]/25 text-[#F7FAFF] px-4 py-1.5 text-[11px] flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#55D6FF]/15 text-[#55D6FF] font-bold tracking-wider uppercase">
            <Info className="w-3 h-3" /> {t.demoDisclaimer}
          </span>
          <span className="hidden xl:inline text-[#9BAFC5]">
            {t.fxNotice}
          </span>
        </div>
        <div className="flex items-center gap-3 text-[#9BAFC5]">
          <span className="font-mono text-[#55D6FF]">3D ENGINE v2.0</span>
          <span>•</span>
          <span className="font-semibold">{t.slogan}</span>
        </div>
      </div>

      {/* =====================================================================
          ASOSIY YUQORI NAVIGATSIYA PANELI (HEADER)
         ===================================================================== */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 border-b ${
          scrolled || activeView !== 'home'
            ? lightMode
              ? 'bg-white/95 backdrop-blur-md border-slate-200 shadow-sm'
              : 'bg-[#07111F]/95 backdrop-blur-md border-[#55D6FF]/20 shadow-xl'
            : 'bg-[#07111F]/75 backdrop-blur-md border-white/10'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
          <div onClick={() => setActiveView('home')}>
            <SkylineLogo lightMode={lightMode && (scrolled || activeView !== 'home')} />
          </div>

          <nav className="hidden lg:flex items-center gap-1">
            {[
              { id: 'home', label: t.navDiscover },
              { id: 'results', label: t.navFlights },
              { id: 'destinations', label: t.navDestinations },
              { id: 'status', label: t.navStatus },
              { id: 'trips', label: t.navMyTrips, badge: bookings.length },
              { id: 'admin', label: t.navAdmin },
            ].map(item => {
              const isActive = activeView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveView(item.id)}
                  className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-[#55D6FF]/15 text-[#55D6FF] border border-[#55D6FF]/35'
                      : lightMode && (scrolled || activeView !== 'home')
                        ? 'text-slate-700 hover:bg-slate-100'
                        : 'text-[#F7FAFF]/85 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span>{item.label}</span>
                  {item.badge !== undefined && (
                    <span className="px-1.5 py-0.2 text-[10px] font-bold rounded-full bg-[#8B9EFF]/25 text-[#8B9EFF]">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Til, Valyuta, Mavzu va Foydalanuvchi */}
          <div className="flex items-center gap-2">
            <select
              aria-label="Tilni tanlash"
              value={lang}
              onChange={(e) => setLang(e.target.value)}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-bold border outline-none cursor-pointer ${
                lightMode && (scrolled || activeView !== 'home')
                  ? 'bg-slate-100 border-slate-200 text-slate-800'
                  : 'bg-[#10243A] border-[#55D6FF]/30 text-[#F7FAFF]'
              }`}
            >
              <option value="uz">O‘Z (UZ)</option>
              <option value="en">EN</option>
              <option value="ru">RU</option>
            </select>

            <select
              aria-label="Valyutani tanlash"
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-bold border outline-none cursor-pointer ${
                lightMode && (scrolled || activeView !== 'home')
                  ? 'bg-slate-100 border-slate-200 text-slate-800'
                  : 'bg-[#10243A] border-[#55D6FF]/30 text-[#55D6FF]'
              }`}
            >
              {Object.keys(CURRENCIES).map(code => (
                <option key={code} value={code}>{code}</option>
              ))}
            </select>

            <button
              type="button"
              onClick={() => setLightMode(!lightMode)}
              aria-label="Mavzuni o'zgartirish"
              className={`p-2 rounded-lg border transition-colors ${
                lightMode && (scrolled || activeView !== 'home')
                  ? 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
                  : 'bg-[#10243A] border-[#55D6FF]/30 text-[#55D6FF] hover:border-[#55D6FF]'
              }`}
            >
              {lightMode ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </button>

            <button
              type="button"
              onClick={() => setAuthModalOpen(true)}
              className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-[#55D6FF] to-[#8B9EFF] text-[#07111F] font-bold text-xs shadow-lg shadow-[#55D6FF]/25 hover:opacity-95 transition-opacity"
            >
              <User className="w-3.5 h-3.5" />
              <span>{currentUser.name.split(' ')[0]}</span>
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg bg-[#10243A] border border-[#55D6FF]/30 text-[#55D6FF]"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobil Menyu */}
        {mobileMenuOpen && (
          <div className={`lg:hidden px-4 pt-2 pb-4 border-t space-y-1 ${bgSecondary}`}>
            {[
              { id: 'home', label: t.navDiscover },
              { id: 'results', label: t.navFlights },
              { id: 'destinations', label: t.navDestinations },
              { id: 'status', label: t.navStatus },
              { id: 'trips', label: `${t.navMyTrips} (${bookings.length})` },
              { id: 'admin', label: t.navAdmin },
            ].map(item => (
              <button
                key={item.id}
                onClick={() => { setActiveView(item.id); setMobileMenuOpen(false); }}
                className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold ${
                  activeView === item.id ? 'bg-[#55D6FF]/15 text-[#55D6FF]' : ''
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* =====================================================================
          1-BO'LIM: BOSH SAHIFA (KINEMATOGRAFIK AVIATSIYA HERO + 3D KARTALAR)
         ===================================================================== */}
      {activeView === 'home' && (
        <div>
          <section className="relative overflow-hidden bg-[#07111F] text-[#F7FAFF] pt-12 pb-24 lg:pt-20 lg:pb-32">
            {/* Yuqori aniqlikdagi kinematografik samolyot fotografi va 3D nur qatlami */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <img
                src={HERO_IMAGE}
                alt="SKYLINE X Tijorat Avialayneri bulutlar uzra"
                className="w-full h-full object-cover opacity-40 animate-hero-cinema"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(180deg, rgba(7,17,31,0.72) 0%, rgba(11,25,42,0.68) 45%, #07111F 100%), radial-gradient(circle at 78% 28%, rgba(85,214,255,0.25), transparent 50%)'
                }}
              />
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-8">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#10243A]/90 border border-[#55D6FF]/40 text-xs font-bold tracking-widest uppercase text-[#55D6FF] mb-6 backdrop-blur-md">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{t.slogan}</span>
                  </div>
                  <h1
                    className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.06] text-[#F7FAFF] drop-shadow-2xl"
                    style={{ fontFamily: "'Manrope', sans-serif" }}
                  >
                    {t.heroTitle}
                  </h1>
                  <p className="mt-5 text-lg sm:text-xl text-[#F7FAFF]/85 max-w-2xl leading-relaxed">
                    {t.heroSub}
                  </p>
                </div>

                {/* 3D Suzuvchi Telemetriya Karta */}
                <div className="hidden lg:block lg:col-span-4">
                  <div className="animate-float-3d p-5 rounded-3xl bg-[#0B192A]/85 backdrop-blur-xl border border-[#55D6FF]/35 shadow-2xl space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono font-bold text-[#55D6FF] uppercase">LIVE TELEMETRY HUD</span>
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                    </div>
                    <div className="text-xl font-extrabold font-mono text-white">TAS ➔ IST • HY-271</div>
                    <div className="text-xs text-[#9BAFC5]">Boeing 787-8 Dreamliner • Balandlik: 11,800 m</div>
                    <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs">
                      <span className="text-[#8B9EFF] font-semibold">Tezlik: 912 km/soat</span>
                      <span className="text-emerald-400 font-bold">O‘Z VAQTIDA</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* SUZUVCHI PROFESSIONAL PARVOZ QIDIRUV KONSOLI */}
              <div className={`mt-10 rounded-3xl border p-5 sm:p-7 shadow-2xl backdrop-blur-xl ${
                lightMode ? 'bg-white/95 border-slate-200 text-slate-900' : 'bg-[#0B192A]/90 border-[#55D6FF]/35 text-[#F7FAFF]'
              }`}>
                <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    {[
                      { id: 'round', label: t.roundTrip },
                      { id: 'oneway', label: t.oneWay },
                      { id: 'multicity', label: t.multiCity }
                    ].map(tab => (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => setTripType(tab.id)}
                        className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                          tripType === tab.id
                            ? 'bg-[#55D6FF] text-[#07111F] shadow-md shadow-[#55D6FF]/25'
                            : lightMode
                              ? 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                              : 'bg-[#10243A] text-[#9BAFC5] hover:text-white'
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>

                  {/* Yo'lovchilar va Klass tanlovi */}
                  <div className="relative flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setPaxDropdownOpen(!paxDropdownOpen)}
                      className={`px-4 py-2 rounded-xl border text-xs sm:text-sm font-semibold flex items-center gap-2 ${
                        lightMode ? 'bg-slate-50 border-slate-200' : 'bg-[#10243A] border-[#55D6FF]/25'
                      }`}
                    >
                      <Users className="w-4 h-4 text-[#55D6FF]" />
                      <span>{totalPaxCount} {t.travelerLabel}</span>
                      <ChevronDown className="w-3.5 h-3.5 opacity-70" />
                    </button>

                    <select
                      value={cabinClass}
                      onChange={(e) => setCabinClass(e.target.value)}
                      className={`px-4 py-2 rounded-xl border text-xs sm:text-sm font-semibold outline-none cursor-pointer ${
                        lightMode ? 'bg-slate-50 border-slate-200' : 'bg-[#10243A] border-[#55D6FF]/25 text-[#55D6FF]'
                      }`}
                    >
                      <option value="Economy">{t.cabinClasses.Economy}</option>
                      <option value="Premium Economy">{t.cabinClasses['Premium Economy']}</option>
                      <option value="Business">{t.cabinClasses.Business}</option>
                      <option value="First Class">{t.cabinClasses['First Class']}</option>
                    </select>

                    {paxDropdownOpen && (
                      <div className={`absolute right-0 top-12 z-50 w-72 p-4 rounded-2xl border shadow-2xl space-y-3 ${
                        lightMode ? 'bg-white border-slate-200 text-slate-900' : 'bg-[#0B192A] border-[#55D6FF]/35 text-[#F7FAFF]'
                      }`}>
                        {[
                          { key: 'adults', label: t.adultsLabel, min: 1 },
                          { key: 'children', label: t.childrenLabel, min: 0 },
                          { key: 'infants', label: t.infantsLabel, min: 0 }
                        ].map(row => (
                          <div key={row.key} className="flex items-center justify-between">
                            <span className="text-xs font-semibold">{row.label}</span>
                            <div className="flex items-center gap-2">
                              <button
                                type="button"
                                onClick={() => setPassengers(p => ({ ...p, [row.key]: Math.max(row.min, p[row.key] - 1) }))}
                                className="w-7 h-7 rounded-lg bg-[#10243A] text-white flex items-center justify-center border border-white/15"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="w-5 text-center font-mono text-sm font-bold">{passengers[row.key]}</span>
                              <button
                                type="button"
                                onClick={() => setPassengers(p => ({ ...p, [row.key]: Math.min(9, p[row.key] + 1) }))}
                                className="w-7 h-7 rounded-lg bg-[#55D6FF] text-[#07111F] flex items-center justify-center font-bold"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        ))}
                        <button
                          type="button"
                          onClick={() => setPaxDropdownOpen(false)}
                          className="w-full py-2 rounded-xl bg-[#55D6FF] text-[#07111F] font-bold text-xs"
                        >
                          {t.applyTravelers}
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Qidiruv maydonlari */}
                {tripType !== 'multicity' ? (
                  <div className="mt-5 flex flex-col lg:flex-row items-stretch lg:items-center gap-3">
                    <AirportSelector
                      label={t.from}
                      value={origin}
                      onChange={setOrigin}
                      excludeCode={destination}
                      lightMode={lightMode}
                    />

                    <button
                      type="button"
                      onClick={() => {
                        const tmp = origin;
                        setOrigin(destination);
                        setDestination(tmp);
                      }}
                      title="Shaharlarni almashtirish"
                      className="self-center p-3 rounded-xl bg-[#55D6FF]/15 border border-[#55D6FF]/35 text-[#55D6FF] hover:bg-[#55D6FF] hover:text-[#07111F] transition-all"
                    >
                      <ArrowLeftRight className="w-4 h-4" />
                    </button>

                    <AirportSelector
                      label={t.to}
                      value={destination}
                      onChange={setDestination}
                      excludeCode={origin}
                      lightMode={lightMode}
                    />

                    <div className={`px-4 py-3 rounded-xl border min-w-[165px] ${
                      lightMode ? 'bg-slate-50 border-slate-200' : 'bg-[#07111F]/90 border-[#55D6FF]/20'
                    }`}>
                      <label className={`block text-[11px] uppercase tracking-wider font-semibold ${textMuted}`}>
                        {t.departure}
                      </label>
                      <input
                        type="date"
                        value={depDate}
                        onChange={(e) => setDepDate(e.target.value)}
                        className="mt-1 bg-transparent text-sm font-bold outline-none w-full"
                      />
                    </div>

                    {tripType === 'round' && (
                      <div className={`px-4 py-3 rounded-xl border min-w-[165px] ${
                        lightMode ? 'bg-slate-50 border-slate-200' : 'bg-[#07111F]/90 border-[#55D6FF]/20'
                      }`}>
                        <label className={`block text-[11px] uppercase tracking-wider font-semibold ${textMuted}`}>
                          {t.returnDate}
                        </label>
                        <input
                          type="date"
                          value={retDate}
                          min={depDate}
                          onChange={(e) => setRetDate(e.target.value)}
                          className="mt-1 bg-transparent text-sm font-bold outline-none w-full"
                        />
                      </div>
                    )}

                    <button
                      type="button"
                      onClick={() => triggerSearch()}
                      className="px-7 py-4 rounded-xl bg-gradient-to-r from-[#55D6FF] to-[#8B9EFF] text-[#07111F] font-extrabold text-sm tracking-wide shadow-xl shadow-[#55D6FF]/25 hover:opacity-95 transition-all flex items-center justify-center gap-2 shrink-0"
                    >
                      <Search className="w-4 h-4 stroke-[2.5]" />
                      <span>{t.searchFlights}</span>
                    </button>
                  </div>
                ) : (
                  <div className="mt-5 space-y-3">
                    {multiSegments.map((seg, idx) => (
                      <div key={seg.id} className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
                        <span className="px-2.5 py-1 rounded-lg bg-[#55D6FF]/15 text-[#55D6FF] font-mono text-xs font-bold self-start md:self-center">
                          {idx + 1}-BOSQICH
                        </span>
                        <AirportSelector
                          label={t.from}
                          value={seg.origin}
                          onChange={(val) => setMultiSegments(s => s.map(item => item.id === seg.id ? { ...item, origin: val } : item))}
                          excludeCode={seg.destination}
                          lightMode={lightMode}
                        />
                        <AirportSelector
                          label={t.to}
                          value={seg.destination}
                          onChange={(val) => setMultiSegments(s => s.map(item => item.id === seg.id ? { ...item, destination: val } : item))}
                          excludeCode={seg.origin}
                          lightMode={lightMode}
                        />
                        <div className={`px-4 py-3 rounded-xl border ${lightMode ? 'bg-slate-50 border-slate-200' : 'bg-[#07111F]/90 border-[#55D6FF]/20'}`}>
                          <label className={`block text-[11px] uppercase font-semibold ${textMuted}`}>Parvoz sanasi</label>
                          <input
                            type="date"
                            value={seg.date}
                            onChange={(e) => setMultiSegments(s => s.map(item => item.id === seg.id ? { ...item, date: e.target.value } : item))}
                            className="mt-1 bg-transparent text-sm font-bold outline-none"
                          />
                        </div>
                        {multiSegments.length > 2 && (
                          <button
                            type="button"
                            onClick={() => setMultiSegments(s => s.filter(item => item.id !== seg.id))}
                            className="p-3 rounded-xl bg-rose-500/15 text-rose-400 hover:bg-rose-500/25"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    ))}
                    <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                      {multiSegments.length < 4 && (
                        <button
                          type="button"
                          onClick={() => setMultiSegments(s => [
                            ...s,
                            { id: Date.now(), origin: s[s.length - 1].destination, destination: 'DXB', date: '2026-12-20' }
                          ])}
                          className="px-4 py-2 rounded-xl border border-[#55D6FF]/35 text-[#55D6FF] text-xs font-bold flex items-center gap-1.5 hover:bg-[#55D6FF]/10"
                        >
                          <Plus className="w-3.5 h-3.5" /> Yangi yo‘nalish qo‘shish
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => triggerSearch(multiSegments[0].origin, multiSegments[0].destination)}
                        className="ml-auto px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#55D6FF] to-[#8B9EFF] text-[#07111F] font-extrabold text-sm flex items-center gap-2"
                      >
                        <Search className="w-4 h-4" /> Murakkab marshrutni qidirish
                      </button>
                    </div>
                  </div>
                )}

                {/* Tezkor yo'nalishlar */}
                <div className="mt-4 pt-4 border-t border-white/10 flex flex-wrap items-center gap-2 text-xs">
                  <span className={textMuted}>{t.popularCorridors}</span>
                  {[
                    { from: 'TAS', to: 'IST', label: 'Toshkent → Istanbul' },
                    { from: 'TAS', to: 'DXB', label: 'Toshkent → Dubay' },
                    { from: 'TAS', to: 'JFK', label: 'Toshkent → Nyu-York' },
                    { from: 'LHR', to: 'HND', label: 'London → Tokio' },
                  ].map(preset => (
                    <button
                      key={preset.label}
                      type="button"
                      onClick={() => triggerSearch(preset.from, preset.to)}
                      className="px-3 py-1 rounded-full bg-[#55D6FF]/10 border border-[#55D6FF]/25 text-[#55D6FF] font-semibold hover:bg-[#55D6FF]/20 transition-colors"
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* 2-BO'LIM: 3D TILT KARTALAR VA HAQIQIY FOTOGRAFIYALI MANZILLAR */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#55D6FF]">Global Tarmoq</p>
                <h2 className="text-2xl sm:text-3xl font-extrabold mt-1" style={{ fontFamily: "'Manrope', sans-serif" }}>
                  {t.trendingTitle}
                </h2>
              </div>
              <button
                onClick={() => setActiveView('destinations')}
                className="text-sm font-bold text-[#55D6FF] flex items-center gap-1 hover:underline"
              >
                {t.exploreAllDest} <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
              {DESTINATIONS_DATA.map(dest => (
                <Tilt3DCard key={dest.code} className={`group rounded-2xl border overflow-hidden ${bgCard}`}>
                  <div className="h-52 relative overflow-hidden text-white">
                    <img
                      src={dest.image}
                      alt={`${dest.city}, ${dest.country}`}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#07111F] via-[#07111F]/35 to-transparent" />
                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                      <span className="px-2.5 py-1 rounded-lg bg-black/55 backdrop-blur-md border border-[#55D6FF]/35 text-xs font-mono font-bold text-[#55D6FF]">
                        IATA: {dest.code}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          setSavedDestCodes(prev =>
                            prev.includes(dest.code) ? prev.filter(c => c !== dest.code) : [...prev, dest.code]
                          )
                        }
                        className="p-2 rounded-full bg-black/45 hover:bg-black/70 text-white backdrop-blur-md"
                      >
                        <Heart className={`w-4 h-4 ${savedDestCodes.includes(dest.code) ? 'fill-rose-500 text-rose-500' : ''}`} />
                      </button>
                    </div>
                    <div className="absolute bottom-4 left-5 right-5">
                      <p className="text-xs uppercase tracking-widest text-[#55D6FF] font-bold">{dest.country}</p>
                      <h3 className="text-2xl font-extrabold">{dest.city}</h3>
                    </div>
                  </div>
                  <div className="p-5">
                    <p className={`text-sm line-clamp-2 ${textMuted}`}>{dest.tagline}</p>
                    <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
                      <div>
                        <span className={`block text-[11px] uppercase ${textMuted}`}>{t.sampleFrom}</span>
                        <span className="text-lg font-extrabold text-[#55D6FF] font-mono">
                          {formatPrice(dest.sampleFromUSD)}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => triggerSearch(origin === dest.code ? 'TAS' : origin, dest.code)}
                        className="px-4 py-2 rounded-xl bg-[#55D6FF]/15 border border-[#55D6FF]/35 text-[#55D6FF] text-xs font-bold hover:bg-[#55D6FF] hover:text-[#07111F] transition-all"
                      >
                        {t.discoverFlightsBtn}
                      </button>
                    </div>
                  </div>
                </Tilt3DCard>
              ))}
            </div>
          </section>

          {/* 3-BO'LIM: INTERAKTIV 3D AYLANUVCHI YER SHARI VA PARVOZ TELEMETRIYASI */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className={`rounded-3xl border p-6 sm:p-8 ${bgCard}`}>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-5 space-y-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#8B9EFF]/15 text-[#8B9EFF] text-xs font-bold uppercase tracking-wider">
                    <Compass className="w-3.5 h-3.5" /> {t.globeBadge}
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold" style={{ fontFamily: "'Manrope', sans-serif" }}>
                    {t.globeTitle}
                  </h2>
                  <p className={`text-sm leading-relaxed ${textMuted}`}>
                    {t.globeDesc}
                  </p>
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <div className={`p-3.5 rounded-xl border ${lightMode ? 'bg-slate-50 border-slate-200' : 'bg-[#07111F] border-white/10'}`}>
                      <div className="text-xl font-extrabold text-[#55D6FF] font-mono">10 Xab</div>
                      <div className={`text-xs ${textMuted}`}>4 Qit’a Bog‘langan</div>
                    </div>
                    <div className={`p-3.5 rounded-xl border ${lightMode ? 'bg-slate-50 border-slate-200' : 'bg-[#07111F] border-white/10'}`}>
                      <div className="text-xl font-extrabold text-[#8B9EFF] font-mono">7 Aviakompaniya</div>
                      <div className={`text-xs ${textMuted}`}>Xalqaro Alyans Floti</div>
                    </div>
                  </div>
                </div>
                <div className="lg:col-span-7">
                  <Interactive3DGlobe
                    originCode={origin}
                    destCode={destination}
                    onSelectRoute={(o, d) => { setOrigin(o); setDestination(d); }}
                    t={t}
                  />
                </div>
              </div>
            </div>
          </section>

          {/* 4-BO'LIM: PREMIUM KLASS VA AFZALLIKLAR */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
            {/* Biznes Klass Vizual Banneri */}
            <div className={`rounded-3xl border overflow-hidden grid grid-cols-1 lg:grid-cols-12 ${bgCard}`}>
              <div className="lg:col-span-6 h-64 lg:h-auto relative overflow-hidden">
                <img
                  src={CABIN_IMAGE}
                  alt="SKYLINE X Biznes Klass Saloni"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#10243A]/80 hidden lg:block" />
              </div>
              <div className="lg:col-span-6 p-6 sm:p-10 flex flex-col justify-center space-y-4">
                <span className="text-xs font-bold uppercase tracking-widest text-[#55D6FF]">SKYLINE X HORIZON CABIN</span>
                <h3 className="text-2xl sm:text-3xl font-extrabold" style={{ fontFamily: "'Manrope', sans-serif" }}>
                  Bulutlar Uzra Mutlaq Qulaylik va Shaxsiy Makon
                </h3>
                <p className={`text-sm leading-relaxed ${textMuted}`}>
                  Yangi avlod Boeing 787 Dreamliner va Airbus A350 laynerlarida 3D salon xaritasi orqali o‘zingizga eng qulay o‘rindiqni oldindan tanlang, VIP lounge va tezkor ro‘yxatdan o‘tish xizmatlaridan foydalaning.
                </p>
                <div>
                  <button
                    type="button"
                    onClick={() => triggerSearch('TAS', 'LHR')}
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#55D6FF] to-[#8B9EFF] text-[#07111F] font-extrabold text-xs shadow-lg shadow-[#55D6FF]/20"
                  >
                    Biznes Klass Reyslarini Ko‘rish →
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  icon: Shield,
                  title: 'Shaffof Tarif Kafolati',
                  desc: "Har bir reysda demo jadval, kesh ma'lumotlari va tasdiqlangan chiptalar aniq ajratib ko'rsatiladi."
                },
                {
                  icon: Layers,
                  title: '3D Samolyot Saloni Sxemasi',
                  desc: "Chipta xarid qilishdan oldin samolyot fyuzelyaji tuzilishi va keng oyoq joylarini 3D ko'rinishda tekshiring."
                },
                {
                  icon: Globe,
                  title: 'Ko‘p Valyutali va Ko‘p Tilli Tizim',
                  desc: "UZS, USD, EUR, GBP, AED va TRY valyutalarida aniq kurs va vaqt belgisi bilan tezkor hisob-kitob."
                }
              ].map((feat, i) => (
                <Tilt3DCard key={i} className={`p-6 rounded-2xl border ${bgCard}`}>
                  <div className="w-11 h-11 rounded-xl bg-[#55D6FF]/15 border border-[#55D6FF]/30 flex items-center justify-center text-[#55D6FF] mb-4">
                    <feat.icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold">{feat.title}</h3>
                  <p className={`text-sm mt-2 leading-relaxed ${textMuted}`}>{feat.desc}</p>
                </Tilt3DCard>
              ))}
            </div>
          </section>
        </div>
      )}

      {/* =====================================================================
          2-BO'LIM: QIDIRUV NATIJALARI, FILTRLAR, TAQQOSLASH VA 3D XARITA
         ===================================================================== */}
      {activeView === 'results' && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className={`p-4 rounded-2xl border mb-6 flex flex-wrap items-center justify-between gap-4 ${bgCard}`}>
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 text-lg font-extrabold">
                <span className="text-[#55D6FF] font-mono">{origin}</span>
                <ArrowRight className="w-4 h-4 text-[#9BAFC5]" />
                <span className="text-[#8B9EFF] font-mono">{destination}</span>
              </div>
              <span className={`text-xs px-2.5 py-1 rounded-lg border ${lightMode ? 'bg-slate-100 border-slate-200' : 'bg-[#07111F] border-white/10'}`}>
                {depDate} • {totalPaxCount} {t.travelerLabel} • {t.cabinClasses[cabinClass] || cabinClass}
              </span>
              {!hasExactRoute && (
                <span className="text-xs px-2.5 py-1 rounded-lg bg-amber-500/15 border border-amber-500/35 text-amber-400 font-semibold">
                  Barcha demo tarmoq yo‘laklari ko‘rsatilmoqda ({origin}→{destination} uchun to‘g‘ridan-to‘g‘ri demo reys mavjud emas)
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              {compareIds.length > 0 && (
                <button
                  type="button"
                  onClick={() => setCompareModalOpen(true)}
                  className="px-4 py-2 rounded-xl bg-[#8B9EFF] text-[#07111F] font-bold text-xs flex items-center gap-1.5"
                >
                  <SlidersHorizontal className="w-3.5 h-3.5" />
                  {t.compare} ({compareIds.length}/3)
                </button>
              )}
              <button
                type="button"
                onClick={() => setActiveView('home')}
                className="px-4 py-2 rounded-xl border border-[#55D6FF]/35 text-[#55D6FF] text-xs font-bold hover:bg-[#55D6FF]/10"
              >
                {t.modifySearch}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* CHAP FILTR PANELI */}
            <aside className="lg:col-span-3 space-y-5">
              <div className={`p-5 rounded-2xl border space-y-6 ${bgCard}`}>
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-sm flex items-center gap-2">
                    <Filter className="w-4 h-4 text-[#55D6FF]" /> {t.filtersTitle}
                  </h3>
                  <button
                    type="button"
                    onClick={() => {
                      setMaxPriceFilter(1500);
                      setStopsFilter('all');
                      setSelectedAirlines([]);
                      setFlexibleOnly(false);
                    }}
                    className="text-xs text-[#55D6FF] hover:underline font-semibold"
                  >
                    {t.resetFilters}
                  </button>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold mb-2">
                    <span>{t.maxPriceLabel}</span>
                    <span className="text-[#55D6FF] font-mono">{formatPrice(maxPriceFilter * getCabinMultiplier(cabinClass))}</span>
                  </div>
                  <input
                    type="range"
                    min="250"
                    max="1500"
                    step="50"
                    value={maxPriceFilter}
                    onChange={(e) => setMaxPriceFilter(Number(e.target.value))}
                    className="w-full accent-[#55D6FF]"
                  />
                </div>

                <div>
                  <div className="text-xs font-semibold mb-2">{t.stopsLabel}</div>
                  <div className="space-y-1.5">
                    {[
                      { id: 'all', label: t.allStops },
                      { id: '0', label: t.directOnly },
                      { id: '1', label: t.oneStopOnly }
                    ].map(opt => (
                      <label key={opt.id} className="flex items-center gap-2 text-xs cursor-pointer">
                        <input
                          type="radio"
                          name="stops"
                          checked={stopsFilter === opt.id}
                          onChange={() => setStopsFilter(opt.id)}
                          className="accent-[#55D6FF]"
                        />
                        <span>{opt.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="text-xs font-semibold mb-2">{t.carriersLabel}</div>
                  <div className="space-y-1.5">
                    {Object.values(AIRLINES).map(al => (
                      <label key={al.code} className="flex items-center gap-2 text-xs cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedAirlines.includes(al.code)}
                          onChange={(e) => {
                            if (e.target.checked) setSelectedAirlines([...selectedAirlines, al.code]);
                            else setSelectedAirlines(selectedAirlines.filter(c => c !== al.code));
                          }}
                          className="accent-[#55D6FF]"
                        />
                        <span>{al.name}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="pt-2 border-t border-white/10">
                  <label className="flex items-center gap-2 text-xs font-semibold cursor-pointer">
                    <input
                      type="checkbox"
                      checked={flexibleOnly}
                      onChange={(e) => setFlexibleOnly(e.target.checked)}
                      className="accent-[#55D6FF]"
                    />
                    <span>{t.flexOnlyLabel}</span>
                  </label>
                </div>
              </div>

              <Interactive3DGlobe
                originCode={origin}
                destCode={destination}
                onSelectRoute={(o, d) => { setOrigin(o); setDestination(d); }}
                t={t}
              />
            </aside>

            {/* ASOSIY NATIJALAR VA NARX GRAFIGI */}
            <div className="lg:col-span-9 space-y-5">
              <div className={`p-5 rounded-2xl border ${bgCard}`}>
                <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                  <div>
                    <h3 className="text-sm font-bold flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-[#55D6FF]" />
                      Moslashuvchan Sanalar Bo‘yicha Namuna Narxlar Tahlili
                    </h3>
                    <p className={`text-xs ${textMuted}`}>
                      Qo‘shni sanalar bo‘yicha indikativ narxlar (jonli kafolat emas)
                    </p>
                  </div>
                  <span className="text-[11px] font-mono px-2.5 py-1 rounded bg-[#55D6FF]/10 text-[#55D6FF]">
                    ENG PAST KUZATILGAN: {formatPrice(320 * getCabinMultiplier(cabinClass))}
                  </span>
                </div>
                <div className="grid grid-cols-7 gap-2 items-end h-24 pt-2">
                  {[
                    { day: '09-Dek', usd: 490 },
                    { day: '10-Dek', usd: 460 },
                    { day: '11-Dek', usd: 410 },
                    { day: '12-Dek', usd: 380, active: true },
                    { day: '13-Dek', usd: 520 },
                    { day: '14-Dek', usd: 475 },
                    { day: '15-Dek', usd: 430 },
                  ].map(bar => {
                    const heightPct = Math.round((bar.usd / 550) * 100);
                    return (
                      <button
                        key={bar.day}
                        type="button"
                        onClick={() => setDepDate(`2026-12-${bar.day.split('-')[0]}`)}
                        className="flex flex-col items-center gap-1 group"
                      >
                        <span className="text-[10px] font-mono font-bold text-[#55D6FF]">
                          {formatPrice(bar.usd * getCabinMultiplier(cabinClass))}
                        </span>
                        <div className="w-full h-12 flex items-end justify-center">
                          <div
                            style={{ height: `${heightPct}%` }}
                            className={`w-full max-w-[36px] rounded-t-lg transition-all ${
                              bar.active
                                ? 'bg-gradient-to-t from-[#55D6FF] to-[#8B9EFF]'
                                : 'bg-[#55D6FF]/25 group-hover:bg-[#55D6FF]/50'
                            }`}
                          />
                        </div>
                        <span className={`text-[10px] font-semibold ${bar.active ? 'text-[#55D6FF]' : textMuted}`}>
                          {bar.day}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="text-sm font-semibold">
                  Topildi: <span className="text-[#55D6FF] font-mono font-bold">{filteredFlights.length}</span> ta namuna marshrut
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  {[
                    { id: 'recommended', label: t.sortRecommended },
                    { id: 'cheapest', label: t.sortCheapest },
                    { id: 'fastest', label: t.sortFastest },
                    { id: 'earliest', label: t.sortEarliest }
                  ].map(s => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setSortBy(s.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                        sortBy === s.id
                          ? 'bg-[#55D6FF] text-[#07111F]'
                          : lightMode
                            ? 'bg-white border border-slate-200 text-slate-600'
                            : 'bg-[#10243A] border border-white/10 text-[#9BAFC5]'
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              {isSearching ? (
                <div className="space-y-4">
                  {[1, 2, 3].map(n => (
                    <div key={n} className={`h-36 rounded-2xl border animate-pulse ${bgCard}`} />
                  ))}
                </div>
              ) : filteredFlights.length === 0 ? (
                <div className={`p-10 rounded-2xl border text-center ${bgCard}`}>
                  <p className="font-bold text-lg">Tanlangan filtrlarga mos reyslar topilmadi.</p>
                  <p className={`text-sm mt-1 ${textMuted}`}>Maksimal narx chegarasini oshiring yoki filtrlarni tozalang.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredFlights.map(flight => {
                    const airline = AIRLINES[flight.airlineCode];
                    const isCompared = compareIds.includes(flight.id);
                    const isSaved = savedFlightIds.includes(flight.id);

                    return (
                      <div key={flight.id} className={`p-5 rounded-2xl border transition-all hover:border-[#55D6FF]/60 ${bgCard}`}>
                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                          <div className="flex items-start gap-3.5 min-w-[200px]">
                            <div
                              className="w-11 h-11 rounded-xl flex items-center justify-center font-black text-white text-sm shrink-0 shadow-md"
                              style={{ backgroundColor: airline.color }}
                            >
                              {airline.code}
                            </div>
                            <div>
                              <div className="font-bold text-sm">{airline.name}</div>
                              <div className={`text-xs font-mono ${textMuted}`}>
                                {flight.flightNumber} • {flight.aircraft}
                              </div>
                              <span className="inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-mono bg-[#55D6FF]/10 text-[#55D6FF]">
                                {flight.dataSource}
                              </span>
                            </div>
                          </div>

                          <div className="flex-1 flex items-center justify-between gap-4 max-w-md">
                            <div>
                              <div className="text-2xl font-extrabold font-mono">{flight.depTime}</div>
                              <div className="text-xs font-bold text-[#55D6FF]">{flight.origin}</div>
                            </div>

                            <div className="flex-1 flex flex-col items-center px-2">
                              <span className={`text-[11px] font-semibold ${textMuted}`}>
                                {formatDuration(flight.durationMins)}
                              </span>
                              <div className="w-full flex items-center gap-1 my-1">
                                <div className="h-[2px] flex-1 bg-gradient-to-r from-[#55D6FF] to-[#8B9EFF]" />
                                <Plane className="w-3.5 h-3.5 text-[#55D6FF]" />
                              </div>
                              <span className={`text-[11px] font-bold ${flight.stops === 0 ? 'text-emerald-400' : 'text-amber-400'}`}>
                                {flight.stops === 0 ? t.directText : `1 ta to‘xtash (${flight.layover.airport} • ${flight.layover.duration})`}
                              </span>
                            </div>

                            <div className="text-right">
                              <div className="text-2xl font-extrabold font-mono">{flight.arrTime}</div>
                              <div className="text-xs font-bold text-[#8B9EFF]">{flight.destination}</div>
                            </div>
                          </div>

                          <div className="flex flex-row lg:flex-col items-center lg:items-end justify-between gap-3 border-t lg:border-t-0 lg:border-l border-white/10 pt-4 lg:pt-0 lg:pl-6">
                            <div className="lg:text-right">
                              <div className={`text-[11px] uppercase ${textMuted}`}>{t.cabinClasses[cabinClass] || cabinClass} / 1 kishi</div>
                              <div className="text-2xl font-extrabold text-[#55D6FF] font-mono">
                                {formatPrice(flight.computedPriceUSD)}
                              </div>
                            </div>

                            <div className="flex items-center gap-2">
                              <button
                                type="button"
                                onClick={() =>
                                  setSavedFlightIds(prev =>
                                    prev.includes(flight.id) ? prev.filter(i => i !== flight.id) : [...prev, flight.id]
                                  )
                                }
                                title="Reysni saqlash"
                                className={`p-2.5 rounded-xl border ${
                                  isSaved ? 'bg-rose-500/15 border-rose-500/40 text-rose-400' : 'border-white/15 text-[#9BAFC5]'
                                }`}
                              >
                                <Bookmark className="w-4 h-4" />
                              </button>
                              <button
                                type="button"
                                onClick={() => toggleCompare(flight.id)}
                                className={`px-3 py-2.5 rounded-xl border text-xs font-bold ${
                                  isCompared
                                    ? 'bg-[#8B9EFF]/20 border-[#8B9EFF] text-[#8B9EFF]'
                                    : 'border-white/15 text-[#9BAFC5] hover:text-white'
                                }`}
                              >
                                {isCompared ? 'Tanlangan' : t.compare}
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  setSelectedFlight(flight);
                                  setActiveView('details');
                                  window.scrollTo({ top: 0, behavior: 'smooth' });
                                }}
                                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#55D6FF] to-[#8B9EFF] text-[#07111F] font-extrabold text-xs shadow-lg shadow-[#55D6FF]/20"
                              >
                                {t.selectFlight}
                              </button>
                            </div>
                          </div>
                        </div>

                        <div className={`mt-4 pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-xs ${textMuted}`}>
                          <div className="flex flex-wrap items-center gap-4">
                            <span className="flex items-center gap-1"><Briefcase className="w-3.5 h-3.5 text-[#55D6FF]" /> {flight.baggage}</span>
                            <span className="flex items-center gap-1"><Shield className="w-3.5 h-3.5 text-emerald-400" /> {flight.flexible ? 'Moslashuvchan tarif' : 'Standart qoidalar'}</span>
                          </div>
                          <span>CO2 emissiya: {flight.co2}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          3-BO'LIM: PARVOZ TAFSILOTLARI VA MARSHRUT XRONOLOGIYASI
         ===================================================================== */}
      {activeView === 'details' && selectedFlight && (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
          <button
            type="button"
            onClick={() => setActiveView('results')}
            className="text-xs font-bold text-[#55D6FF] flex items-center gap-1 hover:underline"
          >
            {t.backToResults}
          </button>

          <div className={`p-6 sm:p-8 rounded-3xl border ${bgCard}`}>
            <div className="flex flex-wrap items-start justify-between gap-4 pb-6 border-b border-white/10">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-lg bg-[#55D6FF]/15 text-[#55D6FF] font-mono text-xs font-bold">
                    {selectedFlight.flightNumber}
                  </span>
                  <span className="text-xs font-semibold text-[#8B9EFF]">
                    {AIRLINES[selectedFlight.airlineCode].name} • {AIRLINES[selectedFlight.airlineCode].alliance}
                  </span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold mt-2">
                  {AIRPORTS.find(a => a.code === selectedFlight.origin)?.city} ({selectedFlight.origin}) →{' '}
                  {AIRPORTS.find(a => a.code === selectedFlight.destination)?.city} ({selectedFlight.destination})
                </h1>
                <p className={`text-sm mt-1 ${textMuted}`}>
                  Uchish sanasi: {depDate} • Klass: {t.cabinClasses[cabinClass] || cabinClass} • Layner: {selectedFlight.aircraft}
                </p>
              </div>
              <div className="text-left sm:text-right">
                <div className={`text-xs uppercase ${textMuted}`}>Jami asosiy tarif ({totalPaxCount} yo‘lovchi)</div>
                <div className="text-3xl font-extrabold text-[#55D6FF] font-mono">
                  {formatPrice(selectedFlight.basePriceUSD * getCabinMultiplier(cabinClass) * Math.max(1, passengers.adults + passengers.children))}
                </div>
                <button
                  type="button"
                  onClick={() => startBooking(selectedFlight)}
                  className="mt-3 px-6 py-3 rounded-xl bg-gradient-to-r from-[#55D6FF] to-[#8B9EFF] text-[#07111F] font-extrabold text-sm shadow-xl shadow-[#55D6FF]/25"
                >
                  {t.bookNow} →
                </button>
              </div>
            </div>

            <div className="py-6 space-y-6">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#55D6FF]">Parvoz Bosqichlari va Terminal Ma’lumotlari</h3>
              <div className="relative pl-6 border-l-2 border-[#55D6FF]/40 space-y-6">
                <div>
                  <div className="w-3 h-3 rounded-full bg-[#55D6FF] absolute -left-[7px]" />
                  <div className="font-mono font-bold text-lg">{selectedFlight.depTime} — {selectedFlight.origin}</div>
                  <div className="text-sm font-semibold">{AIRPORTS.find(a => a.code === selectedFlight.origin)?.name}</div>
                  <div className={`text-xs ${textMuted}`}>{selectedFlight.terminalDep} • Darvoza (Gate) {selectedFlight.gate}</div>
                </div>

                <div className={`p-4 rounded-2xl border ${lightMode ? 'bg-slate-50 border-slate-200' : 'bg-[#07111F] border-white/10'}`}>
                  <div className="text-xs font-bold text-[#8B9EFF]">
                    Parvoz davomiyligi: {formatDuration(selectedFlight.durationMins)} • {selectedFlight.aircraft}
                  </div>
                  <div className={`text-xs mt-1 ${textMuted}`}>
                    {selectedFlight.stops === 0
                      ? 'To‘g‘ridan-to‘g‘ri uzluksiz qit’alararo reys.'
                      : `${selectedFlight.layover.city} (${selectedFlight.layover.airport}) aeroportida ${selectedFlight.layover.duration} tranzit to‘xtash.`}
                  </div>
                </div>

                <div>
                  <div className="w-3 h-3 rounded-full bg-[#8B9EFF] absolute -left-[7px]" />
                  <div className="font-mono font-bold text-lg">{selectedFlight.arrTime} — {selectedFlight.destination}</div>
                  <div className="text-sm font-semibold">{AIRPORTS.find(a => a.code === selectedFlight.destination)?.name}</div>
                  <div className={`text-xs ${textMuted}`}>{selectedFlight.terminalArr}</div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t border-white/10">
              <div className={`p-4 rounded-2xl border ${lightMode ? 'bg-slate-50 border-slate-200' : 'bg-[#07111F] border-white/10'}`}>
                <div className="text-xs font-bold text-[#55D6FF] uppercase mb-1">Bagaj me’yori</div>
                <p className="text-xs leading-relaxed">{selectedFlight.baggage}</p>
              </div>
              <div className={`p-4 rounded-2xl border ${lightMode ? 'bg-slate-50 border-slate-200' : 'bg-[#07111F] border-white/10'}`}>
                <div className="text-xs font-bold text-[#55D6FF] uppercase mb-1">Bekor qilish shartlari</div>
                <p className="text-xs leading-relaxed">{selectedFlight.fareRules.cancellation}</p>
              </div>
              <div className={`p-4 rounded-2xl border ${lightMode ? 'bg-slate-50 border-slate-200' : 'bg-[#07111F] border-white/10'}`}>
                <div className="text-xs font-bold text-[#55D6FF] uppercase mb-1">O‘zgartirish va Ovqatlanish</div>
                <p className="text-xs leading-relaxed">{selectedFlight.fareRules.changes} {selectedFlight.fareRules.meals}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          4-BO'LIM: BRON QILISH (3D SALON -> XIZMATLAR -> YO'LOVCHI -> TO'LOV)
         ===================================================================== */}
      {activeView === 'booking' && selectedFlight && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-8">
            {[
              { step: 1, label: t.step1 },
              { step: 2, label: t.step2 },
              { step: 3, label: t.step3 },
              { step: 4, label: t.step4 }
            ].map(s => (
              <button
                key={s.step}
                type="button"
                onClick={() => s.step < bookingStep && setBookingStep(s.step)}
                className={`flex-1 min-w-[140px] py-3 px-4 rounded-xl border text-xs font-extrabold transition-all ${
                  bookingStep === s.step
                    ? 'bg-[#55D6FF] text-[#07111F] border-[#55D6FF]'
                    : bookingStep > s.step
                      ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/35'
                      : `${bgCard} opacity-60`
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8">
              {/* 1-QADAM: 3D PERSPECTIVE SAMOLYOT SALONI VA O'RINDIQ TANLASH */}
              {bookingStep === 1 && (
                <div className={`p-6 rounded-3xl border ${bgCard}`}>
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                    <div>
                      <h2 className="text-xl font-extrabold flex items-center gap-2">
                        <Box className="w-5 h-5 text-[#55D6FF]" />
                        Samolyot Saloni Xaritasi
                      </h2>
                      <p className={`text-xs ${textMuted}`}>
                        {selectedFlight.aircraft} • {bookingTotals.paxCount} ta o‘rindiq tanlang
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setCabin3DView(!cabin3DView)}
                        className="px-3.5 py-1.5 rounded-xl bg-[#55D6FF]/15 border border-[#55D6FF]/40 text-[#55D6FF] text-xs font-bold"
                      >
                        {cabin3DView ? '3D Perspektiva: YOQILGAN' : '2D Sxema: YOQILGAN'}
                      </button>
                    </div>
                  </div>

                  {/* Legenda */}
                  <div className="flex flex-wrap items-center justify-center gap-4 text-xs mb-6">
                    <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-[#10243A] border border-[#55D6FF]" /> Bo‘sh</span>
                    <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-[#55D6FF]" /> Tanlangan</span>
                    <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-amber-500/30 border border-amber-400" /> Biznes / Exit</span>
                    <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-slate-700 opacity-40" /> Band</span>
                  </div>

                  {/* 3D Perspektiv Fyuzelyaj Sxemasi */}
                  <div className="py-4 overflow-hidden flex justify-center">
                    <div
                      style={{
                        transform: cabin3DView
                          ? 'perspective(950px) rotateX(22deg) scale(0.96)'
                          : 'perspective(950px) rotateX(0deg) scale(1)',
                        transition: 'transform 500ms cubic-bezier(0.22, 1, 0.36, 1)'
                      }}
                      className={`w-full max-w-md p-6 rounded-t-[90px] rounded-b-3xl border-2 shadow-2xl ${
                        lightMode ? 'bg-slate-100 border-slate-300' : 'bg-[#07111F] border-[#55D6FF]/40 shadow-[#55D6FF]/10'
                      }`}
                    >
                      <div className="text-center text-[10px] font-mono uppercase tracking-widest text-[#55D6FF] mb-4">
                        ▲ OLDINGI UCHUVCHILAR KABINASI ({selectedFlight.flightNumber}) ▲
                      </div>

                      <div className="space-y-2.5">
                        {[1, 2, 3, 10, 11, 12, 13, 14, 15, 16].map(row => {
                          const isBusiness = row <= 3;
                          const isExit = row === 10 || row === 11;
                          const cols = isBusiness ? ['A', 'C', 'D', 'F'] : ['A', 'B', 'C', 'D', 'E', 'F'];
                          const occupiedList = ['1A', '2D', '10B', '12C', '14E', '15A'];

                          return (
                            <div key={row} className="flex items-center justify-center gap-1.5">
                              <span className="w-6 text-[11px] font-mono text-[#9BAFC5] text-right pr-1">{row}</span>
                              {cols.map((col, idx) => {
                                const seatId = `${row}${col}`;
                                const isOccupied = occupiedList.includes(seatId);
                                const isSelected = selectedSeats.includes(seatId);
                                const needsAisle = isBusiness ? idx === 1 : idx === 2;

                                return (
                                  <React.Fragment key={seatId}>
                                    <button
                                      type="button"
                                      disabled={isOccupied}
                                      onClick={() => {
                                        setSelectedSeats(prev => {
                                          if (prev.includes(seatId)) return prev.filter(s => s !== seatId);
                                          if (prev.length >= bookingTotals.paxCount) {
                                            return [...prev.slice(1), seatId];
                                          }
                                          return [...prev, seatId];
                                        });
                                      }}
                                      title={`O'rindiq ${seatId} — ${formatPrice(getSeatPriceUSD(seatId))}`}
                                      className={`w-9 h-9 rounded-lg text-[11px] font-mono font-bold transition-all ${
                                        isOccupied
                                          ? 'bg-slate-700/40 text-slate-500 cursor-not-allowed'
                                          : isSelected
                                            ? 'bg-[#55D6FF] text-[#07111F] scale-110 shadow-lg shadow-[#55D6FF]/40'
                                            : isBusiness || isExit
                                              ? 'bg-amber-500/15 border border-amber-400/50 text-amber-300 hover:bg-amber-500/30'
                                              : 'bg-[#10243A] border border-[#55D6FF]/30 text-[#F7FAFF] hover:border-[#55D6FF]'
                                      }`}
                                    >
                                      {seatId}
                                    </button>
                                    {needsAisle && <div className="w-5 text-center text-[9px] text-[#9BAFC5]">|</div>}
                                  </React.Fragment>
                                );
                              })}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex justify-end">
                    <button
                      type="button"
                      onClick={() => setBookingStep(2)}
                      className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#55D6FF] to-[#8B9EFF] text-[#07111F] font-extrabold text-sm"
                    >
                      O‘rindiqlarni tasdiqlash va davom etish →
                    </button>
                  </div>
                </div>
              )}

              {/* 2-QADAM: QO'SHIMCHA XIZMATLAR */}
              {bookingStep === 2 && (
                <div className={`p-6 rounded-3xl border space-y-4 ${bgCard}`}>
                  <h2 className="text-xl font-extrabold">Qo‘shimcha Sayohat Xizmatlari</h2>
                  <p className={`text-xs ${textMuted}`}>Qo‘shimcha bagaj, VIP zal va ustuvor bortga chiqish xizmatlarini tanlang.</p>

                  <div className="space-y-3 pt-2">
                    {ANCILLARY_OPTIONS.map(opt => {
                      const active = selectedAncillaries.includes(opt.id);
                      return (
                        <div
                          key={opt.id}
                          onClick={() =>
                            setSelectedAncillaries(prev =>
                              prev.includes(opt.id) ? prev.filter(i => i !== opt.id) : [...prev, opt.id]
                            )
                          }
                          className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between gap-4 ${
                            active
                              ? 'border-[#55D6FF] bg-[#55D6FF]/10'
                              : lightMode
                                ? 'border-slate-200 hover:border-sky-300'
                                : 'border-white/10 hover:border-[#55D6FF]/40'
                          }`}
                        >
                          <div className="flex items-center gap-3.5">
                            <div className="w-10 h-10 rounded-xl bg-[#55D6FF]/15 text-[#55D6FF] flex items-center justify-center">
                              <opt.icon className="w-5 h-5" />
                            </div>
                            <div>
                              <div className="font-bold text-sm">{opt.name}</div>
                              <div className={`text-xs ${textMuted}`}>{opt.desc}</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="font-mono font-bold text-sm text-[#55D6FF]">
                              +{formatPrice(opt.priceUSD)}
                            </span>
                            <div className={`w-6 h-6 rounded-lg flex items-center justify-center border ${
                              active ? 'bg-[#55D6FF] border-[#55D6FF] text-[#07111F]' : 'border-white/25'
                            }`}>
                              {active && <Check className="w-4 h-4 stroke-[3]" />}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="pt-4 flex justify-between">
                    <button
                      type="button"
                      onClick={() => setBookingStep(1)}
                      className="px-5 py-2.5 rounded-xl border border-white/15 text-xs font-bold"
                    >
                      ← O‘rindiqlarga qaytish
                    </button>
                    <button
                      type="button"
                      onClick={() => setBookingStep(3)}
                      className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#55D6FF] to-[#8B9EFF] text-[#07111F] font-extrabold text-sm"
                    >
                      Yo‘lovchi ma’lumotlariga o‘tish →
                    </button>
                  </div>
                </div>
              )}

              {/* 3-QADAM: YO'LOVCHI MA'LUMOTLARI */}
              {bookingStep === 3 && (
                <div className={`p-6 rounded-3xl border space-y-6 ${bgCard}`}>
                  <div>
                    <h2 className="text-xl font-extrabold">Yo‘lovchilarning Pasport Ma’lumotlari</h2>
                    <p className={`text-xs ${textMuted}`}>
                      Ism va familiya xorijga chiqish pasportidagi lotincha yozuvga to‘liq mos kelishi shart.
                    </p>
                  </div>

                  {passengerForms.map((pax, idx) => (
                    <div key={idx} className={`p-5 rounded-2xl border space-y-4 ${lightMode ? 'bg-slate-50 border-slate-200' : 'bg-[#07111F] border-white/10'}`}>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold uppercase tracking-wider text-[#55D6FF]">
                          {idx + 1}-Yo‘lovchi {idx === 0 ? '(Asosiy bog‘lanish shaxsi)' : ''}
                        </span>
                        <span className="text-xs font-mono text-[#8B9EFF]">
                          O‘rindiq: {selectedSeats[idx] || 'Avto-tanlov'}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold mb-1">Ism (Given Name) *</label>
                          <input
                            type="text"
                            value={pax.givenName}
                            onChange={(e) => setPassengerForms(list => list.map((item, i) => i === idx ? { ...item, givenName: e.target.value } : item))}
                            className={`w-full px-3.5 py-2.5 rounded-xl border text-sm outline-none ${lightMode ? 'bg-white border-slate-300' : 'bg-[#10243A] border-white/15'}`}
                          />
                          {formErrors[`${idx}-givenName`] && <p className="text-rose-400 text-xs mt-1">{formErrors[`${idx}-givenName`]}</p>}
                        </div>

                        <div>
                          <label className="block text-xs font-semibold mb-1">Familiya (Family Name) *</label>
                          <input
                            type="text"
                            value={pax.familyName}
                            onChange={(e) => setPassengerForms(list => list.map((item, i) => i === idx ? { ...item, familyName: e.target.value } : item))}
                            className={`w-full px-3.5 py-2.5 rounded-xl border text-sm outline-none ${lightMode ? 'bg-white border-slate-300' : 'bg-[#10243A] border-white/15'}`}
                          />
                          {formErrors[`${idx}-familyName`] && <p className="text-rose-400 text-xs mt-1">{formErrors[`${idx}-familyName`]}</p>}
                        </div>

                        <div>
                          <label className="block text-xs font-semibold mb-1">Tug‘ilgan sana</label>
                          <input
                            type="date"
                            value={pax.dob}
                            onChange={(e) => setPassengerForms(list => list.map((item, i) => i === idx ? { ...item, dob: e.target.value } : item))}
                            className={`w-full px-3.5 py-2.5 rounded-xl border text-sm outline-none ${lightMode ? 'bg-white border-slate-300' : 'bg-[#10243A] border-white/15'}`}
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold mb-1">Pasport seriyasi va raqami *</label>
                          <input
                            type="text"
                            value={pax.docNumber}
                            onChange={(e) => setPassengerForms(list => list.map((item, i) => i === idx ? { ...item, docNumber: e.target.value.toUpperCase() } : item))}
                            placeholder="masalan: FA4829104"
                            className={`w-full px-3.5 py-2.5 rounded-xl border text-sm font-mono outline-none ${lightMode ? 'bg-white border-slate-300' : 'bg-[#10243A] border-white/15'}`}
                          />
                          {formErrors[`${idx}-docNumber`] && <p className="text-rose-400 text-xs mt-1">{formErrors[`${idx}-docNumber`]}</p>}
                        </div>

                        {idx === 0 && (
                          <>
                            <div>
                              <label className="block text-xs font-semibold mb-1">Elektron chipta uchun Email *</label>
                              <input
                                type="email"
                                value={pax.email}
                                onChange={(e) => setPassengerForms(list => list.map((item, i) => i === idx ? { ...item, email: e.target.value } : item))}
                                className={`w-full px-3.5 py-2.5 rounded-xl border text-sm outline-none ${lightMode ? 'bg-white border-slate-300' : 'bg-[#10243A] border-white/15'}`}
                              />
                              {formErrors['0-email'] && <p className="text-rose-400 text-xs mt-1">{formErrors['0-email']}</p>}
                            </div>
                            <div>
                              <label className="block text-xs font-semibold mb-1">Telefon raqami</label>
                              <input
                                type="tel"
                                value={pax.phone}
                                onChange={(e) => setPassengerForms(list => list.map((item, i) => i === idx ? { ...item, phone: e.target.value } : item))}
                                className={`w-full px-3.5 py-2.5 rounded-xl border text-sm outline-none ${lightMode ? 'bg-white border-slate-300' : 'bg-[#10243A] border-white/15'}`}
                              />
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  ))}

                  <div className="flex justify-between">
                    <button
                      type="button"
                      onClick={() => setBookingStep(2)}
                      className="px-5 py-2.5 rounded-xl border border-white/15 text-xs font-bold"
                    >
                      ← Xizmatlarga qaytish
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (validatePassengers()) setBookingStep(4);
                      }}
                      className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#55D6FF] to-[#8B9EFF] text-[#07111F] font-extrabold text-sm"
                    >
                      Tekshirish va To‘lovga o‘tish →
                    </button>
                  </div>
                </div>
              )}

              {/* 4-QADAM: SINOV TO'LOVI (SANDBOX CHECKOUT) */}
              {bookingStep === 4 && (
                <div className={`p-6 rounded-3xl border space-y-6 ${bgCard}`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-extrabold">Sinov To‘lov Shlyuzi (Sandbox)</h2>
                      <p className={`text-xs ${textMuted}`}>
                        PCI-DSS Tokenizatsiya Simulyatsiyasi — Haqiqiy bank karta raqamlarini kiritmang.
                      </p>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/35 text-amber-400 text-xs font-bold">
                      SANDBOX REJIM
                    </span>
                  </div>

                  <div className={`p-5 rounded-2xl border space-y-4 ${lightMode ? 'bg-slate-50 border-slate-200' : 'bg-[#07111F] border-[#55D6FF]/25'}`}>
                    <div className="flex items-center justify-between text-xs font-bold text-[#55D6FF]">
                      <span>SINOV KARTA TOKENI TAYYOR</span>
                      <span className="font-mono">UZCARD / HUMO / VISA / STRIPE ADAPTER</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="sm:col-span-2">
                        <label className="block text-[11px] uppercase text-[#9BAFC5] mb-1">Simulyatsiya karta raqami</label>
                        <input
                          type="text"
                          readOnly
                          value="4242 •••• •••• 4242 (Sinov To'lov Tokeni)"
                          className={`w-full px-3.5 py-2.5 rounded-xl border text-sm font-mono ${lightMode ? 'bg-white border-slate-300' : 'bg-[#10243A] border-white/15'}`}
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] uppercase text-[#9BAFC5] mb-1">Muddat / CVC</label>
                        <input
                          type="text"
                          readOnly
                          value="12/29 • •••"
                          className={`w-full px-3.5 py-2.5 rounded-xl border text-sm font-mono ${lightMode ? 'bg-white border-slate-300' : 'bg-[#10243A] border-white/15'}`}
                        />
                      </div>
                    </div>
                    <div className="text-xs text-[#9BAFC5] flex items-center gap-2">
                      <Lock className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Asosiy hisob-kitob valyutasi: USD (${bookingTotals.grandTotalUSD.toLocaleString()}).</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <button
                      type="button"
                      onClick={() => setBookingStep(3)}
                      className="px-5 py-2.5 rounded-xl border border-white/15 text-xs font-bold"
                    >
                      ← Yo‘lovchilarga qaytish
                    </button>
                    <button
                      type="button"
                      disabled={paymentProcessing}
                      onClick={completeSandboxCheckout}
                      className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#55D6FF] to-[#8B9EFF] text-[#07111F] font-extrabold text-sm shadow-xl shadow-[#55D6FF]/25 flex items-center gap-2"
                    >
                      <CreditCard className="w-4 h-4" />
                      <span>{paymentProcessing ? 'Tranzaksiya tekshirilmoqda...' : `${t.confirmPay} (${formatPrice(bookingTotals.grandTotalUSD)})`}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* O'NG BUYURTMA XULOSASI */}
            <aside className="lg:col-span-4">
              <div className={`p-6 rounded-3xl border sticky top-24 space-y-4 ${bgCard}`}>
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#55D6FF]">Buyurtma Xulosasi</span>
                  <span className="font-mono text-xs font-bold">{selectedFlight.flightNumber}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xl font-extrabold font-mono">{selectedFlight.origin} → {selectedFlight.destination}</div>
                    <div className={`text-xs ${textMuted}`}>{depDate} • {t.cabinClasses[cabinClass] || cabinClass}</div>
                  </div>
                  <div className="text-right text-xs font-mono">
                    <div>{selectedFlight.depTime} - {selectedFlight.arrTime}</div>
                    <div className="text-[#55D6FF]">{formatDuration(selectedFlight.durationMins)}</div>
                  </div>
                </div>

                <div className="space-y-2 pt-3 border-t border-white/10 text-xs">
                  <div className="flex justify-between">
                    <span className={textMuted}>Asosiy tarif ({bookingTotals.paxCount} × {formatPrice(bookingTotals.unitFare)})</span>
                    <span className="font-mono font-bold">{formatPrice(bookingTotals.baseFareTotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={textMuted}>Aeroport soliqlari va yig‘imlar</span>
                    <span className="font-mono font-bold">{formatPrice(bookingTotals.taxesTotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={textMuted}>O‘rindiq tanlovi ({selectedSeats.join(', ') || 'Yo‘q'})</span>
                    <span className="font-mono font-bold">{formatPrice(bookingTotals.seatsTotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={textMuted}>Qo‘shimcha xizmatlar ({selectedAncillaries.length})</span>
                    <span className="font-mono font-bold">{formatPrice(bookingTotals.ancillariesTotal)}</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-baseline justify-between">
                  <span className="font-bold text-sm">Jami to‘lov</span>
                  <div className="text-right">
                    <div className="text-2xl font-extrabold text-[#55D6FF] font-mono">
                      {formatPrice(bookingTotals.grandTotalUSD)}
                    </div>
                    {currency !== 'USD' && (
                      <div className="text-[11px] text-[#9BAFC5] font-mono">
                        Ekivalent: ${bookingTotals.grandTotalUSD.toLocaleString()} USD
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      )}

      {/* =====================================================================
          5-BO'LIM: TASDIQLASH VA 3D ELEKTRON CHIPTA (E-TICKET)
         ===================================================================== */}
      {activeView === 'confirmation' && latestConfirmation && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
          <div className="p-6 rounded-3xl bg-emerald-500/15 border border-emerald-500/35 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <CheckCircle2 className="w-8 h-8 text-emerald-400 shrink-0" />
              <div>
                <h1 className="text-xl sm:text-2xl font-extrabold">Demo Bron Muvaffaqiyatli Tasdiqlandi!</h1>
                <p className="text-xs text-[#9BAFC5]">
                  Simulyatsiya qilingan SKYLINE X elektron chiptasi shakllantirildi.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => window.print()}
                className="px-4 py-2 rounded-xl bg-[#10243A] border border-[#55D6FF]/35 text-[#55D6FF] text-xs font-bold flex items-center gap-1.5"
              >
                <Printer className="w-3.5 h-3.5" /> Chiptani chop etish
              </button>
              <button
                type="button"
                onClick={() => setActiveView('trips')}
                className="px-4 py-2 rounded-xl bg-[#55D6FF] text-[#07111F] text-xs font-extrabold"
              >
                Shaxsiy kabinetga o‘tish
              </button>
            </div>
          </div>

          <Tilt3DCard className={`rounded-3xl border overflow-hidden ${bgCard}`}>
            <div className="p-6 bg-gradient-to-r from-[#0B192A] to-[#10243A] border-b border-[#55D6FF]/25 flex flex-wrap items-center justify-between gap-4 text-white">
              <SkylineLogo lightMode={false} />
              <div className="text-right">
                <div className="text-[10px] uppercase tracking-widest text-[#55D6FF]">Bron Kodi (PNR)</div>
                <div className="text-2xl font-mono font-black tracking-wider">{latestConfirmation.pnr}</div>
              </div>
            </div>

            <div className="p-6 sm:p-8 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-center">
                <div>
                  <div className="text-xs text-[#9BAFC5]">UCHISH AEROPORTI</div>
                  <div className="text-3xl font-black font-mono text-[#55D6FF]">{latestConfirmation.flight.origin}</div>
                  <div className="text-sm font-bold">{AIRPORTS.find(a => a.code === latestConfirmation.flight.origin)?.city}</div>
                  <div className="text-xs font-mono mt-1">{latestConfirmation.date} • {latestConfirmation.flight.depTime}</div>
                </div>

                <div className="flex flex-col items-center">
                  <span className="text-xs font-mono text-[#8B9EFF]">{latestConfirmation.flight.flightNumber}</span>
                  <div className="w-full h-[2px] bg-gradient-to-r from-[#55D6FF] to-[#8B9EFF] my-2" />
                  <span className="text-xs text-[#9BAFC5]">{latestConfirmation.cabin}</span>
                </div>

                <div className="sm:text-right">
                  <div className="text-xs text-[#9BAFC5]">QO‘NISH AEROPORTI</div>
                  <div className="text-3xl font-black font-mono text-[#8B9EFF]">{latestConfirmation.flight.destination}</div>
                  <div className="text-sm font-bold">{AIRPORTS.find(a => a.code === latestConfirmation.flight.destination)?.city}</div>
                  <div className="text-xs font-mono mt-1">{latestConfirmation.date} • {latestConfirmation.flight.arrTime}</div>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-white/10 text-xs">
                <div>
                  <span className="block text-[#9BAFC5]">YO‘LOVCHI</span>
                  <span className="font-bold">{latestConfirmation.passengers[0]?.givenName} {latestConfirmation.passengers[0]?.familyName}</span>
                </div>
                <div>
                  <span className="block text-[#9BAFC5]">O‘RINDIQ</span>
                  <span className="font-mono font-bold text-[#55D6FF]">{latestConfirmation.seats.join(', ')}</span>
                </div>
                <div>
                  <span className="block text-[#9BAFC5]">TRANZAKSIYA ID</span>
                  <span className="font-mono font-bold">{latestConfirmation.paymentRef}</span>
                </div>
                <div>
                  <span className="block text-[#9BAFC5]">TO‘LANGAN SUMMA</span>
                  <span className="font-mono font-bold text-emerald-400">{formatPrice(latestConfirmation.totalUSD)}</span>
                </div>
              </div>
            </div>
          </Tilt3DCard>
        </div>
      )}

      {/* =====================================================================
          6-BO'LIM: PARVOZ HOLATI (FLIGHT STATUS MONITOR)
         ===================================================================== */}
      {activeView === 'status' && (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#55D6FF]">Dispetcherlik Monitori</span>
              <h1 className="text-2xl sm:text-3xl font-extrabold mt-1">Parvoz Holati va Darvoza Telemetriyasi</h1>
              <p className={`text-xs mt-1 ${textMuted}`}>
                Namuna jadval holati • Oxirgi yangilanish: <span className="font-mono text-[#55D6FF]">{statusUpdatedAt}</span>
              </p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={statusQuery}
                onChange={(e) => setStatusQuery(e.target.value)}
                placeholder="Reys # yoki IATA kod (masalan: HY-271, DXB)..."
                className={`px-4 py-2.5 rounded-xl border text-sm outline-none ${
                  lightMode ? 'bg-white border-slate-200' : 'bg-[#10243A] border-[#55D6FF]/25'
                }`}
              />
              <button
                type="button"
                onClick={() => setStatusUpdatedAt(new Date().toISOString().replace('T', ' ').slice(0, 16) + ' UTC')}
                className="p-2.5 rounded-xl bg-[#55D6FF]/15 border border-[#55D6FF]/35 text-[#55D6FF] hover:bg-[#55D6FF] hover:text-[#07111F]"
                title="Vaqtni yangilash"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="space-y-3">
            {SAMPLE_FLIGHTS.filter(f => {
              const q = statusQuery.trim().toLowerCase();
              return !q || f.flightNumber.toLowerCase().includes(q) || f.origin.toLowerCase().includes(q) || f.destination.toLowerCase().includes(q);
            }).map(f => (
              <div key={f.id} className={`p-5 rounded-2xl border flex flex-wrap items-center justify-between gap-4 ${bgCard}`}>
                <div className="flex items-center gap-3.5 min-w-[200px]">
                  <span className="px-2.5 py-1 rounded-lg bg-[#55D6FF]/15 text-[#55D6FF] font-mono font-bold text-xs">
                    {f.flightNumber}
                  </span>
                  <div>
                    <div className="font-bold text-sm">{AIRLINES[f.airlineCode].name}</div>
                    <div className={`text-xs ${textMuted}`}>{f.aircraft}</div>
                  </div>
                </div>

                <div className="flex items-center gap-6 font-mono">
                  <div>
                    <div className="text-lg font-extrabold">{f.depTime}</div>
                    <div className="text-xs text-[#55D6FF]">{f.origin} • {f.terminalDep}</div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#9BAFC5]" />
                  <div>
                    <div className="text-lg font-extrabold">{f.arrTime}</div>
                    <div className="text-xs text-[#8B9EFF]">{f.destination} • {f.terminalArr}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono px-2.5 py-1 rounded bg-white/5 border border-white/10">
                    Darvoza {f.gate}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-extrabold ${
                    f.status === "O'Z VAQTIDA"
                      ? 'bg-emerald-500/15 text-emerald-400'
                      : f.status === "RO'YXATDAN O'TISH"
                        ? 'bg-[#55D6FF]/20 text-[#55D6FF]'
                        : 'bg-amber-500/20 text-amber-400'
                  }`}>
                    {f.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =====================================================================
          7-BO'LIM: MANZILLAR ATLASI (DESTINATIONS)
         ===================================================================== */}
      {activeView === 'destinations' && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#55D6FF]">Sayohat Yo‘riqnomalari</span>
            <h1 className="text-3xl font-extrabold mt-1">SKYLINE X Jahon Manzillari Atlasi</h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
            {DESTINATIONS_DATA.map(dest => (
              <Tilt3DCard key={dest.code} className={`rounded-3xl border overflow-hidden flex flex-col justify-between ${bgCard}`}>
                <div>
                  <div className="h-56 relative text-white">
                    <img src={dest.image} alt={dest.city} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#07111F] via-[#07111F]/40 to-transparent" />
                    <div className="absolute top-4 left-5 right-5 flex items-center justify-between">
                      <span className="text-xs uppercase tracking-widest font-bold text-[#55D6FF] bg-black/50 px-3 py-1 rounded-full backdrop-blur">
                        {dest.country}
                      </span>
                      <span className="font-mono text-xs px-2.5 py-1 rounded bg-black/55 backdrop-blur">{dest.code}</span>
                    </div>
                    <div className="absolute bottom-4 left-5">
                      <h2 className="text-2xl font-extrabold">{dest.city}</h2>
                      <p className="text-xs text-white/85 mt-0.5">Eng qulay mavsum: {dest.bestSeason}</p>
                    </div>
                  </div>
                  <div className="p-6 space-y-4">
                    <p className={`text-sm leading-relaxed ${textMuted}`}>{dest.overview}</p>
                    <div>
                      <div className="text-xs font-bold uppercase tracking-wider text-[#55D6FF] mb-2">Mashhur Maskalar</div>
                      <div className="flex flex-wrap gap-2">
                        {dest.attractions.map(attr => (
                          <span key={attr} className={`px-3 py-1 rounded-lg text-xs border ${lightMode ? 'bg-slate-50 border-slate-200' : 'bg-[#07111F] border-white/10'}`}>
                            {attr}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="px-6 py-4 border-t border-white/10 flex items-center justify-between">
                  <div>
                    <span className={`text-[11px] block ${textMuted}`}>Namuna tariflar</span>
                    <span className="font-mono font-extrabold text-lg text-[#55D6FF]">{formatPrice(dest.sampleFromUSD)}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => triggerSearch(origin === dest.code ? 'TAS' : origin, dest.code)}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#55D6FF] to-[#8B9EFF] text-[#07111F] font-extrabold text-xs"
                  >
                    Bu yerga reyslarni qidirish
                  </button>
                </div>
              </Tilt3DCard>
            ))}
          </div>
        </div>
      )}

      {/* =====================================================================
          8-BO'LIM: SHAXSIY KABINET ("MENING SAYOHATLARIM")
         ===================================================================== */}
      {activeView === 'trips' && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
          <div className={`p-6 sm:p-8 rounded-3xl border flex flex-wrap items-center justify-between gap-6 ${bgCard}`}>
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#55D6FF] to-[#8B9EFF] text-[#07111F] font-black text-xl flex items-center justify-center">
                AK
              </div>
              <div>
                <div className="text-xs font-bold tracking-widest text-[#55D6FF]">{currentUser.tier}</div>
                <h1 className="text-2xl font-extrabold">{currentUser.name}</h1>
                <p className={`text-xs ${textMuted}`}>{currentUser.email} • A’zo ID: {currentUser.id}</p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div>
                <div className={`text-xs uppercase ${textMuted}`}>Horizon Millari (Demo)</div>
                <div className="text-2xl font-mono font-extrabold text-[#55D6FF]">{currentUser.miles.toLocaleString()}</div>
              </div>
              <div>
                <div className={`text-xs uppercase ${textMuted}`}>Faol Bronlar</div>
                <div className="text-2xl font-mono font-extrabold text-[#8B9EFF]">{bookings.length}</div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-extrabold">Mening Bron Qilingan Chiptalarim</h2>
            {bookings.map(bk => (
              <div key={bk.pnr} className={`p-6 rounded-2xl border flex flex-wrap items-center justify-between gap-4 ${bgCard}`}>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded bg-[#55D6FF]/15 text-[#55D6FF] font-mono font-bold text-xs">
                      PNR: {bk.pnr}
                    </span>
                    <span className="px-2.5 py-0.5 rounded bg-emerald-500/15 text-emerald-400 font-bold text-xs">
                      {bk.status}
                    </span>
                  </div>
                  <div className="text-xl font-extrabold mt-2">
                    {bk.flight.origin} → {bk.flight.destination} ({bk.flight.flightNumber})
                  </div>
                  <div className={`text-xs mt-1 ${textMuted}`}>
                    Sana: {bk.date} • Klass: {bk.cabin} • O‘rindiq: {bk.seats.join(', ')} • Tranzaksiya: {bk.paymentRef}
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className={`text-xs ${textMuted}`}>To‘langan summa</div>
                    <div className="text-xl font-mono font-extrabold text-[#55D6FF]">{formatPrice(bk.totalUSD)}</div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setLatestConfirmation(bk);
                      setActiveView('confirmation');
                    }}
                    className="px-4 py-2.5 rounded-xl border border-[#55D6FF]/35 text-[#55D6FF] text-xs font-bold hover:bg-[#55D6FF]/10"
                  >
                    Elektron chiptani ochish
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =====================================================================
          9-BO'LIM: BOSHQARUV PANELI VA ANALITIKA MARKAZI (ADMIN)
         ===================================================================== */}
      {activeView === 'admin' && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#8B9EFF]">RBAC Ruxsat Darajasi: {currentUser.role}</span>
              <h1 className="text-2xl sm:text-3xl font-extrabold mt-1">SKYLINE X Boshqaruv va Analitika Markazi</h1>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/35 text-emerald-400">
              <Server className="w-3.5 h-3.5" /> API ORKESTRATOR: FAOL (DEMO ADAPTER)
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { label: 'Jami Demo Bronlar', value: bookings.length, delta: '+18.4% sessiya', icon: FileText },
              {
                label: 'Simulyatsiya Aylanmasi',
                value: formatPrice(bookings.reduce((s, b) => s + b.totalUSD, 0)),
                delta: 'Sandbox tasdiqlangan',
                icon: CreditCard
              },
              { label: 'Faol Global Yo‘laklar', value: '10 Xab / 8 Reys', delta: '100% barqaror', icon: Globe },
              { label: 'Qidiruv-Bron Konversiyasi', value: '14.2%', delta: 'Demo telemetriya', icon: Activity },
            ].map((kpi, idx) => (
              <div key={idx} className={`p-5 rounded-2xl border ${bgCard}`}>
                <div className="flex items-center justify-between text-[#55D6FF] mb-3">
                  <span className={`text-xs font-bold uppercase ${textMuted}`}>{kpi.label}</span>
                  <kpi.icon className="w-4 h-4" />
                </div>
                <div className="text-2xl font-extrabold font-mono">{kpi.value}</div>
                <div className="text-xs text-emerald-400 mt-1">{kpi.delta}</div>
              </div>
            ))}
          </div>

          <div className={`p-6 rounded-3xl border space-y-4 ${bgCard}`}>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-lg font-extrabold">Bronlar va Tranzaksiyalar Reyestri</h2>
              <input
                type="text"
                value={adminBookingSearch}
                onChange={(e) => setAdminBookingSearch(e.target.value)}
                placeholder="PNR yoki yo‘nalish bo‘yicha qidirish..."
                className={`px-3.5 py-2 rounded-xl border text-xs outline-none ${lightMode ? 'bg-slate-50 border-slate-200' : 'bg-[#07111F] border-white/15'}`}
              />
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-white/10 text-[#9BAFC5] uppercase">
                    <th className="py-3 px-2">PNR Kodi</th>
                    <th className="py-3 px-2">Yo‘nalish</th>
                    <th className="py-3 px-2">Yo‘lovchi</th>
                    <th className="py-3 px-2">Klass / O‘rindiq</th>
                    <th className="py-3 px-2">Summa</th>
                    <th className="py-3 px-2">Holat</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {bookings
                    .filter(b =>
                      !adminBookingSearch ||
                      b.pnr.toLowerCase().includes(adminBookingSearch.toLowerCase()) ||
                      b.flight.origin.toLowerCase().includes(adminBookingSearch.toLowerCase()) ||
                      b.flight.destination.toLowerCase().includes(adminBookingSearch.toLowerCase())
                    )
                    .map(b => (
                      <tr key={b.pnr}>
                        <td className="py-3 px-2 font-mono font-bold text-[#55D6FF]">{b.pnr}</td>
                        <td className="py-3 px-2 font-bold">{b.flight.origin} → {b.flight.destination} ({b.flight.flightNumber})</td>
                        <td className="py-3 px-2">{b.passengers[0]?.givenName} {b.passengers[0]?.familyName}</td>
                        <td className="py-3 px-2 font-mono">{b.cabin} • {b.seats.join(', ')}</td>
                        <td className="py-3 px-2 font-mono font-bold">{formatPrice(b.totalUSD)}</td>
                        <td className="py-3 px-2">
                          <span className="px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 font-bold">
                            {b.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          YONMA-YON REYSLARNI TAQQOSLASH OYNASI (MODAL)
         ===================================================================== */}
      {compareModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className={`w-full max-w-4xl rounded-3xl border p-6 max-h-[90vh] overflow-y-auto ${bgCard}`}>
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <h3 className="text-lg font-extrabold">Reyslarni Yonma-Yon Taqqoslash</h3>
              <button type="button" onClick={() => setCompareModalOpen(false)} className="p-2 rounded-lg hover:bg-white/10">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-5">
              {compareIds.map(id => {
                const fl = SAMPLE_FLIGHTS.find(f => f.id === id);
                if (!fl) return null;
                return (
                  <div key={fl.id} className={`p-4 rounded-2xl border space-y-3 ${lightMode ? 'bg-slate-50 border-slate-200' : 'bg-[#07111F] border-white/10'}`}>
                    <div className="font-bold text-sm text-[#55D6FF]">{AIRLINES[fl.airlineCode].name} ({fl.flightNumber})</div>
                    <div className="text-2xl font-mono font-extrabold">
                      {formatPrice(fl.basePriceUSD * getCabinMultiplier(cabinClass))}
                    </div>
                    <div className="text-xs space-y-1.5 text-[#9BAFC5]">
                      <div>Yo‘nalish: <strong className="text-white">{fl.origin} → {fl.destination}</strong></div>
                      <div>Davomiyligi: <strong className="text-white">{formatDuration(fl.durationMins)}</strong></div>
                      <div>To‘xtashlar: <strong className="text-white">{fl.stops === 0 ? 'To‘g‘ridan-to‘g‘ri' : '1 ta to‘xtash'}</strong></div>
                      <div>Layner: <strong className="text-white">{fl.aircraft}</strong></div>
                      <div>Bagaj: <strong className="text-white">{fl.baggage}</strong></div>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setCompareModalOpen(false);
                        startBooking(fl);
                      }}
                      className="w-full py-2.5 rounded-xl bg-[#55D6FF] text-[#07111F] font-extrabold text-xs"
                    >
                      Ushbu reysni tanlash
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          FOYDALANUVCHI SESSIYASI OYNASI
         ===================================================================== */}
      {authModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className={`w-full max-w-md rounded-3xl border p-6 space-y-4 ${bgCard}`}>
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-extrabold">SKYLINE X Foydalanuvchi Sessiyasi</h3>
              <button type="button" onClick={() => setAuthModalOpen(false)} className="p-1.5 rounded-lg hover:bg-white/10">
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className={`text-xs ${textMuted}`}>
              Interaktiv demo rejimida RBAC Admin va Yo‘lovchi huquqlari bilan tizimga kirilgan.
            </p>
            <div className={`p-4 rounded-2xl border text-xs space-y-1.5 ${lightMode ? 'bg-slate-50 border-slate-200' : 'bg-[#07111F] border-white/10'}`}>
              <div>F.I.SH.: <strong>{currentUser.name}</strong></div>
              <div>Email: <strong>{currentUser.email}</strong></div>
              <div>Maqom: <strong className="text-[#55D6FF]">{currentUser.tier}</strong></div>
              <div>Ruxsat roli: <strong className="text-[#8B9EFF]">{currentUser.role}</strong></div>
            </div>
            <button
              type="button"
              onClick={() => setAuthModalOpen(false)}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#55D6FF] to-[#8B9EFF] text-[#07111F] font-extrabold text-xs"
            >
              Sessiyani davom ettirish
            </button>
          </div>
        </div>
      )}

      {/* =====================================================================
          GLOBAL PROFESSIONAL FOOTER
         ===================================================================== */}
      <footer className={`mt-20 border-t ${lightMode ? 'bg-white border-slate-200' : 'bg-[#07111F] border-[#55D6FF]/20'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-3">
              <SkylineLogo lightMode={lightMode} />
              <p className={`text-xs leading-relaxed ${textMuted}`}>
                {t.slogan} — Yangi avlod global aviatsiya, 3D parvoz telemetriyasi va shaffof chiptalar bron qilish ekotizimi.
              </p>
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#55D6FF] mb-3">Platforma Modullari</h4>
              <ul className={`space-y-2 text-xs ${textMuted}`}>
                <li><button onClick={() => setActiveView('home')} className="hover:text-[#55D6FF]">Parvoz qidiruv konsoli</button></li>
                <li><button onClick={() => setActiveView('results')} className="hover:text-[#55D6FF]">Tariflarni taqqoslash va filtrlar</button></li>
                <li><button onClick={() => setActiveView('status')} className="hover:text-[#55D6FF]">Parvoz holati monitori</button></li>
                <li><button onClick={() => setActiveView('destinations')} className="hover:text-[#55D6FF]">Jahon manzillari atlasi</button></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#55D6FF] mb-3">Yo‘lovchi Xizmatlari</h4>
              <ul className={`space-y-2 text-xs ${textMuted}`}>
                <li><button onClick={() => setActiveView('trips')} className="hover:text-[#55D6FF]">Shaxsiy kabinet (Bronlarim)</button></li>
                <li><button onClick={() => setActiveView('admin')} className="hover:text-[#55D6FF]">Boshqaruv va analitika paneli</button></li>
                <li><span>Ko‘p valyutali konverter (UZS / USD / EUR)</span></li>
                <li><span>Tillar: O‘zbekcha / English / Русский</span></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#55D6FF] mb-3">Ma’lumotlar Shaffofligi</h4>
              <p className={`text-xs leading-relaxed ${textMuted}`}>
                Ushbu interaktiv tizimdagi barcha reys jadvallari, narxlar, 3D salon xaritalari va PNR tasdiqnomalari namunaviy demo ma’lumotlar asosida ishlaydi.
              </p>
            </div>
          </div>
          <div className={`mt-10 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs ${textMuted}`}>
            <span>© 2026 SKYLINE X Aviation Technologies. Barcha huquqlar himoyalangan.</span>
            <span className="font-mono text-[#55D6FF]">MANZILLARDAN HAM ORTIQ. KUTILGANIDAN HAM A'LO.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}