"use client";

import { useState } from "react";
// Firebase интеграциясы үшін (өз жобаңыздың құрылымына қарай ашып қойыңыз)
// import { doc, updateDoc, increment } from "firebase/firestore";
// import { auth, db } from "@/lib/firebase"; 

// ТЕОРИЯ ДЕРЕКТЕРІ
const theoryData = [
  {
    title: "1. Зат есім",
    desc: "Зат есім — заттың, құбылыстың, адамның, жануардың атауын білдіретін сөз табы. Сұрақтары: кім? не?",
    examples: "Адам, кітап, қала, мектеп, оқушы.",
  },
  {
    title: "2. Сын есім",
    desc: "Сын есім — заттың сынын, сапасын, көлемін, түр-түсін білдіретін сөз табы. Сұрақтары: қандай? қай?",
    examples: "Әдемі, үлкен, ақылды, жақсы, көк.",
  },
  {
    title: "3. Сан есім",
    desc: "Сан есім — заттың санын, мөлшерін, ретін білдіретін сөз табы. Сұрақтары: қанша? неше? нешінші?",
    examples: "Бір, екі, үш, он, жүз, бірінші.",
  },
  {
    title: "4. Есімдік",
    desc: "Есімдік — зат есімнің, сын есімнің, сан есімнің орнына қолданылатын сөз табы.",
    examples: "Мен, сен, сіз, ол, біз, олар, бұл, сол.",
  },
  {
    title: "5. Етістік",
    desc: "Етістік — қимылды, іс-әрекетті білдіретін сөз табы. Сұрақтары: не істеді? не қылды? қайтті?",
    examples: "Оқыды, жазды, барды, келді, сөйледі.",
  },
  {
    title: "6. Үстеу",
    desc: "Үстеу — қимылдың мезгілін, мекенін, сын-қимылын, себебін білдіретін сөз табы. Сұрақтары: қашан? қайда? қалай?",
    examples: "Бүгін, ертең, жоғары, төмен, тез, әрең.",
  },
  {
    title: "7. Шылау",
    desc: "Шылау — толық лексикалық мағынасы жоқ, сөз бен сөзді немесе сөйлем мен сөйлемді байланыстыратын көмекші сөз.",
    examples: "Және, мен/бен/пен, бірақ, үшін, туралы, дейін.",
  }
];

const septikter = [
  { name: "Атау септік", question: "кім? не? кімдер? нелер?", example: "кітап (Бұл қызықты кітап.)" },
  { name: "Ілік септік", question: "кімнің? ненің?", example: "кітаптың (Кітаптың мұқабасы әдемі.)" },
  { name: "Барыс септік", question: "кімге? неге? қайда?", example: "кітапқа (Мен кітапқа қарадым.)" },
  { name: "Табыс септік", question: "кімді? нені?", example: "кітапты (Ол кітапты оқыды.)" },
  { name: "Жатыс септік", question: "кімде? неде? қайда?", example: "кітапта (Кітапта суреттер көп.)" },
  { name: "Шығыс септік", question: "кімнен? неден? қайдан?", example: "кітаптан (Кітаптан жаңа сөздер үйрендім.)" },
  { name: "Көмектес септік", question: "кіммен? немен?", example: "кітаппен (Бала кітаппен ойнап отыр.)" },
];

