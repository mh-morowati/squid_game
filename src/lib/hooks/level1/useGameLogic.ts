import { Random } from "random-js"
import { useEffect, useRef, useState } from "react"

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
  const greenLight = useRef(true)
  const greenLightCounter = useRef(100)
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

  useEffect(() => {
       // Automatically start the game when the component mounts
    setGameStarted(true) 

  },[])

  useEffect(() => {

    if (typeof window !== "undefined") {

       const screenHeight = window.innerHeight

    // Calculate a speed factor based on screen size
      const speedFactor = screenHeight / 1000
      player.current.speed = random.real((speedFactor * 1.7), (speedFactor * 2.6),true)
      // ✅ Ensuring window is available
      player.current.x = Math.random() * (window.innerWidth - window.innerWidth * 0.052)
      player.current.y = window.innerHeight * 0.89

      greenLight.current = true
      greenLightCounter.current = Math.floor(120 + Math.random() * 120)

      for (let i = 0; i < 50; i++) {
        contestants.current.push({
          x: Math.random() * (window.innerWidth - (window.innerWidth * 0.052)),
          y: window.innerHeight * 0.93,
          name: i.toString(),
          gameOver: false,
          speed: random.real((speedFactor / 2), (speedFactor),true),
         winner: false,
        })
      }

      requestAnimationFrame(render)
    }
  }, [])

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
     // ❌ Game over if moving during red light
          player.current.gameOver = true
          setMoving(false)
   }

        } else {

          if (player.current.y > 20) { 

            // ✅ Move the player upwards
            player.current.y -= player.current.speed

          } else {

            // ✅ Stop movement at the finish line
            player.current.y = 20
            player.current.winner = true
            setMoving(false)
          }
        }
      }, 50) // Adjust speed

      return () => clearInterval(interval) // ✅ Cleanup interval when stopping
    }
  }, [moving]) // ✅ Triggers whenever `moving` changes

   const onMoveStart = () => {
     if (!player.current.winner &&
       greenLight.current &&
       !player.current.gameOver) {
      setMoving(true) // ✅ Start moving
    } else if (!player.current.winner) {
      player.current.gameOver = true
    }
  }

  const onMoveStop = () => {
    setMoving(false) // ✅ Stop moving
  }

  const render = () => {

    if (player.current.gameOver) {
      cancelAnimationFrame(animationRef.current ?? 0) // ✅ Fix TypeScript error
      return
    }

    greenLightCounter.current--

    if (greenLightCounter.current < 0) {

      greenLight.current = !greenLight.current
      greenLightCounter.current = Math.floor(120 + Math.random() * 120)
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

        contestants.current[i].y -= contestants.current[i].speed

      } else if (Math.random() * 1000 < 1 &&
          !contestants.current[i].winner && 
          contestants.current[i].y > 50) {
          
          contestants.current[i].gameOver = true
      }
    }

      // ✅ Move player only if `moving` is true
    if (moving && !player.current.winner) {
      player.current.y -= player.current.speed
    }


  // ✅ If all are winners or eliminated, mark as finished
  if (allFinishedOrEliminated) {
    setAllFinished(true)
    }
    
    setRenderState((prev) => prev + 1)

    if (!allFinishedOrEliminated) {
      requestAnimationFrame(render)
    }
  }

  return ({timeLeft,
     greenLight,
     greenLightCounter,
     player,
     contestants,
    allFinished,
    onMoveStart,
    onMoveStop})
}