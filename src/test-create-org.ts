import { prisma } from "./prisma";
import { createOrganization } from "./organizations/createOrganization";

async function main() {
  const user = await prisma.user.findFirst();

  if (!user) {
    throw new Error("No users found. Register a user first.");
  }

  const org = await createOrganization(
    user.id,
    "Ankismaikt Primary Workspace"
  );

  console.log("ORGANIZATION CREATED:", org);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());

