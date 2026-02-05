'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { Languages } from 'lucide-react';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLanguage = (newLocale: string) => {
    // Replace the locale in the pathname
    const segments = pathname.split('/');
    segments[1] = newLocale;
    const newPath = segments.join('/');
    router.push(newPath);
  };

  return (
    <div className="relative group">
      <button className="flex items-center space-x-2 glass px-4 py-2 rounded-lg hover:glass-strong transition">
        <Languages className="w-5 h-5" />
        <span className="text-sm font-medium">{locale === 'ar' ? 'العربية' : 'EN'}</span>
      </button>
      
      <div className="absolute top-full right-0 mt-2 glass-strong rounded-lg overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 min-w-[120px] z-50">
        <button
          onClick={() => switchLanguage('en')}
          className={`block w-full text-left px-4 py-3 hover:bg-white/10 transition ${
            locale === 'en' ? 'bg-primary-500/20 text-primary-300' : ''
          }`}
        >
          <span className="font-medium">English</span>
        </button>
        <button
          onClick={() => switchLanguage('ar')}
          className={`block w-full text-left px-4 py-3 hover:bg-white/10 transition ${
            locale === 'ar' ? 'bg-primary-500/20 text-primary-300' : ''
          }`}
        >
          <span className="font-medium">العربية</span>
        </button>
      </div>
    </div>
  );
}
