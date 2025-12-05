/**
 * KPI Definitions & Documentation
 * 
 * This file serves as the single source of truth for all Key Performance Indicators (KPIs)
 * displayed across the platform. Each KPI includes:
 * - Formula and calculation methodology
 * - Data inputs and dependencies
 * - Refresh frequency
 * - Typical value ranges
 * - Business context (stakeholders, decisions supported)
 * 
 * Requirement: R5.3 - KPI Definitions & Documentation
 */

export interface KPIDefinition {
    id: string
    name: string
    category: 'biomed' | 'transfusion' | 'lab' | 'supply-chain' | 'infrastructure'
    formula: string
    inputs: string[]
    refreshFrequency: string
    typicalRange: {
        min: number
        max: number
        optimal: number
        unit: string
    }
    context: {
        stakeholders: string[]
        decisions: string[]
        criticalThreshold?: number
    }
    dataSource: string
}

// ============================================================================
// BIOMEDICAL ASSET KPIs
// ============================================================================

export const BIOMED_KPIS: Record<string, KPIDefinition> = {
    UTILIZATION_RATE: {
        id: 'biomed.utilization_rate',
        name: 'Asset Utilization Rate',
        category: 'biomed',
        formula: '(Total hours assets in use / Total available asset hours) × 100',
        inputs: [
            'Asset state transitions from RTLS',
            'Asset availability hours (excluding maintenance)',
            'Time-stamped location data'
        ],
        refreshFrequency: 'Real-time (5-minute aggregation)',
        typicalRange: {
            min: 50,
            max: 85,
            optimal: 75,
            unit: '%'
        },
        context: {
            stakeholders: ['COO', 'Biomed Director', 'CFO'],
            decisions: [
                'Asset procurement planning',
                'Redeployment between facilities',
                'ROI analysis for new equipment'
            ],
            criticalThreshold: 50
        },
        dataSource: 'RTLS zone transitions + EHR integration'
    },

    TIME_TO_LOCATE: {
        id: 'biomed.time_to_locate',
        name: 'Average Time to Locate Asset',
        category: 'biomed',
        formula: 'Average(Time from search initiation to physical location) across all PM work orders',
        inputs: [
            'PM work order timestamps',
            'RTLS last-known location queries',
            'Staff confirmation timestamps'
        ],
        refreshFrequency: 'Daily rollup (midnight)',
        typicalRange: {
            min: 1,
            max: 15,
            optimal: 5,
            unit: 'minutes'
        },
        context: {
            stakeholders: ['Biomed Manager', 'Operations VP'],
            decisions: [
                'RTLS coverage expansion',
                'PM workflow optimization',
                'Staff efficiency improvements'
            ],
            criticalThreshold: 10
        },
        dataSource: 'CMMS work orders + RTLS API'
    },

    PM_COMPLETION_RATE: {
        id: 'biomed.pm_completion_rate',
        name: 'PM Completion Rate',
        category: 'biomed',
        formula: '(Completed PM work orders / Total scheduled PM work orders) × 100',
        inputs: [
            'CMMS scheduled PM count',
            'CMMS completed PM count',
            'Time period (typically monthly)'
        ],
        refreshFrequency: 'Daily',
        typicalRange: {
            min: 85,
            max: 100,
            optimal: 95,
            unit: '%'
        },
        context: {
            stakeholders: ['Biomed Director', 'Compliance Officer', 'Risk Management'],
            decisions: [
                'Staffing adjustments',
                'Compliance reporting',
                'Equipment uptime planning'
            ],
            criticalThreshold: 90
        },
        dataSource: 'CMMS API'
    },

    ASSET_UPTIME: {
        id: 'biomed.asset_uptime',
        name: 'Asset Uptime',
        category: 'biomed',
        formula: '(Total hours - Downtime hours) / Total hours × 100',
        inputs: [
            'Asset status transitions to/from NEEDS_REPAIR',
            'Maintenance work order durations',
            'Total operating hours'
        ],
        refreshFrequency: 'Real-time (hourly aggregation)',
        typicalRange: {
            min: 90,
            max: 99,
            optimal: 96,
            unit: '%'
        },
        context: {
            stakeholders: ['Clinical Operations', 'Biomed Director', 'CFO'],
            decisions: [
                'Equipment replacement planning',
                'Preventive maintenance scheduling',
                'Service contract evaluations'
            ],
            criticalThreshold: 92
        },
        dataSource: 'RTLS status events + CMMS'
    },

    ASSETS_CLEAN: {
        id: 'biomed.assets_clean',
        name: 'Assets Ready for Use (Clean)',
        category: 'biomed',
        formula: 'Count of assets with status = CLEAN',
        inputs: [
            'Asset current status from RTLS',
            'Last status transition timestamp'
        ],
        refreshFrequency: 'Real-time (1-minute)',
        typicalRange: {
            min: 300,
            max: 800,
            optimal: 500,
            unit: 'assets'
        },
        context: {
            stakeholders: ['Environmental Services', 'Clinical Units', 'Operations'],
            decisions: [
                'EVS staffing allocation',
                'Equipment pool sizing',
                'Decontamination capacity planning'
            ]
        },
        dataSource: 'RTLS current state'
    },

    NEEDS_REPAIR: {
        id: 'biomed.needs_repair',
        name: 'Assets Requiring Repair',
        category: 'biomed',
        formula: 'Count of assets with status = NEEDS_REPAIR',
        inputs: [
            'Asset status = NEEDS_REPAIR',
            'Work order creation timestamps'
        ],
        refreshFrequency: 'Real-time (1-minute)',
        typicalRange: {
            min: 10,
            max: 100,
            optimal: 30,
            unit: 'assets'
        },
        context: {
            stakeholders: ['Biomed Manager', 'Clinical Engineering'],
            decisions: [
                'Repair prioritization',
                'Vendor escalations',
                'Replacement vs repair decisions'
            ],
            criticalThreshold: 75
        },
        dataSource: 'RTLS + CMMS work orders'
    },

    LOST_ASSETS: {
        id: 'biomed.lost_assets',
        name: 'Lost or Missing Assets',
        category: 'biomed',
        formula: 'Count of assets with no RTLS signal > 72 hours AND not in maintenance',
        inputs: [
            'Last RTLS heartbeat timestamp',
            'CMMS maintenance status',
            'Expected location vs actual'
        ],
        refreshFrequency: 'Hourly',
        typicalRange: {
            min: 0,
            max: 100,
            optimal: 20,
            unit: 'assets'
        },
        context: {
            stakeholders: ['CFO', 'Asset Manager', 'Security'],
            decisions: [
                'Physical asset audits',
                'RTLS coverage improvements',
                'Financial write-off decisions'
            ],
            criticalThreshold: 50
        },
        dataSource: 'RTLS gateway logs + CMMS'
    },

    MAINTENANCE_OVERDUE: {
        id: 'biomed.maintenance_overdue',
        name: 'Overdue Maintenance Work Orders',
        category: 'biomed',
        formula: 'Count of PM work orders with due_date < today AND status != COMPLETE',
        inputs: [
            'CMMS scheduled PM due dates',
            'CMMS work order status',
            'Current date'
        ],
        refreshFrequency: 'Daily (midnight)',
        typicalRange: {
            min: 0,
            max: 200,
            optimal: 50,
            unit: 'work orders'
        },
        context: {
            stakeholders: ['Biomed Director', 'Compliance', 'Risk Management'],
            decisions: [
                'Staffing emergency adjustments',
                'Compliance risk mitigation',
                'Vendor service escalation'
            ],
            criticalThreshold: 100
        },
        dataSource: 'CMMS API'
    },

    CHAIN_OF_CUSTODY: {
        id: 'biomed.chain_of_custody',
        name: 'Asset Chain of Custody Compliance',
        category: 'biomed',
        formula: '(Assets with complete location tracking / Total tracked assets) × 100',
        inputs: [
            'RTLS location scan events',
            'Asset movement timestamps',
            'Department transfer records',
            'Total active tracked assets'
        ],
        refreshFrequency: 'Real-time (5 min intervals)',
        typicalRange: {
            min: 85,
            max: 100,
            optimal: 98,
            unit: '%'
        },
        context: {
            stakeholders: ['Biomed Director', 'Operations', 'Compliance'],
            decisions: [
                'Asset tracking system optimization',
                'Staff training on scanning protocols',
                'Gateway placement adjustments'
            ],
            criticalThreshold: 90
        },
        dataSource: 'RTLS Platform API'
    }
}

