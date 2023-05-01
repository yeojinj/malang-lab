'use client';

import { useRef } from "react";
import { confetti, ConfettiOptions } from "tsparticles-confetti";

const duration = 15 * 1000;

function randomInRange(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

const Confetti: React.FC = () => {
  const animationEnd = Date.now() + duration;
  const skewRef = useRef(1);

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
        colors: ["#ffffff"],
        shapes: ["circle"],
        gravity: randomInRange(0.4, 0.6),
        scalar: randomInRange(0.4, 1),
        drift: randomInRange(-0.4, 0.4),
      };

      confetti(options);

      if (timeLeft > 0) {
        requestAnimationFrame(frame);
      }
    };

    frame();
  };

  return (
    <div>
      <button onClick={run}>Run Confetti</button>
    </div>
  );
};

export default Confetti;
