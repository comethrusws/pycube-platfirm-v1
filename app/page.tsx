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
import { BiomedicalAssetsDetail } from '@/components/biomedical-assets-detail'
import { TransfusionDetail } from '@/components/transfusion-detail'
import { LabMedicineDetail } from '@/components/lab-medicine-detail'
import { InfraHealthDetail } from '@/components/infra-health-detail'
import { SupplyChainDetail } from '@/components/supply-chain-detail'
import { DEFAULT_CUSTOMER } from '@/lib/customer-config'

export default function Dashboard() {
  // Global State
  const [viewMode, setViewMode] = useState<'executive' | 'operational'>('executive')
  const [selectedCustomer, setSelectedCustomer] = useState<string>(DEFAULT_CUSTOMER)

  // Navigation State
  const [expandedWorkflow, setExpandedWorkflow] = useState<string | null>(null)
  const [showTransfusionDetail, setShowTransfusionDetail] = useState(false)
  const [showSpecimenDetail, setShowSpecimenDetail] = useState(false)
  const [showInfraHealthDetail, setShowInfraHealthDetail] = useState(false)
  const [showSupplyChainDetail, setShowSupplyChainDetail] = useState(false)

  // Refs for scrolling
  const detailRef = useRef<HTMLDivElement>(null)
  const transfusionRef = useRef<HTMLDivElement>(null)
  const specimenRef = useRef<HTMLDivElement>(null)
  const infraHealthRef = useRef<HTMLDivElement>(null)
  const supplyChainRef = useRef<HTMLDivElement>(null)

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

  useEffect(() => {
    if (showSupplyChainDetail && supplyChainRef.current) {
      setTimeout(() => {
        supplyChainRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 100)
    }
  }, [showSupplyChainDetail])

  const handleCardClick = (label: string, secondary?: string) => {
    if (label === 'Transfusion Medicine') {
      setShowTransfusionDetail(true)
      setExpandedWorkflow(null)
      setShowSpecimenDetail(false)
      setShowInfraHealthDetail(false)
      setShowSupplyChainDetail(false)
    } else if (label === 'Lab Medicine') {
      setShowSpecimenDetail(true)
      setExpandedWorkflow(null)
      setShowTransfusionDetail(false)
      setShowInfraHealthDetail(false)
      setShowSupplyChainDetail(false)
    } else if (label === 'Infra Health') {
      setShowInfraHealthDetail(true)
      setExpandedWorkflow(null)
      setShowTransfusionDetail(false)
      setShowSpecimenDetail(false)
      setShowSupplyChainDetail(false)
    } else if (label === 'Supply chain') {
      setShowSupplyChainDetail(true)
      setExpandedWorkflow(null)
      setShowTransfusionDetail(false)
      setShowSpecimenDetail(false)
      setShowInfraHealthDetail(false)
    } else {
      setExpandedWorkflow(expandedWorkflow === label ? null : label)
      setShowTransfusionDetail(false)
      setShowSpecimenDetail(false)
      setShowInfraHealthDetail(false)
      setShowSupplyChainDetail(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <TopBar
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        selectedCustomer={selectedCustomer}
        onCustomerChange={setSelectedCustomer}
      />

      <main className="flex-1">
        <AISummaryBanner
          onCardClick={handleCardClick}
        // TODO: Pass customer-specific AI insights here
        />

        {/* Tier 1: Digitization KPIs */}
        <section className="px-8 py-12">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-semibold text-foreground mb-8 tracking-tight">
              {viewMode === 'executive' ? 'Enterprise Overview' : 'Operational Workflows'}
            </h2>
            <DigitizationTiles onCardClick={handleCardClick} />
          </div>
        </section>

        {/* Biomedical Assets Detail Section */}
        <div ref={detailRef}>
          <BiomedicalAssetsDetail
            isOpen={!!expandedWorkflow}
            onClose={() => setExpandedWorkflow(null)}
            // @ts-ignore - Prop will be added in next step
            customerId={selectedCustomer}
          />
        </div>

        {/* Transfusion Detail Section */}
        <div ref={transfusionRef}>
          <TransfusionDetail
            isOpen={showTransfusionDetail}
            onClose={() => setShowTransfusionDetail(false)}
          />
        </div>

        {/* Lab Medicine Detail Section */}
        <div ref={specimenRef}>
          <LabMedicineDetail
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

        {/* Supply Chain Detail Section */}
        <div ref={supplyChainRef}>
          <SupplyChainDetail
            isOpen={showSupplyChainDetail}
            onClose={() => setShowSupplyChainDetail(false)}
          />
        </div>


        {/* Tier 3: Financial Impact - Only show in Executive Mode */}
        {viewMode === 'executive' && (
          <section className="px-8 py-12">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-2xl font-semibold text-foreground mb-8 tracking-tight">Financial Impact</h2>
              <FinancialImpactTiles />
            </div>
          </section>
        )}

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
