'use client';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';

export default function AboutPage() {
  const { t } = useLanguage();

  return (
    <div className="pb-16 md:pb-0">
      {/* Header */}
      <section className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-slate-900 dark:to-slate-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
            {t('about.title')}
          </h1>
          <div className="mt-3 w-16 h-1 bg-primary mx-auto rounded-full" />
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Owner Section */}
        <div className="grid md:grid-cols-2 gap-10 items-center mb-16">
          <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-[4/5] max-h-[520px]">
            <Image
              src="/images/inauguration/ashish-with-brother-2.jpeg"
              alt="आशीष जायसवाल - मालिक"
              fill
              className="object-cover object-top"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div>
            <p className="text-base text-primary font-semibold mb-2">{t('about.ownerTitle')}</p>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {t('about.ownerName')}
            </h2>
            <p className="text-sm text-primary font-medium mb-4">
              {t('about.ownerDesignation')}
            </p>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
              {t('about.story')}
            </p>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
              {t('about.mission')}
            </p>
            <a
              href="tel:8299200015"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary-dark transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              {t('common.callNow')} - 8299200015
            </a>
          </div>
        </div>

        {/* Values */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            {t('about.values.title')}
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {['quality', 'service', 'trust', 'price'].map((v) => {
              const icons = {
                quality: (
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                ),
                service: (
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                  </svg>
                ),
                trust: (
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                ),
                price: (
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
              };
              return (
                <div
                  key={v}
                  className="flex flex-col items-center text-center p-6 rounded-xl bg-gray-50 dark:bg-slate-800"
                >
                  <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-3">
                    {icons[v]}
                  </div>
                  <p className="text-base font-semibold text-gray-900 dark:text-white">
                    {t(`about.values.${v}`)}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Inauguration Photos */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            {t('gallery.inaugurationTab')}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {[
              '/images/inauguration/pooja-ceremony.jpeg',
              '/images/inauguration/e-rickshaw-key-handover.jpeg',
              '/images/inauguration/giving-goodies-to-people.jpeg',
              '/images/inauguration/inauguration-day-crowd.jpeg',
              '/images/inauguration/ashish-with-brother-1.jpeg',
              '/images/inauguration/on-the-way-to-inaugurate.jpeg',
            ].map((src, i) => (
              <div key={i} className="relative aspect-[4/3] rounded-xl overflow-hidden">
                <Image
                  src={src}
                  alt={`उद्घाटन फोटो ${i + 1}`}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
