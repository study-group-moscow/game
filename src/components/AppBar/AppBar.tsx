import React from 'react';
import { useTheme } from '@mui/material/styles';
import { skipToken } from '@reduxjs/toolkit/query'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useUpdateUserMutation, useGetOneUserQuery } from '../../services/ForumService';
import { useFetchUserQuery } from '../../services/AuthServices';
import Drawer from './Drawer'

const CustomAppBar = () => {
  const theme = useTheme()

  const [updateUser] = useUpdateUserMutation()

  const {
    data: user,
    isSuccess: isSuccessYandex
  } = useFetchUserQuery(undefined, { skip: false });
  const { data: userWithTheme } = useGetOneUserQuery(isSuccessYandex ? user.id : skipToken);

  console.log(skipToken)

  const toggleTheme = () => {
    if (userWithTheme) {
      updateUser({
        id: userWithTheme.id,
        first_name: userWithTheme.first_name,
        second_name: userWithTheme.second_name,
        display_name: userWithTheme.display_name,
        theme: theme.palette.mode === 'dark' ? 'light' : 'dark',
        score: userWithTheme.score
      })
    }
  }

  return (
    <AppBar position='fixed'>
      <Toolbar>
        <Drawer />

        <IconButton sx={{ ml: 'auto' }} onClick={toggleTheme} color='inherit'>
          {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}

export default CustomAppBar
