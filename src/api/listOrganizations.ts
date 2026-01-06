import { prisma } from "../prisma";

export async function listOrganizationsHandler(userId?: string) {
  if (!userId) {
    return {
      status: 401,
      error: "Unauthorized",
    };
  }

  const memberships = await prisma.membership.findMany({
    where: { userId },
    include: {
      organization: true,
    },
  });

  const organizations = memberships.map(m => ({
    id: m.organization.id,
    name: m.organization.name,
    role: m.role,
  }));

  return {
    status: 200,
    organizations,
  };
}