// ============================================================================
// TRANSFUSION MEDICINE KPIs
// ============================================================================

export const TRANSFUSION_KPIS: Record<string, KPIDefinition> = {
    UNITS_PROCESSED: {
        id: 'transfusion.units_processed',
        name: 'Blood Units Processed Monthly',
        category: 'transfusion',
        formula: 'Sum of all blood component units collected, tested, stored, and distributed',
        inputs: [
            'Blood bank LIS unit counts',
            'Collection events',
            'Distribution events',
            'Month time period'
        ],
        refreshFrequency: 'Real-time (hourly aggregation)',
        typicalRange: {
            min: 15000,
            max: 25000,
            optimal: 18450,
            unit: 'units/month'
        },
        context: {
            stakeholders: ['Blood Bank Director', 'COO', 'Supply Chain VP'],
            decisions: [
                'Collection drive planning',
                'Regional distribution agreements',
                'Capacity planning'
            ]
        },
        dataSource: 'Blood Bank LIS + RTLS'
    },

    INVENTORY_TRACKED: {
        id: 'transfusion.inventory_tracked',
        name: 'Blood Inventory with RTLS Visibility',
        category: 'transfusion',
        formula: 'Count of units with active RFID/RTLS signal',
        inputs: [
            'RTLS active tags on blood units',
            'Total inventory count from LIS'
        ],
        refreshFrequency: 'Real-time (1-minute)',
        typicalRange: {
            min: 3500,
            max: 5000,
            optimal: 4250,
            unit: 'units'
        },
        context: {
            stakeholders: ['Blood Bank Manager', 'Quality Director'],
            decisions: [
                'Cold chain compliance',
                'Expiry prevention',
                'Emergency stock availability'
            ],
            criticalThreshold: 4000
        },
        dataSource: 'RTLS + Blood Bank LIS'
    },

    WASTAGE_RATE: {
        id: 'transfusion.wastage_rate',
        name: 'Blood Product Wastage Rate',
        category: 'transfusion',
        formula: '(Expired units + Contaminated units + Damaged units) / Total units × 100',
        inputs: [
            'Unit expiration events',
            'Cold chain violation events',
            'Quality failure events',
            'Total units processed'
        ],
        refreshFrequency: 'Daily rollup',
        typicalRange: {
            min: 0.5,
            max: 5,
            optimal: 2.1,
            unit: '%'
        },
        context: {
            stakeholders: ['Blood Bank Director', 'CFO', 'Quality Officer'],
            decisions: [
                'Inventory management optimization',
                'Cold chain investment decisions',
                'Regional sharing protocols'
            ],
            criticalThreshold: 3.5
        },
        dataSource: 'Blood Bank LIS + RTLS cold chain sensors'
    },

    CHAIN_OF_CUSTODY: {
        id: 'transfusion.chain_of_custody',
        name: 'Chain of Custody Completeness',
        category: 'transfusion',
        formula: '(Units with complete scan history / Total units) × 100',
        inputs: [
            'RTLS scan events (collection → storage → transport → transfusion)',
            'Expected scan checkpoints',
            'Total units tracked'
        ],
        refreshFrequency: 'Real-time (5-minute aggregation)',
        typicalRange: {
            min: 90,
            max: 100,
            optimal: 96.2,
            unit: '%'
        },
        context: {
            stakeholders: ['Quality Director', 'Compliance', 'Risk Management'],
            decisions: [
                'Regulatory compliance validation',
                'Process improvement priorities',
                'Training program effectiveness'
            ],
            criticalThreshold: 95
        },
        dataSource: 'RTLS + Blood Bank LIS'
    },

    CUSTODY_BREAKS: {
        id: 'transfusion.custody_breaks',
        name: 'Chain of Custody Breaks',
        category: 'transfusion',
        formula: 'Count of units with missing scan events in expected workflow sequence',
        inputs: [
            'RTLS scan sequence analysis',
            'Expected checkpoint count',
            'Missing scan detection algorithm'
        ],
        refreshFrequency: 'Hourly',
        typicalRange: {
            min: 50,
            max: 300,
            optimal: 148,
            unit: 'breaks/month'
        },
        context: {
            stakeholders: ['Quality Manager', 'Blood Bank Operations'],
            decisions: [
                'Workflow gap identification',
                'Scanner placement optimization',
                'Staff training needs'
            ],
            criticalThreshold: 250
        },
        dataSource: 'RTLS event logs'
    },

    CRITICAL_CUSTODY_BREAKS: {
        id: 'transfusion.critical_custody_breaks',
        name: 'Critical Chain of Custody Breaks',
        category: 'transfusion',
        formula: 'Count of custody breaks during critical transitions (transport, pre-transfusion)',
        inputs: [
            'Custody breaks at high-risk checkpoints',
            'Cold chain violations',
            'High-value unit tracking gaps'
        ],
        refreshFrequency: 'Real-time (5-minute)',
        typicalRange: {
            min: 0,
            max: 30,
            optimal: 12,
            unit: 'critical breaks/month'
        },
        context: {
            stakeholders: ['Chief Medical Officer', 'Quality Director', 'Risk Management'],
            decisions: [
                'Patient safety interventions',
                'Immediate process corrections',
                'Regulatory reporting'
            ],
            criticalThreshold: 20
        },
        dataSource: 'RTLS + Blood Bank LIS quality flags'
    }
}

