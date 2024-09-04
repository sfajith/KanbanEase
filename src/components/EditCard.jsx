import { RiCloseLargeLine } from "react-icons/ri";
import { LuTags } from "react-icons/lu";
import { MdOutlineDeleteForever } from "react-icons/md";
import { MdOutlineDoneOutline } from "react-icons/md";

export function EditCard({container, index, deleteCard, card, editCard, editCardHanlder, handleRadioChange, editCardTitle, setCardTitle, cardFormHandler}) {
  return (
    
      <div className={`absolute flex flex-col items-start bg-gray-500 rounded-xl left-full ml-2 w-64 h-32 z-50 pt-3 pl-2  ${!card.editor ? '' : 'hidden'}`}>
        <button className="flex items-center text-gray-500 mb-1 p-1 rounded bg-gray-100 hover:bg-blue-400 hover:text-gray-50 font-semibold" onClick={() =>{setCardTitle(container.id, card.id)}} ><MdOutlineDoneOutline  className="mr-1" />Apply</button>

        <button className="flex items-center whitespace-nowrap bg-gray-100 p-1 rounded text-gray-500 hover:bg-blue-400 hover:text-gray-50 font-semibold" onClick={editCardHanlder}> <LuTags className="mr-1"/> Assign Priority</button>
        <div className={`flex flex-col bg-gray-100 bg-opacity-90 rounded-xl p-2 gap-2 text-center mt-2 mb-1 ${!editCard ? '' : 'hidden'}`}>
          <div className="flex justify-between text-gray-500">
            <h3>Labels</h3>
          <button onClick={editCardHanlder}><RiCloseLargeLine className="hover:rotate-12"/></button>
          </div>
        <label className={`inline-flex items-center p-1 rounded cursor-pointer font-semibold hover:bg-red-500 hover:text-gray-100 ${
                    card.color === 'bg-red-500' ? 'bg-red-500 text-gray-100' : 'bg-gray-100 text-gray-500'
                }`}>
                <input className='hidden'
                    type="radio"
                    name="options"
                    value='bg-red-500'
                    checked={card.color === 'bg-red-500'}
                    onChange={(e) =>{handleRadioChange(e, container.id, card.id)}}
                />
                High
            </label>
            <label className={`inline-flex items-center p-1 rounded cursor-pointer text-gray-500 font-semibold hover:bg-yellow-400 ${
                    card.color === 'bg-yellow-400' ? 'bg-yellow-400 text-gray-700' : 'bg-gray-100'
                }`}>
                <input className='hidden'
                    type="radio"
                    name="options"
                    value='bg-yellow-400'
                    checked={card.color === 'bg-yellow-400'}
                    onChange={(e) =>{handleRadioChange(e, container.id, card.id)}}
                />
                Moderate
            </label>
            <label className={`inline-flex items-center p-1 rounded cursor-pointer text-gray-500 font-semibold hover:bg-green-500 ${
                    card.color === 'bg-green-500' ? 'bg-green-500 text-gray-700' : 'bg-gray-100'
                }`}>
                <input className='hidden'
                    type="radio"
                    name="options"
                    value='bg-green-500'
                    checked={card.color === 'bg-green-500'}
                    onChange={(e) =>{handleRadioChange(e, container.id, card.id)}}
                />
                Low
            </label>
            <label className={`inline-flex items-center p-1 rounded cursor-pointer text-gray-500 font-semibold ${
                    card.color === 'bg-gray-200' ? 'bg-transparent' : 'bg-transparent'
                }`}>
                <input className='hidden'
                    type="radio"
                    name="options"
                    value='bg-gray-200'
                    checked={card.color === 'bg-gray-200'}
                    onChange={(e) =>{handleRadioChange(e, container.id, card.id)}}
                />
                Remove
            </label>
        </div>
        <button className="flex items-center text-gray-500 mt-1 p-1 p- rounded bg-gray-100 hover:bg-red-600 hover:text-gray-50 font-semibold" onClick={() => {deleteCard(container.id, index);}}><MdOutlineDeleteForever className="mr-1" />Delete Card</button>
  </div>
    
  )
}

