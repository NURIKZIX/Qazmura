"use client";

import { useState, useMemo, useEffect } from "react";
// Firebase интеграциясы үшін қажет болғанда комментарийді ашыңыз:
// import { doc, updateDoc, increment, serverTimestamp } from "firebase/firestore";
// import { auth, db } from "@/lib/firebase";

interface Question {
  qText: string;
  answers: string[]; // Бірнеше дұрыс нұсқа болуы мүмкін (кіші әріппен)
}

interface Passage {
  id: string;
  level: "A1" | "A2" | "B1";
  title: string;
  text: string;
  questions: Question[];
}

interface CategoriesData {
  [key: string]: Passage[];
}

// 6 Категория және әр деңгейге сай толық мәтіндер базасы
const readingDatabase: CategoriesData = {
  "📚 Күнделікті өмір": [
    {
      id: "life-1",
      level: "A1",
      title: "Айдананың дүкенге баруы",
      text: "Айдана дүкенге барды. Ол сүт пен нан сатып алды. Үйге тез қайтты.",
      questions: [
        { qText: "Айдана қайда барды?", answers: ["дүкенге", "дүкен"] },
        { qText: "Айдана не сатып алды?", answers: ["сүт пен нан", "нан мен сүт", "сүт, нан"] }
      ]
    },
    {
      id: "life-2",
      level: "A2",
      title: "Таңертеңгілік уақыт",
      text: "Мен таңертең ерте тұрамын. Бетімді жуып, таңғы ас ішемін. Кейін университетке барамын. Сабақ сағат тоғызда басталады.",
      questions: [
        { qText: "Мен қашан тұрамын?", answers: ["таңертең", "таңертең ерте"] },
        { qText: "Мен қайда барамын?", answers: ["университетке", "университет"] }
      ]
    },
    {
      id: "life-3",
      level: "B1",
      title: "Қазіргі қоғам және уақыт",
      text: "Қазіргі таңда адамдар уақытты тиімді пайдалануды үйренуде. Тайм-менеджмент өмір сапасын арттырады. Жұмыс пен демалыс арасындағы тепе-теңдікті сақтау өте маңызды.",
      questions: [
        { qText: "Уақытты тиімді пайдалану не істейді?", answers: ["өмір сапасын арттырады", "сапасын арттырады"] },
        { qText: "Не арасында тепе-теңдік сақтау маңызды?", answers: ["жұмыс пен демалыс", "жұмыс пен демалыс арасында"] }
      ]
    }
  ],
  "🏫 Білім": [
    {
      id: "edu-1",
      level: "A1",
      title: "Ержанның мектебі",
      text: "Ержан мектепке күн сайын барады. Ол жақсы оқиды. Оның сүйікті пәні — математика.",
      questions: [
        { qText: "Ержан қайда барады?", answers: ["мектепке", "мектеп"] },
        { qText: "Ержан қандай оқушы?", answers: ["жақсы", "жақсы оқушы"] }
      ]
    },
    {
      id: "edu-2",
      level: "A2",
      title: "Кітапханадағы жұмыс",
      text: "Біз кеше кітапханаға бардық. Сонда жаңа кітаптар алдық. Кітапхана өте тыныш және кең екен. Біз сонда екі сағат дайындалдық.",
      questions: [
        { qText: "Біз кеше қайда бардық?", answers: ["кітапханаға", "кітапхана"] },
        { qText: "Кітапхана қандай екен?", answers: ["тыныш және кең", "тыныш", "кең"] }
      ]
    },
    {
      id: "edu-3",
      level: "B1",
      title: "Заманауи білім беру трендтері",
      text: "Қазіргі білім беру жүйесінде цифрландыру мен жасанды интеллект кеңінен қолданылуда. Оқушылар онлайн платформалар арқылы кез келген уақытта білім ала алады. Бұл өзін-өзі дамытуға үлкен мүмкіндік береді.",
      questions: [
        { qText: "Білім беруде не кеңінен қолданылуда?", answers: ["цифрландыру мен жасанды интеллект", "жасанды интеллект", "цифрландыру"] },
        { qText: "Бұл не нәрсеге үлкен мүмкіндік береді?", answers: ["өзін-өзі дамытуға", "өзін өзі дамытуға"] }
      ]
    }
  ],
  "🇰🇿 Қазақстан": [
    {
      id: "kz-1",
      level: "A1",
      title: "Біздің Отан",
      text: "Қазақстан — үлкен мемлекет. Мұнда көптеген қалалар бар. Табиғаты өте әдемі.",
      questions: [
        { qText: "Қазақстан қандай мемлекет?", answers: ["үлкен", "үлкен мемлекет"] },
        { qText: "Табиғаты қандай?", answers: ["әдемі", "өте әдемі"] }
      ]
    },
    {
      id: "kz-2",
      level: "A2",
      title: "Саяхат және Саябақ",
      text: "Асан футбол ойнады. Ол достарымен саябақта болды. Кешке бәрі бірге үйіне қайтты. Олар демалысты жақсы өткізді.",
      questions: [
        { qText: "Асан не ойнады?", answers: ["футбол"] },
        { qText: "Асан кімдермен болды?", answers: ["достарымен", "өз достарымен"] }
      ]
    },
    {
      id: "kz-3",
      level: "B1",
      title: "Тәуелсіз Қазақстан",
      text: "Қазақстан — тәуелсіз мемлекет. Оның астанасы — Астана қаласы. Қазақстан табиғи ресурстарға бай ел болып табылады және әлемдік аренада өз орны бар.",
      questions: [
        { qText: "Қазақстан қандай мемлекет?", answers: ["тәуелсіз", "тәуелсіз мемлекет"] },
        { qText: "Қазақстанның астанасы қай қала?", answers: ["астана", "астана қаласы"] }
      ]
    }
  ],
  "📖 Қазақ әдебиеті": [
    {
      id: "lit-1",
      level: "A1",
      title: "Кітап оқу",
      text: "Әлия кітап оқығанды жақсы көреді. Ол бүгін қызықты ертегі оқыды.",
      questions: [
        { qText: "Әлия не оқығанды жақсы көреді?", answers: ["кітап", "кітап оқуды"] },
        { qText: "Ол бүгін не оқыды?", answers: ["ертегі", "қызықты ертегі"] }
      ]
    },
    {
      id: "lit-2",
      level: "A2",
      title: "Ыбырай Алтынсарин",
      text: "Ыбырай Алтынсарин — балалар әдебиетінің атасы. Ол алғаш рет қазақ балаларына арнап мектеп ашты. Оның 'Кел, балалар, оқылық!' өлеңі өте танымал.",
      questions: [
        { qText: "Ыбырай Алтынсарин кім?", answers: ["балалар әдебиетінің атасы", "ұстаз", "жазушы"] },
        { qText: "Ол не ашты?", answers: ["мектеп", "мектеп ашты"] }
      ]
    },
    {
      id: "lit-3",
      level: "B1",
      title: "Абай Құнанбайұлы",
      text: "Абай Құнанбайұлы — қазақтың ұлы ақыны, философы. Ол көптеген өлеңдер мен қара сөздер жазған. Оның шығармалары адамды адамгершілікке, білімге тәрбиелейді.",
      questions: [
        { qText: "Абай кім?", answers: ["ақын", "ұлы ақын", "философ"] },
        { qText: "Абай не жазған?", answers: ["өлеңдер мен қара сөздер", "қара сөздер мен өлеңдер", "өлеңдер", "кара создер"] }
      ]
    }
  ],
  "🏹 Батырлар": [
    {
      id: "hero-1",
      level: "A1",
      title: "Батырлар тұлғасы",
      text: "Қазақ батырлары өте күшті болған. Олар өз елін, жерін қорғаған.",
      questions: [
        { qText: "Батырлар қандай болған?", answers: ["күшті", "өте күшті"] },
        { qText: "Олар нені қорғаған?", answers: ["өз елін, жерін", "елді", "жерді", "өз елін"] }
      ]
    },
    {
      id: "hero-2",
      level: "A2",
      title: "Райымбек батыр",
      text: "Райымбек батыр — жоңғар шапқыншылығына қарсы тұрған ұлы қолбасшы. Ол жас кезінен бастап ерекше ерлігімен көзге түсті. Халық оны киелі батыр деп санаған.",
      questions: [
        { qText: "Райымбек батыр кім?", answers: ["ұлы қолбасшы", "қолбасшы", "батыр"] },
        { qText: "Халық оны кім деп санаған?", answers: ["киелі батыр", "киелі батыр деп"] }
      ]
    },
    {
      id: "hero-3",
      level: "B1",
      title: "Бөгенбай батырдың ерлігі",
      text: "Канжығалы Бөгенбай батыр — қазақ халқының тәуелсіздігі жолында жан аямай күрескен айбынды тұлға. Ол Абылай ханның бас қолбасшыларының бірі болды және ешқандай шайқаста жеңілмеген деген аңыз бар.",
      questions: [
        { qText: "Бөгенбай батыр кімнің бас қолбасшысы болды?", answers: ["абылай ханның", "абылай хан"] },
        { qText: "Ол қай жолда жан аямай күресті?", answers: ["тәуелсіздік жолында", "қазақ халқының тәуелсіздігі жолында"] }
      ]
    }
  ],
  "🎉 Дәстүрлер": [
    {
      id: "trad-1",
      level: "A1",
      title: "Наурыз мейрамы",
      text: "Наурыз — көктем мейрамы. Бұл күні адамдар наурыз көже пісіреді. Бәрі бір-бірін құттықтайды.",
      questions: [
        { qText: "Наурыз қандай мейрам?", answers: ["көктем", "көктем мейрамы"] },
        { qText: "Бұл күні не пісіреді?", answers: ["наурыз көже", "көже"] }
      ]
    },
    {
      id: "trad-2",
      level: "A2",
      title: "Тұсаукесер дәстүрі",
      text: "Тұсаукесер — қазақтың маңызды дәстүрі. Бала қадам басып жүре бастағанда оның тұсауын кеседі. Бұл баланың болашағы ашық, жүрісі жеңіл болсын деген ниетпен жасалады.",
      questions: [
        { qText: "Тұсаукесер қашан жасалады?", answers: ["бала қадам басып жүре бастағанда", "бала жүре бастағанда"] },
        { qText: "Бұл не үшін жасалады?", answers: ["болашағы ашық болу үшін", "баланың болашағы ашық, жүрісі жеңіл болсын деп"] }
      ]
    },
    {
      id: "trad-3",
      level: "B1",
      title: "Қонақжайлылық және Бата беру",
      text: "Қазақ халқы қонақжайлылықты жоғары бағалайды. Үйге келген қонаққа ең жақсы ас ұсынылады. Сыйлы ақсақалдар ас қайырғанда немесе сапарға шығар алдында жастарға ақ батасын береді. Бата — ізгі тілек пен рухани қолдау белгісі.",
      questions: [
        { qText: "Қазақ халқы нені жоғары бағалайды?", answers: ["қонақжайлылықты", "қонақжайлылық"] },
        { qText: "Бата ненің белгісі?", answers: ["ізгі тілек пен рухани қолдау", "ізгі тілек", "рухани қолдау белгісі"] }
      ]
    }
  ]
};

