import React, { useRef, useEffect, useState } from 'react';
import { Button, Container } from '@mui/material';
import { Game } from '../../components/Game/Game';
import './GamePage.scss'
import { getMouse } from '../../components/Game/mouse';

const GamePage: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const canvasCtxRef = React.useRef<CanvasRenderingContext2D | null>(null);

  useEffect(() => {
    let removeClick: () => void;
    let removeWheel: () => void;
    let removeMousedown: () => void;
    let removeMouseup: () => void;

    if (canvasRef.current) {
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
      const game = new Game({ ctx, canvas, mouse });
    }

    return () => {
      if (canvasRef.current) {
        canvasRef.current.removeEventListener('mousemove', removeClick);
        canvasRef.current.removeEventListener('wheel', removeWheel);
        canvasRef.current.removeEventListener('mousedown', removeMousedown);
        canvasRef.current.removeEventListener('mouseup', removeMouseup);
      }
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
