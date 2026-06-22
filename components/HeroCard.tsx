"use client";

import { motion } from "framer-motion";
// 👈 Импорт жолын Next.js стандартты Alias (@/) арқылы өзгерттік
import { Hero } from "@/app/data/heroesData"; 
import { CheckCircle2, Bookmark } from "lucide-react";

interface HeroCardProps {
  hero: Hero;
  isCompleted: boolean;
  onSelect: () => void;
}

export default function HeroCard({ hero, isCompleted, onSelect }: HeroCardProps) {
  return (
    <motion.div
      whileHover={{ 
        scale: 1.03,
        boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.15), 0 8px 10px -6px rgb(0 0 0 / 0.15)",
      }}
      className={`bg-white rounded-2xl overflow-hidden border-2 ${
        isCompleted ? "border-emerald-500 shadow-emerald-50" : "border-amber-100 hover:border-[#D4AF37]"
      } transition-colors duration-300 flex flex-col justify-between relative group shadow-md`}
    >
      {/* 👑 STATUS CAPSULE */}
      {isCompleted && (
        <div className="absolute top-3 right-3 z-10 bg-emerald-500 text-white px-3 py-1 rounded-full text-xs font-black flex items-center gap-1 shadow-md">
          <CheckCircle2 className="w-4 h-4 fill-white text-emerald-500" />
          ӨТІЛДІ
        </div>
      )}

      {/* Контейнердің жоғарғы бөлігі */}
      <div>
        {/* 🖼️ IMAGE WRAPPER */}
        <div className="relative h-64 w-full overflow-hidden bg-slate-900">
          <img
            src={hero.image}
            alt={hero.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
          <div className="absolute bottom-3 left-4">
            <span className="bg-[#D4AF37] text-black text-[10px] font-black uppercase px-2 py-0.5 rounded shadow-sm">
              {hero.period}
            </span>
          </div>
        </div>

        {/* 📝 DESCRIPTION */}
        <div className="p-5 space-y-3">
          <h4 className="text-xl font-black text-slate-900 tracking-tight font-serif group-hover:text-[#002B49] transition-colors">
            {hero.name}
          </h4>
          <p className="text-sm text-slate-900 font-medium leading-relaxed line-clamp-3">
            {hero.shortDesc}
          </p>
        </div>
      </div>

      {/* 🚀 BUTTON ACTION */}
      <div className="p-5 pt-0">
        <button
          onClick={onSelect}
          className="w-full bg-[#002B49] hover:bg-[#003B63] text-white font-black text-sm py-3 px-4 rounded-xl shadow transition-all duration-300 flex items-center justify-center gap-2 border-b-4 border-[#D4AF37]"
        >
          <Bookmark className="w-4 h-4" />
          Толығырақ оқу
        </button>
      </div>
    </motion.div>
  );
}