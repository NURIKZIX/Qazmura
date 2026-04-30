"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    await signIn("credentials", {
      email,
      password,
      callbackUrl: "/",
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-100">
      <div className="bg-white p-10 rounded-2xl shadow w-[400px]">

        <h1 className="text-2xl font-bold text-center text-blue-900">
          Кіру
        </h1>

        <input
          placeholder="Email"
          className="border p-3 w-full mt-4 rounded"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Пароль"
          className="border p-3 w-full mt-3 rounded"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full mt-5 bg-blue-900 text-white py-3 rounded"
        >
          Кіру
        </button>

      </div>
    </div>
  );
}