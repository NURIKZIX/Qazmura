"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import useAuth from "@/hooks/useAuth";

/* ══════════════════════════════════════════════════════════════
   DATA — Kazakh language curriculum content
══════════════════════════════════════════════════════════════ */

const KAZAKH_ALPHABET = [
  { letter: "А", sound: "a", example: "алма", translation: "яблоко" },
  { letter: "Ә", sound: "æ", example: "әже", translation: "бабушка" },
  { letter: "Б", sound: "b", example: "бала", translation: "ребёнок" },
  { letter: "В", sound: "v", example: "вагон", translation: "вагон" },
  { letter: "Г", sound: "g", example: "гүл", translation: "цветок" },
  { letter: "Ғ", sound: "ɣ", example: "ғалым", translation: "учёный" },
  { letter: "Д", sound: "d", example: "дос", translation: "друг" },
  { letter: "Е", sound: "e", example: "ел", translation: "страна" },
  { letter: "Ж", sound: "ʒ", example: "жер", translation: "земля" },
  { letter: "З", sound: "z", example: "зат", translation: "вещь" },
  { letter: "И", sound: "i", example: "ит", translation: "собака" },
  { letter: "Й", sound: "j", example: "йод", translation: "йод" },
  { letter: "К", sound: "k", example: "кітап", translation: "книга" },
  { letter: "Қ", sound: "q", example: "қала", translation: "город" },
  { letter: "Л", sound: "l", example: "ләйлім", translation: "тюльпан" },
  { letter: "М", sound: "m", example: "мектеп", translation: "школа" },
  { letter: "Н", sound: "n", example: "нан", translation: "хлеб" },
  { letter: "Ң", sound: "ŋ", example: "аң", translation: "животное" },
  { letter: "О", sound: "o", example: "от", translation: "трава" },
  { letter: "Ө", sound: "ø", example: "өзен", translation: "река" },
  { letter: "П", sound: "p", example: "пәтер", translation: "квартира" },
  { letter: "Р", sound: "r", example: "рахмет", translation: "спасибо" },
  { letter: "С", sound: "s", example: "су", translation: "вода" },
  { letter: "Т", sound: "t", example: "тау", translation: "гора" },
  { letter: "У", sound: "u", example: "ұшақ", translation: "самолёт" },
  { letter: "Ұ", sound: "ʊ", example: "ұл", translation: "сын" },
  { letter: "Ү", sound: "y", example: "үй", translation: "дом" },
  { letter: "Ф", sound: "f", example: "факт", translation: "факт" },
  { letter: "Х", sound: "x", example: "хат", translation: "письмо" },
  { letter: "Һ", sound: "h", example: "һава", translation: "воздух" },
  { letter: "Ц", sound: "ts", example: "цирк", translation: "цирк" },
  { letter: "Ч", sound: "tʃ", example: "чемодан", translation: "чемодан" },
  { letter: "Ш", sound: "ʃ", example: "шай", translation: "чай" },
  { letter: "Щ", sound: "ʃtʃ", example: "борщ", translation: "борщ" },
  { letter: "Ы", sound: "ɯ", example: "ыдыс", translation: "посуда" },
  { letter: "І", sound: "ɪ", example: "іс", translation: "дело" },
  { letter: "Э", sound: "e", example: "экран", translation: "экран" },
  { letter: "Ю", sound: "ju", example: "юбка", translation: "юбка" },
  { letter: "Я", sound: "ja", example: "яхта", translation: "яхта" },
  { letter: "Ъ", sound: "ʔ", example: "объект", translation: "объект" },
  { letter: "Ь", sound: "ʲ", example: "письмо", translation: "письмо" },
  { letter: "Ё", sound: "jo", example: "ёлка", translation: "ёлка" },
];

const SEPTIK_CASES = [
  { name: "Атау септік", suffix: "—", question: "Кім? Не?", example: "кітап", color: "#F5C842", desc: "Именительный — кто? что?" },
  { name: "Ілік септік", suffix: "-ның/-нің", question: "Кімнің? Ненің?", example: "кітаптың", color: "#60A5FA", desc: "Родительный — чей? чего?" },
  { name: "Барыс септік", suffix: "-ға/-ге", question: "Кімге? Неге?", example: "кітапқа", color: "#4ADE80", desc: "Дательный — кому? чему?" },
  { name: "Табыс септік", suffix: "-ны/-ні", question: "Кімді? Нені?", example: "кітапты", color: "#F472B6", desc: "Винительный — кого? что?" },
  { name: "Шығыс септік", suffix: "-дан/-ден", question: "Кімнен? Неден?", example: "кітаптан", color: "#FB923C", desc: "Исходный — откуда? от кого?" },
  { name: "Жатыс септік", suffix: "-да/-де", question: "Кімде? Неде?", example: "кітапта", color: "#A78BFA", desc: "Местный — где? у кого?" },
  { name: "Көмектес септік", suffix: "-мен/-бен", question: "Кіммен? Немен?", example: "кітаппен", color: "#34D399", desc: "Творительный — с кем? чем?" },
];

const VOCAB_TOPICS = [
  {
    id: "greetings",
    title: "Сәлемдесу",
    titleRu: "Приветствия",
    emoji: "👋",
    color: "#F5C842",
    words: [
      { kz: "Сәлем", ru: "Привет", en: "Hello" },
      { kz: "Қайырлы таң", ru: "Доброе утро", en: "Good morning" },
      { kz: "Қайырлы күн", ru: "Добрый день", en: "Good afternoon" },
      { kz: "Қайырлы кеш", ru: "Добрый вечер", en: "Good evening" },
      { kz: "Сау болыңыз", ru: "До свидания", en: "Goodbye" },
      { kz: "Рахмет", ru: "Спасибо", en: "Thank you" },
    ],
  },
  {
    id: "family",
    title: "Отбасы",
    titleRu: "Семья",
    emoji: "👨‍👩‍👧",
    color: "#60A5FA",
    words: [
      { kz: "Ата", ru: "Дедушка", en: "Grandfather" },
      { kz: "Әже", ru: "Бабушка", en: "Grandmother" },
      { kz: "Әке", ru: "Отец", en: "Father" },
      { kz: "Шеше", ru: "Мать", en: "Mother" },
      { kz: "Бала", ru: "Ребёнок", en: "Child" },
      { kz: "Аға", ru: "Старший брат", en: "Elder brother" },
    ],
  },
  {
    id: "nature",
    title: "Табиғат",
    titleRu: "Природа",
    emoji: "🌿",
    color: "#4ADE80",
    words: [
      { kz: "Тау", ru: "Гора", en: "Mountain" },
      { kz: "Өзен", ru: "Река", en: "River" },
      { kz: "Дала", ru: "Степь", en: "Steppe" },
      { kz: "Аспан", ru: "Небо", en: "Sky" },
      { kz: "Күн", ru: "Солнце", en: "Sun" },
      { kz: "Жұлдыз", ru: "Звезда", en: "Star" },
    ],
  },
  {
    id: "numbers",
    title: "Сандар",
    titleRu: "Числа",
    emoji: "🔢",
    color: "#F472B6",
    words: [
      { kz: "Бір", ru: "Один", en: "One" },
      { kz: "Екі", ru: "Два", en: "Two" },
      { kz: "Үш", ru: "Три", en: "Three" },
      { kz: "Төрт", ru: "Четыре", en: "Four" },
      { kz: "Бес", ru: "Пять", en: "Five" },
      { kz: "Он", ru: "Десять", en: "Ten" },
    ],
  },
];

