import { createTRPCRouter } from "~/server/api/trpc";
import { exampleRouter } from "~/server/api/routers/example";
import { fragmentNoteRouter } from "~/server/api/routers/fragmentNote";
import { levelRouter } from "~/server/api/routers/level";
import { gameRouter } from "~/server/api/routers/game";
import { gameModeRouter } from "~/server/api/routers/gameMode";
import { kliniekRouter } from "~/server/api/routers/kliniek";
import { roleRouter } from "~/server/api/routers/role";
import { teamRouter } from "~/server/api/routers/team";
import { typeCIRouter } from "~/server/api/routers/typeCI";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  fragmentNote: fragmentNoteRouter,
  game: gameRouter,
  gameMode: gameModeRouter,
  kliniek: kliniekRouter,
  level: levelRouter,
  role: roleRouter,
  team: teamRouter,
  typeCI: typeCIRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
