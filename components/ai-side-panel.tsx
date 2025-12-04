'use client'

import { X, Sparkles, ArrowRight, AlertTriangle, TrendingUp, DollarSign, CheckCircle2, Activity, Clock, Box, Thermometer } from 'lucide-react'
import { useState, useEffect } from 'react'

export type AIContextType =
    | 'utilization' | 'maintenance' | 'lost' | 'clean' | 'repair' // Biomed
    | 'blood-wastage' | 'crossmatch' | 'transfusion-reaction' | 'contamination' | 'chain-of-custody' | 'inventory-mgmt' | 'cost-savings' | 'response-time' | 'return-rate' | 'expiration-alert' | 'dept-usage' | 'blood-components' | 'storage-time' // Transfusion
    | 'specimen-tracking' | 'tat' | 'custody' // Lab
    | 'stockout' | 'expiration' | 'variance' // Supply Chain
    | 'network-health' | 'tag-health' | 'environmental' | 'asset-tracking' | 'pending-assets' // Infra

type DomainType = 'biomed' | 'transfusion' | 'lab' | 'supply-chain' | 'infrastructure'

interface ContentItem {
    id: string
    name: string
    loc: string
    status: string
}

interface ContentData {
    why: string
    items: ContentItem[]
    impact: { financial: string; operational: string }
    action: string
    domain: DomainType
}

interface AISidePanelProps {
    isOpen: boolean
    onClose: () => void
    title: string
    metricValue: string
    context: AIContextType
}

