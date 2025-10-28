import { useEffect } from 'react';

export const HoverEffects = () => {
  useEffect(() => {
    // Add tilt effect to cards
    const cards = document.querySelectorAll('[data-tilt]');
    
    const handleMouseMove = (e: MouseEvent) => {
      const card = e.currentTarget as HTMLElement;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    };
    
    const handleMouseLeave = (e: MouseEvent) => {
      const card = e.currentTarget as HTMLElement;
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    };
    
    cards.forEach((card) => {
      card.addEventListener('mousemove', handleMouseMove as EventListener);
      card.addEventListener('mouseleave', handleMouseLeave as EventListener);
    });
    
    return () => {
      cards.forEach((card) => {
        card.removeEventListener('mousemove', handleMouseMove as EventListener);
        card.removeEventListener('mouseleave', handleMouseLeave as EventListener);
      });
    };
  }, []);

  useEffect(() => {
    // Add magnetic effect to buttons
    const buttons = document.querySelectorAll('[data-magnetic]');
    
    const handleMouseMove = (e: MouseEvent) => {
      const button = e.currentTarget as HTMLElement;
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      button.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    };
    
    const handleMouseLeave = (e: MouseEvent) => {
      const button = e.currentTarget as HTMLElement;
      button.style.transform = 'translate(0px, 0px)';
    };
    
    buttons.forEach((button) => {
      button.addEventListener('mousemove', handleMouseMove as EventListener);
      button.addEventListener('mouseleave', handleMouseLeave as EventListener);
    });
    
    return () => {
      buttons.forEach((button) => {
        button.removeEventListener('mousemove', handleMouseMove as EventListener);
        button.removeEventListener('mouseleave', handleMouseLeave as EventListener);
      });
    };
  }, []);

  return null; // This component doesn't render anything
};
