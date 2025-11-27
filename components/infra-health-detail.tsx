'use client'

import { useState } from 'react'
import { ChevronDown, Radio, Zap, Wifi, Battery, MapPin, TrendingUp, AlertTriangle, HardDrive, Server, Network, Signal, Package } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend, BarChart, Bar } from 'recharts'
import { InfraHealthTier3 } from './infra-health-tier-3'

interface InfraHealthDetailProps {
    isOpen: boolean
    onClose: () => void
}

// Gateway uptime trend (7 days)
const gatewayUptimeTrend = [
    { day: 'Mon', uptime: 95.2 },
    { day: 'Tue', uptime: 96.1 },
    { day: 'Wed', uptime: 95.8 },
    { day: 'Thu', uptime: 96.4 },
    { day: 'Fri', uptime: 96.2 },
    { day: 'Sat', uptime: 96.0 },
    { day: 'Sun', uptime: 96.3 },
]

// Tag health distribution
const tagHealthData = [
    { name: 'Healthy (>80% battery)', value: 98, color: '#10b981' },
    { name: 'Warning (50-80%)', value: 1.5, color: '#f59e0b' },
    { name: 'Critical (<50%)', value: 0.5, color: '#ef4444' },
]

// Gateway performance by location
const gatewayPerformance = [
    { location: 'Main Hospital - Floor 1', gateways: 12, active: 12, coverage: 98, readRate: 99.2 },
    { location: 'Main Hospital - Floor 2', gateways: 14, active: 13, coverage: 93, readRate: 97.8 },
    { location: 'Main Hospital - Floor 3', gateways: 10, active: 10, coverage: 99, readRate: 99.5 },
    { location: 'OR Wing', gateways: 8, active: 8, coverage: 100, readRate: 99.8 },
    { location: 'Lab Building', gateways: 6, active: 6, coverage: 97, readRate: 98.9 },
    { location: 'Emergency Dept', gateways: 5, active: 4, coverage: 80, readRate: 95.2 },
]

// Asset tracking metrics trend
const trackingMetricsTrend = [
    { hour: '00:00', visibility: 98.2, latency: 1.2 },
    { hour: '04:00', visibility: 98.4, latency: 1.1 },
    { hour: '08:00', visibility: 97.8, latency: 1.5 },
    { hour: '12:00', visibility: 97.5, latency: 1.8 },
    { hour: '16:00', visibility: 97.9, latency: 1.6 },
    { hour: '20:00', visibility: 98.3, latency: 1.3 },
]

