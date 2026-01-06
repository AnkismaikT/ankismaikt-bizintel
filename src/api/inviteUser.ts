import { inviteUserToOrganization } from "../organizations/inviteUser";

export async function inviteUserHandler(
  organizationId: string,
  body: { email: string },
  inviterUserId?: string
) {
  const { email } = body;

  if (!organizationId || !email || !inviterUserId) {
    return {
      status: 400,
      error: "organizationId, email and inviterUserId are required",
    };
  }

  try {
    // ✅ Delegate to real SaaS logic (OWNER-only, PENDING invite)
    await inviteUserToOrganization({
      inviterId: inviterUserId,
      organizationId,
      email,
    });

    return {
      status: 200,
      message: "Invite sent successfully",
    };
  } catch (error: any) {
    return {
      status: 400,
      error: error.message ?? "Failed to invite user",
    };
  }
}

