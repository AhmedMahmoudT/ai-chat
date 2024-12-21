import Input from "./chat/Input";
import Chat from "./chat/Chat";
import ModelChoice, { ModelChoiceMini } from "./model/ModelChoice";
import { AnimatePresence } from "motion/react";
import { Route, Routes } from "react-router-dom";

const Main = () => {
  return (
    <div className="w-[80%] h-[100%] m-auto flex flex-col items-center justify-center relative gap-4">
      <AnimatePresence>
        <Routes>
          <Route path="/" element={<ModelChoice />} />
          <Route path="/:id" element={<ChatwModelChoice />} />
        </Routes>
      </AnimatePresence>
      <Input />
    </div>
  );
};

const ChatwModelChoice = () => {
  return (
    <>
      <Chat />
      <ModelChoiceMini />
    </>
  );
};

export default Main;
