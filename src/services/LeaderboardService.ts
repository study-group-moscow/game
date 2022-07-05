import { ENDPOINTS } from '../constants/constants';
import { ILeaderboardItemTransformed, ILeaderboardItem } from '../models/ILeaderboardResponse';
import { IGetLeaderboardParams } from '../models/IGetLeaderboardParams';
import baseApi from '../store/api/baseApi';

export const leaderboardAPI = baseApi
  .enhanceEndpoints({ addTagTypes: ['Leaderboard'] })
  .injectEndpoints({
    endpoints: (build) => ({
      fetchTeamLeaderboard:
        build.mutation<ILeaderboardItemTransformed[], IGetLeaderboardParams>({
          query: (body) => ({
            url: `${ENDPOINTS.LEADERBOARD.PATH}${ENDPOINTS.LEADERBOARD.TEAM}`,
            method: 'POST',
            body
          }),
          transformResponse: (response: ILeaderboardItem[]) => response.map((r) => r.data),
          invalidatesTags: ['Leaderboard']
        })
    })
  })

export const {
  useFetchTeamLeaderboardMutation
} = leaderboardAPI
