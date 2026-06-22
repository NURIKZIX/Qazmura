"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, Diamond, Zap, Crown, Sparkles } from "lucide-react";

// ─────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────

interface PlanFeature {
  text: string;
}

interface Plan {
  id: string;
  name: string;
  price: string;
  period?: string;
  currency: string;
  description: string;
  features: PlanFeature[];
  cta: string;
  ctaHref: string;
  highlight: boolean; // center "recommended" plan
  icon: React.ReactNode;
  gradient: string;      // card background
  badgeLabel?: string;
}

// ─────────────────────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────────────────────

const PLANS: Plan[] = [
  {
    id: "free",
    name: "FREE",
    price: "0",
    currency: "₸",
    period: undefined,
    description: "Бастаушылар үшін негізгі мүмкіндіктер",
    features: [
      { text: "Әліпби" },
      { text: "Сөздік қор" },
      { text: "Тесттер" },
    ],
    cta: "Тегін бастау",
    ctaHref: "/register",
    highlight: false,
    icon: <Zap className="w-6 h-6" />,
    gradient: "from-[#F5A623] to-[#F7C948]",
  },
  {
    id: "plus",
    name: "PLUS",
    price: "1 990",
    currency: "₸",
    period: "/ ай",
    description: "AI мүмкіндіктерімен толық оқу",
    features: [
      { text: "AI Мұғалім" },
      { text: "Толық грамматика" },
      { text: "AI Тест" },
    ],
    cta: "Plus таңдау",
    ctaHref: "/register?plan=plus",
    highlight: true,
    badgeLabel: "Танымал",
    icon: <Diamond className="w-6 h-6" />,
    gradient: "",              // solid navy — handled separately
  },
  {
    id: "pro",
    name: "PRO",
    price: "3 990",
    currency: "₸",
    period: "/ ай",
    description: "Мұғалімдер мен ата-аналар үшін",
    features: [
      { text: "Барлық функциялар" },
      { text: "Турнирлер" },
      { text: "Мұғалім панелі" },
      { text: "Ата-ана кабинеті" },
    ],
    cta: "Pro таңдау",
    ctaHref: "/register?plan=pro",
    highlight: false,
    icon: <Crown className="w-6 h-6" />,
    gradient: "from-[#F5A623] to-[#F7C948]",
  },
];

// ─────────────────────────────────────────────────────────────
// Plan Card
// ─────────────────────────────────────────────────────────────

