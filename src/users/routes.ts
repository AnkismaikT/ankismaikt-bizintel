import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";

export async function userRoutes(fastify: FastifyInstance) {
  // ✅ PUBLIC: list users (dashboard safe)
  fastify.get("/api/users", async () => {
    const users = await prisma.user.findMany();
    return users;
  });
}

