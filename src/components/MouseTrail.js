import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const MouseTrail = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [trails, setTrails] = useState([]);
  const animationFrameRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = e.clientX;
      const y = e.clientY;
      
      setMousePosition({ x, y });
      
      // Add new trail point
      const newTrail = {
        id: Date.now() + Math.random(),
        x,
        y,
        size: Math.random() * 20 + 10,
        opacity: 0.6
      };
      
      setTrails(prevTrails => [...prevTrails.slice(-8), newTrail]);
    };

    const animateTrails = () => {
      setTrails(prevTrails => 
        prevTrails.map(trail => ({
          ...trail,
          opacity: trail.opacity - 0.02,
          size: trail.size * 0.98
        })).filter(trail => trail.opacity > 0)
      );
      
      animationFrameRef.current = requestAnimationFrame(animateTrails);
    };

    // Start animation loop
    animationFrameRef.current = requestAnimationFrame(animateTrails);

    // Add event listener with error handling
    try {
      window.addEventListener('mousemove', handleMouseMove, { passive: true });
    } catch (error) {
      console.warn('Failed to add mouse move listener:', error);
    }
    
    return () => {
      try {
        window.removeEventListener('mousemove', handleMouseMove);
      } catch (error) {
        console.warn('Failed to remove mouse move listener:', error);
      }
      
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    };
  }, []);

  return (
    <>
      {/* Main cursor follower */}
      <motion.div
        className="fixed w-6 h-6 pointer-events-none z-50 mix-blend-difference"
        animate={{
          x: mousePosition.x - 12,
          y: mousePosition.y - 12
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
          mass: 0.5
        }}
      >
        <div className="w-full h-full bg-white rounded-full" />
      </motion.div>

      {/* Trail particles */}
      {trails.map((trail, index) => (
        <motion.div
          key={trail.id}
          className="fixed pointer-events-none z-40"
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            x: trail.x - trail.size / 2,
            y: trail.y - trail.size / 2,
            scale: 1,
            opacity: trail.opacity
          }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 20
          }}
        >
          <div 
            className="rounded-full bg-gradient-to-r from-violet-500/30 via-fuchsia-500/30 to-cyan-500/30 blur-sm"
            style={{
              width: `${trail.size}px`,
              height: `${trail.size}px`
            }}
          />
        </motion.div>
      ))}

      {/* Glow effect */}
      <motion.div
        className="fixed w-32 h-32 pointer-events-none z-30"
        animate={{
          x: mousePosition.x - 64,
          y: mousePosition.y - 64
        }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 20,
          mass: 1
        }}
      >
        <div className="w-full h-full bg-gradient-to-r from-violet-500/10 via-fuchsia-500/10 to-cyan-500/10 rounded-full blur-2xl" />
      </motion.div>
    </>
  );
};

export default MouseTrail;
