import Image from "next/image"
import {Button, ButtonGroup} from "@heroui/button";
import Link from "next/link";

export default function Home() {
 
  return (
    <div className="min-w-96 sm:min-w-[650px] lg:min-w-[1020px] h-full min-h-[700px] bg-purple-500 place-content-center">
      <div
        className="place-content-center place-items-center place-self-center min-h-96 rounded w-[500px] bg-slate-400"
      >
        <Image src={"/SquidGame_Season1_Episode1_00_44_44_16.webp"} alt={""} width={400} height={300} />
        <h1 className="text-2xl font-medium text-white my-3">Squid Game Online</h1>
        <Link href={"/red-light-green-light"}>
         <Button color="secondary" size="lg" className="">
          Play now
    </Button></Link>
      </div>
   </div>
  )
}
