import { generateRoutineAI } from "@/lib/ai/test-ai";

export async function GET() {
  const raw = await generateRoutineAI({
    objetivo: "resistencia",
    nivel: "principiante",
    frecuencia_semanal: 3,
    tiempo_sesion: 30,
    lugar_entrenamiento: "exterior",
    compromiso: "medio",
    salud_limitaciones: "nada",
  });

  const parsed = JSON.parse(raw || "{}");

  return Response.json({ data: parsed });
}
