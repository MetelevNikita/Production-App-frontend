import { title } from 'process'
import { FC } from 'react'

//

import { Row, Col } from 'react-bootstrap'



interface Input {
  title: string
  subtitle: string
  type: string
  value: string
  onChange: (e: any) => void
  place: string
}



const MyInput: FC<Input> = ({ type, value, onChange, place, title, subtitle }) => {
  return (
    <Row className='d-flex' md={12} sm={6} xs={6}>
      <Col><div>{title}</div></Col>
      <Col><div>{subtitle}</div></Col>
      <Col><input type={type} value={value} onChange={onChange} placeholder={place}/></Col>
    </Row>

  )
}

export default MyInput
