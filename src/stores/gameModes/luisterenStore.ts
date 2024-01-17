import { mountStoreDevtool } from 'simple-zustand-devtools'
import { FormattedData, FragmentSceneData, Scene } from './../../../types/SceneData'
import { create } from 'zustand'

type LuisterenState = {
  startTime: number
  endTime: number
  timePlayed: number
  score: number
  level: number
  subLevel: number
  mode: number
  allPlayedScenes: Scene[]
  sceneData: Scene
  isPlaying: boolean
  usedFragmentsMap: { [key: number]: number }
  newUsedFragmentsMap: {
    [fragmentId: number]: {
      [octaveNumber: number]: number
    }
  }
}

type LuisterenActions = {
  addNewUsedFragment: (fragmentId: number, octaveNumber: number) => void
  addNewUsedFragments: (
    fragmentIdWithOctave: { fragmentId: number; octaveNumber: number }[],
  ) => void
  addUsedFragment: (fragmentId: number) => void
  addUsedFragments: (fragmentIds: number[]) => void
  setUsedFragments: (fragmentIds: number[]) => void
  resetUsedFragments: () => void
  setLevelSublevelMode: (level: number, subLevel: number, mode: number) => void
  addNewUserSceneAnswer: (isCorrect: boolean | undefined) => void
  getFormattedStoreData: (id_user: string) => FormattedData
  addScore: (score: number) => void
  addScene: (scene: Scene) => void
  setTimePlayed: (time: number) => void
  setPlayedFragmentId: (fragmentId: number) => void
  addRelistenFragment: (fragmentId: number) => void
  AddSceneData: (items: FragmentSceneData[]) => void
  setChosenFragmentLatency: (latency: number) => void
  setChosenFragment: (fragmentId: number | undefined) => void
  setSceneStartTime: (date: Date) => void
  getPercentageCorrectlyAnswered: () => number
  setStartTime: (time: number) => void
  setEndTime: (time: number) => void
  resetSceneRelatedData: () => void
  getRelistenCounts: () => { [key: number]: number }
  reset: () => void
  setIsPlaying: (isPlaying: boolean) => void
}

const initialState: LuisterenState = {
  startTime: 0,
  endTime: 0,
  timePlayed: 0,
  score: 0,
  level: 0,
  subLevel: 0,
  mode: 0,
  sceneData: {},
  allPlayedScenes: [],
  isPlaying: false,
  usedFragmentsMap: {},
  newUsedFragmentsMap: {},
}

const initialRoundState: Partial<LuisterenState> = {
  sceneData: {},
}

