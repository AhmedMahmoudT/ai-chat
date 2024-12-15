import { useState } from "react";
import Input from "./chat/Input";
import Chat from "./chat/Chat";
import ModelChoice, { ModelChoiceMini } from "./model/ModelChoice";
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
    <div className="w-[80%] h-[100%] m-auto flex flex-col items-center justify-center relative gap-4">
      <AnimatePresence>
        {!chatBegan && (
          <ModelChoice models={models} setModels={setModels} />
        )}
      </AnimatePresence>

      <Chat chatBegan={chatBegan} models={models} setModels={setModels} />
      <ModelChoiceMini models={models} setModels={setModels} chatBegan={chatBegan} />
      <Input
        models={models}
        chatBegan={chatBegan}
        setChatBegan={setChatBegan}
      />
    </div>
  );
};

export default Main;
