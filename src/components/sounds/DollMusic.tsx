import { Howl } from 'howler';
import { useEffect, useRef } from 'react';

type GameAudioProps = {
  greenLight: boolean;
   greenLightDuration: number; // Add duration as a prop
};

const DollMusic = ({ greenLight,greenLightDuration }: GameAudioProps) => {

     const greenLightSound = useRef<Howl | null>(null);

  useEffect(() => {
    if (!greenLightSound.current) {
      greenLightSound.current = new Howl({
        src: ['/sounds/SQUAD GAME OST -  arosak (320).mp3'], // Replace with actual file path
        volume: 0.5,
        loop: false, // Prevent looping, so it cuts off when red light happens
        rate: 1, // Default speed
      });
    }

    if (greenLight) {
          // Set playback speed based on green light duration (shorter = faster)
      const minDuration = 100; // Minimum duration
      const maxDuration = 200; // Maximum duration
      const speed = 1 + (1 * (1 - (greenLightDuration - minDuration) / (maxDuration - minDuration)));
      
      greenLightSound.current.rate(speed);
      
      greenLightSound.current.play();
    } else {
      greenLightSound.current.stop(); // Stop completely on red light
    }

    return () => {
      greenLightSound.current?.stop(); // Ensure it stops when unmounting
    };
  }, [greenLight]);

  return null;
}

export default DollMusic