export type Client = {
  clientId: string
  nameDs: string
  hostDs: string
}

export type Court = {
  courtId: string
  nameDs: string
  urlDs: string
}

export type Set = {
  winnerTp?: 'HOME_TEAM' | 'OUTSIDE_TEAM'
  homeTeamSc: number
  outsideTeamSc: number
  setNum: number
  startedAt: Date
  finishedAt?: Date
}

export type Match = {
  matchId: string
  court: Court
  sets: Set[]
  homeTeamDs: string
  outsideTeamDs: string
  startedAt: Date
  finishedAt: Date
}

export type ActiveMatchByUrl = {
  match: Match
  court: Court
  client: Client
}

export type GameCofig = {
  maxSetNum: number
  maxScPerSet: number
  scValue: number
}
