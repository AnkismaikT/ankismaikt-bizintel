import { prisma } from "../prisma";

export async function createSession(userId: string) {
  const expiresAt = new Date(
    Date.now() + 1000 * 60 * 60 * 24 * 7 // 7 days
  );

  const session = await prisma.session.create({
    data: {
      userId,
      expiresAt,
    },
  });

  return session;
}

export async function getSession(sessionId: string) {
  if (!sessionId) return null;

  const session = await prisma.session.findUnique({
    where: { id: sessionId },
    include: { user: true },
  });

  if (!session) return null;
  if (session.expiresAt < new Date()) return null;

  return session;
}

