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

// types


import { CardType } from './types/type';

// firestore

import { app } from './app/firebaseApp';
import { getFirestore } from "firebase/firestore";
import { collection, addDoc } from 'firebase/firestore';

// server

import { typeProduct } from './components/server/server';
import { typeWork } from './components/server/server';




const App = () => {


  const id = uuidv4().split('').slice(0, 8).join('')

  const [card, setCard] = useState<CardType>({
    id: id,
    name: '',
    phone: '',
    email: '',
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


  const newDate = new Date(card.deadline)
  const timestamp = newDate.getTime()




  const message = (card : any) => {
    return `Имя\n${card.name}\nТелефон\n${card.phone}\nПочта\n${card.email}\nТип продукта\n${card.typeProduct.label}\n Другое\n${card.otherProduct}\nСопутствующие продукты для фильма\n${card.promotion}\nТип Работ\n${card.typeWork.label}\nДля какой большой цели нужен продукт?\n${card.target}\nКто является конечным зрителем и география его проживания?\n${card.viewer}\nКакой эффект должен произвести продукт на зрителя?\n${card.effect}\nОпишите содержание ролика\n${card.description}\nЗакадровый текст\n${card.voiceover}\nХронометраж\n${card.timing}\nПлощадки для размещения\n${card.place}\nТехническая спецификация\n${card.technicalSpecification}\nДата выхода\n${card.deadline}\n`
  }



  // Yougile

  // useEffect(() => {
  //   getApiKeyYougile()
  //   getAllCard()
  // }, [])


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
        localStorage.setItem('ProdBoard', data_2.content[0].id);
      }));
  }


  const getAllCard = async () => {
    const prodKey = localStorage.getItem('ProdKey')
    const prodBoard = localStorage.getItem('ProdBoard')

    return await fetch(`${url}columns`, {
      method:'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${prodKey}`
      }

    }).then(responce => responce.json())
      .then(data => console.log(data))
  }


  const createYGCard = async () => {
    const prodKey = localStorage.getItem('ProdKey')
    const prodBoard = localStorage.getItem('ProdBoard')

    return await fetch(`${url}tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${prodKey}`
      },
      body: JSON.stringify({title: `№${card.id}`, columnId: prodBoard, description: message(card), deadline: {deadline: timestamp} })
    }).then(responce => responce.json())
      .then(data => console.log(data))

  }




  // firebase


  const createFirestoreDoc = async () => {
    const db = getFirestore(app);
    try {

      const docRef = await addDoc(collection(db, "cards"), {
        name: card.name,
        phone: card.phone,
        email: card.email,
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

      console.log(`Document is Create ${docRef.id}` )

    } catch (error) {
      console.log(error)
    }
  }


  // Create new Card

  const createNewCard = () => {

    if(card.name !== '' && card.phone !== '' && card.email !== '' && card.promotion !== '' && card.target !== '' && card.viewer !== '' && card.effect !== '' && card.description !== '' && card.voiceover !== '' && card.timing !== '' && card.place !== '' && card.technicalSpecification !== '' && card.deadline !== '') {

      createYGCard()
      createFirestoreDoc()
      setCard({
        id: id,
        name: '',
        phone: '',
        email: '',
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

      alert('Карточка успешно создана')

    } else {
      return alert('Заполните все поля')
    }



  }


  // Clear card


  const clearSelectCard = () => {

      setCard({
        id: id,
        name: '',
        phone: '',
        email: '',
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





//



  return (
    <Container className='d-flex flex-column justify-content-center align-items-center'>


            <Header></Header>

            <Form cards={{card, setCard}} createCard={createNewCard} clearCard={clearSelectCard}></Form>

            <Footer></Footer>



    </Container>

  )
}

export default App
