'use client'

import { X, AlertTriangle, ArrowRight, Clock, DollarSign, TrendingUp, MapPin } from 'lucide-react'
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'

interface LabMedicineTier3Props {
    category: string | null
    onClose: () => void
}

export function LabMedicineTier3({ category, onClose }: LabMedicineTier3Props) {
    if (!category) return null

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
                <div className="sticky top-0 bg-white border-b border-gray-200 px-8 py-6 rounded-t-3xl">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-semibold text-gray-900">
                                {category === 'custody-breaks' && 'Custody Breaks Analysis - Root Cause & Prevention'}
                                {category === 'route-optimization' && 'Transit Route Optimization - Time & Cost Savings'}
                                {category === 'department-performance' && 'Department Performance - TAT Optimization'}
                                {category === 'specimen-risks' && 'High-Risk Specimen Types - Handling Improvements'}
                            </h2>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            <X className="w-6 h-6 text-gray-600" />
                        </button>
                    </div>
                </div>

                <div className="px-8 py-6">
                    {category === 'custody-breaks' && <CustodyBreaksContent />}
                    {category === 'route-optimization' && <RouteOptimizationContent />}
                    {category === 'department-performance' && <DepartmentPerformanceContent />}
                    {category === 'specimen-risks' && <SpecimenRisksContent />}
                </div>
            </div>
        </div>
    )
}

