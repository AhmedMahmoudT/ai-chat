import { useState } from "react";
import Input from "./Input";
import Chat from "./Chat";
import ModelChoice, { ModelChoiceMini } from "./ModelChoice";
import { AnimatePresence } from "motion/react";

const Main = () => {
  const [chatBegan, setChatBegan] = useState(false);
  const [models, setModels] = useState([
    {
      name: "Qwen",
      logo: "/images/models/qwen.png",
      checked: true,
    },
    {
      name: "Gemma 2.2",
      logo: "/images/models/gemma.png",
      checked: false,
    },
    {
      name: "Mistral",
      logo: "/images/models/mistral.png",
      checked: false,
    },
    {
      name: "Llama 3.2",
      logo: "/images/models/llama.png",
      checked: false,
    },
    {
      name: "Llama 3.2 Vision",
      logo: "/images/models/llama_vision.png",
      checked: false,
    },
  ]);
  return (
    <div className="w-[50%] h-[100%] m-auto flex flex-col items-center justify-center relative gap-4">
      <AnimatePresence>
        {!chatBegan ? (
          <ModelChoice models={models} setModels={setModels} />
        ) : (
          <ModelChoiceMini models={models} setModels={setModels} />
        )}
      </AnimatePresence>

      <Chat chatBegan={chatBegan} />
      <Input
        models={models}
        chatBegan={chatBegan}
        setChatBegan={setChatBegan}
      />
    </div>
  );
};

export default Main;
