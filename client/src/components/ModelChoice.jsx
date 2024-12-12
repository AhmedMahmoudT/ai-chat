/* eslint-disable react/prop-types */
import { motion } from "motion/react";
import Model from "./Model";

const ModelChoice = ({models, setModels}) => {
  return (
    <motion.div className="select-none" initial={{opacity:0}} animate={{opacity:1}}>
    <h1 className="font-semibold text-5xl mb-10">Choose an AI model</h1>
        <div className="flex items-center justify center gap-4">
          {models.map((model) => (
            <Model
              key={model.name}
              model={model}
              models={models}
              setModels={setModels}
            />
          ))}
        </div>
    </motion.div>
  )
}

export default ModelChoice