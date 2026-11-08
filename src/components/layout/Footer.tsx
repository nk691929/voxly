import Link from "next/link";
import { Logo } from "@/components/shared/Logo";
import { LANDING_PAGES } from "@/config/landing-pages";
import { site } from "@/config/site";

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-10 sm:grid-cols-3">
        <div>
          <Logo />
          <p className="mt-2 text-sm text-muted">{site.tagline}</p>
        </div>
        <nav aria-label="Use cases" className="text-sm">
          <p className="font-semibold">Use cases</p>
          <ul className="mt-3 grid gap-2 text-muted">
            {LANDING_PAGES.map((p) => (
              <li key={p.slug}>
                <Link href={`/${p.slug}`} className="hover:text-fg">{p.h1}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label="Footer" className="text-sm">
          <p className="font-semibold">Voxly</p>
          <ul className="mt-3 grid gap-2 text-muted">
            <li><Link href="/#features" className="hover:text-fg">Features</Link></li>
            <li><Link href="/#pricing" className="hover:text-fg">Pricing</Link></li>
            <li><Link href="/#faq" className="hover:text-fg">FAQ</Link></li>
            <li><Link href="/privacy" className="hover:text-fg">Privacy</Link></li>
            <li><Link href="/terms" className="hover:text-fg">Terms</Link></li>
            <li><Link href="/workspace" className="hover:text-fg">Workspace</Link></li>
          </ul>
        </nav>
      </div>
      <p className="mx-auto max-w-6xl px-5 pb-8 text-xs text-muted">
        &copy; {site.name}. All rights reserved.
      </p>
    </footer>
  );
}