export default function Reading() {
  const categories = Object.keys(readingDatabase);
  
  // State басқару элементтері
  const [selectedCategory, setSelectedCategory] = useState<string>(categories[0]);
  const [currentPassageIndex, setCurrentPassageIndex] = useState<number>(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  
  const [userAnswer, setUserAnswer] = useState<string>("");
  const [isFeedbackVisible, setIsFeedbackVisible] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [isQuizFinished, setIsQuizFinished] = useState<boolean>(false);

  // Ойын механикасы (XP & Статистика)
  const [xp, setXp] = useState<number>(0);
  const [correctCount, setCorrectCount] = useState<number>(0);
  const [wrongCount, setWrongCount] = useState<number>(0);
  const [completedPassagesCount, setCompletedPassagesCount] = useState<number>(0);

  // Таңдалған категория бойынша мәтіндер тізімі
  const activePassages = useMemo(() => {
    return readingDatabase[selectedCategory];
  }, [selectedCategory]);

  const currentPassage = activePassages[currentPassageIndex];
  const currentQuestion = currentPassage?.questions[currentQuestionIndex];

  // Жаңа тақырып таңдалғанда тазалау
  useEffect(() => {
    setCurrentPassageIndex(0);
    setCurrentQuestionIndex(0);
    setUserAnswer("");
    setIsFeedbackVisible(false);
    setIsQuizFinished(false);
  }, [selectedCategory]);

let currentAudio: HTMLAudioElement | null = null;
const speakText = async (text: string) => {
  try {
    const res = await fetch("/api/tts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    });

    if (!res.ok) {
      throw new Error("TTS Error");
    }

    const blob = await res.blob();

    const url = URL.createObjectURL(blob);

const audio = new Audio(url);
currentAudio = audio;

await audio.play();
  } catch (err) {
    console.error(err);
  }
};
const stopSpeaking = () => {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
  }
};

  // Жауапты тексеру логикасы
  const handleCheckAnswer = () => {
    if (!userAnswer.trim() || isFeedbackVisible) return;

    const formattedUserAnswer = userAnswer.toLowerCase().trim();
    const correctAnswersList = currentQuestion.answers;

    const matched = correctAnswersList.some((ans) =>
      formattedUserAnswer.includes(ans.toLowerCase().trim()) || 
      ans.toLowerCase().trim().includes(formattedUserAnswer)
    );

    setIsCorrect(matched);
    setIsFeedbackVisible(true);

    if (matched) {
      setXp((prev) => prev + 10);
      setCorrectCount((prev) => prev + 1);
    } else {
      setWrongCount((prev) => prev + 1);
    }
  };

  // Келесі сұраққа немесе мәтінге өту
  const handleNextStep = () => {
    setIsFeedbackVisible(false);
    setUserAnswer("");

    if (currentQuestionIndex + 1 < currentPassage.questions.length) {
      // Келесі сұраққа өту
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      // Мәтін толық бітсе, +50 XP бонус беру
      setXp((prev) => prev + 50);
      setCompletedPassagesCount((prev) => prev + 1);

      if (currentPassageIndex + 1 < activePassages.length) {
        // Келесі мәтінге көшу
        setCurrentPassageIndex((prev) => prev + 1);
        setCurrentQuestionIndex(0);
      } else {
        // Категориядағы барлық мәтін аяқталды
        setIsQuizFinished(true);
        saveResultsToFirestore();
      }
    }
  };

  // Прогресс пайыздық көрсеткіші
  const totalQuestionsInCat = activePassages.reduce((sum, p) => sum + p.questions.length, 0);
  const currentGlobalQuestionIndex = activePassages
    .slice(0, currentPassageIndex)
    .reduce((sum, p) => sum + p.questions.length, 0) + currentQuestionIndex;

  const progressPercentage = Math.min(
    100,
    Math.round((currentGlobalQuestionIndex / totalQuestionsInCat) * 100)
  );

  // Achievement (Жетістік) деңгейін анықтау
  const getBadge = () => {
    if (completedPassagesCount >= 10) return { title: "🥇 Үздік оқырман", color: "bg-amber-100 text-amber-900 border-amber-300" };
    if (completedPassagesCount >= 5) return { title: "🥈 Жақсы оқырман", color: "bg-slate-100 text-slate-900 border-slate-300" };
    if (completedPassagesCount >= 1) return { title: "🥉 Оқырман", color: "bg-orange-100 text-orange-900 border-orange-300" };
    return null;
  };
  const achievement = getBadge();

  // Нәтижені Firestore-ға жазу дайындығы
  const saveResultsToFirestore = async () => {
    // FIRESTORE ОРНАТУ ЛОГИКАСЫ:
    /*
    try {
      const user = auth.currentUser;
      if (user) {
        const userRef = doc(db, "users", user.uid);
        await updateDoc(userRef, {
          xp: increment(xp),
          readingXP: increment(xp),
          readingCompleted: increment(completedPassagesCount),
          lessonsCompleted: increment(1),
          level: currentPassage?.level || "A1",
          lastCompletedAt: serverTimestamp()
        });
      }
    } catch (e) {
      console.error("Firestore жазу қатесі: ", e);
    }
    */
  };

  return (
    <div className="bg-slate-50 min-h-screen text-black font-sans pb-16">
      
      {/* HEADER & SCOREBOARD */}
      <div className="bg-white border-b-2 border-slate-200 shadow-xs">
        <div className="max-w-5xl mx-auto px-4 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl">📖</span>
            <div>
              <h1 className="text-2xl font-black text-black tracking-wide">ОҚЫЛЫМ МОДУЛІ</h1>
              <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">QAZMURA интерактивті білім беру жүйесі</p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            {achievement && (
              <span className={`px-3 py-1.5 rounded-xl border text-xs font-black uppercase ${achievement.color}`}>
                {achievement.title}
              </span>
            )}
            <div className="bg-amber-50 border-2 border-amber-200 px-4 py-1.5 rounded-2xl flex items-center gap-2 shadow-xs">
              <span className="text-lg">🔥</span>
              <span className="text-sm font-black text-black">{xp} XP</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 mt-6">
        
        {/* КАТЕГОРИЯЛАРДЫ ТАҢДАУ ПАНЕЛІ */}
        <div className="flex overflow-x-auto pb-3 gap-2 no-scrollbar scroll-smooth">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-3 rounded-2xl font-black text-sm whitespace-nowrap border-2 transition-all active:scale-97 ${
                selectedCategory === cat
                  ? "bg-black border-black text-white shadow-md"
                  : "bg-white border-slate-200 text-black hover:border-slate-400"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* НЕГІЗГІ ОҚУ ЖӘНЕ ТЕСТ ЗОНАСЫ */}
        {!isQuizFinished && currentPassage ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
            
            {/* МӘТІН ЖӘНЕ ДЫБЫСТАУ КАРТОЧКАСЫ (LEFT SIDE) */}
            <div className="lg:col-span-7 bg-white border-2 border-slate-200 rounded-3xl p-6 md:p-8 shadow-xl flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-4">
                  <span className={`px-3 py-1 text-xs font-black rounded-lg text-white ${
                    currentPassage.level === "A1" ? "bg-emerald-500" : currentPassage.level === "A2" ? "bg-amber-500" : "bg-rose-500"
                  }`}>
                    Деңгей: {currentPassage.level}
                  </span>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Мәтін {currentPassageIndex + 1} / {activePassages.length}
                  </span>
                </div>

                <h2 className="text-xl font-black text-black mb-4">
                  {currentPassage.title}
                </h2>

                <p className="text-lg font-medium leading-relaxed bg-slate-50 p-5 rounded-2xl border border-slate-100 text-slate-800">
                  {currentPassage.text}
                </p>
              </div>

              {/* Мәтінді аудио арқылы тыңдау жүйесі */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex flex-wrap gap-2">
                <button
                  onClick={() => speakText(currentPassage.text)}
                  className="bg-blue-50 border-2 border-blue-200 hover:border-blue-400 text-black px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors"
                >
                  🔊 Тыңдау
                </button>
                <button
                  onClick={stopSpeaking}
                  className="bg-rose-50 border-2 border-rose-200 hover:border-rose-400 text-black px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors"
                >
                  ⏹ Тоқтату
                </button>
                <button
                  onClick={() => speakText(currentPassage.text)}
                  className="bg-slate-100 border-2 border-slate-200 hover:border-slate-400 text-black px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors"
                >
                  🔄 Қайта тыңдау
                </button>
              </div>
            </div>

            {/* СҰРАҚ ЖӘНЕ ЖАУАП БЕРУ КАРТОЧКАСЫ (RIGHT SIDE) */}
            <div className="lg:col-span-5 bg-white border-2 border-slate-200 rounded-3xl p-6 md:p-8 shadow-xl flex flex-col justify-between">
              <div>
                {/* PROGRESS BAR */}
                <div className="mb-6">
                  <div className="flex justify-between text-xs font-extrabold text-slate-400 uppercase tracking-wider mb-2">
                    <span>Прогресс</span>
                    <span>{progressPercentage}%</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden border border-slate-200">
                    <div
                      className="bg-green-500 h-3 rounded-full transition-all duration-300"
                      style={{ width: `${progressPercentage}%` }}
                    />
                  </div>
                </div>

                <p className="text-xs font-black text-slate-400 uppercase tracking-wider mb-2">Сұрақ:</p>
                <h3 className="text-lg font-black text-black mb-4">
                  {currentQuestion?.qText}
                </h3>

                <input
                  type="text"
                  value={userAnswer}
                  disabled={isFeedbackVisible}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  placeholder="Жауабыңызды осында жазыңыз..."
                  className="w-full border-2 border-slate-200 rounded-2xl p-4 text-md font-bold placeholder-slate-400 focus:outline-none focus:border-black text-black shadow-inner"
                />

                {!isFeedbackVisible ? (
                  <button
                    onClick={handleCheckAnswer}
                    disabled={!userAnswer.trim()}
                    className={`w-full mt-4 text-white font-black text-md py-4 rounded-2xl shadow-md transition-all active:scale-98 ${
                      userAnswer.trim() ? "bg-black hover:bg-slate-800" : "bg-slate-300 cursor-not-allowed"
                    }`}
                  >
                    Тексеру
                  </button>
                ) : null}
              </div>

              {/* ТЕКСЕРУДЕН КЕЙІНГІ СТАТУС БАРЫ */}
              {isFeedbackVisible && (
                <div className={`mt-6 p-4 rounded-2xl border-2 flex flex-col gap-3 animate-fade-in ${
                  isCorrect ? "bg-green-50 border-green-200" : "bg-rose-50 border-rose-200"
                }`}>
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{isCorrect ? "🔥" : "❌"}</span>
                    <p className={`text-md font-black ${isCorrect ? "text-green-800" : "text-rose-800"}`}>
                      {isCorrect ? "Дұрыс! Келесі деңгейге нық қадам!" : "Қате жауап!"}
                    </p>
                  </div>
                  {!isCorrect && (
                    <p className="text-xs font-bold text-slate-700">
                      Қабылданатын дұрыс нұсқа: <span className="underline">{currentQuestion.answers[0]}</span>
                    </p>
                  )}
                  <button
                    onClick={handleNextStep}
                    className="w-full bg-black text-white py-3 rounded-xl font-black text-sm hover:bg-slate-800 transition-colors shadow-xs"
                  >
                    {currentQuestionIndex + 1 === currentPassage.questions.length ? "Мәтінді Аяқтау ➔" : "Келесі Сұрақ ➔"}
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          /* КАТЕГОРИЯНЫҢ СӘТТІ АЯҚТАЛУЫ (НӘТИЖЕ ЭКРАНЫ) */
          <div className="max-w-2xl mx-auto bg-white border-2 border-slate-200 rounded-3xl p-8 md:p-12 shadow-2xl text-center mt-8">
            <span className="text-7xl block mb-4 animate-bounce">🏆</span>
            <h2 className="text-3xl font-black text-black mb-2">Категория толық аяқталды!</h2>
            <p className="text-slate-500 font-semibold mb-8">
              Сіз &ldquo;{selectedCategory}&rdquo; бағытындағы барлық оқылым мәтіндерін сәтті аяқтадыңыз.
            </p>

            {/* Статистикалық есептегіш кесте */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <p className="text-xs text-slate-400 font-bold uppercase">Жалпы ұпай</p>
                <p className="text-xl font-black text-amber-500 mt-1">+{xp} XP</p>
              </div>
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <p className="text-xs text-slate-400 font-bold uppercase">Дұрыс жауап</p>
                <p className="text-xl font-black text-green-600 mt-1">{correctCount}</p>
              </div>
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <p className="text-xs text-slate-400 font-bold uppercase">Қате жауап</p>
                <p className="text-xl font-black text-rose-500 mt-1">{wrongCount}</p>
              </div>
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <p className="text-xs text-slate-400 font-bold uppercase">Аяқталған мәтін</p>
                <p className="text-xl font-black text-blue-600 mt-1">{completedPassagesCount}</p>
              </div>
            </div>

            <button
              onClick={() => {
                setIsQuizFinished(false);
                setCurrentPassageIndex(0);
                setCurrentQuestionIndex(0);
              }}
              className="bg-black text-white px-8 py-4 rounded-2xl font-black text-md hover:bg-slate-800 transition-all shadow-md active:scale-97"
            >
              Қайтадан Бастау
            </button>
          </div>
        )}
      </div>
    </div>
  );
}