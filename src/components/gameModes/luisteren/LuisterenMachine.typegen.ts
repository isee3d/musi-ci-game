// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  '@@xstate/typegen': true
  internalEvents: {
    'xstate.init': { type: 'xstate.init' }
  }
  invokeSrcNameMap: {}
  missingImplementations: {
    actions: never
    delays: never
    guards: never
    services: never
  }
  eventsCausingActions: {
    finishedPlayingAction: 'FINISHEDLISTENING'
    initializeShownFragments: 'STARTROUND'
    resetPlaying: 'EXITGAME' | 'RESTARTMACHINE' | 'xstate.init'
    setupData: 'STARTROUND'
    shuffleFragments: 'SHUFFLEFRAGMENTS'
  }
  eventsCausingDelays: {}
  eventsCausingGuards: {}
  eventsCausingServices: {}
  matchesStates: 'exitGame' | 'finishedListening' | 'idle' | 'playing'
  tags: never
}
