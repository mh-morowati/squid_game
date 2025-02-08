import Image from 'next/image';


const Doll = () => {
    return (<>
    <div className="absolute left-1/2">
       <Image src={'/doll.png'} alt={'doll'} width={150} height={150}/>
        </div>
    </>
    )
}

export default Doll