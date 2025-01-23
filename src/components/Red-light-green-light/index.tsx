import { motion } from "framer-motion"
import Doll from "./Doll"


const RedLightGreenLight = () => {
    return (<div className="">

        <div className="w-full md:h-28 h-14 bg-[#90b3c6] place-items-center">
            <div>
                <img src="/tree.png" alt="tree" width={200} className="max-md:w-32" />

            </div>
            <div className="place-items-center relative md:bottom-40 bottom-32">
                <motion.div
                    className="md:w-14 md:h-14 w-10 h-10 rounded-full relative
                 bg-[url('./head-of-doll.png')] bg-cover bg-center"
                 animate={{ rotateY: 360 }} // Rotate 360 degrees
                 transition={{ duration: 5, repeat: Infinity, ease: "linear" }} // Continuous loop
                 style={{ transformStyle: "preserve-3d" }}
                >

                </motion.div>
                <img src="./doll.png" alt="doll" width={200} className="max-md:w-40" />
            </div>
        </div>

        <div className="bg-[#edcc7d] w-full md:h-[680px] h-[590px] place-items-center">
            <div>
                <img src="/soldier.png" alt="soldier" width={60} className="relative right-32" />
                <img src="/soldier.png" alt="soldier" width={60} className="relative left-32 bottom-20" />
            </div>
        </div>
    </div>)
}

export default RedLightGreenLight