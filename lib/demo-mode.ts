/**
 * Demo Mode Configuration
 * Supports Platform-level (C-suite) and Detailed (specialist) demo modes
 * R6.5: Persona-based demo views for different stakeholder types
 */

export type DemoMode = 'platform' | 'detailed'

export type Persona = 'cto' | 'biomed-director' | 'lab-director' | 'transfusion-director' | 'supply-chain-director' | 'cfo' | 'coo'

export interface DemoModeConfig {
  mode: DemoMode
  label: string
  description: string
  audience: string
  features: {
    showDetailedCharts: boolean
    showHospitalNetwork: boolean
    showAllKPIs: boolean
    showTier3Drilldown: boolean
    showAIInsights: boolean
    kpiLimit?: number // Limit number of KPIs shown in platform mode
  }
}

export interface PersonaConfig {
  id: Persona
  label: string
  title: string
  description: string
  primaryDomains: string[] // Which domains they care about most
  kpiFocus: string[] // Specific KPI IDs they track
  painPoints: string[] // What keeps them up at night
  successMetrics: string[] // How they measure success
  demoFlow: string[] // Recommended demo sequence
  talkingPoints: string[] // Key messages for this persona
}

export const demoModes: Record<DemoMode, DemoModeConfig> = {
  platform: {
    mode: 'platform',
    label: 'Platform Overview',
    description: 'Cross-asset, high-level view for C-suite executives',
    audience: 'CEO, CFO, COO',
    features: {
      showDetailedCharts: false,
      showHospitalNetwork: false,
      showAllKPIs: false,
      showTier3Drilldown: false,
      showAIInsights: true,
      kpiLimit: 4 // Show only top 4 most important KPIs
    }
  },
  detailed: {
    mode: 'detailed',
    label: 'Detailed Analytics',
    description: 'Deep-dive, asset-level view for specialists',
    audience: 'Lab Directors, Biomedical Executives, Department Heads',
    features: {
      showDetailedCharts: true,
      showHospitalNetwork: true,
      showAllKPIs: true,
      showTier3Drilldown: true,
      showAIInsights: true
    }
  }
}

