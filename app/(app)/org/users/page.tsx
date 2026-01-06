"use client";

export default function UsersPage() {
  const users: any[] = []; // real users may have zero

  return (
    <div className="p-6">
      <h1 className="mb-4 text-xl font-semibold">Users</h1>

      {users.length === 0 && (
        <div className="mt-10 rounded-lg border border-dashed border-zinc-300 p-8 text-center">
          <h2 className="text-lg font-semibold">No users added</h2>
          <p className="mt-2 text-sm text-zinc-600">
            Invite users to collaborate in your organization.
          </p>
          <button className="mt-4 rounded-md bg-black px-4 py-2 text-sm text-white">
            Invite User
          </button>
        </div>
      )}
    </div>
  );
}

