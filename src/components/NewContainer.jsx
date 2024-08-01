import { FaPlus } from "react-icons/fa6";
import { RiCloseLargeLine } from "react-icons/ri";

export function NewContainer({triggerHandler, idContainer, addContainer, trigger, inputHandle, containerRefs}) {
  return (
    <>
      
      <div ref={containerRefs}  className={`flex flex-col ${!trigger.triggerForm ? "" : "hidden"}`}>
          <textarea
            placeholder="Introduce el titulo de la lista..."
            className=" bg-gray-500 bg-opacity-50 rounded-xl h-10 resize-none p-1 text-gray-50 border border-gray-500 border-opacity-0 focus:border-blue-400 focus:outline-none mt-1 placeholder:text-gray-100"
            onKeyDown={(e) =>{
                if(e.key === 'Enter'){
                  e.preventDefault();
                  addContainer(idContainer)
                }
            }}
            onChange={(e) => {
              inputHandle(e);
            }}
          ></textarea>
          <div className="flex pl-1 mt-2">
            <button
              className="bg-blue-400 p-1 flex items-center rounded text-gray-50 hover:bg-blue-300 mr-4 w-2/4 font-semibold"
              onClick={()=>{addContainer(idContainer)}}
            >
              <FaPlus /> Añadir Lista
            </button>
            <button className="text-gray-50 hover:rotate-12" onClick={()=>{triggerHandler()}}>
              <RiCloseLargeLine />
            </button>
          </div>
        </div>
        <button 
                  className={`text-gray-50 font-semibold p-1 mt-1 flex items-center hover:bg-gray-50 hover:rounded-xl hover:bg-opacity-60 hover:text-gray-500 ${trigger.triggerForm ? "" : "hidden"} `}
                  onClick={() => {
                    triggerHandler(idContainer)
                  }}
                >
                  <FaPlus /> Añade una Lista
        </button>
    </>
  )
}

