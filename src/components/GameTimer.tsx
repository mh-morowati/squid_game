interface GameTimerProps {
  timeLeft: number
}

const GameTimer = ({ timeLeft }: GameTimerProps) => {

  return (
    <h1
      className="absolute left-1/2 sm:text-2xl max-sm:left-1/3 bg-black text-red-600 p-1 rounded-lg"
    >

      {timeLeft}

    </h1>
  )
}

export default GameTimer