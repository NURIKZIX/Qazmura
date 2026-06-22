// src/app/stories/StoryGenerator.tsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface GeneratorProps {
  onGenerate: (prompt: string, mode: "classic" | "interactive", selectedType: string) => void;
  loading: boolean;
}

export default function StoryGenerator({ onGenerate, loading }: GeneratorProps) {
  const [mode, setMode] = useState<"classic" | "interactive">("classic");
  const [classicType, setClassicType] = useState("⚔️ Батырлар");
  
  const [character, setCharacter] = useState("Батыр");
  const [place, setPlace] = useState("Қазақ ауылы");
  const [goal, setGoal] = useState("Құтқару");
  const [length, setLength] = useState("Орташа");

  const classicOptions = [
    "⚔️ Батырлар", "👶 Балалар", "😂 Комедия", "🐉 Айдаһар",
    "🏰 Патшалық", "🧙 Сиқыр", "🌌 Ғарыш", "🦅 Қазақ мифологиясы"
  ];

  const handleGenerate = () => {
    let finalPrompt = "";
    if (mode === "classic") {
      finalPrompt = `Қазақ мәдениеті мен дәстүріне негізделген, тәрбиелік маңызы бар, балаларға түсінікті тілде, ішінде қызықты кейіпкерлер мен диалогтары бар "${classicType}" тақырыбында тамаша ертегі жазып бер. Ертегінің басында атауы болсын.`;
    } else {
      finalPrompt = `Келесі параметрлер бойынша таза қазақ тілінде қызықты сюжетті, диалогтармен көркемделген ертегі жаз.
Кейіпкер: ${character}
Оқиға орны: ${place}
Мақсаты: ${goal}
Көлемі: ${length}
Ертегіде қазақ мәдениеті көрініс тапсын, балаларға ғибрат берерлік тәрбиелік мәні болсын. Басында міндетті түрде ертегі атауын көрсет.`;
    }
    onGenerate(finalPrompt, mode, mode === "classic" ? classicType : character);
  };

  return (
    <div className="w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-3xl p-6 shadow-2xl border border-amber-500/20">
      
      {/* Режимдерді ауыстыру */}
      <div className="flex bg-slate-100 dark:bg-slate-800 p-1.5 rounded-2xl gap-2 mb-6">
        <button
          onClick={() => setMode("classic")}
          className={`flex-1 py-3 rounded-xl font-medium text-sm transition-all duration-300 ${mode === "classic" ? "bg-blue-900 text-white shadow-lg" : "text-slate-600 dark:text-slate-300 hover:bg-white/50"}`}
        >
          📖 Классикалық ертегі
        </button>
        <button
          onClick={() => setMode("interactive")}
          className={`flex-1 py-3 rounded-xl font-medium text-sm transition-all duration-300 ${mode === "interactive" ? "bg-blue-900 text-white shadow-lg" : "text-slate-600 dark:text-slate-300 hover:bg-white/50"}`}
        >
          🎮 Ертегі 2.0 (Интерактив)
        </button>
      </div>

      {/* Классикалық режим */}
      {mode === "classic" && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-2 gap-3">
          {classicOptions.map((type) => (
            <motion.button
              whileHover={{ scale: 1.02, boxShadow: "0px 0px 8px rgba(212,175,55,0.3)" }}
              whileTap={{ scale: 0.98 }}
              key={type}
              onClick={() => setClassicType(type)}
              className={`p-4 rounded-xl border text-left font-medium transition-all ${classicType === type ? "border-amber-500 bg-amber-500/10 text-amber-900 dark:text-amber-300 font-bold" : "border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300"}`}
            >
              {type}
            </motion.button>
          ))}
        </motion.div>
      )}

      {/* Интерактивті режим */}
      {mode === "interactive" && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4 text-left">
          <div>
            <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 block mb-1">Кейіпкер</label>
            <select value={character} onChange={(e) => setCharacter(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-800 p-3 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100">
              {["Батыр", "Бала", "Қыз", "Хан", "Би", "Бақсы", "Аңшы", "Ғалым"].map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 block mb-1">Оқиға орны</label>
            <select value={place} onChange={(e) => setPlace(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-800 p-3 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100">
              {["Қазақ ауылы", "Орман", "Тау", "Шөл", "Сарай", "Ғарыш", "Сиқырлы әлем"].map((p) => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 block mb-1">Мақсаты</label>
              <select value={goal} onChange={(e) => setGoal(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-800 p-3 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100">
                {["Құтқару", "Жеңу", "Табу", "Іздеу", "Үйрену", "Байлық табу"].map((g) => <option key={g} value={g}>{g}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 block mb-1">Ұзындығы</label>
              <select value={length} onChange={(e) => setLength(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-800 p-3 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100">
                {["Қысқа", "Орташа", "Ұзын"].map((l) => <option key={l} value={l}>{l}</option>)}
              </select>
            </div>
          </div>
        </motion.div>
      )}

      {/* Генерация Батырмасы */}
      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        onClick={handleGenerate}
        disabled={loading}
        className="w-full mt-6 bg-gradient-to-r from-blue-900 to-indigo-900 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-indigo-500/30 transition duration-300 disabled:opacity-50 flex items-center justify-center gap-2"
      >
        {loading ? (
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            <span>AI Ертегі тоқып жатыр...</span>
          </div>
        ) : (
          <>✨ Ертегі жасау</>
        )}
      </motion.button>
    </div>
  );
}