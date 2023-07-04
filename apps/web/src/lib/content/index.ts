type GetContentsParams = {
	slugStartsWith?: string;
	includeComponent?: boolean;
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

function filterNonNull<T>(arr: (T | null | undefined)[]): T[] {
	return arr.filter((item): item is T => item !== null && item !== undefined);
}

export const getContents = async <Metadata = unknown>({
	slugStartsWith,
	includeComponent = true,
}: GetContentsParams = {}) => {
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
			return {
				filePath,
				slug,
				metadata: resolved.metadata,
				component: includeComponent ? resolved.default : undefined,
			};
		})
	);

	return filterNonNull(contents);
};

export const getContent = async <Metadata = unknown>(slug: string) => {
	const filePath = getFilePathFromSlug(slug);
	try {
		const mod = await import(filePath);
		return {
			filePath,
			slug,
			metadata: mod.metadata as Metadata,
			component: mod.default as ConstructorOfATypedSvelteComponent,
		};
	} catch (_err) {
		return null;
	}
};
