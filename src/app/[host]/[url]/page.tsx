'use client'

import { Scoreboard } from '@/app/components/scoreboard/Scoreboard'
import { Stopwatch } from '@/app/components/stopwatch/Stopwatch'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import {
  calculateTimeDiff,
  getCurrentTime,
  getCurrentTimeString,
  updateTime,
} from './stopwatch/stopwatch'
import { Api } from '@/app/lib/axios'
import { AxiosError } from 'axios'
import { ActiveMatchByUrl } from '@/app/types'

export interface GamePageProps {
  params: {
    host: string
    url: string
  }
}

export default function GamePage({ params: { host, url } }: GamePageProps) {
  const [data, setData] = useState<ActiveMatchByUrl>()

  useEffect(() => {
    const controller = new AbortController()
    const handleFetch = async () => {
      try {
        const { data } = await Api.get<{ data: ActiveMatchByUrl }>(
          `matches/${host}`,
          {
            params: {
              url,
            },
            signal: controller.signal,
          },
        )

        setData(data.data)
      } catch (error) {
        if (error instanceof AxiosError) setData(error.response?.data.message)
      }
    }

    handleFetch()

    return () => {
      console.log('cancelando...')
      controller.abort()
    }
  }, [host, url])

  const homeTeamSetNum = data
    ? data.match.sets.filter((set) => set.winnerTp === 'HOME_TEAM').length
    : 0

  const outsideTeamSetNum = data
    ? data.match.sets.filter((set) => set.winnerTp === 'OUTSIDE_TEAM').length
    : 0

  const [homeTeamNumberOfSets, setHomeTeamNumberOfSets] =
    useState(homeTeamSetNum)
  const [outsideTeamNumberOfSets, setOutsideTeamNumberOfSets] =
    useState(outsideTeamSetNum)

  // const [currentTime, setCurrentTime] = useState(getCurrentTimeString())

  // const [diffInSeconds, setDiffInSeconds] = useState(
  //   calculateTimeDiff(matchStartDt, getCurrentTime()).seconds(),
  // )
  // const [diffInMinutes, setDiffInMinutes] = useState(
  //   calculateTimeDiff(matchStartDt, getCurrentTime()).minutes(),
  // )

  // const updateStopwatch = () => {
  //   updateTime({
  //     matchStartDt,
  //     setCurrentTime,
  //     setDiffInMinutes,
  //     setDiffInSeconds,
  //   })
  // }

  // setInterval(updateStopwatch, 1000)

  return (
    <main className="h-screen flex flex-col font-bold text-7xl w-full">
      <h1 className="bg-green-700 flex items-center justify-center py-20">
        {data?.client.nameDs ?? ''}
      </h1>

      <div className="flex items-center justify-center h-full w-full">
        <div className="w-full h-full grid grid-cols-3">
          <Scoreboard
            team={{
              name: data?.match.homeTeamDs ?? 'Time A',
              numberOfSets: homeTeamNumberOfSets,
              score: 15,
            }}
          />
          <Stopwatch
            currentTime={new Date().toLocaleTimeString()}
            diffInMinutes={
              data
                ? calculateTimeDiff(
                    data?.match.startedAt,
                    getCurrentTime(),
                  ).minutes()
                : 0
            }
            diffInSeconds={
              data
                ? calculateTimeDiff(
                    data?.match.startedAt,
                    getCurrentTime(),
                  ).seconds()
                : 0
            }
          />
          <Scoreboard
            team={{
              name: data?.match.outsideTeamDs ?? 'Time B',
              numberOfSets: outsideTeamNumberOfSets,
              score: 30,
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
