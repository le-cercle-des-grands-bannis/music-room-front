import clsx from 'clsx'
import { MouseEvent, MouseEventHandler, ReactNode, useCallback } from 'react'

export type ButtonProps = {
  children: ReactNode
  className?: string
  disabled?: boolean
  onClick: MouseEventHandler<HTMLButtonElement> | undefined
  variant?: 'text' | 'contained' | 'outlined'
  color?: 'primary' | 'secondary'
}

const Button = ({ variant, children, className, color, onClick }: ButtonProps) => {
  const classVariantName = useCallback(() => {
    if (variant === 'text') {
      return 'button--text'
    } else if (variant === 'outlined') {
      return 'button--outlined'
    }
    return 'button--contained'
  }, [variant])

  const classColorName = useCallback(() => {
    if (color === 'secondary') {
      return 'button--secondary'
    }
    return 'button--primary'
  }, [color])

  return (
    <button
      className={clsx('button', className, classVariantName(), classColorName())}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default Button
