'use client'

import { useState } from 'react'
import { ChevronDown, Building2, Droplet, AlertTriangle, Snowflake, LayoutGrid } from 'lucide-react'

interface TransfusionDetailProps {
    isOpen: boolean
    onClose: () => void
}

const hospitals = [
    { id: 1, name: 'St. John Hospital', x: 45, y: 40, bags: 37, depts: 6, coldStorage: 10, alerts: 2 },
    { id: 2, name: 'Providence Southfield', x: 55, y: 35, bags: 42, depts: 9, coldStorage: 12, alerts: 0 },
    { id: 3, name: 'Genesys Hospital', x: 30, y: 25, bags: 28, depts: 5, coldStorage: 8, alerts: 1 },
    { id: 4, name: 'Warren Hospital', x: 65, y: 55, bags: 31, depts: 4, coldStorage: 6, alerts: 0 },
    { id: 5, name: 'Rochester Hospital', x: 70, y: 30, bags: 45, depts: 7, coldStorage: 11, alerts: 0 },
    { id: 6, name: 'Beaumont Troy', x: 60, y: 28, bags: 55, depts: 8, coldStorage: 14, alerts: 0 },
    { id: 7, name: 'Henry Ford West', x: 48, y: 45, bags: 62, depts: 10, coldStorage: 15, alerts: 1 },
    { id: 8, name: 'Sinai-Grace', x: 52, y: 50, bags: 33, depts: 5, coldStorage: 7, alerts: 0 },
    { id: 9, name: 'Harper University', x: 50, y: 52, bags: 40, depts: 6, coldStorage: 9, alerts: 0 },
    { id: 10, name: 'Detroit Receiving', x: 51, y: 53, bags: 38, depts: 6, coldStorage: 8, alerts: 0 },
    { id: 11, name: 'Hutzel Women\'s', x: 49, y: 51, bags: 25, depts: 4, coldStorage: 5, alerts: 0 },
    { id: 12, name: 'Karmanos Cancer Ctr', x: 50, y: 54, bags: 30, depts: 5, coldStorage: 6, alerts: 0 },
    { id: 13, name: 'Children\'s Hospital', x: 51, y: 55, bags: 22, depts: 4, coldStorage: 5, alerts: 0 },
    { id: 14, name: 'Ascension Macomb', x: 62, y: 32, bags: 48, depts: 7, coldStorage: 10, alerts: 0 },
    { id: 15, name: 'McLaren Macomb', x: 68, y: 25, bags: 35, depts: 5, coldStorage: 8, alerts: 0 },
]

