import React from 'react';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useUpdateUserMutation } from '../../services/ForumService';
import Drawer from './Drawer'
import useGetLocalDbUser from '../../hooks/useGetLocalDbUser'

const CustomAppBar = () => {
  const theme = useTheme()
  const [updateUser] = useUpdateUserMutation()
  const localDbUser = useGetLocalDbUser({ skip: false })

  const toggleTheme = () => {
    updateUser({
      id: localDbUser!.id,
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
