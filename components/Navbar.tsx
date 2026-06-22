"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import useAuth from "@/hooks/useAuth";
import { ChevronDown, User, LogIn, UserPlus } from "lucide-react";

export default function Navbar() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const { user, loading } = useAuth();
  const pathname = usePathname();

  return (
    // 🏛️ sticky және z-50 арқылы скролл кезіндегі қабаттасу мәселесін толық шешеміз
    <nav className="sticky top-0 z-50 bg-white border-b-2 border-slate-100 px-6 py-4 shadow-sm backdrop-blur-md bg-opacity-95 transition-all">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        {/* 🟡 ЛОГО */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-400 to-yellow-500 flex items-center justify-center font-black text-blue-900 shadow-md transform transition-transform group-hover:scale-105">
            Q
          </div>
          <h1 className="text-xl font-black tracking-wider text-blue-950 font-serif">
            QAZMURA
          </h1>
        </Link>

        {/* 🗺️ МЕНЮ СІЛТЕМЕЛЕРІ */}
        <div className="hidden md:flex items-center gap-8 text-sm font-bold uppercase tracking-wider text-slate-700">
          
          <Link 
            href="/" 
            className={`transition-colors relative py-1 ${pathname === "/" ? "text-blue-900" : "hover:text-blue-900"}`}
          >
            Басты бет
            {pathname === "/" && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-900 rounded-full" />}
          </Link>

          {/* ОҚУ БӨЛІМІ (DROPDOWN) */}
          <div
            className="relative py-1"
            onMouseEnter={() => setOpenMenu("learn")}
            onMouseLeave={() => setOpenMenu(null)}
          >
            <span className={`cursor-pointer flex items-center gap-1 hover:text-blue-900 transition-colors ${pathname.startsWith("/learn") ? "text-blue-900" : ""}`}>
              Оқу бөлімі <ChevronDown className="w-4 h-4 opacity-70" />
            </span>

            {openMenu === "learn" && (
              <div className="absolute left-0 top-full pt-2 w-52 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="bg-white border border-slate-100 shadow-2xl rounded-xl p-3 flex flex-col gap-1">
                  {[
                    { name: "Әліпби", href: "/learn/alphabet" },
                    { name: "Грамматика", href: "/learn/grammar" },
                    { name: "Сөздік қор", href: "/learn/vocabulary" },
                    { name: "Оқылым", href: "/learn/reading" },
                  ].map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block px-3 py-2 text-xs font-semibold rounded-lg text-slate-600 hover:bg-slate-50 hover:text-blue-900 transition-all"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* МӘДЕНИЕТ (DROPDOWN) */}
          <div
            className="relative py-1"
            onMouseEnter={() => setOpenMenu("culture")}
            onMouseLeave={() => setOpenMenu(null)}
          >
            <span className={`cursor-pointer flex items-center gap-1 hover:text-blue-900 transition-colors ${["/stories", "/heroes", "/traditions", "/map"].some(p => pathname.startsWith(p)) ? "text-blue-900" : ""}`}>
              Мәдениет <ChevronDown className="w-4 h-4 opacity-70" />
            </span>

            {openMenu === "culture" && (
              <div className="absolute left-0 top-full pt-2 w-56 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="bg-white border border-slate-100 shadow-2xl rounded-xl p-3 flex flex-col gap-1">
                  {[
                    { name: "Ертегілер", href: "/stories" },
                    { name: "Батырлар", href: "/heroes" },
                    { name: "Салт-дәстүрлер", href: "/traditions" },
                    { name: "Қазақстан картасы", href: "/map" },
                  ].map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block px-3 py-2 text-xs font-semibold rounded-lg text-slate-600 hover:bg-slate-50 hover:text-blue-900 transition-all"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          <Link 
            href="/ai" 
            className={`transition-colors relative py-1 ${pathname === "/ai" ? "text-blue-900" : "hover:text-blue-900"}`}
          >
            AI Мұғалім
            {pathname === "/ai" && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-900 rounded-full" />}
          </Link>
        </div>

        {/* 👤 ПАЙДАЛАНУШЫ БӨЛІМІ (USER AREA) */}
        <div className="flex items-center gap-4 text-sm font-bold">
          {loading ? (
            <div className="w-6 h-6 border-2 border-blue-900 border-t-transparent rounded-full animate-spin" />
          ) : user ? (
            <div className="flex items-center gap-4">
              <div className="hidden lg:flex flex-col items-end">
                <span className="text-xs text-slate-600 font-semibold">{user.email}</span>
                <span className="text-[10px] text-amber-600 font-bold uppercase tracking-widest">Студент</span>
              </div>

              <Link href="/profile">
                <button className="flex items-center gap-1.5 bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-4 py-2 rounded-xl text-xs font-bold shadow-sm hover:opacity-95 active:scale-95 transition-all">
                  <User className="w-3.5 h-3.5" />
                  <span>Профиль</span>
                </button>
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-2.5">
              <Link href="/login">
                <button className="flex items-center gap-1.5 text-blue-900 border border-blue-900/20 px-4 py-2 rounded-xl text-xs hover:bg-slate-50 active:scale-95 transition-all">
                  <LogIn className="w-3.5 h-3.5" />
                  <span>Кіру</span>
                </button>
              </Link>

              <Link href="/register">
                <button className="flex items-center gap-1.5 bg-gradient-to-r from-amber-400 to-yellow-500 text-blue-950 px-4 py-2 rounded-xl text-xs shadow-md shadow-amber-400/10 hover:opacity-95 active:scale-95 transition-all">
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>Тіркелу</span>
                </button>
              </Link>
            </div>
          )}
        </div>

      </div>
    </nav>
  );
}