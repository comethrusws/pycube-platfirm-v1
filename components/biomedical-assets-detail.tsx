'use client'

import { ChevronDown, AlertCircle, CheckCircle2, AlertTriangle, XCircle, TrendingUp, Clock, DollarSign, Activity } from 'lucide-react'
import { biomedicalAssetsData } from '@/lib/data'
import { getCustomerConfig } from '@/lib/customer-config'
import { AssetStatus, ASSET_STATUS_FLOW } from '@/lib/taxonomies'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { useState } from 'react'
import { BiomedicalAssetsTier3 } from './biomedical-assets-tier-3'

interface BiomedicalAssetsDetailProps {
    isOpen: boolean
    onClose: () => void
    customerId?: string
}

export function BiomedicalAssetsDetail({ isOpen, onClose, customerId }: BiomedicalAssetsDetailProps) {
    const [tier3Category, setTier3Category] = useState<string | null>(null)
    const config = getCustomerConfig(customerId)
    const biomedConfig = config.biomed

    if (!isOpen) return null

    // Mock data for analyze section (still needed for charts until we move charts to config)
    const utilizationData = biomedicalAssetsData.categories.map(cat => ({
        category: cat.category.split(' ')[0],
        utilization: Math.floor(biomedConfig.utilizationRate + (Math.random() * 10 - 5)),
        target: 75
    }))

    const maintenanceTrend = [
        { month: 'Jul', scheduled: 420, completed: 398, overdue: 22 },
        { month: 'Aug', scheduled: 385, completed: 370, overdue: 28 },
        { month: 'Sep', scheduled: 410, completed: 385, overdue: 35 },
        { month: 'Oct', scheduled: 445, completed: 405, overdue: 48 },
        { month: 'Nov', scheduled: 460, completed: 412, overdue: 52 },
        { month: 'Dec', scheduled: 428, completed: 380, overdue: biomedConfig.maintenanceOverdue },
    ]

    const idleAssetsByLocation = [
        { location: 'Main Hospital - West Wing', idle30: 45, idle60: 28, idle90: 12 },
        { location: 'Main Hospital - East Wing', idle30: 38, idle60: 22, idle90: 8 },
        { location: 'Surgical Center', idle30: 32, idle60: 18, idle90: 5 },
        { location: 'Emergency Department', idle30: 15, idle60: 8, idle90: 2 },
        { location: 'ICU', idle30: 8, idle60: 3, idle90: 1 },
    ]

    return (
        <>
            <div className="bg-gray-50 border-t border-b border-gray-200 py-8 animate-in slide-in-from-top duration-300">
                <div className="max-w-7xl mx-auto px-8">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <div className="text-sm text-gray-500 mb-1">Dashboard {'>'} Biomedical Assets</div>
                            <h2 className="text-2xl font-semibold text-gray-900">Biomedical Assets - Detailed Analytics</h2>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                        >
                            <ChevronDown className="w-5 h-5 text-gray-600" />
                        </button>
                    </div>

                    {/* TIER 1: DIGITIZE - Status Overview */}
                    <div className="mb-8">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="h-px bg-gradient-to-r from-transparent to-emerald-500 flex-1" />
                            <h3 className="text-sm font-semibold text-emerald-700 uppercase tracking-wider">Asset Lifecycle Status</h3>
                            <div className="h-px bg-gradient-to-l from-emerald-500 to-transparent flex-1" />
                        </div>

                        <div className="grid grid-cols-3 gap-6">
                            {/* Today's Overview - Donut Chart */}
                            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                                <h3 className="text-sm font-semibold text-gray-900 mb-6">Asset Coverage</h3>
                                <div className="flex items-center justify-center mb-6">
                                    <div className="relative w-48 h-48">
                                        <div className="w-full h-full rounded-full" style={{
                                            background: `conic-gradient(
                                                #10b981 0deg ${(biomedConfig.digitizedAssets / biomedConfig.totalAssets * 360)}deg,
                                                #f59e0b ${(biomedConfig.digitizedAssets / biomedConfig.totalAssets * 360)}deg 360deg
                                            )`
                                        }}>
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <div className="bg-white rounded-full w-32 h-32 flex flex-col items-center justify-center">
                                                    <div className="text-4xl font-semibold text-gray-900">{biomedConfig.totalAssets.toLocaleString()}</div>
                                                    <div className="text-sm text-gray-500">total assets</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-600">Assets Digitized</span>
                                        <span className="text-lg font-semibold text-gray-900">{biomedConfig.digitizedAssets.toLocaleString()}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-600">Pending Digitization</span>
                                        <span className="text-lg font-semibold text-gray-900">{(biomedConfig.totalAssets - biomedConfig.digitizedAssets).toLocaleString()}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Lifecycle Status Flow */}
                            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 col-span-2">
                                <h3 className="text-sm font-semibold text-gray-900 mb-6">Current Lifecycle Distribution</h3>
                                <div className="space-y-6">
                                    {ASSET_STATUS_FLOW.map((status, idx) => {
                                        const count = biomedConfig.statusBreakdown[status] || 0
                                        const percentage = (count / biomedConfig.digitizedAssets) * 100

                                        // Color logic based on status
                                        let colorClass = 'bg-blue-500'
                                        if (status === AssetStatus.CLEAN) colorClass = 'bg-emerald-500'
                                        if (status === AssetStatus.IN_USE) colorClass = 'bg-blue-500'
                                        if (status === AssetStatus.SOILED) colorClass = 'bg-yellow-500'
                                        if (status === AssetStatus.NEEDS_REPAIR) colorClass = 'bg-red-500'
                                        if (status === AssetStatus.REPAIRED) colorClass = 'bg-purple-500'
                                        if (status === AssetStatus.SANITIZED) colorClass = 'bg-teal-500'

                                        return (
                                            <div key={status} className="relative">
                                                <div className="flex items-center justify-between text-sm mb-2">
                                                    <div className="flex items-center gap-2">
                                                        <div className={`w-2 h-2 rounded-full ${colorClass}`} />
                                                        <span className="font-medium text-gray-700">{status}</span>
                                                    </div>
                                                    <div className="flex items-center gap-4">
                                                        <span className="text-gray-500 text-xs">{percentage.toFixed(1)}%</span>
                                                        <span className="font-semibold text-gray-900">{count.toLocaleString()}</span>
                                                    </div>
                                                </div>
                                                <div className="w-full bg-gray-100 rounded-full h-2">
                                                    <div
                                                        className={`h-2 rounded-full transition-all duration-500 ${colorClass}`}
                                                        style={{ width: `${percentage}%` }}
                                                    />
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Performance Insights */}
                    <div className="mb-8">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="h-px bg-gradient-to-r from-transparent to-emerald-500 flex-1" />
                            <h3 className="text-sm font-semibold text-emerald-700 uppercase tracking-wider">Performance Insights</h3>
                            <div className="h-px bg-gradient-to-l from-emerald-500 to-transparent flex-1" />
                        </div>


                        {/* KPI Summary Cards */}
                        <div className="grid grid-cols-5 gap-4 mb-6">
                            {[
                                { label: 'Utilization Rate', value: `${biomedConfig.utilizationRate}%`, icon: Activity, color: 'text-blue-600' },
                                { label: 'Assets Clean', value: biomedConfig.statusBreakdown[AssetStatus.CLEAN].toLocaleString(), icon: CheckCircle2, color: 'text-emerald-600' },
                                { label: 'Needs Repair', value: biomedConfig.statusBreakdown[AssetStatus.NEEDS_REPAIR].toLocaleString(), icon: AlertCircle, color: 'text-red-600' },
                                { label: 'Lost Assets', value: biomedConfig.lostAssets.toLocaleString(), icon: AlertTriangle, color: 'text-red-600' },
                                { label: 'Maint. Overdue', value: biomedConfig.maintenanceOverdue.toLocaleString(), icon: Clock, color: 'text-orange-600' },
                            ].map((metric) => (
                                <div key={metric.label} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                                    <div className="flex items-start justify-between mb-2">
                                        <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            {metric.label}
                                        </span>
                                        {metric.icon && (
                                            <metric.icon className={`w-4 h-4 ${metric.color || 'text-gray-400'}`} />
                                        )}
                                    </div>
                                    <div className="text-3xl font-semibold text-gray-900">{metric.value}</div>
                                </div>
                            ))}
                        </div>

                        {/* Analysis Charts */}
                        <div className="grid grid-cols-2 gap-6 mb-6">
                            {/* Asset Utilization by Category */}
                            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                                <h3 className="text-sm font-semibold text-gray-900 mb-4">Asset Utilization by Category</h3>
                                <ResponsiveContainer width="100%" height={280}>
                                    <BarChart data={utilizationData}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                                        <XAxis dataKey="category" tick={{ fontSize: 11 }} />
                                        <YAxis tick={{ fontSize: 11 }} />
                                        <Tooltip />
                                        <Bar dataKey="utilization" radius={[8, 8, 0, 0]}>
                                            {utilizationData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.utilization >= 70 ? '#10b981' : entry.utilization >= 50 ? '#f59e0b' : '#ef4444'} />
                                            ))}
                                        </Bar>
                                        <Bar dataKey="target" fill="#e5e7eb" radius={[8, 8, 0, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                                <div className="text-xs text-gray-500 mt-2 text-center">
                                    Target: 75% utilization | Current average: {biomedConfig.utilizationRate}%
                                </div>
                            </div>

                            {/* Maintenance Status Trend */}
                            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                                <h3 className="text-sm font-semibold text-gray-900 mb-4">Maintenance Status Trend (6 Months)</h3>
                                <ResponsiveContainer width="100%" height={280}>
                                    <LineChart data={maintenanceTrend}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                                        <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                                        <YAxis tick={{ fontSize: 11 }} />
                                        <Tooltip />
                                        <Line type="monotone" dataKey="scheduled" stroke="#3b82f6" strokeWidth={2} dot={{ r: 4 }} />
                                        <Line type="monotone" dataKey="completed" stroke="#10b981" strokeWidth={2} dot={{ r: 4 }} />
                                        <Line type="monotone" dataKey="overdue" stroke="#ef4444" strokeWidth={2} dot={{ r: 4 }} />
                                    </LineChart>
                                </ResponsiveContainer>
                                <div className="flex items-center justify-center gap-4 mt-2 text-xs">
                                    <div className="flex items-center gap-1">
                                        <div className="w-3 h-3 rounded-full bg-blue-500" />
                                        <span className="text-gray-600">Scheduled</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <div className="w-3 h-3 rounded-full bg-emerald-500" />
                                        <span className="text-gray-600">Completed</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <div className="w-3 h-3 rounded-full bg-red-500" />
                                        <span className="text-gray-600">Overdue</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Idle Assets by Location Table */}
                        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                            <h3 className="text-sm font-semibold text-gray-900 mb-4">Idle Assets by Location</h3>
                            <div className="overflow-hidden">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b border-gray-200">
                                            <th className="text-left text-xs font-semibold text-gray-600 py-3 px-4">Location</th>
                                            <th className="text-center text-xs font-semibold text-gray-600 py-3 px-4">Idle &gt;30 Days</th>
                                            <th className="text-center text-xs font-semibold text-gray-600 py-3 px-4">Idle &gt;60 Days</th>
                                            <th className="text-center text-xs font-semibold text-gray-600 py-3 px-4">Idle &gt;90 Days</th>
                                            <th className="text-center text-xs font-semibold text-gray-600 py-3 px-4">Total Idle</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {idleAssetsByLocation.map((loc) => (
                                            <tr key={loc.location} className="border-b border-gray-100 hover:bg-gray-50">
                                                <td className="text-sm text-gray-900 py-3 px-4">{loc.location}</td>
                                                <td className="text-sm text-center text-gray-900 py-3 px-4">{loc.idle30}</td>
                                                <td className="text-sm text-center text-orange-600 font-semibold py-3 px-4">{loc.idle60}</td>
                                                <td className="text-sm text-center text-red-600 font-semibold py-3 px-4">{loc.idle90}</td>
                                                <td className="text-sm text-center text-gray-900 font-semibold py-3 px-4">{loc.idle30 + loc.idle60 + loc.idle90}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="text-xs text-gray-500 mt-3">
                                Total idle assets across all locations: <span className="font-semibold text-gray-900">251 assets</span> (0.56% of total inventory)
                            </div>
                        </div>
                    </div>

                    {/* TIER 3: OPTIMIZE - Recommended Actions */}
                    <div>
                        <div className="flex items-center gap-4 mb-6">
                            <div className="h-px bg-gradient-to-r from-transparent to-emerald-500 flex-1" />
                            <h3 className="text-sm font-semibold text-emerald-700 uppercase tracking-wider">Recommended Actions</h3>
                            <div className="h-px bg-gradient-to-l from-emerald-500 to-transparent flex-1" />
                        </div>

                        <div className="grid grid-cols-4 gap-4">
                            {/* Action Card: Underutilized Assets */}
                            <button
                                onClick={() => setTier3Category('asset-utilization')}
                                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-left hover:shadow-md transition-shadow cursor-pointer group"
                            >
                                <div className="flex items-start justify-between mb-3">
                                    <div className="p-2 bg-orange-100 rounded-lg group-hover:bg-orange-200 transition-colors">
                                        <TrendingUp className="w-5 h-5 text-orange-600" />
                                    </div>
                                    <span className="text-xs font-semibold text-orange-600 bg-orange-100 px-2 py-1 rounded-full">Action Needed</span>
                                </div>
                                <div className="text-3xl font-semibold text-gray-900 mb-1">1,694</div>
                                <div className="text-sm font-medium text-gray-700 mb-2">Underutilized Assets</div>
                                <div className="text-xs text-gray-500">Assets with &lt;50% utilization. Click to view redeployment recommendations.</div>
                            </button>

                            {/* Action Card: Maintenance Backlog */}
                            <button
                                onClick={() => setTier3Category('maintenance-backlog')}
                                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-left hover:shadow-md transition-shadow cursor-pointer group"
                            >
                                <div className="flex items-start justify-between mb-3">
                                    <div className="p-2 bg-red-100 rounded-lg group-hover:bg-red-200 transition-colors">
                                        <Clock className="w-5 h-5 text-red-600" />
                                    </div>
                                    <span className="text-xs font-semibold text-red-600 bg-red-100 px-2 py-1 rounded-full">Critical</span>
                                </div>
                                <div className="text-3xl font-semibold text-gray-900 mb-1">{biomedConfig.maintenanceOverdue}</div>
                                <div className="text-sm font-medium text-gray-700 mb-2">Overdue Maintenance</div>
                                <div className="text-xs text-gray-500">Assets requiring immediate maintenance. Click to view impact analysis.</div>
                            </button>

                            {/* Action Card: High-Value Tracking */}
                            <button
                                onClick={() => setTier3Category('high-value-tracking')}
                                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-left hover:shadow-md transition-shadow cursor-pointer group"
                            >
                                <div className="flex items-start justify-between mb-3">
                                    <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                                        <DollarSign className="w-5 h-5 text-blue-600" />
                                    </div>
                                    <span className="text-xs font-semibold text-blue-600 bg-blue-100 px-2 py-1 rounded-full">Monitor</span>
                                </div>
                                <div className="text-3xl font-semibold text-gray-900 mb-1">8,400</div>
                                <div className="text-sm font-medium text-gray-700 mb-2">High-Value Assets</div>
                                <div className="text-xs text-gray-500">Critical equipment requiring enhanced monitoring. Click for details.</div>
                            </button>

                            {/* Action Card: Workflow Bottlenecks */}
                            <button
                                onClick={() => setTier3Category('workflow-bottlenecks')}
                                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-left hover:shadow-md transition-shadow cursor-pointer group"
                            >
                                <div className="flex items-start justify-between mb-3">
                                    <div className="p-2 bg-yellow-100 rounded-lg group-hover:bg-yellow-200 transition-colors">
                                        <Activity className="w-5 h-5 text-yellow-600" />
                                    </div>
                                    <span className="text-xs font-semibold text-yellow-600 bg-yellow-100 px-2 py-1 rounded-full">Optimize</span>
                                </div>
                                <div className="text-3xl font-semibold text-gray-900 mb-1">142</div>
                                <div className="text-sm font-medium text-gray-700 mb-2">Movement Delays</div>
                                <div className="text-xs text-gray-500">{biomedConfig.narrative.bottleneck}</div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tier 3 Modal */}
            <BiomedicalAssetsTier3
                category={tier3Category}
                onClose={() => setTier3Category(null)}
            />
        </>
    )
}
