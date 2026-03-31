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
    <Link
      href="/#ajustar-rutina"
      className={cn(buttonVariants({ size: "sm", variant: "secondary" }))}
    >
      <SlidersHorizontal decorative size={16} />
      <span>{label}</span>
    </Link>
  );
}
