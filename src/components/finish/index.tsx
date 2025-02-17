import { Button } from "@heroui/button"
import Image from 'next/image'
import {  Modal,  ModalContent} from "@heroui/modal"

type Props = {
    isGameOver: boolean
    allPlayerFinished: boolean
}

const Finish = (props: Props) => {

    const { isGameOver,allPlayerFinished } = props
    
    return (<>
        <div className="bg-red-600 absolute h-1 w-[100vw] top-20">
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
                     <Image src={"/lose-game123-ezgif.com-gif-to-webp-converter.webp"} alt={""} fill/>
                    <Button onClick={() => window.location.reload()} className="mt-4">
                        Restart Game
                    </Button>
                </ModalContent>
               
  </Modal>
        )}
         
        {allPlayerFinished && !isGameOver && (
            <Modal isOpen={true} size="full">
                <ModalContent>
                      <Image src={"/winning-gif.gif"} alt={""} fill/>
                <Button onClick={() => window.location.reload()} className="mt-4">
                    Play Again
                </Button>
              </ModalContent>
            </Modal>
        )}
    </>
    )
}

export default Finish