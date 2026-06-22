"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { heroesData, Hero } from "@/app/data/heroesData";
import HeroCard from "@/components/HeroCard";
import HeroDetails from "@/components/HeroDetails";
import HeroQuiz from "@/components/HeroQuiz";
import HeroAchievements from "@/components/HeroAchievements";
import HeroProgress from "@/components/HeroProgress";
import { Shield, Award, Zap } from "lucide-react";

export default function HeroesPage() {
  const [selectedHeroId, setSelectedHeroId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"list" | "details" | "quiz">("list");
  const [xp, setXp] = useState<number>(0);
  const [completedHeroes, setCompletedHeroes] = useState<string[]>([]);
  const [readHeroes, setReadHeroes] = useState<string[]>([]);

  // LocalStorage арқылы Firestore симуляциясы
  useEffect(() => {
    const savedXp = localStorage.getItem("qazmura_xp");
    const savedCompleted = localStorage.getItem("qazmura_completed");
    const savedRead = localStorage.getItem("qazmura_read");

    if (savedXp) setXp(parseInt(savedXp, 10));
    if (savedCompleted) setCompletedHeroes(JSON.parse(savedCompleted));
    if (savedRead) setReadHeroes(JSON.parse(savedRead));
  }, []);

  const updateFirestoreSim = (newXp: number, completedList: string[], readList: string[]) => {
    setXp(newXp);
    setCompletedHeroes(completedList);
    setReadHeroes(readList);
    localStorage.setItem("qazmura_xp", newXp.toString());
    localStorage.setItem("qazmura_completed", JSON.stringify(completedList));
    localStorage.setItem("qazmura_read", JSON.stringify(readList));
  };

  const handleReadComplete = (heroId: string) => {
    if (!readHeroes.includes(heroId)) {
      const newRead = [...readHeroes, heroId];
      const newXp = xp + 20; // Мақаланы толық оқығаны үшін +20 XP
      updateFirestoreSim(newXp, completedHeroes, newRead);
      triggerFloatingXpEffect();
    }
    setViewMode("quiz");
  };

  const handleQuizComplete = (heroId: string, correctCount: number) => {
    let earnedXp = correctCount * 10; // Әр дұрыс жауапқа +10 XP
    const newCompleted = [...completedHeroes];
    
    if (!completedHeroes.includes(heroId)) {
      newCompleted.push(heroId);
      earnedXp += 50; // Бөлімді (тестті) толық аяқтағанда +50 XPBonus
      confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 } });
    }

    const totalXp = xp + earnedXp;
    updateFirestoreSim(totalXp, newCompleted, readHeroes);
    setViewMode("list");
    setSelectedHeroId(null);
  };

  const triggerFloatingXpEffect = () => {
    confetti({ particleCount: 40, angle: 60, spread: 55, origin: { x: 0 } });
    confetti({ particleCount: 40, angle: 120, spread: 55, origin: { x: 1 } });
  };

  const currentHero = heroesData.find((h) => h.id === selectedHeroId);

  return (
    <div className="min-h-screen bg-[#fcf8f2] text-black antialiased selection:bg-amber-200">
      {/* 🏛️ PREMIUM HEADER */}
      <header className="sticky top-0 z-50 bg-[#002B49] border-b-4 border-[#D4AF37] px-6 py-4 shadow-xl">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-[#D4AF37] p-2 rounded-xl shadow-md">
              <Shield className="w-8 h-8 text-[#002B49]" />
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-wider text-[#D4AF37] uppercase font-serif">
                QAZMURA <span className="text-white">| Батырлар</span>
              </h1>
              <p className="text-xs text-white uppercase tracking-widest font-semibold">
                Premium Education Platform
              </p>
            </div>
          </div>

          {/* 🌟 STATS BAR */}
          <div className="flex items-center gap-6">
            <HeroProgress completedCount={completedHeroes.length} totalCount={heroesData.length} />
            
            <motion.div 
              className="bg-amber-50 border-2 border-[#D4AF37] px-4 py-2 rounded-2xl flex items-center gap-2 shadow-inner"
              whileHover={{ scale: 1.05 }}
            >
              <Zap className="w-6 h-6 text-amber-500 fill-amber-500 animate-pulse" />
              <span className="text-xl font-black text-slate-900">{xp} <span className="text-sm font-bold text-slate-900">XP</span></span>
            </motion.div>
          </div>
        </div>
      </header>

      {/* 🌍 MAIN CONTENT CONTAINER */}
      <main className="max-w-7xl mx-auto px-4 py-10">
        <AnimatePresence mode="wait">
          {viewMode === "list" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-12"
            >
              {/* 🎯 HERO JUMBOTRON */}
              <div className="bg-gradient-to-r from-[#002B49] to-[#004B75] rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl border-b-8 border-[#D4AF37]">
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:16px_16px]"></div>
                <div className="relative z-10 max-w-3xl">
                  <span className="bg-[#D4AF37] text-black text-xs font-black uppercase px-3 py-1 rounded-full shadow">
                    Ұлы Дала Мұрасы
                  </span>
                  <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-white mt-4 font-serif">
                    Тарихты Тұлғалар Арқылы Таны
                  </h2>
                  <p className="mt-4 text-base text-white/90 font-medium leading-relaxed">
                    Қазақ халқының бостандығы мен тұтастығын қорғаған 12 ұлы батырдың өмір жолы, 
                    ерліктері мен тарихты өзгерткен шешімдері. Мақалаларды оқыңыз, біліміңізді тексеріп, XP жинаңыз!
                  </p>
                </div>
              </div>

              {/* 🏅 ACHIEVEMENTS PANEL */}
              <HeroAchievements completedCount={completedHeroes.length} />

              {/* 🎴 GRID LIST OF HEROES */}
              <div>
                <h3 className="text-3xl font-black text-slate-900 mb-6 font-serif border-l-8 border-[#002B49] pl-4">
                  Батырлар Шежіресі
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {heroesData.map((hero) => (
                    <HeroCard
                      key={hero.id}
                      hero={hero}
                      isCompleted={completedHeroes.includes(hero.id)}
                      onSelect={() => {
                        setSelectedHeroId(hero.id);
                        setViewMode("details");
                      }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {viewMode === "details" && currentHero && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <HeroDetails
                hero={currentHero}
                onBack={() => {
                  setViewMode("list");
                  setSelectedHeroId(null);
                }}
                onStartQuiz={() => handleReadComplete(currentHero.id)}
              />
            </motion.div>
          )}

          {viewMode === "quiz" && currentHero && (
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
            >
              <HeroQuiz
                hero={currentHero}
                onFinish={(correctCount) => handleQuizComplete(currentHero.id, correctCount)}
                onCancel={() => setViewMode("details")}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}