import { useState, useRef, useEffect } from "react";
import { Containers } from "./Containers";
import {NewContainer} from './NewContainer'

export function Kanban() {
  const [containers, setContainers] = useState([{id: 0, title: "Por Hacer", edit: false, isFormVisible: true, isBtnVisible: false, cards: [{ id: 0, text: "Crear portafolio", editor: true, color: 'bg-gray-200', modificar: false}],},]);
  const [trigger, setTrigger] = useState({triggerForm: true, triggerBtn: true});
  const [texts, setTexts] = useState(""); //un estado para tomar el valor de los enventos e.target.value de los inputs
  const [title, setTitle] = useState({title:'', contenedor:''})
  const [titleCard, setTitleCard] = useState({title:'', carta:'', conte:''})
  const [editCard, setEditCard] = useState(true)
  const idContainer = useRef(1);
  const idCards = useRef(1); 
  const formRefs = useRef({})
  const containerRefs = useRef(null)
  const titleRefs = useRef({})
  const cardTitleRefs = useRef({})


  
  useEffect(() =>{
    let handler = (e) =>{
      let arr = []
      let newArr = []
      let tester;
      containers.forEach(container1 => {
        arr.push(container1.id)
        
        if(formRefs.current[container1.id].contains(e.target)){
          newArr.push(container1.id)
  
        } else if(!containerRefs.current.contains(e.target) && !formRefs.current[container1.id].contains(e.target)){
          setTrigger({triggerForm: true, triggerBtn: true})

          if(cardTitleRefs.current[titleCard.carta] && !cardTitleRefs.current[titleCard.carta].contains(e.target)){

            setContainers((prevContainers=> prevContainers.map(container=>
              container.id===titleCard.conte ? {
                ...container, cards: container.cards.map(card =>
                  card.id === parseInt(cardTitleRefs.current[titleCard.carta].id, 10) && card.editor === false?
                  ({...card, text:titleCard.title, modificar: false, editor:true}) :card 
                )
              } : container
        )))

          }

          if(titleRefs.current[container1.id] && !titleRefs.current[container1.id].contains(e.target)){
            setContainers((containers) => containers.map((container) =>{
                  if(container.id === parseInt(titleRefs.current[container1.id].id, 10)){
                    return {...container, edit: false}
                  }
                  return container
            }
            ))
          }

        } 
        arr.forEach((number) =>{
         tester = newArr.includes(number)
          if(!tester){
            setContainers((containers) => 
            containers.map((container) => {
              if(container.id === number){
                return {...container, isFormVisible: true, isBtnVisible: false}
              }
              return container
            })
            )
          }
        })
      })
    } 
      document.addEventListener('mousedown', handler)
      return () =>{
        document.removeEventListener('mousedown', handler);
      }
    }, [containers, trigger, title])

  /**addConainer, la usamos para que el usuario pueda añadir el numero de listas o contenedores que desee
   */
  const addContainer = (idContainer) => {
    if (texts.length < 3) {
      return alert("ingresa minimo 3 caracteres");
    } else if (texts.length > 2) {
      setTexts(""); 
      //usamos el toggle para manejar la visibilidad
      setContainers([
        ...containers,
        {
          id: idContainer.current,
          title: texts,
          isFormVisible: true, 
          isBtnVisible: false, 
          cards: [],
        },
      ]);
      idContainer.current += 1;
      idCards.current += 1;
    }
  };

  //Captamos el valor ingresado por el usuario en los textareas
  const inputHandle = (e) => {
      setTexts(e.target.value);
  };

  //addCard para añadir una nueva tarea modificando el estado de container
  const addCard = (containerId) => {
    if (texts.length < 3) {
      return alert("ingresa minimo 3 caracteres");
    } else {
      setTexts("");
      setContainers(
        containers.map((container) =>
          container.id === containerId
            ? {...container, cards: [...container.cards, { id: idCards.current, text: texts, editor: true, color: 'bg-gray-200' },],}: container
        )
      );
      idCards.current += 1;
    }
  };


  const deleteContainer = (containerValue) => {
    const newContainer = [...containers];
    const deleteContainer = newContainer.splice(containerValue, 1);
    setContainers(newContainer);
  };


  const deleteCard = (containerId, cardIndex) => {
    setContainers((prevContainers) =>
      prevContainers.map((container) => {
        if (containerId === container.id) {
          const copyCards = [...container.cards];
          copyCards.splice(cardIndex, 1);
          return { ...container, cards: copyCards };
        }
        return container;
      })
    );
  };

  const onClickHandle = (containerId) =>{
      setContainers((containers) => containers.map((container)=>{
        if(parseInt(titleRefs.current[containerId].id, 10) === container.id){
            setTitle({title: container.title, contenedor: containerId})

          return {...container, edit: true}
        }
        return container
      }))
  }
  

  useEffect(()=>{
    if(titleRefs.current[title.contenedor]){
      titleRefs.current[title.contenedor].querySelector('input').focus()
      titleRefs.current[title.contenedor].querySelector('input').value=title.title
      setTexts(title.title)
    }
  },[title])

  useEffect(() =>{
    setTexts(titleCard.title)  
    if(cardTitleRefs.current[titleCard.carta]){
      cardTitleRefs.current[titleCard.carta].querySelector('input').focus()
      cardTitleRefs.current[titleCard.carta].querySelector('input').value=titleCard.title
    } 
  }, [titleCard])

  const editTitle = (containerId) => {
    setContainers((containers) => containers.map((container)=>{
      if(parseInt(titleRefs.current[containerId].id, 10) === container.id){
        if(texts.length < 3){
          alert('ingresa minimo 3 caracteres')
        }else{
          return {...container, edit: false, title:texts}
        }
      }
      return container
    }))
  } 

  useEffect(() =>{
    document.querySelectorAll('textarea').forEach((textarea) =>{
        textarea.focus()
    })
    document.querySelectorAll('textarea').forEach((textarea) =>{
      textarea.value=''
  })
  
  }, [trigger, containers])
  

  const triggerHandler = () =>{
    if(trigger.triggerForm === false){
      setTrigger({triggerForm: true, triggerBtn: false})
    }else{
      setTrigger({triggerForm: false, triggerBtn: true})
    }
    
  }

  const toggleHandler = (containerId) =>{
    setContainers((containers) =>
      containers.map(container => {
        if(container.id === containerId){
        return  {...container, isFormVisible: !container.isFormVisible, isBtnVisible: !container.isBtnVisible}
        }
        return container
      }
    ))
  }

  const cardFormHandler = (containerId, cardId) =>{
    setEditCard(true)
    setContainers((prevContainers=> prevContainers.map(container=>{
             if(container.id===containerId) {
              return { ...container, cards: container.cards.map((card)=>{
                if(card.id === parseInt(cardTitleRefs.current[cardId].id, 10) && card.editor === true){
                  setTitleCard({title:card.text, carta:card.id, conte: container.id})
                 // setTexts(titleCard.title)
                 return {...card, editor:false, modificar: true}
                }else{
                 return {...card, editor:true, modificar: false}
                }
              })}
              } return container
  }))) 
  }

  const editCardHanlder = () =>{
    editCard ? setEditCard(false) : setEditCard(true)
  }

  const handleRadioChange = (e, containerId, cardId) =>{
    setContainers((prevContainers=> prevContainers.map(container=>
      container.id===containerId ? {
        ...container, cards: container.cards.map(card =>
          card.id === cardId && card.editor === false?
          (console.log(e.target.value), {...card, color: e.target.value}) :card 
        )
      } : container
))) 
  }


  const setCardTitle = (containerId, cardId) =>{
    setContainers((prevContainers=> prevContainers.map(container=>
      container.id===containerId ? {
        ...container, cards: container.cards.map(card =>
          card.id === cardId && card.editor === false?
          ({...card, text:texts, modificar: false, editor:true}) :card 
        )
      } : container
)))
  }

//handleDragEnd es una funcion que utiliza la biblioteca @hello-pangea/dnd con ella gestionamos el drag and drop de las tarjetas
  const handleDragEnd = (result) => {
    const startIndex = result.source.index;
    const endIndex = result.destination.index ? result.destination.index : null;
    const sourceDrop = parseInt(result.source.droppableId, 10);
    const destinationDrop = parseInt(result.destination.droppableId, 10);

    //detecta si no hay desplazamiento 
    if (!result.destination) return;

    if (sourceDrop === destinationDrop && startIndex !== endIndex) {
      setContainers((prevContainers) =>
        prevContainers.map((container) => {
          if (container.id === destinationDrop) {
            const copyCards = [...container.cards];
            const [reorderedCard] = copyCards.splice(startIndex, 1);
            copyCards.splice(endIndex, 0, reorderedCard);
            return { ...container, cards: copyCards };
          }
          return container;
        })
      );
    }

    //detecta si hay un desplazamiento entre contenedores
    if (sourceDrop !== destinationDrop) {
      //elimina la tarjeta del contenedor de origen y almacena su valor en la variable insert
      setContainers((prevContainers) => {
        let insert;
        const updatedContainers = prevContainers.map((container) => {
          if (container.id === sourceDrop) {
            const copyCards = [...container.cards];
            insert = copyCards.splice(startIndex, 1)[0];
            return { ...container, cards: copyCards };
          }
          return container;
        });

        //comprueba si existe la tarjeta guardada en insert
        if (!insert) {
          console.error(
            "No se pudo extraer la tarjeta del contenedor de origen"
          );
          return prevContainers;
        }
        //Identifica el container de destino, hace una copia superficial del estado containers para añadir la tarjeta y actualizar el estado
        return updatedContainers.map((container) => {
          if (container.id === destinationDrop) {
            const copyCards = [...container.cards];
            copyCards.splice(endIndex, 0, insert);
            return { ...container, cards: copyCards };
          }
          return container;
        });
      });

      idCards.current += 1;
    }
  }; //funcion handledrag

  return (
    <div>
      <div className="bg-gray-800 bg-opacity-70 pl-10">
      <img src="public/logo.png" width='232' height='48'></img>
      </div>
    <div className="flex items-start overflow-x-auto whitespace-nowrap ">
      <Containers
        containers={containers}
        addContainer={addContainer}
        addCard={addCard}
        deleteContainer={deleteContainer}
        deleteCard={deleteCard}
        handleDragEnd={handleDragEnd}
        inputHandle={inputHandle}
        toggleHandler={toggleHandler}
        onClickHandle={onClickHandle}
        formRefs={formRefs}
        titleRefs={titleRefs}
        editTitle={editTitle}
        cardFormHandler={cardFormHandler}
        editCard={editCard}
        editCardHanlder={editCardHanlder}
        handleRadioChange={handleRadioChange}
        cardTitleRefs={cardTitleRefs}
        setCardTitle={setCardTitle}
      />
      <div className="flex flex-col bg-gray-500 p-2 ml-10 mt-16 bg-opacity-50 rounded-xl min-w-72 max-w-72">

          <NewContainer
          triggerHandler={triggerHandler}
          idContainer={idContainer}
          addContainer={addContainer}
          trigger={trigger}
          inputHandle={inputHandle}
          containerRefs={containerRefs}
          />

      </div>
    </div>
    </div>
  );
}
