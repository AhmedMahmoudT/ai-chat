import { PiSidebarSimpleDuotone } from "react-icons/pi";
import { HiMiniPencilSquare } from "react-icons/hi2";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Chat from "./Chat.jsx";
import { AppContext } from "../../context/AppContext.jsx";

const SideBar = () => {
  const { showSideBar, setShowSideBar } = useContext(AppContext);
  const [chats, setChats] = useState([]);
  const fetchChats = () => {
    axios
      .get(`http://localhost:3000/chats`)
      .then((res) => {
        setChats(res.data);
      })
      .catch((err) => console.error("Error fetching chats:", err));
  };
  useEffect(() => {

    fetchChats();
    const interval = setInterval(fetchChats, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, width: "0%" }}
      animate={
        showSideBar
          ? { opacity: 1, width: "20%", transition: { duration: 0.5 } }
          : { opacity: 0, width: "0%" }
      }
      className="w-[20%] h-[90%] mx-4 border bg-indigo-100 rounded-lg z-10"
    >
      <div className="flex items-center justify-between w-full p-4 text-indigo-600 text-4xl">
        <PiSidebarSimpleDuotone
          onClick={() => setShowSideBar(false)}
          className="cursor-pointer"
        />
        {showSideBar&&<Link to="/"><HiMiniPencilSquare className="text-3xl" /></Link>}
      </div>
      {chats?.map((chat) => (
        <Chat key={chat.id} id={chat.id} title={'test'} link={`/${chat.id}`} fetchChats={fetchChats} />
      ))}
    </motion.div>
  );
};

export default SideBar;
