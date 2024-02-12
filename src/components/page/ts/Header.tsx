import { FC } from 'react'

// img


import U from './../../../asset/logo/U.svg'
import T from './../../../asset/logo/T.svg'
import V from './../../../asset/logo/V.svg'
import PROD from './../../../asset/logo/prod.svg'
import QR from './../../../asset/qr-code.svg'

// css

import './../css/Header.css'

//

import { Col, Row } from 'react-bootstrap'

const Header = () => {
  return (

    <Row md={8} className='d-flex flex-column justify-content-center align-items-center mt-4 mb-4'>


            <Col md={8} className='d-flex justify-content-center align-items-center'>
              <img className='u-img' src={U} alt="U" />
              <img className='t-img' src={T} alt="T" />
              <img className='v-img' src={V} alt="V" />
            </Col>

            <Col md={8} className='d-flex justify-content-center align-items-center mt-3 mb-4'><img className='prod-img' src={PROD} alt="production" /></Col>

            <Col className='mt-2' md={6}><div className='header-title'>Перед началом заполнения технического задания согласуйте проект с Эделевой О.Н</div></Col>


            <Row md={5} sm={5} xs={5} className='d-flex justify-content-center align-items-center mt-4'>

                  <Col md={2} sm={8} xs={8} className='d-flex justify-content-center align-items-center mb-4'><img className='qr-code' src={QR} alt="qr-code" /></Col>

                  <Col md={3} sm={8} xs={8} className='d-flex text-lg-left text-md-left justify-content-center align-items-center mb-4'><div className='header-subtitle-bot text-center text-xs-left'>Важно подписаться на бота  <a style={{color: '#00B0E1'}} href="https://t.me/utv_work_bot" target='_blank'>@utv_work_bot</a> для получения уведомлений о статусе вашей заявки</div></Col>




            </Row>










    </Row>


  )
}

export default Header
