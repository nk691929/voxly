import type { Metadata } from "next";
import { ForgotPasswordForm } from "@/features/authentication/components/ForgotPasswordForm";

export const metadata: Metadata = { title: "Reset password" };

export default function ForgotPasswordPage() {
  return <ForgotPasswordForm />;
}