export function AISidePanel({ isOpen, onClose, title, metricValue, context }: AISidePanelProps) {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        if (isOpen) {
            setIsVisible(true)
        } else {
            const timer = setTimeout(() => setIsVisible(false), 300)
            return () => clearTimeout(timer)
        }
    }, [isOpen])

    if (!isVisible) return null

    // Determine domain based on context
    const getDomain = (ctx: AIContextType): DomainType => {
        if (['utilization', 'maintenance', 'lost', 'clean', 'repair'].includes(ctx)) return 'biomed'
        if (['blood-wastage', 'crossmatch', 'transfusion-reaction', 'contamination', 'chain-of-custody', 'inventory-mgmt', 'cost-savings', 'response-time', 'return-rate', 'expiration-alert', 'dept-usage', 'blood-components', 'storage-time'].includes(ctx)) return 'transfusion'
        if (['specimen-tracking', 'tat', 'custody'].includes(ctx)) return 'lab'
        if (['stockout', 'expiration', 'variance'].includes(ctx)) return 'supply-chain'
        return 'infrastructure'
    }

    // Mock content based on context
    const getContent = (): ContentData => {
        const domain = getDomain(context)
        
        switch (context) {
            // --- BIOMEDICAL ---
            case 'utilization':
                return {
                    domain,
                    why: "Patient census in West Wing dropped 12% this month, while ED census rose 18%, causing an imbalance in asset deployment.",
                    items: [
                        { id: 'IP-492', name: 'Infusion Pump', loc: 'West Wing', status: 'Idle 14d' },
                        { id: 'IP-103', name: 'Infusion Pump', loc: 'West Wing', status: 'Idle 12d' },
                        { id: 'VENT-88', name: 'Ventilator', loc: 'ICU Storage', status: 'Idle 21d' },
                        { id: 'MON-332', name: 'Patient Monitor', loc: 'OR 4', status: 'Idle 8d' },
                        { id: 'PUMP-77', name: 'Feeding Pump', loc: 'Peds', status: 'Idle 30d' },
                    ],
                    impact: { financial: "$1.4M tied-up capital", operational: "ED wait times +15%" },
                    action: "Redeploy 45 pumps from West Wing to ED Storage"
                }
            case 'maintenance':
                return {
                    domain,
                    why: "Unexpected surge in 'Needs Repair' status from ICU (up 40%) combined with 2 staff calling out sick in Biomed shop.",
                    items: [
                        { id: 'VENT-101', name: 'Ventilator', loc: 'Biomed Shop', status: 'Overdue 5d' },
                        { id: 'IP-555', name: 'Infusion Pump', loc: 'Biomed Shop', status: 'Overdue 3d' },
                        { id: 'MON-992', name: 'Patient Monitor', loc: 'Biomed Shop', status: 'Overdue 2d' },
                        { id: 'DEF-112', name: 'Defibrillator', loc: 'Biomed Shop', status: 'Overdue 7d' },
                        { id: 'EKG-331', name: 'EKG Machine', loc: 'Biomed Shop', status: 'Overdue 4d' },
                    ],
                    impact: { financial: "$480k regulatory risk", operational: "-8 ICU beds capacity" },
                    action: "Approve overtime for 2 technicians this weekend"
                }
            case 'lost':
                return {
                    domain,
                    why: "RFID gateway in Loading Dock B has been offline for 48 hours, and 3 exits in East Wing have weak signal coverage.",
                    items: [
                        { id: 'WCH-112', name: 'Wheelchair', loc: 'Last seen: Lobby', status: 'Missing 3d' },
                        { id: 'IP-882', name: 'Infusion Pump', loc: 'Last seen: ED', status: 'Missing 5d' },
                        { id: 'TEL-331', name: 'Telemetry Unit', loc: 'Last seen: 4N', status: 'Missing 2d' },
                        { id: 'SCD-991', name: 'SCD Machine', loc: 'Last seen: OR', status: 'Missing 7d' },
                        { id: 'BED-221', name: 'Smart Bed', loc: 'Last seen: 3W', status: 'Missing 1d' },
                    ],
                    impact: { financial: "$85k replacement risk", operational: "20m/shift search time" },
                    action: "Dispatch security to check Loading Dock B perimeter"
                }

            // --- TRANSFUSION ---
            case 'blood-wastage':
                return {
                    domain,
                    why: "Temperature excursions in OR Refrigerator 2 caused 12 units to spoil. Door sensor reported 'Open' for 45 mins.",
                    items: [
                        { id: 'RBC-102', name: 'O Pos RBC', loc: 'OR Fridge 2', status: 'Spoiled' },
                        { id: 'RBC-103', name: 'O Pos RBC', loc: 'OR Fridge 2', status: 'Spoiled' },
                        { id: 'FFP-992', name: 'AB Neg FFP', loc: 'OR Fridge 2', status: 'Spoiled' },
                        { id: 'PLT-331', name: 'Platelets', loc: 'OR Fridge 2', status: 'Spoiled' },
                        { id: 'RBC-104', name: 'A Pos RBC', loc: 'OR Fridge 2', status: 'Spoiled' },
                    ],
                    impact: { financial: "$4,200 direct loss", operational: "Critical shortage O+" },
                    action: "Service call for OR Fridge 2 door latch"
                }
            case 'crossmatch':
                return {
                    domain,
                    why: "High volume of Type & Screen orders from ED (Trauma alert) created a backlog in the blood bank.",
                    items: [],
                    impact: { financial: "Overtime costs", operational: "Delay in OR start times" },
                    action: "Assign float tech to Blood Bank for next 4 hours"
                }
            case 'cost-savings':
                return {
                    domain,
                    why: "RTLS-enabled cold chain monitoring detected 3 temperature excursions across the network this month, preventing $47K in wastage. Automated inventory tracking reduced expired product waste by 38% vs. last quarter.",
                    items: [
                        { id: 'Macomb Main', name: 'Prevented Wastage', loc: '18 RBC units', status: '$6,300 saved' },
                        { id: 'Dearborn Medical', name: 'Prevented Wastage', loc: '24 Platelet units', status: '$14,400 saved' },
                        { id: 'Wayne County', name: 'Prevented Wastage', loc: '12 FFP units', status: '$8,100 saved' },
                        { id: 'Network-wide', name: 'Expiry Prevention', loc: '82 units redirected', status: '$18,200 saved' },
                    ],
                    impact: { financial: "$127K total monthly savings", operational: "2.1% wastage rate (target: <3.5%)" },
                    action: "Continue automated temperature monitoring and implement predictive expiry alerts network-wide"
                }
            case 'contamination':
                return {
                    domain,
                    why: "Improper handling protocol in Central Blood Bank led to 24 units flagged for contamination risk.",
                    items: [
                        { id: 'RBC-221', name: 'A Pos RBC', loc: 'Central BB', status: 'Quarantined' },
                        { id: 'PLT-442', name: 'Platelets', loc: 'Central BB', status: 'Quarantined' },
                        { id: 'FFP-883', name: 'AB Pos FFP', loc: 'Central BB', status: 'Quarantined' },
                    ],
                    impact: { financial: "$8.4K product loss", operational: "15% inventory reduction" },
                    action: "Retrain staff on aseptic technique and implement double-check protocol"
                }
            case 'chain-of-custody':
                return {
                    domain,
                    why: "Handover scans are being missed between Blood Bank and OR during shift changes (06:00-06:30 and 18:00-18:30).",
                    items: [
                        { id: 'RBC-551', name: 'O Neg RBC', loc: 'In Transit', status: 'Missing scan' },
                        { id: 'PLT-663', name: 'Platelets', loc: 'In Transit', status: 'Missing scan' },
                    ],
                    impact: { financial: "Regulatory compliance risk", operational: "Traceability gap" },
                    action: "Implement mandatory supervisor scan verification during shift changes"
                }
            case 'inventory-mgmt':
                return {
                    domain,
                    why: "O Negative blood stock dropped below safety threshold due to unexpected trauma cases in ED.",
                    items: [
                        { id: 'RBC-O-NEG', name: 'O Neg RBC', loc: 'Central BB', status: 'Critical Low' },
                    ],
                    impact: { financial: "Emergency procurement fees", operational: "Cannot support 2+ traumas" },
                    action: "Contact regional blood center for emergency delivery within 2 hours"
                }
            case 'response-time':
                return {
                    domain,
                    why: "Pneumatic tube system in West Tower is down, forcing manual courier transport from Blood Bank to OR.",
                    items: [],
                    impact: { financial: "N/A", operational: "15-20 min delay per request" },
                    action: "Dispatch facilities to repair tube system ASAP and assign dedicated courier"
                }
            case 'return-rate':
                return {
                    domain,
                    why: "56.2% of blood products issued to OR are being returned unused, indicating over-ordering patterns.",
                    items: [
                        { id: 'RBC-772', name: 'A Pos RBC', loc: 'Returned from OR 3', status: 'Unused' },
                        { id: 'FFP-881', name: 'AB Neg FFP', loc: 'Returned from OR 5', status: 'Unused' },
                        { id: 'PLT-992', name: 'Platelets', loc: 'Returned from OR 2', status: 'Unused' },
                    ],
                    impact: { financial: "Inventory churn inefficiency", operational: "59 missed scans" },
                    action: "Review OR ordering protocols with anesthesiology department"
                }
            case 'expiration-alert':
                return {
                    domain,
                    why: "Platelets have 5-day shelf life and 24 units are approaching expiration due to low OR volume this week.",
                    items: [
                        { id: 'PLT-101', name: 'Platelets', loc: 'Central BB', status: 'Expires in 8h' },
                        { id: 'PLT-102', name: 'Platelets', loc: 'Central BB', status: 'Expires in 10h' },
                        { id: 'PLT-103', name: 'Platelets', loc: 'Central BB', status: 'Expires in 12h' },
                    ],
                    impact: { financial: "$14K potential wastage", operational: "Stock shortage tomorrow" },
                    action: "Coordinate with regional hospitals for platelet transfer today"
                }
            case 'dept-usage':
                return {
                    domain,
                    why: "Only 2 departments (ICU, OR) are using 85% of total blood products, indicating underutilization in other areas.",
                    items: [],
                    impact: { financial: "Inventory imbalance", operational: "Delayed care in ED" },
                    action: "Train ED staff on blood product protocols and streamline ordering process"
                }
            case 'blood-components':
                return {
                    domain,
                    why: "RBC inventory is at 92% of PAR level but FFP and Platelets are at 45%, creating type imbalance.",
                    items: [
                        { id: 'FFP-ALL', name: 'Fresh Frozen Plasma', loc: 'Central BB', status: 'Low 45%' },
                        { id: 'PLT-ALL', name: 'Platelets', loc: 'Central BB', status: 'Low 45%' },
                    ],
                    impact: { financial: "Emergency order costs", operational: "Cannot support major surgery" },
                    action: "Place priority order for FFP and Platelets from blood center"
                }
            case 'storage-time':
                return {
                    domain,
                    why: "Average storage duration has increased from 3.2 to 5.8 days due to reduced surgical volume.",
                    items: [
                        { id: 'RBC-AGED', name: 'RBC Units >21 days', loc: 'Central BB', status: '18 units' },
                    ],
                    impact: { financial: "Aging inventory risk", operational: "Reduced product quality" },
                    action: "Use older units first (FIFO enforcement) and coordinate transfers"
                }

            // --- LAB MEDICINE ---
            case 'specimen-tracking':
                return {
                    domain,
                    why: "Courier route 'North Loop' is consistently arriving 20 mins late due to construction on Main St.",
                    items: [
                        { id: 'SPC-992', name: 'Blood Culture', loc: 'In Transit', status: 'Late 15m' },
                        { id: 'SPC-993', name: 'Tissue Sample', loc: 'In Transit', status: 'Late 15m' },
                        { id: 'SPC-994', name: 'Urine Sample', loc: 'In Transit', status: 'Late 15m' },
                        { id: 'SPC-995', name: 'Swab', loc: 'In Transit', status: 'Late 15m' },
                        { id: 'SPC-996', name: 'Blood Tube', loc: 'In Transit', status: 'Late 15m' },
                    ],
                    impact: { financial: "Potential re-draws", operational: "Delayed diagnosis" },
                    action: "Temporarily reroute courier via West Ave"
                }
            case 'custody':
                return {
                    domain,
                    why: "Handover scans are being missed at the Central Lab receiving dock during shift change (14:00-14:30).",
                    items: [],
                    impact: { financial: "Compliance risk", operational: "Lost specimen risk" },
                    action: "Implement mandatory supervisor sign-off at 14:00"
                }

            // --- SUPPLY CHAIN ---
            case 'stockout':
                return {
                    domain,
                    why: "Unexpected increase in knee replacement surgeries (up 25%) depleted surgical pack inventory faster than PAR levels.",
                    items: [
                        { id: 'KIT-221', name: 'Knee Implant Kit', loc: 'OR Core', status: 'Stockout' },
                        { id: 'SUT-992', name: 'Suture 4-0', loc: 'OR Core', status: 'Low Stock' },
                        { id: 'DRP-112', name: 'Surgical Drape', loc: 'OR Core', status: 'Low Stock' },
                        { id: 'GLV-771', name: 'Sterile Gloves', loc: 'OR Core', status: 'Low Stock' },
                        { id: 'MSK-332', name: 'N95 Mask', loc: 'OR Core', status: 'Low Stock' },
                    ],
                    impact: { financial: "Expedited shipping fees", operational: "Case cancellations" },
                    action: "Place emergency order with secondary vendor"
                }
            case 'expiration':
                return {
                    domain,
                    why: "Overstocking of seasonal flu vaccines in Pharmacy B led to 15% of stock reaching expiration date.",
                    items: [],
                    impact: { financial: "$12k inventory write-off", operational: "Storage space waste" },
                    action: "Transfer near-expiry stock to Employee Health clinic"
                }

            // --- INFRASTRUCTURE ---
            case 'network-health':
                return {
                    domain,
                    why: "Switch 3 in Server Room A is overheating, causing intermittent packet loss for 12 APs.",
                    items: [
                        { id: 'AP-101', name: 'Access Point', loc: '3rd Floor', status: 'Flapping' },
                        { id: 'AP-102', name: 'Access Point', loc: '3rd Floor', status: 'Flapping' },
                        { id: 'AP-103', name: 'Access Point', loc: '3rd Floor', status: 'Flapping' },
                        { id: 'AP-104', name: 'Access Point', loc: '3rd Floor', status: 'Flapping' },
                        { id: 'SW-003', name: 'Core Switch', loc: 'Server Room A', status: 'Overheat' },
                    ],
                    impact: { financial: "N/A", operational: "Loss of asset tracking in West Wing" },
                    action: "Check AC unit in Server Room A immediately"
                }
            case 'environmental':
                return {
                    domain,
                    why: "Humidity levels in Sterile Storage dropped below 30% due to HVAC malfunction.",
                    items: [],
                    impact: { financial: "Sterility compromise risk", operational: "Regulatory finding" },
                    action: "Deploy portable humidifiers and call facilities"
                }
            case 'asset-tracking':
                return {
                    domain,
                    why: "9,090 assets are currently tracked across all facilities with 98.5% real-time visibility.",
                    items: [
                        { id: 'ZONE-ICU', name: 'ICU Coverage', loc: 'Main Hospital', status: '99.8% visible' },
                        { id: 'ZONE-ED', name: 'ED Coverage', loc: 'Main Hospital', status: '98.2% visible' },
                        { id: 'ZONE-OR', name: 'OR Coverage', loc: 'Surgical Center', status: '99.1% visible' },
                        { id: 'ZONE-LAB', name: 'Lab Coverage', loc: 'Main Hospital', status: '97.5% visible' },
                    ],
                    impact: { financial: "$2.8M asset protection", operational: "15min avg search time reduction" },
                    action: "Deploy 3 additional gateways in Lab area to improve coverage to 99%"
                }
            case 'pending-assets':
                return {
                    domain,
                    why: "95 assets from yesterday remain in pending status due to incomplete workflow transitions.",
                    items: [
                        { id: 'IP-772', name: 'Infusion Pump', loc: 'In Transit', status: 'Pending 18h' },
                        { id: 'VENT-331', name: 'Ventilator', loc: 'Biomed Shop', status: 'Pending 22h' },
                        { id: 'WCH-442', name: 'Wheelchair', loc: 'Unknown', status: 'Pending 26h' },
                    ],
                    impact: { financial: "Inventory accuracy risk", operational: "Asset availability unknown" },
                    action: "Dispatch staff to physically locate and scan all pending items before end of shift"
                }

            default:
                return {
                    domain,
                    why: "Analysis indicates a deviation from standard operating procedures in the last 72 hours.",
                    items: [],
                    impact: { financial: "Unknown", operational: "Potential efficiency loss" },
                    action: "Investigate further"
                }
        }
    }

    const content = getContent()

    return (
        <div className="fixed inset-0 z-[60] flex justify-end pointer-events-none">
            {/* Backdrop */}
            <div
                className={`absolute inset-0 bg-black/10 backdrop-blur-[2px] transition-opacity duration-300 pointer-events-auto ${isOpen ? 'opacity-100' : 'opacity-0'}`}
                onClick={onClose}
            />

            {/* Panel */}
            <div
                className={`relative w-full max-w-md bg-white h-full shadow-2xl transform transition-transform duration-300 ease-out pointer-events-auto flex flex-col border-l border-gray-100 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
            >
                {/* Header */}
                <div className="p-6 border-b border-gray-100 flex items-start justify-between bg-white">
                    <div>
                        <div className="flex items-center gap-2 text-purple-600 mb-2">
                            <Sparkles className="w-4 h-4" />
                            <span className="text-xs font-bold uppercase tracking-wider">AI Analysis</span>
                        </div>
                        <h2 className="text-xl font-bold text-gray-900 tracking-tight">{title}</h2>
                        <div className="text-3xl font-bold text-gray-900 mt-2 tracking-tight">{metricValue}</div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-50 rounded-full transition-colors border border-transparent hover:border-gray-200"
                    >
                        <X className="w-5 h-5 text-gray-400" />
                    </button>
                </div>

                {/* Content - Scrollable */}
                <div className="flex-1 overflow-y-auto p-6 space-y-8 bg-white">

                    {/* Section 1: Why? */}
                    <div className="animate-in slide-in-from-right-4 duration-500 delay-100">
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                            <AlertTriangle className="w-4 h-4 text-gray-400" />
                            Root Cause Analysis
                        </h3>
                        <div className="bg-gray-50 p-5 rounded-2xl border border-gray-100 text-gray-700 text-sm leading-relaxed font-medium">
                            {content.why}
                        </div>
                    </div>

                    {/* Section 2: Targeted Items (Domain-Aware) */}
                    <div className="animate-in slide-in-from-right-4 duration-500 delay-200">
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                            <TrendingUp className="w-4 h-4 text-gray-400" />
                            {content.domain === 'biomed' && 'Affected Assets (Top 5)'}
                            {content.domain === 'transfusion' && 'Affected Blood Units (Top 5)'}
                            {content.domain === 'lab' && 'Affected Specimens (Top 5)'}
                            {content.domain === 'supply-chain' && 'Affected Items (Top 5)'}
                            {content.domain === 'infrastructure' && 'Affected Infrastructure (Top 5)'}
                        </h3>
                        <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
                            {content.items.length > 0 ? (
                                <div className="divide-y divide-gray-50">
                                    {content.items.map((item, idx) => (
                                        <div key={idx} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors group">
                                            <div>
                                                <div className="font-semibold text-sm text-gray-900">{item.id}</div>
                                                <div className="text-xs text-gray-500 mt-0.5">{item.name} • {item.loc}</div>
                                            </div>
                                            <span className="text-[10px] font-semibold px-2.5 py-1 bg-gray-100 text-gray-600 rounded-full group-hover:bg-white group-hover:shadow-sm transition-all">
                                                {item.status}
                                            </span>
                                        </div>
                                    ))}
                                    <button className="w-full p-3 text-center text-xs text-purple-600 font-semibold hover:bg-purple-50 transition-colors">
                                        View Full List
                                    </button>
                                </div>
                            ) : (
                                <div className="p-6 text-sm text-gray-400 text-center italic">
                                    {content.domain === 'transfusion' ? 'No specific blood unit anomalies detected.' : 'No specific anomalies detected.'}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Section 3: Impact */}
                    <div className="animate-in slide-in-from-right-4 duration-500 delay-300">
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                            <Activity className="w-4 h-4 text-gray-400" />
                            Projected Impact
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
                                <div className="flex items-center gap-2 mb-2">
                                    <DollarSign className="w-4 h-4 text-emerald-500" />
                                    <div className="text-xs text-gray-400 font-bold uppercase">Financial</div>
                                </div>
                                <div className="text-sm text-gray-900 font-semibold">{content.impact.financial}</div>
                            </div>
                            <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
                                <div className="flex items-center gap-2 mb-2">
                                    <Clock className="w-4 h-4 text-blue-500" />
                                    <div className="text-xs text-gray-400 font-bold uppercase">Operational</div>
                                </div>
                                <div className="text-sm text-gray-900 font-semibold">{content.impact.operational}</div>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Footer - Action */}
                <div className="p-6 border-t border-gray-100 bg-white">
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Recommended Action</h3>
                    <button className="w-full bg-gray-900 hover:bg-black text-white p-4 rounded-2xl shadow-xl transition-all flex items-center justify-between group">
                        <div className="text-left">
                            <div className="font-bold text-sm">Execute Workflow</div>
                            <div className="text-xs text-gray-400 mt-0.5 font-medium">{content.action}</div>
                        </div>
                        <div className="bg-white/10 p-2 rounded-xl group-hover:bg-white/20 transition-colors">
                            <ArrowRight className="w-5 h-5" />
                        </div>
                    </button>
                </div>
            </div>
        </div>
    )
}
