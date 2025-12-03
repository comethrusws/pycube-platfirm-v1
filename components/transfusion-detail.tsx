'use client'

import { useState } from 'react'
import { ChevronDown, Building2, Droplet, AlertTriangle, Snowflake, Thermometer, Activity, ArrowUpRight, ArrowDownRight, Link, Package, DollarSign, Clock, RotateCcw, AlertCircle, TrendingUp } from 'lucide-react'
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip as RechartsTooltip } from 'recharts'
import { TransfusionTier3 } from './transfusion-tier-3'
import { transfusionData } from '@/lib/data'

interface TransfusionDetailProps {
    isOpen: boolean
    onClose: () => void
}

// Map hospital data with visual positions for facility map
const hospitals = transfusionData.hospitals.map((h, idx) => {
  const positions = [
    { x: 45, y: 40 }, { x: 55, y: 35 }, { x: 30, y: 25 }, { x: 65, y: 55 },
    { x: 70, y: 30 }, { x: 60, y: 28 }, { x: 48, y: 45 }, { x: 52, y: 50 },
    { x: 50, y: 52 }, { x: 51, y: 53 }, { x: 49, y: 51 }, { x: 50, y: 54 },
    { x: 51, y: 55 }, { x: 62, y: 32 }, { x: 68, y: 25 }, { x: 42, y: 38 },
    { x: 58, y: 42 }, { x: 35, y: 48 },
  ]
  return {
    ...h,
    ...positions[idx],
    depts: Math.floor(h.beds / 120),
    coldStorage: Math.floor(h.bags / 35),
    temp: (2.8 + Math.random() * 1.5).toFixed(1) + '°C',
  }
})

const bloodTypeData = transfusionData.bloodTypes.map(bt => ({
  name: bt.type,
  value: bt.current,
  color: bt.status === 'healthy' ? '#10b981' : bt.status === 'low' ? '#f59e0b' : '#ef4444',
}))

