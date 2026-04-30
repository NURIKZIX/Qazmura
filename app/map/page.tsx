"use client";

import { useState } from "react";

export default function MapPage() {

  const cities = [
    {
      name: "Астана",
      desc: "Қазақстанның астанасы. 1997 жылдан бастап елдің басты қаласы.",
    },
    {
      name: "Алматы",
      desc: "Қазақстанның ең ірі қаласы, бұрынғы астана.",
    },
    {
      name: "Шымкент",
      desc: "Қазақстандағы үшінші ірі қала.",
    },
    {
      name: "Қарағанды",
      desc: "Өнеркәсіптік қала, көмір өндірісімен танымал.",
    },
    {
      name: "Ақтөбе",
      desc: "Батыс Қазақстандағы ірі қала.",
    },
    {
      name: "Тараз",
      desc: "Қазақстандағы ең көне қалалардың бірі.",
    },
    {
      name: "Павлодар",
      desc: "Ертіс өзені бойында орналасқан қала.",
    },
    {
      name: "Өскемен",
      desc: "Шығыс Қазақстан орталығы.",
    },
    {
      name: "Атырау",
      desc: "Мұнайлы аймақтың орталығы.",
    },
    {
      name: "Қызылорда",
      desc: "Сырдария бойындағы қала.",
    },
  ];

  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200">

      <div className="bg-white/90 backdrop-blur-lg p-10 rounded-3xl shadow-2xl w-[800px]">

        <h1 className="text-3xl font-bold text-blue-900 text-center">
          Қазақстан картасы 🇰🇿
        </h1>

        {selected === null ? (
          <div className="grid grid-cols-3 gap-4 mt-6">

            {cities.map((c, i) => (
              <div
                key={i}
                onClick={() => setSelected(i)}
                className="p-4 bg-gray-50 rounded-xl shadow cursor-pointer hover:bg-blue-100 hover:scale-105 transition text-center"
              >
                {c.name}
              </div>
            ))}

          </div>
        ) : (
          <div className="mt-6 text-center">

            <button
              onClick={() => setSelected(null)}
              className="text-sm text-gray-500 hover:text-blue-600"
            >
              ← Артқа
            </button>

            <h2 className="text-2xl font-bold mt-4 text-blue-900">
              {cities[selected].name}
            </h2>

            <p className="mt-4 text-gray-600 leading-relaxed">
              {cities[selected].desc}
            </p>

          </div>
        )}

      </div>
    </div>
  );
}