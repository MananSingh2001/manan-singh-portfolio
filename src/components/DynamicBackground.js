import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from '../contexts/ThemeContext';

const DynamicBackground = () => {
  const { theme } = useTheme();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollProgress, setScrollProgress] = useState({ hero: 0, skills: 0, impact: 0, summary: 0, experience: 0 });
  const [particles, setParticles] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef(null);
  const animationRef = useRef(null);

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Vibrant theme-based color schemes
  const getThemeColors = () => {
    if (theme === 'dark') {
      return {
        primary: 'from-violet-600/40 via-fuchsia-500/30',
        secondary: 'from-cyan-500/35 via-blue-400/25',
        tertiary: 'from-pink-500/30 via-rose-400/20',
        background: 'from-gray-900 via-purple-900/20 to-violet-950'
      };
    } else {
      return {
        primary: 'from-violet-500/30 via-fuchsia-400/25',
        secondary: 'from-cyan-400/35 via-blue-300/25',
        tertiary: 'from-pink-400/30 via-rose-300/20',
        background: 'from-white via-purple-50 to-pink-50'
      };
    }
  };

  // Generate fewer particles for mobile
  useEffect(() => {
    const particleCount = isMobile ? 5 : 20;
    const newParticles = Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * (isMobile ? 2 : 4) + (isMobile ? 1 : 2),
      speedX: (Math.random() - 0.5) * (isMobile ? 0.2 : 0.5),
      speedY: (Math.random() - 0.5) * (isMobile ? 0.2 : 0.5),
      opacity: Math.random() * (isMobile ? 0.3 : 0.5) + (isMobile ? 0.1 : 0.2)
    }));
    setParticles(newParticles);
  }, [theme, isMobile]);

  // Animate particles with lower frequency on mobile
  useEffect(() => {
    if (isMobile) return; // Skip particle animation on mobile

    const animateParticles = () => {
      setParticles(prevParticles => 
        prevParticles.map(particle => ({
          ...particle,
          x: (particle.x + particle.speedX + 100) % 100,
          y: (particle.y + particle.speedY + 100) % 100
        }))
      );
      animationRef.current = requestAnimationFrame(animateParticles);
    };
    
    animationRef.current = requestAnimationFrame(animateParticles);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isMobile]);

  useEffect(() => {
    if (isMobile) return; // Skip mouse tracking on mobile

    const handleMouseMove = (e) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        setMousePosition({ x, y });
      }
    };

    // Highly throttled scroll handler for better performance
    let lastScrollTime = 0;
    const handleScroll = () => {
      const now = Date.now();
      if (now - lastScrollTime < 200) return; // Increased throttle for all devices
      lastScrollTime = now;

      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // Simplified scroll progress calculation
      const heroProgress = Math.max(0, Math.min(1, (windowHeight - scrollY) / windowHeight));
      const skillsProgress = Math.max(0, Math.min(1, (windowHeight * 2 - scrollY) / windowHeight));
      
      setScrollProgress({ 
        hero: heroProgress, 
        skills: skillsProgress,
        impact: 0,
        summary: 0,
        experience: 0
      });
    };

    const container = containerRef.current;
    if (container) {
      if (!isMobile) {
        container.addEventListener('mousemove', handleMouseMove, { passive: true });
      }
      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => {
        if (!isMobile) {
          container.removeEventListener('mousemove', handleMouseMove);
        }
        window.removeEventListener('scroll', handleScroll);
      };
    }
  }, [theme, isMobile]);

  const colors = getThemeColors();

  // Simplified mobile version
  if (isMobile) {
    return (
      <div 
        ref={containerRef}
        className="fixed inset-0 pointer-events-none overflow-hidden"
        style={{ zIndex: -1 }}
      >
        {/* Simplified particles for mobile */}
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute rounded-full bg-white/10 dark:bg-white/5 blur-sm"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              opacity: particle.opacity,
              transform: 'translate(-50%, -50%)',
            }}
          />
        ))}
        
        {/* Single static gradient orb for mobile */}
        <div 
          className={`absolute w-[300px] h-[300px] rounded-full bg-gradient-to-r ${colors.primary} blur-3xl`}
          style={{
            left: '50%',
            top: '30%',
            transform: 'translate(-50%, -50%)',
            opacity: 0.3,
          }}
        />
        
        {/* Simple background gradient */}
        <div className={`absolute inset-0 bg-gradient-to-br ${colors.background}`} />
      </div>
    );
  }

  // Full desktop version (simplified for performance)
  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: -1 }}
    >
      {/* Reduced floating particles */}
      {particles.slice(0, 10).map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full bg-white/20 dark:bg-white/10 blur-sm"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            opacity: particle.opacity,
            transform: 'translate(-50%, -50%)',
            transition: 'none'
          }}
        />
      ))}
      
      {/* Simplified gradient orbs */}
      <div 
        className={`absolute w-[400px] h-[400px] rounded-full bg-gradient-to-r ${colors.primary} blur-3xl transition-all duration-1000 ease-out`}
        style={{
          left: `${mousePosition.x}%`,
          top: `${mousePosition.y}%`,
          transform: `translate(-50%, -50%) scale(${1.2 + scrollProgress.hero * 0.3})`,
          opacity: 0.4 + scrollProgress.hero * 0.2,
        }}
      />
      
      {/* Secondary orb */}
      <div 
        className={`absolute w-[300px] h-[300px] rounded-full bg-gradient-to-br ${colors.secondary} blur-3xl transition-all duration-1200 ease-out`}
        style={{
          left: `${100 - mousePosition.x * 0.7}%`,
          top: `${100 - mousePosition.y * 0.7}%`,
          transform: `translate(-50%, -50%) scale(${1.1 + scrollProgress.skills * 0.3})`,
          opacity: 0.3 + scrollProgress.skills * 0.3,
        }}
      />
      
      {/* Simple background gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${colors.background} transition-all duration-2000`} />
      
      {/* Additional overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent dark:from-black/20" />
    </div>
  );
};

export default DynamicBackground;
