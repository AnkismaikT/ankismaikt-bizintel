import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const userId = req.headers.get("x-user-id");

  if (!userId) {
    return NextResponse.json(
      { error: "Missing userId" },
      { status: 401 }
    );
  }

  // Forward request to backend API
  const res = await fetch("http://localhost:3001/api/users", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-user-id": userId,
    },
  });

  const data = await res.json();

  return NextResponse.json(data, { status: res.status });
}

