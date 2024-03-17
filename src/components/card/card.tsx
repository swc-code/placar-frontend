import { CardHeader, Card as NextUICard } from '@nextui-org/react'
import { ReactNode } from 'react'

export interface CardProps {
  title?: string
  children: ReactNode | ReactNode[]
  className?: string
}

export const Card = ({ children, title, className }: CardProps) => {
  return (
    <NextUICard className={className ?? 'w-[20rem] h-[15rem]'}>
      {title ? (
        <CardHeader className="flex items-center justify-center text-2xl">
          <label>{title}</label>
        </CardHeader>
      ) : (
        <></>
      )}
      {children}
    </NextUICard>
  )
}
