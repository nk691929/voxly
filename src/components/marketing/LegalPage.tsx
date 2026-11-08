export function LegalPage({ title, updated, children }: { title: string; updated: string; children: React.ReactNode }) {
  return (
    <article className="mx-auto max-w-3xl px-5 py-16">
      <h1 className="font-display text-4xl font-semibold tracking-tight">{title}</h1>
      <p className="mt-2 text-sm text-muted">Last updated: {updated}</p>
      <p role="note" className="mt-6 rounded-xl border border-line bg-lavender px-4 py-3 text-sm">
        Draft. This text describes how the product works today and has not been reviewed by a lawyer.
        It must be reviewed and completed before any public launch.
      </p>
      <div className="mt-8 grid gap-6 text-sm leading-relaxed text-muted [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:text-fg [&_li]:ml-5 [&_li]:list-disc">
        {children}
      </div>
    </article>
  );
}
