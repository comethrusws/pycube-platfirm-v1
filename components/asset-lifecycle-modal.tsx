'use client'

import { X, Clock, MapPin, AlertTriangle, CheckCircle2 } from 'lucide-react'
import { AssetLifecycleData, statusConfig } from '@/lib/asset-lifecycle'

interface AssetLifecycleModalProps {
    assetData: AssetLifecycleData | null
    onClose: () => void
}

export function AssetLifecycleModal({ assetData, onClose }: AssetLifecycleModalProps) {
    if (!assetData) return null

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-8">
            <div className="bg-white rounded-3xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between p-8 border-b border-gray-200">
                    <div>
                        <h2 className="text-2xl font-semibold text-gray-900">{assetData.assetName}</h2>
                        <div className="flex items-center gap-4 mt-2">
                            <span className="text-sm text-gray-500">Asset ID: {assetData.assetId}</span>
                            <span className="text-sm text-gray-500">Type: {assetData.assetType}</span>
                            <span className="text-sm font-medium text-gray-700">Total Cycle Time: {assetData.totalCycleTime}</span>
                        </div>
                        {assetData.bottleneckCount > 0 && (
                            <div className="flex items-center gap-2 mt-2">
                                <AlertTriangle className="w-4 h-4 text-orange-600" />
                                <span className="text-sm font-medium text-orange-600">
                                    {assetData.bottleneckCount} Bottleneck{assetData.bottleneckCount > 1 ? 's' : ''} Detected
                                </span>
                            </div>
                        )}
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <X className="w-6 h-6 text-gray-600" />
                    </button>
                </div>

                {/* Timeline */}
                <div className="p-8 overflow-y-auto flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-6">Lifecycle Journey</h3>

                    <div className="relative">
                        {/* Timeline Line */}
                        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200" />

                        {/* Events */}
                        <div className="space-y-6">
                            {assetData.events.map((event, idx) => {
                                const config = statusConfig[event.status]
                                return (
                                    <div key={idx} className="relative flex gap-6">
                                        {/* Node */}
                                        <div className="relative flex-shrink-0">
                                            <div className={`w-12 h-12 rounded-full ${config.color} border-4 border-white shadow-lg flex items-center justify-center z-10 relative`}>
                                                <span className="text-white text-lg font-bold">{config.icon}</span>
                                            </div>
                                            {event.isBottleneck && (
                                                <div className="absolute -top-1 -right-1 w-6 h-6 bg-orange-500 rounded-full border-2 border-white flex items-center justify-center">
                                                    <AlertTriangle className="w-3 h-3 text-white" />
                                                </div>
                                            )}
                                        </div>

                                        {/* Content */}
                                        <div className={`flex-1 pb-6 ${event.isBottleneck ? 'bg-orange-50 -ml-6 pl-6 pr-6 rounded-lg border border-orange-200' : ''}`}>
                                            <div className="flex items-start justify-between mb-2">
                                                <div>
                                                    <h4 className="text-lg font-semibold text-gray-900">{config.label}</h4>
                                                    {event.isBottleneck && event.bottleneckReason && (
                                                        <div className="flex items-center gap-2 mt-1">
                                                            <span className="text-xs font-bold text-orange-700 bg-orange-100 px-2 py-1 rounded-full">
                                                                ⚠️ {event.bottleneckReason}
                                                            </span>
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="flex items-center gap-2 bg-gray-900 text-white px-3 py-1.5 rounded-lg">
                                                    <Clock className="w-4 h-4" />
                                                    <span className="text-sm font-medium">{event.duration}</span>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-2 gap-4 mt-3">
                                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                                    <MapPin className="w-4 h-4" />
                                                    <span>{event.location}</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                                    <Clock className="w-4 h-4" />
                                                    <span>{event.timestamp}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    {/* R2.6: Utilization Metrics */}
                    {assetData.utilizationRate !== undefined && (
                        <div className="mt-8 p-6 bg-blue-50 rounded-2xl border border-blue-200">
                            <h4 className="text-sm font-semibold text-gray-900 mb-4">Utilization Analysis (Last 30 Days)</h4>
                            <div className="grid grid-cols-4 gap-4 mb-4">
                                <div>
                                    <div className="text-sm text-gray-500">Current Rate</div>
                                    <div className={`text-3xl font-semibold ${assetData.utilizationRate < 30 ? 'text-red-600' : assetData.utilizationRate < 50 ? 'text-orange-600' : 'text-emerald-600'}`}>
                                        {assetData.utilizationRate}%
                                    </div>
                                </div>
                                <div>
                                    <div className="text-sm text-gray-500">Department</div>
                                    <div className="text-lg font-semibold text-gray-900">{assetData.department}</div>
                                </div>
                                <div>
                                    <div className="text-sm text-gray-500">Asset Value</div>
                                    <div className="text-lg font-semibold text-gray-900">{assetData.acquisitionValue}</div>
                                </div>
                                <div>
                                    <div className="text-sm text-gray-500">Target Rate</div>
                                    <div className="text-lg font-semibold text-gray-500">70%</div>
                                </div>
                            </div>
                            {assetData.utilizationTrend && assetData.utilizationTrend.length > 0 && (
                                <div className="mt-3">
                                    <div className="text-xs font-medium text-gray-600 mb-2">Weekly Trend</div>
                                    <div className="flex items-end justify-between gap-2 h-16">
                                        {assetData.utilizationTrend.map((trend, idx) => (
                                            <div key={idx} className="flex-1 flex flex-col items-center">
                                                <div 
                                                    className={`w-full rounded-t ${trend.rate < 30 ? 'bg-red-400' : trend.rate < 50 ? 'bg-orange-400' : 'bg-emerald-400'}`}
                                                    style={{ height: `${trend.rate}%` }}
                                                />
                                                <div className="text-xs text-gray-600 mt-1">{trend.period.replace('Week ', 'W')}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* R2.6: PM History */}
                    {assetData.pmHistory && assetData.pmHistory.length > 0 && (
                        <div className="mt-8 p-6 bg-purple-50 rounded-2xl border border-purple-200">
                            <h4 className="text-sm font-semibold text-gray-900 mb-4">Preventive Maintenance History</h4>
                            <div className="space-y-3">
                                {assetData.pmHistory.map((pm, idx) => (
                                    <div key={idx} className="bg-white rounded-xl p-4 border border-gray-200">
                                        <div className="flex items-start justify-between mb-2">
                                            <div>
                                                <div className="font-semibold text-gray-900">{pm.taskType}</div>
                                                <div className="text-xs text-gray-500">{pm.date} • {pm.technician}</div>
                                            </div>
                                            <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                                                pm.outcome === 'completed' ? 'bg-emerald-100 text-emerald-700' :
                                                pm.outcome === 'failed' ? 'bg-red-100 text-red-700' :
                                                'bg-yellow-100 text-yellow-700'
                                            }`}>
                                                {pm.outcome.toUpperCase()}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-4 text-xs text-gray-600 mb-2">
                                            <div>
                                                <Clock className="w-3 h-3 inline mr-1" />
                                                Duration: {pm.duration}min
                                            </div>
                                            <div className={pm.timeToLocate > 10 ? 'text-orange-600 font-semibold' : ''}>
                                                <MapPin className="w-3 h-3 inline mr-1" />
                                                Time to Locate: {pm.timeToLocate}min
                                                {pm.timeToLocate > 10 && ' ⚠️'}
                                            </div>
                                        </div>
                                        {pm.notes && (
                                            <div className="text-xs text-gray-600 italic bg-gray-50 p-2 rounded">"{pm.notes}"</div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* R2.6: Location History */}
                    {assetData.locationHistory && assetData.locationHistory.length > 0 && (
                        <div className="mt-8 p-6 bg-emerald-50 rounded-2xl border border-emerald-200">
                            <h4 className="text-sm font-semibold text-gray-900 mb-4">Complete Location History</h4>
                            <div className="space-y-2">
                                {assetData.locationHistory.map((loc, idx) => (
                                    <div key={idx} className="bg-white rounded-lg p-3 border border-gray-200 flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <MapPin className={`w-4 h-4 ${loc.status === 'idle' ? 'text-orange-600' : loc.status === 'in-use' ? 'text-blue-600' : 'text-gray-600'}`} />
                                            <div>
                                                <div className="font-semibold text-gray-900 text-sm">{loc.location}</div>
                                                <div className="text-xs text-gray-500">
                                                    {loc.arrivedAt} {loc.departedAt && `→ ${loc.departedAt}`}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-sm font-semibold text-gray-900">{loc.duration}</div>
                                            <div className={`text-xs font-medium ${
                                                loc.status === 'idle' ? 'text-orange-600' :
                                                loc.status === 'in-use' ? 'text-blue-600' :
                                                loc.status === 'repair' ? 'text-red-600' :
                                                'text-emerald-600'
                                            }`}>
                                                {loc.status.toUpperCase()}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Summary */}
                    <div className="mt-8 p-6 bg-gray-50 rounded-2xl border border-gray-200">
                        <h4 className="text-sm font-semibold text-gray-900 mb-4">Lifecycle Summary</h4>
                        <div className="grid grid-cols-3 gap-4">
                            <div>
                                <div className="text-sm text-gray-500">Total Events</div>
                                <div className="text-2xl font-semibold text-gray-900">{assetData.events.length}</div>
                            </div>
                            <div>
                                <div className="text-sm text-gray-500">Total Cycle Time</div>
                                <div className="text-2xl font-semibold text-gray-900">{assetData.totalCycleTime}</div>
                            </div>
                            <div>
                                <div className="text-sm text-gray-500">Bottlenecks</div>
                                <div className={`text-2xl font-semibold ${assetData.bottleneckCount > 0 ? 'text-orange-600' : 'text-emerald-600'}`}>
                                    {assetData.bottleneckCount}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-gray-200 bg-gray-50 flex justify-between items-center">
                    <div className="text-sm text-gray-500">
                        {assetData.bottleneckCount > 0 ? (
                            <span className="text-orange-600 font-medium">Recommend reviewing bottlenecks for process optimization</span>
                        ) : (
                            <span className="text-emerald-600 font-medium flex items-center gap-2">
                                <CheckCircle2 className="w-4 h-4" />
                                No bottlenecks detected - optimal flow
                            </span>
                        )}
                    </div>
                    <button
                        onClick={onClose}
                        className="px-6 py-2 bg-gray-900 hover:bg-gray-800 text-white text-sm font-medium rounded-xl transition-colors"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    )
}
