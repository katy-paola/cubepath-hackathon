import { AppHeader, StridiaLogo } from "@/components/brand";
import { ArtificialIntelligence, Sparkles } from "@/components/icons";
import { AdjustRoutineCard } from "@/components/landing/adjust-routine-card";
import { GenerateSection } from "@/components/landing/generate-section";
import { Hero } from "@/components/landing/hero";
import { generateSectionAssets } from "@/components/landing/generate-section-assets";
import { ProgressSection } from "@/components/progress/progress-section";
import { TrainingDayCard } from "@/components/training";
import {
  Button,
  FormField,
  SelectBox,
  SelectContent,
  SelectItem,
} from "@/components/ui";
import { routineObjectiveOptions } from "@/lib/routine-form-options";

/** Lista demo (3 filas iguales en SelectContent de muestra). */
const GALLERY_GOAL_LIST = [
  "Resistencia",
  "Resistencia",
  "Resistencia",
] as const;

export default function GalleryPage() {
  return (
    <main className="min-h-screen bg-page-shell px-6 py-10 text-heading sm:px-10 lg:px-16">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
        <div className="flex w-full justify-start">
          <Hero />
        </div>

        <section className="flex w-full justify-start">
          <div className="w-full max-w-page overflow-x-hidden">
            <GenerateSection />
          </div>
        </section>

        <section className="flex w-full justify-start">
          <div className="w-full max-w-page overflow-x-hidden">
            <div className="space-y-4">
              <AdjustRoutineCard demoMode device="desktop" />
              <AdjustRoutineCard
                demoMode
                device="tablet"
                className="max-w-3xl"
              />
              <AdjustRoutineCard
                demoMode
                device="mobile"
                className="max-w-lg"
              />
            </div>
          </div>
        </section>

        <section className="overflow-hidden rounded-3xl border border-white/60 bg-white/80 p-8 shadow-xl backdrop-blur sm:p-10">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-end">
            <div className="space-y-5">
              <StridiaLogo className="max-w-full" />
              <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-widest text-primary">
                  Componentes base
                </p>
                <h1 className="max-w-2xl text-balance text-4xl font-semibold tracking-tight text-heading sm:text-5xl">
                  Primer bloque UI de Stridia extraído del nodo compartido de
                  Figma.
                </h1>
                <p className="max-w-2xl text-base leading-7 text-subdued sm:text-lg">
                  Convertimos el frame en componentes reutilizables para CTA y
                  selección de objetivos, listos para crecer sin perder
                  fidelidad visual.
                </p>
              </div>
            </div>

            <div className="rounded-3xl border border-heading/10 bg-zinc-950 p-5 shadow-inner">
              <div className="grid grid-cols-2 gap-4">
                <Button className="w-44 justify-center">Generar rutina</Button>
                <Button className="w-44 justify-center" variant="secondary">
                  Generar rutina
                </Button>
                <Button className="w-40 justify-center" size="sm">
                  Generar rutina
                </Button>
                <Button
                  className="w-40 justify-center"
                  size="sm"
                  variant="secondary"
                >
                  Generar rutina
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="flex flex-col gap-4 lg:flex-row lg:items-start">
          <article className="min-w-0 flex-1 overflow-x-hidden rounded-3xl border border-border/80 bg-white/90 p-6 shadow-lg md:overflow-x-auto">
            <div className="min-w-0 space-y-5 md:min-w-demo-rail">
              <div className="grid grid-cols-2 gap-4 gap-y-6 sm:max-w-xl">
                <Button className="w-44 justify-center">Generar rutina</Button>
                <Button className="w-44 justify-center" variant="secondary">
                  Generar rutina
                </Button>
                <Button className="w-40 justify-center" size="sm">
                  Generar rutina
                </Button>
                <Button
                  className="w-40 justify-center"
                  size="sm"
                  variant="secondary"
                >
                  Generar rutina
                </Button>
              </div>

              <div className="flex flex-wrap gap-4">
                <div className="w-40">
                  <SelectBox
                    value="Resistencia"
                    options={routineObjectiveOptions}
                  />
                </div>
                <div className="w-40">
                  <SelectBox
                    value="Resistencia"
                    options={routineObjectiveOptions}
                    defaultOpen
                  />
                </div>
              </div>

              <div className="flex flex-wrap items-start gap-4">
                <SelectBox
                  value="Resistencia"
                  options={routineObjectiveOptions}
                  triggerAriaLabel="Seleccionar Objetivo (chevron Figma)"
                  arrowIconSrc={generateSectionAssets.selectArrow}
                />
                <SelectBox
                  value="Resistencia"
                  options={routineObjectiveOptions}
                  defaultOpen
                  triggerAriaLabel="Seleccionar Objetivo (chevron Figma, abierto)"
                  arrowIconSrc={generateSectionAssets.selectArrow}
                />
              </div>

              <div className="flex w-full flex-col items-start gap-5">
                <div className="flex w-full justify-start">
                  <SelectContent className="w-40">
                    {GALLERY_GOAL_LIST.map((option, index) => (
                      <SelectItem
                        key={`${option}-${index}`}
                        selected={index === 1}
                      >
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </div>
                <FormField className="w-40" label="Label">
                  <SelectBox
                    value="Resistencia"
                    options={routineObjectiveOptions}
                    className="w-full"
                    triggerAriaLabel="Seleccionar Label (actual: Resistencia)"
                  />
                </FormField>
                <AppHeader className="max-w-xl" actionLabel="Ajustar rutina" />
              </div>

              <div className="space-y-4 pt-6">
                <p className="text-xs font-semibold uppercase tracking-widest text-subdued">
                  Training Day Card
                </p>
                <div className="space-y-4">
                  <div className="flex gap-4 overflow-x-auto pb-2">
                    <TrainingDayCard device="desktop" status="default" />
                    <TrainingDayCard device="desktop" status="completed" />
                    <TrainingDayCard
                      device="desktop"
                      status="default"
                      workoutLabel="Intervalos"
                      typeLabel="Tipo: Velocidad"
                    />
                  </div>

                  <div className="space-y-3">
                    <TrainingDayCard
                      device="desktop"
                      status="default"
                      className="max-w-none"
                    />
                    <TrainingDayCard
                      device="desktop"
                      status="completed"
                      className="max-w-none"
                    />
                    <TrainingDayCard
                      device="desktop"
                      status="default"
                      className="max-w-none"
                      workoutLabel="Tirada larga"
                      typeLabel="Tipo: Resistencia"
                    />
                  </div>

                  <div className="space-y-3">
                    <TrainingDayCard
                      device="mobile"
                      status="default"
                      className="max-w-none"
                    />
                    <TrainingDayCard
                      device="mobile"
                      status="completed"
                      className="max-w-none"
                    />
                    <TrainingDayCard
                      device="mobile"
                      status="default"
                      className="max-w-none"
                      workoutLabel="Tirada larga"
                      typeLabel="Tipo: Resistencia"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4 pt-6">
                <p className="text-xs font-semibold uppercase tracking-widest text-subdued">
                  Progress Card
                </p>
                <div className="space-y-4">
                  <ProgressSection device="desktop" />
                  <ProgressSection device="tablet" className="max-w-lg" />
                  <ProgressSection device="mobile" className="max-w-sm" />
                </div>
              </div>
            </div>
          </article>

          <article className="w-full shrink-0 rounded-3xl border border-border/80 bg-white/90 p-6 shadow-lg lg:w-80">
            <div className="space-y-5">
              <p className="text-xs font-semibold uppercase tracking-widest text-subdued">
                Valores de referencia
              </p>

              <div className="rounded-2xl bg-slate-950 p-5 text-white">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-2">
                    <p className="text-xs font-semibold uppercase tracking-wide text-sky-200/80">
                      Action
                    </p>
                    <p className="text-sm leading-6 text-slate-300">
                      `default`: 56px alto, `small`: 40px alto. Padding
                      horizontal de 24px y 16px, gap interno de 4px, radios 16 y
                      12.
                    </p>
                  </div>
                  <Sparkles className="text-sky-200" size={18} />
                </div>
              </div>

              <div className="rounded-2xl bg-slate-100 p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-2">
                    <p className="text-xs font-semibold uppercase tracking-wide text-subdued">
                      Tokens
                    </p>
                    <p className="text-sm leading-6 text-subdued">
                      `blue/600` `#0051FF`, `blue/700` `#0041CC`, `blue/800`
                      `#003099`, `neutral/50` `#F9FAFB`, `neutral/100`
                      `#ECEFF3`, `neutral/200` `#DADFE7`, `neutral/300`
                      `#C1C9D7`, `neutral/800` `#3C485D`, `neutral/900`
                      `#28303E`.
                    </p>
                  </div>
                  <ArtificialIntelligence className="text-primary" size={18} />
                </div>
              </div>
            </div>
          </article>
        </section>
      </div>
    </main>
  );
}
