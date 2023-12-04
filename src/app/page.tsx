import HeroSection from "./ui/HeroSection"
import PerksSection from "./ui/PerksSection"
import TrendingSection from "./ui/TrendingSection"

export default function Home() {

  
  return (
    <div className="bg-white">
      <main>
        <HeroSection />

        <TrendingSection isCompact={true} />

        <PerksSection />
      </main>
    </div>
  )
}
