import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [sveltekit()],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}'],
	},
	resolve: {
		alias: {},
	},
	/*
		alias: [
      {
        find:/^(.*)\.js$/,
        replacement: '$1',
      }
    ]
		// or
		alias: {
			'ui-common': 'ui-common/src/common.vue',
			'ui-dashboard': 'ui-dashboard/src/dashboard.vue',
		},
	*/
});
