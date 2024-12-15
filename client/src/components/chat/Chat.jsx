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
          ? { opacity: 1, height: "660px" }
          : { opacity: 0, height: "0px" }
      }
      transition={{ duration: 0.5 }}
      className="w-[62.5%] overflow-scroll flex flex-col gap-2 py-4"
    >
      <Prompt />
      <Response />
    </motion.div>
  );
};

export default Chat;
