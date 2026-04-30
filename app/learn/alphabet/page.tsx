"use client";

export default function Alphabet() {
  const letters = [
    { letter: "А", word: "Ана" },
    { letter: "Ә", word: "Әке" },
    { letter: "Б", word: "Бала" },
    { letter: "В", word: "Вагон" },
    { letter: "Г", word: "Гүл" },
    { letter: "Ғ", word: "Ғарыш" },
    { letter: "Д", word: "Дос" },
    { letter: "Е", word: "Ел" },
    { letter: "Ё", word: "Ёлка" },
    { letter: "Ж", word: "Жол" },
    { letter: "З", word: "Зат" },
    { letter: "И", word: "Ине" },
    { letter: "Й", word: "Йогурт" },
    { letter: "К", word: "Кітап" },
    { letter: "Қ", word: "Қала" },
    { letter: "Л", word: "Лақ" },
    { letter: "М", word: "Мектеп" },
    { letter: "Н", word: "Нан" },
    { letter: "Ң", word: "Ң" },
    { letter: "О", word: "Отан" },
    { letter: "Ө", word: "Өрік" },
    { letter: "П", word: "Парта" },
    { letter: "Р", word: "Рақмет" },
    { letter: "С", word: "Су" },
    { letter: "Т", word: "Тау" },
    { letter: "У", word: "Уақыт" },
    { letter: "Ұ", word: "Ұл" },
    { letter: "Ү", word: "Үй" },
    { letter: "Ф", word: "Футбол" },
    { letter: "Х", word: "Халық" },
    { letter: "Һ", word: "Һ" },
    { letter: "Ц", word: "Цирк" },
    { letter: "Ч", word: "Чемодан" },
    { letter: "Ш", word: "Шаң" },
    { letter: "Щ", word: "Щётка" },
    { letter: "Ъ", word: "Ъ" },
    { letter: "Ы", word: "Ыдыс" },
    { letter: "І", word: "Іні" },
    { letter: "Ь", word: "Ь" },
    { letter: "Э", word: "Экран" },
    { letter: "Ю", word: "Юрта" },
    { letter: "Я", word: "Яблоко" },
  ];

  const speak = (text: string) => {
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = "kk-KZ"; // қазақша
    speechSynthesis.speak(utter);
  };

  return (
    <div className="bg-gray-100 min-h-screen p-10">
      <h1 className="text-3xl font-bold text-blue-900">Әліпби</h1>

      <div className="grid grid-cols-6 gap-4 mt-6">
        {letters.map((item, i) => (
          <div
            key={i}
            onClick={() => speak(item.letter + " " + item.word)}
            className="bg-white p-6 rounded-xl shadow text-center cursor-pointer hover:scale-105 transition"
          >
            <p className="text-2xl font-bold">{item.letter}</p>
            <p className="text-gray-500 mt-2">{item.word}</p>
          </div>
        ))}
      </div>

      <p className="mt-6 text-gray-500">
        Әріпке басыңыз — дыбысталады 🔊
      </p>
    </div>
  );
}