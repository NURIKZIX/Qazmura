export default function Home() {
  return (
    <div className="bg-gray-100 min-h-screen">

      {/* 🔥 HERO (верхняя часть) */}
      <section className="flex items-center justify-between px-16 py-12">
        
        {/* ЛЕВАЯ */}
        <div className="max-w-xl">
          <h1 className="text-5xl font-bold text-blue-900">
            QAZMURA: Тіл, Дәстүр, Бәрі Бір Платформада
          </h1>

          <p className="mt-4 text-gray-600 text-lg">
            Қазақ тілін толыққанды, интерактивті түрде үйреніңіз:
            грамматика, AI мұғалім және ертегілер әлемі.
          </p>

          <div className="mt-6 flex gap-4">
            <a
              href="/learn"
              className="bg-blue-900 text-white px-6 py-3 rounded-xl hover:opacity-90"
            >
              ҮЙРЕНУДІ БАСТАУ
            </a>

            <a
              href="/ai"
              className="border px-6 py-3 rounded-xl hover:bg-gray-200"
            >
              КІРУ
            </a>
          </div>
        </div>

        {/* ПРАВАЯ */}
        <div className="w-[400px] h-[250px] bg-gray-200 rounded-2xl flex items-center justify-center">
  <img
    src="/logo.png"
    alt="QazMura Logo"
    className="w-full h-full object-contain"
  />
</div>
      </section>

      {/* 💥 КАРТОЧКИ (как на макете) */}
      <section className="px-16 pb-12">
        <div className="grid grid-cols-4 gap-6">

          {/* 1 */}
          <div className="bg-white p-6 rounded-2xl shadow hover:scale-105 transition">
            <h2 className="font-semibold text-lg">
              1. Толық оқу бағдарламасы
            </h2>
            <p className="mt-4 text-4xl">📘</p>
          </div>

          {/* 2 */}
          <div className="bg-white p-6 rounded-2xl shadow hover:scale-105 transition">
            <h2 className="font-semibold text-lg">
              2. Интерактивті ертегілер
            </h2>
            <p className="mt-4 text-4xl">🎬</p>
          </div>

          {/* 3 */}
          <div className="bg-white p-6 rounded-2xl shadow hover:scale-105 transition">
            <h2 className="font-semibold text-lg">
              3. Мәдени модульдер
            </h2>
            <p className="mt-4 text-4xl">🥁</p>
          </div>

          {/* 4 */}
          <div className="bg-white p-6 rounded-2xl shadow hover:scale-105 transition">
            <h2 className="font-semibold text-lg">
              4. AI Мұғалімі
            </h2>
            <p className="mt-4 text-4xl">🤖</p>
          </div>

        </div>
      </section>

    </div>
  );
}