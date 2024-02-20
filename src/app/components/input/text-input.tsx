import { ChangeEvent } from 'react'
import { Input } from '@nextui-org/react'

export interface TextInputProps {
  data: string | undefined
  setData: (event: ChangeEvent<HTMLInputElement>, name: string) => void
  name: string
  label: string
  isReadonly?: boolean
  type: 'number' | 'text'
  variant?: 'flat' | 'faded' | 'bordered'
  color?: 'success' | 'warning' | 'primary' | 'secondary' | 'default' | 'danger'
  radius?: 'none' | 'md' | 'sm' | 'lg' | 'full'
  size?: 'lg' | 'md' | 'sm'
}

export const TextInput = ({
  data,
  setData,
  name,
  label,
  isReadonly,
  type,
  variant,
  color,
  radius,
  size,
}: TextInputProps) => {
  return (
    <Input
      type={type}
      value={data}
      onChange={(e: ChangeEvent<HTMLInputElement>) => setData(e, name)}
      size={size ?? 'md'}
      label={label}
      isReadOnly={isReadonly}
      variant={variant ?? 'faded'}
      color={color ?? 'primary'}
      radius={radius ?? 'md'}
    />
  )
}
