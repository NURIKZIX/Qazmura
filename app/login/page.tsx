"use client";

import { useState } from "react";
import { auth, db } from "@/lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import { toast, Toaster } from "sonner";
import { Eye, EyeOff, Loader2, Mail, Lock } from "lucide-react";

const loginSchema = z.object({
  email: z.string().email("Дұрыс email енгізіңіз"),
  password: z.string().min(8, "Құпия сөз кемінде 8 таңба"),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    setLoading(true);
    try {
      const { user } = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      if (!user.emailVerified) {
        toast.warning("Email расталмаған! Поштаңызды тексеріңіз.");
        setLoading(false);
        return;
      }

      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists()) {
        await updateDoc(doc(db, "users", user.uid), {
          lastLogin: new Date().toISOString(),
        });
      }

      toast.success("Сәтті кірдіңіз!");
      router.push("/learn");
    } catch (error: any) {
      toast.error("Email немесе құпия сөз қате");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle =
    "w-full p-3 pl-10 border border-gray-200 rounded-xl text-black bg-white focus:ring-2 focus:ring-[#D4AF37] outline-none transition";

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#002B49] p-4">
      <Toaster richColors />
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-md space-y-4"
      >
        <h1 className="text-2xl font-bold text-center text-[#002B49]">
          QAZMURA Кіру
        </h1>

        {/* Email */}
        <div className="relative">
          <Mail
            className="absolute left-3 top-3.5 text-gray-400"
            size={18}
          />
          <input
            {...register("email")}
            className={inputStyle}
            placeholder="Email"
            type="email"
            autoComplete="email"
          />
        </div>
        {errors.email && (
          <p className="text-red-500 text-xs -mt-2">{errors.email.message}</p>
        )}

        {/* Password */}
        <div className="relative">
          <Lock
            className="absolute left-3 top-3.5 text-gray-400"
            size={18}
          />
          <input
            type={showPassword ? "text" : "password"}
            {...register("password")}
            className={inputStyle}
            placeholder="Құпия сөз"
            autoComplete="current-password"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3.5"
          >
            {showPassword ? (
              <EyeOff size={18} className="text-gray-400" />
            ) : (
              <Eye size={18} className="text-gray-400" />
            )}
          </button>
        </div>
        {errors.password && (
          <p className="text-red-500 text-xs -mt-2">
            {errors.password.message}
          </p>
        )}

        {/* Submit button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#002B49] text-white py-3 rounded-xl hover:bg-[#001f35] transition flex justify-center items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? <Loader2 className="animate-spin" size={20} /> : "Кіру"}
        </button>

        {/* Register link */}
        <p className="text-center text-sm text-gray-500">
          Аккаунтыңыз жоқ па?{" "}
          <span
            className="text-[#002B49] font-bold cursor-pointer hover:underline"
            onClick={() => router.push("/register")}
          >
            Тіркелу
          </span>
        </p>
      </motion.form>
    </div>
  );
}