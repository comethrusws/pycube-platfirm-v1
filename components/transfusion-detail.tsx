'use client'

import { useState } from 'react'
import { ChevronDown, Building2, Droplet, AlertTriangle, MapPin, Thermometer, Activity } from 'lucide-react'

interface TransfusionDetailProps {
    isOpen: boolean
    onClose: () => void
}

const hospitals = [
    { id: 1, name: 'St. John Hospital', x: 45, y: 40, bags: 120, alerts: 2, temp: '3.4°C' },
    { id: 2, name: 'Providence Southfield', x: 55, y: 35, bags: 85, alerts: 0, temp: '4.1°C' },
    { id: 3, name: 'Genesys Hospital', x: 30, y: 25, bags: 210, alerts: 5, temp: '2.8°C' },
    { id: 4, name: 'Warren Hospital', x: 65, y: 55, bags: 64, alerts: 1, temp: '3.9°C' },
    { id: 5, name: 'Rochester Hospital', x: 70, y: 30, bags: 92, alerts: 0, temp: '3.5°C' },
]

export function TransfusionDetail({ isOpen, onClose }: TransfusionDetailProps) {
    const [selectedHospitalId, setSelectedHospitalId] = useState<number | null>(null)

    if (!isOpen) return null

    const selectedHospital = hospitals.find(h => h.id === selectedHospitalId) || hospitals[0]

    return (
        <div className="bg-gray-50 border-t border-b border-gray-200 py-8 animate-in slide-in-from-top duration-300">
            <div className="max-w-7xl mx-auto px-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-semibold text-gray-900">Transfusion Medicine - Network Analytics</h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                    >
                        <ChevronDown className="w-5 h-5 text-gray-600" />
                    </button>
                </div>

                {/* Top Stats Row */}
                <div className="grid grid-cols-3 gap-6 mb-6">
                    <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                        <div className="flex items-start justify-between mb-4">
                            <div>
                                <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Total Hospitals</p>
                                <h3 className="text-3xl font-semibold text-gray-900 mt-2">15</h3>
                            </div>
                            <div className="p-3 bg-blue-50 rounded-2xl">
                                <Building2 className="w-6 h-6 text-blue-600" />
                            </div>
                        </div>
                        <div className="text-sm text-gray-600">
                            <span className="text-emerald-600 font-medium">100%</span> reporting
                        </div>
                    </div>

                    <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                        <div className="flex items-start justify-between mb-4">
                            <div>
                                <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Total Blood Bags</p>
                                <h3 className="text-3xl font-semibold text-gray-900 mt-2">1,248</h3>
                            </div>
                            <div className="p-3 bg-red-50 rounded-2xl">
                                <Droplet className="w-6 h-6 text-red-600" />
                            </div>
                        </div>
                        <div className="text-sm text-gray-600">
                            <span className="text-emerald-600 font-medium">+12%</span> vs last week
                        </div>
                    </div>

                    <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                        <div className="flex items-start justify-between mb-4">
                            <div>
                                <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Critical Alerts</p>
                                <h3 className="text-3xl font-semibold text-gray-900 mt-2">3</h3>
                            </div>
                            <div className="p-3 bg-orange-50 rounded-2xl">
                                <AlertTriangle className="w-6 h-6 text-orange-600" />
                            </div>
                        </div>
                        <div className="text-sm text-gray-600">
                            Requires immediate attention
                        </div>
                    </div>
                </div>

                {/* Main Content: Map & List */}
                <div className="grid grid-cols-12 gap-6 mb-6">
                    {/* Hospital List */}
                    <div className="col-span-4 bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden flex flex-col h-[500px]">
                        <div className="p-6 border-b border-gray-100">
                            <h3 className="font-semibold text-gray-900">Hospital Network</h3>
                        </div>
                        <div className="overflow-y-auto flex-1 p-4 space-y-2">
                            {hospitals.map((hospital) => (
                                <button
                                    key={hospital.id}
                                    onClick={() => setSelectedHospitalId(hospital.id)}
                                    className={`w-full text-left p-4 rounded-2xl transition-all duration-200 flex items-center justify-between ${selectedHospitalId === hospital.id
                                            ? 'bg-blue-50 border-blue-200 ring-1 ring-blue-200'
                                            : 'hover:bg-gray-50 border border-transparent'
                                        }`}
                                >
                                    <div>
                                        <p className={`font-medium ${selectedHospitalId === hospital.id ? 'text-blue-900' : 'text-gray-900'}`}>
                                            {hospital.name}
                                        </p>
                                        <p className="text-xs text-gray-500 mt-1">{hospital.bags} units available</p>
                                    </div>
                                    {hospital.alerts > 0 && (
                                        <div className="flex items-center gap-1 px-2 py-1 bg-red-100 rounded-full">
                                            <AlertTriangle className="w-3 h-3 text-red-600" />
                                            <span className="text-xs font-medium text-red-700">{hospital.alerts}</span>
                                        </div>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Interactive Map */}
                    <div className="col-span-8 bg-white rounded-3xl shadow-sm border border-gray-100 p-4 h-[500px] relative overflow-hidden">
                        <div className="absolute inset-0 m-4 rounded-2xl overflow-hidden bg-gray-100">
                            {/* Map Image */}
                            <img
                                src="/map.png"
                                alt="Hospital Network Map"
                                className="w-full h-full object-cover opacity-80"
                            />

                            {/* Map Pins */}
                            {hospitals.map((hospital) => (
                                <button
                                    key={hospital.id}
                                    onClick={() => setSelectedHospitalId(hospital.id)}
                                    className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 group ${selectedHospitalId === hospital.id ? 'z-10 scale-110' : 'z-0 hover:scale-110'
                                        }`}
                                    style={{ left: `${hospital.x}%`, top: `${hospital.y}%` }}
                                >
                                    <div className={`relative flex items-center justify-center w-12 h-12 rounded-full shadow-lg border-4 border-white ${hospital.alerts > 0 ? 'bg-red-500' : 'bg-blue-500'
                                        }`}>
                                        <Building2 className="w-5 h-5 text-white" />
                                        {selectedHospitalId === hospital.id && (
                                            <div className="absolute -bottom-2 w-3 h-3 bg-white transform rotate-45" />
                                        )}
                                    </div>
                                    {/* Tooltip */}
                                    <div className={`absolute bottom-full mb-3 left-1/2 transform -translate-x-1/2 bg-white px-3 py-2 rounded-xl shadow-xl whitespace-nowrap transition-opacity duration-200 ${selectedHospitalId === hospital.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                                        }`}>
                                        <p className="text-sm font-bold text-gray-900">{hospital.name}</p>
                                        <p className="text-xs text-gray-500">{hospital.bags} units</p>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom Detail Section */}
                <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className="text-xl font-semibold text-gray-900">{selectedHospital.name}</h3>
                            <p className="text-sm text-gray-500">Real-time facility status</p>
                        </div>
                        <div className="flex gap-3">
                            <span className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-sm font-medium flex items-center gap-2">
                                <Activity className="w-4 h-4" />
                                Operational
                            </span>
                        </div>
                    </div>

                    <div className="grid grid-cols-4 gap-8">
                        <div className="space-y-1">
                            <p className="text-sm text-gray-500">Blood Units</p>
                            <p className="text-2xl font-semibold text-gray-900">{selectedHospital.bags}</p>
                            <div className="w-full bg-gray-100 rounded-full h-1.5 mt-2">
                                <div className="bg-red-500 h-1.5 rounded-full" style={{ width: '75%' }} />
                            </div>
                        </div>
                        <div className="space-y-1">
                            <p className="text-sm text-gray-500">Avg Temperature</p>
                            <div className="flex items-center gap-2">
                                <Thermometer className="w-5 h-5 text-blue-500" />
                                <p className="text-2xl font-semibold text-gray-900">{selectedHospital.temp}</p>
                            </div>
                            <p className="text-xs text-emerald-600">Optimal range</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-sm text-gray-500">Active Alerts</p>
                            <p className={`text-2xl font-semibold ${selectedHospital.alerts > 0 ? 'text-red-600' : 'text-gray-900'}`}>
                                {selectedHospital.alerts}
                            </p>
                            <p className="text-xs text-gray-400">Last 24 hours</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-sm text-gray-500">Last Sync</p>
                            <p className="text-2xl font-semibold text-gray-900">2m ago</p>
                            <p className="text-xs text-gray-400">Auto-refresh on</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
