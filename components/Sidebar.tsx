"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const navItems = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Analytics", href: "/dashboard" },
  { name: "Users", href: "/org/users" },
  { name: "Organizations", href: "/org" },
  { name: "Settings", href: "/org/settings" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  function handleLogout() {
    // 1️⃣ clear login state
    localStorage.removeItem("userId");

    // 2️⃣ redirect to login
    router.push("/login");
  }

  return (
    <aside className="h-screen w-64 bg-white dark:bg-zinc-950 border-r border-zinc-200 dark:border-zinc-800 flex flex-col">
      
      {/* Brand */}
      <div className="px-4 py-4 border-b border-zinc-200 dark:border-zinc-800">
        <div className="text-lg font-semibold tracking-tight text-zinc-900 dark:text-white">
          AnkismaikT
        </div>
        <div className="text-xs text-zinc-500">
          BizIntel
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2 py-4 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href);

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`relative flex items-center rounded-md px-3 py-2 text-sm transition ${
                isActive
                  ? "bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-white font-medium"
                  : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-900"
              }`}
            >
              {isActive && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-1 rounded-r bg-blue-600" />
              )}
              <span className="ml-2">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* User Section */}
      <div className="border-t border-zinc-200 dark:border-zinc-800 px-4 py-3">
        <div className="text-sm font-medium text-zinc-900 dark:text-white">
          Pradeep Kishan
        </div>

        <button
          onClick={handleLogout}
          className="mt-1 text-xs text-zinc-500 hover:text-red-600"
        >
          Sign out
        </button>
      </div>

    </aside>
  );
}

