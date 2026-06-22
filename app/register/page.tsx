"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import { auth, db } from "@/lib/firebase";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { toast, Toaster } from "sonner";
import { Eye, EyeOff, Loader2 } from "lucide-react";

// Валидация схемасы
const registerSchema = z.object({
  fullName: z.string().min(3, "Аты-жөніңіз кемінде 3 әріптен тұруы керек"),
  email: z.string().email("Email форматы дұрыс емес"),
  password: z.string().min(8, "Құпия сөз кемінде 8 таңба болуы керек"),
  phone: z.string().min(10, "Телефон нөмірі қате"),
  gender: z.string().min(1, "Жынысыңызды таңдаңыз"),
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
      const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
      const user = userCredential.user;

      await sendEmailVerification(user);

      // Деректерді Firestore-қа сақтау
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        ...data,
        xp: 50,
        level: 1,
        createdAt: new Date().toISOString(),
      });

      toast.success("Сәтті тіркелдіңіз!");
      
      // БАҒЫТТАУДЫ ТҮЗЕТТІМ: Енді басты бетке (/) жібереді
      router.push("/"); 
    } catch (error: any) {
      toast.error("Қате орын алды: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = "w-full p-3 border rounded-xl outline-none transition text-black placeholder-gray-500 bg-gray-50 border-gray-300 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]";

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#002B49] p-4">
      <Toaster richColors position="top-center" />
      <motion.form 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-md space-y-4"
      >
        <h1 className="text-2xl font-bold text-center text-[#002B49]">QAZMURA Тіркелу</h1>

        <div>
          <input {...register("fullName")} placeholder="Аты-жөніңіз" className={inputStyle} />
          {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName.message}</p>}
        </div>

        <div>
          <input {...register("email")} placeholder="Email" className={inputStyle} />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
        </div>

        <div className="relative">
          <input type={showPassword ? "text" : "password"} {...register("password")} placeholder="Құпия сөз" className={inputStyle} />
          <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3.5 text-gray-500">
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
          {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
        </div>

        <div>
          <input {...register("phone")} placeholder="+77770000000" className={inputStyle} />
          {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
        </div>

        <div>
          <select {...register("gender")} className={inputStyle}>
            <option value="">Жынысыңызды таңдаңыз</option>
            <option value="male">Ер</option>
            <option value="female">Әйел</option>
          </select>
          {errors.gender && <p className="text-red-500 text-xs mt-1">{errors.gender.message}</p>}
        </div>

        <button disabled={loading} className="w-full bg-[#002B49] text-white py-3 rounded-xl hover:bg-[#001f35] transition font-bold flex justify-center items-center gap-2">
          {loading ? <Loader2 className="animate-spin" /> : "Тіркелу"}
        </button>
      </motion.form>
    </div>
  );
}