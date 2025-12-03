'use client'

import { ChevronDown, AlertCircle, CheckCircle2, AlertTriangle, XCircle, TrendingUp, Clock, DollarSign, Activity, Radio, Zap, Wifi, Battery, MapPin, Network, Server, Signal } from 'lucide-react'
import { infraHealthData } from '@/lib/data'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, PieChart, Pie, Legend } from 'recharts'
import { useState } from 'react'
import { InfraHealthTier3 } from './infra-health-tier-3'

interface InfraHealthDetailProps {
    isOpen: boolean
    onClose: () => void
}

// Gateway uptime trend (7 days) - Local mock for chart
const gatewayUptimeTrend = [
    { day: 'Mon', uptime: 95.2 },
    { day: 'Tue', uptime: 96.1 },
    { day: 'Wed', uptime: 95.8 },
    { day: 'Thu', uptime: 96.4 },
    { day: 'Fri', uptime: 96.2 },
    { day: 'Sat', uptime: 96.0 },
    { day: 'Sun', uptime: 96.3 },
]

// Tag health distribution - Local mock for chart
const tagHealthData = [
    { name: 'Healthy (>80%)', value: 98, color: '#10b981' },
    { name: 'Warning (50-80%)', value: 1.5, color: '#f59e0b' },
    { name: 'Critical (<50%)', value: 0.5, color: '#ef4444' },
]

