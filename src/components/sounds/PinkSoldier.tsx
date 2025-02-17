"use client"
import { useEffect } from "react"
import { Howl } from "howler"

const PinkSoldier = () => {

  useEffect(() => {
     
    // Initialize the sound
    const sound = new Howl({
      src: ["/sounds/pink-soldier.mp3"],
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