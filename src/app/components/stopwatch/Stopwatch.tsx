import moment from "moment"
import { useState } from "react"

export const Stopwatch = ({matchStartDt}: {matchStartDt: Date}) => {
  const [currentTime, setCurrentTime] = useState(getCurrentTimeString())

  const [diffInSeconds, setDiffInSeconds] = useState(calculateTimeDiff(matchStartDt, getCurrentTime()).seconds())
  const [diffInMinutes, setDiffInMinutes] = useState(calculateTimeDiff(matchStartDt, getCurrentTime()).minutes())
  
  const updateTime = () => {
    let time = getCurrentTimeString()
    setCurrentTime(time)

    setDiffInSeconds(calculateTimeDiff(matchStartDt, getCurrentTime()).seconds())
    setDiffInMinutes(calculateTimeDiff(matchStartDt, getCurrentTime()).minutes())
  }

  setInterval(updateTime, 1000)

  return <div className="flex flex-col items-center justify-evenly bg-zinc-900 text-white mt-5 rounded-2xl shadow-lg shadow-black">
    <p>
      {diffInMinutes > 9 ? diffInMinutes : `0${diffInMinutes}`}:
      {diffInSeconds > 9 ? diffInSeconds : `0${diffInSeconds}`}
    </p>
    <p>{currentTime}</p>
  </div>
}

const getCurrentTime = () => {
  return new Date()
}

const getCurrentTimeString = () => {
  return new Date().toLocaleTimeString()
}

const calculateTimeDiff = (start: Date, end: Date) => {
  return moment.duration(moment(end).diff(start))
}