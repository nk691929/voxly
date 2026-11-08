import type { Metadata } from "next";
import { LegalPage } from "@/components/marketing/LegalPage";

export const metadata: Metadata = {
  title: "Terms of use",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <LegalPage title="Terms of use" updated="November 2026">
      <section>
        <h2>Using Voxly</h2>
        <p>
          Voxly turns your voice and text into drafts such as emails, notes, task lists and translations. You are
          responsible for what you record, upload and send, and you must have the right to use it.
        </p>
      </section>
      <section>
        <h2>AI can make mistakes</h2>
        <p>
          Transcripts and generated text may contain errors. Always review them before relying on or sending them.
        </p>
      </section>
      <section>
        <h2>Acceptable use</h2>
        <p>Do not use Voxly for anything unlawful, to harm others, or to try to break or overload the service.</p>
      </section>
      <section>
        <h2>Accounts and limits</h2>
        <p>
          You are responsible for keeping your password safe. Each plan has monthly limits, and we may change
          limits or features over time.
        </p>
      </section>
      <section>
        <h2>Changes</h2>
        <p>These terms may be updated. Continued use after an update means you accept the new version.</p>
      </section>
    </LegalPage>
  );
}
