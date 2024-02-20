'use client'

import {
  Card as NextUICard,
  CardBody,
  CardHeader,
  CardFooter,
} from '@nextui-org/react'
import { Button } from '../button/button'
import { useRouter } from 'next/navigation'

export interface CardProps {
  title: string
  description?: string
  redirectUrl: string
}

export const Card = ({ title, redirectUrl, description }: CardProps) => {
  const router = useRouter()

  const handleRedirect = (e) => {
    e.preventDefault()

    router.push(redirectUrl)
  }

  return (
    <NextUICard>
      <CardHeader>{title}</CardHeader>
      <CardBody>{description ?? ''}</CardBody>
      <CardFooter>
        <Button
          description="Editar"
          color="primary"
          handleClick={handleRedirect}
        />
      </CardFooter>
    </NextUICard>
  )
}
