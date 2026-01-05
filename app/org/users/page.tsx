"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
};

export default function OrgUsersPage() {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const organizationId = localStorage.getItem("organizationId");

    if (!userId) {
      router.push("/login");
      return;
    }

    if (!organizationId) {
      router.push("/org");
      return;
    }

    // ✅ MOCK USERS (UI-FIRST, SAFE)
    setTimeout(() => {
      setUsers([
        {
          id: "u1",
          name: "Pradeep Kishan",
          email: "pradeep@ankismaikt.com",
          role: "Admin",
        },
        {
          id: "u2",
          name: "Demo User",
          email: "demo@ankismaikt.com",
          role: "Member",
        },
        {
          id: "u3",
          name: "Finance User",
          email: "finance@ankismaikt.com",
          role: "Viewer",
        },
      ]);
      setError("");
      setLoading(false);
    }, 600);
  }, [router]);

  /* ---------------- STATES ---------------- */

  if (loading) {
    return (
      <div className="p-6">
        <p className="text-sm text-zinc-500">
          Loading users…
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <p className="text-sm text-red-600">
          {error}
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-zinc-900 dark:text-white">
          Users
        </h1>
        <p className="text-sm text-zinc-500">
          Manage users in this organization
        </p>
      </div>

      {/* Empty State */}
      {users.length === 0 && (
        <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-10 text-center">
          <h2 className="text-sm font-medium text-zinc-900 dark:text-white">
            No users found
          </h2>
          <p className="mt-1 text-sm text-zinc-500">
            Invite users to start collaborating.
          </p>
        </div>
      )}

      {/* Users Table */}
      {users.length > 0 && (
        <div className="overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
          <table className="w-full border-collapse">
            <thead className="bg-zinc-50 dark:bg-zinc-900">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-zinc-500">
                  Name
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-zinc-500">
                  Email
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-zinc-500">
                  Role
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-zinc-500">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr
                  key={user.id}
                  className="border-t border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition"
                >
                  <td className="px-4 py-3 text-sm text-zinc-900 dark:text-white">
                    {user.name}
                  </td>
                  <td className="px-4 py-3 text-sm text-zinc-700 dark:text-zinc-300">
                    {user.email}
                  </td>
                  <td className="px-4 py-3 text-sm text-zinc-500">
                    {user.role}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      className="text-sm font-medium text-blue-600 hover:underline"
                      onClick={() => alert("User actions coming soon")}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

    </div>
  );
}

