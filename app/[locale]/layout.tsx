import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';
import '../globals.css';
import type { Metadata } from 'next';
import { GoogleAnalytics } from '@/components/GoogleAnalytics';
import { ThemeProvider } from '@/components/ThemeProvider';

export const metadata: Metadata = {
  title: 'BioNXA — Master Bioinformatics, Your Way',
  description: 'The first AI-powered, interactive platform for computational biology. Learn bioinformatics, biotechnology, and Linux with real code and real feedback. In English and Arabic.',
  keywords: 'bioinformatics, biotechnology, AI learning, Linux, RNA-seq, genomics, Nextflow, computational biology, Saudi Arabia',
  authors: [{ name: 'BioNXA' }],
  openGraph: {
    title: 'BioNXA — Master Bioinformatics, Your Way',
    description: 'The first AI-powered, interactive platform for computational biology.',
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
  
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages({locale});
  const direction = locale === 'ar' ? 'rtl' : 'ltr';

  return (
    <html lang={locale} dir={direction} suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange={false}
        >
          <GoogleAnalytics />
          <NextIntlClientProvider messages={messages}>
            {children}
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