// ============================================================================
// LAB MEDICINE / SPECIMEN KPIs
// ============================================================================

export const LAB_KPIS: Record<string, KPIDefinition> = {
    SPECIMENS_TRACKED: {
        id: 'lab.specimens_tracked',
        name: 'Specimens Tracked (7-day)',
        category: 'lab',
        formula: 'Count of specimens with RTLS tracking over 7-day period',
        inputs: [
            'Specimen RTLS tag activations',
            'LIS specimen accessions',
            '7-day rolling window'
        ],
        refreshFrequency: 'Hourly rollup',
        typicalRange: {
            min: 30000,
            max: 45000,
            optimal: 37000,
            unit: 'specimens/week'
        },
        context: {
            stakeholders: ['Lab Director', 'Quality Manager', 'Operations VP'],
            decisions: [
                'RTLS tag inventory planning',
                'Workflow capacity assessment',
                'Quality improvement initiatives'
            ]
        },
        dataSource: 'RTLS + LIS'
    },

    TRACKING_COVERAGE: {
        id: 'lab.tracking_coverage',
        name: 'Specimen Tracking Coverage',
        category: 'lab',
        formula: '(Specimens with complete tracking / Total specimens) × 100',
        inputs: [
            'Specimens with RTLS tags',
            'Total LIS accessions',
            'Tracking completeness criteria'
        ],
        refreshFrequency: 'Hourly',
        typicalRange: {
            min: 85,
            max: 100,
            optimal: 96,
            unit: '%'
        },
        context: {
            stakeholders: ['Lab Director', 'Quality Officer'],
            decisions: [
                'RTLS investment ROI',
                'Process standardization needs',
                'Courier workflow optimization'
            ],
            criticalThreshold: 90
        },
        dataSource: 'RTLS + LIS correlation'
    },

    AVG_TURNAROUND_TIME: {
        id: 'lab.avg_turnaround_time',
        name: 'Average Specimen Turnaround Time',
        category: 'lab',
        formula: 'Average(Result timestamp - Collection timestamp) across all completed specimens',
        inputs: [
            'Specimen collection timestamps',
            'LIS result timestamps',
            'RTLS transit time data'
        ],
        refreshFrequency: 'Real-time (15-minute aggregation)',
        typicalRange: {
            min: 30,
            max: 90,
            optimal: 42,
            unit: 'minutes'
        },
        context: {
            stakeholders: ['Lab Director', 'Chief Medical Officer', 'ED Director'],
            decisions: [
                'Courier schedule optimization',
                'Lab staffing adjustments',
                'Clinical decision support timing'
            ],
            criticalThreshold: 60
        },
        dataSource: 'LIS + RTLS timestamps'
    },

    COURIER_DELAYS: {
        id: 'lab.courier_delays',
        name: 'Courier Delivery Delays',
        category: 'lab',
        formula: 'Count of specimens with (Lab arrival time - Pickup time) > threshold',
        inputs: [
            'RTLS pickup timestamps',
            'RTLS lab arrival timestamps',
            'Expected transit time threshold (typically 20 min)'
        ],
        refreshFrequency: 'Real-time (5-minute)',
        typicalRange: {
            min: 10,
            max: 100,
            optimal: 45,
            unit: 'delays/day'
        },
        context: {
            stakeholders: ['Lab Operations', 'Transport Services', 'Quality Manager'],
            decisions: [
                'Courier route optimization',
                'Staffing adjustments',
                'Process bottleneck resolution'
            ],
            criticalThreshold: 75
        },
        dataSource: 'RTLS transit events'
    }
}

