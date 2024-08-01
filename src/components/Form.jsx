import { FaPlus } from "react-icons/fa6";
import { RiCloseLargeLine } from "react-icons/ri";

export function Form({addCard, container, inputHandle, toggleHandler, formRefs}) {
  return (
    <>
         <div ref={(el) => formRefs.current[container.id] = el} className={`flex flex-col ${!container.isFormVisible ? "" : "hidden"}`}>
          <textarea 
            placeholder="Introduce un nombre para esta tarjeta..."
            className=" bg-gray-50 bg-opacity-60 rounded-xl resize-none p-1 text-gray-700 border border-gray-500 border-opacity-0 focus:border-blue-400 focus:outline-none mt-1 placeholder:text-gray-400"
            onChange={(e) => {
              inputHandle(e);
            }}
            onKeyDown={(e) =>{
              if(e.key === 'Enter'){
                e.preventDefault();
                addCard(container.id)
              }
          }}
          ></textarea>
          <div className="flex pl-1 mt-2">
            <button
              className="bg-blue-400 p-1 flex items-center rounded text-gray-50 hover:bg-blue-300 mr-4 w-2/4 font-semibold"
              onClick={()=>{addCard(container.id)}}
            >
              <FaPlus  /> Añadir Tarjeta
            </button>
            <button className="text-gray-800 hover:rotate-12" onClick={()=>{toggleHandler(container.id)}}>
              <RiCloseLargeLine />
            </button>
          </div>
        </div>
        <button
                  className={`text-gray-500 font-semibold p-1 mt-1 flex items-center hover:bg-gray-50 hover:rounded-xl hover:bg-opacity-60 ${!container.isBtnVisible ? '' : 'hidden'}`}
                  onClick={() => {
                    toggleHandler(container.id)
                  }}
                >
                  <FaPlus /> Añade una tarjeta
                </button>
    </>
  )
}

