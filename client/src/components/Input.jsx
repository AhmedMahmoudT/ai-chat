import { IoSend } from "react-icons/io5";
import { IoIosAttach } from "react-icons/io";

const Input = () => {
  return (
    <div className="w-[50%] min-h-32 bg-indigo-100 rounded-lg px-4 flex flex-col items-center justify-center gap-2 mt-10">
        <textarea className="w-full py-2 text-black bg-transparent focus:outline-none resize-none placeholder:text-indigo-400" placeholder="Ask me anything..."></textarea>
        <div className="w-full flex items-center justify-between text-indigo-600 text-2xl">
          <div>
            <button><IoIosAttach /></button>
          </div>
          <button><IoSend /></button>
        </div>
    </div>
  )
}

export default Input