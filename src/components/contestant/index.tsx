import Image from 'next/image';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';


type Props = {
    x: number
    y: number
    name: string
    gameOver: boolean
}

const Contestant = ({ x, y, name, gameOver }: Props) => {
    
    const [visible, setVisible] = useState(true);
    

    useEffect(() => {
      
        if (gameOver) {

            if (y <= 50) return; // ✅ If player crossed finish line, ignore elimination

                // Play bullet sound effect
            const bulletSound = new Audio('/sounds/MLG sniper sound effect.mp3');
            bulletSound.play();

            // Remove player after explosion animation
            setTimeout(() => setVisible(false), 1000);
        }
    }, [gameOver]);

    if (!visible) return null; // Hide the player after explosion
    
    return(   <AnimatePresence>
            <motion.div
                className="absolute"
                style={{ left: `${x}px`, top: `${y}px` }}
                initial={{ opacity: 1, scale: 1 }}
                animate={gameOver ? { scale: [1, 1.5, 0], opacity: [1, 0.5, 0] } : {}}
                transition={{ duration: 1, ease: 'easeOut' }}
                exit={{ opacity: 0 }} // Fade out when removed
            >
                <div className="">
                    {gameOver ? (
                        // Explosion animation when the player is eliminated
                        <Image src={'/kill-blood.png'} alt={'explosion'} width={50} height={50} />
                    ) : (
                        // Normal player image
                        <Image src={'/player.png'} alt={'player'} width={50} height={50} />
                    )}
                    <div className="absolute inset-0 top-2 flex justify-center items-center text-white text-xs font-bold">
                        {name}
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>)
}

export default Contestant