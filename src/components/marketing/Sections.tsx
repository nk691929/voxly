import Link from "next/link";
import { Check, FileText, Languages, ListChecks, Mail, Pencil, Mic, Sparkles } from "lucide-react";
import { LANGUAGES, PLANS } from "@/config/plans";

function SectionHeading({ id, eyebrow, title, intro }: { id?: string; eyebrow: string; title: string; intro?: string }) {
  return (
    <div id={id} className="mx-auto max-w-2xl text-center">
      <p className="text-sm font-semibold uppercase tracking-wider text-primary">{eyebrow}</p>
      <h2 className="mt-2 font-display text-4xl font-semibold tracking-tight">{title}</h2>
      {intro && <p className="mt-4 text-muted">{intro}</p>}
    </div>
  );
}

const features = [
  { icon: Mail, title: "Voice to email", text: "Ramble naturally. Get a clear email in the tone you choose." },
  { icon: FileText, title: "Voice to notes", text: "Turn meetings and thoughts into tidy, structured notes." },
  { icon: ListChecks, title: "Voice to tasks", text: "Pull out the action items hiding in what you said." },
  { icon: Languages, title: "Voice to translation", text: "Speak in one language and get text in another." },
  { icon: Pencil, title: "Edit before you generate", text: "Fix the transcript first, then regenerate as often as you like." },
  { icon: Mic, title: "Record or upload", text: "Use your microphone or bring an existing audio file." },
];

export function Features() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-20">
      <SectionHeading id="features" eyebrow="Features" title="Everything you need to stop typing" />
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {features.map(({ icon: Icon, title, text }) => (
          <article key={title} className="card p-6">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-lavender text-primary">
              <Icon className="h-5 w-5" aria-hidden="true" />
            </span>
            <h3 className="mt-4 text-lg font-semibold">{title}</h3>
            <p className="mt-2 text-sm text-muted">{text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

const steps = [
  { n: "1", title: "Speak", text: "Record in your browser or upload an audio file." },
  { n: "2", title: "Review", text: "Check and edit the transcript so it says what you meant." },
  { n: "3", title: "Generate", text: "Pick an email, notes, tasks or a translation and copy the result." },
];

export function HowItWorks() {
  return (
    <section className="bg-surface-2">
      <div className="mx-auto max-w-6xl px-5 py-20">
        <SectionHeading id="how-it-works" eyebrow="How it works" title="Three steps from voice to done" />
        <ol className="mt-12 grid gap-6 md:grid-cols-3">
          {steps.map((s) => (
            <li key={s.n} className="card p-6">
              <span className="font-display text-4xl font-semibold text-primary">{s.n}</span>
              <h3 className="mt-3 text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted">{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function LanguagesSection() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-20">
      <SectionHeading eyebrow="Languages" title="Built for multilingual people" intro="Voxly is designed to work with these languages. Accuracy depends on the language and the audio quality." />
      <ul className="mt-10 flex flex-wrap justify-center gap-3">
        {LANGUAGES.map((l) => (
          <li key={l.code} className="rounded-full border border-line bg-surface px-4 py-2 text-sm font-medium">
            {l.name}
          </li>
        ))}
      </ul>
    </section>
  );
}

function PlanCard({ id, price, cta, highlight }: { id: "free" | "pro"; price: string; cta: React.ReactNode; highlight?: boolean }) {
  const p = PLANS[id];
  const items = [
    `${p.monthlyTranscriptions} transcriptions per month`,
    `${p.monthlyGenerations} AI generations per month`,
    `Recordings up to ${Math.round(p.maxRecordingSeconds / 60)} minutes`,
    p.historyItems === null ? "Unlimited history" : `Last ${p.historyItems} items in history`,
    id === "pro" ? "Advanced tones and formats" : "Basic email and note generation",
  ];
  return (
    <article className={`card p-8 ${highlight ? "ring-2 ring-primary" : ""}`}>
      <h3 className="text-lg font-semibold">{p.name}</h3>
      <p className="mt-3 font-display text-4xl font-semibold">{price}</p>
      <ul className="mt-6 space-y-3 text-sm">
        {items.map((i) => (
          <li key={i} className="flex gap-2">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
            <span>{i}</span>
          </li>
        ))}
      </ul>
      <div className="mt-8">{cta}</div>
    </article>
  );
}

export function Pricing() {
  return (
    <section className="bg-surface-2">
      <div className="mx-auto max-w-4xl px-5 py-20">
        <SectionHeading id="pricing" eyebrow="Pricing" title="Start free. Upgrade when you need more." />
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <PlanCard id="free" price="Free" cta={<Link href="/workspace" className="btn btn-primary w-full">Try it free</Link>} />
          <PlanCard id="pro" price="Coming soon" highlight cta={<span className="btn btn-ghost w-full" aria-disabled="true">Not available yet</span>} />
        </div>
      </div>
    </section>
  );
}

const faqs = [
  { q: "Does Voxly store my recordings?", a: "No. Audio is sent to a speech-to-text provider to be transcribed and is not kept by Voxly. We will describe exactly what is stored, and for how long, in our privacy policy before launch." },
  { q: "Which languages does it support?", a: "English, Spanish, French, German, Arabic, Hindi, Urdu and Portuguese. Accuracy varies by language and audio quality, so always review the transcript." },
  { q: "Is it free?", a: "Yes, there is a free plan with monthly limits on transcriptions and AI generations. Paid plans are not available yet." },
  { q: "Do I need an account?", a: "Not yet. Accounts, saved history and billing are coming in later releases." },
];

export function Faq() {
  return (
    <section className="mx-auto max-w-3xl px-5 py-20">
      <SectionHeading id="faq" eyebrow="FAQ" title="Questions, answered" />
      <div className="mt-10 divide-y divide-line rounded-2xl border border-line bg-surface">
        {faqs.map((f) => (
          <details key={f.q} className="group p-5">
            <summary className="cursor-pointer list-none font-semibold">{f.q}</summary>
            <p className="mt-3 text-sm text-muted">{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

export function FinalCta() {
  return (
    <section className="mx-auto max-w-6xl px-5 pb-24">
      <div className="rounded-3xl bg-gradient-to-br from-primary to-violet p-10 text-center text-white sm:p-16">
        <Sparkles className="mx-auto h-8 w-8" aria-hidden="true" />
        <h2 className="mt-4 font-display text-4xl font-semibold">Say it once. Send it done.</h2>
        <p className="mx-auto mt-3 max-w-xl text-white/85">Try Voxly with a quick voice note and see the difference.</p>
        <Link href="/workspace" className="btn mt-8 bg-white text-primary">Open the workspace</Link>
      </div>
    </section>
  );
}
