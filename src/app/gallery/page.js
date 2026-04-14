'use client';
import { useLanguage } from '@/context/LanguageContext';
import GalleryGrid from '@/components/GalleryGrid';

export default function GalleryPage() {
  const { t } = useLanguage();

  return (
    <div className="pb-16 md:pb-0">
      <section className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-slate-900 dark:to-slate-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
            {t('gallery.title')}
          </h1>
          <div className="mt-3 w-16 h-1 bg-primary mx-auto rounded-full" />
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <GalleryGrid />
      </div>
    </div>
  );
}
