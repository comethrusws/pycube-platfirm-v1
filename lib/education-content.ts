/**
 * Educational Content & Storyboard Data
 * 
 * R6.1: Storyboard-style explanations for training sales engineers and customer champions
 * R6.2: Gateway placement analogies and system design explanations
 * 
 * This content appears in "Understanding..." overlays throughout the platform
 */

export interface EducationSlide {
    id: string
    title: string
    content: string
    visual?: {
        type: 'diagram' | 'animation' | 'checklist' | 'comparison' | 'flow'
        data: any
    }
    keyTakeaway?: string
}

export interface EducationTopic {
    id: string
    title: string
    subtitle: string
    icon: string
    slides: EducationSlide[]
    audience: ('sales-engineer' | 'customer-champion' | 'executive')[]
    duration: string // e.g., "3 min"
}

// ============================================================================
// ASSET UTILIZATION EDUCATION
// ============================================================================

export const assetUtilizationEducation: EducationTopic = {
    id: 'asset-utilization',
    title: 'Understanding Asset Utilization',
    subtitle: 'How we measure equipment usage and availability',
    icon: 'Activity',
    audience: ['sales-engineer', 'customer-champion'],
    duration: '4 min',
    slides: [
        {
            id: 'util-1',
            title: 'What is Asset Utilization?',
            content: 'Asset utilization measures how much time equipment spends being used versus sitting idle. A wheelchair with 75% utilization is in active use 18 hours per day.',
            visual: {
                type: 'diagram',
                data: {
                    type: 'pie',
                    segments: [
                        { label: 'In Use', value: 75, color: '#10b981' },
                        { label: 'Idle but Available', value: 20, color: '#f59e0b' },
                        { label: 'In Maintenance', value: 5, color: '#ef4444' }
                    ]
                }
            },
            keyTakeaway: 'Higher utilization = better ROI on equipment investment'
        },
        {
            id: 'util-2',
            title: 'Check-In/Check-Out Tracking',
            content: 'When an asset is checked out from Clean Utility, we start tracking its location. When it returns to Soiled Utility after patient use, we mark it as checked in.',
            visual: {
                type: 'flow',
                data: {
                    steps: [
                        { label: 'Clean Utility', status: 'Available', duration: '2h' },
                        { label: 'Check Out', status: 'In Transit', duration: '5min' },
                        { label: 'Patient Room 405', status: 'In Use', duration: '6h' },
                        { label: 'Check In', status: 'In Transit', duration: '8min' },
                        { label: 'Soiled Utility', status: 'Soiled', duration: '1h' },
                        { label: 'Decontamination', status: 'Cleaning', duration: '45min' },
                        { label: 'Clean Utility', status: 'Available', duration: '—' }
                    ]
                }
            },
            keyTakeaway: 'Real-time location data shows exactly where assets are in the workflow'
        },
        {
            id: 'util-3',
            title: 'Why Utilization Matters',
            content: 'Low utilization (<50%) means you have too many assets sitting idle. High utilization (>85%) means you risk shortages and delays. The sweet spot is 70-80%.',
            visual: {
                type: 'comparison',
                data: {
                    scenarios: [
                        {
                            label: 'Under-utilized (45%)',
                            problem: 'Excess inventory',
                            cost: '$2.8M tied up in unused equipment',
                            solution: 'Redeploy 30% to busier units'
                        },
                        {
                            label: 'Optimal (75%)',
                            problem: 'None',
                            cost: 'Right-sized fleet',
                            solution: 'Maintain current levels'
                        },
                        {
                            label: 'Over-utilized (92%)',
                            problem: 'Frequent shortages',
                            cost: '12 surgeries delayed/month',
                            solution: 'Add 15% more equipment'
                        }
                    ]
                }
            },
            keyTakeaway: 'Target 70-80% utilization for optimal balance'
        },
        {
            id: 'util-4',
            title: 'How We Calculate It',
            content: 'Formula: (Total hours in "In Use" status ÷ Total available hours) × 100. We exclude maintenance time from available hours.',
            visual: {
                type: 'checklist',
                data: {
                    items: [
                        { label: 'RTLS tracks location every 30 seconds', checked: true },
                        { label: 'State changes logged (Clean → In Use → Soiled)', checked: true },
                        { label: 'Maintenance periods excluded from calculation', checked: true },
                        { label: 'Real-time dashboard updates every 5 minutes', checked: true }
                    ]
                }
            },
            keyTakeaway: 'Data comes from real-time RTLS tracking, refreshed every 5 minutes'
        }
    ]
}

