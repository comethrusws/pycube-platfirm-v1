'use client'

import { useState } from 'react'
import { ChevronDown, AlertCircle, CheckCircle2, AlertTriangle, XCircle, ArrowUpRight, ArrowRight } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend, BarChart, Bar, Rectangle } from 'recharts'
import { FacilityTable, DepartmentTable, CustodyBreaksTable, TransitRouteTable } from '@/components/specimen-tables'
import { SpecimenDetail } from '@/components/specimen-detail'

interface SpecimenDigitizationOverviewProps {
    isOpen: boolean
    onClose: () => void
}

const trendData = [
    { week: 'W1', value: 82 },
    { week: 'W2', value: 84 },
    { week: 'W3', value: 83 },
    { week: 'W4', value: 85 },
    { week: 'W5', value: 86 },
    { week: 'W6', value: 88 },
    { week: 'W7', value: 89 },
    { week: 'W8', value: 90 },
    { week: 'W9', value: 91 },
    { week: 'W10', value: 91 },
    { week: 'W11', value: 92 },
    { week: 'W12', value: 92 },
]

const pieData = [
    { name: 'Fully Traceable', value: 92, color: '#10b981' }, // emerald-500
    { name: 'Partial', value: 5, color: '#f59e0b' }, // amber-500
    { name: 'Missing', value: 3, color: '#ef4444' }, // red-500
]

const departmentData = [
    { name: 'OR', value: 78, color: '#ef4444' },
    { name: 'ED', value: 83, color: '#f59e0b' },
    { name: 'ICU', value: 93, color: '#10b981' },
    { name: 'Med/Surg', value: 94, color: '#10b981' },
    { name: 'Oncology', value: 96, color: '#10b981' },
]

const specimenTypeData = [
    { name: 'Blood', value: 91, volume: 4000 },
    { name: 'Tissue', value: 89, volume: 2000 },
    { name: 'Pathology', value: 94, volume: 1500 },
    { name: 'Frozen', value: 87, volume: 1000 },
    { name: 'Urine', value: 93, volume: 3000 },
    { name: 'Micro', value: 95, volume: 1200 },
]

const custodyBreaksData = [
    { name: 'Main Lab', value: 12 },
    { name: 'OR Annex', value: 28 },
    { name: 'ED', value: 35 },
    { name: 'ICU', value: 6 },
    { name: 'Clinic', value: 3 },
]

