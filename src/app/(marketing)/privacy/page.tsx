import type { Metadata } from "next";
import { LegalPage } from "@/components/marketing/LegalPage";

export const metadata: Metadata = {
  title: "Privacy notice",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy notice" updated="November 2026">
      <section>
        <h2>What we store</h2>
        <ul>
          <li>Your email address and a protected form of your password (we never see or store your plain password).</li>
          <li>The transcripts and results you generate while signed in, so they appear in your history.</li>
          <li>Simple usage counts per month, so plan limits can be applied.</li>
        </ul>
      </section>
      <section>
        <h2>Your audio</h2>
        <p>
          A recording stays in your browser until you press Transcribe. It is then sent to a speech-to-text
          provider to produce text. Voxly does not save the audio file. Demo mode (no provider key) sends nothing anywhere.
        </p>
      </section>
      <section>
        <h2>Who processes your data</h2>
        <ul>
          <li>Speech-to-text and writing: the AI provider configured for this service (currently OpenAI and/or DeepSeek). They handle the text or audio you send under their own terms.</li>
          <li>Accounts and saved data: Supabase.</li>
        </ul>
      </section>
      <section>
        <h2>Cookies and tracking</h2>
        <p>
          Voxly uses only the cookies needed to keep you signed in, plus a saved light or dark preference in your
          browser. There are no advertising or analytics trackers.
        </p>
      </section>
      <section>
        <h2>How long we keep things</h2>
        <p>
          Saved results stay until you delete them or delete your account. Deleting your account in Settings
          permanently removes your account, saved results and usage records.
        </p>
      </section>
      <section>
        <h2>Your choices</h2>
        <ul>
          <li>Delete any saved result from History.</li>
          <li>Delete your whole account from Settings.</li>
        </ul>
      </section>
    </LegalPage>
  );
}