// ============================================================================
// GATEWAY PLACEMENT EDUCATION (R6.2)
// ============================================================================

export const gatewayPlacementEducation: EducationTopic = {
    id: 'gateway-placement',
    title: 'Gateway Placement Strategy',
    subtitle: 'Why we use "Wi-Fi carpet" instead of "highway toll booths"',
    icon: 'Radio',
    audience: ['sales-engineer', 'customer-champion', 'executive'],
    duration: '3 min',
    slides: [
        {
            id: 'gw-1',
            title: 'Two Approaches to RFID Coverage',
            content: 'Most people think RFID works like toll booths—you need a reader at every doorway. But thats expensive and complex. We use a different approach.',
            visual: {
                type: 'comparison',
                data: {
                    scenarios: [
                        {
                            label: '❌ Toll Booth Approach',
                            description: 'Gateway at every doorway',
                            cost: '$850K for 500 gateways',
                            complexity: 'High - 500 installation points',
                            coverage: '100% doorway tracking'
                        },
                        {
                            label: '✅ Wi-Fi Carpet Approach',
                            description: 'Strategic area coverage',
                            cost: '$180K for 120 gateways',
                            complexity: 'Low - 120 installation points',
                            coverage: '95% zone-level tracking'
                        }
                    ]
                }
            },
            keyTakeaway: 'Wi-Fi carpet provides 95% coverage at 21% of the cost'
        },
        {
            id: 'gw-2',
            title: 'How Wi-Fi Carpet Works',
            content: 'Instead of tracking every doorway crossing, we blanket zones with RF coverage. Assets are visible anywhere within the zone—like your phone connecting to Wi-Fi.',
            visual: {
                type: 'diagram',
                data: {
                    type: 'zone-map',
                    zones: [
                        { name: 'Emergency Dept', gateways: 8, coverage: '98%' },
                        { name: 'OR Suites', gateways: 12, coverage: '99%' },
                        { name: 'Patient Floors', gateways: 45, coverage: '94%' },
                        { name: 'Lab Services', gateways: 6, coverage: '96%' }
                    ]
                }
            },
            keyTakeaway: 'Zone-level tracking is sufficient for 98% of use cases'
        },
        {
            id: 'gw-3',
            title: 'When Do You Need More Gateways?',
            content: 'Add gateways only for: (1) High-value assets requiring precise location (e.g., $200K imaging equipment), (2) Coverage gaps causing blind spots, or (3) High-traffic chokepoints like main corridors.',
            visual: {
                type: 'checklist',
                data: {
                    items: [
                        { label: 'High-value equipment (>$100K)', priority: 'High', gateways: '+2-3 per zone' },
                        { label: 'Critical care areas (OR, ICU)', priority: 'High', gateways: '+1-2 per zone' },
                        { label: 'General patient floors', priority: 'Medium', gateways: 'Standard coverage' },
                        { label: 'Storage areas', priority: 'Low', gateways: '1 gateway per room' }
                    ]
                }
            },
            keyTakeaway: 'Start with zone coverage, add precision only where needed'
        },
        {
            id: 'gw-4',
            title: 'Real-World Example',
            content: 'Baptist Health: 485 gateways cover 18 hospitals (avg 27 gateways per hospital). Alternative "toll booth" approach would need 2,400+ gateways costing $1.8M more.',
            visual: {
                type: 'comparison',
                data: {
                    scenarios: [
                        {
                            label: 'Our Approach',
                            gateways: '485 gateways',
                            cost: '$425K hardware',
                            coverage: '96% uptime',
                            result: '42,840 assets tracked'
                        },
                        {
                            label: 'Toll Booth Alternative',
                            gateways: '2,400 gateways',
                            cost: '$2.2M hardware',
                            coverage: '94% uptime (complexity)',
                            result: 'Same tracking, 5x cost'
                        }
                    ]
                }
            },
            keyTakeaway: 'Strategic placement = same tracking capability at 20% of the cost'
        }
    ]
}

