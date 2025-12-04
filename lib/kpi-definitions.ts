/**
 * KPI Definitions and Documentation
 * Formula, inputs, refresh frequency, typical ranges, and business context
 * Requirement: R5.3, R5.4
 */

export interface KPIDefinition {
  id: string;
  name: string;
  category: 'digitization' | 'utilization' | 'quality' | 'financial' | 'operational';
  formula: string;
  inputs: string[];
  refreshFrequency: 'real-time' | '5-min' | 'hourly' | 'daily' | 'weekly';
  typicalRange: {
    min: number;
    max: number;
    target: number;
    unit: string;
  };
  businessContext: {
    audience: string[];
    decisionSupport: string;
    whyItMatters: string;
  };
}

export const KPI_DEFINITIONS: Record<string, KPIDefinition> = {
  // ==================== DIGITIZATION KPIs ====================
  
  'asset-digitization-coverage': {
    id: 'asset-digitization-coverage',
    name: 'Asset Digitization Coverage',
    category: 'digitization',
    formula: '(Tagged Assets / Total Assets) × 100',
    inputs: ['tagged_assets_count', 'total_assets_count'],
    refreshFrequency: 'hourly',
    typicalRange: { min: 70, max: 100, target: 95, unit: '%' },
    businessContext: {
      audience: ['CTO', 'Biomed Director', 'CFO'],
      decisionSupport: 'Determines readiness for RTLS-based workflows and capital planning accuracy',
      whyItMatters: 'Below 90% coverage means blind spots in asset utilization, leading to unnecessary rentals and purchases'
    }
  },
  
  'specimen-digitization-coverage': {
    id: 'specimen-digitization-coverage',
    name: 'Specimen Tracking Coverage',
    category: 'digitization',
    formula: '(Tracked Specimens / Total Specimens) × 100',
    inputs: ['tracked_specimens_7day', 'total_specimens_7day'],
    refreshFrequency: 'hourly',
    typicalRange: { min: 85, max: 100, target: 98, unit: '%' },
    businessContext: {
      audience: ['Lab Director', 'Pathology Chief', 'Quality Officer'],
      decisionSupport: 'Enables full chain of custody compliance and turnaround time optimization',
      whyItMatters: 'Each untracked specimen is a potential compliance violation and patient safety risk'
    }
  },
  
  // ==================== UTILIZATION KPIs ====================
  
  'asset-utilization-rate': {
    id: 'asset-utilization-rate',
    name: 'Asset Utilization Rate',
    category: 'utilization',
    formula: '(Time in "In Use" Status / Total Available Time) × 100',
    inputs: ['total_in_use_hours', 'total_available_hours'],
    refreshFrequency: 'daily',
    typicalRange: { min: 40, max: 85, target: 70, unit: '%' },
    businessContext: {
      audience: ['Biomed Director', 'CFO', 'Operations VP'],
      decisionSupport: 'Justifies capital equipment purchases vs. redistribution decisions',
      whyItMatters: 'Every 10% improvement = $500K-$2M in avoided capital spend for large hospitals'
    }
  },
  
  'underutilized-asset-count': {
    id: 'underutilized-asset-count',
    name: 'Underutilized Assets',
    category: 'utilization',
    formula: 'Count of assets with utilization < 30% over last 30 days',
    inputs: ['asset_utilization_records'],
    refreshFrequency: 'daily',
    typicalRange: { min: 0, max: 2000, target: 200, unit: 'assets' },
    businessContext: {
      audience: ['Biomed Director', 'Department Managers'],
      decisionSupport: 'Identifies redeployment opportunities and over-purchasing patterns',
      whyItMatters: '1,000 underutilized assets typically represents $3-5M in trapped capital'
    }
  },
  
  'idle-critical-assets': {
    id: 'idle-critical-assets',
    name: 'Idle Critical Assets (>30 days)',
    category: 'utilization',
    formula: 'Count of high-value assets unused for >30 consecutive days',
    inputs: ['asset_last_used_date', 'asset_value', 'current_date'],
    refreshFrequency: 'daily',
    typicalRange: { min: 0, max: 500, target: 50, unit: 'assets' },
    businessContext: {
      audience: ['CFO', 'Biomed Director'],
      decisionSupport: 'Triggers redeployment, sale, or rental cessation decisions',
      whyItMatters: 'Each idle $50K asset costs ~$5K/year in opportunity cost and maintenance'
    }
  },
  
  // ==================== QUALITY KPIs ====================
  
  'chain-of-custody-compliance': {
    id: 'chain-of-custody-compliance',
    name: 'Chain of Custody Compliance',
    category: 'quality',
    formula: '(Specimens with Complete Custody Chain / Total Specimens) × 100',
    inputs: ['specimens_with_full_custody', 'total_specimens'],
    refreshFrequency: '5-min',
    typicalRange: { min: 90, max: 100, target: 99, unit: '%' },
    businessContext: {
      audience: ['Lab Director', 'Quality Officer', 'Risk Management'],
      decisionSupport: 'CAP/CLIA compliance monitoring and legal defensibility',
      whyItMatters: 'Single custody break can invalidate specimen, trigger retests, and create liability'
    }
  },
  
  'custody-break-severity': {
    id: 'custody-break-severity',
    name: 'Custody Break Events by Severity',
    category: 'quality',
    formula: 'Count of custody breaks categorized by Critical/High/Medium/Low',
    inputs: ['custody_break_events', 'severity_classification'],
    refreshFrequency: 'real-time',
    typicalRange: { min: 0, max: 100, target: 5, unit: 'breaks/day' },
    businessContext: {
      audience: ['Lab Director', 'Quality Officer'],
      decisionSupport: 'Root cause analysis and process improvement prioritization',
      whyItMatters: 'Critical breaks may require immediate specimen rejection and patient recollection'
    }
  },
  
  'specimen-transit-time': {
    id: 'specimen-transit-time',
    name: 'Specimen Transit Time (Average)',
    category: 'operational',
    formula: 'Average time from collection to lab receiving',
    inputs: ['collection_timestamp', 'lab_receiving_timestamp'],
    refreshFrequency: 'hourly',
    typicalRange: { min: 15, max: 120, target: 45, unit: 'minutes' },
    businessContext: {
      audience: ['Lab Director', 'Operations Manager'],
      decisionSupport: 'Courier efficiency and staffing optimization',
      whyItMatters: 'Every 15-min improvement = faster patient results and increased throughput'
    }
  },
  
  // ==================== FINANCIAL KPIs ====================
  
  'rental-avoidance-savings': {
    id: 'rental-avoidance-savings',
    name: 'Rental Avoidance Savings',
    category: 'financial',
    formula: 'Sum of (Avoided Rental Days × Daily Rental Cost)',
    inputs: ['rental_requests_fulfilled_internally', 'rental_cost_per_day'],
    refreshFrequency: 'daily',
    typicalRange: { min: 50000, max: 5000000, target: 1000000, unit: '$' },
    businessContext: {
      audience: ['CFO', 'Biomed Director', 'COO'],
      decisionSupport: 'ROI justification for RTLS investment',
      whyItMatters: '$1.2M annual savings typical for 500-bed hospital; 6-12 month payback'
    }
  },
  
  'capital-efficiency-deferred': {
    id: 'capital-efficiency-deferred',
    name: 'Capital Purchases Deferred',
    category: 'financial',
    formula: 'Value of purchase requests fulfilled via redeployment',
    inputs: ['deferred_purchase_requests', 'average_asset_cost'],
    refreshFrequency: 'weekly',
    typicalRange: { min: 100000, max: 10000000, target: 2000000, unit: '$' },
    businessContext: {
      audience: ['CFO', 'Board', 'Capital Planning Committee'],
      decisionSupport: 'Annual capital budget allocation and RTLS ROI validation',
      whyItMatters: 'Frees capital for strategic investments vs. duplicate equipment purchases'
    }
  },
  
  'expiration-avoidance-savings': {
    id: 'expiration-avoidance-savings',
    name: 'Expiration Waste Avoidance',
    category: 'financial',
    formula: 'Value of items redistributed before expiry',
    inputs: ['items_redistributed', 'average_item_value'],
    refreshFrequency: 'daily',
    typicalRange: { min: 50000, max: 2000000, target: 500000, unit: '$' },
    businessContext: {
      audience: ['Supply Chain Director', 'CFO'],
      decisionSupport: 'Inventory optimization and PAR level adjustments',
      whyItMatters: 'Typical hospital wastes 3-5% of supply budget ($500K-$2M) on expired items'
    }
  },
  
  'transfusion-cost-efficiency': {
    id: 'transfusion-cost-efficiency',
    name: 'Transfusion Medicine Cost Efficiency',
    category: 'financial',
    formula: 'Baseline cost - Actual cost (waste reduction + expiry avoidance)',
    inputs: ['baseline_transfusion_cost', 'actual_cost', 'waste_events'],
    refreshFrequency: 'weekly',
    typicalRange: { min: 500000, max: 5000000, target: 2000000, unit: '$' },
    businessContext: {
      audience: ['CFO', 'Blood Bank Director', 'CMO'],
      decisionSupport: 'Blood bank operations budget and efficiency benchmarking',
      whyItMatters: 'Blood products cost $200-$1000+ per unit; 2% waste = $500K loss in large hospital'
    }
  },
  
  // ==================== OPERATIONAL KPIs ====================
  
  'pm-completion-rate': {
    id: 'pm-completion-rate',
    name: 'PM Completion Rate',
    category: 'operational',
    formula: '(Completed PM Tasks / Scheduled PM Tasks) × 100',
    inputs: ['completed_pm_tasks', 'scheduled_pm_tasks'],
    refreshFrequency: 'daily',
    typicalRange: { min: 70, max: 100, target: 95, unit: '%' },
    businessContext: {
      audience: ['Biomed Director', 'Risk Management', 'Joint Commission Liaison'],
      decisionSupport: 'Regulatory compliance and equipment uptime optimization',
      whyItMatters: 'PM compliance directly impacts Joint Commission scores and equipment reliability'
    }
  },
  
  'time-to-locate-asset': {
    id: 'time-to-locate-asset',
    name: 'Time to Locate Asset for PM',
    category: 'operational',
    formula: 'Average time from PM task assignment to asset location',
    inputs: ['pm_task_start_time', 'asset_located_time'],
    refreshFrequency: 'hourly',
    typicalRange: { min: 2, max: 30, target: 5, unit: 'minutes' },
    businessContext: {
      audience: ['Biomed Director', 'Operations Manager'],
      decisionSupport: 'Biomed staffing efficiency and RTLS ROI validation',
      whyItMatters: 'Without RTLS: 30-60 min search time per asset. With RTLS: 2-5 minutes = 4,000 hrs saved/year'
    }
  },
  
  'gateway-uptime': {
    id: 'gateway-uptime',
    name: 'Gateway Network Uptime',
    category: 'operational',
    formula: '(Online Gateways / Total Gateways) × 100',
    inputs: ['gateways_online', 'total_gateways'],
    refreshFrequency: 'real-time',
    typicalRange: { min: 95, max: 100, target: 99, unit: '%' },
    businessContext: {
      audience: ['IT Director', 'Operations'],
      decisionSupport: 'Infrastructure health and maintenance scheduling',
      whyItMatters: '<95% uptime creates location blind spots and degrades all RTLS-dependent workflows'
    }
  },
  
  'tag-battery-health': {
    id: 'tag-battery-health',
    name: 'Tag Battery Health',
    category: 'operational',
    formula: '(Tags with Healthy Battery / Total Active Tags) × 100',
    inputs: ['tags_healthy_battery', 'total_active_tags'],
    refreshFrequency: 'hourly',
    typicalRange: { min: 90, max: 100, target: 95, unit: '%' },
    businessContext: {
      audience: ['IT Director', 'Biomed Director'],
      decisionSupport: 'Proactive tag replacement and maintenance budgeting',
      whyItMatters: 'Failed tags = lost asset visibility. Proactive replacement prevents operational disruptions'
    }
  },
  
  'inventory-accuracy': {
    id: 'inventory-accuracy',
    name: 'Supply Chain Inventory Accuracy',
    category: 'operational',
    formula: '(System Count Matches Physical Count / Total Items Audited) × 100',
    inputs: ['inventory_audit_records', 'system_counts', 'physical_counts'],
    refreshFrequency: 'daily',
    typicalRange: { min: 85, max: 100, target: 98, unit: '%' },
    businessContext: {
      audience: ['Supply Chain Director', 'Materials Manager'],
      decisionSupport: 'PAR level optimization and purchasing decisions',
      whyItMatters: '<95% accuracy leads to stockouts, emergency purchases, and overstocking'
    }
  },
  
  'blood-transfusion-response-time': {
    id: 'blood-transfusion-response-time',
    name: 'Blood Product Response Time',
    category: 'operational',
    formula: 'Average time from request to delivery',
    inputs: ['request_timestamp', 'delivery_timestamp'],
    refreshFrequency: '5-min',
    typicalRange: { min: 5, max: 30, target: 12, unit: 'minutes' },
    businessContext: {
      audience: ['Blood Bank Director', 'CMO', 'Emergency Medicine'],
      decisionSupport: 'Staffing optimization and critical pathway management',
      whyItMatters: 'In trauma/surgery: every minute matters. <15 min response critical for patient outcomes'
    }
  },
  
  'compliance-score': {
    id: 'compliance-score',
    name: 'Overall Compliance Score',
    category: 'quality',
    formula: 'Weighted average of regulatory compliance metrics',
    inputs: ['pm_compliance', 'custody_compliance', 'documentation_compliance'],
    refreshFrequency: 'daily',
    typicalRange: { min: 80, max: 100, target: 95, unit: '%' },
    businessContext: {
      audience: ['Quality Officer', 'Risk Management', 'C-Suite'],
      decisionSupport: 'Joint Commission readiness and risk mitigation',
      whyItMatters: 'Drives accreditation status, reimbursement rates, and institutional reputation'
    }
  }
};

