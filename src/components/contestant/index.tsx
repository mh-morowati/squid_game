import Image from 'next/image';


type Props = {
    x: number
    y: number
    name: string
    gameOver: boolean
}

const Contestant = ({x,y,name,gameOver}: Props) =>{
    
    return(<div 
        className="absolute"
  style={{left: `${x}px`,top: `${y}px`}}
    >
        <div className="">
            <Image src={'/player.png'} alt={'player'} width={50} height={50} />
            <div
                className="absolute inset-0 top-2 flex justify-center items-center text-white text-xs font-bold"
            >
          {name}
        </div>
            </div>
    </div>)
}

export default Contestant