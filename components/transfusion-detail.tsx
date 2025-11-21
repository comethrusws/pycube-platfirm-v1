'use client'

import { ChevronDown, Building2, LayoutGrid, Droplet, AlertTriangle, Search, Barcode, Plus, FileText, Bell } from 'lucide-react'

interface TransfusionDetailProps {
    isOpen: boolean
    onClose: () => void
}

export function TransfusionDetail({ isOpen, onClose }: TransfusionDetailProps) {
    if (!isOpen) return null

    return (
        <div className="bg-gray-50 border-t border-b border-gray-200 py-8 animate-in slide-in-from-top duration-300">
            <div className="max-w-7xl mx-auto px-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-red-100 rounded-lg">
                            <Droplet className="w-6 h-6 text-red-600" />
                        </div>
                        <h2 className="text-2xl font-semibold text-gray-900">Blood Tracking System</h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                    >
                        <ChevronDown className="w-5 h-5 text-gray-600" />
                    </button>
                </div>

                {/* Overview Cards */}
                <div className="grid grid-cols-4 gap-6 mb-8">
                    {[
                        { label: 'Hospitals', value: '15', icon: Building2, color: 'text-blue-600', bg: 'bg-blue-50' },
                        { label: 'Departments', value: '82', icon: LayoutGrid, color: 'text-purple-600', bg: 'bg-purple-50' },
                        { label: 'Blood Bags', value: '73', icon: Droplet, color: 'text-red-600', bg: 'bg-red-50' },
                        { label: 'Active Alerts', value: '24', icon: AlertTriangle, color: 'text-orange-600', bg: 'bg-orange-50' },
                    ].map((card) => (
                        <div key={card.label} className={`${card.bg} rounded-xl p-6 flex flex-col items-center justify-center text-center shadow-sm border border-white/50`}>
                            <card.icon className={`w-8 h-8 ${card.color} mb-3`} />
                            <div className={`text-sm font-medium ${card.color} opacity-80 mb-1`}>{card.label}</div>
                            <div className={`text-3xl font-bold ${card.color}`}>{card.value}</div>
                        </div>
                    ))}
                </div>

                {/* Map Section */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-2">
                            <Building2 className="w-5 h-5 text-gray-500" />
                            <h3 className="text-lg font-semibold text-gray-900">Hospital Health System - Hospital Network</h3>
                        </div>
                        <div className="flex gap-4">
                            <select className="bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-64 p-2.5">
                                <option>All Hospitals</option>
                                <option>St. John Hospital</option>
                                <option>Providence Southfield Hospital</option>
                            </select>
                            <button className="text-gray-600 hover:bg-gray-100 px-4 py-2 rounded-lg text-sm font-medium border border-gray-200 transition-colors">
                                Refresh Data
                            </button>
                        </div>
                    </div>

                    <div className="aspect-[21/9] bg-gray-100 rounded-xl relative overflow-hidden group">
                        {/* Mock Map Background */}
                        <div className="absolute inset-0 bg-[url('https://api.mapbox.com/styles/v1/mapbox/light-v10/static/-83.1,42.4,9,0/1200x600?access_token=pk.mock')] bg-cover opacity-50" />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <p className="text-gray-400 font-medium">Interactive Hospital Network Map</p>
                        </div>

                        {/* Mock Map Pins */}
                        <div className="absolute top-1/3 left-1/2 w-3 h-3 bg-red-500 rounded-full ring-4 ring-red-500/20 animate-pulse" />
                        <div className="absolute top-1/2 left-1/3 w-3 h-3 bg-blue-500 rounded-full" />
                        <div className="absolute bottom-1/3 right-1/3 w-3 h-3 bg-green-500 rounded-full" />
                    </div>

                    <div className="mt-4 text-center text-sm text-gray-500">
                        Showing all 15 Hospital locations across Michigan
                    </div>
                </div>

                {/* Bottom Section: Alerts & Activity */}
                <div className="grid grid-cols-2 gap-8 mb-8">
                    {/* Recent Alerts */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex items-center gap-2">
                            <AlertTriangle className="w-4 h-4 text-gray-500" />
                            <h3 className="font-semibold text-gray-900">Recent Alerts</h3>
                        </div>
                        <div className="divide-y divide-gray-100">
                            {[
                                { text: "Last violation at Main Blood Bank Freezer by Staff 3. Missing scan detected.", time: "10m ago", type: "critical" },
                                { text: "Contamination inspection required for Batch #48202.", time: "45m ago", type: "warning" },
                                { text: "Temperature deviation in ICU ColdStorage #1.", time: "2h ago", type: "warning" },
                            ].map((alert, i) => (
                                <div key={i} className="p-4 hover:bg-gray-50 transition-colors flex gap-3">
                                    <div className={`w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 ${alert.type === 'critical' ? 'bg-red-500' : 'bg-orange-500'}`} />
                                    <div>
                                        <p className="text-sm text-gray-600 leading-relaxed">{alert.text}</p>
                                        <p className="text-xs text-gray-400 mt-1">{alert.time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Recent Activity */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex items-center gap-2">
                            <FileText className="w-4 h-4 text-gray-500" />
                            <h3 className="font-semibold text-gray-900">Recent Activity</h3>
                        </div>
                        <div className="divide-y divide-gray-100">
                            {[
                                { id: "HF-HOS-Cryoprecipitate-07310642-004", action: "out", time: "2025-07-31 11:31", loc: "Main Blood Bank ColdStorage" },
                                { id: "HF-HOS-RBC-07310642-008", action: "in", time: "2025-07-31 03:09", loc: "ICU ColdStorage #1" },
                                { id: "HF-DET-RBC-002", action: "out", time: "2025-07-31 00:38", loc: "Blood Bank Storage ColdStorage" },
                            ].map((activity, i) => (
                                <div key={i} className="p-4 hover:bg-gray-50 transition-colors flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-blue-600">{activity.id}</p>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className={`text-xs font-medium px-1.5 py-0.5 rounded ${activity.action === 'in' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                                                {activity.action.toUpperCase()}
                                            </span>
                                            <span className="text-xs text-gray-400">{activity.time}</span>
                                        </div>
                                    </div>
                                    <div className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                                        {activity.loc}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    <div className="flex items-center gap-2 mb-4">
                        <div className="w-1 h-4 bg-blue-600 rounded-full" />
                        <h3 className="font-semibold text-gray-900">Quick Actions</h3>
                    </div>
                    <div className="grid grid-cols-4 gap-4">
                        <button className="flex items-center justify-center gap-2 bg-indigo-900 hover:bg-indigo-800 text-white py-3 px-4 rounded-lg transition-colors font-medium text-sm">
                            <Barcode className="w-4 h-4" />
                            Scan Barcode
                        </button>
                        <button className="flex items-center justify-center gap-2 bg-indigo-900 hover:bg-indigo-800 text-white py-3 px-4 rounded-lg transition-colors font-medium text-sm">
                            <Plus className="w-4 h-4" />
                            Add Blood Bag
                        </button>
                        <button className="flex items-center justify-center gap-2 bg-indigo-900 hover:bg-indigo-800 text-white py-3 px-4 rounded-lg transition-colors font-medium text-sm">
                            <FileText className="w-4 h-4" />
                            Create Order
                        </button>
                        <button className="flex items-center justify-center gap-2 bg-indigo-900 hover:bg-indigo-800 text-white py-3 px-4 rounded-lg transition-colors font-medium text-sm">
                            <Bell className="w-4 h-4" />
                            View Alerts
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
