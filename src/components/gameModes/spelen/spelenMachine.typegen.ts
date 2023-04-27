
// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
    '@@xstate/typegen': true;
    internalEvents: {
        "xstate.after(1000)#spelen.countdown.1": { type: "xstate.after(1000)#spelen.countdown.1" };
        "xstate.after(1000)#spelen.countdown.2": { type: "xstate.after(1000)#spelen.countdown.2" };
        "xstate.after(1000)#spelen.countdown.3": { type: "xstate.after(1000)#spelen.countdown.3" };
        "xstate.after(1000)#spelen.countdown.GO!": { type: "xstate.after(1000)#spelen.countdown.GO!" };
        "xstate.after(3000)#spelen.playing.initializePlaying": { type: "xstate.after(3000)#spelen.playing.initializePlaying" };
        "xstate.init": { type: "xstate.init" };
    };
    invokeSrcNameMap: {

    };
    missingImplementations: {
        actions: "onPlayingEntry";
        delays: never;
        guards: never;
        services: never;
    };
    eventsCausingActions: {
        "onPlayingEntry": "xstate.after(3000)#spelen.playing.initializePlaying";
    };
    eventsCausingDelays: {

    };
    eventsCausingGuards: {

    };
    eventsCausingServices: {

    };
    matchesStates: "countdown" | "countdown.1" | "countdown.2" | "countdown.3" | "countdown.GO!" | "idle" | "playing" | "playing.guessHeardFragment" | "playing.initializePlaying" | "playing.listenToFragments" | "playing.playSound" | {
        "countdown"?: "1" | "2" | "3" | "GO!";
        "playing"?: "guessHeardFragment" | "initializePlaying" | "listenToFragments" | "playSound";
    };
    tags: never;
}
