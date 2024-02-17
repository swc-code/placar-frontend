import moment from 'moment'

export const updateTime = ({
  matchStartDt,
  setCurrentTime,
  setDiffInSeconds,
  setDiffInMinutes,
}: {
  matchStartDt: Date
  setCurrentTime: (time: string) => void
  setDiffInSeconds: (time: number) => void
  setDiffInMinutes: (time: number) => void
}) => {
  const time = getCurrentTimeString()
  setCurrentTime(time)

  setDiffInSeconds(calculateTimeDiff(matchStartDt, getCurrentTime()).seconds())
  setDiffInMinutes(calculateTimeDiff(matchStartDt, getCurrentTime()).minutes())
}

export const calculateTimeDiff = (start: Date, end: Date) => {
  return moment.duration(moment(end).diff(start))
}

export const getCurrentTime = () => {
  return new Date()
}

export const getCurrentTimeString = () => {
  return new Date().toLocaleTimeString()
}
