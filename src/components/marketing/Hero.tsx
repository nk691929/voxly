import Link from "next/link";
import { ArrowRight, Mic } from "lucide-react";
import { site } from "@/config/site";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -top-40 mx-auto h-[28rem] max-w-3xl rounded-full bg-lavender opacity-70 blur-3xl"
      />
      <div className="relative mx-auto grid max-w-6xl gap-12 px-5 pb-20 pt-16 lg:grid-cols-2 lg:items-center lg:pt-24">
        <div className="rise">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1 text-xs font-semibold text-primary">
            <Mic className="h-3.5 w-3.5" aria-hidden="true" /> Voice to finished writing
          </p>
          <h1 className="font-display text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl">
            {site.tagline}
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted">
            Record or upload your voice. Voxly transcribes it, then turns it into a
            professional email, organized notes, an action list or a translation.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/workspace" className="btn btn-primary">
              Try it now <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link href="/#how-it-works" className="btn btn-ghost">
              See how it works
            </Link>
          </div>
        </div>

        <figure className="rise card p-5 sm:p-6" style={{ animationDelay: "0.12s" }}>
          <figcaption className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted">
            Example
          </figcaption>
          <div className="rounded-xl bg-surface-2 p-4">
            <p className="text-xs font-semibold text-primary">You said</p>
            <p className="mt-1 text-sm italic text-muted">
              &ldquo;hey can you tell Sara the report is going to be a day late, I&rsquo;m
              waiting on the numbers from finance, I&rsquo;ll send it Thursday morning&rdquo;
            </p>
          </div>
          <div className="mt-3 rounded-xl border border-line p-4">
            <p className="text-xs font-semibold text-primary">Voxly wrote</p>
            <p className="mt-2 text-sm font-semibold">Subject: Report timing update</p>
            <p className="mt-2 text-sm text-muted">
              Hi Sara, a quick heads-up: the report will be delayed by one day while I wait
              for final figures from Finance. I will send it first thing on Thursday morning.
              Thank you for your patience.
            </p>
          </div>
        </figure>
      </div>
    </section>
  );
}
