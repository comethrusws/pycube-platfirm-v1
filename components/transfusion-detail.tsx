'use client'

import { ChevronDown, AlertCircle, CheckCircle2, AlertTriangle, XCircle, TrendingUp, Clock, DollarSign, Activity, Thermometer, Droplet, Sparkles, ArrowRight } from 'lucide-react'
import { transfusionData } from '@/lib/data'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { useState } from 'react'
import { TransfusionTier3 } from './transfusion-tier-3'
import { AISidePanel, AIContextType } from './ai-side-panel'

interface TransfusionDetailProps {
    isOpen: boolean
    onClose: () => void
}

export function TransfusionDetail({ isOpen, onClose }: TransfusionDetailProps) {
    const [tier3Category, setTier3Category] = useState<string | null>(null)
    const [selectedHospitalId, setSelectedHospitalId] = useState<number | null>(null)
    const [aiPanelOpen, setAiPanelOpen] = useState(false)
    const [aiContext, setAiContext] = useState<{ title: string, value: string, type: AIContextType }>({
        title: '',
        value: '',
        type: 'blood-wastage'
    })

    const handleKPIClick = (label: string, value: string) => {
        let type: AIContextType = 'blood-wastage'
        if (label.includes('Stock') || label.includes('Inventory')) type = 'stockout'
        if (label.includes('Temp') || label.includes('Cold')) type = 'blood-wastage'
        if (label.includes('Expiry') || label.includes('Expired')) type = 'expiration'
        if (label.includes('Custody') || label.includes('Traceability')) type = 'custody'

        setAiContext({ title: label, value, type })
        setAiPanelOpen(true)
    }

    if (!isOpen) return null

    // Get selected hospital data or aggregate data
    const selectedHospital = selectedHospitalId
        ? transfusionData.hospitals.find(h => h.id === selectedHospitalId)
        : null

    // Compute stats based on selection
    const hospitalStats = selectedHospital ? {
        totalBloodBags: selectedHospital.bags,
        departments: Math.floor(Math.random() * 15) + 20, // Mock data per hospital
        coldStorages: Math.floor(Math.random() * 30) + 10,
        activeAlerts: selectedHospital.alerts + selectedHospital.tempAlerts,
        avgTemp: (3.2 + Math.random() * 0.8).toFixed(1)
    } : {
        totalBloodBags: transfusionData.summary.totalBloodBags,
        departments: 35,
        coldStorages: 128,
        activeAlerts: transfusionData.summary.activeAlerts,
        avgTemp: '3.6'
    }

    // Data preparation
    const bloodTypeData = transfusionData.bloodTypes.map(type => ({
        type: type.type,
        current: type.current,
        target: type.target,
        status: type.status
    }))

    const departmentData = transfusionData.departmentUsage.slice(0, 5).map(dept => ({
        name: dept.department,
        used: dept.unitsUsed,
        allocated: dept.totalAllocated
    }))

    return (
        <>
            <div className="bg-gray-50 border-t border-b border-gray-200 py-8 animate-in slide-in-from-top duration-300">
                <div className="max-w-7xl mx-auto px-8">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <div className="text-sm text-gray-500 mb-1">Dashboard {'>'} Transfusion Medicine</div>
                            <h2 className="text-2xl font-semibold text-gray-900">Transfusion Medicine - Detailed Analytics</h2>
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
                            {/* Total Inventory - Donut Chart */}
                            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                                <h3 className="text-sm font-semibold text-gray-900 mb-6">Total Blood Inventory</h3>
                                <div className="flex items-center justify-center mb-6">
                                    <div className="relative w-48 h-48">
                                        <div className="w-full h-full rounded-full" style={{
                                            background: `conic-gradient(
                                                #ef4444 0deg 270deg,
                                                #fca5a5 270deg 360deg
                                            )`
                                        }}>
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <div className="bg-white rounded-full w-32 h-32 flex flex-col items-center justify-center">
                                                    <div className="text-4xl font-semibold text-gray-900">{transfusionData.summary.totalBloodBags.toLocaleString()}</div>
                                                    <div className="text-sm text-gray-500">units</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-600">Daily Transfusions</span>
                                        <span className="text-lg font-semibold text-gray-900">{transfusionData.summary.dailyTransfusions.toLocaleString()}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-600">Active Alerts</span>
                                        <span className="text-lg font-semibold text-red-600">{transfusionData.summary.activeAlerts.toLocaleString()}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Blood Type Status */}
                            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                                <h3 className="text-sm font-semibold text-gray-900 mb-6">Blood Type Inventory Status</h3>
                                <div className="space-y-4">
                                    {transfusionData.bloodTypes.slice(0, 6).map((item) => (
                                        <div key={item.type} className="space-y-1">
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="text-gray-700">{item.type}</span>
                                                <span className="font-semibold text-gray-900">{item.current} / {item.target}</span>
                                            </div>
                                            <div className="w-full bg-gray-100 rounded-full h-2">
                                                <div
                                                    className={`${item.status === 'critical' ? 'bg-red-500' : item.status === 'low' ? 'bg-orange-500' : 'bg-emerald-500'} h-2 rounded-full transition-all duration-500`}
                                                    style={{ width: `${Math.min((item.current / item.target) * 100, 100)}%` }}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Alerts Overview */}
                            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                                <h3 className="text-sm font-semibold text-gray-900 mb-6">Critical Alerts Overview</h3>
                                <div className="text-center mb-6">
                                    <div className="text-6xl font-semibold text-gray-900">{transfusionData.summary.activeAlerts}</div>
                                </div>
                                <div className="grid grid-cols-3 gap-3 mb-4">
                                    <div className="bg-red-500 rounded-2xl p-4 text-center">
                                        <div className="text-2xl font-semibold text-white">{transfusionData.summary.stockAlerts}</div>
                                        <div className="text-xs text-white/80 mt-1">Stock</div>
                                    </div>
                                    <div className="bg-blue-400 rounded-2xl p-4 text-center">
                                        <div className="text-2xl font-semibold text-white">{transfusionData.summary.tempAlerts}</div>
                                        <div className="text-xs text-white/80 mt-1">Temp</div>
                                    </div>
                                    <div className="bg-orange-500 rounded-2xl p-4 text-center">
                                        <div className="text-2xl font-semibold text-white">{transfusionData.summary.expiryAlerts}</div>
                                        <div className="text-xs text-white/80 mt-1">Expiry</div>
                                    </div>
                                </div>
                                <div className="bg-yellow-50 rounded-2xl p-4 text-center mb-4 border border-yellow-100">
                                    <div className="text-sm font-medium text-yellow-800">
                                        {transfusionData.kpis.find(k => k.label === 'Critical Stock Alert')?.subtitle || 'Critical stock levels detected'}
                                    </div>
                                </div>
                                <div className="space-y-2 text-xs">
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 rounded-full bg-red-500" />
                                        <span className="text-gray-600">Critical Stock</span>
                                        <div className="ml-auto w-3 h-3 rounded-full bg-orange-500" />
                                        <span className="text-gray-600">Expiry Risk</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 rounded-full bg-blue-400" />
                                        <span className="text-gray-600">Temp Excursion</span>
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


                        {/* Comprehensive KPI Grid */}
                        <div className="grid grid-cols-4 gap-4 mb-6">
                            {/* Row 1 */}
                            {/* Contamination Prevention */}
                            <button
                                onClick={() => handleKPIClick('Contamination Prevention', '24 Alerts')}
                                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:border-purple-200 transition-all group text-left relative overflow-hidden w-full"
                            >
                                <div className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Sparkles className="w-3 h-3 text-purple-600" />
                                </div>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="p-2 bg-orange-100 rounded-lg">
                                        <AlertTriangle className="w-5 h-5 text-orange-600" />
                                    </div>
                                    <span className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Contamination Prevention
                                    </span>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <div className="text-3xl font-semibold text-gray-900">24</div>
                                        <div className="text-xs text-gray-500 mt-1">Alerts</div>
                                    </div>
                                    <div>
                                        <div className="text-3xl font-semibold text-gray-400">55</div>
                                        <div className="text-xs text-gray-500 mt-1">Expired</div>
                                    </div>
                                </div>
                            </button>

                            {/* Chain of Custody */}
                            <button
                                onClick={() => handleKPIClick('Chain of Custody', '84.9% Compliance')}
                                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:border-purple-200 transition-all group text-left relative overflow-hidden w-full"
                            >
                                <div className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Sparkles className="w-3 h-3 text-purple-600" />
                                </div>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="p-2 bg-gray-100 rounded-lg">
                                        <Activity className="w-5 h-5 text-gray-600" />
                                    </div>
                                    <span className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Chain of Custody
                                    </span>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <div className="text-3xl font-semibold text-gray-900">84.9%</div>
                                        <div className="text-xs text-gray-500 mt-1">Compliance</div>
                                    </div>
                                    <div>
                                        <div className="text-3xl font-semibold text-gray-400">52.1%</div>
                                        <div className="text-xs text-gray-500 mt-1">Traceability</div>
                                    </div>
                                </div>
                            </button>

                            {/* Inventory Management */}
                            <button
                                onClick={() => handleKPIClick('Inventory Management', '41 Available')}
                                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:border-purple-200 transition-all group text-left relative overflow-hidden w-full"
                            >
                                <div className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Sparkles className="w-3 h-3 text-purple-600" />
                                </div>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="p-2 bg-teal-100 rounded-lg">
                                        <CheckCircle2 className="w-5 h-5 text-teal-600" />
                                    </div>
                                    <span className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Inventory Management
                                    </span>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <div className="text-3xl font-semibold text-gray-900">41</div>
                                        <div className="text-xs text-gray-500 mt-1">Available</div>
                                    </div>
                                    <div>
                                        <div className="text-3xl font-semibold text-gray-400">95.2%</div>
                                        <div className="text-xs text-gray-500 mt-1">Accuracy</div>
                                    </div>
                                </div>
                            </button>

                            {/* Cost Savings */}
                            <button
                                onClick={() => handleKPIClick('Cost Savings', '$127K')}
                                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:border-purple-200 transition-all group text-left relative overflow-hidden w-full"
                            >
                                <div className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Sparkles className="w-3 h-3 text-purple-600" />
                                </div>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="p-2 bg-purple-100 rounded-lg">
                                        <DollarSign className="w-5 h-5 text-purple-600" />
                                    </div>
                                    <span className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Cost Savings
                                    </span>
                                </div>
                                <div className="flex flex-col items-center justify-center py-2">
                                    <div className="text-4xl font-semibold text-purple-600">$127K</div>
                                    <div className="text-xs text-gray-500 mt-2">This Month</div>

                                </div>
                            </button>

                            {/* Row 2 */}
                            {/* Response Time */}
                            <button
                                onClick={() => handleKPIClick('Response Time', '0 Avg Mins')}
                                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:border-purple-200 transition-all group text-left relative overflow-hidden w-full"
                            >
                                <div className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Sparkles className="w-3 h-3 text-purple-600" />
                                </div>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="p-2 bg-gray-100 rounded-lg">
                                        <Clock className="w-5 h-5 text-gray-600" />
                                    </div>
                                    <span className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Response Time
                                    </span>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <div className="text-3xl font-semibold text-gray-900">0</div>
                                        <div className="text-xs text-gray-500 mt-1">Avg Mins</div>
                                    </div>
                                    <div>
                                        <div className="text-3xl font-semibold text-gray-400">0</div>
                                        <div className="text-xs text-gray-500 mt-1">Emergency</div>
                                    </div>
                                </div>
                            </button>

                            {/* Return Rate */}
                            <button
                                onClick={() => handleKPIClick('Return Rate', '56.2%')}
                                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:border-purple-200 transition-all group text-left relative overflow-hidden w-full"
                            >
                                <div className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Sparkles className="w-3 h-3 text-purple-600" />
                                </div>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="p-2 bg-teal-100 rounded-lg">
                                        <TrendingUp className="w-5 h-5 text-teal-600" />
                                    </div>
                                    <span className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Return Rate
                                    </span>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <div className="text-3xl font-semibold text-gray-900">56.2%</div>
                                        <div className="text-xs text-gray-500 mt-1">Unused Units</div>
                                    </div>
                                    <div>
                                        <div className="text-3xl font-semibold text-gray-400">59</div>
                                        <div className="text-xs text-gray-500 mt-1">Missed Scans</div>
                                    </div>
                                </div>
                            </button>

                            {/* Expiration Alert */}
                            <button
                                onClick={() => handleKPIClick('Expiration Alert', '24 Alerts')}
                                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:border-purple-200 transition-all group text-left relative overflow-hidden w-full"
                            >
                                <div className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Sparkles className="w-3 h-3 text-purple-600" />
                                </div>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="p-2 bg-orange-100 rounded-lg">
                                        <AlertCircle className="w-5 h-5 text-orange-600" />
                                    </div>
                                    <span className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Expiration Alert
                                    </span>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <div className="text-3xl font-semibold text-gray-900">0</div>
                                        <div className="text-xs text-gray-500 mt-1">Nearing Expiry</div>
                                    </div>
                                    <div>
                                        <div className="text-3xl font-semibold text-gray-400">24</div>
                                        <div className="text-xs text-gray-500 mt-1">Alerts</div>
                                    </div>
                                </div>
                            </button>

                            {/* Department Usage */}
                            <button
                                onClick={() => handleKPIClick('Department Usage', '2 Total Used')}
                                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:border-purple-200 transition-all group text-left relative overflow-hidden w-full"
                            >
                                <div className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Sparkles className="w-3 h-3 text-purple-600" />
                                </div>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="p-2 bg-gray-100 rounded-lg">
                                        <Activity className="w-5 h-5 text-gray-600" />
                                    </div>
                                    <span className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Department Usage
                                    </span>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <div className="text-3xl font-semibold text-gray-900">2</div>
                                        <div className="text-xs text-gray-500 mt-1">Total Used</div>
                                    </div>
                                    <div>
                                        <div className="text-3xl font-semibold text-gray-400">15</div>
                                        <div className="text-xs text-gray-500 mt-1">Departments</div>
                                    </div>
                                </div>
                            </button>

                            {/* Row 3 */}
                            {/* Blood Components */}
                            <button
                                onClick={() => handleKPIClick('Blood Components', '2 Units')}
                                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:border-purple-200 transition-all group text-left relative overflow-hidden w-full"
                            >
                                <div className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Sparkles className="w-3 h-3 text-purple-600" />
                                </div>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="p-2 bg-purple-100 rounded-lg">
                                        <Droplet className="w-5 h-5 text-purple-600" />
                                    </div>
                                    <span className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Blood Components
                                    </span>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <div className="text-3xl font-semibold text-gray-900">2</div>
                                        <div className="text-xs text-gray-500 mt-1">Units</div>
                                    </div>
                                    <div>
                                        <div className="text-3xl font-semibold text-gray-400">7</div>
                                        <div className="text-xs text-gray-500 mt-1">Types</div>
                                    </div>
                                </div>
                            </button>

                            {/* Most Used */}
                            <button
                                onClick={() => handleKPIClick('Most Used', 'RBC Component')}
                                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:border-purple-200 transition-all group text-left relative overflow-hidden w-full"
                            >
                                <div className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Sparkles className="w-3 h-3 text-purple-600" />
                                </div>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="p-2 bg-teal-100 rounded-lg">
                                        <TrendingUp className="w-5 h-5 text-teal-600" />
                                    </div>
                                    <span className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Most Used
                                    </span>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <div className="text-3xl font-semibold text-gray-900">2</div>
                                        <div className="text-xs text-gray-500 mt-1">Units</div>
                                    </div>
                                    <div>
                                        <div className="text-3xl font-semibold text-teal-600">RBC</div>
                                        <div className="text-xs text-gray-500 mt-1">Component</div>
                                    </div>
                                </div>
                            </button>

                            {/* Most Expiring */}
                            <button
                                onClick={() => handleKPIClick('Most Expiring', 'RBC Component')}
                                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:border-purple-200 transition-all group text-left relative overflow-hidden w-full"
                            >
                                <div className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Sparkles className="w-3 h-3 text-purple-600" />
                                </div>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="p-2 bg-orange-100 rounded-lg">
                                        <AlertTriangle className="w-5 h-5 text-orange-600" />
                                    </div>
                                    <span className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Most Expiring
                                    </span>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <div className="text-3xl font-semibold text-gray-900">0</div>
                                        <div className="text-xs text-gray-500 mt-1">Units</div>
                                    </div>
                                    <div>
                                        <div className="text-3xl font-semibold text-orange-600">RBC</div>
                                        <div className="text-xs text-gray-500 mt-1">Component</div>
                                    </div>
                                </div>
                            </button>

                            {/* Storage Time */}
                            <button
                                onClick={() => handleKPIClick('Storage Time', '0 Expiring')}
                                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:border-purple-200 transition-all group text-left relative overflow-hidden w-full"
                            >
                                <div className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Sparkles className="w-3 h-3 text-purple-600" />
                                </div>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="p-2 bg-gray-100 rounded-lg">
                                        <Clock className="w-5 h-5 text-gray-600" />
                                    </div>
                                    <span className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Storage Time
                                    </span>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <div className="text-3xl font-semibold text-gray-900">0</div>
                                        <div className="text-xs text-gray-500 mt-1">Expiring</div>
                                    </div>
                                    <div>
                                        <div className="text-3xl font-semibold text-gray-400">2</div>
                                        <div className="text-xs text-gray-500 mt-1">Available</div>
                                    </div>
                                </div>
                            </button>
                        </div>

                        {/* Analysis Charts */}
                        <div className="grid grid-cols-2 gap-6 mb-6">
                            {/* Department Usage */}
                            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                                <h3 className="text-sm font-semibold text-gray-900 mb-4">Department Usage vs Allocation</h3>
                                <ResponsiveContainer width="100%" height={280}>
                                    <BarChart data={departmentData}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                                        <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                                        <YAxis tick={{ fontSize: 11 }} />
                                        <Tooltip />
                                        <Bar dataKey="used" name="Used" fill="#ef4444" radius={[4, 4, 0, 0]} />
                                        <Bar dataKey="allocated" name="Allocated" fill="#e5e7eb" radius={[4, 4, 0, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                                <div className="text-xs text-gray-500 mt-2 text-center">
                                    Top 5 departments by volume. Emergency Department shows highest utilization.
                                </div>
                            </div>

                            {/* Blood Type Distribution */}
                            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                                <h3 className="text-sm font-semibold text-gray-900 mb-4">Blood Type Inventory Levels</h3>
                                <ResponsiveContainer width="100%" height={280}>
                                    <BarChart data={bloodTypeData}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                                        <XAxis dataKey="type" tick={{ fontSize: 11 }} />
                                        <YAxis tick={{ fontSize: 11 }} />
                                        <Tooltip />
                                        <Bar dataKey="current" fill="#ef4444" radius={[4, 4, 0, 0]}>
                                            {bloodTypeData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.status === 'critical' ? '#ef4444' : entry.status === 'low' ? '#f59e0b' : '#10b981'} />
                                            ))}
                                        </Bar>
                                        <Bar dataKey="target" fill="#e5e7eb" radius={[4, 4, 0, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                                <div className="flex items-center justify-center gap-4 mt-2 text-xs">
                                    <div className="flex items-center gap-1">
                                        <div className="w-3 h-3 rounded-full bg-emerald-500" />
                                        <span className="text-gray-600">Healthy</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <div className="w-3 h-3 rounded-full bg-orange-500" />
                                        <span className="text-gray-600">Low</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <div className="w-3 h-3 rounded-full bg-red-500" />
                                        <span className="text-gray-600">Critical</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Hospital Network & Map */}
                        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                            <div className="grid grid-cols-[30%_70%] gap-6">
                                {/* Left: Hospital Network List */}
                                <div>
                                    <div className="mb-4">
                                        <h3 className="text-sm font-semibold text-gray-900">Hospital Network</h3>
                                        <p className="text-xs text-gray-500 mt-1">18 Locations</p>
                                    </div>

                                    <div className="space-y-1 pr-2 max-h-[400px] overflow-y-auto">
                                        <div
                                            onClick={() => setSelectedHospitalId(null)}
                                            className={`py-2 px-3 rounded-lg font-medium text-xs cursor-pointer transition-colors ${selectedHospitalId === null ? 'bg-blue-100 text-blue-700' : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                                                }`}
                                        >
                                            All Hospitals
                                        </div>

                                        {transfusionData.hospitals.map((hospital) => (
                                            <div
                                                key={hospital.id}
                                                onClick={() => setSelectedHospitalId(hospital.id)}
                                                className={`py-2 px-3 rounded-lg flex items-center justify-between cursor-pointer transition-colors ${selectedHospitalId === hospital.id ? 'bg-blue-50 border border-blue-200' : 'hover:bg-gray-50'
                                                    }`}
                                            >
                                                <span className={`text-sm ${selectedHospitalId === hospital.id ? 'text-blue-900 font-medium' : 'text-gray-700'
                                                    }`}>
                                                    {hospital.name}
                                                </span>
                                                <div className="w-2 h-2 rounded-full bg-red-500" />
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Right: Map Visualization */}
                                <div className="relative bg-gray-100 rounded-2xl overflow-hidden" style={{ minHeight: '450px' }}>
                                    {/* Map background image */}
                                    <div className="absolute inset-0">
                                        <img src="/map.png" alt="Hospital Network Map" className="w-full h-full object-cover opacity-40" />
                                    </div>

                                    {/* Hospital location markers */}
                                    <div className="absolute inset-0">
                                        {/* Top cluster */}
                                        <div className="absolute top-[15%] left-[55%] w-3 h-3 rounded-full bg-red-500 shadow-lg animate-pulse" />
                                        <div className="absolute top-[18%] left-[58%] w-3 h-3 rounded-full bg-red-500 shadow-lg" />
                                        <div className="absolute top-[12%] left-[62%] w-3 h-3 rounded-full bg-red-500 shadow-lg" />

                                        {/* Middle-left cluster */}
                                        <div className="absolute top-[40%] left-[35%] w-3 h-3 rounded-full bg-red-500 shadow-lg" />
                                        <div className="absolute top-[42%] left-[38%] w-3 h-3 rounded-full bg-red-500 shadow-lg animate-pulse" />
                                        <div className="absolute top-[45%] left-[33%] w-3 h-3 rounded-full bg-red-500 shadow-lg" />

                                        {/* Center cluster */}
                                        <div className="absolute top-[50%] left-[50%] w-3 h-3 rounded-full bg-red-500 shadow-lg" />
                                        <div className="absolute top-[48%] left-[52%] w-3 h-3 rounded-full bg-red-500 shadow-lg" />
                                        <div className="absolute top-[53%] left-[48%] w-3 h-3 rounded-full bg-red-500 shadow-lg animate-pulse" />
                                        <div className="absolute top-[52%] left-[54%] w-3 h-3 rounded-full bg-red-500 shadow-lg" />

                                        {/* Right cluster */}
                                        <div className="absolute top-[35%] left-[70%] w-3 h-3 rounded-full bg-red-500 shadow-lg" />
                                        <div className="absolute top-[38%] left-[72%] w-3 h-3 rounded-full bg-red-500 shadow-lg" />
                                        <div className="absolute top-[40%] left-[75%] w-3 h-3 rounded-full bg-red-500 shadow-lg animate-pulse" />

                                        {/* Bottom cluster */}
                                        <div className="absolute top-[65%] left-[45%] w-3 h-3 rounded-full bg-red-500 shadow-lg" />
                                        <div className="absolute top-[68%] left-[48%] w-3 h-3 rounded-full bg-red-500 shadow-lg" />
                                        <div className="absolute top-[70%] left-[52%] w-3 h-3 rounded-full bg-red-500 shadow-lg" />

                                        {/* Additional scattered markers */}
                                        <div className="absolute top-[25%] left-[45%] w-3 h-3 rounded-full bg-red-500 shadow-lg" />
                                        <div className="absolute top-[60%] left-[65%] w-3 h-3 rounded-full bg-red-500 shadow-lg" />
                                    </div>

                                    {/* Map overlay info */}
                                    <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-xl px-4 py-2 shadow-lg">
                                        <div className="text-xs text-gray-600">Total Coverage</div>
                                        <div className="text-lg font-semibold text-gray-900">18 Hospitals</div>
                                    </div>
                                </div>
                            </div>

                            {/* Summary Statistics Cards */}
                            {/* Summary Statistics Cards */}
                            <div className="grid grid-cols-5 gap-4 mt-6">
                                {/* Total Blood Bags */}
                                <button
                                    onClick={() => handleKPIClick('Total Blood Bags', hospitalStats.totalBloodBags.toLocaleString())}
                                    className="bg-gray-50 rounded-xl p-4 hover:bg-white hover:shadow-md transition-all text-left group relative overflow-hidden"
                                >
                                    <div className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Sparkles className="w-3 h-3 text-purple-600" />
                                    </div>
                                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">Total Blood Bags</div>
                                    <div className="text-3xl font-semibold text-gray-900">{hospitalStats.totalBloodBags.toLocaleString()}</div>
                                </button>

                                {/* Departments */}
                                <div className="bg-gray-50 rounded-xl p-4">
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="text-xs text-gray-500 uppercase tracking-wider">Departments</div>
                                        <div className="w-2 h-2 rounded-full bg-emerald-500" />
                                    </div>
                                    <div className="text-3xl font-semibold text-gray-900">{hospitalStats.departments}</div>
                                </div>

                                {/* Cold Storages */}
                                <button
                                    onClick={() => handleKPIClick('Cold Storages', hospitalStats.coldStorages.toString())}
                                    className="bg-gray-50 rounded-xl p-4 hover:bg-white hover:shadow-md transition-all text-left group relative overflow-hidden"
                                >
                                    <div className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Sparkles className="w-3 h-3 text-purple-600" />
                                    </div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="text-xs text-gray-500 uppercase tracking-wider">Cold Storages</div>
                                        <div className="w-2 h-2 rounded-full bg-orange-500" />
                                    </div>
                                    <div className="text-3xl font-semibold text-gray-900">{hospitalStats.coldStorages}</div>
                                </button>

                                {/* Active Alerts */}
                                <button
                                    onClick={() => handleKPIClick('Active Alerts', hospitalStats.activeAlerts.toString())}
                                    className="bg-gray-50 rounded-xl p-4 hover:bg-white hover:shadow-md transition-all text-left group relative overflow-hidden"
                                >
                                    <div className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Sparkles className="w-3 h-3 text-purple-600" />
                                    </div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="text-xs text-gray-500 uppercase tracking-wider">Active Alerts</div>
                                        <AlertTriangle className="w-3 h-3 text-red-500" />
                                    </div>
                                    <div className="text-3xl font-semibold text-gray-900">{hospitalStats.activeAlerts}</div>
                                </button>

                                {/* Avg Temp */}
                                <button
                                    onClick={() => handleKPIClick('Avg Temp', `${hospitalStats.avgTemp}°C`)}
                                    className="bg-gray-50 rounded-xl p-4 hover:bg-white hover:shadow-md transition-all text-left group relative overflow-hidden"
                                >
                                    <div className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Sparkles className="w-3 h-3 text-purple-600" />
                                    </div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="text-xs text-gray-500 uppercase tracking-wider">Avg Temp</div>
                                        <div className="w-2 h-2 rounded-full bg-blue-500" />
                                    </div>
                                    <div className="text-3xl font-semibold text-gray-900">{hospitalStats.avgTemp}°C</div>
                                </button>
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
                                        <h3 className="text-lg font-bold text-gray-900">AI Predictive Modeling</h3>
                                        <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-700 border border-indigo-200">
                                            New Insight
                                        </span>
                                    </div>
                                    <p className="text-gray-600 leading-relaxed text-lg">
                                        Forecasts a <span className="font-semibold text-indigo-700">critical shortage of O- blood</span> within 48 hours due to scheduled high-risk surgeries.
                                        Recommendation: Initiate emergency procurement from regional blood bank immediately.
                                    </p>
                                    <div className="mt-6 flex items-center gap-4">
                                        <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-xl transition-colors shadow-sm shadow-indigo-200">
                                            View Procurement Plan
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
                            {/* Action Card: Critical Stock */}
                            <button
                                onClick={() => setTier3Category('blood-bags')}
                                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-left hover:shadow-md transition-shadow cursor-pointer group"
                            >
                                <div className="flex items-start justify-between mb-3">
                                    <div className="p-2 bg-red-100 rounded-lg group-hover:bg-red-200 transition-colors">
                                        <Droplet className="w-5 h-5 text-red-600" />
                                    </div>
                                    <span className="text-xs font-semibold text-red-600 bg-red-100 px-2 py-1 rounded-full">Critical</span>
                                </div>
                                <div className="text-3xl font-semibold text-gray-900 mb-1">280</div>
                                <div className="text-sm font-medium text-gray-700 mb-2">Critical Stock Level</div>
                                <div className="text-xs text-gray-500">A- Type below safety threshold. Click to view procurement plan.</div>
                            </button>

                            {/* Action Card: Department Usage */}
                            <button
                                onClick={() => setTier3Category('departments')}
                                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-left hover:shadow-md transition-shadow cursor-pointer group"
                            >
                                <div className="flex items-start justify-between mb-3">
                                    <div className="p-2 bg-orange-100 rounded-lg group-hover:bg-orange-200 transition-colors">
                                        <TrendingUp className="w-5 h-5 text-orange-600" />
                                    </div>
                                    <span className="text-xs font-semibold text-orange-600 bg-orange-100 px-2 py-1 rounded-full">Action Needed</span>
                                </div>
                                <div className="text-3xl font-semibold text-gray-900 mb-1">3,850</div>
                                <div className="text-sm font-medium text-gray-700 mb-2">High Usage Alert</div>
                                <div className="text-xs text-gray-500">Emergency Dept usage +42%. Click to view demand forecast.</div>
                            </button>

                            {/* Action Card: Cold Chain */}
                            <button
                                onClick={() => setTier3Category('cold-storage')}
                                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-left hover:shadow-md transition-shadow cursor-pointer group"
                            >
                                <div className="flex items-start justify-between mb-3">
                                    <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                                        <Thermometer className="w-5 h-5 text-blue-600" />
                                    </div>
                                    <span className="text-xs font-semibold text-blue-600 bg-blue-100 px-2 py-1 rounded-full">Monitor</span>
                                </div>
                                <div className="text-3xl font-semibold text-gray-900 mb-1">24</div>
                                <div className="text-sm font-medium text-gray-700 mb-2">Temp Excursions</div>
                                <div className="text-xs text-gray-500">Cold chain deviations detected. Click for impact analysis.</div>
                            </button>

                            {/* Action Card: Chain of Custody */}
                            <button
                                onClick={() => setTier3Category('alerts')}
                                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-left hover:shadow-md transition-shadow cursor-pointer group"
                            >
                                <div className="flex items-start justify-between mb-3">
                                    <div className="p-2 bg-yellow-100 rounded-lg group-hover:bg-yellow-200 transition-colors">
                                        <Activity className="w-5 h-5 text-yellow-600" />
                                    </div>
                                    <span className="text-xs font-semibold text-yellow-600 bg-yellow-100 px-2 py-1 rounded-full">Optimize</span>
                                </div>
                                <div className="text-3xl font-semibold text-gray-900 mb-1">1,017</div>
                                <div className="text-sm font-medium text-gray-700 mb-2">Custody Gaps</div>
                                <div className="text-xs text-gray-500">Tracking gaps in last 30 days. Click for compliance report.</div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tier 3 Modal */}
            {tier3Category && (
                <TransfusionTier3
                    category={tier3Category}
                    onClose={() => setTier3Category(null)}
                />
            )}

            {/* AI Side Panel */}
            <AISidePanel
                isOpen={aiPanelOpen}
                onClose={() => setAiPanelOpen(false)}
                title={aiContext.title}
                metricValue={aiContext.value}
                context={aiContext.type}
            />
        </>
    )
}
