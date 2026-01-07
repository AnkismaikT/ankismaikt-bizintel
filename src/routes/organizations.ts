import { FastifyInstance } from "fastify";
import { prisma } from "../prisma";

export async function organizationRoutes(app: FastifyInstance) {
  app.get("/api/me/active-org", async (req, reply) => {
    const userId = req.headers["x-user-id"] as string;

    if (!userId) {
      return reply.status(401).send({ error: "Unauthorized" });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { activeOrganizationId: true },
    });

    if (!user?.activeOrganizationId) {
      return reply.status(400).send({ error: "No active organization" });
    }

    return { activeOrganizationId: user.activeOrganizationId };
  });
}

