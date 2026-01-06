import { prisma } from "../prisma";
import { requireRole } from "../authz/requireRole";
import { Role } from "@prisma/client";

export async function inviteUserToOrganization(params: {
  inviterId: string;
  organizationId: string;
  email: string;
  role?: Role;
}) {
  const { inviterId, organizationId, email, role = "MEMBER" } = params;

  // 1. Authorization: only OWNER or ADMIN can invite
  await requireRole(inviterId, organizationId, ["OWNER", "ADMIN"]);

  // 2. Check if user exists
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new Error("User with this email does not exist");
  }

  // 3. Prevent duplicate membership
  const existingMembership = await prisma.membership.findUnique({
    where: {
      userId_organizationId: {
        userId: user.id,
        organizationId,
      },
    },
  });

  if (existingMembership) {
    throw new Error("User is already a member of this organization");
  }

  // 4. Create membership
  const membership = await prisma.membership.create({
    data: {
      userId: user.id,
      organizationId,
      role,
    },
  });

  // 5. Auto-set active organization if not already set
  if (!user.activeOrganizationId) {
    await prisma.user.update({
      where: { id: user.id },
      data: {
        activeOrganizationId: organizationId,
      },
    });
  }

  return membership;
}