export function InfraHealthDetail({ isOpen, onClose }: InfraHealthDetailProps) {
    const [activeTier3Category, setActiveTier3Category] = useState<string | null>(null)

    if (!isOpen) return null

    // Calculate summary stats
    const totalGateways = gatewayPerformance.reduce((sum, loc) => sum + loc.gateways, 0)
    const activeGateways = gatewayPerformance.reduce((sum, loc) => sum + loc.active, 0)
    const avgCoverage = gatewayPerformance.reduce((sum, loc) => sum + loc.coverage, 0) / gatewayPerformance.length
    const avgReadRate = gatewayPerformance.reduce((sum, loc) => sum + loc.readRate, 0) / gatewayPerformance.length

    return (
        <>
            <div className="bg-gray-50 border-t border-b border-gray-200 py-8 animate-in slide-in-from-top duration-300 font-sans">
                <div className="max-w-7xl mx-auto px-6">
                    {/* Breadcrumbs & Header */}
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <div className="text-sm text-gray-500 mb-1">Dashboard {'>'} Infrastructure Health</div>
                            <h2 className="text-2xl font-semibold text-gray-900">IoT & Asset Tracking Infrastructure</h2>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-gray-200 rounded-full transition-colors"
                        >
                            <ChevronDown className="w-6 h-6 text-gray-600" />
                        </button>
                    </div>

                    {/* Top Row: Key Metrics */}
                    <div className="grid grid-cols-5 gap-6 mb-8">
                        {/* Gateway Status */}
                        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-sm font-semibold text-gray-900">Gateway Status</h3>
                                <Radio className="w-5 h-5 text-emerald-500" />
                            </div>
                            <div className="flex items-baseline gap-2 mb-2">
                                <span className="text-5xl font-semibold text-gray-900">96%</span>
                                <span className="text-md text-gray-400">Uptime</span>
                            </div>
                            <p className="text-xs text-gray-500 mt-2">{activeGateways}/{totalGateways} gateways online</p>
                        </div>

                        {/* RFID Tag Health */}
                        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-sm font-semibold text-gray-900">RFID Tag Health</h3>
                                <Zap className="w-5 h-5 text-emerald-500" />
                            </div>
                            <div className="flex items-baseline gap-2 mb-2">
                                <span className="text-5xl font-semibold text-gray-900">98%</span>
                                <span className="text-md text-gray-400">Healthy</span>
                            </div>
                            <p className="text-xs text-gray-500 mt-2">4,905/5,005 tags active</p>
                        </div>

                        {/* Tagging Coverage */}
                        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-sm font-semibold text-gray-900">Tagging Coverage</h3>
                                <Package className="w-5 h-5 text-orange-500" />
                            </div>
                            <div className="flex items-baseline gap-2 mb-2">
                                <span className="text-5xl font-semibold text-gray-900">74.3%</span>
                            </div>
                            <p className="text-xs text-gray-500 mt-2">5,005/6,734 assets tagged</p>
                        </div>

                        {/* Asset Visibility */}
                        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-sm font-semibold text-gray-900">Real-time Visibility</h3>
                                <MapPin className="w-5 h-5 text-blue-500" />
                            </div>
                            <div className="flex items-baseline gap-2 mb-2">
                                <span className="text-5xl font-semibold text-gray-900">98.5%</span>
                            </div>
                            <p className="text-xs text-gray-500 mt-2">4,930/5,005 tagged assets</p>
                        </div>

                        {/* Network Coverage */}
                        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-sm font-semibold text-gray-900">Network Coverage</h3>
                                <Wifi className="w-5 h-5 text-purple-500" />
                            </div>
                            <div className="flex items-baseline gap-2 mb-2">
                                <span className="text-5xl font-semibold text-gray-900">{avgCoverage.toFixed(1)}%</span>
                            </div>
                            <p className="text-xs text-gray-500 mt-2">Avg across all zones</p>
                        </div>
                    </div>

                    {/* Charts Row */}
                    <div className="grid grid-cols-3 gap-6 mb-8">
                        {/* Gateway Uptime Trend */}
                        <div className="col-span-2 bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                            <h3 className="text-sm font-semibold text-gray-900 mb-4">Gateway Uptime Trend (7 days)</h3>
                            <ResponsiveContainer width="100%" height={250}>
                                <LineChart data={gatewayUptimeTrend}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                                    <XAxis dataKey="day" stroke="#9ca3af" style={{ fontSize: '12px' }} />
                                    <YAxis domain={[94, 100]} stroke="#9ca3af" style={{ fontSize: '12px' }} tickFormatter={(value) => `${value}%`} />
                                    <Tooltip formatter={(value: number) => `${value}%`} />
                                    <Line type="monotone" dataKey="uptime" stroke="#10b981" strokeWidth={3} dot={{ fill: '#10b981', r: 4 }} />
                                </LineChart>
                            </ResponsiveContainer>
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

                    {/* Gateway Performance by Location */}
                    <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 mb-8">
                        <h3 className="text-sm font-semibold text-gray-900 mb-4">Gateway Performance by Location</h3>
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-gray-100">
                                    <th className="text-left py-3 px-2 text-xs font-semibold text-gray-500 uppercase">Location</th>
                                    <th className="text-right py-3 px-2 text-xs font-semibold text-gray-500 uppercase">Gateways</th>
                                    <th className="text-right py-3 px-2 text-xs font-semibold text-gray-500 uppercase">Active</th>
                                    <th className="text-right py-3 px-2 text-xs font-semibold text-gray-500 uppercase">Coverage</th>
                                    <th className="text-right py-3 px-2 text-xs font-semibold text-gray-500 uppercase">Read Rate</th>
                                    <th className="text-left py-3 px-2 text-xs font-semibold text-gray-500 uppercase">Status</th>
                                    <th className="text-center py-3 px-2 text-xs font-semibold text-gray-500 uppercase">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {gatewayPerformance.map((loc, idx) => {
                                    const status = loc.active === loc.gateways && loc.coverage > 95 ? 'healthy' : loc.coverage > 85 ? 'warning' : 'critical'
                                    return (
                                        <tr key={idx} className="border-b border-gray-50 hover:bg-gray-50">
                                            <td className="py-3 px-2 text-sm font-medium text-gray-900">{loc.location}</td>
                                            <td className="py-3 px-2 text-right text-sm text-gray-600">{loc.gateways}</td>
                                            <td className="py-3 px-2 text-right">
                                                <span className={`text-sm font-semibold ${loc.active === loc.gateways ? 'text-emerald-600' : 'text-red-600'}`}>
                                                    {loc.active}
                                                </span>
                                            </td>
                                            <td className="py-3 px-2 text-right">
                                                <span className={`text-sm font-semibold ${loc.coverage > 95 ? 'text-emerald-600' : loc.coverage > 85 ? 'text-orange-600' : 'text-red-600'}`}>
                                                    {loc.coverage}%
                                                </span>
                                            </td>
                                            <td className="py-3 px-2 text-right text-sm text-gray-600">{loc.readRate}%</td>
                                            <td className="py-3 px-2">
                                                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${status === 'healthy' ? 'bg-emerald-50 text-emerald-700' :
                                                    status === 'warning' ? 'bg-orange-50 text-orange-700' :
                                                        'bg-red-50 text-red-700'
                                                    }`}>
                                                    <div className={`w-1.5 h-1.5 rounded-full ${status === 'healthy' ? 'bg-emerald-500' :
                                                        status === 'warning' ? 'bg-orange-500' :
                                                            'bg-red-500'
                                                        }`}></div>
                                                    {status === 'healthy' ? 'Healthy' : status === 'warning' ? 'Warning' : 'Critical'}
                                                </span>
                                            </td>
                                            <td className="py-3 px-2 text-center">
                                                <button
                                                    onClick={() => setActiveTier3Category(`gateway-${idx}`)}
                                                    className="text-xs font-medium text-blue-600 hover:text-blue-700"
                                                >
                                                    Details
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>

                    {/* Bottom Row: Operational KPIs */}
                    <div className="grid grid-cols-5 gap-6">
                        <button
                            onClick={() => setActiveTier3Category('tag-batteries')}
                            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between h-32 hover:shadow-md transition-all text-left group"
                        >
                            <div className="flex justify-between items-start w-full">
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider group-hover:text-amber-600 transition-colors">Tag Batteries</p>
                                <Battery className="w-4 h-4 text-amber-500" />
                            </div>
                            <div className="flex items-end justify-between w-full">
                                <h4 className="text-3xl font-semibold text-gray-900">122</h4>
                                <span className="text-xs text-orange-600">Replace soon</span>
                            </div>
                        </button>

                        <button
                            onClick={() => setActiveTier3Category('read-rate')}
                            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between h-32 hover:shadow-md transition-all text-left group"
                        >
                            <div className="flex justify-between items-start w-full">
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider group-hover:text-emerald-600 transition-colors">Read Success Rate</p>
                                <Signal className="w-4 h-4 text-emerald-500" />
                            </div>
                            <div className="flex items-end justify-between w-full">
                                <h4 className="text-3xl font-semibold text-gray-900">98.6%</h4>
                            </div>
                        </button>

                        <button
                            onClick={() => setActiveTier3Category('data-latency')}
                            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between h-32 hover:shadow-md transition-all text-left group"
                        >
                            <div className="flex justify-between items-start w-full">
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider group-hover:text-blue-600 transition-colors">Data Sync Latency</p>
                                <TrendingUp className="w-4 h-4 text-blue-500" />
                            </div>
                            <div className="flex items-end justify-between w-full">
                                <h4 className="text-3xl font-semibold text-gray-900">1.4s</h4>
                                <span className="text-xs text-emerald-600">-0.2s</span>
                            </div>
                        </button>

                        <button
                            onClick={() => setActiveTier3Category('network-infra')}
                            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between h-32 hover:shadow-md transition-all text-left group"
                        >
                            <div className="flex justify-between items-start w-full">
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider group-hover:text-purple-600 transition-colors">Network Uptime</p>
                                <Network className="w-4 h-4 text-purple-500" />
                            </div>
                            <div className="flex items-end justify-between w-full">
                                <h4 className="text-3xl font-semibold text-gray-900">99.8%</h4>
                            </div>
                        </button>

                        <button
                            onClick={() => setActiveTier3Category('server-health')}
                            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between h-32 hover:shadow-md transition-all text-left group"
                        >
                            <div className="flex justify-between items-start w-full">
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider group-hover:text-indigo-600 transition-colors">Server Health</p>
                                <Server className="w-4 h-4 text-indigo-500" />
                            </div>
                            <div className="flex items-end justify-between w-full">
                                <h4 className="text-3xl font-semibold text-gray-900">100%</h4>
                            </div>
                        </button>
                    </div>
                </div>
            </div>

            {/* Tier 3 Overlay */}
            {activeTier3Category && (
                <InfraHealthTier3
                    category={activeTier3Category}
                    onClose={() => setActiveTier3Category(null)}
                />
            )}
        </>
    )
}
