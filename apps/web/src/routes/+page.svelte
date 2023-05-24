<script lang="ts">
	import { AppShell, AppBar } from '@skeletonlabs/skeleton';
	import { MetaTags } from 'svelte-meta-tags';
	import type { PageData } from './$types';
	import { Globe, Twitter, Youtube } from 'lucide-svelte';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { redirect } from '@sveltejs/kit';
	import Logo from '$lib/components/Logo.svelte';
	import { APP_DESCRIPTION, APP_NAME, REDIRECT_SIGNED_IN_USER_TO, SIGN_IN_PATH } from '$lib/const';

	export let data: PageData;

	let redirectedFromAuthentication = $page.url.hash.startsWith('#access_token=');

	onMount(() => {
		if (redirectedFromAuthentication && location.hash === '') {
			redirect(303, REDIRECT_SIGNED_IN_USER_TO);
		}
	});
</script>

<MetaTags title={APP_NAME} description={APP_DESCRIPTION} />

<AppShell>
	<svelte:fragment slot="header">
		<AppBar
			background="bg-surface-200"
			gridColumns="grid-cols-3"
			slotDefault="place-self-center"
			slotTrail="place-content-end"
			><svelte:fragment slot="lead">
				<div class="ml-2">
					<Logo />
				</div>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<ul class="flex gap-2 sm:gap-4 px-1">
					{#if data.session}
						<li>
							<a class="btn variant-soft-secondary" href={REDIRECT_SIGNED_IN_USER_TO}>Decks</a>
						</li>
					{:else}
						<li><a class="btn variant-soft-secondary" href={SIGN_IN_PATH}>Sign In</a></li>
					{/if}
				</ul>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
</AppShell>
