import { loginUser } from "./auth/login";

async function main() {
  const user = await loginUser(
    "admin@ankismaikt.com",
    "password123"
  );

  console.log("LOGIN SUCCESS:", user);
}

main().catch(err => {
  console.error("LOGIN FAILED:", err.message);
});

