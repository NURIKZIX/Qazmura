"use client";

import { useState, useMemo } from "react";
// Firebase интеграциясы үшін (қажет болғанда комментарийді ашыңыз)
// import { doc, updateDoc, increment } from "firebase/firestore";
// import { auth, db } from "@/lib/firebase";

interface WordItem {
  kz: string;
  ru: string;
  en: string;
}

interface CategoriesData {
  [key: string]: WordItem[];
}

// 10 категория бойынша барлық сөздер базасы
const vocabularyData: CategoriesData = {
  "Отбасы": [
    { kz: "Ана", ru: "Мама", en: "Mother" },
    { kz: "Әке", ru: "Папа", en: "Father" },
    { kz: "Аға", ru: "Старший брат", en: "Older brother" },
    { kz: "Іні", ru: "Младший брат", en: "Younger brother" },
    { kz: "Қарындас", ru: "Младшая сестра (для брата)", en: "Younger sister (for brother)" },
    { kz: "Сіңлі", ru: "Младшая сестра (для сестры)", en: "Younger sister (for sister)" },
    { kz: "Әже", ru: "Бабушка", en: "Grandmother" },
    { kz: "Ата", ru: "Дедушка", en: "Grandfather" },
    { kz: "Бала", ru: "Ребенок", en: "Child" },
    { kz: "Ұл", ru: "Сын / Мальчик", en: "Son / Boy" },
    { kz: "Қыз", ru: "Дочь / Девочка", en: "Daughter / Girl" },
    { kz: "Отбасы", ru: "Семья", en: "Family" },
    { kz: "Жиен", ru: "Племянник (со стороны сестры)", en: "Nephew / Niece" },
    { kz: "Күйеу", ru: "Муж", en: "Husband" },
    { kz: "Келин", ru: "Невестка / Сноха", en: "Daughter-in-law" },
    { kz: "Нағашы", ru: "Родственник по линии матери", en: "Maternal relative" },
    { kz: "Туыс", ru: "Родственник", en: "Relative" },
    { kz: "Ағайын", ru: "Родня / Братья", en: "Kin / Relatives" },
    { kz: "Немере", ru: "Внук / Внучка", en: "Grandchild" },
    { kz: "Шөбере", ru: "Правнук / Правнучка", en: "Great-grandchild" }
  ],
  "Мектеп": [
    { kz: "Мектеп", ru: "Школа", en: "School" },
    { kz: "Мұғалім", ru: "Учитель", en: "Teacher" },
    { kz: "Оқушы", ru: "Ученик", en: "Student" },
    { kz: "Сабақ", ru: "Урок", en: "Lesson" },
    { kz: "Кітап", ru: "Книга", en: "Book" },
    { kz: "Дәптер", ru: "Тетрадь", en: "Notebook" },
    { kz: "Қалам", ru: "Ручка", en: "Pen" },
    { kz: "Өшіргіш", ru: "Ластик", en: "Eraser" },
    { kz: "Сынып", ru: "Класс", en: "Classroom" },
    { kz: "Тақта", ru: "Доска", en: "Board" },
    { kz: "Білім", ru: "Знание", en: "Knowledge" },
    { kz: "Баға", ru: "Оценка", en: "Grade" },
    { kz: "Тест", ru: "Тест", en: "Test" },
    { kz: "Емтихан", ru: "Экзамен", en: "Exam" },
    { kz: "Парта", ru: "Парта", en: "Desk" },
    { kz: "Қоңырау", ru: "Звонок", en: "Bell" },
    { kz: "Сөмке", ru: "Сумка / Рюкзак", en: "Bag / Backpack" },
    { kz: "Күнделік", ru: "Дневник", en: "Diary" },
    { kz: "Пән", ru: "Предмет", en: "Subject" },
    { kz: "Университет", ru: "Университет", en: "University" }
  ],
  "Мамандықтар": [
    { kz: "Дәрігер", ru: "Врач", en: "Doctor" },
    { kz: "Мұғалім", ru: "Учитель", en: "Teacher" },
    { kz: "Бағдарламашы", ru: "Программист", en: "Programmer" },
    { kz: "Инженер", ru: "Инженер", en: "Engineer" },
    { kz: "Заңгер", ru: "Юрист", en: "Lawyer" },
    { kz: "Жүргізуші", ru: "Водитель", en: "Driver" },
    { kz: "Аспаз", ru: "Повар", en: "Chef" },
    { kz: "Полицей", ru: "Полицейский", en: "Policeman" },
    { kz: "Әскери", ru: "Военный", en: "Military officer" },
    { kz: "Кәсіпкер", ru: "Предприниматель", en: "Entrepreneur" },
    { kz: "Дизайнер", ru: "Дизайнер", en: "Designer" },
    { kz: "Құрылысшы", ru: "Строитель", en: "Builder" },
    { kz: "Фермер", ru: "Фермер", en: "Farmer" },
    { kz: "Сатушы", ru: "Продавец", en: "Seller" },
    { kz: "Бухгалтер", ru: "Бухгалтер", en: "Accountant" },
    { kz: "Журналист", ru: "Журналист", en: "Journalist" },
    { kz: "Ғалым", ru: "Ученый", en: "Scientist" },
    { kz: "Әнші", ru: "Певец / Певица", en: "Singer" },
    { kz: "Спортшы", ru: "Спортсмен", en: "Athlete" },
    { kz: "Механик", ru: "Механик", en: "Mechanic" }
  ],
  "Жемістер": [
    { kz: "Алма", ru: "Яблоко", en: "Apple" },
    { kz: "Алмұрт", ru: "Груша", en: "Pear" },
    { kz: "Өрік", ru: "Абрикос", en: "Apricot" },
    { kz: "Шие", ru: "Вишня", en: "Cherry" },
    { kz: "Шабдалы", ru: "Персик", en: "Peach" },
    { kz: "Жүзім", ru: "Виноград", en: "Grape" },
    { kz: "Қарбыз", ru: "Арбуз", en: "Watermelon" },
    { kz: "Қауын", ru: "Дыня", en: "Melon" },
    { kz: "Анар", ru: "Гранат", en: "Pomegranate" },
    { kz: "Банан", ru: "Банан", en: "Banana" },
    { kz: "Апельсин", ru: "Апельсин", en: "Orange" },
    { kz: "Лимон", ru: "Лимон", en: "Lemon" },
    { kz: "Құлпынай", ru: "Клубника", en: "Strawberry" },
    { kz: "Таңқурай", ru: "Малина", en: "Raspberry" },
    { kz: "Көкжидек", ru: "Черника", en: "Blueberry" },
    { kz: "Мандарин", ru: "Мандарин", en: "Mandarin" },
    { kz: "Киви", ru: "Киви", en: "Kiwi" },
    { kz: "Манго", ru: "Манго", en: "Mango" },
    { kz: "Ананас", ru: "Ананас", en: "Pineapple" },
    { kz: "Қарақат", ru: "Смородина", en: "Currant" }
  ],
  "Көкөністер": [
    { kz: "Картоп", ru: "Картофель", en: "Potato" },
    { kz: "Сәбіз", ru: "Морковь", en: "Carrot" },
    { kz: "Пияз", ru: "Лук", en: "Onion" },
    { kz: "Қызанақ", ru: "Помидор", en: "Tomato" },
    { kz: "Қияр", ru: "Огурец", en: "Cucumber" },
    { kz: "Қырыққабат", ru: "Капуста", en: "Cabbage" },
    { kz: "Бұрыш", ru: "Перец", en: "Pepper" },
    { kz: "Баклажан", ru: "Баклажан", en: "Eggplant" },
    { kz: "Асқабақ", ru: "Тыква", en: "Pumpkin" },
    { kz: "Сарымсақ", ru: "Чеснок", en: "Garlic" },
    { kz: "Шалқан", ru: "Репа", en: "Turnip" },
    { kz: "Жүгері", ru: "Кукуруза", en: "Corn" },
    { kz: "Қызылша", ru: "Свекла", en: "Beetroot" },
    { kz: "Жасымық", ru: "Чечевица", en: "Lentils" },
    { kz: "Асбұршақ", ru: "Горох", en: "Peas" },
    { kz: "Бұршақ", ru: "Фасоль", en: "Beans" },
    { kz: "Балдыркөк", ru: "Сельдерей", en: "Celery" },
    { kz: "Шпинат", ru: "Шпинат", en: "Spinach" },
    { kz: "Аскөк", ru: "Укроп", en: "Dill" },
    { kz: "Ақжелкен", ru: "Петрушка", en: "Parsley" }
  ],
  "Жануарлар": [
    { kz: "Жылқы", ru: "Лошадь", en: "Horse" },
    { kz: "Түйе", ru: "Верблюд", en: "Camel" },
    { kz: "Қой", ru: "Овца", en: "Sheep" },
    { kz: "Ешкі", ru: "Коза", en: "Goat" },
    { kz: "Сиыр", ru: "Корова", en: "Cow" },
    { kz: "Бұқа", ru: "Бык", en: "Bull" },
    { kz: "Қасқыр", ru: "Волк", en: "Wolf" },
    { kz: "Түлкі", ru: "Лиса", en: "Fox" },
    { kz: "Аю", ru: "Медведь", en: "Bear" },
    { kz: "Қоян", ru: "Заяц", en: "Rabbit" },
    { kz: "Мысық", ru: "Кошка", en: "Cat" },
    { kz: "Ит", ru: "Собака", en: "Dog" },
    { kz: "Жолбарыс", ru: "Тигр", en: "Tiger" },
    { kz: "Арыстан", ru: "Лев", en: "Lion" },
    { kz: "Піл", ru: "Слон", en: "Elephant" },
    { kz: "Керік", ru: "Жираф", en: "Giraffe" },
    { kz: "Маймыл", ru: "Обезьяна", en: "Monkey" },
    { kz: "Бұғы", ru: "Олень", en: "Deer" },
    { kz: "Қабан", ru: "Кабан", en: "Boar" },
    { kz: "Кірпі", ru: "Еж", en: "Hedgehog" },
    { kz: "Бүркіт", ru: "Беркут / Орел", en: "Eagle" },
    { kz: "Қарлығаш", ru: "Ласточка", en: "Swallow" },
    { kz: "Торғай", ru: "Воробей", en: "Sparrow" },
    { kz: "Үкі", ru: "Сова", en: "Owl" },
    { kz: "Қаз", ru: "Гусь", en: "Goose" },
    { kz: "Үйрек", ru: "Утка", en: "Duck" },
    { kz: "Тауық", ru: "Курица", en: "Chicken" },
    { kz: "Балық", ru: "Рыба", en: "Fish" },
    { kz: "Дельфин", ru: "Дельфин", en: "Dolphin" },
    { kz: "Кит", ru: "Кит", en: "Whale" }
  ],
  "Табиғат": [
    { kz: "Тау", ru: "Гора", en: "Mountain" },
    { kz: "Өзен", ru: "Река", en: "River" },
    { kz: "Көл", ru: "Озеро", en: "Lake" },
    { kz: "Теңіз", ru: "Море", en: "Sea" },
    { kz: "Орман", ru: "Лес", en: "Forest" },
    { kz: "Дала", ru: "Степь / Поле", en: "Steppe / Field" },
    { kz: "Аспан", ru: "Небо", en: "Sky" },
    { kz: "Бұлт", ru: "Облако", en: "Cloud" },
    { kz: "Жаңбыр", ru: "Дождь", en: "Rain" },
    { kz: "Қар", ru: "Снег", en: "Snow" },
    { kz: "Боран", ru: "Буран / Метель", en: "Blizzard" },
    { kz: "Жел", ru: "Ветер", en: "Wind" },
    { kz: "Күн", ru: "Солнце / День", en: "Sun / Day" },
    { kz: "Ай", ru: "Луна / Месяц", en: "Moon / Month" },
    { kz: "Жұлдыз", ru: "Звезда", en: "Star" },
    { kz: "Тас", ru: "Камень", en: "Stone" },
    { kz: "Құм", ru: "Песок", en: "Sand" },
    { kz: "Гүл", ru: "Цветок", en: "Flower" },
    { kz: "Ағаш", ru: "Дерево", en: "Tree" },
    { kz: "Жапырақ", ru: "Лист", en: "Leaf" }
  ],
  "Қала": [
    { kz: "Қала", ru: "Город", en: "City" },
    { kz: "Көше", ru: "Улица", en: "Street" },
    { kz: "Үй", ru: "Дом", en: "House" },
    { kz: "Дүкен", ru: "Магазин", en: "Shop" },
    { kz: "Мектеп", ru: "Школа", en: "School" },
    { kz: "Аурухана", ru: "Больница", en: "Hospital" },
    { kz: "Саябақ", ru: "Парк", en: "Park" },
    { kz: "Банк", ru: "Банк", en: "Bank" },
    { kz: "Мейрамхана", ru: "Ресторан", en: "Restaurant" },
    { kz: "Көпір", ru: "Мост", en: "Bridge" },
    { kz: "Автобус", ru: "Автобус", en: "Bus" },
    { kz: "Бекет", ru: "Станция / Вокзал", en: "Station" },
    { kz: "Әуежай", ru: "Аэропорт", en: "Airport" },
    { kz: "Теміржол", ru: "Железная дорога", en: "Railway" },
    { kz: "Көлік", ru: "Транспорт / Машина", en: "Car / Vehicle" },
    { kz: "Бағдаршам", ru: "Светофор", en: "Traffic light" },
    { kz: "Жол", ru: "Дорога", en: "Road" },
    { kz: "Алаң", ru: "Площадь", en: "Square" },
    { kz: "Мұражай", ru: "Музей", en: "Museum" },
    { kz: "Кітапхана", ru: "Библиотека", en: "Library" }
  ],
  "Киім": [
    { kz: "Көйлек", ru: "Платье / Рубашка", en: "Dress / Shirt" },
    { kz: "Шалбар", ru: "Брюки / Штаны", en: "Trousers / Pants" },
    { kz: "Күрте", ru: "Куртка", en: "Jacket" },
    { kz: "Пальто", ru: "Пальто", en: "Coat" },
    { kz: "Баскиім", ru: "Головной убор", en: "Hat / Cap" },
    { kz: "Қолғап", ru: "Перчатки / Варежки", en: "Gloves" },
    { kz: "Шұлық", ru: "Носки", en: "Socks" },
    { kz: "Аяқкиім", ru: "Обувь", en: "Shoes" },
    { kz: "Етік", ru: "Сапоги", en: "Boots" },
    { kz: "Кроссовка", ru: "Кроссовки", en: "Sneakers" },
    { kz: "Белдік", ru: "Ремень / Пояс", en: "Belt" },
    { kz: "Орамал", ru: "Платок", en: "Scarf / Shawl" },
    { kz: "Жейде", ru: "Рубашка", en: "Shirt" },
    { kz: "Футболка", ru: "Футболка", en: "T-shirt" },
    { kz: "Костюм", ru: "Костюм", en: "Suit" },
    { kz: "Жемпір", ru: "Свитер", en: "Sweater" },
    { kz: "Тон", ru: "Шуба", en: "Fur coat" },
    { kz: "Камзол", ru: "Камзол", en: "Camisole" },
    { kz: "Шапан", ru: "Шапан (халат)", en: "Shapan" },
    { kz: "Тымақ", ru: "Тымак (шапка)", en: "Tymak" }
  ],
  "Тағамдар": [
    { kz: "Ет", ru: "Мясо", en: "Meat" },
    { kz: "Бауырсақ", ru: "Баурсак", en: "Baursak" },
    { kz: "Қымыз", ru: "Кумыс", en: "Koumiss" },
    { kz: "Шұбат", ru: "Шубат", en: "Shubat" },
    { kz: "Айран", ru: "Кефир / Айран", en: "Ayran / Kefir" },
    { kz: "Сүт", ru: "Молоко", en: "Milk" },
    { kz: "Ірімшік", ru: "Творог / Сыр", en: "Cottage cheese" },
    { kz: "Қаймақ", ru: "Сметана", en: "Sour cream" },
    { kz: "Құрт", ru: "Курт", en: "Kurt" },
    { kz: "Нан", ru: "Хлеб", en: "Bread" },
    { kz: "Кеспе", ru: "Лапша", en: "Noodles" },
    { kz: "Палау", ru: "Плов", en: "Pilaf" },
    { kz: "Сорпа", ru: "Суп / Бульон", en: "Soup" },
    { kz: "Манты", ru: "Манты", en: "Manti" },
    { kz: "Самса", ru: "Самса", en: "Samsa" },
    { kz: "Шай", ru: "Чай", en: "Tea" },
    { kz: "Бал", ru: "Мед", en: "Honey" },
    { kz: "Жұмыртқа", ru: "Яйцо", en: "Egg" },
    { kz: "Балық", ru: "Рыба", en: "Fish" },
    { kz: "Көкөніс", ru: "Овощ", en: "Vegetable" },
    { kz: "Жеміс", ru: "Фрукт", en: "Fruit" },
    { kz: "Торт", ru: "Торт", en: "Cake" },
    { kz: "Печенье", ru: "Печенье", en: "Biscuit" },
    { kz: "Шоколад", ru: "Шоколад", en: "Chocolate" },
    { kz: "Кәмпит", ru: "Конфета", en: "Candy" },
    { kz: "Шұжық", ru: "Колбаса", en: "Sausage" },
    { kz: "Май", ru: "Масло", en: "Butter" },
    { kz: "Күріш", ru: "Рис", en: "Rice" },
    { kz: "Қарақұмық", ru: "Гречка", en: "Buckwheat" },
    { kz: "Макарон", ru: "Макароны", en: "Macaroni" }
  ]
};

