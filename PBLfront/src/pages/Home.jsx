import React from 'react';
import reactLogo from '../assets/react.svg';
import { useNavigate } from 'react-router-dom';
import SoundWave from '../components/SoundWave';

function Home() {
  const navigate = useNavigate();

  const changeLogin = () => {
    navigate('/signin');
  };

  const changeSignup = () => {
    navigate('/signup');
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4 relative">
      <SoundWave />
      {/* Sound wave decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="sound-wave-top"></div>
        <div className="sound-wave-bottom"></div>
        <div className="absolute top-0 left-0 w-16 h-16 m-4">
          <SoundIcon />
        </div>
        <div className="absolute bottom-0 right-0 w-16 h-16 m-4 transform rotate-180">
          <SoundIcon />
        </div>
      </div>

      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-3xl relative z-10 border border-indigo-100">
        {/* header */}
        <header className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <img src={reactLogo} alt="" className="h-10 w-10 rounded-full" />
            <h1 className="text-2xl text-indigo-600 font-bold">Hello ADMIN</h1>
          </div>
          <div className="flex items-center space-x-3">
            <button onClick={changeLogin} className="bg-transparent px-4 py-2 border border-indigo-600 rounded hover:bg-indigo-100 transition-all">Log In</button>
            <button onClick={changeSignup} className="bg-transparent px-4 py-2 border border-indigo-600 rounded hover:bg-indigo-100 transition-all">Sign Up</button>
          </div>
        </header>

        {/* middle section */}
        <div className="space-y-10">
          <div className="flex items-center justify-between">
            <div className="text-gray-800 text-lg">SE-A</div>
            <button className="bg-transparent px-4 py-2 border border-red-600 rounded hover:bg-red-100 transition-all" onClick={() => { navigate('/dashboard'); }}>Monitor</button>
          </div>
          <div className="flex items-center justify-between">
            <div className="text-gray-800 text-lg">SE-A</div>
            <button className="bg-transparent px-4 py-2 border border-red-600 rounded hover:bg-red-100 transition-all" onClick={() => { navigate('/dashboard'); }}>Monitor</button>
          </div>
          <div className="flex items-center justify-between">
            <div className="text-gray-800 text-lg">SE-A</div>
            <button className="bg-transparent px-4 py-2 border border-red-600 rounded hover:bg-red-100 transition-all" onClick={() => { navigate('/dashboard'); }}>Monitor</button>
          </div>
        </div>

        {/* footer */}
        <footer className="mt-10 text-center text-gray-500">
          Footer Content
        </footer>
      </div>

      <style jsx>{`
        .sound-wave-top, .sound-wave-bottom {
          position: absolute;
          width: 100%;
          height: 120px;
          background: linear-gradient(90deg, rgba(79, 70, 229, 0.1) 0%, rgba(79, 70, 229, 0.05) 100%);
          mask-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 1200 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0,36c200,0,200,48,400,48c200,0,200-48,400-48c200,0,200,48,400,48v36H0V36z' fill='%23fff'/%3E%3C/svg%3E");
          mask-size: 100% 100%;
        }

        .sound-wave-top {
          top: 0;
        }

        .sound-wave-bottom {
          bottom: 0;
          transform: rotate(180deg);
        }
      `}</style>
    </div>
  );
}

// Sound icon for corners
const SoundIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-indigo-200">
    <path d="M12 6L8 10H4V14H8L12 18V6Z" fill="currentColor" />
    <path d="M15.54 8.46C16.4774 9.39764 17.0039 10.6692 17.0039 11.995C17.0039 13.3208 16.4774 14.5924 15.54 15.53" 
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M19.07 5.93C20.9447 7.80528 21.9979 10.3424 21.9979 13C21.9979 15.6576 20.9447 18.1947 19.07 20.07" 
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default Home;
