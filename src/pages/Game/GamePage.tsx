import React, { useRef, useEffect } from 'react';
import { Button, Container } from '@mui/material';
import { Game } from '../../components/Game/Game';
import './GamePage.scss'

const GamePage: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const canvasCtxRef = React.useRef<CanvasRenderingContext2D | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current
      canvasCtxRef.current = canvas.getContext('2d');
      const ctx = canvasCtxRef.current;
      canvas.width = 1000;
      canvas.height = 500;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const game = new Game({
        ctx,
        canvas
      });
    }
  }, []);

  return (
    <Container className='Game'>
      <div id='Winner' />
      <div id='Loser' />
      <Button className='button' id='Button'>Random</Button>
      <canvas ref={canvasRef} />
    </Container>
  );
};

export default GamePage;
