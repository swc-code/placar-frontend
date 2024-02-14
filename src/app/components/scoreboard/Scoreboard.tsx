import { ReactNode } from "react"

export interface ScoreboardProps {
  team: {
    name: string
    score: number
    numberOfSets: number
  }
}

export const Scoreboard = ({team: {name, score, numberOfSets}}: ScoreboardProps) => {
  const setDots: ReactNode[] = []
  for(let i = 0; i < numberOfSets; i++) {
    setDots.push(dot())
  }

  return <div className="pt-10 m-5 flex flex-col gap-36 items-center justify-start bg-blue-700 row-span-2 text-[18rem] rounded-2xl shadow-2xl shadow-zinc-900">
    <p className="text-7xl">{name}</p>
    <div className="flex flex-col items-center justify-center">
      {score}
      <div className="mt-20 flex gap-2">{...setDots}</div>
    </div>
    
  </div>
}

export const dot = () => {
  return <div className="rounded-full bg-white w-[2rem] h-[2rem]"></div>
}