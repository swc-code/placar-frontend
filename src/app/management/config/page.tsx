'use client'

import { Button } from '@/components/button/button'
import { TextInput } from '@/components/input/text-input'
import { Api } from '@/lib/axios'
import { GameCofig } from '@/types'
import { useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useSession } from 'next-auth/react'
import { ChangeEvent, MouseEvent, useState } from 'react'

export default function ConfigPage() {
  const { data: session } = useSession()
  const [data, setData] = useState<GameCofig>()

  const { isLoading, isError } = useQuery({
    queryKey: ['findConfigByHost', session?.user.accessToken],
    retry: true,
    queryFn: async () => {
      try {
        const { data } = await Api.get('/game-configs', {
          headers: {
            Authorization: 'Bearer ' + session?.user.accessToken,
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

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
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