// ============================================================================
// CHAIN OF CUSTODY EDUCATION
// ============================================================================

export const chainOfCustodyEducation: EducationTopic = {
    id: 'chain-of-custody',
    title: 'Understanding Chain of Custody',
    subtitle: 'How we track blood products from collection to transfusion',
    icon: 'Shield',
    audience: ['sales-engineer', 'customer-champion'],
    duration: '4 min',
    slides: [
        {
            id: 'coc-1',
            title: 'What is Chain of Custody?',
            content: 'Chain of custody means tracking every hand-off and location change for blood products. Think of it like tracking a package—every scan creates a record.',
            visual: {
                type: 'flow',
                data: {
                    steps: [
                        { label: 'Collection', checkpoint: 'Donor center', required: true },
                        { label: 'Testing', checkpoint: 'Lab processing', required: true },
                        { label: 'Storage', checkpoint: 'Blood bank fridge', required: true },
                        { label: 'Cross-match', checkpoint: 'Lab verification', required: true },
                        { label: 'Transport', checkpoint: 'Pneumatic tube/courier', required: true },
                        { label: 'Pre-transfusion', checkpoint: 'Nursing station', required: true },
                        { label: 'Transfusion', checkpoint: 'Patient bedside', required: true }
                    ]
                }
            },
            keyTakeaway: '7 required checkpoints from donor to patient'
        },
        {
            id: 'coc-2',
            title: 'Why Custody Breaks Matter',
            content: 'A "custody break" means a unit moved without being scanned at an expected checkpoint. This creates a gap in traceability—we dont know where it was or if temperature was maintained.',
            visual: {
                type: 'comparison',
                data: {
                    scenarios: [
                        {
                            label: '✅ Complete Chain',
                            scans: '7/7 checkpoints',
                            status: 'Full traceability',
                            risk: 'None',
                            compliance: 'Compliant'
                        },
                        {
                            label: '⚠️ Minor Break',
                            scans: '6/7 checkpoints',
                            status: 'Missing transport scan',
                            risk: 'Low - location unknown 5 min',
                            compliance: 'Warning'
                        },
                        {
                            label: '❌ Critical Break',
                            scans: '4/7 checkpoints',
                            status: 'Missing storage + transport',
                            risk: 'High - temp unknown 45 min',
                            compliance: 'Non-compliant'
                        }
                    ]
                }
            },
            keyTakeaway: 'Critical breaks involve temperature-sensitive stages'
        },
        {
            id: 'coc-3',
            title: 'How We Achieve 96.2% Compliance',
            content: 'Combination of RFID readers at checkpoints, automated alerts for missed scans, and staff training programs. 98% of staff trained on scanning protocols.',
            visual: {
                type: 'checklist',
                data: {
                    items: [
                        { label: 'RFID readers at all 7 checkpoints', implementation: '100%', impact: 'Automatic scans' },
                        { label: 'Mobile scanners for transport staff', implementation: '92%', impact: 'Backup manual scans' },
                        { label: 'Real-time alerts for missed scans', implementation: '100%', impact: '15-min gap detection' },
                        { label: 'Staff training program', implementation: '98%', impact: '68% error reduction' },
                        { label: 'EHR integration for verification', implementation: '100%', impact: 'Auto-documentation' }
                    ]
                }
            },
            keyTakeaway: 'Technology + training = 96.2% traceability'
        },
        {
            id: 'coc-4',
            title: 'Impact on Patient Safety',
            content: 'Complete custody chain prevents wrong-blood transfusions, ensures proper storage conditions, and enables rapid recalls. Zero critical incidents since implementation.',
            visual: {
                type: 'diagram',
                data: {
                    type: 'metrics',
                    stats: [
                        { label: 'Wrong-blood incidents', before: '3/year', after: '0/year', improvement: '100%' },
                        { label: 'Temp excursions undetected', before: '12/month', after: '0/month', improvement: '100%' },
                        { label: 'Recall response time', before: '4.5 hours', after: '22 min', improvement: '92%' },
                        { label: 'Regulatory compliance', before: '87%', after: '96.2%', improvement: '11%' }
                    ]
                }
            },
            keyTakeaway: 'Complete traceability = zero patient safety incidents'
        }
    ]
}

