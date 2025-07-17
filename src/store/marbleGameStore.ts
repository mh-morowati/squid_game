import { create } from "zustand"
import { MarbleGameState } from "./types"

export const useMarbleGameStore = create<MarbleGameState>((set) => ({
  playerMarbles: 10,
  computerMarbles: 10,
  phase: "player-guess",
  message: "حریف دستش رو مخفی کرده حدس بزن زوج یا فرد🤖",
  isGameOver: false,
  updateState: (updates) => set((state) => ({ ...state, ...updates })),
  resetGame: () =>
    set({
      playerMarbles: 10,
      computerMarbles: 10,
      phase: "player-guess",
      message: "حریف دستش رو مخفی کرده حدس بزن زوج یا فرد🤖",
      isGameOver: false,
    }),
}));
