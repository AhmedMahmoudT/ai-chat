/* eslint-disable react/prop-types */
import { IoSend } from "react-icons/io5";
import { IoIosAttach } from "react-icons/io";
import { useState } from "react";

const Input = ({ models, chatBegan, setChatBegan }) => {
  const [inputValue, setInputValue] = useState("");

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // Prevent the default newline behavior
      handleSubmit();
    }
  };

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = () => {
    !chatBegan && setChatBegan(true);
    setInputValue("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-[100%] min-h-32 bg-indigo-100 rounded-lg px-4 flex flex-col items-center justify-center gap-2"
    >
      <textarea
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        className="w-full py-2 text-black bg-transparent focus:outline-none resize-none placeholder:text-indigo-400"
        placeholder="Ask me anything..."
      ></textarea>
      <div className="w-full flex items-center justify-between text-indigo-600 text-2xl">
        <div>
          {models[4].checked && (
            <button>
              <IoIosAttach />
            </button>
          )}
        </div>
        <button>
          <IoSend />
        </button>
      </div>
    </form>
  );
};

export default Input;
