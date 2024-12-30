/* eslint-disable react/prop-types */
import { motion } from 'motion/react'
import DOMParserReact from 'dom-parser-react'
import {marked} from 'marked'

const Response = ({res}) => {
  const html = res&&marked.parse(res)
  const thinking = marked.parse(`
  **Thinking...**
  `)

  return (
    <div className="w-full flex items-center">
      <div className="p-4 py-10 text-wrap max-w-[100%] prose">
        {res?<DOMParserReact source={html} />:
        <div className='font-bold flex items-center justify-center'>
          <motion.div variants={child} initial="default" animate="animate">
          Thinking
          </motion.div>
          <motion.div variants={container} initial="default" animate="animate" className='flex items-center justify-center ms-[1px]'>
            <motion.div variants={child}>.</motion.div>
            <motion.div variants={child}>.</motion.div>
            <motion.div variants={child}>.</motion.div>
          </motion.div>
        </div>
        }
      </div>
    </div>
  );
};

const Prompt = ({ pr }) => {
  return (
    <div className="w-full flex items-center justify-end">
      <div className="p-4 py-2 bg-indigo-100 text-indigo-600 rounded-lg text-wrap max-w-[50%]">
        {pr}
      </div>
    </div>
  );
};

const Interaction = ({ pr, res }) => {
  return (
    <div>
      <Prompt pr={pr} />
      <Response res={res} />
    </div>
  );
};

const container = {
  default: {
    opacity:.5
  },
  animate: {
    opacity:[.5,1,.5],
    transition:{
      repeat: Infinity,
      staggerChildren: 0.2
    }
  }
}

const child = {
  default: {
    opacity:.5
  },
  animate: {
    opacity:[.5,1,.5],
    transition:{
      repeat: Infinity,
    }
  }
}

export default Interaction;
