import { FC } from 'react'

// css

import './../css/Form.css'

//

import { Row, Col } from 'react-bootstrap'

// components

import MyInput from '../../ui/MyInput'


interface Form {
  card: any
}


const Form: FC<Form> = ({cards}) => {

  const {card, setCard} = cards

  return (
    <Row>
      <Col>

        <MyInput></MyInput>

      </Col>
    </Row>

  )
}

export default Form
