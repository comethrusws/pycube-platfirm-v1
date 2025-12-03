'use client'

import { useState } from 'react'
import { ChevronDown, AlertTriangle, TrendingUp, Package, DollarSign, Clock, Thermometer, ArrowUpRight, ArrowDownRight } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend, BarChart, Bar } from 'recharts'
import { SupplyChainTier3 } from './supply-chain-tier-3'
import { supplyChainData } from '@/lib/data'

interface SupplyChainDetailProps {
    isOpen: boolean
    onClose: () => void
}

// Inventory trend data (last 12 weeks)
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

// ABC analysis data
const abcData = [
    { name: 'Category A (High Value)', value: 18, color: '#ef4444' },
    { name: 'Category B (Medium)', value: 23, color: '#f59e0b' },
    { name: 'Category C (Low Value)', value: 59, color: '#10b981' },
]

// Vendor performance data
const vendorPerformanceData = [
    { vendor: 'Medico Supplies', onTime: 92, quality: 95, issues: 2 },
    { vendor: 'Ultramed Labs', onTime: 88, quality: 91, issues: 4 },
    { vendor: 'PharmaCorp', onTime: 85, quality: 89, issues: 3 },
    { vendor: 'MediEquip Inc', onTime: 90, quality: 94, issues: 1 },
    { vendor: 'LabTech Solutions', onTime: 87, quality: 90, issues: 5 },
]

// Cost trend data
const costTrendData = [
    { month: 'Jul', spend: 4.9, budget: 5.5 },
    { month: 'Aug', spend: 5.2, budget: 5.5 },
    { month: 'Sep', spend: 5.1, budget: 5.5 },
    { month: 'Oct', spend: 5.3, budget: 5.5 },
    { month: 'Nov', spend: 5.2, budget: 5.5 },
]

// Temperature compliance data
const temperatureData = [
    { location: 'Pharmacy Fridge-1', temp: 3.4, status: 'ok', compliance: 99 },
    { location: 'Pharmacy Fridge-2', temp: 3.1, status: 'ok', compliance: 99 },
    { location: 'Lab Cold Storage-1', temp: 2.8, status: 'ok', compliance: 98 },
    { location: 'Blood Bank Fridge-4', temp: 6.8, status: 'critical', compliance: 72 },
    { location: 'Vaccine Storage-1', temp: 4.2, status: 'ok', compliance: 97 },
]

