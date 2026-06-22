"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import {
  ChevronDown,
  User,
  LogIn,
  UserPlus,
  Menu,
  X,
  BookOpen,
  Globe,
  Sparkles,
  CreditCard,
  Home,
  AlignLeft,
  BookMarked,
  BookText,
  Map,
  Users,
  Flame,
  Landmark,
  Settings,
  LogOut,
} from "lucide-react";

// ─────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────

interface NavItem {
  name: string;
  href: string;
  icon: React.ReactNode;
  badge?: string;
}

interface NavSection {
  id: string;
  label: string;
  icon: React.ReactNode;
  items: NavItem[];
  matchPaths: string[];
}

// ─────────────────────────────────────────────────────────────
// Navigation Data
// ─────────────────────────────────────────────────────────────

const NAV_SECTIONS: NavSection[] = [
  {
    id: "learn",
    label: "Оқу бөлімі",
    icon: <BookOpen className="w-4 h-4" />,
    matchPaths: ["/learn"],
    items: [
      { name: "Әліпби",      href: "/learn/alphabet",   icon: <AlignLeft className="w-4 h-4" /> },
      { name: "Грамматика",  href: "/learn/grammar",    icon: <BookText  className="w-4 h-4" /> },
      { name: "Сөздік қор", href: "/learn/vocabulary", icon: <BookMarked className="w-4 h-4" />, badge: "Жаңа" },
      { name: "Оқылым",     href: "/learn/reading",    icon: <BookOpen  className="w-4 h-4" /> },
    ],
  },
  {
    id: "culture",
    label: "Мәдениет",
    icon: <Globe className="w-4 h-4" />,
    matchPaths: ["/stories", "/heroes", "/traditions", "/map"],
    items: [
      { name: "Ертегілер",           href: "/stories",    icon: <Flame    className="w-4 h-4" /> },
      { name: "Батырлар",            href: "/heroes",     icon: <Users    className="w-4 h-4" /> },
      { name: "Салт-дәстүрлер",     href: "/traditions", icon: <Landmark className="w-4 h-4" /> },
      { name: "Қазақстан картасы",  href: "/map",        icon: <Map      className="w-4 h-4" /> },
    ],
  },
];

// ─────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────

