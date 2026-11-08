import type { Metadata } from "next";
import { Suspense } from "react";
import { HistoryList } from "@/features/history/components/HistoryList";

export const metadata: Metadata = { title: "History" };

export default function HistoryPage() {
  return (
    <>
      <h1 className="font-display text-4xl font-semibold tracking-tight">History</h1>
      <p className="mt-2 text-muted">Your saved results. Only you can see them.</p>
      <div className="mt-8">
        <Suspense fallback={<p className="text-muted">Loading your history...</p>}>
          <HistoryList />
        </Suspense>
      </div>
    </>
  );
}
