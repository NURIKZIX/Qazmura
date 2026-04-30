"use client";

import { useSession, signOut } from "next-auth/react";
import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const { data: session } = useSession(); // 🔥 маңызды

  return (
    <div className="flex justify-between items-center px-8 py-4 bg-white shadow-md relative z-50">

      {/* ЛОГО */}
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-yellow-400 rounded-full"></div>
        <h1 className="text-xl font-bold text-blue-900">QAZMURA</h1>
      </div>

      {/* МЕНЮ */}
      <div className="flex gap-10 text-xl font-semibold text-gray-800">

        <a href="/" className="hover:text-blue-600">
          Басты бет
        </a>

        {/* ОҚУ БӨЛІМІ */}
        <div
          className="relative"
          onMouseEnter={() => setOpenMenu("learn")}
          onMouseLeave={() => setOpenMenu(null)}
        >
          <span className="cursor-pointer px-3 py-2 hover:text-blue-600">
            Оқу бөлімі
          </span>

          {openMenu === "learn" && (
            <div className="absolute left-0 top-full bg-white shadow-lg rounded-xl w-52 z-50">
              <div className="absolute -top-2 left-0 w-full h-2"></div>

              <div className="p-4">
                <a href="/learn/alphabet" className="block hover:text-blue-600 py-1">
                  Әліпби
                </a>
                <a href="/learn/grammar" className="block hover:text-blue-600 py-1">
                  Грамматика
                </a>
                <a href="/learn/vocabulary" className="block hover:text-blue-600 py-1">
                  Сөздік қор
                </a>
                <a href="/learn/reading" className="block hover:text-blue-600 py-1">
                  Оқылым
                </a>
              </div>
            </div>
          )}
        </div>

        {/* МӘДЕНИЕТ */}
        <div
          className="relative"
          onMouseEnter={() => setOpenMenu("culture")}
          onMouseLeave={() => setOpenMenu(null)}
        >
          <span className="cursor-pointer px-3 py-2 hover:text-blue-600">
            Мәдениет
          </span>

          {openMenu === "culture" && (
            <div className="absolute left-0 top-full bg-white shadow-lg rounded-xl w-56 z-50">
              <div className="absolute -top-2 left-0 w-full h-2"></div>

              <div className="p-4">
                <a href="/stories" className="block hover:text-blue-600 py-1">
                  Ертегілер
                </a>
                <a href="/heroes" className="block hover:text-blue-600 py-1">
                  Батырлар
                </a>
                <a href="/traditions" className="block hover:text-blue-600 py-1">
                  Салт-дәстүрлер
                </a>
                <Link href="/map" className="block hover:text-blue-600 py-1">
                  Қазақстан картасы
                </Link>
              </div>
            </div>
          )}
        </div>

        <a href="/ai" className="hover:text-blue-600">
          AI Мұғалім
        </a>
      </div>

      {/* 🔥 КІРУ / USER */}
      {session ? (
        <div className="flex items-center gap-3">

          <span className="text-blue-900 font-medium">
            Сәлем, {session.user?.name}
          </span>

          <button
            onClick={() => signOut()}
            className="bg-red-500 text-white px-3 py-2 rounded-xl hover:opacity-90"
          >
            Шығу
          </button>

        </div>
      ) : (
        <Link href="/login">
          <button className="bg-blue-900 text-white px-4 py-2 rounded-xl hover:opacity-90">
            Кіру
          </button>
        </Link>
      )}

    </div>
  );
}