export function InfraHealthDetail({ isOpen, onClose }: InfraHealthDetailProps) {
    const [tier3Category, setTier3Category] = useState<string | null>(null)

    if (!isOpen) return null

    return (
        <>
            <div className="bg-gray-50 border-t border-b border-gray-200 py-8 animate-in slide-in-from-top duration-300">
                <div className="max-w-7xl mx-auto px-8">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <div className="text-sm text-gray-500 mb-1">Dashboard {'>'} Infrastructure Health</div>
                            <h2 className="text-2xl font-semibold text-gray-900">IoT & Asset Tracking Infrastructure</h2>
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
                            <h3 className="text-sm font-semibold text-emerald-700 uppercase tracking-wider">System Status</h3>
                            <div className="h-px bg-gradient-to-l from-emerald-500 to-transparent flex-1" />
                        </div>

                        <div className="grid grid-cols-3 gap-6">
                            {/* Health Score - Donut Chart */}
                            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                                <h3 className="text-sm font-semibold text-gray-900 mb-6">Infrastructure Health</h3>
                                <div className="flex items-center justify-center mb-6">
                                    <div className="relative w-48 h-48">
                                        <div className="w-full h-full rounded-full" style={{
                                            background: `conic-gradient(
                                                #10b981 0deg ${(infraHealthData.summary.gatewayUptime / 100 * 360)}deg,
                                                #f3f4f6 ${(infraHealthData.summary.gatewayUptime / 100 * 360)}deg 360deg
                                            )`
                                        }}>
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <div className="bg-white rounded-full w-32 h-32 flex flex-col items-center justify-center">
                                                    <div className="text-4xl font-semibold text-gray-900">{infraHealthData.summary.gatewayUptime}%</div>
                                                    <div className="text-sm text-gray-500">Uptime</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-600">Gateways Online</span>
                                        <span className="text-lg font-semibold text-gray-900">{infraHealthData.summary.gatewaysOnline}/{infraHealthData.summary.gatewaysTotal}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-600">Active Tags</span>
                                        <span className="text-lg font-semibold text-blue-600">{infraHealthData.summary.tagsActive.toLocaleString()}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Zone Coverage Status */}
                            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                                <h3 className="text-sm font-semibold text-gray-900 mb-6">Zone Coverage Status</h3>
                                <div className="space-y-4">
                                    {infraHealthData.zoneCoverage.slice(0, 6).map((zone) => (
                                        <div key={zone.zone} className="space-y-1">
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="text-gray-700">{zone.zone}</span>
                                                <span className="font-semibold text-gray-900">{zone.coverage}%</span>
                                            </div>
                                            <div className="w-full bg-gray-100 rounded-full h-2">
                                                <div
                                                    className={`${zone.coverage >= 95 ? 'bg-emerald-500' : zone.coverage >= 85 ? 'bg-orange-500' : 'bg-red-500'} h-2 rounded-full transition-all duration-500`}
                                                    style={{ width: `${zone.coverage}%` }}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Infrastructure Alerts */}
                            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                                <h3 className="text-sm font-semibold text-gray-900 mb-6">Infrastructure Alerts</h3>
                                <div className="text-center mb-6">
                                    <div className="text-6xl font-semibold text-gray-900">{infraHealthData.tagBatteries.critical + (infraHealthData.summary.gatewaysTotal - infraHealthData.summary.gatewaysOnline)}</div>
                                </div>
                                <div className="grid grid-cols-3 gap-3 mb-4">
                                    <div className="bg-red-500 rounded-2xl p-4 text-center">
                                        <div className="text-2xl font-semibold text-white">{infraHealthData.tagBatteries.critical}</div>
                                        <div className="text-xs text-white/80 mt-1">Crit Battery</div>
                                    </div>
                                    <div className="bg-orange-500 rounded-2xl p-4 text-center">
                                        <div className="text-2xl font-semibold text-white">{infraHealthData.summary.gatewaysTotal - infraHealthData.summary.gatewaysOnline}</div>
                                        <div className="text-xs text-white/80 mt-1">Offline GW</div>
                                    </div>
                                    <div className="bg-blue-400 rounded-2xl p-4 text-center">
                                        <div className="text-2xl font-semibold text-white">{infraHealthData.readSuccess.missedReads > 1000 ? '1.2k' : infraHealthData.readSuccess.missedReads}</div>
                                        <div className="text-xs text-white/80 mt-1">Missed Reads</div>
                                    </div>
                                </div>
                                <div className="bg-yellow-50 rounded-2xl p-4 text-center mb-4 border border-yellow-100">
                                    <div className="text-sm font-medium text-yellow-800">
                                        Network Coverage: {infraHealthData.summary.networkCoverage}% (Target: 98%)
                                    </div>
                                </div>
                                <div className="space-y-2 text-xs">
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 rounded-full bg-red-500" />
                                        <span className="text-gray-600">Critical Battery</span>
                                        <div className="ml-auto w-3 h-3 rounded-full bg-orange-500" />
                                        <span className="text-gray-600">Offline Gateway</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 rounded-full bg-blue-400" />
                                        <span className="text-gray-600">Read Error</span>
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
                                { label: 'Gateway Uptime', value: `${infraHealthData.summary.gatewayUptime}%`, icon: Radio, color: 'text-emerald-600' },
                                { label: 'Tag Health', value: `${infraHealthData.summary.rfidTagHealth}%`, icon: Zap, color: 'text-emerald-600' },
                                { label: 'Network Coverage', value: `${infraHealthData.summary.networkCoverage}%`, icon: Wifi, color: 'text-blue-600' },
                                { label: 'Real-time Visibility', value: `${infraHealthData.summary.realTimeVisibility}%`, icon: MapPin, color: 'text-blue-600' },
                                { label: 'Read Success', value: `${infraHealthData.readSuccess.overallRate}%`, icon: Signal, color: 'text-emerald-600' },
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
                        <div className="grid grid-cols-3 gap-6 mb-6">
                            {/* Gateway Uptime Trend */}
                            <div className="col-span-2 bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                                <h3 className="text-sm font-semibold text-gray-900 mb-4">Gateway Uptime Trend (7 Days)</h3>
                                <ResponsiveContainer width="100%" height={250}>
                                    <LineChart data={gatewayUptimeTrend}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                                        <XAxis dataKey="day" tick={{ fontSize: 11 }} />
                                        <YAxis tick={{ fontSize: 11 }} domain={[94, 100]} tickFormatter={(value) => `${value}%`} />
                                        <Tooltip formatter={(value: number) => `${value}%`} />
                                        <Line type="monotone" dataKey="uptime" stroke="#10b981" strokeWidth={3} dot={{ fill: '#10b981', r: 4 }} />
                                    </LineChart>
                                </ResponsiveContainer>
                                <div className="text-xs text-gray-500 mt-2 text-center">
                                    Consistent uptime {'>'}`95% ensures reliable asset tracking.
                                </div>
                            </div>

                            {/* Tag Health Distribution */}
                            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                                <h3 className="text-sm font-semibold text-gray-900 mb-4">Tag Battery Status</h3>
                                <ResponsiveContainer width="100%" height={250}>
                                    <PieChart>
                                        <Pie
                                            data={tagHealthData}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={60}
                                            outerRadius={80}
                                            paddingAngle={5}
                                            dataKey="value"
                                        >
                                            {tagHealthData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} strokeWidth={0} />
                                            ))}
                                        </Pie>
                                        <Tooltip formatter={(value: number) => `${value}%`} />
                                        <Legend
                                            verticalAlign="bottom"
                                            height={36}
                                            iconType="circle"
                                            formatter={(value) => <span className="text-xs text-gray-600">{value}</span>}
                                        />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* Gateway Performance Table */}
                        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                            <h3 className="text-sm font-semibold text-gray-900 mb-4">Gateway Performance by Zone</h3>
                            <div className="overflow-hidden">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b border-gray-200">
                                            <th className="text-left text-xs font-semibold text-gray-600 py-3 px-4">Zone</th>
                                            <th className="text-center text-xs font-semibold text-gray-600 py-3 px-4">Gateways</th>
                                            <th className="text-center text-xs font-semibold text-gray-600 py-3 px-4">Coverage</th>
                                            <th className="text-left text-xs font-semibold text-gray-600 py-3 px-4">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {infraHealthData.zoneCoverage.map((zone) => (
                                            <tr key={zone.zone} className="border-b border-gray-100 hover:bg-gray-50">
                                                <td className="text-sm text-gray-900 py-3 px-4">{zone.zone}</td>
                                                <td className="text-sm text-center text-gray-900 py-3 px-4">{zone.gateways}</td>
                                                <td className="text-sm text-center font-semibold py-3 px-4" style={{ color: zone.coverage >= 95 ? '#10b981' : zone.coverage >= 85 ? '#f59e0b' : '#ef4444' }}>{zone.coverage}%</td>
                                                <td className="text-sm text-gray-500 py-3 px-4">{zone.reason}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
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
                                        <Zap className="w-8 h-8 text-indigo-600 relative z-10" />
                                    </div>
                                </div>
                                <div>
                                    <div className="flex items-center gap-2 mb-3">
                                        <h3 className="text-lg font-bold text-gray-900">AI Anomaly Detection</h3>
                                        <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-700 border border-indigo-200">
                                            New Insight
                                        </span>
                                    </div>
                                    <p className="text-gray-600 leading-relaxed text-lg">
                                        AI identified a pattern of <span className="font-semibold text-indigo-700">intermittent connectivity</span> in 'Emergency Dept' gateways correlating with high MRI usage periods.
                                        Recommendation: Investigate electromagnetic interference shielding for Gateway GW-ED-01.
                                    </p>
                                    <div className="mt-6 flex items-center gap-4">
                                        <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-xl transition-colors shadow-sm shadow-indigo-200">
                                            View Technical Report
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

                        <div className="grid grid-cols-5 gap-4">
                            {/* Action Card: Tag Battery Management */}
                            <button
                                onClick={() => setTier3Category('tag-batteries')}
                                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-left hover:shadow-md transition-shadow cursor-pointer group"
                            >
                                <div className="flex items-start justify-between mb-3">
                                    <div className="p-2 bg-orange-100 rounded-lg group-hover:bg-orange-200 transition-colors">
                                        <Battery className="w-5 h-5 text-orange-600" />
                                    </div>
                                    <span className="text-xs font-semibold text-orange-600 bg-orange-100 px-2 py-1 rounded-full">Action Needed</span>
                                </div>
                                <div className="text-3xl font-semibold text-gray-900 mb-1">{infraHealthData.tagBatteries.low + infraHealthData.tagBatteries.critical}</div>
                                <div className="text-sm font-medium text-gray-700 mb-2">Low Battery Tags</div>
                                <div className="text-xs text-gray-500">RFID tags requiring replacement. Click to view list.</div>
                            </button>

                            {/* Action Card: Read Rate Optimization */}
                            <button
                                onClick={() => setTier3Category('read-rate')}
                                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-left hover:shadow-md transition-shadow cursor-pointer group"
                            >
                                <div className="flex items-start justify-between mb-3">
                                    <div className="p-2 bg-emerald-100 rounded-lg group-hover:bg-emerald-200 transition-colors">
                                        <Signal className="w-5 h-5 text-emerald-600" />
                                    </div>
                                    <span className="text-xs font-semibold text-emerald-600 bg-emerald-100 px-2 py-1 rounded-full">Healthy</span>
                                </div>
                                <div className="text-3xl font-semibold text-gray-900 mb-1">{infraHealthData.readSuccess.overallRate}%</div>
                                <div className="text-sm font-medium text-gray-700 mb-2">Read Success Rate</div>
                                <div className="text-xs text-gray-500">Gateway performance optimization. Click for details.</div>
                            </button>

                            {/* Action Card: Latency Monitoring */}
                            <button
                                onClick={() => setTier3Category('data-latency')}
                                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-left hover:shadow-md transition-shadow cursor-pointer group"
                            >
                                <div className="flex items-start justify-between mb-3">
                                    <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                                        <Clock className="w-5 h-5 text-blue-600" />
                                    </div>
                                    <span className="text-xs font-semibold text-blue-600 bg-blue-100 px-2 py-1 rounded-full">Monitor</span>
                                </div>
                                <div className="text-3xl font-semibold text-gray-900 mb-1">{infraHealthData.syncLatency.current}s</div>
                                <div className="text-sm font-medium text-gray-700 mb-2">Data Sync Latency</div>
                                <div className="text-xs text-gray-500">Real-time data processing performance. Click to analyze.</div>
                            </button>

                            {/* Action Card: Network Infrastructure */}
                            <button
                                onClick={() => setTier3Category('network-infra')}
                                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-left hover:shadow-md transition-shadow cursor-pointer group"
                            >
                                <div className="flex items-start justify-between mb-3">
                                    <div className="p-2 bg-purple-100 rounded-lg group-hover:bg-purple-200 transition-colors">
                                        <Network className="w-5 h-5 text-purple-600" />
                                    </div>
                                    <span className="text-xs font-semibold text-purple-600 bg-purple-100 px-2 py-1 rounded-full">Excellent</span>
                                </div>
                                <div className="text-3xl font-semibold text-gray-900 mb-1">{infraHealthData.network.uptime}%</div>
                                <div className="text-sm font-medium text-gray-700 mb-2">Network Uptime</div>
                                <div className="text-xs text-gray-500">Core infrastructure health. Click for status.</div>
                            </button>

                            {/* Action Card: Server Performance */}
                            <button
                                onClick={() => setTier3Category('server-health')}
                                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-left hover:shadow-md transition-shadow cursor-pointer group"
                            >
                                <div className="flex items-start justify-between mb-3">
                                    <div className="p-2 bg-indigo-100 rounded-lg group-hover:bg-indigo-200 transition-colors">
                                        <Server className="w-5 h-5 text-indigo-600" />
                                    </div>
                                    <span className="text-xs font-semibold text-indigo-600 bg-indigo-100 px-2 py-1 rounded-full">Optimal</span>
                                </div>
                                <div className="text-3xl font-semibold text-gray-900 mb-1">100%</div>
                                <div className="text-sm font-medium text-gray-700 mb-2">Server Health</div>
                                <div className="text-xs text-gray-500">Backend server metrics. Click to view.</div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tier 3 Modal */}
            {tier3Category && (
                <InfraHealthTier3
                    category={tier3Category}
                    onClose={() => setTier3Category(null)}
                />
            )}
        </>
    )
}
