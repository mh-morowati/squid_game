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
      
      greenLightSound.current.stop()
      return
    }
    
    if (greenLight) {

      const greenLightSeconds = greenLightDuration / 60
      const speed =  musicDuration / greenLightSeconds
      
      greenLightSound.current.rate(speed)
      
      greenLightSound.current.play()
    } else {
      greenLightSound.current.stop() 
    }

    return () => {
      greenLightSound.current?.stop() 
    };
  }, [greenLight])

  return null
}

export default DollMusic