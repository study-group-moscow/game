import React, { useRef, useEffect } from 'react'
import { Button, Container } from '@mui/material'
import { Game } from '../../components/Game/Game'
import './GamePage.scss'
import { getMouse } from '../../components/Game/mouse'
import { useUpdateUserMutation } from '../../services/ForumService'
import { useAddPlayerToLeaderboardMutation } from '../../services/LeaderboardService'
import useGetLocalDbUser from '../../hooks/useGetLocalDbUser'
import { IAlertTypeProps, showAlert } from '../../store/reducers/AlertSlice';
import { MESSAGES_TEXT, TYPES_ALERT } from '../../constants/constants';
import { useAppDispatch } from '../../hooks/redux';

const GamePage: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const canvasCtxRef = React.useRef<CanvasRenderingContext2D | null>(null);

  const [updateUser] = useUpdateUserMutation()
  const [addPlayerToLeaderboard] = useAddPlayerToLeaderboardMutation()
  const localDbUser = useGetLocalDbUser({ skip: false })
  const dispatch = useAppDispatch()

  const handleWin = async () => {
    try {
      const score = (localDbUser!.score ?? 0) + 100
      const name = localDbUser!.display_name ?? 'player'
      const { id } = localDbUser!

      await updateUser({ id, score })

      await addPlayerToLeaderboard({
        data: { score, name },
        ratingFieldName: 'score',
        teamName: 'moscow'
      })
    } catch (e) {
      dispatch(showAlert({
        text: MESSAGES_TEXT.ERROR_OCCURRED,
        type: TYPES_ALERT.ERROR as IAlertTypeProps
      }))
    }
  }

  useEffect(() => {
    let removeClick: () => void;
    let removeWheel: () => void;
    let removeMousedown: () => void;
    let removeMouseup: () => void;

    if (canvasRef.current && localDbUser?.id) {
      const canvas = canvasRef.current;
      canvas.width = 1000;
      canvas.height = 500;

      canvasCtxRef.current = canvas.getContext('2d');
      const ctx = canvasCtxRef.current;

      const { mouse, myClick, myWheel, myMousedown, myMouseup } = getMouse(canvas);
      removeClick = myClick;
      removeWheel = myWheel;
      removeMousedown = myMousedown;
      removeMouseup = myMouseup;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const game = new Game({ ctx, canvas, mouse, handleWin });
    }

    return () => {
      if (canvasRef.current) {
        canvasRef.current.removeEventListener('mousemove', removeClick);
        canvasRef.current.removeEventListener('wheel', removeWheel);
        canvasRef.current.removeEventListener('mousedown', removeMousedown);
        canvasRef.current.removeEventListener('mouseup', removeMouseup);
      }
    }
  }, [localDbUser]);

  return (
    <Container className='game'>
      <div id='winner' />
      <div id='loser' />
      <Button className='button' id='Button'>Random</Button>
      <canvas ref={canvasRef} />
    </Container>
  );
};

export default GamePage;
