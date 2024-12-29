import { IoSend } from "react-icons/io5";
import { IoIosAttach } from "react-icons/io";
import { useState, useRef, useContext } from "react";
import { AnimatePresence, motion } from "motion/react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";

const Input = () => {
  const { currentChat, models } = useContext(AppContext);
  const [inputValue, setInputValue] = useState("");
  const [blink, setBlink] = useState(false);

  const textareaRef = useRef(null);
  const navigate = useNavigate();

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    textarea.style.height = "auto";
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
      textarea.style.height = "32px";

      await axios.put("http://localhost:3000/input", {
        value: inputValue,
        model: model.id,
      });

      const aiResponse = await axios.post(`http://127.0.0.1:5000/generate`, {
        input: inputValue,
      });

      let responseString = aiResponse.data.response;
      console.log("Raw AI Response:", responseString);

      const match = responseString.match(/content=([`"'"])((?:[^\\]|\\.)*?)\1/);

      if (match) {
        let content = match[2];
        console.log(content);

        let cleanContent = content.replace(/\\n/g, "\n");

        // Step 2: Unescape any escaped quotes (e.g., `\'`, `\"`, `\``) inside the content
        cleanContent = cleanContent.replace(/\\(['"`])/g, "$1");

        // Step 3: Trim any leading or trailing whitespace from the content
        cleanContent = cleanContent.trim();

        console.log(cleanContent);

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
