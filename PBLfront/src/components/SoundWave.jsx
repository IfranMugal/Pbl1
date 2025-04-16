import React from 'react';

const SoundWave = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <div className="sound-wave-top"></div>
      <div className="sound-wave-bottom"></div>
      <div className="absolute top-0 left-0 w-16 h-16 m-4">
        <SoundIcon />
      </div>
      <div className="absolute bottom-0 right-0 w-16 h-16 m-4 transform rotate-180">
        <SoundIcon />
      </div>
    </div>
  );
};

const SoundIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="text-indigo-700 w-full h-full" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 6L8 10H4V14H8L12 18V6Z" fill="currentColor" />
    <path d="M15.54 8.46C16.4774 9.39764 17.0039 10.6692 17.0039 11.995C17.0039 13.3208 16.4774 14.5924 15.54 15.53"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M19.07 5.93C20.9447 7.80528 21.9979 10.3424 21.9979 13C21.9979 15.6576 20.9447 18.1947 19.07 20.07"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default SoundWave;
