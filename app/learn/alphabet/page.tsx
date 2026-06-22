"use client";

import { useState } from "react";

export default function Alphabet() {
  const [activeLetter, setActiveLetter] = useState("");

  const letters = [
    { letter: "А", word: "Ана" },
    { letter: "Ә", word: "Әке" },
    { letter: "Б", word: "Бала" },
    { letter: "В", word: "Вагон" },
    { letter: "Г", word: "Гүл" },
    { letter: "Ғ", word: "Ғарыш" },
    { letter: "Д", word: "Дос" },
    { letter: "Е", word: "Ел" },
    { letter: "Ё", word: "Ёлка" },
    { letter: "Ж", word: "Жол" },
    { letter: "З", word: "Зат" },
    { letter: "И", word: "Ине" },
    { letter: "Й", word: "Йогурт" },
    { letter: "К", word: "Кітап" },
    { letter: "Қ", word: "Қала" },
    { letter: "Л", word: "Лақ" },
    { letter: "М", word: "Мектеп" },
    { letter: "Н", word: "Нан" },
    { letter: "Ң", word: "Ң" },
    { letter: "О", word: "Отан" },
    { letter: "Ө", word: "Өрік" },
    { letter: "П", word: "Парта" },
    { letter: "Р", word: "Рақмет" },
    { letter: "С", word: "Су" },
    { letter: "Т", word: "Тау" },
    { letter: "У", word: "Уақыт" },
    { letter: "Ұ", word: "Ұл" },
    { letter: "Ү", word: "Үй" },
    { letter: "Ф", word: "Футбол" },
    { letter: "Х", word: "Халық" },
    { letter: "Һ", word: "Һарун" },
    { letter: "Ц", word: "Цирк" },
    { letter: "Ч", word: "Чемодан" },
    { letter: "Ш", word: "Шаң" },
    { letter: "Щ", word: "Щётка" },
    { letter: "Ъ", word: "Ъ белгісі" },
    { letter: "Ы", word: "Ыдыс" },
    { letter: "І", word: "Іні" },
    { letter: "Ь", word: "Ь белгісі" },
    { letter: "Э", word: "Экран" },
    { letter: "Ю", word: "Юрта" },
    { letter: "Я", word: "Яблоко" },
  ];

  const speak = (letter: string, word: string) => {
    setActiveLetter(letter);

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(
      `${letter}. ${word}`
    );

    utterance.lang = "kk-KZ";
    utterance.rate = 0.8;
    utterance.pitch = 1;

    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="bg-slate-100 min-h-screen p-6 md:p-10">

      <h1 className="text-4xl font-bold text-blue-900 mb-3">
        Қазақ Әліпбиі
      </h1>

      <p className="text-gray-600 mb-8">
        Әріпке басыңыз — қазақша дыбысталады 🔊
      </p>

      {activeLetter && (
        <div className="bg-blue-100 text-blue-900 px-5 py-3 rounded-xl mb-6 inline-block font-semibold">
          Соңғы таңдалған әріп: {activeLetter}
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-5">

        {letters.map((item, index) => (
          <button
            key={index}
            onClick={() => speak(item.letter, item.word)}
            className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl hover:scale-105 transition duration-300"
          >
            <h2 className="text-4xl font-bold text-blue-900">
              {item.letter}
            </h2>

            <p className="mt-3 text-gray-700 text-lg">
              {item.word}
            </p>

            <div className="mt-3 text-sm text-blue-500">
              🔊 Тыңдау
            </div>
          </button>
        ))}

      </div>

      <div className="mt-10 bg-white p-6 rounded-2xl shadow">

        <h3 className="text-xl font-bold text-blue-900 mb-3">
          Әліпби туралы
        </h3>

        <p className="text-gray-700 leading-relaxed">
          Қазақ әліпбиі 42 әріптен тұрады.
          Бұл бөлімде әр әріптің дыбысталуын тыңдап,
          сөздер арқылы есте сақтауға болады.
        </p>

      </div>

    </div>
  );
}