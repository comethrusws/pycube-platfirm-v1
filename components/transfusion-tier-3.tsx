'use client'

import { X, ArrowLeft, AlertTriangle, Thermometer, Snowflake, Building2, Droplet, Clock, CheckCircle2, AlertCircle } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area } from 'recharts'

interface TransfusionTier3Props {
    category: string
    onClose: () => void
}

// Mock Data for Charts
const bloodInventoryData = [
    { name: 'RBC', available: 22, inTransit: 4, nearExpiry: 0 },
    { name: 'FFP', available: 15, inTransit: 0, nearExpiry: 0 },
    { name: 'Platelets', available: 8, inTransit: 2, nearExpiry: 0 },
    { name: 'Cryo', available: 45, inTransit: 1, nearExpiry: 0 },
    { name: 'Plasma', available: 12, inTransit: 2, nearExpiry: 0 },
]

const departmentUsageData = [
    { name: 'Emergency', usage: 1.0 },
    { name: 'Surgery', usage: 0.95 },
    { name: 'Oncology', usage: 0.05 },
    { name: 'ICU', usage: 0.02 },
    { name: 'Labor & Delivery', usage: 0.01 },
    { name: 'Cardiology', usage: 0.01 },
    { name: 'Neurology', usage: 0.01 },
    { name: 'Pediatrics', usage: 0.01 },
    { name: 'Orthopedics', usage: 0.01 },
    { name: 'Maternity', usage: 0.01 },
]

const coldStorageData = [
    { name: 'Main Hospital', freezers: 6, departments: 15, bags: 40 },
    { name: 'Bloomfield', freezers: 4, departments: 8, bags: 25 },
    { name: 'Macomb', freezers: 5, departments: 7, bags: 28 },
    { name: 'Wyandotte', freezers: 3, departments: 5, bags: 18 },
    { name: 'Troy', freezers: 4, departments: 6, bags: 22 },
    { name: 'Seating', freezers: 2, departments: 3, bags: 12 },
    { name: 'St. John', freezers: 5, departments: 9, bags: 35 },
    { name: 'Jackson', freezers: 3, departments: 4, bags: 15 },
    { name: 'Genesys', freezers: 4, departments: 6, bags: 20 },
]

const orderStatusData = [
    { name: 'Fulfilled Orders', value: 40, color: '#10b981' },
    { name: 'Pending Orders', value: 60, color: '#fbbf24' },
    { name: 'Orders (Last 30 Days)', value: 0, color: '#3b82f6' },
]