// ТЕСТ СҰРАҚТАРЫ (50 сұрақ)
const quizQuestions = [
  // Зат есім (1-5)
  { type: "mcq", q: "Зат есімнің сұрақтарын табыңыз:", options: ["Қандай? Қай?", "Кім? Не?", "Қашан? Қайда?", "Не істеді?"], answer: "Кім? Не?" },
  { type: "fill", q: "Адам, қала, мектеп сөздері қай сөз табына жатады?", answer: "зат есім" },
  { type: "tf", q: "«Жүгіру» сөзі зат есімге жатады.", answer: "Қате" },
  { type: "mcq", q: "Берілген сөздердің ішінен зат есімді табыңыз:", options: ["Көк", "Оқыды", "Дәптер", "Жылдам"], answer: "Дәптер" },
  { type: "mcq", q: "Жалқы есімді табыңыз:", options: ["Қала", "Астана", "Өзен", "Тау"], answer: "Астана" },
  // Сын есім (6-10)
  { type: "mcq", q: "Сын есім нені білдіреді?", options: ["Заттың санын", "Іс-әрекетті", "Заттың сынын, сапасын", "Мезгілді"], answer: "Заттың сынын, сапасын" },
  { type: "fill", q: "Үлкен, әдемі, қызыл сөздері қай сөз табы?", answer: "сын есім" },
  { type: "tf", q: "«Қандай?» сұрағы сын есімге қойылады.", answer: "Дұрыс" },
  { type: "mcq", q: "Сын есімді сөйлемді табыңыз:", options: ["Ол кеше келді.", "Аспан ашық.", "Мен оқыдым.", "Үш адам бар."], answer: "Аспан ашық." },
  { type: "mcq", q: "Қарсы мәндес сын есімдер жұбын көрсетіңіз:", options: ["үлкен - дәу", "жақсы - жаман", "көк - сары", "жылдам - тез"], answer: "жақсы - жаман" },
  // Сан есім (11-15)
  { type: "mcq", q: "Сан есім сұрақтары қандай?", options: ["Кім? Не?", "Қандай? Қай?", "Қанша? Неше?", "Не істеді?"], answer: "Қанша? Неше?" },
  { type: "fill", q: "Заттың ретін білдіретін сан есім түрі (мысалы: бірінші):", answer: "реттік сан есім" },
  { type: "tf", q: "«Бесеу» сөзі жинақтық сан есім.", answer: "Дұрыс" },
  { type: "mcq", q: "Бөлшек сан есімді табыңыз:", options: ["Жүз", "Екіден бір", "Алтыншы", "Отыз"], answer: "Екіден бір" },
  { type: "mcq", q: "Сан есімді табыңыз:", options: ["Көп", "Жүз", "Үлкен", "Сен"], answer: "Жүз" },
  // Есімдік (16-20)
  { type: "mcq", q: "Есімдік дегеніміз не?", options: ["Зат есім орнына жүретін сөз", "Қимылды білдіретін сөз", "Сапаны білдіретін сөз", "Көмекші сөз"], answer: "Зат есім орнына жүретін сөз" },
  { type: "fill", q: "Мен, сен, ол қай есімдік түрі?", answer: "жіктеу есімдігі" },
  { type: "tf", q: "«Ешкім» сөзі болымсыздық есімдігі.", answer: "Дұрыс" },
  { type: "mcq", q: "Сұрау есімдігін табыңыз:", options: ["Бұл", "Мен", "Кім", "Өзім"], answer: "Кім" },
  { type: "mcq", q: "Сілтеу есімдігін көрсетіңіз:", options: ["Ол", "Мынау", "Барлық", "Ешқандай"], answer: "Мынау" },
  // Етістік (21-25)
  { type: "mcq", q: "Етістік нені білдіреді?", options: ["Заттың атын", "Қимылды, іс-әрекетті", "Санды", "Сынды"], answer: "Қимылды, іс-әрекетті" },
  { type: "fill", q: "Келді, кетті, оқыды сөздері қай шақта тұр?", answer: "өткен шақ" },
  { type: "tf", q: "«Көріп отырмын» етістігі келер шақта тұр.", answer: "Қате" },
  { type: "mcq", q: "Болымсыз етістікті табыңыз:", options: ["Жазды", "Сөйлеме", "Отыр", "Кел"], answer: "Сөйлеме" },
  { type: "mcq", q: "Туынды етістікті көрсетіңіз:", options: ["Бар", "Ойла", "Жат", "Тұр"], answer: "Ойла" },
  // Үстеу және Шылау (26-30)
  { type: "mcq", q: "Үстеудің сұрақтары:", options: ["Кім? Не?", "Қашан? Қайда?", "Қанша? Неше?", "Кімнің? Ненің?"], answer: "Қашан? Қайда?" },
  { type: "fill", q: "Сөз бен сөзді байланыстыратын көмекші сөз табы:", answer: "шылау" },
  { type: "tf", q: "«Бүгін» сөзі мезгіл үстеуі.", answer: "Дұрыс" },
  { type: "mcq", q: "Шылауды табыңыз:", options: ["Жылдам", "Және", "Биік", "Алыс"], answer: "Және" },
  { type: "mcq", q: "«Үшін» сөзі қай сөз табына жатады?", options: ["Үстеу", "Шылау", "Одағай", "Еліктеу сөз"], answer: "Шылау" },
  // Септіктер (31-38)
  { type: "mcq", q: "Қазақ тілінде неше септік бар?", options: ["5", "6", "7", "8"], answer: "7" },
  { type: "fill", q: "Кімнің? Ненің? қай септіктің сұрағы?", answer: "ілік" },
  { type: "tf", q: "«Мектепке» сөзі барыс септігінде тұр.", answer: "Дұрыс" },
  { type: "mcq", q: "Табыс септігінің жалғауларын көрсетіңіз:", options: ["-ның, -нің", "-ға, -ге", "-ты, -ті, -ды, -ді", "-дан, -ден"], answer: "-ты, -ті, -ды, -ді" },
  { type: "fill", q: "«Қаладан» сөзі қай септікте тұр?", answer: "шығыс" },
  { type: "mcq", q: "Жатыс септігінің сұрақтары:", options: ["Кіммен? Немен?", "Кімде? Неде?", "Кімді? Нені?", "Кімге? Неге?"], answer: "Кімде? Неде?" },
  { type: "mcq", q: "«Қаламмен жазды» сөйлеміндегі «қаламмен» сөзінің септігі:", options: ["Барыс", "Табыс", "Көмектес", "Шығыс"], answer: "Көмектес" },
  { type: "tf", q: "Атау септігінің арнайы жалғауы жоқ.", answer: "Дұрыс" },
  // Шақтар (39-42)
  { type: "mcq", q: "Осы шақ нені білдіреді?", options: ["Бұрын болған істі", "Қазір болып жатқан істі", "Болашақта болатын істі", "Ешқайсысы емес"], answer: "Қазір болып жатқан істі" },
  { type: "fill", q: "«Мен ертең келемін» сөйлемі қай шақта тұр?", answer: "келер шақ" },
  { type: "tf", q: "«Ол хат жазды» сөйлемі өткен шақта.", answer: "Дұрыс" },
  { type: "mcq", q: "Нақ осы шақта тұрған етістікті табыңыз:", options: ["Оқымақпын", "Келе жатыр", "Барды", "Сөйлейді"], answer: "Келе жатыр" },
  // Сөйлем мүшелері (43-50)
  { type: "mcq", q: "Сөйлемнің тұрлаулы мүшелері:", options: ["Анықтауыш, Толықтауыш", "Бастауыш, Баяндауыш", "Пысықтауыш, Үстеу", "Тек бастауыш"], answer: "Бастауыш, Баяндауыш" },
  { type: "fill", q: "Сөйлемдегі іс-әрекетті, қимылды білдіретін сөйлем мүшесі:", answer: "баяндауыш" },
  { type: "tf", q: "Анықтауыш «қандай? қай? кімнің?» сұрақтарына жауап береді.", answer: "Дұрыс" },
  { type: "mcq", q: "«Әдемі гүл өсті» сөйлеміндегі бастауыш қайсы?", options: ["Әдемі", "Гүл", "Өсті", "Жоқ"], answer: "Гүл" },
  { type: "mcq", q: "«Мен досыма кітап бердім» сөйлеміндегі толықтауыш қайсы?", options: ["Мен", "Бердім", "Досыма, кітап", "Жоқ"], answer: "Досыма, кітап" },
  { type: "fill", q: "Мезгіл, мекен, амал, себеп мәндерін білдіретін сөйлем мүшесі:", answer: "пысықтауыш" },
  { type: "tf", q: "Толықтауыш табыс, барыс, жатыс, шығыс, көмектес септіктерінде тұрады.", answer: "Дұрыс" },
  { type: "mcq", q: "«Ол бүгін ауылға кетті» сөйлеміндегі пысықтауыш:", options: ["Ол", "Кетті", "Бүгін, ауылға", "Ол, кетті"], answer: "Бүгін, ауылға" },
];

