import Fastify from "fastify";
import cors from "@fastify/cors";
import cookie from "@fastify/cookie";

import { organizationRoutes } from "./routes/organizations";
import { inviteRoutes } from "./routes/invites";
import { authRoutes } from "./routes/auth";

const app = Fastify({ logger: true });

// Enable CORS
await app.register(cors, {
  origin: true,
  credentials: true,
});

// Enable Cookies (REQUIRED for auth)
await app.register(cookie);

// Health check
app.get("/health", async () => {
  return { status: "ok" };
});

// ✅ REGISTER ROUTES
await app.register(authRoutes);
await app.register(organizationRoutes);
await app.register(inviteRoutes);

// Start server
await app.listen({
  port: 3001,
  host: "0.0.0.0",
});

