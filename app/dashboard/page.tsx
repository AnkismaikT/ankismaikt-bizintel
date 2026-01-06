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

/* -------------------- MOCK DATA (UI ONLY) -------------------- */
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
  const [orgCount, setOrgCount] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  /* -------------------- FETCH ORGANIZATIONS -------------------- */
  useEffect(() => {
    if (!API_URL) {
      setLoading(false);
      return;
    }

    const fetchOrganizations = async () => {
      try {
        const res = await fetch(`${API_URL}/api/organizations`);
        const data = await res.json();
        setOrgCount(Array.isArray(data) ? data.length : 0);
      } catch (error) {
        console.error("Failed to fetch organizations", error);
        setOrgCount(0);
      } finally {
        setLoading(false);
      }
    };

    fetchOrganizations();
  }, []);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Analytics Overview</h1>

      {/* -------------------- STATS CARDS -------------------- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="border rounded p-4">
          <p className="text-xs text-zinc-500">Organizations</p>
          <p className="text-2xl font-semibold">
            {loading ? "—" : orgCount}
          </p>
        </div>
      </div>

      {/* -------------------- CHARTS -------------------- */}
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

