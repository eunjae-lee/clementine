<script lang="ts">
	export let data;
</script>

<div class="prose">
	<h1>List of English Posts</h1>

	<ul>
		{#each data.contents as content}
			<li><a href={content.slug}>{content.metadata.title}</a></li>
		{/each}
	</ul>
</div>
