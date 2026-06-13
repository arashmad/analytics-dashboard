type SendResetPasswordEmailInput = {
  email: string;
  resetUrl: string;
};

export async function sendResetPasswordEmail({
  email,
  resetUrl,
}: SendResetPasswordEmailInput) {
  // Local-development placeholder.
  // A real email provider can be added later without changing the auth flow.
  console.info("Password reset requested.");
  console.info(`Email: ${email}`);
  console.info(`Reset URL: ${resetUrl}`);
}
