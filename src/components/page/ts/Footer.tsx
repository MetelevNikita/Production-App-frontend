import { FC } from 'react'

// css

import './../css/Footer.css'

//

import { Row, Col } from 'react-bootstrap'

// img

import socOne from './../../../asset/social/soc-one.svg'
import socTwo from './../../../asset/social/soc-two.svg'
import socThree from './../../../asset/social/soc-three.svg'

//

const Footer = () => {
  return (

    <Row className='d-flex flex-column align-items-center justify-content-start mt-4'>
      <Col md={5} className='d-flex justify-content-between'>

          <a className='soc-img' href="https://www.youtube.com/@utvrussia"><img src={socOne} alt="youtube" /></a>
          <a className='soc-img' href="https://t.me/utvufa"><img src={socTwo} alt="telegram" /></a>
          <a className='soc-img' href="https://vk.com/login?u=2&to=L3V0dnJ1c3NpYQ--"><img src={socThree} alt="vk" /></a>

      </Col>

      <Col md={5} style={{textAlign: 'center', marginTop: '10px', color: 'white', fontSize: '12px'}}>V 3.1</Col>


      <Col className='mt-3'><div className='footer-title'>Производство РА "Центр творчества" &#169; Все права защищины</div></Col>
      <Col className='mt-2 mb-4'><div className='footer-subtitle'>Техническая поддержака: 8-989-951-9063</div></Col>

    </Row>

  )
}

export default Footer
