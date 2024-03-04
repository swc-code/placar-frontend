export type Client = {
  clientId: string
  clientDs: string
}

export type Court = {
  courtId: string
  courtDs: string
}

export enum WinnerTp {
  HOME_TEAM,
  OUTSIDE_TEAM,
}

export type Set = {
  winnerTp?: WinnerTp
  homeTeamSc: number
  outsideTeamSc: number
  setNum: number
  startedAt: Date
  finishedAt?: Date
  hasFinished: boolean
}

export type Match = {
  matchId: string
  court: Court
  sets: Set[]
  homeTeamDs: string
  outsideTeamDs: string
  startedAt: Date
  finishedAt?: Date
  winnerTp: WinnerTp
}

export type GameCofig = {
  maxSetNum: number
  maxScPerSet: number
  scValue: number
}

export type HomeInfo = {
  ongoingGamesNum: number
  gamesDuringTime: number
}
