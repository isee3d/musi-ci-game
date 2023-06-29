// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  '@@xstate/typegen': true
  internalEvents: {
    'xstate.after(1000)#testMode.playing.restAfterAnswering': {
      type: 'xstate.after(1000)#testMode.playing.restAfterAnswering'
    }
    'xstate.after(GO)#testMode.countdown.GO!': { type: 'xstate.after(GO)#testMode.countdown.GO!' }
    'xstate.after(ONE)#testMode.countdown.1': { type: 'xstate.after(ONE)#testMode.countdown.1' }
    'xstate.after(SOUNDTIME)#testMode.playing.initializePlaying': {
      type: 'xstate.after(SOUNDTIME)#testMode.playing.initializePlaying'
    }
    'xstate.after(THREE)#testMode.countdown.3': { type: 'xstate.after(THREE)#testMode.countdown.3' }
    'xstate.after(TWO)#testMode.countdown.2': { type: 'xstate.after(TWO)#testMode.countdown.2' }
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
    onCountdownStarted: 'xstate.after(GO)#testMode.countdown.GO!'
    onFinishedPlaying: 'FINISHEDPLAYING'
    saveLatency: 'GUESSEDFRAGMENT'
    saveScene: 'GUESSEDFRAGMENT'
    setGuessedFragment: 'GUESSEDFRAGMENT'
    setupData: 'STARTROUND'
  }
  eventsCausingDelays: {
    GO: 'xstate.after(ONE)#testMode.countdown.1'
    ONE: 'xstate.after(TWO)#testMode.countdown.2'
    SOUNDTIME: 'xstate.after(GO)#testMode.countdown.GO!'
    THREE: 'STARTCOUNTDOWN'
    TWO: 'xstate.after(THREE)#testMode.countdown.3'
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
