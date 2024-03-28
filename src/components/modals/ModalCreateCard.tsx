import { FC } from 'react'

// css

import './ModalCreateCard.css'

//

import { Row, Col } from 'react-bootstrap'

// img


import modalOk from './../../asset/modals/modal-icon-ok.svg'
import modalPhone from './../../asset/modals/modal-icon-phone.svg'
import modalTG from './../../asset/modals/modal-icon-tg.svg'
import modalClose from './../../asset/modals/modal-icon-close.svg'

// components

import MyButtonModal from '../ui/MyButtonModal'

//


interface Modal {
  modal: any
}





const ModalCreateCard: FC<Modal> = ({ modal }) => {

  const {modalCreate, setModalCreate} = modal


  const sendMessageToTg = (id : string) => {

    return document.location.href = `https://t.me/${id}`
  }


  const closeModalCard = () => {
    setModalCreate(false)
    window.location.reload()
  }



  return (

    <Row md={12} className='modal-page d-flex justify-content-center'>
      <Col className='modal-page-container d-flex flex-column justify-content-center align-items-center'>


              <button className='modal-close-icon' onClick={() => {closeModalCard()}}><img src={modalClose} alt="modal-close" /></button>


              <Col className='mt-3'><img className='modal-icon-top' src={modalOk} alt="modal-icon-ok" /></Col>

              <Col><div className='modal-title'>Ваша заявка успешно отправлена</div></Col>
              <Col><div className='modal-subtitle'>Вам необходимо написать специалисту для подтверждения заявки</div></Col>

              <Row className='d-flex flex-column'>
                <Col className='mb-2'><MyButtonModal title='Елизавета' img={modalTG} imgAlt='modal-phone' onClick={() => {sendMessageToTg('elizabethspoon')}}></MyButtonModal></Col>
                <Col className='mb-4'><MyButtonModal title='Екатерина' img={modalTG} imgAlt='modal-phone' onClick={() => {sendMessageToTg('katerinaboynova')}}></MyButtonModal></Col>
              </Row>



      </Col>
    </Row>


  )
}

export default ModalCreateCard
