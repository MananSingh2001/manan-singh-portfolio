import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from '../contexts/ThemeContext';

const DynamicBackground = () => {
  const { theme } = useTheme();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollProgress, setScrollProgress] = useState({ hero: 0, skills: 0, impact: 0, summary: 0, experience: 0 });
  const [particles, setParticles] = useState([]);
  const containerRef = useRef(null);
  const animationRef = useRef(null);

  // Vibrant theme-based color schemes
  const getThemeColors = () => {
    if (theme === 'dark') {
      return {
        primary: 'from-violet-600/40 via-fuchsia-500/30',
        secondary: 'from-cyan-500/35 via-blue-400/25',
        tertiary: 'from-pink-500/30 via-rose-400/20',
        quaternary: 'from-amber-500/25 via-orange-400/20',
        quinary: 'from-emerald-500/20 via-teal-400/15',
        background: 'from-gray-900 via-purple-900/20 to-violet-950'
      };
    } else {
      return {
        primary: 'from-violet-500/30 via-fuchsia-400/25',
        secondary: 'from-cyan-400/35 via-blue-300/25',
        tertiary: 'from-pink-400/30 via-rose-300/20',
        quaternary: 'from-amber-400/25 via-orange-300/20',
        quinary: 'from-emerald-400/20 via-teal-300/15',
        background: 'from-white via-purple-50 to-pink-50'
      };
    }
  };

  // Generate floating particles
  useEffect(() => {
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      speedX: (Math.random() - 0.5) * 0.5,
      speedY: (Math.random() - 0.5) * 0.5,
      opacity: Math.random() * 0.5 + 0.2
    }));
    setParticles(newParticles);
  }, [theme]);

  // Animate particles
  useEffect(() => {
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
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        setMousePosition({ x, y });
      }
    };

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // Calculate which section is in view
      const sections = ['hero', 'skills', 'impact', 'summary', 'experience'];
      const newProgress = {};
      
      sections.forEach((sectionId, index) => {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          const elementTop = rect.top + scrollY;
          const progress = Math.min(1, Math.max(0, (windowHeight - elementTop) / windowHeight));
          newProgress[sectionId] = progress;
        }
      });
      
      setScrollProgress(newProgress);
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('scroll', handleScroll);
      return () => {
        container.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('scroll', handleScroll);
      };
    }
  }, [theme]); // Re-run effect when theme changes

  const colors = getThemeColors();

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: -1 }}
    >
      {/* Floating particles */}
      {particles.map((particle) => (
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
      
      {/* Vibrant gradient orbs with enhanced interactivity */}
      <div 
        className={`absolute w-[500px] h-[500px] rounded-full bg-gradient-to-r ${colors.primary} blur-3xl transition-all duration-1000 ease-out`}
        style={{
          left: `${mousePosition.x}%`,
          top: `${mousePosition.y}%`,
          transform: `translate(-50%, -50%) scale(${1.2 + scrollProgress.hero * 0.5})`,
          opacity: 0.4 + scrollProgress.hero * 0.3,
          filter: `blur(${60 - scrollProgress.hero * 20}px)`
        }}
      />
      
      {/* Secondary orb with counter-movement */}
      <div 
        className={`absolute w-[400px] h-[400px] rounded-full bg-gradient-to-br ${colors.secondary} blur-3xl transition-all duration-1200 ease-out`}
        style={{
          left: `${100 - mousePosition.x * 0.7}%`,
          top: `${100 - mousePosition.y * 0.7}%`,
          transform: `translate(-50%, -50%) scale(${1.1 + scrollProgress.skills * 0.4})`,
          opacity: 0.3 + scrollProgress.skills * 0.4,
          filter: `blur(${50 - scrollProgress.skills * 15}px)`
        }}
      />
      
      {/* Tertiary orb with orbital movement */}
      <div 
        className={`absolute w-[350px] h-[350px] rounded-full bg-gradient-to-tr ${colors.tertiary} blur-2xl transition-all duration-1400 ease-out`}
        style={{
          left: `${50 + Math.sin(Date.now() * 0.0001) * 20 + mousePosition.x * 0.3}%`,
          top: `${50 + Math.cos(Date.now() * 0.0001) * 20 + mousePosition.y * 0.3}%`,
          transform: `translate(-50%, -50%) scale(${1 + scrollProgress.impact * 0.6})`,
          opacity: 0.25 + scrollProgress.impact * 0.5,
          filter: `blur(${45 - scrollProgress.impact * 10}px)`
        }}
      />
      
      {/* Quaternary orb for summary section */}
      <div 
        className={`absolute w-[300px] h-[300px] rounded-full bg-gradient-to-bl ${colors.quaternary} blur-2xl transition-all duration-1600 ease-out`}
        style={{
          left: `${75 - mousePosition.x * 0.2}%`,
          top: `${25 + mousePosition.y * 0.2}%`,
          transform: `translate(-50%, -50%) scale(${0.9 + scrollProgress.summary * 0.7})`,
          opacity: 0.2 + scrollProgress.summary * 0.6,
          filter: `blur(${40 - scrollProgress.summary * 8}px)`
        }}
      />
      
      {/* Quinary orb for experience section */}
      <div 
        className={`absolute w-[250px] h-[250px] rounded-full bg-gradient-to-tl ${colors.quinary} blur-xl transition-all duration-1800 ease-out`}
        style={{
          left: `${25 + mousePosition.x * 0.1}%`,
          top: `${75 - mousePosition.y * 0.1}%`,
          transform: `translate(-50%, -50%) scale(${0.8 + scrollProgress.experience * 0.8})`,
          opacity: 0.15 + scrollProgress.experience * 0.7,
          filter: `blur(${35 - scrollProgress.experience * 5}px)`
        }}
      />
      
      {/* Enhanced theme-aware background gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${colors.background} transition-all duration-2000`} />
      
      {/* Additional overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent dark:from-black/20" />
    </div>
  );
};

export default DynamicBackground;
