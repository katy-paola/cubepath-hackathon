import type { ComponentPropsWithoutRef } from "react";

import { Button, SelectBox, FormField } from "@/components/ui";
import { ExerciseRow } from "./exercise-row";
import { cn } from "@/lib/utils";

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
  reasonTitle?: string;
  reasonText?: string;
  adaptationTitle?: string;
  energy?: string;
  energyOptions?: readonly string[];
  time?: string;
  timeOptions?: readonly string[];
  location?: string;
  locationOptions?: readonly string[];
  discomfort?: string;
  discomfortOptions?: readonly string[];
  actionLabel?: string;
  durationLabel?: string;
  durationValue?: string;
  completedLabel?: string;
};

function TrainingHeader({
  dayLabel,
  workoutLabel,
  typeLabel,
  intensityTag,
}: Pick<
  TrainingDayCardProps,
  "dayLabel" | "workoutLabel" | "typeLabel" | "intensityTag"
>) {
  return (
    <div className="relative shrink-0 w-full">
      <div className="flex items-start justify-between relative w-full">
        <div className="flex flex-col gap-[2px] items-start leading-0 relative shrink-0 whitespace-nowrap">
          <div className="flex flex-col justify-center relative shrink-0 text-[12px] text-muted-foreground uppercase">
            <p className="leading-[16px]">{dayLabel}</p>
          </div>
          <div className="flex flex-col justify-center relative shrink-0 text-[20px] text-foreground-strong">
            <p className="leading-[30px]">{workoutLabel}</p>
          </div>
          <div className="flex flex-col justify-center relative shrink-0 text-[12px] text-primary-hover">
            <p className="leading-[16px]">{typeLabel}</p>
          </div>
        </div>

        <div className="bg-border-subtle flex flex-col items-start px-[12px] py-[4px] relative rounded-[16px] shrink-0">
          <div className="flex flex-col font-bold justify-center leading-0 relative shrink-0 text-[10px] text-primary-hover uppercase whitespace-nowrap tracking-[1px]">
            <p className="leading-[15px]">{intensityTag}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function TrainingExercises({
  exercises,
}: {
  exercises: Array<{ label: string; tooltipText?: string }>;
}) {
  return (
    <div className="relative shrink-0 w-full">
      <div className="flex flex-col gap-[16px] items-start relative w-full">
        {exercises.map((ex, idx) => (
          <ExerciseRow
            key={`${ex.label}-${idx}`}
            label={ex.label}
            tooltipText={ex.tooltipText}
            className="shrink-0"
          />
        ))}
      </div>
    </div>
  );
}

function TrainingReason({
  reasonTitle,
  reasonText,
}: Pick<TrainingDayCardProps, "reasonTitle" | "reasonText">) {
  return (
    <div className="bg-secondary relative rounded-[16px] shrink-0 w-full">
      <div className="flex flex-col gap-[8px] items-start leading-0 p-[16px] relative w-full">
        <div className="flex flex-col font-bold justify-center relative shrink-0 text-[10px] text-primary-hover tracking-[1px] uppercase w-full">
          <p className="leading-[15px]">{reasonTitle}</p>
        </div>
        <div className="flex flex-col font-medium justify-center relative shrink-0 text-[12px] text-muted-foreground w-full">
          <p className="leading-[19.5px]">{reasonText}</p>
        </div>
      </div>
    </div>
  );
}

function TrainingAdaptationForm({
  isMobile,
  adaptationTitle,
  energy,
  energyOptions,
  time,
  timeOptions,
  location,
  locationOptions,
  discomfort,
  discomfortOptions,
  actionLabel,
}: {
  isMobile: boolean;
  adaptationTitle: string;
  energy: string;
  energyOptions: readonly string[];
  time: string;
  timeOptions: readonly string[];
  location: string;
  locationOptions: readonly string[];
  discomfort: string;
  discomfortOptions: readonly string[];
  actionLabel: string;
}) {
  return (
    <div className="bg-secondary relative rounded-[16px] shrink-0 w-full">
      <div className="flex flex-col gap-[16px] items-start p-[16px] relative w-full">
        <div className="flex flex-col font-bold justify-center leading-0 relative shrink-0 text-[12px] text-foreground-soft tracking-[1px] w-full">
          <p className="leading-[16px]">{adaptationTitle}</p>
        </div>

        <div className="flex flex-col gap-[24px] items-start relative shrink-0 w-full">
          <div
            className={cn(
              "relative shrink-0 w-full",
              isMobile
                ? "flex flex-col gap-[12px] items-start"
                : "grid grid-cols-2 gap-x-[12px] gap-y-[12px]",
            )}
          >
            <FormField className="w-full" label="Energía">
              <SelectBox
                value={energy}
                options={energyOptions}
                className="w-full"
                triggerAriaLabel={`Seleccionar Energía (actual: ${energy})`}
              />
            </FormField>
            <FormField className="w-full" label="Tiempo">
              <SelectBox
                value={time}
                options={timeOptions}
                className="w-full"
                triggerAriaLabel={`Seleccionar Tiempo (actual: ${time})`}
              />
            </FormField>
            <FormField className="w-full" label="Lugar">
              <SelectBox
                value={location}
                options={locationOptions}
                className="w-full"
                triggerAriaLabel={`Seleccionar Lugar (actual: ${location})`}
              />
            </FormField>
            <FormField className="w-full" label="Molestias">
              <SelectBox
                value={discomfort}
                options={discomfortOptions}
                className="w-full"
                triggerAriaLabel={`Seleccionar Molestias (actual: ${discomfort})`}
              />
            </FormField>
          </div>

          <div className="bg-secondary border border-primary-hover flex gap-[4px] items-center justify-center opacity-80 px-[16px] py-[8px] relative rounded-[12px] shrink-0 w-full">
            <Button
              variant="secondary"
              size="sm"
              className="w-full opacity-100 bg-inherit px-0 py-0 rounded-[12px] border-0 shadow-none"
            >
              {actionLabel}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function TrainingFooter({
  isCompleted,
  durationLabel,
  durationValue,
  completedLabel,
}: Pick<
  TrainingDayCardProps,
  "durationLabel" | "durationValue" | "completedLabel"
> & { isCompleted: boolean }) {
  return (
    <div className="relative shrink-0 w-full">
      <div className="flex items-center justify-between relative w-full">
        <div className="flex flex-col font-bold items-start leading-0 relative shrink-0 whitespace-nowrap">
          <div className="flex flex-col justify-center relative shrink-0 text-[12px] text-muted-foreground">
            <p className="leading-[12px]">{durationLabel}</p>
          </div>
          <div className="flex flex-col justify-center relative shrink-0 text-[14px] text-foreground-strong">
            <p className="leading-[20px]">{durationValue}</p>
          </div>
        </div>

        <div
          className={cn(
            "flex items-center justify-center py-[4px] shrink-0",
            isCompleted ? "relative" : "h-[32px] w-[150px]",
          )}
        >
          {isCompleted && (
            <div className="flex flex-col font-bold justify-center leading-0 relative shrink-0 text-[16px] text-[#04622d] whitespace-nowrap">
              <p className="leading-[24px]">{completedLabel}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function TrainingDayCard({
  device = "desktop",
  status = "default",
  dayLabel = "Día 1",
  workoutLabel = "Resistencia",
  typeLabel = "Tipo: Resistencia",
  intensityTag = "Moderada",
  exercises = [
    { label: "Trote suave 20 min (Zona 2)" },
    { label: "Técnica de carrera: Skipping y talones" },
  ],
  reasonTitle = "Razón:",
  reasonText =
    "Hoy nos enfocamos en construir base aeróbica. Mantén el ritmo conversacional.",
  adaptationTitle = "Adaptar hoy",
  energy = "Media",
  energyOptions = ["Media", "Baja", "Alta"],
  time = "45min",
  timeOptions = ["45min", "30min", "60min"],
  location = "Exterior",
  locationOptions = ["Exterior", "Interior"],
  discomfort = "Nada",
  discomfortOptions = ["Nada", "Molestias", "Mucho"],
  actionLabel = "Ajustar día",
  durationLabel = "Duración",
  durationValue = "45 minutos",
  completedLabel = "Completado",
  className,
  ...props
}: TrainingDayCardProps) {
  const isMobile = device === "mobile";
  const isCompleted = status === "completed";

  return (
    <div
      className={cn(
        // Default matches the Figma card size, but remains responsive in narrower containers.
        // Use `className="max-w-none"` when you need the "wide/stacked" responsive layout from Figma.
        "bg-[#f5f8ff] border-2 flex flex-col gap-[24px] items-start relative rounded-[24px] w-full max-w-[394.667px]",
        isMobile ? "p-[18px]" : "p-[26px]",
        isCompleted ? "border-[#07c559]" : "border-border",
        className,
      )}
      role="region"
      aria-label={`${dayLabel} - training day`}
      {...props}
    >
      <TrainingHeader
        dayLabel={dayLabel}
        workoutLabel={workoutLabel}
        typeLabel={typeLabel}
        intensityTag={intensityTag}
      />

      <TrainingExercises exercises={exercises} />

      <TrainingReason reasonTitle={reasonTitle} reasonText={reasonText} />

      <TrainingAdaptationForm
        isMobile={isMobile}
        adaptationTitle={adaptationTitle}
        energy={energy}
        energyOptions={energyOptions}
        time={time}
        timeOptions={timeOptions}
        location={location}
        locationOptions={locationOptions}
        discomfort={discomfort}
        discomfortOptions={discomfortOptions}
        actionLabel={actionLabel}
      />

      <TrainingFooter
        isCompleted={isCompleted}
        durationLabel={durationLabel}
        durationValue={durationValue}
        completedLabel={completedLabel}
      />
    </div>
  );
}

