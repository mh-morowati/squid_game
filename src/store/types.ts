export type ContestantType = {
  x: number
  y: number
  name: string
  gameOver: boolean
  speed: number
  winner: boolean
}

export type GameState = {
  timeLeft: number
  gameStarted: boolean
  allFinished: boolean
  gameOver: boolean
  greenLight: boolean
  greenLightCounter: number
  moving: boolean
  player: ContestantType
  contestants: ContestantType[]

  setGameStarted: (value: boolean) => void
  onMoveStart: () => void
  onMoveStop: () => void
  resetGame: () => void
}

export type Phase = "player-guess" | "computer-guess" | "game-over";

export interface MarbleGameState {
  playerMarbles: number;
  computerMarbles: number;
  phase: Phase;
  message: string;
  isGameOver: boolean;
  updateState: (updates: Partial<MarbleGameState>) => void;
  resetGame: () => void;
}