import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';

//

import { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { Container } from 'react-bootstrap';

// components

import Form from './components/page/ts/Form';

// types


import { CardType } from './types/type';
import { get } from 'http';




const App = () => {


  const id = uuidv4().split('').slice(0, 8).join('')

  const [card, setCard] = useState<CardType>({
    id: id,
    name: '',
    phone: '',
    email: '',
    typeProduct: '',
    promotion: '',
    typeWork:'',
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






  // Yougile


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


  const createNewCard = async () => {
    const prodKey = localStorage.getItem('ProdKey')
    const prodBoard = localStorage.getItem('ProdBoard')

    return await fetch(`${url}tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${prodKey}`
      },
      body: JSON.stringify({title: `№${id} \ntitle: ${title}`, columnId: prodBoard, description: `№${id} \ntitle: ${title} \nmessage: ${message}`})
    }).then(responce => responce.json())
      .then(data => console.log(data))
  }


  // useEffect(() => {
  //   getApiKeyYougile()
  //   getAllCard()
  // }, [])


//



  return (
    <Container>

    <div className='App'>
    <h1>Title</h1>

    <Form cards={{card, setCard}}></Form>

    </div>

    </Container>

  )
}

export default App
