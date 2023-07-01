import { getContent } from '$lib/content';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, setHeaders }) => {
	const content = await getContent<{
		title: string;
		excerpt: string;
		created_at: string;
		lang: string;
		featured: boolean;
	}>(params.slug);

	if (!content) {
		throw error(404);
	}

	return {
		...content,
	};
};