// ============================================================================
// SPECIMEN TURNAROUND TIME EDUCATION
// ============================================================================

export const specimenTATEducation: EducationTopic = {
    id: 'specimen-tat',
    title: 'Understanding Specimen Turnaround Time',
    subtitle: 'How we measure and optimize lab result delivery',
    icon: 'Clock',
    audience: ['sales-engineer', 'customer-champion'],
    duration: '3 min',
    slides: [
        {
            id: 'tat-1',
            title: 'What is Turnaround Time (TAT)?',
            content: 'TAT measures the time from specimen collection at bedside to result appearing in the EHR. Average TAT of 42 minutes means results are available for clinical decision-making within the hour.',
            visual: {
                type: 'flow',
                data: {
                    steps: [
                        { label: 'Collection at bedside', time: '0 min', cumulative: '0 min' },
                        { label: 'Transport to lab', time: '12 min', cumulative: '12 min' },
                        { label: 'Lab receiving', time: '3 min', cumulative: '15 min' },
                        { label: 'Analysis', time: '18 min', cumulative: '33 min' },
                        { label: 'Quality check', time: '5 min', cumulative: '38 min' },
                        { label: 'Result in EHR', time: '4 min', cumulative: '42 min' }
                    ]
                }
            },
            keyTakeaway: 'Every minute saved improves patient care decisions'
        },
        {
            id: 'tat-2',
            title: 'Where Delays Happen',
            content: 'Most delays occur during transport (specimen sits waiting for courier) and receiving (lab staff cant find specimen). RTLS eliminates both bottlenecks.',
            visual: {
                type: 'diagram',
                data: {
                    type: 'breakdown',
                    segments: [
                        { stage: 'Collection', avgTime: '2 min', delays: '5%', cause: 'Rarely delayed' },
                        { stage: 'Transport', avgTime: '12 min', delays: '45%', cause: 'Courier scheduling gaps' },
                        { stage: 'Receiving', avgTime: '3 min', delays: '30%', cause: 'Cant locate specimen' },
                        { stage: 'Analysis', avgTime: '18 min', delays: '15%', cause: 'Equipment availability' },
                        { stage: 'Reporting', avgTime: '7 min', delays: '5%', cause: 'Rarely delayed' }
                    ]
                }
            },
            keyTakeaway: '75% of delays happen before analysis even starts'
        },
        {
            id: 'tat-3',
            title: 'How RTLS Reduces TAT',
            content: 'Real-time tracking optimizes courier routes, eliminates "wheres my specimen?" searches, and triggers alerts if samples sit too long.',
            visual: {
                type: 'comparison',
                data: {
                    scenarios: [
                        {
                            label: 'Before RTLS',
                            tat: '68 minutes average',
                            transportTime: '22 min (waiting for courier)',
                            searchTime: '8 min (finding specimen)',
                            issues: '45 delayed samples/day'
                        },
                        {
                            label: 'After RTLS',
                            tat: '42 minutes average',
                            transportTime: '12 min (optimized routes)',
                            searchTime: '0 min (instant location)',
                            issues: '18 delayed samples/day'
                        }
                    ]
                }
            },
            keyTakeaway: '38% TAT reduction through better logistics'
        }
    ]
}

// ============================================================================
// INVENTORY EXPIRY PREVENTION EDUCATION
// ============================================================================

