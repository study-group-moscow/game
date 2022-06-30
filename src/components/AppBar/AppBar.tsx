import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Drawer from './Drawer'

const CustomAppBar = () => (
  <AppBar position='fixed'>
    <Toolbar>
      <Drawer />
    </Toolbar>
  </AppBar>
)

export default CustomAppBar
