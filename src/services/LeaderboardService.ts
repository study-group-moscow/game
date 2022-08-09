import { ENDPOINTS } from '../constants/constants';
import {
  ILeaderboardItemTransformed,
  ILeaderboardItem,
  ILeaderboardAddPlayer
} from '../models/ILeaderboardResponse';
import { IGetLeaderboardParams } from '../models/IGetLeaderboardParams';
import { IErrorResponse } from '../models/IErrorResponse';
import baseApi from '../store/api/baseApi';

const http = ENDPOINTS.YANDEX;

export const leaderboardAPI = baseApi
  .enhanceEndpoints({ addTagTypes: ['Leaderboard'] })
  .injectEndpoints({
    endpoints: (build) => ({
      fetchTeamLeaderboard: build.mutation<ILeaderboardItemTransformed[], IGetLeaderboardParams>({
        query: (body) => ({
          url: `${http}${ENDPOINTS.LEADERBOARD.PATH}${ENDPOINTS.LEADERBOARD.TEAM}`,
          method: 'POST',
          body
        }),
        transformResponse: (response: ILeaderboardItem[]) => response.map((r) => ({
          ...r.data, id: r.data.name + r.data.score
        })),
        invalidatesTags: ['Leaderboard']
      }),
      addPlayerToLeaderboard: build.mutation<IErrorResponse, ILeaderboardAddPlayer>({
        query: (body) => ({
          url: `${http}${ENDPOINTS.LEADERBOARD.PATH}`,
          method: 'POST',
          responseHandler: (response) => (
            (response.status === 200)
              ? response.text()
              : response.json()),
          body
        }),

        invalidatesTags: ['Leaderboard']
      })
    })
  })

export const {
  useFetchTeamLeaderboardMutation,
  useAddPlayerToLeaderboardMutation
} = leaderboardAPI
