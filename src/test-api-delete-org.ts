import { prisma } from "./prisma";
import { deleteOrganizationHandler } from "./api/deleteOrganization";

async function main() {
  const user = await prisma.user.findFirst();
  const org = await prisma.organization.findFirst();

  if (!user || !org) {
    throw new Error("User or Organization missing");
  }

  const response = await deleteOrganizationHandler({
    userId: user.id,
    organizationId: org.id,
  });

  console.log(response);
}

main()
  .catch(err => {
    console.error("ERROR:", err.message);
  })
  .finally(() => prisma.$disconnect());

