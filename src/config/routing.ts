export const routePaths = {
  home: '/',
  tutorial: '/tutorial',
  login: '/login',
  levelsPage: 'progress/1',
  levelSelectPage: (gameId: string) => `/progress/${gameId}`,
  sublevelSelectPage: (gameId: string, levelId: number) => `/progress/${gameId}/${levelId}`,
  gamePage: (gameId: string, levelId: string, sublevelId: number, gameMode: string | undefined) =>
    `/progress/${gameId}/${levelId}/${sublevelId}/${gameMode}`,
} as const
