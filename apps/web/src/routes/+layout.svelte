<script>
	// Your selected Skeleton theme:
	import '../theme.postcss';

	// This contains the bulk of Skeletons required styles:
	import '@skeletonlabs/skeleton/styles/skeleton.css';

	// Finally, your application's global stylesheet (sometimes labeled 'app.css')
	import '../app.postcss';
	import { Toast } from '@skeletonlabs/skeleton';

	import progress from 'nprogress';
	import 'nprogress/nprogress.css';
	import { beforeNavigate, afterNavigate } from '$app/navigation';

	beforeNavigate(() => {
		progress.start();
	});

	afterNavigate(() => {
		progress.done();
	});
</script>

<div class="container mx-auto py-4 sm:py-8">
	<slot />
	<Toast />
</div>
