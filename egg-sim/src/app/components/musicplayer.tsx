// app/components/MusicPlayer.tsx
"use client";

import { useEffect, useRef, useState } from "react";

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const startAudio = () => {
      if (audioRef.current && !started) {
        audioRef.current.volume = 0;
        audioRef.current.play().then(() => {
          setStarted(true);
        }).catch((err) => {
          console.warn("Playback blocked:", err);
        });
      }
    };

    window.addEventListener("click", startAudio);
    return () => window.removeEventListener("click", startAudio);
  }, [started]);

  return (
    <audio ref={audioRef} loop>
      <source src="/music/NewJeans - ETA.mp3" type="audio/mpeg" />
    </audio>
  );
}