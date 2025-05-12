# Pbl1
class disciplinary system


created a web application that access the surrounding soung level continiously and trigger an alert if sound surpasses a certain threshold (in decibles)

🎤 Purpose:
It monitors real-time microphone input, calculates the sound level in decibels (dB), and shows:

Live sound level

Peak decibel level

Noise classification (like Quiet, Noisy, etc.)

A visual bar and legend for sound levels

A button to alert the class if it's too noisy

🔍 How It Works:
Access Microphone:
Uses getUserMedia to get audio input.

Audio Analysis:
Uses AnalyserNode + time-domain data to calculate RMS → decibels.

Smoothing & Buffering:
Buffers values and smooths them to avoid flickering.

Peak Tracking:
Tracks the highest sound level, with a decay timer.

Thresholds:
Categorizes sound into:

Very Quiet (0-10 dB)

Quiet (10-15)

Medium (15-20)

Noisy (20-30)

Very Noisy (30+)

Alert Button:
Sends an alert (navigates to /alert) when clicked.

Pause/Resume:
Allows pausing/resuming monitoring.

