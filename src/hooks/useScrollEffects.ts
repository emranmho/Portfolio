import { useEffect } from 'react';

export const useScrollEffects = () => {
  useEffect(() => {
    const updateScrollPosition = () => {
      const scrollY = window.scrollY;
      document.documentElement.style.setProperty('--scroll-y', `${scrollY * 0.5}px`);
      
      // Update parallax elements
      const parallaxElements = document.querySelectorAll('.parallax-slow, .parallax-medium, .parallax-fast');
      parallaxElements.forEach((element) => {
        const speed = element.classList.contains('parallax-slow') ? 0.2 :
                     element.classList.contains('parallax-medium') ? 0.5 : 0.8;
        
        const yPos = -(scrollY * speed);
        (element as HTMLElement).style.transform = `translateY(${yPos}px)`;
      });
    };

    const handleScroll = () => {
      requestAnimationFrame(updateScrollPosition);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
};