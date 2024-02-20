'use client'

import { Api } from '@/app/lib/axios'
import { Court } from '@/app/types'
import { useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { Card } from '@/app/components/card/card'

export interface CourtsPageProps {
  params: {
    host: string
  }
}

export default function CourtsPage({ params: { host } }: CourtsPageProps) {
  const { isLoading, isError, data } = useQuery({
    queryKey: ['findCourtByHost'],
    queryFn: async () => {
      try {
        const { data } = await Api.get<{ data: Court[] }>(`/${host}/courts`)

        return data.data
      } catch (error) {
        if (error instanceof AxiosError)
          console.log(error.response?.data.message)
      }
    },
  })

  if (isLoading) return <>Loading</>
  if (isError) return <>Error</>

  return (
    <div className="grid grid-cols-4 gap-10">
      {data?.map((court) => (
        <Card
          redirectUrl={`/${host}/management/courts/${court.courtId}`}
          title={court.nameDs}
          key={court.courtId}
        />
      ))}
    </div>
  )
}
