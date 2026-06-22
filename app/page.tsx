import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-200 text-slate-900">

      {/* HERO */}
      <section className="flex flex-col lg:flex-row items-center justify-between px-10 lg:px-16 py-16">

        <div className="max-w-2xl">

          <h1 className="text-5xl lg:text-7xl font-bold text-blue-900 leading-tight">
            QAZMURA:
            <br />
            Тіл, Дәстүр,
            <br />
            Бәрі Бір Платформада
          </h1>

          <p className="mt-6 text-xl text-gray-700">
            Қазақ тілін толыққанды, интерактивті түрде үйреніңіз:
            грамматика, AI мұғалім, мәдениет және ертегілер әлемі.
          </p>

          <div className="mt-8 flex gap-4">

            {/* "ҮЙРЕНУДІ БАСТАУ" түймесін осылай өзгертіңіз */}
<Link href="/register"> {/* '/learn/alphabet' орнына '/register' немесе өзіңіздің бетіңіздің атын жазыңыз */}
  <button className="bg-blue-900 text-white px-8 py-4 rounded-2xl hover:bg-blue-800 transition">
    ҮЙРЕНУДІ БАСТАУ
  </button>
</Link>
            <Link href="/ai">
  <button
    className="
      border
      border-slate-300
      bg-white
      text-slate-900
      px-8
      py-4
      rounded-2xl
      hover:bg-slate-100
      hover:shadow-lg
      transition-all
      duration-300
    "
  >
    AI МҰҒАЛІМ
  </button>
</Link>

          </div>

        </div>

        <div className="mt-10 lg:mt-0">
          <div className="w-[500px] h-[350px] bg-white rounded-3xl shadow-lg flex items-center justify-center">
            <img
              src="/Qazmura.jpg"
              alt="QAZMURA"
              className="w-full h-full object-contain"
            />
          </div>
        </div>

      </section>

      {/* FEATURES */}
      <section className="px-10 lg:px-16 pb-20">

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

          <div
  className="
    bg-white
    p-6
    rounded-3xl
    shadow-md
    border
    border-slate-200
    hover:shadow-2xl
    hover:-translate-y-2
    transition-all
    duration-300
  "
>
            <h3 className="font-bold text-xl mb-3 text-slate-900">
              📘 Толық оқу бағдарламасы
            </h3>
            <p className="text-slate-700">
              Әліпби, грамматика, сөздік қор және оқылым.
            </p>
          </div>

          <div
  className="
    bg-white
    p-6
    rounded-3xl
    shadow-md
    border
    border-slate-200
    hover:shadow-2xl
    hover:-translate-y-2
    transition-all
    duration-300
  "
>
            <h3 className="font-bold text-xl mb-3 text-slate-900">
              📖 Интерактивті ертегілер
            </h3>
            <p className="text-slate-700">
              Оқушы ертегі кейіпкеріне айналады.
            </p>
          </div>

          <div
  className="
    bg-white
    p-6
    rounded-3xl
    shadow-md
    border
    border-slate-200
    hover:shadow-2xl
    hover:-translate-y-2
    transition-all
    duration-300
  "
>
            <h3 className="font-bold text-xl mb-3 text-slate-900">
              🏹 Мәдени модульдер
            </h3>
            <p className="text-slate-700">
              Батырлар, дәстүрлер және карта.
            </p>
          </div>

          <div
  className="
    bg-white
    p-6
    rounded-3xl
    shadow-md
    border
    border-slate-200
    hover:shadow-2xl
    hover:-translate-y-2
    transition-all
    duration-300
  "
>
            <h3 className="font-bold text-xl mb-3 text-slate-900">
              🤖 AI Мұғалім
            </h3>
            <p className="text-slate-700">
              Claude AI арқылы қазақ тілін үйрену.
            </p>
          </div>

        </div>

      </section>

      {/* ABOUT */}
      <section className="bg-white py-20">

        <div className="max-w-6xl mx-auto px-10">

          <h2 className="text-5xl font-bold text-center text-blue-900 mb-10">
            QAZMURA туралы
          </h2>

          <p className="text-center text-xl text-slate-800 leading-loose">
            QAZMURA — «мұра» сөзінен алынған.
            Мұра — ата-бабадан қалған байлық:
            тіл, дәстүр және мәдениет.

            <br />
            <br />

            Платформа қазақ, орыс және ағылшын тілдерінде
            қазақ тілін интерактивті түрде үйренуге мүмкіндік береді.
          </p>

        </div>

      </section>

      {/* LEARNING */}
      <section className="py-20">

        <div className="max-w-7xl mx-auto px-10">

          <h2 className="text-5xl font-bold text-center text-blue-900 mb-14">
            📚 Негізгі оқу модульдері
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

            <div
  className="
    bg-white
    p-6
    rounded-3xl
    shadow-md
    border
    border-slate-200
    hover:shadow-2xl
    hover:-translate-y-2
    transition-all
    duration-300
  "
>
              🔤 Әліпби және фонетика
            </div>

           <div
  className="
    bg-white
    p-6
    rounded-3xl
    shadow-md
    border
    border-slate-200
    hover:shadow-2xl
    hover:-translate-y-2
    transition-all
    duration-300
  "
>
              ✍️ Толық грамматика
            </div>

            <div
  className="
    bg-white
    p-6
    rounded-3xl
    shadow-md
    border
    border-slate-200
    hover:shadow-2xl
    hover:-translate-y-2
    transition-all
    duration-300
  "
