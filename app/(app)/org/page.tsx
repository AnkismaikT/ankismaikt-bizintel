"use client";

export default function OrganizationsPage() {
  const organizations: any[] = []; // real users may have zero

  return (
    <div className="p-6">
      <h1 className="mb-4 text-xl font-semibold">Organizations</h1>

      {organizations.length === 0 && (
        <div className="mt-10 rounded-lg border border-dashed border-zinc-300 p-8 text-center">
          <h2 className="text-lg font-semibold">No organizations yet</h2>
          <p className="mt-2 text-sm text-zinc-600">
            Create your first organization to start using BizIntel.
          </p>
          <button className="mt-4 rounded-md bg-black px-4 py-2 text-sm text-white">
            Create Organization
          </button>
        </div>
      )}
    </div>
  );
}

