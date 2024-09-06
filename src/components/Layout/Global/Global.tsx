import { cn } from '@bem-react/classname'
import { FC } from 'react'
import { Outlet } from 'react-router-dom'

import { Header } from '../Header'

import './Global.scss'

const cnGlobal = cn('Global')

export const Global: FC = () => {
  return (
    <div className={cnGlobal()}>
      <Header className={cnGlobal('header')} />
      <Outlet />
    </div>
  )
}
