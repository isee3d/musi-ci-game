# Musi Game

This is a [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app`.

## What does this project contain?

This project is build on top of the follwing packages:

- [Next.js](https://nextjs.org)
- [NextAuth.js](https://next-auth.js.org)
- [Prisma](https://prisma.io)
- [Tailwind CSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)
- [Shadcn-ui](https://ui.shadcn.com/)
- [XState](https://stately.ai/docs/xstate-v5)
- [Zustand](https://zustand-demo.pmnd.rs/)
- [React hook form](https://react-hook-form.com/)

## Learn More

To learn more about the [T3 Stack](https://create.t3.gg/), take a look at the following resources:

- [Documentation](https://create.t3.gg/)
- [Learn the T3 Stack](https://create.t3.gg/en/faq#what-learning-resources-are-currently-available) — Check out these awesome tutorials

You can check out the [create-t3-app GitHub repository](https://github.com/t3-oss/create-t3-app)

## Getting started

- Clone this repository to your local machine

- Make sure you installed pnpm

```shell
npm install -g pnpm
```

Then run corepack enable

```shell
corepack enable
```

- Run the following command: `pnpm init-repo` => This command will setup the database and install all the files nessesary to run the project.

- Make sure you setup NextAuth corretly for your use case: This means setting up the Google developer portal. You can follow [This](https://next-auth.js.org/providers/google) link to see how to do this. Make sure you copy the codes into your .env file to make the repo work correctly.

## How is this set up?

- The `.vscode` folder contains a few very useful files, see the snippets.code-snippets for shortcuts for speeding up your workflow.
- The `prisma` folder contains the schema for how the database works, and how the relations are setup. The seed file is used to fill the DB with dummy data. Run pnpm db-seed to fill your DB if you have cleared it.
- The `src` folder contains all the logic for the project.
- The `src/pages` folder obviously contains all the routing file based pages
- The `src/server/api` contains all the tRPC routers for querying and mutating data
- The `src/components/3D` contains all Threejs 3d logic for the fragment visuals
- The `src/components/fragmentPlayer` contains the uppermost logic for the animationplayer and how to animate it plus its props
- The `src/components/gamemodes` contains 4 folders, one for each gamemode, and in it all components and xState machines for playing the gamemode.
- The `src/components/manage` contains all components for creating and updating modals in the settings logic of the app
- The `src/components/ui` contains all ShadCN UI components
- The `src/env.mjs` file is the validation for all the .env. Always make sure this is working correctly for a nice production environment.

## Most used commands

- pnpm init-repo: Initialize this repo (set the generated db types, install deps, create a .env file)
- pnpm db-update: Update the generated prisma types and make it up to date with the latest schema
- pnpm db-init: Initialize the DB for a production environment
- pnpm db-clear: Completely clear your local DB (NEVER DO IN PRODUCTION!!!)
- pnpm db-seed: Fill your local DB with dummy data
- pnpm dev-o: Start dev server and open a new browser tab
- pnpm preview: Create a new build and start it after locally
- pnpm prisma generate: generate the types for the prisma schema locally

Some commands from above are removed in version history to avoid issues in production data

## Doocumentation

So how does the Musi CI Melody Game work code wise?

Most of it is pretty straight forward. We use the create t3 app stack with the Nextjs pages router for building this product.
Most pages are really straight forward and SSR rendered for the JWT session token, so we use getserversideprops for that.
There is one main Zustand store where the state for the logic of the site is stored, the settings store is for checking the activity and the audioservice store is for the audio logic.

In _app.tsx you see some config for for example XState debugging which can be really useful

How does a gameMode work?

A gamemode in its folder consists out of multiple components. The XState machine is the deciding flow of the mode. ased on the state of the machine is decided which component is rendered. Events can be send to this machine based on specific actions. State is decided either in the machine of mostly in the component where the animationPlayers are rendered.

## Some gotchas

- Read the Requirements docs of the project before diving in this project. There are quite a few algorithm things you need to understand, which are either documented there or around the code cause its really complex, especially for the test mode.


## Things to improve...

- The create/update logic is verbose and could be minimised in the lines of code
- The TRPC query's for for example the manage part could be combined into a single query for cleanness
- Migrate to Drizzle ORM for way better query performance
- Migrate to App router for even better loading/error states and overall performance
- Migrate fully to turbopack for building and using this product faster

## Known bugs

- In Spelen mode, if you spam click when hearing the fragment you can get the fragment be double played...
 Potential fix is something with the isAnimating prop in the animationPlayer, but you need to test against the testmode, cause there you can cause a side effect for the disabled prop of the animationPlayer button tag

 ## Dependencies

 - Do not upgrade to react query V5, cause trpc v10 wont support that
 - Theres a bug in the current code with radix ui dialog. You need to look into the Command component to fix the hydration issue if you ugrade
 - 
