import { Noto_Sans_Devanagari, Inter } from 'next/font/google';
import './globals.css';
import ClientProviders from '@/components/ClientProviders';

const notoSans = Noto_Sans_Devanagari({
  subsets: ['devanagari', 'latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-noto',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata = {
  title: 'मनोकामना ट्रेडिंग कम्पनी | Panther ई-रिक्शा & बैटरी शॉप',
  description:
    'बृजमनगंज, शाहाबाद में Panther ई-रिक्शा, ई-स्कूटर, बैटरी, इन्वर्टर और स्पेयर पार्ट्स की बिक्री, मरम्मत और वारंटी सेवा। मालिक: आशीष जायसवाल। फ़ोन: 8299200015',
  keywords: [
    'ई-रिक्शा',
    'Panther E-Rickshaw',
    'बैटरी शॉप',
    'बृजमनगंज',
    'शाहाबाद',
    'मनोकामना ट्रेडिंग',
    'स्पेयर पार्ट्स',
    'ई-रिक्शा मरम्मत',
  ],
  openGraph: {
    title: 'मनोकामना ट्रेडिंग कम्पनी',
    description: 'Panther ई-रिक्शा & ई-स्कूटर | द बैटरी शॉप - बृजमनगंज, शाहाबाद',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="hi" className={`${notoSans.variable} ${inter.variable}`} suppressHydrationWarning>
      <body className="min-h-screen flex flex-col antialiased">
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
