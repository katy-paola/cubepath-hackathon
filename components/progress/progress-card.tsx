import type { ComponentPropsWithoutRef, CSSProperties } from "react";

import { TradeUpCompact } from "@/components/icons";
import type { Progress } from "@/lib/types";
import { cn } from "@/lib/utils";

import { IntensityMeter } from "./intensity-meter";
import { MiniChart } from "./mini-chart";

export type ProgressCardProps = Omit<
  ComponentPropsWithoutRef<"div">,
  "children"
> & {
  type?: "consistencia" | "tiempo" | "intensidad";
  device?: "desktop" | "tablet" | "mobile";
  progress?: Progress | null;
};

const labelCopy = {
  consistencia: "CONSISTENCIA",
  tiempo: "TIEMPO TOTAL",
  intensidad: "INTENSIDAD",
} as const;

export function ProgressCard({
  type = "consistencia",
  device = "desktop",
  progress = null,
  className,
  ...props
}: ProgressCardProps) {
  const isIntensidad = type === "intensidad";
  const isTiempo = type === "tiempo";
  const isMobile = device === "mobile";

  const completedDays = progress?.consistencia.completados ?? 0;
  const totalDays = progress?.consistencia.total ?? 0;
  const consistencyPercent =
    totalDays > 0 ? Math.max(0, Math.min(1, completedDays / totalDays)) : 0;

  const totalMinutes = progress?.tiempo_total ?? 0;
  const tiempoDeltaPct = progress?.tiempo_delta_pct ?? null;
  const tiempoRoutineAnteriorMin =
    progress?.tiempo_routine_anterior_min ?? null;
  const tiempoDeltaVsRoutineAnteriorPct =
    progress?.tiempo_delta_vs_routine_anterior_pct ?? null;

  const intensityLevel = progress?.intensidad.nivel ?? null;

  const intensityLabel =
    intensityLevel === "alta"
      ? "ALTA"
      : intensityLevel === "media"
        ? "MODERADA"
        : intensityLevel === "baja"
          ? "BAJA"
          : null;

  const intensityTextClass = (level: "baja" | "media" | "alta") =>
    intensityLevel === level ? "text-primary-hover" : "text-heading";

  /** Color en el contenedor: evita que utilidades CSS pierdan contra la cascada (p. ej. heredar #ededed del body en dark). */
  const trendDeltaRowStyle = (positive: boolean): CSSProperties => ({
    color: positive
      ? "var(--trend-positive, #059443)"
      : "var(--trend-negative, #c62828)",
  });

  return (
    <div
      className={cn(
        "flex h-full min-h-52 w-full max-w-card-promo flex-col rounded-3xl border border-border-subtle bg-card",
        isMobile ? "p-4" : "p-6",
        className,
      )}
      {...props}
      role="group"
      aria-label={`Progress card: ${type}`}
    >
      <div className="flex min-h-0 w-full flex-1 flex-col gap-3">
        <p className="shrink-0 text-base font-bold leading-normal text-subdued">
          {labelCopy[type]}
        </p>

        {["consistencia", "tiempo"].includes(type) && (
          <div className="flex min-h-0 flex-1 flex-col gap-3">
            <div className="flex gap-1 leading-none">
              <span className="text-2xl font-bold leading-6 text-metric-blue">
                {isTiempo
                  ? String(totalMinutes)
                  : totalDays > 0
                    ? `${completedDays} / ${totalDays}`
                    : "—"}
              </span>
              <span className="flex flex-col justify-end pb-0.5 text-base font-normal leading-normal text-muted-foreground">
                {isTiempo ? "min" : "días"}
              </span>
            </div>

            {type === "consistencia" && (
              <div className="w-full shrink-0 rounded-xl bg-border-subtle">
                <div
                  className="h-3 rounded-xl bg-primary-hover"
                  style={{ width: `${Math.round(consistencyPercent * 100)}%` }}
                />
              </div>
            )}

            {isTiempo && (
              <div className="flex min-h-0 flex-col gap-1">
                {tiempoDeltaPct !== null && (
                  <div
                    className="flex shrink-0 items-start gap-1"
                    style={trendDeltaRowStyle(tiempoDeltaPct >= 0)}
                  >
                    <span className="whitespace-nowrap text-base font-medium leading-6">
                      {tiempoDeltaPct >= 0
                        ? `+${tiempoDeltaPct}`
                        : `${tiempoDeltaPct}`}
                      % vs semana anterior
                    </span>
                    <TradeUpCompact
                      className={cn(
                        "size-6 shrink-0",
                        tiempoDeltaPct < 0 && "rotate-180",
                      )}
                    />
                  </div>
                )}
                {tiempoDeltaVsRoutineAnteriorPct !== null && (
                  <div
                    className="flex shrink-0 items-start gap-1"
                    style={trendDeltaRowStyle(
                      tiempoDeltaVsRoutineAnteriorPct >= 0,
                    )}
                  >
                    <span className="whitespace-nowrap text-base font-medium leading-6">
                      {tiempoDeltaVsRoutineAnteriorPct >= 0
                        ? `+${tiempoDeltaVsRoutineAnteriorPct}`
                        : `${tiempoDeltaVsRoutineAnteriorPct}`}
                      % vs rutina anterior
                    </span>
                    <TradeUpCompact
                      className={cn(
                        "size-6 shrink-0",
                        tiempoDeltaVsRoutineAnteriorPct < 0 && "rotate-180",
                      )}
                    />
                  </div>
                )}
                {tiempoDeltaVsRoutineAnteriorPct === null &&
                  tiempoRoutineAnteriorMin !== null &&
                  tiempoRoutineAnteriorMin === 0 &&
                  totalMinutes > 0 && (
                    <p className="text-xs font-medium leading-normal text-muted-foreground">
                      Rutina anterior: 0 min completados (primera referencia de
                      tiempo)
                    </p>
                  )}
              </div>
            )}
          </div>
        )}

        {isIntensidad && (
          <div className="flex min-h-0 flex-1 flex-col gap-3">
            <div className="flex items-center gap-2">
              <IntensityMeter
                level="low"
                className="relative h-3 w-5 shrink-0"
              />
              <span
                className={cn(
                  "text-sm font-medium uppercase leading-3",
                  intensityTextClass("baja"),
                )}
              >
                BAJA
              </span>
            </div>
            <div className="flex items-center gap-2">
              <IntensityMeter
                level="medium"
                className="relative h-3 w-5 shrink-0"
              />
              <span
                className={cn(
                  "text-sm font-medium uppercase leading-3",
                  intensityTextClass("media"),
                )}
              >
                MODERADA
              </span>
            </div>
            <div className="flex items-center gap-2">
              <IntensityMeter
                level="high"
                className="relative h-3 w-5 shrink-0"
              />
              <span
                className={cn(
                  "text-sm font-medium uppercase leading-3",
                  intensityTextClass("alta"),
                )}
              >
                ALTA
              </span>
            </div>
          </div>
        )}
      </div>

      <div className="mt-auto w-full shrink-0 pt-2">
        {type === "consistencia" && (
          <p className="text-xs font-medium leading-normal text-muted-foreground">
            {totalDays > 0
              ? `${Math.round(consistencyPercent * 1000) / 10}% de la semana completado`
              : "—"}
          </p>
        )}
        {type === "intensidad" && (
          <p className="text-xs font-medium leading-normal text-muted-foreground">
            {intensityLabel
              ? `Predomina intensidad ${intensityLabel.toLowerCase()}`
              : "—"}
          </p>
        )}
        {isTiempo && <MiniChart className="relative h-8 w-full shrink-0" />}
      </div>
    </div>
  );
}
