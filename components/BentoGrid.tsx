import { SectionHeading } from "./SectionHeading";
import { LiveActivityCard } from "./LiveActivityCard";
import { ROICalculatorCard } from "./ROICalculatorCard";
import { RankingComparisonCard } from "./RankingComparisonCard";

export function BentoGrid() {
  return (
    <section className="relative mx-auto max-w-6xl px-6 py-24">
      <SectionHeading
        eyebrow="De ce trec afacerile de top la StarSync"
        title="Reputația ta, pe pilot automat"
        description="Trei motoare care lucrează simultan: automatizare, predictibilitate și vizibilitate locală."
      />
      <div className="mt-14 grid grid-cols-1 gap-5 lg:grid-cols-3">
        <LiveActivityCard />
        <ROICalculatorCard />
        <RankingComparisonCard />
      </div>
    </section>
  );
}
