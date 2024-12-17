import { motion } from "motion/react";
import Prompt from "./Prompt";
import Response from "./Response";

// eslint-disable-next-line react/prop-types
const Chat = ({ chatBegan }) => {
  return (
    <motion.div
      initial={{ opacity: 0, height: "0px" }}
      animate={
        chatBegan
          ? { opacity: 1, height: "80vh" }
          : { opacity: 0, height: "0px" }
      }
      transition={{ duration: 0.5 }}
      className="w-[100%] px-[19%] overflow-scroll flex flex-col gap-2 pb-28 relative"
    >
      <Prompt />
      <Response />
    </motion.div>
  );
};

export default Chat;
