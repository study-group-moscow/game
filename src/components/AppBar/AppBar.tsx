import React from 'react';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useUpdateUserMutation } from '../../services/ForumService';
import Drawer from './Drawer'
import { useFetchUserQuery } from '../../services/AuthServices';

const CustomAppBar = () => {
  const theme = useTheme()
  const [updateUser] = useUpdateUserMutation()
  const { data: user } = useFetchUserQuery(undefined, { skip: false })

  const toggleTheme = () => {
    updateUser({
      id: user!.id,
      theme: theme.palette.mode === 'dark' ? 'light' : 'dark'
    })
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
