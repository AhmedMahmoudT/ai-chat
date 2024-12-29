import { useContext, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { IoTrashSharp } from "react-icons/io5";
import { AnimatePresence, motion } from "motion/react";
import axios from "axios";
import { AppContext } from "../../context/AppContext";
import { FaCheck } from "react-icons/fa6";

// eslint-disable-next-line react/prop-types
const Chat = ({ id, title, link, fetchChats }) => {
  const { currentChat } = useContext(AppContext);
  const [options, setOptions] = useState(false);
  const [currentTitle, setCurrentTitle] = useState(title);
  const [isDisabled, setIsDisabled] = useState(true);
  const navigate = useNavigate();

  const handleRename = () => {
    setIsDisabled(false);
    setOptions(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsDisabled(true);
    axios.patch(`http://localhost:3000/chats/${id}`, { title: currentTitle });
  };

  const handleDelete = () => {
    setOptions(false);
    axios.delete(`http://localhost:3000/chats/${id}`).then(() => {
      currentChat == id && navigate("/");
      fetchChats();
    });
  };

  return (
    <div className="relative w-[96%] mb-4 m-auto h-12 hover:bg-indigo-200 text-indigo-600 rounded-xl flex items-center justify-between px-2">
      <Link
        to={link}
        className="w-[100%] mb-4 m-auto h-12 hover:bg-indigo-200 text-indigo-600 rounded-xl flex items-center"
      >
        <form className="flex items-center justify-between w-[90%]">
          {isDisabled ? (
            <p>{currentTitle}</p>
          ) : (
            <input
              value={currentTitle}
              onChange={(e) => setCurrentTitle(e.target.value)}
              className="w-[100%] text-nowrap overflow-hidden text-ellipsis select-none bg-transparent focus:outline-none"
            />
          )}
          {!isDisabled && (
            <button
              onClick={handleSubmit}
              className="hover:bg-indigo-300 p-[1px] rounded"
            >
              <FaCheck />
            </button>
          )}
        </form>
      </Link>
      <BsThreeDotsVertical
        onClick={() => setOptions(!options)}
        className="absolute end-2 z-20 cursor-pointer hover:text-indigo-600 text-indigo-400 hover:scale-110"
      />
      <AnimatePresence>
        {options && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute -bottom-24 -right-24 w-max rounded-lg shadow-lg bg-white flex flex-col items-center justify-center p-2 select-none"
          >
            <button
              onClick={handleRename}
              className="w-full text-start hover:bg-indigo-100 p-2 rounded-lg"
            >
              Rename
            </button>
            <button
              onClick={handleDelete}
              className="text-red-500 flex items-center justify-between gap-3 hover:bg-indigo-100 p-2 rounded-lg"
            >
              Delete <IoTrashSharp />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Chat;
