import { Button } from "@heroui/button"
import Image from 'next/image'
import {  Modal,  ModalContent} from "@heroui/modal"
import Link from "next/link"
import { useGameStore } from "@/store/redLightGreenLightStore"

type Props = {
    isGameOver: boolean
    allPlayerFinished: boolean
}

const Finish = (props: Props) => {

    const { isGameOver, allPlayerFinished } = props
    const resetGame = useGameStore(state => state.resetGame)
    
    return (<>
        <div className="bg-red-600 absolute h-1 w-[100vw] sm:top-20 top-14">
            <Image 
            className="absolute left-1/2 max-sm:left-1/3 bottom-0" 
            src={'/tree_prev_ui.png'}
             alt={'doll'}
             width={150} 
                height={150}
            />
        </div>
    {isGameOver && (
            <Modal isOpen={true} size="full">
                
                <ModalContent>
                    <Button
                        onClick={resetGame}
                        className="absolute z-50 left-1/2 top-10"
                        size="lg"
                        color="primary">
                        Play again
                    </Button>
                     <Image 
                     src={"/lose-game123-ezgif.com-gif-to-webp-converter.webp"}
                      alt={""} 
                     fill
                     />
                </ModalContent>
               
  </Modal>
        )}
         
        {allPlayerFinished && !isGameOver && (
            <Modal isOpen={true} size="full">
                <ModalContent>
                    <Button
                        onClick={resetGame}
                        className="absolute z-50 sm:left-1/3 top-10"
                        size="lg"
                        color="primary"
                    >
                        Play again
                    </Button>
                       <Link
                        href={"/marble-game"}
                        className="absolute z-50 left-1/2 top-10 text-white bg-green-600 py-3 rounded-xl px-6">
                        Next Level
                    </Link>
                    <Image src={"/winning-gif.gif"} alt={""} fill />
              </ModalContent>
            </Modal>
        )}
    </>
    )
}

export default Finish
