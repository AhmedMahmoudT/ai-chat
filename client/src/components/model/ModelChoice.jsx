import { AnimatePresence, motion } from "motion/react";
import Model, { ModelMini } from "./Model";
import { useContext, useEffect } from "react";
import { AppContext } from "../../context/AppContext";

const ModelChoice = () => {
  const { setCurrentChat, models } = useContext(AppContext);
  useEffect(() => {
    setCurrentChat('');
  }, [setCurrentChat]);
  return (
    <motion.div
      className="select-none  absolute top-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h1 className="font-semibold text-5xl mb-10">Choose an AI model</h1>
      <div className="grid grid-cols-4 items-center justify-center gap-4">
        {models.map((model) => (
          <Model
            key={model.name}
            model={model}
          />
        ))}
      </div>
    </motion.div>
  );
};

export const ModelChoiceMini = () => {
  const { showSideBar, models, setModels } = useContext(AppContext);
  return (
    <AnimatePresence>
      
        <motion.div
          initial={{ right: "-7rem" }}
          animate={
            showSideBar
              ? { right: "1.5rem", transition: { duration: 0.4 } }
              : { right: "-7rem" }
          }
          className="select-none absolute z-20 top-24"
        >
          <motion.div
            variants={miniVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="flex flex-col items-center justify center gap-4"
          >
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
      )
    </AnimatePresence>
  );
};

const miniVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

export default ModelChoice;
