import type { Metadata } from "next";
import { ChangePasswordForm } from "@/features/account/components/ChangePasswordForm";

export const metadata: Metadata = { title: "Change password" };

export default function ChangePasswordPage() {
  return <ChangePasswordForm />;
}
