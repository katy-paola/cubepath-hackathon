import type { ComponentPropsWithoutRef } from "react";

import { Button, FormField, InfoIconButton, SelectBox } from "@/components/ui";
import { cn } from "@/lib/utils";

/**
 * KISS: una sola pieza exportada. El copy fijo vive aquí; las props solo cambian lo que
 * la home realmente variará (día, estado, titulares, lista de ejercicios).
 */
const COPY = {
  reasonTitle: "Razón:",
  reasonText:
    "Hoy nos enfocamos en construir base aeróbica. Mantén el ritmo conversacional.",
  adaptationTitle: "Adaptar hoy",
  energy: "media",
  energyOptions: ["baja", "media", "alta"] as const,
  time: "45min",
  timeOptions: ["20min", "30min", "45min", "60min", "75min"] as const,
  location: "Exterior",
  locationOptions: ["Exterior", "Cinta", "Casa sin equipo"] as const,
  discomfort: "Ninguna",
  discomfortOptions: [
    "Ninguna",
    "Molestias leves",
    "Lesión crónica",
    "Condición cardiaca",
    "Condición respiratoria",
  ] as const,
  actionLabel: "Ajustar día",
  durationLabel: "Duración",
  durationValue: "45 minutos",
  completedLabel: "Completado",
  exerciseTooltipDefault: "Explicación del ejercicio",
} as const;

const DEFAULT_EXERCISES = [
  { label: "Trote suave 20 min (Zona 2)" },
  { label: "Técnica de carrera: Skipping y talones" },
] satisfies Array<{ label: string; tooltipText?: string }>;

export type TrainingDayCardProps = Omit<
  ComponentPropsWithoutRef<"div">,
  "children"
> & {
  device?: "desktop" | "mobile";
  status?: "default" | "completed";
  dayLabel?: string;
  workoutLabel?: string;
  typeLabel?: string;
  intensityTag?: string;
  exercises?: Array<{ label: string; tooltipText?: string }>;
};

export function TrainingDayCard({
  device = "desktop",
  status = "default",
  dayLabel = "Día 1",
  workoutLabel = "Resistencia",
  typeLabel = "Tipo: Resistencia",
  intensityTag = "Moderada",
  exercises = DEFAULT_EXERCISES,
  className,
  ...props
}: TrainingDayCardProps) {
  const isMobile = device === "mobile";
  const isCompleted = status === "completed";

  return (
    <div
      className={cn(
        "flex w-full max-w-card-promo flex-col gap-6 rounded-3xl border-2 bg-page-shell",
        isMobile ? "p-4" : "p-6",
        isCompleted ? "border-success-border" : "border-border",
        className,
      )}
      role="region"
      aria-label={`${dayLabel} - training day`}
      {...props}
    >
      {/* Cabecera */}
      <div className="flex w-full items-start justify-between gap-2">
        <div className="flex min-w-0 flex-col gap-0.5 leading-none">
          <p className="text-xs uppercase leading-4 text-muted-foreground">
            {dayLabel}
          </p>
          <p className="text-xl leading-8 text-heading">{workoutLabel}</p>
          <p className="text-xs leading-4 text-primary-hover">{typeLabel}</p>
        </div>
        <div className="shrink-0 rounded-2xl bg-border-subtle px-3 py-1">
          <p className="text-eyebrow-sm font-bold uppercase tracking-wider text-primary-hover">
            {intensityTag}
          </p>
        </div>
      </div>

      {/* Ejercicios */}
      <ul className="flex w-full flex-col gap-4">
        {exercises.map((ex, idx) => {
          const tip = ex.tooltipText ?? COPY.exerciseTooltipDefault;
          return (
            <li key={`${ex.label}-${idx}`} className="list-none">
              <div className="flex w-full min-w-0 items-center justify-between gap-2">
                <div className="flex min-w-0 items-center gap-2">
                  <span
                    className="size-1.5 shrink-0 rounded-full bg-primary"
                    aria-hidden
                  />
                  <p className="truncate text-sm text-subdued">{ex.label}</p>
                </div>
                <InfoIconButton
                  tooltipText={tip}
                  ariaLabel={tip}
                  className="shrink-0"
                />
              </div>
            </li>
          );
        })}
      </ul>

      {/* Razón */}
      <div className="w-full rounded-2xl bg-secondary">
        <div className="flex flex-col gap-2 p-4">
          <p className="text-eyebrow-sm font-bold uppercase tracking-wider text-primary-hover">
            {COPY.reasonTitle}
          </p>
          <p className="text-xs font-medium leading-relaxed text-muted-foreground">
            {COPY.reasonText}
          </p>
        </div>
      </div>

      {/* Adaptar hoy */}
      <div className="w-full rounded-2xl bg-secondary">
        <div className="flex flex-col gap-4 p-4">
          <p className="text-xs font-bold uppercase leading-4 tracking-wider text-subdued">
            {COPY.adaptationTitle}
          </p>

          <div className="flex flex-col gap-6">
            <div
              className={cn(
                "w-full",
                isMobile ? "flex flex-col gap-3" : "grid grid-cols-2 gap-3",
              )}
            >
              <FormField className="w-full" label="Energía">
                <SelectBox
                  value={COPY.energy}
                  options={COPY.energyOptions}
                  className="w-full"
                  triggerAriaLabel={`Seleccionar Energía (actual: ${COPY.energy})`}
                />
              </FormField>
              <FormField className="w-full" label="Tiempo">
                <SelectBox
                  value={COPY.time}
                  options={COPY.timeOptions}
                  className="w-full"
                  triggerAriaLabel={`Seleccionar Tiempo (actual: ${COPY.time})`}
                />
              </FormField>
              <FormField className="w-full" label="Lugar">
                <SelectBox
                  value={COPY.location}
                  options={COPY.locationOptions}
                  className="w-full"
                  triggerAriaLabel={`Seleccionar Lugar (actual: ${COPY.location})`}
                />
              </FormField>
              <FormField className="w-full" label="Molestias">
                <SelectBox
                  value={COPY.discomfort}
                  options={COPY.discomfortOptions}
                  className="w-full"
                  triggerAriaLabel={`Seleccionar Molestias (actual: ${COPY.discomfort})`}
                />
              </FormField>
            </div>

            <Button
              variant="secondary"
              size="sm"
              className="w-full rounded-xl border border-primary-hover bg-secondary"
            >
              {COPY.actionLabel}
            </Button>
          </div>
        </div>
      </div>

      {/* Pie */}
      <div className="flex w-full items-center justify-between gap-2">
        <div className="flex min-w-0 flex-col leading-none">
          <p className="text-xs leading-3 text-muted-foreground">
            {COPY.durationLabel}
          </p>
          <p className="text-sm leading-5 text-heading">{COPY.durationValue}</p>
        </div>
        <div
          className={cn(
            "flex shrink-0 items-center justify-center py-1",
            isCompleted ? "" : "h-8 w-36",
          )}
        >
          {isCompleted && (
            <p className="text-base font-bold leading-6 text-success-ink">
              {COPY.completedLabel}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