const MODULES = [
  {
    id: "alphabet",
    href: "/learn/alphabet",
    emoji: "🔤",
    title: "Әліпби & Фонетика",
    desc: "42 әріп, дыбыс жүйесі, айту ережелері. Дыбыстық тренажер.",
    level: "Бастауыш",
    levelEn: "Beginner",
    color: "#F5C842",
    lessons: 12,
    duration: "3 сағат",
    progress: 65,
    locked: false,
    tags: ["Дыбыстар", "Жазу", "Оқу"],
  },
  {
    id: "grammar",
    href: "/learn/grammar",
    emoji: "✍️",
    title: "Грамматика",
    desc: "7 септік, жіктік жалғау, шақтар — AI мұғаліммен интерактивті.",
    level: "A1 → C1",
    levelEn: "All levels",
    color: "#60A5FA",
    lessons: 24,
    duration: "8 сағат",
    progress: 30,
    locked: false,
    tags: ["Септік", "Етістік", "Шақ"],
  },
  {
    id: "vocabulary",
    href: "/learn/vocabulary",
    emoji: "📖",
    title: "Сөздік Қор",
    desc: "Флэшкарта, контекст, ойындар арқылы 5000+ сөз үйрену.",
    level: "5 000+ сөз",
    levelEn: "All levels",
    color: "#4ADE80",
    lessons: 30,
    duration: "12 сағат",
    progress: 15,
    locked: false,
    tags: ["Флэшкарта", "Тест", "Ойын"],
  },
  {
    id: "reading",
    href: "/learn/reading",
    emoji: "📝",
    title: "Оқылым & Жазылым",
    desc: "Мәтін талдау, диктант, шығарма тексеруші AI-мен.",
    level: "A2 → C1",
    levelEn: "Intermediate+",
    color: "#FB923C",
    lessons: 18,
    duration: "6 сағат",
    progress: 0,
    locked: false,
    tags: ["Мәтін", "Диктант", "Шығарма"],
  },
  {
    id: "speaking",
    href: "/learn/speaking",
    emoji: "🎙️",
    title: "Сөйлеу тренажері",
    desc: "AI-мен диалог, айтылым тексеру, акцент жетілдіру.",
    level: "A2+",
    levelEn: "Intermediate",
    color: "#A78BFA",
    lessons: 15,
    duration: "5 сағат",
    progress: 0,
    locked: true,
    tags: ["Диалог", "Айтылым", "TTS"],
  },
  {
    id: "culture",
    href: "/learn/culture",
    emoji: "🏹",
    title: "Тіл & Мәдениет",
    desc: "Тілдің мәдени астары, мақал-мәтел, идиомалар.",
    level: "B1+",
    levelEn: "Upper-intermediate",
    color: "#34D399",
    lessons: 10,
    duration: "4 сағат",
    progress: 0,
    locked: true,
    tags: ["Мақал", "Идиома", "Мәдениет"],
  },
];

const DAILY_PHRASES = [
  { kz: "Менің атым...", ru: "Меня зовут...", usage: "Өзіңді таныстыру" },
  { kz: "Сіздің атыңыз кім?", ru: "Как вас зовут?", usage: "Есім сұрау" },
  { kz: "Мен қазақ тілін үйренемін", ru: "Я учу казахский язык", usage: "Өзің туралы" },
  { kz: "Түсінбедім, қайталаңыз", ru: "Не понял, повторите", usage: "Сұрау" },
  { kz: "Бұл қазақша не деп аталады?", ru: "Как это называется по-казахски?", usage: "Аудару сұрау" },
];

const LANGUAGE_FACTS = [
  {
    icon: "🗣️",
    stat: "18 млн+",
    label: "Тіл иелері",
    desc: "Қазақ тілі дүниежүзіндегі 18 миллионнан астам адамның ана тілі.",
    color: "#F5C842",
  },
  {
    icon: "🔤",
    stat: "42",
    label: "Әріп",
    desc: "Қазақ алфавиті кирилл негізінде 42 әріптен тұрады. 2025 жылы латын жазуына көшу жалғасуда.",
    color: "#60A5FA",
  },
  {
    icon: "🌍",
    stat: "TOP-50",
    label: "Дүниежүзінде",
    desc: "Тіл сарапшылары қазақ тілін дүниежүзінің 50 ірі тілінің бірі деп санайды.",
    color: "#4ADE80",
  },
  {
    icon: "📜",
    stat: "1500+",
    label: "Жыл тарихы",
    desc: "Қазақ тілінің тарихы кемінде 15 ғасырға созылады — Орхон жазуынан бастап.",
    color: "#F472B6",
  },
  {
    icon: "⚡",
    stat: "Агглютинативті",
    label: "Тіл түрі",
    desc: "Жалғамалы тіл — бір сөзге 20+ жалғау жалғана алады, мыс: «кітабымдағы» — в моей книге.",
    color: "#FB923C",
  },
  {
    icon: "🎵",
    stat: "Үндесім",
    label: "Заңы",
    desc: "Сингармонизм заңы — сөздегі барлық дауысты дыбыстар үндес болады (жуан/жіңішке).",
    color: "#A78BFA",
  },
];

const QUIZ_QUESTIONS = [
  {
    q: "«Рахмет» қазақша нені білдіреді?",
    options: ["Сәлем", "Спасибо", "Кешіріңіз", "Иә"],
    correct: 1,
  },
  {
    q: "Қазақ алфавитінде нешe әріп бар?",
    options: ["38", "40", "42", "44"],
    correct: 2,
  },
  {
    q: "«Кітап» сөзінің барыс септігіндегі түрі қайсысы?",
    options: ["кітаптың", "кітапта", "кітапқа", "кітаптан"],
    correct: 2,
  },
];

/* ══════════════════════════════════════════════════════════════
   COMPONENTS
══════════════════════════════════════════════════════════════ */

/* ── Scroll reveal ── */
function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        transition: `opacity 0.6s ${delay}ms, transform 0.6s ${delay}ms`,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(32px)",
      }}
    >
      {children}
    </div>
  );
}

