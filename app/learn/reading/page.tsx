"use client";

import { useState } from "react";

type Question = {
  text: string;
  question: string;
  answers: string[];
};

export default function Reading() {
  const questions: Question[] = [
    {
      text: "Айдана дүкенге барды. Ол сүт пен нан сатып алды.",
      question: "Айдана қайда барды?",
      answers: ["дүкенге", "дүкен"],
    },
    {
      text: "Ержан мектепке күн сайын барады. Ол жақсы оқиды.",
      question: "Ержан қайда барады?",
      answers: ["мектепке", "мектеп"],
    },
    {
      text: "Мен таңертең шай ішемін. Кейін жұмысқа барамын.",
      question: "Мен таңертең не істеймін?",
      answers: ["шай ішемін", "шай"],
    },
    {
      text: "Асан футбол ойнады. Ол қатты шаршады.",
      question: "Асан не істеді?",
      answers: ["футбол ойнады", "ойнады"],
    },
  ];

  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [result, setResult] = useState("");
  const [xp, setXp] = useState(0);

  const speak = (text: string) => {
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "kk-KZ";
    speechSynthesis.speak(u);
  };

  const check = () => {
    const user = answer.toLowerCase().trim();
    const correct = questions[index].answers;

    if (correct.includes(user)) {
      setResult("Дұрыс 🔥");
      setXp((prev) => prev + 10);
    } else {
      setResult(`Қате ❌ Дұрыс: ${correct[0]}`);
    }
  };

  const next = () => {
    setIndex((prev) => prev + 1);
    setAnswer("");
    setResult("");
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white p-10 rounded-2xl shadow w-[460px] text-center">

        <h1 className="text-2xl font-bold text-blue-900">
          Оқылым
        </h1>

        <p className="mt-2 text-gray-500">XP: {xp}</p>

        {index < questions.length ? (
          <>
            <p className="mt-4 text-gray-600">
              Мәтінді оқыңыз
            </p>

            <div className="mt-3 p-4 bg-gray-50 rounded-xl text-left">
              {questions[index].text}
            </div>

            <button
              onClick={() => speak(questions[index].text)}
              className="mt-2 text-sm text-blue-600"
            >
              🔊 Тыңдау
            </button>

            <p className="mt-4 font-semibold">
              {questions[index].question}
            </p>

            <input
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Жауап..."
              className="mt-4 w-full border p-3 rounded-xl"
            />

            <button
              onClick={check}
              className="mt-4 w-full bg-blue-900 text-white py-3 rounded-xl hover:opacity-90"
            >
              Тексеру
            </button>

            {result && (
              <>
                <p className="mt-4">{result}</p>

                <button
                  onClick={next}
                  className="mt-3 w-full bg-green-600 text-white py-2 rounded-xl"
                >
                  Келесі →
                </button>
              </>
            )}
          </>
        ) : (
          <>
            <h2 className="text-xl font-bold mt-6">
              🎉 Оқылым аяқталды!
            </h2>

            <p className="mt-2">
              Сіздің ұпайыңыз: {xp} XP
            </p>
          </>
        )}

      </div>
    </div>
  );
}