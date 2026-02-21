import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const TypingAnimation = ({ texts, className = "", speed = 100, deleteSpeed = 50, pauseTime = 2000 }) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const currentFullText = texts[currentTextIndex];
    
    const handleTyping = () => {
      if (isPaused) {
        setTimeout(() => {
          setIsPaused(false);
          setIsDeleting(true);
        }, pauseTime);
        return;
      }

      if (isDeleting) {
        if (currentText.length > 0) {
          setCurrentText(currentText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setCurrentTextIndex((prev) => (prev + 1) % texts.length);
        }
      } else {
        if (currentText.length < currentFullText.length) {
          setCurrentText(currentFullText.slice(0, currentText.length + 1));
        } else {
          setIsPaused(true);
        }
      }
    };

    const timeout = setTimeout(
      handleTyping,
      isDeleting ? deleteSpeed : speed
    );

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentTextIndex, texts, speed, deleteSpeed, pauseTime, isPaused]);

  return (
    <motion.span
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {currentText}
      <motion.span
        className="inline-block w-1 h-full bg-current ml-1"
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 1, repeat: Infinity }}
      />
    </motion.span>
  );
};

export default TypingAnimation;
