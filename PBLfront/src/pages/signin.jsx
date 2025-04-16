import React, { useState } from "react";
import { useNavigate } from "react-router-dom";  // Import useNavigate

export function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();  // Initialize navigate

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Login successful!");
    navigate("/home");  // Navigate to /home after form submission
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
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
      
      {/* Main form */}
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md relative z-10 border border-indigo-100">
        <div className="flex justify-center mb-6">
          <WaveformLogo />
        </div>
        
        <h1 className="text-2xl font-bold mb-1 text-center text-gray-800">Welcome Back 👋</h1>
        <p className="text-gray-500 mb-6 text-center">Please login to your sound sensing account</p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
              required
            />
          </div>
          
          <div className="relative">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
              required
            />
          </div>
          
          <div className="flex justify-end">
            <a href="#" className="text-sm text-indigo-600 hover:text-indigo-800">Forgot password?</a>
          </div>
          
          <button 
            type="submit" 
            className="w-full py-3 px-4 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all flex items-center justify-center"
          >
            <span>Login</span>
            <span className="ml-2">
              <WaveformIcon />
            </span>
          </button>
        </form>
        
        <p className="mt-6 text-sm text-center text-gray-500">
          Don't have an account? <a href="#" className="text-indigo-600 font-medium hover:text-indigo-800">Create one</a>
        </p>
        
        <div className="mt-8 flex justify-center">
          <div className="sound-equalizer">
            <div className="bar bar1"></div>
            <div className="bar bar2"></div>
            <div className="bar bar3"></div>
            <div className="bar bar4"></div>
            <div className="bar bar5"></div>
          </div>
        </div>
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
        
        .sound-equalizer {
          display: flex;
          align-items: flex-end;
          height: 40px;
          gap: 4px;
        }
        
        .bar {
          width: 6px;
          background-color: #4f46e5;
          border-radius: 3px;
          animation: equalize 1.5s ease-in-out infinite;
        }
        
        .bar1 { height: 40%; animation-delay: 0.0s; }
        .bar2 { height: 70%; animation-delay: 0.1s; }
        .bar3 { height: 100%; animation-delay: 0.2s; }
        .bar4 { height: 60%; animation-delay: 0.3s; }
        .bar5 { height: 30%; animation-delay: 0.4s; }
        
        @keyframes equalize {
          0%, 100% { transform: scaleY(0.8); }
          50% { transform: scaleY(1.2); }
        }
      `}</style>
    </div>
  );
}

// Sound wave logo component
const WaveformLogo = () => (
  <div className="w-16 h-16 relative">
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="text-indigo-600">
      <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="2" />
      <path 
        d="M25,50 Q35,30 45,50 Q55,70 65,50 Q75,30 85,50" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="3" 
        strokeLinecap="round"
      />
    </svg>
  </div>
);

// Small waveform icon for button
const WaveformIcon = () => (
  <svg width="20" height="20" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="text-white">
    <path 
      d="M10,50 Q25,30 40,50 Q55,70 70,50 Q85,30 100,50" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="6" 
      strokeLinecap="round"
    />
  </svg>
);

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
