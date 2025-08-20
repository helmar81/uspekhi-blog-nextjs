jsx
import Head from 'next/head';

const BaseHead = ({ title, description, image }) => {
  // Construct canonical URL
  const canonicalURL = "YOUR_CANONICAL_URL"; // TODO: Replace with actual canonical URL logic

  return (
    <Head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width,initial-scale=1" />
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      {/* You might need to generate a sitemap in Next.js */}
      {/* <link rel="sitemap" href="/sitemap-index.xml" /> */}
      {/* Adapt RSS feed based on your Next.js implementation */}
      {/* <link
        rel="alternate"
        type="application/rss+xml"
        title="Astro-Blog-Template" // Assuming SITE_TITLE is available or hardcoded
        href="/rss.xml" // TODO: Replace with actual RSS feed URL logic
      /> */}
      {/* Next.js handles generator tag */}
      {/* <meta name="generator" content={Astro.generator} /> */}

      {/* Font preloads */}
      <link rel="preload" href="/fonts/atkinson-regular.woff" as="font" type="font/woff" crossOrigin="anonymous" />
      <link rel="preload" href="/fonts/atkinson-bold.woff" as="font" type="font/woff" crossOrigin="anonymous" />

      {/* Canonical URL */}
      <link rel="canonical" href={canonicalURL} />

      {/* Primary Meta Tags */}
      {/* Title & Description */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="author" content="Helmar Baechle" />

      {/* Favicon */}
      <link rel="icon" type="image/png" href="/hub.png" />

      {/* Web App Manifest */}
      {/* You might need to generate a manifest in Next.js */}
      {/* <link rel="manifest" href="/manifest.webmanifest" /> */}

      {/* Theme Colors */}
      <meta name="theme-color" content="#4f46e5" />

      {/* Open Graph */}
      {/* Update these with your actual site details */}
      <meta property="og:title" content="YOUR_OG_TITLE" />
      <meta property="og:description" content="YOUR_OG_DESCRIPTION" />
      {/* Use the image prop for the Open Graph image */}
      {image && <meta property="og:image" content={image} />}
      {/* Update with your actual site URL */}
      <meta property="og:url" content="YOUR_OG_URL" />
      <meta property="og:type" content="website" />

      {/* Twitter */}
      {/* Update these with your actual site details */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="YOUR_TWITTER_TITLE" />
      <meta name="twitter:description" content="YOUR_TWITTER_DESCRIPTION" />
      {/* Use the image prop for the Twitter image */}
      {image && <meta name="twitter:image" content={image} />}

      {/* Fonts */}
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@800&display=swap" rel="stylesheet" />

      {/* Global CSS */}
      {/* Import global styles in your _app.js or _document.js */}
      {/* <link rel="stylesheet" href="/global.css" media="print" onload="this.media='all'" /> */}

      {/* Optional Libraries */}
      <script async src="https://cdnjs.cloudflare.com/ajax/libs/PapaParse/5.3.0/papaparse.min.js" defer></script>
      <script async src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
    </Head>
  );
};

export default BaseHead;