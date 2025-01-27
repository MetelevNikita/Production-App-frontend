import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';

//

import { useState, useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap';

// utill

import { getYouGileKey } from './util/getYouGileKey';


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


  const tgId = ['130127579', '225091566', '85252645', '225091566']

  const [ygKey, setYgKey] = useState<string>('')
  const [boardId, setBoardId] = useState<string>('')
  const [cardId, setCardId] = useState([])
  const id = cardId.length + 1
  const [card, setCard] = useState<CardType>({
    id: id,
    cardid: '',
    title: '',
    name: '',
    phone: '',
    tgid: '',
    typeproduct: typeProduct[0].label,
    otherproduct: '',
    promotion: '',
    typework: typeWork[0].label,
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

  const newDate = new Date(card.deadline)
  const timestamp = newDate.getTime()

  const url = process.env.REACT_APP_YG_URL


  const message = (card : any) => {
    return `№${id}\n\ncardId\n${card.cardid}\n\nНазвание проекта\n\n${card.title}\n\nИмя\n\n${card.name}\n\nТелефон\n\n${card.phone}\n\nTelegramID\n\n${card.tgid}\n\nТип продукта\n\n${(card.typeproduct === undefined) ? 'не определено' : JSON.stringify(card.typeproduct.label)}\n\nДругое\n\n${card.otherproduct}\n\nСопутствующие продукты для фильма\n\n${card.promotion}\n\nТип Работ\n\n${(card.typework === undefined) ? 'не определено' : JSON.stringify(card.typework.label)}\n\nДля какой большой цели нужен продукт?\n\n${card.target}\n\nКто является конечным зрителем и география его проживания?\n\n${card.viewer}\n\nКакой эффект должен произвести продукт на зрителя?\n\n${card.effect}\n\nОпишите содержание ролика\n\n${card.description}\n\nЗакадровый текст\n\n${card.voiceover}\n\nХронометраж\n\n${card.timing}\n\nПлощадки для размещения\n\n${card.place}\n\nТехническая спецификация\n\n${card.technicalspecification}\n\n \n\nДата выхода\n\n${card.deadline}`
  }

  const messageYG = (card : any) => {
    return `№${id}<br><br>Название проекта<br>${card.title}<br><br>Имя<br>${card.name}<br><br>Телефон<br>${card.phone}<br><br>TelegramID<br>${card.tgid}<br><br>Тип продукта<br>${(card.typeproduct === undefined) ? 'не определено' : JSON.stringify(card.typeproduct.label)}<br><br>Другое<br>${card.otherproduct}<br><br>Сопутствующие продукты для фильма<br>${card.promotion}<br><br>Тип Работ<br>${(card.typework === undefined) ? 'не определено' : JSON.stringify(card.typework.label)}<br><br>Для какой большой цели нужен продукт?<br>${card.target}<br><br>Кто является конечным зрителем и география его проживания?<br>${card.viewer}<br><br>Какой эффект должен произвести продукт на зрителя?<br>${card.effect}<br><br>Опишите содержание ролика<br>${card.description}<br><br>Закадровый текст<br>${card.voiceover}<br><br>Хронометраж<br>${card.timing}<br><br>Площадки для размещения<br>${card.place}<br><br>Техническая спецификация<br>${card.technicalspecification}<br><br><br>Дата выхода<br>${card.deadline}`
  }



  // Yougile

  useEffect(() => {
    const getKey = async () => {
      const key = await getYouGileKey(url)
      setYgKey(key)


      getCurrentBoardID(key)

    }

    getKey()

    // server

    getAllCardServer()

  }, [])






  const getCurrentBoardID = async (key: string) => {

    try {

      const responce = await fetch(`${url}columns`, {
        method:'GET',
        headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${key}`
        }
      })

      const data = await responce.json()
      const currentBoard = data.content.filter((item: {title: string, color: number, boardId: string, id: string}) => {
        return item.title === 'Входящие'
      })[0].id

      setBoardId(currentBoard)

    } catch (error) {
      console.log(`Ошибка получения корректной доски ${error}`)
    }

  }

  const createYGCard = async (key: string) => {

  try {

    const responce = await fetch(`${url}tasks`, {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${key}`
      },
      body: JSON.stringify({title: `№${id} - Название ${card.title}`, columnId: boardId, description: messageYG(card), deadline: {deadline: timestamp}})
      })

      const data = await responce.json()
      console.log(data)
      localStorage.setItem('card_id', data.id)

      if(data.id !== null) {
        createNewCardServer(data.id)

        tgId.forEach((item) => {
          sendToTelegram(item, data.id)
        })

        sendMessageToTgGroup(data.id)

      } else {
        alert('Ошибка создания карточки в YouGile, попробуйте еще раз')
        console.error('Ошибка создания карточки в YouGile')
        return
      }



      } catch (error) {
      console.log(`Ошибка создания карточки в YouGile ${error}`)
      }
  }



  // create card to server


  const createNewCardServer = async (card_id: string) => {
    try {

      const responce = await fetch('https://www.utvprod.tw1.ru/api/v1/message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: id,
          cardid: card_id,
          title: card.title,
          name: card.name,
          phone: card.phone,
          tgid: card.tgid,
          typeproduct: typeProduct[0].label,
          otherproduct: card.otherproduct,
          promotion: card.promotion,
          typework: typeWork[0].label,
          target: card.target,
          viewer: card.viewer,
          effect: card.effect,
          description: card.description,
          voiceover: card.voiceover,
          timing: card.timing,
          place: card.place,
          technicalspecification: card.technicalspecification,
          deadline: card.deadline,
        })
      })
        const data = await responce.json()
        return data

    } catch (error) {
      console.log(`Что то пошло не так при отправке на сервер. Код ошибки ${error}`)
    }
  }


  const getAllCardServer = async () => {
    try {
      const responce = await fetch('https://www.utvprod.tw1.ru/api/v1/message', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const data = await responce.json()
      setCardId(data)
      return data

    } catch (error) {
      console.log(`Что то пошло не так при получении данных с сервера. Код ошибки ${error}`)

    }
  }



  // create new card

  const createNewCard = () => {

    try {

      if(card.name !== '', card.phone !== '',  card.tgid !== '', card.promotion !== '', card.target !== '', card.viewer !== '', card.effect !== '', card.description !== '', card.voiceover !== '', card.timing !== '', card.place !== '', card.technicalspecification !== '', card.deadline !== '') {

        createYGCard(ygKey)

        setTimeout(() => {

          setCard({
            id: id,
            cardid: '',
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
          setModalCreate(true)
        }, 1500)

      } else {
        setModalAlert(true)
      }

    } catch (error) {
      console.log(`Ошибка отправки сообщения ${error}`)
    }
  }


  // Clear card


  const clearSelectCard = () => {

    return setCard({
        id: id,
        cardid: '',
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


  // sendToTelegram


  const sendToTelegram = async (CHAT_ID: string, cardId: any) : Promise<any> => {


    const cardYGId = localStorage.getItem('card_id')

    const cardTG = {
      id: id,
      cardid: JSON.stringify(cardId),
      title: card.title,
      name: card.name,
      phone: card.phone,
      tgid: card.tgid,
      typeproduct: card.typeproduct,
      otherproduct: card.otherproduct,
      promotion: card.promotion,
      typework: card.typework,
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


    const TOKEN = '6937785290:AAECcxUKtiOc0gU-R-y7GGZ71nI6MrWTXb8'
    const URL = `https://api.telegram.org/bot${TOKEN}/sendMessage`

    try {

      const responce = await fetch(URL, {
        method: 'POST',
        headers: {
          'Content-Type':'application/json'
        },
        body: JSON.stringify({chat_id: CHAT_ID, parse_mode: 'html', text: message(cardTG), reply_markup: {inline_keyboard: [[{ text: 'Согласовать', callback_data: 'agree' }, { text: 'Отклонить', callback_data: 'disagree' }, { text: 'Согласовать с замечанием', callback_data: 'comment' }]]}})
      })
      const data = await responce.json()
      return data

    } catch (error) {
      console.log(`Сообщение не отправлено боту. Код ошибки ${error}`)
    }
  }




  const sendMessageToTgGroup = async (cardId: any) => {
    try {

      const cardYGId = localStorage.getItem('card_id')
      const cardTG = {
        id: id,
        cardid: JSON.stringify(cardId),
        title: card.title,
        name: card.name,
        phone: card.phone,
        tgid: card.tgid,
        typeproduct: card.typeproduct,
        otherproduct: card.otherproduct,
        promotion: card.promotion,
        typework: card.typework,
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

      const CHAT_ID = '-4171897222'
      const TOKEN = '6561343238:AAHQWfNwKLmEu-hlH_y6M00MUB_XyZqTzk8'
      const URL = `https://api.telegram.org/bot${TOKEN}/sendMessage`


      const responce = await fetch(URL, {
        method: 'POST',
        headers: {
          'Content-Type':'application/json'
        },
        body: JSON.stringify({chat_id: CHAT_ID, parse_mode: 'html', text: message(cardTG)})
      })
      const data = await responce.json()
      return data


    } catch (error) {
      console.log(`Сообщение не отправлено ботом в группу. Код ошибки ${error}`)
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
