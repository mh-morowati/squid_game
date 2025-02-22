import { Howl } from 'howler'
import { useEffect, useRef } from 'react'

type GameAudioProps = {
  greenLight: boolean
  greenLightDuration: number
  allPlayerFinished: boolean
  playerGameOver: boolean
}

const DollMusic = (props: GameAudioProps) => {

  const { greenLight,
    greenLightDuration,
    allPlayerFinished
    ,playerGameOver } = props

     const greenLightSound = useRef<Howl | null>(null);
     const musicDuration = 5.5
  useEffect(() => {

    if (!greenLightSound.current) {
      greenLightSound.current = new Howl({
        src: ['/sounds/arosak-sound.mp3'],
        loop: false, 
      });
    }

     if (playerGameOver || allPlayerFinished) {
      // Stop music completely when the game is over
      greenLightSound.current.stop()
      return
    }
    
    if (greenLight) {

      // Set playback speed based on green light duration (shorter = faster)
      const greenLightSeconds = greenLightDuration / 60
      const speed =  musicDuration / greenLightSeconds
      
      greenLightSound.current.rate(speed)
      
      greenLightSound.current.play()
    } else {
      greenLightSound.current.stop() // Stop completely on red light
    }

    return () => {
      greenLightSound.current?.stop() // Ensure it stops when unmounting
    };
  }, [greenLight])

  return null
}

export default DollMusic