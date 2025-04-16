import React, { useEffect, useState, useRef } from 'react';

const AlertComponent = () => {
  const [message, setMessage] = useState('');
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [autoPlay, setAutoPlay] = useState(false);
  const utteranceRef = useRef(null);

  useEffect(() => {
    // Load available voices
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      setVoices(availableVoices);
      if (availableVoices.length > 0 && !selectedVoice) {
        setSelectedVoice(availableVoices[0]);
      }
    };

    loadVoices();

    // Some browsers (e.g., Chrome) load voices asynchronously
    window.speechSynthesis.onvoiceschanged = loadVoices;

    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  const speak = (text) => {
    if (!text.trim()) return;

    window.speechSynthesis.cancel(); // Stop any ongoing speech

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = selectedVoice;
    utterance.pitch = 1;
    utterance.rate = 1;
    utterance.lang = selectedVoice?.lang || 'en-US';

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    window.speechSynthesis.cancel();
  };

  const handleChange = (e) => {
    const text = e.target.value;
    setMessage(text);
    if (autoPlay) {
      speak(text);
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded shadow space-y-4">
      <h2 className="text-xl font-bold">🔊 Text-to-Speech Alert</h2>

      {/* Input */}
      <input
        type="text"
        value={message}
        onChange={handleChange}
        placeholder="Type your alert message"
        className="w-full p-2 border border-gray-300 rounded"
      />

      {/* Voice selector */}
      <div className="space-y-1">
        <label className="text-sm font-medium">Choose Voice:</label>
        <select
          value={selectedVoice?.name}
          onChange={(e) =>
            setSelectedVoice(voices.find((v) => v.name === e.target.value))
          }
          className="w-full p-2 border border-gray-300 rounded"
        >
          {voices.map((voice, index) => (
            <option key={index} value={voice.name}>
              {voice.name} ({voice.lang})
            </option>
          ))}
        </select>
      </div>

      {/* Auto play toggle */}
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={autoPlay}
          onChange={() => setAutoPlay(!autoPlay)}
        />
        <label className="text-sm">Auto-play on type</label>
      </div>

      {/* Controls */}
      <div className="flex justify-between space-x-3">
        <button
          onClick={() => speak(message)}
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition"
        >
          ▶️ Play
        </button>
        <button
          onClick={() => speak(message)}
          className="flex-1 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded transition"
        >
          🔁 Repeat
        </button>
        <button
          onClick={stopSpeaking}
          className="flex-1 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition"
        >
          ⏹ Stop
        </button>
      </div>
    </div>
  );
};

export default AlertComponent;
