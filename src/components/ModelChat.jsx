// eslint-disable-next-line react/prop-types
const ModelChat = ({logo, model}) => {
    return (
      <div onClick={() => console.log('model clicked!')} className="hover:bg-indigo-800 p-3 rounded relative flex items-center justify-between cursor-pointer">
          <img src={logo} className="w-16 h-16 rounded-full" />
          {model}
      </div>
    )
  }

export default ModelChat