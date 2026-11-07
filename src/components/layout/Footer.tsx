import Link from "next/link";
import { Logo } from "@/components/shared/Logo";
import { site } from "@/config/site";

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Logo />
          <p className="mt-2 text-sm text-muted">{site.tagline}</p>
        </div>
        <nav aria-label="Footer" className="flex flex-wrap gap-6 text-sm text-muted">
          <Link href="/#features" className="hover:text-fg">Features</Link>
          <Link href="/#pricing" className="hover:text-fg">Pricing</Link>
          <Link href="/#faq" className="hover:text-fg">FAQ</Link>
          <Link href="/workspace" className="hover:text-fg">Workspace</Link>
        </nav>
      </div>
      <p className="mx-auto max-w-6xl px-5 pb-8 text-xs text-muted">
        &copy; {site.name}. All rights reserved.
      </p>
    </footer>
  );
}
