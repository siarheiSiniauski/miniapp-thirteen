import { cn } from '@bem-react/classname'
import { TonConnectButton, useTonWallet } from '@tonconnect/ui-react'
import { FC } from 'react'

import './Header.scss'

const cnHeader = cn('Header')

interface IHeaderProps {
  className?: string
}

export const Header: FC<IHeaderProps> = ({ className }) => {
  const wallet = useTonWallet()

  console.log('wallet', wallet)

  return (
    <header className={cnHeader(null, [className])}>
      <div>Logo</div>
      <TonConnectButton />
    </header>
  )
}
