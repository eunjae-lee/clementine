import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
	title: 'Clementine',
	description: 'SvelteKit + Supabase Starter',
	themeConfig: {
		// https://vitepress.dev/reference/default-theme-config
		nav: [
			{ text: 'Home', link: '/' },
			{ text: 'Getting Started', link: '/getting-started' },
			{ text: 'Features', link: '/styling' },
		],

		sidebar: [
			{ text: 'Getting Started', link: '/getting-started' },
			{
				text: 'Features',
				items: [
					{ text: 'Styling', link: '/styling' },
					{ text: 'Blogging', link: '/blogging' },
					{ text: 'Authentication', link: '/authentication' },
					{ text: 'misc.', link: '/misc' },
				],
			},
		],

		socialLinks: [
			{ icon: 'github', link: 'https://github.com/eunjae-lee/clementine' },
			{ icon: 'twitter', link: 'https://twitter.com/eunjae_lee' },
		],
	},
});
