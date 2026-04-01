"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { SlidersHorizontal } from "@/components/icons";
import { buttonVariants } from "@/components/ui/button";
import {
  getActiveRoutine,
  onRoutineUpdated,
} from "@/lib/storage/routine-store";
import { cn } from "@/lib/utils";

export function HeaderAdjustRoutineButtonLive({
  label = "Ajustar rutina",
}: {
  label?: string;
}) {
  const [hasRoutine, setHasRoutine] = useState<boolean | null>(null);
  const [completedRoutine, setCompletedRoutine] = useState<boolean | undefined>(
    false,
  );

  useEffect(() => {
    let cancelled = false;

    async function load() {
      const routine = await getActiveRoutine();
      const isRoutineCompleted = routine?.dias.every(
        (dia) => dia.estado === "completado",
      );
      if (cancelled) return;
      setHasRoutine(Boolean(routine));
      setCompletedRoutine(isRoutineCompleted);
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

  if (hasRoutine !== true || completedRoutine) return null;

  return (
    <Link
      href="/#ajustar-rutina"
      className={cn(buttonVariants({ size: "sm", variant: "secondary" }))}
    >
      <SlidersHorizontal decorative size={16} />
      <span>{label}</span>
    </Link>
  );
}