export function SupplyChainDetail({ isOpen, onClose }: SupplyChainDetailProps) {
    const [activeTab, setActiveTab] = useState('Inventory Status')
    const [activeTier3Category, setActiveTier3Category] = useState<string | null>(null)

    if (!isOpen) return null

    return (
        <>
            <div className="bg-gray-50 border-t border-b border-gray-200 py-8 animate-in slide-in-from-top duration-300">
                <div className="max-w-7xl mx-auto px-8">
                    {/* Breadcrumbs & Header */}
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <div className="text-sm text-gray-500 mb-1">Dashboard {'>'} Supply Chain</div>
                            <h2 className="text-2xl font-semibold text-gray-900">Supply Chain Management Overview</h2>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                        >
                            <ChevronDown className="w-5 h-5 text-gray-600" />
                        </button>
                    </div>

                    {/* TIER 2: ANALYZE - Performance Insights */}
                    <div className="mb-8">
                        <div className="flex items-center gap-2 mb-6">
                            <div className="h-px bg-gradient-to-r from-blue-500 to-transparent flex-1" />
                            <h3 className="text-sm font-semibold text-blue-700 uppercase tracking-wider">Tier 2: Analyze - Supply Chain Performance</h3>
                            <div className="h-px bg-gradient-to-l from-blue-500 to-transparent flex-1" />
                        </div>

                    {/* Section 1: KPIs at a Glance */}
                    <div className="grid grid-cols-4 gap-6 mb-8">
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                            <div className="text-sm font-medium text-gray-500 mb-2">Health Score</div>
                            <div className="flex items-baseline gap-2">
                                <span className="text-4xl font-semibold text-gray-900">{supplyChainData.summary.healthScore}%</span>
                                <span className="text-sm font-medium text-emerald-600 flex items-center">
                                    <ArrowUpRight className="w-4 h-4 mr-0.5" />
                                    +{supplyChainData.summary.trendChange}% this month
                                </span>
                            </div>
                        </div>
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                            <div className="text-sm font-medium text-gray-500 mb-2">Monthly Spend</div>
                            <div className="flex items-baseline gap-2">
                                <span className="text-4xl font-semibold text-gray-900">${(supplyChainData.summary.monthlySpend / 1000000).toFixed(1)}M</span>
                                <span className="text-sm font-medium text-orange-600 flex items-center">
                                    <ArrowUpRight className="w-4 h-4 mr-0.5" />
                                    +{supplyChainData.summary.spendChange}%
                                </span>
                            </div>
                        </div>
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                            <div className="text-sm font-medium text-gray-500 mb-2">Critical Item Availability</div>
                            <div className="flex items-baseline gap-2">
                                <span className="text-4xl font-semibold text-gray-900">{supplyChainData.summary.criticalAvailability}%</span>
                                <span className="text-sm font-medium text-emerald-600 flex items-center">
                                    <ArrowUpRight className="w-4 h-4 mr-0.5" />
                                    Stable
                                </span>
                            </div>
                        </div>
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                            <div className="text-sm font-medium text-gray-500 mb-2">Wastage Index</div>
                            <div className="space-y-1">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-900 font-medium">{supplyChainData.summary.wastageIndex}% wastage</span>
                                    <span className="text-gray-500">Target: {supplyChainData.summary.wastageTarget}%</span>
                                </div>
                                <div className="w-full bg-gray-100 rounded-full h-2">
                                    <div className="bg-emerald-500 h-2 rounded-full" style={{ width: `${(supplyChainData.summary.wastageIndex / supplyChainData.summary.wastageTarget) * 10}%` }} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Tab Navigation */}
                    <div className="flex gap-2 mb-6 border-b border-gray-200 overflow-x-auto">
                        {['Inventory Status', 'Procurement', 'Cost Analytics', 'Cold Chain'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${activeTab === tab
                                    ? 'border-blue-600 text-blue-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    {/* Tab Content */}
                    <div className="space-y-6">
                        {activeTab === 'Inventory Status' && (
                            <>
                                {/* Charts */}
                                <div className="grid grid-cols-3 gap-6">
                                    {/* Availability Trend */}
                                    <div className="col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100 min-h-[300px] flex flex-col">
                                        <h3 className="text-sm font-semibold text-gray-900 mb-4">Item Availability Trend (12 weeks)</h3>
                                        <div className="flex-1 w-full h-[250px]">
                                            <ResponsiveContainer width="100%" height="100%">
                                                <LineChart data={inventoryTrendData}>
                                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                                                    <XAxis
                                                        dataKey="week"
                                                        axisLine={false}
                                                        tickLine={false}
                                                        tick={{ fill: '#9ca3af', fontSize: 12 }}
                                                        dy={10}
                                                    />
                                                    <YAxis
                                                        axisLine={false}
                                                        tickLine={false}
                                                        tick={{ fill: '#9ca3af', fontSize: 12 }}
                                                        domain={[85, 100]}
                                                        tickFormatter={(value) => `${value}%`}
                                                    />
                                                    <Tooltip
                                                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                                        formatter={(value: number, name: string) => [`${value}%`, name === 'availability' ? 'Availability' : 'Stockouts']}
                                                    />
                                                    <Line
                                                        type="monotone"
                                                        dataKey="availability"
                                                        stroke="#10b981"
                                                        strokeWidth={3}
                                                        dot={{ fill: '#10b981', strokeWidth: 2, r: 4, stroke: '#fff' }}
                                                        activeDot={{ r: 6, strokeWidth: 0 }}
                                                    />
                                                </LineChart>
                                            </ResponsiveContainer>
                                        </div>
                                    </div>

                                    {/* ABC Analysis Pie Chart */}
                                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 min-h-[300px] flex flex-col">
                                        <h3 className="text-sm font-semibold text-gray-900 mb-4">ABC Inventory Analysis</h3>
                                        <div className="flex-1 w-full h-[250px]">
                                            <ResponsiveContainer width="100%" height="100%">
                                                <PieChart>
                                                    <Pie
                                                        data={abcData}
                                                        cx="50%"
                                                        cy="50%"
                                                        innerRadius={60}
                                                        outerRadius={80}
                                                        paddingAngle={5}
                                                        dataKey="value"
                                                    >
                                                        {abcData.map((entry, index) => (
                                                            <Cell key={`cell-${index}`} fill={entry.color} strokeWidth={0} />
                                                        ))}
                                                    </Pie>
                                                    <Tooltip
                                                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                                        formatter={(value: number) => [`${value}%`, '']}
                                                    />
                                                    <Legend
                                                        verticalAlign="bottom"
                                                        height={36}
                                                        iconType="circle"
                                                        formatter={(value, entry: any) => <span className="text-xs text-gray-600 ml-1">{value}</span>}
                                                    />
                                                </PieChart>
                                            </ResponsiveContainer>
                                        </div>
                                    </div>
                                </div>

                                {/* Inventory Summary Cards */}
                                <div className="grid grid-cols-4 gap-6">
                                    <button
                                        onClick={() => setActiveTier3Category('high-risk-items')}
                                        className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all text-left group"
                                    >
                                        <div className="flex items-center justify-between mb-4">
                                            <AlertTriangle className="w-5 h-5 text-orange-500" />
                                            <span className="text-xs font-medium text-orange-600">Action Needed</span>
                                        </div>
                                        <div className="text-3xl font-semibold text-gray-900 mb-1">14</div>
                                        <div className="text-sm text-gray-500">High Risk Items</div>
                                    </button>

                                    <button
                                        onClick={() => setActiveTier3Category('expiring-items')}
                                        className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all text-left group"
                                    >
                                        <div className="flex items-center justify-between mb-4">
                                            <Clock className="w-5 h-5 text-red-500" />
                                            <span className="text-xs font-medium text-red-600">Urgent</span>
                                        </div>
                                        <div className="text-3xl font-semibold text-gray-900 mb-1">312</div>
                                        <div className="text-sm text-gray-500">Units Expiring (30d)</div>
                                    </button>

                                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                                        <div className="flex items-center justify-between mb-4">
                                            <Package className="w-5 h-5 text-blue-500" />
                                        </div>
                                        <div className="text-3xl font-semibold text-gray-900 mb-1">22</div>
                                        <div className="text-sm text-gray-500">Avg Days on Hand</div>
                                    </div>

                                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                                        <div className="flex items-center justify-between mb-4">
                                            <TrendingUp className="w-5 h-5 text-emerald-500" />
                                        </div>
                                        <div className="text-3xl font-semibold text-gray-900 mb-1">94%</div>
                                        <div className="text-sm text-gray-500">Fast Movers Fill Rate</div>
                                    </div>
                                </div>
                            </>
                        )}

                        {activeTab === 'Procurement' && (
                            <>
                                {/* Procurement Metrics */}
                                <div className="grid grid-cols-4 gap-6 mb-6">
                                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                                        <div className="text-sm font-medium text-gray-500 mb-2">PO Cycle Time</div>
                                        <div className="text-3xl font-semibold text-gray-900">3.2d</div>
                                        <div className="text-xs text-emerald-600 mt-1">-0.5d vs last month</div>
                                    </div>
                                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                                        <div className="text-sm font-medium text-gray-500 mb-2">On-Time Delivery</div>
                                        <div className="text-3xl font-semibold text-gray-900">88%</div>
                                        <div className="text-xs text-orange-600 mt-1">-2% vs target</div>
                                    </div>
                                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                                        <div className="text-sm font-medium text-gray-500 mb-2">Contract Compliance</div>
                                        <div className="text-3xl font-semibold text-gray-900">91%</div>
                                        <div className="text-xs text-emerald-600 mt-1">+1% improvement</div>
                                    </div>
                                    <button
                                        onClick={() => setActiveTier3Category('vendor-issues')}
                                        className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all text-left"
                                    >
                                        <div className="text-sm font-medium text-gray-500 mb-2">Vendor Issues</div>
                                        <div className="text-3xl font-semibold text-gray-900">7</div>
                                        <div className="text-xs text-orange-600 mt-1">This month</div>
                                    </button>
                                </div>

                                {/* Vendor Performance Table */}
                                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                                    <h3 className="text-sm font-semibold text-gray-900 mb-4">Vendor Performance</h3>
                                    <table className="w-full">
                                        <thead>
                                            <tr className="border-b border-gray-100">
                                                <th className="text-left py-3 px-2 text-xs font-semibold text-gray-500 uppercase">Vendor</th>
                                                <th className="text-right py-3 px-2 text-xs font-semibold text-gray-500 uppercase">On-Time %</th>
                                                <th className="text-right py-3 px-2 text-xs font-semibold text-gray-500 uppercase">Quality %</th>
                                                <th className="text-right py-3 px-2 text-xs font-semibold text-gray-500 uppercase">Issues</th>
                                                <th className="text-left py-3 px-2 text-xs font-semibold text-gray-500 uppercase">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {vendorPerformanceData.map((vendor, idx) => (
                                                <tr key={idx} className="border-b border-gray-50 hover:bg-gray-50">
                                                    <td className="py-3 px-2 text-sm font-medium text-gray-900">{vendor.vendor}</td>
                                                    <td className="py-3 px-2 text-right">
                                                        <span className={`text-sm font-semibold ${vendor.onTime >= 90 ? 'text-emerald-600' : 'text-orange-600'}`}>
                                                            {vendor.onTime}%
                                                        </span>
                                                    </td>
                                                    <td className="py-3 px-2 text-right">
                                                        <span className={`text-sm font-semibold ${vendor.quality >= 93 ? 'text-emerald-600' : 'text-orange-600'}`}>
                                                            {vendor.quality}%
                                                        </span>
                                                    </td>
                                                    <td className="py-3 px-2 text-right">
                                                        <span className={`text-sm font-semibold ${vendor.issues <= 2 ? 'text-gray-400' : 'text-orange-600'}`}>
                                                            {vendor.issues}
                                                        </span>
                                                    </td>
                                                    <td className="py-3 px-2">
                                                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${vendor.onTime >= 90 && vendor.issues <= 2
                                                            ? 'bg-emerald-50 text-emerald-700'
                                                            : 'bg-orange-50 text-orange-700'
                                                            }`}>
                                                            <div className={`w-1.5 h-1.5 rounded-full ${vendor.onTime >= 90 && vendor.issues <= 2 ? 'bg-emerald-500' : 'bg-orange-500'
                                                                }`}></div>
                                                            {vendor.onTime >= 90 && vendor.issues <= 2 ? 'Good' : 'Review'}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </>
                        )}

                        {activeTab === 'Cost Analytics' && (
                            <>
                                <div className="grid grid-cols-2 gap-6">
                                    {/* Cost Trend */}
                                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                                        <h3 className="text-sm font-semibold text-gray-900 mb-4">Monthly Spend Trend</h3>
                                        <ResponsiveContainer width="100%" height={250}>
                                            <BarChart data={costTrendData}>
                                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                                                <XAxis dataKey="month" stroke="#9ca3af" style={{ fontSize: '12px' }} />
                                                <YAxis stroke="#9ca3af" style={{ fontSize: '12px' }} tickFormatter={(value) => `$${value}M`} />
                                                <Tooltip />
                                                <Legend iconType="square" wrapperStyle={{ fontSize: '12px' }} />
                                                <Bar dataKey="spend" fill="#3b82f6" name="Actual Spend" radius={[4, 4, 0, 0]} />
                                                <Bar dataKey="budget" fill="#cbd5e1" name="Budget" radius={[4, 4, 0, 0]} />
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </div>

                                    {/* Cost Summary */}
                                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                                        <h3 className="text-sm font-semibold text-gray-900 mb-4">Cost Breakdown</h3>
                                        <div className="space-y-4">
                                            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                                <div>
                                                    <div className="text-sm font-medium text-gray-900">Wastage Cost (YTD)</div>
                                                    <div className="text-xs text-gray-500">Expired + Damaged items</div>
                                                </div>
                                                <div className="text-lg font-semibold text-red-600">$28.4K</div>
                                            </div>
                                            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                                <div>
                                                    <div className="text-sm font-medium text-gray-900">Price Variance</div>
                                                    <div className="text-xs text-gray-500">Contract vs actual</div>
                                                </div>
                                                <div className="text-lg font-semibold text-orange-600">+3.4%</div>
                                            </div>
                                            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                                <div>
                                                    <div className="text-sm font-medium text-gray-900">Avg Lead Time</div>
                                                    <div className="text-xs text-gray-500">Order to delivery</div>
                                                </div>
                                                <div className="text-lg font-semibold text-gray-900">4.8d</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}

                        {activeTab === 'Cold Chain' && (
                            <>
                                {/* Temperature Compliance */}
                                <div className="grid grid-cols-3 gap-6 mb-6">
                                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                                        <div className="text-sm font-medium text-gray-500 mb-2">Overall Compliance</div>
                                        <div className="text-3xl font-semibold text-gray-900">97%</div>
                                        <div className="text-xs text-emerald-600 mt-1">Within acceptable range</div>
                                    </div>
                                    <button
                                        onClick={() => setActiveTier3Category('temp-alerts')}
                                        className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all text-left"
                                    >
                                        <div className="text-sm font-medium text-gray-500 mb-2">Active Alerts</div>
                                        <div className="text-3xl font-semibold text-gray-900">1</div>
                                        <div className="text-xs text-red-600 mt-1">Fridge-4 out of range</div>
                                    </button>
                                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                                        <div className="text-sm font-medium text-gray-500 mb-2">Monitored Units</div>
                                        <div className="text-3xl font-semibold text-gray-900">5</div>
                                        <div className="text-xs text-gray-500 mt-1">Active cold storage</div>
                                    </div>
                                </div>

                                {/* Temperature Log Table */}
                                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                                    <h3 className="text-sm font-semibold text-gray-900 mb-4">Temperature Monitoring</h3>
                                    <table className="w-full">
                                        <thead>
                                            <tr className="border-b border-gray-100">
                                                <th className="text-left py-3 px-2 text-xs font-semibold text-gray-500 uppercase">Location</th>
                                                <th className="text-right py-3 px-2 text-xs font-semibold text-gray-500 uppercase">Current Temp</th>
                                                <th className="text-right py-3 px-2 text-xs font-semibold text-gray-500 uppercase">Compliance (7d)</th>
                                                <th className="text-left py-3 px-2 text-xs font-semibold text-gray-500 uppercase">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {temperatureData.map((item, idx) => (
                                                <tr key={idx} className="border-b border-gray-50 hover:bg-gray-50">
                                                    <td className="py-3 px-2 text-sm font-medium text-gray-900">{item.location}</td>
                                                    <td className="py-3 px-2 text-right">
                                                        <span className={`text-sm font-semibold ${item.status === 'ok' ? 'text-gray-900' : 'text-red-600'}`}>
                                                            {item.temp}°C
                                                        </span>
                                                    </td>
                                                    <td className="py-3 px-2 text-right">
                                                        <span className={`text-sm font-semibold ${item.compliance >= 95 ? 'text-emerald-600' : 'text-red-600'}`}>
                                                            {item.compliance}%
                                                        </span>
                                                    </td>
                                                    <td className="py-3 px-2">
                                                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${item.status === 'ok'
                                                            ? 'bg-emerald-50 text-emerald-700'
                                                            : 'bg-red-50 text-red-700'
                                                            }`}>
                                                            <div className={`w-1.5 h-1.5 rounded-full ${item.status === 'ok' ? 'bg-emerald-500' : 'bg-red-500'
                                                                }`}></div>
                                                            {item.status === 'ok' ? 'Stable' : 'Out of Range'}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </>
                        )}
                    </div>
                    </div>

                    {/* TIER 3: OPTIMIZE - Recommended Actions */}
                    <div className="mb-8">
                        <div className="flex items-center gap-2 mb-6">
                            <div className="h-px bg-gradient-to-r from-purple-500 to-transparent flex-1" />
                            <h3 className="text-sm font-semibold text-purple-700 uppercase tracking-wider">Tier 3: Optimize - AI-Driven Recommendations</h3>
                            <div className="h-px bg-gradient-to-l from-purple-500 to-transparent flex-1" />
                        </div>

                    {/* AI Insights */}
                    <div className="bg-blue-50/50 rounded-2xl p-6 border border-blue-100">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
                            <h3 className="text-sm font-semibold text-blue-900">AI INSIGHTS</h3>
                        </div>
                        <div className="space-y-3">
                            <div className="flex items-start justify-between bg-white p-4 rounded-xl shadow-sm border border-blue-100/50">
                                <div className="flex gap-3">
                                    <div className="mt-0.5">
                                        <AlertTriangle className="w-5 h-5 text-orange-500" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-900 font-medium">312 units expiring in 30 days worth $42K. Prioritize distribution or adjust ordering patterns.</p>
                                    </div>
                                </div>
                                <button className="text-sm font-medium text-blue-600 hover:text-blue-700 whitespace-nowrap">Apply</button>
                            </div>
                            <div className="flex items-start justify-between bg-white p-4 rounded-xl shadow-sm border border-blue-100/50">
                                <div className="flex gap-3">
                                    <div className="mt-0.5">
                                        <DollarSign className="w-5 h-5 text-emerald-500" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-900 font-medium">Consolidate orders from 3 vendors to 2 to save $18K annually through volume discounts.</p>
                                    </div>
                                </div>
                                <button className="text-sm font-medium text-blue-600 hover:text-blue-700 whitespace-nowrap">View Details</button>
                            </div>
                            <div className="flex items-start justify-between bg-white p-4 rounded-xl shadow-sm border border-blue-100/50">
                                <div className="flex gap-3">
                                    <div className="mt-0.5">
                                        <Thermometer className="w-5 h-5 text-red-500" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-900 font-medium">Blood Bank Fridge-4 showing temperature instability. Schedule technician visit to prevent inventory loss.</p>
                                    </div>
                                </div>
                                <button className="text-sm font-medium text-blue-600 hover:text-blue-700 whitespace-nowrap">Schedule</button>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>

            {/* Tier 3 Overlay */}
            {activeTier3Category && (
                <SupplyChainTier3
                    category={activeTier3Category}
                    onClose={() => setActiveTier3Category(null)}
                />
            )}
        </>
    )
}
