import Image from "next/image";
import { generateSectionAssets } from "./generate-section-assets";
import { DailyFact } from "@/lib/consts/daily-fact-list";
import { getDailyFact } from "@/lib/helpers/getDailyFact";
import { useState } from "react";

export function GenerateSectionInfo() {
  const [dailyFact] = useState<DailyFact>(() => getDailyFact());
  return (
    <div className="col-span-1 flex min-h-0 flex-col gap-6 self-stretch justify-self-stretch lg:col-span-1 lg:h-full">
      <article
        aria-labelledby="entrenador-digital-heading"
        className="relative flex min-h-0 w-full flex-1 flex-col items-start gap-4 overflow-hidden rounded-3xl bg-primary p-4 md:gap-5 md:p-5 lg:justify-center lg:gap-6 lg:p-6"
      >
        <div className="relative flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary-accent-tile">
          <div className="relative size-6 shrink-0">
            <div className="absolute inset-[8.33%_10.42%]">
              <div className="absolute inset-[-3%_-3.16%]">
                <div className="relative size-full">
                  <Image
                    src={generateSectionAssets.aiIconPart1}
                    alt=""
                    fill
                    aria-hidden
                    className="object-contain"
                    sizes="24px"
                  />
                </div>
              </div>
            </div>

            <div className="absolute inset-[22.49%_39.58%_43.32%_27.08%]">
              <div className="absolute inset-[-6.09%_-6.25%]">
                <div className="relative size-full">
                  <Image
                    src={generateSectionAssets.aiIconPart2}
                    alt=""
                    fill
                    aria-hidden
                    className="object-contain"
                    sizes="24px"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <h3
          id="entrenador-digital-heading"
          className="w-full min-w-0 text-xl font-bold leading-9 text-primary-foreground md:text-2xl md:leading-10 lg:w-min lg:min-w-full lg:text-2xl lg:leading-10"
        >
          Tu entrenador digital inteligente
        </h3>

        <p className="w-full min-w-0 text-sm font-medium leading-relaxed text-primary-foreground/90 lg:w-min lg:min-w-full lg:text-base">
          Nuestra IA ajusta tu entrenamiento basándose en tu nivel, objetivos y
          estado diario para garantizar un proceso seguro y efectivo.
        </p>

        <ul className="m-0 flex list-none flex-col gap-4 p-0">
          <li className="flex items-center gap-2">
            <div className="relative size-6 shrink-0">
              <div className="absolute inset-[8.33%]">
                <div className="absolute inset-[-3%]">
                  <div className="relative size-full">
                    <Image
                      src={generateSectionAssets.checkmark}
                      alt=""
                      fill
                      aria-hidden
                      className="object-contain"
                      sizes="24px"
                    />
                  </div>
                </div>
              </div>
            </div>
            <span className="whitespace-nowrap text-base leading-6 text-white">
              Adaptación en tiempo real
            </span>
          </li>
          <li className="flex items-center gap-2">
            <div className="relative size-6 shrink-0">
              <div className="absolute inset-[8.33%]">
                <div className="absolute inset-[-3%]">
                  <div className="relative size-full">
                    <Image
                      src={generateSectionAssets.checkmark}
                      alt=""
                      fill
                      aria-hidden
                      className="object-contain"
                      sizes="24px"
                    />
                  </div>
                </div>
              </div>
            </div>
            <span className="whitespace-nowrap text-base leading-6 text-white">
              Prevención de lesiones
            </span>
          </li>
        </ul>

        <div className="absolute flex flex-col items-start -right-5 lg:right-[-53.45px] -top-11.75">
          <div className="flex h-47.5 items-center justify-center relative shrink-0 w-55">
            <div className="scale-[1.5]">
              <div className="h-[126.667px] relative w-[146.667px]">
                <Image
                  src={generateSectionAssets.aiIcon}
                  alt=""
                  fill
                  aria-hidden
                  className="object-contain"
                  sizes="150px"
                />
              </div>
            </div>
          </div>
        </div>
      </article>

      <aside
        aria-labelledby="dato-del-dia-heading"
        className="flex w-full shrink-0 flex-col gap-3 rounded-3xl bg-hero-surface p-6"
      >
        <div className="flex items-center gap-2">
          <div className="relative size-6 shrink-0">
            <div className="absolute inset-[8.33%]">
              <div className="absolute inset-[-5%]">
                <div className="relative size-full">
                  <Image
                    src={generateSectionAssets.ideaIcon}
                    alt=""
                    fill
                    aria-hidden
                    className="object-contain"
                    sizes="24px"
                  />
                </div>
              </div>
            </div>
          </div>
          <h4
            id="dato-del-dia-heading"
            className="whitespace-nowrap text-xl font-bold leading-6 text-primary-hover"
          >
            Dato del día
          </h4>
        </div>

        <p className="w-full min-w-0 text-sm leading-relaxed text-muted-foreground lg:w-min lg:min-w-full lg:text-base">
          {dailyFact.text}
        </p>
      </aside>
    </div>
  );
}
