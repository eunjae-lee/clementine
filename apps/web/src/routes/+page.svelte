<script lang="ts">
	import { MetaTags, type MetaTagsProps } from 'svelte-meta-tags';
	import type { PageData } from './$types';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { redirect } from '@sveltejs/kit';
	import { APP_DESCRIPTION, APP_NAME, REDIRECT_SIGNED_IN_USER_TO, SIGN_IN_PATH } from '$lib/config';

	export let data: PageData;

	let redirectedFromAuthentication = $page.url.hash.startsWith('#access_token=');

	onMount(() => {
		if (redirectedFromAuthentication && location.hash === '') {
			redirect(303, REDIRECT_SIGNED_IN_USER_TO);
		}
	});

	let metaTags: MetaTagsProps = {
		title: APP_NAME,
		description: APP_DESCRIPTION,
		openGraph: {
			// url: 'https://',
			title: APP_NAME,
			description: APP_DESCRIPTION,
			// images: [
			// 	{
			// 		url: 'https://',
			// 	},
			// ],
			site_name: APP_NAME,
		},
		twitter: {
			// handle: '@eunjae_lee',
			// site: '@learnwitheunjae',
			cardType: 'summary', //'summary_large_image'
			title: APP_NAME,
			description: APP_DESCRIPTION,
			// image: 'https://',
			imageAlt: APP_NAME,
		},
	};
</script>

<MetaTags {...metaTags} />

<div class="prose">
	<h1>Hello!</h1>
	<p>
		This is Clementine, the SvelteKit starter that comes with Supabase, Tailwind, and many more
		features included.
	</p>

	<div class="mt-8 space-y-8">
		<div>
			<a href="/post/en">This is a link to the list of English posts</a>
		</div>

		<div>
			<p>The following is a sample post written in English.</p>
			<a href="/post/en/svelte"
				>Building Dynamic Web Apps with Svelte: The Future of Front-End Development</a
			>
		</div>

		<div>
			<p>The following is a sample post written in Korean.</p>
			<a href="/post/ko/svelte">SvelteKit: 다음 세대의 프론트엔드 프레임워크</a>
		</div>
	</div>
</div>
