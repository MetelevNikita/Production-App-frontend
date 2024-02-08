import { FC } from 'react'

// css

import './../ui/MyButtonModal.css'

//

import { Row, Col } from 'react-bootstrap'

//


interface ModalButton {

  title: string
  img: string
  imgAlt: string
  onClick: () => any

}

const MyButtonModal:FC<ModalButton> = ({ onClick, title, img, imgAlt }) => {
  return (

    <Row className='modal-btn-container d-flex align-items-center justify-content-center' onClick={onClick}>
      <Col md={6} className='d-flex justify-content-start'>
        <img className='modal-btn-img' src={img} alt={imgAlt} />
        <div className='modal-btn-text'>{title}</div>
        </Col>
    </Row>
  )
}

export default MyButtonModal
