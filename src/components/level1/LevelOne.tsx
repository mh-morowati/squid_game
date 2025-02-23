"use client"
import GameBoard from "./GameBoard"
import DollMusic from "../sounds/DollMusic"
import { useGameLogic } from "@/lib/hooks/level1/useGameLogic"
import { Button } from "@heroui/button"
import Image from "next/image"
import { useEffect, useState } from "react"


const LevelOne = () => {

     const { timeLeft,
    player, 
    contestants,
    allFinished,
    greenLightCounter,
    greenLight,
    onMoveStart,
    onMoveStop,
    setGameStarted,
    gameStarted} = useGameLogic()
        
    const [loading, setLoading] = useState(true)

  useEffect(() => {

    const timer = setTimeout(() => {
      setLoading(false)
    }, 3000)

    return () => clearTimeout(timer)

  }, [])

  if (loading || !gameStarted) {
    return (
     <div className="w-full h-screen bg-pink-400 place-content-center">
                <div
                    className="place-content-center place-items-center place-self-center
         sm:min-h-96 rounded sm:w-[500px] w-[90%] bg-slate-400 p-6"
                >
          <Image
             src={"/squid-game-start.jpg"}
              alt={"squid-game-start"}
              width={400}
              height={300}
                    />
                    <h1 className="text-2xl font-medium text-white my-3">
                        Squid Game Online
                    </h1>
          {!loading ? <Button
            onPress={() => setGameStarted(true)}
            color="secondary"
                        size="lg"
          >
                              Start Game
          </Button> :
            <h1>loading...</h1>
          }
        
                </div>
            </div>
    )
  }
    
    return (<div>
                <GameBoard
                    timeLeft={timeLeft}
                    player={player.current}
                    contestants={contestants}
                    allFinished={allFinished}
                    onMoveStart={onMoveStart}
                    onMoveStop={onMoveStop}
                    />
                    <DollMusic
                        greenLight={greenLight.current}
                        greenLightDuration={greenLightCounter.current}
                        allPlayerFinished={allFinished}
                        playerGameOver={player.current.gameOver} />
            </div>)
}

export default LevelOne