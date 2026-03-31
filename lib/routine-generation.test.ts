import { describe, expect, it } from "vitest";

import { mapRoutineFormToConfig } from "@/lib/routine-form-mapper";
import { AITrainingDaySchema } from "@/lib/validations/training";

describe("routine generation invariants", () => {
  it("maps 75 min correctly", () => {
    const config = mapRoutineFormToConfig({
      objective: "Resistencia",
      level: "Principiante",
      frequency: "3 días",
      sessionTime: "75 min",
      location: "Exterior",
      commitment: "Medio",
      health: [],
    });

    expect(config.tiempo_sesion).toBe(75);
  });

  it("maps several salud y limitaciones to config", () => {
    const config = mapRoutineFormToConfig({
      objective: "Resistencia",
      level: "Principiante",
      frequency: "3 días",
      sessionTime: "45 min",
      location: "Exterior",
      commitment: "Medio",
      health: ["molestias_leves", "condicion_cardiaca"],
    });

    expect(config.salud_limitaciones).toEqual([
      "molestias_leves",
      "condicion_cardiaca",
    ]);
  });

  it("requires at least 2 exercises per AI day", () => {
    const parsed = AITrainingDaySchema.safeParse({
      tipo: "suave",
      intensidad: "baja",
      ejercicios: [
        {
          nombre: "Solo uno",
          duracion: 10,
          descripcion: "x",
        },
      ],
      razon: "x",
    });

    expect(parsed.success).toBe(false);
  });
});
