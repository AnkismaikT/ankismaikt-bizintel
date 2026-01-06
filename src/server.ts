import Fastify from "fastify";
import cors from "@fastify/cors";
import { organizationRoutes } from "./organizations/routes";

const app = Fastify({ logger: true });

await app.register(cors, { origin: true });

// ✅ REGISTER ORGANIZATION ROUTES (THIS WAS MISSING)
await app.register(organizationRoutes);

// optional health
app.get("/health", async () => {
  return { status: "ok" };
});

await app.listen({ port: 3001, host: "0.0.0.0" });

