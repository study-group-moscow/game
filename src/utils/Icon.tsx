import React from 'react';
import LogoutIcon from '@mui/icons-material/Logout';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import ForumIcon from '@mui/icons-material/Forum';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';

const IconDict: { [index: string]:JSX.Element } = {
  Logout: <LogoutIcon />,
  Leaderboard: <LeaderboardIcon />,
  SportsEsports: <SportsEsportsIcon />,
  Forum: <ForumIcon />
}

export default ({ name }: { name: string }) => IconDict[name]

