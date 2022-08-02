import { ENDPOINTS } from '../constants/constants';
import { ILeaderboardItemTransformed, ILeaderboardItem } from '../models/ILeaderboardResponse';
import { IGetLeaderboardParams } from '../models/IGetLeaderboardParams';
import baseApi from '../store/api/baseApi';

const http = ENDPOINTS.HTTP;

export const leaderboardAPI = baseApi
  .enhanceEndpoints({ addTagTypes: ['Leaderboard'] })
  .injectEndpoints({
    endpoints: (build) => ({
      fetchTeamLeaderboard:
        build.mutation<ILeaderboardItemTransformed[], IGetLeaderboardParams>({
          query: (body) => ({
            url: `${http}${ENDPOINTS.LEADERBOARD.PATH}${ENDPOINTS.LEADERBOARD.TEAM}`,
            method: 'POST',
            body
          }),
          transformResponse: (response: ILeaderboardItem[]) => response.map((r) => ({
            ...r.data, id: r.data.name + r.data.score
          })),
          invalidatesTags: ['Leaderboard']
        })
    })
  })

export const {
  useFetchTeamLeaderboardMutation
} = leaderboardAPI
