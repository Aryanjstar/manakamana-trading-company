'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import HeroSection from '@/components/HeroSection';
import StatsSection from '@/components/StatsSection';
import ServiceCard from '@/components/ServiceCard';
import ProductCard from '@/components/ProductCard';

const serviceIcons = {
  sale: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
    </svg>
  ),
  repair: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  warranty: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  ),
  assembly: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
    </svg>
  ),
};

const featuredProducts = [
  { key: 'eRickshaw', image: '/images/shop/panther-e-rickshaw-shop-display.jpeg' },
  { key: 'battery', image: '/images/shop/batteries-tires.jpeg' },
  { key: 'spareParts', image: '/images/shop/spare-parts-bearings.jpeg' },
];

export default function Home() {
  const { t, lang } = useLanguage();
  const waGeneral = encodeURIComponent('नमस्ते, मुझे मनोकामना ट्रेडिंग कम्पनी से जानकारी चाहिए।');

  return (
    <div className="pb-16 md:pb-0">
      <HeroSection />
      <StatsSection />

      {/* AI Chatbot & Voice Assistant Promo */}
      <section className="py-6 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-2xl bg-gradient-to-r from-emerald-600 to-green-600 dark:from-emerald-800 dark:to-green-800 px-5 py-5 sm:px-8 sm:py-6 overflow-hidden">
            <div className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 opacity-[0.08]">
              <svg className="w-28 h-28 sm:w-36 sm:h-36" viewBox="0 0 100 100" fill="none">
                <path d="M25 45c0-15 12-27 27-27s27 12 27 27c0 10-4 17-9 21l1.5 15-10-7a27 27 0 01-9.5 1.7c-15 0-27-12-27-27z" stroke="white" strokeWidth="2.5"/>
                <circle cx="40" cy="42" r="2.5" fill="white"/><circle cx="52" cy="42" r="2.5" fill="white"/><circle cx="64" cy="42" r="2.5" fill="white"/>
                <path d="M48 16l4-7 4 7" stroke="white" strokeWidth="2" strokeLinecap="round"/><circle cx="52" cy="7" r="2.5" fill="white"/>
              </svg>
            </div>
            <div className="relative flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center shrink-0 hidden sm:flex">
                <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                  <path d="M8 12h.01M12 12h.01M16 12h.01"/>
                </svg>
              </div>
              <div className="flex-1 text-white min-w-0">
                <h3 className="text-lg sm:text-xl font-bold mb-1">
                  {lang === 'hi' ? '🙏 नमस्ते! AI सहायक से बात करें' : '🙏 Namaste! Talk to our AI Assistant'}
                </h3>
                <p className="text-green-100 text-sm sm:text-base leading-relaxed">
                  {lang === 'hi'
                    ? 'हिंदी, अंग्रेज़ी या हिंग्लिश में पूछें - उत्पाद, कीमत, सेवाएं, कुछ भी!'
                    : 'Ask in Hindi, English or Hinglish - products, prices, services, anything!'}
                </p>
              </div>
              <div className="flex gap-2 shrink-0">
                <button
                  onClick={() => window.dispatchEvent(new Event('open-chatbot'))}
                  className="flex items-center gap-2 bg-white text-emerald-700 font-semibold px-4 py-2.5 rounded-xl hover:bg-green-50 transition-colors text-sm"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                  {lang === 'hi' ? 'चैट करें' : 'Chat'}
                </button>
                <button
                  onClick={() => window.dispatchEvent(new Event('open-chatbot-voice'))}
                  className="flex items-center gap-2 bg-white/20 text-white font-semibold px-4 py-2.5 rounded-xl hover:bg-white/30 transition-colors text-sm border border-white/30"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg>
                  {lang === 'hi' ? 'बोलकर पूछें' : 'Speak'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-gray-50 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              {t('services.title')}
            </h2>
            <div className="mt-2 w-16 h-1 bg-primary mx-auto rounded-full" />
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {['sale', 'repair', 'warranty', 'assembly'].map((key) => (
              <ServiceCard
                key={key}
                icon={serviceIcons[key]}
                title={t(`services.${key}.title`)}
                description={t(`services.${key}.description`)}
              />
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              href="/services"
              className="inline-flex items-center gap-1 text-primary font-semibold hover:text-primary-dark transition-colors"
            >
              {t('common.learnMore')}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Shop Inside Showcase */}
      <section className="py-12 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { src: '/images/shop/shop-inside.jpeg', alt: 'दुकान के अंदर' },
              { src: '/images/shop/shop-front-zoomed.jpeg', alt: 'दुकान का बोर्ड' },
              { src: '/images/shop/shop-side-zoomed.jpeg', alt: 'दुकान साइड व्यू' },
              { src: '/images/shop/shop-wall-inside.jpeg', alt: 'दुकान की दीवार' },
            ].map((img, i) => (
              <div key={i} className="relative aspect-[4/3] rounded-xl overflow-hidden group">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              {t('products.title')}
            </h2>
            <div className="mt-2 w-16 h-1 bg-primary mx-auto rounded-full" />
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.key}
                image={product.image}
                title={t(`products.${product.key}.title`)}
                description={t(`products.${product.key}.description`)}
                alt={t(`products.${product.key}.title`)}
              />
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary-dark transition-colors"
            >
              {t('common.viewAll')}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              {lang === 'hi' ? 'हमें क्यों चुनें?' : 'Why Choose Us?'}
            </h2>
            <div className="mt-2 w-16 h-1 bg-primary mx-auto rounded-full" />
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
                titleHi: 'Panther अधिकृत वितरक',
                titleEn: 'Panther Authorized Dealer',
                descHi: 'हम Panther ई-रिक्शा और ई-स्कूटर के अधिकृत वितरक हैं। आपको मिलेगी 100% असली प्रोडक्ट की गारंटी।',
                descEn: 'We are authorized distributors of Panther E-Rickshaws and E-Scooters. You get 100% genuine product guarantee.',
              },
              {
                icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
                titleHi: 'सबसे अच्छी कीमत',
                titleEn: 'Best Prices',
                descHi: 'सीधे फैक्ट्री से उत्पाद आने के कारण आपको मिलेगी बाज़ार में सबसे अच्छी और उचित कीमत।',
                descEn: 'Direct factory supply ensures you get the best and most fair prices in the market.',
              },
              {
                icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>,
                titleHi: 'अनुभवी तकनीशियन',
                titleEn: 'Experienced Technicians',
                descHi: 'हमारी टीम में अनुभवी तकनीशियन हैं जो हर प्रकार की मरम्मत और असेम्बली का काम करते हैं।',
                descEn: 'Our team of experienced technicians handles all types of repair and assembly work.',
              },
              {
                icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>,
                titleHi: 'सभी स्पेयर पार्ट्स एक जगह',
                titleEn: 'All Spare Parts Under One Roof',
                descHi: 'बियरिंग, गियर, ब्रेक शू, बैटरी, टायर, हेडलाइट - सब कुछ एक ही दुकान पर उपलब्ध।',
                descEn: 'Bearings, gears, brake shoes, batteries, tires, headlights - everything available at one shop.',
              },
              {
                icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
                titleHi: '13+ महीने की गारंटी',
                titleEn: '13+ Months Warranty',
                descHi: 'Eastman Wattsman बैटरी पर 36 महीने तक और अन्य उत्पादों पर 13+ महीने की गारंटी।',
                descEn: 'Up to 36 months warranty on Eastman Wattsman batteries and 13+ months on other products.',
              },
              {
                icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
                titleHi: 'ई-वाहन - स्वच्छ भविष्य',
                titleEn: 'E-Vehicles - Clean Future',
                descHi: 'ई-रिक्शा और ई-स्कूटर से प्रदूषण कम, ईंधन खर्च कम, और कमाई ज़्यादा। पर्यावरण और जेब दोनों का ध्यान।',
                descEn: 'E-Rickshaws and E-Scooters mean less pollution, lower fuel costs, and higher earnings. Good for environment and pocket.',
              },
            ].map((item, i) => (
              <div key={i} className="p-6 rounded-xl bg-gray-50 dark:bg-slate-800 border border-gray-100 dark:border-slate-700 hover:shadow-lg transition-all">
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-4">
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                  {lang === 'hi' ? item.titleHi : item.titleEn}
                </h3>
                <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                  {lang === 'hi' ? item.descHi : item.descEn}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brands We Deal In */}
      <section className="py-12 bg-gray-50 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              {lang === 'hi' ? 'हमारे ब्रांड्स' : 'Brands We Deal In'}
            </h2>
            <div className="mt-2 w-16 h-1 bg-primary mx-auto rounded-full" />
          </div>
          <div className="flex flex-wrap justify-center gap-6 sm:gap-10">
            {['Panther', 'Eastman Wattsman', 'BBT Bearings', 'Gold Bearings', 'RNF Gear', 'Loder Brake', 'P4U'].map((brand) => (
              <div key={brand} className="px-5 py-3 bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 text-base font-semibold text-gray-700 dark:text-gray-300 shadow-sm">
                {brand}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Inauguration Gallery Preview */}
      <section className="py-16 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              {t('gallery.title')}
            </h2>
            <div className="mt-2 w-16 h-1 bg-primary mx-auto rounded-full" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              '/images/inauguration/pooja-ceremony.jpeg',
              '/images/inauguration/e-rickshaw-key-handover.jpeg',
              '/images/inauguration/owner-ashish-jaiswal.jpeg',
              '/images/inauguration/inauguration-day-crowd.jpeg',
            ].map((src, i) => (
              <div key={i} className="relative aspect-square rounded-xl overflow-hidden group">
                <Image
                  src={src}
                  alt={`उद्घाटन फोटो ${i + 1}`}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              href="/gallery"
              className="inline-flex items-center gap-1 text-primary font-semibold hover:text-primary-dark transition-colors"
            >
              {t('common.viewAll')}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Contact & Support Section */}
      <section className="py-16 bg-gray-50 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              {t('contact.title')}
            </h2>
            <p className="mt-2 text-base text-gray-600 dark:text-gray-400">
              {lang === 'hi' ? 'कोई भी सवाल हो, हमसे संपर्क करें' : 'Have any questions? Get in touch with us'}
            </p>
            <div className="mt-2 w-16 h-1 bg-primary mx-auto rounded-full" />
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <a href="tel:8299200015" className="flex items-center gap-4 p-5 rounded-xl bg-white dark:bg-slate-800 hover:shadow-md transition-all group">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors shrink-0">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <p className="text-base text-gray-500 dark:text-gray-400">{t('contact.phone')}</p>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">8299200015</p>
                </div>
              </a>

              <a href={`https://wa.me/918299200015?text=${waGeneral}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-5 rounded-xl bg-white dark:bg-slate-800 hover:shadow-md transition-all group">
                <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center text-green-600 group-hover:bg-green-500 group-hover:text-white transition-colors shrink-0">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </div>
                <div>
                  <p className="text-base text-gray-500 dark:text-gray-400">WhatsApp</p>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">{t('contact.whatsapp')}</p>
                </div>
              </a>

              <a href="mailto:aryanjstar3@gmail.com" className="flex items-center gap-4 p-5 rounded-xl bg-white dark:bg-slate-800 hover:shadow-md transition-all group">
                <div className="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center text-blue-600 group-hover:bg-blue-500 group-hover:text-white transition-colors shrink-0">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-base text-gray-500 dark:text-gray-400">{t('contact.email')}</p>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">aryanjstar3@gmail.com</p>
                </div>
              </a>

              <div className="flex items-start gap-4 p-5 rounded-xl bg-white dark:bg-slate-800">
                <div className="w-12 h-12 bg-red-500/10 rounded-full flex items-center justify-center text-red-500 shrink-0">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-base text-gray-500 dark:text-gray-400">{t('contact.address')}</p>
                  <p className="text-base font-semibold text-gray-900 dark:text-white">{t('contact.addressText')}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{t('contact.landmarkText')}</p>
                </div>
              </div>
            </div>

            <div className="rounded-xl overflow-hidden shadow-lg border border-gray-200 dark:border-slate-700 h-[300px] sm:h-full min-h-[300px]">
              <iframe
                src={`https://maps.google.com/maps?q=27.19884,83.19365&z=18&t=m&output=embed`}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="मनोकामना ट्रेडिंग कम्पनी - शाहाबाद, बृजमनगंज"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-primary py-10">
        <div className="max-w-4xl mx-auto px-4 text-center text-white">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">
            {lang === 'hi' ? 'आज ही संपर्क करें!' : 'Contact Us Today!'}
          </h2>
          <p className="text-green-100 mb-6 text-base">
            {lang === 'hi'
              ? 'ई-रिक्शा, बैटरी, स्पेयर पार्ट्स या मरम्मत - किसी भी ज़रूरत के लिए अभी कॉल करें'
              : 'E-Rickshaw, Battery, Spare Parts or Repair - Call now for any requirement'}
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href="tel:8299200015"
              className="inline-flex items-center gap-2 px-8 py-3 bg-white text-primary font-bold rounded-xl hover:bg-gray-100 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              {t('common.callNow')} - 8299200015
            </a>
            <a
              href={`https://wa.me/918299200015?text=${waGeneral}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3 border-2 border-white text-white font-bold rounded-xl hover:bg-white hover:text-primary transition-colors"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