// Persona configurations (R6.5)
export const personaConfigs: Record<Persona, PersonaConfig> = {
  'cto': {
    id: 'cto',
    label: 'CTO',
    title: 'Chief Technology Officer',
    description: 'Evaluating platform architecture, scalability, security, and integration capabilities',
    primaryDomains: ['Infrastructure', 'Integration', 'Security'],
    kpiFocus: [
      'infra.gateway_uptime',
      'infra.tag_health',
      'integration.hl7_success_rate',
      'integration.api_latency'
    ],
    painPoints: [
      'Legacy RTLS systems that don\'t scale',
      'Siloed point solutions with no integration',
      'Poor API documentation and limited extensibility',
      'Security and compliance concerns (HIPAA, SOC 2)'
    ],
    successMetrics: [
      'System uptime (99.9%+)',
      'API response time (<100ms)',
      'Integration success rate (99%+)',
      'Time to deploy new hospital (<4 weeks)'
    ],
    demoFlow: [
      '1. Infrastructure Health (gateway coverage, tag battery)',
      '2. Integration Architecture (HL7, FHIR, REST APIs)',
      '3. Security & Compliance (encryption, audit logs, access control)',
      '4. Scalability (multi-tenant, hospital network support)',
      '5. Developer Experience (API docs, SDKs, webhooks)'
    ],
    talkingPoints: [
      'Modern tech stack: TypeScript, React, PostgreSQL, Redis',
      '5x lower infrastructure cost vs legacy RTLS ($485 vs $2,400 gateways)',
      'RESTful APIs with comprehensive documentation',
      'SOC 2 Type II in progress, HIPAA compliant',
      'Multi-tenant SaaS with enterprise security'
    ]
  },
  'biomed-director': {
    id: 'biomed-director',
    label: 'Biomed Director',
    title: 'Director of Biomedical Engineering',
    description: 'Managing medical equipment lifecycle, utilization, maintenance, and compliance',
    primaryDomains: ['Biomedical Assets'],
    kpiFocus: [
      'biomed.utilization_rate',
      'biomed.maintenance_completion',
      'biomed.time_to_locate',
      'biomed.asset_uptime',
      'biomed.lost_assets'
    ],
    painPoints: [
      'Low asset utilization (45-60%) leading to unnecessary CapEx',
      'Time wasted searching for equipment (15-20 min/search)',
      'Maintenance delays causing downtime',
      'Equipment loss and theft ($2M+ annually)',
      'Manual tracking with barcode scanners'
    ],
    successMetrics: [
      'Utilization rate improvement (45% → 75%)',
      'Reduce time to locate (<2 minutes)',
      'PM completion rate (95%+)',
      'Eliminate lost assets (0 per month)',
      'Reduce maintenance backlog (-60%)'
    ],
    demoFlow: [
      '1. Current Lifecycle Distribution (5,005 assets tracked)',
      '2. Utilization Rate (75% with automated check-in/out)',
      '3. Time to Locate (avg 90 seconds vs 18 minutes)',
      '4. Preventive Maintenance Worklist (auto-generated)',
      '5. Asset Lifecycle Analytics (idle, soiled, repair cycles)'
    ],
    talkingPoints: [
      'Track 5,005 assets in real-time without manual scanning',
      '75% utilization rate (vs 45% before PyCube)',
      'Automated PM worklists reduce maintenance backlog 60%',
      'Reduce time to locate from 18 min → 90 sec',
      '$1.2M annual value from improved utilization'
    ]
  },
  'lab-director': {
    id: 'lab-director',
    label: 'Lab Director',
    title: 'Laboratory Director',
    description: 'Optimizing specimen turnaround time, tracking coverage, and courier efficiency',
    primaryDomains: ['Lab Medicine'],
    kpiFocus: [
      'lab.avg_turnaround_time',
      'lab.tracking_coverage',
      'lab.courier_delays',
      'lab.specimens_tracked'
    ],
    painPoints: [
      'Long turnaround times (60-90 minutes)',
      '75% of delays happen before analysis starts',
      'Courier delays and routing inefficiencies',
      'No visibility into specimen location',
      'Manual chain of custody documentation'
    ],
    successMetrics: [
      'Reduce TAT by 30%+ (68 min → 42 min)',
      '95%+ tracking coverage',
      'Eliminate courier delays (0 per day)',
      'Automated chain of custody (100%)',
      'Real-time specimen location visibility'
    ],
    demoFlow: [
      '1. Specimen Tracking Overview (12,450 specimens/day)',
      '2. Turnaround Time Analysis (68 min → 42 min)',
      '3. Courier Performance (route optimization)',
      '4. Chain of Custody (automated checkpoints)',
      '5. Bottleneck Identification (collection delays)'
    ],
    talkingPoints: [
      '38% TAT reduction (68 min → 42 min)',
      'Real-time tracking of 12,450 specimens/day',
      'Automated chain of custody with 7 checkpoints',
      '75% of delays eliminated through workflow optimization',
      'Courier route optimization reduces delays 85%'
    ]
  },
  'transfusion-director': {
    id: 'transfusion-director',
    label: 'Transfusion Director',
    title: 'Director of Transfusion Medicine',
    description: 'Ensuring blood product safety, reducing wastage, and maintaining chain of custody',
    primaryDomains: ['Transfusion Medicine'],
    kpiFocus: [
      'transfusion.wastage_rate',
      'transfusion.chain_of_custody',
      'transfusion.custody_breaks',
      'transfusion.temp_excursions',
      'transfusion.units_processed'
    ],
    painPoints: [
      'High wastage rates (4-6%) costing $4M+ annually',
      'Chain of custody breaks leading to discards',
      'Temperature excursions during transport',
      'Manual ISBT 128 barcode scanning',
      'No real-time inventory visibility across hospitals'
    ],
    successMetrics: [
      'Reduce wastage from 6.2% → 2.1%',
      '96.2% chain of custody compliance',
      'Zero critical custody breaks',
      'Temperature monitoring (100% of units)',
      '$4.2M annual savings'
    ],
    demoFlow: [
      '1. Blood Bank Overview (12,840 units tracked)',
      '2. Wastage Reduction (6.2% → 2.1% with FEFO)',
      '3. Chain of Custody (96.2% compliance, 7 checkpoints)',
      '4. Temperature Monitoring (real-time alerts)',
      '5. Multi-Hospital Inventory (18 hospitals, 128 cold storages)'
    ],
    talkingPoints: [
      '66% wastage reduction (6.2% → 2.1%) = $4.2M savings',
      '96.2% chain of custody compliance (vs 78% before)',
      'Zero critical custody breaks (patient safety)',
      'Real-time tracking across 18 hospitals, 128 cold storages',
      'FEFO protocols prevent expiry automatically'
    ]
  },
  'supply-chain-director': {
    id: 'supply-chain-director',
    label: 'Supply Chain Director',
    title: 'Director of Supply Chain',
    description: 'Preventing expiry, optimizing inventory levels, and reducing stockouts',
    primaryDomains: ['Supply Chain'],
    kpiFocus: [
      'supply.expiring_soon_value',
      'supply.prevented_wastage',
      'supply.stockout_risk',
      'supply.inventory_turnover'
    ],
    painPoints: [
      '$340K monthly wastage from expired supplies',
      'Stockouts causing care delays',
      'Overstocking tying up capital ($8M+ inventory)',
      'No visibility into expiration dates',
      'Manual FIFO/FEFO protocols'
    ],
    successMetrics: [
      'Reduce wastage by 46% ($340K → $184K/month)',
      'Zero stockouts in critical supplies',
      'Inventory turnover improvement (30%)',
      'Automated FEFO protocols (100%)',
      '$1.87M annual savings'
    ],
    demoFlow: [
      '1. Supply Chain Overview ($8.2M inventory)',
      '2. Expiry Prevention ($340K at risk → $184K prevented)',
      '3. FEFO Protocols (20 active protocols)',
      '4. Stockout Risk (24 items at risk)',
      '5. Inventory Optimization (right-sizing stock levels)'
    ],
    talkingPoints: [
      '46% wastage reduction through automated FEFO',
      '$340K monthly savings from expiry prevention',
      '20 active protocols ensure oldest stock used first',
      'Real-time visibility into $8.2M inventory',
      'Predictive alerts 7 days before expiry'
    ]
  },
  'cfo': {
    id: 'cfo',
    label: 'CFO',
    title: 'Chief Financial Officer',
    description: 'Evaluating ROI, financial impact, and cost-benefit analysis',
    primaryDomains: ['Financial Impact', 'ROI'],
    kpiFocus: [
      'financial.annual_savings',
      'financial.roi',
      'financial.payback_period',
      'financial.wastage_prevented'
    ],
    painPoints: [
      'Unclear ROI on technology investments',
      'High operational costs (labor, wastage, CapEx)',
      'Budget pressure from declining reimbursements',
      'Need to justify $400K+ platform investment'
    ],
    successMetrics: [
      '$4.8M annual value delivered',
      '8-10 month payback period',
      '5-7x ROI over 3 years',
      'Measurable cost savings in every domain'
    ],
    demoFlow: [
      '1. Financial Impact Dashboard ($4.8M annual value)',
      '2. Value Drivers Breakdown (utilization, wastage, labor, compliance)',
      '3. ROI Timeline (breakeven at 4-6 months)',
      '4. Cost Avoidance (CMS penalties, equipment loss)',
      '5. Budget Justification (cost-benefit analysis)'
    ],
    talkingPoints: [
      '$4.8M average annual value (5 hospitals, 1,200 beds)',
      '8-10 month payback period',
      'Breakdown: $1.2M utilization, $850K wastage, $2.1M labor, $650K compliance',
      'Baptist Health: $4.2M savings in year 1',
      'Cleveland Clinic: 75% utilization (up from 45%)'
    ]
  },
  'coo': {
    id: 'coo',
    label: 'COO',
    title: 'Chief Operating Officer',
    description: 'Improving operational efficiency, patient flow, and workforce productivity',
    primaryDomains: ['Cross-Domain Operations'],
    kpiFocus: [
      'operations.workflow_efficiency',
      'operations.labor_hours_saved',
      'operations.patient_throughput',
      'operations.staff_satisfaction'
    ],
    painPoints: [
      'Labor shortage (18% nursing shortage)',
      'Workflow inefficiencies causing delays',
      'Poor visibility into hospital-wide operations',
      'Siloed departments with no coordination'
    ],
    successMetrics: [
      '2,100 labor hours saved monthly',
      '30% improvement in workflow efficiency',
      'Reduced patient wait times',
      'Improved staff satisfaction scores'
    ],
    demoFlow: [
      '1. Platform Overview (all domains in one view)',
      '2. Workflow Automation (manual → automated tracking)',
      '3. Labor Efficiency (2,100 hours saved/month)',
      '4. Cross-Domain Insights (blood → labs → surgery)',
      '5. Hospital Network View (18 hospitals unified)'
    ],
    talkingPoints: [
      'Unified platform across 5 domains',
      '2,100 labor hours saved monthly ($2.1M value)',
      'Automated workflows reduce manual tasks 75%',
      'Real-time visibility across 18-hospital network',
      'Nurse time savings: 15-20 min/shift searching for equipment'
    ]
  }
}

// Get demo mode config
export function getDemoModeConfig(mode?: DemoMode): DemoModeConfig {
  return demoModes[mode || 'detailed']
}

// Check if feature is enabled for current mode
export function isFeatureEnabled(mode: DemoMode, feature: keyof DemoModeConfig['features']): boolean {
  return demoModes[mode].features[feature] as boolean
}

// Get persona configuration
export function getPersonaConfig(persona: Persona): PersonaConfig {
  return personaConfigs[persona]
}

// Get all personas
export function getAllPersonas(): PersonaConfig[] {
  return Object.values(personaConfigs)
}

// Get personas by domain
export function getPersonasByDomain(domain: string): PersonaConfig[] {
  return Object.values(personaConfigs).filter(persona => 
    persona.primaryDomains.includes(domain)
  )
}
