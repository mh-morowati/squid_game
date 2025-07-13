import { create } from 'zustand'
import { Random } from 'random-js'
import { raf } from 'rafz'

export type ContestantType = {
  x: number
  y: number
  name: string
  gameOver: boolean
  speed: number
  winner: boolean
}

type GameState = {
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
}

export const useGameStore = create<GameState>((set, get) => {
  const random = new Random()

  const generatePlayer = (): ContestantType => {
    const screenHeight = window.innerHeight
    const playerSpeedFactor = screenHeight / 1000

    return {
      x: Math.random() * (window.innerWidth - window.innerWidth * 0.052),
      y: window.innerHeight * 0.89,
      name: 'player',
      gameOver: false,
      speed:
        playerSpeedFactor < 1.3
          ? random.real(playerSpeedFactor * 1.7, playerSpeedFactor * 2.6, true)
          : random.real(playerSpeedFactor * 2.1, playerSpeedFactor * 3, true),
      winner: false,
    }
  }

  const generateContestants = (): ContestantType[] => {
    const screenHeight = window.innerHeight
    const speedFactor = screenHeight / 1700

    return Array.from({ length: 50 }, (_, i) => ({
      x: Math.random() * (window.innerWidth - window.innerWidth * 0.052),
      y: screenHeight,
      name: i.toString(),
      gameOver: false,
      speed:
        speedFactor < 1.3
          ? random.real(speedFactor / 2, speedFactor, true)
          : random.real(speedFactor, speedFactor * 1.1, true),
      winner: false,
    }))
  }

  let animationRef: number | null = null
  let lastFrameTime = performance.now()

  const checkAllFinished = (player: ContestantType, contestants: ContestantType[]) => {
    if (!player.winner && !player.gameOver) return false
    for (const c of contestants) {
      if (!c.winner && !c.gameOver) return false
    }
    return true
  }

  const render = () => {
    const { gameStarted, greenLight, moving, player, contestants } = get()
    if (!gameStarted) return

    const currentTime = performance.now()
    const delta = (currentTime - lastFrameTime) / (1000 / 60)
    lastFrameTime = currentTime

    const newPlayer = { ...player }
    const newContestants = contestants.map(c => ({ ...c }))

    if (!newPlayer.winner && !newPlayer.gameOver && greenLight && moving) {
      newPlayer.y -= newPlayer.speed * delta
      if (newPlayer.y <= 20) {
        newPlayer.y = 20
        newPlayer.winner = true
      }
    } else if (!greenLight && moving && !newPlayer.winner && !newPlayer.gameOver) {
      newPlayer.gameOver = true
      set({ moving: false })
    }

    for (const c of newContestants) {
      if (c.y <= 20) {
        c.y = 20
        c.winner = true
      }

      if (!c.winner && !c.gameOver) {
        if (greenLight) {
          c.y -= c.speed * delta
        } else if (Math.random() * 1000 < 1 && c.y > 50) {
          c.gameOver = true
        }
      }
    }

    const allFinished = checkAllFinished(newPlayer, newContestants)
    const gameOver = newPlayer.gameOver

    set({
      player: newPlayer,
      contestants: newContestants,
      allFinished,
      gameOver,
    })

    animationRef = raf(render)
  }

  const switchLight = () => {
    const nextIsGreen = !get().greenLight
    const duration = nextIsGreen
      ? random.integer(2000, 4000)
      : random.integer(2000, 3000)

    set({
      greenLight: nextIsGreen,
      greenLightCounter: Math.floor(duration / (1000 / 60)),
    })

    setTimeout(switchLight, duration)
  }

  return {
    timeLeft: 60,
    gameStarted: false,
    allFinished: false,
    gameOver: false,
    greenLight: false,
    greenLightCounter: 0,
    moving: false,
    player: {
      x: 0,
      y: 0,
      name: '',
      gameOver: false,
      speed: 0,
      winner: false,
    },
    contestants: [],

    setGameStarted: (value: boolean) => {
      if (value) {
        const newPlayer = generatePlayer()
        const newContestants = generateContestants()

        set({
          gameStarted: true,
          timeLeft: 60,
          greenLight: false,
          player: newPlayer,
          contestants: newContestants,
          gameOver: false,
          allFinished: false,
        })

        switchLight()
        raf(render)

        const timer = setInterval(() => {
          const current = get().timeLeft
          if (current > 0) {
            set({ timeLeft: current - 1 })
          } else {
            clearInterval(timer)
            const updatedPlayer = get().player
            const updatedContestants = get().contestants.map(c => {
              if (c.y > 50) c.gameOver = true
              return c
            })

            if (updatedPlayer.y > 50) {
              updatedPlayer.gameOver = true
            }

            set({
              player: updatedPlayer,
              contestants: updatedContestants,
              gameOver: updatedPlayer.gameOver,
              allFinished: checkAllFinished(updatedPlayer, updatedContestants),
            })
          }
        }, 1000)
      } else {
        set({ gameStarted: false })
        cancelAnimationFrame(animationRef ?? 0)
      }
    },

    onMoveStart: () => {
      const { greenLight, player } = get()
      if (!player.winner && !player.gameOver && greenLight) {
        set({ moving: true })
      } else if (!player.winner) {
        set({
          moving: false,
          player: { ...player, gameOver: true },
          gameOver: true,
        })
      }
    },

    onMoveStop: () => {
      set({ moving: false })
    },
  }
})