export const expiryPreventionEducation: EducationTopic = {
    id: 'expiry-prevention',
    title: 'Understanding Expiry Prevention',
    subtitle: 'How we prevent $340K monthly wastage through automation',
    icon: 'AlertTriangle',
    audience: ['sales-engineer', 'customer-champion', 'executive'],
    duration: '3 min',
    slides: [
        {
            id: 'exp-1',
            title: 'The Expiry Problem',
            content: 'Hospitals stock 62,000+ supply items with varying shelf lives (5 days for platelets, 2 years for implants). Without tracking, items expire before use, creating waste.',
            visual: {
                type: 'diagram',
                data: {
                    type: 'categories',
                    items: [
                        { category: 'Platelets', shelfLife: '5 days', monthlyWaste: '$118K', risk: 'Critical' },
                        { category: 'RBC', shelfLife: '42 days', monthlyWaste: '$47K', risk: 'High' },
                        { category: 'Pharmaceuticals', shelfLife: '1 year avg', monthlyWaste: '$85K', risk: 'Medium' },
                        { category: 'Surgical Supplies', shelfLife: '6 months', monthlyWaste: '$28K', risk: 'Medium' },
                        { category: 'Implants', shelfLife: '2 years', monthlyWaste: '$62K', risk: 'Low' }
                    ]
                }
            },
            keyTakeaway: 'Short shelf-life items create 48% of wastage'
        },
        {
            id: 'exp-2',
            title: 'FEFO: First Expired, First Out',
            content: 'Instead of FIFO (First In, First Out), we prioritize items closest to expiry. RTLS knows exactly which unit expires soonest and alerts staff to use it first.',
            visual: {
                type: 'comparison',
                data: {
                    scenarios: [
                        {
                            label: 'FIFO (Traditional)',
                            logic: 'Use oldest item',
                            problem: 'Doesnt consider expiry date',
                            wastage: '2.8% monthly',
                            example: 'Use unit from Jan 1 (expires Feb 15) before unit from Jan 5 (expires Jan 20)'
                        },
                        {
                            label: 'FEFO (Optimized)',
                            logic: 'Use soonest expiry',
                            problem: 'None - expiry-aware',
                            wastage: '1.5% monthly',
                            example: 'Use unit expiring Jan 20 first, regardless of receipt date'
                        }
                    ]
                }
            },
            keyTakeaway: 'FEFO cuts wastage by 46% compared to FIFO'
        },
        {
            id: 'exp-3',
            title: 'Automated Prevention Protocols',
            content: '20 active protocols monitor inventory 24/7 and take action: alerts to staff, auto-transfer to partner hospitals, predictive reorder adjustments.',
            visual: {
                type: 'checklist',
                data: {
                    items: [
                        { protocol: 'FEFO enforcement via RTLS', frequency: 'Real-time', action: 'Auto-prioritize expiring items', savings: '$142K/mo' },
                        { protocol: 'Auto-transfer to partner hospitals', frequency: 'Daily', action: 'Move slow-moving items', savings: '$86K/mo' },
                        { protocol: 'Predictive demand modeling', frequency: 'Weekly', action: 'Adjust reorder points', savings: '$54K/mo' },
                        { protocol: 'Expiry alerts to clinicians', frequency: 'Real-time', action: 'Use-by notifications', savings: '$58K/mo' }
                    ]
                }
            },
            keyTakeaway: '$340K monthly savings from automation'
        }
    ]
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

export function getAllEducationTopics(): EducationTopic[] {
    return [
        assetUtilizationEducation,
        gatewayPlacementEducation,
        chainOfCustodyEducation,
        specimenTATEducation,
        expiryPreventionEducation,
    ]
}

export function getEducationTopicById(id: string): EducationTopic | undefined {
    return getAllEducationTopics().find(topic => topic.id === id)
}

export function getEducationTopicsByAudience(audience: EducationTopic['audience'][0]): EducationTopic[] {
    return getAllEducationTopics().filter(topic => topic.audience.includes(audience))
}
