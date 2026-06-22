"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { toast, Toaster } from "sonner";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

export default function EditProfilePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    city: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (!user) return router.push("/login");

      const docSnap = await getDoc(doc(db, "users", user.uid));
      if (docSnap.exists()) {
        setFormData(docSnap.data() as any);
      }
      setLoading(false);
    };
    fetchUserData();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const user = auth.currentUser;
      if (user) {
        await updateDoc(doc(db, "users", user.uid), formData);
        toast.success("Профиль жаңартылды!");
        router.push("/profile");
      }
    } catch (error) {
      toast.error("Қате орын алды");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-10 text-center">Жүктелуде...</div>;

  const inputStyle = "w-full p-3 border rounded-xl bg-slate-50 border-gray-300 focus:ring-2 focus:ring-[#002B49] outline-none text-black";

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4">
      <Toaster richColors />
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-xl mx-auto bg-white p-8 rounded-3xl shadow-sm border">
        <h1 className="text-2xl font-bold text-[#002B49] mb-6">Профильді өңдеу</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Аты-жөніңіз</label>
            <input value={formData.fullName} onChange={(e) => setFormData({...formData, fullName: e.target.value})} className={inputStyle} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Телефон</label>
            <input value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className={inputStyle} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Қала</label>
            <input value={formData.city} onChange={(e) => setFormData({...formData, city: e.target.value})} className={inputStyle} />
          </div>
          <button disabled={saving} className="w-full bg-[#002B49] text-white py-3 rounded-xl hover:bg-[#001f35] flex justify-center">
            {saving ? <Loader2 className="animate-spin" /> : "Сақтау"}
          </button>
        </form>
      </motion.div>
    </div>
  );
}