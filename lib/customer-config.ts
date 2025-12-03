/**
 * Customer Configuration for Demo Parameterization
 * Allows reusable demos across different customers (Baptist, Cleveland, etc.)
 */

export interface CustomerConfig {
  id: string
  name: string
  displayName: string
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
  // Add other modules as needed (specimen, supply chain, biomedical assets, etc.)
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
    }
  },
  demo: {
    id: 'demo',
    name: 'Demo Hospital',
    displayName: 'Demo Healthcare Network',
    transfusion: {
      totalBloodBags: 10000,
      dailyTransfusions: 400,
      activeAlerts: 100,
      stockAlerts: 40,
      tempAlerts: 20,
      expiryAlerts: 40,
      departments: 30,
      coldStorages: 100,
      avgTemp: '3.5',
      hospitalCount: 15,
      narrative: {
        aiInsight: 'AI-powered predictive modeling identifies potential blood shortage. Proactive procurement recommended.',
        criticalStockMessage: 'Critical stock levels detected. View procurement recommendations.',
        highUsageMessage: 'Elevated departmental usage detected. Review demand patterns.',
        tempExcursionMessage: 'Temperature monitoring alerts active. Review storage conditions.',
        custodyGapMessage: 'Chain of custody optimization opportunities identified.'
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
