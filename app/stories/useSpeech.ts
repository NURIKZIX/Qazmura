"use client";

import { useState, useRef } from "react";

export const useSpeech = (
  text: string,
  onXpReward?: () => void
) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);

  const progressInterval =
    useRef<NodeJS.Timeout | null>(null);

  const rewardedRef = useRef(false);

  const audioRef =
    useRef<HTMLAudioElement | null>(null);

  const startProgress = () => {
    if (progressInterval.current) {
      clearInterval(progressInterval.current);
    }

    const estimatedDuration =
      text.length * 90;

    const startTime = Date.now();

    progressInterval.current = setInterval(() => {
      const elapsed =
        Date.now() - startTime;

      const currentProgress = Math.min(
        (elapsed / estimatedDuration) * 100,
        99
      );

      setProgress(currentProgress);
    }, 200);
  };

  const play = async () => {
    if (!text) return;

    try {
      setIsPlaying(true);
      setIsPaused(false);

      startProgress();

      if (
        onXpReward &&
        !rewardedRef.current
      ) {
        onXpReward();
        rewardedRef.current = true;
      }

      const res = await fetch("/api/tts", {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          text,
        }),
      });

      if (!res.ok) {
        throw new Error("TTS Error");
      }

      const blob = await res.blob();

      const url =
        URL.createObjectURL(blob);

      const audio = new Audio(url);

      audioRef.current = audio;

      audio.onended = () => {
        setIsPlaying(false);
        setIsPaused(false);
        setProgress(100);

        if (progressInterval.current) {
          clearInterval(
            progressInterval.current
          );
        }
      };

      await audio.play();
    } catch (error) {
      console.error(error);

      setIsPlaying(false);
      setIsPaused(false);
    }
  };

  const pause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPaused(true);
    }
  };

  const resume = async () => {
    if (audioRef.current) {
      await audioRef.current.play();
      setIsPaused(false);
    }
  };

  const stop = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    setIsPlaying(false);
    setIsPaused(false);
    setProgress(0);

    if (progressInterval.current) {
      clearInterval(
        progressInterval.current
      );
    }
  };

  const resetReward = () => {
    rewardedRef.current = false;
  };

  return {
    play,
    pause,
    resume,
    stop,
    resetReward,
    isPlaying,
    isPaused,
    progress,
  };
};