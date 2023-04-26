import { createMachine } from 'xstate';

export const spelenMachine = createMachine({
    /** @xstate-layout N4IgpgJg5mDOIC5SwA5gDZgHYDoCWEmAxAMoAqAggEpkDCA8gKoByZAIvQOrMDaADAF1EoFAHtYeAC55RWYSAAeiAIwA2VTgBMfHQGYA7AE5dhgCwBWABy7LAGhABPFZc05zpnX13nlJ1acNVAF8g+1QMbBwAY1EAVyxJCFEAd1xlIgVYSQBDSTAcbIAzPIAnAAplTwBKInDMXBj4xJS0-iEkEDEJaVl5JQRVS2UcQ30fQP19axt9eycBzQ13T0tLQ2VDTRCwtHrouISk1K0MrNz8otKK6trdyMbDlq02+S6pGTkO-tMfnD5LfSqZT6byrQyWcyzRyIVSLNweHRgjZbUIgOr3A7NY66U45PIFYpgcqVHQ1dENTFHXC6F4dN49T6gfraDTaPRGEwWax2aELJYI-5rZHbNF3ClNKk4ADi9Fx5wJVxJfDJYv2EqeMtpInE716X0QhncOEssMmQNGkzWcxhcOWiKFmy8IvJOBQ6GyDjwWCg+Cw72y6DwAC8wAAFd2e71y-GXIllXQ3F1uj1en1e-2BkPhlPerWdHUMvoqTT6Pg4IGaayVZSmM1Q+bqDRTQzg8y6bS+dTO1XJyM+3skA4QUhMZhsABiAElmJOSAAJACibDz9I+RYQakqOGUmjb6184M0hmtA1U5i0a3BAJcpdh3YiuF7qZwUFicFgc7A2RKEHHJWyUAALbYJIRBSowC4kCQS7jlQFBSgAsgurArgWa76ggbL6DgYx8BYNgbOYu48g2Z4Xi2qxTCWfB3qiSYRs+gZZNgZCiH+AHAQksBEFOM7zkuAAys5kMh05Sqh3ToUyiCaD8hhaL4OiaL4Pg6KYJ7qOelYUde1H+PeeyFOmsAABaQEQVCQZQNASbqjKKMWJ47iEqJYKIEBwPI5KvGherSQgAC0uiqCeAVjDgAQtmYVjgu2fDKAZkQEJgPmSX5DkIKYmhOfopgjOY6guJsqiBDYKI7A+aqPKkqV2euJgnm2lh-CY4KGnhhheAldGqg8WJpLVhYYQVriTD4VjcqsXgabu8KeBspgJvF5WipVfWSpog1SRl7Z5ZRkJmAtHhqDN552vFZhLco3UVXs61PLoW3pf0AKnXNOgLVdN2rXdlIavQT32S9OjlqaZVWHF5hvedn0fd99E5lAgPrpU5hneYXWApMgI0Y1RpGHoqh4T4pa6Ilj4Md6voZsGYaU0jdK+UDKiVLobgY7owKqNjRMhbymk4ZeUwGDuwL6OTrr05LHqDvEEDIxhB7DG2UymGsIKcyWGlZVonU6OCO58LuK0I32L5vrAH5fj+7FASBCv+cCgQRQCmy6O2QJZep-Nkc2ozWPoouTBLT5U0xeRYKxtucZI8CM2lzOYZos1WEYuWWEbygFXzpHngT8Wll7ROWBLRl+qZkAOxlkInm1gstrChVcqYLlBEAA */
    id: 'spelen',
    initial: 'idle',
    context: {
        isClickable: undefined as boolean | undefined,
        isAnimating: true as boolean | undefined,
        isLooping: undefined as boolean | undefined,
    },
    schema: {
        events: {} as
            | { type: "STARTCOUNTDOWN"; }
            | { type: "STARTCOUNTDOWN"; }
            | { type: "FINISH"; }
            | { type: "RESTART"; }
            | { type: "SOUNDFINISHED"; }
            | { type: "GUESSEDFRAGMENT"; }
            | { type: "FINISHEDLISTENING"; }
    },
    tsTypes: {} as import("./spelenMachine.typegen").Typegen0,
    states: {
        idle: {
            on: {
                STARTCOUNTDOWN: 'countdown',
            },
        },
        countdown: {
            initial: '3',
            states: {
                3: {
                    after: {
                        1000: '2',
                    },
                },
                2: {
                    after: {
                        1000: '1',
                    },
                },
                1: {
                    after: {
                        1000: 'GO',
                    },
                },
                GO: {
                    after: {
                        1000: '#spelen.playing',
                    },
                },
            },
        },
        playing: {
            initial: 'initializePlaying',
            states: {
                initializePlaying: {
                    after: {
                        3000: 'playSound',
                    }
                },
                playSound: {
                    entry: 'onPlayingEntry',
                    on: {
                        SOUNDFINISHED: 'guessHeardFragment',
                    }
                },
                guessHeardFragment: {
                    on: {
                        GUESSEDFRAGMENT: 'listenToFragments',
                    },
                },
                listenToFragments: {
                    on: {
                        FINISHEDLISTENING: '#spelen.finished'
                    },
                },
            }
        },
        finished: {
            on: {
                RESTART: 'idle',
            }
        }
    }
});
