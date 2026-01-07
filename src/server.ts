import Fastify from "fastify";
import cors from "@fastify/cors";

import { organizationRoutes } from "./routes/organizations";
import { inviteRoutes } from "./routes/invites";

const app = Fastify({ logger: true });

// Enable CORS
await app.register(cors, { origin: true });

// ✅ REGISTER ROUTES (CRITICAL)
await app.register(organizationRoutes);
await app.register(inviteRoutes);

// Health check
app.get("/health", async () => {
  return { status: "ok" };
});

// Start server
await app.listen({
  port: 3001,
  host: "0.0.0.0",
});

