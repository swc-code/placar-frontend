'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { Scoreboard } from '@/components/scoreboard/scoreboard'
import { Stopwatch } from '@/components/stopwatch/stopwatch'
import {
  calculateTimeDiff,
  getCurrentTime,
  getCurrentTimeString,
  updateTime,
} from './stopwatch/stopwatch'
import { Api } from '@/lib/axios'
import { AxiosError } from 'axios'
import { Client, Court, Match, Set, WinnerTp } from '@/types'
import { useQuery } from '@tanstack/react-query'
import { io } from 'socket.io-client'
import { enqueueSnackbar } from 'notistack'

export interface GamePageProps {
  params: {
    id: string
  }
}

interface SocketData {
  match?: Match
  message?: string
  dataTp: 'END' | 'START' | 'SCORE'
}

interface ApiData {
  match?: Match
  client: Client
  court: Court
}

const defaultData = {
  match: {
    matchId: '',
    homeTeamDs: 'Time A',
    outsideTeamDs: 'Time B',
    startedAt: null,
    sets: [] as Set[],
    homeTeamSc: 0,
    outsideTeamSc: 0,
  },
}

export default function GamePage({ params: { id } }: GamePageProps) {
  const [client, setClient] = useState<Client>()
  const [data, setData] = useState<ApiData>()
  const [ongoinSet, setOngoinSet] = useState<Set>()

  useEffect(() => {
    const getClient = async() => {
      try {
        const {data} = await Api.get<{data: Client}>('/clients/court/' + id)

        setClient(data.data)
      } catch (error) {
        if(error instanceof AxiosError)
        enqueueSnackbar(error.response!.data.message)
      }
    } 

    getClient()
  }, [])

  useQuery({
    queryKey: ['findActiveMatchCourtId', id],
    retry: false,
    queryFn: async () => {
      try {
        const { data } = await Api.get<{ data: ApiData }>(
          `/matches/court/${id}`,
        )

        setData(data.data)
        setOngoinSet(data.data.match?.sets.find((set) => !set.finishedAt))

        return data.data
      } catch (err) {
        if (err instanceof AxiosError) setData(err.response!.data.message)
      }
    },
  })

  useEffect(() => {
    const socket = io('http://localhost:3333')

    socket.on('on-' + id, (socketData: SocketData) => {
      setData({ ...data!, match: socketData.match })

      if (socketData.dataTp !== 'END') {
        const ongoingSet = socketData.match!.sets.find(
          (set) => !set.hasFinished,
        )

        setOngoinSet(ongoingSet)
      } else {
        setData(undefined)
        setOngoinSet(undefined)
      }
    })
  }, [])

  const [currentTime, setCurrentTime] = useState(getCurrentTimeString())

  const [diffInSeconds, setDiffInSeconds] = useState(
    calculateTimeDiff(data?.match?.startedAt, getCurrentTime()).seconds(),
  )
  const [diffInMinutes, setDiffInMinutes] = useState(
    calculateTimeDiff(data?.match?.startedAt, getCurrentTime()).minutes(),
  )

  const updateStopwatch = () => {
    updateTime({
      matchStartDt: data?.match?.startedAt,
      setCurrentTime,
      setDiffInMinutes,
      setDiffInSeconds,
    })
  }

  setInterval(updateStopwatch, 1000)

  return (
    <main className="h-screen flex flex-col font-bold text-7xl w-full">
      <h1 className="bg-green-700 flex items-center justify-center py-20">
        {client ? client.clientDs : ''}
      </h1>

      <div className="flex items-center justify-center h-full w-full">
        <div className="w-full h-full grid grid-cols-3">
          <Scoreboard
            team={{
              name: data?.match?.homeTeamDs ?? defaultData.match.homeTeamDs,
              numberOfSets:
                data && data.match?.sets
                  ? data.match.sets.filter(
                      (set) =>
                        set.hasFinished && set.winnerTp === WinnerTp.HOME_TEAM,
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
              name: data?.match?.outsideTeamDs ?? 'Time B',
              numberOfSets:
                data && data.match?.sets
                  ? data.match.sets.filter(
                      (set) => set.winnerTp === WinnerTp.OUTSIDE_TEAM,
                    ).length
                  : 0,
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
