import { Button } from "@heroui/react"
import { CirclePlay } from "lucide-react"


function App() {

  return (
    <div
      className="bg-slate-600 md:w-[768px] h-[668px] lg:w-[1024px] m-auto flex justify-center items-center"
    >
      <div className=" place-items-center">
        <img src="OXd_0T.png" alt="squid game" width={300} height={200} />
        <h1 className="text-2xl text-white font-medium">Squid Game Online</h1>
        <Button color="primary" size="lg" className="text-white text-2xl font-medium">
          Play Now <CirclePlay />
        </Button>
      </div>
    </div>
  )
}

export default App
