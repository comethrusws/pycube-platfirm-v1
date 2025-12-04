'use client'

import { X, Sparkles, ArrowRight, AlertTriangle, TrendingUp, DollarSign, CheckCircle2, Activity, Clock, Box, Thermometer } from 'lucide-react'
import { useState, useEffect } from 'react'

export type AIContextType =
    | 'utilization' | 'maintenance' | 'lost' | 'clean' | 'repair' // Biomed
    | 'blood-wastage' | 'crossmatch' | 'transfusion-reaction' // Transfusion
    | 'specimen-tracking' | 'tat' | 'custody' // Lab
    | 'stockout' | 'expiration' | 'variance' // Supply Chain
    | 'network-health' | 'tag-health' | 'environmental' // Infra

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

    // Mock content based on context
    const getContent = () => {
        switch (context) {
            // --- BIOMEDICAL ---
            case 'utilization':
                return {
                    why: "Patient census in West Wing dropped 12% this month, while ED census rose 18%, causing an imbalance in asset deployment.",
                    assets: [
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
                    why: "Unexpected surge in 'Needs Repair' status from ICU (up 40%) combined with 2 staff calling out sick in Biomed shop.",
                    assets: [
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
                    why: "RFID gateway in Loading Dock B has been offline for 48 hours, and 3 exits in East Wing have weak signal coverage.",
                    assets: [
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
                    why: "Temperature excursions in OR Refrigerator 2 caused 12 units to spoil. Door sensor reported 'Open' for 45 mins.",
                    assets: [
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
                    why: "High volume of Type & Screen orders from ED (Trauma alert) created a backlog in the blood bank.",
                    assets: [],
                    impact: { financial: "Overtime costs", operational: "Delay in OR start times" },
                    action: "Assign float tech to Blood Bank for next 4 hours"
                }

            // --- LAB MEDICINE ---
            case 'specimen-tracking':
                return {
                    why: "Courier route 'North Loop' is consistently arriving 20 mins late due to construction on Main St.",
                    assets: [
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
                    why: "Handover scans are being missed at the Central Lab receiving dock during shift change (14:00-14:30).",
                    assets: [],
                    impact: { financial: "Compliance risk", operational: "Lost specimen risk" },
                    action: "Implement mandatory supervisor sign-off at 14:00"
                }

            // --- SUPPLY CHAIN ---
            case 'stockout':
                return {
                    why: "Unexpected increase in knee replacement surgeries (up 25%) depleted surgical pack inventory faster than PAR levels.",
                    assets: [
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
                    why: "Overstocking of seasonal flu vaccines in Pharmacy B led to 15% of stock reaching expiration date.",
                    assets: [],
                    impact: { financial: "$12k inventory write-off", operational: "Storage space waste" },
                    action: "Transfer near-expiry stock to Employee Health clinic"
                }

            // --- INFRASTRUCTURE ---
            case 'network-health':
                return {
                    why: "Switch 3 in Server Room A is overheating, causing intermittent packet loss for 12 APs.",
                    assets: [
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
                    why: "Humidity levels in Sterile Storage dropped below 30% due to HVAC malfunction.",
                    assets: [],
                    impact: { financial: "Sterility compromise risk", operational: "Regulatory finding" },
                    action: "Deploy portable humidifiers and call facilities"
                }

            default:
                return {
                    why: "Analysis indicates a deviation from standard operating procedures in the last 72 hours.",
                    assets: [],
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

                    {/* Section 2: Top Assets */}
                    <div className="animate-in slide-in-from-right-4 duration-500 delay-200">
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                            <TrendingUp className="w-4 h-4 text-gray-400" />
                            Targeted Assets (Top 5)
                        </h3>
                        <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
                            {content.assets.length > 0 ? (
                                <div className="divide-y divide-gray-50">
                                    {content.assets.map((asset, idx) => (
                                        <div key={idx} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors group">
                                            <div>
                                                <div className="font-semibold text-sm text-gray-900">{asset.id}</div>
                                                <div className="text-xs text-gray-500 mt-0.5">{asset.name} • {asset.loc}</div>
                                            </div>
                                            <span className="text-[10px] font-semibold px-2.5 py-1 bg-gray-100 text-gray-600 rounded-full group-hover:bg-white group-hover:shadow-sm transition-all">
                                                {asset.status}
                                            </span>
                                        </div>
                                    ))}
                                    <button className="w-full p-3 text-center text-xs text-purple-600 font-semibold hover:bg-purple-50 transition-colors">
                                        View Full List
                                    </button>
                                </div>
                            ) : (
                                <div className="p-6 text-sm text-gray-400 text-center italic">No specific asset anomalies detected.</div>
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
