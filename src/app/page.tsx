import Image from "next/image"
import {Button, ButtonGroup} from "@heroui/button";
import Link from "next/link";
import PinkSoldier from "@/components/sounds/PinkSoldier";

export default function Home() {
 
  return (
    <div className="w-full h-screen bg-pink-400 place-content-center">
      <div
        className="place-content-center place-items-center place-self-center sm:min-h-96 rounded sm:w-[500px] w-[90%] bg-slate-400 p-6"
      >
        <Image src={"/SquidGame_Season1_Episode1_00_44_44_16.webp"} alt={""} width={400} height={300} />
        <h1 className="text-2xl font-medium text-white my-3">Squid Game Online</h1>
        <Link href={"/red-light-green-light"}>
         <Button color="secondary" size="lg" className="">
          Play now
          </Button></Link>
        <PinkSoldier/>
      </div>
   </div>
  )
}