// ============================================================================
// SUPPLY CHAIN KPIs
// ============================================================================

export const SUPPLY_CHAIN_KPIS: Record<string, KPIDefinition> = {
    ITEMS_TRACKED: {
        id: 'supply.items_tracked',
        name: 'Supply Items with Active Tracking',
        category: 'supply-chain',
        formula: 'Count of inventory items with RFID/RTLS visibility',
        inputs: [
            'RTLS active tags',
            'Inventory management system total items'
        ],
        refreshFrequency: 'Real-time (5-minute)',
        typicalRange: {
            min: 55000,
            max: 70000,
            optimal: 61070,
            unit: 'items'
        },
        context: {
            stakeholders: ['Supply Chain VP', 'Materials Manager', 'CFO'],
            decisions: [
                'Inventory accuracy improvements',
                'Stock-out prevention',
                'RFID tag deployment priorities'
            ]
        },
        dataSource: 'RTLS + ERP inventory system'
    },

    EXPIRING_SOON: {
        id: 'supply.expiring_soon',
        name: 'Items Expiring Soon (Platform-wide)',
        category: 'supply-chain',
        formula: 'Sum across all categories where (expiry_date - today) <= category_threshold',
        inputs: [
            'Item expiration dates from inventory system',
            'Category-specific expiry windows',
            'Current date'
        ],
        refreshFrequency: 'Hourly',
        typicalRange: {
            min: 2000,
            max: 5000,
            optimal: 3424,
            unit: 'items'
        },
        context: {
            stakeholders: ['Supply Chain VP', 'CFO', 'Pharmacy Director'],
            decisions: [
                'Usage prioritization (FEFO)',
                'Transfer to high-use facilities',
                'Procurement adjustments'
            ],
            criticalThreshold: 4500
        },
        dataSource: 'ERP inventory + RTLS location data'
    },

    VALUE_AT_RISK: {
        id: 'supply.value_at_risk',
        name: 'Inventory Value at Risk of Expiry',
        category: 'supply-chain',
        formula: 'Sum(Item unit cost × Quantity) for all items expiring soon',
        inputs: [
            'Items expiring within category thresholds',
            'Unit costs from ERP',
            'Current quantities'
        ],
        refreshFrequency: 'Hourly',
        typicalRange: {
            min: 1000000,
            max: 2500000,
            optimal: 1752500,
            unit: 'USD'
        },
        context: {
            stakeholders: ['CFO', 'Supply Chain VP', 'Board of Directors'],
            decisions: [
                'Financial risk reporting',
                'Wastage prevention investment ROI',
                'Procurement policy changes'
            ],
            criticalThreshold: 2000000
        },
        dataSource: 'ERP inventory + cost data'
    },

    PREVENTED_WASTAGE: {
        id: 'supply.prevented_wastage',
        name: 'Monthly Prevented Wastage',
        category: 'supply-chain',
        formula: 'Sum(Baseline wastage - Current wastage) × Average unit cost by category',
        inputs: [
            'Historical baseline wastage rates',
            'Current wastage rates',
            'Monthly volume by category',
            'Average unit costs'
        ],
        refreshFrequency: 'Daily (cumulative monthly)',
        typicalRange: {
            min: 250000,
            max: 500000,
            optimal: 340000,
            unit: 'USD/month'
        },
        context: {
            stakeholders: ['CFO', 'COO', 'Board'],
            decisions: [
                'RTLS ROI validation',
                'Process improvement effectiveness',
                'Budget allocation for technology'
            ]
        },
        dataSource: 'ERP wastage events + historical trends'
    },

    ACTIVE_PROTOCOLS: {
        id: 'supply.active_protocols',
        name: 'Active Prevention Protocols',
        category: 'supply-chain',
        formula: 'Count of automation workflows actively monitoring and alerting',
        inputs: [
            'Configured RTLS alert rules',
            'Active FEFO algorithms',
            'Transfer protocols',
            'Expiry notification systems'
        ],
        refreshFrequency: 'Real-time',
        typicalRange: {
            min: 15,
            max: 30,
            optimal: 20,
            unit: 'protocols'
        },
        context: {
            stakeholders: ['Supply Chain Operations', 'IT Director'],
            decisions: [
                'Automation coverage gaps',
                'Protocol effectiveness tuning',
                'System enhancement priorities'
            ]
        },
        dataSource: 'RTLS automation engine + ERP integrations'
    }
}

