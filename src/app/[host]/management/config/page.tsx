'use client'

import { Button } from '@/app/components/button/button'
import { TextInput } from '@/app/components/input/text-input'
import { Api } from '@/app/lib/axios'
import { Court, GameCofig } from '@/app/types'
import { useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { ChangeEvent, useState } from 'react'

export interface ConfigPageProps {
  params: { host: string }
}

export default function ConfigPage({ params: { host } }: ConfigPageProps) {
  const [data, setData] = useState<GameCofig>()

  const { isLoading, isError } = useQuery({
    queryKey: ['findConfigByHost'],
    retry: false,
    queryFn: async () => {
      try {
        const { data } = await Api.get('/game-configs', {
          headers: {
            hostDs: host,
          },
        })

        setData(data.data)

        return data.data
      } catch (error) {
        if (error instanceof AxiosError) setData(error.response!.data.message)
      }
    },
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement>, name: string) => {
    e.preventDefault()

    setData({ ...data!, [name]: parseInt(e.target.value) })
  }

  const handleClick = (e) => {
    e.preventDefault()
  }

  if (isLoading) return <>Loading...</>
  if (isError) return <>Error</>

  return (
    <div className="flex flex-col gap-5 items-center justify-center">
      <div className="grid grid-cols-2 gap-10">
        <TextInput
          data={data?.maxScPerSet.toString()}
          setData={handleChange}
          name="maxScPerSet"
          label="Número de Pontos por Set"
          type="number"
        />
        <TextInput
          data={data?.maxSetNum.toString()}
          setData={handleChange}
          name="maxSetNum"
          label="Número de sets por partida"
          type="number"
        />
        <TextInput
          data={data?.scValue.toString()}
          label="Pontos a contabilizar"
          name="scValue"
          setData={handleChange}
          type="number"
        />
      </div>

      <Button description="Salvar" handleClick={handleClick} />
    </div>
  )
}
