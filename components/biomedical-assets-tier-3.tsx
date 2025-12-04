'use client'

import { X, TrendingUp, Clock, DollarSign, Activity, AlertTriangle, ArrowRight, Search, Filter } from 'lucide-react'
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'

interface BiomedicalAssetsTier3Props {
    category: string | null
    onClose: () => void
}

export function BiomedicalAssetsTier3({ category, onClose }: BiomedicalAssetsTier3Props) {
    if (!category) return null

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
                <div className="sticky top-0 bg-white border-b border-gray-200 px-8 py-6 rounded-t-3xl z-10">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-semibold text-gray-900">
                                {category === 'asset-utilization' && 'Underutilized Assets - Redeployment Opportunities'}
                                {category === 'maintenance-backlog' && 'Maintenance Backlog - Critical Impact Analysis'}
                                {category === 'high-value-tracking' && 'High-Value Asset Monitoring'}
                                {category === 'workflow-bottlenecks' && 'Workflow Bottlenecks - Movement Efficiency'}
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
                    {category === 'asset-utilization' && <AssetUtilizationContent />}
                    {category === 'maintenance-backlog' && <MaintenanceBacklogContent />}
                    {category === 'high-value-tracking' && <HighValueTrackingContent />}
                    {category === 'workflow-bottlenecks' && <WorkflowBottlenecksContent />}
                </div>
            </div>
        </div>
    )
}

