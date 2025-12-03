'use client'

import { ChevronDown, AlertCircle, CheckCircle2, AlertTriangle, XCircle, TrendingUp, Clock, DollarSign, Activity, Package, Truck, Thermometer } from 'lucide-react'
import { supplyChainData } from '@/lib/data'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { useState } from 'react'
import { SupplyChainTier3 } from './supply-chain-tier-3'

interface SupplyChainDetailProps {
    isOpen: boolean
    onClose: () => void
}

// Inventory trend data (last 12 weeks) - Local mock for chart
const inventoryTrendData = [
    { week: 'W1', availability: 92, stockouts: 8 },
    { week: 'W2', availability: 94, stockouts: 6 },
    { week: 'W3', availability: 93, stockouts: 7 },
    { week: 'W4', availability: 95, stockouts: 5 },
    { week: 'W5', availability: 96, stockouts: 4 },
    { week: 'W6', availability: 97, stockouts: 3 },
    { week: 'W7', availability: 96, stockouts: 4 },
    { week: 'W8', availability: 97, stockouts: 3 },
    { week: 'W9', availability: 98, stockouts: 2 },
    { week: 'W10', availability: 98, stockouts: 2 },
    { week: 'W11', availability: 98.5, stockouts: 1.5 },
    { week: 'W12', availability: 98.5, stockouts: 1.5 },
]

// Cost trend data - Local mock for chart
const costTrendData = [
    { month: 'Jul', spend: 4.9, budget: 5.5 },
    { month: 'Aug', spend: 5.2, budget: 5.5 },
    { month: 'Sep', spend: 5.1, budget: 5.5 },
    { month: 'Oct', spend: 5.3, budget: 5.5 },
    { month: 'Nov', spend: 5.2, budget: 5.5 },
]

