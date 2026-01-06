import { prisma } from "../prisma";

export async function acceptInviteHandler(params: {
  userId: string;
  organizationId: string;
}) {
  const { userId, organizationId } = params;

  if (!userId || !organizationId) {
    return {
      status: 400,
      error: "userId and organizationId are required",
    };
  }

  // 🔒 Find pending invite for this user + org
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    return {
      status: 404,
      error: "User not found",
    };
  }

  const invite = await prisma.organizationInvite.findFirst({
    where: {
      email: user.email,
      organizationId,
      status: "PENDING",
    },
  });

  if (!invite) {
    return {
      status: 404,
      error: "Invite not found or already accepted",
    };
  }

  // 🔒 Prevent duplicate membership
  const existingMembership =
    await prisma.organizationMember.findFirst({
      where: {
        userId,
        organizationId,
      },
    });

  if (existingMembership) {
    return {
      status: 409,
      error: "User is already a member",
    };
  }

  // ✅ Create membership
  await prisma.organizationMember.create({
    data: {
      userId,
      organizationId,
      role: "MEMBER",
    },
  });

  // ✅ Mark invite as accepted
  await prisma.organizationInvite.update({
    where: { id: invite.id },
    data: { status: "ACCEPTED" },
  });

  return {
    status: 200,
    organizationId,
  };
}

