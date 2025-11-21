'use client'

import { useState, useRef, useEffect } from 'react'
import { TopBar } from '@/components/top-bar'
import { AISummaryBanner } from '@/components/ai-summary-banner'
import { DigitizationTiles } from '@/components/digitization-tiles'
import { AnalyzeTiles } from '@/components/analyze-tiles'
import { FinancialImpactTiles } from '@/components/financial-impact-tiles'
import { AIRecommendationsPanel } from '@/components/ai-recommendations-panel'
import { FacilityMap } from '@/components/facility-map'
import { Footer } from '@/components/footer'
import { WorkflowDetail } from '@/components/workflow-detail'
import { TransfusionDetail } from '@/components/transfusion-detail'

export default function Dashboard() {
  const [expandedWorkflow, setExpandedWorkflow] = useState<string | null>(null)
  const [showTransfusionDetail, setShowTransfusionDetail] = useState(false)
  const detailRef = useRef<HTMLDivElement>(null)
  const transfusionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (expandedWorkflow && detailRef.current) {
      setTimeout(() => {
        detailRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 100)
    }
  }, [expandedWorkflow])

  useEffect(() => {
    if (showTransfusionDetail && transfusionRef.current) {
      setTimeout(() => {
        transfusionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 100)
    }
  }, [showTransfusionDetail])

  const handleCardClick = (label: string, secondary?: string) => {
    if (label === 'Transfusion Medicine') {
      setShowTransfusionDetail(true)
      setExpandedWorkflow(null)
    } else {
      setExpandedWorkflow(expandedWorkflow === label ? null : label)
      setShowTransfusionDetail(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <TopBar />

      <main className="flex-1">
        <AISummaryBanner />

        {/* Tier 1: Digitization KPIs */}
        <section className="px-8 py-12">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-semibold text-foreground mb-8 tracking-tight">Digized workflows</h2>
            <DigitizationTiles onCardClick={handleCardClick} />
          </div>
        </section>

        {/* Expandable Detail Section */}
        <div ref={detailRef}>
          <WorkflowDetail
            workflowName={expandedWorkflow || ''}
            isOpen={!!expandedWorkflow}
            onClose={() => setExpandedWorkflow(null)}
          />
        </div>

        {/* Transfusion Detail Section */}
        <div ref={transfusionRef}>
          <TransfusionDetail
            isOpen={showTransfusionDetail}
            onClose={() => setShowTransfusionDetail(false)}
          />
        </div>


        {/* Tier 3: Financial Impact */}
        <section className="px-8 py-12">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-semibold text-foreground mb-8 tracking-tight">Optimize</h2>
            <FinancialImpactTiles />
          </div>
        </section>

        {/* Tier 4: AI Recommendations */}
        <section className="px-8 py-12 bg-secondary/30">
          <div className="max-w-7xl mx-auto">
            <AIRecommendationsPanel />
          </div>
        </section>

        {/* Tier 5: Facility Digital Twin */}
        <section className="px-8 py-12">
          <div className="max-w-7xl mx-auto">
            <FacilityMap />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
