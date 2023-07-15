# Getting Started

## Requirements

This starter is based on Node.js v18.16.0. You can use Node.js version managers like [nvm](https://github.com/nvm-sh/nvm) or [asdf](https://github.com/asdf-vm/asdf-nodejs).

## Start a new project

Let's start a new project by running this command:

```sh
npx degit eunjae-lee/clementine my-new-project
```

Create a `.env.local` file and fill in the information.

```sh
cp .env.example .env.local
```

Only `PUBLIC_SENTRY_DSN` is optional; all other Supabase-related keys are required.

## Projects

This starter includes three projects:

- `apps/web`: The actual web project
- `apps/og`: A clone of [Vercel OG](https://vercel.com/blog/introducing-vercel-og-image-generation-fast-dynamic-social-card-images), though it's React-based.
- `apps/docs`: This documentation website. You can delete it if you don't need it.

At the root level of this repository, you can run the projects with these commands.

```sh
# `apps/web`
yarn dev

# `apps/og`
yarn og

# `apps/docs`
yarn docs
```

You can deploy multiple projects in one repository with Vercel's [monorepo support](https://vercel.com/docs/concepts/monorepos).
