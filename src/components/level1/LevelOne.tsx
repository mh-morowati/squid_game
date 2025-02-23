"use client"
import GameBoard from "./GameBoard"
import DollMusic from "../sounds/DollMusic"
import { useGameLogic } from "@/lib/hooks/level1/useGameLogic"
import { Button } from "@heroui/button"
import PinkSoldier from "../sounds/PinkSoldier"
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
        
    const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate asset loading (adjust time if needed)
    const timer = setTimeout(() => {
      setLoading(false)
    }, 3000)

    return () => clearTimeout(timer)

  }, []);

  if (loading || !gameStarted) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-black text-white text-2xl">
            <h1>
                 Loading Game...
           </h1>
           {!loading && <Button onPress={() => setGameStarted(true)}>
               Start
            </Button>}
      </div>
    );
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