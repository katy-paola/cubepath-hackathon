import type { ComponentPropsWithoutRef } from "react";

import { Fugaz_One } from "next/font/google";

import { cn } from "@/lib/utils";

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
      aria-labelledby="hero-heading"
      className={cn(
        "relative flex w-full max-w-page flex-col items-start overflow-clip rounded-3xl bg-hero-surface p-4 md:p-8 lg:p-16",
        className,
      )}
    >
      <div
        className="absolute -right-20 -top-20 size-96 rounded-full bg-hero-orb blur-3xl"
        aria-hidden="true"
      />

      <div className="relative flex w-full max-w-4xl flex-col gap-4 md:gap-6">
        <h1
          id="hero-heading"
          className={cn(
            fugazOne.className,
            "text-2xl font-normal not-italic text-heading md:text-4xl lg:text-5xl",
          )}
        >
          <span className="leading-9 md:leading-12 lg:leading-16">{titlePrefix}</span>
          <span className="leading-9 text-primary md:leading-12 lg:leading-16">
            {titleHighlight}
          </span>
        </h1>

        <p className="max-w-2xl text-base font-medium leading-7 text-muted-foreground lg:text-xl">
          {subtitle}
        </p>
      </div>
    </section>
  );
}
