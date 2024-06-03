'use client'

import { Card } from '@/components/card/card'
import { Api } from '@/lib/axios'
import { HomeInfo } from '@/types'
import { CardBody } from '@nextui-org/react'
import { useQuery } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { useState } from 'react'

export default function Home() {
  const { data: session } = useSession()

  const [data, setData] = useState<HomeInfo>()

  useQuery({
    queryKey: ['fetchHomeInfo', session?.user.accessToken],
    queryFn: async () => {
      try {
        const { data } = await Api.get<{ data: HomeInfo }>('/info', {
          headers: { Authorization: 'Bearer ' + session?.user.accessToken },
        })

        setData(data.data)
        return data.data
      } catch (error) {}
    },
  })

  return (
    <main className="w-full h-full flex items-center justify-center">
      <Card
        title="Como estão indo suas partidas"
        className="w-[40rem] h-[12.5rem]"
      >
        <CardBody className="w-full grid grid-cols-2 pt-5">
          <div className="flex flex-col gap-1 items-center justify-start">
            Partidas em andamento:
            <span className="text-2xl">{data?.ongoingGamesNum}</span>
          </div>

          <div className="flex flex-col gap-1 items-center justify-start">
            Partidas pelo período:
            <span className="text-2xl">{data?.gamesDuringTime}</span>
          </div>
        </CardBody>
      </Card>
    </main>
  )
}
