"use client";

import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";

export default function EditProfilePage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProfile = async () => {
      const user = auth.currentUser;

      if (!user) return;

      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setName(docSnap.data().name || "");
      }

      setLoading(false);
    };

    loadProfile();
  }, []);

  const saveProfile = async () => {
    const user = auth.currentUser;

    if (!user) return;

    await updateDoc(doc(db, "users", user.uid), {
      name,
    });

    alert("Профиль жаңартылды!");

    router.push("/profile");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Жүктелуде...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 flex justify-center items-center">

      <div className="bg-white p-8 rounded-3xl shadow-xl w-[500px]">

        <h1 className="text-3xl font-bold mb-6">
          Профильді өңдеу
        </h1>

        <label className="block mb-2 font-semibold">
          Аты-жөні
        </label>

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border p-3 rounded-xl mb-6"
        />

        <div className="flex gap-3">

          <button
            onClick={saveProfile}
            className="bg-blue-600 text-white px-6 py-3 rounded-xl"
          >
            Сақтау
          </button>

          <button
            onClick={() => router.push("/profile")}
            className="bg-gray-300 px-6 py-3 rounded-xl"
          >
            Болдырмау
          </button>

        </div>

      </div>

    </div>
  );
}