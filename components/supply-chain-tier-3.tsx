'use client'

import { X, AlertTriangle, Clock, Package, TrendingDown, Thermometer, Truck, CheckCircle } from 'lucide-react'
import { BarChart, Bar, LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip as RechartsTooltip, CartesianGrid } from 'recharts'

interface SupplyChainTier3Props {
    category: string
    onClose: () => void
}

// High risk items stock data
const highRiskItems = [
    { item: 'CBC Reagent A', stock: 22, min: 30, max: 60, expiry: '12 days', status: 'critical', usage: 15 },
    { item: 'Meropenem Inj', stock: 88, min: 90, max: 180, expiry: '20 days', status: 'warning', usage: 12 },
    { item: 'IV Set 18G', stock: 820, min: 800, max: 1600, expiry: '8 days', status: 'warning', usage: 140 },
    { item: 'Surgical Gloves M', stock: 1450, min: 1500, max: 3000, expiry: '5 days', status: 'critical', usage: 280 },
    { item: 'Heparin Sodium', stock: 45, min: 50, max: 100, expiry: '15 days', status: 'warning', usage: 8 },
]

// Expiring items data
const expiringItems = [
    { item: 'IV Set 18G', batch: 'B-2341', quantity: 820, expiry: '2025-12-05', daysLeft: 8, value: '$4,100' },
    { item: 'Surgical Gloves M', batch: 'B-9823', quantity: 1450, expiry: '2025-12-02', daysLeft: 5, value: '$7,250' },
    { item: 'CBC Reagent A', batch: 'R-4521', quantity: 22, expiry: '2025-12-09', daysLeft: 12, value: '$8,800' },
    { item: 'Saline 500ml', batch: 'S-1192', quantity: 245, expiry: '2025-12-15', daysLeft: 18, value: '$1,225' },
    { item: 'Heparin Sodium', batch: 'H-8834', quantity: 45, expiry: '2025-12-12', daysLeft: 15, value: '$6,750' },
]

// Purchase orders data
const purchaseOrders = [
    { po: 'PO-2391', vendor: 'Medico Supplies', items: 'CBC Reagents, IV Sets', eta: '2 days', status: 'delay-risk', value: '$24K' },
    { po: 'PO-2399', vendor: 'Ultramed Labs', items: 'Lab Controls, Calibrators', eta: '6 days', status: 'on-track', value: '$18K' },
    { po: 'PO-2405', vendor: 'PharmaCorp', items: 'Antibiotics, Injections', eta: '4 days', status: 'on-track', value: '$32K' },
    { po: 'PO-2410', vendor: 'MediEquip Inc', items: 'Surgical Supplies', eta: '1 day', status: 'arriving', value: '$9.5K' },
]

// Vendor issues data
const vendorIssues = [
    { vendor: 'Medico Supplies', issue: 'Delayed delivery - PO-2391', severity: 'high', date: '2025-11-25', resolution: 'Escalated' },
    { vendor: 'Ultramed Labs', issue: 'Quality complaint - Batch R-4421', severity: 'medium', date: '2025-11-23', resolution: 'Under review' },
    { vendor: 'PharmaCorp', issue: 'Pricing discrepancy', severity: 'low', date: '2025-11-22', resolution: 'Resolved' },
    { vendor: 'LabTech Solutions', issue: 'Missing documentation', severity: 'medium', date: '2025-11-20', resolution: 'Pending' },
    { vendor: 'MediEquip Inc', issue: 'Partial shipment', severity: 'low', date: '2025-11-18', resolution: 'Resolved' },
]

// Temperature alerts data with historical trend
const temperatureHistory = [
    { time: '00:00', temp: 3.4 },
    { time: '04:00', temp: 3.2 },
    { time: '08:00', temp: 3.8 },
    { time: '12:00', temp: 6.2 },
    { time: '16:00', temp: 6.8 },
    { time: '20:00', temp: 6.5 },
]

