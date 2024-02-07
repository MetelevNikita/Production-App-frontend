import { FC } from 'react'

// css

import './MyButton.css'


interface Button {
  title: string
  onClick: () => void
}

const MyButton : FC<Button> = ({ title, onClick }) => {
  return (
    <button className='mybtn' onClick={onClick}>{title}</button>
  )
}

export default MyButton
