import type { ComponentPropsWithoutRef } from "react";

import { Fugaz_One, Lexend } from "next/font/google";

import { cn } from "@/lib/utils";

const lexendBlack = Lexend({ subsets: ["latin"], weight: "900" });
const fugazOne = Fugaz_One({ subsets: ["latin"], weight: "400" });

export type HeroProps = Omit<
  ComponentPropsWithoutRef<"section">,
  "children"
> & {
  titlePrefix?: string;
  titleHighlight?: string;
  subtitle?: string;
};

export function Hero({
  className,
  titlePrefix = "Crea una rutina de running personalizada en ",
  titleHighlight = "segundos.",
  subtitle = "Ajusta tu entrenamiento según tu nivel, objetivos y estado diario con ayuda de la IA de Stridia, la tecnología que entiende tu ritmo.",
  ...props
}: HeroProps) {
  return (
    <section
      {...props}
      className={cn(
        // Keep desktop fidelity, but avoid overflow on small screens.
        "bg-[#e0eaff] content-stretch flex flex-col items-start overflow-clip p-[64px] relative rounded-[24px] w-full max-w-[1232px]",
        className,
      )}
    >
      <div
        className="absolute bg-[#c2d5ff] blur-[50px] right-[-80px] rounded-[9999px] size-[384px] top-[-80px]"
        aria-hidden="true"
      />

      <div className="content-stretch flex flex-col gap-[24px] items-start leading-0 max-w-[900px] relative shrink-0 w-full">
        <div
          className={cn(
            lexendBlack.className,
            "flex flex-col font-black relative shrink-0 text-[0px] text-foreground-strong w-full min-w-0",
            "lg:min-w-full lg:w-min",
          )}
        >
          <p className={cn(fugazOne.className, "not-italic text-[48px]")}>
            <span className="leading-[64px]">{titlePrefix}</span>
            <span className="leading-[64px] text-primary">
              {titleHighlight}
            </span>
          </p>
        </div>

        <div className="flex flex-col font-['Space_Grotesk:Medium',sans-serif] font-medium justify-center relative shrink-0 text-[20px] text-muted-foreground w-full max-w-[648.95px] min-w-0">
          <p className="leading-[28px]">{subtitle}</p>
        </div>
      </div>
    </section>
  );
}

