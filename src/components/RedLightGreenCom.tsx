'use client'
import Doll from '@/components/doll';
import Contestant from '@/components/contestant/index';
import Finish from '@/components/finish/index';
import PlayGround from '@/components/playground/index';
import { useEffect, useRef, useState } from "react"
import DollMusic from './sounds/DollMusic';
import Image from "next/image"
import {Button, ButtonGroup} from "@heroui/button";
import PinkSoldier from "@/components/sounds/PinkSoldier";

type ContestantType = {
  x: number
  y: number
  name: string
  gameOver: boolean
  speed: number
}

export default function RedLightGreenCom() {

    const [gameStarted, setGameStarted] = useState(false)
  const [state, setState] = useState({})
  const constentants = useRef<ContestantType[]>([])

  const finishedConstentants = useRef<ContestantType>()

  const playerConstant = useRef<ContestantType>(
    { x: Math.random() * (960 - 50), y: 660, name: 'player', gameOver: false, speed: 2 })
  
  const greenLight = useRef(true)
  const greenLightCounter = useRef(100)
  const divRef = useRef<HTMLDivElement>(null)

  const animationRef = useRef<number | null>(null);
  
  const render = (timeStamp: number) => {
    greenLightCounter.current--

    if (greenLightCounter.current < 0) {
      greenLight.current = !greenLight.current

      greenLightCounter.current = 100 + Math.random() * 100
    }

    let allFinishedOrEliminated = true; // Flag to check if all players finished

    if(playerConstant.current.y < 20){
      finishedConstentants.current = playerConstant.current
    }

    for (let i = 0; i < 50; i++) {

      if (constentants.current[i].y < 20) {

        constentants.current[i].y = 20; // Stop exactly at the finish line
        
        // constentants.current[i].gameOver = true; // Mark as finished
        // finishedConstentants.current = constentants.current[i]
      } else if (!constentants.current[i].gameOver) {
      allFinishedOrEliminated = false; // At least one contestant is still playing
      }
      
      if (greenLight.current && !constentants.current[i].gameOver) {
        constentants.current[i].y -= constentants.current[i].speed
      } else {
        if (Math.random() * 1000 < 1) {
          constentants.current[i].gameOver = true
        }
      }
    }

    setState({})

    // if (!finishedConstentants.current) {
    // requestAnimationFrame(render)
    // }
    if (!allFinishedOrEliminated) {
      requestAnimationFrame(render)
    }
  }

  useEffect(() => {
    for (let i = 0; i < 50; i++) {
      constentants.current.push(
        { x: Math.random() * (1460), y: 660, name: i.toString(), gameOver: false, speed: 0.5 + Math.random() * 0.3 })
    }
   divRef.current?.focus()

      requestAnimationFrame(render)
  }, [])

const [moving, setMoving] = useState(false); // Track if player is moving

const onMouseEnter = () => {
  if (greenLight.current && !playerConstant.current.gameOver) {
    setMoving(true); // Start moving when mouse enters button
  } else {
    playerConstant.current.gameOver = true
  }
};

const onMouseLeave = () => {
  setMoving(false); // Stop moving when mouse leaves button
};

useEffect(() => {
  if (moving) {
    const interval = setInterval(() => {
      if (!greenLight.current) {
        // If the light turns red while moving, game over
        playerConstant.current.gameOver = true;
        setMoving(false);
      } else {
        if (playerConstant.current.y > 20) { // Stop at y = 50 (finish line)
          playerConstant.current.y -= playerConstant.current.speed;
        } else {
          playerConstant.current.y = 20; // Ensure it stays at the finish line
          setMoving(false); // Stop moving
        }
      }
    }, 50); // Adjust speed

    return () => clearInterval(interval); // Clear interval when stopping
  }
}, [moving]);


  return (
    <div tabIndex={0} ref={divRef}>
       {!gameStarted ? (
           <div className="w-full h-screen bg-pink-400 place-content-center">
        <PinkSoldier/>
      <div
        className="place-content-center place-items-center place-self-center sm:min-h-96 rounded sm:w-[500px] w-[90%] bg-slate-400 p-6"
      >
        <Image src={"/SquidGame_Season1_Episode1_00_44_44_16.webp"} alt={""} width={400} height={300} />
        <h1 className="text-2xl font-medium text-white my-3">Squid Game Online</h1>
         <Button onClick={()=> setGameStarted(true)} color="secondary" size="lg" className="">
          Start Game
          </Button>
        
      </div>
      </div>
      ) : (
          <>
           <DollMusic greenLight={greenLight.current} greenLightDuration={greenLightCounter.current} />
      {finishedConstentants.current && <div
        className='absolute z-10 top-0 right-0 left-0 
       bottom-0 bg-[rgba(195,109,109,0.7)] grid items-center
       flex justify-center'
      >
        {finishedConstentants.current.name} has finish
      </div>}
            <PlayGround>
              <Button className='absolute border left-1/2 top-1/3' onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
                move
              </Button>
        <Finish />
        <Doll />
        <Contestant x={playerConstant.current.x} y={playerConstant.current.y}
         name={playerConstant.current.name} gameOver={playerConstant.current.gameOver}/>
        {constentants.current.map(c => {

          return <Contestant key={c.name} x={c.x} y={c.y} name={c.name} gameOver={c.gameOver} />
        })}
            </PlayGround>
          </>
      )}
    </div>
  )
}