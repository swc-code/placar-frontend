import { Court } from '@/types'
import { Select, SelectItem, Skeleton } from '@nextui-org/react'

export interface SelectCourtProps {
  data: Court[]
  label: string
  className?: string
  handleSelect: (court: Court) => void
}

export const SelectCourt = ({
  data,
  label,
  className,
  handleSelect,
}: SelectCourtProps) => {
  if (!Array.isArray(data))
    return (
      <Select>
        <SelectItem key={''}>
          <Skeleton></Skeleton>
        </SelectItem>
      </Select>
    )

  return (
    <Select label={label} className={className ?? ''}>
      {data.map((court) => (
        <SelectItem
          key={court.courtId}
          value={court.courtDs}
          onClick={() => handleSelect(court)}
        >
          {court.courtDs}
        </SelectItem>
      ))}
    </Select>
  )
}
