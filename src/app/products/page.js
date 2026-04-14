'use client';
import { useLanguage } from '@/context/LanguageContext';
import ProductCard from '@/components/ProductCard';

const productCategories = [
  {
    key: 'eRickshaw',
    images: [
      '/images/shop/e-rickshaws.jpeg',
      '/images/shop/e-rickshaw-side-view.jpeg',
      '/images/shop/e-rickshaws-row.jpeg',
      '/images/shop/e-rickshaw-half-assembled.jpeg',
      '/images/shop/e-rickshaws-unassembled.jpeg',
      '/images/shop/e-rickshaw-assembly-side.jpeg',
    ],
  },
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
    images: [
      '/images/shop/spare-parts-bearings.jpeg',
      '/images/shop/spare-parts-small.jpeg',
      '/images/shop/spare-parts-e-rickshaw.jpeg',
    ],
  },
  {
    key: 'tires',
    images: ['/images/shop/batteries-tires.jpeg'],
  },
  {
    key: 'tools',
    images: [
      '/images/shop/repair-tools.jpeg',
      '/images/shop/tools-and-spares.jpeg',
    ],
  },
];

export default function ProductsPage() {
  const { t } = useLanguage();

  return (
    <div className="pb-16 md:pb-0">
      {/* Header */}
      <section className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-slate-900 dark:to-slate-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
            {t('products.title')}
          </h1>
          <p className="mt-3 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {t('hero.description')}
          </p>
          <div className="mt-3 w-16 h-1 bg-primary mx-auto rounded-full" />
        </div>
      </section>

      {/* Product Categories */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        {productCategories.map((category) => (
          <section key={category.key} id={category.key}>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <div className="w-1.5 h-7 bg-primary rounded-full" />
              {t(`products.${category.key}.title`)}
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.images.map((img, i) => (
                <ProductCard
                  key={`${category.key}-${i}`}
                  image={img}
                  title={
                    category.images.length > 1
                      ? `${t(`products.${category.key}.title`)} - ${i + 1}`
                      : t(`products.${category.key}.title`)
                  }
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
          <p className="mb-6 text-green-100">
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
