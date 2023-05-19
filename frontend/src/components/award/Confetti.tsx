'use client';

import { useEffect, useRef } from 'react';
import { confetti, ConfettiOptions } from 'tsparticles-confetti';

const duration = 10 * 1000;

function randomInRange(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export default function Confetti() {
  const animationEnd = Date.now() + duration;
  const skewRef = useRef(1);
  const audio = new Audio('/audio/yeah.mp3');

  useEffect(() => {
    run();
    audio?.play()
  }, []);

  const run = () => {
    const frame = () => {
      const timeLeft = animationEnd - Date.now();
      const ticks = Math.max(200, 500 * (timeLeft / duration));

      skewRef.current = Math.max(0.8, skewRef.current - 0.001);

      const options: ConfettiOptions = {
        particleCount: 1,
        startVelocity: 0,
        ticks: ticks,
        origin: {
          x: Math.random(),
          // since particles fall down, skew start toward the top
          y: Math.random() * skewRef.current - 0.2,
        },
        colors: ['#E70006', '#FDA620', '#009FC5', '#EF7A9B', '#957ACB', '#008737'],
        shapes: ['square'],
        gravity: randomInRange(0.4, 0.6),
        scalar: 2,
        drift: randomInRange(-0.4, 0.4),
      };

      confetti(options);

      if (timeLeft > 0) {
        requestAnimationFrame(frame);
      }
    };

    frame();
  };

  return <div></div>;
}
