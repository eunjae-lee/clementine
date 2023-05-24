import * as SentrySvelte from '@sentry/svelte';
import { BrowserTracing } from '@sentry/browser';
import type { HandleClientError } from '@sveltejs/kit';
import { PUBLIC_SENTRY_DSN } from '$env/static/public';
import { dev } from '$app/environment';

if (!dev && PUBLIC_SENTRY_DSN) {
	SentrySvelte.init({
		dsn: PUBLIC_SENTRY_DSN,
		integrations: [new BrowserTracing()],
		tracesSampleRate: 1.0,
	});

	SentrySvelte.setTag('svelteKit', 'browser');
}

export const handleError = (({ error, event }) => {
	if (!dev && PUBLIC_SENTRY_DSN) {
		SentrySvelte.captureException(error, { contexts: { sveltekit: { event } } });
	}

	return {
		message: (error as Error).message,
	};
}) satisfies HandleClientError;
