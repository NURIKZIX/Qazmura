"use client";

import { useState, useEffect, useRef } from "react";

const letters = [
  { letter: "А", emoji: "🍎", color: "#FF6B6B", words: ["Ана", "Алма", "Ат", "Аспан", "Ауыл", "Арыстан", "Ақ", "Алтын", "Аю", "Адам"] },
  { letter: "Ә", emoji: "👨‍👦", color: "#FF8E53", words: ["Әке", "Әже", "Әлем", "Әнші", "Әріп", "Әрқим", "Әдет", "Әйел", "Әскер", "Әтеш"] },
  { letter: "Б", emoji: "👶", color: "#FFC300", words: ["Бала", "Бас", "Бақ", "Балық", "Бет", "Бесік", "Биік", "Бор", "Бұқа", "Болат"] },
  { letter: "В", emoji: "🚂", color: "#A8E063", words: ["Вагон", "Ваза", "Вирус", "Витамин", "Волейбол", "Вулкан", "Велосипед", "Вальс", "Ветер", "Версия"] },
  { letter: "Г", emoji: "🌸", color: "#56C596", words: ["Гүл", "Газет", "Галстук", "Гараж", "Гитара", "Глобус", "Горилла", "Грек", "Гречка", "Гимн"] },
  { letter: "Ғ", emoji: "🚀", color: "#4ECDC4", words: ["Ғарыш", "Ғылым", "Ғажап", "Ғасыр", "Ғалым", "Ғамал", "Ғибрат", "Ғұрып", "Ғимарат", "Ғайып"] },
  { letter: "Д", emoji: "🤝", color: "#45B7D1", words: ["Дос", "Дала", "Дән", "Дауыл", "Дәптер", "Денсаулық", "Дерек", "Діл", "Дүкен", "Дыбыс"] },
  { letter: "Е", emoji: "🏡", color: "#6C63FF", words: ["Ел", "Ерте", "Есік", "Еден", "Ет", "Ертегі", "Еңбек", "Егін", "Ерлік", "Ескі"] },
  { letter: "Ё", emoji: "🎄", color: "#F857A6", words: ["Ёлка", "Ёгурт", "Ёж", "Ётқа", "Ёлочка", "Ёш", "Ётқыр", "Ёлочный", "Ёгурт", "Ётқышы"] },
  { letter: "Ж", emoji: "🛤️", color: "#FF6B6B", words: ["Жол", "Жер", "Жас", "Жаз", "Жүрек", "Жылан", "Жарық", "Жесір", "Жауап", "Жігіт"] },
  { letter: "З", emoji: "🧪", color: "#FF8E53", words: ["Зат", "Зор", "Завод", "Замок", "Зейін", "Зіл", "Зымыран", "Зерде", "Зиян", "Зебра"] },
  { letter: "И", emoji: "🪡", color: "#FFC300", words: ["Ине", "Ит", "Ирек", "Ингред", "Инженер", "Интернет", "Ирония", "Иық", "Игілік", "Іргелес"] },
  { letter: "Й", emoji: "🥛", color: "#A8E063", words: ["Йогурт", "Йод", "Йога", "Йот", "Йотация", "Йордан", "Йотланд", "Йомен", "Йоруба", "Йети"] },
  { letter: "К", emoji: "📚", color: "#56C596", words: ["Кітап", "Күн", "Көл", "Кеме", "Кесте", "Кіші", "Кеңес", "Кілем", "Кино", "Компьютер"] },
  { letter: "Қ", emoji: "🏙️", color: "#4ECDC4", words: ["Қала", "Қол", "Қыз", "Қар", "Қасқыр", "Қоян", "Қуат", "Қызмет", "Қоңыр", "Қазақ"] },
  { letter: "Л", emoji: "🐑", color: "#45B7D1", words: ["Лақ", "Лимон", "Луна", "Лиса", "Лента", "Лаваш", "Лагерь", "Лазер", "Линия", "Лотос"] },
  { letter: "М", emoji: "🏫", color: "#6C63FF", words: ["Мектеп", "Мал", "Мұз", "Мама", "Машина", "Медве", "Меруерт", "Міндет", "Мұрын", "Музыка"] },
  { letter: "Н", emoji: "🍞", color: "#F857A6", words: ["Нан", "Ной", "Нота", "Номер", "Нарық", "Науқас", "Нәтиже", "Небо", "Ніл", "Норма"] },
  { letter: "Ң", emoji: "🔤", color: "#FF6B6B", words: ["Аң", "Күң", "Таң", "Жаң", "Қоңыр", "Дыбыс", "Соңғы", "Маңызды", "Аңдату", "Ұйқы"] },
  { letter: "О", emoji: "🏠", color: "#FF8E53", words: ["Отан", "Өрт", "Ой", "Оқу", "Орман", "Орын", "Осы", "Оқушы", "Оюлы", "Отбасы"] },
  { letter: "Ө", emoji: "🍑", color: "#FFC300", words: ["Өрік", "Өмір", "Өнер", "Өсімдік", "Өткен", "Өзен", "Өрмек", "Өкпе", "Өте", "Өнім"] },
  { letter: "П", emoji: "🪑", color: "#A8E063", words: ["Парта", "Пойыз", "Пақыр", "Пальто", "Папа", "Парк", "Пианино", "Планета", "Поэт", "Пчела"] },
  { letter: "Р", emoji: "🙏", color: "#56C596", words: ["Рақмет", "Рухани", "Рас", "Ракета", "Радуга", "Ресурс", "Роль", "Ромашка", "Рояль", "Рынок"] },
  { letter: "С", emoji: "💧", color: "#4ECDC4", words: ["Су", "Сен", "Сөз", "Сала", "Сабақ", "Самолёт", "Серік", "Сынып", "Сүт", "Санат"] },
  { letter: "Т", emoji: "⛰️", color: "#45B7D1", words: ["Тау", "Тіл", "Тас", "Табиғат", "Тарих", "Тәуелсіз", "Темір", "Тиін", "Тоқ", "Туған"] },
  { letter: "У", emoji: "⏰", color: "#6C63FF", words: ["Уақыт", "Ұшақ", "Ут", "Уыз", "Ұзын", "Умпа", "Ура", "Урок", "Уран", "Узор"] },
  { letter: "Ұ", emoji: "👦", color: "#F857A6", words: ["Ұл", "Ұшақ", "Ұстаз", "Ұлт", "Ұмыт", "Ұрпақ", "Ұран", "Ұялы", "Ұйым", "Ұзақ"] },
  { letter: "Ү", emoji: "🏠", color: "#FF6B6B", words: ["Үй", "Үлкен", "Үміт", "Үрей", "Үндеу", "Үшін", "Үстел", "Үйрену", "Үнемі", "Үлгі"] },
  { letter: "Ф", emoji: "⚽", color: "#FF8E53", words: ["Футбол", "Фото", "Физика", "Фламинго", "Форма", "Флаг", "Фонтан", "Факт", "Фарфор", "Фильм"] },
  { letter: "Х", emoji: "👥", color: "#FFC300", words: ["Халық", "Хат", "Хан", "Химия", "Хор", "Хоккей", "Храм", "Хлеб", "Хронология", "Хабар"] },
  { letter: "Һ", emoji: "🌟", color: "#A8E063", words: ["Һарун", "Һиммат", "Һаракет", "Һор", "Һадиса", "Һауа", "Һибра", "Һам", "Һелий", "Һина"] },
  { letter: "Ц", emoji: "🎪", color: "#56C596", words: ["Цирк", "Центр", "Цвет", "Цикл", "Цифр", "Целина", "Цепь", "Царь", "Цемент", "Церемония"] },
  { letter: "Ч", emoji: "🧳", color: "#4ECDC4", words: ["Чемодан", "Чай", "Часы", "Человек", "Черника", "Чистый", "Чтение", "Чудо", "Число", "Честь"] },
  { letter: "Ш", emoji: "💨", color: "#45B7D1", words: ["Шаң", "Шай", "Шам", "Шарик", "Шахмат", "Шаян", "Шекара", "Шеше", "Шоколад", "Шыршa"] },
  { letter: "Щ", emoji: "🪥", color: "#6C63FF", words: ["Щётка", "Щит", "Щука", "Щавель", "Щепка", "Щель", "Щенок", "Щиколотка", "Щипцы", "Щёчка"] },
  { letter: "Ъ", emoji: "✍️", color: "#F857A6", words: ["Ъ белгісі", "Объект", "Съезд", "Подъём", "Объём", "Въезд", "Съёмка", "Объяснение", "Разъезд", "Предъявить"] },
  { letter: "Ы", emoji: "🍽️", color: "#FF6B6B", words: ["Ыдыс", "Ырым", "Ыңқыл", "Ылғал", "Ынта", "Ырыс", "Ықылас", "Ыдырау", "Ылай", "Ызғар"] },
  { letter: "І", emoji: "👨‍👦‍👦", color: "#FF8E53", words: ["Іні", "Іс", "Іздеу", "Ізгілік", "Іңір", "Іргетас", "Іркілу", "Істеу", "Ісік", "Іле"] },
  { letter: "Ь", emoji: "🖊️", color: "#FFC300", words: ["Ь белгісі", "Альбом", "Коньки", "Пальто", "Тетрадь", "Дельфин", "Бильярд", "Фильм", "Словарь", "Стиль"] },
  { letter: "Э", emoji: "🖥️", color: "#A8E063", words: ["Экран", "Электр", "Энергия", "Эфир", "Эпоха", "Эмоция", "Экология", "Экономика", "Элемент", "Эксперт"] },
  { letter: "Ю", emoji: "🏕️", color: "#56C596", words: ["Юрта", "Юбилей", "Юмор", "Юрист", "Юность", "Южный", "Юркий", "Ютуб", "Юрта", "Юганск"] },
  { letter: "Я", emoji: "🍏", color: "#4ECDC4", words: ["Яблоко", "Яхта", "Якорь", "Ярмарка", "Янтарь", "Ягода", "Язык", "Яркий", "Яйцо", "Ялта"] },
];

