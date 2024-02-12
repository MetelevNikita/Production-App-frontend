import { FC } from 'react'

// css

import './../css/Form.css'

//

import { Row, Col } from 'react-bootstrap'

// components

import MyInput from '../../ui/MyInput'
import MyButton from '../../ui/MyButton'
import MySelect from '../../ui/MySelect'



// server

import { typeProduct } from '../../server/server'
import { typeWork } from '../../server/server'


interface Form {
  cards: any
  createCard: () => any
  clearCard: () => any
}


const Form: FC<Form> = ({cards, createCard, clearCard}) => {

  const {card, setCard} = cards





  return (

      <Col md={12} className='d-flex flex-column '>



        <MyInput place='фио' type='text' title='Заказчик' subtitle='ФИО, название отдела' value={card.name} onChange={(e) => {setCard({...card, name: e.target.value})}}></MyInput>

        <MyInput place='контактный телефон' type='number' title='Контактный телефон' value={card.phone} onChange={(e) => {setCard({...card, phone: e.target.value})}}></MyInput>

        <MyInput place='telegram id' type='text' title='Telegram ID' subtitle='Вам придет копия ТЗ и уведомление об итоге согласования от Эделевой О.Н. ВНИМАНИЕ!!! telegram id можно посмотреть в профиле corp сайта' value={card.tgId} onChange={(e) => {setCard({...card, tgId: e.target.value})}}></MyInput>

        {/* select */}

        <MySelect title='Тип продукта' option={typeProduct} onChange={(e) => setCard({...card, typeProduct: e})} defaultValue={typeProduct[0]}></MySelect>

        {(card.typeProduct.value === 'other') ? <MyInput place='введите текст' type='text' title='другой тип продукта' value={card.otherProduct} onChange={(e) => {setCard({...card, otherProduct: e.target.value})}}></MyInput> : <></>}


        {/*  */}


        <MyInput place='сопутствующие продукты для фильма' type='text' title='Сопутствующие продукты для фильма' subtitle='Какое продвижение планируется? Нужны ли анонсы/новостные сюжеты? (заполняется только при изготовления фильма)' value={card.promotion} onChange={(e) => {setCard({...card, promotion: e.target.value})}}></MyInput>

        {/* select */}


        <MySelect title='Тип работ' option={typeWork} onChange={(e) => setCard({...card, typeWork: e})} defaultValue={typeWork[0]}></MySelect>


        {/*  */}


        <MyInput place='введите текст' type='text' title='Для какой большой цели нужен продукт?' subtitle='Продвижение услуги, презентация акции, обучение сотрудников, освещение важных событий и т.д.' value={card.target} onChange={(e) => {setCard({...card, target: e.target.value})}}></MyInput>

        <MyInput place='введите текст' type='text' title='Кто является конечным зрителем и география его проживания?' subtitle='Внешний клиент или сотрудники компании. Укажите город проживания.' value={card.viewer} onChange={(e) => {setCard({...card, viewer: e.target.value})}}></MyInput>

        <MyInput place='введите текст' type='text' title='Какой эффект должен произвести продукт на зрителя?' subtitle='Побудить зрителя подключить услуги компании; дать понимание зрителю, что он может подключить автоплатеж и это будет для него очень удобно; обучить зрителя (сотрудника) и т.д.' value={card.effect} onChange={(e) => {setCard({...card, effect: e.target.value})}}></MyInput>

        <MyInput place='введите текст' type='text' title='Опишите содержание ролика' subtitle='Здесь вы можете написать краткий сценарий заказа и желаемое оформление, прикрепить референсы и ссылки с материалами.' value={card.description} onChange={(e) => {setCard({...card, description: e.target.value})}}></MyInput>

        <MyInput place='введите текст' type='text' title='Напишите закадровый текст' subtitle='В именах собственных расставьте ударения(Населенные пункты, фамилии)' value={card.voiceover} onChange={(e) => {setCard({...card, voiceover: e.target.value})}}></MyInput>

        <MyInput place='введите текст' type='text' title='Хронометраж продукта' subtitle='Длительность' value={card.timing} onChange={(e) => {setCard({...card, timing: e.target.value})}}></MyInput>

        <MyInput place='введите текст' type='text' title='На каких площадках будет размещаться продукт?' subtitle='Трансляция ролика на UTV или др. телеканале/ в соцсетях/ на радио/ на ТЦ или билбордах/ на выставках или конференциях.' value={card.place} onChange={(e) => {setCard({...card, place: e.target.value})}}></MyInput>

        <MyInput place='введите текст' type='text' title='Технические требования к съемке' subtitle='Планируемая длительность съемки, место, сколько людей будет в кадре.Заполняется при необходимости съемок' value={card.technicalSpecification} onChange={(e) => {setCard({...card, technicalSpecification: e.target.value})}}></MyInput>

        <MyInput place='введите дату' type='date' title='Желаемый срок сдачи заказа' subtitle='От 2 рабочих дней на производство с момента предоставления всех материалов и утверждения заказа' value={card.deadline} onChange={(e) => {setCard({...card, deadline: e.target.value})}}></MyInput>



        <Row className='d-flex justify-content-center'>

          <Col md={8} className='mt-4 mb-2'><div className='form-about-title'>Это техническое задание отправляется на согласование Эделевой О.Н. и на разработку в UTV Production.</div></Col>

          <Col md={8} className='mb-2'><div className='form-about-subtitle'>По вопросам заявки к Бойновой Екатерине +7 (999) 134-43-56</div></Col>

        </Row>

        <Row className='mt-4 d-flex justify-content-center'>
          <Col className='mb-3' md={4} sm={12} xs={12}><MyButton title='Отправить' onClick={() => {createCard()}}></MyButton></Col>
          <Col className='mb-3' md={4} sm={12} xs={12}><MyButton title='Очистить форму' onClick={() => {clearCard()}}></MyButton></Col>

        </Row>


      </Col>


  )
}

export default Form
