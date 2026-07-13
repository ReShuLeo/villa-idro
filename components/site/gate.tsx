"use client";

import { useEffect, useState, type FormEvent, type ReactNode } from "react";

// Приватный доступ к тест-сайту. ВАЖНО: это статический сайт (GitHub Pages, без сервера),
// поэтому это НЕ криптозащита — только гейт от случайных посетителей + скрытие из поиска (noindex).
// По умолчанию (и в статическом HTML) рендерится ТОЛЬКО форма — контент виллы в исходник не попадает.
const KEY = "villa_access_ok";
const LOGIN = "admin";
const PASS = "Pinto03";

export function Gate({ children }: { children: ReactNode }) {
  const [ok, setOk] = useState(false);
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [err, setErr] = useState(false);

  useEffect(() => {
    try {
      if (localStorage.getItem(KEY) === "1") setOk(true);
    } catch {}
  }, []);

  if (ok) return <>{children}</>;

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (user.trim().toLowerCase() === LOGIN && pass === PASS) {
      try {
        localStorage.setItem(KEY, "1");
      } catch {}
      setOk(true);
    } else {
      setErr(true);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#0d2227] px-5 text-[#f7f4ee]">
      <form onSubmit={submit} className="w-full max-w-sm">
        <p className="font-display text-3xl leading-none">Villa Idro</p>
        <p className="mt-2 mb-7 text-sm text-[#9db3ae]">Приватный доступ. Введите логин и пароль.</p>

        <label className="block text-[11px] uppercase tracking-[0.18em] text-[#9db3ae] mb-1.5">Логин</label>
        <input
          value={user}
          onChange={(e) => { setUser(e.target.value); setErr(false); }}
          autoComplete="username"
          className="w-full mb-4 rounded-lg bg-white/10 border border-white/20 px-4 py-3 outline-none focus:border-[#ffd9ae] transition-colors"
        />

        <label className="block text-[11px] uppercase tracking-[0.18em] text-[#9db3ae] mb-1.5">Пароль</label>
        <input
          type="password"
          value={pass}
          onChange={(e) => { setPass(e.target.value); setErr(false); }}
          autoComplete="current-password"
          className="w-full mb-2 rounded-lg bg-white/10 border border-white/20 px-4 py-3 outline-none focus:border-[#ffd9ae] transition-colors"
        />

        {err && <p className="text-sm text-[#ffb0a2] mt-1 mb-1">Неверный логин или пароль.</p>}

        <button
          type="submit"
          className="mt-4 w-full rounded-full bg-[#1d7f5f] hover:bg-[#22936d] py-3.5 font-medium transition-colors"
        >
          Войти
        </button>
      </form>
    </div>
  );
}
