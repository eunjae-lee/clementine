export const APP_NAME = 'Clementine';
export const APP_DESCRIPTION = 'A SvelteKit starter with Supabase and batteries included';
export const DEFAULT_LANG = 'en';

export const AUTHOR_NAME = 'Eunjae Lee';

export const SIGN_IN_PATH = '/sign_in';
export const SIGN_UP_PATH = '/sign_up';
export const REDIRECT_SIGNED_IN_USER_TO = '/my-secret-page';

export const BASE_URL = 'https://my-website.com';
export const POST_URL_PREFIX = `${BASE_URL}/post`;

export const isProtectedRoute = (url: URL) => {
	return url.pathname.startsWith('/super-secret-path');
};