function PlanCard({ plan, index }: { plan: Plan; index: number }) {
  const [hovered, setHovered] = useState(false);

  // PLUS card — navy solid
  if (plan.highlight) {
    return (
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={`
          relative flex flex-col rounded-3xl p-8
          bg-[#002B49]
          transition-transform duration-300
          ${hovered ? "-translate-y-2 shadow-2xl shadow-[#002B49]/40" : "shadow-xl shadow-[#002B49]/20"}
          z-10
        `}
        style={{ animationDelay: `${index * 80}ms` }}
      >
        {/* Танымал badge */}
        {plan.badgeLabel && (
          <div className="absolute -top-4 left-1/2 -translate-x-1/2">
            <span className="inline-flex items-center gap-1.5 bg-gradient-to-r from-[#D4AF37] to-[#F7C948] text-[#002B49] text-[11px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg shadow-amber-400/30">
              <Sparkles className="w-3 h-3" />
              {plan.badgeLabel}
            </span>
          </div>
        )}

        {/* Icon */}
        <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center mb-5 text-[#D4AF37]">
          {plan.icon}
        </div>

        {/* Name */}
        <h3 className="text-2xl font-black text-white tracking-widest mb-1">{plan.name}</h3>
        <p className="text-slate-400 text-sm mb-5">{plan.description}</p>

        {/* Price */}
        <div className="flex items-end gap-2 mb-7">
          <span className="text-5xl font-black text-white leading-none">{plan.price}</span>
          <span className="text-3xl font-black text-[#D4AF37] leading-none mb-0.5">{plan.currency}</span>
          {plan.period && <span className="text-slate-400 text-sm mb-1">{plan.period}</span>}
        </div>

        {/* Divider */}
        <div className="h-px bg-white/10 mb-6" />

        {/* Features */}
        <ul className="flex flex-col gap-3 flex-1 mb-8">
          {plan.features.map((f) => (
            <li key={f.text} className="flex items-center gap-3 text-white text-sm font-semibold">
              <span className="w-5 h-5 rounded-full bg-[#D4AF37]/20 flex items-center justify-center shrink-0">
                <Check className="w-3 h-3 text-[#D4AF37]" strokeWidth={3} />
              </span>
              {f.text}
            </li>
          ))}
        </ul>

        {/* CTA */}
        <Link href={plan.ctaHref}>
          <button className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#D4AF37] to-[#F7C948] text-[#002B49] text-sm font-black tracking-wide shadow-lg shadow-amber-400/30 hover:opacity-95 active:scale-[0.98] transition-all">
            {plan.cta}
          </button>
        </Link>
      </div>
    );
  }

  // FREE & PRO — amber gradient cards
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`
        relative flex flex-col rounded-3xl p-8
        bg-gradient-to-br ${plan.gradient}
        transition-transform duration-300
        ${hovered ? "-translate-y-2 shadow-2xl shadow-amber-400/40" : "shadow-xl shadow-amber-400/20"}
      `}
      style={{ animationDelay: `${index * 80}ms` }}
    >
      {/* Icon */}
      <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center mb-5 text-white">
        {plan.icon}
      </div>

      {/* Name */}
      <h3 className="text-2xl font-black text-white tracking-widest mb-1">{plan.name}</h3>
      <p className="text-white/70 text-sm mb-5">{plan.description}</p>

      {/* Price */}
      <div className="flex items-end gap-2 mb-7">
        <span className="text-5xl font-black text-white leading-none">{plan.price}</span>
        <span className="text-3xl font-black text-white leading-none mb-0.5">{plan.currency}</span>
        {plan.period && <span className="text-white/70 text-sm mb-1">{plan.period}</span>}
      </div>

      {/* Divider */}
      <div className="h-px bg-white/20 mb-6" />

      {/* Features */}
      <ul className="flex flex-col gap-3 flex-1 mb-8">
        {plan.features.map((f) => (
          <li key={f.text} className="flex items-center gap-3 text-white text-sm font-semibold">
            <span className="w-5 h-5 rounded-full bg-white/30 flex items-center justify-center shrink-0">
              <Check className="w-3 h-3 text-white" strokeWidth={3} />
            </span>
            {f.text}
          </li>
        ))}
      </ul>

      {/* CTA */}
      <Link href={plan.ctaHref}>
        <button className="w-full py-3.5 rounded-2xl bg-white text-[#002B49] text-sm font-black tracking-wide shadow-md hover:bg-slate-50 active:scale-[0.98] transition-all">
          {plan.cta}
        </button>
      </Link>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// FAQ Section
// ─────────────────────────────────────────────────────────────

const FAQ_ITEMS = [
  {
    q: "Тегін жоспардан Plus-ке өту оңай ма?",
    a: "Иә, кез келген уақытта жоспарыңызды жаңартуға болады. Ақы ағымдағы кезеңнің қалған күндеріне пропорционалды есептеледі.",
  },
  {
    q: "Төлем қайтарылады ма?",
    a: "Алғашқы 7 күн ішінде толық ақша қайтарылады. Одан кейін пропорционалды қайтарым жасалмайды.",
  },
  {
    q: "Мұғалім панелі нені қамтиды?",
    a: "Pro жоспарындағы мұғалімдер оқушыларының прогресін, тест нәтижелерін және белсенділік статистикасын бақылай алады.",
  },
];

function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="max-w-2xl mx-auto mt-24 px-4">
      <h2 className="text-center text-2xl font-black text-[#002B49] mb-8 tracking-tight">
        Жиі қойылатын сұрақтар
      </h2>
      <div className="flex flex-col gap-3">
        {FAQ_ITEMS.map((item, i) => (
          <div
            key={i}
            className="border border-slate-100 rounded-2xl overflow-hidden shadow-sm"
          >
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full flex items-center justify-between px-5 py-4 text-left text-sm font-bold text-[#002B49] hover:bg-slate-50 transition-colors"
            >
              {item.q}
              <span className={`transition-transform duration-200 text-[#D4AF37] text-xl font-black ${openIndex === i ? "rotate-45" : ""}`}>+</span>
            </button>
            <div className={`transition-all duration-300 overflow-hidden ${openIndex === i ? "max-h-40" : "max-h-0"}`}>
              <p className="px-5 pb-4 text-sm text-slate-600 leading-relaxed">{item.a}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-white">

      {/* ── Hero ── */}
      <section className="pt-16 pb-6 px-4 text-center">
        <div className="inline-flex items-center gap-2 mb-4">
          {/* Diamond icon matching screenshot */}
          <svg
            viewBox="0 0 40 40"
            className="w-10 h-10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <polygon
              points="20,4 36,16 20,36 4,16"
              fill="url(#diamond-grad)"
              opacity="0.9"
            />
            <polygon
              points="20,4 36,16 20,20"
              fill="white"
              opacity="0.25"
            />
            <defs>
              <linearGradient id="diamond-grad" x1="4" y1="4" x2="36" y2="36" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#5BC8F5" />
                <stop offset="100%" stopColor="#2563EB" />
              </linearGradient>
            </defs>
          </svg>
          <h1 className="text-4xl md:text-5xl font-black text-[#002B49] tracking-tight">
            Тарифтер
          </h1>
        </div>
        <p className="text-slate-500 text-base max-w-md mx-auto">
          Өзіңізге сәйкес жоспарды таңдаңыз және қазақ тілін үйрене бастаңыз
        </p>
      </section>

      {/* ── Cards Grid ── */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-5 items-start md:items-stretch">
          {PLANS.map((plan, i) => (
            <PlanCard key={plan.id} plan={plan} index={i} />
          ))}
        </div>
      </section>

      {/* ── Trust strip ── */}
      <section className="max-w-3xl mx-auto px-4 mt-6">
        <div className="flex flex-wrap justify-center gap-8 py-6 border-y border-slate-100">
          {[
            { value: "10 000+", label: "Белсенді оқушы" },
            { value: "4.9 ★", label: "Орташа рейтинг" },
            { value: "7 күн", label: "Ақша қайтарылады" },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col items-center">
              <span className="text-2xl font-black text-[#002B49]">{stat.value}</span>
              <span className="text-xs text-slate-500 font-semibold mt-0.5">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Comparison table ── */}
      <section className="max-w-3xl mx-auto px-4 mt-16">
        <h2 className="text-center text-2xl font-black text-[#002B49] mb-8 tracking-tight">
          Жоспарларды салыстыру
        </h2>
        <div className="overflow-x-auto rounded-2xl border border-slate-100 shadow-sm">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="text-left px-5 py-4 font-black text-[#002B49] w-1/2">Мүмкіндік</th>
                <th className="px-4 py-4 font-black text-slate-500 text-center">FREE</th>
                <th className="px-4 py-4 font-black text-[#002B49] text-center bg-blue-50/50">PLUS</th>
                <th className="px-4 py-4 font-black text-[#D4AF37] text-center">PRO</th>
              </tr>
            </thead>
            <tbody>
              {[
                { feature: "Әліпби сабақтары",        free: true,  plus: true,  pro: true  },
                { feature: "Сөздік қор",               free: true,  plus: true,  pro: true  },
                { feature: "Базалық тесттер",          free: true,  plus: true,  pro: true  },
                { feature: "AI Мұғалім",               free: false, plus: true,  pro: true  },
                { feature: "Толық грамматика",         free: false, plus: true,  pro: true  },
                { feature: "AI Тест генераторы",       free: false, plus: true,  pro: true  },
                { feature: "Турнирлер",                free: false, plus: false, pro: true  },
                { feature: "Мұғалім панелі",           free: false, plus: false, pro: true  },
                { feature: "Ата-ана кабинеті",         free: false, plus: false, pro: true  },
              ].map((row, i) => (
                <tr key={row.feature} className={`border-b border-slate-50 ${i % 2 === 0 ? "" : "bg-slate-50/30"}`}>
                  <td className="px-5 py-3.5 font-semibold text-slate-700">{row.feature}</td>
                  <td className="px-4 py-3.5 text-center">
                    {row.free
                      ? <Check className="w-4 h-4 text-emerald-500 mx-auto" strokeWidth={3} />
                      : <span className="text-slate-300 font-bold">—</span>}
                  </td>
                  <td className="px-4 py-3.5 text-center bg-blue-50/30">
                    {row.plus
                      ? <Check className="w-4 h-4 text-[#002B49] mx-auto" strokeWidth={3} />
                      : <span className="text-slate-300 font-bold">—</span>}
                  </td>
                  <td className="px-4 py-3.5 text-center">
                    {row.pro
                      ? <Check className="w-4 h-4 text-[#D4AF37] mx-auto" strokeWidth={3} />
                      : <span className="text-slate-300 font-bold">—</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── FAQ ── */}
      <FAQSection />

      {/* ── Bottom CTA ── */}
      <section className="mt-20 mb-16 px-4 text-center">
        <div className="max-w-lg mx-auto bg-gradient-to-br from-[#002B49] to-[#004680] rounded-3xl p-10 shadow-2xl shadow-[#002B49]/20">
          <h2 className="text-2xl font-black text-white mb-2 tracking-tight">Бүгін бастаңыз</h2>
          <p className="text-slate-400 text-sm mb-7">Тегін жоспармен тіркелу — бір рет басу жеткілікті</p>
          <Link href="/register">
            <button className="inline-flex items-center gap-2 bg-gradient-to-r from-[#D4AF37] to-[#F7C948] text-[#002B49] px-8 py-3.5 rounded-2xl text-sm font-black shadow-lg shadow-amber-400/30 hover:opacity-95 active:scale-[0.98] transition-all">
              <Sparkles className="w-4 h-4" />
              Тегін тіркелу
            </button>
          </Link>
        </div>
      </section>

    </main>
  );
}