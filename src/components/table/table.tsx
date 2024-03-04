'use client'

import {
  Table as NextUITable,
  TableColumn,
  TableHeader,
} from '@nextui-org/react'

export type TableHeaderProps = {
  data: {
    label: string
    key: string
  }[]
}

export interface TableProps {
  isLoading: boolean
  isEmpty: boolean
  renderSkeleton: () => JSX.Element
  renderBody: () => JSX.Element
  headerItems: TableHeaderProps
}

export const Table = ({
  renderSkeleton,
  renderBody,
  headerItems,
  isLoading,
}: TableProps) => {
  return (
    <NextUITable color="primary" selectionMode="single" isHeaderSticky>
      <TableHeader>
        {headerItems.data.map((column) => (
          <TableColumn key={column.key}>{column.label}</TableColumn>
        ))}
      </TableHeader>
      {!isLoading ? renderBody() : renderSkeleton()}
    </NextUITable>
  )
}
