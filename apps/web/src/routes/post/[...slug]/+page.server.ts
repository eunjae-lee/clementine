import { getContent } from '$lib/content';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, locals }) => {
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

	if (content.metadata.lang) {
		locals.contentLanguage = content.metadata.lang;
	}
};
