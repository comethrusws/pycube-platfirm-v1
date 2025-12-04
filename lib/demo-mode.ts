/**
 * Demo Mode Configuration
 * Supports Platform-level (C-suite), Detailed (specialist), and Investor demo modes
 * Requirements: R1.8, R6.7, R6.8 - Multiple audience support including investor view
 */

export type DemoMode = 'platform' | 'detailed' | 'investor'

export interface DemoModeConfig {
  mode: DemoMode
  label: string
  description: string
  audience: string
  duration: string
  features: {
    showDetailedCharts: boolean
    showHospitalNetwork: boolean
    showAllKPIs: boolean
    showTier3Drilldown: boolean
    showAIInsights: boolean
    showEducationOverlay: boolean
    showAssetLifecycle: boolean
    showPMWorklist: boolean
    focusOnFinancials: boolean
    focusOnTAM: boolean
    kpiLimit?: number // Limit number of KPIs shown
  }
}

export const demoModes: Record<DemoMode, DemoModeConfig> = {
  platform: {
    mode: 'platform',
    label: 'Platform Overview',
    description: 'Cross-asset, high-level view for C-suite executives',
    audience: 'CEO, CFO, COO',
    duration: '20-30 minutes',
    features: {
      showDetailedCharts: false,
      showHospitalNetwork: false,
      showAllKPIs: false,
      showTier3Drilldown: false,
      showAIInsights: true,
      showEducationOverlay: false,
      showAssetLifecycle: false,
      showPMWorklist: false,
      focusOnFinancials: true,
      focusOnTAM: false,
      kpiLimit: 4 // Show only top 4 most important KPIs
    }
  },
  detailed: {
    mode: 'detailed',
    label: 'Detailed Analytics',
    description: 'Deep-dive, asset-level view for specialists',
    audience: 'Lab Directors, Biomedical Executives, Department Heads',
    duration: '45-60 minutes',
    features: {
      showDetailedCharts: true,
      showHospitalNetwork: true,
      showAllKPIs: true,
      showTier3Drilldown: true,
      showAIInsights: true,
      showEducationOverlay: true,
      showAssetLifecycle: true,
      showPMWorklist: true,
      focusOnFinancials: false,
      focusOnTAM: false
    }
  },
  investor: {
    mode: 'investor',
    label: 'Investor Pitch',
    description: 'High-impact 10-minute overview focused on TAM, economics, and scale',
    audience: 'Investors, Board Members, Strategic Partners',
    duration: '10 minutes',
    features: {
      showDetailedCharts: false,
      showHospitalNetwork: true, // Show scale across network
      showAllKPIs: false,
      showTier3Drilldown: false,
      showAIInsights: true, // Show AI differentiation
      showEducationOverlay: false,
      showAssetLifecycle: false,
      showPMWorklist: false,
      focusOnFinancials: true, // Heavy focus on economic impact
      focusOnTAM: true, // Show market opportunity
      kpiLimit: 3 // Only show: Revenue Impact, Customer Scale, Market Penetration
    }
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
