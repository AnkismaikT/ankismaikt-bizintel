import { prisma } from "./prisma";
import { createOrganizationHandler } from "./api/createOrganization";

async function main() {
  const user = await prisma.user.findFirst();

  if (!user) {
    throw new Error("No users found. Register a user first.");
  }

  const response = await createOrganizationHandler({
    userId: user.id,
    name: "Ankismaikt API Workspace",
  });

  console.log(response);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());

