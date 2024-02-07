import { title } from 'process'
import { FC } from 'react'

// css

import './../ui/MyInput.css'

//

import { Row, Col } from 'react-bootstrap'



interface Input {
  title: string
  subtitle?: string
  type: string
  value: string
  onChange: (e: any) => void
  place: string
}



const MyInput: FC<Input> = ({ type, value, onChange, place, title, subtitle }) => {
  return (
    <Row className='d-flex flex-column align-items-center  mb-3' md={12} sm={6} xs={6}>
      <Col md={8} sm={12} xs={12}><div className='input-title'>{title}</div></Col>
      <Col md={8} sm={12} xs={12}><div className='input-subtitle'>{subtitle}</div></Col>
      <Col md={8} sm={12} xs={12}><input className='input-insert-text' type={type} value={value} onChange={onChange} placeholder={place}/></Col>
    </Row>

  )
}

export default MyInput
