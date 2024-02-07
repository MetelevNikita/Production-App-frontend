import { FC } from 'react'

// css

import './MySelect.css'

//

import { Row, Col } from 'react-bootstrap'
import Select from 'react-select'


//


interface SelectInput {
  title: string
  subtitle?: string
  onChange: (e: any) => any
  option: any
  defaultValue: {}
}

const MySelect: FC<SelectInput> = ({ title, subtitle, onChange, option, defaultValue }) => {
  return (

    <Row className='d-flex flex-column align-items-center mb-3'>
      <Col md={8} sm={12} xs={12}><div className='select-title'>{title}</div></Col>
      <Col md={8} sm={12} xs={12}><div className='select-subtitle'>{subtitle}</div></Col>
      <Col md={8} sm={12} xs={12}><Select styles={{control: (baseStyles, state) => ({...baseStyles, height: 45 + 'px', fontSize: 14 + 'px'})}} options={option} onChange={onChange} defaultValue={defaultValue}></Select></Col>
    </Row>


  )
}

export default MySelect