export function TransfusionTier3({ category, onClose }: TransfusionTier3Props) {

    const renderContent = () => {
        switch (category) {
            case 'blood-bags':
                return (
                    <div className="space-y-6">
                        <div className="grid grid-cols-2 gap-6">
                            {/* Blood Component Breakdown */}
                            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                                        <Droplet className="w-5 h-5 text-red-500" />
                                        Blood Component Inventory Status
                                    </h3>
                                </div>
                                <div className="h-[300px]">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={bloodInventoryData}>
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} dy={10} />
                                            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} />
                                            <Tooltip cursor={{ fill: '#f9fafb' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                                            <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
                                            <Bar dataKey="available" name="Available" fill="#22c55e" radius={[4, 4, 0, 0]} barSize={30} />
                                            <Bar dataKey="inTransit" name="In Transit" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={30} />
                                            <Bar dataKey="nearExpiry" name="Near Expiry" fill="#f59e0b" radius={[4, 4, 0, 0]} barSize={30} />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>

                            {/* Order Status Distribution */}
                            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                                        <Clock className="w-5 h-5 text-blue-500" />
                                        Order Status Distribution
                                    </h3>
                                </div>
                                <div className="h-[300px] relative">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie
                                                data={orderStatusData}
                                                cx="50%"
                                                cy="50%"
                                                innerRadius={80}
                                                outerRadius={100}
                                                paddingAngle={5}
                                                dataKey="value"
                                            >
                                                {orderStatusData.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={entry.color} strokeWidth={0} />
                                                ))}
                                            </Pie>
                                            <Tooltip />
                                            <Legend verticalAlign="bottom" height={36} iconType="circle" />
                                        </PieChart>
                                    </ResponsiveContainer>
                                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none pb-12">
                                        <span className="text-4xl font-bold text-gray-900">100%</span>
                                        <span className="text-sm text-gray-500">Total Orders</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )

            case 'departments':
                return (
                    <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                                <Building2 className="w-5 h-5 text-gray-700" />
                                Department Usage Breakdown
                            </h3>
                        </div>
                        <div className="h-[400px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={departmentUsageData}>
                                    <defs>
                                        <linearGradient id="colorUsage" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.1} />
                                            <stop offset="95%" stopColor="#f43f5e" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} dy={10} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} />
                                    <Tooltip />
                                    <Area type="monotone" dataKey="usage" stroke="#f43f5e" strokeWidth={3} fillOpacity={1} fill="url(#colorUsage)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                )

            case 'cold-storage':
                return (
                    <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                                <Snowflake className="w-5 h-5 text-blue-500" />
                                Hospital Infrastructure Overview
                            </h3>
                        </div>
                        <div className="h-[400px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={coldStorageData}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} dy={10} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} />
                                    <Tooltip />
                                    <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
                                    <Line type="monotone" dataKey="freezers" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4, fill: '#3b82f6', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 6 }} />
                                    <Line type="monotone" dataKey="departments" stroke="#10b981" strokeWidth={3} dot={{ r: 4, fill: '#10b981', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 6 }} />
                                    <Line type="monotone" dataKey="bags" stroke="#f43f5e" strokeWidth={3} dot={{ r: 4, fill: '#f43f5e', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 6 }} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                )

            case 'alerts':
                return (
                    <div className="grid grid-cols-4 gap-6">
                        {/* Contamination Prevention */}
                        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 border-l-4 border-l-orange-500">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-orange-50 rounded-lg">
                                    <AlertTriangle className="w-6 h-6 text-orange-500" />
                                </div>
                                <h3 className="font-semibold text-gray-900">Contamination Prevention</h3>
                            </div>
                            <div className="flex justify-between items-end">
                                <div>
                                    <p className="text-3xl font-bold text-gray-900">24</p>
                                    <p className="text-xs text-gray-500 mt-1">Active Alerts</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-3xl font-bold text-orange-500">55</p>
                                    <p className="text-xs text-gray-500 mt-1">Expired</p>
                                </div>
                            </div>
                        </div>

                        {/* Chain of Custody */}
                        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 border-l-4 border-l-blue-500">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-blue-50 rounded-lg">
                                    <CheckCircle2 className="w-6 h-6 text-blue-500" />
                                </div>
                                <h3 className="font-semibold text-gray-900">Chain of Custody</h3>
                            </div>
                            <div className="flex justify-between items-end">
                                <div>
                                    <p className="text-3xl font-bold text-gray-900">84.9%</p>
                                    <p className="text-xs text-gray-500 mt-1">Compliance</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-3xl font-bold text-blue-500">52.1%</p>
                                    <p className="text-xs text-gray-500 mt-1">Traceability</p>
                                </div>
                            </div>
                        </div>

                        {/* Inventory Management */}
                        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 border-l-4 border-l-emerald-500">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-emerald-50 rounded-lg">
                                    <Building2 className="w-6 h-6 text-emerald-500" />
                                </div>
                                <h3 className="font-semibold text-gray-900">Inventory Management</h3>
                            </div>
                            <div className="flex justify-between items-end">
                                <div>
                                    <p className="text-3xl font-bold text-gray-900">41</p>
                                    <p className="text-xs text-gray-500 mt-1">Available</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-3xl font-bold text-emerald-500">95.2%</p>
                                    <p className="text-xs text-gray-500 mt-1">Accuracy</p>
                                </div>
                            </div>
                        </div>

                        {/* Expiration Alert */}
                        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 border-l-4 border-l-red-500">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-red-50 rounded-lg">
                                    <AlertCircle className="w-6 h-6 text-red-500" />
                                </div>
                                <h3 className="font-semibold text-gray-900">Expiration Alert</h3>
                            </div>
                            <div className="flex justify-between items-end">
                                <div>
                                    <p className="text-3xl font-bold text-gray-900">0</p>
                                    <p className="text-xs text-gray-500 mt-1">Nearing Expiry</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-3xl font-bold text-red-500">24</p>
                                    <p className="text-xs text-gray-500 mt-1">Alerts</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )

            default:
                return null
        }
    }

    const getTitle = () => {
        switch (category) {
            case 'blood-bags': return 'Blood Bags Analytics'
            case 'departments': return 'Department Usage Analytics'
            case 'cold-storage': return 'Cold Storage & Infrastructure'
            case 'alerts': return 'KPI Dashboard & Alerts'
            default: return 'Analytics'
        }
    }

    return (
        <div className="bg-gray-50 rounded-3xl border border-gray-200 overflow-hidden animate-in slide-in-from-top-4 duration-300 mt-6">
            {/* Header */}
            <div className="bg-white px-8 py-6 border-b border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <h2 className="text-2xl font-bold text-gray-900">{getTitle()}</h2>
                </div>
                <button
                    onClick={onClose}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                    <X className="w-6 h-6 text-gray-400" />
                </button>
            </div>

            {/* Content */}
            <div className="p-8">
                {renderContent()}
            </div>
        </div>
    )
}
