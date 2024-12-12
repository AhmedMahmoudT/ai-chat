import { motion } from "motion/react";

// eslint-disable-next-line react/prop-types
const Chat = ({chatBegan}) => {
  return (
    <motion.div initial={{opacity:0,height:'0vh'}} animate={ chatBegan?{opacity:1,height:'60vh'}:{opacity:0,height:'0vh'}} transition={{ duration: 0.5 }}>
        Chat
    </motion.div>
  )
}

export default Chat