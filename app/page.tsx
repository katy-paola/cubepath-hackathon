import { HomeHeader } from "@/components/home/home-header";
import { WorkoutSectionLive } from "@/components/home/workout-section-live";
import { GenerateSection } from "@/components/landing/generate-section";
import { Hero } from "@/components/landing/hero";

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
          <WorkoutSectionLive />
        </div>
      </div>
    </main>
  );
}
