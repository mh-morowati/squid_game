import Contestant from "../Contestant"
import Finish from "../Finish"
import PlayGround from "./PlayGround"
import { Button } from "@heroui/button"
import Image from "next/image"

interface GameBoardProps {
  timeLeft: number
  player: any
  contestants: any
  allFinished: boolean
  onMoveStart: () => void
  onMoveStop: () => void
}

const GameBoard = (props: GameBoardProps) => {

  const { timeLeft,
     player,
     contestants,
     allFinished,
     onMoveStart, 
    onMoveStop } = props  
  
  return (
    <PlayGround>

       <h1
      className="absolute left-1/2 sm:text-2xl max-sm:left-1/3 bg-black text-red-600 p-1 rounded-lg"
    >
      {timeLeft}
    </h1>

        <Button
      className="absolute border left-1/2 top-1/3 min-[2000px]::w-40 min-[2000px]:h-20 min-[2000px]:text-3xl"
      onMouseEnter={onMoveStart}
      onMouseLeave={onMoveStop}
      onTouchStart={onMoveStart}
      onTouchEnd={onMoveStop}
    >
      Move
    </Button>

      <Finish isGameOver={player.gameOver} allPlayerFinished={allFinished} />

     <Image 
     className="absolute left-1/2 max-sm:left-1/3 z-50" 
     src={'/doll.png'} 
     alt={'doll'} 
     width={150} 
        height={150}
      />

      <Contestant x={player.x} y={player.y} name={player.name} gameOver={player.gameOver} />
      
      {contestants.current.map((c: any) => (
        <Contestant key={c.name} x={c.x} y={c.y} name={c.name} gameOver={c.gameOver} />
      ))}

    </PlayGround>
  )
}

export default GameBoard