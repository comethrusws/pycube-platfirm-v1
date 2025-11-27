'use client'

import { useState } from 'react'
import { ChevronDown, Server, Activity, Shield, DollarSign, HardDrive, TrendingUp, AlertTriangle, CheckCircle, Clock, Cpu, Database, Network, ArrowUpRight } from 'lucide-react'
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, Tooltip as RechartsTooltip, Legend } from 'recharts'
import { InfraHealthTier3 } from './infra-health-tier-3'

interface InfraHealthDetailProps {
    isOpen: boolean
    onClose: () => void
}

// System availability data for the last 7 days
const availabilityData = [
    { day: 'Mon', EMR: 99.8, LIS: 99.9, PACS: 99.7, HIS: 99.8, Network: 99.9 },
    { day: 'Tue', EMR: 99.9, LIS: 99.8, PACS: 99.8, HIS: 99.9, Network: 99.9 },
    { day: 'Wed', EMR: 99.7, LIS: 99.9, PACS: 99.6, HIS: 99.8, Network: 99.8 },
    { day: 'Thu', EMR: 99.9, LIS: 99.9, PACS: 99.9, HIS: 99.9, Network: 99.9 },
    { day: 'Fri', EMR: 99.8, LIS: 99.8, PACS: 99.7, HIS: 99.8, Network: 99.9 },
    { day: 'Sat', EMR: 99.9, LIS: 99.9, PACS: 99.8, HIS: 99.9, Network: 99.9 },
    { day: 'Sun', EMR: 99.8, LIS: 99.9, PACS: 99.9, HIS: 99.8, Network: 99.9 }
]

// Performance latency trends (P95 in ms)
const performanceData = [
    { time: '00:00', EMR: 120, PACS: 280, LIS: 95 },
    { time: '04:00', EMR: 105, PACS: 245, LIS: 88 },
    { time: '08:00', EMR: 145, PACS: 320, LIS: 110 },
    { time: '12:00', EMR: 165, PACS: 385, LIS: 128 },
    { time: '16:00', EMR: 155, PACS: 350, LIS: 115 },
    { time: '20:00', EMR: 130, PACS: 290, LIS: 98 },
]

// Security vulnerability breakdown
const vulnerabilityData = [
    { name: 'Critical', value: 3, color: '#ef4444' },
    { name: 'High', value: 12, color: '#f97316' },
    { name: 'Medium', value: 28, color: '#eab308' },
    { name: 'Low', value: 45, color: '#84cc16' }
]

// Cost breakdown by department
const costData = [
    { dept: 'Clinical IT', cost: 245000, budget: 280000 },
    { dept: 'Network Ops', cost: 182000, budget: 190000 },
    { dept: 'Storage', cost: 156000, budget: 170000 },
    { dept: 'Security', cost: 128000, budget: 140000 },
    { dept: 'Cloud Services', cost: 95000, budget: 100000 }
]

// Systems overview
const systems = [
    { id: 'emr', name: 'EMR (Epic)', uptime: 99.82, status: 'healthy', incidents: 2, latency: 142 },
    { id: 'lis', name: 'LIS (Sunquest)', uptime: 99.88, status: 'healthy', incidents: 1, latency: 105 },
    { id: 'pacs', name: 'PACS (Imaging)', uptime: 99.77, status: 'warning', incidents: 4, latency: 325 },
    { id: 'his', name: 'HIS (Core)', uptime: 99.85, status: 'healthy', incidents: 1, latency: 118 },
    { id: 'network', name: 'Network Core', uptime: 99.90, status: 'healthy', incidents: 0, latency: 8 }
]

