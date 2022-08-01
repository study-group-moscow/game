import { createTheme } from '@mui/material/styles'
import { COLORS } from './constants'

export const light = createTheme({
  palette: {
    mode: 'light'
  }
})

export const dark = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: COLORS.primaryDark
    },
    background: {
      paper: COLORS.backgroundDarkNormal,
      default: COLORS.backgroundDarkNormal
    }
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: COLORS.backgroundDarkStrong
        }
      }
    }
  }
})
