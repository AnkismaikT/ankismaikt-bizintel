import { FastifyInstance } from "fastify";
import bcrypt from "bcryptjs";
import { prisma } from "../prisma";

export async function signupRoute(app: FastifyInstance) {
  app.post("/signup", async (request, reply) => {
    const { email, password, name } = request.body as {
      email?: string;
      password?: string;
      name?: string;
    };

    if (!email || !password) {
      reply.status(400).send({ error: "Email and password are required" });
      return;
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      reply.status(409).send({ error: "User already exists" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // 1️⃣ Create user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
    });

    // 2️⃣ Create organization
    const organization = await prisma.organization.create({
      data: {
        name: `${name ?? "My"} Workspace`,
        ownerId: user.id,
      },
    });

    // 3️⃣ Create membership (OWNER)
    await prisma.membership.create({
      data: {
        userId: user.id,
        organizationId: organization.id,
        role: "OWNER",
      },
    });

    // 4️⃣ Set active organization
    await prisma.user.update({
      where: { id: user.id },
      data: {
        activeOrganizationId: organization.id,
      },
    });

    reply.status(201).send({
      userId: user.id,
      organizationId: organization.id,
      email: user.email,
    });
  });
}

