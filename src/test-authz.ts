import { prisma } from "./prisma";
import { requireRole } from "./authz/requireRole";

async function main() {
  const user = await prisma.user.findFirst();
  const org = await prisma.organization.findFirst();

  if (!user || !org) {
    throw new Error("User or Organization missing");
  }

  // This should pass (OWNER)
  await requireRole(user.id, org.id, ["OWNER", "ADMIN"]);
  console.log("ACCESS GRANTED");
}

main()
  .catch(err => {
    console.error("ACCESS DENIED:", err.message);
  })
  .finally(() => prisma.$disconnect());

