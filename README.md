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


## Things to improve...

- The create/update logic is verbose and could be minimised in the lines of code
- The TRPC query's for for example the manage part could be combined into a single query for cleanness
