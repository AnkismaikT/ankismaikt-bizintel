import { prisma } from "../prisma";

export async function createOrganizationHandler(
  body: any,
  userId?: string
) {
  const { name } = body;

  if (!userId || !name) {
    return {
      status: 400,
      error: "userId and name are required",
    };
  }

  // 1️⃣ Create organization
  const organization = await prisma.organization.create({
    data: {
      name,
      ownerId: userId,
    },
  });

  // 2️⃣ Create membership (OWNER)
  await prisma.membership.create({
    data: {
      userId,
      organizationId: organization.id,
      role: "OWNER",
    },
  });

  return {
    status: 201,
    organization,
  };
}

