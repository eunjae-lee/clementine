<script lang="ts">
	import { onMount } from 'svelte';

	export let data;

	onMount(() => {
		if (data.metadata.lang) {
			// for client-side routing
			document.querySelector('html')?.setAttribute('lang', data.metadata.lang);
		}
	});
</script>

<article class="prose prose-neutral">
	<svelte:component this={data.component} />
</article>
