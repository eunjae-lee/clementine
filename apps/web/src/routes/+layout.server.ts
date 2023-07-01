import { DEFAULT_LANG } from '$lib/config';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ cookies, request, locals: { getSession } }) => {
	let lang = cookies.get('lang');
	if (lang !== 'ko' && lang !== 'en') {
		// en-US,en;q=0.8,fr;q=0.5
		const supportKorean = (request.headers.get('accept-language') || '').split(',').find((item) => {
			item.split(';')[0].split('-')[0] === 'ko';
		});
		lang = supportKorean ? 'ko' : DEFAULT_LANG;
		cookies.set('lang', lang);
	}

	return {
		session: await getSession(),
	};
};
