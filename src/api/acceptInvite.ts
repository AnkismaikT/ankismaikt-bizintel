import { prisma } from "../prisma";

export async function acceptInviteHandler(
  userId?: string,
  organizationId?: string
) {
  if (!userId || !organizationId) {
    return {
      status: 400,
      error: "userId and organizationId are required",
    };
  }

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
      status: 404,
      error: "Invite not found",
    };
  }

  // Set active org
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

