'use client'

import { Button } from '@/components/button/button'
import { TextInput } from '@/components/input/text-input'
import { Api } from '@/lib/axios'
import { Court } from '@/types'
import { Card, CardBody, CardFooter } from '@nextui-org/react'
import { useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useSnackbar } from 'notistack'
import { ChangeEvent, useState } from 'react'

export interface CourtPageProps {
  params: {
    id: string
  }
}

export default function CourtPage({ params: { id } }: CourtPageProps) {
  const { data: session } = useSession()

  const { enqueueSnackbar } = useSnackbar()

  const newCourt = id === 'new'

  const [data, setData] = useState<Court>()

  const router = useRouter()

  useQuery({
    queryKey: ['findCourtById'],
    enabled: !newCourt,
    queryFn: async () => {
      try {
        const { data } = await Api.get<{ data: Court }>(`/courts/${id}`, {
          headers: { Authorization: `Bearer ${session?.user.accessToken}` },
        })

        setData(data.data)
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

  const handleEdit = (e: ChangeEvent<HTMLInputElement>, name: string) => {
    setData({ ...data!, [name]: e.target.value })
  }

  const handleSave = async () => {
    const court = data
    if (newCourt) {
      try {
        const { data } = await Api.post<{ data: Court; message: string }>(
          '/courts',
          {
            ...court,
            clientId: 'f9a89fc0-f0a2-4d66-995d-9bbc4ce680b4',
          },
          {
            headers: {
              Authorization: 'Bearer ' + session?.user.accessToken,
            },
          },
        )

        router.push(`/courts/${data.data.courtId}`)
      } catch (error) {
        if (error instanceof AxiosError)
          console.log(error.response!.data.message)
      }
    } else {
      try {
        const { data } = await Api.patch<{ data: Court; message: string }>(
          `/courts/${court?.courtId}`,
          {
            ...court,
          },
          { headers: { Authorization: 'Bearer ' + session?.user.accessToken } },
        )

        setData({ ...data.data })
      } catch (error) {
        if (error instanceof AxiosError)
          console.log(error.response!.data.message)
      }
    }
  }

  return (
    <main className="flex w-full h-full items-center justify-center">
      <Card className="min-w-[400px]">
        <CardBody>
          <div className="flex flex-col items-center justify-center gap-5">
            <TextInput
              data={data?.courtId}
              label="Código"
              name="courtId"
              setData={handleEdit}
              isReadonly={true}
              type="text"
            />

            <TextInput
              data={data?.courtDs}
              label="Descrição"
              name="nameDs"
              setData={handleEdit}
              type="text"
            />
          </div>
        </CardBody>
        <CardFooter>
          <Button
            description="Salvar"
            handleClick={handleSave}
            className="w-full"
          />
        </CardFooter>
      </Card>
    </main>
  )
}