// ============================================================================
// INFRASTRUCTURE KPIs
// ============================================================================

export const INFRASTRUCTURE_KPIS: Record<string, KPIDefinition> = {
    GATEWAY_ONLINE: {
        id: 'infra.gateway_online',
        name: 'RTLS Gateways Online',
        category: 'infrastructure',
        formula: 'Count of gateways with status = ONLINE',
        inputs: [
            'Gateway heartbeat events',
            'Gateway health check responses',
            'Last communication timestamp'
        ],
        refreshFrequency: 'Real-time (1-minute)',
        typicalRange: {
            min: 450,
            max: 500,
            optimal: 475,
            unit: 'gateways'
        },
        context: {
            stakeholders: ['IT Director', 'RTLS Administrator', 'Operations'],
            decisions: [
                'Hardware maintenance scheduling',
                'Coverage gap mitigation',
                'Network infrastructure upgrades'
            ],
            criticalThreshold: 460
        },
        dataSource: 'RTLS management platform'
    },

    TAG_HEALTH: {
        id: 'infra.tag_health',
        name: 'RFID/RTLS Tag Health',
        category: 'infrastructure',
        formula: '(Active tags / Total deployed tags) × 100',
        inputs: [
            'Tag battery levels',
            'Tag signal strength',
            'Last heartbeat timestamps'
        ],
        refreshFrequency: 'Hourly',
        typicalRange: {
            min: 92,
            max: 100,
            optimal: 97,
            unit: '%'
        },
        context: {
            stakeholders: ['IT Operations', 'Asset Manager', 'RTLS Admin'],
            decisions: [
                'Tag replacement scheduling',
                'Battery procurement planning',
                'Tracking reliability improvements'
            ],
            criticalThreshold: 94
        },
        dataSource: 'RTLS tag diagnostics API'
    }
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

export function getAllKPIs(): KPIDefinition[] {
    return [
        ...Object.values(BIOMED_KPIS),
        ...Object.values(TRANSFUSION_KPIS),
        ...Object.values(LAB_KPIS),
        ...Object.values(SUPPLY_CHAIN_KPIS),
        ...Object.values(INFRASTRUCTURE_KPIS),
    ]
}

export function getKPIsByCategory(category: KPIDefinition['category']): KPIDefinition[] {
    return getAllKPIs().filter(kpi => kpi.category === category)
}

export function getKPIById(id: string): KPIDefinition | undefined {
    return getAllKPIs().find(kpi => kpi.id === id)
}

export function isKPICritical(kpiId: string, currentValue: number): boolean {
    const kpi = getKPIById(kpiId)
    if (!kpi || !kpi.context.criticalThreshold) return false
    
    // Determine if value is above or below threshold based on KPI type
    const isBelowOptimal = currentValue < kpi.typicalRange.optimal
    
    if (isBelowOptimal) {
        return currentValue <= kpi.context.criticalThreshold
    } else {
        return currentValue >= kpi.context.criticalThreshold
    }
}
