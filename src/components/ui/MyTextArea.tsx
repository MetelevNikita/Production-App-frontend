import { FC } from 'react'

// css

import './MyTextArea.css'

//

import { Col, Row } from 'react-bootstrap'

//


interface MyTextAreaProps {
  title: string
  subtitle?: string
  value: string
  onChange: (e: any) => void
  place: string
  rows: number
  cols: number

}

const MyTextArea: FC<MyTextAreaProps> = ({ title, subtitle, value, onChange, place, rows, cols }) => {
  return (
    <Row className='d-flex flex-column align-items-center  mb-3' md={12} sm={6} xs={6}>
      <Col md={8} sm={12} xs={12}><div className='input-title'>{title}</div></Col>
      <Col md={8} sm={12} xs={12}><div className='input-subtitle'>{subtitle}</div></Col>
      <Col md={8} sm={12} xs={12}><textarea rows={rows} cols={cols} placeholder={place} className='input-text-area' value={value} onChange={onChange}></textarea></Col>
    </Row>
  )
}

export default MyTextArea
