import { useEffect, useRef, useState } from "react"

type ContestantType = {
  x: number
  y: number
  name: string
  gameOver: boolean
  speed: number
}

export const useGameLogic = () => {

  const [gameStarted, setGameStarted] = useState(false)
  const [state, setState] = useState({})
  const [timeLeft, setTimeLeft] = useState(60)
  const [allFinished, setAllFinished] = useState(false)
  const greenLight = useRef(true)
  const greenLightCounter = useRef(100)
  const animationRef = useRef<number | null>(null)
  const contestants = useRef<ContestantType[]>([])
  const [moving, setMoving] = useState(false)
  
  const player = useRef<ContestantType>({

    x: Math.random() * (window.innerWidth - (window.innerWidth * 0.052)),
    y: window.innerHeight * 0.89,
    name: 'player',
    gameOver: false,
    speed: 2
  })

  useEffect(() => {

    greenLight.current = true
    greenLightCounter.current = Math.floor(120 + Math.random() * 120)

    for (let i = 0; i < 50; i++) {
      contestants.current.push({
        x: Math.random() * (window.innerWidth - (window.innerWidth * 0.052)),
        y: window.innerHeight * 0.93,
        name: i.toString(),
        gameOver: false,
        speed: 0.5 + Math.random() * 0.3
      })
    }

    requestAnimationFrame(render)
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
      setState({})
    }
  }, [gameStarted, timeLeft])

  useEffect(() => {

    if (moving) {

      const interval = setInterval(() => {
        if (!greenLight.current) {

          // ❌ Game over if moving during red light
          player.current.gameOver = true
          setMoving(false)

        } else {

          if (player.current.y > 20) { 

            // ✅ Move the player upwards
            player.current.y -= player.current.speed

          } else {

            // ✅ Stop movement at the finish line
            player.current.y = 20
            setMoving(false)
          }
        }
      }, 50) // Adjust speed

      return () => clearInterval(interval) // ✅ Cleanup interval when stopping
    }
  }, [moving]) // ✅ Triggers whenever `moving` changes

   const onMoveStart = () => {
    if (greenLight.current && !player.current.gameOver) {
      setMoving(true) // ✅ Start moving
    } else {
      player.current.gameOver = true
    }
  }

  const onMoveStop = () => {
    setMoving(false) // ✅ Stop moving
  }

  const render = () => {

    if (player.current.gameOver) {
      setAllFinished(true)
      cancelAnimationFrame(animationRef.current!)
      return
    }

    greenLightCounter.current--
    if (greenLightCounter.current < 0) {

      greenLight.current = !greenLight.current
      greenLightCounter.current = 120 + Math.random() * 100
    }

    let allFinishedOrEliminated = true

    for (let i = 0; i < 50; i++) {

      if (contestants.current[i].y < 20) {
        contestants.current[i].y = 20
      } else if (!contestants.current[i].gameOver) {
        allFinishedOrEliminated = false
      }

      if (greenLight.current && !contestants.current[i].gameOver) {

        contestants.current[i].y -= contestants.current[i].speed

      } else {
        if (Math.random() * 1000 < 1 && contestants.current[i].y > 50) {
          contestants.current[i].gameOver = true
        }
      }
    }

      // ✅ Move player only if `moving` is true
    if (moving) {
      player.current.y -= player.current.speed
    }

    setState({})
    if (!allFinishedOrEliminated) {
      requestAnimationFrame(render)
    } else {
      setAllFinished(true)
    }
  }

  return ({ gameStarted, setGameStarted,
     timeLeft,
     greenLight,
     greenLightCounter,
     player,
     contestants,
    allFinished,
    onMoveStart,
    onMoveStop})
}