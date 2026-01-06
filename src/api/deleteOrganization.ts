import { prisma } from "../prisma";
import { requireRole } from "../authz/requireRole";

/**
 * DELETE /api/organizations/:id
 */
export async function deleteOrganizationHandler(body: {
  userId?: string;
  organizationId?: string;
}) {
  if (!body.userId || !body.organizationId) {
    return {
      status: 400,
      error: "userId and organizationId are required",
    };
  }

  // Authorize: must be OWNER
  await requireRole(
    body.userId,
    body.organizationId,
    ["OWNER"]
  );

  await prisma.organization.delete({
    where: { id: body.organizationId },
  });

  return {
    status: 200,
    data: "Organization deleted",
  };
}

