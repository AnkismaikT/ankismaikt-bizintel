"use client";

import { Skeleton } from "@/components/ui/Skeleton";

export default function OrganizationsPage() {
  const loading = false; // set true to preview skeleton
  const organizations: any[] = [];

  return (
    <div className="p-6">
      <h1 className="mb-1 text-xl font-semibold">Organizations</h1>
      <p className="mb-6 text-sm text-zinc-500">
        Manage your workspaces and teams
      </p>

      {/* Skeleton state */}
      {loading && (
        <div className="space-y-4">
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-16 w-full" />
        </div>
      )}

      {/* Empty state */}
      {!loading && organizations.length === 0 && (
        <div className="mt-10 rounded-lg border border-dashed border-zinc-300 p-10 text-center">
          <h2 className="text-lg font-semibold">No organizations yet</h2>
          <p className="mt-2 text-sm text-zinc-600">
            Create an organization to get started.
          </p>

          <button
            className="mt-4 rounded-md bg-black px-4 py-2 text-sm text-white opacity-60"
            disabled
          >
            Create Organization (coming soon)
          </button>
        </div>
      )}

      {/* Future real list goes here */}
    </div>
  );
}

