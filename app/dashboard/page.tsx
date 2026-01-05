"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useEffect, useState } from "react";

/* ================= ENV ================= */
const API_URL = process.env.NEXT_PUBLIC_API_URL;

/* ================= MOCK CHART DATA (UNCHANGED) ================= */

// Revenue data (Blue)
const revenueData = [
  { name: "Mon", value: 120 },
  { name: "Tue", value: 210 },
  { name: "Wed", value: 180 },
  { name: "Thu", value: 260 },
  { name: "Fri", value: 320 },
  { name: "Sat", value: 280 },
  { name: "Sun", value: 350 },
];

// User growth data (Green)
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
  const [loading, setLoading] = useState(true);
  const [orgCount, setOrgCount] = useState<number | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);

    async function fetchOrganizations() {
      try {
        const res = await fetch(`${API_URL}/api/organizations`, {
          credentials: "include",
        });

        if (!res.ok) throw new Error("Failed to fetch");

        const data = await res.json();
        setOrgCount(Array.isArray(data) ? data.length : 0);
      } catch {
        setOrgCount(null);
      }
    }

    fetchOrganizations();

    return () => clearTimeout(timer);
  }, []);

  const hasData =
    revenueData.length > 0 && userGrowthData.length > 0;

  return (
    <div className="p-6 space-y-6">

      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold text-zinc-900 dark:text-white">
          Analytics Overview
        </h1>

        <div className="flex items-center gap-2 text-sm text-zinc-500">
          <span className="font-medium text-zinc-700 dark:text-zinc-300">
            AnkismaikT BizIntel
          </span>
          <span className="text-zinc-400">/</span>
          <span>Default Workspace</span>
        </div>

        <p className="text-sm text-zinc-500">
          Revenue and user growth performance
        </p>
      </div>

      {/* ================= TOP METRICS ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

        {/* Revenue */}
        <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-4">
          <p className="text-xs text-zinc-500">Total Revenue</p>
          <p className="mt-1 text-2xl font-semibold text-zinc-900 dark:text-white">
            ₹12.4L
          </p>
          <p className="mt-1 text-xs text-blue-600">
            +12% this week
          </p>
        </div>

        {/* Users (still mock) */}
        <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-4">
          <p className="text-xs text-zinc-500">Active Users</p>
          <p className="mt-1 text-2xl font-semibold text-zinc-900 dark:text-white">
            1,248
          </p>
          <p className="mt-1 text-xs text-green-600">
            +84 new users
          </p>
        </div>

        {/* Organizations (REAL DATA) */}
        <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-4">
          <p className="text-xs text-zinc-500">Organizations</p>
          <p className="mt-1 text-2xl font-semibold text-zinc-900 dark:text-white">
            {orgCount === null ? "—" : orgCount}
          </p>
          <p className="mt-1 text-xs text-zinc-500">
            Live from backend
          </p>
        </div>

        {/* System Health */}
        <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-4">
          <p className="text-xs text-zinc-500">System Health</p>
          <p className="mt-1 text-2xl font-semibold text-zinc-900 dark:text-white">
            99.9%
          </p>
          <p className="mt-1 text-xs text-zinc-500">
            Uptime
          </p>
        </div>

      </div>

      {/* ================= LOADING STATE ================= */}
      {loading && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {[1, 2].map((i) => (
            <div
              key={i}
              className="h-72 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 animate-pulse"
            />
          ))}
        </div>
      )}

      {/* ================= EMPTY STATE ================= */}
      {!loading && !hasData && (
        <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-10 text-center">
          <h2 className="text-sm font-medium text-zinc-900 dark:text-white">
            No analytics data yet
          </h2>
          <p className="mt-1 text-sm text-zinc-500">
            Data will appear here once activity starts.
          </p>
        </div>
      )}

      {/* ================= CHARTS ================= */}
      {!loading && hasData && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

          {/* Revenue Chart */}
          <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-4 shadow-sm">
            <h2 className="mb-4 text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Revenue Trend
            </h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueData}>
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#2563eb"
                    strokeWidth={2.5}
                    dot={{ r: 3 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* User Growth Chart */}
          <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-4 shadow-sm">
            <h2 className="mb-4 text-sm font-medium text-zinc-700 dark:text-zinc-300">
              User Growth
            </h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={userGrowthData}>
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#16a34a"
                    strokeWidth={2.5}
                    dot={{ r: 3 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}

