"use client";

import { useState } from "react";

export default function Heroes() {

  const heroes = [

    {
      name: "Қобыланды батыр",
      text: "Қобыланды батыр — қазақ эпосындағы ең әйгілі батырлардың бірі. Ол ноғайлы дәуірінде өмір сүрген. Елін жаудан қорғаған.",
      tests: [
        { question: "Қай дәуір?", options: ["Ноғайлы", "Кеңес", "Қазіргі"], answer: "Ноғайлы" },
        { question: "Тұлпары?", options: ["Тайбурыл", "Ақбоз", "Көкбөрі"], answer: "Тайбурыл" },
        { question: "Не үшін күресті?", options: ["Ел", "Ақша", "Даңқ"], answer: "Ел" },
        { question: "Қасиеті?", options: ["Батырлық", "Жалқау", "Қорқақ"], answer: "Батырлық" },
        { question: "Жыр түрі?", options: ["Эпос", "Комедия", "Драма"], answer: "Эпос" },
      ],
    },

    {
      name: "Алпамыс батыр",
      text: "Алпамыс батыр — қазақ эпосының қаһарманы. Батыл әрі әділ.",
      tests: [
        { question: "Жары кім?", options: ["Гүлбаршын", "Айгүл", "Жанар"], answer: "Гүлбаршын" },
        { question: "Қасиеті?", options: ["Әділ", "Қорқақ", "Әлсіз"], answer: "Әділ" },
        { question: "Не істеген?", options: ["Ел қорғаған", "Сауда", "Ұйықтаған"], answer: "Ел қорғаған" },
        { question: "Жанр?", options: ["Эпос", "Фильм", "Ән"], answer: "Эпос" },
        { question: "Қандай?", options: ["Батыл", "Жалқау", "Қорқақ"], answer: "Батыл" },
      ],
    },

    {
      name: "Ер Тарғын",
      text: "Ер Тарғын — ерлігімен танылған батыр.",
      tests: [
        { question: "Қасиеті?", options: ["Ерлік", "Байлық", "Ұйқы"], answer: "Ерлік" },
        { question: "Не туралы жыр?", options: ["Ерлік", "Ас", "Ақша"], answer: "Ерлік" },
        { question: "Кім?", options: ["Батыр", "Ақын", "Саудагер"], answer: "Батыр" },
        { question: "Тақырыбы?", options: ["Махаббат", "Ұйқы", "Ақша"], answer: "Махаббат" },
        { question: "Қандай адам?", options: ["Батыл", "Қорқақ", "Әлсіз"], answer: "Батыл" },
      ],
    },

    {
      name: "Қамбар батыр",
      text: "Қамбар батыр — халық қорғаушысы.",
      tests: [
        { question: "Не үшін күресті?", options: ["Әділдік", "Ақша", "Билік"], answer: "Әділдік" },
        { question: "Кім?", options: ["Батыр", "Ақын", "Патша"], answer: "Батыр" },
        { question: "Қасиеті?", options: ["Әділ", "Жалқау", "Қорқақ"], answer: "Әділ" },
        { question: "Қайда?", options: ["Халық арасында", "Қалада", "Тауда"], answer: "Халық арасында" },
        { question: "Мақсаты?", options: ["Қорғау", "Бай болу", "Ұйықтау"], answer: "Қорғау" },
      ],
    },

    {
      name: "Бөгенбай батыр",
      text: "Бөгенбай — Абылай ханның қолбасшысы.",
      tests: [
        { question: "Кімнің қолбасшысы?", options: ["Абылай", "Кенесары", "Тәуке"], answer: "Абылай" },
        { question: "Кім?", options: ["Батыр", "Ақын", "Дәрігер"], answer: "Батыр" },
        { question: "Не істеді?", options: ["Соғыс", "Сауда", "Ұйқы"], answer: "Соғыс" },
        { question: "Қасиеті?", options: ["Ерлік", "Қорқақ", "Жалқау"], answer: "Ерлік" },
        { question: "Қайда күресті?", options: ["Жоңғар", "Қытай", "Англия"], answer: "Жоңғар" },
      ],
    },

    {
      name: "Қабанбай батыр",
      text: "Қабанбай — жоңғарларға қарсы күрескен.",
      tests: [
        { question: "Кімге қарсы?", options: ["Жоңғар", "Орыс", "Қытай"], answer: "Жоңғар" },
        { question: "Кім?", options: ["Батыр", "Ақын", "Биші"], answer: "Батыр" },
        { question: "Қасиеті?", options: ["Ерлік", "Қорқақ", "Ұйқы"], answer: "Ерлік" },
        { question: "Не істеді?", options: ["Соғыс", "Сауда", "Ұйқы"], answer: "Соғыс" },
        { question: "Қайда?", options: ["Дала", "Қала", "Теңіз"], answer: "Дала" },
      ],
    },

    {
      name: "Наурызбай батыр",
      text: "Наурызбай — Абылай ханның серігі.",
      tests: [
        { question: "Кімнің серігі?", options: ["Абылай", "Исатай", "Махамбет"], answer: "Абылай" },
        { question: "Кім?", options: ["Батыр", "Ақын", "Саудагер"], answer: "Батыр" },
        { question: "Қасиеті?", options: ["Батыл", "Қорқақ", "Жалқау"], answer: "Батыл" },
        { question: "Не істеді?", options: ["Соғыс", "Ұйқы", "Сауда"], answer: "Соғыс" },
        { question: "Мақсаты?", options: ["Ел қорғау", "Ақша", "Ұйқы"], answer: "Ел қорғау" },
      ],
    },

    {
      name: "Исатай батыр",
      text: "Исатай — көтеріліс басшысы.",
      tests: [
        { question: "Кім?", options: ["Көтеріліс басшысы", "Ақын", "Патша"], answer: "Көтеріліс басшысы" },
        { question: "Не істеді?", options: ["Көтеріліс", "Сауда", "Ұйқы"], answer: "Көтеріліс" },
        { question: "Қасиеті?", options: ["Ерлік", "Қорқақ", "Жалқау"], answer: "Ерлік" },
        { question: "Мақсаты?", options: ["Халық", "Ақша", "Ұйқы"], answer: "Халық" },
        { question: "Кіммен бірге?", options: ["Махамбет", "Абылай", "Кенесары"], answer: "Махамбет" },
      ],
    },

    {
      name: "Махамбет батыр",
      text: "Махамбет — ақын әрі батыр.",
      tests: [
        { question: "Кім?", options: ["Ақын", "Патша", "Саудагер"], answer: "Ақын" },
        { question: "Тағы кім?", options: ["Батыр", "Дәрігер", "Биші"], answer: "Батыр" },
        { question: "Кіммен?", options: ["Исатай", "Абылай", "Тәуке"], answer: "Исатай" },
        { question: "Қасиеті?", options: ["Ерлік", "Қорқақ", "Ұйқы"], answer: "Ерлік" },
        { question: "Не істеді?", options: ["Күрес", "Сауда", "Ұйқы"], answer: "Күрес" },
      ],
    },

    {
      name: "Райымбек батыр",
      text: "Райымбек — Жетісуды қорғаған батыр.",
      tests: [
        { question: "Қай жерді қорғады?", options: ["Жетісу", "Алтай", "Сібір"], answer: "Жетісу" },
        { question: "Кім?", options: ["Батыр", "Ақын", "Патша"], answer: "Батыр" },
        { question: "Қасиеті?", options: ["Ерлік", "Қорқақ", "Жалқау"], answer: "Ерлік" },
        { question: "Не істеді?", options: ["Қорғау", "Сауда", "Ұйқы"], answer: "Қорғау" },
        { question: "Қайда?", options: ["Жетісу", "Қала", "Теңіз"], answer: "Жетісу" },
      ],
    },

  ];

  const [selectedHero, setSelectedHero] = useState<number | null>(null);
  const [step, setStep] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [result, setResult] = useState("");
  const [xp, setXp] = useState(0);

  const check = () => {
    const hero = heroes[selectedHero!];
    const current = hero.tests[step];

    if (selectedAnswer === current.answer) {
      setResult("Дұрыс ✅");
      setXp(xp + 10);
    } else {
      setResult("Қате ❌");
    }
  };

  const next = () => {
    const hero = heroes[selectedHero!];

    if (step < hero.tests.length - 1) {
      setStep(step + 1);
      setSelectedAnswer("");
      setResult("");
    } else {
      setResult("🎉 Бітті!");
    }
  };

  return (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200">

    <div className="bg-white p-10 rounded-3xl shadow-2xl w-[600px]">

      <h1 className="text-3xl font-bold text-blue-900 text-center">
        Батырлар
      </h1>

      {selectedHero === null ? (
        <div className="grid grid-cols-2 gap-4 mt-6">
          {heroes.map((h, i) => (
            <div
              key={i}
              onClick={() => {
                setSelectedHero(i);
                setStep(0);
                setResult("");
              }}
              className="p-4 bg-gray-50 rounded-xl shadow cursor-pointer hover:bg-blue-100 transition text-center font-semibold"
            >
              {h.name}
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-6">

          <button
            onClick={() => setSelectedHero(null)}
            className="text-sm text-gray-500 hover:text-blue-600"
          >
            ← Артқа
          </button>

          <h2 className="text-2xl font-bold mt-4 text-blue-900">
            {heroes[selectedHero].name}
          </h2>

          <p className="mt-3 text-gray-600 leading-relaxed">
            {heroes[selectedHero].text}
          </p>

          {/* 🧠 ТЕСТ */}
          <div className="mt-6">

            <p className="font-semibold text-lg">
              {heroes[selectedHero].tests[step].question}
            </p>

            <div className="mt-4 space-y-3">
              {heroes[selectedHero].tests[step].options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedAnswer(opt)}
                  className={`w-full p-3 rounded-xl border transition ${
                    selectedAnswer === opt
                      ? "bg-blue-900 text-white"
                      : "bg-gray-50 hover:bg-blue-100"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>

            <div className="flex gap-3 mt-6">

              <button
                onClick={check}
                className="bg-blue-900 text-white px-6 py-2 rounded-xl hover:bg-blue-800"
              >
                Тексеру
              </button>

              <button
                onClick={next}
                className="px-6 py-2 rounded-xl border hover:bg-gray-100"
              >
                Келесі →
              </button>

            </div>

            {result && (
              <p className="mt-4 font-semibold">
                {result}
              </p>
            )}

            <div className="mt-4">
              <span className="bg-blue-100 text-blue-900 px-4 py-2 rounded-full text-sm font-semibold">
                XP: {xp}
              </span>
            </div>

          </div>

        </div>
      )}

    </div>
  </div>
);
}