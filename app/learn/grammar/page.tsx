"use client";

import { useState } from "react";

export default function Grammar() {
  const questions = [
  { q: "I go", answers: ["мен барамын", "мен барам"] },
  { q: "I eat", answers: ["мен жеймін"] },
  { q: "I read", answers: ["мен оқимын"] },
  { q: "I see", answers: ["мен көремін"] },

  // 🔥 ЖАҢА ҚОС
  { q: "I drink", answers: ["мен ішемін"] },
  { q: "I sleep", answers: ["мен ұйықтаймын"] },
  { q: "I work", answers: ["мен жұмыс істеймін"] },
  { q: "I learn", answers: ["мен үйренемін"] },
  { q: "I write", answers: ["мен жазамын"] },
  { q: "I speak", answers: ["мен сөйлеймін"] },
];

  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [result, setResult] = useState("");
  const [xp, setXp] = useState(0);

  const check = () => {
    const user = answer.toLowerCase().trim();
    const correct = questions[index].answers;

    if (correct.includes(user)) {
      setResult("Дұрыс 🔥");
      setXp(xp + 10);
    } else {
      setResult(`Қате ❌ Дұрыс: ${correct[0]}`);
    }
  };

  const next = () => {
    setIndex(index + 1);
    setAnswer("");
    setResult("");
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">

      <div className="bg-white p-10 rounded-2xl shadow w-[420px] text-center">

        <h1 className="text-2xl font-bold text-blue-900">
          Грамматика
        </h1>

        <p className="mt-2 text-gray-500">
          XP: {xp}
        </p>

        {index < questions.length ? (
          <>
            <p className="mt-4 text-gray-600">
              Сөйлемді аударыңыз
            </p>

            <p className="mt-2 text-lg font-semibold">
              {questions[index].q} → ?
            </p>

            <input
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="mt-6 w-full border p-3 rounded-xl"
              placeholder="Жауап..."
            />

            <button
              onClick={check}
              className="mt-4 w-full bg-blue-900 text-white py-3 rounded-xl"
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
              🎉 Сабақ аяқталды!
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