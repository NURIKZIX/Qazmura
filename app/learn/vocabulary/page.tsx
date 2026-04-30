"use client";

import { useState } from "react";

export default function Vocabulary() {
  const words = [
    { kz: "Ана", ru: "Мама", en: "Mother" },
    { kz: "Әке", ru: "Папа", en: "Father" },
    { kz: "Үй", ru: "Дом", en: "House" },
    { kz: "Кітап", ru: "Книга", en: "Book" },
    { kz: "Су", ru: "Вода", en: "Water" },
    { kz: "Тау", ru: "Гора", en: "Mountain" },
    { kz: "Жол", ru: "Дорога", en: "Road" },
    { kz: "Қала", ru: "Город", en: "City" },
    { kz: "Бала", ru: "Ребенок", en: "Child" },
    { kz: "Мектеп", ru: "Школа", en: "School" },
    { kz: "Дос", ru: "Друг", en: "Friend" },
    { kz: "Аспан", ru: "Небо", en: "Sky" },
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const speak = (text: string) => {
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = "kk-KZ";
    speechSynthesis.speak(utter);
  };

  return (
    <div className="bg-gray-100 min-h-screen p-10">

      <h1 className="text-3xl font-bold text-blue-900">
        Сөздік қор
      </h1>

      <p className="mt-2 text-gray-600">
        Сөзді басыңыз — аудармасы шығады 🔥
      </p>

      <div className="grid grid-cols-4 gap-6 mt-8">
        {words.map((w, i) => (
          <div
            key={i}
            onClick={() => setOpenIndex(i === openIndex ? null : i)}
            className="bg-white p-6 rounded-2xl shadow cursor-pointer hover:scale-105 transition"
          >
            <div className="flex justify-between items-center">
              <p className="text-xl font-semibold">{w.kz}</p>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  speak(w.kz);
                }}
              >
                🔊
              </button>
            </div>

            {openIndex === i && (
              <div className="mt-3 text-gray-600">
                <p>🇷🇺 {w.ru}</p>
                <p>🇬🇧 {w.en}</p>
              </div>
            )}
          </div>
        ))}
      </div>

    </div>
  );
}