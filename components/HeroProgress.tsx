// src/components/HeroProgress.tsx
"use client";

interface HeroProgressProps {
  completedCount: number;
  totalCount: number;
}

export default function HeroProgress({ completedCount, totalCount }: HeroProgressProps) {
  const percent = Math.round((completedCount / totalCount) * 100) || 0;

  return (
    <div className="hidden md:flex items-center gap-3 bg-black/20 px-4 py-2 rounded-2xl border border-white/10">
      <div className="text-right">
        <p className="text-[10px] font-black text-white/80 uppercase tracking-widest">Жалпы прогресс</p>
        <p className="text-sm font-black text-white">{completedCount} / {totalCount} батыр</p>
      </div>
      <div className="w-24 bg-white/20 h-2.5 rounded-full overflow-hidden relative">
        <div className="bg-[#D4AF37] h-full transition-all duration-500" style={{ width: `${percent}%` }}></div>
      </div>
      <span className="text-xs font-black text-[#D4AF37] bg-white/10 px-2 py-0.5 rounded-md">{percent}%</span>
    </div>
  );
}