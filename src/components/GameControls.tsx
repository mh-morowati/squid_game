import { Button } from "@heroui/button"

interface GameControlsProps {
  onMoveStart: () => void
  onMoveStop: () => void
}

const GameControls = ({ onMoveStart, onMoveStop }: GameControlsProps) => {

  return (
    <Button
      className="absolute border left-1/2 top-1/3"
      onMouseEnter={onMoveStart}
      onMouseLeave={onMoveStop}
      onTouchStart={onMoveStart}
      onTouchEnd={onMoveStop}
    >
      Move
    </Button>
  )
}

export default GameControls