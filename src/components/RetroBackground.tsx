import { useEffect, useRef } from 'react';
import type { TabKey } from './Navbar';

interface RetroBackgroundProps {
  active: TabKey;
}

type Star = { x: number; y: number; z: number; tw: number };

// A lightweight retro starfield + tiny sprite that subtly reacts to tab changes
export default function RetroBackground({ active }: RetroBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animRef = useRef<number | null>(null);
  const starsRef = useRef<Star[]>([]);
  const tRef = useRef(0);
  // removed sprite state to keep background subtle and professional

  // Sprite reactions removed; no per-tab targets needed

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;

    const onResize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.floor(canvas.clientWidth * dpr);
      canvas.height = Math.floor(canvas.clientHeight * dpr);
    };
    onResize();
    window.addEventListener('resize', onResize);

    // init stars
    const count = 160;
    starsRef.current = new Array(count).fill(0).map(() => ({
      x: Math.random(),
      y: Math.random(),
      z: 0.5 + Math.random() * 0.5,
      tw: Math.random() * Math.PI * 2,
    }));

    const loop = () => {
      const { width: W, height: H } = canvas;
      tRef.current += 0.016;

      // subtle gradient sky
      const g = ctx.createLinearGradient(0, 0, 0, H);
      g.addColorStop(0, '#0b1020');
      g.addColorStop(1, '#060913');
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, W, H);

      // stars
      for (const s of starsRef.current) {
        const px = s.x * W;
        const py = s.y * H;
        const size = (1.0 - s.z) * 1.8 + 0.6;
        const twinkle = 0.5 + 0.5 * Math.sin(tRef.current * (1.5 + s.z) + s.tw);
        ctx.globalAlpha = 0.6 + 0.4 * twinkle;
        ctx.fillStyle = s.z > 0.8 ? '#A3C9FF' : '#E9F1FF';
        ctx.fillRect(px | 0, py | 0, size | 0, size | 0);
        // parallax drift
        s.x -= 0.0002 * s.z;
        if (s.x < 0) s.x += 1;
      }
      ctx.globalAlpha = 1;

      // removed ground bar and alien sprite for a cleaner background

      animRef.current = requestAnimationFrame(loop);
    };

    animRef.current = requestAnimationFrame(loop);
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  // React when active tab changes: nudge sprite towards section
  // Tab changes no longer move a sprite; background remains subtle
  useEffect(() => { /* no-op to keep background subtle */ }, [active]);

  return (
    <canvas
      ref={canvasRef}
      className="retro-bg"
      aria-hidden
      style={{ position: 'fixed', inset: 0, zIndex: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
    />
  );
}
