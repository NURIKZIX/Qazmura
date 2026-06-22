// src/components/HeroQuiz.tsx
"use client";

import { useState } from "react";
import { heroesData, Hero } from "@/app/data/heroesData";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, HelpCircle, ArrowRight, Award } from "lucide-react";

interface HeroQuizProps {
  hero: Hero;
  onFinish: (correctAnswersCount: number) => void;
  onCancel: () => void;
}

export default function HeroQuiz({ hero, onFinish, onCancel }: HeroQuizProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showResultScreen, setShowResultScreen] = useState(false);

  const currentQuestion = hero.tests[currentStep];
  const totalQuestions = hero.tests.length;

  const handleOptionSelect = (option: string) => {
    if (isAnswered) return;
    setSelectedOption(option);
  };

  const handleCheckAnswer = () => {
    if (!selectedOption || isAnswered) return;

    const isCorrect = selectedOption === currentQuestion.answer;
    if (isCorrect) setScore(score + 1);
    setIsAnswered(true);
  };

  const handleNext = () => {
    if (currentStep < totalQuestions - 1) {
      setCurrentStep(currentStep + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setShowResultScreen(true);
    }
  };

  // Прогресс пайызы
  const progressPercent = ((currentStep + 1) / totalQuestions) * 100;

  if (showResultScreen) {
    return (
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="max-w-xl mx-auto bg-white rounded-3xl p-8 border-4 border-[#D4AF37] text-center shadow-2xl space-y-6"
      >
        <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto border-2 border-[#D4AF37]">
          <Award className="w-12 h-12 text-[#D4AF37]" />
        </div>
        
        <h3 className="text-3xl font-black text-slate-900 font-serif">Тест Нәтижесі</h3>
        <p className="text-xl font-bold text-slate-900">
          {hero.name} бойынша сынақ аяқталды!
        </p>

        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
          <p className="text-base font-black text-slate-900 uppercase">Нәтиже:</p>
          <p className="text-4xl font-black text-[#002B49] mt-2">
            {score} / {totalQuestions}
          </p>
          <p className="text-sm text-emerald-600 font-black mt-3 uppercase tracking-wider">
            жинаған ұпайыңыз: +{score * 10} XP {score === totalQuestions && " + 50 XP БОНУС!"}
          </p>
        </div>

        <button
          onClick={() => onFinish(score)}
          className="w-full bg-[#002B49] hover:bg-[#003B63] text-white font-black py-4 rounded-xl shadow-lg border-b-4 border-[#D4AF37] transition-all"
        >
          Марапаттарды алу және жаңарту
        </button>
      </motion.div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-2xl border-2 border-slate-100 overflow-hidden">
      {/* 🚥 PROGRESS BAR HEADER */}
      <div className="p-6 bg-slate-50 border-b border-slate-100 space-y-3">
        <div className="flex justify-between items-center text-sm font-black text-slate-900">
          <span className="uppercase tracking-wider flex items-center gap-1.5">
            <HelpCircle className="w-4 h-4 text-[#002B49]" /> Тест сұрағы: {currentStep + 1} / {totalQuestions}
          </span>
          <button onClick={onCancel} className="text-rose-600 hover:underline">Тестті тоқтату</button>
        </div>
        <div className="w-full bg-slate-200 h-3 rounded-full overflow-hidden">
          <motion.div 
            className="bg-[#002B49] h-full" 
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* ❓ QUESTION BOX */}
      <div className="p-6 sm:p-10 space-y-6">
        <h4 className="text-2xl font-black text-slate-900 font-serif leading-tight">
          {currentQuestion.question}
        </h4>

        {/* 🔘 OPTIONS LIST */}
        <div className="space-y-3">
          {currentQuestion.options.map((option, idx) => {
            const isSelected = selectedOption === option;
            const isCorrectAnswer = option === currentQuestion.answer;
            
            let btnStyle = "border-slate-200 bg-white hover:bg-amber-50/50 hover:border-[#D4AF37]";
            if (isSelected) btnStyle = "border-[#002B49] bg-blue-50/70 ring-2 ring-[#002B49]";
            
            if (isAnswered) {
              if (isCorrectAnswer) {
                btnStyle = "border-emerald-500 bg-emerald-50 text-emerald-900 font-black ring-2 ring-emerald-500";
              } else if (isSelected && !isCorrectAnswer) {
                btnStyle = "border-rose-500 bg-rose-50 text-rose-900 font-black ring-2 ring-rose-500";
              } else {
                btnStyle = "border-slate-100 bg-white opacity-50 cursor-not-allowed";
              }
            }

            return (
              <button
                key={idx}
                disabled={isAnswered}
                onClick={() => handleOptionSelect(option)}
                className={`w-full text-left p-4 rounded-xl border-2 font-bold text-base transition-all flex items-center justify-between ${btnStyle}`}
              >
                <span>{option}</span>
                {isAnswered && isCorrectAnswer && <Check className="w-5 h-5 text-emerald-600" />}
                {isAnswered && isSelected && !isCorrectAnswer && <X className="w-5 h-5 text-rose-600" />}
              </button>
            );
          })}
        </div>

        {/* 🛠️ FOOTER ACTIONS */}
        <div className="pt-4 flex justify-end">
          {!isAnswered ? (
            <button
              disabled={!selectedOption}
              onClick={handleCheckAnswer}
              className={`px-8 py-4 rounded-xl font-black text-sm uppercase tracking-wider transition-all border-b-4 ${
                selectedOption 
                  ? "bg-[#002B49] text-white border-[#D4AF37] hover:bg-[#003B63]" 
                  : "bg-slate-100 text-slate-900 border-slate-300 cursor-not-allowed"
              }`}
            >
              Жауапты тексеру
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-xl font-black text-sm uppercase tracking-wider border-b-4 border-emerald-800 transition-all flex items-center gap-2"
            >
              {currentStep === totalQuestions - 1 ? "Нәтижені көру" : "Келесі сұрақ"}
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}