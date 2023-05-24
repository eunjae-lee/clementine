<script lang="ts">
	import { MetaTags } from 'svelte-meta-tags';
	import type { PageData } from './$types';
	import { AppBar, AppShell } from '@skeletonlabs/skeleton';
	import Logo from '$lib/components/Logo.svelte';

	export let data: PageData;

	let email: string;
	let password: string;
	let status: 'init' | 'submitting' | 'confirming' | 'error' = 'init';
	let errorMessage: string;

	async function onSubmit() {
		status = 'submitting';
		const { data: signUpResult, error } = await data.supabase.auth.signUp({
			email,
			password,
		});
		if (error) {
			status = 'error';
			errorMessage = error.message;
		} else {
			status = 'confirming';
		}
	}
</script>

<MetaTags title="Sign Up | Croissant" />

<AppShell>
	<svelte:fragment slot="header">
		<AppBar background="bg-surface-200"
			><svelte:fragment slot="lead">
				<a href="/"><Logo /></a>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>

	<section class="w-full h-full flex justify-center items-center">
		<div class="flex flex-col w-full items-center mb-[20%] px-4">
			<form
				class="card py-4 px-6 w-full max-w-md flex flex-col gap-4"
				on:submit|preventDefault={onSubmit}
			>
				<h2 class="my-4">Welcome 🙌</h2>
				<input type="text" placeholder="Email" class="input" bind:value={email} required />
				<input
					type="password"
					placeholder="Password"
					class="input"
					bind:value={password}
					required
					minlength="12"
				/>
				<button
					type="submit"
					class="btn variant-filled-primary w-full"
					class:loading={status === 'submitting'}
					disabled={status !== 'init'}>Sign Up</button
				>
				<div class="flex justify-center">
					<a href="/sign_in">(If you've signed up)</a>
				</div>
			</form>

			{#if status === 'confirming'}
				<div class="mt-4 w-96 alert alert-success shadow-lg">
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
								d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
							/></svg
						>
						<span>A confirmation email has been sent! Please check your email.</span>
					</div>
				</div>
			{/if}

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
