// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  '@@xstate/typegen': true
  internalEvents: {
    'xstate.after(1000)#spelen.playing.restAfterAnswering': {
      type: 'xstate.after(1000)#spelen.playing.restAfterAnswering'
    }
    'xstate.after(GO)#spelen.countdown.GO!': { type: 'xstate.after(GO)#spelen.countdown.GO!' }
    'xstate.after(ONE)#spelen.countdown.1': { type: 'xstate.after(ONE)#spelen.countdown.1' }
    'xstate.after(SOUNDTIME)#spelen.playing.initializePlaying': {
      type: 'xstate.after(SOUNDTIME)#spelen.playing.initializePlaying'
    }
    'xstate.after(THREE)#spelen.countdown.3': { type: 'xstate.after(THREE)#spelen.countdown.3' }
    'xstate.after(TWO)#spelen.countdown.2': { type: 'xstate.after(TWO)#spelen.countdown.2' }
    'xstate.init': { type: 'xstate.init' }
    'xstate.stop': { type: 'xstate.stop' }
  }
  invokeSrcNameMap: {}
  missingImplementations: {
    actions: never
    delays: never
    guards: never
    services: never
  }
  eventsCausingActions: {
    initializeContext: 'STARTROUND'
    onCountdownEnded: 'FINISHEDPLAYING' | 'xstate.after(GO)#spelen.countdown.GO!' | 'xstate.stop'
    onFinishedPlaying: 'FINISHEDPLAYING'
    onPlayingStarted: 'xstate.after(GO)#spelen.countdown.GO!'
    saveLatency: 'GUESSEDFRAGMENT'
    saveScene: 'GUESSEDFRAGMENT'
    setGuessedFragment: 'GUESSEDFRAGMENT'
    setupData: 'STARTROUND'
  }
  eventsCausingDelays: {
    GO: 'xstate.after(ONE)#spelen.countdown.1'
    ONE: 'xstate.after(TWO)#spelen.countdown.2'
    SOUNDTIME: 'xstate.after(GO)#spelen.countdown.GO!'
    THREE: 'STARTCOUNTDOWN'
    TWO: 'xstate.after(THREE)#spelen.countdown.3'
  }
  eventsCausingGuards: {}
  eventsCausingServices: {}
  matchesStates:
    | 'FinishedPlayingUitdagingMode'
    | 'countdown'
    | 'countdown.1'
    | 'countdown.2'
    | 'countdown.3'
    | 'countdown.GO!'
    | 'idle'
    | 'playing'
    | 'playing.guessHeardFragment'
    | 'playing.initializePlaying'
    | 'playing.playSound'
    | 'playing.restAfterAnswering'
    | 'startRound'
    | {
        countdown?: '1' | '2' | '3' | 'GO!'
        playing?: 'guessHeardFragment' | 'initializePlaying' | 'playSound' | 'restAfterAnswering'
      }
  tags: never
}
