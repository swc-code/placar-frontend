export const toDate = (date: Date | string): string => {
  return new Date(date).toLocaleDateString()
}

export const toDateTime = (date: Date | string): string => {
  return `${new Date(date).toLocaleDateString()} ${new Date(date).toLocaleTimeString()}`
}
