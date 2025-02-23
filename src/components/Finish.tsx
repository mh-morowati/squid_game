import { Button } from "@heroui/button"
import Image from 'next/image'
import {  Modal,  ModalContent} from "@heroui/modal"
import Link from "next/link"
import { useGameLogic } from "@/lib/hooks/level1/useGameLogic"
import { useRouter } from "next/navigation"

type Props = {
    isGameOver: boolean
    allPlayerFinished: boolean
}

const Finish = (props: Props) => {

    const { isGameOver, allPlayerFinished } = props
     const {setGameStarted} = useGameLogic()
    const router = useRouter()
    
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
                     <Image 
                     src={"/lose-game123-ezgif.com-gif-to-webp-converter.webp"}
                      alt={""} 
                     fill
                     />
                    <Link href={"/"}>
                        <Button
                            className="mt-4 min-[2000px]:p-5 min-[2000px]:w-60 min-[2000px]:h-20 min-[2000px]:text-3xl"
                            onPress={() => {setGameStarted(false),router.push("/")}}
                        >
                        Restart Game
                        </Button>
                    </Link>
                </ModalContent>
               
  </Modal>
        )}
         
        {allPlayerFinished && !isGameOver && (
            <Modal isOpen={true} size="full">
                <ModalContent>
                    <Image src={"/winning-gif.gif"} alt={""} fill />
                    <Link href={"/"}>
                        <Button
                            className="mt-4 min-[2000px]:w-60 min-[2000px]:h-20 min-[2000px]:text-3xl"
                            onPress={() => setGameStarted(false)}
                        >
                              Next Game
                        </Button>
                        </Link>
              </ModalContent>
            </Modal>
        )}
    </>
    )
}

export default Finish