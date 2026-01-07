import { FastifyInstance } from "fastify";
import { prisma } from "../prisma";

export async function inviteRoutes(app: FastifyInstance) {

  // CREATE INVITE
  app.post("/api/invites", async (req, reply) => {
    const { email, organizationId } = req.body as {
      email?: string;
      organizationId?: string;
    };

    if (!email || !organizationId) {
      return reply.status(400).send({ error: "Missing fields" });
    }

    // ✅ REAL EMAIL VALIDATION (PRODUCTION)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return reply.status(400).send({ error: "Invalid email" });
    }

    const invite = await prisma.invite.create({
      data: {
        email,
        organizationId,
        status: "pending",
      },
    });

    return { invite };
  });

  // LIST PENDING INVITES
  app.get("/api/invites", async (req, reply) => {
    const { organizationId } = req.query as { organizationId?: string };

    if (!organizationId) {
      return reply.status(400).send({ error: "organizationId required" });
    }

    const invites = await prisma.invite.findMany({
      where: { organizationId, status: "pending" },
      orderBy: { createdAt: "desc" },
    });

    return { invites };
  });

  // ACCEPT INVITE
  app.post("/api/invites/accept", async (req, reply) => {
    const { inviteId, userId } = req.body as {
      inviteId?: string;
      userId?: string;
    };

    if (!inviteId || !userId) {
      return reply.status(400).send({ error: "Missing fields" });
    }

    const invite = await prisma.invite.findUnique({
      where: { id: inviteId },
    });

    if (!invite || invite.status !== "pending") {
      return reply.status(400).send({ error: "Invalid invite" });
    }

    // ✅ ADD MEMBERSHIP (CORRECT DATA MODEL)
    await prisma.membership.create({
      data: {
        userId,
        organizationId: invite.organizationId,
        role: "MEMBER",
      },
    });

    // ✅ SET ACTIVE ORG
    await prisma.user.update({
      where: { id: userId },
      data: { activeOrganizationId: invite.organizationId },
    });

    await prisma.invite.update({
      where: { id: inviteId },
      data: { status: "accepted" },
    });

    return { success: true };
  });
}

