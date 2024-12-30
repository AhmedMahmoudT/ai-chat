import { motion } from "motion/react";
import Interaction from "./Interaction";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../../context/AppContext";

const Chat = () => {
  const [interactions, setInteractions] = useState()
  const { setCurrentChat, showSideBar } = useContext(AppContext);

  const { id } = useParams();
  useEffect(() => {
    setCurrentChat(id);

    const fetchInteractions = () => {
      axios
        .get(`http://localhost:3000/chats/${id}`)
        .then((res) => {
          setInteractions(res.data.interactions);
        })
        .catch((err) => console.error("Error fetching interactions:", err));
    };

    fetchInteractions();
    const interval = setInterval(fetchInteractions, 500);

    return () => clearInterval(interval);
  }, [id, setCurrentChat]);

  return (
    <motion.div
      initial={{ opacity: 0, height: "0px" }}
      animate={{ opacity: 1, height: "80vh" }}
      transition={{ duration: 0.5 }}
      className={`xl:w-[944px] lg:w-[752px] w-[560px] ${showSideBar&&'px-[5%]'} overflow-scroll flex flex-col gap-2 pb-28 relative`}
    >
      {interactions?.map((interaction, index) => <Interaction key={interaction.id||index} pr={interaction.question} res={interaction.answer} />)}
    </motion.div>
  );
};

export default Chat;
