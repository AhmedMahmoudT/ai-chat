import { useState } from "react"
import Input from "./Input"
import Model from "./Model"

    
const Chat = () => {
  const [models, setModels] = useState([
    {
      name: 'Qwen',
      logo: '/images/models/qwen.png',
      checked: false
    },
    {
      name: 'Llama 3.2 Vision',
      logo: '/images/models/llama.png',
      checked: false
    },
    {
      name: 'Gemma 2.2',
      logo: '/images/models/gemma.png',
      checked: false
    },
    {
      name: 'Mistral',
      logo: '/images/models/mistral.png',
      checked: false
    }
  ])
  return (
    <div className="w-[100%] h-[100%] flex flex-col items-center justify-center relative gap-4">
        <div className="w-[50%]">
        <h1 className="font-semibold text-5xl mb-10">Choose an AI model</h1>
        <div className="flex items-center justify center gap-4">
          {models.map((model) => (
            <Model key={model.name} model={model} models={models} setModels={setModels} />
          ))}
        </div>
        </div>
        <Input models={models} />
    </div>
  )
}

export default Chat