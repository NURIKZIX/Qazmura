"use client";

import { useState } from "react";

export default function Traditions() {

  const data = [

    {
      name: "Тұсау кесер",
      text: "Тұсау кесер — бала алғаш жүре бастағанда жасалатын дәстүр. Баланың аяғына жіп байланып, оны сыйлы адам кеседі. Бұл баланың өмір жолы ашық болсын деген ниет.",
      tests: [
        { question: "Қашан жасалады?", options: ["Жүргенде", "Туған кезде", "Үйленгенде"], answer: "Жүргенде" },
        { question: "Не кесіледі?", options: ["Жіп", "Шаш", "Киім"], answer: "Жіп" },
        { question: "Мағынасы?", options: ["Жол ашық", "Ұйқы", "Ойын"], answer: "Жол ашық" },
      ],
    },

    {
      name: "Бесікке салу",
      text: "Бесікке салу — нәрестені алғаш бесікке бөлеу дәстүрі. Бұл рәсімді әжелер орындайды.",
      tests: [
        { question: "Кімге?", options: ["Нәресте", "Қарт", "Жас"], answer: "Нәресте" },
        { question: "Кім орындайды?", options: ["Әже", "Дос", "Бала"], answer: "Әже" },
        { question: "Мақсаты?", options: ["Тәрбие", "Ойын", "Ұйқы"], answer: "Тәрбие" },
      ],
    },

    {
      name: "Шілдехана",
      text: "Шілдехана — нәресте туған кезде өткізілетін той.",
      tests: [
        { question: "Қашан?", options: ["Туған кезде", "Үйленгенде", "Оқығанда"], answer: "Туған кезде" },
        { question: "Не?", options: ["Той", "Жұмыс", "Сабақ"], answer: "Той" },
        { question: "Мақсаты?", options: ["Қуаныш", "Ұйқы", "Сауда"], answer: "Қуаныш" },
      ],
    },

    {
      name: "Қырқынан шығару",
      text: "40 күннен кейін жасалатын рәсім.",
      tests: [
        { question: "Қанша күн?", options: ["40", "10", "5"], answer: "40" },
        { question: "Не істейді?", options: ["Шомылдырады", "Ұйықтайды", "Жүреді"], answer: "Шомылдырады" },
        { question: "Мағынасы?", options: ["Тазалық", "Ойын", "Ұйқы"], answer: "Тазалық" },
      ],
    },

    {
      name: "Сүндет той",
      text: "Ұл балаға арналған дәстүр.",
      tests: [
        { question: "Кімге?", options: ["Ұл", "Қыз", "Барлығы"], answer: "Ұл" },
        { question: "Не?", options: ["Мереке", "Сабақ", "Ұйқы"], answer: "Мереке" },
        { question: "Мағынасы?", options: ["Ер жету", "Ұйқы", "Ойын"], answer: "Ер жету" },
      ],
    },

    {
      name: "Тілашар",
      text: "Мектепке алғаш барғанда жасалады.",
      tests: [
        { question: "Қашан?", options: ["Мектепте", "Үйде", "Далада"], answer: "Мектепте" },
        { question: "Кімге?", options: ["Бала", "Қарт", "Дос"], answer: "Бала" },
        { question: "Мағынасы?", options: ["Білім", "Ұйқы", "Ойын"], answer: "Білім" },
      ],
    },

    {
      name: "Беташар",
      text: "Келінді таныстыру рәсімі.",
      tests: [
        { question: "Кімге?", options: ["Келін", "Бала", "Ата"], answer: "Келін" },
        { question: "Не істейді?", options: ["Таныстырады", "Ұйықтайды", "Жүреді"], answer: "Таныстырады" },
        { question: "Не ашылады?", options: ["Бет", "Қол", "Көз"], answer: "Бет" },
      ],
    },

    {
      name: "Құда түсу",
      text: "Қыз бен жігіттің отбасын таныстыру.",
      tests: [
        { question: "Не?", options: ["Танысу", "Ойын", "Ұйқы"], answer: "Танысу" },
        { question: "Кім?", options: ["Отбасы", "Дос", "Бала"], answer: "Отбасы" },
        { question: "Мағынасы?", options: ["Үйлену", "Сауда", "Ұйқы"], answer: "Үйлену" },
      ],
    },

    {
      name: "Қыз ұзату",
      text: "Қызды ұзату рәсімі.",
      tests: [
        { question: "Кім кетеді?", options: ["Қыз", "Ұл", "Ата"], answer: "Қыз" },
        { question: "Не?", options: ["Той", "Сабақ", "Жұмыс"], answer: "Той" },
        { question: "Мағынасы?", options: ["Үйлену", "Ұйқы", "Ойын"], answer: "Үйлену" },
      ],
    },

    {
      name: "Келін түсіру",
      text: "Жаңа келінді қарсы алу.",
      tests: [
        { question: "Кім келеді?", options: ["Келін", "Ата", "Бала"], answer: "Келін" },
        { question: "Не?", options: ["Рәсім", "Ұйқы", "Ойын"], answer: "Рәсім" },
        { question: "Мағынасы?", options: ["Отбасы", "Ұйқы", "Сауда"], answer: "Отбасы" },
      ],
    },

    {
      name: "Ас беру",
      text: "Марқұмды еске алу рәсімі.",
      tests: [
        { question: "Не?", options: ["Еске алу", "Ойын", "Ұйқы"], answer: "Еске алу" },
        { question: "Кімге?", options: ["Марқұм", "Бала", "Дос"], answer: "Марқұм" },
        { question: "Мағынасы?", options: ["Құрмет", "Ойын", "Ұйқы"], answer: "Құрмет" },
      ],
    },

    {
      name: "Жылу жинау",
      text: "Қиын жағдайда көмек көрсету.",
      tests: [
        { question: "Не?", options: ["Көмек", "Ұйқы", "Ойын"], answer: "Көмек" },
        { question: "Кімге?", options: ["Мұқтаж", "Бай", "Бала"], answer: "Мұқтаж" },
        { question: "Мағынасы?", options: ["Жәрдем", "Ұйқы", "Сауда"], answer: "Жәрдем" },
      ],
    },

    {
      name: "Ерулік",
      text: "Жаңа көршіге дастархан жаю.",
      tests: [
        { question: "Кімге?", options: ["Көрші", "Дос", "Ата"], answer: "Көрші" },
        { question: "Не?", options: ["Дастархан", "Ұйқы", "Ойын"], answer: "Дастархан" },
        { question: "Мағынасы?", options: ["Қонақжайлық", "Ұйқы", "Сауда"], answer: "Қонақжайлық" },
      ],
    },

    {
      name: "Сарқыт беру",
      text: "Қонақтан қалған тағам беру.",
      tests: [
        { question: "Не беріледі?", options: ["Тағам", "Ақша", "Киім"], answer: "Тағам" },
        { question: "Кімге?", options: ["Үйдегілерге", "Бөгде", "Ата"], answer: "Үйдегілерге" },
        { question: "Мағынасы?", options: ["Ырыс", "Ұйқы", "Ойын"], answer: "Ырыс" },
      ],
    },

    {
      name: "Көрісу",
      text: "Көктемде амандасу дәстүрі.",
      tests: [
        { question: "Қашан?", options: ["Көктем", "Қыс", "Жаз"], answer: "Көктем" },
        { question: "Не?", options: ["Амандасу", "Ұйқы", "Сауда"], answer: "Амандасу" },
        { question: "Мағынасы?", options: ["Бірлік", "Ұйқы", "Ойын"], answer: "Бірлік" },
      ],
    },

  ];

  const [selected, setSelected] = useState<number | null>(null);
  const [step, setStep] = useState(0);
  const [answer, setAnswer] = useState("");
  const [result, setResult] = useState("");
  const [xp, setXp] = useState(0);

  const check = () => {
    const current = data[selected!].tests[step];
    if (answer === current.answer) {
      setResult("Дұрыс ✅");
      setXp(xp + 10);
    } else {
      setResult("Қате ❌");
    }
  };

  const next = () => {
    const item = data[selected!];
    if (step < item.tests.length - 1) {
      setStep(step + 1);
      setAnswer("");
      setResult("");
    } else {
      setResult("🎉 Бітті!");
    }
  };

  return (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200">

    <div className="bg-white/90 backdrop-blur-lg p-10 rounded-3xl shadow-2xl w-[650px]">

      <h1 className="text-3xl font-bold text-blue-900 text-center">
        Салт-дәстүрлер
      </h1>

      {selected === null ? (
        <div className="grid grid-cols-2 gap-4 mt-6">
          {data.map((item, i) => (
            <div
              key={i}
              onClick={() => {
                setSelected(i);
                setStep(0);
                setResult("");
              }}
              className="p-5 bg-gray-50 rounded-2xl shadow cursor-pointer hover:bg-blue-100 hover:scale-105 transition text-center font-semibold"
            >
              {item.name}
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-6">

          <button
            onClick={() => setSelected(null)}
            className="text-sm text-gray-500 hover:text-blue-600"
          >
            ← Артқа
          </button>

          <h2 className="text-2xl font-bold mt-4 text-blue-900">
            {data[selected].name}
          </h2>

          <p className="mt-3 text-gray-600 leading-relaxed">
            {data[selected].text}
          </p>

          {/* ТЕСТ */}
          <div className="mt-6">

            <p className="font-semibold text-lg">
              {data[selected].tests[step].question}
            </p>

            <div className="mt-4 space-y-3">
              {data[selected].tests[step].options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => setAnswer(opt)}
                  className={`w-full p-3 rounded-xl border transition ${
                    answer === opt
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
                className="bg-blue-900 text-white px-6 py-2 rounded-xl hover:bg-blue-800 transition"
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
              <p className="mt-4 font-semibold text-lg">
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