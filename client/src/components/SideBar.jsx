/* eslint-disable react/prop-types */
import { PiSidebarSimpleDuotone } from "react-icons/pi";
import { HiMiniPencilSquare } from "react-icons/hi2";
import { motion } from "motion/react";

const SideBar = ({ showSideBar, setShowSideBar }) => {
  return (
        <motion.div
          initial={{ opacity:0, width: '0%'}}
          animate={showSideBar?{ opacity:1, width:'20%', transition: { duration: 0.5 }}:{opacity:0, width:'0%'}}
          className="w-[20%] h-[90%] mx-4 border bg-indigo-100 rounded-lg z-10"
        >
          <div className="flex items-center justify-between w-full p-4 text-indigo-600 text-4xl">
            <PiSidebarSimpleDuotone
              onClick={() => setShowSideBar(false)}
              className="cursor-pointer"
            />
            <HiMiniPencilSquare className="text-3xl cursor-pointer" />
          </div>
        </motion.div>
  );
};

export default SideBar;
