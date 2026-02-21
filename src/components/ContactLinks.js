import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Linkedin, Github } from 'lucide-react';

const ContactLinks = () => {
  const links = [
    {
      icon: Mail,
      href: 'mailto:manansingh11103@gmail.com',
      label: 'Email',
      gradient: 'from-red-500 to-pink-500'
    },
    {
      icon: Linkedin,
      href: 'https://www.linkedin.com/in/manan-singh-sde/',
      label: 'LinkedIn',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Github,
      href: 'https://github.com/MananSingh2001',
      label: 'GitHub',
      gradient: 'from-gray-600 to-gray-800'
    }
  ];

  return (
    <div className="flex gap-4 justify-center">
      {links.map((link, index) => {
        const Icon = link.icon;
        return (
          <motion.a
            key={index}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ 
              duration: 0.3, 
              delay: index * 0.1,
              type: "spring",
              stiffness: 200
            }}
            whileHover={{ 
              scale: 1.15,
              rotate: [0, -5, 5, 0],
              transition: { duration: 0.3 }
            }}
            whileTap={{ scale: 0.9 }}
            className={`relative p-4 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 group overflow-hidden`}
            aria-label={link.label}
          >
            {/* Gradient background on hover */}
            <div className={`absolute inset-0 bg-gradient-to-r ${link.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-300`} />
            
            {/* Icon */}
            <Icon 
              size={24} 
              className="relative z-10 text-black dark:text-white group-hover:text-white transition-colors duration-300" 
            />
            
            {/* Glow effect */}
            <div className={`absolute inset-0 bg-gradient-to-r ${link.gradient} opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-300 rounded-full`} />
          </motion.a>
        );
      })}
    </div>
  );
};

export default ContactLinks;
