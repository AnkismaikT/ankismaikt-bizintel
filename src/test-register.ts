import { registerUser } from "./auth/register";

async function main() {
  const user = await registerUser(
    "admin@ankismaikt.com",
    "password123",
    "Pradeep"
  );

  console.log("USER CREATED:", user);
}

main().catch(err => {
  console.error("REGISTER FAILED:", err.message);
});