export default function GrammarPage() {
  const [activeTab, setActiveTab] = useState<"theory" | "quiz">("theory");
  const [qIndex, setQIndex] = useState(0);
  const [answerInput, setAnswerInput] = useState("");
  const [resultMsg, setResultMsg] = useState("");
  const [isFinished, setIsFinished] = useState(false);
  
  // Stats
  const [xp, setXp] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);

  const currentQ = quizQuestions[qIndex];
  const progress = (qIndex / quizQuestions.length) * 100;

  const checkAnswer = (selectedAns?: string) => {
    let isCorrect = false;
    const correctAns = currentQ.answer;
    const inputToCheck = selectedAns || answerInput;

    if (currentQ.type === "mcq" || currentQ.type === "tf") {
      isCorrect = inputToCheck === correctAns;
    } else if (currentQ.type === "fill") {
      isCorrect = inputToCheck.toLowerCase().trim() === correctAns.toLowerCase().trim();
    }

    if (isCorrect) {
      setResultMsg("✅ Дұрыс жауап!");
      setXp((prev) => prev + 10);
      setCorrectCount((prev) => prev + 1);
    } else {
      setResultMsg(`❌ Қате. Дұрыс жауап: ${correctAns}`);
      setWrongCount((prev) => prev + 1);
    }
  };

  const nextQuestion = async () => {
    if (qIndex + 1 < quizQuestions.length) {
      setQIndex((prev) => prev + 1);
      setAnswerInput("");
      setResultMsg("");
    } else {
      setIsFinished(true);
      await finishQuizToFirestore();
    }
  };

  const finishQuizToFirestore = async () => {
    // FIREBASE INTEGRATION LOGIC:
    /*
    try {
      const user = auth.currentUser;
      if (user) {
        const userRef = doc(db, "users", user.uid);
        await updateDoc(userRef, {
          xp: increment(xp),
          lessonsCompleted: increment(1),
          grammarCompleted: true,
        });
      }
    } catch (error) {
      console.error("Firestore жаңарту қатесі:", error);
    }
    */
    console.log("Quiz finished. XP to save:", xp);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-black font-sans pb-20">
      {/* HEADER */}
      <div className="bg-slate-100 border-b border-slate-200 py-12 px-8 shadow-sm">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-black tracking-tight">
              📚 Қазақ тілі грамматикасы
            </h1>
            <p className="mt-4 text-lg text-slate-700 max-w-2xl">
              Қазақ тілінің негізгі ережелерін меңгеріп, практикалық тест арқылы біліміңізді шыңдаңыз.
            </p>
          </div>
          <div className="mt-8 md:mt-0 bg-white px-6 py-4 rounded-2xl shadow-lg flex items-center gap-4">
            <span className="text-xl font-bold text-slate-800">⭐ Жалпы ұпай:</span>
            <span className="text-3xl font-extrabold text-yellow-500">{xp} XP</span>
          </div>
        </div>
      </div>

      {/* TABS */}
      <div className="max-w-6xl mx-auto px-8 mt-10">
        <div className="flex space-x-4 mb-8">
          <button
            onClick={() => setActiveTab("theory")}
            className={`px-8 py-4 rounded-2xl font-bold text-lg transition-all shadow-md ${
              activeTab === "theory"
                ? "bg-black text-white scale-105"
                : "bg-white text-black hover:bg-slate-100"
            }`}
          >
            📖 Теория
          </button>
          <button
            onClick={() => setActiveTab("quiz")}
            className={`px-8 py-4 rounded-2xl font-bold text-lg transition-all shadow-md ${
              activeTab === "quiz"
                ? "bg-black text-white scale-105"
                : "bg-white text-black hover:bg-slate-100"
            }`}
          >
            📝 Тест (50 сұрақ)
          </button>
        </div>

        {/* THEORY SECTION */}
        {activeTab === "theory" && (
          <div className="space-y-10 animate-fade-in">
            <h2 className="text-3xl font-extrabold mb-6 border-b-4 border-slate-300 inline-block pb-2">Сөз таптары</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {theoryData.map((item, idx) => (
                <div key={idx} className="bg-white p-8 rounded-3xl shadow-xl hover:-translate-y-1 transition-transform duration-300 border border-slate-100">
                  <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                  <p className="text-slate-700 mb-4 leading-relaxed">{item.desc}</p>
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                    <span className="font-bold">Мысалдар: </span>
                    <span className="text-slate-800 italic">{item.examples}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Септіктер */}
            <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl mt-12 border border-slate-100">
              <h2 className="text-3xl font-extrabold mb-8">8. Септіктер</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-100">
                      <th className="p-4 font-bold rounded-tl-2xl">Септік атауы</th>
                      <th className="p-4 font-bold">Сұрақтары</th>
                      <th className="p-4 font-bold rounded-tr-2xl">Мысал</th>
                    </tr>
                  </thead>
                  <tbody>
                    {septikter.map((s, idx) => (
                      <tr key={idx} className="border-b border-slate-100 hover:bg-slate-50">
                        <td className="p-4 font-semibold text-lg">{s.name}</td>
                        <td className="p-4 text-slate-600">{s.question}</td>
                        <td className="p-4 text-slate-800">{s.example}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Шақтар */}
            <h2 className="text-3xl font-extrabold mt-12 mb-6 border-b-4 border-slate-300 inline-block pb-2">9. Шақтар (Етістік шақтары)</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white p-8 rounded-3xl shadow-xl border-t-8 border-blue-500">
                <h3 className="text-2xl font-bold mb-3">Осы шақ</h3>
                <p className="text-slate-700 mb-4">Қазіргі сәтте болып жатқан қимылды білдіреді.</p>
                <div className="bg-slate-100 p-4 rounded-xl font-medium">Мысал: Мен кітап оқып отырмын.</div>
              </div>
              <div className="bg-white p-8 rounded-3xl shadow-xl border-t-8 border-green-500">
                <h3 className="text-2xl font-bold mb-3">Өткен шақ</h3>
                <p className="text-slate-700 mb-4">Сөйлеп тұрған сәтке дейін болып кеткен қимылды білдіреді.</p>
                <div className="bg-slate-100 p-4 rounded-xl font-medium">Мысал: Мен кітап оқыдым.</div>
              </div>
              <div className="bg-white p-8 rounded-3xl shadow-xl border-t-8 border-purple-500">
                <h3 className="text-2xl font-bold mb-3">Келер шақ</h3>
                <p className="text-slate-700 mb-4">Сөйлеп тұрған сәттен кейін болатын қимылды білдіреді.</p>
                <div className="bg-slate-100 p-4 rounded-xl font-medium">Мысал: Мен кітап оқимын.</div>
              </div>
            </div>

            {/* Сөйлем мүшелері */}
            <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl mt-12 border border-slate-100">
              <h2 className="text-3xl font-extrabold mb-8">10. Сөйлем мүшелері</h2>
              <div className="bg-slate-100 p-6 rounded-2xl mb-8 font-medium text-lg text-center shadow-inner">
                Мысал: <span className="font-bold underline text-blue-700">Оқушы</span> <span className="underline decoration-wavy text-green-700">кітапты</span> <span className="font-bold text-red-700">оқыды</span>.
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  { name: "Бастауыш", qs: "кім? не? кімдер? нелер?", example: "Оқушы кітап оқыды. (Бастауыш: Оқушы)" },
                  { name: "Баяндауыш", qs: "не істейді? не қылды? қайтті?", example: "Оқушы кітап оқыды. (Баяндауыш: оқыды)" },
                  { name: "Анықтауыш", qs: "қандай? қай? кімнің? ненің?", example: "Үлкен мектеп ашылды. (Анықтауыш: үлкен)" },
                  { name: "Толықтауыш", qs: "кімді? нені? кімге? неге? кімнен? neден?", example: "Мен кітап оқыдым. (Толықтауыш: кітап)" },
                  { name: "Пысықтауыш", qs: "қашан? қайда? қалай? не үшін?", example: "Мен бүгін мектепке бардым. (Пысықтауыш: бүгін)" }
                ].map((item, idx) => (
                  <div key={idx} className="bg-slate-50 p-6 rounded-2xl border border-slate-200 hover:shadow-lg transition-shadow">
                    <h3 className="text-xl font-bold mb-2">{item.name}</h3>
                    <p className="text-sm text-slate-500 mb-3">Сұрақтары: {item.qs}</p>
                    <p className="text-black font-medium">{item.example}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* QUIZ SECTION */}
        {activeTab === "quiz" && (
          <div className="max-w-4xl mx-auto bg-white rounded-3xl p-8 md:p-12 shadow-2xl animate-fade-in border border-slate-100">
            {!isFinished ? (
              <>
                {/* Progress Bar */}
                <div className="w-full bg-slate-200 rounded-full h-4 mb-8 overflow-hidden shadow-inner">
                  <div
                    className="bg-black h-4 rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                
                <div className="flex justify-between items-center mb-8">
                  <span className="text-slate-500 font-medium">Сұрақ {qIndex + 1} / {quizQuestions.length}</span>
                  <span className="text-yellow-500 font-bold bg-yellow-50 px-4 py-1 rounded-full border border-yellow-200">
                    {xp} XP
                  </span>
                </div>

                <h3 className="text-2xl md:text-3xl font-extrabold mb-10 leading-tight">
                  {currentQ.q}
                </h3>

                {/* Question Types */}
                <div className="space-y-4">
                  {currentQ.type === "mcq" && currentQ.options?.map((opt, i) => (
                    <button
                      key={i}
                      disabled={!!resultMsg}
                      onClick={() => {
                        setAnswerInput(opt);
                        checkAnswer(opt);
                      }}
                      className={`w-full text-left p-6 rounded-2xl text-lg font-semibold transition-all border-2 
                        ${resultMsg 
                          ? opt === currentQ.answer 
                            ? "bg-green-100 border-green-500 text-green-900" 
                            : answerInput === opt 
                              ? "bg-red-100 border-red-500 text-red-900"
                              : "bg-slate-50 border-slate-200 text-slate-400 opacity-50"
                          : "bg-slate-50 border-slate-200 hover:border-black hover:bg-slate-100 text-black shadow-sm"
                        }`}
                    >
                      {opt}
                    </button>
                  ))}

                  {currentQ.type === "tf" && ["Дұрыс", "Қате"].map((opt, i) => (
                    <button
                      key={i}
                      disabled={!!resultMsg}
                      onClick={() => {
                        setAnswerInput(opt);
                        checkAnswer(opt);
                      }}
                      className={`w-full text-left p-6 rounded-2xl text-lg font-semibold transition-all border-2 
                        ${resultMsg 
                          ? opt === currentQ.answer 
                            ? "bg-green-100 border-green-500 text-green-900" 
                            : answerInput === opt 
                              ? "bg-red-100 border-red-500 text-red-900"
                              : "bg-slate-50 border-slate-200 text-slate-400 opacity-50"
                          : "bg-slate-50 border-slate-200 hover:border-black hover:bg-slate-100 text-black shadow-sm"
                        }`}
                    >
                      {opt}
                    </button>
                  ))}

                  {currentQ.type === "fill" && (
                    <div className="flex flex-col gap-4">
                      <input
                        type="text"
                        disabled={!!resultMsg}
                        value={answerInput}
                        onChange={(e) => setAnswerInput(e.target.value)}
                        placeholder="Жауабыңызды осында жазыңыз..."
                        className="w-full border-2 border-slate-200 p-6 rounded-2xl text-xl font-medium focus:outline-none focus:border-black transition-colors text-black placeholder-slate-400"
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && !resultMsg && answerInput.trim() !== "") {
                            checkAnswer();
                          }
                        }}
                      />
                      {!resultMsg && (
                        <button
                          onClick={() => checkAnswer()}
                          disabled={answerInput.trim() === ""}
                          className="bg-black text-white p-5 rounded-2xl font-bold text-lg hover:bg-slate-800 transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Тексеру
                        </button>
                      )}
                    </div>
                  )}
                </div>

                {/* Result Message & Next Button */}
                {resultMsg && (
                  <div className="mt-8 animate-fade-in">
                    <div className={`p-6 rounded-2xl font-bold text-xl mb-6 ${
                      resultMsg.includes("Дұрыс") ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                    }`}>
                      {resultMsg}
                    </div>
                    <button
                      onClick={nextQuestion}
                      className="w-full bg-black text-white py-5 rounded-2xl font-bold text-xl hover:bg-slate-800 transition-colors shadow-xl flex justify-center items-center gap-2"
                    >
                      {qIndex + 1 === quizQuestions.length ? "Нәтижені көру" : "Келесі сұрақ"} <span className="text-2xl">→</span>
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-10 animate-fade-in">
                <div className="text-8xl mb-6">🏆</div>
                <h2 className="text-5xl font-extrabold mb-4 text-black">Тест аяқталды!</h2>
                <p className="text-xl text-slate-600 mb-10">Сіз грамматика модулін толық бітірдіңіз.</p>
                
                <div className="grid grid-cols-2 gap-6 max-w-lg mx-auto mb-10">
                  <div className="bg-slate-100 p-6 rounded-3xl border border-slate-200">
                    <p className="text-slate-500 mb-2 font-medium">Жинаған XP</p>
                    <p className="text-4xl font-extrabold text-yellow-500">{xp}</p>
                  </div>
                  <div className="bg-slate-100 p-6 rounded-3xl border border-slate-200">
                    <p className="text-slate-500 mb-2 font-medium">Жалпы ұпай</p>
                    <p className="text-4xl font-extrabold text-black">{Math.round((correctCount / quizQuestions.length) * 100)}%</p>
                  </div>
                  <div className="bg-green-50 p-6 rounded-3xl border border-green-200">
                    <p className="text-green-600 mb-2 font-medium">Дұрыс</p>
                    <p className="text-4xl font-extrabold text-green-700">{correctCount}</p>
                  </div>
                  <div className="bg-red-50 p-6 rounded-3xl border border-red-200">
                    <p className="text-red-600 mb-2 font-medium">Қате</p>
                    <p className="text-4xl font-extrabold text-red-700">{wrongCount}</p>
                  </div>
                </div>

                <button 
                  onClick={() => {
                    setQIndex(0);
                    setXp(0);
                    setCorrectCount(0);
                    setWrongCount(0);
                    setIsFinished(false);
                    setAnswerInput("");
                    setResultMsg("");
                    setActiveTab("theory");
                  }}
                  className="bg-black text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-slate-800 transition-colors shadow-xl"
                >
                  Модульге қайту
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}