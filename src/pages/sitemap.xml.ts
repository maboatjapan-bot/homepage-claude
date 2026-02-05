// Sitemap generation for Swiftechie website
// This generates a sitemap.xml file at build time

import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

const SITE_URL = 'https://www.swiftechie.com';

// All static pages on the site
const staticPages = [
  '',
  '/ai',
  '/company',
  '/contact',
  '/recruit',
  '/privacy',
  '/products',
  '/products/popohu-mini',
  '/products/pitopa',
  '/products/pitoshiyu',
  '/solutions',
  '/solutions/system-development',
  '/solutions/system-operation',
  '/solutions/infrastructure',
];

export const GET: APIRoute = async () => {
  // Get all news articles
  const news = await getCollection('news');
  const newsPages = news.map(article => `/news/${article.slug}`);

  // Combine all pages
  const allPages = [...staticPages, '/news', ...newsPages];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages
  .map(
    (page) => `  <url>
    <loc>${SITE_URL}${page}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${page === '' ? '1.0' : page.startsWith('/news/') ? '0.6' : '0.8'}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
