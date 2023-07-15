# misc.

> **NOTE**
>
> The file paths below are all based on `apps/web/`.

## RSS feed

The `<your-domain>/rss.xml` endpoint is provided by `src/routes/rss.xml/+server.ts`. It currently includes only posts under `src/routes/post/[...slug]/`. You can add more pages if you need.

One great feature of this endpoint is that you can filter with a slug. For example, `<your-domain>/rss.xml?slug=en` will provide only posts whose slug starts with `en`.

## Sitemap

The `<your-domain>/sitemap.xml` shares almost the same code as `rss.xml` by `src/routes/sitemap.xml/+server.ts`.
