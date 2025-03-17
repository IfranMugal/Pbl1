import React, { useEffect, useState } from "react";

export function SoundBar({ x }) {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // Update the progress whenever x changes
        setProgress(Math.max(0, Math.min(100, x))); // Clamp between 0 and 100
    }, [x]);

    return (
        <div className="w-full h-4 bg-gray-300 rounded-full mt-4">
            <div
                className="h-full bg-blue-500 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
            ></div>
        </div>
    );
}


