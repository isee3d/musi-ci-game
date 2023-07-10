import { create } from 'zustand'

type SettingsState = {
  enteredWebsite: boolean
  lastEnteredWebsite: number
}

type SettingsActions = {
  setEnteredWebsite: (enteredWebsite: boolean) => void
  setLastEnteredWebsite: (lastEnteredWebsite: number) => void
  reset: () => void
}

const initialState: SettingsState = {
  enteredWebsite: false,
  lastEnteredWebsite: 0,
}

export const useSettingsStore = create<SettingsState & SettingsActions>((set, get) => ({
  enteredWebsite: false,
  lastEnteredWebsite: 0,
  setEnteredWebsite: (enteredWebsite: boolean) => set({ enteredWebsite }),
  setLastEnteredWebsite: (lastEnteredWebsite: number) => set({ lastEnteredWebsite }),
  reset: () => set(initialState),
}))
