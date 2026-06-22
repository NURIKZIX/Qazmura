// src/components/HeroAchievements.tsx
"use client";

import { Award, Star, ShieldAlert } from "lucide-react";

interface HeroAchievementsProps {
  completedCount: number;
}

export default function HeroAchievements({ completedCount }: HeroAchievementsProps) {
  const achievements = [
    { id: 1, title: "🥉 Жас батыр", desc: "1 батырдың сынағынан өтіңіз", req: 1 },
    { id: 2, title: "🥈 Тарих зерттеушісі", desc: "5 батырдың сынағынан өтіңіз", req: 5 },
    { id: 3, title: "🥇 Ұлы дала батыры", desc: "Барлық 12 батырды толық аяқтаңыз", req: 12 },
  ];

  return (
    <div className="bg-white rounded-3xl p-6 border-2 border-amber-100 shadow-md">
      <h4 className="text-xl font-black text-slate-900 mb-4 font-serif flex items-center gap-2">
        <Star className="w-5 h-5 text-amber-500 fill-amber-500" /> Қол жеткізілген Жетістіктер
      </h4>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {achievements.map((ach) => {
          const isUnlocked = completedCount >= ach.req;
          return (
            <div
              key={ach.id}
              className={`p-4 rounded-2xl border-2 flex items-start gap-3 transition-all ${
                isUnlocked 
                  ? "bg-gradient-to-br from-amber-50 to-orange-50/30 border-[#D4AF37] shadow-sm" 
                  : "bg-stone-50 border-stone-200 opacity-60"
              }`}
            >
              <div className={`p-2 rounded-xl shrink-0 ${isUnlocked ? "bg-amber-100" : "bg-stone-200"}`}>
                <Award className={`w-6 h-6 ${isUnlocked ? "text-amber-600" : "text-stone-900"}`} />
              </div>
              <div>
                <p className="font-black text-slate-900 text-base">{ach.title}</p>
                <p className="text-xs text-slate-900 font-medium mt-1">{ach.desc}</p>
                <div className="mt-2">
                  {isUnlocked ? (
                    <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md uppercase border border-emerald-200">
                      Ашылды
                    </span>
                  ) : (
                    <span className="text-[10px] font-black text-stone-900 bg-stone-100 px-2 py-0.5 rounded-md uppercase">
                      Прогресс: {completedCount}/{ach.req}
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}