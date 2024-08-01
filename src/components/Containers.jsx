import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import {Form} from './Form'
import {Card} from './Card'
import { RiFolderCloseLine } from "react-icons/ri";

export function Containers({
  containers,
  addCard,
  inputHandle,
  deleteContainer,
  deleteCard,
  handleDragEnd,
  toggleHandler,
  formRefs,
  titleRefs,
  onClickHandle,
  editTitle,
  color,
  cardFormHandler,
  editCard,
  editCardHanlder,
  handleRadioChange,
  editCardTitle,
  cardTitleRefs,
  setCardTitle
}) {


  return (
    <>
      <DragDropContext onDragEnd={handleDragEnd}>
        {containers.map((container) => (
          <Droppable droppableId={container.id.toString()} key={container.id}>
            {(droppableProvider) => (
              <div
                className="min-w-72 max-w-72  bg-gray-50 p-2 ml-10 mt-16 bg-opacity-50 rounded-xl"
                ref={droppableProvider.innerRef}
                {...droppableProvider.droppableProps}
              >
                <div ref={(el) =>{titleRefs.current[container.id] = el}} id={container.id} className="flex justify-between">
                  {
                    !container.edit ? (<h1 onClick={() => {onClickHandle(container.id)}} className="text-gray-600 text-xl pl-1 font-semibold truncate ">{container.title}</h1>): (<input onKeyDown={(e) =>{
                      if(e.key==='Enter'){
                        editTitle(container.id)
                        e.preventDefault()
                      }
                    }} onChange={(e) =>{inputHandle(e)}} id="titulo" className="text-gray-600 text-xl h-8 w-56 bg-transparent resize-none rounded-xl pl-1 font-semibold" ></input>)
                  }

                  
                  <button
                    className=" text-gray-600 p-2 hover:text-red-500"
                    onClick={() => {
                      deleteContainer(container.id);
                    }}
                  >
                    <RiFolderCloseLine />
                    
                  </button>
                </div>
                {container.cards.map((card, index) => (
                  <Draggable
                    index={index}
                    key={card.id}
                    draggableId={card.id.toString()}
                  >
                    {(draggableProvider) => (
                      <Card
                      draggableProvider={draggableProvider}
                      card={card}
                      index={index}
                      container={container}
                      deleteCard={deleteCard}
                      color={color}
                      cardFormHandler={cardFormHandler}
                      editCard={editCard}
                      editCardHanlder={editCardHanlder}
                      handleRadioChange={handleRadioChange}
                      editCardTitle={editCardTitle}
                      cardTitleRefs={cardTitleRefs}
                      setCardTitle={setCardTitle}
                      inputHandle={inputHandle}
                      />
                    )}
                  </Draggable>
                ))}
                {droppableProvider.placeholder}
                <Form
                  container={container}
                  inputHandle={inputHandle}
                  addCard={addCard}
                  toggleHandler={toggleHandler}
                  formRefs={formRefs}
                 />
              </div>
            )}
          </Droppable>
        ))}
      </DragDropContext>
    </>
  );
}
