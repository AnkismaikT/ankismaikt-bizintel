import { prisma } from "../prisma";

export async function switchOrganizationHandler(
  userId?: string,
  organizationId?: string
) {
  if (!userId || !organizationId) {
    return {
      status: 400,
      error: "userId and organizationId are required",
    };
  }

  // 1️⃣ Verify membership
  const membership = await prisma.membership.findUnique({
    where: {
      userId_organizationId: {
        userId,
        organizationId,
      },
    },
  });

  if (!membership) {
    return {
      status: 403,
      error: "Not a member of this organization",
    };
  }

  // 2️⃣ Update active organization
  await prisma.user.update({
    where: { id: userId },
    data: {
      activeOrganizationId: organizationId,
    },
  });

  return {
    status: 200,
    organizationId,
  };
}

