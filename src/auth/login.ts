import { FastifyInstance } from "fastify";
import bcrypt from "bcryptjs";
import { prisma } from "../prisma";

export async function loginRoute(app: FastifyInstance) {
  app.post("/login", async (request, reply) => {
    const { email, password } = request.body as {
      email?: string;
      password?: string;
    };

    if (!email || !password) {
      reply.status(400).send({ error: "Email and password are required" });
      return;
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      reply.status(401).send({ error: "Invalid credentials" });
      return;
    }

    const ok = await bcrypt.compare(password, user.password);

    if (!ok) {
      reply.status(401).send({ error: "Invalid credentials" });
      return;
    }

    reply.send({
      userId: user.id,
      email: user.email,
    });
  });
}

