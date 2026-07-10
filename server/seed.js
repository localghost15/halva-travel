/**
 * Скрипт наполнения БД тестовыми (sample) данными.
 * Запуск:  node seed.js
 * Осторожно: очищает коллекции Region, Hotel, Tour, News, Faq, Banner.
 */
require('dotenv').config();
const mongoose = require('mongoose');

const Region = require('./models/Region');
const Hotel = require('./models/Hotel');
const Tour = require('./models/Tour');
const News = require('./models/News');
const Faq = require('./models/Faq');
const Banner = require('./models/Banner');

const run = async () => {
  await mongoose.connect(process.env.MONGO_URI, { serverSelectionTimeoutMS: 15000 });
  console.log('✅ Подключено к MongoDB');

  // Очистка
  await Promise.all([
    Region.deleteMany({}),
    Hotel.deleteMany({}),
    Tour.deleteMany({}),
    News.deleteMany({}),
    Faq.deleteMany({}),
    Banner.deleteMany({}),
  ]);
  console.log('🧹 Старые данные удалены');

  // ---------- Регионы ----------
  const regionsData = [
    {
      name: { ru: 'Самарканд', en: 'Samarkand', uz: 'Samarqand' },
      description: {
        ru: 'Древний город на Великом шёлковом пути, знаменитый площадью Регистан, мавзолеем Гур-Эмир и обсерваторией Улугбека.',
        en: 'An ancient city on the Great Silk Road, famous for Registan Square, the Gur-e-Amir mausoleum and Ulugbek observatory.',
        uz: 'Buyuk ipak yoʻlidagi qadimiy shahar, Registon maydoni, Goʻri Amir maqbarasi va Ulugʻbek rasadxonasi bilan mashhur.',
      },
      weather: { temp: 24, condition: 'Ясно', icon: '' },
      images: [],
    },
    {
      name: { ru: 'Бухара', en: 'Bukhara', uz: 'Buxoro' },
      description: {
        ru: 'Город-музей под открытым небом с более чем 140 памятниками архитектуры, минаретом Калян и торговыми куполами.',
        en: 'An open-air museum city with over 140 architectural monuments, the Kalyan minaret and trading domes.',
        uz: 'Ochiq osmon ostidagi muzey-shahar, 140 dan ortiq meʼmoriy yodgorliklar, Kalon minorasi va savdo gumbazlari bilan.',
      },
      weather: { temp: 26, condition: 'Солнечно', icon: '' },
      images: [],
    },
    {
      name: { ru: 'Хива', en: 'Khiva', uz: 'Xiva' },
      description: {
        ru: 'Сказочный город с внутренней крепостью Ичан-Кала, внесённой в список Всемирного наследия ЮНЕСКО.',
        en: 'A fairy-tale city with the inner fortress Itchan Kala, a UNESCO World Heritage Site.',
        uz: 'YUNESKO Butunjahon merosi roʻyxatiga kiritilgan Ichan Qalʼa ichki qalʼasi bilan ertaknamo shahar.',
      },
      weather: { temp: 23, condition: 'Переменная облачность', icon: '' },
      images: [],
    },
    {
      name: { ru: 'Ташкент', en: 'Tashkent', uz: 'Toshkent' },
      description: {
        ru: 'Современная столица Узбекистана, сочетающая восточные базары, музеи и красивое метро.',
        en: 'The modern capital of Uzbekistan, blending oriental bazaars, museums and a beautiful metro.',
        uz: 'Sharq bozorlari, muzeylar va goʻzal metroni oʻzida jamlagan Oʻzbekistonning zamonaviy poytaxti.',
      },
      weather: { temp: 22, condition: 'Ясно', icon: '' },
      images: [],
    },
    {
      name: { ru: 'Фергана', en: 'Fergana', uz: "Farg'ona" },
      description: {
        ru: 'Плодородная Ферганская долина — центр ремёсел, шёлка и керамики.',
        en: 'The fertile Fergana Valley — a centre of crafts, silk and ceramics.',
        uz: "Serhosil Farg'ona vodiysi — hunarmandchilik, ipak va kulolchilik markazi.",
      },
      weather: { temp: 25, condition: 'Солнечно', icon: '' },
      images: [],
    },
  ];

  const regions = await Region.insertMany(regionsData);
  console.log(`🌍 Регионы: ${regions.length}`);
  const byName = (en) => regions.find((r) => r.name.en === en);

  // ---------- Отели ----------
  const hotelsData = [
    {
      region: byName('Samarkand')._id,
      name: { ru: 'Отель Регистан Плаза', en: 'Registan Plaza Hotel', uz: 'Registon Plaza mehmonxonasi' },
      description: {
        ru: 'Комфортабельный отель в центре Самарканда рядом с площадью Регистан.',
        en: 'A comfortable hotel in the centre of Samarkand near Registan Square.',
        uz: 'Registon maydoni yaqinidagi Samarqand markazidagi qulay mehmonxona.',
      },
      stars: 4,
      images: [],
    },
    {
      region: byName('Bukhara')._id,
      name: { ru: 'Отель Лаби Хауз', en: 'Lyabi House Hotel', uz: 'Labi Hovuz mehmonxonasi' },
      description: {
        ru: 'Бутик-отель в исторической части Бухары в традиционном стиле.',
        en: 'A boutique hotel in the historic part of Bukhara in a traditional style.',
        uz: 'Buxoroning tarixiy qismidagi anʼanaviy uslubdagi butik mehmonxona.',
      },
      stars: 4,
      images: [],
    },
    {
      region: byName('Khiva')._id,
      name: { ru: 'Отель Ичан Кала', en: 'Itchan Kala Hotel', uz: 'Ichan Qalʼa mehmonxonasi' },
      description: {
        ru: 'Уютный отель у стен древней крепости Хивы.',
        en: 'A cosy hotel by the walls of the ancient Khiva fortress.',
        uz: 'Qadimiy Xiva qalʼasi devorlari yonidagi shinam mehmonxona.',
      },
      stars: 3,
      images: [],
    },
    {
      region: byName('Tashkent')._id,
      name: { ru: 'Гранд Отель Ташкент', en: 'Grand Hotel Tashkent', uz: 'Grand Hotel Toshkent' },
      description: {
        ru: 'Современный отель в деловом центре столицы.',
        en: 'A modern hotel in the business centre of the capital.',
        uz: 'Poytaxtning ishbilarmonlik markazidagi zamonaviy mehmonxona.',
      },
      stars: 5,
      images: [],
    },
    {
      region: byName('Fergana')._id,
      name: { ru: 'Отель Фергана', en: 'Fergana Hotel', uz: "Farg'ona mehmonxonasi" },
      description: {
        ru: 'Спокойный отель для отдыха в Ферганской долине.',
        en: 'A quiet hotel for a relaxing stay in the Fergana Valley.',
        uz: "Farg'ona vodiysida dam olish uchun tinch mehmonxona.",
      },
      stars: 3,
      images: [],
    },
  ];

  const hotels = await Hotel.insertMany(hotelsData);
  console.log(`🏨 Отели: ${hotels.length}`);
  const hotelByRegion = (en) => hotels.find((h) => String(h.region) === String(byName(en)._id));

  // ---------- Туры ----------
  const toursData = [
    {
      region: byName('Samarkand')._id,
      hotel: hotelByRegion('Samarkand')._id,
      title: { ru: 'Жемчужина Самарканда', en: 'The Pearl of Samarkand', uz: 'Samarqand marvaridi' },
      route: { ru: 'Ташкент – Самарканд – Ташкент', en: 'Tashkent – Samarkand – Tashkent', uz: 'Toshkent – Samarqand – Toshkent' },
      shortDescription: {
        ru: 'Трёхдневный тур по главным достопримечательностям Самарканда.',
        en: 'A three-day tour of the main sights of Samarkand.',
        uz: 'Samarqandning asosiy diqqatga sazovor joylari boʻylab uch kunlik sayohat.',
      },
      includes: ['accommodation', 'transport', 'guide', 'meals'],
      price: 320,
      days: 3,
      nights: 2,
      slug: 'the-pearl-of-samarkand',
      images: [],
    },
    {
      region: byName('Bukhara')._id,
      hotel: hotelByRegion('Bukhara')._id,
      title: { ru: 'Магия древней Бухары', en: 'The Magic of Ancient Bukhara', uz: 'Qadimiy Buxoro sehri' },
      route: { ru: 'Бухара', en: 'Bukhara', uz: 'Buxoro' },
      shortDescription: {
        ru: 'Погружение в атмосферу города-музея с посещением медресе и караван-сараев.',
        en: 'Immerse yourself in the museum-city with visits to madrasahs and caravanserais.',
        uz: 'Madrasa va karvonsaroylarga tashrif bilan muzey-shahar muhitiga shoʻngʻing.',
      },
      includes: ['accommodation', 'guide', 'entrance_tickets'],
      price: 280,
      days: 4,
      nights: 3,
      slug: 'the-magic-of-ancient-bukhara',
      images: [],
    },
    {
      region: byName('Khiva')._id,
      hotel: hotelByRegion('Khiva')._id,
      title: { ru: 'Сказки Хивы', en: 'Tales of Khiva', uz: 'Xiva ertaklari' },
      route: { ru: 'Хива', en: 'Khiva', uz: 'Xiva' },
      shortDescription: {
        ru: 'Прогулка по внутреннему городу Ичан-Кала и знакомство с ремёслами.',
        en: 'A walk through the inner city Itchan Kala and an introduction to crafts.',
        uz: 'Ichan Qalʼa ichki shahri boʻylab sayr va hunarmandchilik bilan tanishuv.',
      },
      includes: ['accommodation', 'transport', 'guide'],
      price: 260,
      days: 2,
      nights: 1,
      slug: 'tales-of-khiva',
      images: [],
    },
    {
      region: byName('Tashkent')._id,
      hotel: hotelByRegion('Tashkent')._id,
      title: { ru: 'Столичный уикенд', en: 'Capital Weekend', uz: 'Poytaxt dam olish kuni' },
      route: { ru: 'Ташкент', en: 'Tashkent', uz: 'Toshkent' },
      shortDescription: {
        ru: 'Обзорный тур по Ташкенту: базары, музеи и знаменитое метро.',
        en: 'A sightseeing tour of Tashkent: bazaars, museums and the famous metro.',
        uz: 'Toshkent boʻylab sayohat: bozorlar, muzeylar va mashhur metro.',
      },
      includes: ['transport', 'guide', 'entertainment'],
      price: 180,
      days: 2,
      nights: 1,
      slug: 'capital-weekend',
      images: [],
    },
    {
      region: byName('Fergana')._id,
      hotel: hotelByRegion('Fergana')._id,
      title: { ru: 'Ремёсла Ферганской долины', en: 'Crafts of the Fergana Valley', uz: "Farg'ona vodiysi hunarmandchiligi" },
      route: { ru: 'Фергана – Маргилан – Риштан', en: 'Fergana – Margilan – Rishtan', uz: "Farg'ona – Margʻilon – Rishton" },
      shortDescription: {
        ru: 'Тур к мастерам шёлка и керамики Ферганской долины.',
        en: 'A tour to the silk and ceramics masters of the Fergana Valley.',
        uz: "Farg'ona vodiysi ipak va kulolchilik ustalariga sayohat.",
      },
      includes: ['accommodation', 'transport', 'guide', 'cultural'],
      price: 240,
      days: 3,
      nights: 2,
      slug: 'crafts-of-the-fergana-valley',
      images: [],
    },
    {
      region: byName('Samarkand')._id,
      hotel: hotelByRegion('Samarkand')._id,
      title: { ru: 'Гранд-тур по Узбекистану', en: 'Uzbekistan Grand Tour', uz: 'Oʻzbekiston boʻylab katta sayohat' },
      route: { ru: 'Ташкент – Самарканд – Бухара – Хива', en: 'Tashkent – Samarkand – Bukhara – Khiva', uz: 'Toshkent – Samarqand – Buxoro – Xiva' },
      shortDescription: {
        ru: 'Классический маршрут по четырём главным городам Великого шёлкового пути.',
        en: 'The classic route through the four main cities of the Great Silk Road.',
        uz: 'Buyuk ipak yoʻlining toʻrtta asosiy shahri boʻylab klassik marshrut.',
      },
      includes: ['accommodation', 'transport', 'guide', 'meals', 'train_tickets', 'entrance_tickets'],
      price: 890,
      days: 8,
      nights: 7,
      slug: 'uzbekistan-grand-tour',
      images: [],
      discounts: [
        {
          type: 'early_booking',
          description: { ru: 'Скидка за раннее бронирование', en: 'Early booking discount', uz: 'Erta bron qilish chegirmasi' },
          amount: 15,
          validUntil: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
        },
      ],
    },
  ];

  // create() -> запускает pre('save') хук для slug/валидации
  const tours = await Tour.create(toursData);
  console.log(`🧳 Туры: ${tours.length}`);

  // ---------- Новости ----------
  const newsData = [
    {
      title: { ru: 'Открыт новый сезон туров 2026', en: 'New 2026 tour season is open', uz: '2026 sayohat mavsumi ochildi' },
      content: {
        ru: 'Мы рады представить обновлённые маршруты и специальные предложения на новый туристический сезон. Бронируйте заранее и получайте лучшие цены!',
        en: 'We are glad to present updated routes and special offers for the new travel season. Book in advance and get the best prices!',
        uz: 'Yangi sayohat mavsumi uchun yangilangan marshrutlar va maxsus takliflarni taqdim etamiz. Oldindan bron qiling va eng yaxshi narxlarni oling!',
      },
      slug: 'new-2026-tour-season-is-open',
      image: '',
    },
    {
      title: { ru: 'Скоростные поезда Афросиаб', en: 'Afrosiyob high-speed trains', uz: 'Afrosiyob tezyurar poyezdlari' },
      content: {
        ru: 'Теперь между Ташкентом, Самаркандом и Бухарой курсируют комфортабельные скоростные поезда, что делает путешествия ещё удобнее.',
        en: 'Comfortable high-speed trains now run between Tashkent, Samarkand and Bukhara, making travel even more convenient.',
        uz: 'Endi Toshkent, Samarqand va Buxoro oʻrtasida qulay tezyurar poyezdlar qatnaydi, bu sayohatni yanada qulay qiladi.',
      },
      slug: 'afrosiyob-high-speed-trains',
      image: '',
    },
    {
      title: { ru: 'Фестиваль шёлка и специй в Бухаре', en: 'Silk and Spices Festival in Bukhara', uz: 'Buxoroda ipak va ziravorlar festivali' },
      content: {
        ru: 'Ежегодный фестиваль соберёт ремесленников, музыкантов и гостей со всего мира. Не пропустите яркое событие!',
        en: 'The annual festival brings together craftsmen, musicians and guests from all over the world. Do not miss this vibrant event!',
        uz: 'Anʼanaviy festival butun dunyodan hunarmandlar, musiqachilar va mehmonlarni jamlaydi. Ushbu yorqin tadbirni oʻtkazib yubormang!',
      },
      slug: 'silk-and-spices-festival-in-bukhara',
      image: '',
    },
    {
      title: { ru: 'Безвизовый режим для новых стран', en: 'Visa-free regime for new countries', uz: 'Yangi davlatlar uchun vizasiz rejim' },
      content: {
        ru: 'Узбекистан расширил список стран с безвизовым въездом, что делает поездку ещё проще для путешественников.',
        en: 'Uzbekistan has expanded the list of visa-free countries, making the trip even easier for travellers.',
        uz: 'Oʻzbekiston vizasiz kirish mumkin boʻlgan davlatlar roʻyxatini kengaytirdi, bu sayohatchilar uchun sayohatni yanada osonlashtiradi.',
      },
      slug: 'visa-free-regime-for-new-countries',
      image: '',
    },
  ];

  const news = await News.create(newsData);
  console.log(`📰 Новости: ${news.length}`);

  // ---------- FAQ ----------
  const faqData = [
    {
      question: { ru: 'Нужна ли виза для въезда в Узбекистан?', en: 'Do I need a visa to enter Uzbekistan?', uz: 'Oʻzbekistonga kirish uchun viza kerakmi?' },
      answer: {
        ru: 'Граждане многих стран могут въезжать без визы на срок до 30 дней. Уточняйте актуальные правила для вашей страны.',
        en: 'Citizens of many countries can enter visa-free for up to 30 days. Please check the current rules for your country.',
        uz: 'Koʻplab davlatlar fuqarolari 30 kungacha vizasiz kirishlari mumkin. Oʻz davlatingiz uchun amaldagi qoidalarni tekshiring.',
      },
    },
    {
      question: { ru: 'Какая валюта используется в стране?', en: 'What currency is used in the country?', uz: 'Mamlakatda qanday valyuta ishlatiladi?' },
      answer: {
        ru: 'Национальная валюта — узбекский сум (UZS). Обмен доступен в банках и обменных пунктах.',
        en: 'The national currency is the Uzbek som (UZS). Exchange is available at banks and exchange offices.',
        uz: 'Milliy valyuta — oʻzbek soʻmi (UZS). Ayirboshlash banklar va ayirboshlash shoxobchalarida mavjud.',
      },
    },
    {
      question: { ru: 'Как оплатить тур?', en: 'How can I pay for a tour?', uz: 'Sayohat uchun qanday toʻlov qilaman?' },
      answer: {
        ru: 'Оплата возможна наличными, банковской картой или переводом. Детали уточняйте у менеджера.',
        en: 'Payment is possible in cash, by bank card or transfer. Please check the details with the manager.',
        uz: 'Toʻlov naqd pul, bank kartasi yoki oʻtkazma orqali amalga oshiriladi. Tafsilotlarni menejerdan soʻrang.',
      },
    },
    {
      question: { ru: 'Можно ли изменить или отменить бронирование?', en: 'Can I change or cancel a booking?', uz: 'Bronni oʻzgartirish yoki bekor qilish mumkinmi?' },
      answer: {
        ru: 'Да, условия изменения и отмены зависят от тарифа. Свяжитесь с нами для уточнения.',
        en: 'Yes, the change and cancellation conditions depend on the tariff. Contact us for details.',
        uz: 'Ha, oʻzgartirish va bekor qilish shartlari tarifga bogʻliq. Tafsilotlar uchun biz bilan bogʻlaning.',
      },
    },
  ];

  const faqs = await Faq.insertMany(faqData);
  console.log(`❓ FAQ: ${faqs.length}`);

  // ---------- Баннеры ----------
  const bannerData = [
    {
      title: { ru: 'Откройте для себя Узбекистан', en: 'Discover Uzbekistan', uz: 'Oʻzbekistonni kashf eting' },
      subtitle: {
        ru: 'Незабываемые путешествия по Великому шёлковому пути',
        en: 'Unforgettable journeys along the Great Silk Road',
        uz: 'Buyuk ipak yoʻli boʻylab unutilmas sayohatlar',
      },
      cta: { ru: 'Подробнее', en: 'Learn more', uz: 'Batafsil' },
      isActive: true,
      image: 'sample-banner-1.jpg',
    },
    {
      title: { ru: 'Раннее бронирование 2026', en: 'Early Booking 2026', uz: 'Erta bron qilish 2026' },
      subtitle: {
        ru: 'Скидки до 15% при бронировании заранее',
        en: 'Up to 15% off when you book in advance',
        uz: 'Oldindan bron qilganda 15% gacha chegirma',
      },
      cta: { ru: 'Смотреть туры', en: 'View tours', uz: 'Sayohatlarni koʻrish' },
      isActive: true,
      image: 'sample-banner-2.jpg',
    },
  ];

  const banners = await Banner.insertMany(bannerData);
  console.log(`🖼️  Баннеры: ${banners.length}`);

  console.log('\n🎉 Готово! Sample-данные загружены.');
  await mongoose.disconnect();
  process.exit(0);
};

run().catch(async (err) => {
  console.error('❌ Ошибка сидирования:', err);
  try { await mongoose.disconnect(); } catch (_) {}
  process.exit(1);
});
