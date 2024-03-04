'use client'

export interface StopwatchProps {
  diffInMinutes: number
  diffInSeconds: number
  currentTime: string
}

export const Stopwatch = ({
  diffInMinutes,
  diffInSeconds,
  currentTime,
}: StopwatchProps) => {
  return (
    <div className="flex flex-col items-center justify-evenly bg-zinc-900 text-white mt-5 rounded-2xl shadow-lg shadow-black">
      <div className="flex flex-col items-center justify-center">
        <label className="text-2xl">Tempo de jogo</label>
        <p>
          {diffInMinutes > 9 ? diffInMinutes : `0${diffInMinutes}`}:
          {diffInSeconds > 9 ? diffInSeconds : `0${diffInSeconds}`}
        </p>
      </div>
      <div className="flex flex-col items-center justify-center">
        <label className="text-2xl">Horário local</label>
        <p>{currentTime}</p>
      </div>
    </div>
  )
}
