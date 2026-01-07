import { FastifyRequest, FastifyReply } from "fastify";
import { getSession } from "./session";

export async function requireAuth(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const sessionId = req.cookies.session;

  if (!sessionId) {
    return reply.status(401).send({ error: "Unauthorized" });
  }

  const session = await getSession(sessionId);
  if (!session) {
    return reply.status(401).send({ error: "Invalid session" });
  }

  // attach logged-in user to request
  (req as any).user = session.user;
}

