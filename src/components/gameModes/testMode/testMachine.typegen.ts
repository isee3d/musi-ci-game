// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  '@@xstate/typegen': true
  internalEvents: {
    'done.invoke.testMode.playing.playSound:invocation[0]': {
      type: 'done.invoke.testMode.playing.playSound:invocation[0]'
      data: unknown
      __tip: 'See the XState TS docs to learn how to strongly type this.'
    }
    'xstate.after(1000)#testMode.playing.restAfterAnswering': {
      type: 'xstate.after(1000)#testMode.playing.restAfterAnswering'
    }
    'xstate.after(10000)#testMode.playing.guessHeardFragment': {
      type: 'xstate.after(10000)#testMode.playing.guessHeardFragment'
    }
    'xstate.after(3000)#testMode.playing.didNotAnswerFragment': {
      type: 'xstate.after(3000)#testMode.playing.didNotAnswerFragment'
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
    onCountdownStarted: 'RESUMEGAME' | 'xstate.after(GO)#testMode.countdown.GO!'
    onFinishedPlaying: 'FINISHEDPLAYING'
    saveLatency: 'GUESSEDFRAGMENT'
    saveScene: 'GUESSEDFRAGMENT' | 'xstate.after(3000)#testMode.playing.didNotAnswerFragment'
    setGuessedFragment: 'GUESSEDFRAGMENT'
    setupData: 'STARTROUND'
    startPlaying: 'STARTROUND'
    timedOutAnswering: 'xstate.after(10000)#testMode.playing.guessHeardFragment'
  }
  eventsCausingDelays: {
    GO: 'xstate.after(ONE)#testMode.countdown.1'
    ONE: 'xstate.after(TWO)#testMode.countdown.2'
    SOUNDTIME: 'RESUMEGAME' | 'xstate.after(GO)#testMode.countdown.GO!'
    THREE: 'STARTCOUNTDOWN'
    TWO: 'xstate.after(THREE)#testMode.countdown.3'
  }
  eventsCausingGuards: {}
  eventsCausingServices: {}
  matchesStates:
    | 'FinishedPlayingTestMode'
    | 'countdown'
    | 'countdown.1'
    | 'countdown.2'
    | 'countdown.3'
    | 'countdown.GO!'
    | 'idle'
    | 'pausedGame'
    | 'playing'
    | 'playing.didNotAnswerFragment'
    | 'playing.guessHeardFragment'
    | 'playing.initializePlaying'
    | 'playing.playSound'
    | 'playing.restAfterAnswering'
    | 'startRound'
    | {
        countdown?: '1' | '2' | '3' | 'GO!'
        playing?:
          | 'didNotAnswerFragment'
          | 'guessHeardFragment'
          | 'initializePlaying'
          | 'playSound'
          | 'restAfterAnswering'
      }
  tags: never
}
