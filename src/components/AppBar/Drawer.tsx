import React from 'react';
import { useNavigate } from 'react-router-dom';
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
import { useFetchLogoutMutation } from '../../services/AuthServices';
import Icon from '../../utils/Icon'
import { MENU_ITEMS, RouterLinks } from '../../constants/constants'

export default () => {
  const [fetchLogout] = useFetchLogoutMutation();
  const [isOpened, setIsOpened] = React.useState(false)
  const navigate = useNavigate()

  const toggleDrawer = (state: boolean): void => setIsOpened(state)

  const goToRoute = async (route: string): Promise<void> => {
    if (route === RouterLinks.LOGIN) {
      await fetchLogout()
    }

    navigate(route)
  }

  return (
    <>
      <IconButton color='inherit' onClick={() => toggleDrawer(true)}>
        <SailingIcon sx={{ mr: 'auto' }} />
      </IconButton>

      <Drawer anchor='left' open={isOpened} onClose={() => toggleDrawer(false)}>
        <Box
          sx={{ width: 200 }}
          role='presentation'
          onClick={() => toggleDrawer(false)}
          onKeyDown={() => toggleDrawer(false)}
        >
          <Box sx={{ width: '100%', my: 4 }} display='flex' justifyContent='center'>
            <IconButton onClick={() => goToRoute(MENU_ITEMS.profile.link)}>
              <Avatar
                title={MENU_ITEMS.profile.title}
                sx={{ width: 120, height: 120 }}
                src='/broken-image.jpg'
              />
            </IconButton>
          </Box>

          <Divider />

          <List>
            { MENU_ITEMS.list.map((item) => (
              <ListItem key={item.title} disablePadding>
                <ListItemButton onClick={() => goToRoute(item.link)}>
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