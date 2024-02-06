import { FC } from 'react'


interface Button {
  title: string
  onClick: () => void
}

const MyButton : FC<Button> = ({ title, onClick }) => {
  return (
    <button onClick={onClick}>{title}</button>
  )
}

export default MyButton
