import React from 'react';
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
import Icon from '../../utils/Icon'
import { MENU_ITEMS } from '../../utils/consts'

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

  const goToPage = (addr: string): void => {
    console.log('AAAAAAA To addr=', addr)
  }

  const goToProfile = () => {
    console.log('AAAAAAA To Profile')
  }

  return (
    <>
      <IconButton color='inherit' onClick={toggleDrawer(true)}>
        <SailingIcon sx={{ mr: 'auto' }} />
      </IconButton>

      <Drawer anchor='left' open={isOpened} onClose={toggleDrawer(false)}>
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
            { MENU_ITEMS.map((item) => (
              <ListItem key={item.title} disablePadding>
                <ListItemButton onClick={() => goToPage(item.addr)}>
                  <ListItemIcon>
                    <Icon name={item.icon} />
                  </ListItemIcon>
                  <ListItemText primary={item.title} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  )
}
