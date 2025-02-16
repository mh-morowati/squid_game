"use client"
import  GameBoard  from "@/components/GameBoard"
import { useGameLogic } from "@/lib/hooks/useGameLogic"
import { Button } from "@heroui/button"
import Image from "next/image"
import PinkSoldier from "./sounds/PinkSoldier"
import DollMusic from "./sounds/DollMusic"


const RedLightGreenCom = () => {

  const { gameStarted,
     setGameStarted,
     timeLeft, 
    player, 
    contestants,
    allFinished,
    greenLightCounter,
    greenLight,
    onMoveStart,
    onMoveStop } = useGameLogic()

  return (
    <div>

      {!gameStarted ? (
        <div className="w-full h-screen bg-pink-400 place-content-center">
          <PinkSoldier />

          <div className="sm:min-h-96 rounded sm:w-[500px] w-[90%] bg-slate-400 p-6">

            <Image src="/squid-game-start.jpg" alt="" width={400} height={300} />
            <h1 className="text-2xl font-medium text-white my-3">
              Squid Game Online
            </h1>
            <Button onClick={() => setGameStarted(true)} color="secondary" size="lg">
              Start Game
            </Button>

          </div>

        </div>

      ) : (
        <>
            <DollMusic
              greenLight={greenLight.current}
              greenLightDuration={greenLightCounter.current}
            />
            
            <GameBoard
              timeLeft={timeLeft}
              player={player.current}
              contestants={contestants}
              allFinished={allFinished}
              onMoveStart={onMoveStart}
              onMoveStop={onMoveStop}
            />
          </>
          
      )}
    </div>
  )
}

export default  RedLightGreenCom