>
              📖 Сөздік қор
            </div>

            <div
  className="
    bg-white
    p-6
    rounded-3xl
    shadow-md
    border
    border-slate-200
    hover:shadow-2xl
    hover:-translate-y-2
    transition-all
    duration-300
  "
>
              📝 Оқылым және жазылым
            </div>

          </div>

        </div>

      </section>

      {/* CULTURE */}
      <section className="bg-white py-20">

        <div className="max-w-7xl mx-auto px-10">

          <h2 className="text-5xl font-bold text-center text-blue-900 mb-14">
            🏹 Мәдени модульдер
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

            <div
  className="
    bg-white
    p-8
    rounded-3xl
    shadow-md
    border
    border-slate-200
    hover:shadow-xl
    hover:-translate-y-1
    transition-all
    font-semibold
    text-lg
    text-slate-900
  "
>
              📖 Қазақ ертегілері
            </div>

            <div
  className="
    bg-white
    p-8
    rounded-3xl
    shadow-md
    border
    border-slate-200
    hover:shadow-xl
    hover:-translate-y-1
    transition-all
    font-semibold
    text-lg
    text-slate-900
  "
>
              ⚔️ Батырлар тарихы
            </div>

            <div
  className="
    bg-white
    p-8
    rounded-3xl
    shadow-md
    border
    border-slate-200
    hover:shadow-xl
    hover:-translate-y-1
    transition-all
    font-semibold
    text-lg
    text-slate-900
  "
>
              🎉 Салт-дәстүрлер
            </div>

            <div
  className="
    bg-white
    p-8
    rounded-3xl
    shadow-md
    border
    border-slate-200
    hover:shadow-xl
    hover:-translate-y-1
    transition-all
    font-semibold
    text-lg
    text-slate-900
  "
>
              🗺️ Қазақстан картасы
            </div>

          </div>

        </div>

      </section>

      {/* AI */}
      <section className="py-20">

        <div className="max-w-6xl mx-auto px-10">

          <h2 className="text-5xl font-bold text-center text-blue-900 mb-14">
            🤖 AI Мұғалім
          </h2>

          <div className="bg-white rounded-3xl shadow-xl p-10">

            <ul className="space-y-4 text-xl">

              <li>✅ Claude AI мұғалімі</li>

              <li>✅ Жазылым тексеруші</li>

              <li>✅ Ертегі генераторы</li>

              <li>✅ Автоматты тест жасаушы</li>

              <li>✅ Сөйлеу тренажері</li>

            </ul>

          </div>

        </div>

      </section>

      {/* PRICING */}
      <section className="bg-white py-20">

        <div className="max-w-7xl mx-auto px-10">

          <h2 className="text-5xl font-bold text-center text-blue-900 mb-16">
            💎 Тарифтер
          </h2>

          <div className="grid lg:grid-cols-3 gap-8">

            <div className="bg-gradient-to-br from-yellow-400 to-orange-500 text-white rounded-3xl p-8 shadow-2xl scale-105">

              <h3 className="text-3xl font-bold">FREE</h3>

              <p className="text-5xl font-bold mt-4">
                0 ₸
              </p>

              <ul className="mt-8 space-y-3">
                <li>✓ Әліпби</li>
                <li>✓ Сөздік қор</li>
                <li>✓ Тесттер</li>
              </ul>

            </div>

            <div className="bg-blue-900 text-white rounded-3xl p-8 shadow-xl">

              <h3 className="text-3xl font-bold">
                PLUS
              </h3>

              <p className="text-5xl font-bold mt-4">
                1990 ₸
              </p>

              <ul className="mt-8 space-y-3">
                <li>✓ AI Мұғалім</li>
                <li>✓ Толық грамматика</li>
                <li>✓ AI Тест</li>
              </ul>

            </div>

            <div className="bg-gradient-to-br from-yellow-400 to-orange-500 text-white rounded-3xl p-8 shadow-2xl scale-105">

              <h3 className="text-3xl font-bold">
                PRO
              </h3>

              <p className="text-5xl font-bold mt-4">
                3990 ₸
              </p>

              <ul className="mt-8 space-y-3">
                <li>✓ Барлық функциялар</li>
                <li>✓ Турнирлер</li>
                <li>✓ Мұғалім панелі</li>
                <li>✓ Ата-ана кабинеті</li>
              </ul>

            </div>

          </div>

        </div>

      </section>

      {/* TEACHER PANEL */}
      <section className="py-20">

        <div className="max-w-6xl mx-auto px-10">

          <h2 className="text-5xl font-bold text-center text-blue-900 mb-14">
            👨‍🏫 Мұғалім және ата-ана панелі
          </h2>

          <div className="grid md:grid-cols-2 gap-8">

            <div className="bg-white p-8 rounded-3xl shadow">
              Мұғалім оқушының прогресін,
              XP және тапсырмаларын бақылай алады.
            </div>

            <div className="bg-white p-8 rounded-3xl shadow">
              Ата-ана баласының белсенділігін
              телефоннан көре алады.
            </div>

          </div>

        </div>

      </section>

      {/* FOOTER */}
      <footer className="bg-slate-950 text-white py-12">

        <div className="max-w-7xl mx-auto px-10 text-center">

          <h3 className="text-3xl font-bold">
            QAZMURA
          </h3>

          <p className="mt-4">
            Қазақ тілін үйренуге арналған интерактивті веб-платформа
          </p>

          <p className="mt-2 text-sm opacity-80">
            © 2026 QAZMURA. Барлық құқықтар қорғалған.
          </p>

        </div>

      </footer>

    </div>
  );
}