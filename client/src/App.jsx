import { useState } from "react";
import Main from "./components/Main";
import SideBar from "./components/sidebar/SideBar";
import { PiSidebarSimpleDuotone } from "react-icons/pi";
import { BrowserRouter } from "react-router-dom";
import { AppContext } from "./context/AppContext";


const App = () => {
  const [currentChat, setCurrentChat] = useState("");
  const [showSideBar, setShowSideBar] = useState(false);
  const [models, setModels] = useState([
    {
      id:"qwen2.5",
      name: "Qwen 2.5",
      logo: "/images/models/qwen.png",
      checked: true,
    },  
    {
      id:"gemma2:2b",
      name: "Gemma 2 2b",
      logo: "/images/models/gemma.png",
      checked: false,
    },
    {
      id:"mistral",
      name: "Mistral",
      logo: "/images/models/mistral.png",
      checked: false,
    },
    {
      id:"llama3.2",
      name: "Llama 3.2",
      logo: "/images/models/llama.png",
      checked: false,
    },
    {
      id:"llama3.2-vision",
      name: "Llama 3.2 Vision",
      logo: "/images/models/llama_vision.png",
      checked: false,
    },
    {
      id:"gpt4",
      name: "OpenAI 4",
      logo: "/images/models/openai.png",
      checked: false,
    },
  ]);

  const value = {currentChat, setCurrentChat, showSideBar, setShowSideBar, models, setModels};
  return (
    <BrowserRouter>
      <AppContext.Provider value={value}>
      <div className="h-screen w-screen flex items-center text-xl relative">
        <div className="absolute w-[20%] h-[90%] mx-4 border border-transparent">
          <div className="flex items-center justify-between w-full p-4 text-neutral-600 text-4xl">
            <PiSidebarSimpleDuotone
              onClick={() => setShowSideBar(true)}
              className="cursor-pointer text-indigo-600"
            />
          </div>
        </div>
        <SideBar />
        <Main />
      </div>
      </AppContext.Provider>
    </BrowserRouter>
  );
};

export default App;
