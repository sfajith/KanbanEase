import {EditCard} from './EditCard'
import { PiNotePencilBold } from "react-icons/pi";

export function Card({draggableProvider, card, index, container, deleteCard, cardFormHandler, editCard, editCardHanlder, handleRadioChange, cardTitleRefs, editCardTitle, setCardTitle, inputHandle}) {
  return (
    <>
                      <div
                        ref={draggableProvider.innerRef}
                        {...draggableProvider.draggableProps}
                        {...draggableProvider.dragHandleProps}
                        key={card.id}
                        className="bg-gray-100 mt-2 flex justify-between p-1 rounded-xl break-normal items-center whitespace-normal relative"
                      > 
                      <div ref={(el) => {cardTitleRefs.current[card.id] = el}} id={card.id} className='flex justify-between w-full'>
                        <div className='flex flex-col'>
                        <div className={`h-2 w-16 rounded-xl ml-2 ${card.color} `}></div>
                        
                        {!card.modificar ? (<span className="text-gray-600 ml-2">{card.text}</span>) :
                          (<input onKeyDown={(e) =>{
                            if(e.key==='Enter'){
                              setCardTitle(container.id, card.id)
                              e.preventDefault()
                            }
                          }} onChange={(e) =>{inputHandle(e)}} id="titulo" className="text-gray-600 h-8 w-56 bg-transparent rounded-xl pl-1 " ></input>)
                        }
                        </div>
                        
                        <button
                          className="text-gray-600 mr-2 hover:text-cyan-700"
                          onClick={() =>{cardFormHandler(container.id, card.id)}}
                        >

                          <PiNotePencilBold className="mr-1" />
                        </button>
                        
                        <EditCard container={container} index={index} deleteCard={deleteCard} card={card} editCard={editCard} editCardHanlder={editCardHanlder} handleRadioChange={handleRadioChange} editCardTitle={editCardTitle} setCardTitle={setCardTitle} cardFormHandler={cardFormHandler}/>
                        </div>
                      </div>
    </>
  )
}