export function TransfusionDetail({ isOpen, onClose }: TransfusionDetailProps) {
    const [selectedHospitalId, setSelectedHospitalId] = useState<number | null>(null)
    const [activeTier3Category, setActiveTier3Category] = useState<string | null>(null)

    if (!isOpen) return null

    // Calculate aggregated stats
    const totalBags = hospitals.reduce((acc, h) => acc + h.bags, 0)
    const totalAlerts = hospitals.reduce((acc, h) => acc + h.alerts, 0)
    const totalDepts = hospitals.reduce((acc, h) => acc + h.depts, 0)
    const totalColdStorage = hospitals.reduce((acc, h) => acc + h.coldStorage, 0)
    const avgTemp = (hospitals.reduce((acc, h) => acc + parseFloat(h.temp), 0) / hospitals.length).toFixed(1) + '°C'

    const selectedHospital = selectedHospitalId
        ? hospitals.find(h => h.id === selectedHospitalId)!
        : {
            name: 'All Hospitals',
            bags: totalBags,
            depts: totalDepts,
            coldStorage: totalColdStorage,
            alerts: totalAlerts,
            temp: avgTemp
        }

    return (
        <>
            <div className="bg-gray-50 border-t border-b border-gray-200 py-8 animate-in slide-in-from-top duration-300 font-sans">
                <div className="max-w-7xl mx-auto px-6">
                    {/* Breadcrumbs & Header */}
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <div className="text-sm text-gray-500 mb-1">Dashboard {'>'} Transfusion Medicine</div>
                            <h2 className="text-2xl font-semibold text-gray-900">Transfusion Medicine - Detailed Analytics</h2>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-gray-200 rounded-full transition-colors"
                        >
                            <ChevronDown className="w-6 h-6 text-gray-600" />
                        </button>
                    </div>

                    {/* Coverage Status */}
                    <div className="mb-8">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="h-px bg-gradient-to-r from-transparent to-emerald-500 flex-1" />
                            <h3 className="text-sm font-semibold text-emerald-700 uppercase tracking-wider">Coverage Status</h3>
                            <div className="h-px bg-gradient-to-l from-emerald-500 to-transparent flex-1" />
                        </div>

                    <div className="grid grid-cols-3 gap-6 mb-8">
                        {/* Card 1: Blood Type Distribution (Donut) */}
                        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col">
                            <h3 className="text-sm font-semibold text-gray-900 mb-4">Blood Type Distribution</h3>
                            <div className="flex-1 relative min-h-[200px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={bloodTypeData}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={60}
                                            outerRadius={80}
                                            paddingAngle={5}
                                            dataKey="value"
                                        >
                                            {bloodTypeData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} strokeWidth={0} />
                                            ))}
                                        </Pie>
                                        <RechartsTooltip />
                                        <Legend
                                            verticalAlign="bottom"
                                            height={36}
                                            iconType="circle"
                                            formatter={(value, entry: any) => <span className="text-xs font-medium text-gray-600 ml-1">{value}</span>}
                                        />
                                    </PieChart>
                                </ResponsiveContainer>
                                {/* Center Text */}
                                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none pb-8">
                                    <span className="text-3xl font-bold text-gray-900">{totalBags.toLocaleString()}</span>
                                    <span className="text-xs text-gray-500 font-medium">units</span>
                                </div>
                            </div>
                            <div className="flex justify-between items-center mt-2 pt-4 border-t border-gray-50">
                                <div className="flex flex-col">
                                    <span className="text-xs text-gray-500">Units Available</span>
                                    <span className="text-lg font-bold text-gray-900">{totalBags.toLocaleString()}</span>
                                </div>
                                <div className="flex flex-col text-right">
                                    <span className="text-xs text-gray-500">Pending Requests</span>
                                    <span className="text-lg font-bold text-gray-900">45</span>
                                </div>
                            </div>
                        </div>

                        {/* Card 2: Hospital Inventory Status (Progress Bars) */}
                        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col">
                            <h3 className="text-sm font-semibold text-gray-900 mb-6">Top Hospital Inventory</h3>
                            <div className="space-y-5 flex-1">
                                {hospitals.slice(0, 5).map((hospital, idx) => {
                                    const maxBags = Math.max(...hospitals.slice(0, 5).map(h => h.bags))
                                    const widthPercent = (hospital.bags / maxBags) * 100
                                    return (
                                        <div key={hospital.id}>
                                            <div className="flex justify-between text-xs font-medium mb-1.5 gap-2">
                                                <span className="text-gray-600 truncate flex-1">{hospital.name}</span>
                                                <span className="text-gray-900 whitespace-nowrap">{hospital.bags} units</span>
                                            </div>
                                            <div className="w-full bg-gray-100 rounded-full h-2">
                                                <div
                                                    className="h-2 rounded-full transition-all duration-300"
                                                    style={{
                                                        width: `${widthPercent}%`,
                                                        backgroundColor: idx % 2 === 0 ? '#3b82f6' : '#f97316' // Alternating Blue/Orange
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>

                        {/* Card 3: Critical Alerts Summary */}
                        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col">
                            <h3 className="text-sm font-semibold text-gray-900 mb-4">Yesterday's Critical Alerts</h3>
                            <div className="flex-1 flex flex-col items-center justify-center">
                                <span className="text-6xl font-bold text-gray-900 mb-6">{transfusionData.summary.activeAlerts}</span>
                                <div className="flex gap-3 w-full mb-6">
                                    <div className="flex-1 bg-blue-500 rounded-xl p-3 text-center text-white">
                                        <span className="block text-xl font-bold">{transfusionData.summary.tempAlerts}</span>
                                        <span className="text-[10px] opacity-90 uppercase">Temp</span>
                                    </div>
                                    <div className="flex-1 bg-blue-400 rounded-xl p-3 text-center text-white">
                                        <span className="block text-xl font-bold">{transfusionData.summary.stockAlerts}</span>
                                        <span className="text-[10px] opacity-90 uppercase">Stock</span>
                                    </div>
                                    <div className="flex-1 bg-orange-500 rounded-xl p-3 text-center text-white">
                                        <span className="block text-xl font-bold">{transfusionData.summary.expiryAlerts}</span>
                                        <span className="text-[10px] opacity-90 uppercase">Expiry</span>
                                    </div>
                                </div>
                                <div className="w-full bg-amber-400 rounded-xl p-3 text-center text-white font-bold">
                                    0 Unresolved
                                </div>
                            </div>
                            <div className="mt-4 flex justify-between text-xs text-gray-500 px-2">
                                <div className="flex items-center gap-1.5">
                                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                                    <span>Temp Issue</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                                    <span>Expiring</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>

                    {/* TIER 2: ANALYZE - Performance Insights */}
                    <div className="mb-8">
                        <div className="flex items-center gap-2 mb-6">
                            <div className="h-px bg-gradient-to-r from-blue-500 to-transparent flex-1" />
                            <h3 className="text-sm font-semibold text-blue-700 uppercase tracking-wider">Tier 2: Analyze - Performance Insights</h3>
                            <div className="h-px bg-gradient-to-l from-blue-500 to-transparent flex-1" />
                        </div>

                    {/* New KPI Cards Grid */}
                    <div className="grid grid-cols-4 gap-6 mb-8">
                        {/* Row 1 */}
                        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col h-40">
                            <div className="flex flex-col items-center mb-4">
                                <AlertTriangle className="w-8 h-8 text-orange-400 mb-2" />
                                <h3 className="text-sm font-semibold text-orange-400">Contamination Prevention</h3>
                            </div>
                            <div className="flex justify-between items-end w-full mt-auto px-4">
                                <div className="text-center">
                                    <span className="block text-2xl font-bold text-orange-400">24</span>
                                    <span className="text-xs text-gray-500">Alerts</span>
                                </div>
                                <div className="text-center">
                                    <span className="block text-2xl font-bold text-orange-400">55</span>
                                    <span className="text-xs text-gray-500">Expired</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col h-40">
                            <div className="flex flex-col items-center mb-4">
                                <Link className="w-8 h-8 text-gray-600 mb-2" />
                                <h3 className="text-sm font-semibold text-gray-600">Chain of Custody</h3>
                            </div>
                            <div className="flex justify-between items-end w-full mt-auto px-4">
                                <div className="text-center">
                                    <span className="block text-2xl font-bold text-gray-700">84.9%</span>
                                    <span className="text-xs text-gray-500">Compliance</span>
                                </div>
                                <div className="text-center">
                                    <span className="block text-2xl font-bold text-gray-400">52.1%</span>
                                    <span className="text-xs text-gray-500">Traceability</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col h-40">
                            <div className="flex flex-col items-center mb-4">
                                <Package className="w-8 h-8 text-emerald-400 mb-2" />
                                <h3 className="text-sm font-semibold text-emerald-400">Inventory Management</h3>
                            </div>
                            <div className="flex justify-between items-end w-full mt-auto px-4">
                                <div className="text-center">
                                    <span className="block text-2xl font-bold text-emerald-500">41</span>
                                    <span className="text-xs text-gray-500">Available</span>
                                </div>
                                <div className="text-center">
                                    <span className="block text-2xl font-bold text-emerald-300">95.2%</span>
                                    <span className="text-xs text-gray-500">Accuracy</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col h-40">
                            <div className="flex flex-col items-center mb-4">
                                <DollarSign className="w-8 h-8 text-purple-400 mb-2" />
                                <h3 className="text-sm font-semibold text-purple-400">Cost Savings</h3>
                            </div>
                            <div className="flex justify-between items-end w-full mt-auto px-4">
                                <div className="text-center">
                                    <span className="block text-2xl font-bold text-purple-500">$-1500</span>
                                    <span className="text-xs text-gray-500">Saved</span>
                                </div>
                                <div className="text-center">
                                    <span className="block text-2xl font-bold text-purple-300">106.8%</span>
                                    <span className="text-xs text-gray-500">Wastage</span>
                                </div>
                            </div>
                        </div>

                        {/* Row 2 */}
                        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col h-40">
                            <div className="flex flex-col items-center mb-4">
                                <Clock className="w-8 h-8 text-gray-600 mb-2" />
                                <h3 className="text-sm font-semibold text-gray-600">Response Time</h3>
                            </div>
                            <div className="flex justify-between items-end w-full mt-auto px-4">
                                <div className="text-center">
                                    <span className="block text-2xl font-bold text-gray-700">0</span>
                                    <span className="text-xs text-gray-500">Avg Mins</span>
                                </div>
                                <div className="text-center">
                                    <span className="block text-2xl font-bold text-gray-400">0</span>
                                    <span className="text-xs text-gray-500">Emergency</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col h-40">
                            <div className="flex flex-col items-center mb-4">
                                <RotateCcw className="w-8 h-8 text-emerald-400 mb-2" />
                                <h3 className="text-sm font-semibold text-emerald-400">Return Rate</h3>
                            </div>
                            <div className="flex justify-between items-end w-full mt-auto px-4">
                                <div className="text-center">
                                    <span className="block text-2xl font-bold text-emerald-500">56.2%</span>
                                    <span className="text-xs text-gray-500">Unused Units</span>
                                </div>
                                <div className="text-center">
                                    <span className="block text-2xl font-bold text-emerald-300">59</span>
                                    <span className="text-xs text-gray-500">Missed Scans</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col h-40">
                            <div className="flex flex-col items-center mb-4">
                                <AlertCircle className="w-8 h-8 text-orange-400 mb-2" />
                                <h3 className="text-sm font-semibold text-orange-400">Expiration Alert</h3>
                            </div>
                            <div className="flex justify-between items-end w-full mt-auto px-4">
                                <div className="text-center">
                                    <span className="block text-2xl font-bold text-orange-400">0</span>
                                    <span className="text-xs text-gray-500">Nearing Expiry</span>
                                </div>
                                <div className="text-center">
                                    <span className="block text-2xl font-bold text-orange-300">24</span>
                                    <span className="text-xs text-gray-500">Alerts</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col h-40">
                            <div className="flex flex-col items-center mb-4">
                                <Building2 className="w-8 h-8 text-gray-600 mb-2" />
                                <h3 className="text-sm font-semibold text-gray-600">Department Usage</h3>
                            </div>
                            <div className="flex justify-between items-end w-full mt-auto px-4">
                                <div className="text-center">
                                    <span className="block text-2xl font-bold text-gray-700">2</span>
                                    <span className="text-xs text-gray-500">Total Used</span>
                                </div>
                                <div className="text-center">
                                    <span className="block text-2xl font-bold text-gray-400">15</span>
                                    <span className="text-xs text-gray-500">Departments</span>
                                </div>
                            </div>
                        </div>

                        {/* Row 3 */}
                        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col h-40">
                            <div className="flex flex-col items-center mb-4">
                                <Droplet className="w-8 h-8 text-purple-400 mb-2" />
                                <h3 className="text-sm font-semibold text-purple-400">Blood Components</h3>
                            </div>
                            <div className="flex justify-between items-end w-full mt-auto px-4">
                                <div className="text-center">
                                    <span className="block text-2xl font-bold text-purple-500">2</span>
                                    <span className="text-xs text-gray-500">Total Used</span>
                                </div>
                                <div className="text-center">
                                    <span className="block text-2xl font-bold text-purple-300">5</span>
                                    <span className="text-xs text-gray-500">Types</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col h-40">
                            <div className="flex flex-col items-center mb-4">
                                <TrendingUp className="w-8 h-8 text-emerald-400 mb-2" />
                                <h3 className="text-sm font-semibold text-emerald-400">Most Used</h3>
                            </div>
                            <div className="flex justify-between items-end w-full mt-auto px-4">
                                <div className="text-center">
                                    <span className="block text-2xl font-bold text-emerald-500">2</span>
                                    <span className="text-xs text-gray-500">Units</span>
                                </div>
                                <div className="text-center">
                                    <span className="block text-2xl font-bold text-emerald-300">RBC</span>
                                    <span className="text-xs text-gray-500">Component</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col h-40">
                            <div className="flex flex-col items-center mb-4">
                                <AlertTriangle className="w-8 h-8 text-orange-400 mb-2" />
                                <h3 className="text-sm font-semibold text-orange-400">Most Expiring</h3>
                            </div>
                            <div className="flex justify-between items-end w-full mt-auto px-4">
                                <div className="text-center">
                                    <span className="block text-2xl font-bold text-orange-400">0</span>
                                    <span className="text-xs text-gray-500">Units</span>
                                </div>
                                <div className="text-center">
                                    <span className="block text-2xl font-bold text-orange-300">RBC</span>
                                    <span className="text-xs text-gray-500">Component</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col h-40">
                            <div className="flex flex-col items-center mb-4">
                                <Clock className="w-8 h-8 text-gray-600 mb-2" />
                                <h3 className="text-sm font-semibold text-gray-600">Storage Time</h3>
                            </div>
                            <div className="flex justify-between items-end w-full mt-auto px-4">
                                <div className="text-center">
                                    <span className="block text-2xl font-bold text-gray-700">0</span>
                                    <span className="text-xs text-gray-500">Expiring</span>
                                </div>
                                <div className="text-center">
                                    <span className="block text-2xl font-bold text-gray-400">2</span>
                                    <span className="text-xs text-gray-500">Available</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>

                    {/* Middle Row: Map & List */}
                    <div className="grid grid-cols-12 gap-6 mb-8">
                        {/* Hospital List */}
                        <div className="col-span-4 bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden flex flex-col h-[400px]">
                            <div className="p-5 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
                                <h3 className="font-semibold text-gray-900">Hospital Network</h3>
                                <span className="text-xs font-medium bg-white px-2 py-1 rounded-md border border-gray-200 text-gray-500">
                                    {hospitals.length} Locations
                                </span>
                            </div>
                            <div className="overflow-y-auto flex-1 p-3 space-y-1">
                                <button
                                    onClick={() => setSelectedHospitalId(null)}
                                    className={`w-full text-left p-3 rounded-xl transition-all duration-200 flex items-center justify-between ${selectedHospitalId === null
                                        ? 'bg-blue-50 border-blue-100 ring-1 ring-blue-100'
                                        : 'hover:bg-gray-50 border border-transparent'
                                        }`}
                                >
                                    <span className={`font-medium text-sm ${selectedHospitalId === null ? 'text-blue-900' : 'text-gray-700'}`}>
                                        All Hospitals
                                    </span>
                                </button>
                                {hospitals.map((hospital) => (
                                    <button
                                        key={hospital.id}
                                        onClick={() => setSelectedHospitalId(hospital.id)}
                                        className={`w-full text-left p-3 rounded-xl transition-all duration-200 flex items-center justify-between ${selectedHospitalId === hospital.id
                                            ? 'bg-blue-50 border-blue-100 ring-1 ring-blue-100'
                                            : 'hover:bg-gray-50 border border-transparent'
                                            }`}
                                    >
                                        <span className={`font-medium text-sm ${selectedHospitalId === hospital.id ? 'text-blue-900' : 'text-gray-700'}`}>
                                            {hospital.name}
                                        </span>
                                        {hospital.alerts > 0 && (
                                            <div className="w-2 h-2 bg-red-500 rounded-full" />
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Interactive Map */}
                        <div className="col-span-8 bg-white rounded-3xl shadow-sm border border-gray-100 p-4 h-[400px] relative overflow-hidden">
                            <div className="absolute inset-0 m-4 rounded-2xl overflow-hidden bg-gray-100 border border-gray-100">
                                <img
                                    src="/map.png"
                                    alt="Hospital Network Map"
                                    className="w-full h-full object-cover opacity-90"
                                />

                                {hospitals.map((hospital) => (
                                    <button
                                        key={hospital.id}
                                        onClick={() => setSelectedHospitalId(hospital.id)}
                                        className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 group ${selectedHospitalId === hospital.id ? 'z-20 scale-125' : 'z-10 hover:scale-110'
                                            }`}
                                        style={{ left: `${hospital.x}%`, top: `${hospital.y}%` }}
                                    >
                                        <div className={`relative flex items-center justify-center w-4 h-4 rounded-full shadow-sm border-2 border-white ${hospital.alerts > 0 ? 'bg-red-500' : (selectedHospitalId === hospital.id ? 'bg-blue-600' : 'bg-blue-400')
                                            }`}>
                                        </div>

                                        {/* Tooltip */}
                                        <div className={`absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-white px-3 py-2 rounded-lg shadow-lg border border-gray-100 whitespace-nowrap transition-opacity duration-200 z-30 ${selectedHospitalId === hospital.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                                            }`}>
                                            <p className="text-xs font-bold text-gray-900">{hospital.name}</p>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* TIER 3: OPTIMIZE - Recommended Actions */}
                    <div className="mb-8">
                        <div className="flex items-center gap-2 mb-6">
                            <div className="h-px bg-gradient-to-r from-purple-500 to-transparent flex-1" />
                            <h3 className="text-sm font-semibold text-purple-700 uppercase tracking-wider">Tier 3: Optimize - Deep Dive & Actions</h3>
                            <div className="h-px bg-gradient-to-l from-purple-500 to-transparent flex-1" />
                        </div>

                    {/* Bottom Row: 5 Detail Cards */}
                    <div className="grid grid-cols-5 gap-6">
                        {/* Card 1: Blood Bags */}
                        <button
                            onClick={() => setActiveTier3Category('blood-bags')}
                            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between h-32 hover:shadow-md transition-all text-left group"
                        >
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider group-hover:text-blue-600 transition-colors">Total Blood Bags</p>
                            <div className="flex items-end justify-between">
                                <h4 className="text-3xl font-bold text-gray-900">{selectedHospital.bags.toLocaleString()}</h4>
                                <ArrowUpRight className="w-5 h-5 text-gray-300 group-hover:text-blue-500 transition-colors" />
                            </div>
                        </button>

                        {/* Card 2: Departments */}
                        <button
                            onClick={() => setActiveTier3Category('departments')}
                            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between h-32 hover:shadow-md transition-all text-left group"
                        >
                            <div className="flex justify-between items-start w-full">
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider group-hover:text-emerald-600 transition-colors">Departments</p>
                                <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                            </div>
                            <div className="flex items-end justify-between w-full">
                                <h4 className="text-3xl font-bold text-gray-900">{selectedHospital.depts}</h4>
                                <ArrowUpRight className="w-5 h-5 text-gray-300 group-hover:text-emerald-500 transition-colors" />
                            </div>
                        </button>

                        {/* Card 3: Cold Storages */}
                        <button
                            onClick={() => setActiveTier3Category('cold-storage')}
                            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between h-32 hover:shadow-md transition-all text-left group"
                        >
                            <div className="flex justify-between items-start w-full">
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider group-hover:text-amber-600 transition-colors">Cold Storages</p>
                                <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                            </div>
                            <div className="flex items-end justify-between w-full">
                                <h4 className="text-3xl font-bold text-gray-900">{selectedHospital.coldStorage}</h4>
                                <ArrowUpRight className="w-5 h-5 text-gray-300 group-hover:text-amber-500 transition-colors" />
                            </div>
                        </button>

                        {/* Card 4: Active Alerts */}
                        <button
                            onClick={() => setActiveTier3Category('alerts')}
                            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between h-32 hover:shadow-md transition-all text-left group"
                        >
                            <div className="flex justify-between items-start w-full">
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider group-hover:text-red-600 transition-colors">Active Alerts</p>
                                <AlertTriangle className="w-4 h-4 text-red-500" />
                            </div>
                            <div className="flex items-end justify-between w-full">
                                <h4 className="text-3xl font-bold text-gray-900">{selectedHospital.alerts}</h4>
                                <ArrowUpRight className="w-5 h-5 text-gray-300 group-hover:text-red-500 transition-colors" />
                            </div>
                        </button>

                        {/* Card 5: Avg Temperature */}
                        <button
                            onClick={() => setActiveTier3Category('cold-storage')} // Reusing cold-storage for temp
                            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between h-32 hover:shadow-md transition-all text-left group"
                        >
                            <div className="flex justify-between items-start w-full">
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider group-hover:text-blue-600 transition-colors">Avg Temp</p>
                                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                            </div>
                            <div className="flex items-end justify-between w-full">
                                <h4 className="text-3xl font-bold text-gray-900">{selectedHospital.temp}</h4>
                                <ArrowUpRight className="w-5 h-5 text-gray-300 group-hover:text-blue-500 transition-colors" />
                            </div>
                        </button>
                    </div>
                    </div>
                </div>
            </div>

            {/* Tier 3 Overlay */}
            {activeTier3Category && (
                <TransfusionTier3
                    category={activeTier3Category}
                    onClose={() => setActiveTier3Category(null)}
                />
            )}
        </>
    )
}
