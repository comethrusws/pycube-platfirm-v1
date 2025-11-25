'use client'

import { AlertCircle, ArrowRight } from 'lucide-react'

export function FacilityTable() {
    const data = [
        { facility: 'Main Lab', total: '7,400', traceable: '7,030', coverage: '95%', breaks: 12, tat: '42 min' },
        { facility: 'OR Annex', total: '1,850', traceable: '1,552', coverage: '84%', breaks: 28, tat: '67 min' },
        { facility: 'ED', total: '1,210', traceable: '1,010', coverage: '83%', breaks: 35, tat: '59 min' },
        { facility: 'ICU', total: '820', traceable: '762', coverage: '93%', breaks: 6, tat: '51 min' },
        { facility: 'Clinic', total: '530', traceable: '488', coverage: '92%', breaks: 3, tat: '48 min' },
    ]

    return (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
            <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 text-gray-500">
                    <tr>
                        <th className="px-6 py-3 font-medium">Facility</th>
                        <th className="px-6 py-3 font-medium">Total Specimens</th>
                        <th className="px-6 py-3 font-medium">Traceable</th>
                        <th className="px-6 py-3 font-medium">Coverage %</th>
                        <th className="px-6 py-3 font-medium">Breaks</th>
                        <th className="px-6 py-3 font-medium">Avg TAT</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {data.map((row) => (
                        <tr key={row.facility} className="hover:bg-gray-50/50 transition-colors">
                            <td className="px-6 py-3 font-medium text-gray-900">{row.facility}</td>
                            <td className="px-6 py-3 text-gray-600">{row.total}</td>
                            <td className="px-6 py-3 text-gray-600">{row.traceable}</td>
                            <td className="px-6 py-3">
                                <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${parseInt(row.coverage) >= 90 ? 'bg-emerald-50 text-emerald-700' :
                                    parseInt(row.coverage) >= 80 ? 'bg-amber-50 text-amber-700' : 'bg-red-50 text-red-700'
                                    }`}>
                                    {row.coverage}
                                </span>
                            </td>
                            <td className="px-6 py-3 text-gray-600">{row.breaks}</td>
                            <td className="px-6 py-3 text-gray-600">{row.tat}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export function DepartmentTable() {
    const data = [
        { dept: 'OR', total: '2,100', traceable: '1,638', partial: '12%', missing: '10%', delays: '15%', tat: '45 min', issues: 'High' },
        { dept: 'ED', total: '1,800', traceable: '1,494', partial: '10%', missing: '7%', delays: '12%', tat: '38 min', issues: 'Med' },
        { dept: 'ICU', total: '1,200', traceable: '1,116', partial: '5%', missing: '2%', delays: '5%', tat: '30 min', issues: 'Low' },
        { dept: 'Med/Surg', total: '900', traceable: '846', partial: '4%', missing: '2%', delays: '3%', tat: '28 min', issues: 'Low' },
        { dept: 'Oncology', total: '600', traceable: '576', partial: '3%', missing: '1%', delays: '2%', tat: '25 min', issues: 'Low' },
    ]

    return (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
            <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 text-gray-500">
                    <tr>
                        <th className="px-6 py-3 font-medium">Dept</th>
                        <th className="px-6 py-3 font-medium">Total</th>
                        <th className="px-6 py-3 font-medium">Traceable</th>
                        <th className="px-6 py-3 font-medium">Partial</th>
                        <th className="px-6 py-3 font-medium">Missing</th>
                        <th className="px-6 py-3 font-medium">Delays</th>
                        <th className="px-6 py-3 font-medium">Avg TAT</th>
                        <th className="px-6 py-3 font-medium">Issues</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {data.map((row) => (
                        <tr key={row.dept} className="hover:bg-gray-50/50 transition-colors">
                            <td className="px-6 py-3 font-medium text-gray-900">{row.dept}</td>
                            <td className="px-6 py-3 text-gray-600">{row.total}</td>
                            <td className="px-6 py-3 text-gray-600">{row.traceable}</td>
                            <td className="px-6 py-3 text-amber-600">{row.partial}</td>
                            <td className="px-6 py-3 text-red-600">{row.missing}</td>
                            <td className="px-6 py-3 text-gray-600">{row.delays}</td>
                            <td className="px-6 py-3 text-gray-600">{row.tat}</td>
                            <td className="px-6 py-3">
                                <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${row.issues === 'High' ? 'bg-red-50 text-red-700' :
                                    row.issues === 'Med' ? 'bg-amber-50 text-amber-700' : 'bg-emerald-50 text-emerald-700'
                                    }`}>
                                    {row.issues}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export function CustodyBreaksTable() {
    const data = [
        { id: '991283', type: 'Blood', stage: 'Lab Arrival', facility: 'ED', lastKnown: '18:42', timeLost: '22 min' },
        { id: '882104', type: 'Tissue', stage: 'Courier Gap', facility: 'OR', lastKnown: '15:11', timeLost: '49 min' },
        { id: '772991', type: 'Urine', stage: 'Location Error', facility: 'Clinic', lastKnown: '10:09', timeLost: '14 min' },
        { id: '663812', type: 'Pathology', stage: 'Handover', facility: 'ICU', lastKnown: '09:15', timeLost: '08 min' },
        { id: '554723', type: 'Blood', stage: 'Transit', facility: 'Main Lab', lastKnown: '14:30', timeLost: '11 min' },
    ]

    return (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
            <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 text-gray-500">
                    <tr>
                        <th className="px-6 py-3 font-medium">Specimen ID</th>
                        <th className="px-6 py-3 font-medium">Type</th>
                        <th className="px-6 py-3 font-medium">Stage of Break</th>
                        <th className="px-6 py-3 font-medium">Facility</th>
                        <th className="px-6 py-3 font-medium">Last Known</th>
                        <th className="px-6 py-3 font-medium">Time Lost</th>
                        <th className="px-6 py-3 font-medium">Action</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {data.map((row) => (
                        <tr key={row.id} className="hover:bg-gray-50/50 transition-colors">
                            <td className="px-6 py-3 font-medium text-gray-900">#{row.id}</td>
                            <td className="px-6 py-3 text-gray-600">{row.type}</td>
                            <td className="px-6 py-3 text-red-600 font-medium flex items-center gap-1">
                                <AlertCircle className="w-3 h-3" />
                                {row.stage}
                            </td>
                            <td className="px-6 py-3 text-gray-600">{row.facility}</td>
                            <td className="px-6 py-3 text-gray-600">{row.lastKnown}</td>
                            <td className="px-6 py-3 text-gray-600">{row.timeLost}</td>
                            <td className="px-6 py-3">
                                <button className="text-blue-600 hover:text-blue-700 font-medium text-xs flex items-center gap-1">
                                    View <ArrowRight className="w-3 h-3" />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export function TransitRouteTable() {
    const data = [
        { route: 'OR Annex → Main Lab', volume: '450/day', avgTime: '18 min', missed: '2%', causes: 'Elevator delays', actions: 'Optimize' },
        { route: 'ED → Main Lab', volume: '320/day', avgTime: '12 min', missed: '1%', causes: 'None', actions: 'View' },
        { route: 'ICU → Main Lab', volume: '180/day', avgTime: '15 min', missed: '0.5%', causes: 'Staff shift', actions: 'View' },
        { route: 'Clinic → Main Lab', volume: '120/day', avgTime: '45 min', missed: '5%', causes: 'Traffic', actions: 'Route Plan' },
        { route: 'Oncology → Main Lab', volume: '90/day', avgTime: '22 min', missed: '1%', causes: 'Batching', actions: 'View' },
    ]

    return (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
            <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 text-gray-500">
                    <tr>
                        <th className="px-6 py-3 font-medium">Route</th>
                        <th className="px-6 py-3 font-medium">Volume</th>
                        <th className="px-6 py-3 font-medium">Avg Time</th>
                        <th className="px-6 py-3 font-medium">Missed Scans</th>
                        <th className="px-6 py-3 font-medium">Delay Causes</th>
                        <th className="px-6 py-3 font-medium">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {data.map((row) => (
                        <tr key={row.route} className="hover:bg-gray-50/50 transition-colors">
                            <td className="px-6 py-3 font-medium text-gray-900">{row.route}</td>
                            <td className="px-6 py-3 text-gray-600">{row.volume}</td>
                            <td className="px-6 py-3 text-gray-600">{row.avgTime}</td>
                            <td className="px-6 py-3 text-gray-600">{row.missed}</td>
                            <td className="px-6 py-3 text-gray-600">{row.causes}</td>
                            <td className="px-6 py-3">
                                <button className="text-blue-600 hover:text-blue-700 font-medium text-xs flex items-center gap-1">
                                    {row.actions} <ArrowRight className="w-3 h-3" />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
