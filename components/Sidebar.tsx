"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const navItems = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Analytics", href: "/analytics" },
  { name: "Users", href: "/org/users" },
  { name: "Organizations", href: "/org" },
  { name: "Settings", href: "/settings" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  function handleLogout() {
    localStorage.removeItem("userId");
    router.replace("/login");
  }

  return (
    <aside className="flex h-screen w-64 flex-col border-r border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
      {/* Brand */}
      <div className="border-b border-zinc-200 px-4 py-4 dark:border-zinc-800">
        <div className="text-lg font-semibold text-zinc-900 dark:text-white">
          AnkismaikT
        </div>
        <div className="text-xs text-zinc-500">BizIntel</div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-2 py-4">
        {navItems.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center rounded-md px-3 py-2 text-sm transition ${
                isActive
                  ? "bg-zinc-100 font-medium text-zinc-900 dark:bg-zinc-900 dark:text-white"
                  : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-900"
              }`}
            >
              <span className="ml-2">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-zinc-200 px-4 py-3 text-xs text-zinc-600 dark:border-zinc-800 dark:text-zinc-400">
        <div className="mb-2">
          📧 Mail us:{" "}
          <a
            href="mailto:pradeepkishan@ankismaikt.com"
            className="text-blue-600 hover:underline"
          >
            pradeepkishan@ankismaikt.com
          </a>
        </div>

        <button
          onClick={handleLogout}
          className="text-xs text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
        >
          Sign out
        </button>
      </div>
    </aside>
  );
}

