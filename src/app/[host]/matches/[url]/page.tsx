'use client'

import Image from 'next/image'
import { useState } from 'react'
import { Scoreboard } from '@/app/components/scoreboard/scoreboard'
import { Stopwatch } from '@/app/components/stopwatch/stopwatch'
import {
  calculateTimeDiff,
  getCurrentTime,
  getCurrentTimeString,
  updateTime,
} from './stopwatch/stopwatch'
import { Api } from '@/app/lib/axios'
import { AxiosError } from 'axios'
import { ActiveMatchByUrl, Set } from '@/app/types'
import { useQuery } from '@tanstack/react-query'

export interface GamePageProps {
  params: {
    host: string
    url: string
  }
}

export default function GamePage({ params: { host, url } }: GamePageProps) {
  const [data, setData] = useState<ActiveMatchByUrl>()
  const [ongoinSet, setOngoinSet] = useState<Set>()

  useQuery({
    queryKey: ['findActiveMatchByUrl'],
    retry: false,
    queryFn: async () => {
      try {
        const { data } = await Api.get<{ data: ActiveMatchByUrl }>(
          `/matches/${host}`,
          {
            params: {
              url,
            },
          },
        )

        setData(data.data)
        setOngoinSet(data.data.match.sets.find((set) => !set.finishedAt))
      } catch (err) {
        if (err instanceof AxiosError) setData(err.response!.data.message)
      }
    },
  })

  const [currentTime, setCurrentTime] = useState(getCurrentTimeString())

  const [diffInSeconds, setDiffInSeconds] = useState(
    calculateTimeDiff(data?.match.startedAt, getCurrentTime()).seconds(),
  )
  const [diffInMinutes, setDiffInMinutes] = useState(
    calculateTimeDiff(data?.match.startedAt, getCurrentTime()).minutes(),
  )

  const updateStopwatch = () => {
    updateTime({
      matchStartDt: data?.match.startedAt,
      setCurrentTime,
      setDiffInMinutes,
      setDiffInSeconds,
    })
  }

  setInterval(updateStopwatch, 1000)

  return (
    <main className="h-screen flex flex-col font-bold text-7xl w-full">
      <h1 className="bg-green-700 flex items-center justify-center py-20">
        {data && data.client ? data?.client.nameDs : ''}
      </h1>

      <div className="flex items-center justify-center h-full w-full">
        <div className="w-full h-full grid grid-cols-3">
          <Scoreboard
            team={{
              name: data?.match.homeTeamDs ?? 'Time A',
              numberOfSets:
                data && data.match.sets
                  ? data.match.sets.filter(
                      (set) => set.winnerTp === 'HOME_TEAM',
                    ).length
                  : 0,
              score: ongoinSet?.homeTeamSc ?? 0,
            }}
          />
          <Stopwatch
            currentTime={currentTime}
            diffInMinutes={data ? diffInMinutes : 0}
            diffInSeconds={data ? diffInSeconds : 0}
          />
          <Scoreboard
            team={{
              name: data?.match.outsideTeamDs ?? 'Time B',
              numberOfSets: 0,
              score: ongoinSet?.outsideTeamSc ?? 0,
            }}
          />
          <div className="flex items-center justify-center relative my-5">
            <Image
              alt="imagem propaganda"
              src="https://linktr.ee/og/image/gymflixbirigui.jpg"
              style={{
                objectFit: 'cover',
              }}
              fill
            />
          </div>
        </div>
      </div>
    </main>
  )
}
