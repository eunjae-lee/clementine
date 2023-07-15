# Authentication

Supabase handles authentication.

> **NOTE**
>
> The file paths below are all based on `apps/web/`.

## Sign Up

You can find the basic sign-up implementation in `src/routes/sign_up/+page.svelte`.

## Sign In

You can find the basic sign-in implementation in `src/routes/sign_in/+page.svelte`.

If someone is already signed in and accessing the Sign In page, you can automatically redirect them to a specific page. Read more about it in `src/routes/sign_in/+page.server.ts`. You can configure the redirection route with the `REDIRECT_SIGNED_IN_USER_TO` variable in `src/lib/config.ts`.

## After signed in,

After signing in with an OAuth provider, such as GitHub, the user will be redirected to your home page(`/`) with an access token.

The URL contains a hash starting with `#access_token=`. Once the page is loaded, `supabase.js` immediately processes the hash and it is removed from the URL. This is when the authentication information is stored locally. You can then automatically redirect them to a secure page, such as the user's account settings. This is implemented in `src/routes/+page.svelte`.

```js
let redirectedFromAuthentication = $page.url.hash.startsWith('#access_token=');

onMount(() => {
	if (redirectedFromAuthentication && location.hash === '') {
		redirect(303, REDIRECT_SIGNED_IN_USER_TO);
	}
});
```
