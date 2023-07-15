import { APP_DESCRIPTION, APP_NAME, BASE_URL, POST_URL_PREFIX } from '$lib/config.js';
import { getContents } from '$lib/content/index.js';

/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export async function GET({ url }) {
	const slug = url.searchParams.get('slug');
	const xml = String.raw;

	const posts = await getContents<{
		title: string;
		excerpt: string;
		created_at: string;
		lang: string;
		featured: boolean;
	}>({
		...(typeof slug === 'string' && slug.length > 0 ? { slugStartsWith: slug } : {}),
	});

	const body = xml`
  <rss xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom" version="2.0">
<channel>
  <title>${APP_NAME}</title>
  <link>${BASE_URL}</link>
  <description>${APP_DESCRIPTION}</description>
  <atom:link href="${BASE_URL}/rss.xml" rel="self" type="application/rss+xml" />
  ${posts
		.map(
			(post) =>
				xml`
        <item>
          <guid>${POST_URL_PREFIX}/${post.slug}</guid>
          <title>${post.metadata.title}</title>
          <description>${post.metadata.excerpt}</description>
          <link>${POST_URL_PREFIX}/${post.slug}</link>
          <pubDate>${new Date(post.metadata.created_at).toUTCString()}</pubDate>
      </item>
    `
		)
		.join('')}
</channel>
</rss>`;

	return new Response(body, {
		headers: {
			'Cache-Control': 'max-age=0, s-maxage=3600',
			'Content-Type': 'application/xml',
		},
	});
}
