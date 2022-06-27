import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import './Loader.scss'

const Loader = () => (
  <Box className='Loader'>
    <CircularProgress />
  </Box>
);

export default Loader