export const useLuisterenStore = create<LuisterenState & LuisterenActions>((set, get) => ({
  timePlayed: 0,
  score: 0,
  startTime: 0,
  endTime: 0,
  level: 0,
  subLevel: 0,
  mode: 0,
  isPlaying: false,
  sceneData: {},
  allPlayedScenes: [],
  usedFragmentsMap: [],
  newUsedFragmentsMap: [],
  addNewUsedFragment: (fragmentId: number, octaveNumber: number) =>
    set((state) => {
      const fragmentMap = state.newUsedFragmentsMap[fragmentId] || {}
      const newCount = (fragmentMap[octaveNumber] || 0) + 1
      return {
        newUsedFragmentsMap: {
          ...state.newUsedFragmentsMap,
          [fragmentId]: {
            ...fragmentMap,
            [octaveNumber]: newCount,
          },
        },
      }
    }),
  addNewUsedFragments: (fragmentIdWithOctave: { fragmentId: number; octaveNumber: number }[]) =>
    set((state) => {
      const newMap = { ...state.newUsedFragmentsMap }
      for (const { fragmentId, octaveNumber } of fragmentIdWithOctave) {
        const fragmentMap = newMap[fragmentId] || {}
        fragmentMap[octaveNumber] = (fragmentMap[octaveNumber] || 0) + 1
        newMap[fragmentId] = fragmentMap
      }
      return { newUsedFragmentsMap: newMap }
    }),
  addUsedFragment: (fragmentId: number) =>
    set((state) => {
      const newCount = (state.usedFragmentsMap[fragmentId] || 0) + 1
      return { usedFragmentsMap: { ...state.usedFragmentsMap, [fragmentId]: newCount } }
    }),
  addUsedFragments: (fragmentIds: number[]) =>
    set((state) => {
      const newMap = { ...state.usedFragmentsMap }
      for (const fragmentId of fragmentIds) {
        newMap[fragmentId] = (newMap[fragmentId] || 0) + 1
      }
      return { usedFragmentsMap: newMap }
    }),
  setUsedFragments: (fragmentIds: number[]) =>
    set(() => {
      const newMap: { [key: number]: number } = {}
      for (const fragmentId of fragmentIds) {
        newMap[fragmentId] = (newMap[fragmentId] || 0) + 1
      }
      return { usedFragmentsMap: newMap }
    }),
  resetUsedFragments: () => set(() => ({ usedFragmentsMap: {}, newUsedFragmentsMap: {} })),
  addScene: (scene: Scene) =>
    set((state) => ({ allPlayedScenes: [...state.allPlayedScenes, scene] })),
  AddSceneData: (items: FragmentSceneData[]) =>
    set((state) => {
      const newScene = { ...state.sceneData }
      newScene.sceneFragments = items
      return { sceneData: newScene }
    }),
  setChosenFragment: (fragmentId: number | undefined) =>
    set((state) => {
      const newScene = { ...state.sceneData }
      newScene.chosenFragment = fragmentId
      return { sceneData: newScene }
    }),
  setSceneStartTime: (date: Date) =>
    set((state) => {
      const newScene = { ...state.sceneData }
      newScene.startTime = date
      return { sceneData: newScene }
    }),
  setChosenFragmentLatency: (latency: number) =>
    set((state) => {
      const newScene = { ...state.sceneData }
      newScene.chosenFragmentlatency = latency
      return { sceneData: newScene }
    }),
  setPlayedFragmentId: (fragmentId: number) =>
    set((state) => {
      const newScene = { ...state.sceneData }
      newScene.id_playedFragment = fragmentId
      return { sceneData: newScene }
    }),
  addRelistenFragment: (fragmentId: number) =>
    set((state) => {
      const newScene = { ...state.sceneData }
      if (newScene.relistenFragments) {
        newScene.relistenFragments.push(fragmentId)
      } else {
        newScene.relistenFragments = [fragmentId]
      }
      return { sceneData: newScene }
    }),
  addNewUserSceneAnswer: (isCorrect: boolean | undefined) =>
    set((state) => {
      const newScene = { ...state.sceneData }
      newScene.answeredCorrectly = isCorrect
      return { sceneData: newScene }
    }),
  setIsPlaying: (isPlaying: boolean) => set((state) => ({ isPlaying })),
  addScore: (score: number) => set((state) => ({ score: state.score + score })),
  setStartTime: (time: number) => set((state) => ({ startTime: time })),
  setEndTime: (time: number) => set((state) => ({ endTime: time })),
  setTimePlayed: (time: number) => set((state) => ({ timePlayed: state.timePlayed + time })),
  setLevelSublevelMode: (level: number, subLevel: number, mode: number) =>
    set((state) => ({ level, subLevel, mode })),
  getPercentageCorrectlyAnswered: () => {
    const { allPlayedScenes } = get()

    const amountCorrect = allPlayedScenes.reduce((total, scene) => {
      return scene.answeredCorrectly ? total + 1 : total
    }, 0)

    const percentage = (amountCorrect / allPlayedScenes.length) * 100

    return parseFloat(percentage.toFixed(2))
  },
  getRelistenCounts: (): { [key: number]: number } => {
    const { sceneData } = get()
    if (!sceneData || !sceneData.relistenFragments) {
      return {}
    }

    return sceneData.relistenFragments.reduce<{ [key: number]: number }>((counts, id) => {
      counts[id] = (counts[id] || 0) + 1
      return counts
    }, {})
  },
  getFormattedStoreData: (id_user: string) => {
    const { startTime, endTime, score, level, subLevel, mode, allPlayedScenes, getRelistenCounts } =
      get()

    const Scenes = allPlayedScenes.map((scene) => {
      const sceneFragments =
        scene.sceneFragments?.map((fragment) => {
          return {
            id_fragment: fragment.id_fragment,
            fragmentIndex: fragment.fragmentIndex,
            groundTone: fragment.groundTone,
            octave: fragment.octave,
          }
        }) ?? []

      // Use getRelistenCounts to gather and format relistenFragments data
      const relistenCounts = getRelistenCounts()
      const relistenFragments = Object.keys(relistenCounts).map((key) => {
        return {
          id_fragment: parseInt(key),
          relistenCount: relistenCounts[parseInt(key)] as number,
        }
      })

      return {
        chosenFragmentLatency: scene.chosenFragmentlatency,
        answeredCorrectly: scene.answeredCorrectly,
        id_chosenFragment: scene.chosenFragment,
        id_playedFragment: scene.id_playedFragment,
        startTime: scene.startTime,
        sceneFragments: sceneFragments,
        relistenFragments: relistenFragments,
      }
    })

    return {
      id_User: id_user,
      id_level: level,
      id_subLevel: subLevel,
      id_gameMode: mode,
      startTime: new Date(startTime),
      endTime: new Date(endTime),
      score: score,
      Scenes: Scenes,
    }
  },
  reset: () => set(initialState),
  resetSceneRelatedData: () => set(initialRoundState),
}))

if (process.env.NODE_ENV === 'development') {
  mountStoreDevtool('LuisterenStore', useLuisterenStore)
}
