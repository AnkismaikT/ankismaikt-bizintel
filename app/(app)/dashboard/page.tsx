"use client";

import { Skeleton } from "@/components/ui/Skeleton";

export default function DashboardPage() {
  const loading = false; // leave false in final state

  return (
    <div className="p-6">
      <h1 className="mb-6 text-xl font-semibold">Dashboard</h1>

      {/* Skeleton (only shows when loading=true) */}
      {loading && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Skeleton className="h-32" />
          <Skeleton className="h-32" />
          <Skeleton className="h-32" />
        </div>
      )}

      {/* Real content */}
      {!loading && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-lg border p-4">
            <h2 className="text-sm text-zinc-500">Organizations</h2>
            <p className="mt-2 text-2xl font-semibold">0</p>
          </div>

          <div className="rounded-lg border p-4">
            <h2 className="text-sm text-zinc-500">Users</h2>
            <p className="mt-2 text-2xl font-semibold">0</p>
          </div>

          <div className="rounded-lg border p-4">
            <h2 className="text-sm text-zinc-500">Status</h2>
            <p className="mt-2 text-sm font-medium text-green-600">Active</p>
          </div>
        </div>
      )}
    </div>
  );
}

