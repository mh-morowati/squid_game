import { useMarbleGameStore } from "@/store/marbleGameStore"
import { Button } from "@heroui/button"
import {  Modal,  ModalContent} from "@heroui/modal"
import Image from 'next/image'


const Finish = () => {

 const {
    playerMarbles,
    resetGame,
  } = useMarbleGameStore()
  
    if (playerMarbles <= 0) {
      const bulletSound = new Audio('/sounds/MLG sniper sound effect.mp3')
        bulletSound.play()
    }

    return( <>
              {playerMarbles <= 0 ? (  <Modal isOpen={true} size="full">
                <ModalContent>
                    <Button
                        onClick={resetGame}
                        className="absolute z-50 left-1/2 top-10"
                        size="lg"
                        color="primary">
                        Play again
                    </Button>
                     <Image 
                     src={"/squid-game-gif-6.gif"}
                      alt={""} 
                     fill
                     />
                </ModalContent>
               
  </Modal>) : (   <Modal isOpen={true} size="full">
                <ModalContent>
                    <Button
                        onClick={resetGame}
                        className="absolute z-50 left-1/2 top-10"
                        size="lg"
                        color="primary"
                    >
                        Play again
                    </Button>
                    <Image src={"/winning-gif.gif"} alt={""} fill />
              </ModalContent>
            </Modal>)}
          </>)
}

export default Finish