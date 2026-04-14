'use client';
import { LanguageProvider } from '@/context/LanguageContext';
import { ThemeProvider } from '@/context/ThemeContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Chatbot from '@/components/Chatbot';
import PhoneCTA from '@/components/PhoneCTA';
import WhatsAppButton from '@/components/WhatsAppButton';

export default function ClientProviders({ children }) {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <Chatbot />
        <PhoneCTA />
        <WhatsAppButton />
      </LanguageProvider>
    </ThemeProvider>
  );
}
