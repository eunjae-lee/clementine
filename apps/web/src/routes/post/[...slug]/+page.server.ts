import { getContent } from '$lib/content';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const content = await getContent(params.slug);

	return {
		...content,
	};
};
