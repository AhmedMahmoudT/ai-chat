import { IoSend } from "react-icons/io5";
import { IoIosAttach } from "react-icons/io";
import { useState, useRef, useContext } from "react";
import { AnimatePresence, motion } from "motion/react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import { FaXmark } from "react-icons/fa6";

const Input = () => {
  const { currentChat, models } = useContext(AppContext);
  const [inputValue, setInputValue] = useState("");
  const [blink, setBlink] = useState(false);

  const textareaRef = useRef(null);
  const navigate = useNavigate();

  const imageInputRef = useRef(null);
  const [image, setImage] = useState("");

  const handleButtonClick = () => {
    imageInputRef.current.click();
  };

  const handleRemoveImage = () => {
    setImage("");
    imageInputRef.current.value = null;
  };

  const handleImageChange = (e) => {
    setImage(URL.createObjectURL(e.target.files[0]));
  };

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    textarea.style.height = "24px";
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      handleSubmit(e);
    }
  };

  const handleChange = (e) => {
    setInputValue(e.target.value);
    adjustTextareaHeight();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newInteraction = { question: inputValue, answer: null };
      let updatedInteractions = [];
      const newId = uuidv4();

      if (currentChat) {
        const res = await axios.get(
          `http://localhost:3000/chats/${currentChat}`
        );
        updatedInteractions = [...res.data.interactions, newInteraction];

        await axios.put(`http://localhost:3000/chats/${currentChat}`, {
          interactions: updatedInteractions,
        });
      } else {
        updatedInteractions = [newInteraction];

        const res = await axios.post(`http://localhost:3000/chats`, {
          id: newId,
          interactions: updatedInteractions,
        });
        navigate(`/${res.data.id}`);
      }

      setInputValue("");
      const textarea = textareaRef.current;
      const model = models.find((m) => m.checked);
      textarea.style.height = "24px";

      await axios.put("http://localhost:3000/input", {
        value: inputValue,
        model: model.id,
      });

      const aiResponse = await axios.post(`http://127.0.0.1:5000/generate`, {
        input: inputValue,
      });

      let responseString = aiResponse.data.response;
      const match = responseString.match(/content=([`"'"])((?:[^\\]|\\.)*?)\1/);

      if (match) {
        let content = match[2];
        let cleanContent = content.replace(/\\n/g, "\n");
        cleanContent = cleanContent.replace(/\\(['"`])/g, "$1");
        cleanContent = cleanContent.trim();

        updatedInteractions[updatedInteractions.length - 1].answer =
          cleanContent;

        if (currentChat) {
          await axios.put(`http://localhost:3000/chats/${currentChat}`, {
            interactions: updatedInteractions,
          });
        } else {
          await axios.put(`http://localhost:3000/chats/${newId}`, {
            interactions: updatedInteractions,
          });
        }
      } else {
        console.error("Content not found in AI response", responseString);
      }
    } catch (error) {
      console.error("Error submitting the chat:", error);
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
      {image && (
        <div className="flex items-center w-full justify-end relative">
          <button
            onClick={handleRemoveImage}
            className="absolute text-base flex items-center justify-center text-indigo-600 top-0 right-0 rounded-full w-6 h-6 border-2 border-indigo-600 bg-indigo-100"
          >
            <FaXmark />
          </button>
          <img src={image} className="w-[32%] m-2 rounded-lg" />
        </div>
      )}
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
          minHeight: "24px",
          maxHeight: "200px",
          overflowY: "auto",
        }}
      ></textarea>
      <div className="w-full flex items-center justify-between text-indigo-600 text-2xl">
        <div>
          <AnimatePresence>
            {models[4].checked ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: [1.3, 1] }}
                exit={{ opacity: 0, scale: 0.8 }}
                onClick={handleButtonClick}
                className="relative cursor-pointer"
              >
                <motion.img
                  initial={{ scale: 0 }}
                  animate={{ scale: 2, opacity: [1, 1, 0] }}
                  src="/images/confetti.svg"
                  alt=""
                  className="z-10 absolute"
                />
                <IoIosAttach />
                <input
                  key={image}
                  ref={imageInputRef}
                  type="file"
                  style={{ display: "none" }}
                  onChange={handleImageChange}
                />
              </motion.div>
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
