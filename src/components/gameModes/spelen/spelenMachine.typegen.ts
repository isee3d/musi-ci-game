// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  '@@xstate/typegen': true
  internalEvents: {
    'xstate.after(GO)#spelen.countdown.GO!': { type: 'xstate.after(GO)#spelen.countdown.GO!' }
    'xstate.after(ONE)#spelen.countdown.1': { type: 'xstate.after(ONE)#spelen.countdown.1' }
    'xstate.after(SOUNDTIME)#spelen.playing.initializePlaying': {
      type: 'xstate.after(SOUNDTIME)#spelen.playing.initializePlaying'
    }
    'xstate.after(THREE)#spelen.countdown.3': { type: 'xstate.after(THREE)#spelen.countdown.3' }
    'xstate.after(TWO)#spelen.countdown.2': { type: 'xstate.after(TWO)#spelen.countdown.2' }
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
    initializeContext: 'STARTROUND'
    onCountdownStarted: 'FINISHEDLISTENING' | 'STARTCOUNTDOWN'
    onFinishedPlaying: 'CANCELLEDPLAYING' | 'FINISHEDPLAYING'
    saveLatency: 'GUESSEDFRAGMENT'
    setGuessedFragment: 'GUESSEDFRAGMENT'
    setupData: 'STARTROUND'
  }
  eventsCausingDelays: {
    GO: 'xstate.after(ONE)#spelen.countdown.1'
    ONE: 'xstate.after(TWO)#spelen.countdown.2'
    SOUNDTIME: 'xstate.after(GO)#spelen.countdown.GO!'
    THREE: 'FINISHEDLISTENING' | 'STARTCOUNTDOWN'
    TWO: 'xstate.after(THREE)#spelen.countdown.3'
  }
  eventsCausingGuards: {}
  eventsCausingServices: {}
  matchesStates:
    | 'CancelledPlayingSpelenMode'
    | 'FinishedPlayingSpelenMode'
    | 'countdown'
    | 'countdown.1'
    | 'countdown.2'
    | 'countdown.3'
    | 'countdown.GO!'
    | 'exitGame'
    | 'idle'
    | 'playing'
    | 'playing.guessHeardFragment'
    | 'playing.initializePlaying'
    | 'playing.listenToFragments'
    | 'playing.playSound'
    | 'startRound'
    | {
        countdown?: '1' | '2' | '3' | 'GO!'
        playing?: 'guessHeardFragment' | 'initializePlaying' | 'listenToFragments' | 'playSound'
      }
  tags: never
}
