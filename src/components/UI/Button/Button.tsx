import { cn } from '@bem-react/classname'
import { ButtonHTMLAttributes, DetailedHTMLProps, FC, ReactNode } from 'react'

import { TypeSize } from '../../../core/types'

import './Button.scss'

export type ButtonType = 'button' | 'submit'
export type ButtonColorType = 'gray' | 'blue' | 'light' | 'outline'

const cnButton = cn('Button')

export interface IButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  children: ReactNode
  fluid?: boolean
  type?: ButtonType
  color?: ButtonColorType
  isLoading?: boolean
  iconPosition?: 'left' | 'right'
  icon?: ReactNode
  size?: TypeSize
  onClick?: () => void
  onMouseEnter?: () => void
  onMouseLeave?: () => void
}

export const Button: FC<IButtonProps> = ({
  disabled,
  isLoading,
  type = 'button',
  children,
  color = 'blue',
  fluid,
  className,
  id,
  iconPosition,
  icon,
  size = 'md',
  onClick,
  onMouseEnter,
  onMouseLeave,
}) => {
  return (
    <>
      <button
        id={id}
        className={cnButton(
          {
            gray: color === 'gray',
            blue: color === 'blue',
            outline: color === 'outline',
            light: color === 'light',
            loading: isLoading,
            fluid,
            sm: size === 'sm',
            md: size === 'md',
            lg: size === 'lg',
            xl: size === 'xl',
            xxl: size === 'xxl',
          },
          [className],
        )}
        type={type}
        onClick={() => {
          onClick && onClick()
        }}
        onMouseEnter={() => {
          onMouseEnter && onMouseEnter()
        }}
        onMouseLeave={() => {
          onMouseLeave && onMouseLeave()
        }}
        disabled={disabled || isLoading}
      >
        {icon && iconPosition === 'left' && (
          <span className={cnButton('icon', { left: true })}>{icon}</span>
        )}

        {children}

        {icon && iconPosition === 'right' && (
          <span className={cnButton('icon', { right: true })}>{icon}</span>
        )}
      </button>
    </>
  )
}
