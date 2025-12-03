/**
 * Demo Mode Configuration
 * Supports Platform-level (C-suite) and Detailed (specialist) demo modes
 */

export type DemoMode = 'platform' | 'detailed'

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

// Get demo mode config
export function getDemoModeConfig(mode?: DemoMode): DemoModeConfig {
  return demoModes[mode || 'detailed']
}

// Check if feature is enabled for current mode
export function isFeatureEnabled(mode: DemoMode, feature: keyof DemoModeConfig['features']): boolean {
  return demoModes[mode].features[feature] as boolean
}
