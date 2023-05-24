import * as SentryNode from '@sentry/node';
import {
	PUBLIC_SUPABASE_URL,
	PUBLIC_SUPABASE_ANON_KEY,
	PUBLIC_SENTRY_DSN,
} from '$env/static/public';
import { dev } from '$app/environment';
import { createSupabaseServerClient } from '@supabase/auth-helpers-sveltekit';
import { redirect, type Handle, type HandleServerError } from '@sveltejs/kit';
import { DEFAULT_LANG, SIGN_IN_PATH } from '$lib/const';

if (!dev && PUBLIC_SENTRY_DSN) {
	SentryNode.init({
		dsn: PUBLIC_SENTRY_DSN,
		tracesSampleRate: 1.0,
		// Add the Http integration for tracing
		integrations: [new SentryNode.Integrations.Http()],
	});

	SentryNode.setTag('svelteKit', 'server');
}

const isProtectedRoute = (url: URL) => {
	return url.pathname.startsWith('/super-secret-path');
};

export const handle: Handle = async ({ event, resolve }) => {
	event.locals.supabase = createSupabaseServerClient({
		supabaseUrl: PUBLIC_SUPABASE_URL,
		supabaseKey: PUBLIC_SUPABASE_ANON_KEY,
		event,
	});

	/**
	 * a little helper that is written for convenience so that instead
	 * of calling `const { data: { session } } = await supabase.auth.getSession()`
	 * you just call this `await getSession()`
	 */
	event.locals.getSession = async () => {
		const {
			data: { session },
		} = await event.locals.supabase.auth.getSession();
		return session;
	};

	// protect requests to all routes that start with /protected-routes
	if (isProtectedRoute(event.url)) {
		const session = await event.locals.getSession();
		if (!session) {
			// the user is not signed in
			throw redirect(303, SIGN_IN_PATH);
		}
	}

	return resolve(event, {
		transformPageChunk(input) {
			return input.html.replace('%lang%', DEFAULT_LANG);
		},
		/**
		 * There´s an issue with `filterSerializedResponseHeaders` not working when using `sequence`
		 *
		 * https://github.com/sveltejs/kit/issues/8061
		 */
		filterSerializedResponseHeaders(name) {
			return name === 'content-range';
		},
	});
};

export const handleError = (({ error, event }) => {
	if (!dev && PUBLIC_SENTRY_DSN) {
		SentryNode.captureException(error, { contexts: { sveltekit: { event } } });
	}

	return {
		message: (error as Error).message,
	};
}) satisfies HandleServerError;
