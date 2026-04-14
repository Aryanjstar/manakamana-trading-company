'use client';
import { useLanguage } from '@/context/LanguageContext';

export default function PhoneCTA() {
  const { t } = useLanguage();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-primary shadow-[0_-4px_12px_rgba(0,0,0,0.15)]">
      <a
        href="tel:8299200015"
        className="flex items-center justify-center gap-2 py-3 text-white font-semibold text-base"
      >
        <svg className="w-5 h-5 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
        {t('common.callNow')} - 8299200015
      </a>
    </div>
  );
}
