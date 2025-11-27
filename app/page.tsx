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
import { SpecimenDigitizationOverview } from '@/components/specimen-digitization-overview'
import { InfraHealthDetail } from '@/components/infra-health-detail'

export default function Dashboard() {
  const [expandedWorkflow, setExpandedWorkflow] = useState<string | null>(null)
  const [showTransfusionDetail, setShowTransfusionDetail] = useState(false)
  const [showSpecimenDetail, setShowSpecimenDetail] = useState(false)
  const [showInfraHealthDetail, setShowInfraHealthDetail] = useState(false)
  const detailRef = useRef<HTMLDivElement>(null)
  const transfusionRef = useRef<HTMLDivElement>(null)
  const specimenRef = useRef<HTMLDivElement>(null)
  const infraHealthRef = useRef<HTMLDivElement>(null)

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

  useEffect(() => {
    if (showSpecimenDetail && specimenRef.current) {
      setTimeout(() => {
        specimenRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 100)
    }
  }, [showSpecimenDetail])

  useEffect(() => {
    if (showInfraHealthDetail && infraHealthRef.current) {
      setTimeout(() => {
        infraHealthRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 100)
    }
  }, [showInfraHealthDetail])

  const handleCardClick = (label: string, secondary?: string) => {
    if (label === 'Transfusion Medicine') {
      setShowTransfusionDetail(true)
      setExpandedWorkflow(null)
      setShowSpecimenDetail(false)
      setShowInfraHealthDetail(false)
    } else if (label === 'Lab Medicine') {
      setShowSpecimenDetail(true)
      setExpandedWorkflow(null)
      setShowTransfusionDetail(false)
      setShowInfraHealthDetail(false)
    } else if (label === 'Infra Health') {
      setShowInfraHealthDetail(true)
      setExpandedWorkflow(null)
      setShowTransfusionDetail(false)
      setShowSpecimenDetail(false)
    } else {
      setExpandedWorkflow(expandedWorkflow === label ? null : label)
      setShowTransfusionDetail(false)
      setShowSpecimenDetail(false)
      setShowInfraHealthDetail(false)
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

        {/* Specimen Digitization Overview Section */}
        <div ref={specimenRef}>
          <SpecimenDigitizationOverview
            isOpen={showSpecimenDetail}
            onClose={() => setShowSpecimenDetail(false)}
          />
        </div>

        {/* Infrastructure Health Detail Section */}
        <div ref={infraHealthRef}>
          <InfraHealthDetail
            isOpen={showInfraHealthDetail}
            onClose={() => setShowInfraHealthDetail(false)}
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
