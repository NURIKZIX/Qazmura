"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import { auth, db } from "@/lib/firebase"; // Сіздің жолыңызға сай болуы керек
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { toast, Toaster } from "sonner";
import { Eye, EyeOff, Loader2 } from "lucide-react";

// Валидация схемасы (Zod)
const registerSchema = z.object({
  fullName: z.string().min(3, "Аты-жөніңізді толық жазыңыз"),
  email: z.string().email("Email форматы қате"),
  password: z.string().min(8, "Кемінде 8 таңба"),
  phone: z.string().min(10, "Телефон нөмірі қате"),
  gender: z.string().min(1, "Жынысыңызды таңдаңыз"),
  role: z.enum(["student", "teacher", "parent"]),
});

type RegisterFormInputs = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormInputs>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit: SubmitHandler<RegisterFormInputs> = async (data) => {
    setLoading(true);
    try {
      // 1. Firebase Auth тіркеу
      const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
      const user = userCredential.user;

      // 2. Email Verification жіберу
      await sendEmailVerification(user);

      // 3. Firestore-қа мәліметтерді сақтау
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        gender: data.gender,
        role: data.role,
        xp: 50,
        level: 1,
        createdAt: new Date().toISOString(),
      });

      toast.success("Сәтті тіркелдіңіз! Email-ді тексеріңіз.");
      router.push("/login");
    } catch (error: any) {
      toast.error(error.message || "Тіркелу кезінде қате кетті");
    } finally {
      setLoading(false);
    }
  };

  // inputStyle-ды осылай өзгертіңіз (border-gray-800 және text-black)
const inputStyle = "w-full p-3 border border-gray-800 rounded-xl focus:ring-2 focus:ring-[#D4AF37] outline-none transition text-black placeholder-gray-500";

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#002B49] p-4">
      <Toaster />
      <motion.form 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-md space-y-4"
      >
        <h1 className="text-2xl font-bold text-center text-[#002B49]">QAZMURA Тіркелу</h1>

        <input {...register("fullName")} placeholder="Аты-жөніңіз" className={inputStyle} />
        {errors.fullName && <p className="text-red-500 text-xs">{errors.fullName.message}</p>}

        <input {...register("email")} placeholder="Email" className={inputStyle} />
        
        <div className="relative">
          <input type={showPassword ? "text" : "password"} {...register("password")} placeholder="Құпия сөз" className={inputStyle} />
          <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3.5">
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        <input {...register("phone")} placeholder="+77770000000" className={inputStyle} />

        <div className="grid grid-cols-2 gap-2">
          <select {...register("gender")} className={inputStyle}>
            <option value="">Жынысы</option>
            <option value="male">Ер</option>
            <option value="female">Әйел</option>
          </select>
          <select {...register("role")} className={inputStyle}>
            <option value="student">Студент</option>
            <option value="teacher">Мұғалім</option>
            <option value="parent">Ата-ана</option>
          </select>
        </div>

        <button disabled={loading} className="w-full bg-[#002B49] text-white py-3 rounded-xl hover:bg-[#001f35] transition flex justify-center items-center gap-2">
          {loading ? <Loader2 className="animate-spin" /> : "Тіркелу"}
        </button>
      </motion.form>
    </div>
  );
}