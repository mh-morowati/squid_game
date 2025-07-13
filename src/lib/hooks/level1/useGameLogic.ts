import { Random } from "random-js"
import { useEffect, useRef, useState } from "react"
import { __raf, raf } from 'rafz'

type ContestantType = {
  x: number
  y: number
  name: string
  gameOver: boolean
  speed: number
  winner: boolean
}

export const useGameLogic = () => {

  const [gameStarted, setGameStarted] = useState(false)
  const [timeLeft, setTimeLeft] = useState(60)
  const [allFinished, setAllFinished] = useState(false)
  const greenLight = useRef(false)
  const greenLightCounter = useRef(230)
  const animationRef = useRef<number | null>(null)
  const contestants = useRef<ContestantType[]>([])
  const [moving, setMoving] = useState(false)
  const [_, setRenderState] = useState(0)

  
  const random = new Random()
  
  const player = useRef<ContestantType>({
    x: 0,
    y: 0,
    name: 'player',
    gameOver: false,
    speed: 1,
    winner: false,
  })

  const lastFrameTime = useRef(performance.now())
  

useEffect(() => {
  if (gameStarted) {
    switchLight()
    raf(render)
  }
}, [gameStarted])

   // Initialize game entities
  useEffect(() => {

    if (typeof window !== "undefined") {
      const screenHeight = window.innerHeight
      const playerSpeedFactor = screenHeight / 1000
      const speedFactor = screenHeight / 1700

      player.current.speed = playerSpeedFactor < 1.3 ?
        random.real((playerSpeedFactor * 1.7), (playerSpeedFactor * 2.6), true) :
        random.real((playerSpeedFactor * 2.1), (playerSpeedFactor * 3),true)
      
      player.current.x = Math.random() * (window.innerWidth - window.innerWidth * 0.052)
      player.current.y = window.innerHeight * 0.89

      for (let i = 0; i < 50; i++) {
        contestants.current.push({
          x: Math.random() * (window.innerWidth - (window.innerWidth * 0.052)),
          y: window.innerHeight,
          name: i.toString(),
          gameOver: false,
          speed: speedFactor < 1.3 ?
            random.real((speedFactor / 2), (speedFactor), true)  :
            random.real((speedFactor), (speedFactor * 1.1), true),
         winner: false,
        })
      }
    }
  }, [])

   // Countdown timer logic
  useEffect(() => {

    if (gameStarted && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => prev - 1)
      }, 1000)
      return () => clearInterval(timer)

    } else if (timeLeft === 0) {

      for (let i = 0; i < contestants.current.length; i++) {
        if (contestants.current[i].y >= 50) {
          contestants.current[i].gameOver = true
        }
      }
      if (player.current.y >= 50) {

        player.current.gameOver = true

      }
      setRenderState((prev) => prev + 1)
    }
  }, [gameStarted, timeLeft])

  useEffect(() => {

    if (moving && !player.current.winner) {

      const interval = setInterval(() => {
        if (!greenLight.current) {
          if (!player.current.winner) {
          player.current.gameOver = true
          setMoving(false)
   }

        } else {

          if (player.current.y > 20) { 

            player.current.y -= player.current.speed

          } else {

            player.current.y = 20
            player.current.winner = true
            setMoving(false)
          }
        }
      }, 50)

      return () => clearInterval(interval)
    }
  }, [moving])

  const render = () => {
     
    if (!gameStarted) return
    
 const currentTime = performance.now()
    const delta = (currentTime - lastFrameTime.current) / (1000 / 60)
    lastFrameTime.current = currentTime
    
    if (player.current.gameOver) {
      cancelAnimationFrame(animationRef.current ?? 0)
      return
    }

    let allFinishedOrEliminated = player.current.winner

    for (let i = 0; i < contestants.current.length; i++) {

      if (contestants.current[i].y < 20) {
        contestants.current[i].y = 20
        contestants.current[i].winner = true
      }
      if (!contestants.current[i].winner &&
        !contestants.current[i].gameOver) {
        allFinishedOrEliminated = false
      }

      if (greenLight.current &&
        !contestants.current[i].gameOver
        && !contestants.current[i].winner) {

        contestants.current[i].y -= contestants.current[i].speed * delta

      } else if (Math.random() * 1000 < 1 &&
          !contestants.current[i].winner && 
          contestants.current[i].y > 50) {
          
          contestants.current[i].gameOver = true
      }
    }

    if (moving && !player.current.winner) {
      player.current.y -= player.current.speed * delta
    }

  if (allFinishedOrEliminated) {
    setAllFinished(true)
    }
    
    setRenderState((prev) => prev + 1)

    raf(render)
  }

  const switchLight = () => {
  greenLight.current = !greenLight.current

  const nextDuration = greenLight.current
    ? random.integer(2000, 4000) 
    : random.integer(2000, 3000) 

  greenLightCounter.current = Math.floor(nextDuration / (1000 / 60))

  setTimeout(switchLight, nextDuration) 
}

   const onMoveStart = () => {
     if (!player.current.winner &&
       greenLight.current &&
       !player.current.gameOver) {
      setMoving(true)
    } else if (!player.current.winner) {
      player.current.gameOver = true
    }
  }

  const onMoveStop = () => {
    setMoving(false)
  }

  return ({
    timeLeft,
    setGameStarted,
    gameStarted,
     greenLight,
     greenLightCounter,
     player,
     contestants,
    allFinished,
    onMoveStart,
    onMoveStop})
}