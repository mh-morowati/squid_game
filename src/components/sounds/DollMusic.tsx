import { useGameStore } from '@/store/gameStore'
import { Howl } from 'howler'
import { useEffect, useRef } from 'react'


const DollMusic = () => {

  const {greenLight,
       player,
    greenLightCounter,
  allFinished} = useGameStore()

     const greenLightSound = useRef<Howl | null>(null)
  const musicDuration = 5.5
  
  useEffect(() => {
    if (!greenLightSound.current) {
      greenLightSound.current = new Howl({
        src: ['/sounds/arosak-sound.mp3'],
        loop: false, 
      })
    }

     if (player.gameOver || allFinished) {
      
      greenLightSound.current.stop()
      return
    }
    
    if (greenLight) {

      const greenLightSeconds = greenLightCounter / 60
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