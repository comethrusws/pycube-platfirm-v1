'use client'

import { ArrowLeft, MapPin, Clock, FileText, AlertCircle, CheckCircle2 } from 'lucide-react'

interface SpecimenDetailProps {
    onBack: () => void
}

export function SpecimenDetail({ onBack }: SpecimenDetailProps) {
    return (
        <div className="bg-gray-50 border-t border-b border-gray-200 py-8 animate-in slide-in-from-right duration-300">
            <div className="max-w-7xl mx-auto px-8">
                {/* Header */}
                <div className="flex items-center gap-4 mb-8">
                    <button
                        onClick={onBack}
                        className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5 text-gray-600" />
                    </button>
                    <div>
                        <div className="text-sm text-gray-500 mb-1">Specimen Digitization {'>'} Detail</div>
                        <h2 className="text-2xl font-semibold text-gray-900">Specimen Detail: #991283 — Blood Sample</h2>
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-8">
                    {/* Left Summary Panel */}
                    <div className="col-span-1 space-y-6">
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                            <h3 className="text-sm font-semibold text-gray-900 mb-4">Summary</h3>
                            <div className="space-y-4">
                                <div>
                                    <div className="text-xs text-gray-500 uppercase tracking-wider font-medium mb-1">Type</div>
                                    <div className="text-gray-900 font-medium">Blood Draw</div>
                                </div>
                                <div>
                                    <div className="text-xs text-gray-500 uppercase tracking-wider font-medium mb-1">Collected At</div>
                                    <div className="text-gray-900 font-medium">ED</div>
                                </div>
                                <div>
                                    <div className="text-xs text-gray-500 uppercase tracking-wider font-medium mb-1">Destination</div>
                                    <div className="text-gray-900 font-medium">Main Lab</div>
                                </div>
                                <div>
                                    <div className="text-xs text-gray-500 uppercase tracking-wider font-medium mb-1">Current Status</div>
                                    <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                                        Completed analysis
                                    </div>
                                </div>
                                <div>
                                    <div className="text-xs text-gray-500 uppercase tracking-wider font-medium mb-1">Chain-of-Custody</div>
                                    <div className="text-emerald-600 font-medium flex items-center gap-1">
                                        <CheckCircle2 className="w-4 h-4" /> Intact
                                    </div>
                                </div>
                                <div>
                                    <div className="text-xs text-gray-500 uppercase tracking-wider font-medium mb-1">Transit Time</div>
                                    <div className="text-gray-900 font-medium">42 min</div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                            <h3 className="text-sm font-semibold text-gray-900 mb-4">Actions</h3>
                            <div className="space-y-2">
                                <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-50 text-sm font-medium text-blue-600 transition-colors flex items-center gap-2">
                                    <MapPin className="w-4 h-4" /> View Location Map
                                </button>
                                <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-50 text-sm font-medium text-blue-600 transition-colors flex items-center gap-2">
                                    <FileText className="w-4 h-4" /> Open Chain-of-Custody Report
                                </button>
                                <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-50 text-sm font-medium text-blue-600 transition-colors flex items-center gap-2">
                                    <AlertCircle className="w-4 h-4" /> Notify Lab Director
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Center Timeline Panel */}
                    <div className="col-span-2">
                        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 h-full">
                            <h3 className="text-sm font-semibold text-gray-900 mb-6">Timeline</h3>
                            <div className="relative pl-8 space-y-8 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-gray-100">
                                <div className="relative">
                                    <div className="absolute -left-[37px] mt-1.5 w-3 h-3 rounded-full bg-blue-600 ring-4 ring-blue-50" />
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <div className="font-medium text-gray-900">Collected (ED)</div>
                                            <div className="text-sm text-gray-500 mt-1">Specimen collected by Nurse J. Doe</div>
                                        </div>
                                        <div className="text-sm font-medium text-gray-500 flex items-center gap-1">
                                            <Clock className="w-4 h-4" /> 14:02
                                        </div>
                                    </div>
                                </div>

                                <div className="relative">
                                    <div className="absolute -left-[37px] mt-1.5 w-3 h-3 rounded-full bg-blue-600 ring-4 ring-blue-50" />
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <div className="font-medium text-gray-900">Logged via scanner</div>
                                            <div className="text-sm text-gray-500 mt-1">Scanned at ED Station 4</div>
                                        </div>
                                        <div className="text-sm font-medium text-gray-500 flex items-center gap-1">
                                            <Clock className="w-4 h-4" /> 14:05
                                        </div>
                                    </div>
                                </div>

                                <div className="relative">
                                    <div className="absolute -left-[37px] mt-1.5 w-3 h-3 rounded-full bg-blue-600 ring-4 ring-blue-50" />
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <div className="font-medium text-gray-900">Courier pickup</div>
                                            <div className="text-sm text-gray-500 mt-1">Picked up by Courier Route #4</div>
                                        </div>
                                        <div className="text-sm font-medium text-gray-500 flex items-center gap-1">
                                            <Clock className="w-4 h-4" /> 14:18
                                        </div>
                                    </div>
                                </div>

                                <div className="relative">
                                    <div className="absolute -left-[37px] mt-1.5 w-3 h-3 rounded-full bg-blue-600 ring-4 ring-blue-50" />
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <div className="font-medium text-gray-900">Delivered to Main Lab</div>
                                            <div className="text-sm text-gray-500 mt-1">Received at Central Receiving</div>
                                        </div>
                                        <div className="text-sm font-medium text-gray-500 flex items-center gap-1">
                                            <Clock className="w-4 h-4" /> 14:41
                                        </div>
                                    </div>
                                </div>

                                <div className="relative">
                                    <div className="absolute -left-[37px] mt-1.5 w-3 h-3 rounded-full bg-emerald-500 ring-4 ring-emerald-50" />
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <div className="font-medium text-gray-900">Loaded into analyzer</div>
                                            <div className="text-sm text-gray-500 mt-1">Processing started on Analyzer B</div>
                                        </div>
                                        <div className="text-sm font-medium text-gray-500 flex items-center gap-1">
                                            <Clock className="w-4 h-4" /> 14:42
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
