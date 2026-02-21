import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const ParallaxSection = ({ children, speed = 0.5, className = "", offset = ["start end", "end start"] }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: offset
  });
  
  // Smooth spring animation for parallax
  const springConfig = { damping: 50, stiffness: 400 };
  const translateY = useSpring(useTransform(scrollYProgress, [0, 1], [0, speed * 100]), springConfig);
  const scale = useSpring(useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.05, 1]), springConfig);
  const opacity = useSpring(useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]), springConfig);

  return (
    <div ref={ref} className={`relative ${className}`}>
      <motion.div
        style={{
          translateY,
          scale,
          opacity
        }}
        className="w-full h-full"
      >
        {children}
      </motion.div>
    </div>
  );
};

export default ParallaxSection;
