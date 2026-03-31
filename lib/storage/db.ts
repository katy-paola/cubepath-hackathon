import Dexie, { type Table } from "dexie";

import type { Routine, Status } from "@/lib/types";

export type StoredRoutine = Omit<Routine, "createdAt"> & { createdAt: string };

export type DayProgress = {
  routineId: string;
  numero_dia: number;
  estado: Status;
  completedAt?: string;
  durationMinutes?: number;
  notes?: string;
  updatedAt: string;
};

export type MetaRow = {
  key: "activeRoutineId";
  value: string;
};

export class StridiaDB extends Dexie {
  routines!: Table<StoredRoutine, string>;
  dayProgress!: Table<DayProgress, [string, number]>;
  meta!: Table<MetaRow, string>;

  constructor() {
    super("stridia");

    this.version(1).stores({
      routines: "id, createdAt",
      dayProgress:
        "[routineId+numero_dia], routineId, numero_dia, estado, updatedAt",
      meta: "key",
    });
  }
}

export const db = new StridiaDB();
