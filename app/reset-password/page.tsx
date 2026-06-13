import { ResetPasswordForm } from "@/features/auth/ui/reset-password-form";

type ResetPasswordPageProps = {
  searchParams: Promise<{
    token?: string | string[];
    error?: string | string[];
  }>;
};

function getFirstSearchParam(value: string | string[] | undefined) {
  if (Array.isArray(value)) {
    return value[0];
  }

  return value;
}

export default async function ResetPasswordPage({
  searchParams,
}: ResetPasswordPageProps) {
  const params = await searchParams;

  const token = getFirstSearchParam(params.token);
  const error = getFirstSearchParam(params.error);

  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-10">
      {/* 
      // ! It smells.
       */}
      <ResetPasswordForm
        {...(error !== undefined ? { error } : {})}
        {...(token !== undefined ? { token } : {})}
      />
    </main>
  );
}
