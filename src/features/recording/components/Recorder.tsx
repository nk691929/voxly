"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Copy, Loader2, Mic, Sparkles, Square, Trash2, Upload } from "lucide-react";
import { LANGUAGES, PLANS } from "@/config/plans";

type Phase = "idle" | "recording" | "ready";
type Busy = "transcribe" | "generate" | null;
type OutputType = "email" | "notes" | "tasks" | "translate";

const MAX_SECONDS = PLANS.free.maxRecordingSeconds;
const MAX_BYTES = PLANS.free.maxFileBytes;

function pickMimeType(): string | undefined {
  if (typeof MediaRecorder === "undefined") return undefined;
  const candidates = ["audio/webm;codecs=opus", "audio/webm", "audio/mp4", "audio/ogg;codecs=opus"];
  return candidates.find((t) => MediaRecorder.isTypeSupported(t));
}

function extensionFor(type: string): string {
  if (type.includes("mp4")) return "m4a";
  if (type.includes("ogg")) return "ogg";
  return "webm";
}

function formatTime(total: number): string {
  const m = Math.floor(total / 60).toString().padStart(2, "0");
  const s = (total % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

export function Recorder() {
  const router = useRouter();
  const [phase, setPhase] = useState<Phase>("idle");
  const [seconds, setSeconds] = useState(0);
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [transcript, setTranscript] = useState("");
  const [outputType, setOutputType] = useState<OutputType>("email");
  const [tone, setTone] = useState("professional");
  const [targetLanguage, setTargetLanguage] = useState("en");
  const [busy, setBusy] = useState<Busy>(null);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [result, setResult] = useState("");
  const [demoMode, setDemoMode] = useState(false);

  // Things that are not shown on screen live in one object that React does not track.
  const live = useRef<{
    recorder: MediaRecorder | null;
    stream: MediaStream | null;
    timer: ReturnType<typeof setInterval> | null;
    url: string | null;
  }>({ recorder: null, stream: null, timer: null, url: null });

  useEffect(() => {
    const resources = live.current;
    return () => {
      if (resources.timer) clearInterval(resources.timer);
      resources.stream?.getTracks().forEach((t) => t.stop());
      if (resources.url) URL.revokeObjectURL(resources.url);
    };
  }, []);

  function releaseMic() {
    const r = live.current;
    if (r.timer) clearInterval(r.timer);
    r.timer = null;
    r.stream?.getTracks().forEach((t) => t.stop());
    r.stream = null;
    r.recorder = null;
  }

  function setAudio(file: File | null) {
    const r = live.current;
    if (r.url) URL.revokeObjectURL(r.url);
    r.url = file ? URL.createObjectURL(file) : null;
    setAudioFile(file);
    setAudioUrl(r.url);
  }

  async function startRecording() {
    setError(null);
    setNotice(null);
    if (!navigator.mediaDevices?.getUserMedia || typeof MediaRecorder === "undefined") {
      setError("Recording is not supported in this browser. You can upload an audio file instead.");
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mimeType = pickMimeType();
      const recorder = new MediaRecorder(stream, mimeType ? { mimeType } : undefined);
      const chunks: Blob[] = [];
      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunks.push(e.data);
      };
      recorder.onstop = () => {
        releaseMic();
        const type = recorder.mimeType || mimeType || "audio/webm";
        const blob = new Blob(chunks, { type });
        setAudio(new File([blob], `recording.${extensionFor(type)}`, { type }));
        setPhase("ready");
      };
      live.current.recorder = recorder;
      live.current.stream = stream;
      recorder.start();
      setSeconds(0);
      setPhase("recording");
      const startedAt = Date.now();
      live.current.timer = setInterval(() => {
        const elapsed = Math.floor((Date.now() - startedAt) / 1000);
        setSeconds(elapsed);
        if (elapsed >= MAX_SECONDS && recorder.state === "recording") recorder.stop();
      }, 250);
    } catch (err) {
      const name = err instanceof DOMException ? err.name : "";
      if (name === "NotAllowedError") {
        setError("Microphone access was blocked. Allow it in your browser's address bar and try again.");
      } else if (name === "NotFoundError") {
        setError("No microphone was found on this device.");
      } else {
        setError("Could not start recording. Please try again.");
      }
    }
  }

  function stopRecording() {
    const recorder = live.current.recorder;
    if (recorder && recorder.state === "recording") recorder.stop();
  }

  function onFileChosen(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    setError(null);
    setNotice(null);
    if (file.size > MAX_BYTES) {
      setError(`That file is too large. The limit is ${Math.round(MAX_BYTES / (1024 * 1024))} MB.`);
      return;
    }
    if (!file.type.startsWith("audio/")) {
      setError("Please choose an audio file (MP3, WAV, M4A, WebM, OGG or FLAC).");
      return;
    }
    setAudio(file);
    setPhase("ready");
  }

  function discard() {
    setAudio(null);
    setPhase("idle");
    setSeconds(0);
    setTranscript("");
    setResult("");
    setError(null);
    setNotice(null);
  }

  async function transcribe() {
    if (!audioFile) return;
    setBusy("transcribe");
    setError(null);
    setNotice(null);
    try {
      const form = new FormData();
      form.append("file", audioFile);
      const res = await fetch("/api/transcribe", { method: "POST", body: form });
      const data = (await res.json().catch(() => null)) as { text?: string; error?: string; mock?: boolean } | null;
      if (!res.ok || !data?.text) throw new Error(data?.error ?? "Transcription failed.");
      setTranscript(data.text);
      setDemoMode(Boolean(data.mock));
      setNotice("Transcript ready. Check it, fix anything, then generate.");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Transcription failed.");
    } finally {
      setBusy(null);
    }
  }

  async function generate() {
    setBusy("generate");
    setError(null);
    setNotice(null);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          transcript,
          outputType,
          tone: outputType === "email" ? tone : undefined,
          targetLanguage: outputType === "translate" ? targetLanguage : undefined,
        }),
      });
      const data = (await res.json().catch(() => null)) as { output?: string; error?: string; mock?: boolean; saved?: boolean } | null;
      if (!res.ok || !data?.output) throw new Error(data?.error ?? "Generation failed.");
      setResult(data.output);
      setDemoMode(Boolean(data.mock));
      setNotice(data.saved ? "Saved to your history." : null);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Generation failed.");
    } finally {
      setBusy(null);
    }
  }

  async function copyResult() {
    try {
      await navigator.clipboard.writeText(result);
      setNotice("Copied to clipboard.");
    } catch {
      setError("Could not copy. Select the text and copy it manually.");
    }
  }

  return (
    <div className="grid gap-6">
      {demoMode && (
        <p role="status" className="rounded-xl border border-line bg-lavender px-4 py-3 text-sm">
          Demo mode: this step used placeholder results. Add API keys to <code>.env.local</code> for real output.
        </p>
      )}

      {/* 1. Audio */}
      <section className="card p-6" aria-labelledby="step-audio">
        <h2 id="step-audio" className="text-lg font-semibold">1. Add your voice</h2>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          {phase !== "recording" ? (
            <button type="button" className="btn btn-primary" onClick={startRecording}>
              <Mic className="h-4 w-4" aria-hidden="true" /> Record
            </button>
          ) : (
            <button type="button" className="btn btn-primary" onClick={stopRecording}>
              <Square className="h-4 w-4" aria-hidden="true" /> Stop
            </button>
          )}
          <label className={`btn btn-ghost ${phase === "recording" ? "pointer-events-none opacity-50" : ""}`}>
            <Upload className="h-4 w-4" aria-hidden="true" /> Upload audio
            <input type="file" accept="audio/*" className="sr-only" onChange={onFileChosen} disabled={phase === "recording"} />
          </label>
          <span className="font-mono text-sm tabular-nums text-muted" aria-live="off">
            {formatTime(seconds)} / {formatTime(MAX_SECONDS)}
          </span>
          {phase === "recording" && (
            <span className="inline-flex items-center gap-2 text-sm font-medium text-accent">
              <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-accent" aria-hidden="true" /> Recording
            </span>
          )}
        </div>

        {audioUrl && phase === "ready" && (
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <audio controls src={audioUrl} className="max-w-full" />
            <button type="button" className="btn btn-ghost" onClick={transcribe} disabled={busy !== null}>
              {busy === "transcribe" ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : <Sparkles className="h-4 w-4" aria-hidden="true" />}
              {busy === "transcribe" ? "Transcribing…" : "Transcribe"}
            </button>
            <button type="button" className="btn btn-ghost" onClick={discard} disabled={busy !== null}>
              <Trash2 className="h-4 w-4" aria-hidden="true" /> Discard
            </button>
          </div>
        )}
      </section>

      {/* 2. Transcript */}
      <section className="card p-6" aria-labelledby="step-transcript">
        <h2 id="step-transcript" className="text-lg font-semibold">2. Check the transcript</h2>
        <label htmlFor="transcript" className="sr-only">Transcript</label>
        <textarea
          id="transcript"
          className="field mt-4 min-h-40"
          placeholder="Your transcript appears here. You can also type or paste text."
          value={transcript}
          onChange={(e) => setTranscript(e.target.value)}
          maxLength={20000}
        />
      </section>

      {/* 3. Generate */}
      <section className="card p-6" aria-labelledby="step-generate">
        <h2 id="step-generate" className="text-lg font-semibold">3. Choose what to write</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <div>
            <label htmlFor="outputType" className="mb-1 block text-sm font-medium">Output</label>
            <select id="outputType" className="field" value={outputType} onChange={(e) => setOutputType(e.target.value as OutputType)}>
              <option value="email">Email</option>
              <option value="notes">Notes</option>
              <option value="tasks">Task list</option>
              <option value="translate">Translation</option>
            </select>
          </div>
          {outputType === "email" && (
            <div>
              <label htmlFor="tone" className="mb-1 block text-sm font-medium">Tone</label>
              <select id="tone" className="field" value={tone} onChange={(e) => setTone(e.target.value)}>
                <option value="professional">Professional</option>
                <option value="friendly">Friendly</option>
                <option value="concise">Concise</option>
              </select>
            </div>
          )}
          {outputType === "translate" && (
            <div>
              <label htmlFor="lang" className="mb-1 block text-sm font-medium">Translate to</label>
              <select id="lang" className="field" value={targetLanguage} onChange={(e) => setTargetLanguage(e.target.value)}>
                {LANGUAGES.map((l) => (
                  <option key={l.code} value={l.code}>{l.name}</option>
                ))}
              </select>
            </div>
          )}
        </div>
        <button type="button" className="btn btn-primary mt-5" onClick={generate} disabled={busy !== null || transcript.trim() === ""}>
          {busy === "generate" ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : <Sparkles className="h-4 w-4" aria-hidden="true" />}
          {busy === "generate" ? "Writing…" : "Generate"}
        </button>
      </section>

      {/* Messages */}
      <div aria-live="polite">
        {error && (
          <p role="alert" className="rounded-xl border border-accent/50 bg-surface px-4 py-3 text-sm text-accent">{error}</p>
        )}
        {notice && !error && <p role="status" className="px-1 text-sm text-muted">{notice}</p>}
      </div>

      {/* Result */}
      {result && (
        <section className="card p-6" aria-labelledby="step-result">
          <div className="flex items-center justify-between gap-3">
            <h2 id="step-result" className="text-lg font-semibold">Result</h2>
            <button type="button" className="btn btn-ghost" onClick={copyResult}>
              <Copy className="h-4 w-4" aria-hidden="true" /> Copy
            </button>
          </div>
          <pre className="mt-4 whitespace-pre-wrap break-words font-sans text-sm leading-relaxed">{result}</pre>
        </section>
      )}
    </div>
  );
}
