import Image from 'next/image'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

type Props = {
    x: number
    y: number
    name: string
    gameOver: boolean
}


const Contestant = ({ x, y, name, gameOver }: Props) => {
    
    const [isDead, setIsDead] = useState(false)
 
    useEffect(() => {
      
        if (gameOver) {

                
            const bulletSound = new Audio('/sounds/MLG sniper sound effect.mp3')
            bulletSound.play()
  
            setIsDead(true)
        }
    }, [gameOver])
    
    return(<motion.div
                className="absolute"
            style={{
                left: `${x}px`, top: `${y}px` }}
                initial={{ opacity: 1, scale: 1}}
        animate={
            isDead
                ? {
                    scale: [1, 1.5, 1],
                    opacity: 1
                }
                : {}
        }
                transition={{ duration: 1, ease: 'easeOut' }}
            >
                <div className="">
                    {isDead ? (
                <>
                   <Image
                            src={'/player.png'}
                            alt={'player'}
                            width={50}
                            height={50}
                        className='max-sm:w-10 max-sm:h-12 rotate-45'
                        priority
                        />
                        <Image
                            src={'/kill-blood.png'}
                            alt={'blood'}
                            width={50}
                            height={50}
                          className='max-sm:w-10 max-sm:h-12 absolute top-0 left-0'
                        priority
                    />
                </>
                    ) : (
                        
                    <Image
                        src={'/player.png'}
                         alt={'player'}
                         width={50}
                         height={50}
                         className='max-sm:w-10 max-sm:h-12'
                         />
                    )}
                <div
                    className="absolute inset-0 top-2 flex justify-center items-center text-white text-xs md:font-bold max-md:text-[6px]"
                >
                        {name}
                    </div>
                </div>
            </motion.div>)
}

export default Contestant