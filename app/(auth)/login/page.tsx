"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      router.replace("/dashboard");
    }
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50">
      <div className="w-full max-w-sm rounded border bg-white p-6 shadow">
        <h1 className="mb-4 text-center text-xl font-semibold">Login</h1>

        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const email = (e.currentTarget.email as HTMLInputElement).value;
            const password = (e.currentTarget.password as HTMLInputElement).value;

            const res = await fetch(
              `${process.env.NEXT_PUBLIC_API_URL}/api/login`,
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
              }
            );

            const data = await res.json();

            if (data.userId) {
              localStorage.setItem("userId", data.userId);
              localStorage.setItem("userName", data.name || "");
              router.replace("/dashboard");
            } else {
              alert("Invalid credentials");
            }
          }}
        >
          <input
            name="email"
            placeholder="Email"
            className="mb-3 w-full rounded border px-3 py-2"
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            className="mb-4 w-full rounded border px-3 py-2"
          />
          <button className="w-full rounded bg-black py-2 text-white">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

