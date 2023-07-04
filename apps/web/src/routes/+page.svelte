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

<a href="/post/ko/svelte">Svelte에 대해 알아봅시다</a>