/* ── Animated number counter ── */
function AnimCount({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          let start = 0;
          const step = target / 50;
          const timer = setInterval(() => {
            start += step;
            if (start >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, 20);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

/* ── Progress ring ── */
function ProgressRing({
  pct,
  size = 56,
  stroke = 5,
  color = "#F5C842",
}: {
  pct: number;
  size?: number;
  stroke?: number;
  color?: string;
}) {
  const r = (size - stroke * 2) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (pct / 100) * circ;

  return (
    <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke="rgba(255,255,255,0.08)"
        strokeWidth={stroke}
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke={color}
        strokeWidth={stroke}
        strokeDasharray={circ}
        strokeDashoffset={offset}
        strokeLinecap="round"
        style={{ transition: "stroke-dashoffset 1s ease" }}
      />
    </svg>
  );
}

/* ── Alphabet card ── */
function AlphaCard({
  letter,
  sound,
  example,
  translation,
  idx,
}: {
  letter: string;
  sound: string;
  example: string;
  translation: string;
  idx: number;
}) {
  const [flipped, setFlipped] = useState(false);
  const isSpecial = ["Ә", "Ғ", "Қ", "Ң", "Ө", "Ұ", "Ү", "Һ", "І"].includes(letter);

  return (
    <div
      onClick={() => setFlipped((f) => !f)}
      style={{
        perspective: 800,
        cursor: "pointer",
        width: "100%",
        aspectRatio: "1 / 1.1",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          transformStyle: "preserve-3d",
          transition: "transform 0.5s ease",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* Front */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backfaceVisibility: "hidden",
            borderRadius: "1rem",
            background: isSpecial
              ? "linear-gradient(135deg, rgba(245,200,66,0.15) 0%, rgba(232,160,0,0.08) 100%)"
              : "rgba(255,255,255,0.04)",
            border: isSpecial
              ? "1.5px solid rgba(245,200,66,0.4)"
              : "1px solid rgba(255,255,255,0.08)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.25rem",
            padding: "0.5rem",
          }}
        >
          <span
            style={{
              fontSize: "clamp(1.4rem, 3vw, 2rem)",
              fontWeight: 900,
              color: isSpecial ? "#F5C842" : "#fff",
              lineHeight: 1,
            }}
          >
            {letter}
          </span>
          <span
            style={{
              fontSize: "0.6rem",
              color: "rgba(255,255,255,0.4)",
              fontFamily: "monospace",
            }}
          >
            [{sound}]
          </span>
          {isSpecial && (
            <span
              style={{
                fontSize: "0.5rem",
                background: "rgba(245,200,66,0.2)",
                color: "#F5C842",
                padding: "0.1rem 0.4rem",
                borderRadius: 999,
                fontWeight: 700,
                letterSpacing: "0.05em",
              }}
            >
              ҚАЗ
            </span>
          )}
        </div>
        {/* Back */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            borderRadius: "1rem",
            background: "linear-gradient(135deg, rgba(245,200,66,0.2), rgba(232,160,0,0.1))",
            border: "1.5px solid rgba(245,200,66,0.5)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.2rem",
            padding: "0.5rem",
          }}
        >
          <span style={{ fontSize: "0.95rem", fontWeight: 800, color: "#F5C842" }}>
            {example}
          </span>
          <span style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.6)" }}>
            {translation}
          </span>
        </div>
      </div>
    </div>
  );
}

/* ── Vocab flashcard ── */
function VocabCard({ word, lang }: { word: { kz: string; ru: string; en: string }; lang: "ru" | "en" }) {
  const [revealed, setRevealed] = useState(false);

  return (
    <div
      onClick={() => setRevealed((r) => !r)}
      style={{
        background: revealed ? "rgba(245,200,66,0.12)" : "rgba(255,255,255,0.04)",
        border: revealed ? "1px solid rgba(245,200,66,0.4)" : "1px solid rgba(255,255,255,0.08)",
        borderRadius: "0.875rem",
        padding: "1rem",
        cursor: "pointer",
        transition: "all 0.25s",
        textAlign: "center",
      }}
    >
      <div style={{ fontSize: "1.1rem", fontWeight: 800, color: "#fff", marginBottom: "0.3rem" }}>
        {word.kz}
      </div>
      {revealed ? (
        <div style={{ fontSize: "0.82rem", color: "#F5C842", fontWeight: 600 }}>
          {lang === "ru" ? word.ru : word.en}
        </div>
      ) : (
        <div style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.3)" }}>
          Басу → аудармасы
        </div>
      )}
    </div>
  );
}

/* ── Mini Quiz ── */
function MiniQuiz() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const q = QUIZ_QUESTIONS[current];

  const handleSelect = (idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
    if (idx === q.correct) setScore((s) => s + 1);
    setTimeout(() => {
      if (current + 1 < QUIZ_QUESTIONS.length) {
        setCurrent((c) => c + 1);
        setSelected(null);
      } else {
        setDone(true);
      }
    }, 900);
  };

  const reset = () => {
    setCurrent(0);
    setSelected(null);
    setScore(0);
    setDone(false);
  };

  if (done) {
    return (
      <div style={{ textAlign: "center", padding: "2rem 1rem" }}>
        <div style={{ fontSize: "3rem", marginBottom: "0.75rem" }}>
          {score === 3 ? "🏆" : score === 2 ? "🥈" : "💪"}
        </div>
        <div style={{ fontSize: "2rem", fontWeight: 900, color: "#F5C842", marginBottom: "0.4rem" }}>
          {score}/{QUIZ_QUESTIONS.length}
        </div>
        <div style={{ fontSize: "0.9rem", opacity: 0.7, marginBottom: "1.5rem" }}>
          {score === 3 ? "Керемет! Сіз жақсы үйреніп жатырсыз!" : "Жалғастырыңыз, болады!"}
        </div>
        <button
          onClick={reset}
          style={{
            background: "linear-gradient(135deg,#F5C842,#E8A000)",
            color: "#0D1B4B",
            border: "none",
            borderRadius: "0.75rem",
            padding: "0.65rem 1.5rem",
            fontWeight: 700,
            fontSize: "0.88rem",
            cursor: "pointer",
          }}
        >
          Қайтадан тексеру
        </button>
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
        <span style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.45)", fontWeight: 600 }}>
          {current + 1} / {QUIZ_QUESTIONS.length}
        </span>
        <div style={{ display: "flex", gap: "0.3rem" }}>
          {QUIZ_QUESTIONS.map((_, i) => (
            <div
              key={i}
              style={{
                width: 28, height: 4, borderRadius: 2,
                background: i <= current ? "#F5C842" : "rgba(255,255,255,0.12)",
                transition: "background 0.3s",
              }}
            />
          ))}
        </div>
      </div>
      <div style={{ fontWeight: 700, fontSize: "0.95rem", marginBottom: "1.25rem", lineHeight: 1.5 }}>
        {q.q}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
        {q.options.map((opt, i) => {
          let bg = "rgba(255,255,255,0.04)";
          let border = "1px solid rgba(255,255,255,0.1)";
          let color = "#fff";
          if (selected !== null) {
            if (i === q.correct) { bg = "rgba(74,222,128,0.15)"; border = "1px solid #4ADE80"; color = "#4ADE80"; }
            else if (i === selected && i !== q.correct) { bg = "rgba(248,113,113,0.15)"; border = "1px solid #F87171"; color = "#F87171"; }
          }
          return (
            <div
              key={i}
              onClick={() => handleSelect(i)}
              style={{
                background: bg, border, borderRadius: "0.75rem",
                padding: "0.75rem 1rem", cursor: selected === null ? "pointer" : "default",
                fontSize: "0.88rem", fontWeight: 600, color,
                transition: "all 0.25s", userSelect: "none",
              }}
            >
              <span style={{ opacity: 0.45, marginRight: "0.75rem", fontFamily: "monospace" }}>
                {["A", "B", "C", "D"][i]}
              </span>
              {opt}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   MAIN PAGE
══════════════════════════════════════════════════════════════ */

export default function LearnPage() {
  const { user, loading } = useAuth();
  const [activeVocabTopic, setActiveVocabTopic] = useState("greetings");
  const [vocabLang, setVocabLang] = useState<"ru" | "en">("ru");
  const [activeSeptik, setActiveSeptik] = useState(0);
  const [streakDay, setStreakDay] = useState(4);
  const [alphaFilter, setAlphaFilter] = useState<"all" | "kazakh">("all");

  const displayName = user?.email?.split("@")[0] ?? "Оқушы";
  const activeTopic = VOCAB_TOPICS.find((t) => t.id === activeVocabTopic)!;
  const filteredAlpha = alphaFilter === "kazakh"
    ? KAZAKH_ALPHABET.filter((l) => ["Ә","Ғ","Қ","Ң","Ө","Ұ","Ү","Һ","І"].includes(l.letter))
    : KAZAKH_ALPHABET;

  const totalProgress = Math.round(
    MODULES.reduce((sum, m) => sum + m.progress, 0) / MODULES.length
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        @keyframes goldPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(245,200,66,0.3); }
          50%       { box-shadow: 0 0 0 8px rgba(245,200,66,0); }
        }
        @keyframes floatUp {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(-6px); }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes gradShift {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(-12px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeScale {
          from { opacity: 0; transform: scale(0.94); }
          to   { opacity: 1; transform: scale(1); }
        }

        .learn-glass {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.09);
          backdrop-filter: blur(12px);
          border-radius: 1.25rem;
          transition: transform 0.25s, box-shadow 0.25s, background 0.25s;
        }
        .learn-glass:hover {
          transform: translateY(-3px);
          background: rgba(255,255,255,0.07);
          box-shadow: 0 16px 48px rgba(0,0,0,0.4);
        }

        .learn-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          background: linear-gradient(135deg, #F5C842 0%, #E8A000 100%);
          color: #0A0F1E;
          font-weight: 800;
          font-size: 0.88rem;
          padding: 0.75rem 1.5rem;
          border-radius: 0.875rem;
          border: none;
          cursor: pointer;
          transition: transform 0.2s, box-shadow 0.2s;
          letter-spacing: 0.03em;
          text-decoration: none;
        }
        .learn-btn:hover {
          transform: translateY(-2px) scale(1.02);
          box-shadow: 0 10px 30px rgba(245,200,66,0.45);
        }

        .learn-btn-ghost {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          background: rgba(255,255,255,0.06);
          color: #fff;
          font-weight: 700;
          font-size: 0.88rem;
          padding: 0.75rem 1.5rem;
          border-radius: 0.875rem;
          border: 1px solid rgba(255,255,255,0.15);
          cursor: pointer;
          transition: all 0.2s;
          text-decoration: none;
        }
        .learn-btn-ghost:hover {
          background: rgba(255,255,255,0.12);
          border-color: rgba(255,255,255,0.3);
          transform: translateY(-1px);
        }

        .module-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 1.5rem;
          padding: 1.75rem;
          cursor: pointer;
          transition: all 0.3s;
          position: relative;
          overflow: hidden;
          text-decoration: none;
          display: block;
        }
        .module-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          opacity: 0;
          transition: opacity 0.3s;
        }
        .module-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 50px rgba(0,0,0,0.5);
          background: rgba(255,255,255,0.06);
          border-color: rgba(255,255,255,0.15);
        }
        .module-card:hover::before { opacity: 1; }

        .module-card.locked {
          opacity: 0.5;
          pointer-events: none;
          cursor: not-allowed;
        }

        .septik-tab {
          padding: 0.5rem 1rem;
          border-radius: 0.75rem;
          border: 1px solid rgba(255,255,255,0.1);
          background: rgba(255,255,255,0.03);
          color: rgba(255,255,255,0.55);
          font-size: 0.78rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s;
          white-space: nowrap;
        }
        .septik-tab:hover {
          background: rgba(255,255,255,0.07);
          color: #fff;
        }
        .septik-tab.active {
          background: rgba(245,200,66,0.15);
          border-color: rgba(245,200,66,0.5);
          color: #F5C842;
        }

        .streak-day {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.65rem;
          color: rgba(255,255,255,0.4);
          font-weight: 600;
        }
        .streak-day .dot {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          border: 1.5px solid rgba(255,255,255,0.12);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.9rem;
          transition: all 0.3s;
        }
        .streak-day.done .dot {
          background: linear-gradient(135deg,#F5C842,#E8A000);
          border-color: #F5C842;
          animation: goldPulse 2s ease-in-out infinite;
        }
        .streak-day.done {
          color: #F5C842;
        }
        .streak-day.today .dot {
          border-color: rgba(245,200,66,0.5);
          background: rgba(245,200,66,0.1);
        }

        .fact-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 1.25rem;
          padding: 1.5rem;
          transition: transform 0.3s, background 0.3s;
        }
        .fact-card:hover {
          transform: translateY(-4px);
          background: rgba(255,255,255,0.06);
        }

        .phrase-row {
          display: flex;
          align-items: stretch;
          gap: 1rem;
          padding: 1rem 1.25rem;
          border-radius: 1rem;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          transition: all 0.2s;
          cursor: default;
        }
        .phrase-row:hover {
          background: rgba(255,255,255,0.06);
          border-color: rgba(255,255,255,0.14);
        }

        .path-node {
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
        }
        .path-node::after {
          content: '';
          width: 2px;
          flex: 1;
          min-height: 2rem;
          background: linear-gradient(to bottom, rgba(245,200,66,0.4), rgba(255,255,255,0.06));
        }
        .path-node:last-child::after { display: none; }
      `}</style>

      <div
        style={{
          background: "#0A0F1E",
          minHeight: "100vh",
          color: "#fff",
          fontFamily: "'Inter', sans-serif",
        }}
      >
        {/* ══════════════════════════════════════
            HERO BANNER
        ══════════════════════════════════════ */}
        <section
          style={{
            position: "relative",
            overflow: "hidden",
            padding: "4rem 2rem 3rem",
            background: "linear-gradient(135deg, #0A0F1E 0%, #0f1a38 50%, #0A0F1E 100%)",
          }}
        >
          {/* Decorative orbs */}
          <div
            style={{
              position: "absolute", top: -80, right: -60,
              width: 400, height: 400, borderRadius: "50%",
              background: "radial-gradient(circle, rgba(245,200,66,0.07) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />
          <div
            style={{
              position: "absolute", bottom: -60, left: -40,
              width: 300, height: 300, borderRadius: "50%",
              background: "radial-gradient(circle, rgba(96,165,250,0.06) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />
          {/* Kazakh letter watermark */}
          <div
            style={{
              position: "absolute", right: "8%", top: "50%",
              transform: "translateY(-50%)",
              fontSize: "18rem", fontWeight: 900,
              color: "rgba(245,200,66,0.025)",
              userSelect: "none", pointerEvents: "none",
              lineHeight: 1,
            }}
          >
            Ә
          </div>

          <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative" }}>
            {/* Breadcrumb */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.5rem", fontSize: "0.78rem", opacity: 0.45 }}>
              <Link href="/" style={{ color: "#fff", textDecoration: "none" }}>Басты</Link>
              <span>/</span>
              <span style={{ color: "#F5C842" }}>Оқу бөлімі</span>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "3rem", alignItems: "start" }}>
              <div>
                <div
                  style={{
                    display: "inline-flex", alignItems: "center", gap: "0.5rem",
                    background: "rgba(245,200,66,0.12)", border: "1px solid rgba(245,200,66,0.3)",
                    borderRadius: 999, padding: "0.3rem 0.9rem",
                    fontSize: "0.72rem", fontWeight: 700, color: "#F5C842",
                    letterSpacing: "0.08em", textTransform: "uppercase",
                    marginBottom: "1.25rem",
                  }}
                >
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#F5C842", animation: "goldPulse 2s infinite" }} />
                  Оқу жолы
                </div>

                <h1
                  style={{
                    fontSize: "clamp(2rem, 5vw, 3.5rem)",
                    fontWeight: 900,
                    lineHeight: 1.06,
                    letterSpacing: "-0.02em",
                    marginBottom: "1rem",
                  }}
                >
                  Қазақ тілін<br />
                  <span
                    style={{
                      background: "linear-gradient(90deg, #F5C842 0%, #fff 50%, #F5C842 100%)",
                      backgroundSize: "200% auto",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                      animation: "gradShift 4s linear infinite",
                    }}
                  >
                    үйрену жолы
                  </span>
                </h1>

                <p
                  style={{
                    fontSize: "1.05rem",
                    lineHeight: 1.75,
                    color: "rgba(255,255,255,0.62)",
                    maxWidth: 520,
                    marginBottom: "2rem",
                  }}
                >
                  {loading
                    ? "Жүктелуде..."
                    : `Қош келдіңіз, ${displayName}! Сіздің оқу жолыңыз осы жерден басталады. 
                       Әліпбиден бастап C1 деңгейіне дейін — бәрі осы жерде.`}
                </p>

                <div style={{ display: "flex", gap: "0.875rem", flexWrap: "wrap" }}>
                  <Link href="/learn/alphabet" className="learn-btn">
                    📚 Оқуды бастау
                  </Link>
                  <Link href="/ai" className="learn-btn-ghost">
                    🤖 AI Мұғалім
                  </Link>
                </div>
              </div>

              {/* Progress overview card */}
              <Reveal>
                <div
                  className="learn-glass"
                  style={{ padding: "1.75rem", minWidth: 260, textAlign: "center" }}
                >
                  <div style={{ position: "relative", display: "inline-flex", marginBottom: "1rem" }}>
                    <ProgressRing pct={totalProgress} size={96} stroke={7} color="#F5C842" />
                    <div
                      style={{
                        position: "absolute", inset: 0,
                        display: "flex", flexDirection: "column",
                        alignItems: "center", justifyContent: "center",
                      }}
                    >
                      <span style={{ fontSize: "1.5rem", fontWeight: 900, color: "#F5C842" }}>{totalProgress}%</span>
                      <span style={{ fontSize: "0.55rem", opacity: 0.5 }}>ПРОГРЕСС</span>
                    </div>
                  </div>
                  <div style={{ fontWeight: 800, fontSize: "0.95rem", marginBottom: "0.25rem" }}>
                    Жалпы прогресс
                  </div>
                  <div style={{ fontSize: "0.78rem", opacity: 0.5, marginBottom: "1.25rem" }}>
                    {MODULES.filter(m => m.progress > 0).length} / {MODULES.length} модуль басталды
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-around" }}>
                    {[
                      { n: MODULES.reduce((s,m)=>s+m.lessons,0), l: "Сабақ" },
                      { n: MODULES.reduce((s,m)=>s+m.lessons * (m.progress/100),0)|0, l: "Аяқталды" },
                    ].map(({ n, l }) => (
                      <div key={l} style={{ textAlign: "center" }}>
                        <div style={{ fontSize: "1.3rem", fontWeight: 900, color: "#F5C842" }}>{n}</div>
                        <div style={{ fontSize: "0.65rem", opacity: 0.5 }}>{l}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Quick stats row */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
                gap: "1rem",
                marginTop: "2.5rem",
              }}
            >
              {[
                { icon: "🔥", val: streakDay, suf: " күн", label: "Streak" },
                { icon: "⭐", val: 1240, suf: " XP", label: "Тәжірибе" },
                { icon: "🏆", val: 3, suf: "", label: "Жетістік" },
                { icon: "🎯", val: 85, suf: "%", label: "Дәлдік" },
              ].map(({ icon, val, suf, label }) => (
                <div
                  key={label}
                  className="learn-glass"
                  style={{
                    padding: "1rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                  }}
                >
                  <span style={{ fontSize: "1.5rem" }}>{icon}</span>
                  <div>
                    <div style={{ fontSize: "1.25rem", fontWeight: 900, color: "#F5C842", lineHeight: 1 }}>
                      <AnimCount target={val} suffix={suf} />
                    </div>
                    <div style={{ fontSize: "0.7rem", opacity: 0.5, marginTop: 2 }}>{label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            DAILY STREAK
        ══════════════════════════════════════ */}
        <section style={{ padding: "2.5rem 2rem 0" }}>
          <div style={{ maxWidth: 1280, margin: "0 auto" }}>
            <Reveal>
              <div
                className="learn-glass"
                style={{
                  padding: "1.5rem 2rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "2rem",
                  flexWrap: "wrap",
                  borderColor: "rgba(245,200,66,0.2)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexShrink: 0 }}>
                  <span style={{ fontSize: "2rem" }}>🔥</span>
                  <div>
                    <div style={{ fontWeight: 900, fontSize: "1.5rem", color: "#F5C842", lineHeight: 1 }}>
                      {streakDay} күн
                    </div>
                    <div style={{ fontSize: "0.72rem", opacity: 0.5 }}>Үздіксіз оқу</div>
                  </div>
                </div>

                <div style={{ flex: 1, display: "flex", gap: "0.6rem", flexWrap: "wrap" }}>
                  {["Дс", "Сс", "Ср", "Бс", "Жм", "Сб", "Жк"].map((day, i) => {
                    const done = i < streakDay;
                    const today = i === streakDay - 1;
                    return (
                      <div
                        key={day}
                        className={`streak-day${done ? " done" : ""}${today ? " today" : ""}`}
                      >
                        <div className="dot">{done ? "✓" : ""}</div>
                        {day}
                      </div>
                    );
                  })}
                </div>

                <button
                  className="learn-btn"
                  style={{ flexShrink: 0, fontSize: "0.82rem", padding: "0.6rem 1.25rem" }}
                >
                  🎯 Бүгінгі сабақ
                </button>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ══════════════════════════════════════
            MODULES GRID
        ══════════════════════════════════════ */}
        <section style={{ padding: "4rem 2rem" }}>
          <div style={{ maxWidth: 1280, margin: "0 auto" }}>
            <Reveal>
              <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "2rem", flexWrap: "wrap", gap: "1rem" }}>
                <div>
                  <div
                    style={{
                      fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.1em",
                      color: "#F5C842", textTransform: "uppercase", marginBottom: "0.4rem",
                    }}
                  >
                    Бағдарлама
                  </div>
                  <h2 style={{ fontSize: "clamp(1.6rem,4vw,2.5rem)", fontWeight: 900, lineHeight: 1.1 }}>
                    Оқу модульдері
                  </h2>
                </div>
                <div style={{ fontSize: "0.82rem", opacity: 0.45 }}>
                  {MODULES.filter((m) => !m.locked).length} модуль қол жетімді
                </div>
              </div>
            </Reveal>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                gap: "1.25rem",
              }}
            >
              {MODULES.map((mod, i) => (
                <Reveal key={mod.id} delay={i * 60}>
                  <Link
                    href={mod.locked ? "#" : mod.href}
                    className={`module-card${mod.locked ? " locked" : ""}`}
                    style={{ display: "block" }}
                  >
                    {/* Top accent line */}
                    <div
                      style={{
                        position: "absolute", top: 0, left: 0, right: 0,
                        height: 2, background: `linear-gradient(90deg, ${mod.color}, transparent)`,
                        borderRadius: "1.5rem 1.5rem 0 0",
                      }}
                    />

                    {mod.locked && (
                      <div
                        style={{
                          position: "absolute", top: "1rem", right: "1rem",
                          fontSize: "1rem", opacity: 0.5,
                        }}
                      >
                        🔒
                      </div>
                    )}

                    {/* Emoji icon */}
                    <div
                      style={{
                        width: 52, height: 52, borderRadius: "0.875rem",
                        background: `${mod.color}18`,
                        border: `1.5px solid ${mod.color}40`,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: "1.6rem", marginBottom: "1.1rem",
                      }}
                    >
                      {mod.emoji}
                    </div>

                    {/* Level badge */}
                    <span
                      style={{
                        display: "inline-block",
                        background: `${mod.color}20`,
                        color: mod.color,
                        fontSize: "0.65rem", fontWeight: 800,
                        padding: "0.2rem 0.65rem", borderRadius: 999,
                        marginBottom: "0.65rem",
                        letterSpacing: "0.05em", textTransform: "uppercase",
                      }}
                    >
                      {mod.level}
                    </span>

                    <h3 style={{ fontWeight: 800, fontSize: "1.05rem", marginBottom: "0.5rem", color: "#fff" }}>
                      {mod.title}
                    </h3>
                    <p style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.6, marginBottom: "1.25rem" }}>
                      {mod.desc}
                    </p>

                    {/* Tags */}
                    <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap", marginBottom: "1.25rem" }}>
                      {mod.tags.map((tag) => (
                        <span
                          key={tag}
                          style={{
                            fontSize: "0.62rem", fontWeight: 700,
                            background: "rgba(255,255,255,0.06)",
                            border: "1px solid rgba(255,255,255,0.1)",
                            color: "rgba(255,255,255,0.55)",
                            padding: "0.2rem 0.55rem", borderRadius: 999,
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Progress bar */}
                    <div style={{ marginBottom: "1rem" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.4rem", fontSize: "0.7rem", opacity: 0.5 }}>
                        <span>{mod.lessons} сабақ · {mod.duration}</span>
                        <span style={{ color: mod.color, fontWeight: 700 }}>{mod.progress}%</span>
                      </div>
                      <div style={{ height: 4, borderRadius: 2, background: "rgba(255,255,255,0.07)", overflow: "hidden" }}>
                        <div
                          style={{
                            height: "100%", borderRadius: 2,
                            background: `linear-gradient(90deg, ${mod.color}, ${mod.color}88)`,
                            width: `${mod.progress}%`,
                            transition: "width 1s ease",
                          }}
                        />
                      </div>
                    </div>

                    <div
                      style={{
                        display: "flex", alignItems: "center",
                        gap: "0.4rem", color: mod.color,
                        fontWeight: 800, fontSize: "0.82rem",
                      }}
                    >
                      {mod.locked ? "🔒 Жабық" : mod.progress > 0 ? "Жалғастыру →" : "Бастау →"}
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            LANGUAGE FACTS
        ══════════════════════════════════════ */}
        <section
          style={{
            padding: "5rem 2rem",
            background: "linear-gradient(135deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.01) 100%)",
            borderTop: "1px solid rgba(255,255,255,0.05)",
            borderBottom: "1px solid rgba(255,255,255,0.05)",
          }}
        >
          <div style={{ maxWidth: 1280, margin: "0 auto" }}>
            <Reveal>
              <div style={{ textAlign: "center", marginBottom: "3rem" }}>
                <div
                  style={{
                    display: "inline-block",
                    background: "rgba(245,200,66,0.1)",
                    border: "1px solid rgba(245,200,66,0.25)",
                    borderRadius: 999, padding: "0.3rem 1rem",
                    fontSize: "0.72rem", fontWeight: 700, color: "#F5C842",
                    letterSpacing: "0.08em", textTransform: "uppercase",
                    marginBottom: "1rem",
                  }}
                >
                  Тіл туралы
                </div>
                <h2 style={{ fontSize: "clamp(1.6rem,4vw,2.8rem)", fontWeight: 900, lineHeight: 1.1, marginBottom: "0.75rem" }}>
                  Қазақ тілі — бірегей әлем
                </h2>
                <p style={{ opacity: 0.5, maxWidth: 520, margin: "0 auto", lineHeight: 1.7, fontSize: "0.95rem" }}>
                  Тілді үйрену алдында оның бірегейлігін түсіну маңызды.
                  Міне, сізге ынта беретін 6 факт:
                </p>
              </div>
            </Reveal>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                gap: "1.25rem",
              }}
            >
              {LANGUAGE_FACTS.map((fact, i) => (
                <Reveal key={i} delay={i * 80}>
                  <div className="fact-card">
                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
                      <div
                        style={{
                          width: 44, height: 44, borderRadius: "0.875rem",
                          background: `${fact.color}15`,
                          border: `1px solid ${fact.color}35`,
                          display: "flex", alignItems: "center", justifyContent: "center",
                          fontSize: "1.3rem",
                        }}
                      >
                        {fact.icon}
                      </div>
                      <div>
                        <div style={{ fontSize: "1.3rem", fontWeight: 900, color: fact.color, lineHeight: 1 }}>
                          {fact.stat}
                        </div>
                        <div style={{ fontSize: "0.7rem", opacity: 0.5, fontWeight: 600 }}>{fact.label}</div>
                      </div>
                    </div>
                    <p style={{ fontSize: "0.85rem", lineHeight: 1.65, color: "rgba(255,255,255,0.62)" }}>
                      {fact.desc}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            ALPHABET SHOWCASE
        ══════════════════════════════════════ */}
        <section style={{ padding: "5rem 2rem" }}>
          <div style={{ maxWidth: 1280, margin: "0 auto" }}>
            <Reveal>
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "2rem", flexWrap: "wrap", gap: "1.25rem" }}>
                <div>
                  <div
                    style={{
                      fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.1em",
                      color: "#F5C842", textTransform: "uppercase", marginBottom: "0.4rem",
                    }}
                  >
                    Әліпби
                  </div>
                  <h2 style={{ fontSize: "clamp(1.6rem,4vw,2.5rem)", fontWeight: 900, lineHeight: 1.1, marginBottom: "0.6rem" }}>
                    Қазақ алфавиті
                  </h2>
                  <p style={{ opacity: 0.5, fontSize: "0.88rem", lineHeight: 1.6, maxWidth: 440 }}>
                    Картаны басып аудармасын, мысалы сөзді қараңыз.
                    Сарымен белгіленгендер — тек қазақ тіліне тән дыбыстар.
                  </p>
                </div>
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  {(["all", "kazakh"] as const).map((f) => (
                    <button
                      key={f}
                      onClick={() => setAlphaFilter(f)}
                      style={{
                        padding: "0.5rem 1rem",
                        borderRadius: "0.75rem",
                        border: "1px solid",
                        borderColor: alphaFilter === f ? "rgba(245,200,66,0.5)" : "rgba(255,255,255,0.12)",
                        background: alphaFilter === f ? "rgba(245,200,66,0.12)" : "rgba(255,255,255,0.03)",
                        color: alphaFilter === f ? "#F5C842" : "rgba(255,255,255,0.55)",
                        fontSize: "0.78rem", fontWeight: 700, cursor: "pointer",
                        transition: "all 0.2s",
                      }}
                    >
                      {f === "all" ? `Барлығы (${KAZAKH_ALPHABET.length})` : "Ерекше қазақша (9)"}
                    </button>
                  ))}
                </div>
              </div>
            </Reveal>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(72px, 1fr))",
                gap: "0.6rem",
              }}
            >
              {filteredAlpha.map((item, i) => (
                <Reveal key={item.letter} delay={i * 15}>
                  <AlphaCard {...item} idx={i} />
                </Reveal>
              ))}
            </div>

            <Reveal delay={200}>
              <div style={{ textAlign: "center", marginTop: "2rem" }}>
                <Link href="/learn/alphabet" className="learn-btn">
                  🔤 Толық Әліпби сабағы →
                </Link>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ══════════════════════════════════════
            SEPTIK — GRAMMAR SHOWCASE
        ══════════════════════════════════════ */}
        <section
          style={{
            padding: "5rem 2rem",
            background: "rgba(255,255,255,0.02)",
            borderTop: "1px solid rgba(255,255,255,0.05)",
          }}
        >
          <div style={{ maxWidth: 1280, margin: "0 auto" }}>
            <Reveal>
              <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
                <div
                  style={{
                    display: "inline-block",
                    background: "rgba(96,165,250,0.1)",
                    border: "1px solid rgba(96,165,250,0.25)",
                    borderRadius: 999, padding: "0.3rem 1rem",
                    fontSize: "0.72rem", fontWeight: 700, color: "#60A5FA",
                    letterSpacing: "0.08em", textTransform: "uppercase",
                    marginBottom: "1rem",
                  }}
                >
                  Грамматика
                </div>
                <h2 style={{ fontSize: "clamp(1.6rem,4vw,2.5rem)", fontWeight: 900, lineHeight: 1.1, marginBottom: "0.7rem" }}>
                  7 Септік жүйесі
                </h2>
                <p style={{ opacity: 0.5, maxWidth: 460, margin: "0 auto", lineHeight: 1.7, fontSize: "0.9rem" }}>
                  Қазақ тілінің грамматикасының негізі — септік жалғаулары.
                  Секция таңдап, интерактивті үйреніңіз.
                </p>
              </div>
            </Reveal>

            {/* Septik tabs */}
            <Reveal delay={100}>
              <div
                style={{
                  display: "flex", gap: "0.5rem", flexWrap: "wrap",
                  marginBottom: "1.75rem", justifyContent: "center",
                }}
              >
                {SEPTIK_CASES.map((s, i) => (
                  <button
                    key={i}
                    className={`septik-tab${activeSeptik === i ? " active" : ""}`}
                    onClick={() => setActiveSeptik(i)}
                  >
                    {s.name}
                  </button>
                ))}
              </div>
            </Reveal>

            {/* Active septik panel */}
            <Reveal delay={150}>
              <div
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: `1.5px solid ${SEPTIK_CASES[activeSeptik].color}35`,
                  borderRadius: "1.5rem",
                  padding: "2rem",
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "2rem",
                  animation: "fadeScale 0.3s ease",
                }}
              >
                <div>
                  <div
                    style={{
                      display: "inline-block",
                      background: `${SEPTIK_CASES[activeSeptik].color}18`,
                      color: SEPTIK_CASES[activeSeptik].color,
                      borderRadius: 999, padding: "0.25rem 0.8rem",
                      fontSize: "0.7rem", fontWeight: 800,
                      letterSpacing: "0.06em", textTransform: "uppercase",
                      marginBottom: "0.75rem",
                    }}
                  >
                    {SEPTIK_CASES[activeSeptik].desc}
                  </div>
                  <h3 style={{ fontSize: "1.8rem", fontWeight: 900, marginBottom: "0.5rem" }}>
                    {SEPTIK_CASES[activeSeptik].name}
                  </h3>
                  <div
                    style={{
                      fontSize: "0.95rem", opacity: 0.6, marginBottom: "1.5rem",
                    }}
                  >
                    Сұрақ: <strong style={{ color: "#fff" }}>{SEPTIK_CASES[activeSeptik].question}</strong>
                  </div>

                  <div
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      borderRadius: "1rem", padding: "1.25rem",
                      marginBottom: "1.25rem",
                    }}
                  >
                    <div style={{ fontSize: "0.72rem", opacity: 0.4, marginBottom: "0.4rem", fontWeight: 600, letterSpacing: "0.06em" }}>
                      ЖАЛҒАУ
                    </div>
                    <div
                      style={{
                        fontSize: "2rem", fontWeight: 900,
                        color: SEPTIK_CASES[activeSeptik].color,
                        fontFamily: "monospace",
                      }}
                    >
                      {SEPTIK_CASES[activeSeptik].suffix}
                    </div>
                  </div>

                  <Link href="/learn/grammar" className="learn-btn" style={{ fontSize: "0.82rem" }}>
                    Грамматика сабағы →
                  </Link>
                </div>

                <div>
                  <div style={{ fontSize: "0.72rem", opacity: 0.4, marginBottom: "1rem", fontWeight: 600, letterSpacing: "0.06em" }}>
                    МЫСАЛ — «КІТАП» СӨЗІ
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                    {SEPTIK_CASES.map((s, i) => (
                      <div
                        key={i}
                        onClick={() => setActiveSeptik(i)}
                        style={{
                          display: "flex", alignItems: "center", gap: "1rem",
                          padding: "0.75rem 1rem", borderRadius: "0.875rem",
                          background: activeSeptik === i ? `${s.color}12` : "rgba(255,255,255,0.02)",
                          border: `1px solid ${activeSeptik === i ? `${s.color}40` : "rgba(255,255,255,0.06)"}`,
                          cursor: "pointer", transition: "all 0.2s",
                        }}
                      >
                        <span
                          style={{
                            fontSize: "0.7rem", fontWeight: 700,
                            color: s.color, minWidth: 24, opacity: activeSeptik === i ? 1 : 0.5,
                          }}
                        >
                          {i + 1}
                        </span>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: "0.78rem", fontWeight: 700, color: activeSeptik === i ? s.color : "rgba(255,255,255,0.7)" }}>
                            {s.example}
                          </div>
                          <div style={{ fontSize: "0.65rem", opacity: 0.4 }}>{s.name}</div>
                        </div>
                        <span style={{ fontSize: "0.65rem", opacity: 0.35, fontFamily: "monospace" }}>{s.suffix}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ══════════════════════════════════════
            VOCABULARY SECTION
        ══════════════════════════════════════ */}
        <section style={{ padding: "5rem 2rem" }}>
          <div style={{ maxWidth: 1280, margin: "0 auto" }}>
            <Reveal>
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "2rem", flexWrap: "wrap", gap: "1.25rem" }}>
                <div>
                  <div
                    style={{
                      fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.1em",
                      color: "#4ADE80", textTransform: "uppercase", marginBottom: "0.4rem",
                    }}
                  >
                    Сөздік
                  </div>
                  <h2 style={{ fontSize: "clamp(1.6rem,4vw,2.5rem)", fontWeight: 900, lineHeight: 1.1 }}>
                    Сөздік қорды жетілдіру
                  </h2>
                </div>
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  {(["ru", "en"] as const).map((l) => (
                    <button
                      key={l}
                      onClick={() => setVocabLang(l)}
                      style={{
                        padding: "0.4rem 0.9rem",
                        borderRadius: "0.75rem",
                        border: "1px solid",
                        borderColor: vocabLang === l ? "rgba(74,222,128,0.5)" : "rgba(255,255,255,0.12)",
                        background: vocabLang === l ? "rgba(74,222,128,0.1)" : "rgba(255,255,255,0.03)",
                        color: vocabLang === l ? "#4ADE80" : "rgba(255,255,255,0.55)",
                        fontSize: "0.78rem", fontWeight: 700, cursor: "pointer",
                        transition: "all 0.2s",
                      }}
                    >
                      {l === "ru" ? "🇷🇺 Орысша" : "🇬🇧 Ағылшынша"}
                    </button>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Topic tabs */}
            <Reveal delay={80}>
              <div style={{ display: "flex", gap: "0.6rem", marginBottom: "1.5rem", overflowX: "auto", paddingBottom: "0.25rem" }}>
                {VOCAB_TOPICS.map((topic) => (
                  <button
                    key={topic.id}
                    onClick={() => setActiveVocabTopic(topic.id)}
                    style={{
                      display: "flex", alignItems: "center", gap: "0.5rem",
                      padding: "0.6rem 1.1rem", borderRadius: "0.875rem",
                      border: "1px solid",
                      borderColor: activeVocabTopic === topic.id ? `${topic.color}50` : "rgba(255,255,255,0.1)",
                      background: activeVocabTopic === topic.id ? `${topic.color}12` : "rgba(255,255,255,0.03)",
                      color: activeVocabTopic === topic.id ? topic.color : "rgba(255,255,255,0.55)",
                      fontSize: "0.82rem", fontWeight: 700, cursor: "pointer",
                      transition: "all 0.2s", whiteSpace: "nowrap", flexShrink: 0,
                    }}
                  >
                    <span>{topic.emoji}</span>
                    {topic.title}
                  </button>
                ))}
              </div>
            </Reveal>

            {/* Flashcards */}
            <Reveal delay={120}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
                  gap: "0.75rem",
                  marginBottom: "1.75rem",
                }}
              >
                {activeTopic.words.map((word, i) => (
                  <VocabCard key={i} word={word} lang={vocabLang} />
                ))}
              </div>
            </Reveal>

            <Reveal delay={160}>
              <div style={{ textAlign: "center" }}>
                <Link href="/learn/vocabulary" className="learn-btn">
                  📖 Толық Сөздік Қор →
                </Link>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ══════════════════════════════════════
            DAILY PHRASES
        ══════════════════════════════════════ */}
        <section
          style={{
            padding: "5rem 2rem",
            background: "rgba(255,255,255,0.02)",
            borderTop: "1px solid rgba(255,255,255,0.05)",
          }}
        >
          <div style={{ maxWidth: 1280, margin: "0 auto" }}>
            <Reveal>
              <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
                <div
                  style={{
                    display: "inline-block",
                    background: "rgba(251,146,60,0.1)",
                    border: "1px solid rgba(251,146,60,0.25)",
                    borderRadius: 999, padding: "0.3rem 1rem",
                    fontSize: "0.72rem", fontWeight: 700, color: "#FB923C",
                    letterSpacing: "0.08em", textTransform: "uppercase",
                    marginBottom: "1rem",
                  }}
                >
                  Күнделікті тіл
                </div>
                <h2 style={{ fontSize: "clamp(1.6rem,4vw,2.5rem)", fontWeight: 900, lineHeight: 1.1, marginBottom: "0.7rem" }}>
                  Ең керекті 5 сөйлем
                </h2>
                <p style={{ opacity: 0.5, maxWidth: 440, margin: "0 auto", lineHeight: 1.7, fontSize: "0.9rem" }}>
                  Тілді үйренуде бірінші қадам — күнделікті қарым-қатынас.
                  Осы сөйлемдерді жаттасаңыз — дайынсыз.
                </p>
              </div>
            </Reveal>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", maxWidth: 680, margin: "0 auto" }}>
              {DAILY_PHRASES.map((phrase, i) => (
                <Reveal key={i} delay={i * 80}>
                  <div className="phrase-row">
                    <div
                      style={{
                        width: 32, height: 32, borderRadius: "50%",
                        background: "rgba(251,146,60,0.15)",
                        border: "1px solid rgba(251,146,60,0.3)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: "0.8rem", fontWeight: 900, color: "#FB923C",
                        flexShrink: 0,
                      }}
                    >
                      {i + 1}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 800, fontSize: "0.98rem", color: "#fff", marginBottom: "0.2rem" }}>
                        {phrase.kz}
                      </div>
                      <div style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.45)" }}>
                        {phrase.ru}
                      </div>
                    </div>
                    <div
                      style={{
                        fontSize: "0.68rem", fontWeight: 700,
                        background: "rgba(255,255,255,0.05)",
                        border: "1px solid rgba(255,255,255,0.09)",
                        borderRadius: 999, padding: "0.2rem 0.65rem",
                        color: "rgba(255,255,255,0.4)",
                        whiteSpace: "nowrap", flexShrink: 0,
                      }}
                    >
                      {phrase.usage}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            MINI QUIZ
        ══════════════════════════════════════ */}
        <section style={{ padding: "5rem 2rem" }}>
          <div style={{ maxWidth: 1280, margin: "0 auto" }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "2.5rem",
                alignItems: "center",
              }}
            >
              <Reveal>
                <div>
                  <div
                    style={{
                      fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.1em",
                      color: "#A78BFA", textTransform: "uppercase", marginBottom: "0.6rem",
                    }}
                  >
                    Өз-өзіңді тексер
                  </div>
                  <h2 style={{ fontSize: "clamp(1.6rem,4vw,2.5rem)", fontWeight: 900, lineHeight: 1.1, marginBottom: "1rem" }}>
                    Жылдам тест 🧠
                  </h2>
                  <p style={{ opacity: 0.55, lineHeight: 1.75, marginBottom: "1.75rem", fontSize: "0.95rem" }}>
                    Өзіңіздің білім деңгейіңізді тексеріңіз. 3 сұрақ,
                    30 секунд — дайынсыз ба?
                  </p>

                  <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                    {[
                      { icon: "⚡", text: "Лездік кері байланыс" },
                      { icon: "📊", text: "XP ұпай жинаңыз" },
                      { icon: "🔄", text: "Шексіз қайталау" },
                    ].map(({ icon, text }) => (
                      <div key={text} style={{ display: "flex", alignItems: "center", gap: "0.75rem", fontSize: "0.88rem", opacity: 0.75 }}>
                        <span style={{ fontSize: "1rem" }}>{icon}</span>
                        {text}
                      </div>
                    ))}
                  </div>

                  <div style={{ marginTop: "2rem" }}>
                    <Link href="/learn/grammar" className="learn-btn">
                      📝 Толық тест →
                    </Link>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={150}>
                <div
                  className="learn-glass"
                  style={{
                    padding: "2rem",
                    border: "1px solid rgba(167,139,250,0.25)",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem", paddingBottom: "1rem", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
                    <div
                      style={{
                        width: 36, height: 36, borderRadius: "0.75rem",
                        background: "rgba(167,139,250,0.15)",
                        border: "1px solid rgba(167,139,250,0.3)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: "1.1rem",
                      }}
                    >
                      🧠
                    </div>
                    <div>
                      <div style={{ fontWeight: 800, fontSize: "0.9rem" }}>Жылдам тест</div>
                      <div style={{ fontSize: "0.7rem", color: "#A78BFA" }}>3 сұрақ · Базалық деңгей</div>
                    </div>
                  </div>
                  <MiniQuiz />
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            LEARNING PATH (vertical)
        ══════════════════════════════════════ */}
        <section
          style={{
            padding: "5rem 2rem",
            background: "rgba(255,255,255,0.02)",
            borderTop: "1px solid rgba(255,255,255,0.05)",
          }}
        >
          <div style={{ maxWidth: 1280, margin: "0 auto" }}>
            <Reveal>
              <div style={{ textAlign: "center", marginBottom: "3rem" }}>
                <div
                  style={{
                    display: "inline-block",
                    background: "rgba(245,200,66,0.1)",
                    border: "1px solid rgba(245,200,66,0.25)",
                    borderRadius: 999, padding: "0.3rem 1rem",
                    fontSize: "0.72rem", fontWeight: 700, color: "#F5C842",
                    letterSpacing: "0.08em", textTransform: "uppercase",
                    marginBottom: "1rem",
                  }}
                >
                  Оқу жоспары
                </div>
                <h2 style={{ fontSize: "clamp(1.6rem,4vw,2.5rem)", fontWeight: 900, lineHeight: 1.1, marginBottom: "0.7rem" }}>
                  Сіздің жолыңыз
                </h2>
                <p style={{ opacity: 0.5, maxWidth: 440, margin: "0 auto", lineHeight: 1.7, fontSize: "0.9rem" }}>
                  Нөлден C1 деңгейіне дейінгі толық жол картасы.
                  Бір сатыдан кейін бірі ашылады.
                </p>
              </div>
            </Reveal>

            <div style={{ maxWidth: 560, margin: "0 auto" }}>
              {[
                { level: "A0", title: "Нөл деңгей", desc: "Алфавит, дыбыстар, сандар, түстер", color: "#4ADE80", done: true },
                { level: "A1", title: "Бастауыш", desc: "Өзіңді таныстыру, сәлемдесу, негізгі грамматика", color: "#60A5FA", done: true },
                { level: "A2", title: "Элементарлы", desc: "Отбасы, уақыт, жоспар, диалог", color: "#F5C842", done: false, active: true },
                { level: "B1", title: "Орта деңгей", desc: "Оқылым, күрделі грамматика, мәтін", color: "#FB923C", done: false },
                { level: "B2", title: "Орта-жоғары", desc: "Пікір, эссе, медиа тіл", color: "#F472B6", done: false },
                { level: "C1", title: "Жетілдірілген", desc: "Академиялық, кәсіби қарым-қатынас", color: "#A78BFA", done: false },
              ].map((step, i) => (
                <Reveal key={i} delay={i * 80}>
                  <div className="path-node">
                    <div
                      style={{
                        display: "flex", alignItems: "center", gap: "1.25rem",
                        padding: "1.25rem 1.5rem",
                        background: step.active
                          ? `${step.color}10`
                          : step.done
                          ? "rgba(255,255,255,0.03)"
                          : "rgba(255,255,255,0.02)",
                        border: "1px solid",
                        borderColor: step.active
                          ? `${step.color}45`
                          : step.done
                          ? "rgba(74,222,128,0.2)"
                          : "rgba(255,255,255,0.06)",
                        borderRadius: "1.25rem",
                        width: "100%",
                        marginBottom: "0.5rem",
                        transition: "all 0.3s",
                      }}
                    >
                      <div
                        style={{
                          width: 48, height: 48, borderRadius: "50%",
                          background: step.done
                            ? "linear-gradient(135deg,#4ADE80,#22C55E)"
                            : step.active
                            ? `${step.color}20`
                            : "rgba(255,255,255,0.04)",
                          border: `2px solid ${step.done ? "#4ADE80" : step.active ? step.color : "rgba(255,255,255,0.1)"}`,
                          display: "flex", alignItems: "center", justifyContent: "center",
                          fontWeight: 900, fontSize: "0.78rem",
                          color: step.done ? "#0A0F1E" : step.active ? step.color : "rgba(255,255,255,0.35)",
                          flexShrink: 0,
                        }}
                      >
                        {step.done ? "✓" : step.level}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.25rem" }}>
                          <span
                            style={{
                              fontWeight: 800, fontSize: "0.95rem",
                              color: step.active ? step.color : step.done ? "#4ADE80" : "#fff",
                            }}
                          >
                            {step.title}
                          </span>
                          {step.active && (
                            <span
                              style={{
                                fontSize: "0.62rem", fontWeight: 800,
                                background: `${step.color}20`,
                                color: step.color,
                                padding: "0.15rem 0.55rem", borderRadius: 999,
                                letterSpacing: "0.06em",
                              }}
                            >
                              ҚАЗІР
                            </span>
                          )}
                        </div>
                        <div style={{ fontSize: "0.78rem", opacity: 0.45 }}>{step.desc}</div>
                      </div>
                      <span style={{ fontSize: "0.72rem", opacity: 0.3, fontWeight: 700, letterSpacing: "0.08em" }}>
                        {step.level}
                      </span>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            CTA BOTTOM
        ══════════════════════════════════════ */}
        <section style={{ padding: "5rem 2rem" }}>
          <div style={{ maxWidth: 1280, margin: "0 auto" }}>
            <Reveal>
              <div
                style={{
                  background: "linear-gradient(135deg, rgba(245,200,66,0.08) 0%, rgba(96,165,250,0.05) 50%, rgba(245,200,66,0.08) 100%)",
                  border: "1px solid rgba(245,200,66,0.2)",
                  borderRadius: "2rem",
                  padding: "4rem 3rem",
                  textAlign: "center",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* decorative Kazakh letter */}
                <div
                  style={{
                    position: "absolute", right: "-2rem", top: "-2rem",
                    fontSize: "12rem", fontWeight: 900,
                    color: "rgba(245,200,66,0.04)",
                    lineHeight: 1, userSelect: "none", pointerEvents: "none",
                  }}
                >
                  Қ
                </div>

                <div
                  style={{
                    display: "inline-flex", alignItems: "center", gap: "0.5rem",
                    background: "rgba(245,200,66,0.12)", border: "1px solid rgba(245,200,66,0.3)",
                    borderRadius: 999, padding: "0.3rem 0.9rem",
                    fontSize: "0.72rem", fontWeight: 700, color: "#F5C842",
                    letterSpacing: "0.08em", textTransform: "uppercase",
                    marginBottom: "1.25rem",
                  }}
                >
                  🇰🇿 QAZMURA
                </div>

                <h2
                  style={{
                    fontSize: "clamp(1.8rem,5vw,3rem)",
                    fontWeight: 900, lineHeight: 1.1, marginBottom: "1rem",
                  }}
                >
                  AI мұғаліммен бірге<br />
                  <span style={{ color: "#F5C842" }}>жылдамырақ үйреніңіз</span>
                </h2>

                <p
                  style={{
                    opacity: 0.6, maxWidth: 480, margin: "0 auto 2rem",
                    lineHeight: 1.75, fontSize: "0.98rem",
                  }}
                >
                  Claude AI сіздің деңгейіңізге бейімделіп, жеке жоспар жасайды.
                  Тәулік бойы — сұрақсыз, үкімсіз, тек үйренуге.
                </p>

                <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
                  <Link href="/ai" className="learn-btn" style={{ fontSize: "0.98rem", padding: "0.9rem 2rem" }}>
                    🤖 AI Мұғалімді ашу
                  </Link>
                  <Link href="/learn/alphabet" className="learn-btn-ghost" style={{ fontSize: "0.98rem", padding: "0.9rem 2rem" }}>
                    📚 Сабақтан бастау
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

      </div>
    </>
  );
}