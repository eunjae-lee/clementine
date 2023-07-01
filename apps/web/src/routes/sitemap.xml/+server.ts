import { BASE_URL, POST_URL_PREFIX } from '$lib/config';
import { getContents } from '$lib/content';

export async function GET() {
	const body = `<?xml version="1.0" encoding="UTF-8" ?>
  <urlset
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd"
    xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
    xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
    xmlns:video="http://www.google.com/schemas/sitemap-video/1.1"
    xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
    xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
    xmlns:pagemap="http://www.google.com/schemas/sitemap-pagemap/1.0"
    xmlns:xhtml="http://www.w3.org/1999/xhtml"
  >
    <url>
      <loc>${BASE_URL}</loc>
      <priority>1.0</priority>
    </url>
    ${(
			await getContents<{
				title: string;
				excerpt: string;
				created_at: string;
				lang: string;
				featured: boolean;
			}>()
		)
			.map(
				(post) => `<url>
          <loc>${POST_URL_PREFIX}/${post.slug}</loc>
          <lastmod
            >${
							post.metadata.updated_at
								? new Date(post.metadata.updated_at).toISOString()
								: new Date(post.metadata.created_at).toISOString()
						}</lastmod
          >
          <changefreq>monthly</changefreq>
          <priority>1.0</priority>
        </url>`
			)
			.join('')}
  </urlset>`;

	return new Response(body, {
		headers: {
			'Cache-Control': `max-age=0, s-max-age=600`,
			'Content-Type': 'application/xml',
		},
	});
}
