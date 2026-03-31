"use client";

import { useEffect, useState } from "react";

import type { Progress } from "@/lib/types";
import {
  getProgressSummary,
  onRoutineUpdated,
} from "@/lib/storage/routine-store";

import { ProgressSection, type ProgressSectionProps } from "./progress-section";

export function ProgressSectionLive(
  props: Omit<ProgressSectionProps, "progress">,
) {
  const [progress, setProgress] = useState<Progress | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      const next = await getProgressSummary();
      if (cancelled) return;
      setProgress(next);
    }

    load();
    const unsubscribe = onRoutineUpdated(() => {
      load();
    });

    return () => {
      cancelled = true;
      unsubscribe();
    };
  }, []);

  return <ProgressSection {...props} progress={progress} />;
}
