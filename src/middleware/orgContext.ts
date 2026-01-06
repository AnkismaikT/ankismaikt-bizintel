import { prisma } from "../prisma";
import { PUBLIC_ROUTES } from "../config/publicRoutes";

export async function orgContext(request: any, reply: any) {
  const path = request.url;
  const method = request.method;

  /**
   * 1️⃣ Public routes (no auth, no org)
   */
  if (PUBLIC_ROUTES.some(route => path.startsWith(route))) {
    return;
  }

  const userId = request.headers["x-user-id"];

  if (!userId || typeof userId !== "string") {
    reply.status(401).send({ error: "Missing x-user-id header" });
    return;
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    reply.status(401).send({ error: "Invalid user" });
    return;
  }

  /**
   * 2️⃣ SPECIAL CASES — no active org required
   */

  // Create first or additional organizations
  if (path === "/api/organizations" && method === "POST") {
    request.userId = userId;
    request.organizationId = null;
    return;
  }

  // List organizations (needed before switching)
  if (path === "/api/organizations" && method === "GET") {
    request.userId = userId;
    request.organizationId = null;
    return;
  }

  // Switch active organization
  if (path === "/api/organizations/switch" && method === "POST") {
    request.userId = userId;
    request.organizationId = null;
    return;
  }

  /**
   * 3️⃣ All other routes REQUIRE active organization
   */
  if (!user.activeOrganizationId) {
    reply.status(403).send({ error: "No active organization selected" });
    return;
  }

  /**
   * 4️⃣ Attach context
   */
  request.userId = userId;
  request.organizationId = user.activeOrganizationId;
}

