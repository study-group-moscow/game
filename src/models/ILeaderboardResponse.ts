export interface ILeaderboardItem {
  data: {
    name: string,
    score: number
  }
}

export interface ILeaderboardItemTransformed {
  id: string,
  name: string,
  score: number
}

export interface ILeaderboardAddPlayer {
  data: {
    score: number,
    name: string
  },
  ratingFieldName: string,
  teamName: string
}
