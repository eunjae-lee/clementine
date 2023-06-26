import { getContent } from '$lib/content';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
	const content = await getContent(params.slug);
	if (!content) {
		throw error(404);
	}

	return {
		...content,
	};
};
