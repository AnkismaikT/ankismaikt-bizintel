import { FastifyInstance } from "fastify";
import { prisma } from "../prisma";
import { createSession } from "../auth/session";

export async function authRoutes(app: FastifyInstance) {

  // LOGIN
  app.post("/api/login", async (req, reply) => {
    const { email } = req.body as { email?: string };

    if (!email) {
      return reply.status(400).send({ error: "Email required" });
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return reply.status(401).send({ error: "Invalid login" });
    }

    const session = await createSession(user.id);

    reply.setCookie("session", session.id, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
    });

    return { success: true };
  });

  // LOGOUT
  app.post("/api/logout", async (_req, reply) => {
    reply.clearCookie("session", { path: "/" });
    return { success: true };
  });
}

