import React from 'react';

const LoadingSpinner = ({ size = 'medium' }) => {
  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-8 h-8',
    large: 'w-12 h-12'
  };

  return (
    <div className="flex items-center justify-center">
      <div 
        className={`${sizeClasses[size]} border-4 border-black border-t-transparent animate-spin`}
        style={{
          borderTopColor: 'currentColor',
          borderRadius: '50%'
        }}
      />
    </div>
  );
};

export default LoadingSpinner;
