"use client";

import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="p-6 space-y-6">
      
      {/* Real-user guidance */}
      <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 text-sm text-zinc-700">
        <strong>Welcome to BizIntel.</strong><br />
        Start by creating an organization, then invite users to manage and track your business.
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Link href="/org" className="block">
          <div className="cursor-pointer rounded-lg border p-4 hover:bg-zinc-50">
            <p className="text-sm text-zinc-500">Organizations</p>
            <p className="text-2xl font-semibold">5</p>
          </div>
        </Link>

        <Link href="/org/users" className="block">
          <div className="cursor-pointer rounded-lg border p-4 hover:bg-zinc-50">
            <p className="text-sm text-zinc-500">Users</p>
            <p className="text-2xl font-semibold">4</p>
          </div>
        </Link>
      </div>

    </div>
  );
}

