import { title } from 'process'
import { FC } from 'react'

// css

import './../ui/MyInput.css'

//

import { Row, Col } from 'react-bootstrap'



interface Input {
  title: string
  subtitle?: string
  link?: string
  linkTitle?: string
  annotation?: string
  type: string
  value: string
  onChange: (e: any) => void
  place: string
}



const MyInput: FC<Input> = ({ type, value, onChange, place, title, subtitle, link, linkTitle, annotation})  =>  {
  return (
    <Row className='d-flex flex-column align-items-center  mb-3' md={12} sm={6} xs={6}>
      <Col md={8} sm={12} xs={12}><div className='input-title'>{title}</div></Col>
      <Col md={8} sm={12} xs={12}><div className='input-subtitle'>{subtitle} <a target='blank' href={link}>{linkTitle}</a></div></Col>
      <Col md={8} sm={12} xs={12}><input className='input-insert-text' type={type} value={value} onChange={onChange} placeholder={place}/></Col>
      <Col md={8} sm={12} xs={12} className='mt-1'><div className='input-subtitle'>{annotation}</div></Col>
    </Row>

  )
}

export default MyInput
