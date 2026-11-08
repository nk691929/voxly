import type { Metadata } from "next";
import { AuthForm } from "@/features/authentication/components/AuthForm";

export const metadata: Metadata = { title: "Create account" };

export default function SignupPage() {
  return <AuthForm mode="signup" />;
}
