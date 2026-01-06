import { FastifyRequest, FastifyReply } from "fastify";
import { prisma } from "../prisma";

interface CreateOrgBody {
  name: string;
  userId: string;
}

export async function createOrganization(
  req: FastifyRequest<{ Body: CreateOrgBody }>,
  reply: FastifyReply
) {
  const { name, userId } = req.body;

  if (!name || !userId) {
    return reply.status(400).send({ error: "Missing name or userId" });
  }

  // 🔒 HARD GUARD: ONE ORGANIZATION PER USER (V1 RULE)
  const existingMembership = await prisma.organizationMember.findFirst({
    where: { userId },
    include: { organization: true },
  });

  if (existingMembership) {
    // ✅ RETURN EXISTING ORG — STOP LOOP FOREVER
    return reply.send(existingMembership.organization);
  }

  // ✅ CREATE ORGANIZATION
  const organization = await prisma.organization.create({
    data: {
      name,
    },
  });

  // ✅ LINK USER AS OWNER
  await prisma.organizationMember.create({
    data: {
      userId,
      organizationId: organization.id,
      role: "OWNER",
    },
  });

  return reply.send(organization);
}

