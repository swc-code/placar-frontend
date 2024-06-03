'use client'

import { Button } from '@/components/button/button'
import { Table } from '@/components/table/table'
import { Api } from '@/lib/axios'
import { Court } from '@/types'
import {
  Skeleton,
  TableBody,
  TableCell,
  TableRow,
  Tooltip,
} from '@nextui-org/react'
import { useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { FilePenLine, Monitor } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useRouter, usePathname } from 'next/navigation'
import { useSnackbar } from 'notistack'
import { useState } from 'react'

export default function CourtsPage() {
  const { data: session } = useSession()

  const { enqueueSnackbar } = useSnackbar()

  const pathName = usePathname()
  const router = useRouter()

  const [courtData, setCourtData] = useState<Court[]>([])

  const { isLoading } = useQuery({
    queryKey: ['fetchCourtsFromClientId', session?.user.accessToken],
    queryFn: async () => {
      try {
        const { data } = await Api.get<{ data: Court[] }>('/courts', {
          headers: { Authorization: 'Bearer ' + session?.user.accessToken },
        })

        setCourtData(data.data)

        return data.data
      } catch (error) {
        if (error instanceof AxiosError)
          enqueueSnackbar(error.response!.data.message, {
            variant: 'error',
            autoHideDuration: 2000,
          })
      }
    },
  })

  const headerData = {
    data: [
      {
        key: 'COURTID',
        label: 'Código',
      },
      {
        key: 'COURTDS',
        label: 'Descrição',
      },
      {
        key: 'ACTIONS',
        label: 'Ações',
      },
    ],
  }

  const renderCell = (item: Court) => {
    const route = `${pathName}/${item.courtId}`
    return (
      <TableRow>
        <TableCell>{item.courtId}</TableCell>
        <TableCell>{item.courtDs}</TableCell>
        <TableCell className="flex gap-5">
          <Tooltip content="Editar">
            <button onClick={() => router.push(route)}>
              <FilePenLine size={20} />
            </button>
          </Tooltip>

          <Tooltip content="Visualizar Placar">
            <button
              onClick={() => router.replace('/scoreboard/' + item.courtId)}
            >
              <Monitor size={20} />
            </button>
          </Tooltip>
        </TableCell>
      </TableRow>
    )
  }

  const renderBody = () => {
    return <TableBody>{courtData.map((cell) => renderCell(cell))}</TableBody>
  }

  const renderSkeleton = () => {
    return (
      <TableBody>
        <TableRow>
          <TableCell>
            <Skeleton />
          </TableCell>
          <TableCell>
            <Skeleton />
          </TableCell>
          <TableCell>
            <Skeleton />
          </TableCell>
        </TableRow>
      </TableBody>
    )
  }

  return (
    <main className="w-full flex flex-col gap-5 pt-10">
      <div className="w-full flex justify-end">
        <Button
          description="Adicionar"
          handleClick={() => router.push(pathName + '/new')}
        />
      </div>
      <Table
        isEmpty={false}
        isLoading={isLoading}
        renderBody={renderBody}
        headerItems={headerData}
        renderSkeleton={renderSkeleton}
      />
    </main>
  )
}
