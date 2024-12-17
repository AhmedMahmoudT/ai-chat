import ReactMarkdown from "react-markdown";

const Response = () => {
  const markdownText = `
# React Markdown Example

- Some text
- Some other text

## Subtitle

### Additional info

This is a [link](https://github.com/remarkjs/react-markdown)
`;
  return (
    <div className="w-full flex items-center">
      <ReactMarkdown className="p-4 text-wrap max-w-[100%] prose">
        {markdownText}
      </ReactMarkdown>
    </div>
  )
}

export default Response