function useOutsideClick(ref: React.RefObject<HTMLElement | null>, handler: () => void) {
  useEffect(() => {
    const listener = (e: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(e.target as Node)) return;
      handler();
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
}

// ─────────────────────────────────────────────────────────────
// Sub-components
// ─────────────────────────────────────────────────────────────

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2.5 group shrink-0">
      {/* Emblem */}
      <div className="relative w-9 h-9">
        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-[#D4AF37] to-[#b8912a] shadow-lg shadow-amber-400/30 transition-all duration-300 group-hover:shadow-amber-400/50 group-hover:scale-105" />
        <span className="absolute inset-0 flex items-center justify-center font-black text-[#002B49] text-lg leading-none select-none">
          Q
        </span>
        {/* Shine */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-transparent to-white/20 pointer-events-none" />
      </div>
      {/* Wordmark */}
      <span className="text-xl font-black tracking-widest text-[#002B49] font-serif hidden sm:block transition-opacity duration-200 group-hover:opacity-80">
        QAZMURA
      </span>
    </Link>
  );
}

interface DropdownMenuProps {
  section: NavSection;
  isActive: boolean;
  pathname: string;
}

function DropdownMenu({ section, isActive, pathname }: DropdownMenuProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useOutsideClick(ref, () => setOpen(false));

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="true"
        className={`
          flex items-center gap-1.5 py-1.5 px-1 text-sm font-bold uppercase tracking-wider
          transition-colors duration-200 rounded-md outline-none
          focus-visible:ring-2 focus-visible:ring-[#D4AF37]
          ${isActive ? "text-[#002B49]" : "text-slate-600 hover:text-[#002B49]"}
        `}
      >
        {section.label}
        <ChevronDown
          className={`w-3.5 h-3.5 opacity-60 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {/* Active underline */}
      {isActive && (
        <span className="absolute bottom-0 left-1 right-1 h-0.5 rounded-full bg-[#D4AF37]" />
      )}

      {/* Dropdown panel */}
      <div
        className={`
          absolute left-0 top-full pt-3 w-56 z-50
          transition-all duration-200 origin-top
          ${open ? "opacity-100 scale-y-100 pointer-events-auto" : "opacity-0 scale-y-95 pointer-events-none"}
        `}
      >
        <div className="relative bg-white/90 backdrop-blur-xl border border-slate-100 shadow-2xl shadow-slate-200/60 rounded-2xl p-2 flex flex-col gap-0.5">
          {/* Gold accent bar */}
          <div className="absolute top-0 left-4 right-4 h-0.5 rounded-full bg-gradient-to-r from-transparent via-[#D4AF37]/60 to-transparent" />

          {section.items.map((item) => {
            const active = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold
                  transition-all duration-150 group/item
                  ${active
                    ? "bg-[#002B49] text-white"
                    : "text-slate-600 hover:bg-slate-50 hover:text-[#002B49]"
                  }
                `}
              >
                <span className={`
                  transition-colors duration-150
                  ${active ? "text-[#D4AF37]" : "text-slate-400 group-hover/item:text-[#D4AF37]"}
                `}>
                  {item.icon}
                </span>
                <span className="flex-1">{item.name}</span>
                {item.badge && (
                  <span className="text-[10px] font-black bg-[#D4AF37] text-[#002B49] px-1.5 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

interface UserDropdownProps {
  email: string;
  onSignOut: () => void;
}

function UserDropdown({ email, onSignOut }: UserDropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useOutsideClick(ref, () => setOpen(false));

  const initial = email.charAt(0).toUpperCase();

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex items-center gap-2.5 group outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] rounded-xl p-1"
      >
        {/* Avatar */}
        <div className="relative w-8 h-8 rounded-xl bg-gradient-to-br from-[#002B49] to-[#004680] flex items-center justify-center shadow-md">
          <span className="text-sm font-black text-[#D4AF37]">{initial}</span>
          <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-white" />
        </div>
        <div className="hidden lg:flex flex-col items-start">
          <span className="text-[11px] font-bold text-slate-700 leading-tight truncate max-w-[120px]">{email}</span>
          <span className="text-[9px] font-black text-[#D4AF37] uppercase tracking-widest">Студент</span>
        </div>
        <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>

      <div
        className={`
          absolute right-0 top-full pt-3 w-52 z-50
          transition-all duration-200 origin-top-right
          ${open ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"}
        `}
      >
        <div className="bg-white/90 backdrop-blur-xl border border-slate-100 shadow-2xl shadow-slate-200/60 rounded-2xl p-2 flex flex-col gap-0.5">
          <div className="px-3 py-2 mb-1 border-b border-slate-100">
            <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-widest">Тіркелген</p>
            <p className="text-xs font-bold text-slate-700 truncate">{email}</p>
          </div>

          <Link href="/profile" onClick={() => setOpen(false)}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50 hover:text-[#002B49] transition-all group/item">
            <User className="w-4 h-4 text-slate-400 group-hover/item:text-[#D4AF37]" />
            Профиль
          </Link>
          <Link href="/profile/edit" onClick={() => setOpen(false)}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50 hover:text-[#002B49] transition-all group/item">
            <Settings className="w-4 h-4 text-slate-400 group-hover/item:text-[#D4AF37]" />
            Профильді өңдеу
          </Link>

          <div className="border-t border-slate-100 mt-1 pt-1">
            <button
              onClick={() => { setOpen(false); onSignOut(); }}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-red-500 hover:bg-red-50 transition-all group/item"
            >
              <LogOut className="w-4 h-4" />
              Шығу
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Mobile Drawer
// ─────────────────────────────────────────────────────────────

interface MobileDrawerProps {
  open: boolean;
  onClose: () => void;
  pathname: string;
  user: { email: string | null } | null;
  onSignOut: () => void;
}

function MobileDrawer({ open, onClose, pathname, user, onSignOut }: MobileDrawerProps) {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  // Lock body scroll when drawer open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  // Auto-expand active section
  useEffect(() => {
    if (!open) return;
    for (const section of NAV_SECTIONS) {
      if (section.matchPaths.some((p) => pathname.startsWith(p))) {
        setExpandedSection(section.id);
        return;
      }
    }
  }, [open, pathname]);

  const toggle = (id: string) => setExpandedSection((prev) => (prev === id ? null : id));

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-[#002B49]/50 backdrop-blur-sm transition-opacity duration-300 ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        aria-hidden="true"
      />

      {/* Drawer panel */}
      <aside
        className={`
          fixed top-0 left-0 bottom-0 z-50 w-[85vw] max-w-sm
          bg-white shadow-2xl flex flex-col
          transition-transform duration-300 ease-in-out
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
        aria-label="Мобильді навигация"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
          <Logo />
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-500 hover:bg-slate-100 transition-colors"
            aria-label="Жабу"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable content */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 flex flex-col gap-1">

          {/* Home */}
          <Link
            href="/"
            onClick={onClose}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${pathname === "/" ? "bg-[#002B49] text-white" : "text-slate-700 hover:bg-slate-50"}`}
          >
            <Home className={`w-4 h-4 ${pathname === "/" ? "text-[#D4AF37]" : "text-slate-400"}`} />
            Басты бет
          </Link>

          {/* Sections with accordion */}
          {NAV_SECTIONS.map((section) => {
            const isExpanded = expandedSection === section.id;
            const isActiveSection = section.matchPaths.some((p) => pathname.startsWith(p));

            return (
              <div key={section.id} className="flex flex-col">
                <button
                  onClick={() => toggle(section.id)}
                  aria-expanded={isExpanded}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all w-full text-left
                    ${isActiveSection ? "text-[#002B49] bg-blue-50/60" : "text-slate-700 hover:bg-slate-50"}
                  `}
                >
                  <span className={`${isActiveSection ? "text-[#D4AF37]" : "text-slate-400"}`}>
                    {section.icon}
                  </span>
                  <span className="flex-1">{section.label}</span>
                  <ChevronDown className={`w-4 h-4 opacity-50 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`} />
                </button>

                {/* Accordion items */}
                <div className={`overflow-hidden transition-all duration-300 ${isExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
                  <div className="pl-4 py-1 flex flex-col gap-0.5">
                    {section.items.map((item) => {
                      const active = pathname === item.href || pathname.startsWith(item.href + "/");
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={onClose}
                          className={`
                            flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all
                            ${active ? "bg-[#002B49] text-white" : "text-slate-600 hover:bg-slate-50 hover:text-[#002B49]"}
                          `}
                        >
                          <span className={active ? "text-[#D4AF37]" : "text-slate-400"}>{item.icon}</span>
                          {item.name}
                          {item.badge && (
                            <span className="ml-auto text-[10px] font-black bg-[#D4AF37] text-[#002B49] px-1.5 py-0.5 rounded-full">
                              {item.badge}
                            </span>
                          )}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}

          {/* AI Мұғалім */}
          <Link
            href="/ai"
            onClick={onClose}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${pathname === "/ai" ? "bg-[#002B49] text-white" : "text-slate-700 hover:bg-slate-50"}`}
          >
            <Sparkles className={`w-4 h-4 ${pathname === "/ai" ? "text-[#D4AF37]" : "text-slate-400"}`} />
            AI Мұғалім
          </Link>

          {/* Тарифтер */}
          <Link
            href="/pricing"
            onClick={onClose}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${pathname === "/pricing" ? "bg-[#002B49] text-white" : "text-slate-700 hover:bg-slate-50"}`}
          >
            <CreditCard className={`w-4 h-4 ${pathname === "/pricing" ? "text-[#D4AF37]" : "text-slate-400"}`} />
            Тарифтер
          </Link>
        </nav>

        {/* Footer: Auth section */}
        <div className="border-t border-slate-100 p-4">
          {user ? (
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3 px-3 py-2 bg-slate-50 rounded-xl">
                <div className="w-8 h-8 rounded-lg bg-[#002B49] flex items-center justify-center shrink-0">
                  <span className="text-sm font-black text-[#D4AF37]">{user.email?.charAt(0).toUpperCase()}</span>
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-xs font-bold text-slate-700 truncate">{user.email}</span>
                  <span className="text-[9px] font-black text-[#D4AF37] uppercase tracking-widest">Студент</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Link href="/profile" onClick={onClose}
                  className="flex items-center justify-center gap-1.5 px-3 py-2 bg-[#002B49] text-white text-xs font-bold rounded-xl">
                  <User className="w-3.5 h-3.5" /> Профиль
                </Link>
                <button
                  onClick={() => { onClose(); onSignOut(); }}
                  className="flex items-center justify-center gap-1.5 px-3 py-2 border border-red-200 text-red-500 text-xs font-bold rounded-xl hover:bg-red-50 transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" /> Шығу
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2">
              <Link href="/login" onClick={onClose}
                className="flex items-center justify-center gap-1.5 px-3 py-2.5 border border-[#002B49]/20 text-[#002B49] text-xs font-bold rounded-xl hover:bg-slate-50 transition-colors">
                <LogIn className="w-3.5 h-3.5" /> Кіру
              </Link>
              <Link href="/register" onClick={onClose}
                className="flex items-center justify-center gap-1.5 px-3 py-2.5 bg-gradient-to-r from-[#D4AF37] to-[#b8912a] text-[#002B49] text-xs font-bold rounded-xl shadow-sm shadow-amber-400/20">
                <UserPlus className="w-3.5 h-3.5" /> Тіркелу
              </Link>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}

// ─────────────────────────────────────────────────────────────
// Main Navbar
// ─────────────────────────────────────────────────────────────

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, loading } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  // Scroll shadow
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => { setMobileOpen(false); }, [pathname]);

  const handleSignOut = useCallback(async () => {
    try {
      await signOut(auth);
      router.push("/");
    } catch (err) {
      console.error("Sign out error:", err);
    }
  }, [router]);

  return (
    <>
      <nav
        className={`
          sticky top-0 z-40 w-full
          bg-white/90 backdrop-blur-md
          border-b border-slate-100
          transition-shadow duration-300
          ${scrolled ? "shadow-lg shadow-slate-200/40" : "shadow-none"}
        `}
        aria-label="Негізгі навигация"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16 gap-8">

            {/* Logo */}
            <Logo />

            {/* Desktop Nav Links */}
            <div className="hidden md:flex items-center gap-1 flex-1">

              {/* Басты бет */}
              <Link
                href="/"
                className={`
                  relative py-1.5 px-2 text-sm font-bold uppercase tracking-wider
                  transition-colors duration-200 rounded-md
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]
                  ${pathname === "/" ? "text-[#002B49]" : "text-slate-600 hover:text-[#002B49]"}
                `}
              >
                Басты бет
                {pathname === "/" && (
                  <span className="absolute bottom-0 left-2 right-2 h-0.5 rounded-full bg-[#D4AF37]" />
                )}
              </Link>

              {/* Dropdowns */}
              {NAV_SECTIONS.map((section) => {
                const isActive = section.matchPaths.some((p) => pathname.startsWith(p));
                return (
                  <DropdownMenu key={section.id} section={section} isActive={isActive} pathname={pathname} />
                );
              })}

              {/* AI Мұғалім */}
              <Link
                href="/ai"
                className={`
                  relative flex items-center gap-1.5 py-1.5 px-2 text-sm font-bold uppercase tracking-wider
                  transition-colors duration-200 rounded-md
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]
                  ${pathname === "/ai" ? "text-[#002B49]" : "text-slate-600 hover:text-[#002B49]"}
                `}
              >
                <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                AI Мұғалім
                {pathname === "/ai" && (
                  <span className="absolute bottom-0 left-2 right-2 h-0.5 rounded-full bg-[#D4AF37]" />
                )}
              </Link>

              {/* Тарифтер */}
              <Link
                href="/pricing"
                className={`
                  relative py-1.5 px-2 text-sm font-bold uppercase tracking-wider
                  transition-colors duration-200 rounded-md
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]
                  ${pathname === "/pricing" ? "text-[#002B49]" : "text-slate-600 hover:text-[#002B49]"}
                `}
              >
                Тарифтер
                {pathname === "/pricing" && (
                  <span className="absolute bottom-0 left-2 right-2 h-0.5 rounded-full bg-[#D4AF37]" />
                )}
              </Link>
            </div>

            {/* Desktop User Area */}
            <div className="hidden md:flex items-center gap-3 ml-auto">
              {loading ? (
                <div className="w-6 h-6 border-2 border-[#002B49] border-t-transparent rounded-full animate-spin" />
              ) : user ? (
                <UserDropdown
                  email={user.email ?? ""}
                  onSignOut={handleSignOut}
                />
              ) : (
                <div className="flex items-center gap-2">
                  <Link href="/login">
                    <button className="flex items-center gap-1.5 text-[#002B49] border border-[#002B49]/20 px-4 py-2 rounded-xl text-xs font-bold hover:bg-slate-50 active:scale-95 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]">
                      <LogIn className="w-3.5 h-3.5" />
                      Кіру
                    </button>
                  </Link>
                  <Link href="/register">
                    <button className="flex items-center gap-1.5 bg-gradient-to-r from-[#D4AF37] to-[#b8912a] text-[#002B49] px-4 py-2 rounded-xl text-xs font-bold shadow-md shadow-amber-400/20 hover:opacity-95 active:scale-95 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#002B49]">
                      <UserPlus className="w-3.5 h-3.5" />
                      Тіркелу
                    </button>
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(true)}
              aria-label="Мәзірді ашу"
              className="md:hidden ml-auto w-9 h-9 flex items-center justify-center rounded-xl text-[#002B49] hover:bg-slate-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
            >
              <Menu className="w-5 h-5" />
            </button>

          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <MobileDrawer
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        pathname={pathname}
        user={user}
        onSignOut={handleSignOut}
      />
    </>
  );
}