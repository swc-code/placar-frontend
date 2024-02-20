import { Button as NextUiButton } from '@nextui-org/react'

export interface ButtonProps {
  handleClick: (e: MouseEvent) => void
  description: string
  color?: 'success' | 'warning' | 'primary' | 'secondary' | 'default'
  variant?:
    | 'solid'
    | 'bordered'
    | 'light'
    | 'flat'
    | 'faded'
    | 'shadow'
    | 'ghost'
  className?: string
}

export const Button = ({
  handleClick,
  description,
  color,
  variant,
  className,
}: ButtonProps) => {
  return (
    <NextUiButton
      color={color ?? 'success'}
      radius="md"
      onClick={(e) => handleClick(e)}
      variant={variant ?? 'ghost'}
      className={className ?? ''}
    >
      {description}
    </NextUiButton>
  )
}
