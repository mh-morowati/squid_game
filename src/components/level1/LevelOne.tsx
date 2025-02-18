"use client"
import GameBoard from "./GameBoard"
import DollMusic from "../sounds/DollMusic"
import { useGameLogic } from "@/lib/hooks/level1/useGameLogic"
import { Button } from "@heroui/button"
import PinkSoldier from "../sounds/PinkSoldier"
import Image from "next/image"
import { useState } from "react"

const LevelOne = () => {

     const { gameStarted,timeLeft, setGameStarted,
    player, 
    contestants,
    allFinished,
    greenLightCounter,
    greenLight,
    onMoveStart,
        onMoveStop } = useGameLogic()
    
    const [start,setstart] = useState(false)
    
    return (<div>
        {!start ? (
            <div className="w-full h-screen bg-pink-400 place-content-center">
                <PinkSoldier />
                <div
                    className="place-content-center place-items-center place-self-center
         sm:min-h-96 rounded sm:w-[500px] w-[90%] bg-slate-400 p-6"
                >
                    <Image
                        src={"/squid-game-start.jpg"}
                        alt={""}
                        width={400}
                        height={300}
                    />
                    <h1 className="text-2xl font-medium text-white my-3">
                        Squid Game Online
                    </h1>
                    <Button
                        onClick={() => setstart(true)}
                        color="secondary"
                        size="lg" >
                        Start Game
                    </Button>
        
                </div>
            </div>
        ) : (
            <>
                
            
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
                />
            </>
    
        )}
            </div>)
}

export default LevelOne