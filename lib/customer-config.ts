/**
 * Customer Configuration for Demo Parameterization
 * Allows reusable demos across different customers (Baptist, Cleveland, etc.)
 */

import { AssetStatus, BloodType, BloodComponent, SupplyCategory, RiskLevel, GatewayStatus, ServerStatus } from './taxonomies'

export interface CustomerConfig {
  id: string
  name: string
  displayName: string

  // 1. Transfusion Medicine
  transfusion: {
    totalBloodBags: number
    dailyTransfusions: number
    activeAlerts: number
    stockAlerts: number
    tempAlerts: number
    expiryAlerts: number
    departments: number
    coldStorages: number
    avgTemp: string
    hospitalCount: number
    narrative: {
      aiInsight: string
      criticalStockMessage: string
      highUsageMessage: string
      tempExcursionMessage: string
      custodyGapMessage: string
    }
  }

  // 2. Biomedical Assets
  biomed: {
    totalAssets: number
    digitizedAssets: number
    utilizationRate: number
    lostAssets: number
    maintenanceOverdue: number
    statusBreakdown: Record<AssetStatus, number>
    narrative: {
      bottleneck: string
      recommendation: string
    }
  }

  // 3. Lab Medicine
  lab: {
    dailySpecimens: number
    avgTurnaroundTime: number // minutes
    criticalBreaks: number
    digitizationRate: number
    narrative: {
      efficiency: string
      delaySource: string
    }
  }

  // 4. Supply Chain
  supplyChain: {
    inventoryValue: number
    wastageRate: number
    expiringSoonValue: number
    stockoutRiskItems: number
    narrative: {
      savingsOpp: string
      riskAlert: string
    }
  }

  // 5. Infrastructure
  infra: {
    gatewayUptime: number
    activeTags: number
    networkHealth: number
    narrative: {
      coverageGap: string
      upgradeRec: string
    }
  }
}

export const customerConfigs: Record<string, CustomerConfig> = {
  baptist: {
    id: 'baptist',
    name: 'Baptist Health',
    displayName: 'Baptist Health System',
    transfusion: {
      totalBloodBags: 12840,
      dailyTransfusions: 450,
      activeAlerts: 127,
      stockAlerts: 48,
      tempAlerts: 24,
      expiryAlerts: 55,
      departments: 35,
      coldStorages: 128,
      avgTemp: '3.6',
      hospitalCount: 18,
      narrative: {
        aiInsight: 'Forecasts a critical shortage of O- blood within 48 hours due to scheduled high-risk surgeries. Recommendation: Initiate emergency procurement from regional blood bank immediately.',
        criticalStockMessage: 'A- Type below safety threshold. Click to view procurement plan.',
        highUsageMessage: 'Emergency Dept usage +42%. Click to view demand forecast.',
        tempExcursionMessage: 'Cold chain deviations detected. Click for impact analysis.',
        custodyGapMessage: 'Tracking gaps in last 30 days. Click for compliance report.'
      }
    },
    biomed: {
      totalAssets: 5050,
      digitizedAssets: 5005,
      utilizationRate: 68,
      lostAssets: 42,
      maintenanceOverdue: 128,
      statusBreakdown: {
        [AssetStatus.CLEAN]: 420,
        [AssetStatus.IN_USE]: 3400,
        [AssetStatus.SOILED]: 900,
        [AssetStatus.NEEDS_REPAIR]: 45,
        [AssetStatus.REPAIRED]: 160,
        [AssetStatus.SANITIZED]: 80,
      },
      narrative: {
        bottleneck: 'Soiled Utility -> Decontamination backlog is 4.5 hours.',
        recommendation: 'Add 2 FTEs to evening shift decontamination to reduce backlog by 65%.'
      }
    },
    lab: {
      dailySpecimens: 18500,
      avgTurnaroundTime: 42,
      criticalBreaks: 12,
      digitizationRate: 98.5,
      narrative: {
        efficiency: 'TAT improved by 12% since last month.',
        delaySource: 'ER Stat Lab courier delays identified.'
      }
    },
    supplyChain: {
      inventoryValue: 45000000,
      wastageRate: 2.1,
      expiringSoonValue: 1200000,
      stockoutRiskItems: 145,
      narrative: {
        savingsOpp: '$2.4M potential savings from expiry prevention.',
        riskAlert: 'Surgical mesh inventory critical in 2 facilities.'
      }
    },
    infra: {
      gatewayUptime: 99.9,
      activeTags: 45000,
      networkHealth: 98,
      narrative: {
        coverageGap: 'West Wing 4th Floor has intermittent coverage.',
        upgradeRec: 'Install 3 additional gateways in Oncology wing.'
      }
    }
  },
  cleveland: {
    id: 'cleveland',
    name: 'Cleveland Clinic',
    displayName: 'Cleveland Clinic Health System',
    transfusion: {
      totalBloodBags: 15200,
      dailyTransfusions: 520,
      activeAlerts: 98,
      stockAlerts: 42,
      tempAlerts: 18,
      expiryAlerts: 38,
      departments: 42,
      coldStorages: 156,
      avgTemp: '3.4',
      hospitalCount: 22,
      narrative: {
        aiInsight: 'Predicts AB+ blood shortage in 72 hours based on surgical schedule analysis. Recommendation: Coordinate with regional blood centers for immediate transfer.',
        criticalStockMessage: 'B+ Type critically low. Immediate procurement required.',
        highUsageMessage: 'Cardiology Dept usage +38%. Predictive restocking needed.',
        tempExcursionMessage: 'Temperature variance detected in 3 units. Review required.',
        custodyGapMessage: 'Chain of custody gaps identified. Compliance review pending.'
      }
    },
    biomed: {
      totalAssets: 22500,
      digitizedAssets: 21800,
      utilizationRate: 74,
      lostAssets: 18,
      maintenanceOverdue: 85,
      statusBreakdown: {
        [AssetStatus.CLEAN]: 6500,
        [AssetStatus.IN_USE]: 11200,
        [AssetStatus.SOILED]: 2100,
        [AssetStatus.NEEDS_REPAIR]: 320,
        [AssetStatus.REPAIRED]: 280,
        [AssetStatus.SANITIZED]: 1400,
      },
      narrative: {
        bottleneck: 'Clean Utility distribution delay averaging 55 mins.',
        recommendation: 'Automate par-level replenishment alerts for nursing units.'
      }
    },
    lab: {
      dailySpecimens: 24000,
      avgTurnaroundTime: 35,
      criticalBreaks: 5,
      digitizationRate: 99.2,
      narrative: {
        efficiency: 'World-class TAT performance (Top 5%).',
        delaySource: 'No significant delays detected.'
      }
    },
    supplyChain: {
      inventoryValue: 68000000,
      wastageRate: 1.2,
      expiringSoonValue: 850000,
      stockoutRiskItems: 42,
      narrative: {
        savingsOpp: '$1.1M optimization opportunity in high-cost implants.',
        riskAlert: 'Cardiology catheter supply chain disruption predicted.'
      }
    },
    infra: {
      gatewayUptime: 99.99,
      activeTags: 62000,
      networkHealth: 99.5,
      narrative: {
        coverageGap: 'None. Full campus coverage verified.',
        upgradeRec: 'Firmware update scheduled for Q4.'
      }
    }
  }
}

// Default customer
export const DEFAULT_CUSTOMER = 'baptist'

// Get customer config with fallback
export function getCustomerConfig(customerId?: string): CustomerConfig {
  const id = customerId || DEFAULT_CUSTOMER
  return customerConfigs[id] || customerConfigs[DEFAULT_CUSTOMER]
}
