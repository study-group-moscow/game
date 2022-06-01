import React from 'react'
import Button from '@mui/material/Button'
import SendIcon from '@mui/icons-material/Send';
import styles from './home.module.scss'

const Home:React.FC = () => (
  <>
    <div className={styles.active}>Home</div>
    <Button
      variant='contained'
      color='success'
      endIcon={<SendIcon />}
    >
      This is my home!
    </Button>
  </>
)

export default Home
