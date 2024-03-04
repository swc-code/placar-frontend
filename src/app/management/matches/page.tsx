'use client'

import { Api } from '@/lib/axios'
import { Court, Match } from '@/types'
import { useQuery } from '@tanstack/react-query'
import { MouseEvent, useState } from 'react'
import { MatchesTable } from './components/matches-table/matches-table'
import { Button } from '@/components/button/button'
import { useRouter, usePathname } from 'next/navigation'
import { useSession } from 'next-auth/react'

export default function MatchesPage() {
  const { data: session } = useSession()
  const router = useRouter()
  const pathName = usePathname()

  const [data, setData] = useState<{ match: Match; court: Court }[]>()

  const { isLoading } = useQuery({
    queryKey: ['findAllMatches'],
    queryFn: async () => {
      try {
        const { data } = await Api.get<{
          data: { match: Match; court: Court }[]
        }>('/matches', {
          headers: {
            Authorization: `Bearer ${session?.user.accessToken}`,
          },
        })
        setData(data.data)

        return data.data
      } catch (error) {}
    },
  })

  const handleSelect = (match: Match) => {
    console.log(match)
  }

  const handleNewMatch = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    router.push(pathName + '/new')
  }

  return (
    <div className="flex flex-col pt-10 gap-5">
      <div className="flex w-full justify-end">
        <Button
          description="Iniciar nova partida"
          className="right-0"
          handleClick={handleNewMatch}
        />
      </div>
      <MatchesTable
        data={data!}
        onSelect={handleSelect}
        isLoading={isLoading}
      />
    </div>
  )
}
