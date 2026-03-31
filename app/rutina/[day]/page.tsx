import { WorkoutDayClient } from "./workout-day-client";

type WorkoutDayPageProps = {
  params: Promise<{ day: string }>;
};

export default async function WorkoutDayPage({ params }: WorkoutDayPageProps) {
  const { day } = await params;
  return <WorkoutDayClient daySlug={day} />;
}
