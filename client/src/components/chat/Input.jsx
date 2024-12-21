import { IoSend } from "react-icons/io5";
import { IoIosAttach } from "react-icons/io";
import { useState, useRef, useEffect, useContext } from "react";
import { AnimatePresence, motion } from "motion/react";
import axios from "axios";
import { v4 } from "uuid";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";

const Input = () => {
  const { currentChat, models } = useContext(AppContext);
  const [inputValue, setInputValue] = useState("");
  const [blink, setBlink] = useState(false);
  const [interactions, setInteractions] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:3000/chats/${currentChat}`).then(res => {
    const intr = res.data.interactions
    setInteractions(intr)
    })
  },[currentChat])

  const textareaRef = useRef(null);


  const navigate = useNavigate();

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      handleSubmit(e);
    }
  };

  const handleChange = (e) => {
    setInputValue(e.target.value);
    adjustTextareaHeight();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentChat!=='' && currentChat!==undefined) {
      axios.put(`http://localhost:3000/chats/${currentChat}`, {
        "interactions": [...interactions, { question: inputValue }],
      })
      .then(() => {
        setInputValue("");
        const textarea = textareaRef.current;
        textarea.style.height = "32px";
      });
    } else {
      axios
        .post(`http://localhost:3000/chats`, {
          id:v4(),
          interactions: [{ question: inputValue }],
        })
        .then((res) => {
          navigate(`/${res.data.id}`);
          setInputValue("");
          const textarea = textareaRef.current;
          textarea.style.height = "32px";
        });
    }
  };

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "32px";
      textarea.style.height = `${Math.min(
        Math.max(textarea.scrollHeight, 32),
        200
      )}px`;
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="w-[62.5%] py-2 h-max bg-indigo-100 rounded-lg px-4 flex flex-col items-center justify-center gap-2 border-2 absolute bottom-12"
      initial={{
        border: ["2px solid #4f46e5", "2px solid #e0e7ff", "2px solid #4f46e5"],
        transition: { repeat: Infinity, duration: 1 },
      }}
      animate={
        blink
          ? {
              border: [
                "4px solid #4f46e5",
                "4px solid #e0e7ff",
                "4px solid #4f46e5",
              ],
              transition: { repeat: Infinity, duration: 1 },
            }
          : {
              border: [
                "2px solid #4f46e5",
                "2px solid #e0e7ff",
                "2px solid #4f46e5",
              ],
              transition: { repeat: Infinity, duration: 1 },
            }
      }
    >
      <textarea
        ref={textareaRef}
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onFocus={() => setBlink(true)}
        onBlur={() => setBlink(false)}
        className="w-full h-8 text-black bg-transparent focus:outline-none resize-none placeholder:text-indigo-400"
        placeholder="Ask me anything..."
        style={{
          minHeight: "32px",
          maxHeight: "200px",
          overflowY: "auto",
        }}
      ></textarea>
      <div className="w-full flex items-center justify-between text-indigo-600 text-2xl">
        <div>
          <AnimatePresence>
            {models[4].checked ? (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: [1.3, 1] }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="relative"
              >
                <motion.img
                  initial={{ scale: 0 }}
                  animate={{ scale: 2, opacity: [1, 1, 0] }}
                  src="/images/confetti.svg"
                  alt=""
                  className="z-10 absolute"
                />
                <IoIosAttach />
              </motion.button>
            ) : (
              <button disabled></button>
            )}
          </AnimatePresence>
        </div>
        <button>
          <IoSend />
        </button>
      </div>
    </motion.form>
  );
};

export default Input;
