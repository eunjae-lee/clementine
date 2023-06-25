import { getContents } from '$lib/content';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const contents = await getContents<{
		title: string;
		excerpt: string;
		created_at: string;
		lang: string;
		featured: boolean;
	}>({
		slugStartsWith: 'en/',
	});

	return {
		contents,
	};
};
