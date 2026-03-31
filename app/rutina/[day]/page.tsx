import { notFound } from "next/navigation";

import { HomeHeader } from "@/components/home/home-header";
import { IntensityMeter } from "@/components/progress";
import { AdjustDayCard } from "@/components/routine/adjust-day-card";
import { getWorkoutDayBySlug } from "@/lib/workout-days";
import { cn } from "@/lib/utils";

type WorkoutDayPageProps = {
  params: Promise<{ day: string }>;
};

function ClockIcon() {
  return (
    <span
      aria-hidden
      className="relative inline-block size-4 rounded-full border-2 border-muted-foreground"
    >
      <span className="absolute left-1/2 top-[3px] h-[4px] w-[1.5px] -translate-x-1/2 rounded-full bg-muted-foreground" />
      <span className="absolute left-1/2 top-1/2 h-[1.5px] w-[4px] rounded-full bg-muted-foreground" />
    </span>
  );
}

export default async function WorkoutDayPage({ params }: WorkoutDayPageProps) {
  const { day } = await params;
  const workoutDay = getWorkoutDayBySlug(day);

  if (!workoutDay) {
    notFound();
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-page-shell">
      <HomeHeader />

      <div className="mx-auto w-full max-w-page px-4 py-6 md:px-6">
        <section className="flex w-full flex-col gap-12">
          <header
            className={cn(
              "flex w-full flex-col gap-6 border-l-[3px] pl-4 lg:flex-row lg:items-start lg:justify-between",
              workoutDay.detailBorderClass ?? "border-success-border",
            )}
          >
            <h1 className="flex flex-col leading-none whitespace-nowrap">
              <span className="text-xs font-medium leading-6 text-primary-hover lg:text-sm">TU PLAN DE ACCIÓN</span>
              <span className="text-2xl font-bold leading-[30px] text-heading lg:text-[30px]">
                {workoutDay.day} - {workoutDay.name}
              </span>
            </h1>

            <div className="flex flex-col items-start gap-6 lg:flex-row lg:items-center lg:flex-nowrap">
              <div className="flex items-center gap-2">
                <IntensityMeter level={workoutDay.intensity} />
                <span className="text-base font-medium uppercase leading-6 text-primary-hover">
                  {workoutDay.intensityLabel}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <ClockIcon />
                <span className="text-base font-bold leading-normal text-subdued">{workoutDay.totalDuration}</span>
              </div>

              {(workoutDay.detailStatusLabel ?? workoutDay.statusLabel) ? (
                <span className="text-base font-bold leading-6 text-success-ink whitespace-nowrap">
                  {workoutDay.detailStatusLabel ?? workoutDay.statusLabel}
                </span>
              ) : null}
            </div>
          </header>

          <div className="flex w-full flex-col gap-6">
            {workoutDay.exercises.map((exercise) => (
              <article key={exercise.title} className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <span aria-hidden className="size-1.5 rounded-full bg-primary" />
                  <h2 className="text-[18px] font-bold leading-normal text-subdued">{exercise.title}</h2>
                </div>

                <div className="flex flex-col gap-3 pl-[14px]">
                  <p className="text-base font-normal leading-normal text-subdued">{exercise.description}</p>
                  <div className="flex items-center gap-2">
                    <ClockIcon />
                    <span className="text-base font-bold leading-normal text-subdued">{exercise.duration}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <aside className="w-full rounded-2xl bg-secondary p-4">
            <h3 className="text-base font-bold uppercase leading-[15px] tracking-[1px] text-primary-hover">
              Razón:
            </h3>
            <p className="mt-2 text-base font-medium leading-6 text-muted-foreground">
              {workoutDay.reason}
            </p>
          </aside>

          {workoutDay.showAdjustDay ? <AdjustDayCard /> : null}
        </section>
      </div>
    </main>
  );
}
