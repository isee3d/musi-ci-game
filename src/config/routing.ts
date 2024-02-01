export const routePaths = {
  home: '/',
  tutorial: '/tutorial',
  podium: '/podium',
  login: '/login',
  levelsPage: 'progress/1',
  levelSelectPage: (gameId: string) => `/progress/${gameId}`,
  sublevelSelectPage: (gameId: string, levelId: number) => `/progress/${gameId}/${levelId}`,
  gamePage: (gameId: string, levelId: string, sublevelId: number, gameMode: string | undefined) =>
    `/progress/${gameId}/${levelId}/${sublevelId}/${gameMode}`,
} as const

export const routeSoundIgnorePaths = [
  '/', '/login', '/download', '/tutorial',
] 
