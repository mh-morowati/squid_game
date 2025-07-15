import { create } from "zustand";
import { MarbleGameState } from "./types";

export const useMarbleGameStore = create<MarbleGameState>((set) => ({
  playerMarbles: 10,
  computerMarbles: 10,
  phase: "player-guess",
  message: "🤖 Computer hid marbles. Guess even or odd!",
  isGameOver: false,
  updateState: (updates) => set((state) => ({ ...state, ...updates })),
  resetGame: () =>
    set({
      playerMarbles: 10,
      computerMarbles: 10,
      phase: "player-guess",
      message: "🤖 Computer hid marbles. Guess even or odd!",
      isGameOver: false,
    }),
}));
