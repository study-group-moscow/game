import React, { useEffect } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { useFetchTeamLeaderboardMutation } from '../../services/LeaderboardService';
import './Leaderboard.module.scss'

const Leaderboard = () => {
  const [pageIndex, setPageIndex] = React.useState(0) // page index (page number)
  const [rowsPerPage, setRowsPerPage] = React.useState(0) // rows per page qty actual
  const [pageSize, setPageSize] = React.useState(5) // rows per page qty selected option
  const [cursor, setCursor] = React.useState(0) // cursor

  const [fetchLeaderboard, {
    isLoading,
    data,
    error,
    isSuccess,
    isError
  }] = useFetchTeamLeaderboardMutation();

  useEffect(() => {
    console.log('----FETCHING LEADERBOARD-----')
    fetchLeaderboard({ ratingFieldName: 'score', cursor, limit: pageSize })
  }, [pageSize, pageIndex])

  useEffect(() => {
    setRowsPerPage(data?.length ?? 0)
  }, [isSuccess])

  const handlePageSizeChange = (size: number) => {
    // make fetch !!!
    console.log('pageSize=', size)

    setPageSize(size)
  }

  const handlePageChange = (page: number) => {
    // make fetch !!!
    console.log('----page changed----page=', page)

    setPageIndex(page)
  }

  const columns = [
    { field: 'name', headerName: 'Имя', width: 150 },
    { field: 'score', headerName: 'Счет', width: 220 }
  ]

  return (
    <div style={{ height: 600, width: 380 }}>
      <DataGrid
        rows={data || []}
        columns={columns}
        pagination
        pageSize={pageSize}
        rowsPerPageOptions={[5, 10]}
        rowCount={rowsPerPage}
        paginationMode='server'
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
        page={pageIndex}
        loading={isLoading}
        disableSelectionOnClick
      />
    </div>
  )
}

export default Leaderboard
