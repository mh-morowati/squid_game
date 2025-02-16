"use client"
import { useEffect } from "react"
import { Howl } from "howler"

const PinkSoldier = () => {

  useEffect(() => {
     
    // Initialize the sound
    const sound = new Howl({
      src: ["/sounds/SQUAD GAME OST -  season 1 (320).mp3"],
      volume: 1,
      loop: true,
      autoplay: true,
    })
 sound.play()
    // Cleanup
    return () => {
      sound.unload() // Unload the sound when the component unmounts
    }
   }, [])
  
    return(<></>)
}

export default PinkSoldier