<script lang="ts">
	export let data;
</script>

<h1>List of English Posts</h1>

<ul>
	{#each data.contents as content}
		<li>{content.metadata.title}</li>
	{/each}
</ul>
