import { TopBar } from '@/components/top-bar'
import { AISummaryBanner } from '@/components/ai-summary-banner'
import { DigitizationTiles } from '@/components/digitization-tiles'
import { AnalyzeTiles } from '@/components/analyze-tiles'
import { FinancialImpactTiles } from '@/components/financial-impact-tiles'
import { AIRecommendationsPanel } from '@/components/ai-recommendations-panel'
import { FacilityMap } from '@/components/facility-map'
import { Footer } from '@/components/footer'

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      
      <main className="flex-1">
        <AISummaryBanner />
        
        {/* Tier 1: Digitization KPIs */}
        <section className="px-6 py-8">
          <h2 className="text-xl font-semibold text-foreground mb-6 text-pretty">Digitize</h2>
          <DigitizationTiles />
        </section>
        
        {/* Tier 2: Cross-Product Analysis */}
        <section className="px-6 py-8 bg-secondary">
          <h2 className="text-xl font-semibold text-foreground mb-6 text-pretty">Analyze</h2>
          <AnalyzeTiles />
        </section>
        
        {/* Tier 3: Financial Impact */}
        <section className="px-6 py-8">
          <h2 className="text-xl font-semibold text-foreground mb-6 text-pretty">Optimize</h2>
          <FinancialImpactTiles />
        </section>
        
        {/* Tier 4: AI Recommendations */}
        <section className="px-6 py-8 bg-secondary">
          <AIRecommendationsPanel />
        </section>
        
        {/* Tier 5: Facility Digital Twin */}
        <section className="px-6 py-8">
          <FacilityMap />
        </section>
      </main>
      
      <Footer />
    </div>
  )
}
