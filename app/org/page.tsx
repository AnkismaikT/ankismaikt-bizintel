"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Org = {
  id: string;
  name: string;
};

export default function OrgPage() {
  const router = useRouter();
  const [orgs, setOrgs] = useState<Org[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      router.push("/login");
      return;
    }

    fetch(`http://localhost:3001/api/organizations?userId=${userId}`)
      .then(async (res) => {
        if (!res.ok) {
          const text = await res.text();
          throw new Error(text);
        }
        return res.json();
      })
      .then((data) => {
        setOrgs(data);
        setError("");
      })
      .catch((err) => {
        console.error("ORG FETCH ERROR:", err);
        setError("Could not fetch organizations");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [router]);

  if (loading) {
    return <p style={{ padding: 40 }}>Loading organizations...</p>;
  }

  if (error) {
    return <p style={{ color: "red", padding: 40 }}>{error}</p>;
  }

  return (
    <div style={{ padding: 40 }}>
      <h1 style={{ fontSize: 24, marginBottom: 20 }}>
        Select Organization
      </h1>

      {orgs.map((org) => (
        <div key={org.id} style={{ marginBottom: 12 }}>
          <button
            style={{ padding: 12, width: 320, textAlign: "left" }}
            onClick={() => {
              localStorage.setItem("organizationId", org.id);
              router.push("/dashboard");
            }}
          >
            {org.name}
          </button>
        </div>
      ))}
    </div>
  );
}

