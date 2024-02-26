import { createTRPCRouter } from "~/server/api/trpc";
import { exampleRouter } from "~/server/api/routers/example";
import { fragmentNoteRouter } from "~/server/api/routers/fragmentNote";
import { subLevelRouter } from "~/server/api/routers/subLevel";
import { gameRouter } from "~/server/api/routers/game";
import { gameModeRouter } from "~/server/api/routers/gameMode";
import { teamRouter } from "~/server/api/routers/team";
import { usersRouter } from "~/server/api/routers/users";
import { levelRouter } from "~/server/api/routers/level";
import { levelResultRouter } from "~/server/api/routers/levelResult";
import { downloadRouter } from "~/server/api/routers/download";
import { appSettingsRouter } from "~/server/api/routers/appSettings";
import { questionsRouter } from "~/server/api/routers/questions";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  question: questionsRouter,
  appSettings: appSettingsRouter,
  example: exampleRouter,
  fragmentNote: fragmentNoteRouter,
  game: gameRouter,
  gameMode: gameModeRouter,
  level: levelRouter,
  sublevel: subLevelRouter,
  team: teamRouter,
  user: usersRouter,
  levelResult: levelResultRouter,
  download: downloadRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
