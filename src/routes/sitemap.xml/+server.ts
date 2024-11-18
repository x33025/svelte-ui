import { routes } from '$site/stores/routes.js';

export async function GET({ url }) {
  // Dynamically get the base URL
  const protocol = url.protocol; // http or https
  const hostname = url.hostname; // e.g., localhost or your deployed domain
  const port = url.port ? `:${url.port}` : ''; // Include port only if it's not empty
  const site = `${protocol}//${hostname}${port}`; // Build the base URL

  // Use your routes to build the sitemap
  const pages = [...routes]; // Static or dynamic routes

  const urls = [
    ...pages.map(page => ({
      loc: `${site}${page.path}`,
      changefreq: 'weekly',
      priority: 0.7,
    }))
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
   <?xml-stylesheet type="text/xsl" href="/sitemap-style.xsl"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${urls.map(url => `
      <url>
        <loc>${url.loc}</loc>
        <changefreq>${url.changefreq}</changefreq>
        <priority>${url.priority}</priority>
      </url>`).join('')}
  </urlset>`;

  return new Response(sitemap, {
    headers: { 'Content-Type': 'application/xml' },
  });
}