// Custody Breaks Content
function CustodyBreaksContent() {
    const breaksByFacility = [
        { facility: 'Main Hospital', total: 285, critical: 42, medium: 128, low: 115, avgDelay: '38 min' },
        { facility: 'Outpatient Center', total: 162, critical: 18, medium: 82, low: 62, avgDelay: '22 min' },
        { facility: 'Emergency Clinic', total: 98, critical: 28, medium: 45, low: 25, avgDelay: '45 min' },
        { facility: 'Specialized Lab', total: 73, critical: 8, medium: 38, low: 27, avgDelay: '15 min' },
    ]

    return (
        <div className="space-y-6">
            {/* Problem Statement */}
            <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
                <div className="flex items-start gap-3">
                    <AlertTriangle className="w-6 h-6 text-red-600 mt-1" />
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Problem Statement</h3>
                        <p className="text-sm text-gray-700 leading-relaxed">
                            <span className="font-semibold">618 custody breaks</span> occurred across all facilities in the past 30 days, representing a 
                            <span className="font-semibold"> 12% increase</span> from the previous period. These breaks introduce traceability gaps, 
                            compliance risks, and potential specimen integrity issues. <span className="font-semibold">96 breaks were critical severity</span>, 
                            affecting time-sensitive diagnostic specimens.
                        </p>
                    </div>
                </div>
            </div>

            {/* Custody Breaks by Facility */}
            <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Custody Breaks by Facility</h3>
                <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="text-left text-xs font-semibold text-gray-600 py-3 px-4">Facility</th>
                                <th className="text-center text-xs font-semibold text-gray-600 py-3 px-4">Total Breaks</th>
                                <th className="text-center text-xs font-semibold text-gray-600 py-3 px-4">Critical</th>
                                <th className="text-center text-xs font-semibold text-gray-600 py-3 px-4">Medium</th>
                                <th className="text-center text-xs font-semibold text-gray-600 py-3 px-4">Low</th>
                                <th className="text-center text-xs font-semibold text-gray-600 py-3 px-4">Avg Delay</th>
                            </tr>
                        </thead>
                        <tbody>
                            {breaksByFacility.map((facility, idx) => (
                                <tr key={idx} className="border-t border-gray-100 hover:bg-gray-50">
                                    <td className="text-sm text-gray-900 py-3 px-4 font-medium">{facility.facility}</td>
                                    <td className="text-sm text-center text-gray-900 py-3 px-4 font-semibold">{facility.total}</td>
                                    <td className="text-sm text-center py-3 px-4">
                                        <span className="text-red-600 font-semibold">{facility.critical}</span>
                                    </td>
                                    <td className="text-sm text-center py-3 px-4">
                                        <span className="text-orange-600 font-semibold">{facility.medium}</span>
                                    </td>
                                    <td className="text-sm text-center text-gray-600 py-3 px-4">{facility.low}</td>
                                    <td className="text-sm text-center text-gray-900 py-3 px-4">{facility.avgDelay}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Root Causes */}
            <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Root Cause Analysis</h3>
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white rounded-2xl border border-gray-200 p-6">
                        <h4 className="text-sm font-semibold text-gray-900 mb-3">Process Gaps</h4>
                        <div className="space-y-2 text-sm text-gray-700">
                            <div className="flex items-start gap-2">
                                <span className="text-red-600 font-bold">•</span>
                                <span>42% of breaks occur during handoff between courier and receiving staff (missed scans)</span>
                            </div>
                            <div className="flex items-start gap-2">
                                <span className="text-red-600 font-bold">•</span>
                                <span>28% due to specimens left unattended during breaks or shift changes</span>
                            </div>
                            <div className="flex items-start gap-2">
                                <span className="text-red-600 font-bold">•</span>
                                <span>18% from inadequate scanner availability in high-traffic areas</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl border border-gray-200 p-6">
                        <h4 className="text-sm font-semibold text-gray-900 mb-3">Technology Issues</h4>
                        <div className="space-y-2 text-sm text-gray-700">
                            <div className="flex items-start gap-2">
                                <span className="text-red-600 font-bold">•</span>
                                <span>Network connectivity issues in 3 zones causing scan failures (8% of breaks)</span>
                            </div>
                            <div className="flex items-start gap-2">
                                <span className="text-red-600 font-bold">•</span>
                                <span>Scanner battery failures leading to manual logging delays (4% of breaks)</span>
                            </div>
                            <div className="flex items-start gap-2">
                                <span className="text-red-600 font-bold">•</span>
                                <span>Mobile app crashes during high-volume periods</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Financial Impact */}
            <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Impact & Risk</h3>
                <div className="grid grid-cols-3 gap-4">
                    <div className="bg-red-500 rounded-2xl p-6 text-white">
                        <div className="text-sm font-medium mb-2 opacity-90">Compliance Risk</div>
                        <div className="text-4xl font-bold mb-1">High</div>
                        <div className="text-xs opacity-75">96 critical breaks</div>
                    </div>
                    <div className="bg-orange-500 rounded-2xl p-6 text-white">
                        <div className="text-sm font-medium mb-2 opacity-90">Re-collection Cost</div>
                        <div className="text-4xl font-bold mb-1">$48K</div>
                        <div className="text-xs opacity-75">Est. monthly impact</div>
                    </div>
                    <div className="bg-emerald-500 rounded-2xl p-6 text-white">
                        <div className="text-sm font-medium mb-2 opacity-90">Reduction Potential</div>
                        <div className="text-4xl font-bold mb-1">68%</div>
                        <div className="text-xs opacity-75">With interventions</div>
                    </div>
                </div>
            </div>

            {/* Recommended Actions */}
            <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recommended Actions</h3>
                <div className="space-y-3">
                    {[
                        { priority: 'Critical', action: 'Deploy 8 additional mobile scanners in Main Hospital high-traffic zones', impact: 'Reduce breaks by 35%', timeline: '1 week' },
                        { priority: 'Critical', action: 'Implement mandatory dual-scan handoff protocol at all courier transfer points', impact: 'Eliminate 42% of breaks', timeline: '2 weeks' },
                        { priority: 'High', action: 'Fix network connectivity in Emergency Clinic, Outpatient zones', impact: 'Resolve 8% of tech-related breaks', timeline: '3 weeks' },
                        { priority: 'High', action: 'Institute real-time custody break alerts with auto-escalation to supervisors', impact: 'Faster resolution, accountability', timeline: '1 month' },
                        { priority: 'Medium', action: 'Quarterly custody chain training for all lab and courier staff', impact: 'Long-term culture change', timeline: 'Ongoing' },
                    ].map((rec, idx) => (
                        <div key={idx} className="bg-white rounded-2xl border-2 border-red-200 p-4 hover:shadow-md transition-shadow">
                            <div className="flex items-start gap-4">
                                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${rec.priority === 'Critical' ? 'bg-red-600 text-white' :
                                        rec.priority === 'High' ? 'bg-red-100 text-red-700' :
                                            'bg-orange-100 text-orange-700'
                                    }`}>
                                    {rec.priority}
                                </span>
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-gray-900 mb-2">{rec.action}</p>
                                    <div className="flex items-center gap-4 text-xs text-gray-600">
                                        <span className="flex items-center gap-1">
                                            <TrendingUp className="w-3 h-3" />
                                            {rec.impact}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Clock className="w-3 h-3" />
                                            {rec.timeline}
                                        </span>
                                    </div>
                                </div>
                                <ArrowRight className="w-5 h-5 text-gray-400" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

// Route Optimization Content
function RouteOptimizationContent() {
    return (
        <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
                <div className="flex items-start gap-3">
                    <MapPin className="w-6 h-6 text-blue-600 mt-1" />
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Transit Route Optimization</h3>
                        <p className="text-sm text-gray-700 leading-relaxed">
                            Current specimen transit routes average <span className="font-semibold">82% on-time delivery</span>. Analysis shows 
                            route consolidation and timing adjustments could improve to <span className="font-semibold">95% on-time</span>, 
                            saving <span className="font-semibold">$120K annually</span> in courier costs and reducing specimen TAT by 18 minutes average.
                        </p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
                <div className="bg-blue-500 rounded-2xl p-6 text-white">
                    <div className="text-sm font-medium mb-2 opacity-90">Current On-Time Rate</div>
                    <div className="text-4xl font-bold mb-1">82%</div>
                    <div className="text-xs opacity-75">2,340 routes/month</div>
                </div>
                <div className="bg-emerald-500 rounded-2xl p-6 text-white">
                    <div className="text-sm font-medium mb-2 opacity-90">Target On-Time Rate</div>
                    <div className="text-4xl font-bold mb-1">95%</div>
                    <div className="text-xs opacity-75">With optimization</div>
                </div>
                <div className="bg-purple-500 rounded-2xl p-6 text-white">
                    <div className="text-sm font-medium mb-2 opacity-90">Annual Savings</div>
                    <div className="text-4xl font-bold mb-1">$120K</div>
                    <div className="text-xs opacity-75">Courier + TAT improvements</div>
                </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 p-6">
                <h3 className="text-sm font-semibold text-gray-900 mb-4">Recommended Route Changes</h3>
                <div className="space-y-3">
                    {[
                        { action: 'Consolidate 3 morning routes into 2 with optimized sequencing', impact: 'Save $28K/year, improve TAT by 12 min' },
                        { action: 'Add dedicated STAT route for emergency specimens (sub-30 min guarantee)', impact: 'Reduce critical delays by 85%' },
                        { action: 'Shift peak-hour pickups to off-peak using predictive scheduling', impact: 'Reduce traffic delays, save $42K/year' },
                        { action: 'Implement real-time GPS tracking with dynamic rerouting', impact: 'Improve on-time delivery to 95%' },
                    ].map((rec, idx) => (
                        <div key={idx} className="flex items-start justify-between p-3 bg-gray-50 rounded-xl">
                            <p className="text-sm text-gray-900 flex-1">{rec.action}</p>
                            <span className="text-xs text-emerald-600 font-semibold whitespace-nowrap ml-4">{rec.impact}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

// Department Performance Content
function DepartmentPerformanceContent() {
    const deptData = [
        { dept: 'Operating Room', tat: 72, target: 45, gap: 27, volume: 1240 },
        { dept: 'Emergency Dept', tat: 58, target: 30, gap: 28, volume: 2850 },
        { dept: 'ICU', tat: 42, target: 30, gap: 12, volume: 1680 },
        { dept: 'Outpatient Clinic', tat: 38, target: 60, gap: -22, volume: 3420 },
        { dept: 'Inpatient Ward', tat: 52, target: 45, gap: 7, volume: 2150 },
    ]

    return (
        <div className="space-y-6">
            <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6">
                <div className="flex items-start gap-3">
                    <Clock className="w-6 h-6 text-yellow-600 mt-1" />
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Turnaround Time Optimization</h3>
                        <p className="text-sm text-gray-700 leading-relaxed">
                            Two departments exceed TAT targets by significant margins: <span className="font-semibold">Operating Room (27 min over)</span> and 
                            <span className="font-semibold"> Emergency Department (28 min over)</span>. These delays impact surgical scheduling and 
                            emergency treatment decisions. Targeted interventions could save <span className="font-semibold">$180K annually</span> in operational efficiency.
                        </p>
                    </div>
                </div>
            </div>

            <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Department TAT Performance</h3>
                <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="text-left text-xs font-semibold text-gray-600 py-3 px-4">Department</th>
                                <th className="text-center text-xs font-semibold text-gray-600 py-3 px-4">Current TAT</th>
                                <th className="text-center text-xs font-semibold text-gray-600 py-3 px-4">Target TAT</th>
                                <th className="text-center text-xs font-semibold text-gray-600 py-3 px-4">Gap (min)</th>
                                <th className="text-center text-xs font-semibold text-gray-600 py-3 px-4">Monthly Volume</th>
                            </tr>
                        </thead>
                        <tbody>
                            {deptData.map((dept, idx) => (
                                <tr key={idx} className="border-t border-gray-100 hover:bg-gray-50">
                                    <td className="text-sm text-gray-900 py-3 px-4 font-medium">{dept.dept}</td>
                                    <td className="text-sm text-center py-3 px-4">
                                        <span className={`font-semibold ${dept.gap > 20 ? 'text-red-600' : dept.gap > 0 ? 'text-orange-600' : 'text-emerald-600'}`}>
                                            {dept.tat} min
                                        </span>
                                    </td>
                                    <td className="text-sm text-center text-gray-600 py-3 px-4">{dept.target} min</td>
                                    <td className="text-sm text-center py-3 px-4">
                                        <span className={`font-semibold ${dept.gap > 0 ? 'text-red-600' : 'text-emerald-600'}`}>
                                            {dept.gap > 0 ? '+' : ''}{dept.gap}
                                        </span>
                                    </td>
                                    <td className="text-sm text-center text-gray-900 py-3 px-4">{dept.volume.toLocaleString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-2xl border border-gray-200 p-6">
                    <h4 className="text-sm font-semibold text-gray-900 mb-3">Operating Room Issues</h4>
                    <div className="space-y-2 text-sm text-gray-700">
                        <div className="flex items-start gap-2">
                            <span className="text-yellow-600 font-bold">•</span>
                            <span>15-min delay in specimen handoff from OR to courier</span>
                        </div>
                        <div className="flex items-start gap-2">
                            <span className="text-yellow-600 font-bold">•</span>
                            <span>Lab prioritization not aligned with surgical urgency</span>
                        </div>
                        <div className="flex items-start gap-2">
                            <span className="text-yellow-600 font-bold">•</span>
                            <span>12-min average lab processing delay during peak hours</span>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-2xl border border-gray-200 p-6">
                    <h4 className="text-sm font-semibold text-gray-900 mb-3">Emergency Dept Issues</h4>
                    <div className="space-y-2 text-sm text-gray-700">
                        <div className="flex items-start gap-2">
                            <span className="text-yellow-600 font-bold">•</span>
                            <span>High specimen volume overwhelming collection points</span>
                        </div>
                        <div className="flex items-start gap-2">
                            <span className="text-yellow-600 font-bold">•</span>
                            <span>STAT specimens not clearly flagged in system</span>
                        </div>
                        <div className="flex items-start gap-2">
                            <span className="text-yellow-600 font-bold">•</span>
                            <span>18-min courier wait time during shift changes</span>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Optimization Recommendations</h3>
                <div className="space-y-3">
                    {[
                        { priority: 'Critical', action: 'Implement dedicated STAT specimen lane in ED with priority lab processing', impact: 'Reduce ED TAT by 22 min', timeline: '2 weeks' },
                        { priority: 'Critical', action: 'Add OR specimen collection staff during peak surgical hours (8am-2pm)', impact: 'Reduce OR TAT by 15 min', timeline: '1 month' },
                        { priority: 'High', action: 'Deploy automated priority flagging based on clinical urgency scores', impact: 'Improve critical specimen TAT by 35%', timeline: '6 weeks' },
                        { priority: 'Medium', action: 'Establish 15-min courier pickup SLA during peak ED hours', impact: 'Reduce ED wait time by 18 min', timeline: '2 months' },
                    ].map((rec, idx) => (
                        <div key={idx} className="bg-white rounded-2xl border border-gray-200 p-4 hover:shadow-md transition-shadow">
                            <div className="flex items-start gap-4">
                                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${rec.priority === 'Critical' ? 'bg-yellow-600 text-white' :
                                        rec.priority === 'High' ? 'bg-yellow-100 text-yellow-700' :
                                            'bg-orange-100 text-orange-700'
                                    }`}>
                                    {rec.priority}
                                </span>
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-gray-900 mb-2">{rec.action}</p>
                                    <div className="flex items-center gap-4 text-xs text-gray-600">
                                        <span className="flex items-center gap-1">
                                            <TrendingUp className="w-3 h-3" />
                                            {rec.impact}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Clock className="w-3 h-3" />
                                            {rec.timeline}
                                        </span>
                                    </div>
                                </div>
                                <ArrowRight className="w-5 h-5 text-gray-400" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

// Specimen Risks Content
function SpecimenRisksContent() {
    return (
        <div className="space-y-6">
            <div className="bg-orange-50 border border-orange-200 rounded-2xl p-6">
                <div className="flex items-start gap-3">
                    <AlertTriangle className="w-6 h-6 text-orange-600 mt-1" />
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">High-Risk Specimen Types</h3>
                        <p className="text-sm text-gray-700 leading-relaxed">
                            Three specimen types show elevated risk profiles: <span className="font-semibold">Frozen sections (18% custody break rate)</span>, 
                            <span className="font-semibold"> Bone marrow (12% temperature excursions)</span>, and <span className="font-semibold">Cytology specimens (15% labeling errors)</span>. 
                            Enhanced protocols could reduce incidents by <span className="font-semibold">72%</span> and save <span className="font-semibold">$95K annually</span> in re-collections.
                        </p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
                <div className="bg-white rounded-2xl border-2 border-orange-200 p-6">
                    <h4 className="text-sm font-semibold text-orange-700 mb-3">Frozen Sections</h4>
                    <div className="text-3xl font-bold text-gray-900 mb-2">18%</div>
                    <p className="text-xs text-gray-600 mb-4">Custody break rate</p>
                    <div className="space-y-2 text-xs text-gray-700">
                        <p>• Time-critical OR specimens</p>
                        <p>• 8-12 min transport window</p>
                        <p>• High surgical impact</p>
                    </div>
                </div>

                <div className="bg-white rounded-2xl border-2 border-red-200 p-6">
                    <h4 className="text-sm font-semibold text-red-700 mb-3">Bone Marrow</h4>
                    <div className="text-3xl font-bold text-gray-900 mb-2">12%</div>
                    <p className="text-xs text-gray-600 mb-4">Temp excursion rate</p>
                    <div className="space-y-2 text-xs text-gray-700">
                        <p>• Strict temp control 2-8°C</p>
                        <p>• Expensive re-collection</p>
                        <p>• Patient discomfort</p>
                    </div>
                </div>

                <div className="bg-white rounded-2xl border-2 border-yellow-200 p-6">
                    <h4 className="text-sm font-semibold text-yellow-700 mb-3">Cytology</h4>
                    <div className="text-3xl font-bold text-gray-900 mb-2">15%</div>
                    <p className="text-xs text-gray-600 mb-4">Labeling error rate</p>
                    <div className="space-y-2 text-xs text-gray-700">
                        <p>• Complex labeling reqs</p>
                        <p>• Multiple fixatives</p>
                        <p>• High mis-ID risk</p>
                    </div>
                </div>
            </div>

            <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Enhanced Handling Protocols</h3>
                <div className="space-y-3">
                    {[
                        { priority: 'Critical', action: 'Implement dedicated frozen section courier with <10 min response SLA', impact: 'Reduce custody breaks by 85%', savings: '$42K/year' },
                        { priority: 'Critical', action: 'Deploy temperature-monitored transport containers for bone marrow specimens', impact: 'Eliminate temp excursions', savings: '$28K/year' },
                        { priority: 'High', action: 'Require barcode verification at collection for all cytology specimens', impact: 'Reduce labeling errors by 90%', savings: '$18K/year' },
                        { priority: 'High', action: 'Provide specialized training for high-risk specimen handling (quarterly)', impact: 'Improve staff competency', savings: '$7K/year' },
                    ].map((rec, idx) => (
                        <div key={idx} className="bg-white rounded-2xl border border-gray-200 p-4 hover:shadow-md transition-shadow">
                            <div className="flex items-start gap-4">
                                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${rec.priority === 'Critical' ? 'bg-orange-600 text-white' :
                                        'bg-orange-100 text-orange-700'
                                    }`}>
                                    {rec.priority}
                                </span>
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-gray-900 mb-2">{rec.action}</p>
                                    <div className="flex items-center gap-4 text-xs text-gray-600">
                                        <span className="flex items-center gap-1">
                                            <TrendingUp className="w-3 h-3" />
                                            {rec.impact}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <DollarSign className="w-3 h-3" />
                                            {rec.savings}
                                        </span>
                                    </div>
                                </div>
                                <ArrowRight className="w-5 h-5 text-gray-400" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
