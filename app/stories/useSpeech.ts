"use client";

import { useState, useEffect, useRef } from "react";

export const useSpeech = (
  text: string,
  onXpReward?: () => void
) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const [voice, setVoice] =
    useState<SpeechSynthesisVoice | null>(null);

  const progressInterval =
    useRef<NodeJS.Timeout | null>(null);

  const rewardedRef = useRef(false);

  useEffect(() => {
    const loadVoices = () => {
      const voices =
        window.speechSynthesis.getVoices();

      console.log(
        "Available Voices:",
        voices.map((v) => ({
          name: v.name,
          lang: v.lang,
        }))
      );

      const kazakhVoice =
        voices.find((v) =>
          v.name.includes("Aigul")
        ) ||
        voices.find((v) =>
          v.name.includes("Daulet")
        ) ||
        voices.find((v) =>
          v.lang === "kk-KZ"
        ) ||
        voices.find((v) =>
          v.lang.startsWith("kk")
        ) ||
        null;

      if (kazakhVoice) {
        console.log(
          "Selected Voice:",
          kazakhVoice.name
        );

        setVoice(kazakhVoice);
      }
    };

    loadVoices();

    if (
      typeof window !== "undefined" &&
      window.speechSynthesis
    ) {
      window.speechSynthesis.onvoiceschanged =
        loadVoices;
    }

    return () => {
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }

      if (typeof window !== "undefined") {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

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

  const play = () => {
    if (!text) return;

    window.speechSynthesis.cancel();

    const utter =
      new SpeechSynthesisUtterance(text);

    if (voice) {
      utter.voice = voice;
    }

    utter.lang = "kk-KZ";
    utter.rate = 0.95;
    utter.pitch = 1;
    utter.volume = 1;

    utter.onstart = () => {
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
    };

    utter.onend = () => {
      setIsPlaying(false);
      setIsPaused(false);

      setProgress(100);

      if (progressInterval.current) {
        clearInterval(
          progressInterval.current
        );
      }
    };

    utter.onerror = (e) => {
      console.error("Speech Error:", e);

      setIsPlaying(false);
      setIsPaused(false);

      if (progressInterval.current) {
        clearInterval(
          progressInterval.current
        );
      }
    };

    window.speechSynthesis.speak(utter);
  };

  const pause = () => {
    if (isPlaying && !isPaused) {
      window.speechSynthesis.pause();

      setIsPaused(true);

      if (progressInterval.current) {
        clearInterval(
          progressInterval.current
        );
      }
    }
  };

  const resume = () => {
    if (isPaused) {
      window.speechSynthesis.resume();

      setIsPaused(false);

      startProgress();
    }
  };

  const stop = () => {
    window.speechSynthesis.cancel();

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