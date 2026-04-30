"use client";

import { useState, useEffect } from "react";

export default function Stories() {
  useEffect(() => {
  speechSynthesis.getVoices();
}, []);
  const [mode, setMode] = useState("classic");

  const [type, setType] = useState("батыр");
  const [character, setCharacter] = useState("батыр");
  const [place, setPlace] = useState("ауыл");
  const [goal, setGoal] = useState("жеңу");

  const [story, setStory] = useState("");
  const [loading, setLoading] = useState(false);
const speak = () => {
  if (!story) return;

  // 🔥 ВСЕГДА очищаем старый звук
  speechSynthesis.cancel();

  const utter = new SpeechSynthesisUtterance(story);

  utter.lang = "kk-KZ";
  utter.rate = 0.9;
  utter.pitch = 1;

  speechSynthesis.speak(utter);
};
  const generateStory = async () => {
    setLoading(true);
    setStory("");

    let prompt = "";

    if (mode === "classic") {
      const map: any = {
        батыр: "Қазақ батыр туралы қызықты ертегі жаз",
        балалар: "Балаларға арналған ертегі жаз",
        комедия: "Күлкілі ертегі жаз",
      };

      prompt = map[type];
    } else {
      prompt = `
Кейіпкер: ${character}
Оқиға орны: ${place}
Мақсат: ${goal}

Осы параметрлер бойынша қазақ тілінде қызықты ертегі жаз.
      `;
    }

    const res = await fetch("/api/chat", {
      method: "POST",
      body: JSON.stringify({ message: prompt }),
    });

    const data = await res.json();

if (data.error) {
  setStory("⚠️ Қате: AI жауап бермеді");
} else {
  setStory(data.reply || "⚠️ Қате: ертегі шықпады");
}

    setLoading(false);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center">

      {/* ФОН */}
      <img
        src="/kazakh-bg.jpg"
        className="absolute inset-0 w-full h-full object-cover opacity-30"
      />
      <div className="absolute inset-0 bg-blue-200/60"></div>

      {/* КАРТОЧКА */}
      <div className="relative bg-white/90 p-10 rounded-3xl shadow-xl w-[750px] text-center">

        <h1 className="text-3xl font-bold text-blue-900">
          Ертегілер
        </h1>

        {/* 🔥 РЕЖИМ ПЕРЕКЛЮЧЕНИЯ */}
        <div className="flex justify-center gap-3 mt-4">
          <button
            onClick={() => setMode("classic")}
            className={`px-4 py-2 rounded-xl ${
              mode === "classic"
                ? "bg-blue-900 text-white"
                : "border"
            }`}
          >
            📖 Классика
          </button>

          <button
            onClick={() => setMode("interactive")}
            className={`px-4 py-2 rounded-xl ${
              mode === "interactive"
                ? "bg-blue-900 text-white"
                : "border"
            }`}
          >
            🎮 Ертегі 2.0
          </button>
        </div>

        <p className="text-sm text-gray-500 mt-2">
          {mode === "classic"
            ? "Ертегі түрін таңдаңыз"
            : "Өзіңіздің ертегіңізді құрастырыңыз"}
        </p>

        {/* 🟦 CLASSIC */}
        {mode === "classic" && (
          <div className="flex justify-center gap-3 mt-4">
            {["батыр", "балалар", "комедия"].map((t) => (
              <button
                key={t}
                onClick={() => setType(t)}
                className={`px-4 py-2 rounded-xl border ${
                  type === t
                    ? "bg-blue-900 text-white"
                    : ""
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        )}

        {/* 🎮 INTERACTIVE */}
        {mode === "interactive" && (
          <div className="mt-4 space-y-3 text-left">

            <div>
              <p>Кейіпкер</p>
              <select
                onChange={(e) => setCharacter(e.target.value)}
                className="w-full p-2 border rounded"
              >
                <option>батыр</option>
                <option>қыз</option>
                <option>бала</option>
              </select>
            </div>

            <div>
              <p>Оқиға орны</p>
              <select
                onChange={(e) => setPlace(e.target.value)}
                className="w-full p-2 border rounded"
              >
                <option>ауыл</option>
                <option>орман</option>
                <option>тау</option>
              </select>
            </div>

            <div>
              <p>Мақсат</p>
              <select
                onChange={(e) => setGoal(e.target.value)}
                className="w-full p-2 border rounded"
              >
                <option>жеңу</option>
                <option>құтқару</option>
                <option>табу</option>
              </select>
            </div>

          </div>
        )}

        {/* 🔥 КНОПКА */}
        <button
          onClick={generateStory}
          className="mt-6 bg-blue-900 text-white px-6 py-3 rounded-xl hover:scale-105 transition"
        >
          ✨ Ертегі жасау
        </button>

        {loading && (
  <p className="mt-4 text-gray-500 animate-pulse">
    ✨ Ертегі жасалуда...
  </p>
)}

        {story && (
          <div className="mt-6 bg-gray-50 p-5 rounded-xl text-left max-h-[300px] overflow-y-auto">
            <p className="whitespace-pre-line">{story}</p>
          </div>
        )}
{story && (
  <div className="mt-3 flex gap-4 justify-center">

    <button
      onClick={() => navigator.clipboard.writeText(story)}
      className="text-sm text-gray-600"
    >
      📋 Көшіру
    </button>

    <button
      onClick={generateStory}
      className="text-sm text-blue-600"
    >
      🔄 Қайта жасау
    </button>

    <button
      onClick={speak}
      className="text-sm text-green-600"
    >
      🔊 Тыңдау
    </button>

  </div>
)}
      </div>
    </div>
  );
}