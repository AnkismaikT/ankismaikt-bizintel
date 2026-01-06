import Fastify from "fastify";
import cors from "@fastify/cors";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";

import { userRoutes } from "./users/routes";

const app = Fastify({ logger: true });
const prisma = new PrismaClient();

/* -------------------- CORS -------------------- */
await app.register(cors, {
  origin: true,
  credentials: true,
});

/* -------------------- LOGIN -------------------- */
app.post("/login", async (request, reply) => {
  const { email, password } = request.body as {
    email: string;
    password: string;
  };

  if (!email || !password) {
    return reply.status(400).send({ error: "Email and password required" });
  }

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return reply.status(401).send({ error: "Invalid credentials" });
  }

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) {
    return reply.status(401).send({ error: "Invalid credentials" });
  }

  return reply.send({
    userId: user.id,
    email: user.email,
  });
});

/* -------------------- ORGANIZATIONS (PUBLIC) -------------------- */
app.get("/api/organizations", async () => {
  const orgs = await prisma.organization.findMany();
  return orgs;
});

/* -------------------- USERS (PUBLIC) -------------------- */
await app.register(userRoutes);

/* -------------------- START SERVER -------------------- */
const start = async () => {
  try {
    await app.listen({
      port: Number(process.env.PORT) || 3001,
      host: "0.0.0.0",
    });
    console.log("🚀 Server running");
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();

