import { Recorder } from "@/features/recording/components/Recorder";

export default function WorkspacePage() {
  return (
    <>
      <h1 className="font-display text-4xl font-semibold tracking-tight">Workspace</h1>
      <p className="mt-2 max-w-2xl text-muted">
        Record or upload audio, check the transcript, then choose what Voxly should write.
      </p>
      <div className="mt-8">
        <Recorder />
      </div>
    </>
  );
}
