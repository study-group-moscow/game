import React, { useEffect } from 'react'
import { DataGrid, ruRU } from '@mui/x-data-grid'
import { useTheme } from '@mui/material/styles';
import { useFetchTeamLeaderboardMutation } from '../../services/LeaderboardService'
// import styles from '../../styles/centerContent.module.scss'
// import stylesPage from './Leaderboard.module.scss'
import { dataGridDark } from '../../styles/darkModeComponents'

const Leaderboard = () => {
  const [pageSize, setPageSize] = React.useState(5)

  const [fetchLeaderboard, { isLoading, data = [] }] = useFetchTeamLeaderboardMutation();
  const theme = useTheme()

  useEffect(() => {
    fetchLeaderboard({ ratingFieldName: 'score', cursor: 0, limit: 100 })
  }, [])

  const handlePageSizeChange = (size: number) => setPageSize(size);

  const columns = [
    { field: 'name', headerName: 'Имя', width: 195 },
    { field: 'score', headerName: 'Счет', width: 195 }
  ]

  const dataGridThemeOverride = theme.palette.mode === 'dark' ? dataGridDark : {}

  return (
    <div className={undefined}>
      <div className={undefined}>
        <DataGrid
          rows={data}
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
