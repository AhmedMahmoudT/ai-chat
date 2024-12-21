/* eslint-disable react/prop-types */
import ReactMarkdown from "react-markdown";

const Response = ({res}) => {
  const thinking = `
  **Thinking...**
  `

  return (
    <div className="w-full flex items-center">
      <ReactMarkdown className="p-4 text-wrap max-w-[100%] prose">
        {res?res:thinking}
      </ReactMarkdown>
    </div>
  );
};

const Prompt = ({ pr }) => {
  return (
    <div className="w-full flex items-center justify-end">
      <div className="p-4 py-2 bg-indigo-100 text-indigo-600 rounded-lg text-wrap max-w-[50%]">
        {pr}
      </div>
    </div>
  );
};

const Interaction = ({ pr, res }) => {
  return (
    <div>
      <Prompt pr={pr} />
      <Response res={res} />
    </div>
  );
};

export default Interaction;
