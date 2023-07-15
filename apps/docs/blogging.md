# Blogging

Every website needs a way to publish content. You may not plan to publish blog posts on your website, but you should create one or two pages for announcements at some point.

> **NOTE**
>
> The file paths below are all based on `apps/web/`.

## Structure

Examine the `content/` folder. It contains `en/` and `ko/` folders, but it doesn't have to be language-specific. You can name it whatever you want, such as `news`. The filename is converted to a path in the following way:

- filename: `content/news/v1-announcement/index.md`
- path: `/post/news/v1-announcement`

The path is prefixed with `/post`. To change or remove it, you need to make some edits in the `src/routs/post/` folder.

## List of posts

To learn how to fetch a list of posts and render them, check out the `src/routes/post/en/` folder.

## Single post page

See `src/routes/post/[...slug]/` folder.

- `+page.ts` loads the metadata and the actual content of the post.
- `+page.svelte` renders the post.
- `+page.server.ts` sets `locals.contentLanguage` to `<html lang="xxx">`.

## frontmatter

No properties are required, but `sitemap.xml` and `rss.xml` assume the following:

- `title`
- `excerpt`
- `created_at`
- `updated_at` (optional)

If you want to use different properties, feel free to edit `sitemap.xml` and `rss.xml`.

## Language

If the frontmatter of your page contains the `lang` property, `handleLanguage` function in `src/hooks.server.ts` will apply it to `<html lang="xxx">`.

If a page transition occurs on the client-side, it is dynamically updated in `src/routes/post/[...slug]/+page.svelte`.
