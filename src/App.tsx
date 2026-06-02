import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';

//

import { useState } from 'react'
import { Container } from 'react-bootstrap';



// components

import Form from './components/page/ts/Form';
import Header from './components/page/ts/Header';
import Footer from './components/page/ts/Footer';

// modals

import ModalCreateCard from './components/modals/ModalCreateCard';
import ModalAlarmCard from './components/modals/ModalAlarmCard';

// types


import { CardType } from './types/type';


// server

import { typeProduct } from './components/server/server';
import { typeWork } from './components/server/server';




const App = () => {


  const [card, setCard] = useState<CardType>({
    title: '',
    name: '',
    phone: '',
    tgid: '',
    typeproduct: typeProduct[0],
    otherproduct: '',
    promotion: '',
    typework: typeWork[0],
    target: '',
    viewer: '',
    effect: '',
    description: '',
    voiceover: '',
    timing: '',
    place:'',
    technicalspecification: '',
    deadline: ''
  })

  const [modalCreate, setModalCreate] = useState<boolean>(false)
  const [modalAlert, setModalAlert] = useState<boolean>(false)


  // create card to server


  const createNewCard = async (): Promise<any> => {


    const correctCard = {
          title: card.title,
          name: card.name,
          phone: card.phone,
          tgid: card.tgid,
          typeproduct: card.typeproduct.label,
          otherproduct: card.otherproduct,
          promotion: card.promotion,
          typework: card.typework.label,
          target: card.target,
          viewer: card.viewer,
          effect: card.effect,
          description: card.description,
          voiceover: card.voiceover,
          timing: card.timing,
          place: card.place,
          technicalspecification: card.technicalspecification,
          deadline: card.deadline,
    }

    try {

      const responce = await fetch('/api/v1/message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(correctCard)
      })


      if (!responce.ok) {
        throw new Error(`Ошибка запроса на сервер при создании сообщения ${responce.statusText}`)
      }
      const data = await responce.json()
      setModalCreate(true)

    } catch (error) {
      setModalAlert(true)
      console.log(`Что то пошло не так при отправке на сервер. Код ошибки ${error}`)
      return
    }
  }




  // Clear card


  const clearSelectCard = () => {

    return setCard({
        title: '',
        name: '',
        phone: '',
        tgid: '',
        typeproduct: typeProduct[0],
        otherproduct: '',
        promotion: '',
        typework: typeWork[0],
        target: '',
        viewer: '',
        effect: '',
        description: '',
        voiceover: '',
        timing: '',
        place:'',
        technicalspecification: '',
        deadline: ''
      })
  }

  //



  return (
    <Container className='d-flex flex-column justify-content-center align-items-center'>


            <Header></Header>

            <Form cards={{card, setCard}} createCard={createNewCard} clearCard={clearSelectCard}></Form>

            <Footer></Footer>


            {(modalCreate === true) ? <ModalCreateCard modal={{modalCreate, setModalCreate}}/> : <></>}
            {(modalAlert === true) ? <ModalAlarmCard alert={{modalAlert, setModalAlert}}></ModalAlarmCard> : <></>}



    </Container>

  )
}

export default App
