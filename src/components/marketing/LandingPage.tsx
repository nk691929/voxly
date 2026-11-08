import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { JsonLd } from "@/components/shared/JsonLd";
import { LANDING_PAGES, type LandingPageData } from "@/config/landing-pages";
import { site } from "@/config/site";

export function LandingPage({ page }: { page: LandingPageData }) {
  const related = LANDING_PAGES.filter((p) => page.related.includes(p.slug));

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: site.name, item: site.url },
            { "@type": "ListItem", position: 2, name: page.h1, item: `${site.url}/${page.slug}` },
          ],
        }}
      />
      <section className="mx-auto max-w-4xl px-5 pb-12 pt-16">
        <h1 className="font-display text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">{page.h1}</h1>
        <p className="mt-5 max-w-2xl text-lg text-muted">{page.intro}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/workspace" className="btn btn-primary">
            Try it now <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <Link href="/#pricing" className="btn btn-ghost">See pricing</Link>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-5 pb-12" aria-labelledby="example-title">
        <h2 id="example-title" className="text-2xl font-semibold">Example</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <div className="card p-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-primary">You said</p>
            <p className="mt-2 text-sm italic text-muted">{page.exampleSaid}</p>
          </div>
          <div className="card p-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-primary">Voxly wrote</p>
            <pre className="mt-2 whitespace-pre-wrap break-words font-sans text-sm text-muted">{page.exampleOutput}</pre>
          </div>
        </div>
        <p className="mt-3 text-xs text-muted">An illustration of the kind of result you can expect. Results vary with what you say.</p>
      </section>

      <section className="mx-auto max-w-4xl px-5 pb-12" aria-labelledby="benefits-title">
        <h2 id="benefits-title" className="text-2xl font-semibold">Why people use it</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {page.benefits.map((b) => (
            <article key={b.title} className="card p-5">
              <h3 className="font-semibold">{b.title}</h3>
              <p className="mt-2 text-sm text-muted">{b.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-surface-2">
        <div className="mx-auto max-w-4xl px-5 py-12">
          <h2 className="text-2xl font-semibold">How it works</h2>
          <ol className="mt-5 grid gap-4 md:grid-cols-3">
            {page.steps.map((s, i) => (
              <li key={s.title} className="card p-5">
                <span className="font-display text-3xl font-semibold text-primary">{i + 1}</span>
                <h3 className="mt-2 font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm text-muted">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-5 py-12" aria-labelledby="faq-title">
        <h2 id="faq-title" className="text-2xl font-semibold">Questions</h2>
        <div className="mt-5 divide-y divide-line rounded-2xl border border-line bg-surface">
          {page.faqs.map((f) => (
            <details key={f.q} className="p-5">
              <summary className="cursor-pointer list-none font-semibold">{f.q}</summary>
              <p className="mt-3 text-sm text-muted">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-5 pb-20" aria-labelledby="related-title">
        <h2 id="related-title" className="text-lg font-semibold">More ways to use Voxly</h2>
        <ul className="mt-3 flex flex-wrap gap-3">
          {related.map((r) => (
            <li key={r.slug}>
              <Link href={`/${r.slug}`} className="btn btn-ghost">{r.h1}</Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
