"use client";

export default function SettingsPage() {
  return (
    <div className="p-6 max-w-2xl">
      <h1 className="mb-1 text-xl font-semibold">Settings</h1>
      <p className="mb-6 text-sm text-zinc-500">
        Manage your account preferences
      </p>

      <div className="space-y-6">
        <div className="rounded-lg border p-4">
          <h2 className="text-sm font-medium">Account</h2>
          <p className="mt-2 text-sm text-zinc-600">
            Email: <span className="font-medium">user@example.com</span>
          </p>
        </div>

        <div className="rounded-lg border p-4">
          <h2 className="text-sm font-medium">Application</h2>
          <p className="mt-2 text-sm text-zinc-600">Version: v1.0-beta</p>
        </div>

        <div className="rounded-lg border p-4">
          <h2 className="text-sm font-medium">Session</h2>
          <button
            className="mt-3 rounded-md border px-4 py-2 text-sm hover:bg-zinc-50"
            disabled
          >
            Logout (coming soon)
          </button>
        </div>
      </div>
    </div>
  );
}

