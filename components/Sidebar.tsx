"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();

  const [userId, setUserId] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const uid = localStorage.getItem("userId");

    if (!uid) {
      router.push("/login");
      return;
    }

    setUserId(uid);
    setMounted(true);
  }, [router]);

  const nav = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Modules", path: "/modules" },
    { name: "Analytics", path: "/analytics" },
  ];

  if (!mounted) {
    return null;
  }

  return (
    <aside
      style={{
        width: 240,
        height: "100vh",
        borderRight: "1px solid #e5e7eb",
        padding: 20,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      {/* TOP */}
      <div>
        <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 24 }}>
          Ankismaikt
        </h2>

        <nav>
          {nav.map((item) => (
            <div
              key={item.path}
              onClick={() => router.push(item.path)}
              style={{
                padding: "10px 12px",
                marginBottom: 6,
                cursor: "pointer",
                borderRadius: 6,
                background:
                  pathname === item.path ? "#f3f4f6" : "transparent",
                fontWeight: pathname === item.path ? 600 : 400,
              }}
            >
              {item.name}
            </div>
          ))}
        </nav>
      </div>

      {/* BOTTOM */}
      <div>
        <div style={{ fontSize: 12, color: "#6b7280", marginBottom: 8 }}>
          Signed in
        </div>
        <div style={{ fontSize: 14, marginBottom: 12 }}>
          {userId.slice(0, 8)}
        </div>

        <button
          onClick={() => {
            localStorage.clear();
            router.push("/login");
          }}
          style={{
            width: "100%",
            padding: 10,
            borderRadius: 6,
            border: "1px solid #e5e7eb",
            background: "white",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </div>
    </aside>
  );
}

