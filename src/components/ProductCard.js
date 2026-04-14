'use client';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';

export default function ProductCard({ image, title, description, alt }) {
  const { t } = useLanguage();

  return (
    <div className="group rounded-xl overflow-hidden bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 hover:shadow-xl transition-all hover:-translate-y-1">
      <div className="relative h-48 sm:h-56 overflow-hidden">
        <Image
          src={image}
          alt={alt || title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>
      <div className="p-4">
        <h3 className="text-base font-bold text-gray-900 dark:text-white mb-1.5">{title}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-3">{description}</p>
        <a
          href="tel:8299200015"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary-dark transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          {t('products.callForPrice')}
        </a>
      </div>
    </div>
  );
}
