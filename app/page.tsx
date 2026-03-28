import { HomeHeader } from "@/components/home/home-header";
import { WorkoutSection } from "@/components/home/workout-section";
import { AdjustRoutineCard } from "@/components/landing/adjust-routine-card";
import { GenerateSection } from "@/components/landing/generate-section";
import { Hero } from "@/components/landing/hero";
import { ProgressSection } from "@/components/progress/progress-section";

export default function Home() {
  return (
    <main
      className="min-h-screen bg-page-shell overflow-x-hidden"
      aria-label="Contenido principal"
    >
      <HomeHeader />
      <div className="mx-auto w-full max-w-page">
        <div className="flex flex-col gap-8 px-4 py-4 md:gap-16 md:px-6 md:py-6">
          <Hero />
          <GenerateSection />
          <WorkoutSection device="desktop" className="hidden lg:flex" />
          <WorkoutSection device="tablet" className="hidden sm:flex lg:hidden" />
          <WorkoutSection device="mobile" className="flex sm:hidden" />
          <ProgressSection device="desktop" className="hidden lg:flex" />
          <ProgressSection device="tablet" className="hidden max-w-lg sm:flex lg:hidden" />
          <ProgressSection device="mobile" className="flex max-w-sm sm:hidden" />
          <AdjustRoutineCard device="desktop" className="hidden lg:flex" />
          <AdjustRoutineCard device="tablet" className="hidden max-w-3xl sm:flex lg:hidden" />
          <AdjustRoutineCard device="mobile" className="flex max-w-lg sm:hidden" />
        </div>
      </div>
    </main>
  );
}