export function SpecimenDigitizationOverview({ isOpen, onClose }: SpecimenDigitizationOverviewProps) {
    const [activeTab, setActiveTab] = useState('By Facility')
    const [selectedSpecimenId, setSelectedSpecimenId] = useState<string | null>(null)

    if (!isOpen) return null

    if (selectedSpecimenId) {
        return <SpecimenDetail onBack={() => setSelectedSpecimenId(null)} />
    }

    return (
        <div className="bg-gray-50 border-t border-b border-gray-200 py-8 animate-in slide-in-from-top duration-300">
            <div className="max-w-7xl mx-auto px-8">
                {/* Breadcrumbs & Header */}
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <div className="text-sm text-gray-500 mb-1">Dashboard {'>'} Specimen Digitization</div>
                        <h2 className="text-2xl font-semibold text-gray-900">Specimen Digitization Overview</h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                    >
                        <ChevronDown className="w-5 h-5 text-gray-600" />
                    </button>
                </div>

                {/* Section 1: KPIs at a Glance */}
                <div className="grid grid-cols-3 gap-6 mb-8">
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                        <div className="text-sm font-medium text-gray-500 mb-2">Digitization Coverage</div>
                        <div className="flex items-baseline gap-2">
                            <span className="text-4xl font-semibold text-gray-900">92%</span>
                            <span className="text-sm font-medium text-emerald-600 flex items-center">
                                <ArrowUpRight className="w-4 h-4 mr-0.5" />
                                +7% this week
                            </span>
                        </div>
                    </div>
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                        <div className="text-sm font-medium text-gray-500 mb-2">Total Specimens (7 days)</div>
                        <div className="text-4xl font-semibold text-gray-900">12,810</div>
                    </div>
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                        <div className="text-sm font-medium text-gray-500 mb-2">Traceability</div>
                        <div className="space-y-1">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-900 font-medium">92% fully tracked</span>
                                <span className="text-gray-500">8% gaps</span>
                            </div>
                            <div className="w-full bg-gray-100 rounded-full h-2">
                                <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '92%' }} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Coverage Breakdown Tabs */}
                <div className="flex gap-2 mb-6 border-b border-gray-200 overflow-x-auto">
                    {['By Facility', 'By Department', 'By Specimen Type', 'Custody Breaks', 'Transit Analytics'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${activeTab === tab
                                ? 'border-blue-600 text-blue-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Charts Section */}
                <div className="grid grid-cols-3 gap-6 mb-8">
                    {activeTab === 'By Facility' && (
                        <>
                            {/* Line Chart */}
                            <div className="col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100 min-h-[300px] flex flex-col">
                                <h3 className="text-sm font-semibold text-gray-900 mb-4">Specimen Traceability Trend (12 weeks)</h3>
                                <div className="flex-1 w-full h-[250px]">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <LineChart data={trendData}>
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
                                                domain={[80, 100]}
                                                tickFormatter={(value) => `${value}%`}
                                            />
                                            <Tooltip
                                                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                                formatter={(value: number) => [`${value}%`, 'Traceability']}
                                            />
                                            <Line
                                                type="monotone"
                                                dataKey="value"
                                                stroke="#10b981"
                                                strokeWidth={3}
                                                dot={{ fill: '#10b981', strokeWidth: 2, r: 4, stroke: '#fff' }}
                                                activeDot={{ r: 6, strokeWidth: 0 }}
                                            />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>

                            {/* Pie Chart */}
                            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 min-h-[300px] flex flex-col">
                                <h3 className="text-sm font-semibold text-gray-900 mb-4">Traceability State</h3>
                                <div className="flex-1 w-full h-[250px]">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie
                                                data={pieData}
                                                cx="50%"
                                                cy="50%"
                                                innerRadius={60}
                                                outerRadius={80}
                                                paddingAngle={5}
                                                dataKey="value"
                                            >
                                                {pieData.map((entry, index) => (
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
                                                formatter={(value, entry: any) => <span className="text-sm text-gray-600 ml-1">{value}</span>}
                                            />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>

                            {/* Facility Table */}
                            <div className="col-span-3 mt-2">
                                <h3 className="text-sm font-semibold text-gray-900 mb-4">Facility Details</h3>
                                <FacilityTable />
                            </div>
                        </>
                    )}

                    {activeTab === 'By Department' && (
                        <div className="col-span-3">
                            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 min-h-[300px] flex flex-col mb-8">
                                <h3 className="text-sm font-semibold text-gray-900 mb-4">Traceability % by Department</h3>
                                <div className="w-full h-[300px]">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart
                                            data={departmentData}
                                            layout="vertical"
                                            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                                        >
                                            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f3f4f6" />
                                            <XAxis
                                                type="number"
                                                axisLine={false}
                                                tickLine={false}
                                                tick={{ fill: '#9ca3af', fontSize: 12 }}
                                                domain={[0, 100]}
                                                tickFormatter={(value) => `${value}%`}
                                            />
                                            <YAxis
                                                dataKey="name"
                                                type="category"
                                                axisLine={false}
                                                tickLine={false}
                                                tick={{ fill: '#6b7280', fontSize: 12, fontWeight: 500 }}
                                                width={100}
                                            />
                                            <Tooltip
                                                cursor={{ fill: '#f3f4f6' }}
                                                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                                formatter={(value: number) => [`${value}%`, 'Traceability']}
                                            />
                                            <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={32}>
                                                {departmentData.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                                ))}
                                            </Bar>
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>

                            {/* Department Table */}
                            <div>
                                <h3 className="text-sm font-semibold text-gray-900 mb-4">Department Details</h3>
                                <DepartmentTable />
                            </div>
                        </div>
                    )}

                    {activeTab === 'By Specimen Type' && (
                        <div className="col-span-3 bg-white rounded-2xl p-6 shadow-sm border border-gray-100 min-h-[300px] flex flex-col">
                            <h3 className="text-sm font-semibold text-gray-900 mb-4">Traceability % by Specimen Type</h3>
                            <div className="flex-1 w-full h-[300px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={specimenTypeData}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                                        <XAxis
                                            dataKey="name"
                                            axisLine={false}
                                            tickLine={false}
                                            tick={{ fill: '#6b7280', fontSize: 12 }}
                                            dy={10}
                                        />
                                        <YAxis
                                            axisLine={false}
                                            tickLine={false}
                                            tick={{ fill: '#9ca3af', fontSize: 12 }}
                                            domain={[80, 100]}
                                            tickFormatter={(value) => `${value}%`}
                                        />
                                        <Tooltip
                                            cursor={{ fill: '#f3f4f6' }}
                                            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                            formatter={(value: number, name: string, props: any) => {
                                                if (name === 'value') return [`${value}%`, 'Traceability']
                                                return [value, name]
                                            }}
                                        />
                                        <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    )}

                    {activeTab === 'Custody Breaks' && (
                        <div className="col-span-3">
                            {/* Custody Breaks Table */}
                            <div>
                                <h3 className="text-sm font-semibold text-gray-900 mb-4">Recent Custody Breaks</h3>
                                {/* Temporary click handler for demo purposes */}
                                <div onClick={() => setSelectedSpecimenId('991283')} className="cursor-pointer">
                                    <CustodyBreaksTable />
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'Transit Analytics' && (
                        <div className="col-span-3">
                            {/* KPIs */}
                            <div className="grid grid-cols-3 gap-6 mb-8">
                                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                                    <div className="text-sm font-medium text-gray-500 mb-2">Avg Transit Time</div>
                                    <div className="text-3xl font-semibold text-gray-900">51m</div>
                                </div>
                                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                                    <div className="text-sm font-medium text-gray-500 mb-2">Courier Delays</div>
                                    <div className="text-3xl font-semibold text-orange-600">18%</div>
                                </div>
                                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                                    <div className="text-sm font-medium text-gray-500 mb-2">Missing Scans</div>
                                    <div className="text-3xl font-semibold text-gray-900">4%</div>
                                </div>
                            </div>

                            {/* Map Placeholder */}
                            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-8 min-h-[300px] flex flex-col items-center justify-center bg-gray-50 relative overflow-hidden">
                                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:16px_16px]"></div>
                                <div className="relative z-10 text-center">
                                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <ArrowUpRight className="w-8 h-8 text-blue-600" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Hospital Map with Courier Routes</h3>
                                    <p className="text-gray-500 max-w-md">
                                        Interactive map visualization showing real-time courier locations, route status (Green/Yellow/Red), and transit metrics.
                                    </p>
                                </div>
                            </div>

                            {/* Route Table */}
                            <div>
                                <h3 className="text-sm font-semibold text-gray-900 mb-4">Route-by-Route Analytics</h3>
                                <TransitRouteTable />
                            </div>
                        </div>
                    )}
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
                                    <AlertCircle className="w-5 h-5 text-blue-600" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-900 font-medium">Digitizing 312 outbound specimens (ED + ICU) will eliminate 80% gaps.</p>
                                </div>
                            </div>
                            <button className="text-sm font-medium text-blue-600 hover:text-blue-700 whitespace-nowrap">Apply</button>
                        </div>
                        <div className="flex items-start justify-between bg-white p-4 rounded-xl shadow-sm border border-blue-100/50">
                            <div className="flex gap-3">
                                <div className="mt-0.5">
                                    <AlertTriangle className="w-5 h-5 text-orange-500" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-900 font-medium">Lab Annex courier delays cause 34% of custody breaks.</p>
                                </div>
                            </div>
                            <button className="text-sm font-medium text-blue-600 hover:text-blue-700 whitespace-nowrap">View Workflow</button>
                        </div>
                        <div className="flex items-start justify-between bg-white p-4 rounded-xl shadow-sm border border-blue-100/50">
                            <div className="flex gap-3">
                                <div className="mt-0.5">
                                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-900 font-medium">Add RFID workflows to OR for +5% traceability.</p>
                                </div>
                            </div>
                            <button className="text-sm font-medium text-blue-600 hover:text-blue-700 whitespace-nowrap">Apply</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
