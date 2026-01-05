"use client";

import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "";

const revenueData = [
  { name: "Mon", value: 120 },
  { name: "Tue", value: 210 },
  { name: "Wed", value: 180 },
  { name: "Thu", value: 260 },
  { name: "Fri", value: 320 },
  { name: "Sat", value: 280 },
  { name: "Sun", value: 350 },
];

const userGrowthData = [
  { name: "Mon", value: 12 },
  { name: "Tue", value: 18 },
  { name: "Wed", value: 22 },
  { name: "Thu", value: 30 },
  { name: "Fri", value: 35 },
  { name: "Sat", value: 42 },
  { name: "Sun", value: 48 },
];

export default function DashboardPage() {
  const [orgCount, setOrgCount] = useState<number | null>(null);

  useEffect(() => {
    if (!API_URL) {
      setOrgCount(null);
      return;
    }

    fetch(`${API_URL}/api/organizations`, {
      credentials: "include",
    })
      .then((r) => (r.ok ? r.json() : null))
      .then((data) =>
        setOrgCount(Array.isArray(data) ? data.length : null)
      )
      .catch(() => setOrgCount(null));
  }, []);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Analytics Overview</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="border rounded p-4">
          <p className="text-xs text-zinc-500">Organizations</p>
          <p className="text-2xl font-semibold">
            {orgCount === null ? "—" : orgCount}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="border p-4 h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={revenueData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line dataKey="value" stroke="#2563eb" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="border p-4 h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={userGrowthData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line dataKey="value" stroke="#16a34a" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

