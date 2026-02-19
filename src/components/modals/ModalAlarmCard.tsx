import { FC } from 'react'

// css

import './ModalAlarmCard.css'

//

import { Col } from 'react-bootstrap'

// img


import modalAlertImg from './../../asset/modals/modal-icon-alert.svg'

// components

import MyButtonModal from '../ui/MyButtonModal'

//


interface ModalAlarm {

  alert: any

}

const ModalAlarmCard: FC<ModalAlarm> = ({ alert }) => {

  const {setModalAlert} = alert

  return (


      <Col md={3} className='modal-alert-page-container d-flex flex-column justify-content-center align-items-center'>

              <Col className='d-flex flex-column align-items-center mt-3'>

                <div className="modal-alert-box">

                    <img className='modal-alert-icon-top' src={modalAlertImg} alt="modal-icon-ok" />

                    <div className='modal-alert-title'>Заполните <br/> все поля</div>

                    <MyButtonModal title='Продолжить' img='' imgAlt='' onClick={() => {setModalAlert(false)}}></MyButtonModal>

                </div>


                </Col>



      </Col>


  )
}

export default ModalAlarmCard