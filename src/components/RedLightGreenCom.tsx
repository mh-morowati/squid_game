'use client'
import Doll from '@/components/doll';
import Contestant from '@/components/contestant/index';
import Finish from '@/components/finish/index';
import PlayGround from '@/components/playground/index';
import { useEffect, useRef, useState } from "react"

type ContestantType = {
  x: number
  y: number
  name: string
  gameOver: boolean
  speed: number
}

export default function RedLightGreenCom() {
  const [state, setState] = useState({})
  const constentants = useRef<ContestantType[]>([])
  const finishedConstentants = useRef<ContestantType>()
  const playerConstant = useRef<ContestantType>(
    { x: Math.random() * (960 - 50), y: 600,name: 'player',gameOver: false , speed:2})
  const greenLight = useRef(true)
  const greenLightCounter = useRef(100)
  const divRef = useRef<HTMLDivElement>(null)

  const render = (timeStamp: number) => {
    greenLightCounter.current--

    if (greenLightCounter.current < 0) {
      greenLight.current = !greenLight.current

      greenLightCounter.current = 100 + Math.random() * 100
    }

    if(playerConstant.current.y < 100){
      finishedConstentants.current = playerConstant.current
    }
    for (let i = 0; i < 50; i++) {
      if (constentants.current[i].y < 100) {
        finishedConstentants.current = constentants.current[i]
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
    if (!finishedConstentants.current) {
    requestAnimationFrame(render)
    }
  }
  useEffect(() => {
    for (let i = 0; i < 50; i++) {
      constentants.current.push(
        { x: Math.random() * (960 - 50), y: 600, name: i.toString(), gameOver: false, speed: 0.5 + Math.random() * 0.3 })
    }
   divRef.current?.focus()

      requestAnimationFrame(render)
  }, [])

const onkeyDown = (event: React.KeyboardEvent<HTMLDivElement> ) =>{
  if(greenLight.current && !playerConstant.current.gameOver){
    playerConstant.current.y -= playerConstant.current.speed
  }else{
    playerConstant.current.gameOver = true
  }

}

  return (
    <div tabIndex={0} ref={divRef} onKeyDown={onkeyDown}>
      {finishedConstentants.current && <div
        className='absolute z-10 top-0 right-0 left-0 
       bottom-0 bg-[rgba(0,0,0,0.7)] grid items-center
       flex justify-center'
      >
        {finishedConstentants.current.name} has finish
      </div>}
      <PlayGround>
        <Finish />
        <Doll />
        <Contestant x={playerConstant.current.x} y={playerConstant.current.y}
         name={playerConstant.current.name} gameOver={playerConstant.current.gameOver}/>
        {constentants.current.map(c => {

          return <Contestant key={c.name} x={c.x} y={c.y} name={c.name} gameOver={c.gameOver} />
        })}
      </PlayGround>
    </div>
  )
}