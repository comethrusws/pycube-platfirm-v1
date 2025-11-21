'use client'

import { useState } from 'react'
import { ChevronDown, Building2, Droplet, AlertTriangle, Snowflake, Thermometer, Activity, ArrowUpRight, ArrowDownRight } from 'lucide-react'
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip as RechartsTooltip } from 'recharts'
import { TransfusionTier3 } from './transfusion-tier-3'

interface TransfusionDetailProps {
    isOpen: boolean
    onClose: () => void
}

const hospitals = [
    { id: 1, name: 'St. John Hospital', x: 45, y: 40, bags: 37, depts: 6, coldStorage: 10, alerts: 2, temp: '3.4°C' },
    { id: 2, name: 'Providence Southfield', x: 55, y: 35, bags: 42, depts: 9, coldStorage: 12, alerts: 0, temp: '4.1°C' },
    { id: 3, name: 'Genesys Hospital', x: 30, y: 25, bags: 28, depts: 5, coldStorage: 8, alerts: 1, temp: '2.8°C' },
    { id: 4, name: 'Warren Hospital', x: 65, y: 55, bags: 31, depts: 4, coldStorage: 6, alerts: 0, temp: '3.9°C' },
    { id: 5, name: 'Rochester Hospital', x: 70, y: 30, bags: 45, depts: 7, coldStorage: 11, alerts: 0, temp: '3.5°C' },
    { id: 6, name: 'Beaumont Troy', x: 60, y: 28, bags: 55, depts: 8, coldStorage: 14, alerts: 0, temp: '3.6°C' },
    { id: 7, name: 'Henry Ford West', x: 48, y: 45, bags: 62, depts: 10, coldStorage: 15, alerts: 1, temp: '4.0°C' },
    { id: 8, name: 'Sinai-Grace', x: 52, y: 50, bags: 33, depts: 5, coldStorage: 7, alerts: 0, temp: '3.8°C' },
    { id: 9, name: 'Harper University', x: 50, y: 52, bags: 40, depts: 6, coldStorage: 9, alerts: 0, temp: '3.7°C' },
    { id: 10, name: 'Detroit Receiving', x: 51, y: 53, bags: 38, depts: 6, coldStorage: 8, alerts: 0, temp: '3.9°C' },
    { id: 11, name: 'Hutzel Women\'s', x: 49, y: 51, bags: 25, depts: 4, coldStorage: 5, alerts: 0, temp: '3.5°C' },
    { id: 12, name: 'Karmanos Cancer Ctr', x: 50, y: 54, bags: 30, depts: 5, coldStorage: 6, alerts: 0, temp: '3.6°C' },
    { id: 13, name: 'Children\'s Hospital', x: 51, y: 55, bags: 22, depts: 4, coldStorage: 5, alerts: 0, temp: '3.8°C' },
    { id: 14, name: 'Ascension Macomb', x: 62, y: 32, bags: 48, depts: 7, coldStorage: 10, alerts: 0, temp: '3.7°C' },
    { id: 15, name: 'McLaren Macomb', x: 68, y: 25, bags: 35, depts: 5, coldStorage: 8, alerts: 0, temp: '3.9°C' },
]

const bloodTypeData = [
    { name: 'A Positive', value: 450, color: '#10b981' }, // Emerald
    { name: 'O Positive', value: 380, color: '#3b82f6' }, // Blue
    { name: 'B Positive', value: 220, color: '#f97316' }, // Orange
    { name: 'AB Positive', value: 198, color: '#ef4444' }, // Red
]

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
                    {/* Header */}
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-2xl font-bold text-gray-900">Transfusion Medicine - Detailed Analytics</h2>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-gray-200 rounded-full transition-colors"
                        >
                            <ChevronDown className="w-6 h-6 text-gray-600" />
                        </button>
                    </div>

                    {/* Top Row: Charts & Summaries */}
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
                                {hospitals.slice(0, 5).map((hospital, idx) => (
                                    <div key={hospital.id}>
                                        <div className="flex justify-between text-xs font-medium mb-1.5">
                                            <span className="text-gray-600">{hospital.name}</span>
                                            <span className="text-gray-900">{hospital.bags} units</span>
                                        </div>
                                        <div className="w-full bg-gray-100 rounded-full h-2">
                                            <div
                                                className="h-2 rounded-full"
                                                style={{
                                                    width: `${(hospital.bags / 100) * 100}%`,
                                                    backgroundColor: idx % 2 === 0 ? '#3b82f6' : '#f97316' // Alternating Blue/Orange
                                                }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Card 3: Critical Alerts Summary */}
                        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col">
                            <h3 className="text-sm font-semibold text-gray-900 mb-4">Yesterday's Critical Alerts</h3>
                            <div className="flex-1 flex flex-col items-center justify-center">
                                <span className="text-6xl font-bold text-gray-900 mb-6">{totalAlerts + 12}</span>
                                <div className="flex gap-3 w-full mb-6">
                                    <div className="flex-1 bg-blue-500 rounded-xl p-3 text-center text-white">
                                        <span className="block text-xl font-bold">8</span>
                                        <span className="text-[10px] opacity-90 uppercase">Temp</span>
                                    </div>
                                    <div className="flex-1 bg-blue-400 rounded-xl p-3 text-center text-white">
                                        <span className="block text-xl font-bold">4</span>
                                        <span className="text-[10px] opacity-90 uppercase">Stock</span>
                                    </div>
                                    <div className="flex-1 bg-orange-500 rounded-xl p-3 text-center text-white">
                                        <span className="block text-xl font-bold">{totalAlerts}</span>
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
