import React, { useEffect } from 'react'
import { DataGrid, ruRU } from '@mui/x-data-grid'
import { useTheme } from '@mui/material/styles';
import { useFetchTeamLeaderboardMutation } from '../../services/LeaderboardService'
import styles from '../../styles/centerContent.module.scss'
import stylesPage from './Leaderboard.module.scss'
import dataGridDark from '../../styles/darkModeComponents'

const Leaderboard = () => {
  const [pageSize, setPageSize] = React.useState(5)

  const [fetchLeaderboard, { isLoading }] = useFetchTeamLeaderboardMutation();

  useEffect(() => {
    fetchLeaderboard({ ratingFieldName: 'score', cursor: 0, limit: 100 })
  }, [])

  const handlePageSizeChange = (size: number) => setPageSize(size)
  const theme = useTheme()

  // !!! TO UNCOMMENT !!!
  // const dataGetter = data || []

  // !!! fake data !!!
  const dataGetter = [
    { id: 1, name: 'Куприян', score: 200 },
    { id: 2, name: 'Исаия', score: 310 },
    { id: 3, name: 'Амвросий', score: 50 },
    { id: 4, name: 'Иероним', score: 55 },
    { id: 5, name: 'Поликарп', score: 210 },
    { id: 6, name: 'Лазарь', score: 2000 },
    { id: 7, name: 'Архипп', score: 560 },
    { id: 8, name: 'Евпраксия', score: 570 },
    { id: 9, name: 'Иоаким', score: 580 },
    { id: 10, name: 'Теона', score: 910 },
    { id: 11, name: 'Феврония', score: 930 },
    { id: 12, name: 'Евдокия', score: 110 },
    { id: 13, name: 'Ефрем', score: 350 },
    { id: 14, name: 'Евфросиния', score: 770 },
    { id: 15, name: 'Агния', score: 780 },
    { id: 16, name: 'Матфей', score: 1010 },
    { id: 17, name: 'Аввакум', score: 1030 },
    { id: 18, name: 'Гликерия', score: 1200 },
    { id: 19, name: 'Авксентий', score: 2200 },
    { id: 20, name: 'Диодор', score: 2300 },
    { id: 21, name: 'Никодим', score: 2400 },
    { id: 22, name: 'Яков', score: 990 },
    { id: 23, name: 'Авдей', score: 970 }
  ]

  const columns = [
    { field: 'name', headerName: 'Имя', width: 195, headerClassName: 'aaaa-aaaa' },
    { field: 'score', headerName: 'Счет', width: 195, headerClassName: 'aaaa-aaaa' }
  ]

  const dataGridThemeOverride = theme.palette.mode === 'dark' ? dataGridDark : {}

  return (
    <div className={styles.center}>
      <div className={stylesPage.table}>
        <DataGrid
          rows={dataGetter}
          columns={columns}
          pagination
          pageSize={pageSize}
          rowsPerPageOptions={[5, 10]}
          sx={dataGridThemeOverride}
          autoHeight
          onPageSizeChange={handlePageSizeChange}
          loading={isLoading}
          disableSelectionOnClick
          localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
        />
      </div>
    </div>
  )
}

export default Leaderboard
