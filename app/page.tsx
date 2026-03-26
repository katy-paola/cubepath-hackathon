import { AdjustRoutineCard, GenerateSection, Hero } from "@/components/landing";
import { ProgressSection } from "@/components/progress";
import { HomeHeader } from "@/components/home/home-header";
import { WorkoutSection } from "@/components/home/workout-section";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f5f8ff] overflow-x-hidden">
      <HomeHeader />
      <div className="mx-auto w-full max-w-[1232px]">
        <div className="flex flex-col gap-[32px] md:gap-[64px] px-[16px] md:px-[24px] py-[16px] md:py-[24px]">
          {/* These components are already responsive by design tokens/max-w patterns */}
          {/* Imported below to avoid barrel churn */}
          {/* (see imports added at top) */}
          {/* Hero */}
          <Hero />

          {/* Configure routine + AI info */}
          <GenerateSection />

          {/* Workout plan */}
          <WorkoutSection device="desktop" className="hidden lg:flex" />
          <WorkoutSection device="tablet" className="hidden sm:flex lg:hidden" />
          <WorkoutSection device="mobile" className="flex sm:hidden" />

          {/* Weekly progress */}
          <ProgressSection device="desktop" className="hidden lg:flex" />
          <ProgressSection device="tablet" className="hidden sm:flex lg:hidden max-w-[505px]" />
          <ProgressSection device="mobile" className="flex sm:hidden max-w-[403px]" />

          {/* Adjust routine */}
          <AdjustRoutineCard device="desktop" className="hidden lg:flex" />
          <AdjustRoutineCard device="tablet" className="hidden sm:flex lg:hidden max-w-[750px]" />
          <AdjustRoutineCard device="mobile" className="flex sm:hidden max-w-[492px]" />
        </div>
      </div>
    </main>
  );
}
