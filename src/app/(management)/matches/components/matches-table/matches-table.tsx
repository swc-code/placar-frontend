'use client'

import { toDateTime } from '@/helpers/formaters'
import { Court, Match } from '@/types'
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@nextui-org/react'

export type MatchWithRelations = {
  match: Match
  court: Court
}

export interface MatchesTableProps {
  data?: MatchWithRelations[]
  onSelect: (match: Match) => void
  isLoading: boolean
}

export const MatchesTable = ({
  data,
  onSelect,
  isLoading,
}: MatchesTableProps) => {
  const renderBody = () => {
    return (
      <TableBody
        items={data ?? []}
        isLoading={isLoading}
        loadingContent={'teste'}
        emptyContent={'teste'}
      >
        {data!.map((item) => (
          <TableRow
            key={item.match.matchId}
            onClick={() => onSelect(item.match)}
          >
            <TableCell>{item.match.homeTeamDs}</TableCell>
            <TableCell>{item.match.outsideTeamDs}</TableCell>
            <TableCell>{item.match.sets.length}</TableCell>
            <TableCell>{toDateTime(item.match.startedAt)}</TableCell>
            <TableCell>
              {item.match.finishedAt ? toDateTime(item.match.finishedAt) : ''}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    )
  }

  const skeletonBody = () => {
    return (
      <TableBody>
        <TableRow>
          <TableCell>{''}</TableCell>
          <TableCell>{''}</TableCell>
          <TableCell>{''}</TableCell>
          <TableCell>{''}</TableCell>
          <TableCell>{''}</TableCell>
        </TableRow>
      </TableBody>
    )
  }

  return (
    <Table color="primary" selectionMode="single" isHeaderSticky>
      <TableHeader>
        <TableColumn>Time da Casa</TableColumn>
        <TableColumn>Time de Fora</TableColumn>
        <TableColumn>Quantidade de Sets</TableColumn>
        <TableColumn>Início da Partida</TableColumn>
        <TableColumn>Final da Partida</TableColumn>
      </TableHeader>
      {Array.isArray(data) ? renderBody() : skeletonBody()}
    </Table>
  )
}
