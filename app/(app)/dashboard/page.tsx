"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export default function DashboardPage() {
  const [orgCount, setOrgCount] = useState(0);
  const [userCount, setUserCount] = useState(0);

  useEffect(() => {
    fetch(`${API_URL}/api/organizations`)
      .then((r) => r.json())
      .then((d) => Array.isArray(d) && setOrgCount(d.length))
      .catch(() => setOrgCount(0));

    fetch(`${API_URL}/api/users`)
      .then((r) => r.json())
      .then((d) => Array.isArray(d) && setUserCount(d.length))
      .catch(() => setUserCount(0));
  }, []);

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <p className="text-sm text-zinc-500">
          Welcome to BizIntel
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Link
          href="/org"
          className="rounded-lg border p-4 hover:bg-zinc-50"
        >
          <p className="text-sm text-zinc-500">Organizations</p>
          <p className="text-2xl font-semibold">{orgCount}</p>
        </Link>

        <Link
          href="/org/users"
          className="rounded-lg border p-4 hover:bg-zinc-50"
        >
          <p className="text-sm text-zinc-500">Users</p>
          <p className="text-2xl font-semibold">{userCount}</p>
        </Link>
      </div>
    </div>
  );
}

