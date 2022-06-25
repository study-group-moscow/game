import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Drawer from './Drawer'

const CustomAppBar = () => (
  <AppBar position='static'>
    <Toolbar>
      <Drawer />
    </Toolbar>
  </AppBar>
)

export default CustomAppBar
