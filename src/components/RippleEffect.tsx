import { useEffect, useRef } from 'react';

export const RippleEffect = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const createRipple = (x: number, y: number) => {
      const ripple = document.createElement('div');
      ripple.className = 'ripple';
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      
      container.appendChild(ripple);
      
      // Remove ripple after animation
      setTimeout(() => {
        if (container.contains(ripple)) {
          container.removeChild(ripple);
        }
      }, 600);
    };

    const handleMouseMove = (e: MouseEvent) => {
      // Only create ripples occasionally to avoid performance issues
      if (Math.random() > 0.95) {
        createRipple(e.clientX, e.clientY);
      }
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-10 ripple-container"
    />
  );
};