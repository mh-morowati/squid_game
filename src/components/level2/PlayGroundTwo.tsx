type Props = {
    children: React.ReactNode
}

const PlayGroundTwo = (props: Props) => {
    
    const { children } = props
    
    return (<div 
        className="bg-slate-500 h-[100vh] w-[100vw] absolute"
    >
        {children}
        
            </div>
    )
}

export default PlayGroundTwo