import React, { FC } from 'react';
import LogoutIcon from '@mui/icons-material/Logout';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import ForumIcon from '@mui/icons-material/Forum';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';

const Icon: FC<{ name: string }> = ({ name }) => {
  const IconDict: { [index: string]:JSX.Element } = {
    Logout: <LogoutIcon />,
    Leaderboard: <LeaderboardIcon />,
    SportsEsports: <SportsEsportsIcon />,
    Forum: <ForumIcon />
  }

  return IconDict[name]
}

export default Icon
