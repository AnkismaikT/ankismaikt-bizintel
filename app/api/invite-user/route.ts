import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const userId = req.headers.get("x-user-id");

  if (!userId) {
    return NextResponse.json(
      { error: "Missing userId" },
      { status: 401 }
    );
  }

  const body = await req.json();

  const res = await fetch("http://localhost:3001/api/invite-user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-user-id": userId,
    },
    body: JSON.stringify(body),
  });

  const data = await res.json();

  return NextResponse.json(data, { status: res.status });
}

