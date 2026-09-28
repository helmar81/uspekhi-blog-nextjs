'use client';

import Script from 'next/script';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { CookieBanner } from './cookie-banner';

// ✅ Tell TypeScript that gtag exists on window
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

const GA_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-CGGW3EB7KN';

export default function Analytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [consent, setConsent] = useState<'granted' | 'denied' | 'undecided' | null>(null);

  useEffect(() => {
    // Check local storage on mount
    const savedConsent = localStorage.getItem('cookie_consent');
    if (savedConsent === 'granted' || savedConsent === 'denied') {
      setConsent(savedConsent as 'granted' | 'denied');
    } else {
      setConsent('undecided');
    }
  }, []);

  useEffect(() => {
    if (consent === 'granted' && pathname) {
      const url = pathname + searchParams.toString();
      if (typeof window.gtag !== 'undefined' && GA_ID) {
        window.gtag('config', GA_ID, {
          page_path: url,
        });
      }
    }
  }, [pathname, searchParams, consent]);

  const handleAccept = () => {
    localStorage.setItem('cookie_consent', 'granted');
    setConsent('granted');
  };

  const handleDecline = () => {
    localStorage.setItem('cookie_consent', 'denied');
    setConsent('denied');
  };

  if (!GA_ID) return null;

  return (
    <>
      {consent === 'undecided' && (
        <CookieBanner onAccept={handleAccept} onDecline={handleDecline} />
      )}

      {consent === 'granted' && (
        <>
          <Script
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          />
          <Script
            id="gtag-init"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}', {
                  page_path: window.location.pathname,
                });
              `,
            }}
          />
        </>
      )}
    </>
  );
}
