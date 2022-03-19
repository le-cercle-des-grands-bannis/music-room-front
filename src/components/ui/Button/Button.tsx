import { MouseEvent, ReactNode } from 'react'

export type ButtonProps = {
  children: ReactNode
  className?: string
  disabled?: boolean
  onClick?: (event: MouseEvent<HTMLButtonElement, MouseEvent>) => void
  type?: 'button' | 'submit' | 'reset'
}

const Button = () => <button className="button button--primary">Click me!</button>

export default Button
