'use client';
import { useState } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';

const shopImages = [
  { src: '/images/shop/shop-front.jpeg', alt: 'दुकान का सामने का दृश्य' },
  { src: '/images/shop/shop-front-zoomed.jpeg', alt: 'दुकान ज़ूम दृश्य' },
  { src: '/images/shop/shop-inside.jpeg', alt: 'दुकान के अंदर' },
  { src: '/images/shop/shop-inside-to-outer.jpeg', alt: 'अंदर से बाहर का दृश्य' },
  { src: '/images/shop/shop-side-zoomed.jpeg', alt: 'दुकान साइड दृश्य' },
  { src: '/images/shop/shop-wall-inside.jpeg', alt: 'दुकान की दीवार' },
  { src: '/images/shop/e-rickshaws.jpeg', alt: 'ई-रिक्शा' },
  { src: '/images/shop/e-rickshaw-side-view.jpeg', alt: 'ई-रिक्शा साइड दृश्य' },
  { src: '/images/shop/e-rickshaws-row.jpeg', alt: 'ई-रिक्शा की कतार' },
  { src: '/images/shop/e-rickshaw-half-assembled.jpeg', alt: 'आधा असेम्बल्ड ई-रिक्शा' },
  { src: '/images/shop/e-rickshaw-assembly-side.jpeg', alt: 'ई-रिक्शा असेम्बली' },
  { src: '/images/shop/e-rickshaws-unassembled.jpeg', alt: 'बिना असेम्बल ई-रिक्शा' },
  { src: '/images/shop/batteries-tires.jpeg', alt: 'बैटरी और टायर' },
  { src: '/images/shop/inverter-rods-carpets.jpeg', alt: 'इन्वर्टर और सामान' },
  { src: '/images/shop/spare-parts-bearings.jpeg', alt: 'बियरिंग और स्पेयर पार्ट्स' },
  { src: '/images/shop/spare-parts-small.jpeg', alt: 'छोटे स्पेयर पार्ट्स' },
  { src: '/images/shop/spare-parts-e-rickshaw.jpeg', alt: 'ई-रिक्शा स्पेयर पार्ट्स' },
  { src: '/images/shop/repair-tools.jpeg', alt: 'मरम्मत उपकरण' },
  { src: '/images/shop/tools-and-spares.jpeg', alt: 'टूल्स और स्पेयर' },
];

const inaugurationImages = [
  { src: '/images/inauguration/pooja-ceremony.jpeg', alt: 'पूजा समारोह' },
  { src: '/images/inauguration/owner-ashish-jaiswal.jpeg', alt: 'मालिक आशीष जायसवाल' },
  { src: '/images/inauguration/ashish-with-brother-1.jpeg', alt: 'आशीष भाई के साथ' },
  { src: '/images/inauguration/ashish-with-brother-2.jpeg', alt: 'आशीष भाई के साथ' },
  { src: '/images/inauguration/e-rickshaw-key-handover.jpeg', alt: 'ई-रिक्शा चाबी हस्तांतरण' },
  { src: '/images/inauguration/giving-goodies-to-priest.jpeg', alt: 'पुजारी को उपहार' },
  { src: '/images/inauguration/giving-goodies-to-people.jpeg', alt: 'लोगों को उपहार' },
  { src: '/images/inauguration/inauguration-day-crowd.jpeg', alt: 'उद्घाटन दिवस' },
  { src: '/images/inauguration/on-the-way-to-inaugurate.jpeg', alt: 'उद्घाटन की तैयारी' },
];

export default function GalleryGrid() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('shop');
  const [lightbox, setLightbox] = useState(null);

  const images = activeTab === 'shop' ? shopImages : inaugurationImages;

  return (
    <>
      {/* Tabs */}
      <div className="flex justify-center gap-2 mb-8">
        <button
          onClick={() => setActiveTab('shop')}
          className={`px-6 py-2.5 rounded-full font-semibold text-sm transition-colors ${
            activeTab === 'shop'
              ? 'bg-primary text-white'
              : 'bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-700'
          }`}
        >
          {t('gallery.shopTab')}
        </button>
        <button
          onClick={() => setActiveTab('inauguration')}
          className={`px-6 py-2.5 rounded-full font-semibold text-sm transition-colors ${
            activeTab === 'inauguration'
              ? 'bg-primary text-white'
              : 'bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-700'
          }`}
        >
          {t('gallery.inaugurationTab')}
        </button>
      </div>

      {/* Grid */}
      <div className="columns-2 md:columns-3 lg:columns-4 gap-3 space-y-3">
        {images.map((img, i) => (
          <div
            key={`${activeTab}-${i}`}
            className="break-inside-avoid cursor-pointer group rounded-xl overflow-hidden"
            onClick={() => setLightbox(img)}
          >
            <div className="relative">
              <Image
                src={img.src}
                alt={img.alt}
                width={400}
                height={300}
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                <svg className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            onClick={() => setLightbox(null)}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <Image
            src={lightbox.src}
            alt={lightbox.alt}
            width={1200}
            height={800}
            className="max-w-full max-h-[85vh] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}
