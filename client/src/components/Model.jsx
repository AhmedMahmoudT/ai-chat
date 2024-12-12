/* eslint-disable react/prop-types */

const Model = ({ model, models, setModels }) => {
  
    const handleCheck = () => {
        // it should unchecke if any other model is checked
        models.forEach((model) => {
            if (model.checked) {
                model.checked = false;
            }
        });

        model.checked = !model.checked;
        setModels([...models]);
    };

  return (
    <div
      onClick={handleCheck}
      className={`rounded-[28px] flex flex-col items-center justify-center border-2 ${model.checked&&'border-indigo-600'} w-44 h-44 hover:bg-indigo-100 text-neutral-400 hover:text-indigo-600 relative cursor-pointer`}
    >
      <img src={model.logo} className="w-32 h-32" />
      <p
        className={`${model.checked && "text-indigo-600 font-semibold"}`}
      >
        {model.name}
      </p>
      {model.checked && (
        <div className="absolute rounded-full bg-indigo-600 w-4 h-4 top-4 right-4"></div>
      )}
    </div>
  );
};

export default Model;
