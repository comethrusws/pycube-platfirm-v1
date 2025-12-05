'use client'

import { Info, Database, RefreshCw, TrendingUp, Users, Target } from 'lucide-react'
import { getKPIById, type KPIDefinition } from '@/lib/kpi-definitions'
import { useState } from 'react'

interface DataDriverProps {
    kpiId: string
    currentValue: number
    className?: string
}

/**
 * DataDriver Component
 * 
 * Displays transparent "show your work" information for KPIs to build trust
 * with executives and investors. Shows calculation methodology, data sources,
 * and business context.
 * 
 * Requirement: R5.4 - Data driver section in drill-downs
 */
export function DataDriver({ kpiId, currentValue, className = '' }: DataDriverProps) {
    const [isExpanded, setIsExpanded] = useState(false)
    const kpi = getKPIById(kpiId)

    if (!kpi) {
        return null
    }

    const isInRange = currentValue >= kpi.typicalRange.min && currentValue <= kpi.typicalRange.max
    const isOptimal = Math.abs(currentValue - kpi.typicalRange.optimal) <= (kpi.typicalRange.optimal * 0.05)
    
    let statusColor = 'text-yellow-600 bg-yellow-50 border-yellow-200'
    let statusText = 'Within Expected Range'
    
    if (isOptimal) {
        statusColor = 'text-emerald-600 bg-emerald-50 border-emerald-200'
        statusText = 'Optimal Performance'
    } else if (!isInRange) {
        statusColor = 'text-red-600 bg-red-50 border-red-200'
        statusText = 'Outside Expected Range'
    }

    return (
        <div className={`bg-gradient-to-br from-blue-50 to-sky-50 rounded-2xl border border-sky-200 ${className}`}>
            {/* Header - Always Visible */}
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-white/50 transition-colors rounded-t-2xl"
            >
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-sky-100 rounded-lg">
                        <Database className="w-5 h-5 text-sky-600" />
                    </div>
                    <div className="text-left">
                        <h4 className="text-sm font-semibold text-gray-900">Data Driver</h4>
                        <p className="text-xs text-gray-600">How this number is calculated</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <span className={`text-xs font-semibold px-3 py-1.5 rounded-full border ${statusColor}`}>
                        {statusText}
                    </span>
                    <Info className={`w-5 h-5 text-sky-600 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                </div>
            </button>

            {/* Expanded Content */}
            {isExpanded && (
                <div className="px-6 pb-6 space-y-4 animate-in slide-in-from-top duration-200">
                    <div className="h-px bg-sky-200" />

                    {/* Formula */}
                    <div className="bg-white rounded-xl p-4 border border-sky-100">
                        <div className="flex items-center gap-2 mb-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-sky-600" />
                            <span className="text-xs font-semibold text-sky-700 uppercase tracking-wider">Formula</span>
                        </div>
                        <p className="text-sm text-gray-700 font-mono bg-gray-50 px-3 py-2 rounded-lg">
                            {kpi.formula}
                        </p>
                    </div>

                    {/* Data Inputs */}
                    <div className="bg-white rounded-xl p-4 border border-sky-100">
                        <div className="flex items-center gap-2 mb-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-sky-600" />
                            <span className="text-xs font-semibold text-sky-700 uppercase tracking-wider">Data Inputs</span>
                        </div>
                        <ul className="space-y-2">
                            {kpi.inputs.map((input, idx) => (
                                <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                                    <span className="text-sky-400 mt-0.5">•</span>
                                    <span>{input}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Data Source & Refresh */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white rounded-xl p-4 border border-sky-100">
                            <div className="flex items-center gap-2 mb-2">
                                <RefreshCw className="w-4 h-4 text-sky-600" />
                                <span className="text-xs font-semibold text-sky-700 uppercase tracking-wider">Refresh</span>
                            </div>
                            <p className="text-sm text-gray-700">{kpi.refreshFrequency}</p>
                        </div>

                        <div className="bg-white rounded-xl p-4 border border-sky-100">
                            <div className="flex items-center gap-2 mb-2">
                                <Database className="w-4 h-4 text-sky-600" />
                                <span className="text-xs font-semibold text-sky-700 uppercase tracking-wider">Source</span>
                            </div>
                            <p className="text-sm text-gray-700">{kpi.dataSource}</p>
                        </div>
                    </div>

                    {/* Typical Range */}
                    <div className="bg-white rounded-xl p-4 border border-sky-100">
                        <div className="flex items-center gap-2 mb-3">
                            <TrendingUp className="w-4 h-4 text-sky-600" />
                            <span className="text-xs font-semibold text-sky-700 uppercase tracking-wider">Expected Range</span>
                        </div>
                        <div className="flex items-center gap-6">
                            <div>
                                <span className="text-xs text-gray-500">Min</span>
                                <p className="text-lg font-semibold text-gray-900">
                                    {kpi.typicalRange.min}{kpi.typicalRange.unit}
                                </p>
                            </div>
                            <div className="flex-1">
                                <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
                                    <div 
                                        className="absolute h-full bg-emerald-400 rounded-full"
                                        style={{
                                            left: `${((kpi.typicalRange.min - kpi.typicalRange.min) / (kpi.typicalRange.max - kpi.typicalRange.min)) * 100}%`,
                                            width: `${((kpi.typicalRange.optimal - kpi.typicalRange.min) / (kpi.typicalRange.max - kpi.typicalRange.min)) * 100}%`
                                        }}
                                    />
                                    <div
                                        className="absolute w-1 h-4 bg-sky-600 rounded-full -top-1"
                                        style={{
                                            left: `${Math.min(100, Math.max(0, ((currentValue - kpi.typicalRange.min) / (kpi.typicalRange.max - kpi.typicalRange.min)) * 100))}%`
                                        }}
                                    />
                                </div>
                                <div className="flex items-center justify-center mt-1">
                                    <span className="text-xs text-gray-500">Optimal: {kpi.typicalRange.optimal}{kpi.typicalRange.unit}</span>
                                </div>
                            </div>
                            <div>
                                <span className="text-xs text-gray-500">Max</span>
                                <p className="text-lg font-semibold text-gray-900">
                                    {kpi.typicalRange.max}{kpi.typicalRange.unit}
                                </p>
                            </div>
                        </div>
                        <div className="mt-3 flex items-center gap-2">
                            <Target className="w-4 h-4 text-sky-600" />
                            <span className="text-xs text-gray-600">
                                Current value: <span className="font-semibold text-gray-900">{currentValue}{kpi.typicalRange.unit}</span>
                            </span>
                        </div>
                    </div>

                    {/* Business Context */}
                    <div className="bg-white rounded-xl p-4 border border-sky-100">
                        <div className="flex items-center gap-2 mb-3">
                            <Users className="w-4 h-4 text-sky-600" />
                            <span className="text-xs font-semibold text-sky-700 uppercase tracking-wider">Business Context</span>
                        </div>
                        
                        <div className="space-y-3">
                            <div>
                                <span className="text-xs text-gray-500 font-medium">Stakeholders</span>
                                <div className="flex flex-wrap gap-2 mt-1">
                                    {kpi.context.stakeholders.map((stakeholder, idx) => (
                                        <span
                                            key={idx}
                                            className="text-xs px-2 py-1 bg-sky-50 text-sky-700 rounded-md border border-sky-200"
                                        >
                                            {stakeholder}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <span className="text-xs text-gray-500 font-medium">Decisions Supported</span>
                                <ul className="mt-1 space-y-1">
                                    {kpi.context.decisions.map((decision, idx) => (
                                        <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                                            <span className="text-sky-400 mt-0.5">→</span>
                                            <span>{decision}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {kpi.context.criticalThreshold !== undefined && (
                                <div className="pt-2 border-t border-gray-200">
                                    <span className="text-xs text-red-600 font-semibold">
                                        ⚠️ Critical Threshold: {kpi.context.criticalThreshold}{kpi.typicalRange.unit}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
