import { prisma } from "../prisma";
import { requireRole } from "../authz/requireRole";

export async function inviteUserToOrganization(params: {
  inviterId: string;
  organizationId: string;
  email: string;
}) {
  const { inviterId, organizationId, email } = params;

  // 🔒 Only OWNER can invite users (V1 rule)
  await requireRole(inviterId, organizationId, ["OWNER"]);

  // 🔒 Prevent duplicate pending invite
  const existingInvite = await prisma.organizationInvite.findFirst({
    where: {
      email,
      organizationId,
      status: "PENDING",
    },
  });

  if (existingInvite) {
    throw new Error("Invite already sent to this email");
  }

  // 🔒 Prevent inviting existing member
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    const existingMembership =
      await prisma.organizationMember.findFirst({
        where: {
          userId: existingUser.id,
          organizationId,
        },
      });

    if (existingMembership) {
      throw new Error("User is already a member of this organization");
    }
  }

  // ✅ Create PENDING invite (NO membership yet)
  const invite = await prisma.organizationInvite.create({
    data: {
      email,
      organizationId,
      invitedByUserId: inviterId,
      status: "PENDING",
    },
  });

  return invite;
}

