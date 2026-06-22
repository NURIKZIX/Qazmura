"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { Loader2, LogOut, Edit3, Trophy, Flame, BookOpen, Star, Mail, Phone, MapPin } from "lucide-react";
import { Toaster, toast } from "sonner";
import { signOut } from "firebase/auth";

interface UserData {
  fullName: string;
  email: string;
  phone: string;
  city: string;
  xp: number;
  streak: number;
  lessonsCompleted: number;
  level: number;
  role: string;
}

export default function ProfilePage() {
  const router = useRouter();
  const [profile, setProfile] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const user = auth.currentUser;
        if (!user) {
          router.push("/"); // Кірмеген болса басты бетке жібереді
          return;
        }
        const docSnap = await getDoc(doc(db, "users", user.uid));
        if (docSnap.exists()) {
          setProfile(docSnap.data() as UserData);
        }
      } catch (error) {
        toast.error("Деректерді жүктеу қатесі");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [router]);

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/"); // Шыққаннан кейін басты бетке жібереді
  };

  if (loading) return (
    <div className="flex h-screen items-center justify-center text-[#002B49]">
      <Loader2 className="animate-spin w-10 h-10" />
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-10 px-4">
      <Toaster richColors />
      <motion.div 
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto space-y-6"
      >
        {/* HEADER */}
        <div className="bg-white p-8 rounded-3xl shadow-lg border-l-8 border-[#D4AF37] flex items-center gap-6">
          <div className="w-28 h-28 rounded-full bg-[#002B49] text-white flex items-center justify-center text-5xl font-bold shadow-xl">
            {profile?.fullName?.charAt(0)?.toUpperCase()}
          </div>
          <div>
            <h1 className="text-4xl font-bold text-[#002B49]">{profile?.fullName || "Пайдаланушы"}</h1>
            <p className="text-gray-600 flex items-center gap-2"><Mail size={16} /> {profile?.email}</p>
            <p className="text-[#D4AF37] font-bold text-lg mt-2">Level {profile?.level || 1}</p>
          </div>
        </div>

        {/* STATISTICS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Сабақтар", value: profile?.lessonsCompleted || 0, icon: <BookOpen /> },
            { label: "XP", value: profile?.xp || 0, icon: <Star /> },
            { label: "Серия", value: profile?.streak || 0, icon: <Flame /> },
            { label: "Деңгей", value: profile?.level || 1, icon: <Trophy /> },
          ].map((stat, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl shadow-sm text-center border">
              <div className="text-[#D4AF37] flex justify-center mb-2">{stat.icon}</div>
              <div className="text-3xl font-bold text-[#002B49]">{stat.value}</div>
              <div className="text-sm text-gray-500">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* DETAILS */}
        <div className="bg-white p-8 rounded-3xl shadow-sm border space-y-4">
          <h2 className="text-xl font-bold text-[#002B49] mb-4">Жеке мәліметтер</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <p className="flex items-center gap-2"><Phone className="text-[#D4AF37]" /> {profile?.phone || "Телефон көрсетілмеген"}</p>
            <p className="flex items-center gap-2"><MapPin className="text-[#D4AF37]" /> {profile?.city || "Қала көрсетілмеген"}</p>
          </div>
        </div>

        {/* ACTIONS */}
        <div className="flex gap-4">
          <button onClick={() => router.push("/profile/edit")} className="bg-[#002B49] text-white px-8 py-3 rounded-xl hover:bg-[#001f35] flex items-center gap-2">
            <Edit3 size={18} /> Профильді өңдеу
          </button>
          <button onClick={handleLogout} className="bg-red-50 text-red-600 px-8 py-3 rounded-xl hover:bg-red-100 flex items-center gap-2">
            <LogOut size={18} /> Шығу
          </button>
        </div>
      </motion.div>
    </div>
  );
}