'use client'

import { Court } from '@/app/types'
import { Select, SelectItem } from '@nextui-org/react'

export interface SelectDropdownProps {
  data: Court[]
  label: string
  placeholder?: string
}

export const SelectDropdown = ({
  data,
  label,
  placeholder,
}: SelectDropdownProps) => {
  return (
    <Select label={label} items={data} placeholder={placeholder ?? ''}>
      {data.map((item) => (
        <SelectItem key={item.courtId} value={item.courtId}>
          {item.nameDs}
        </SelectItem>
      ))}
    </Select>
  )
}
