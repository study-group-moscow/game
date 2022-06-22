import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import SailingIcon from '@mui/icons-material/Sailing';
import Avatar from '@mui/material/Avatar';
import LogoutIcon from '@mui/icons-material/Logout';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import ForumIcon from '@mui/icons-material/Forum';

export default () => {
  const [isOpened, setIsOpened] = React.useState(false)

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === 'keydown'
      && ((event as React.KeyboardEvent).key === 'Tab'
      || (event as React.KeyboardEvent).key === 'Shift')
    ) { return; }

    setIsOpened(open)
  }

  const goToProfile = () => {
    console.log('AAAAAAA To Profile')
  }

  const goToGame = () => {
    console.log('AAAAAAA To Game')
  }

  const goToForum = () => {
    console.log('AAAAAAA To Forum')
  }

  const logout = () => {
    console.log('AAAAAAA Logout')
  }

  const list = () => (
    <Box
      sx={{ width: 200 }}
      role='presentation'
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <Box sx={{ width: '100%', my: 4 }} display='flex' justifyContent='center'>
        <IconButton onClick={goToProfile}>
          <Avatar title='Настроить аккаунт' sx={{ width: 120, height: 120 }} src='/broken-image.jpg' />
        </IconButton>
      </Box>

      <Divider />

      <List>
        <ListItem key='Игра' disablePadding>
          <ListItemButton onClick={goToGame}>
            <ListItemIcon>
              <SportsEsportsIcon />
            </ListItemIcon>
            <ListItemText primary='Игра' />
          </ListItemButton>
        </ListItem>

        <ListItem key='Форум' disablePadding>
          <ListItemButton onClick={goToForum}>
            <ListItemIcon>
              <ForumIcon />
            </ListItemIcon>
            <ListItemText primary='Форум' />
          </ListItemButton>
        </ListItem>

        <ListItem key='Выход' disablePadding>
          <ListItemButton onClick={logout}>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary='Выход' />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  )

  return (
    <>
      <IconButton color='inherit' onClick={toggleDrawer(true)}>
        <SailingIcon sx={{ mr: 'auto' }} />
      </IconButton>

      <Drawer anchor='left' open={isOpened} onClose={toggleDrawer(false)}>
        {list()}
      </Drawer>
    </>
  )
}
