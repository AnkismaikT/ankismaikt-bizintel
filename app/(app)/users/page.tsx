"use client";

import { Skeleton } from "@/components/ui/Skeleton";

export default function UsersPage() {
  const loading = false; // later can be real
  const users: any[] = [];

  return (
    <div className="p-6">
      <h1 className="mb-1 text-xl font-semibold">Users</h1>
      <p className="mb-6 text-sm text-zinc-500">
        Manage people who can access your organization
      </p>

      {loading && (
        <div className="space-y-4">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
      )}

      {!loading && users.length === 0 && (
        <div className="mt-10 rounded-lg border border-dashed border-zinc-300 p-10 text-center">
          <h2 className="text-lg font-semibold">No users added yet</h2>
          <p className="mt-2 text-sm text-zinc-600">
            Invite users to collaborate with you.
          </p>

          <button
            className="mt-4 rounded-md bg-black px-4 py-2 text-sm text-white opacity-60"
            disabled
          >
            Invite User (coming soon)
          </button>
        </div>
      )}
    </div>
  );
}

