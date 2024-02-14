import { Scoreboard } from "@/app/components/scoreboard/Scoreboard";
import { Stopwatch } from "@/app/components/stopwatch/Stopwatch";
import Image from "next/image";

export default function QuadraAPage() {
  return <main className="h-screen flex flex-col font-bold text-7xl w-full">
    <h1 className="bg-green-700 flex items-center justify-center py-20">Arena Merlim</h1>
    
    <div className="flex items-center justify-center h-full w-full">
      <div className="w-full h-full grid grid-cols-3">
        <Scoreboard team={{
          name: "Time A",
          numberOfSets: 2,
          score: 15
        }} />
        <Stopwatch />
        <Scoreboard team={{
          name: "Time B",
          numberOfSets: 3,
          score: 30
        }} />
        <div className="flex items-center justify-center relative my-5">
          <Image 
            alt="imagem propaganda" 
            src="https://linktr.ee/og/image/gymflixbirigui.jpg"
            style={{
              objectFit: 'cover'
            }} 
            fill
          />
        </div>
      </div>
    </div>
  </main>
}