import { useEffect, useRef } from 'react';

interface IridescenceProps {
  color?: [number, number, number];
  mouseReact?: boolean;
  amplitude?: number;
  speed?: number;
}

export default function Iridescence({
  color = [1, 1, 1],
  mouseReact = false,
  amplitude = 0.1,
  speed = 1.0,
}: IridescenceProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Simple animated gradient background
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let time = 0;
    let animationId: number;

    const animate = () => {
      time += 0.01 * speed;

      const gradient = ctx.createLinearGradient(
        0,
        0,
        canvas.width,
        canvas.height
      );

      const r1 = Math.sin(time) * 0.5 + 0.5;
      const g1 = Math.sin(time + 2) * 0.5 + 0.5;
      const b1 = Math.sin(time + 4) * 0.5 + 0.5;

      const r2 = Math.sin(time + 1) * 0.5 + 0.5;
      const g2 = Math.sin(time + 3) * 0.5 + 0.5;
      const b2 = Math.sin(time + 5) * 0.5 + 0.5;

      gradient.addColorStop(0, `rgba(${r1 * color[0] * 255}, ${g1 * color[1] * 255}, ${b1 * color[2] * 255}, 0.3)`);
      gradient.addColorStop(1, `rgba(${r2 * color[0] * 255}, ${g2 * color[1] * 255}, ${b2 * color[2] * 255}, 0.3)`);

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      animationId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ pointerEvents: 'none' }}
    />
  );
}