export function InfraHealthDetail({ isOpen, onClose }: InfraHealthDetailProps) {
    const [activeTier3Category, setActiveTier3Category] = useState<string | null>(null)
    const [selectedSystem, setSelectedSystem] = useState<string>('all')

    if (!isOpen) return null

    const totalVulnerabilities = vulnerabilityData.reduce((acc, v) => acc + v.value, 0)
    const criticalVulnerabilities = vulnerabilityData.find(v => v.name === 'Critical')?.value || 0
    const avgUptime = systems.reduce((acc, s) => acc + s.uptime, 0) / systems.length
    const totalIncidents = systems.reduce((acc, s) => acc + s.incidents, 0)

    return (
        <>
            <div className="bg-gray-50 border-t border-b border-gray-200 py-8 animate-in slide-in-from-top duration-300 font-sans">
                <div className="max-w-7xl mx-auto px-6">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-2xl font-bold text-gray-900">Infrastructure Health - Operational Dashboard</h2>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-gray-200 rounded-full transition-colors"
                        >
                            <ChevronDown className="w-6 h-6 text-gray-600" />
                        </button>
                    </div>

                    {/* Top Row: Key Metrics Summary */}
                    <div className="grid grid-cols-4 gap-6 mb-8">
                        {/* Overall Health Score */}
                        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-sm font-semibold text-gray-900">Infrastructure Score</h3>
                                <CheckCircle className="w-5 h-5 text-emerald-500" />
                            </div>
                            <div className="flex items-baseline gap-2 mb-2">
                                <span className="text-5xl font-bold text-emerald-500">96</span>
                                <span className="text-2xl text-gray-400">/100</span>
                            </div>
                            <p className="text-xs text-gray-500 mt-2">Excellent • All systems operational</p>
                        </div>

                        {/* System Availability */}
                        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-sm font-semibold text-gray-900">Avg. Uptime (7d)</h3>
                                <Activity className="w-5 h-5 text-blue-500" />
                            </div>
                            <div className="flex items-baseline gap-2 mb-2">
                                <span className="text-5xl font-bold text-blue-500">{avgUptime.toFixed(2)}</span>
                                <span className="text-2xl text-gray-400">%</span>
                            </div>
                            <p className="text-xs text-gray-500 mt-2">Target: 99.5% • On track</p>
                        </div>

                        {/* Security Posture */}
                        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-sm font-semibold text-gray-900">Security Posture</h3>
                                <Shield className="w-5 h-5 text-orange-500" />
                            </div>
                            <div className="flex items-baseline gap-2 mb-2">
                                <span className="text-5xl font-bold text-orange-500">{totalVulnerabilities}</span>
                                <span className="text-xl text-gray-400">vulns</span>
                            </div>
                            <p className="text-xs text-gray-500 mt-2">{criticalVulnerabilities} critical • Needs attention</p>
                        </div>

                        {/* Incident Summary */}
                        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-sm font-semibold text-gray-900">Active Incidents</h3>
                                <AlertTriangle className="w-5 h-5 text-amber-500" />
                            </div>
                            <div className="flex items-baseline gap-2 mb-2">
                                <span className="text-5xl font-bold text-gray-900">{totalIncidents}</span>
                                <span className="text-xl text-gray-400">open</span>
                            </div>
                            <p className="text-xs text-gray-500 mt-2">0 Sev-1 • {totalIncidents} Sev-2/3</p>
                        </div>
                    </div>

                    {/* Middle Row: Charts */}
                    <div className="grid grid-cols-3 gap-6 mb-8">
                        {/* System Availability Trends */}
                        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 col-span-2">
                            <h3 className="text-sm font-semibold text-gray-900 mb-4">System Availability Trends (7 Days)</h3>
                            <ResponsiveContainer width="100%" height={240}>
                                <LineChart data={availabilityData}>
                                    <XAxis dataKey="day" stroke="#9ca3af" style={{ fontSize: '12px' }} />
                                    <YAxis domain={[99.5, 100]} stroke="#9ca3af" style={{ fontSize: '12px' }} />
                                    <RechartsTooltip />
                                    <Legend iconType="circle" wrapperStyle={{ fontSize: '12px' }} />
                                    <Line type="monotone" dataKey="EMR" stroke="#3b82f6" strokeWidth={2} dot={false} />
                                    <Line type="monotone" dataKey="LIS" stroke="#10b981" strokeWidth={2} dot={false} />
                                    <Line type="monotone" dataKey="PACS" stroke="#f97316" strokeWidth={2} dot={false} />
                                    <Line type="monotone" dataKey="HIS" stroke="#8b5cf6" strokeWidth={2} dot={false} />
                                    <Line type="monotone" dataKey="Network" stroke="#06b6d4" strokeWidth={2} dot={false} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>

                        {/* Security Vulnerabilities */}
                        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                            <h3 className="text-sm font-semibold text-gray-900 mb-4">Vulnerability Distribution</h3>
                            <div className="relative min-h-[200px]">
                                <ResponsiveContainer width="100%" height={200}>
                                    <PieChart>
                                        <Pie
                                            data={vulnerabilityData}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={50}
                                            outerRadius={70}
                                            paddingAngle={2}
                                            dataKey="value"
                                        >
                                            {vulnerabilityData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} strokeWidth={0} />
                                            ))}
                                        </Pie>
                                        <RechartsTooltip />
                                    </PieChart>
                                </ResponsiveContainer>
                                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                                    <span className="text-3xl font-bold text-gray-900">{totalVulnerabilities}</span>
                                    <span className="text-xs text-gray-500">Total</span>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-2 mt-4">
                                {vulnerabilityData.map((v) => (
                                    <div key={v.name} className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: v.color }}></div>
                                        <span className="text-xs text-gray-600">{v.name}: {v.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Performance Metrics */}
                    <div className="grid grid-cols-2 gap-6 mb-8">
                        {/* Latency Trends */}
                        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                            <h3 className="text-sm font-semibold text-gray-900 mb-4">P95 Latency Trends (24h)</h3>
                            <ResponsiveContainer width="100%" height={180}>
                                <LineChart data={performanceData}>
                                    <XAxis dataKey="time" stroke="#9ca3af" style={{ fontSize: '11px' }} />
                                    <YAxis stroke="#9ca3af" style={{ fontSize: '11px' }} />
                                    <RechartsTooltip />
                                    <Legend iconType="circle" wrapperStyle={{ fontSize: '11px' }} />
                                    <Line type="monotone" dataKey="EMR" stroke="#3b82f6" strokeWidth={2} />
                                    <Line type="monotone" dataKey="PACS" stroke="#f97316" strokeWidth={2} />
                                    <Line type="monotone" dataKey="LIS" stroke="#10b981" strokeWidth={2} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>

                        {/* Cost Overview */}
                        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                            <h3 className="text-sm font-semibold text-gray-900 mb-4">Monthly IT Cost vs Budget</h3>
                            <ResponsiveContainer width="100%" height={180}>
                                <BarChart data={costData}>
                                    <XAxis dataKey="dept" stroke="#9ca3af" style={{ fontSize: '10px' }} angle={-15} textAnchor="end" height={60} />
                                    <YAxis stroke="#9ca3af" style={{ fontSize: '11px' }} />
                                    <RechartsTooltip />
                                    <Legend iconType="square" wrapperStyle={{ fontSize: '11px' }} />
                                    <Bar dataKey="cost" fill="#3b82f6" name="Actual" radius={[4, 4, 0, 0]} />
                                    <Bar dataKey="budget" fill="#cbd5e1" name="Budget" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Systems Detail Grid */}
                    <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 mb-8">
                        <h3 className="text-sm font-semibold text-gray-900 mb-4">System-Level Breakdown</h3>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-gray-100">
                                        <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">System</th>
                                        <th className="text-right py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Uptime (7d)</th>
                                        <th className="text-right py-3 px-4 text-xs font-semibold text-gray-500 uppercase">P95 Latency</th>
                                        <th className="text-right py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Incidents</th>
                                        <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Status</th>
                                        <th className="text-right py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {systems.map((system) => (
                                        <tr key={system.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                                            <td className="py-4 px-4 text-sm font-medium text-gray-900">{system.name}</td>
                                            <td className="py-4 px-4 text-right">
                                                <span className={`text-sm font-semibold ${system.uptime >= 99.8 ? 'text-emerald-600' : 'text-orange-600'}`}>
                                                    {system.uptime}%
                                                </span>
                                            </td>
                                            <td className="py-4 px-4 text-right text-sm text-gray-600">{system.latency}ms</td>
                                            <td className="py-4 px-4 text-right">
                                                <span className={`text-sm font-semibold ${system.incidents === 0 ? 'text-gray-400' : 'text-orange-600'}`}>
                                                    {system.incidents}
                                                </span>
                                            </td>
                                            <td className="py-4 px-4">
                                                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${system.status === 'healthy'
                                                        ? 'bg-emerald-50 text-emerald-700'
                                                        : 'bg-orange-50 text-orange-700'
                                                    }`}>
                                                    <div className={`w-1.5 h-1.5 rounded-full ${system.status === 'healthy' ? 'bg-emerald-500' : 'bg-orange-500'
                                                        }`}></div>
                                                    {system.status === 'healthy' ? 'Healthy' : 'Warning'}
                                                </span>
                                            </td>
                                            <td className="py-4 px-4 text-right">
                                                <button
                                                    onClick={() => setActiveTier3Category(system.id)}
                                                    className="text-xs font-medium text-blue-600 hover:text-blue-700 transition-colors"
                                                >
                                                    Details →
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Bottom Row: Operational KPI Cards */}
                    <div className="grid grid-cols-5 gap-6">
                        <button
                            onClick={() => setActiveTier3Category('capacity')}
                            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between h-32 hover:shadow-md transition-all text-left group"
                        >
                            <div className="flex justify-between items-start w-full">
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider group-hover:text-purple-600 transition-colors">Storage Capacity</p>
                                <HardDrive className="w-4 h-4 text-purple-500" />
                            </div>
                            <div className="flex items-end justify-between w-full">
                                <h4 className="text-3xl font-bold text-gray-900">68%</h4>
                                <ArrowUpRight className="w-5 h-5 text-gray-300 group-hover:text-purple-500 transition-colors" />
                            </div>
                        </button>

                        <button
                            onClick={() => setActiveTier3Category('compute')}
                            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between h-32 hover:shadow-md transition-all text-left group"
                        >
                            <div className="flex justify-between items-start w-full">
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider group-hover:text-blue-600 transition-colors">Compute Usage</p>
                                <Cpu className="w-4 h-4 text-blue-500" />
                            </div>
                            <div className="flex items-end justify-between w-full">
                                <h4 className="text-3xl font-bold text-gray-900">54%</h4>
                                <ArrowUpRight className="w-5 h-5 text-gray-300 group-hover:text-blue-500 transition-colors" />
                            </div>
                        </button>

                        <button
                            onClick={() => setActiveTier3Category('network')}
                            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between h-32 hover:shadow-md transition-all text-left group"
                        >
                            <div className="flex justify-between items-start w-full">
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider group-hover:text-emerald-600 transition-colors">Network Health</p>
                                <Network className="w-4 h-4 text-emerald-500" />
                            </div>
                            <div className="flex items-end justify-between w-full">
                                <h4 className="text-3xl font-bold text-gray-900">99.9%</h4>
                                <ArrowUpRight className="w-5 h-5 text-gray-300 group-hover:text-emerald-500 transition-colors" />
                            </div>
                        </button>

                        <button
                            onClick={() => setActiveTier3Category('backup')}
                            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between h-32 hover:shadow-md transition-all text-left group"
                        >
                            <div className="flex justify-between items-start w-full">
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider group-hover:text-amber-600 transition-colors">Backup Success</p>
                                <Database className="w-4 h-4 text-amber-500" />
                            </div>
                            <div className="flex items-end justify-between w-full">
                                <h4 className="text-3xl font-bold text-gray-900">98.2%</h4>
                                <ArrowUpRight className="w-5 h-5 text-gray-300 group-hover:text-amber-500 transition-colors" />
                            </div>
                        </button>

                        <button
                            onClick={() => setActiveTier3Category('patching')}
                            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between h-32 hover:shadow-md transition-all text-left group"
                        >
                            <div className="flex justify-between items-start w-full">
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider group-hover:text-orange-600 transition-colors">Patch Compliance</p>
                                <Clock className="w-4 h-4 text-orange-500" />
                            </div>
                            <div className="flex items-end justify-between w-full">
                                <h4 className="text-3xl font-bold text-gray-900">84%</h4>
                                <ArrowUpRight className="w-5 h-5 text-gray-300 group-hover:text-orange-500 transition-colors" />
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
