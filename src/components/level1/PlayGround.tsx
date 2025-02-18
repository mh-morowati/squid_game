type Props = {
    children: React.ReactNode
}

const PlayGround = (props: Props) => {
    
    const { children } = props
    
    return (<div 
        className="bg-orange-300 h-[100vh] w-[100vw] absolute"
    >
        {children}
        
            </div>
    )
}

export default PlayGround