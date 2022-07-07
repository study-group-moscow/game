import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import './Loader.module.scss'

const Loader = () => (
  <Box className='loader'>
    <CircularProgress />
  </Box>
);

export default Loader
