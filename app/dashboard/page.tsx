"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();

  const [userId, setUserId] = useState<string | null>(null);
  const [orgId, setOrgId] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const uid = localStorage.getItem("userId");
    const oid = localStorage.getItem("organizationId");

    if (!uid) {
      router.push("/login");
      return;
    }

    if (!oid) {
      router.push("/org");
      return;
    }

    setUserId(uid);
    setOrgId(oid);
    setMounted(true);
  }, [router]);

  if (!mounted) {
    return <p style={{ padding: 40 }}>Loading dashboard...</p>;
  }

  return (
    <div style={{ padding: 40 }}>
      <h1 style={{ fontSize: 28, marginBottom: 12 }}>
        Dashboard
      </h1>

      <p>
        You are now inside your organization workspace.
      </p>

      <p style={{ marginTop: 20 }}>
        <strong>User ID:</strong> {userId}
      </p>

      <p>
        <strong>Organization ID:</strong> {orgId}
      </p>
    </div>
  );
}