export function SupplyChainDetail({ isOpen, onClose }: SupplyChainDetailProps) {
    const [tier3Category, setTier3Category] = useState<string | null>(null)

    if (!isOpen) return null

    return (
        <>
            <div className="bg-gray-50 border-t border-b border-gray-200 py-8 animate-in slide-in-from-top duration-300">
                <div className="max-w-7xl mx-auto px-8">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <div className="text-sm text-gray-500 mb-1">Dashboard {'>'} Supply Chain</div>
                            <h2 className="text-2xl font-semibold text-gray-900">Supply Chain Management - Detailed Analytics</h2>
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
                            <h3 className="text-sm font-semibold text-emerald-700 uppercase tracking-wider">Inventory Status</h3>
                            <div className="h-px bg-gradient-to-l from-emerald-500 to-transparent flex-1" />
                        </div>

                        <div className="grid grid-cols-3 gap-6">
                            {/* Health Score - Donut Chart */}
                            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                                <h3 className="text-sm font-semibold text-gray-900 mb-6">Supply Chain Health</h3>
                                <div className="flex items-center justify-center mb-6">
                                    <div className="relative w-48 h-48">
                                        <div className="w-full h-full rounded-full" style={{
                                            background: `conic-gradient(
                                                #10b981 0deg ${(supplyChainData.summary.healthScore / 100 * 360)}deg,
                                                #f3f4f6 ${(supplyChainData.summary.healthScore / 100 * 360)}deg 360deg
                                            )`
                                        }}>
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <div className="bg-white rounded-full w-32 h-32 flex flex-col items-center justify-center">
                                                    <div className="text-4xl font-semibold text-gray-900">{supplyChainData.summary.healthScore}%</div>
                                                    <div className="text-sm text-gray-500">Health Score</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-600">Monthly Spend</span>
                                        <span className="text-lg font-semibold text-gray-900">${(supplyChainData.summary.monthlySpend / 1000000).toFixed(1)}M</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-600">Active Vendors</span>
                                        <span className="text-lg font-semibold text-blue-600">{supplyChainData.summary.activeVendors}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Critical Items Status */}
                            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                                <h3 className="text-sm font-semibold text-gray-900 mb-6">Critical Items Status</h3>
                                <div className="space-y-4">
                                    {supplyChainData.highRiskItems.slice(0, 6).map((item) => (
                                        <div key={item.id} className="space-y-1">
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="text-gray-700">{item.name}</span>
                                                <span className="font-semibold text-gray-900">{item.daysUntilExpiry} days</span>
                                            </div>
                                            <div className="w-full bg-gray-100 rounded-full h-2">
                                                <div
                                                    className={`${item.status === 'critical' ? 'bg-red-500' : item.status === 'warning' ? 'bg-orange-500' : 'bg-emerald-500'} h-2 rounded-full transition-all duration-500`}
                                                    style={{ width: `${Math.min((item.daysUntilExpiry / 30) * 100, 100)}%` }}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Alerts Overview */}
                            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                                <h3 className="text-sm font-semibold text-gray-900 mb-6">Supply Chain Alerts</h3>
                                <div className="text-center mb-6">
                                    <div className="text-6xl font-semibold text-gray-900">{supplyChainData.expiringItems.urgent + supplyChainData.vendorIssues.length}</div>
                                </div>
                                <div className="grid grid-cols-3 gap-3 mb-4">
                                    <div className="bg-red-500 rounded-2xl p-4 text-center">
                                        <div className="text-2xl font-semibold text-white">{supplyChainData.expiringItems.urgent}</div>
                                        <div className="text-xs text-white/80 mt-1">Expiring</div>
                                    </div>
                                    <div className="bg-orange-500 rounded-2xl p-4 text-center">
                                        <div className="text-2xl font-semibold text-white">{supplyChainData.vendorIssues.length}</div>
                                        <div className="text-xs text-white/80 mt-1">Vendor Issues</div>
                                    </div>
                                    <div className="bg-blue-400 rounded-2xl p-4 text-center">
                                        <div className="text-2xl font-semibold text-white">{supplyChainData.temperatureAlerts.length}</div>
                                        <div className="text-xs text-white/80 mt-1">Temp Alerts</div>
                                    </div>
                                </div>
                                <div className="bg-yellow-50 rounded-2xl p-4 text-center mb-4 border border-yellow-100">
                                    <div className="text-sm font-medium text-yellow-800">
                                        Wastage Index: {supplyChainData.summary.wastageIndex}% (Target: {supplyChainData.summary.wastageTarget}%)
                                    </div>
                                </div>
                                <div className="space-y-2 text-xs">
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 rounded-full bg-red-500" />
                                        <span className="text-gray-600">Urgent Expiry</span>
                                        <div className="ml-auto w-3 h-3 rounded-full bg-orange-500" />
                                        <span className="text-gray-600">Vendor Issue</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 rounded-full bg-blue-400" />
                                        <span className="text-gray-600">Temp Alert</span>
                                    </div>
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
                                { label: 'Availability', value: `${supplyChainData.summary.criticalAvailability}%`, icon: CheckCircle2, color: 'text-emerald-600' },
                                { label: 'Monthly Spend', value: `$${(supplyChainData.summary.monthlySpend / 1000000).toFixed(1)}M`, icon: DollarSign, color: 'text-blue-600' },
                                { label: 'Wastage Index', value: `${supplyChainData.summary.wastageIndex}%`, icon: TrendingUp, color: 'text-red-600' },
                                { label: 'Active Vendors', value: supplyChainData.summary.activeVendors.toString(), icon: Truck, color: 'text-blue-600' },
                                { label: 'Temp Alerts', value: supplyChainData.temperatureAlerts.length.toString(), icon: Thermometer, color: 'text-orange-600' },
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
                            {/* Availability Trend */}
                            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                                <h3 className="text-sm font-semibold text-gray-900 mb-4">Item Availability Trend (12 Weeks)</h3>
                                <ResponsiveContainer width="100%" height={280}>
                                    <LineChart data={inventoryTrendData}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                                        <XAxis dataKey="week" tick={{ fontSize: 11 }} />
                                        <YAxis tick={{ fontSize: 11 }} domain={[85, 100]} />
                                        <Tooltip />
                                        <Line type="monotone" dataKey="availability" stroke="#10b981" strokeWidth={2} dot={{ r: 4 }} />
                                    </LineChart>
                                </ResponsiveContainer>
                                <div className="text-xs text-gray-500 mt-2 text-center">
                                    Availability consistently above 95% target for the last 6 weeks.
                                </div>
                            </div>

                            {/* Cost Trend */}
                            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                                <h3 className="text-sm font-semibold text-gray-900 mb-4">Monthly Spend vs Budget</h3>
                                <ResponsiveContainer width="100%" height={280}>
                                    <BarChart data={costTrendData}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                                        <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                                        <YAxis tick={{ fontSize: 11 }} tickFormatter={(value) => `$${value}M`} />
                                        <Tooltip />
                                        <Bar dataKey="spend" name="Actual Spend" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                                        <Bar dataKey="budget" name="Budget" fill="#e5e7eb" radius={[4, 4, 0, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                                <div className="flex items-center justify-center gap-4 mt-2 text-xs">
                                    <div className="flex items-center gap-1">
                                        <div className="w-3 h-3 rounded-full bg-blue-500" />
                                        <span className="text-gray-600">Actual</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <div className="w-3 h-3 rounded-full bg-gray-200" />
                                        <span className="text-gray-600">Budget</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Vendor Issues Table */}
                        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                            <h3 className="text-sm font-semibold text-gray-900 mb-4">Recent Vendor Issues</h3>
                            <div className="overflow-hidden">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b border-gray-200">
                                            <th className="text-left text-xs font-semibold text-gray-600 py-3 px-4">Vendor</th>
                                            <th className="text-left text-xs font-semibold text-gray-600 py-3 px-4">Issue</th>
                                            <th className="text-center text-xs font-semibold text-gray-600 py-3 px-4">Severity</th>
                                            <th className="text-left text-xs font-semibold text-gray-600 py-3 px-4">Impact</th>
                                            <th className="text-center text-xs font-semibold text-gray-600 py-3 px-4">Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {supplyChainData.vendorIssues.slice(0, 5).map((issue) => (
                                            <tr key={issue.id} className="border-b border-gray-100 hover:bg-gray-50">
                                                <td className="text-sm text-gray-900 py-3 px-4">{issue.vendor}</td>
                                                <td className="text-sm text-gray-900 py-3 px-4">{issue.issue}</td>
                                                <td className="text-sm text-center py-3 px-4">
                                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${issue.severity === 'high' ? 'bg-red-100 text-red-700' : issue.severity === 'medium' ? 'bg-orange-100 text-orange-700' : 'bg-blue-100 text-blue-700'}`}>
                                                        {issue.severity.toUpperCase()}
                                                    </span>
                                                </td>
                                                <td className="text-sm text-gray-900 py-3 px-4">{issue.impact}</td>
                                                <td className="text-sm text-center text-gray-500 py-3 px-4">{issue.reportedDate}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="text-xs text-gray-500 mt-3">
                                Total active vendor issues: <span className="font-semibold text-gray-900">{supplyChainData.vendorIssues.length}</span>
                            </div>
                        </div>
                    </div>

                    {/* AI Insights */}
                    <div className="mb-8">
                        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-3xl p-8 border border-indigo-100/50 shadow-sm relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-100/30 rounded-full blur-3xl -mr-16 -mt-16" />
                            <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-100/30 rounded-full blur-3xl -ml-16 -mb-16" />

                            <div className="relative flex items-start gap-6">
                                <div className="p-4 bg-white rounded-2xl shadow-sm border border-indigo-100">
                                    <div className="relative">
                                        <div className="absolute inset-0 bg-indigo-400 blur-lg opacity-20" />
                                        <Activity className="w-8 h-8 text-indigo-600 relative z-10" />
                                    </div>
                                </div>
                                <div>
                                    <div className="flex items-center gap-2 mb-3">
                                        <h3 className="text-lg font-bold text-gray-900">AI Supply Chain Optimization</h3>
                                        <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-700 border border-indigo-200">
                                            New Insight
                                        </span>
                                    </div>
                                    <p className="text-gray-600 leading-relaxed text-lg">
                                        Analysis of procurement patterns suggests a <span className="font-semibold text-indigo-700">15% potential cost saving</span> by consolidating vendor orders for 'Surgical Supplies' and 'Lab Reagents'.
                                        Predicted wastage risk is elevated for 'Antibiotics' due to seasonal demand fluctuation.
                                    </p>
                                    <div className="mt-6 flex items-center gap-4">
                                        <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-xl transition-colors shadow-sm shadow-indigo-200">
                                            View Optimization Plan
                                        </button>
                                        <button className="px-4 py-2 bg-white hover:bg-gray-50 text-gray-700 text-sm font-medium rounded-xl border border-gray-200 transition-colors">
                                            Dismiss
                                        </button>
                                    </div>
                                </div>
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
                            {/* Action Card: High Risk Items */}
                            <button
                                onClick={() => setTier3Category('high-risk-items')}
                                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-left hover:shadow-md transition-shadow cursor-pointer group"
                            >
                                <div className="flex items-start justify-between mb-3">
                                    <div className="p-2 bg-red-100 rounded-lg group-hover:bg-red-200 transition-colors">
                                        <AlertTriangle className="w-5 h-5 text-red-600" />
                                    </div>
                                    <span className="text-xs font-semibold text-red-600 bg-red-100 px-2 py-1 rounded-full">Critical</span>
                                </div>
                                <div className="text-3xl font-semibold text-gray-900 mb-1">{supplyChainData.highRiskItems.length}</div>
                                <div className="text-sm font-medium text-gray-700 mb-2">High Risk Items</div>
                                <div className="text-xs text-gray-500">Items below minimum stock levels. Click to view replenishment plan.</div>
                            </button>

                            {/* Action Card: Expiring Items */}
                            <button
                                onClick={() => setTier3Category('expiring-items')}
                                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-left hover:shadow-md transition-shadow cursor-pointer group"
                            >
                                <div className="flex items-start justify-between mb-3">
                                    <div className="p-2 bg-orange-100 rounded-lg group-hover:bg-orange-200 transition-colors">
                                        <Clock className="w-5 h-5 text-orange-600" />
                                    </div>
                                    <span className="text-xs font-semibold text-orange-600 bg-orange-100 px-2 py-1 rounded-full">Urgent</span>
                                </div>
                                <div className="text-3xl font-semibold text-gray-900 mb-1">{supplyChainData.expiringItems.urgent}</div>
                                <div className="text-sm font-medium text-gray-700 mb-2">Expiring Units</div>
                                <div className="text-xs text-gray-500">Items expiring within 7 days. Click for wastage prevention.</div>
                            </button>

                            {/* Action Card: Vendor Issues */}
                            <button
                                onClick={() => setTier3Category('vendor-issues')}
                                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-left hover:shadow-md transition-shadow cursor-pointer group"
                            >
                                <div className="flex items-start justify-between mb-3">
                                    <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                                        <Truck className="w-5 h-5 text-blue-600" />
                                    </div>
                                    <span className="text-xs font-semibold text-blue-600 bg-blue-100 px-2 py-1 rounded-full">Review</span>
                                </div>
                                <div className="text-3xl font-semibold text-gray-900 mb-1">{supplyChainData.vendorIssues.length}</div>
                                <div className="text-sm font-medium text-gray-700 mb-2">Vendor Issues</div>
                                <div className="text-xs text-gray-500">Active vendor performance issues. Click to view report.</div>
                            </button>

                            {/* Action Card: Temp Alerts */}
                            <button
                                onClick={() => setTier3Category('temp-alerts')}
                                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-left hover:shadow-md transition-shadow cursor-pointer group"
                            >
                                <div className="flex items-start justify-between mb-3">
                                    <div className="p-2 bg-yellow-100 rounded-lg group-hover:bg-yellow-200 transition-colors">
                                        <Thermometer className="w-5 h-5 text-yellow-600" />
                                    </div>
                                    <span className="text-xs font-semibold text-yellow-600 bg-yellow-100 px-2 py-1 rounded-full">Action Needed</span>
                                </div>
                                <div className="text-3xl font-semibold text-gray-900 mb-1">{supplyChainData.temperatureAlerts.length}</div>
                                <div className="text-sm font-medium text-gray-700 mb-2">Temp Alerts</div>
                                <div className="text-xs text-gray-500">Cold chain deviations detected. Click for impact analysis.</div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tier 3 Modal */}
            {tier3Category && (
                <SupplyChainTier3
                    category={tier3Category}
                    onClose={() => setTier3Category(null)}
                />
            )}
        </>
    )
}
