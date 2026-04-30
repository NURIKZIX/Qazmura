"use client";

import { useState } from "react";

export default function AIPage() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");

  const ask = async () => {
    if (!input) return;

    const res = await fetch("/api/chat", {
      method: "POST",
      body: JSON.stringify({
        message: input,
      }),
    });

    const data = await res.json();

    setResponse(data.reply || "Жауап жоқ");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200">

      <div className="bg-white p-10 rounded-3xl shadow-2xl w-[600px]">

        <h1 className="text-3xl font-bold text-blue-900 text-center">
          AI Мұғалім 🤖
        </h1>

        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Сұрақ қой..."
          className="w-full mt-6 p-4 border rounded-xl"
        />

        <button
          onClick={ask}
          className="mt-4 bg-blue-900 text-white px-6 py-3 rounded-xl w-full"
        >
          Сұрау
        </button>

        {response && (
          <div className="mt-6 bg-gray-50 p-4 rounded-xl">
            {response}
          </div>
        )}

      </div>
    </div>
  );
}