// Asset Utilization Content
function AssetUtilizationContent() {
    const underutilizedAssets = [
        { category: 'Surgical Equipment', count: 385, avgUtilization: 42, potentialSavings: '$2.8M', location: 'Main Hospital - West Wing' },
        { category: 'Imaging Devices', count: 124, avgUtilization: 38, potentialSavings: '$1.2M', location: 'Surgical Center' },
        { category: 'Patient Monitors', count: 298, avgUtilization: 45, potentialSavings: '$890K', location: 'Main Hospital - East Wing' },
        { category: 'Infusion Pumps', count: 245, avgUtilization: 41, potentialSavings: '$640K', location: 'ICU' },
        { category: 'Ventilators', count: 89, avgUtilization: 48, potentialSavings: '$1.1M', location: 'Emergency Department' },
        { category: 'Lab Equipment', count: 192, avgUtilization: 44, potentialSavings: '$520K', location: 'Lab Services' },
        { category: 'Wheelchairs & Mobility', count: 361, avgUtilization: 39, potentialSavings: '$340K', location: 'Multiple Locations' },
    ]

    const topUnderutilizedAssets = [
        { id: 'IP-992', type: 'Infusion Pump', util: 12, location: 'ED Storage', reason: 'Forgotten in storage', action: 'Return to Central Supply' },
        { id: 'VENT-102', type: 'Ventilator', util: 5, location: 'West Wing', reason: 'Surplus unit', action: 'Decommission' },
        { id: 'MON-441', type: 'Patient Monitor', util: 18, location: 'ICU Overflow', reason: 'Backup unit overuse', action: 'Redeploy to ED' },
        { id: 'IMG-003', type: 'Portable X-Ray', util: 22, location: 'Radiology Hall B', reason: 'Scheduling inefficiency', action: 'Update scheduling rules' },
        { id: 'SURG-882', type: 'Electrosurgical Unit', util: 8, location: 'OR 4 (Closed)', reason: 'Room under renovation', action: 'Move to OR 2' },
        { id: 'WCH-112', type: 'Wheelchair', util: 2, location: 'Lobby Closet', reason: 'Damaged / Unreported', action: 'Send to Biomed Shop' },
        { id: 'DEF-331', type: 'Defibrillator', util: 0, location: 'East Wing Nurse Stn', reason: 'Battery expired', action: 'Replace Battery' },
        { id: 'PUMP-771', type: 'Feeding Pump', util: 15, location: 'Pediatrics', reason: 'Seasonal low census', action: 'Loan to NICU' },
        { id: 'BED-229', type: 'Smart Bed', util: 35, location: 'Ward 3B', reason: 'Patient preference', action: 'Staff training' },
        { id: 'EKG-554', type: 'EKG Machine', util: 28, location: 'Cardiology Clinic', reason: 'Duplicate equipment', action: 'Transfer to Satellite Clinic' },
    ]

    const utilizationTrend = [
        { week: 'Week 1', utilization: 48, target: 70 },
        { week: 'Week 2', utilization: 47, target: 70 },
        { week: 'Week 3', utilization: 45, target: 70 },
        { week: 'Week 4', utilization: 46, target: 70 },
        { week: 'Week 5', utilization: 44, target: 70 },
        { week: 'Week 6', utilization: 43, target: 70 },
    ]

    return (
        <div className="space-y-6">
            {/* Problem Statement */}
            <div className="bg-orange-50 border border-orange-200 rounded-2xl p-6">
                <div className="flex items-start gap-3">
                    <TrendingUp className="w-6 h-6 text-orange-600 mt-1" />
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Problem Statement</h3>
                        <p className="text-sm text-gray-700 leading-relaxed">
                            <span className="font-semibold">1,694 assets (3.8% of total inventory)</span> are operating below 50% utilization rate,
                            significantly under the target of 70%. This represents approximately <span className="font-semibold">$7.5M in tied-up capital</span> that
                            could be redeployed to high-demand areas or decommissioned to reduce maintenance costs.
                        </p>
                    </div>
                </div>
            </div>

            {/* Root Cause Analysis */}
            <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Root Cause Analysis</h3>
                <div className="grid grid-cols-2 gap-6">
                    {/* Utilization Trend */}
                    <div className="bg-white rounded-2xl p-6 border border-gray-200">
                        <h4 className="text-sm font-semibold text-gray-900 mb-4">6-Week Utilization Trend</h4>
                        <ResponsiveContainer width="100%" height={200}>
                            <LineChart data={utilizationTrend}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                                <XAxis dataKey="week" tick={{ fontSize: 11 }} />
                                <YAxis tick={{ fontSize: 11 }} domain={[0, 100]} />
                                <Tooltip />
                                <Line type="monotone" dataKey="utilization" stroke="#f59e0b" strokeWidth={3} dot={{ r: 5 }} />
                                <Line type="monotone" dataKey="target" stroke="#10b981" strokeWidth={2} strokeDasharray="5 5" />
                            </LineChart>
                        </ResponsiveContainer>
                        <p className="text-xs text-gray-500 mt-2">Declining trend indicates growing mismatch between asset allocation and demand.</p>
                    </div>

                    {/* Key Findings */}
                    <div className="bg-white rounded-2xl p-6 border border-gray-200">
                        <h4 className="text-sm font-semibold text-gray-900 mb-4">Key Findings</h4>
                        <div className="space-y-3">
                            <div className="flex items-start gap-2">
                                <div className="w-2 h-2 rounded-full bg-orange-500 mt-1.5" />
                                <p className="text-sm text-gray-700"><span className="font-semibold">Location mismatch:</span> 68% of underutilized assets in West Wing vs. high demand in Emergency Dept.</p>
                            </div>
                            <div className="flex items-start gap-2">
                                <div className="w-2 h-2 rounded-full bg-orange-500 mt-1.5" />
                                <p className="text-sm text-gray-700"><span className="font-semibold">Procurement lag:</span> Assets purchased 18 months ago based on outdated capacity planning.</p>
                            </div>
                            <div className="flex items-start gap-2">
                                <div className="w-2 h-2 rounded-full bg-orange-500 mt-1.5" />
                                <p className="text-sm text-gray-700"><span className="font-semibold">Seasonal variation:</span> 22% variance between peak and low-demand periods not accounted for.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Detailed Breakdown */}
            <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Underutilized Assets by Category</h3>
                <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="text-left text-xs font-semibold text-gray-600 py-3 px-4">Category</th>
                                <th className="text-center text-xs font-semibold text-gray-600 py-3 px-4">Asset Count</th>
                                <th className="text-center text-xs font-semibold text-gray-600 py-3 px-4">Avg Utilization</th>
                                <th className="text-left text-xs font-semibold text-gray-600 py-3 px-4">Primary Location</th>
                                <th className="text-right text-xs font-semibold text-gray-600 py-3 px-4">Potential Savings</th>
                            </tr>
                        </thead>
                        <tbody>
                            {underutilizedAssets.map((asset, idx) => (
                                <tr key={idx} className="border-t border-gray-100 hover:bg-gray-50">
                                    <td className="text-sm text-gray-900 py-3 px-4">{asset.category}</td>
                                    <td className="text-sm text-center text-gray-900 py-3 px-4 font-semibold">{asset.count}</td>
                                    <td className="text-sm text-center py-3 px-4">
                                        <span className={`font-semibold ${asset.avgUtilization < 40 ? 'text-red-600' : 'text-orange-600'}`}>
                                            {asset.avgUtilization}%
                                        </span>
                                    </td>
                                    <td className="text-sm text-gray-700 py-3 px-4">{asset.location}</td>
                                    <td className="text-sm text-right text-gray-900 py-3 px-4 font-semibold">{asset.potentialSavings}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* NEW: Top 10 Underutilized Assets Drill-Down (R2.5) */}
            <div>
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Top 10 Underutilized Assets (Drill-Down)</h3>
                    <div className="flex items-center gap-2">
                        <div className="relative">
                            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search assets..."
                                className="pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
                            />
                        </div>
                        <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-600">
                            <Filter className="w-4 h-4" />
                        </button>
                    </div>
                </div>
                <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="text-left text-xs font-semibold text-gray-600 py-3 px-4">Asset ID</th>
                                <th className="text-left text-xs font-semibold text-gray-600 py-3 px-4">Type</th>
                                <th className="text-center text-xs font-semibold text-gray-600 py-3 px-4">Utilization</th>
                                <th className="text-left text-xs font-semibold text-gray-600 py-3 px-4">Current Location</th>
                                <th className="text-left text-xs font-semibold text-gray-600 py-3 px-4">Reason</th>
                                <th className="text-left text-xs font-semibold text-gray-600 py-3 px-4">Recommended Action</th>
                                <th className="text-center text-xs font-semibold text-gray-600 py-3 px-4">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {topUnderutilizedAssets.map((asset, idx) => (
                                <tr key={idx} className="border-t border-gray-100 hover:bg-gray-50 group">
                                    <td className="text-sm font-medium text-gray-900 py-3 px-4">{asset.id}</td>
                                    <td className="text-sm text-gray-700 py-3 px-4">{asset.type}</td>
                                    <td className="text-sm text-center py-3 px-4">
                                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${asset.util < 10 ? 'bg-red-100 text-red-800' : 'bg-orange-100 text-orange-800'
                                            }`}>
                                            {asset.util}%
                                        </span>
                                    </td>
                                    <td className="text-sm text-gray-700 py-3 px-4">{asset.location}</td>
                                    <td className="text-sm text-gray-600 py-3 px-4 italic">{asset.reason}</td>
                                    <td className="text-sm text-blue-700 font-medium py-3 px-4">{asset.action}</td>
                                    <td className="text-center py-3 px-4">
                                        <button className="text-xs bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 px-3 py-1.5 rounded-lg transition-colors shadow-sm">
                                            Execute
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Financial Impact */}
            <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Financial Impact</h3>
                <div className="grid grid-cols-3 gap-4">
                    <div className="bg-orange-500 rounded-2xl p-6 text-white">
                        <div className="text-sm font-medium mb-2 opacity-90">Total Asset Value</div>
                        <div className="text-4xl font-bold mb-1">$7.5M</div>
                        <div className="text-xs opacity-75">Currently underutilized</div>
                    </div>
                    <div className="bg-emerald-500 rounded-2xl p-6 text-white">
                        <div className="text-sm font-medium mb-2 opacity-90">Annual Savings Opportunity</div>
                        <div className="text-4xl font-bold mb-1">$2.1M</div>
                        <div className="text-xs opacity-75">Through redeployment</div>
                    </div>
                    <div className="bg-blue-500 rounded-2xl p-6 text-white">
                        <div className="text-sm font-medium mb-2 opacity-90">Efficiency Gain</div>
                        <div className="text-4xl font-bold mb-1">28%</div>
                        <div className="text-xs opacity-75">Target utilization improvement</div>
                    </div>
                </div>
            </div>

            {/* Recommended Actions */}
            <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Strategic Recommendations</h3>
                <div className="space-y-3">
                    {[
                        { priority: 'High', action: 'Immediately redeploy 385 surgical equipment units from West Wing to Emergency Department', impact: '$850K annual savings', timeline: '2 weeks' },
                        { priority: 'High', action: 'Transfer 124 imaging devices to high-demand Surgical Center', impact: '$420K annual savings', timeline: '1 month' },
                        { priority: 'Medium', action: 'Decommission 89 ventilators with consistently low usage and negotiate lease reduction', impact: '$280K annual savings', timeline: '3 months' },
                        { priority: 'Medium', action: 'Implement dynamic asset pooling system for wheelchairs across all locations', impact: '$190K annual savings', timeline: '2 months' },
                        { priority: 'Low', action: 'Review procurement process to align with actual demand patterns and seasonal variation', impact: 'Prevent future $1.2M+ in overstock', timeline: '6 months' },
                    ].map((rec, idx) => (
                        <div key={idx} className="bg-white rounded-2xl border border-gray-200 p-4 hover:shadow-md transition-shadow">
                            <div className="flex items-start gap-4">
                                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${rec.priority === 'High' ? 'bg-red-100 text-red-700' :
                                        rec.priority === 'Medium' ? 'bg-orange-100 text-orange-700' :
                                            'bg-blue-100 text-blue-700'
                                    }`}>
                                    {rec.priority} Priority
                                </span>
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-gray-900 mb-2">{rec.action}</p>
                                    <div className="flex items-center gap-4 text-xs text-gray-600">
                                        <span className="flex items-center gap-1">
                                            <DollarSign className="w-3 h-3" />
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

// Maintenance Backlog Content
function MaintenanceBacklogContent() {
    const overdueByCategory = [
        { category: 'Surgical Equipment', overdue: 18, critical: 8, value: '$1.2M' },
        { category: 'Imaging Devices', overdue: 12, critical: 5, value: '$2.8M' },
        { category: 'Patient Monitors', overdue: 15, critical: 4, value: '$580K' },
        { category: 'Ventilators', overdue: 8, critical: 6, value: '$1.5M' },
        { category: 'Infusion Pumps', overdue: 10, critical: 3, value: '$420K' },
        { category: 'Lab Equipment', overdue: 5, critical: 2, value: '$680K' },
    ]

    return (
        <div className="space-y-6">
            {/* Problem Statement */}
            <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
                <div className="flex items-start gap-3">
                    <Clock className="w-6 h-6 text-red-600 mt-1" />
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Problem Statement</h3>
                        <p className="text-sm text-gray-700 leading-relaxed">
                            <span className="font-semibold">68 critical assets</span> have overdue maintenance, including <span className="font-semibold">28 units in ICU and Emergency Department</span>.
                            This creates immediate patient safety risks, potential compliance violations, and increases the likelihood of unexpected equipment failures
                            during critical procedures. Combined asset value: <span className="font-semibold">$7.2M</span>.
                        </p>
                    </div>
                </div>
            </div>

            {/* Overdue Breakdown */}
            <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Overdue Maintenance by Category</h3>
                <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="text-left text-xs font-semibold text-gray-600 py-3 px-4">Category</th>
                                <th className="text-center text-xs font-semibold text-gray-600 py-3 px-4">Total Overdue</th>
                                <th className="text-center text-xs font-semibold text-gray-600 py-3 px-4">Critical Priority</th>
                                <th className="text-right text-xs font-semibold text-gray-600 py-3 px-4">Asset Value</th>
                            </tr>
                        </thead>
                        <tbody>
                            {overdueByCategory.map((cat, idx) => (
                                <tr key={idx} className="border-t border-gray-100 hover:bg-gray-50">
                                    <td className="text-sm text-gray-900 py-3 px-4">{cat.category}</td>
                                    <td className="text-sm text-center py-3 px-4">
                                        <span className="font-semibold text-red-600">{cat.overdue}</span>
                                    </td>
                                    <td className="text-sm text-center py-3 px-4">
                                        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-red-100 text-red-700 font-bold text-xs">
                                            {cat.critical}
                                        </span>
                                    </td>
                                    <td className="text-sm text-right text-gray-900 py-3 px-4 font-semibold">{cat.value}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Impact Analysis */}
            <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Risk & Impact Analysis</h3>
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
                        <div className="flex items-center gap-2 mb-3">
                            <AlertTriangle className="w-5 h-5 text-red-600" />
                            <h4 className="text-sm font-semibold text-gray-900">Patient Safety Risk</h4>
                        </div>
                        <ul className="space-y-2 text-sm text-gray-700">
                            <li className="flex items-start gap-2">
                                <span className="text-red-600 font-bold">•</span>
                                <span>28 units in critical care areas (ICU, ED) with expired certifications</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-red-600 font-bold">•</span>
                                <span>Increased failure risk during life-critical procedures</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-red-600 font-bold">•</span>
                                <span>6 ventilators past regulatory inspection deadline</span>
                            </li>
                        </ul>
                    </div>

                    <div className="bg-orange-50 border border-orange-200 rounded-2xl p-6">
                        <div className="flex items-center gap-2 mb-3">
                            <DollarSign className="w-5 h-5 text-orange-600" />
                            <h4 className="text-sm font-semibold text-gray-900">Financial Impact</h4>
                        </div>
                        <ul className="space-y-2 text-sm text-gray-700">
                            <li className="flex items-start gap-2">
                                <span className="text-orange-600 font-bold">•</span>
                                <span>Estimated $480K in potential regulatory fines</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-orange-600 font-bold">•</span>
                                <span>Emergency repair costs 3-5x higher than preventive maintenance</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-orange-600 font-bold">•</span>
                                <span>$7.2M in assets at risk of premature failure</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Financial Impact Summary */}
            <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Cost Impact</h3>
                <div className="grid grid-cols-3 gap-4">
                    <div className="bg-red-500 rounded-2xl p-6 text-white">
                        <div className="text-sm font-medium mb-2 opacity-90">Immediate Cost to Resolve</div>
                        <div className="text-4xl font-bold mb-1">$142K</div>
                        <div className="text-xs opacity-75">All 68 overdue units</div>
                    </div>
                    <div className="bg-orange-500 rounded-2xl p-6 text-white">
                        <div className="text-sm font-medium mb-2 opacity-90">Avoided Emergency Repairs</div>
                        <div className="text-4xl font-bold mb-1">$620K</div>
                        <div className="text-xs opacity-75">vs. reactive maintenance</div>
                    </div>
                    <div className="bg-emerald-500 rounded-2xl p-6 text-white">
                        <div className="text-sm font-medium mb-2 opacity-90">Net Savings</div>
                        <div className="text-4xl font-bold mb-1">$478K</div>
                        <div className="text-xs opacity-75">ROI: 337%</div>
                    </div>
                </div>
            </div>

            {/* Recommended Actions */}
            <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Immediate Actions Required</h3>
                <div className="space-y-3">
                    {[
                        { priority: 'Critical', action: 'Pull 6 ventilators from service immediately for emergency compliance inspection', impact: 'Avoid $180K regulatory fine', timeline: '24 hours' },
                        { priority: 'Critical', action: 'Schedule maintenance for 28 critical care units within 48 hours', impact: 'Eliminate patient safety risk', timeline: '48 hours' },
                        { priority: 'High', action: 'Fast-track maintenance for 18 surgical equipment units before scheduled procedures', impact: 'Prevent OR delays, save $85K', timeline: '1 week' },
                        { priority: 'Medium', action: 'Implement automated maintenance scheduling system to prevent future backlog', impact: 'Reduce overdue by 85%', timeline: '1 month' },
                        { priority: 'Medium', action: 'Allocate $28K emergency budget for contracted maintenance support', impact: 'Clear backlog within 2 weeks', timeline: '2 weeks' },
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
                                            <DollarSign className="w-3 h-3" />
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

// High-Value Tracking Content
function HighValueTrackingContent() {
    const highValueCategories = [
        { category: 'MRI Scanners', count: 24, value: '$48M', utilization: 82, lastMaintenance: '12 days ago' },
        { category: 'CT Scanners', count: 18, value: '$27M', utilization: 78, lastMaintenance: '8 days ago' },
        { category: 'Surgical Robots', count: 12, value: '$24M', utilization: 91, lastMaintenance: '5 days ago' },
        { category: 'Angiography Systems', count: 8, value: '$12M', utilization: 74, lastMaintenance: '15 days ago' },
        { category: 'Ventilators (ICU)', count: 180, value: '$9M', utilization: 88, lastMaintenance: '3 days ago' },
    ]

    return (
        <div className="space-y-6">
            {/* Problem Statement */}
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
                <div className="flex items-start gap-3">
                    <DollarSign className="w-6 h-6 text-blue-600 mt-1" />
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">High-Value Asset Monitoring</h3>
                        <p className="text-sm text-gray-700 leading-relaxed">
                            <span className="font-semibold">8,400 high-value assets</span> representing <span className="font-semibold">$120M+ in capital investment</span> require
                            enhanced monitoring protocols. These critical assets drive revenue-generating procedures and require 99.5%+ uptime to meet clinical demand
                            and financial targets.
                        </p>
                    </div>
                </div>
            </div>

            {/* High-Value Assets Table */}
            <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Top High-Value Asset Categories</h3>
                <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="text-left text-xs font-semibold text-gray-600 py-3 px-4">Category</th>
                                <th className="text-center text-xs font-semibold text-gray-600 py-3 px-4">Unit Count</th>
                                <th className="text-right text-xs font-semibold text-gray-600 py-3 px-4">Total Value</th>
                                <th className="text-center text-xs font-semibold text-gray-600 py-3 px-4">Utilization</th>
                                <th className="text-center text-xs font-semibold text-gray-600 py-3 px-4">Last Maintenance</th>
                            </tr>
                        </thead>
                        <tbody>
                            {highValueCategories.map((cat, idx) => (
                                <tr key={idx} className="border-t border-gray-100 hover:bg-gray-50">
                                    <td className="text-sm text-gray-900 py-3 px-4 font-medium">{cat.category}</td>
                                    <td className="text-sm text-center text-gray-900 py-3 px-4">{cat.count}</td>
                                    <td className="text-sm text-right text-gray-900 py-3 px-4 font-semibold">{cat.value}</td>
                                    <td className="text-sm text-center py-3 px-4">
                                        <span className={`font-semibold ${cat.utilization >= 80 ? 'text-emerald-600' : 'text-orange-600'}`}>
                                            {cat.utilization}%
                                        </span>
                                    </td>
                                    <td className="text-sm text-center text-gray-600 py-3 px-4">{cat.lastMaintenance}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Monitoring Metrics */}
            <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Monitoring Status</h3>
                <div className="grid grid-cols-4 gap-4">
                    <div className="bg-white rounded-2xl border border-gray-200 p-6">
                        <div className="text-sm text-gray-500 mb-2">Real-Time Tracking</div>
                        <div className="text-3xl font-bold text-emerald-600">99.2%</div>
                        <div className="text-xs text-gray-500 mt-1">8,333 / 8,400 assets</div>
                    </div>
                    <div className="bg-white rounded-2xl border border-gray-200 p-6">
                        <div className="text-sm text-gray-500 mb-2">Avg Uptime</div>
                        <div className="text-3xl font-bold text-emerald-600">98.7%</div>
                        <div className="text-xs text-gray-500 mt-1">Target: 99.5%</div>
                    </div>
                    <div className="bg-white rounded-2xl border border-gray-200 p-6">
                        <div className="text-sm text-gray-500 mb-2">Active Alerts</div>
                        <div className="text-3xl font-bold text-orange-600">14</div>
                        <div className="text-xs text-gray-500 mt-1">5 critical, 9 warning</div>
                    </div>
                    <div className="bg-white rounded-2xl border border-gray-200 p-6">
                        <div className="text-sm text-gray-500 mb-2">Predictive Score</div>
                        <div className="text-3xl font-bold text-blue-600">87</div>
                        <div className="text-xs text-gray-500 mt-1">AI failure prediction</div>
                    </div>
                </div>
            </div>

            {/* Financial Impact */}
            <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Financial Protection</h3>
                <div className="grid grid-cols-3 gap-4">
                    <div className="bg-blue-500 rounded-2xl p-6 text-white">
                        <div className="text-sm font-medium mb-2 opacity-90">Protected Asset Value</div>
                        <div className="text-4xl font-bold mb-1">$120M</div>
                        <div className="text-xs opacity-75">8,400 high-value assets</div>
                    </div>
                    <div className="bg-emerald-500 rounded-2xl p-6 text-white">
                        <div className="text-sm font-medium mb-2 opacity-90">Prevented Downtime</div>
                        <div className="text-4xl font-bold mb-1">$8.4M</div>
                        <div className="text-xs opacity-75">Annual value saved</div>
                    </div>
                    <div className="bg-purple-500 rounded-2xl p-6 text-white">
                        <div className="text-sm font-medium mb-2 opacity-90">Revenue Protected</div>
                        <div className="text-4xl font-bold mb-1">$42M</div>
                        <div className="text-xs opacity-75">Procedure revenue secured</div>
                    </div>
                </div>
            </div>

            {/* Recommended Actions */}
            <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recommended Enhancements</h3>
                <div className="space-y-3">
                    {[
                        { priority: 'High', action: 'Implement predictive maintenance AI for 24 MRI/CT scanners', impact: '$2.8M downtime prevention', timeline: '6 weeks' },
                        { priority: 'High', action: 'Add redundant monitoring sensors on 12 surgical robots', impact: '99.9% uptime guarantee', timeline: '4 weeks' },
                        { priority: 'Medium', action: 'Establish 4-hour SLA maintenance contracts for imaging equipment', impact: 'Reduce downtime by 62%', timeline: '2 months' },
                        { priority: 'Medium', action: 'Deploy mobile asset tracking for all high-value equipment', impact: 'Zero location uncertainty', timeline: '8 weeks' },
                        { priority: 'Low', action: 'Create executive dashboard for real-time high-value asset status', impact: 'Enhanced visibility', timeline: '3 months' },
                    ].map((rec, idx) => (
                        <div key={idx} className="bg-white rounded-2xl border border-gray-200 p-4 hover:shadow-md transition-shadow">
                            <div className="flex items-start gap-4">
                                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${rec.priority === 'High' ? 'bg-blue-100 text-blue-700' :
                                        rec.priority === 'Medium' ? 'bg-indigo-100 text-indigo-700' :
                                            'bg-gray-100 text-gray-700'
                                    }`}>
                                    {rec.priority} Priority
                                </span>
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-gray-900 mb-2">{rec.action}</p>
                                    <div className="flex items-center gap-4 text-xs text-gray-600">
                                        <span className="flex items-center gap-1">
                                            <DollarSign className="w-3 h-3" />
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

// Workflow Bottlenecks Content
function WorkflowBottlenecksContent() {
    const bottleneckData = [
        { route: 'OR → Sterilization → OR', avgDelay: 185, occurrences: 42, impact: 'High' },
        { route: 'ICU → Maintenance → ICU', avgDelay: 220, occurrences: 28, impact: 'Critical' },
        { route: 'ED → Lab → ED', avgDelay: 95, occurrences: 68, impact: 'Medium' },
        { route: 'Ward → Imaging → Ward', avgDelay: 140, occurrences: 35, impact: 'High' },
        { route: 'Surgical Center → Storage → SC', avgDelay: 75, occurrences: 52, impact: 'Medium' },
    ]

    return (
        <div className="space-y-6">
            {/* Problem Statement */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6">
                <div className="flex items-start gap-3">
                    <Activity className="w-6 h-6 text-yellow-600 mt-1" />
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Problem Statement</h3>
                        <p className="text-sm text-gray-700 leading-relaxed">
                            <span className="font-semibold">142 asset movements</span> experienced delays exceeding 2 hours in the past 30 days,
                            representing <span className="font-semibold">28% above baseline transit time</span>. These bottlenecks result in equipment
                            unavailability during critical periods, forcing staff to seek alternatives or delay procedures. Estimated impact:
                            <span className="font-semibold"> $1.2M in lost productivity and delayed care</span>.
                        </p>
                    </div>
                </div>
            </div>

            {/* Bottleneck Analysis */}
            <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Transit Bottlenecks by Route</h3>
                <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="text-left text-xs font-semibold text-gray-600 py-3 px-4">Route</th>
                                <th className="text-center text-xs font-semibold text-gray-600 py-3 px-4">Avg Delay (min)</th>
                                <th className="text-center text-xs font-semibold text-gray-600 py-3 px-4">Occurrences</th>
                                <th className="text-center text-xs font-semibold text-gray-600 py-3 px-4">Impact Level</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bottleneckData.map((route, idx) => (
                                <tr key={idx} className="border-t border-gray-100 hover:bg-gray-50">
                                    <td className="text-sm text-gray-900 py-3 px-4 font-medium">{route.route}</td>
                                    <td className="text-sm text-center py-3 px-4">
                                        <span className={`font-semibold ${route.avgDelay > 150 ? 'text-red-600' : 'text-orange-600'}`}>
                                            {route.avgDelay}
                                        </span>
                                    </td>
                                    <td className="text-sm text-center text-gray-900 py-3 px-4">{route.occurrences}</td>
                                    <td className="text-sm text-center py-3 px-4">
                                        <span className={`text-xs font-semibold px-3 py-1 rounded-full ${route.impact === 'Critical' ? 'bg-red-100 text-red-700' :
                                                route.impact === 'High' ? 'bg-orange-100 text-orange-700' :
                                                    'bg-yellow-100 text-yellow-700'
                                            }`}>
                                            {route.impact}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Root Causes */}
            <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Identified Root Causes</h3>
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white rounded-2xl border border-gray-200 p-6">
                        <h4 className="text-sm font-semibold text-gray-900 mb-3">Process Issues</h4>
                        <div className="space-y-2 text-sm text-gray-700">
                            <div className="flex items-start gap-2">
                                <span className="text-yellow-600 font-bold">•</span>
                                <span>No automated alerts for pickup requests (avg 48 min delay)</span>
                            </div>
                            <div className="flex items-start gap-2">
                                <span className="text-yellow-600 font-bold">•</span>
                                <span>Manual log-in/log-out at each checkpoint adds 12-18 min per move</span>
                            </div>
                            <div className="flex items-start gap-2">
                                <span className="text-yellow-600 font-bold">•</span>
                                <span>Sterilization queue management not optimized (FIFO vs priority-based)</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl border border-gray-200 p-6">
                        <h4 className="text-sm font-semibold text-gray-900 mb-3">Resource Constraints</h4>
                        <div className="space-y-2 text-sm text-gray-700">
                            <div className="flex items-start gap-2">
                                <span className="text-yellow-600 font-bold">•</span>
                                <span>Peak hour transport staff shortage (2-4pm: 18 requests, 8 staff)</span>
                            </div>
                            <div className="flex items-start gap-2">
                                <span className="text-yellow-600 font-bold">•</span>
                                <span>Limited sterilization capacity during OR peak times</span>
                            </div>
                            <div className="flex items-start gap-2">
                                <span className="text-yellow-600 font-bold">•</span>
                                <span>Elevator congestion during shift changes adds 8-12 min delay</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Financial Impact */}
            <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Productivity Impact</h3>
                <div className="grid grid-cols-3 gap-4">
                    <div className="bg-yellow-500 rounded-2xl p-6 text-white">
                        <div className="text-sm font-medium mb-2 opacity-90">Current Annual Cost</div>
                        <div className="text-4xl font-bold mb-1">$1.2M</div>
                        <div className="text-xs opacity-75">Lost productivity</div>
                    </div>
                    <div className="bg-emerald-500 rounded-2xl p-6 text-white">
                        <div className="text-sm font-medium mb-2 opacity-90">Potential Savings</div>
                        <div className="text-4xl font-bold mb-1">$840K</div>
                        <div className="text-xs opacity-75">Through optimization</div>
                    </div>
                    <div className="bg-blue-500 rounded-2xl p-6 text-white">
                        <div className="text-sm font-medium mb-2 opacity-90">Time Savings</div>
                        <div className="text-4xl font-bold mb-1">3,200</div>
                        <div className="text-xs opacity-75">Staff hours annually</div>
                    </div>
                </div>
            </div>

            {/* Recommended Actions */}
            <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Optimization Recommendations</h3>
                <div className="space-y-3">
                    {[
                        { priority: 'High', action: 'Implement automated pickup notifications via mobile app for transport staff', impact: 'Reduce avg delay by 48 min', timeline: '4 weeks' },
                        { priority: 'High', action: 'Deploy priority-based sterilization queue management system', impact: 'Save $280K annually', timeline: '6 weeks' },
                        { priority: 'Medium', action: 'Add 4 peak-hour transport staff (2-4pm shift)', impact: 'Eliminate 68% of delays', timeline: '2 weeks' },
                        { priority: 'Medium', action: 'Install automated RFID checkpoints to eliminate manual logging', impact: 'Save 15 min per movement', timeline: '8 weeks' },
                        { priority: 'Low', action: 'Optimize elevator scheduling algorithm to prioritize asset transport', impact: 'Reduce elevator wait by 42%', timeline: '12 weeks' },
                    ].map((rec, idx) => (
                        <div key={idx} className="bg-white rounded-2xl border border-gray-200 p-4 hover:shadow-md transition-shadow">
                            <div className="flex items-start gap-4">
                                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${rec.priority === 'High' ? 'bg-yellow-100 text-yellow-700' :
                                        rec.priority === 'Medium' ? 'bg-orange-100 text-orange-700' :
                                            'bg-blue-100 text-blue-700'
                                    }`}>
                                    {rec.priority} Priority
                                </span>
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-gray-900 mb-2">{rec.action}</p>
                                    <div className="flex items-center gap-4 text-xs text-gray-600">
                                        <span className="flex items-center gap-1">
                                            <Activity className="w-3 h-3" />
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
