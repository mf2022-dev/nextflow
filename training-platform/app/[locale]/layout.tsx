import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';
import '../globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { GoogleAnalytics } from '@/components/GoogleAnalytics';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'BioNXA Academy - AI-Powered Bioinformatics Learning Platform',
  description: 'Master bioinformatics, biotechnology, and Linux with AI-powered interactive tutorials. Learn RNA-seq, genomics, and computational biology in English and Arabic.',
  keywords: 'bioinformatics, biotechnology, AI learning, Linux, RNA-seq, genomics, Saudi Arabia, computational biology',
  authors: [{ name: 'BioNXA Academy' }],
  openGraph: {
    title: 'BioNXA Academy - AI-Powered Bioinformatics Learning',
    description: 'Master bioinformatics with AI-powered interactive tutorials',
    type: 'website',
    locale: 'en_US',
    alternateLocale: 'ar_SA',
  },
};

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: {locale: string};
}) {
  const {locale} = params;
  
  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages({locale});

  const direction = locale === 'ar' ? 'rtl' : 'ltr';

  return (
    <html lang={locale} dir={direction}>
      <body className={inter.className}>
        <GoogleAnalytics />
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
