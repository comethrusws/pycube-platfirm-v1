'use client'

import { ChevronDown, AlertCircle, CheckCircle2, AlertTriangle, XCircle } from 'lucide-react'

interface WorkflowDetailProps {
    workflowName: string
    isOpen: boolean
    onClose: () => void
}

export function WorkflowDetail({ workflowName, isOpen, onClose }: WorkflowDetailProps) {
    if (!isOpen) return null

    return (
        <div className="bg-gray-50 border-t border-b border-gray-200 py-8 animate-in slide-in-from-top duration-300">
            <div className="max-w-7xl mx-auto px-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-semibold text-gray-900">{workflowName} - Detailed Analytics</h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                    >
                        <ChevronDown className="w-5 h-5 text-gray-600" />
                    </button>
                </div>

                {/* Analytics Grid */}
                <div className="grid grid-cols-3 gap-6 mb-6">
                    {/* Today's Overview - Donut Chart */}
                    <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                        <h3 className="text-sm font-semibold text-gray-900 mb-6">Today's Overview</h3>
                        <div className="flex items-center justify-center mb-6">
                            <div className="relative w-48 h-48">
                                {/* Donut Chart - Using conic gradient */}
                                <div className="w-full h-full rounded-full" style={{
                                    background: `conic-gradient(
                    #10b981 0deg 220deg,
                    #f59e0b 220deg 360deg
                  )`
                                }}>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="bg-white rounded-full w-32 h-32 flex flex-col items-center justify-center">
                                            <div className="text-4xl font-semibold text-gray-900">16,500</div>
                                            <div className="text-sm text-gray-500">samples</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-600">Samples Delivered</span>
                                <span className="text-lg font-semibold text-gray-900">10,230</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-600">Samples Expected</span>
                                <span className="text-lg font-semibold text-gray-900">6,270</span>
                            </div>
                        </div>
                    </div>

                    {/* Status of Samples Expected Today */}
                    <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                        <h3 className="text-sm font-semibold text-gray-900 mb-6">Status of Samples Expected Today</h3>
                        <div className="space-y-4">
                            {[
                                { label: 'Collected', value: 1980, total: 2000, color: 'bg-blue-500' },
                                { label: 'Ready for Pick-up', value: 1495, total: 1500, color: 'bg-blue-400' },
                                { label: 'Picked-up', value: 1650, total: 1700, color: 'bg-blue-500' },
                                { label: 'In Transit', value: 990, total: 1000, color: 'bg-blue-500' },
                                { label: 'Reached Dest', value: 10230, total: 10500, color: 'bg-blue-500' },
                                { label: 'Unknown', value: 165, total: 200, color: 'bg-gray-400' },
                            ].map((item) => (
                                <div key={item.label} className="space-y-1">
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-gray-700">{item.label}</span>
                                        <span className="font-semibold text-gray-900">{item.value} samples</span>
                                    </div>
                                    <div className="w-full bg-gray-100 rounded-full h-2">
                                        <div
                                            className={`${item.color} h-2 rounded-full transition-all duration-500`}
                                            style={{ width: `${(item.value / item.total) * 100}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Yesterday's Pending Samples */}
                    <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                        <h3 className="text-sm font-semibold text-gray-900 mb-6">Yesterday's Pending Samples</h3>
                        <div className="text-center mb-6">
                            <div className="text-6xl font-semibold text-gray-900">75</div>
                        </div>
                        <div className="grid grid-cols-3 gap-3 mb-4">
                            <div className="bg-blue-500 rounded-2xl p-4 text-center">
                                <div className="text-2xl font-semibold text-white">35</div>
                            </div>
                            <div className="bg-blue-400 rounded-2xl p-4 text-center">
                                <div className="text-2xl font-semibold text-white">20</div>
                            </div>
                            <div className="bg-orange-500 rounded-2xl p-4 text-center">
                                <div className="text-2xl font-semibold text-white">20</div>
                            </div>
                        </div>
                        <div className="bg-yellow-400 rounded-2xl p-4 text-center mb-4">
                            <div className="text-2xl font-semibold text-white">0</div>
                        </div>
                        <div className="space-y-2 text-xs">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-blue-500" />
                                <span className="text-gray-600">Collected</span>
                                <div className="ml-auto w-3 h-3 rounded-full bg-orange-500" />
                                <span className="text-gray-600">In Transit</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-blue-400" />
                                <span className="text-gray-600">Ready for Pick-up</span>
                                <div className="ml-auto w-3 h-3 rounded-full bg-orange-400" />
                                <span className="text-gray-600">Picked up</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Metrics Row */}
                <div className="grid grid-cols-5 gap-4">
                    {[
                        { label: 'Overall Collected', value: '1,980', icon: null },
                        { label: 'Samples Delivered', value: '10,230', icon: null },
                        { label: 'Samples Unknown', value: '165', icon: AlertCircle, color: 'text-yellow-600' },
                        { label: 'Samples Missing', value: '6270', icon: AlertTriangle, color: 'text-red-600' },
                        { label: 'Samples Damaged', value: '16', icon: XCircle, color: 'text-red-600' },
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
            </div>
        </div>
    )
}
