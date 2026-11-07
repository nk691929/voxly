import Link from "next/link";
import { Menu } from "lucide-react";
import { Logo } from "@/components/shared/Logo";
import { ThemeToggle } from "./ThemeToggle";

const links = [
  { href: "/#features", label: "Features" },
  { href: "/#how-it-works", label: "How it works" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/#faq", label: "FAQ" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <Link href="/" aria-label="Voxly home">
          <Logo />
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="text-sm font-medium text-muted hover:text-fg">
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link href="/workspace" className="btn btn-primary hidden sm:inline-flex">
            Try Voxly
          </Link>
          {/* Mobile menu uses the built-in <details> element: works without JavaScript. */}
          <details className="relative md:hidden">
            <summary className="btn-icon list-none" aria-label="Open menu">
              <Menu className="h-4 w-4" aria-hidden="true" />
            </summary>
            <div className="card absolute right-0 mt-2 w-56 p-2">
              {links.map((l) => (
                <Link key={l.href} href={l.href} className="block rounded-lg px-3 py-2 text-sm hover:bg-surface-2">
                  {l.label}
                </Link>
              ))}
              <Link href="/workspace" className="block rounded-lg px-3 py-2 text-sm font-semibold text-primary hover:bg-surface-2">
                Try Voxly
              </Link>
            </div>
          </details>
        </div>
      </div>
    </header>
  );
}
