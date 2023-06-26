type GetContentsParams = {
	slugStartsWith?: string;
};

const getSlugFromFilePath = (filePath: string) => {
	return filePath.match(/\/content\/(.+?)\/index\.md/)?.[1];
};

const getFilePathFromSlug = (slug: string) => {
	return `/content/${slug}/index.md`;
};

const getContentMap = <Metadata = unknown>() => {
	return import.meta.glob<boolean, string, { metadata: Metadata; default: SvelteComponent }>(
		`/content/**/index.md`
	);
};

export const getContents = async <Metadata = unknown>({
	slugStartsWith,
}: GetContentsParams = {}) => {
	type Content = {
		filePath: string;
		slug: string;
		metadata: Metadata;
	};

	const contents = await Promise.all(
		Object.entries(getContentMap<Metadata>()).map(async (entry) => {
			const [filePath, resolver] = entry;
			const slug = getSlugFromFilePath(filePath);
			if (!slug) {
				return null;
			}
			if (slugStartsWith && !slug.startsWith(slugStartsWith)) {
				return null;
			}
			// filePath: /content/en/my-post/index.md
			//     slug: en/my-post
			const resolved = await resolver();
			return { filePath, slug, metadata: resolved.metadata, component: resolved.default };
		})
	);

	const isContent = (content: unknown): content is Content => {
		return content !== null;
	};

	return contents.filter(isContent);
};

export const getContent = async <Metadata = unknown>(slug: string) => {
	const filePath = getFilePathFromSlug(slug);
	const mod = await import(filePath);

	return {
		filePath,
		slug,
		metadata: mod.metadata as Metadata,
		component: mod.default as ConstructorOfATypedSvelteComponent,
	};
};
