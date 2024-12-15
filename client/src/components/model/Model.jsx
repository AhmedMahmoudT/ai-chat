/* eslint-disable react/prop-types */
import { motion } from "motion/react";
import { useState } from "react";

const Model = ({ model, models, setModels }) => {
  const handleCheck = () => {
    models.forEach((model) => {
      if (model.checked) {
        model.checked = false;
      }
    });

    model.checked = !model.checked;
    setModels([...models]);
  };

  return (
    <div
      onClick={handleCheck}
      className={`rounded-[28px] flex flex-col items-center justify-center border-2 ${
        model.checked && "border-indigo-600"
      } w-44 h-44 hover:bg-indigo-100 text-neutral-400 hover:text-indigo-600 relative cursor-pointer`}
    >
      <img src={model.logo} className="w-32 h-32" />
      <p className={`${model.checked && "text-indigo-600 font-semibold"}`}>
        {model.name}
      </p>
      {model.checked && (
        <div className="absolute rounded-full bg-indigo-600 w-4 h-4 top-4 right-4"></div>
      )}
    </div>
  );
};

export const ModelMini = ({ model, models, setModels }) => {
  const handleCheck = () => {
    models.forEach((model) => {
      if (model.checked) {
        model.checked = false;
      }
    });

    model.checked = !model.checked;
    setModels([...models]);
  };

  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      onClick={handleCheck}
      whileHover={{ scale: 1.1 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      variants={childVariants}
      className={`rounded-full flex items-center justify-between text-lg text-nowrap border-2 ${
        model.checked && "border-indigo-600"
      } w-14 h-14 hover:bg-indigo-100 text-neutral-400 hover:text-indigo-600 relative cursor-pointer`}
    >
      <img src={model.logo} className="w-14 h-full" />
      <motion.p initial={{opacity:0}} animate={hovered?{opacity:1}:{opacity:0}} className={`absolute left-20 ${model.checked && "text-indigo-600 font-semibold"}`}>
        {model.name}
      </motion.p>

    </motion.div>
  );
};

const childVariants = {
  hidden: { opacity: 0, scale:0 },
  visible: { opacity: 1, scale:1 }
};

export default Model;
