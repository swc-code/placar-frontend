'use client'

import { Api } from '@/app/lib/axios'
import { Match } from '@/app/types'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

export default function MatchesPage({
  params: { host },
}: {
  params: { host: string }
}) {
  const [data, setData] = useState<Match[]>()

  const { isLoading, isError } = useQuery({
    queryKey: ['findAllMatchesByClient'],
    queryFn: async () => {
      try {
        const { data } = await Api.get('/matches', {
          headers: {
            hostDs: host,
          },
        })
        setData(data.data)

        return data.data
      } catch (error) {}
    },
  })

  return <>{JSON.stringify(data)}</>
}
