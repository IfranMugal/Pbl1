import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SoundMonitor() {
  const [decibels, setDecibels] = useState(0);
  const [displayDecibels, setDisplayDecibels] = useState(0);
  const [peakDecibels, setPeakDecibels] = useState(0);
  const [isMonitoring, setIsMonitoring] = useState(true);
  const [alertSent, setAlertSent] = useState(false);

  const navigate = useNavigate();
  
  // Refs for audio handling
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const microphoneRef = useRef(null);
  const streamRef = useRef(null);
  const animationFrameRef = useRef(null);
  
  // Improved rate limiting and smoothing
  const lastUpdateTimeRef = useRef(0);
  const bufferValuesRef = useRef([]);
  const UPDATE_INTERVAL = 200; // Update display every 200ms
  const bufferSizeRef = useRef(10); // Increased buffer size for better averaging
  
  // Improved peak handling
  const peakHoldTimeRef = useRef(3000); // Hold peaks for 3 seconds
  const peakDecayRateRef = useRef(3); // dB per second decay rate
  const lastPeakTimeRef = useRef(0);
  const lastPeakValueRef = useRef(0);
  
  // Using the NEW threshold values as requested
  const QUIET_LEVEL = 10;
  const MEDIUM_LEVEL = 15;
  const NOISY_LEVEL = 20;
  const VERY_NOISY_LEVEL = 30;
  
  // Calibration constants from OLD code
  const REFERENCE_LEVEL = -30; // Reference level for 0dB
  const MAX_DISPLAY_LEVEL = 40; // Maximum level to display on the scale

  useEffect(() => {
    if (isMonitoring) {
      startMonitoring();
    } else {
      stopMonitoring();
    }

    return () => {
      stopMonitoring();
    };
  }, [isMonitoring]);

  // Separate effect for updating the display at a controlled rate
  useEffect(() => {
    const displayUpdateInterval = setInterval(() => {
      if (bufferValuesRef.current.length > 0) {
        // Sort values and take the median to reject outliers
        const sortedValues = [...bufferValuesRef.current].sort((a, b) => a - b);
        const medianIndex = Math.floor(sortedValues.length / 2);
        const medianValue = sortedValues[medianIndex];
        
        // Apply asymmetric smoothing for display (fast attack, slow release)
        setDisplayDecibels(prev => {
          // Fast rise (0.7 weight to new value if increasing)
          if (medianValue > prev) {
            return parseFloat((0.3 * prev + 0.7 * medianValue).toFixed(1));
          } 
          // Slow fall (0.1 weight to new value if decreasing)
          else {
            return parseFloat((0.9 * prev + 0.1 * medianValue).toFixed(1));
          }
        });
        
        // Update peak with decay
        updatePeakWithDecay();
        
        // Clear buffer after using its values
        bufferValuesRef.current = [];
      }
    }, UPDATE_INTERVAL);

    return () => clearInterval(displayUpdateInterval);
  }, []);
  
  // Function to update peak with appropriate decay
  const updatePeakWithDecay = () => {
    const now = Date.now();
    const timeSincePeak = now - lastPeakTimeRef.current;
    
    // Current display value
    const currentValue = displayDecibels;
    
    // Calculate decayed peak value
    const decayAmount = (timeSincePeak / 1000) * peakDecayRateRef.current;
    const decayedPeakValue = Math.max(0, lastPeakValueRef.current - decayAmount);
    
    if (currentValue > decayedPeakValue) {
      // New peak found
      setPeakDecibels(currentValue);
      lastPeakTimeRef.current = now;
      lastPeakValueRef.current = currentValue;
    } else if (timeSincePeak < peakHoldTimeRef.current) {
      // Still in hold time, maintain peak
      setPeakDecibels(lastPeakValueRef.current);
    } else {
      // Apply decay
      setPeakDecibels(decayedPeakValue);
    }
  };

  const startMonitoring = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: false
        } 
      });
  
      streamRef.current = stream;
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
      analyserRef.current = audioContextRef.current.createAnalyser();
      microphoneRef.current = audioContextRef.current.createMediaStreamSource(stream);
  
      // Improved analysis settings
      analyserRef.current.smoothingTimeConstant = 0.5; // Less smoothing for more accurate readings
      analyserRef.current.fftSize = 2048; // Larger FFT for better frequency resolution
  
      microphoneRef.current.connect(analyserRef.current);
  
      const processAudio = () => {
        if (!analyserRef.current) return;
      
        // Use time-domain data instead of frequency for more accurate RMS
        const timeData = new Uint8Array(analyserRef.current.fftSize);
        analyserRef.current.getByteTimeDomainData(timeData);
      
        // Calculate true RMS from time-domain data
        let sumSquares = 0;
        for (let i = 0; i < timeData.length; i++) {
          // Convert to -1.0 to 1.0 range
          const amplitude = (timeData[i] - 128) / 128.0;
          sumSquares += amplitude * amplitude;
        }
        const rms = Math.sqrt(sumSquares / timeData.length);
        
        // USING THE OLD LOGIC: Calculate decibels from RMS
        // Convert RMS to decibels using the proper formula: 20 * log10(rms)
        // Add a small value to prevent log(0)
        const minRMS = 0.0001;  // Minimum RMS value to prevent log(0)
        let dbValue = 20 * Math.log10(Math.max(rms, minRMS));
        
        // Normalize to our display range (0-40dB)
        // Map from REFERENCE_LEVEL to 0 on our scale
        dbValue = Math.max(0, dbValue - REFERENCE_LEVEL);
        
        // Clamp to maximum display level
        dbValue = Math.min(MAX_DISPLAY_LEVEL, dbValue);
        
        // Format to one decimal place
        const finalDb = parseFloat(dbValue.toFixed(1));
        
        // Update current decibel value
        setDecibels(finalDb);
        
        // Add to buffer for smoothing
        bufferValuesRef.current.push(finalDb);
        
        // Keep buffer size managed
        if (bufferValuesRef.current.length > bufferSizeRef.current) {
          bufferValuesRef.current.shift();
        }
      
        animationFrameRef.current = requestAnimationFrame(processAudio);
      };
      
      processAudio();
    } catch (err) {
      console.error('Microphone access denied:', err);
      setIsMonitoring(false);
    }
  };

  const stopMonitoring = () => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    
    if (analyserRef.current) {
      analyserRef.current.disconnect();
      analyserRef.current = null;
    }
    
    if (microphoneRef.current) {
      microphoneRef.current.disconnect();
      microphoneRef.current = null;
    }
    
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
    
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
  };

  const resetPeak = () => {
    setPeakDecibels(0);
    lastPeakTimeRef.current = Date.now();
    lastPeakValueRef.current = 0;
  };

  const toggleMonitoring = () => {
    setIsMonitoring(!isMonitoring);
  };

  const getSoundDescription = () => {
    if (displayDecibels >= VERY_NOISY_LEVEL) return "Very Noisy";
    if (displayDecibels >= NOISY_LEVEL) return "Noisy";
    if (displayDecibels >= MEDIUM_LEVEL) return "Medium";
    if (displayDecibels >= QUIET_LEVEL) return "Quiet";
    return "Very Quiet";
  };

  const getBarColor = () => {
    if (displayDecibels >= VERY_NOISY_LEVEL) return "bg-red-600";
    if (displayDecibels >= NOISY_LEVEL) return "bg-red-500";
    if (displayDecibels >= MEDIUM_LEVEL) return "bg-yellow-500";
    return "bg-green-500";
  };

  const getClassIcon = () => {
    const firstLetter = "S";
    return (
      <div className="rounded-full h-12 w-12 bg-blue-600 flex justify-center items-center">
        <div className="text-xl font-bold text-white">{firstLetter}</div>
      </div>
    );
  };

  const sendAlert = () => {
    console.log(`Alert has been sent to class`);
    setAlertSent(true);
    navigate("/alert");
    
    // Reset alert status after 3 seconds
    setTimeout(() => {
      setAlertSent(false);
    }, 3000);
  };

  // Calculate percentage for the sound bar with the new scale
  const getSoundBarPercentage = () => {
    // Map 0-40dB to 0-100%
    return Math.min(100, (displayDecibels / MAX_DISPLAY_LEVEL) * 100);
  };

  return (
    <div className="max-w-xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Header Bar */}
      <div className="bg-white shadow px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          {getClassIcon()}
          <div className="flex flex-col">
            <h2 className="text-lg font-semibold text-gray-800">Sound Monitor</h2>
            <p className="text-sm text-gray-500">Classroom Noise Level</p>
          </div>
        </div>
        <button 
          onClick={sendAlert}
          disabled={alertSent}
          className={`px-4 py-2 rounded-md font-medium text-white transition-colors duration-200 ${
            alertSent 
              ? "bg-gray-400 cursor-not-allowed" 
              : "bg-red-500 hover:bg-red-600"
          }`}
        >
          {alertSent ? "Alert Sent" : "Alert the Class"}
        </button>
      </div>

      {/* Sound Level Display */}
      <div className="px-6 py-4">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center space-x-4">
            <div>
              <span className="text-3xl font-bold text-gray-800">{displayDecibels}</span>
              <span className="ml-1 text-xl text-gray-600">dB</span>
            </div>
            
            {/* Peak level indicator */}
            <div className="flex items-center space-x-2">
              <div className="bg-gray-100 px-3 py-1 rounded-lg flex items-center">
                <div className="flex flex-col">
                  <span className="text-xs text-gray-500">Peak</span>
                  <span className="font-bold text-gray-800">{peakDecibels.toFixed(1)} dB</span>
                </div>
                <button 
                  onClick={resetPeak} 
                  className="ml-2 text-xs bg-gray-200 hover:bg-gray-300 rounded-full h-5 w-5 flex items-center justify-center"
                  title="Reset peak"
                >
                  ↺
                </button>
              </div>
            </div>
          </div>
          
          <div className={`px-3 py-1 rounded-full font-medium transition-colors duration-300 ${
            displayDecibels >= VERY_NOISY_LEVEL 
              ? "bg-red-100 text-red-800" 
              : displayDecibels >= NOISY_LEVEL 
                ? "bg-red-100 text-red-700" 
                : displayDecibels >= MEDIUM_LEVEL 
                  ? "bg-yellow-100 text-yellow-800" 
                  : "bg-green-100 text-green-800"
          }`}>
            {getSoundDescription()}
          </div>
        </div>

        {/* Sound Bar - using updated scale */}
        <div className="w-full h-6 bg-gray-200 rounded-full overflow-hidden">
          <div
            className={`h-full ${getBarColor()} transition-all duration-300 rounded-full`}
            style={{ width: `${getSoundBarPercentage()}%` }}
          ></div>
        </div>
        
        {/* Sound Level Markers - adjusted to new scale */}
        <div className="flex justify-between mt-1 text-xs text-gray-500">
          <span>0 dB</span>
          <span>10 dB</span>
          <span>20 dB</span>
          <span>30 dB</span>
          <span>40 dB</span>
        </div>
      </div>

      {/* Footer with Legend and Controls - using NEW thresholds */}
      <div className="bg-gray-50 px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex flex-col space-y-1 text-sm text-gray-600">
            <div className="flex items-center">
              <span className="inline-block w-3 h-3 bg-green-500 rounded-full mr-2"></span>
              <span>0-10 dB: Very Quiet</span>
            </div>
            <div className="flex items-center">
              <span className="inline-block w-3 h-3 bg-green-500 rounded-full mr-2"></span>
              <span>10-15 dB: Quiet</span>
            </div>
            <div className="flex items-center">
              <span className="inline-block w-3 h-3 bg-yellow-500 rounded-full mr-2"></span>
              <span>15-20 dB: Medium</span>
            </div>
            <div className="flex items-center">
              <span className="inline-block w-3 h-3 bg-red-500 rounded-full mr-2"></span>
              <span>20-30 dB: Noisy</span>
            </div>
            <div className="flex items-center">
              <span className="inline-block w-3 h-3 bg-red-600 rounded-full mr-2"></span>
              <span>30+ dB: Very Noisy</span>
            </div>
          </div>

          <button
            onClick={toggleMonitoring}
            className={`px-4 py-2 rounded-md font-medium ${
              isMonitoring 
                ? "bg-gray-700 hover:bg-gray-800 text-white" 
                : "bg-blue-500 hover:bg-blue-600 text-white"
            }`}
          >
            {isMonitoring ? "Pause Monitoring" : "Resume Monitoring"}
          </button>
        </div>
      </div>
    </div>
  );
}