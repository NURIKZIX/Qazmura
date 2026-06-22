// src/app/stories/page.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import StoryGenerator from "./StoryGenerator";
import StoryCard from "./StoryCard";
import { saveStoryToFirestore, updateUserXP } from "./firebase";

export default function StoriesPage() {
  const [storyContent, setStoryContent] = useState("");
  const [storyTitle, setStoryTitle] = useState("");
  const [currentMode, setCurrentMode] = useState<"classic" | "interactive">("classic");
  const [currentType, setCurrentType] = useState("");
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [userXp, setUserXp] = useState(100); // Мысал үшін жергілікті мемлекет, Firestore-дан тартылады
  
  // ChatGPT стиліндегі диалог тарихын сақтау (Интерактив үшін)
  const [storyHistory, setStoryHistory] = useState<{ role: string; content: string }[]>([]);

  const handleGenerateStory = async (prompt: string, mode: "classic" | "interactive", selectedType: string) => {
    setLoading(true);
    setCurrentMode(mode);
    setCurrentType(selectedType);
    
    try {
      const initialHistory = [{ role: "user", content: prompt }];
      
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: initialHistory }),
      });
      const data = await res.json();

      if (data.reply) {
        // Тақырыпты бірінші жолдан бөліп алу талпынысы
        const lines = data.reply.split("\n");
        const detectedTitle = lines[0].replace(/[#*]/g, "").trim();
        
        setStoryTitle(detectedTitle.length < 50 ? detectedTitle : "Сиқырлы Ертегі");
        setStoryContent(data.reply);
        setStoryHistory([
          ...initialHistory,
          { role: "assistant", content: data.reply }
        ]);
        
        // Ертегі сәтті жасалғаны үшін +10 XP
        handleXpReward(10);
      }
    } catch (error) {
      console.error("Жүйелік қате:", error);
      setStoryContent("⚠️ Ертегіні жасау кезінде техникалық қате орын алды.");
    } finally {
      setLoading(false);
    }
  };

  const handleActionChoice = async (choiceText: string) => {
    setActionLoading(true);
    const updatedHistory = [
      ...storyHistory,
      { role: "user", content: `Кейіпкер келесі кезекте мына қадамды жасайды: "${choiceText}". Осы таңдау бойынша ертегі желісін әрі қарай қызықты етіп жалғастырып жаз.` }
    ];

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updatedHistory }),
      });
      const data = await res.json();

      if (data.reply) {
        setStoryContent((prev) => `${prev}\n\n=== ${choiceText} ===\n\n${data.reply}`);
        setStoryHistory([
          ...updatedHistory,
          { role: "assistant", content: data.reply }
        ]);
        handleXpReward(10); // Жалғастырғаны үшін тағы +10 XP
      }
    } catch (error) {
      console.error("Интерактивті жалғастыру қатесі:", error);
    } finally {
      setActionLoading(false);
    }
  };

  const handleSaveStory = async () => {
    const mockUid = "user_qazmura_123"; // Жүйедегі пайдаланушы ID-і
    const payload = {
      uid: mockUid,
      title: storyTitle,
      content: storyContent,
      type: currentType,
      mode: currentMode,
      favorite: false
    };
    const docId = await saveStoryToFirestore(payload);
    if (docId) alert("✨ Ертегі сәтті сақталды! +10 XP қосылды.");
  };

  const handleXpReward = (amount: number) => {
    setUserXp(prev => prev + amount);
    // Нақты өндірісте: await updateUserXP("user_qazmura_123", amount);
  };

  const handleReset = () => {
    setStoryContent("");
    setStoryTitle("");
    setStoryHistory([]);
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center p-4 md:p-8 bg-gradient-to-br from-blue-950 via-slate-900 to-indigo-950 overflow-x-hidden text-slate-100">
      
      {/* 🌌 Қазақша ұлттық өрнек пен премиум фондық эффектілер */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none bg-[url('/kazakh-pattern.jpg')] bg-repeat bg-center"></div>
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-500/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Header Profile Info (XP Көрсеткіш) */}
      <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 flex items-center gap-2 text-sm z-10">
        <span>⭐ {userXp} XP</span>
      </div>

      <div className="w-full max-w-[800px] z-10 text-center space-y-8">
        
        {/* HERO БӨЛІМІ */}
        {!storyContent && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-3"
          >
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-500">
              📖 AI Ертегілер Әлемі
            </h1>
            <p className="text-slate-300 text-sm md:text-base max-w-xl mx-auto font-light">
              Қазақ тіліндегі ерекше ертегілерді AI көмегімен жасаңыз. Батырлар, дәстүрлер, сиқырлы әлемдер және өзіңіздің кейіпкерлеріңіз.
            </p>
          </motion.div>
        )}

        {/* АНИМАЦИЯЛЫҚ АУЫСПАЛЫ БЛОК */}
        <div className="w-full">
          <AnimatePresence mode="wait">
            {!storyContent ? (
              <motion.div
                key="generator"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <StoryGenerator onGenerate={handleGenerateStory} loading={loading} />
              </motion.div>
            ) : (
              <motion.div
                key="story-card"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <StoryCard
                  title={storyTitle}
                  content={storyContent}
                  mode={currentMode}
                  onActionChoice={handleActionChoice}
                  actionLoading={actionLoading}
                  onSave={handleSaveStory}
                  onReset={handleReset}
                  onXpReward={handleXpReward}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}