interface Particle {
  id: number;
  x: number;
  y: number;
  color: string;
  angle: number;
  speed: number;
  size: number;
  life: number;
}

export default function Alphabet() {
  const [activeLetter, setActiveLetter] = useState<typeof letters[0] | null>(null);
  const [flipped, setFlipped] = useState<string | null>(null);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [speaking, setSpeaking] = useState(false);
  const [activeWord, setActiveWord] = useState<string | null>(null);
  const particleId = useRef(0);
  const animRef = useRef<number | null>(null);

  const spawnConfetti = (x: number, y: number, color: string) => {
    const newParticles: Particle[] = Array.from({ length: 18 }, (_, i) => ({
      id: particleId.current++,
      x,
      y,
      color,
      angle: (i / 18) * Math.PI * 2,
      speed: 3 + Math.random() * 5,
      size: 6 + Math.random() * 8,
      life: 1,
    }));
    setParticles(prev => [...prev, ...newParticles]);
    setTimeout(() => {
      setParticles(prev => prev.filter(p => !newParticles.find(n => n.id === p.id)));
    }, 900);
  };

  const speak = (text: string, onEnd?: () => void) => {
    window.speechSynthesis.cancel();
    const utt = new SpeechSynthesisUtterance(text);
    utt.lang = "kk-KZ";
    utt.rate = 0.75;
    utt.pitch = 1.1;
    if (onEnd) utt.onend = onEnd;
    window.speechSynthesis.speak(utt);
  };

  const handleCard = (item: typeof letters[0], e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    spawnConfetti(cx, cy, item.color);
    setActiveLetter(item);
    setFlipped(item.letter);
    speak(`${item.letter}. ${item.words[0]}`);
  };

  const handleWordClick = (word: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveWord(word);
    setSpeaking(true);
    speak(word, () => setSpeaking(false));
  };

  const closePanel = () => {
    setActiveLetter(null);
    setFlipped(null);
    setActiveWord(null);
  };

  return (
    <div style={{ fontFamily: "'Segoe UI', system-ui, sans-serif", background: "linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #4facfe 100%)", backgroundSize: "400% 400%", animation: "bgShift 12s ease infinite", minHeight: "100vh", padding: "24px 16px", position: "relative", overflow: "hidden" }}>

      <style>{`
        @keyframes bgShift { 0%,100%{background-position:0% 50%} 50%{background-position:100% 50%} }
        @keyframes popIn { 0%{transform:scale(0) rotate(-10deg);opacity:0} 70%{transform:scale(1.1) rotate(2deg)} 100%{transform:scale(1) rotate(0);opacity:1} }
        @keyframes float { 0%,100%{transform:translateY(0px)} 50%{transform:translateY(-8px)} }
        @keyframes shimmer { 0%{opacity:.6} 50%{opacity:1} 100%{opacity:.6} }
        @keyframes slideIn { from{transform:translateX(100%) scale(.9);opacity:0} to{transform:translateX(0) scale(1);opacity:1} }
        @keyframes pulse { 0%,100%{box-shadow:0 0 0 0 rgba(255,255,255,.4)} 50%{box-shadow:0 0 0 12px rgba(255,255,255,0)} }
        @keyframes particleFly { 0%{transform:translate(0,0) scale(1);opacity:1} 100%{transform:translate(var(--dx),var(--dy)) scale(0);opacity:0} }
        @keyframes waveWord { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-4px)} }
        .card-btn { background: white; border-radius: 20px; border: none; cursor: pointer; padding: 0; transition: transform .18s cubic-bezier(.34,1.56,.64,1), box-shadow .18s; display: flex; flex-direction: column; align-items: center; justify-content: center; aspect-ratio: 1; }
        .card-btn:hover { transform: scale(1.08) rotate(-1deg); box-shadow: 0 20px 40px rgba(0,0,0,.25) !important; }
        .card-btn:active { transform: scale(.95); }
        .word-chip { cursor: pointer; border: none; border-radius: 12px; padding: 6px 14px; font-size: 14px; font-weight: 600; transition: all .15s; display: flex; align-items: center; gap: 6px; }
        .word-chip:hover { transform: scale(1.06); filter: brightness(1.1); }
      `}</style>

      {/* Floating bubbles BG */}
      {[...Array(8)].map((_, i) => (
        <div key={i} style={{ position: "fixed", borderRadius: "50%", background: "rgba(255,255,255,.08)", width: 60 + i * 30, height: 60 + i * 30, top: `${10 + i * 11}%`, left: `${5 + i * 12}%`, animation: `float ${3 + i}s ease-in-out infinite`, animationDelay: `${i * .4}s`, pointerEvents: "none" }} />
      ))}

      {/* Confetti Particles */}
      {particles.map(p => (
        <div key={p.id} style={{ position: "fixed", left: p.x, top: p.y, width: p.size, height: p.size, borderRadius: "3px", background: p.color, pointerEvents: "none", zIndex: 9999, "--dx": `${Math.cos(p.angle) * p.speed * 20}px`, "--dy": `${Math.sin(p.angle) * p.speed * 20}px`, animation: "particleFly .9s ease-out forwards" } as any} />
      ))}

      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 32 }}>
        <div style={{ fontSize: 48, marginBottom: 8, animation: "float 3s ease-in-out infinite" }}>🇰🇿</div>
        <h1 style={{ fontSize: "clamp(28px,5vw,48px)", fontWeight: 900, color: "white", margin: 0, textShadow: "0 4px 20px rgba(0,0,0,.3)", letterSpacing: "-1px" }}>
          Қазақ Әліпбиі
        </h1>
        <p style={{ color: "rgba(255,255,255,.85)", marginTop: 8, fontSize: 16, fontWeight: 500 }}>
          Әріпке басыңыз — бұрылып, сөздер шығады! ✨
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 12, flexWrap: "wrap" }}>
          {["🔊 Дыбыс", "📖 10 сөз", "🎉 Конфетти"].map(tag => (
            <span key={tag} style={{ background: "rgba(255,255,255,.2)", color: "white", borderRadius: 20, padding: "4px 14px", fontSize: 13, fontWeight: 600, backdropFilter: "blur(8px)" }}>{tag}</span>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(110px, 1fr))", gap: 14, maxWidth: 900, margin: "0 auto" }}>
        {letters.map((item) => (
          <button
            key={item.letter}
            className="card-btn"
            onClick={(e) => handleCard(item, e)}
            style={{
              boxShadow: flipped === item.letter
                ? `0 0 0 4px ${item.color}, 0 12px 32px rgba(0,0,0,.18)`
                : "0 8px 24px rgba(0,0,0,.15)",
              background: flipped === item.letter
                ? `linear-gradient(135deg, ${item.color}22, white)`
                : "white",
              animation: flipped === item.letter ? "pulse 1.5s ease-in-out infinite" : "none",
            }}
          >
            <div style={{ fontSize: 40, lineHeight: 1 }}>{item.emoji}</div>
            <div style={{ fontSize: 32, fontWeight: 900, color: item.color, lineHeight: 1.1 }}>{item.letter}</div>
            <div style={{ fontSize: 11, color: "#888", fontWeight: 600, marginTop: 2 }}>{item.words[0]}</div>
            <div style={{ fontSize: 13, animation: "shimmer 2s ease-in-out infinite", color: item.color }}>🔊</div>
          </button>
        ))}
      </div>

      {/* Side Panel */}
      {activeLetter && (
        <div
          onClick={closePanel}
          style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,.45)", zIndex: 100, display: "flex", alignItems: "flex-end", justifyContent: "center" }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{ background: "white", borderRadius: "28px 28px 0 0", padding: "28px 24px 40px", width: "100%", maxWidth: 520, animation: "slideIn .35s cubic-bezier(.34,1.56,.64,1)", maxHeight: "80vh", overflowY: "auto" }}
          >
            {/* Panel Header */}
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20 }}>
              <div style={{ width: 72, height: 72, borderRadius: 18, background: `linear-gradient(135deg, ${activeLetter.color}, ${activeLetter.color}99)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 52, fontWeight: 900, color: "white", flexShrink: 0, boxShadow: `0 8px 24px ${activeLetter.color}55` }}>
                {activeLetter.letter}
              </div>
              <div>
                <div style={{ fontSize: 36, lineHeight: 1 }}>{activeLetter.emoji}</div>
                <div style={{ fontWeight: 800, fontSize: 22, color: "#1a1a2e" }}>{activeLetter.words[0]}</div>
                <div style={{ fontSize: 13, color: "#888", marginTop: 2 }}>10 сөз үлгісі</div>
              </div>
              <button onClick={closePanel} style={{ marginLeft: "auto", background: "#f0f0f0", border: "none", borderRadius: "50%", width: 36, height: 36, fontSize: 18, cursor: "pointer", flexShrink: 0 }}>✕</button>
            </div>

            {/* Word chips */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              {activeLetter.words.map((word, i) => (
                <button
                  key={word}
                  className="word-chip"
                  onClick={(e) => handleWordClick(word, e)}
                  style={{
                    background: activeWord === word ? activeLetter.color : `${activeLetter.color}18`,
                    color: activeWord === word ? "white" : activeLetter.color,
                    animation: activeWord === word ? `waveWord .5s ease-in-out ${i * .05}s infinite` : "none",
                    boxShadow: activeWord === word ? `0 4px 14px ${activeLetter.color}55` : "none",
                  }}
                >
                  {speaking && activeWord === word ? "🔉" : "🔊"} {word}
                </button>
              ))}
            </div>

            {/* Speak all */}
            <button
              onClick={() => {
                const text = activeLetter.words.join(". ");
                setSpeaking(true);
                speak(`${activeLetter.letter}. ${text}`, () => setSpeaking(false));
              }}
              style={{ marginTop: 20, width: "100%", padding: "14px", borderRadius: 16, border: "none", background: `linear-gradient(135deg, ${activeLetter.color}, ${activeLetter.color}bb)`, color: "white", fontWeight: 800, fontSize: 16, cursor: "pointer", boxShadow: `0 6px 20px ${activeLetter.color}44`, transition: "transform .15s", display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}
              onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.02)")}
              onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
            >
              {speaking ? "⏸️ Дыбысталуда..." : "▶️ Барлығын тыңдау"}
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <div style={{ textAlign: "center", marginTop: 40, color: "rgba(255,255,255,.7)", fontSize: 14 }}>
        <div style={{ fontSize: 24, marginBottom: 4 }}>✨</div>
        Қазақ әліпбиі — 42 әріп • Әр әріпте 10 сөз үлгісі
      </div>
    </div>
  );
}