"use client"
import GameBoard from "./GameBoard"
import DollMusic from "../sounds/DollMusic"
import { Button } from "@heroui/button"
import { useGameStore } from '@/store/redLightGreenLightStore'
import Image from "next/image"
import { useEffect, useState } from "react"


const LevelOne = () => {

     const { gameStarted,setGameStarted} = useGameStore()
  const resetGame = useGameStore(state => state.resetGame)
    const [loading, setLoading] = useState(true)

  useEffect(() => {
    preloadImages([
    "/player.png",
    "/tree_prev_ui.png",
    "/lose-game123-ezgif.com-gif-to-webp-converter.webp",
      "/winning-gif.gif",
      "/doll.png",
      "/kill-blood.png",
      "/squid-game-gif-6.gif",
    "/squid-game-start.jpg"
  ])
  }, [])
  
  useEffect(() => {
    resetGame()
  }, [])

  useEffect(() => {

    const timer = setTimeout(() => {
      setLoading(false)
    }, 3000)

    return () => clearTimeout(timer)

  }, [])

  const preloadImages = (srcArray: string[]) => {
  srcArray.forEach((src) => {
    const img = new window.Image() as HTMLImageElement
    img.src = src           // 👈 browser starts loading it
  })
}


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
                <GameBoard />
                    <DollMusic />
            </div>)
}

export default LevelOne