interface QuizQuestion {
  wordKz: string;
  correctAnswer: string;
  options: string[];
}

export default function Vocabulary() {
  const categories = Object.keys(vocabularyData);
  const [selectedCategory, setSelectedCategory] = useState<string>(categories[0]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [openCardIndex, setOpenCardIndex] = useState<number | null>(null);

  // Mode: "learn" немесе "quiz"
  const [mode, setMode] = useState<"learn" | "quiz">("learn");

  // XP & Gamification State
  const [xp, setXp] = useState<number>(0);

  // Quiz State
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuizIndex, setCurrentQuizIndex] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [quizResult, setQuizResult] = useState<"correct" | "wrong" | null>(null);
  const [isQuizFinished, setIsQuizFinished] = useState<boolean>(false);

  // Сөздерді сүзгілеу (Іздеу логикасы)
  const filteredWords = useMemo(() => {
    return vocabularyData[selectedCategory].filter(
      (w) =>
        w.kz.toLowerCase().includes(searchQuery.toLowerCase()) ||
        w.ru.toLowerCase().includes(searchQuery.toLowerCase()) ||
        w.en.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [selectedCategory, searchQuery]);

 
 const speakKazakh = async (text: string) => {
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

    await audio.play();
  } catch (error) {
    console.error("TTS Error:", error);
  }
};

  // Викторинаны генерациялау (Қате жауап нұсқаларын араластыру)
  const startQuiz = () => {
    const currentCategoryWords = vocabularyData[selectedCategory];
    
    // Егер категорияда сөз аз болса (теориялық тұрғыдан) қорғаныс
    if (currentCategoryWords.length < 3) return;

    const questions: QuizQuestion[] = currentCategoryWords.map((word) => {
      // Қате нұсқалар үшін басқа сөздердің орысша аудармаларын жинау
      const otherWords = currentCategoryWords.filter((w) => w.kz !== word.kz);
      const shuffledOthers = [...otherWords].sort(() => 0.5 - Math.random());
      
      const wrongOptions = shuffledOthers.slice(0, 2).map((w) => w.ru);
      const allOptions = [...wrongOptions, word.ru].sort(() => 0.5 - Math.random());

      return {
        wordKz: word.kz,
        correctAnswer: word.ru,
        options: allOptions,
      };
    });

    // Викторина сұрақтарын араластырып, 10 сұрақ таңдау
    setQuizQuestions(questions.sort(() => 0.5 - Math.random()).slice(0, 10));
    setCurrentQuizIndex(0);
    setSelectedAnswer(null);
    setQuizResult(null);
    setIsQuizFinished(false);
    setMode("quiz");
  };

  // Жауапты тексеру және Firestore-ға жіберу дайындығы
  const handleAnswerSelection = (option: string) => {
    if (quizResult !== null) return; // Бір рет таңдаған соң бұғаттау

    setSelectedAnswer(option);
    const isCorrect = option === quizQuestions[currentQuizIndex].correctAnswer;

    if (isCorrect) {
      setQuizResult("correct");
      setXp((prev) => prev + 10);
    } else {
      setQuizResult("wrong");
    }
  };

  // Келесі сұраққа өту немесе аяқтау
  const handleNextQuiz = async () => {
    if (currentQuizIndex + 1 < quizQuestions.length) {
      setCurrentQuizIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setQuizResult(null);
    } else {
      setIsQuizFinished(true);
      // FIRESTORE-ҒА ЖАЗУ ЛОГИКАСЫ:
      /*
      try {
        const user = auth.currentUser;
        if (user) {
          const userRef = doc(db, "users", user.uid);
          await updateDoc(userRef, {
            xp: increment(xp),
            vocabularyCompletedCount: increment(1)
          });
        }
      } catch (error) {
        console.error("Firestore-ға сақтау қатесі:", error);
      }
      */
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen text-black font-sans pb-24">
      {/* Жоғарғы Навигация және XP Панелі */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🏛️</span>
            <div>
              <h1 className="text-2xl font-extrabold text-black tracking-tight">QAZMURA</h1>
              <p className="text-xs text-slate-500 font-medium">Сөздік қор модулі</p>
            </div>
          </div>

          <div className="flex items-center gap-4 w-full sm:w-auto justify-end">
            <div className="bg-amber-50 border border-amber-200 px-4 py-2 rounded-2xl flex items-center gap-2 shadow-xs">
              <span className="text-xl">🔥</span>
              <span className="text-md font-bold text-black">{xp} XP</span>
            </div>

            <button
              onClick={() => {
                if (mode === "learn") {
                  startQuiz();
                } else {
                  setMode("learn");
                }
              }}
              className={`px-5 py-2.5 rounded-2xl font-bold text-sm transition-all shadow-md active:scale-98 ${
                mode === "learn"
                  ? "bg-black text-white hover:bg-slate-800"
                  : "bg-rose-500 text-white hover:bg-rose-600"
              }`}
            >
              {mode === "learn" ? "📝 Викторина Бастау" : "📖 Сөздікке Қайту"}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        {mode === "learn" ? (
          <>
            {/* ТАҚЫРЫПТАР (Tabs) */}
            <div className="flex overflow-x-auto pb-3 mb-6 gap-2 no-scrollbar scroll-smooth">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat);
                    setOpenCardIndex(null);
                  }}
                  className={`px-5 py-3 rounded-2xl font-bold text-sm whitespace-nowrap border-2 transition-all ${
                    selectedCategory === cat
                      ? "bg-black border-black text-white shadow-md scale-102"
                      : "bg-white border-slate-200 text-black hover:border-slate-400"
                  }`}
                >
                  {cat} ({vocabularyData[cat].length})
                </button>
              ))}
            </div>

            {/* ІЗДЕУ ЖҮЙЕСІ */}
            <div className="mb-8 relative max-w-md">
              <input
                type="text"
                placeholder={`"${selectedCategory}" ішінен іздеу...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border-2 border-slate-200 p-4 pl-12 rounded-2xl text-md font-medium text-black placeholder-slate-400 focus:outline-none focus:border-black transition-colors shadow-xs"
              />
              <span className="absolute left-4 top-4.5 text-slate-400 text-lg">🔍</span>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-4 text-slate-400 hover:text-black font-bold"
                >
                  ✕
                </button>
              )}
            </div>

            <p className="text-sm font-semibold text-slate-500 mb-4">
              💡 Сөздің аудармасын көру үшін карточканы басыңыз. Дыбыстау үшін 🔊 батырмасын қолданыңыз.
            </p>

            {/* СӨЗДЕР КАРТОЧКАЛАРЫНЫҢ ЖЕЛІСІ (Card Grid) */}
            {filteredWords.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 animate-fade-in">
                {filteredWords.map((word, idx) => {
                  const isOpen = openCardIndex === idx;
                  return (
                    <div
                      key={idx}
                      onClick={() => setOpenCardIndex(isOpen ? null : idx)}
                      className={`bg-white p-5 rounded-2xl border-2 cursor-pointer transition-all duration-200 flex flex-col justify-between min-h-[140px] relative ${
                        isOpen
                          ? "border-black shadow-lg bg-slate-50"
                          : "border-slate-200 hover:border-slate-400 hover:shadow-md hover:-translate-y-0.5"
                      }`}
                    >
                      <div className="flex justify-between items-start gap-2">
                        <p className="text-xl font-extrabold text-black tracking-tight">{word.kz}</p>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            speakKazakh(word.kz);
                          }}
                          className="bg-slate-100 hover:bg-slate-200 text-black p-2.5 rounded-xl text-md transition-colors active:scale-95"
                          title="Дыбыстау"
                        >
                          🔊
                        </button>
                      </div>

                      {/* Аударма бөлімі */}
                      <div className="mt-4 pt-3 border-t border-dashed border-slate-200">
                        {isOpen ? (
                          <div className="space-y-1.5 text-sm font-semibold text-black animate-fade-in">
                            <p className="flex items-center gap-2">
                              <span className="text-xs bg-blue-100 px-1.5 py-0.5 rounded text-blue-800">RU</span> 
                              {word.ru}
                            </p>
                            <p className="flex items-center gap-2">
                              <span className="text-xs bg-emerald-100 px-1.5 py-0.5 rounded text-emerald-800">EN</span> 
                              {word.en}
                            </p>
                          </div>
                        ) : (
                          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                            Аудармасын көру
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-16 bg-white rounded-3xl border-2 border-dashed border-slate-200">
                <span className="text-4xl">🍂</span>
                <p className="mt-3 text-slate-500 font-medium">Сөз табылмады. Басқа сөз енгізіп көріңіз.</p>
              </div>
            )}
          </>
        ) : (
          /* ДУОЛИНГО СТИЛІНДЕГІ QUIZ БӨЛІМІ */
          <div className="max-w-2xl mx-auto bg-white border-2 border-slate-200 rounded-3xl p-6 md:p-10 shadow-xl">
            {!isQuizFinished ? (
              <>
                {/* Викторина Прогресс Бары */}
                <div className="w-full bg-slate-100 rounded-full h-3 mb-6 overflow-hidden border border-slate-200 shadow-inner">
                  <div
                    className="bg-green-500 h-3 rounded-full transition-all duration-300 ease-out"
                    style={{
                      width: `${((currentQuizIndex) / quizQuestions.length) * 100}%`,
                    }}
                  />
                </div>

                <div className="flex justify-between items-center mb-6 text-sm font-bold text-slate-400 uppercase tracking-wider">
                  <span>Тақырып: {selectedCategory}</span>
                  <span>Сұрақ {currentQuizIndex + 1} / {quizQuestions.length}</span>
                </div>

                {/* Сұрақ атауы */}
                <div className="mb-8">
                  <p className="text-slate-500 text-sm font-bold uppercase mb-2">Орысша аудармасын табыңыз:</p>
                  <div className="flex items-center gap-4">
                    <h3 className="text-3xl font-black text-black">
                      &ldquo;{quizQuestions[currentQuizIndex]?.wordKz}&rdquo;
                    </h3>
                    <button
                      onClick={() => speakKazakh(quizQuestions[currentQuizIndex]?.wordKz)}
                      className="bg-slate-100 hover:bg-slate-200 p-2 rounded-xl text-lg"
                    >
                      🔊
                    </button>
                  </div>
                </div>

                {/* Жауап нұсқалары */}
                <div className="space-y-3">
                  {quizQuestions[currentQuizIndex]?.options.map((option, index) => {
                    let btnStyle = "border-slate-200 hover:border-slate-400 bg-white text-black";
                    
                    if (selectedAnswer === option) {
                      if (quizResult === "correct") {
                        btnStyle = "border-green-500 bg-green-50 text-green-900";
                      } else {
                        btnStyle = "border-rose-500 bg-rose-50 text-rose-900";
                      }
                    } else if (quizResult !== null && option === quizQuestions[currentQuizIndex].correctAnswer) {
                      // Пайдаланушы қате жібергенде дұрыс нұсқаны жасылмен көрсету
                      btnStyle = "border-green-500 bg-green-50 text-green-900";
                    }

                    return (
                      <button
                        key={index}
                        disabled={quizResult !== null}
                        onClick={() => handleAnswerSelection(option)}
                        className={`w-full text-left p-5 rounded-2xl text-lg font-bold border-2 transition-all active:scale-99 flex justify-between items-center ${btnStyle}`}
                      >
                        <span>{option}</span>
                        {selectedAnswer === option && (
                          <span>{quizResult === "correct" ? "✅" : "❌"}</span>
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Тексеруден кейінгі Төменгі Хабарлама Панелі */}
                {quizResult !== null && (
                  <div className={`mt-8 p-4 rounded-2xl border-2 flex flex-col sm:flex-row justify-between items-center gap-4 animate-fade-in ${
                    quizResult === "correct" ? "bg-green-50 border-green-200" : "bg-rose-50 border-rose-200"
                  }`}>
                    <div>
                      <p className={`text-lg font-black ${quizResult === "correct" ? "text-green-800" : "text-rose-800"}`}>
                        {quizResult === "correct" ? "Тамаша! +10 XP" : "Қате жауап!"}
                      </p>
                      {quizResult === "wrong" && (
                        <p className="text-sm font-semibold text-slate-700 mt-1">
                          Дұрыс нұсқа: <span className="underline">{quizQuestions[currentQuizIndex].correctAnswer}</span>
                        </p>
                      )}
                    </div>
                    <button
                      onClick={handleNextQuiz}
                      className="w-full sm:w-auto bg-black text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-slate-800 transition-colors shadow-md"
                    >
                      {currentQuizIndex + 1 === quizQuestions.length ? "Нәтижені Көру" : "Келесі Сұрақ ➔"}
                    </button>
                  </div>
                )}
              </>
            ) : (
              /* Викторина Аяқталғандағы Экран */
              <div className="text-center py-6 animate-fade-in">
                <span className="text-6xl block mb-4">🏆</span>
                <h3 className="text-3xl font-black text-black mb-2">Сыннан сүрінбей өттіңіз!</h3>
                <p className="text-slate-500 font-semibold mb-6">
                  &ldquo;{selectedCategory}&rdquo; тақырыбы бойынша тест толық аяқталды.
                </p>

                <div className="bg-slate-50 border-2 border-slate-200 rounded-2xl p-4 max-w-xs mx-auto mb-8">
                  <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">Жалпы прогресс</p>
                  <p className="text-2xl font-black text-black mt-1">Жақсы нәтиже</p>
                </div>

                <button
                  onClick={() => setMode("learn")}
                  className="bg-black text-white px-8 py-3.5 rounded-2xl font-bold text-md hover:bg-slate-800 transition-colors shadow-lg active:scale-98"
                >
                  Сөздік Қорға Қайту
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}