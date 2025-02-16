import  GameTimer  from "./GameTimer"
import  GameControls  from "./GameControls"
import Contestant from "./contestant"
import Doll from "./doll"
import Finish from "./finish"
import PlayGround from "./playground"

interface GameBoardProps {
  timeLeft: number
  player: any
  contestants: any
  allFinished: boolean
  onMoveStart: () => void
  onMoveStop: () => void
}

const GameBoard = ({ timeLeft,
     player,
     contestants,
     allFinished,
     onMoveStart, 
    onMoveStop }: GameBoardProps) => {
      
  return (
    <PlayGround>

      <GameTimer timeLeft={timeLeft} />

      <GameControls onMoveStart={onMoveStart} onMoveStop={onMoveStop} />

      <Finish isGameOver={player.gameOver} allPlayerFinished={allFinished} />

      <Doll />

      <Contestant x={player.x} y={player.y} name={player.name} gameOver={player.gameOver} />
      
      {contestants.current.map((c: any) => (
        <Contestant key={c.name} x={c.x} y={c.y} name={c.name} gameOver={c.gameOver} />
      ))}

    </PlayGround>
  )
}

export default GameBoard