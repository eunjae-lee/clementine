<script lang="ts">
	import { MetaTags } from 'svelte-meta-tags';
	import { goto } from '$app/navigation';
	import type { PageData } from './$types';
	import { AppBar, AppShell } from '@skeletonlabs/skeleton';
	import { APP_NAME, REDIRECT_SIGNED_IN_USER_TO, SIGN_UP_PATH } from '$lib/config';

	export let data: PageData;

	let status: 'init' | 'submitting' | 'confirming' | 'error' = 'init';
	let errorMessage: string;

	async function onSubmit(event: Event) {
		const email = (event.target as HTMLFormElement).email.value;
		const password = (event.target as HTMLFormElement).password.value;

		status = 'submitting';
		const { error } = await data.supabase.auth.signInWithPassword({
			email,
			password,
		});
		if (error) {
			status = 'error';
			errorMessage = error.message;
		} else {
			status = 'confirming';
		}
		if (!error) {
			goto(REDIRECT_SIGNED_IN_USER_TO);
		}
	}
</script>

<MetaTags title={`Sign In | ${APP_NAME}`} />

<AppShell>
	<svelte:fragment slot="header">
		<AppBar background="bg-surface-200"
			><svelte:fragment slot="lead">
				<a href="/">Logo</a>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>

	<section class="w-full h-full flex justify-center items-center">
		<div class="flex flex-col w-full items-center mb-[20%] px-4">
			<form
				class="card py-4 px-6 w-full max-w-md flex flex-col gap-4"
				on:submit|preventDefault={onSubmit}
			>
				<h2 class="my-4">Hi there 👋</h2>
				<input type="text" name="email" placeholder="Email" class="input" required />
				<input
					type="password"
					name="password"
					placeholder="Password"
					class="input"
					minlength="12"
					required
				/>
				<button
					type="submit"
					class="btn variant-filled-primary w-full"
					class:loading={status === 'submitting'}
					disabled={status !== 'init'}>Sign In</button
				>
				<div class="flex justify-center">
					<a href={SIGN_UP_PATH}>(If you haven't signed up yet)</a>
				</div>
			</form>

			{#if status === 'error' && errorMessage}
				<div class="mt-4 w-96 alert alert-error shadow-lg">
					<div>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="stroke-current flex-shrink-0 h-6 w-6"
							fill="none"
							viewBox="0 0 24 24"
							><path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
							/></svg
						>
						<span>Something went wrong. We're looking into it. ({errorMessage})</span>
					</div>
				</div>
			{/if}
		</div>
	</section>
</AppShell>
