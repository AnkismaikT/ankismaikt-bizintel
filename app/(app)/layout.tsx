"use client";

import { usePathname } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import "../globals.css";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // ❗ Hide sidebar on login page
  const hideSidebar = pathname === "/login";

  return (
    <div className="flex min-h-screen">
      {!hideSidebar && <Sidebar />}
      <main className="flex-1">{children}</main>
    </div>
  );
}