/**
 * Get KPI definition by ID
 */
export const getKPIDefinition = (kpiId: string): KPIDefinition | undefined => {
  return KPI_DEFINITIONS[kpiId];
};

/**
 * Get KPIs by category
 */
export const getKPIsByCategory = (category: KPIDefinition['category']): KPIDefinition[] => {
  return Object.values(KPI_DEFINITIONS).filter(kpi => kpi.category === category);
};

/**
 * Get KPIs by audience
 */
export const getKPIsByAudience = (audience: string): KPIDefinition[] => {
  return Object.values(KPI_DEFINITIONS).filter(kpi => 
    kpi.businessContext.audience.includes(audience)
  );
};

/**
 * Format KPI value with appropriate units and color
 */
export const formatKPIValue = (value: number, kpiId: string): { formatted: string; color: string } => {
  const definition = getKPIDefinition(kpiId);
  if (!definition) return { formatted: value.toString(), color: 'gray' };
  
  const { typicalRange } = definition;
  let color = 'green';
  
  // Determine color based on target proximity
  if (typicalRange.unit === '%') {
    if (value >= typicalRange.target) color = 'green';
    else if (value >= typicalRange.target * 0.95) color = 'yellow';
    else color = 'red';
  } else {
    // For count/time metrics, lower might be better depending on context
    const distanceFromTarget = Math.abs(value - typicalRange.target);
    const rangeSpan = typicalRange.max - typicalRange.min;
    if (distanceFromTarget / rangeSpan < 0.1) color = 'green';
    else if (distanceFromTarget / rangeSpan < 0.3) color = 'yellow';
    else color = 'red';
  }
  
  // Format value
  let formatted = value.toLocaleString();
  if (typicalRange.unit === '%') formatted = `${value}%`;
  else if (typicalRange.unit === '$') formatted = `$${(value / 1000).toFixed(1)}K`;
  else formatted = `${formatted} ${typicalRange.unit}`;
  
  return { formatted, color };
};
