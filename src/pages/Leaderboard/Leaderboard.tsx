import React, { useEffect } from 'react'
import { DataGrid, ruRU } from '@mui/x-data-grid'
import { useFetchTeamLeaderboardMutation } from '../../services/LeaderboardService'
import styles from '../../styles/centerContent.module.scss'
import stylesPage from './Leaderboard.module.scss'

const Leaderboard = () => {
  const [pageSize, setPageSize] = React.useState(5)

  const [fetchLeaderboard, { isLoading, data = [] }] = useFetchTeamLeaderboardMutation();

  useEffect(() => {
    fetchLeaderboard({ ratingFieldName: 'score', cursor: 0, limit: 100 })
  }, [])

  const handlePageSizeChange = (size: number) => setPageSize(size);

  const columns = [
    { field: 'name', headerName: 'Имя', width: 195 },
    { field: 'score', headerName: 'Счет', width: 195 }
  ]

  return (
    <div className={styles.center}>
      <div className={stylesPage.table}>
        <DataGrid
          rows={data}
          columns={columns}
          pagination
          pageSize={pageSize}
          rowsPerPageOptions={[5, 10]}
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
