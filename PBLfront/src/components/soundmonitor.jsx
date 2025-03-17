import React, { useEffect, useState } from 'react';
import { Classcomp } from './Classcomp';

const SoundMonitor = () => {
  const [decibels, setDecibels] = useState(0);

  useEffect(() => {
    let audioContext, analyser, microphone, scriptProcessor;

    const getMicrophoneAccess = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        analyser = audioContext.createAnalyser();
        microphone = audioContext.createMediaStreamSource(stream);
        scriptProcessor = audioContext.createScriptProcessor(2048, 1, 1);

        analyser.smoothingTimeConstant = 0.8;
        analyser.fftSize = 1024;

        microphone.connect(analyser);
        analyser.connect(scriptProcessor);
        scriptProcessor.connect(audioContext.destination);

        scriptProcessor.onaudioprocess = () => {
          const array = new Uint8Array(analyser.frequencyBinCount);
          analyser.getByteFrequencyData(array);

          // RMS Calculation
          const sumSquares = array.reduce((acc, val) => acc + val * val, 0);
          const rms = Math.sqrt(sumSquares / array.length);

          // Convert to Decibels safely
          const decibels = Math.max(-100, 20 * Math.log10(rms || 0.0001));
          setDecibels(decibels.toFixed(2));
        };
      } catch (err) {
        console.error('Microphone access denied:', err);
      }
    };

    getMicrophoneAccess();

    return () => {
      if (audioContext) audioContext.close();
    };
  }, []);

  return (
    <div>
      <h2>Current Sound Level: {decibels} dB</h2>
      <Classcomp c="Sound Level" x={Math.max(0, (decibels + 100) / 2)} />
    </div>
  );
};

export default SoundMonitor;
