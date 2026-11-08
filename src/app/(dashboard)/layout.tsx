import type { Metadata } from "next";
import Link from "next/link";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { Logo } from "@/components/shared/Logo";
import { SignOutButton } from "@/features/authentication/components/SignOutButton";

export const metadata: Metadata = {
  title: "Workspace",
  robots: { index: false, follow: false },
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <header className="border-b border-line bg-surface">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between gap-3 px-5">
          <div className="flex items-center gap-6">
            <Link href="/" aria-label="Voxly home">
              <Logo />
            </Link>
            <nav aria-label="App" className="flex gap-4 text-sm font-medium">
              <Link href="/workspace" className="text-muted hover:text-fg">Workspace</Link>
              <Link href="/history" className="text-muted hover:text-fg">History</Link>
            </nav>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <SignOutButton />
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-5 py-10">{children}</main>
    </div>
  );
}
