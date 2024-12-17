/* eslint-disable react/prop-types */
import { AnimatePresence, motion } from "motion/react";
import Model, { ModelMini } from "./Model";

const ModelChoice = ({ models, setModels }) => {
  return (
    <motion.div
      className="select-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h1 className="font-semibold text-5xl mb-10">Choose an AI model</h1>
      <div className="grid grid-cols-5 items-center justify-center gap-4">
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
  );
};

export const ModelChoiceMini = ({ models, setModels, showSideBar, chatBegan }) => {
  return (
    <AnimatePresence>
      {chatBegan && (
        <motion.div
        initial={{right:'-9rem'}}
        animate={showSideBar?{right:'2rem',transition: { duration: 0.4 }}:{right:'-9rem'}}
        className="select-none absolute z-20 top-24"
      >
        <motion.div 
        variants={miniVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
        className="flex flex-col items-center justify center gap-4">
          {models.map((model) => (
            <ModelMini
              key={model.name}
              model={model}
              models={models}
              setModels={setModels}
            />
          ))}
        </motion.div>
      </motion.div>
      )}
    </AnimatePresence>
  );
};

const miniVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1,
    transition: {
      staggerChildren: 0.2,
    }
   },
};

export default ModelChoice;
