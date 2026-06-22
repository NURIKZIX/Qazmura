"use client";

import { useEffect, useState } from "react";
import useAuth from "@/hooks/useAuth";
import { auth, db } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";

interface UserData {
  name: string;
  email: string;
  avatar: string;
  xp: number;
  streak: number;
  lessonsCompleted: number;
  level: number;
  role: string;
}

export default function ProfilePage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [profile, setProfile] = useState<UserData | null>(null);
  const [loadingProfile, setLoadingProfile] = useState(true);

  useEffect(() => {
    const loadProfile = async () => {
      if (!user) return;

      try {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setProfile(docSnap.data() as UserData);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoadingProfile(false);
      }
    };

    loadProfile();
  }, [user]);

  if (loading || loadingProfile) {
    return (
      <div className="flex justify-center items-center h-screen text-2xl">
        Жүктелуде...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="bg-white p-8 rounded-2xl shadow-xl">
          <h1 className="text-2xl font-bold mb-4">
            Сіз жүйеге кірмегенсіз
          </h1>

          <button
            onClick={() => router.push("/login")}
            className="bg-blue-600 text-white px-4 py-2 rounded-xl"
          >
            Кіру
          </button>
        </div>
      </div>
    );
  }

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-slate-100 py-10">
      <div className="max-w-5xl mx-auto">

        <div className="bg-white rounded-3xl shadow-xl p-8">

          {/* HEADER */}
          <div className="flex items-center gap-6">

            <div className="w-28 h-28 rounded-full bg-blue-600 text-white flex items-center justify-center text-5xl font-bold">
              {profile?.name?.charAt(0)?.toUpperCase() ||
                user.email?.charAt(0)?.toUpperCase()}
            </div>

            <div>
              <h1 className="text-4xl font-bold text-blue-900">
                {profile?.name || "Пайдаланушы"}
              </h1>

              <p className="text-gray-600 text-lg">
                {profile?.email}
              </p>

              <p className="text-blue-600 font-semibold mt-2">
                Level {profile?.level}
              </p>
            </div>

          </div>

          {/* STATS */}
          <div className="grid md:grid-cols-4 gap-5 mt-10">

            <div className="bg-slate-50 p-5 rounded-2xl">
              <h3 className="font-bold text-lg">
                📚 Сабақтар
              </h3>

              <p className="text-4xl font-bold mt-2">
                {profile?.lessonsCompleted ?? 0}
              </p>
            </div>

            <div className="bg-slate-50 p-5 rounded-2xl">
              <h3 className="font-bold text-lg">
                ⭐ XP
              </h3>

              <p className="text-4xl font-bold mt-2">
                {profile?.xp ?? 0}
              </p>
            </div>

            <div className="bg-slate-50 p-5 rounded-2xl">
              <h3 className="font-bold text-lg">
                🔥 Серия
              </h3>

              <p className="text-4xl font-bold mt-2">
                {profile?.streak ?? 0}
              </p>
            </div>

            <div className="bg-slate-50 p-5 rounded-2xl">
              <h3 className="font-bold text-lg">
                🏆 Деңгей
              </h3>

              <p className="text-4xl font-bold mt-2">
                {profile?.level ?? 1}
              </p>
            </div>

          </div>

          {/* ROLE */}
          <div className="mt-8">
            <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-xl">
              {profile?.role}
            </span>
          </div>

          {/* BUTTONS */}
          <div className="mt-10 flex gap-4">

            <button
  onClick={() => router.push("/profile/edit")}
  className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700"
>
  Профильді өңдеу
</button>

            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-6 py-3 rounded-xl hover:bg-red-600"
            >
              Шығу
            </button>

          </div>

        </div>

      </div>
    </div>
  );
}