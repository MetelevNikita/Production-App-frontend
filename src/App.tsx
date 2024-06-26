import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';

//

import { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { Container, Row, Col } from 'react-bootstrap';

// components

import Form from './components/page/ts/Form';
import Header from './components/page/ts/Header';
import Footer from './components/page/ts/Footer';

// modals

import ModalCreateCard from './components/modals/ModalCreateCard';
import ModalAlarmCard from './components/modals/ModalAlarmCard';

// types


import { CardType } from './types/type';

// firestore

import { app } from './app/firebaseApp';
import { getFirestore } from "firebase/firestore";
import { collection, addDoc, getDocs, setDoc, doc, getDoc } from 'firebase/firestore';

// server

import { typeProduct } from './components/server/server';
import { typeWork } from './components/server/server';




const App = () => {

  useEffect(() => {getFirestoreDoc()}, [])



  const [cardId, setCardId] = useState([])
  const id = cardId.length + 1
  const [card, setCard] = useState<CardType>({
    id: id,
    title: '',
    name: '',
    phone: '',
    tgId: '',
    typeProduct: typeProduct[0],
    otherProduct: '',
    promotion: '',
    typeWork: typeWork[0],
    target: '',
    viewer: '',
    effect: '',
    description: '',
    voiceover: '',
    timing: '',
    place:'',
    technicalSpecification: '',
    deadline: ''
  })


  const [modalCreate, setModalCreate] = useState<boolean>(false)
  const [modalAlert, setModalAlert] = useState<boolean>(false)

  const newDate = new Date(card.deadline)
  const timestamp = newDate.getTime()


  const message = (card : any) => {
    return `№${id}\n\nНазвание проекта\n\n${card.title}\n\nИмя\n\n${card.name}\n\nТелефон\n\n${card.phone}\n\nTelegramID\n\n${card.tgId}\n\nТип продукта\n\n${card.typeProduct.label}\n\nДругое\n\n${card.otherProduct}\n\nСопутствующие продукты для фильма\n\n${card.promotion}\n\nТип Работ\n\n${card.typeWork.label}\n\nДля какой большой цели нужен продукт?\n\n${card.target}\n\nКто является конечным зрителем и география его проживания?\n\n${card.viewer}\n\nКакой эффект должен произвести продукт на зрителя?\n\n${card.effect}\n\nОпишите содержание ролика\n\n${card.description}\n\nЗакадровый текст\n\n${card.voiceover}\n\nХронометраж\n\n${card.timing}\n\nПлощадки для размещения\n\n${card.place}\n\nТехническая спецификация\n\n${card.technicalSpecification}\n\n \n\nДата выхода\n\n${card.deadline}`
  }



  // Yougile

  useEffect(() => {
    getApiKeyYougile()
    getAllCard()
  }, [])


  const url = 'https://ru.yougile.com/api-v2/'


  const getApiKeyYougile = async () => {
  const responce = await fetch(`${url}auth/companies`, {
  method: 'POST',
  headers: {
  'Content-Type': 'application/json'
  },
  body: JSON.stringify({ login: 'Kyle.B@mail.ru', password: 'Metelev1989' })
  });
  const data = await responce.json();
  const companyPROD_ID = data.content[3].id;
  const responce_1 = await fetch(`${url}auth/keys/get`, {
  method: 'POST',
  headers: {
  'Content-Type': 'application/json'
  },
  body: JSON.stringify({ login: 'Kyle.B@mail.ru', password: 'Metelev1989', companyId: companyPROD_ID })
  });
  const data_1 = await responce_1.json();
  localStorage.setItem('ProdKey', data_1[2].key);
  return await fetch(`${url}columns`, {
  method: 'GET',
  headers: {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${data_1[2].key}`
  }
  }).then(responce_2 => responce_2.json())
  .then((data_2 => {
    console.log(data_2)
  localStorage.setItem('ProdBoard', data_2.content[6].id);
  })).catch(err => console.log(err));
  }

  const getAllCard = async () => {
  const prodKey = localStorage.getItem('ProdKey')
  const prodBoard = localStorage.getItem('ProdBoard')
  console.log(prodBoard)

  return await fetch(`${url}columns`, {
  method:'GET',
  headers: {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${prodKey}`
  }

  }).then(responce => responce.json())
  .then(async data => {

  const columnId =  data.content[6].id
  const responce = await fetch(`${url}tasks`, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${prodKey}`
  }
  });
  const data_1 = await responce.json();
  console.log(data_1)
  return data_1
  })
  .catch(err => console.log(err));
  }

  const createYGCard = async () => {
  const prodKey = localStorage.getItem('ProdKey')
  const prodBoard = localStorage.getItem('ProdBoard')

  try {

  return await fetch(`${url}tasks`, {
  method: 'POST',
  headers: {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${prodKey}`
  },
  body: JSON.stringify({title: `№${id} - Название ${card.title}`, columnId: prodBoard, description: message(card), deadline: {deadline: timestamp}})
  }).then(responce => responce.json())
  .then(data => data)

  } catch (error) {
  console.log(error)
  }

  }




  // firebase

  const createFirestoreDoc = async () => {
    const db = getFirestore(app);
    try {

      const docRef = await setDoc(doc(db, "cards", JSON.stringify(id)), {
        id: id,
        title: card.title,
        name: card.name,
        phone: card.phone,
        tgId: card.tgId,
        typeProduct: card.typeProduct.label,
        promotion: card.promotion,
        typeWork: card.typeWork.label,
        target: card.target,
        viewer: card.viewer,
        effect: card.effect,
        description: card.description,
        voiceover: card.voiceover,
        timing: card.timing,
        place: card.place,
        technicalSpecification: card. technicalSpecification,
        deadline: card.deadline
      })

      console.log(`Document is Create ${id}` )

    } catch (error) {
      console.error(error, 'Ошибка создания данных с Firestore')
    }
  }


  const getFirestoreDoc = async () => {
    const db = getFirestore(app);
    try {
      const querySnapshot : any = await getDocs(collection(db, "cards"));
      const data = querySnapshot.docs.map((doc: any) => doc.data());
      setCardId(data)

    } catch (error) {
      console.error(error, 'Ошибка получения данных с Firestore')
    }
  }






  // Create new Card

  const createNewCard = () => {

    try {

      if(card.name !== '', card.phone !== '',  card.tgId !== '', card.promotion !== '', card.target !== '', card.viewer !== '', card.effect !== '', card.description !== '', card.voiceover !== '', card.timing !== '', card.place !== '', card.technicalSpecification !== '', card.deadline !== '') {

        createYGCard()
        SendToTelegram()
        createFirestoreDoc()
        setCard({
          id: id,
          title: '',
          name: '',
          phone: '',
          tgId: '',
          typeProduct: typeProduct[0],
          otherProduct: '',
          promotion: '',
          typeWork: typeWork[0],
          target: '',
          viewer: '',
          effect: '',
          description: '',
          voiceover: '',
          timing: '',
          place:'',
          technicalSpecification: '',
          deadline: ''
        })
        setModalCreate(true)

      } else {
        setModalAlert(true)
      }

    } catch (error) {
      console.log(error, 'Ошибка отправки сообщения')
    }
  }


  // Clear card


  const clearSelectCard = () => {

    return setCard({
        id: id,
        title: '',
        name: '',
        phone: '',
        tgId: '',
        typeProduct: typeProduct[0],
        otherProduct: '',
        promotion: '',
        typeWork: typeWork[0],
        target: '',
        viewer: '',
        effect: '',
        description: '',
        voiceover: '',
        timing: '',
        place:'',
        technicalSpecification: '',
        deadline: ''
      })
  }


  // sendToTelegram


  const SendToTelegram = async () : Promise<any> => {
    const TOKEN = '6561343238:AAHQWfNwKLmEu-hlH_y6M00MUB_XyZqTzk8'
    const CHAT_ID = '-4171897222'
    const URL = `https://api.telegram.org/bot${TOKEN}/sendMessage`

    try {

      const responce = await fetch(URL, {
        method: 'POST',
        headers: {
          'Content-Type':'application/json'
        },
        body: JSON.stringify({chat_id: CHAT_ID, parse_mode: 'html', text: message(card)})
      })
      const data = await responce.json()

    } catch (error) {

      console.log(error)

    }
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
