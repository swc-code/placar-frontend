'use client'

import { Button } from '@/app/components/button/button'
import { TextInput } from '@/app/components/input/text-input'
import { Api } from '@/app/lib/axios'
import { Court } from '@/app/types'
import { Card, CardBody, CardFooter } from '@nextui-org/react'
import { useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useRouter } from 'next/navigation'
import { ChangeEvent, useState } from 'react'

export interface CourtPageProps {
  params: {
    id: string
    host: string
  }
}

export default function CourtPage({ params: { id, host } }: CourtPageProps) {
  const newCourt = id === 'new'

  const [data, setData] = useState<Court>()

  const router = useRouter()

  const { isLoading, isError } = useQuery({
    queryKey: ['findCourtById'],
    enabled: !newCourt,
    queryFn: async () => {
      try {
        const { data } = await Api.get<{ data: Court }>(`/courts/${id}`)

        setData(data.data)
        return data.data
      } catch (error) {
        if (error instanceof AxiosError) setData(error.response!.data.message)
      }
    },
  })

  if (isError) return <>Error</>
  if (isLoading) return <>Loading...</>

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
        )

        console.log(data.message)

        router.push(`/${host}/courts/${data.data.courtId}`)
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
            clientId: 'f9a89fc0-f0a2-4d66-995d-9bbc4ce680b4',
          },
        )

        setData({ ...data.data })
      } catch (error) {
        if (error instanceof AxiosError)
          console.log(error.response!.data.message)
      }
    }
  }

  return (
    <main className="flex w-full h-screen items-center justify-center gap-10">
      <Card>
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
              data={data?.nameDs}
              label="Descrição"
              name="nameDs"
              setData={handleEdit}
              type="text"
            />
            <TextInput
              data={data?.urlDs}
              label="Url de Acesso"
              name="urlDs"
              setData={handleEdit}
              isReadonly
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
