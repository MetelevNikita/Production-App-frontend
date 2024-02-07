import { FC } from 'react'

// img


import U from './../../../asset/logo/U.svg'
import T from './../../../asset/logo/T.svg'
import V from './../../../asset/logo/V.svg'
import PROD from './../../../asset/logo/prod.svg'

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

            <Col className='mt-2' md={8}><div className='header-title'>Перед началом заполнения тех. задания согласуйте продукт и его цель с Эделевой О.Н.. ТЗ заполняется чётко, полно и согласно запросу.Для изготовления продукта в короткие сроки - свяжитесь с нами для согласования. </div></Col>

            <Col md={8} className='mt-2'><div className='header-subtitle'>После заполнения ТЗ обязательно свяжитесь с нами: <br/> 8-927-953-05-89 Елизавета <br/>8-999-134-43-56 Екатерина</div></Col>





    </Row>


  )
}

export default Header
