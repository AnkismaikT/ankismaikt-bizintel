import { FastifyInstance } from "fastify";
import { prisma } from "../prisma";
import { createOrganization } from "./createOrganization";

export async function organizationRoutes(fastify: FastifyInstance) {

  // ✅ LIST organizations (already working)
  fastify.get("/api/organizations", async () => {
    return prisma.organization.findMany();
  });

  // ✅ CREATE organization (THIS WAS MISSING AT RUNTIME)
  fastify.post("/api/organizations", async (request, reply) => {
    const { userId, name } = request.body as {
      userId: string;
      name: string;
    };

    if (!userId || !name) {
      return reply.code(400).send({ error: "userId and name required" });
    }

    const org = await createOrganization(userId, name);
    return reply.send(org);
  });
}

