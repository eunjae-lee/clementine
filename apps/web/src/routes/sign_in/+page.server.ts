import { REDIRECT_SIGNED_IN_USER_TO } from '$lib/const';
import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ parent }) => {
	const { session } = await parent();
	if (session) {
		throw redirect(303, REDIRECT_SIGNED_IN_USER_TO);
	}
};
