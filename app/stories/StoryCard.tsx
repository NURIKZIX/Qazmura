// src/app/stories/StoryCard.tsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useSpeech } from "./useSpeech";

interface StoryCardProps {
  title: string;
  content: string;
  mode: "classic" | "interactive";
  onActionChoice: (choiceText: string) => void;
  actionLoading: boolean;
  onSave: () => void;
  onReset: () => void;
  onXpReward: (amount: number) => void;
}

export default function StoryCard({
  title,
  content,
  mode,
  onActionChoice,
  actionLoading,
  onSave,
  onReset,
  onXpReward
}: StoryCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const { play, pause, resume, stop, isPlaying, isPaused, progress } = useSpeech(content, () => onXpReward(5));

  const exportToTxt = () => {
    const element = document.createElement("a");
    const file = new Blob([`${title}\n\n${content}`], { type: "text/plain;charset=utf-8" });
    element.href = URL.createObjectURL(file);
    element.download = `${title || "ertegi"}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const exportToPdf = () => {
    const printWindow = window.open("", "_blank");
    if (printWindow) {
      printWindow.document.write(`<html><head><title>${title}</title><style>body{font-family:sans-serif;padding:40px;line-height:1.6;}</style></head><body><h1>${title}</h1><p style="white-space:pre-line;">${content}</p></body></html>`);
      printWindow.document.close();
      printWindow.print();
    }
  };

  const choices = [
    "⚔️ Айдаһармен соғыссын",
    "🏰 Қамалға қарай бет алсын",
    "🧙 Дана қариядан көмек сұрасын"
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-md rounded-3xl p-6 shadow-2xl border border-amber-500/30 flex flex-col max-h-[85vh]"
    >
      {/* Үстіңгі тақырып бөлігі */}
      <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-4 mb-4">
        <h2 className="text-2xl font-bold text-blue-950 dark:text-amber-400">{title || "Сиқырлы Ертегі"}</h2>
        <div className="flex gap-2">
          <button 
            onClick={() => { setIsFavorite(!isFavorite); if(!isFavorite) onXpReward(10); }} 
            className={`p-2 rounded-xl border transition ${isFavorite ? "bg-red-50 border-red-200 text-red-500" : "border-slate-200 text-slate-400"}`}
          >
            {isFavorite ? "❤️" : "🤍"}
          </button>
          <button onClick={onSave} className="p-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-sm text-slate-800">💾 Сақтау</button>
        </div>
      </div>

      {/* TTS Аудио Плеер Панелі */}
      <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-2xl mb-4 flex flex-col gap-2">
        <div className="flex justify-center items-center gap-3">
          {!isPlaying && !isPaused && <button onClick={play} className="px-4 py-1.5 bg-green-600 text-white rounded-xl text-xs font-semibold">🔊 Тыңдау</button>}
          {isPlaying && !isPaused && <button onClick={pause} className="px-4 py-1.5 bg-amber-600 text-white rounded-xl text-xs font-semibold">⏸ Кідірту</button>}
          {isPaused && <button onClick={resume} className="px-4 py-1.5 bg-green-600 text-white rounded-xl text-xs font-semibold">▶ Жалғастыру</button>}
          {(isPlaying || isPaused) && <button onClick={stop} className="px-4 py-1.5 bg-red-600 text-white rounded-xl text-xs font-semibold">⏹ Тоқтату</button>}
        </div>
        {(isPlaying || isPaused) && (
          <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
            <div className="bg-green-500 h-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
          </div>
        )}
      </div>

      {/* Ертегі Мәтіні */}
      <div className="flex-1 overflow-y-auto pr-2 text-left space-y-4 text-slate-700 dark:text-slate-300 whitespace-pre-line text-base leading-relaxed max-h-[350px]">
        {content}
      </div>

      {/* Интерактивті таңдаулар (Ертегі 2.0 үшін) */}
      {mode === "interactive" && (
        <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
          <p className="text-sm font-bold text-indigo-900 dark:text-indigo-400 mb-3 text-left">🤔 Кейіпкер келесі кезекте не істесін?</p>
          <div className="flex flex-col gap-2">
            {choices.map((choice) => (
              <button
                key={choice}
                disabled={actionLoading}
                onClick={() => onActionChoice(choice)}
                className="w-full text-left p-3 text-sm rounded-xl border border-indigo-100 dark:border-indigo-900 hover:bg-indigo-50/50 dark:hover:bg-indigo-950/30 transition flex justify-between items-center disabled:opacity-50 text-slate-800 dark:text-slate-200"
              >
                <span>{choice}</span>
                <span>✨</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Төменгі функционалды батырмалар */}
      <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-xs text-slate-500">
        <div className="flex gap-2">
          <button onClick={exportToTxt} className="hover:text-blue-900 font-medium">📄 TXT жүктеу</button>
          <span>•</span>
          <button onClick={exportToPdf} className="hover:text-blue-900 font-medium">📑 PDF басып шығару</button>
        </div>
        <div className="flex gap-3">
          <button onClick={onReset} className="text-blue-600 font-semibold">🔄 Жаңадан бастау</button>
        </div>
      </div>
    </motion.div>
  );
}