export function SupplyChainTier3({ category, onClose }: SupplyChainTier3Props) {
    const renderContent = () => {
        switch (category) {
            case 'high-risk-items':
                return (
                    <div className="space-y-6">
                        <div className="flex items-center gap-3">
                            <AlertTriangle className="w-6 h-6 text-orange-500" />
                            <h3 className="text-xl font-bold text-gray-900">High Risk Inventory Items</h3>
                        </div>

                        {/* Summary Cards */}
                        <div className="grid grid-cols-3 gap-4">
                            <div className="bg-red-50 rounded-2xl p-4 border border-red-100">
                                <p className="text-xs font-semibold text-red-600 mb-2">Critical Items</p>
                                <p className="text-2xl font-semibold text-gray-900">2</p>
                            </div>
                            <div className="bg-orange-50 rounded-2xl p-4 border border-orange-100">
                                <p className="text-xs font-semibold text-orange-600 mb-2">Warning Items</p>
                                <p className="text-2xl font-semibold text-gray-900">3</p>
                            </div>
                            <div className="bg-amber-50 rounded-2xl p-4 border border-amber-100">
                                <p className="text-xs font-semibold text-amber-600 mb-2">Total Risk Value</p>
                                <p className="text-2xl font-semibold text-gray-900">$48K</p>
                            </div>
                        </div>

                        {/* Items Table */}
                        <div className="bg-white rounded-2xl p-6 border border-gray-100">
                            <h4 className="text-sm font-semibold text-gray-900 mb-4">Stock Details</h4>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b border-gray-100">
                                            <th className="text-left py-3 px-2 text-xs font-semibold text-gray-500 uppercase">Item Name</th>
                                            <th className="text-right py-3 px-2 text-xs font-semibold text-gray-500 uppercase">Current</th>
                                            <th className="text-right py-3 px-2 text-xs font-semibold text-gray-500 uppercase">Min/Max</th>
                                            <th className="text-right py-3 px-2 text-xs font-semibold text-gray-500 uppercase">Daily Usage</th>
                                            <th className="text-right py-3 px-2 text-xs font-semibold text-gray-500 uppercase">Days Left</th>
                                            <th className="text-left py-3 px-2 text-xs font-semibold text-gray-500 uppercase">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {highRiskItems.map((item, idx) => {
                                            const daysLeft = Math.floor(item.stock / item.usage)
                                            return (
                                                <tr key={idx} className="border-b border-gray-50 hover:bg-gray-50">
                                                    <td className="py-3 px-2 text-sm font-medium text-gray-900">{item.item}</td>
                                                    <td className="py-3 px-2 text-right">
                                                        <span className={`text-sm font-semibold ${item.stock < item.min ? 'text-red-600' : 'text-orange-600'}`}>
                                                            {item.stock}
                                                        </span>
                                                    </td>
                                                    <td className="py-3 px-2 text-right text-sm text-gray-600">
                                                        {item.min} / {item.max}
                                                    </td>
                                                    <td className="py-3 px-2 text-right text-sm text-gray-600">{item.usage}</td>
                                                    <td className="py-3 px-2 text-right">
                                                        <span className={`text-sm font-semibold ${daysLeft < 3 ? 'text-red-600' : 'text-orange-600'}`}>
                                                            ~{daysLeft}d
                                                        </span>
                                                    </td>
                                                    <td className="py-3 px-2">
                                                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${item.status === 'critical'
                                                            ? 'bg-red-50 text-red-700'
                                                            : 'bg-orange-50 text-orange-700'
                                                            }`}>
                                                            <div className={`w-1.5 h-1.5 rounded-full ${item.status === 'critical' ? 'bg-red-500' : 'bg-orange-500'
                                                                }`}></div>
                                                            {item.status === 'critical' ? 'Critical' : 'Warning'}
                                                        </span>
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Recommendations */}
                        <div className="bg-blue-50 rounded-2xl p-5 border border-blue-200">
                            <div className="flex items-start gap-3">
                                <TrendingDown className="w-5 h-5 text-blue-600 mt-0.5" />
                                <div>
                                    <h4 className="text-sm font-semibold text-blue-900 mb-2">Recommended Actions</h4>
                                    <ul className="text-sm text-blue-800 space-y-1">
                                        <li>• Place emergency order for CBC Reagent A (22 units vs 30 min)</li>
                                        <li>• Expedite PO-2391 delivery to prevent Meropenem stockout</li>
                                        <li>• Review daily usage patterns for Surgical Gloves to adjust min levels</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                )

            case 'expiring-items':
                return (
                    <div className="space-y-6">
                        <div className="flex items-center gap-3">
                            <Clock className="w-6 h-6 text-red-500" />
                            <h3 className="text-xl font-bold text-gray-900">Items Expiring in 30 Days</h3>
                        </div>

                        {/* Summary */}
                        <div className="grid grid-cols-3 gap-4">
                            <div className="bg-red-50 rounded-2xl p-4 border border-red-100">
                                <p className="text-xs font-semibold text-red-600 mb-2">Total Units</p>
                                <p className="text-2xl font-semibold text-gray-900">312</p>
                            </div>
                            <div className="bg-orange-50 rounded-2xl p-4 border border-orange-100">
                                <p className="text-xs font-semibold text-orange-600 mb-2">Total Value at Risk</p>
                                <p className="text-2xl font-semibold text-gray-900">$42K</p>
                            </div>
                            <div className="bg-amber-50 rounded-2xl p-4 border border-amber-100">
                                <p className="text-xs font-semibold text-amber-600 mb-2">Urgent (≤7 days)</p>
                                <p className="text-2xl font-semibold text-gray-900">2 items</p>
                            </div>
                        </div>

                        {/* Expiring Items Table */}
                        <div className="bg-white rounded-2xl p-6 border border-gray-100">
                            <h4 className="text-sm font-semibold text-gray-900 mb-4">Expiry Schedule</h4>
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-gray-100">
                                        <th className="text-left py-3 px-2 text-xs font-semibold text-gray-500 uppercase">Item</th>
                                        <th className="text-left py-3 px-2 text-xs font-semibold text-gray-500 uppercase">Batch</th>
                                        <th className="text-right py-3 px-2 text-xs font-semibold text-gray-500 uppercase">Quantity</th>
                                        <th className="text-left py-3 px-2 text-xs font-semibold text-gray-500 uppercase">Expiry Date</th>
                                        <th className="text-right py-3 px-2 text-xs font-semibold text-gray-500 uppercase">Days Left</th>
                                        <th className="text-right py-3 px-2 text-xs font-semibold text-gray-500 uppercase">Value</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {expiringItems.map((item, idx) => (
                                        <tr key={idx} className="border-b border-gray-50 hover:bg-gray-50">
                                            <td className="py-3 px-2 text-sm font-medium text-gray-900">{item.item}</td>
                                            <td className="py-3 px-2 text-sm text-gray-600">{item.batch}</td>
                                            <td className="py-3 px-2 text-right text-sm text-gray-600">{item.quantity}</td>
                                            <td className="py-3 px-2 text-sm text-gray-600">{item.expiry}</td>
                                            <td className="py-3 px-2 text-right">
                                                <span className={`text-sm font-semibold ${item.daysLeft <= 7 ? 'text-red-600' : item.daysLeft <= 14 ? 'text-orange-600' : 'text-amber-600'
                                                    }`}>
                                                    {item.daysLeft}d
                                                </span>
                                            </td>
                                            <td className="py-3 px-2 text-right text-sm font-medium text-gray-900">{item.value}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Actions */}
                        <div className="bg-emerald-50 rounded-2xl p-5 border border-emerald-200">
                            <div className="flex items-start gap-3">
                                <Package className="w-5 h-5 text-emerald-600 mt-0.5" />
                                <div>
                                    <h4 className="text-sm font-semibold text-emerald-900 mb-2">Wastage Prevention Actions</h4>
                                    <ul className="text-sm text-emerald-800 space-y-1">
                                        <li>• Prioritize Batch B-9823 (Surgical Gloves) for immediate distribution</li>
                                        <li>• Contact sister facilities for Batch B-2341 (IV Sets) transfer</li>
                                        <li>• Reduce future orders of CBC Reagent A by 20% to prevent recurrence</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                )

            case 'vendor-issues':
                return (
                    <div className="space-y-6">
                        <div className="flex items-center gap-3">
                            <Truck className="w-6 h-6 text-orange-500" />
                            <h3 className="text-xl font-bold text-gray-900">Vendor Issues & Tracking</h3>
                        </div>

                        {/* Summary */}
                        <div className="grid grid-cols-3 gap-4">
                            <div className="bg-red-50 rounded-2xl p-4 border border-red-100">
                                <p className="text-xs font-semibold text-red-600 mb-2">High Severity</p>
                                <p className="text-2xl font-semibold text-gray-900">1</p>
                            </div>
                            <div className="bg-orange-50 rounded-2xl p-4 border border-orange-100">
                                <p className="text-xs font-semibold text-orange-600 mb-2">Medium Severity</p>
                                <p className="text-2xl font-semibold text-gray-900">2</p>
                            </div>
                            <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-100">
                                <p className="text-xs font-semibold text-emerald-600 mb-2">Resolved</p>
                                <p className="text-2xl font-semibold text-gray-900">2</p>
                            </div>
                        </div>

                        {/* Issues Table */}
                        <div className="bg-white rounded-2xl p-6 border border-gray-100">
                            <h4 className="text-sm font-semibold text-gray-900 mb-4">Recent Issues</h4>
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-gray-100">
                                        <th className="text-left py-3 px-2 text-xs font-semibold text-gray-500 uppercase">Vendor</th>
                                        <th className="text-left py-3 px-2 text-xs font-semibold text-gray-500 uppercase">Issue</th>
                                        <th className="text-left py-3 px-2 text-xs font-semibold text-gray-500 uppercase">Severity</th>
                                        <th className="text-left py-3 px-2 text-xs font-semibold text-gray-500 uppercase">Date</th>
                                        <th className="text-left py-3 px-2 text-xs font-semibold text-gray-500 uppercase">Resolution</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {vendorIssues.map((issue, idx) => (
                                        <tr key={idx} className="border-b border-gray-50 hover:bg-gray-50">
                                            <td className="py-3 px-2 text-sm font-medium text-gray-900">{issue.vendor}</td>
                                            <td className="py-3 px-2 text-sm text-gray-600">{issue.issue}</td>
                                            <td className="py-3 px-2">
                                                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${issue.severity === 'high' ? 'bg-red-50 text-red-700' :
                                                    issue.severity === 'medium' ? 'bg-orange-50 text-orange-700' :
                                                        'bg-gray-50 text-gray-700'
                                                    }`}>
                                                    {issue.severity.charAt(0).toUpperCase() + issue.severity.slice(1)}
                                                </span>
                                            </td>
                                            <td className="py-3 px-2 text-sm text-gray-600">{issue.date}</td>
                                            <td className="py-3 px-2">
                                                <span className={`text-sm font-medium ${issue.resolution === 'Resolved' ? 'text-emerald-600' : 'text-gray-600'
                                                    }`}>
                                                    {issue.resolution}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* PO Pipeline */}
                        <div className="bg-white rounded-2xl p-6 border border-gray-100">
                            <h4 className="text-sm font-semibold text-gray-900 mb-4">Active Purchase Orders</h4>
                            <div className="space-y-3">
                                {purchaseOrders.map((po, idx) => (
                                    <div key={idx} className={`flex items-center justify-between p-4 rounded-xl border ${po.status === 'delay-risk' ? 'bg-red-50 border-red-100' :
                                        po.status === 'arriving' ? 'bg-emerald-50 border-emerald-100' :
                                            'bg-gray-50 border-gray-100'
                                        }`}>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="text-sm font-semibold text-gray-900">{po.po}</span>
                                                <span className={`text-xs px-2 py-0.5 rounded-full ${po.status === 'delay-risk' ? 'bg-red-100 text-red-700' :
                                                    po.status === 'arriving' ? 'bg-emerald-100 text-emerald-700' :
                                                        'bg-blue-100 text-blue-700'
                                                    }`}>
                                                    {po.status === 'delay-risk' ? 'Delay Risk' :
                                                        po.status === 'arriving' ? 'Arriving Soon' : 'On Track'}
                                                </span>
                                            </div>
                                            <div className="text-sm text-gray-600">{po.vendor}</div>
                                            <div className="text-xs text-gray-500 mt-1">{po.items}</div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-sm font-semibold text-gray-900">{po.value}</div>
                                            <div className="text-xs text-gray-500">ETA: {po.eta}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )

            case 'temp-alerts':
                return (
                    <div className="space-y-6">
                        <div className="flex items-center gap-3">
                            <Thermometer className="w-6 h-6 text-red-500" />
                            <h3 className="text-xl font-bold text-gray-900">Cold Chain Temperature Alerts</h3>
                        </div>

                        {/* Alert Summary */}
                        <div className="bg-red-50 rounded-2xl p-6 border border-red-200">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                                    <AlertTriangle className="w-6 h-6 text-red-600" />
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-lg font-semibold text-red-900 mb-2">Critical Alert: Blood Bank Fridge-4</h4>
                                    <p className="text-sm text-red-800 mb-3">
                                        Temperature out of range (6.8°C). Current reading exceeds maximum safe threshold of 6.0°C.
                                        Immediate action required to prevent inventory loss.
                                    </p>
                                    <div className="flex gap-3">
                                        <button className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors">
                                            Schedule Technician
                                        </button>
                                        <button className="px-4 py-2 bg-white text-red-600 rounded-lg text-sm font-medium border border-red-200 hover:bg-red-50 transition-colors">
                                            View Inventory at Risk
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Temperature Trend */}
                        <div className="bg-white rounded-2xl p-6 border border-gray-100">
                            <h4 className="text-sm font-semibold text-gray-900 mb-4">Temperature Trend (24h) - Fridge-4</h4>
                            <ResponsiveContainer width="100%" height={200}>
                                <LineChart data={temperatureHistory}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                    <XAxis dataKey="time" stroke="#9ca3af" style={{ fontSize: '11px' }} />
                                    <YAxis stroke="#9ca3af" style={{ fontSize: '11px' }} domain={[0, 8]} />
                                    <RechartsTooltip />
                                    <Line
                                        type="monotone"
                                        dataKey="temp"
                                        stroke="#ef4444"
                                        strokeWidth={2}
                                        dot={{ fill: '#ef4444', r: 4 }}
                                    />
                                    {/* Safe zone reference line */}
                                    <Line
                                        type="monotone"
                                        dataKey={() => 6.0}
                                        stroke="#22c55e"
                                        strokeDasharray="5 5"
                                        strokeWidth={1}
                                        dot={false}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                            <div className="flex items-center gap-4 mt-4 text-xs text-gray-500">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-0.5 bg-red-500"></div>
                                    <span>Actual Temperature</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-0.5 bg-emerald-500" style={{ borderTop: '1px dashed' }}></div>
                                    <span>Safe Threshold (6.0°C)</span>
                                </div>
                            </div>
                        </div>

                        {/* Inventory at Risk */}
                        <div className="bg-white rounded-2xl p-6 border border-gray-100">
                            <h4 className="text-sm font-semibold text-gray-900 mb-4">Inventory at Risk in Fridge-4</h4>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                    <div>
                                        <div className="text-sm font-medium text-gray-900">Blood Products</div>
                                        <div className="text-xs text-gray-500">RBC, Platelets, Plasma</div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-sm font-semibold text-gray-900">24 units</div>
                                        <div className="text-xs text-gray-500">~$9,600</div>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                    <div>
                                        <div className="text-sm font-medium text-gray-900">Vaccines</div>
                                        <div className="text-xs text-gray-500">Flu, Hepatitis B</div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-sm font-semibold text-gray-900">142 doses</div>
                                        <div className="text-xs text-gray-500">~$4,260</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Recommended Actions */}
                        <div className="bg-blue-50 rounded-2xl p-5 border border-blue-200">
                            <div className="flex items-start gap-3">
                                <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                                <div>
                                    <h4 className="text-sm font-semibold text-blue-900 mb-2">Immediate Actions</h4>
                                    <ul className="text-sm text-blue-800 space-y-1">
                                        <li>• Transfer critical inventory to Fridge-2 (currently 3.1°C)</li>
                                        <li>• Schedule emergency technician visit within 2 hours</li>
                                        <li>• Monitor temperature every 30 minutes until resolved</li>
                                        <li>• Document incident for compliance reporting</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                )

            default:
                return <div>No data available</div>
        }
    }

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-8 animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <h2 className="text-2xl font-bold text-gray-900">Supply Chain - Operational Details</h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <X className="w-6 h-6 text-gray-600" />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6">
                    {renderContent()}
                </div>
            </div>
        </div>
    )
}
