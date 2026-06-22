'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { citiesData } from './data';

// Платформаның ішкі типтерін нақты сипаттап, қателерді жоямыз
interface DialectWord {
  word: string;
  meaning: string;
  options?: string[];
}

interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
}

interface ExtendedCity {
  id: string;
  name: string;
  region: string;
  population: string;
  founded: string;
  area?: string;
  description: string;
  history: string;
  economy?: string;
  landmarks?: string[];
  heroes?: string[];
  poets?: string[];
  dialectWords?: DialectWord[];
  facts?: string[];
  quiz: QuizQuestion[];
}

interface UserProgress {
  viewedCities: string[];
  completedQuizzes: string[];
  totalXP: number;
  achievements: string[];
}

export default function KazakhstanMapModule() {
  // Кастинг арқылы деректердің типтік сәйкестігін қамтамасыз етеміз
  const typedCitiesData = citiesData as unknown as ExtendedCity[];

  const [selectedCity, setSelectedCity] = useState<ExtendedCity | null>(null);
  const [activeTab, setActiveTab] = useState<'info' | 'quiz'>('info');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Тест жағдайлары
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  // Пайдаланушы прогресі
  const [progress, setProgress] = useState<UserProgress>({
    viewedCities: [],
    completedQuizzes: [],
    totalXP: 0,
    achievements: []
  });

  const handleSelectCity = (cityId: string) => {
    const city = typedCitiesData.find(c => c.id.toLowerCase() === cityId.toLowerCase());
    if (!city) return;

    setSelectedCity(city);
    setActiveTab('info');
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setQuizScore(0);
    setQuizFinished(false);

    if (!progress.viewedCities.includes(city.id)) {
      setProgress(prev => {
        const updatedViewed = [...prev.viewedCities, city.id];
        const newXP = prev.totalXP + 20;
        const achievements = [...prev.achievements];
        
        if (updatedViewed.length === 1 && !achievements.includes('🥇 Қазақстан зерттеушісі')) {
          achievements.push('🥇 Қазақстан зерттеушісі');
        }
        if (updatedViewed.length === typedCitiesData.length && !achievements.includes('👑 Ұлы дала энциклопедиясы')) {
          achievements.push('👑 Ұлы дала энциклопедиясы');
        }

        return { ...prev, viewedCities: updatedViewed, totalXP: newXP, achievements };
      });
    }
  };

  const handleAnswerSubmit = (optionIndex: number) => {
    if (isAnswered || !selectedCity || !selectedCity.quiz?.[currentQuestionIndex]) return;
    setSelectedAnswer(optionIndex);
    setIsAnswered(true);

    const isCorrect = optionIndex === selectedCity.quiz[currentQuestionIndex].correctAnswer;
    if (isCorrect) {
      setQuizScore(prev => prev + 1);
      setProgress(prev => ({ ...prev, totalXP: prev.totalXP + 10 }));
    }
  };

  const handleNextQuestion = () => {
    if (!selectedCity || !selectedCity.quiz) return;
    if (currentQuestionIndex + 1 < selectedCity.quiz.length) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      setQuizFinished(true);
      if (!progress.completedQuizzes.includes(selectedCity.id)) {
        setProgress(prev => {
          const updatedQuizzes = [...prev.completedQuizzes, selectedCity.id];
          const newXP = prev.totalXP + 50;
          const achievements = [...prev.achievements];

          if (updatedQuizzes.length === 5 && !achievements.includes('🏆 География шебері')) {
            achievements.push('🏆 География шебері');
          }

          return { ...prev, completedQuizzes: updatedQuizzes, totalXP: newXP, achievements };
        });
      }
    }
  };

  const filteredCities = typedCitiesData.filter(c =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const completionPercentage = typedCitiesData.length > 0 
    ? Math.round((progress.viewedCities.length / typedCitiesData.length) * 100) 
    : 0;

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#1E293B] font-sans antialiased">
      {/* Платформа Хедері */}
      <header className="bg-[#002B49] text-white p-6 shadow-xl border-b-4 border-[#D4AF37]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h1 className="text-3xl font-extrabold tracking-wide text-[#D4AF37]">QAZMURA</h1>
            <p className="text-sm text-slate-300">«Қазақстан картасы» интерактивті энциклопедиялық модулі</p>
          </div>
          <div className="flex flex-wrap gap-4 items-center bg-[#001f35] p-3 rounded-xl border border-[#D4AF37]/30">
            <div className="text-center px-4 border-r border-slate-700">
              <span className="block text-xs text-slate-400">Жалпы Ұпай</span>
              <span className="text-xl font-bold text-[#D4AF37]">{progress.totalXP} XP</span>
            </div>
            <div className="text-center px-4 border-r border-slate-700">
              <span className="block text-xs text-slate-400">Зерттелген қалалар</span>
              <span className="text-xl font-bold text-white">{progress.viewedCities.length} / {typedCitiesData.length}</span>
            </div>
            <div className="text-center px-4">
              <span className="block text-xs text-slate-400">Прогресс</span>
              <span className="text-xl font-bold text-green-400">{completionPercentage}%</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-4 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Сол жақ панель */}
        <section className="lg:col-span-4 space-y-6">
          <div className="bg-[#FFFFFF] p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h2 className="text-xl font-bold text-[#002B49] mb-4 border-b pb-2 flex items-center gap-2">🏆 Жетістіктер</h2>
            {progress.achievements.length === 0 ? (
              <p className="text-sm text-gray-500 italic">Жетістіктер әлі ашылмады. Аймақтарды зерттей бастаңыз!</p>
            ) : (
              <div className="space-y-2">
                {progress.achievements.map((ach, idx) => (
                  <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }} 
                    animate={{ scale: 1, opacity: 1 }} 
                    key={idx} 
                    className="p-3 bg-[#D4AF37]/10 border border-[#D4AF37] rounded-xl font-semibold text-[#002B49] text-sm"
                  >
                    {ach}
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          <div className="bg-[#FFFFFF] p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="text-lg font-bold text-[#002B49] mb-3">🔍 Қаланы таңдау ({filteredCities.length})</h3>
            <input
              type="text"
              placeholder="Қала атауын жазыңыз..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-3 border border-slate-300 rounded-xl focus:outline-none focus:border-[#002B49] text-[#111111] mb-4 text-sm"
            />
            <div className="max-h-64 overflow-y-auto space-y-1 pr-2 custom-scrollbar">
              {filteredCities.map(city => (
                <button
                  key={city.id}
                  onClick={() => handleSelectCity(city.id)}
                  className={`w-full text-left p-3 rounded-xl transition-all text-sm font-medium ${
                    selectedCity?.id === city.id 
                      ? 'bg-[#002B49] text-white shadow-md' 
                      : 'hover:bg-slate-50 text-slate-700 border border-transparent hover:border-slate-100'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span>{city.name}</span>
                    <span className="text-xs opacity-60">{city.founded}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Оң жақ/Орталық панель */}
        <section className="lg:col-span-8 space-y-8">
          {/* Карта блогы */}
          <div className="bg-[#FFFFFF] p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center justify-center">
            <h2 className="text-xl font-bold text-[#002B49] mb-2 text-center">Қазақстан Республикасының Интерактивті Картасы</h2>
            <p className="text-xs text-slate-500 mb-6 text-center">Энциклопедиялық деректерді көру үшін кез келген облысты немесе қаланы басыңыз</p>
            
            <div className="w-full max-w-3xl aspect-[1000/620] bg-slate-50 rounded-xl border border-slate-200 p-4 relative flex items-center justify-center overflow-hidden">
              <svg viewBox="0 0 1000 620" className="w-full h-full drop-shadow-md select-none">
                <g stroke="#FFF" strokeWidth="1.5" strokeLinejoin="round" className="transition-all">
                  <path id="KZ-ZAP" d="M30 180 L180 110 L230 140 L210 240 L120 280 L40 250 Z" fill="#002B49" fillOpacity={selectedCity?.id === 'oral' ? '0.7' : '0.25'} className="hover:fill-[#D4AF37] hover:fill-opacity-60 cursor-pointer transition-all" onClick={() => handleSelectCity('oral')} />
                  <path id="KZ-ATY" d="M40 250 L120 280 L170 350 L110 420 L20 370 Z" fill="#002B49" fillOpacity={selectedCity?.id === 'atyrau' ? '0.7' : '0.25'} className="hover:fill-[#D4AF37] hover:fill-opacity-60 cursor-pointer transition-all" onClick={() => handleSelectCity('atyrau')} />
                  <path id="KZ-MAN" d="M20 370 L110 420 L150 390 L180 500 L50 520 Z" fill="#002B49" fillOpacity={selectedCity?.id === 'aqtau' ? '0.7' : '0.25'} className="hover:fill-[#D4AF37] hover:fill-opacity-60 cursor-pointer transition-all" onClick={() => handleSelectCity('aqtau')} />
                  <path id="KZ-AKT" d="M180 110 L320 160 L380 340 L260 440 L170 350 L120 280 L210 240 Z" fill="#002B49" fillOpacity={selectedCity?.id === 'aqtobe' ? '0.7' : '0.25'} className="hover:fill-[#D4AF37] hover:fill-opacity-60 cursor-pointer transition-all" onClick={() => handleSelectCity('aqtobe')} />
                  <path id="KZ-KOS" d="M320 160 L490 120 L520 250 L430 380 L380 340 Z" fill="#002B49" fillOpacity={selectedCity?.id === 'qostanay' ? '0.7' : '0.25'} className="hover:fill-[#D4AF37] hover:fill-opacity-60 cursor-pointer transition-all" onClick={() => handleSelectCity('qostanay')} />
                  <path id="KZ-SEV" d="M490 120 L610 90 L630 160 L540 190 Z" fill="#002B49" fillOpacity={selectedCity?.id === 'petropavl' ? '0.7' : '0.25'} className="hover:fill-[#D4AF37] hover:fill-opacity-60 cursor-pointer transition-all" onClick={() => handleSelectCity('petropavl')} />
                  <path id="KZ-AKM" d="M540 190 L630 160 L650 250 L530 290 L520 250 Z" fill="#002B49" fillOpacity={selectedCity?.id === 'kokshetau' ? '0.7' : '0.25'} className="hover:fill-[#D4AF37] hover:fill-opacity-60 cursor-pointer transition-all" onClick={() => handleSelectCity('kokshetau')} />
                  <path id="KZ-PAV" d="M630 160 L780 140 L810 240 L690 280 L650 250 Z" fill="#002B49" fillOpacity={selectedCity?.id === 'pavlodar' ? '0.7' : '0.25'} className="hover:fill-[#D4AF37] hover:fill-opacity-60 cursor-pointer transition-all" onClick={() => handleSelectCity('pavlodar')} />
                  <path id="KZ-KAR" d="M430 380 L530 290 L690 280 L730 390 L590 460 L480 430 Z" fill="#002B49" fillOpacity={selectedCity?.id === 'qaragandy' ? '0.7' : '0.25'} className="hover:fill-[#D4AF37] hover:fill-opacity-60 cursor-pointer transition-all" onClick={() => handleSelectCity('qaragandy')} />
                  <path id="KZ-ULY" d="M380 340 L430 380 L480 430 L450 500 L300 470 L260 440 Z" fill="#002B49" fillOpacity={selectedCity?.id === 'zhezqazgan' ? '0.7' : '0.25'} className="hover:fill-[#D4AF37] hover:fill-opacity-60 cursor-pointer transition-all" onClick={() => handleSelectCity('zhezqazgan')} />
                  <path id="KZ-VOS" d="M810 240 L960 210 L980 340 L870 360 Z" fill="#002B49" fillOpacity={selectedCity?.id === 'oskemen' ? '0.7' : '0.25'} className="hover:fill-[#D4AF37] hover:fill-opacity-60 pointer-events-auto cursor-pointer transition-all" onClick={() => handleSelectCity('oskemen')} />
                  <path id="KZ-ABA" d="M690 280 L810 240 L870 360 L830 430 L730 390 Z" fill="#002B49" fillOpacity={selectedCity?.id === 'semey' ? '0.7' : '0.25'} className="hover:fill-[#D4AF37] hover:fill-opacity-60 cursor-pointer transition-all" onClick={() => handleSelectCity('semey')} />
                  <path id="KZ-ZHE" d="M730 390 L830 430 L810 520 L680 490 Z" fill="#002B49" fillOpacity={selectedCity?.id === 'taldyqorgan' ? '0.7' : '0.25'} className="hover:fill-[#D4AF37] hover:fill-opacity-60 cursor-pointer transition-all" onClick={() => handleSelectCity('taldyqorgan')} />
                  <path id="KZ-ALM" d="M590 460 L680 490 L810 520 L760 580 L620 540 Z" fill="#002B49" fillOpacity={selectedCity?.id === 'qonaev' ? '0.7' : '0.25'} className="hover:fill-[#D4AF37] hover:fill-opacity-60 cursor-pointer transition-all" onClick={() => handleSelectCity('qonaev')} />
                  <path id="KZ-ZHA" d="M480 430 L590 460 L620 540 L500 550 L470 510 Z" fill="#002B49" fillOpacity={selectedCity?.id === 'taraz' ? '0.7' : '0.25'} className="hover:fill-[#D4AF37] hover:fill-opacity-60 cursor-pointer transition-all" onClick={() => handleSelectCity('taraz')} />
                  <path id="KZ-TUR" d="M360 510 L470 510 L500 550 L430 600 L350 560 Z" fill="#002B49" fillOpacity={selectedCity?.id === 'turkistan' ? '0.7' : '0.25'} className="hover:fill-[#D4AF37] hover:fill-opacity-60 cursor-pointer transition-all" onClick={() => handleSelectCity('turkistan')} />
                  <path id="KZ-KZY" d="M300 470 L450 500 L470 510 L360 510 L350 560 L240 510 L260 440 Z" fill="#002B49" fillOpacity={selectedCity?.id === 'qyvylorda' ? '0.7' : '0.25'} className="hover:fill-[#D4AF37] hover:fill-opacity-60 cursor-pointer transition-all" onClick={() => handleSelectCity('qyvylorda')} />
                </g>

                {/* Мегаполистер */}
                <g>
                  <circle cx="600" cy="220" r="9" fill="#D4AF37" stroke="#FFF" strokeWidth="2" className="cursor-pointer hover:r-12 transition-all drop-shadow" onClick={() => handleSelectCity('astana')} />
                  <text x="600" y="205" textAnchor="middle" className="text-[11px] font-black fill-[#002B49]">АСТАНА</text>

                  <circle cx="690" cy="530" r="9" fill="#D4AF37" stroke="#FFF" strokeWidth="2" className="cursor-pointer hover:r-12 transition-all drop-shadow" onClick={() => handleSelectCity('almaty')} />
                  <text x="690" y="515" textAnchor="middle" className="text-[11px] font-black fill-[#002B49]">АЛМАТЫ</text>

                  <circle cx="430" cy="560" r="7" fill="#E11D48" stroke="#FFF" strokeWidth="1.5" className="cursor-pointer hover:r-10 transition-all drop-shadow" onClick={() => handleSelectCity('shymkent')} />
                  <text x="430" y="580" textAnchor="middle" className="text-[10px] font-bold fill-slate-700">Шымкент</text>
                </g>
              </svg>
            </div>
          </div>

          {/* Инфо Блок */}
          <AnimatePresence mode="wait">
            {selectedCity ? (
              <motion.div
                key={selectedCity.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="bg-[#FFFFFF] rounded-2xl border-2 border-[#002B49] shadow-xl overflow-hidden"
              >
                <div className="p-8 bg-[#002B49] text-white relative">
                  <div className="absolute top-6 right-8 bg-[#D4AF37] text-[#111111] font-bold text-xs px-3 py-1 rounded-full uppercase tracking-wide">
                    {selectedCity.region}
                  </div>
                  <h2 className="text-4xl font-black text-white">{selectedCity.name}</h2>
                  <div className="flex flex-wrap gap-4 mt-3 text-sm text-slate-300">
                    <span>👥 Халық саны: <strong className="text-white">{selectedCity.population}</strong></span>
                    <span>•</span>
                    <span>📅 Құрылған жылы: <strong className="text-white">{selectedCity.founded}</strong></span>
                    <span>•</span>
                    <span>📐 Жер аумағы: <strong className="text-white">{selectedCity.area || 'Анықталмаған'}</strong></span>
                  </div>
                </div>

                <div className="flex border-b border-slate-200 bg-slate-50">
                  <button
                    onClick={() => setActiveTab('info')}
                    className={`flex-1 py-4 text-center font-bold text-sm transition-all ${
                      activeTab === 'info' ? 'border-b-4 border-[#002B49] text-[#002B49] bg-white' : 'text-slate-500 hover:text-[#111111]'
                    }`}
                  >
                    📍 Тарихи-жағрафиялық деректер
                  </button>
                  <button
                    onClick={() => setActiveTab('quiz')}
                    className={`flex-1 py-4 text-center font-bold text-sm transition-all ${
                      activeTab === 'quiz' ? 'border-b-4 border-[#002B49] text-[#002B49] bg-white' : 'text-slate-500 hover:text-[#111111]'
                    }`}
                  >
                    📝 Білім сынағы (+50 XP)
                  </button>
                </div>

                <div className="p-6 lg:p-8 space-y-6">
                  {activeTab === 'info' ? (
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-bold text-[#002B49] flex items-center gap-2">📍 Жалпы сипаттама</h3>
                        <p className="mt-2 text-slate-700 leading-relaxed text-sm">{selectedCity.description}</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-100">
                        <div>
                          <h3 className="text-base font-bold text-[#002B49]">📜 Тарих тереңінен</h3>
                          <p className="mt-2 text-xs text-slate-600 leading-relaxed">{selectedCity.history}</p>
                        </div>
                        <div>
                          <h3 className="text-base font-bold text-[#002B49]">🏭 Қазіргі экономикасы</h3>
                          <p className="mt-2 text-xs text-slate-600 leading-relaxed">{selectedCity.economy || 'Өңірлік индустрия мен өндірістік орталық.'}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-slate-100">
                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                          <h4 className="font-bold text-[#002B49] text-sm mb-2">🏛 Көрікті жерлері</h4>
                          <ul className="list-disc list-inside text-xs space-y-1.5 text-slate-700">
                            {selectedCity.landmarks?.map((l, i) => <li key={i}>{l}</li>) || <li>Мәлімет енгізілмеген</li>}
                          </ul>
                        </div>
                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                          <h4 className="font-bold text-[#002B49] text-sm mb-2">⚔ Ұлы тұлғалары</h4>
                          <ul className="list-disc list-inside text-xs space-y-1 text-slate-700">
                            {selectedCity.heroes?.map((h, i) => <li key={i}>{h} (Батыр)</li>)}
                            {selectedCity.poets?.map((p, i) => <li key={i}>{p}</li>)}
                          </ul>
                        </div>
                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                          <h4 className="font-bold text-[#002B49] text-sm mb-2">🗣 Аймақтық лексика</h4>
                          <ul className="list-disc list-inside text-xs space-y-1 text-slate-700">
                            {selectedCity.dialectWords && selectedCity.dialectWords.length > 0 ? (
                              selectedCity.dialectWords.map((w, i) => (
                                <li key={i} className="italic">
                                  «{w.word}» - {w.meaning}
                                </li>
                              ))
                            ) : (
                              <li>Жергілікті сөздер табылбады</li>
                            )}
                          </ul>
                        </div>
                      </div>

                      {selectedCity.facts && selectedCity.facts.length > 0 && (
                        <div className="bg-yellow-50/60 p-4 rounded-xl border border-yellow-200">
                          <h4 className="font-bold text-[#002B49] text-sm mb-1">💡 Қызықты деректер мен фактілер</h4>
                          <ul className="list-disc list-inside text-xs space-y-1 text-slate-700">
                            {selectedCity.facts.map((f, i) => <li key={i}>{f}</li>)}
                          </ul>
                        </div>
                      )}
                    </div>
                  ) : (
                    /* Тест жүйесі */
                    <div className="space-y-6">
                      {!quizFinished ? (
                        <div>
                          <div className="flex justify-between items-center mb-4">
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Сұрақ {currentQuestionIndex + 1} / {selectedCity.quiz?.length || 1}</span>
                            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-md font-bold">Дұрыс жауап: {quizScore}</span>
                          </div>
                          
                          <h3 className="text-lg font-bold text-[#002B49] mb-4">
                            {selectedCity.quiz?.[currentQuestionIndex]?.question || 'Сұрақ мәтіні дайындалуда...'}
                          </h3>

                          <div className="space-y-2">
                            {selectedCity.quiz?.[currentQuestionIndex]?.options.map((option, idx) => {
                              let btnClass = "border-slate-200 hover:bg-slate-50 text-[#1E293B]";
                              if (isAnswered) {
                                if (idx === selectedCity.quiz[currentQuestionIndex].correctAnswer) {
                                  btnClass = "bg-green-100 border-green-500 text-green-900 font-bold";
                                } else if (idx === selectedAnswer) {
                                  btnClass = "bg-red-100 border-red-500 text-red-900";
                                }
                              }
                              return (
                                <button
                                  key={idx}
                                  disabled={isAnswered}
                                  onClick={() => handleAnswerSubmit(idx)}
                                  className={`w-full text-left p-4 border-2 rounded-xl text-sm transition-all ${btnClass}`}
                                >
                                  {option}
                                </button>
                              );
                            })}
                          </div>

                          {isAnswered && (
                            <button
                              onClick={handleNextQuestion}
                              className="mt-6 w-full py-3 bg-[#002B49] text-white font-bold rounded-xl hover:bg-[#001f35] transition-all text-sm"
                            >
                              {currentQuestionIndex + 1 === selectedCity.quiz.length ? "Тестті аяқтау" : "Келесі сұраққа өту"}
                            </button>
                          )}
                        </div>
                      ) : (
                        <div className="text-center py-12 space-y-4">
                          <div className="text-4xl">🎉</div>
                          <h3 className="text-2xl font-black text-[#002B49]">Сынақ sәтті аяқталды!</h3>
                          <p className="text-sm text-slate-600">
                            Сіз берілген сұрақтардың <strong>{quizScore}</strong> жауабын нақты таптыңыз.
                          </p>
                          <div className="p-3 bg-green-50 text-green-800 rounded-xl inline-block font-bold text-xs border border-green-200">
                            Прогресс жаңартылды: +50 XP платформалық бонус есептелді!
                          </div>
                          <button
                            onClick={() => {
                              setQuizFinished(false);
                              setCurrentQuestionIndex(0);
                              setQuizScore(0);
                              setSelectedAnswer(null);
                              setIsAnswered(false);
                            }}
                            className="block mx-auto mt-4 px-6 py-2 border-2 border-[#002B49] text-[#002B49] font-bold rounded-xl text-xs hover:bg-slate-50"
                          >
                            Тестті қайта тапсыру
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            ) : (
              <div className="h-64 bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center text-center p-6">
                <span className="text-3xl mb-2">🗺</span>
                <h3 className="font-bold text-[#002B49]">Географиялық нысан таңдалмады</h3>
                <p className="text-xs text-slate-500 max-w-xs mt-1">Жоғарыдағы интерактивті картадан облыс аумағын басыңыз немесе іздеу тізімін қолданыңыз.</p>
              </div>
            )}
          </AnimatePresence>
        </section>
      </main>
    </div>
  );
}