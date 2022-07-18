import React, { useRef, useEffect } from 'react';
import { Container } from '@mui/material';
import { Game } from '../../components/game/Game';
import './GamePage.scss'

const GamePage: React.FC<{}> = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const canvasCtxRef = React.useRef<CanvasRenderingContext2D | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current
      canvasCtxRef.current = canvas.getContext('2d');
      const ctx = canvasCtxRef.current;
      // размеры canvas
      canvas.width = 1000
      canvas.height = 500
      const game = new Game({
        ctx,
        canvas
      })
    }
  }, []);

  return (
    <Container style={{ marginTop: '100px' }}>
      <audio autoPlay>
        <source src='static/song.mp3' type='audio/mpeg' />
      </audio>
      <div id='Winner' />
      <div id='Loser' />
      <a href='#' className='button' id='Button'>Random</a>
      <canvas ref={canvasRef} />
    </Container>
  );
};

export default GamePage;
