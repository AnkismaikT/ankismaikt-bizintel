import { prisma } from "../prisma";

export async function inviteUserHandler(
  organizationId: string,
  body: any,
  inviterUserId?: string
) {
  const { email, role } = body;

  if (!organizationId || !email || !inviterUserId) {
    return {
      status: 400,
      error: "organizationId, email and inviterUserId are required",
    };
  }

  // 1️⃣ Verify inviter is a member
  const inviterMembership = await prisma.membership.findUnique({
    where: {
      userId_organizationId: {
        userId: inviterUserId,
        organizationId,
      },
    },
  });

  if (!inviterMembership) {
    return {
      status: 403,
      error: "Not authorized to invite users to this organization",
    };
  }

  // 2️⃣ Find invited user
  const invitedUser = await prisma.user.findUnique({
    where: { email },
  });

  if (!invitedUser) {
    return {
      status: 404,
      error: "User with this email does not exist",
    };
  }

  // 3️⃣ Prevent duplicate membership
  const existingMembership = await prisma.membership.findUnique({
    where: {
      userId_organizationId: {
        userId: invitedUser.id,
        organizationId,
      },
    },
  });

  if (existingMembership) {
    return {
      status: 409,
      error: "User already belongs to this organization",
    };
  }

  // 4️⃣ Create membership
  await prisma.membership.create({
    data: {
      userId: invitedUser.id,
      organizationId,
      role: role ?? "MEMBER",
    },
  });

  // 5️⃣ Auto-set active org if none
  if (!invitedUser.activeOrganizationId) {
    await prisma.user.update({
      where: { id: invitedUser.id },
      data: {
        activeOrganizationId: organizationId,
      },
    });
  }

  return {
    status: 200,
    message: "User invited successfully",
  };
}

