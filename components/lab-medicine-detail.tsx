'use client'

import { ChevronDown, AlertCircle, CheckCircle2, AlertTriangle, XCircle, TrendingUp, Clock, DollarSign, Activity, MapPin, Sparkles, ArrowRight } from 'lucide-react'
import { labMedicineData } from '@/lib/data'
import { RiskLevel } from '@/lib/taxonomies'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { useState } from 'react'
import { LabMedicineTier3 } from './lab-medicine-tier-3'
import { AISidePanel, AIContextType } from './ai-side-panel'

interface LabMedicineDetailProps {
    isOpen: boolean
    onClose: () => void
}

export function LabMedicineDetail({ isOpen, onClose }: LabMedicineDetailProps) {
    const [tier3Category, setTier3Category] = useState<string | null>(null)
    const [aiPanelOpen, setAiPanelOpen] = useState(false)
    const [aiContext, setAiContext] = useState<{ title: string, value: string, type: AIContextType }>({
        title: '',
        value: '',
        type: 'specimen-tracking'
    })

    const handleKPIClick = (label: string, value: string) => {
        let type: AIContextType = 'specimen-tracking'
        if (label.includes('Custody')) type = 'custody'
        if (label.includes('Transit') || label.includes('TAT')) type = 'tat'
        if (label.includes('Tracking')) type = 'specimen-tracking'

        setAiContext({ title: label, value, type })
        setAiPanelOpen(true)
    }

    if (!isOpen) return null

    // Data preparation
    const trendData = labMedicineData.trendData
    const departmentData = labMedicineData.departments.slice(0, 5).map(dept => ({
        name: dept.dept,
        coverage: dept.coverage,
        target: 100
    }))

    return (
        <>
            <div className="bg-gray-50 border-t border-b border-gray-200 py-8 animate-in slide-in-from-top duration-300">
                <div className="max-w-7xl mx-auto px-8">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <div className="text-sm text-gray-500 mb-1">Dashboard {'>'} Lab Medicine</div>
                            <h2 className="text-2xl font-semibold text-gray-900">Lab Medicine - Detailed Analytics</h2>
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
                            <h3 className="text-sm font-semibold text-emerald-700 uppercase tracking-wider">Specimen Tracking Status</h3>
                            <div className="h-px bg-gradient-to-l from-emerald-500 to-transparent flex-1" />
                        </div>

                        <div className="grid grid-cols-3 gap-6">
                            {/* Total Specimens - Donut Chart */}
                            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                                <h3 className="text-sm font-semibold text-gray-900 mb-6">Weekly Specimen Volume</h3>
                                <div className="flex items-center justify-center mb-6">
                                    <div className="relative w-48 h-48">
                                        <div className="w-full h-full rounded-full" style={{
                                            background: `conic-gradient(
                                                #10b981 0deg ${(labMedicineData.summary.fullyTracked / 100 * 360)}deg,
                                                #f59e0b ${(labMedicineData.summary.fullyTracked / 100 * 360)}deg 360deg
                                            )`
                                        }}>
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <div className="bg-white rounded-full w-32 h-32 flex flex-col items-center justify-center">
                                                    <div className="text-4xl font-semibold text-gray-900">{labMedicineData.summary.totalSpecimens7Days.toLocaleString()}</div>
                                                    <div className="text-sm text-gray-500">specimens</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-600">Fully Tracked</span>
                                        <span className="text-lg font-semibold text-gray-900">{labMedicineData.summary.fullyTracked}%</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-600">Tracking Gaps</span>
                                        <span className="text-lg font-semibold text-orange-600">{labMedicineData.summary.gapsPercentage}%</span>
                                    </div>
                                </div>
                            </div>

                            {/* Specimen Type Coverage */}
                            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                                <h3 className="text-sm font-semibold text-gray-900 mb-6">Coverage by Specimen Type</h3>
                                <div className="space-y-4">
                                    {labMedicineData.specimenTypes.slice(0, 6).map((item) => (
                                        <div key={item.type} className="space-y-1">
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="text-gray-700">{item.type}</span>
                                                <span className="font-semibold text-gray-900">{item.coverage}%</span>
                                            </div>
                                            <div className="w-full bg-gray-100 rounded-full h-2">
                                                <div
                                                    className={`${item.risk === RiskLevel.HIGH || item.risk === RiskLevel.CRITICAL ? 'bg-red-500' : item.risk === RiskLevel.MEDIUM ? 'bg-orange-500' : 'bg-emerald-500'} h-2 rounded-full transition-all duration-500`}
                                                    style={{ width: `${item.coverage}%` }}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Custody Breaks Overview */}
                            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                                <h3 className="text-sm font-semibold text-gray-900 mb-6">Custody Breaks (30 Days)</h3>
                                <div className="text-center mb-6">
                                    <div className="text-6xl font-semibold text-gray-900">{labMedicineData.custodyBreaks.total}</div>
                                </div>
                                <div className="grid grid-cols-3 gap-3 mb-4">
                                    <div className="bg-red-500 rounded-2xl p-4 text-center">
                                        <div className="text-2xl font-semibold text-white">{labMedicineData.custodyBreaks.bySeverity.critical}</div>
                                        <div className="text-xs text-white/80 mt-1">Critical</div>
                                    </div>
                                    <div className="bg-orange-500 rounded-2xl p-4 text-center">
                                        <div className="text-2xl font-semibold text-white">{labMedicineData.custodyBreaks.bySeverity.high}</div>
                                        <div className="text-xs text-white/80 mt-1">High</div>
                                    </div>
                                    <div className="bg-blue-400 rounded-2xl p-4 text-center">
                                        <div className="text-2xl font-semibold text-white">{labMedicineData.custodyBreaks.bySeverity.medium}</div>
                                        <div className="text-xs text-white/80 mt-1">Medium</div>
                                    </div>
                                </div>
                                <div className="bg-yellow-50 rounded-2xl p-4 text-center mb-4 border border-yellow-100">
                                    <div className="text-sm font-medium text-yellow-800">
                                        Avg Transit Time: {labMedicineData.transit.avgTransitTime}
                                    </div>
                                </div>
                                <div className="space-y-2 text-xs">
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 rounded-full bg-red-500" />
                                        <span className="text-gray-600">Critical Break</span>
                                        <div className="ml-auto w-3 h-3 rounded-full bg-orange-500" />
                                        <span className="text-gray-600">High Risk</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 rounded-full bg-blue-400" />
                                        <span className="text-gray-600">Medium Risk</span>
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
                                { label: 'Digitization Coverage', value: `${labMedicineData.summary.digitizationCoverage}%`, icon: CheckCircle2, color: 'text-emerald-600' },
                                { label: 'Traceability', value: `${labMedicineData.summary.fullyTracked}%`, icon: Activity, color: 'text-emerald-600' },
                                { label: 'Custody Breaks', value: labMedicineData.custodyBreaks.total.toString(), icon: AlertTriangle, color: 'text-red-600' },
                                { label: 'Avg Transit Time', value: labMedicineData.transit.avgTransitTime, icon: Clock, color: 'text-blue-600' },
                                { label: 'Courier Delays', value: labMedicineData.transit.courierDelays.toString(), icon: AlertCircle, color: 'text-orange-600' },
                            ].map((metric) => (
                                <button
                                    key={metric.label}
                                    onClick={() => handleKPIClick(metric.label, metric.value)}
                                    className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:border-purple-200 transition-all group text-left relative overflow-hidden"
                                >
                                    <div className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Sparkles className="w-3 h-3 text-purple-600" />
                                    </div>
                                    <div className="flex items-start justify-between mb-2">
                                        <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            {metric.label}
                                        </span>
                                        {metric.icon && (
                                            <metric.icon className={`w-4 h-4 ${metric.color || 'text-gray-400'}`} />
                                        )}
                                    </div>
                                    <div className="text-3xl font-semibold text-gray-900">{metric.value}</div>
                                </button>
                            ))}
                        </div>

                        {/* Analysis Charts */}
                        <div className="grid grid-cols-2 gap-6 mb-6">
                            {/* Traceability Trend */}
                            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                                <h3 className="text-sm font-semibold text-gray-900 mb-4">Traceability Trend (12 Weeks)</h3>
                                <ResponsiveContainer width="100%" height={280}>
                                    <LineChart data={trendData}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                                        <XAxis dataKey="week" tick={{ fontSize: 11 }} />
                                        <YAxis tick={{ fontSize: 11 }} domain={[80, 100]} />
                                        <Tooltip />
                                        <Line type="monotone" dataKey="value" stroke="#10b981" strokeWidth={2} dot={{ r: 4 }} />
                                    </LineChart>
                                </ResponsiveContainer>
                                <div className="text-xs text-gray-500 mt-2 text-center">
                                    Consistent improvement in specimen tracking coverage over the last quarter.
                                </div>
                            </div>

                            {/* Department Coverage */}
                            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                                <h3 className="text-sm font-semibold text-gray-900 mb-4">Coverage by Department</h3>
                                <ResponsiveContainer width="100%" height={280}>
                                    <BarChart data={departmentData}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                                        <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                                        <YAxis tick={{ fontSize: 11 }} domain={[0, 100]} />
                                        <Tooltip />
                                        <Bar dataKey="coverage" name="Coverage %" radius={[4, 4, 0, 0]}>
                                            {departmentData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.coverage >= 90 ? '#10b981' : entry.coverage >= 80 ? '#f59e0b' : '#ef4444'} />
                                            ))}
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                                <div className="flex items-center justify-center gap-4 mt-2 text-xs">
                                    <div className="flex items-center gap-1">
                                        <div className="w-3 h-3 rounded-full bg-emerald-500" />
                                        <span className="text-gray-600">&gt;90%</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <div className="w-3 h-3 rounded-full bg-orange-500" />
                                        <span className="text-gray-600">80-90%</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <div className="w-3 h-3 rounded-full bg-red-500" />
                                        <span className="text-gray-600">&lt;80%</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Facility Table */}
                        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                            <h3 className="text-sm font-semibold text-gray-900 mb-4">Facility Performance</h3>
                            <div className="overflow-hidden">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b border-gray-200">
                                            <th className="text-left text-xs font-semibold text-gray-600 py-3 px-4">Facility</th>
                                            <th className="text-center text-xs font-semibold text-gray-600 py-3 px-4">Total Specimens</th>
                                            <th className="text-center text-xs font-semibold text-gray-600 py-3 px-4">Traceable</th>
                                            <th className="text-center text-xs font-semibold text-gray-600 py-3 px-4">Coverage</th>
                                            <th className="text-center text-xs font-semibold text-gray-600 py-3 px-4">Breaks</th>
                                            <th className="text-center text-xs font-semibold text-gray-600 py-3 px-4">Avg TAT</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {labMedicineData.facilities.slice(0, 5).map((fac) => (
                                            <tr key={fac.facility} className="border-b border-gray-100 hover:bg-gray-50">
                                                <td className="text-sm text-gray-900 py-3 px-4">{fac.facility}</td>
                                                <td className="text-sm text-center text-gray-900 py-3 px-4">{fac.total.toLocaleString()}</td>
                                                <td className="text-sm text-center text-gray-900 py-3 px-4">{fac.traceable.toLocaleString()}</td>
                                                <td className="text-sm text-center py-3 px-4">
                                                    <span className={`font-semibold ${fac.coverage >= 95 ? 'text-emerald-600' : 'text-orange-600'}`}>
                                                        {fac.coverage}%
                                                    </span>
                                                </td>
                                                <td className="text-sm text-center py-3 px-4">
                                                    <span className={`font-semibold ${fac.breaks > 50 ? 'text-red-600' : 'text-gray-900'}`}>
                                                        {fac.breaks}
                                                    </span>
                                                </td>
                                                <td className="text-sm text-center text-gray-900 py-3 px-4">{fac.avgTAT}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="text-xs text-gray-500 mt-3">
                                Total specimens across network: <span className="font-semibold text-gray-900">{labMedicineData.summary.totalSpecimens7Days.toLocaleString()}</span>
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
                                        <TrendingUp className="w-8 h-8 text-indigo-600 relative z-10" />
                                    </div>
                                </div>
                                <div>
                                    <div className="flex items-center gap-2 mb-3">
                                        <h3 className="text-lg font-bold text-gray-900">AI Pattern Recognition</h3>
                                        <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-700 border border-indigo-200">
                                            New Insight
                                        </span>
                                    </div>
                                    <p className="text-gray-600 leading-relaxed text-lg">
                                        Detected a <span className="font-semibold text-indigo-700">recurring bottleneck</span> in 'Pathology' specimen processing between 14:00-16:00 daily.
                                        Recommendation: Adjust courier pickup schedule to stagger arrivals.
                                    </p>
                                    <div className="mt-6 flex items-center gap-4">
                                        <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-xl transition-colors shadow-sm shadow-indigo-200">
                                            View Schedule Optimization
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
                            {/* Action Card: Custody Breaks */}
                            <button
                                onClick={() => setTier3Category('custody-breaks')}
                                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-left hover:shadow-md transition-shadow cursor-pointer group"
                            >
                                <div className="flex items-start justify-between mb-3">
                                    <div className="p-2 bg-red-100 rounded-lg group-hover:bg-red-200 transition-colors">
                                        <AlertTriangle className="w-5 h-5 text-red-600" />
                                    </div>
                                    <span className="text-xs font-semibold text-red-600 bg-red-100 px-2 py-1 rounded-full">Critical</span>
                                </div>
                                <div className="text-3xl font-semibold text-gray-900 mb-1">{labMedicineData.custodyBreaks.total}</div>
                                <div className="text-sm font-medium text-gray-700 mb-2">Custody Breaks</div>
                                <div className="text-xs text-gray-500">Documented gaps in chain of custody. Click for root cause analysis.</div>
                            </button>

                            {/* Action Card: Route Optimization */}
                            <button
                                onClick={() => setTier3Category('route-optimization')}
                                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-left hover:shadow-md transition-shadow cursor-pointer group"
                            >
                                <div className="flex items-start justify-between mb-3">
                                    <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                                        <MapPin className="w-5 h-5 text-blue-600" />
                                    </div>
                                    <span className="text-xs font-semibold text-blue-600 bg-blue-100 px-2 py-1 rounded-full">Optimize</span>
                                </div>
                                <div className="text-3xl font-semibold text-gray-900 mb-1">$120K</div>
                                <div className="text-sm font-medium text-gray-700 mb-2">Transit Savings</div>
                                <div className="text-xs text-gray-500">Potential savings from route optimization. Click for details.</div>
                            </button>

                            {/* Action Card: Dept Performance */}
                            <button
                                onClick={() => setTier3Category('department-performance')}
                                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-left hover:shadow-md transition-shadow cursor-pointer group"
                            >
                                <div className="flex items-start justify-between mb-3">
                                    <div className="p-2 bg-yellow-100 rounded-lg group-hover:bg-yellow-200 transition-colors">
                                        <Clock className="w-5 h-5 text-yellow-600" />
                                    </div>
                                    <span className="text-xs font-semibold text-yellow-600 bg-yellow-100 px-2 py-1 rounded-full">Action Needed</span>
                                </div>
                                <div className="text-3xl font-semibold text-gray-900 mb-1">27 min</div>
                                <div className="text-sm font-medium text-gray-700 mb-2">TAT Reduction</div>
                                <div className="text-xs text-gray-500">Targeted reduction in OR/ED turnaround time. Click to view plan.</div>
                            </button>

                            {/* Action Card: Specimen Risks */}
                            <button
                                onClick={() => setTier3Category('specimen-risks')}
                                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-left hover:shadow-md transition-shadow cursor-pointer group"
                            >
                                <div className="flex items-start justify-between mb-3">
                                    <div className="p-2 bg-orange-100 rounded-lg group-hover:bg-orange-200 transition-colors">
                                        <TrendingUp className="w-5 h-5 text-orange-600" />
                                    </div>
                                    <span className="text-xs font-semibold text-orange-600 bg-orange-100 px-2 py-1 rounded-full">High Risk</span>
                                </div>
                                <div className="text-3xl font-semibold text-gray-900 mb-1">72%</div>
                                <div className="text-sm font-medium text-gray-700 mb-2">Risk Reduction</div>
                                <div className="text-xs text-gray-500">Impact of enhanced protocols for high-risk specimens. Click to review.</div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tier 3 Modal */}
            {tier3Category && (
                <LabMedicineTier3
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
