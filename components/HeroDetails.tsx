// src/components/HeroDetails.tsx
"use client";

import { heroesData, Hero } from "@/app/data/heroesData";
import { ArrowLeft, Swords, MapPin, Calendar, Landmark, Lightbulb, BookOpen } from "lucide-react";
import { motion } from "framer-motion";

interface HeroDetailsProps {
  hero: Hero;
  onBack: () => void;
  onStartQuiz: () => void;
}

export default function HeroDetails({ hero, onBack, onStartQuiz }: HeroDetailsProps) {
  return (
    <div className="bg-white rounded-3xl shadow-2xl border-2 border-amber-100 overflow-hidden">
      {/* 🎭 BANNER HERO */}
      <div className="relative h-80 sm:h-96 w-full bg-slate-900">
        <img src={hero.image} alt={hero.fullName} className="w-full h-full object-cover opacity-85" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent"></div>
        
        <button
          onClick={onBack}
          className="absolute top-6 left-6 bg-white/90 hover:bg-white text-slate-900 p-3 rounded-2xl shadow-xl flex items-center gap-2 font-black text-sm transition-all border-b-4 border-amber-500"
        >
          <ArrowLeft className="w-5 h-5" />
          Артқа қайту
        </button>

        <div className="absolute bottom-8 left-8 right-8 text-white">
          <div className="flex flex-wrap gap-2 items-center mb-3">
            <span className="bg-[#D4AF37] text-black text-xs font-black uppercase px-3 py-1 rounded-md shadow-sm">
              {hero.period}
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black font-serif tracking-wide drop-shadow-md text-white">
            🏹 {hero.fullName}
          </h2>
        </div>
      </div>

      {/* 🗂️ GRID INFO SUMMARY */}
      <div className="grid grid-cols-1 md:grid-cols-3 border-b border-amber-100 bg-amber-50/50">
        <div className="p-6 flex items-start gap-4 border-r border-amber-100">
          <Calendar className="w-6 h-6 text-[#002B49] shrink-0" />
          <div>
            <h5 className="text-xs uppercase font-black text-slate-900">📅 Өмір сүрген жылдары</h5>
            <p className="text-base text-slate-900 font-bold mt-1">{hero.period}</p>
          </div>
        </div>
        <div className="p-6 flex items-start gap-4 border-r border-amber-100">
          <MapPin className="w-6 h-6 text-[#002B49] shrink-0" />
          <div>
            <h5 className="text-xs uppercase font-black text-slate-900">📍 Туған жері</h5>
            <p className="text-base text-slate-900 font-bold mt-1">{hero.birthPlace}</p>
          </div>
        </div>
        <div className="p-6 flex items-start gap-4">
          <Landmark className="w-6 h-6 text-[#002B49] shrink-0" />
          <div>
            <h5 className="text-xs uppercase font-black text-slate-900">🗺️ Картадағы орны</h5>
            <p className="text-base text-slate-900 font-bold mt-1">{hero.mapLocation}</p>
          </div>
        </div>
      </div>

      {/* 📝 DETAILED TEXT & HISTORIC ROLES */}
      <div className="p-6 sm:p-10 space-y-10">
        
        {/* MAIN TEXT */}
        <div className="prose max-w-none">
          <h4 className="text-2xl font-black text-slate-900 mb-4 font-serif flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-[#002B49]" /> Тарихи Шолу
          </h4>
          <p className="text-slate-900 text-lg leading-relaxed font-medium whitespace-pre-line bg-stone-50 p-6 rounded-2xl border border-stone-100">
            {hero.text}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* FEATS */}
          <div className="bg-amber-50/60 p-6 rounded-2xl border-l-8 border-[#D4AF37] space-y-2">
            <h4 className="text-lg font-black text-slate-900 flex items-center gap-2 uppercase">
              <Swords className="w-5 h-5 text-[#002B49]" /> ⚔️ Ерліктері
            </h4>
            <p className="text-slate-900 font-medium leading-relaxed">{hero.feats}</p>
          </div>

          {/* HISTORY ROLE */}
          <div className="bg-blue-50/60 p-6 rounded-2xl border-l-8 border-[#002B49] space-y-2">
            <h4 className="text-lg font-black text-slate-900 flex items-center gap-2 uppercase">
              <Landmark className="w-5 h-5 text-[#002B49]" /> 🏆 Тарихтағы орны
            </h4>
            <p className="text-slate-900 font-medium leading-relaxed">{hero.historyRole}</p>
          </div>
        </div>

        {/* INTERESTING FACTS */}
        <div className="bg-slate-50 p-6 sm:p-8 rounded-2xl border border-slate-200">
          <h4 className="text-xl font-black text-slate-900 mb-4 flex items-center gap-2">
            <Lightbulb className="w-6 h-6 text-amber-500 fill-amber-100" /> 📖 Қызықты деректер
          </h4>
          <ul className="space-y-3">
            {hero.facts.map((fact, index) => (
              <li key={index} className="flex items-start gap-3 text-slate-900 font-medium">
                <span className="bg-[#002B49] text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-black shrink-0 mt-0.5">
                  {index + 1}
                </span>
                <span className="leading-relaxed">{fact}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* 🏁 BOTTOM ACTION */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-6 border-t border-slate-100">
          <div className="text-center sm:text-left">
            <p className="text-sm font-black text-emerald-600 uppercase tracking-wider">
              🎁 Материалды меңгергеніңіз үшін:
            </p>
            <p className="text-base font-bold text-slate-900">
              Мақаланы аяқтау арқылы <span className="font-black text-amber-600">+20 XP</span> алыңыз және тестті іске қосыңыз!
            </p>
          </div>
          <button
            onClick={onStartQuiz}
            className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-black text-lg py-4 px-8 rounded-2xl shadow-xl transition-transform active:scale-95 border-b-4 border-emerald-800 uppercase tracking-wider"
          >
            Тест тапсыруға өту →
          </button>
        </div>

      </div>
    </div>
  );
}