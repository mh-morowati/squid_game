import { Howl } from 'howler'
import { useEffect, useRef } from 'react'

type GameAudioProps = {
  greenLight: boolean
  greenLightDuration: number
}

const DollMusic = (props: GameAudioProps) => {

  const { greenLight,greenLightDuration } = props

     const greenLightSound = useRef<Howl | null>(null);
     const musicDuration = 5.5
  useEffect(() => {

    if (!greenLightSound.current) {
      greenLightSound.current = new Howl({
        src: ['/sounds/arosak-sound.mp3'],
        loop: false, 
      });
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