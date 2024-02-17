import { ReactNode } from 'react'

export interface ScoreboardProps {
  team: {
    name: string
    score: number
    numberOfSets: number
  }
}

export const Scoreboard = ({
  team: { name, score, numberOfSets },
}: ScoreboardProps) => {
  return (
    <div className="py-10 m-5 flex flex-col gap-36 items-center justify-start bg-blue-700 row-span-2 text-[18rem] rounded-2xl shadow-2xl shadow-zinc-900 text-center">
      <p className="text-6xl">{name}</p>
      <div className="flex flex-col items-center justify-center">
        {score}
        <div className="mt-20 flex gap-2">{...setDots({ numberOfSets })}</div>
      </div>
    </div>
  )
}

const dot = ({ color }: { color: 'black' | 'gray' }) => {
  const bgColor = color === 'black' ? 'bg-black' : 'bg-zinc-400'

  return <div className={`rounded-full w-[2rem] h-[2rem] ${bgColor}`} />
}

const setDots = ({ numberOfSets }: { numberOfSets: number }): ReactNode[] => {
  const defaultNumberOfSets = 6
  const dots: ReactNode[] = []

  for (let i = 0; i < defaultNumberOfSets; i++) {
    dots.push(dot({ color: i < numberOfSets ? 'black' : 'gray' }))
  }

  return dots
}
