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
import { UnderutilizedAssetsPanel } from '@/components/underutilized-assets-panel'
import { PMWorklistView } from '@/components/pm-worklist-view'
import { HospitalNetworkMap } from '@/components/hospital-network-map'
import { EducationOverlay } from '@/components/education-overlay'
import { InvestorModeView } from '@/components/investor-mode-view'
import { DemoMode, demoModes } from '@/lib/demo-mode'
import { BookOpen, Wrench, TrendingDown, Map, Briefcase } from 'lucide-react'

export default function Dashboard() {
  const [demoMode, setDemoMode] = useState<DemoMode>('detailed')
  const [expandedWorkflow, setExpandedWorkflow] = useState<string | null>(null)
  const [showTransfusionDetail, setShowTransfusionDetail] = useState(false)
  const [showSpecimenDetail, setShowSpecimenDetail] = useState(false)
  const [showInfraHealthDetail, setShowInfraHealthDetail] = useState(false)
  const [showSupplyChainDetail, setShowSupplyChainDetail] = useState(false)
  const [showUnderutilizedPanel, setShowUnderutilizedPanel] = useState(false)
  const [showPMWorklist, setShowPMWorklist] = useState(false)
  const [showNetworkMap, setShowNetworkMap] = useState(false)
  const [showEducationOverlay, setShowEducationOverlay] = useState(false)
  const detailRef = useRef<HTMLDivElement>(null)
  const transfusionRef = useRef<HTMLDivElement>(null)
  const specimenRef = useRef<HTMLDivElement>(null)
  const infraHealthRef = useRef<HTMLDivElement>(null)
  const supplyChainRef = useRef<HTMLDivElement>(null)

  const currentDemoMode = demoModes[demoMode]

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

  // If investor mode, show dedicated investor view
  if (demoMode === 'investor') {
    return <InvestorModeView />
  }

  return (
    <div className="min-h-screen bg-background">
      <TopBar />

      {/* Demo Mode Selector */}
      <div className="bg-blue-600 text-white px-8 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium">Demo Mode:</span>
            <select 
              value={demoMode}
              onChange={(e) => setDemoMode(e.target.value as DemoMode)}
              className="px-3 py-1.5 bg-white text-gray-900 rounded-lg text-sm font-medium"
            >
              <option value="platform">Platform Overview (C-Suite)</option>
              <option value="detailed">Detailed Analytics (Specialists)</option>
              <option value="investor">Investor Pitch (10 min)</option>
            </select>
            <span className="text-xs opacity-75">
              {currentDemoMode.audience} • {currentDemoMode.duration}
            </span>
          </div>
          
          {currentDemoMode.features.showEducationOverlay && (
            <button 
              onClick={() => setShowEducationOverlay(true)}
              className="flex items-center gap-2 px-4 py-1.5 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-medium transition-colors"
            >
              <BookOpen className="h-4 w-4" />
              How It Works
            </button>
          )}
        </div>
      </div>

      {/* Quick Access Toolbar (for detailed mode) */}
      {currentDemoMode.features.showPMWorklist && (
        <div className="bg-gray-50 border-b px-8 py-3">
          <div className="max-w-7xl mx-auto flex items-center gap-3">
            <span className="text-sm font-medium text-gray-700">Quick Access:</span>
            <button 
              onClick={() => setShowUnderutilizedPanel(!showUnderutilizedPanel)}
              className="flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-300 hover:border-orange-500 rounded-lg text-sm font-medium transition-colors"
            >
              <TrendingDown className="h-4 w-4 text-orange-600" />
              Underutilized Assets
            </button>
            <button 
              onClick={() => setShowPMWorklist(!showPMWorklist)}
              className="flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-300 hover:border-blue-500 rounded-lg text-sm font-medium transition-colors"
            >
              <Wrench className="h-4 w-4 text-blue-600" />
              PM Worklist
            </button>
            <button 
              onClick={() => setShowNetworkMap(!showNetworkMap)}
              className="flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-300 hover:border-purple-500 rounded-lg text-sm font-medium transition-colors"
            >
              <Map className="h-4 w-4 text-purple-600" />
              Hospital Network
            </button>
          </div>
        </div>
      )}

      <main className="flex-1">
        <AISummaryBanner onCardClick={handleCardClick} />

        {/* Tier 1: Digitization KPIs */}
        <section className="px-8 py-12">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-semibold text-foreground mb-8 tracking-tight">Digized workflows</h2>
            <DigitizationTiles onCardClick={handleCardClick} />
          </div>
        </section>

        {/* Biomedical Assets Detail Section */}
        <div ref={detailRef}>
          <BiomedicalAssetsDetail
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


        {/* Tier 3: Financial Impact */}
        <section className="px-8 py-12">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-semibold text-foreground mb-8 tracking-tight">Optimize</h2>
            <FinancialImpactTiles />
          </div>
        </section>

        {/* NEW: Underutilized Assets Panel */}
        {showUnderutilizedPanel && currentDemoMode.features.showAssetLifecycle && (
          <section className="px-8 py-12 bg-orange-50">
            <div className="max-w-7xl mx-auto">
              <UnderutilizedAssetsPanel />
            </div>
          </section>
        )}

        {/* NEW: PM Worklist */}
        {showPMWorklist && currentDemoMode.features.showPMWorklist && (
          <section className="px-8 py-12 bg-blue-50">
            <div className="max-w-7xl mx-auto">
              <PMWorklistView />
            </div>
          </section>
        )}

        {/* NEW: Hospital Network Map */}
        {showNetworkMap && currentDemoMode.features.showHospitalNetwork && (
          <section className="px-8 py-12 bg-purple-50">
            <div className="max-w-7xl mx-auto">
              <HospitalNetworkMap />
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

      {/* Education Overlay Modal */}
      {showEducationOverlay && (
        <EducationOverlay onClose={() => setShowEducationOverlay(false)} />
      )}
    </div>
  )
}
