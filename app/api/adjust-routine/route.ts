import { getOpenRouterProvider } from "@/lib/ai/provider";
import { createPlaceholderTrainingDay } from "@/lib/routine-placeholder-day";
import { reconcileSequentialDayStatuses } from "@/lib/routine-dias-reconcile";
import type { TrainingDay } from "@/lib/types";
import { adjustSessionTime } from "@/lib/utils/adjust-session-time";
import { RoutineConfigSchema } from "@/lib/validations/config";
import {
  AITrainingDaySchema,
  TrainingDaySchema,
} from "@/lib/validations/training";
import { Output, generateText } from "ai";
import { z } from "zod";

const BodySchema = z.object({
  routine: z.array(TrainingDaySchema).min(2).max(6),
  update: RoutineConfigSchema,
});

const PartialRutinaOutputSchema = z.object({
  rutina: z.array(AITrainingDaySchema).min(1),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsedBody = BodySchema.safeParse(body);
    if (!parsedBody.success) {
      return Response.json({ error: "Invalid body" }, { status: 400 });
    }

    const { routine: currentRoutine, update } = parsedBody.data;
    const nc = currentRoutine.length;
    const nf = update.frecuencia_semanal;

    if (nf < nc) {
      return Response.json(
        {
          error:
            "La frecuencia semanal no puede ser menor al número de días de la rutina actual.",
        },
        { status: 400 },
      );
    }

    if (nf > 6) {
      return Response.json(
        { error: "Frecuencia no soportada." },
        { status: 400 },
      );
    }

    let dias = currentRoutine.map((d) => ({ ...d }));

    const extra = nf - nc;
    for (let k = 0; k < extra; k++) {
      dias.push(createPlaceholderTrainingDay(nc + k + 1));
    }

    dias = reconcileSequentialDayStatuses(dias);

    const incomplete = dias.filter((d) => d.estado !== "completado");
    if (incomplete.length === 0) {
      return Response.json(
        { error: "No hay días pendientes para reajustar." },
        { status: 400 },
      );
    }

    const openrouter = getOpenRouterProvider();
    const model = process.env.OPENROUTER_MODEL ?? "openrouter/auto";

    const prompt = `
Actúa como entrenador profesional de running.

Preferencias actualizadas del usuario (JSON):
${JSON.stringify(update, null, 2)}

Rutina completa actual (JSON; respeta los días con estado "completado" como referencia de contexto, pero NO los modificarás en la salida):
${JSON.stringify(dias, null, 2)}

Tarea:
- Debes generar EXACTAMENTE ${incomplete.length} días de entrenamiento, en el MISMO ORDEN que la lista de días NO completados (por numero_dia ascendente).
- Cada posición de salida sustituye el contenido (tipo, intensidad, ejercicios, razon) del día no completado correspondiente.
- Los días ya completados en la rutina anterior no forman parte de esta salida.
- Usa SOLO estos tipos: suave, largo, intervalos, tempo, fartlek, recuperacion, cruzado, fuerza, descanso
- Usa SOLO intensidades: baja, media, alta
- Cada día debe tener mínimo 2 ejercicios
- "razon" máximo 200 caracteres
- Todo en español
`;

    const result = await generateText({
      model: openrouter(model),
      system: "Responde únicamente datos válidos para los días reajustados.",
      prompt,
      output: Output.object({
        schema: PartialRutinaOutputSchema,
      }),
    });

    const generated = result.output.rutina;
    if (generated.length !== incomplete.length) {
      return Response.json(
        { error: "La IA devolvió un número incorrecto de días." },
        { status: 500 },
      );
    }

    let genIdx = 0;
    const merged = dias.map((day) => {
      if (day.estado === "completado") return day;
      const ai = generated[genIdx++];
      return {
        ...ai,
        numero_dia: day.numero_dia,
        estado: day.estado,
      };
    });

    const targetTime = update.tiempo_sesion;
    const withTime: TrainingDay[] = merged.map((day): TrainingDay => {
      if (day.estado === "completado") return day;
      const adjusted = adjustSessionTime(day, targetTime);
      return { ...adjusted, numero_dia: day.numero_dia, estado: day.estado };
    });

    const finalDias = reconcileSequentialDayStatuses(withTime);

    return Response.json({ data: finalDias });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Unknown error adjusting routine";
    return Response.json({ error: message }, { status: 500 });
  }
}
