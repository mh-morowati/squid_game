"use client"
import { useEffect, useState } from "react";
import { Howl } from "howler";

const PinkSoldier = () => {

   useEffect(() => {
    // Initialize the sound
    const sound = new Howl({
      src: ["/sounds/SQUAD GAME OST -  season 1 (320).mp3"], // Path to your background music file in the public folder
      volume: 1, // Adjust volume (0.0 to 1.0)
      loop: true, // Loop the background music
      autoplay: true, // Automatically play the music when the page loads
    });
 sound.play();
    // Cleanup
    return () => {
      sound.unload(); // Unload the sound when the component unmounts
    };
   }, []);
  
    return(<></>)
}

export default PinkSoldier