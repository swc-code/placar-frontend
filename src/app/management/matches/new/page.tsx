'use client'

import { Api } from '@/lib/axios'
import { Court, Match } from '@/types'
import { useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { ChangeEvent, useState } from 'react'
import { SelectCourt } from './components/select-court/select-court'
import { Card, CardBody, CardHeader } from '@nextui-org/react'
import { TextInput } from '@/components/input/text-input'
import { Button } from '@/components/button/button'
import { useSnackbar } from 'notistack'
import { useSession } from 'next-auth/react'

export default function NewMatchPage() {
  const { data: session } = useSession()
  const [courts, setCourts] = useState<Court[]>()

  const [data, setData] = useState({
    homeTeamDs: '',
    outsideTeamDs: '',
    courtId: '',
  })

  const { enqueueSnackbar } = useSnackbar()

  const { isLoading, isError } = useQuery({
    queryKey: ['findAllCourtsOnMatchSelect'],
    queryFn: async () => {
      try {
        const { data } = await Api.get<{ data: Court[] }>('/courts', {
          headers: {
            Authorization: 'Bearer ' + session?.user.accessToken,
          },
        })

        setCourts(data.data)

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

  const handleCourtSelection = (court: Court) => {
    setData({ ...data!, courtId: court.courtId })
  }

  const handleEdit = (e: ChangeEvent<HTMLInputElement>, name: string) => {
    setData({ ...data!, [name]: e.target.value })
  }

  const handleSaveData = async () => {
    const body = data
    try {
      const { data } = await Api.post<{ data: Match; message: string }>(
        'matches',
        {
          ...body,
        },
        { headers: { Authorization: 'Bearer ' + session?.user.accessToken } },
      )

      enqueueSnackbar(data.message, {
        variant: 'success',
        autoHideDuration: 1500,
      })
    } catch (error) {
      if (error instanceof AxiosError)
        enqueueSnackbar(error.response!.data.message, {
          variant: 'error',
          autoHideDuration: 2000,
        })
    }
  }

  return (
    <div className="flex items-center justify-center w-full h-full">
      <Card className="min-w-48">
        <CardHeader className="flex w-full justify-center text-lg">
          Iniciar uma partida
        </CardHeader>
        <CardBody className="flex flex-col gap-5">
          <div className="flex gap-5">
            <TextInput
              data={!(isLoading && isError) ? data.homeTeamDs : ''}
              label="Time da casa"
              type="text"
              name="homeTeamDs"
              setData={handleEdit}
            />
            <TextInput
              data={!(isLoading && isError) ? data.outsideTeamDs : ''}
              label="Time de Fora"
              type="text"
              name="outsideTeamDs"
              setData={handleEdit}
            />
          </div>
          <SelectCourt
            data={courts!}
            label="Selecione a Local"
            handleSelect={handleCourtSelection}
            className="w-md"
          />
          <Button description="Salvar" handleClick={handleSaveData} />
        </CardBody>
      </Card>
    </div>
  )
}
