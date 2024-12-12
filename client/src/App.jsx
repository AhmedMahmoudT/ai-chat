import { useState } from "react";
import Main from "./components/Main";
import SideBar from "./components/SideBar";
import { PiSidebarSimpleDuotone } from "react-icons/pi";

const App = () => {
  const [showSideBar, setShowSideBar] = useState(false);
  return (
    <div className="h-screen w-screen bg-white text-black flex items-center text-xl relative">
      <div className="absolute w-[20%] h-[90%] mx-4 border border-transparent">
        <div className="flex items-center justify-between w-full p-4 text-neutral-600 text-4xl">
          <PiSidebarSimpleDuotone
            onClick={() => setShowSideBar(true)}
            className="cursor-pointer text-indigo-600"
          />
        </div>
      </div>
      <SideBar showSideBar={showSideBar} setShowSideBar={setShowSideBar} />
      <Main />
    </div>
  );
};

export default App;
