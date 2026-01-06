import { prisma } from "../prisma";
import { Role } from "@prisma/client";

export async function requireRole(
  userId: string,
  organizationId: string,
  allowedRoles: Role[]
) {
  const membership = await prisma.membership.findUnique({
    where: {
      userId_organizationId: {
        userId,
        organizationId,
      },
    },
  });

  if (!membership) {
    throw new Error("Access denied: not a member of this organization");
  }

  if (!allowedRoles.includes(membership.role)) {
    throw new Error("Access denied: insufficient permissions");
  }

  return membership;
}

