'use client';
import { useLanguage } from '@/context/LanguageContext';
import ProductCard from '@/components/ProductCard';

const eRickshawCards = [
  {
    image: '/images/shop/panther-e-rickshaw-shop-display.jpeg',
    titleHi: 'Panther ई-रिक्शा - शोरूम डिस्प्ले',
    titleEn: 'Panther E-Rickshaw - Showroom Display',
    descHi: 'दुकान पर उपलब्ध तैयार Panther ई-रिक्शा, ब्रांडेड बॉडी और मज़बूत SS गार्ड के साथ। तुरंत खरीदें।',
    descEn: 'Ready-to-buy Panther E-Rickshaw at our shop, with branded body and sturdy SS guard. Buy instantly.',
  },
  {
    image: '/images/shop/panther-e-rickshaw-passenger-view.jpeg',
    titleHi: 'Panther ई-रिक्शा - पैसेंजर सीटिंग',
    titleEn: 'Panther E-Rickshaw - Passenger Seating',
    descHi: 'आरामदायक पैसेंजर सीटिंग, मज़बूत छत और स्पेशियस डिज़ाइन। सवारियों के लिए बेहतरीन आराम।',
    descEn: 'Comfortable passenger seating, sturdy roof, and spacious design. Best comfort for riders.',
  },
  {
    image: '/images/shop/panther-e-rickshaw-new-stock-colors.jpeg',
    titleHi: 'Panther ई-रिक्शा - नया स्टॉक (रंगों में)',
    titleEn: 'Panther E-Rickshaw - New Stock (Multiple Colors)',
    descHi: 'लाल, नीला, हरा - कई रंगों में नए Panther ई-रिक्शा का ताज़ा स्टॉक। अपनी पसंद चुनें।',
    descEn: 'Red, blue, green - fresh stock of new Panther E-Rickshaws in multiple colors. Choose your favorite.',
  },
  {
    image: '/images/shop/panther-e-rickshaw-full-assembly.jpeg',
    titleHi: 'Panther ई-रिक्शा - कस्टम असेम्बली',
    titleEn: 'Panther E-Rickshaw - Custom Assembly',
    descHi: 'आपकी ज़रूरत के अनुसार ई-रिक्शा की पूरी असेम्बली और कस्टमाइज़ेशन। हमारे अनुभवी तकनीशियन करते हैं।',
    descEn: 'Complete E-Rickshaw assembly and customization as per your needs. Done by our experienced technicians.',
  },
];

const otherCategories = [
  {
    key: 'battery',
    images: ['/images/shop/batteries-tires.jpeg'],
  },
  {
    key: 'inverter',
    images: ['/images/shop/inverter-rods-carpets.jpeg'],
  },
  {
    key: 'spareParts',
    cards: [
      {
        image: '/images/shop/spare-parts-bearings.jpeg',
        titleHi: 'बियरिंग और गियर',
        titleEn: 'Bearings & Gears',
        descHi: 'BBT, Gold और अन्य ब्रांड्स की बियरिंग, गियर और ऑयल सील। सभी साइज़ उपलब्ध।',
        descEn: 'BBT, Gold and other brand bearings, gears and oil seals. All sizes available.',
      },
      {
        image: '/images/shop/spare-parts-small.jpeg',
        titleHi: 'इलेक्ट्रिकल पार्ट्स',
        titleEn: 'Electrical Parts',
        descHi: 'DC-DC कनवर्टर, स्पीडोमीटर, ब्रेक शू, DRL लैंप, हेडलाइट और अन्य पार्ट्स।',
        descEn: 'DC-DC converters, speedometers, brake shoes, DRL lamps, headlights and more.',
      },
      {
        image: '/images/shop/spare-parts-e-rickshaw.jpeg',
        titleHi: 'ई-रिक्शा बॉडी पार्ट्स',
        titleEn: 'E-Rickshaw Body Parts',
        descHi: 'ई-रिक्शा के लिए बॉडी पैनल, गार्ड, छत, सीट और अन्य बॉडी पार्ट्स।',
        descEn: 'Body panels, guards, roof, seats and other body parts for E-Rickshaws.',
      },
    ],
  },
  {
    key: 'tires',
    images: ['/images/shop/batteries-tires.jpeg'],
  },
  {
    key: 'tools',
    cards: [
      {
        image: '/images/shop/repair-tools.jpeg',
        titleHi: 'मरम्मत टूल्स',
        titleEn: 'Repair Tools',
        descHi: 'ई-रिक्शा की मरम्मत के लिए सभी प्रकार के प्रोफेशनल टूल्स और उपकरण।',
        descEn: 'All types of professional tools and equipment for E-Rickshaw repair.',
      },
      {
        image: '/images/shop/tools-and-spares.jpeg',
        titleHi: 'चार्जर और एक्सेसरीज़',
        titleEn: 'Chargers & Accessories',
        descHi: 'बैटरी चार्जर, DRL लैंप, हेडलाइट बल्ब और अन्य एक्सेसरीज़।',
        descEn: 'Battery chargers, DRL lamps, headlight bulbs and other accessories.',
      },
    ],
  },
];

export default function ProductsPage() {
  const { t, lang } = useLanguage();

  return (
    <div className="pb-16 md:pb-0">
      {/* Header */}
      <section className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-slate-900 dark:to-slate-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
            {t('products.title')}
          </h1>
          <p className="mt-3 text-base text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {t('hero.description')}
          </p>
          <div className="mt-3 w-16 h-1 bg-primary mx-auto rounded-full" />
        </div>
      </section>

      {/* E-Rickshaw Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        <section id="eRickshaw">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <div className="w-1.5 h-7 bg-primary rounded-full" />
            {t('products.eRickshaw.title')}
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6">
            {eRickshawCards.map((card, i) => (
              <ProductCard
                key={`erickshaw-${i}`}
                image={card.image}
                title={lang === 'hi' ? card.titleHi : card.titleEn}
                description={lang === 'hi' ? card.descHi : card.descEn}
                alt={lang === 'hi' ? card.titleHi : card.titleEn}
              />
            ))}
          </div>
        </section>

        {/* Other Categories */}
        {otherCategories.map((category) => (
          <section key={category.key} id={category.key}>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <div className="w-1.5 h-7 bg-primary rounded-full" />
              {t(`products.${category.key}.title`)}
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.cards
                ? category.cards.map((card, i) => (
                    <ProductCard
                      key={`${category.key}-${i}`}
                      image={card.image}
                      title={lang === 'hi' ? card.titleHi : card.titleEn}
                      description={lang === 'hi' ? card.descHi : card.descEn}
                      alt={lang === 'hi' ? card.titleHi : card.titleEn}
                    />
                  ))
                : category.images.map((img, i) => (
                    <ProductCard
                      key={`${category.key}-${i}`}
                      image={img}
                      title={t(`products.${category.key}.title`)}
                      description={t(`products.${category.key}.description`)}
                      alt={t(`products.${category.key}.title`)}
                    />
                  ))}
            </div>
          </section>
        ))}
      </div>

      {/* CTA */}
      <section className="bg-primary py-12">
        <div className="max-w-3xl mx-auto px-4 text-center text-white">
          <h2 className="text-2xl font-bold mb-3">{t('products.callForPrice')}</h2>
          <p className="mb-6 text-base text-green-100">
            {t('hero.description')}
          </p>
          <a
            href="tel:8299200015"
            className="inline-flex items-center gap-2 px-8 py-3 bg-white text-primary font-bold rounded-xl hover:bg-gray-100 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            {t('common.callNow')} - 8299200015
          </a>
        </div>
      </section>
    </div>
  );
}
