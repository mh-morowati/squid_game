

type Props = {
    x: number
    y: number
    name: string
    gameOver: boolean
}

const Contestant = ({x,y,name,gameOver}: Props) =>{
    
    return(<div 
        className=
  "absolute top-[600px] bg-blue-600 w-14 h-14 rounded-full flex justify-center items-center text-center "
  style={{left: `${x}px`,top: `${y}px`}}
        >{name}</div>)
}

export default Contestant