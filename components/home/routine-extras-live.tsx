"use client";

import { useEffect, useState } from "react";

import { AdjustRoutineCard } from "@/components/landing/adjust-routine-card";
import { ProgressSectionLive } from "@/components/progress/progress-section-live";
import {
  getActiveRoutine,
  onRoutineUpdated,
} from "@/lib/storage/routine-store";

export function RoutineExtrasLive() {
  const [hasRoutine, setHasRoutine] = useState<boolean | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      const routine = await getActiveRoutine();
      if (cancelled) return;
      setHasRoutine(Boolean(routine));
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

  if (hasRoutine !== true) return null;

  return (
    <>
      <ProgressSectionLive device="desktop" className="hidden lg:flex" />
      <ProgressSectionLive
        device="tablet"
        className="hidden max-w-lg sm:flex lg:hidden"
      />
      <ProgressSectionLive
        device="mobile"
        className="flex max-w-sm sm:hidden"
      />

      <div id="ajustar-rutina">
        <AdjustRoutineCard device="desktop" className="hidden lg:flex" />
        <AdjustRoutineCard
          device="tablet"
          className="hidden max-w-3xl sm:flex lg:hidden"
        />
        <AdjustRoutineCard
          device="mobile"
          className="flex max-w-lg sm:hidden"
        />
      </div>
    </>
  );
}
