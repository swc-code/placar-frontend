import moment from 'moment'

export const updateTime = ({
  matchStartDt,
  setCurrentTime,
  setDiffInSeconds,
  setDiffInMinutes,
}: {
  matchStartDt: Date | undefined
  setCurrentTime: (time: string) => void
  setDiffInSeconds: (time: number) => void
  setDiffInMinutes: (time: number) => void
}) => {
  const time = getCurrentTimeString()
  setCurrentTime(time)

  if (!matchStartDt) {
    setDiffInSeconds(0)
    setDiffInMinutes(0)
  } else {
    setDiffInSeconds(
      calculateTimeDiff(matchStartDt, getCurrentTime()).seconds(),
    )
    setDiffInMinutes(
      calculateTimeDiff(matchStartDt, getCurrentTime()).minutes(),
    )
  }
}

export const calculateTimeDiff = (start?: Date, end?: Date) => {
  if (!start) return moment.duration(0)
  return moment.duration(moment(end).diff(start))
}

export const getCurrentTime = () => {
  return new Date()
}

export const getCurrentTimeString = () => {
  return new Date().toLocaleTimeString()
}
