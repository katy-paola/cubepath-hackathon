import { StridiaLogo } from "@/components/brand";
import { ArtificialIntelligence, Sparkles } from "@/components/icons";
import { StridiaShared } from "@/components/shared";
import { TrainingDayCard } from "@/components/training";
import { Hero } from "@/components/landing";
import { Button, SelectBox, ProgressCard } from "@/components/ui";

export default function Home() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,#eef5ff_0,transparent_34%),linear-gradient(180deg,#f6f9ff_0%,#eef3fb_100%)] px-6 py-10 text-slate-900 sm:px-10 lg:px-16">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
        <div className="flex w-full justify-start">
          <Hero />
        </div>
        <section className="overflow-hidden rounded-[36px] border border-white/65 bg-white/84 p-8 shadow-[0_28px_80px_-42px_rgba(15,23,42,0.32)] backdrop-blur sm:p-10">
          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
            <div className="space-y-5">
              <StridiaLogo className="max-w-full" />
              <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-[0.34em] text-primary">
                  Shared Components
                </p>
                <h1 className="max-w-2xl text-4xl font-semibold tracking-[-0.04em] text-balance text-slate-950 sm:text-5xl">
                  Primer bloque UI de Stridia extraido del nodo compartido de
                  Figma.
                </h1>
                <p className="max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
                  Convertimos el frame en componentes reutilizables para CTA y
                  selección de objetivos, listos para crecer sin perder fidelidad
                  visual.
                </p>
              </div>
            </div>

            <div className="rounded-[30px] border border-slate-900/10 bg-[#151515] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
              <div className="grid gap-4 sm:grid-cols-2">
                <Button className="w-[180px]">Generar rutina</Button>
                <Button className="w-[180px]" variant="secondary">
                  Generar rutina
                </Button>
                <Button className="w-[164px]" size="sm">
                  Generar rutina
                </Button>
                <Button className="w-[164px]" size="sm" variant="secondary">
                  Generar rutina
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_320px]">
          <article className="overflow-x-auto rounded-[30px] border border-slate-200/80 bg-white/88 p-6 shadow-[0_20px_60px_-42px_rgba(15,23,42,0.3)]">
            <div className="min-w-[576px] space-y-[22px]">
              <div className="relative h-[147px]">
                <div className="absolute top-[22.5px] left-6">
                  <Button className="w-[180px]">Generar rutina</Button>
                </div>
                <div className="absolute top-[89.5px] left-6">
                  <Button className="w-[164px]" size="sm">
                    Generar rutina
                  </Button>
                </div>
                <div className="absolute top-[22.5px] left-[233px]">
                  <Button className="w-[180px]" variant="secondary">
                    Generar rutina
                  </Button>
                </div>
                <div className="absolute top-[89.5px] left-[233px]">
                  <Button className="w-[164px]" size="sm" variant="secondary">
                    Generar rutina
                  </Button>
                </div>
              </div>

              <div className="relative h-[88px]">
                <div className="absolute top-5 left-[106px] w-[162px]">
                  <SelectBox value="Resistencia" options={goalOptions} />
                </div>
                <div className="absolute top-5 left-[308px] w-[162px]">
                  <SelectBox value="Resistencia" options={goalOptions} defaultOpen />
                </div>
              </div>

              <StridiaShared
                goalOptions={goalOptions}
                selectedGoalIndex={1}
                formLabel="Label"
                selectedGoalValue="Resistencia"
                headerActionLabel="Ajustar rutina"
              />

              <div className="space-y-4 pt-6">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
                  Training Day Card
                </p>
                <div className="flex gap-[16px] overflow-x-auto pb-2">
                  <TrainingDayCard device="desktop" status="default" />
                  <TrainingDayCard device="desktop" status="completed" />
                  <TrainingDayCard device="mobile" status="default" />
                  <TrainingDayCard device="mobile" status="completed" />
                </div>
              </div>

              <div className="space-y-4 pt-6">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
                  Progress Card
                </p>
                <div className="flex gap-[16px] overflow-x-auto pb-2">
                  <ProgressCard type="consistencia" />
                  <ProgressCard type="tiempo" />
                  <ProgressCard type="intensidad" />
                </div>
              </div>
            </div>
          </article>

          <article className="rounded-[30px] border border-slate-200/80 bg-white/88 p-6 shadow-[0_20px_60px_-42px_rgba(15,23,42,0.3)]">
            <div className="space-y-5">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
                MCP Values
              </p>

              <div className="rounded-[24px] bg-slate-950 p-5 text-white">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-2">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-sky-200/75">
                      Action
                    </p>
                    <p className="text-sm leading-6 text-slate-300">
                      `default`: 56px alto, `small`: 40px alto. Padding
                      horizontal de 24px y 16px, gap interno de 4px, radios 16
                      y 12.
                    </p>
                  </div>
                  <Sparkles className="text-sky-200" size={18} />
                </div>
              </div>

              <div className="rounded-[24px] bg-slate-100 p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-2">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">
                      Tokens
                    </p>
                    <p className="text-sm leading-6 text-slate-600">
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

              <div className="rounded-[24px] border border-dashed border-slate-300 bg-white p-4">
                <code className="block overflow-x-auto text-xs leading-6 text-slate-700">
                  {`<Button variant="secondary" />`}
                  <br />
                  {`<SelectTrigger value="Resistencia" />`}
                  <br />
                  {`<SelectContent><SelectItem /></SelectContent>`}
                  <br />
                  {`<AppHeader />`}
                </code>
              </div>
            </div>
          </article>
        </section>
      </div>
    </main>
  );
}

const goalOptions = ["Resistencia", "Resistencia", "Resistencia"] as const;
