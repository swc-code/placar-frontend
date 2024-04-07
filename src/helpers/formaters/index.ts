export const toDate = (date: Date | string): string => {
  return new Date(date).toLocaleDateString()
}

export const toDateTime = (date: Date | string): string => {
  return `${new Date(date).toLocaleDateString()} ${new Date(date).toLocaleTimeString()}`
}

export const getApiUrlFromUri = (apiUri: string): string => {
  return apiUri.substring(0, apiUri.length - 4)
}