export function TransfusionDetail({ isOpen, onClose }: TransfusionDetailProps) {
    const [selectedHospitalId, setSelectedHospitalId] = useState<number | null>(null)

    if (!isOpen) return null

    // Calculate aggregated stats
    const totalBags = hospitals.reduce((acc, h) => acc + h.bags, 0)
    const totalAlerts = hospitals.reduce((acc, h) => acc + h.alerts, 0)
    const totalDepts = hospitals.reduce((acc, h) => acc + h.depts, 0)
    const totalColdStorage = hospitals.reduce((acc, h) => acc + h.coldStorage, 0)

    const selectedHospital = selectedHospitalId
        ? hospitals.find(h => h.id === selectedHospitalId)!
        : {
            name: 'All Hospitals',
            bags: totalBags,
            depts: totalDepts,
            coldStorage: totalColdStorage,
            alerts: totalAlerts
        }

    return (
        <div className="bg-gray-50 border-t border-b border-gray-200 py-8 animate-in slide-in-from-top duration-300">
            <div className="max-w-7xl mx-auto px-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-semibold text-gray-900">Transfusion Medicine Analytics</h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                    >
                        <ChevronDown className="w-5 h-5 text-gray-600" />
                    </button>
                </div>

                {/* Top Stats Row - Cleaner, consistent look */}
                <div className="grid grid-cols-3 gap-6 mb-6">
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-500">Total Hospitals</p>
                            <h3 className="text-3xl font-bold text-gray-900 mt-1">{hospitals.length}</h3>
                        </div>
                        <div className="p-3 bg-gray-50 rounded-xl">
                            <Building2 className="w-6 h-6 text-gray-600" />
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-500">Total Blood Bags</p>
                            <h3 className="text-3xl font-bold text-gray-900 mt-1">{totalBags.toLocaleString()}</h3>
                        </div>
                        <div className="p-3 bg-gray-50 rounded-xl">
                            <Droplet className="w-6 h-6 text-gray-600" />
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-500">Critical Alerts</p>
                            <h3 className="text-3xl font-bold text-gray-900 mt-1">{totalAlerts}</h3>
                        </div>
                        <div className="p-3 bg-gray-50 rounded-xl">
                            <AlertTriangle className="w-6 h-6 text-gray-600" />
                        </div>
                    </div>
                </div>

                {/* Main Content: Map & List */}
                <div className="grid grid-cols-12 gap-6 mb-8">
                    {/* Hospital List */}
                    <div className="col-span-4 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col h-[500px]">
                        <div className="p-5 border-b border-gray-100 bg-gray-50/50">
                            <h3 className="font-semibold text-gray-900">Hospital Network</h3>
                        </div>
                        <div className="overflow-y-auto flex-1 p-3 space-y-1">
                            <button
                                onClick={() => setSelectedHospitalId(null)}
                                className={`w-full text-left p-3 rounded-xl transition-all duration-200 flex items-center justify-between ${selectedHospitalId === null
                                        ? 'bg-blue-50 border-blue-100 ring-1 ring-blue-100'
                                        : 'hover:bg-gray-50 border border-transparent'
                                    }`}
                            >
                                <span className={`font-medium text-sm ${selectedHospitalId === null ? 'text-blue-900' : 'text-gray-700'}`}>
                                    All Hospitals
                                </span>
                            </button>
                            {hospitals.map((hospital) => (
                                <button
                                    key={hospital.id}
                                    onClick={() => setSelectedHospitalId(hospital.id)}
                                    className={`w-full text-left p-3 rounded-xl transition-all duration-200 flex items-center justify-between ${selectedHospitalId === hospital.id
                                        ? 'bg-blue-50 border-blue-100 ring-1 ring-blue-100'
                                        : 'hover:bg-gray-50 border border-transparent'
                                        }`}
                                >
                                    <span className={`font-medium text-sm ${selectedHospitalId === hospital.id ? 'text-blue-900' : 'text-gray-700'}`}>
                                        {hospital.name}
                                    </span>
                                    {hospital.alerts > 0 && (
                                        <div className="w-2 h-2 bg-red-500 rounded-full" />
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Interactive Map */}
                    <div className="col-span-8 bg-white rounded-2xl shadow-sm border border-gray-100 p-4 h-[500px] relative overflow-hidden">
                        <div className="absolute inset-0 m-4 rounded-xl overflow-hidden bg-gray-100 border border-gray-100">
                            <img
                                src="/map.png"
                                alt="Hospital Network Map"
                                className="w-full h-full object-cover opacity-90"
                            />

                            {hospitals.map((hospital) => (
                                <button
                                    key={hospital.id}
                                    onClick={() => setSelectedHospitalId(hospital.id)}
                                    className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 group ${selectedHospitalId === hospital.id ? 'z-20 scale-125' : 'z-10 hover:scale-110'
                                        }`}
                                    style={{ left: `${hospital.x}%`, top: `${hospital.y}%` }}
                                >
                                    <div className={`relative flex items-center justify-center w-4 h-4 rounded-full shadow-sm border-2 border-white ${hospital.alerts > 0 ? 'bg-red-500' : (selectedHospitalId === hospital.id ? 'bg-blue-600' : 'bg-blue-400')
                                        }`}>
                                    </div>

                                    {/* Tooltip */}
                                    <div className={`absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-white px-3 py-2 rounded-lg shadow-lg border border-gray-100 whitespace-nowrap transition-opacity duration-200 z-30 ${selectedHospitalId === hospital.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                                        }`}>
                                        <p className="text-xs font-bold text-gray-900">{hospital.name}</p>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom Detail Section - Specific Cards */}
                <div className="space-y-6">
                    <div className="flex items-center justify-center">
                        <h3 className="text-xl font-semibold text-gray-800">{selectedHospital.name}</h3>
                    </div>

                    <div className="grid grid-cols-3 gap-6">
                        {/* Blood Bags Card */}
                        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center hover:shadow-md transition-shadow">
                            <h4 className="text-4xl font-bold text-gray-900 mb-2">{selectedHospital.bags.toLocaleString()}</h4>
                            <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">Blood Bags</p>
                        </div>

                        {/* Departments Card */}
                        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center hover:shadow-md transition-shadow">
                            <h4 className="text-4xl font-bold text-gray-900 mb-2">{selectedHospital.depts}</h4>
                            <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">Departments</p>
                        </div>

                        {/* ColdStorages Card */}
                        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center hover:shadow-md transition-shadow">
                            <h4 className="text-4xl font-bold text-gray-900 mb-2">{selectedHospital.coldStorage}</h4>
                            <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">ColdStorages</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
