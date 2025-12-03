'use client'

import { X, AlertTriangle, Clock, Package, TrendingDown, Thermometer, Truck, CheckCircle, DollarSign, ArrowRight, TrendingUp } from 'lucide-react'
import { BarChart, Bar, LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip as RechartsTooltip, CartesianGrid, Cell, Tooltip } from 'recharts'

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
    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
                <div className="sticky top-0 bg-white border-b border-gray-200 px-8 py-6 rounded-t-3xl z-10">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-semibold text-gray-900">
                                {category === 'high-risk-items' && 'High-Risk Inventory - Stockout Prevention Strategy'}
                                {category === 'expiring-items' && 'Expiring Inventory - Wastage Reduction Plan'}
                                {category === 'vendor-issues' && 'Vendor Performance - Supply Chain Reliability'}
                                {category === 'temp-alerts' && 'Temperature Control - Cold Chain Compliance'}
                            </h2>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            <X className="w-6 h-6 text-gray-600" />
                        </button>
                    </div>
                </div>

                <div className="px-8 py-6">
                    {category === 'high-risk-items' && <HighRiskItemsContent />}
                    {category === 'expiring-items' && <ExpiringItemsContent />}
                    {category === 'vendor-issues' && <VendorIssuesContent />}
                    {category === 'temp-alerts' && <TempAlertsContent />}
                </div>
            </div>
        </div>
    )
}

// High Risk Items Content
function HighRiskItemsContent() {
    const stockoutRisk = [
        { item: 'CBC Reagent A', current: 22, min: 30, dailyUsage: 15, daysLeft: 1.5, cost: '$400/unit', urgency: 'Critical' },
        { item: 'Meropenem Inj', current: 88, min: 90, dailyUsage: 12, daysLeft: 7.3, cost: '$85/unit', urgency: 'High' },
        { item: 'IV Set 18G', current: 820, min: 800, dailyUsage: 140, daysLeft: 5.9, cost: '$5/unit', urgency: 'High' },
        { item: 'Surgical Gloves M', current: 1450, min: 1500, dailyUsage: 280, daysLeft: 5.2, cost: '$5/unit', urgency: 'Critical' },
        { item: 'Heparin Sodium', current: 45, min: 50, dailyUsage: 8, daysLeft: 5.6, cost: '$150/unit', urgency: 'High' },
    ]

    const usageTrend = [
        { week: 'Week 1', usage: 280, ordered: 350 },
        { week: 'Week 2', usage: 310, ordered: 350 },
        { week: 'Week 3', usage: 295, ordered: 350 },
        { week: 'Week 4', usage: 340, ordered: 350 },
        { week: 'Week 5', usage: 370, ordered: 350 },
        { week: 'Week 6', usage: 385, ordered: 350 },
    ]

    return (
        <div className="space-y-6">
            {/* Problem Statement */}
            <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
                <div className="flex items-start gap-3">
                    <AlertTriangle className="w-6 h-6 text-red-600 mt-1" />
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Problem Statement</h3>
                        <p className="text-sm text-gray-700 leading-relaxed">
                            <span className="font-semibold">5 critical supply items</span> are operating below minimum stock levels, creating immediate stockout risk within <span className="font-semibold">48-72 hours</span>. 
                            CBC Reagent A has only 1.5 days of supply remaining (22 units vs. 30 minimum), and Surgical Gloves M are critically low with 5.2 days left. Combined value at risk: 
                            <span className="font-semibold"> $48,000</span> in inventory, with potential <span className="font-semibold">$280K operational impact</span> from procedure delays and emergency procurement premiums.
                        </p>
                    </div>
                </div>
            </div>

            {/* Root Cause Analysis */}
            <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Root Cause Analysis</h3>
                <div className="grid grid-cols-2 gap-6">
                    {/* Usage vs Ordered Trend */}
                    <div className="bg-white rounded-2xl p-6 border border-gray-200">
                        <h4 className="text-sm font-semibold text-gray-900 mb-4">Usage vs. Reorder Quantity Mismatch</h4>
                        <ResponsiveContainer width="100%" height={200}>
                            <LineChart data={usageTrend}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                                <XAxis dataKey="week" tick={{ fontSize: 11 }} />
                                <YAxis tick={{ fontSize: 11 }} />
                                <RechartsTooltip />
                                <Line type="monotone" dataKey="usage" name="Actual Usage" stroke="#ef4444" strokeWidth={2} dot={{ r: 4 }} />
                                <Line type="monotone" dataKey="ordered" name="Reorder Qty" stroke="#10b981" strokeWidth={2} strokeDasharray="5 5" />
                            </LineChart>
                        </ResponsiveContainer>
                        <p className="text-xs text-gray-500 mt-2">Usage has exceeded reorder quantities for 2 consecutive weeks, depleting buffer stock.</p>
                    </div>

                    {/* Key Findings */}
                    <div className="bg-white rounded-2xl p-6 border border-gray-200">
                        <h4 className="text-sm font-semibold text-gray-900 mb-4">Key Findings</h4>
                        <div className="space-y-3">
                            <div className="flex items-start gap-2">
                                <div className="w-2 h-2 rounded-full bg-red-500 mt-1.5" />
                                <p className="text-sm text-gray-700"><span className="font-semibold">Reorder point miscalculation:</span> Min stock levels set 18 months ago, not adjusted for 37% usage increase.</p>
                            </div>
                            <div className="flex items-start gap-2">
                                <div className="w-2 h-2 rounded-full bg-red-500 mt-1.5" />
                                <p className="text-sm text-gray-700"><span className="font-semibold">Vendor delay impact:</span> PO-2391 delayed 8 days due to supplier production issues (CBC Reagent A).</p>
                            </div>
                            <div className="flex items-start gap-2">
                                <div className="w-2 h-2 rounded-full bg-red-500 mt-1.5" />
                                <p className="text-sm text-gray-700"><span className="font-semibold">Seasonal demand spike:</span> Surgical volume +28% in Q4 (elective procedures backlog from Q3).</p>
                            </div>
                            <div className="flex items-start gap-2">
                                <div className="w-2 h-2 rounded-full bg-red-500 mt-1.5" />
                                <p className="text-sm text-gray-700"><span className="font-semibold">No automated alerts:</span> Manual inventory checks miss rapid depletion until stockout imminent.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stockout Risk Details */}
            <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Critical Stockout Risk Breakdown</h3>
                <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="text-left text-xs font-semibold text-gray-600 py-3 px-4">Item Name</th>
                                <th className="text-center text-xs font-semibold text-gray-600 py-3 px-4">Current</th>
                                <th className="text-center text-xs font-semibold text-gray-600 py-3 px-4">Min Level</th>
                                <th className="text-center text-xs font-semibold text-gray-600 py-3 px-4">Daily Usage</th>
                                <th className="text-center text-xs font-semibold text-gray-600 py-3 px-4">Days Left</th>
                                <th className="text-center text-xs font-semibold text-gray-600 py-3 px-4">Unit Cost</th>
                                <th className="text-center text-xs font-semibold text-gray-600 py-3 px-4">Urgency</th>
                            </tr>
                        </thead>
                        <tbody>
                            {stockoutRisk.map((item, idx) => (
                                <tr key={idx} className="border-t border-gray-100 hover:bg-gray-50">
                                    <td className="text-sm text-gray-900 py-3 px-4 font-medium">{item.item}</td>
                                    <td className="text-sm text-center py-3 px-4">
                                        <span className="font-semibold text-red-600">{item.current}</span>
                                    </td>
                                    <td className="text-sm text-center text-gray-700 py-3 px-4">{item.min}</td>
                                    <td className="text-sm text-center text-gray-700 py-3 px-4">{item.dailyUsage}</td>
                                    <td className="text-sm text-center py-3 px-4">
                                        <span className={`font-semibold ${item.daysLeft < 3 ? 'text-red-600' : 'text-orange-600'}`}>
                                            {item.daysLeft}d
                                        </span>
                                    </td>
                                    <td className="text-sm text-center text-gray-700 py-3 px-4">{item.cost}</td>
                                    <td className="text-center py-3 px-4">
                                        <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                                            item.urgency === 'Critical' ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700'
                                        }`}>
                                            {item.urgency}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Financial Impact */}
            <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Financial Impact</h3>
                <div className="grid grid-cols-3 gap-4">
                    <div className="bg-red-500 rounded-2xl p-6 text-white">
                        <div className="text-sm font-medium mb-2 opacity-90">Inventory Value at Risk</div>
                        <div className="text-4xl font-bold mb-1">$48K</div>
                        <div className="text-xs opacity-75">5 critical items below minimum</div>
                    </div>
                    <div className="bg-orange-500 rounded-2xl p-6 text-white">
                        <div className="text-sm font-medium mb-2 opacity-90">Emergency Procurement Premium</div>
                        <div className="text-4xl font-bold mb-1">$18.5K</div>
                        <div className="text-xs opacity-75">Rush delivery + expedite fees</div>
                    </div>
                    <div className="bg-emerald-500 rounded-2xl p-6 text-white">
                        <div className="text-sm font-medium mb-2 opacity-90">Prevention Savings Potential</div>
                        <div className="text-4xl font-bold mb-1">$420K</div>
                        <div className="text-xs opacity-75">Annual through dynamic reordering</div>
                    </div>
                </div>
            </div>

            {/* Recommended Actions */}
            <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recommended Actions</h3>
                <div className="space-y-3">
                    {[
                        { priority: 'Critical', action: 'Initiate emergency procurement for CBC Reagent A (minimum 50 units) with 24-hour express delivery', impact: '$8K emergency cost', timeline: '24 hours' },
                        { priority: 'Critical', action: 'Place urgent order for Surgical Gloves M (1000 units) and IV Sets 18G (500 units) to restore buffer stock', impact: '$7.5K expedite cost', timeline: '48 hours' },
                        { priority: 'High', action: 'Escalate PO-2391 with Medico Supplies - negotiate partial shipment or alternate supplier for Meropenem', impact: 'Prevent $12K stockout', timeline: '12 hours' },
                        { priority: 'High', action: 'Implement automated inventory monitoring system with daily usage tracking and predictive alerts (threshold: 7-day supply)', impact: '$420K annual savings', timeline: '2 weeks' },
                        { priority: 'Medium', action: 'Recalculate all reorder points based on trailing 90-day usage data (adjust for 37% volume increase)', impact: '$85K buffer optimization', timeline: '1 week' },
                        { priority: 'Medium', action: 'Establish backup vendor relationships for 5 critical items to mitigate single-source dependency', impact: 'Risk mitigation', timeline: '3 weeks' },
                    ].map((rec, idx) => (
                        <div key={idx} className="bg-white rounded-2xl border border-gray-200 p-4 hover:shadow-md transition-shadow">
                            <div className="flex items-start gap-4">
                                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                                    rec.priority === 'Critical' ? 'bg-red-100 text-red-700' :
                                    rec.priority === 'High' ? 'bg-orange-100 text-orange-700' :
                                    'bg-blue-100 text-blue-700'
                                }`}>
                                    {rec.priority}
                                </span>
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-gray-900 mb-2">{rec.action}</p>
                                    <div className="flex items-center gap-4 text-xs text-gray-600">
                                        <span className="flex items-center gap-1">
                                            <DollarSign className="w-3 h-3" />
                                            {rec.impact}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Clock className="w-3 h-3" />
                                            {rec.timeline}
                                        </span>
                                    </div>
                                </div>
                                <ArrowRight className="w-5 h-5 text-gray-400" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

// Expiring Items Content  
function ExpiringItemsContent() {
    const expiringInventory = [
        { item: 'IV Set 18G', batch: 'B-2341', quantity: 820, daysLeft: 8, value: '$4,100', usage: 140 },
        { item: 'Surgical Gloves M', batch: 'B-9823', quantity: 1450, daysLeft: 5, value: '$7,250', usage: 280 },
        { item: 'CBC Reagent A', batch: 'R-4521', quantity: 22, daysLeft: 12, value: '$8,800', usage: 15 },
        { item: 'Saline 500ml', batch: 'S-1192', quantity: 245, daysLeft: 18, value: '$1,225', usage: 42 },
        { item: 'Heparin Sodium', batch: 'H-8834', quantity: 45, daysLeft: 15, value: '$6,750', usage: 8 },
    ]

    return (
        <div className="space-y-6">
            {/* Problem Statement */}
            <div className="bg-orange-50 border border-orange-200 rounded-2xl p-6">
                <div className="flex items-start gap-3">
                    <Clock className="w-6 h-6 text-orange-600 mt-1" />
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Problem Statement</h3>
                        <p className="text-sm text-gray-700 leading-relaxed">
                            <span className="font-semibold">2,582 units across 5 product lines</span> are scheduled to expire within 30 days, representing <span className="font-semibold">$28,125 
                            in potential wastage</span>. Surgical Gloves M (1,450 units) expire in 5 days with current daily usage of 280 units, indicating only 5.2 days of consumption possible 
                            before expiration. IV Sets 18G (820 units, 8 days to expiry) faces similar risk. First-In-First-Out (FIFO) rotation failures and overstocking contribute to 
                            <span className="font-semibold"> 22% annual wastage rate</span> vs. industry benchmark of 8%.
                        </p>
                    </div>
                </div>
            </div>

            {/* Root Cause Analysis */}
            <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Root Cause Analysis</h3>
                <div className="grid grid-cols-2 gap-6">
                    {/* Expiry Timeline */}
                    <div className="bg-white rounded-2xl p-6 border border-gray-200">
                        <h4 className="text-sm font-semibold text-gray-900 mb-4">Expiry Timeline vs. Usage Rate</h4>
                        <ResponsiveContainer width="100%" height={200}>
                            <BarChart data={expiringInventory} layout="vertical">
                                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" horizontal={false} />
                                <XAxis type="number" tick={{ fontSize: 11 }} />
                                <YAxis dataKey="item" type="category" tick={{ fontSize: 9 }} width={100} />
                                <RechartsTooltip />
                                <Bar dataKey="daysLeft" fill="#f59e0b" radius={[0, 4, 4, 0]}>
                                    {expiringInventory.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.daysLeft < 7 ? '#ef4444' : entry.daysLeft < 14 ? '#f59e0b' : '#fbbf24'} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                        <p className="text-xs text-gray-500 mt-2">Red bars indicate critical expiry risk (≤7 days remaining).</p>
                    </div>

                    {/* Key Findings */}
                    <div className="bg-white rounded-2xl p-6 border border-gray-200">
                        <h4 className="text-sm font-semibold text-gray-900 mb-4">Key Findings</h4>
                        <div className="space-y-3">
                            <div className="flex items-start gap-2">
                                <div className="w-2 h-2 rounded-full bg-orange-500 mt-1.5" />
                                <p className="text-sm text-gray-700"><span className="font-semibold">FIFO violation:</span> 68% of expired items had newer stock used first (barcode scanning bypassed).</p>
                            </div>
                            <div className="flex items-start gap-2">
                                <div className="w-2 h-2 rounded-full bg-orange-500 mt-1.5" />
                                <p className="text-sm text-gray-700"><span className="font-semibold">Overstocking:</span> Bulk purchasing for price discounts without consumption rate analysis.</p>
                            </div>
                            <div className="flex items-start gap-2">
                                <div className="w-2 h-2 rounded-full bg-orange-500 mt-1.5" />
                                <p className="text-sm text-gray-700"><span className="font-semibold">No expiry alerts:</span> Manual quarterly audits miss short-shelf-life items (90-day expiry).</p>
                            </div>
                            <div className="flex items-start gap-2">
                                <div className="w-2 h-2 rounded-full bg-orange-500 mt-1.5" />
                                <p className="text-sm text-gray-700"><span className="font-semibold">Storage disorganization:</span> Multiple storage locations prevent systematic rotation.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Expiring Items Table */}
            <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">High-Risk Expiring Inventory (30 Days)</h3>
                <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="text-left text-xs font-semibold text-gray-600 py-3 px-4">Item / Batch</th>
                                <th className="text-center text-xs font-semibold text-gray-600 py-3 px-4">Quantity</th>
                                <th className="text-center text-xs font-semibold text-gray-600 py-3 px-4">Days to Expiry</th>
                                <th className="text-center text-xs font-semibold text-gray-600 py-3 px-4">Daily Usage</th>
                                <th className="text-center text-xs font-semibold text-gray-600 py-3 px-4">Consumption Possible</th>
                                <th className="text-right text-xs font-semibold text-gray-600 py-3 px-4">Value at Risk</th>
                            </tr>
                        </thead>
                        <tbody>
                            {expiringInventory.map((item, idx) => {
                                const consumptionPossible = Math.min(item.quantity, item.usage * item.daysLeft)
                                const wastageRisk = item.quantity - consumptionPossible
                                return (
                                    <tr key={idx} className="border-t border-gray-100 hover:bg-gray-50">
                                        <td className="text-sm text-gray-900 py-3 px-4">
                                            <div className="font-medium">{item.item}</div>
                                            <div className="text-xs text-gray-500">{item.batch}</div>
                                        </td>
                                        <td className="text-sm text-center text-gray-900 py-3 px-4 font-semibold">{item.quantity}</td>
                                        <td className="text-sm text-center py-3 px-4">
                                            <span className={`font-semibold ${item.daysLeft < 7 ? 'text-red-600' : item.daysLeft < 14 ? 'text-orange-600' : 'text-amber-600'}`}>
                                                {item.daysLeft}d
                                            </span>
                                        </td>
                                        <td className="text-sm text-center text-gray-700 py-3 px-4">{item.usage}/day</td>
                                        <td className="text-sm text-center py-3 px-4">
                                            <span className={wastageRisk > 0 ? 'text-red-600 font-semibold' : 'text-emerald-600'}>
                                                {consumptionPossible} {wastageRisk > 0 && `(-${wastageRisk})`}
                                            </span>
                                        </td>
                                        <td className="text-sm text-right text-gray-900 py-3 px-4 font-semibold">{item.value}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Financial Impact */}
            <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Financial Impact</h3>
                <div className="grid grid-cols-3 gap-4">
                    <div className="bg-orange-500 rounded-2xl p-6 text-white">
                        <div className="text-sm font-medium mb-2 opacity-90">30-Day Expiry Risk</div>
                        <div className="text-4xl font-bold mb-1">$28.1K</div>
                        <div className="text-xs opacity-75">2,582 units at risk of wastage</div>
                    </div>
                    <div className="bg-red-500 rounded-2xl p-6 text-white">
                        <div className="text-sm font-medium mb-2 opacity-90">Annual Wastage (Current Rate)</div>
                        <div className="text-4xl font-bold mb-1">$338K</div>
                        <div className="text-xs opacity-75">22% wastage vs. 8% benchmark</div>
                    </div>
                    <div className="bg-emerald-500 rounded-2xl p-6 text-white">
                        <div className="text-sm font-medium mb-2 opacity-90">Savings via FIFO Compliance</div>
                        <div className="text-4xl font-bold mb-1">$235K</div>
                        <div className="text-xs opacity-75">Reduce to 8% industry standard</div>
                    </div>
                </div>
            </div>

            {/* Recommended Actions */}
            <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recommended Actions</h3>
                <div className="space-y-3">
                    {[
                        { priority: 'Critical', action: 'Prioritize consumption of Surgical Gloves M (Batch B-9823) across all departments - mandate FIFO adherence for 5 days', impact: 'Prevent $7.2K loss', timeline: '48 hours' },
                        { priority: 'Critical', action: 'Redistribute IV Set 18G (Batch B-2341) to high-volume departments (Emergency, Surgery) to accelerate usage', impact: 'Prevent $4.1K loss', timeline: '24 hours' },
                        { priority: 'High', action: 'Implement automated expiry alerts (email/SMS) when items reach 14-day threshold, escalating at 7 days', impact: '$235K annual savings', timeline: '2 weeks' },
                        { priority: 'High', action: 'Enforce mandatory barcode scanning for all dispensing to ensure FIFO compliance (cannot bypass)', impact: 'Reduce wastage by 68%', timeline: '1 week' },
                        { priority: 'Medium', action: 'Consolidate storage locations and implement zone-based expiry labeling (red/yellow/green by urgency)', impact: '$52K operational efficiency', timeline: '3 weeks' },
                        { priority: 'Medium', action: 'Revise bulk purchasing policy - tie order quantities to 60-day consumption rates with expiry date consideration', impact: 'Prevent future $180K overstocking', timeline: '1 month' },
                    ].map((rec, idx) => (
                        <div key={idx} className="bg-white rounded-2xl border border-gray-200 p-4 hover:shadow-md transition-shadow">
                            <div className="flex items-start gap-4">
                                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                                    rec.priority === 'Critical' ? 'bg-red-100 text-red-700' :
                                    rec.priority === 'High' ? 'bg-orange-100 text-orange-700' :
                                    'bg-blue-100 text-blue-700'
                                }`}>
                                    {rec.priority}
                                </span>
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-gray-900 mb-2">{rec.action}</p>
                                    <div className="flex items-center gap-4 text-xs text-gray-600">
                                        <span className="flex items-center gap-1">
                                            <DollarSign className="w-3 h-3" />
                                            {rec.impact}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Clock className="w-3 h-3" />
                                            {rec.timeline}
                                        </span>
                                    </div>
                                </div>
                                <ArrowRight className="w-5 h-5 text-gray-400" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

// Vendor Issues Content
function VendorIssuesContent() {
    const vendorPerformanceData = [
        { month: 'Nov', onTime: 72, late: 28 },
        { month: 'Dec', onTime: 68, late: 32 },
        { month: 'Jan', onTime: 64, late: 36 },
        { month: 'Feb', onTime: 59, late: 41 },
        { month: 'Mar', onTime: 55, late: 45 }
    ]

    const vendorIssuesTable = [
        {
            vendor: 'MedSupply Corp',
            category: 'Lab Reagents',
            onTimeRate: '52%',
            avgDelay: '4.2 days',
            defectRate: '3.1%',
            monthlyOrders: 28,
            impact: '$34,500'
        },
        {
            vendor: 'BioTech Solutions',
            category: 'Blood Products',
            onTimeRate: '58%',
            avgDelay: '3.8 days',
            defectRate: '2.4%',
            monthlyOrders: 22,
            impact: '$28,200'
        },
        {
            vendor: 'Global Med Supplies',
            category: 'Surgical Items',
            onTimeRate: '61%',
            avgDelay: '3.1 days',
            defectRate: '1.8%',
            monthlyOrders: 35,
            impact: '$19,800'
        },
        {
            vendor: 'QuickMed Distributors',
            category: 'Pharmaceuticals',
            onTimeRate: '64%',
            avgDelay: '2.9 days',
            defectRate: '2.2%',
            monthlyOrders: 41,
            impact: '$16,400'
        }
    ]

    return (
        <div className="space-y-6">
            {/* Problem Statement */}
            <div className="bg-yellow-500 rounded-2xl p-6">
                <div className="flex items-start gap-4">
                    <div className="p-3 bg-white/20 rounded-xl">
                        <AlertTriangle className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                        <h3 className="text-2xl font-bold text-white mb-2">Critical Vendor Performance Degradation</h3>
                        <p className="text-white/90 text-lg">
                            4 key vendors showing declining on-time delivery rates (55-64% vs 90% SLA target). 
                            Average delivery delays of 2.9-4.2 days are forcing emergency procurement at 35% premium costs. 
                            Combined impact: <span className="font-semibold">$98.9K monthly operational disruption.</span>
                        </p>
                    </div>
                </div>
            </div>

            {/* Root Cause Analysis */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Root Cause Analysis: Vendor Reliability Decline</h3>
                
                <div className="grid grid-cols-2 gap-6">
                    {/* Chart */}
                    <div>
                        <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={vendorPerformanceData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                    <XAxis dataKey="month" stroke="#666" />
                                    <YAxis stroke="#666" />
                                    <Tooltip />
                                    <Bar dataKey="onTime" fill="#10b981" name="On-Time %" radius={[8, 8, 0, 0]} />
                                    <Bar dataKey="late" fill="#ef4444" name="Late %" radius={[8, 8, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                        <p className="text-sm text-gray-500 text-center mt-2">Vendor On-Time Delivery Trend (5 months)</p>
                    </div>

                    {/* Key Findings */}
                    <div className="space-y-3">
                        <div className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                            <div>
                                <p className="text-sm font-medium text-gray-900">Declining Performance Trend</p>
                                <p className="text-sm text-gray-600">On-time delivery dropped from 72% to 55% over 5 months (-17 percentage points)</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                            <div>
                                <p className="text-sm font-medium text-gray-900">SLA Breach Impact</p>
                                <p className="text-sm text-gray-600">All 4 vendors below 90% SLA target; MedSupply Corp at critical 52%</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                            <div>
                                <p className="text-sm font-medium text-gray-900">Emergency Procurement Costs</p>
                                <p className="text-sm text-gray-600">126 delayed orders last month triggered 43 emergency purchases at +35% premium</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                            <div>
                                <p className="text-sm font-medium text-gray-900">Quality Issues</p>
                                <p className="text-sm text-gray-600">Defect rates 1.8-3.1% causing 18 returns and delaying patient care</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Vendor Performance Table */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Critical Vendor Performance Issues</h3>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-gray-200">
                                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Vendor</th>
                                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Category</th>
                                <th className="text-center py-3 px-4 text-sm font-semibold text-gray-900">On-Time Rate</th>
                                <th className="text-center py-3 px-4 text-sm font-semibold text-gray-900">Avg Delay</th>
                                <th className="text-center py-3 px-4 text-sm font-semibold text-gray-900">Defect Rate</th>
                                <th className="text-center py-3 px-4 text-sm font-semibold text-gray-900">Monthly Orders</th>
                                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-900">Monthly Impact</th>
                            </tr>
                        </thead>
                        <tbody>
                            {vendorIssuesTable.map((vendor, idx) => (
                                <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50">
                                    <td className="py-3 px-4">
                                        <div className="text-sm font-medium text-gray-900">{vendor.vendor}</div>
                                    </td>
                                    <td className="py-3 px-4">
                                        <div className="text-sm text-gray-600">{vendor.category}</div>
                                    </td>
                                    <td className="py-3 px-4 text-center">
                                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                                            parseInt(vendor.onTimeRate) < 60 ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700'
                                        }`}>
                                            {vendor.onTimeRate}
                                        </span>
                                    </td>
                                    <td className="py-3 px-4 text-center">
                                        <div className="text-sm text-gray-900">{vendor.avgDelay}</div>
                                    </td>
                                    <td className="py-3 px-4 text-center">
                                        <div className="text-sm text-gray-900">{vendor.defectRate}</div>
                                    </td>
                                    <td className="py-3 px-4 text-center">
                                        <div className="text-sm text-gray-900">{vendor.monthlyOrders}</div>
                                    </td>
                                    <td className="py-3 px-4 text-right">
                                        <div className="text-sm font-semibold text-gray-900">{vendor.impact}</div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Financial Impact */}
            <div className="grid grid-cols-3 gap-4">
                <div className="bg-red-500 rounded-2xl p-6 text-white">
                    <div className="flex items-center gap-3 mb-2">
                        <DollarSign className="w-6 h-6" />
                        <h4 className="text-sm font-semibold">Emergency Procurement Costs</h4>
                    </div>
                    <div className="text-3xl font-bold mb-1">$98.9K</div>
                    <p className="text-white/80 text-sm">Monthly premium costs for rushed orders</p>
                </div>

                <div className="bg-orange-500 rounded-2xl p-6 text-white">
                    <div className="flex items-center gap-3 mb-2">
                        <Clock className="w-6 h-6" />
                        <h4 className="text-sm font-semibold">Operational Delays</h4>
                    </div>
                    <div className="text-3xl font-bold mb-1">3.5 days</div>
                    <p className="text-white/80 text-sm">Average delay impacting patient care</p>
                </div>

                <div className="bg-emerald-500 rounded-2xl p-6 text-white">
                    <div className="flex items-center gap-3 mb-2">
                        <TrendingUp className="w-6 h-6" />
                        <h4 className="text-sm font-semibold">Potential Savings</h4>
                    </div>
                    <div className="text-3xl font-bold mb-1">$1.19M</div>
                    <p className="text-white/80 text-sm">Annual savings via vendor diversification</p>
                </div>
            </div>

            {/* Recommended Actions */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Optimize: Recommended Actions</h3>
                <div className="space-y-3">
                    <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                        <span className="px-2.5 py-1 bg-red-500 text-white text-xs font-semibold rounded-full">Critical</span>
                        <div className="flex-1">
                            <h4 className="text-sm font-semibold text-gray-900 mb-1">Initiate Vendor Performance Reviews</h4>
                            <p className="text-sm text-gray-600 mb-2">Schedule quarterly business reviews with all 4 vendors, establish corrective action plans with 30-day improvement targets</p>
                            <div className="flex gap-4 text-xs text-gray-500">
                                <span className="flex items-center gap-1"><DollarSign className="w-3 h-3" />No cost</span>
                                <span className="flex items-center gap-1"><Clock className="w-3 h-3" />2 weeks</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                        <span className="px-2.5 py-1 bg-red-500 text-white text-xs font-semibold rounded-full">Critical</span>
                        <div className="flex-1">
                            <h4 className="text-sm font-semibold text-gray-900 mb-1">Qualify Alternative Vendors</h4>
                            <p className="text-sm text-gray-600 mb-2">Identify and qualify 2-3 backup vendors per critical category; negotiate trial contracts to reduce dependency</p>
                            <div className="flex gap-4 text-xs text-gray-500">
                                <span className="flex items-center gap-1"><DollarSign className="w-3 h-3" />$12K qualification</span>
                                <span className="flex items-center gap-1"><Clock className="w-3 h-3" />6 weeks</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                        <span className="px-2.5 py-1 bg-orange-500 text-white text-xs font-semibold rounded-full">High</span>
                        <div className="flex-1">
                            <h4 className="text-sm font-semibold text-gray-900 mb-1">Implement Vendor Scorecards</h4>
                            <p className="text-sm text-gray-600 mb-2">Deploy automated vendor performance tracking with real-time SLA monitoring and alert triggers for delivery delays</p>
                            <div className="flex gap-4 text-xs text-gray-500">
                                <span className="flex items-center gap-1"><DollarSign className="w-3 h-3" />$8K software</span>
                                <span className="flex items-center gap-1"><Clock className="w-3 h-3" />4 weeks</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                        <span className="px-2.5 py-1 bg-orange-500 text-white text-xs font-semibold rounded-full">High</span>
                        <div className="flex-1">
                            <h4 className="text-sm font-semibold text-gray-900 mb-1">Enforce SLA Penalties</h4>
                            <p className="text-sm text-gray-600 mb-2">Activate contractual penalties for missed SLAs (5% credit per late delivery); recovered funds offset emergency procurement</p>
                            <div className="flex gap-4 text-xs text-gray-500">
                                <span className="flex items-center gap-1"><DollarSign className="w-3 h-3" />$45K annual recovery</span>
                                <span className="flex items-center gap-1"><Clock className="w-3 h-3" />Immediate</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                        <span className="px-2.5 py-1 bg-blue-500 text-white text-xs font-semibold rounded-full">Medium</span>
                        <div className="flex-1">
                            <h4 className="text-sm font-semibold text-gray-900 mb-1">Optimize Order Lead Times</h4>
                            <p className="text-sm text-gray-600 mb-2">Increase order lead times by 2-3 days for non-critical items to reduce rush orders and improve vendor planning</p>
                            <div className="flex gap-4 text-xs text-gray-500">
                                <span className="flex items-center gap-1"><DollarSign className="w-3 h-3" />$28K annual savings</span>
                                <span className="flex items-center gap-1"><Clock className="w-3 h-3" />2 weeks</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                        <span className="px-2.5 py-1 bg-blue-500 text-white text-xs font-semibold rounded-full">Medium</span>
                        <div className="flex-1">
                            <h4 className="text-sm font-semibold text-gray-900 mb-1">Establish Safety Stock for Critical Items</h4>
                            <p className="text-sm text-gray-600 mb-2">Maintain 7-day safety stock for high-impact items from unreliable vendors to buffer delivery delays</p>
                            <div className="flex gap-4 text-xs text-gray-500">
                                <span className="flex items-center gap-1"><DollarSign className="w-3 h-3" />$35K inventory investment</span>
                                <span className="flex items-center gap-1"><Clock className="w-3 h-3" />3 weeks</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

// Temperature Alerts Content
function TempAlertsContent() {
    const tempHistoryData = [
        { time: '00:00', temp: 3.2, threshold: 6 },
        { time: '04:00', temp: 3.5, threshold: 6 },
        { time: '08:00', temp: 4.1, threshold: 6 },
        { time: '12:00', temp: 5.8, threshold: 6 },
        { time: '16:00', temp: 7.4, threshold: 6 },
        { time: '20:00', temp: 8.1, threshold: 6 },
        { time: '23:45', temp: 8.3, threshold: 6 }
    ]

    const tempExcursionsTable = [
        {
            equipment: 'Fridge-4 (Blood Bank)',
            location: 'Building A, Floor 2',
            excursionStart: '16:23',
            duration: '7h 22m',
            maxTemp: '8.3°C',
            threshold: '2-6°C',
            unitsAtRisk: 24,
            value: '$9,600'
        },
        {
            equipment: 'Fridge-7 (Pharmacy)',
            location: 'Building B, Floor 1',
            excursionStart: '14:10',
            duration: '2h 45m',
            maxTemp: '9.1°C',
            threshold: '2-8°C',
            unitsAtRisk: 142,
            value: '$4,260'
        },
        {
            equipment: 'Freezer-2 (Lab)',
            location: 'Building C, Floor 3',
            excursionStart: '11:35',
            duration: '1h 18m',
            maxTemp: '-12°C',
            threshold: '<-20°C',
            unitsAtRisk: 68,
            value: '$12,800'
        },
        {
            equipment: 'Fridge-9 (OR)',
            location: 'Building A, Floor 4',
            excursionStart: '09:52',
            duration: '3h 51m',
            maxTemp: '10.2°C',
            threshold: '2-6°C',
            unitsAtRisk: 35,
            value: '$8,400'
        }
    ]

    return (
        <div className="space-y-6">
            {/* Problem Statement */}
            <div className="bg-blue-500 rounded-2xl p-6">
                <div className="flex items-start gap-4">
                    <div className="p-3 bg-white/20 rounded-xl">
                        <Thermometer className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                        <h3 className="text-2xl font-bold text-white mb-2">Critical Cold Chain Temperature Excursions</h3>
                        <p className="text-white/90 text-lg">
                            4 active temperature excursions detected across critical storage units in the last 24 hours. 
                            269 inventory units valued at $35,060 are at risk. Fridge-4 (Blood Bank) showing 7+ hour excursion 
                            with peak temperature of 8.3°C (target: 2-6°C). <span className="font-semibold">Immediate intervention required.</span>
                        </p>
                    </div>
                </div>
            </div>

            {/* Root Cause Analysis */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Root Cause Analysis: Fridge-4 Temperature Excursion</h3>
                
                <div className="grid grid-cols-2 gap-6">
                    {/* Chart */}
                    <div>
                        <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={tempHistoryData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                    <XAxis dataKey="time" stroke="#666" />
                                    <YAxis stroke="#666" label={{ value: '°C', angle: -90, position: 'insideLeft' }} />
                                    <Tooltip />
                                    <Line type="monotone" dataKey="temp" stroke="#ef4444" strokeWidth={3} dot={{ r: 4 }} name="Temperature" />
                                    <Line type="monotone" dataKey="threshold" stroke="#10b981" strokeWidth={2} strokeDasharray="5 5" dot={false} name="Threshold (6°C)" />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                        <p className="text-sm text-gray-500 text-center mt-2">Fridge-4 Temperature History (Last 24 Hours)</p>
                    </div>

                    {/* Key Findings */}
                    <div className="space-y-3">
                        <div className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                            <div>
                                <p className="text-sm font-medium text-gray-900">Compressor Malfunction Detected</p>
                                <p className="text-sm text-gray-600">Temperature began rising at 16:23, exceeded 6°C threshold at 18:10 (1h 47m response gap)</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                            <div>
                                <p className="text-sm font-medium text-gray-900">Alert Notification Delay</p>
                                <p className="text-sm text-gray-600">SMS alert sent 35 minutes after threshold breach; night shift responded 62 minutes later</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                            <div>
                                <p className="text-sm font-medium text-gray-900">Inventory at Risk</p>
                                <p className="text-sm text-gray-600">24 blood product units (RBC, Platelets, Plasma) exposed to 6-8.3°C for 5+ hours</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                            <div>
                                <p className="text-sm font-medium text-gray-900">Maintenance History</p>
                                <p className="text-sm text-gray-600">Last preventive maintenance: 4 months ago (overdue by 1 month)</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Temperature Excursions Table */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Active Temperature Excursions (Last 24 Hours)</h3>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-gray-200">
                                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Equipment</th>
                                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Location</th>
                                <th className="text-center py-3 px-4 text-sm font-semibold text-gray-900">Start Time</th>
                                <th className="text-center py-3 px-4 text-sm font-semibold text-gray-900">Duration</th>
                                <th className="text-center py-3 px-4 text-sm font-semibold text-gray-900">Max Temp</th>
                                <th className="text-center py-3 px-4 text-sm font-semibold text-gray-900">Threshold</th>
                                <th className="text-center py-3 px-4 text-sm font-semibold text-gray-900">Units at Risk</th>
                                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-900">Value at Risk</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tempExcursionsTable.map((excursion, idx) => (
                                <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50">
                                    <td className="py-3 px-4">
                                        <div className="text-sm font-medium text-gray-900">{excursion.equipment}</div>
                                    </td>
                                    <td className="py-3 px-4">
                                        <div className="text-sm text-gray-600">{excursion.location}</div>
                                    </td>
                                    <td className="py-3 px-4 text-center">
                                        <div className="text-sm text-gray-900">{excursion.excursionStart}</div>
                                    </td>
                                    <td className="py-3 px-4 text-center">
                                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                                            parseFloat(excursion.duration) > 6 ? 'bg-red-100 text-red-700' : 
                                            parseFloat(excursion.duration) > 3 ? 'bg-orange-100 text-orange-700' : 
                                            'bg-yellow-100 text-yellow-700'
                                        }`}>
                                            {excursion.duration}
                                        </span>
                                    </td>
                                    <td className="py-3 px-4 text-center">
                                        <div className="text-sm font-medium text-red-600">{excursion.maxTemp}</div>
                                    </td>
                                    <td className="py-3 px-4 text-center">
                                        <div className="text-sm text-gray-600">{excursion.threshold}</div>
                                    </td>
                                    <td className="py-3 px-4 text-center">
                                        <div className="text-sm text-gray-900">{excursion.unitsAtRisk}</div>
                                    </td>
                                    <td className="py-3 px-4 text-right">
                                        <div className="text-sm font-semibold text-gray-900">{excursion.value}</div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Financial Impact */}
            <div className="grid grid-cols-3 gap-4">
                <div className="bg-red-500 rounded-2xl p-6 text-white">
                    <div className="flex items-center gap-3 mb-2">
                        <DollarSign className="w-6 h-6" />
                        <h4 className="text-sm font-semibold">Inventory at Risk</h4>
                    </div>
                    <div className="text-3xl font-bold mb-1">$35.1K</div>
                    <p className="text-white/80 text-sm">269 units across 4 excursions (24 hrs)</p>
                </div>

                <div className="bg-orange-500 rounded-2xl p-6 text-white">
                    <div className="flex items-center gap-3 mb-2">
                        <Clock className="w-6 h-6" />
                        <h4 className="text-sm font-semibold">Response Time Gap</h4>
                    </div>
                    <div className="text-3xl font-bold mb-1">97 min</div>
                    <p className="text-white/80 text-sm">Average alert-to-action delay</p>
                </div>

                <div className="bg-emerald-500 rounded-2xl p-6 text-white">
                    <div className="flex items-center gap-3 mb-2">
                        <TrendingUp className="w-6 h-6" />
                        <h4 className="text-sm font-semibold">Prevention Potential</h4>
                    </div>
                    <div className="text-3xl font-bold mb-1">$420K</div>
                    <p className="text-white/80 text-sm">Annual savings via predictive maintenance</p>
                </div>
            </div>

            {/* Recommended Actions */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Optimize: Recommended Actions</h3>
                <div className="space-y-3">
                    <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                        <span className="px-2.5 py-1 bg-red-500 text-white text-xs font-semibold rounded-full">Critical</span>
                        <div className="flex-1">
                            <h4 className="text-sm font-semibold text-gray-900 mb-1">Emergency Transfer & Equipment Repair</h4>
                            <p className="text-sm text-gray-600 mb-2">Immediately transfer 24 blood product units from Fridge-4 to backup storage; schedule emergency compressor repair within 2 hours</p>
                            <div className="flex gap-4 text-xs text-gray-500">
                                <span className="flex items-center gap-1"><DollarSign className="w-3 h-3" />$3,200 repair</span>
                                <span className="flex items-center gap-1"><Clock className="w-3 h-3" />Immediate</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                        <span className="px-2.5 py-1 bg-red-500 text-white text-xs font-semibold rounded-full">Critical</span>
                        <div className="flex-1">
                            <h4 className="text-sm font-semibold text-gray-900 mb-1">Accelerate Alert Response Protocol</h4>
                            <p className="text-sm text-gray-600 mb-2">Reduce alert threshold to 5.5°C (from 6°C), send immediate push notifications to 3-person escalation chain, require 15-min acknowledgment</p>
                            <div className="flex gap-4 text-xs text-gray-500">
                                <span className="flex items-center gap-1"><DollarSign className="w-3 h-3" />No cost</span>
                                <span className="flex items-center gap-1"><Clock className="w-3 h-3" />1 day</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                        <span className="px-2.5 py-1 bg-orange-500 text-white text-xs font-semibold rounded-full">High</span>
                        <div className="flex-1">
                            <h4 className="text-sm font-semibold text-gray-900 mb-1">Deploy Predictive Maintenance System</h4>
                            <p className="text-sm text-gray-600 mb-2">Install IoT sensors on all cold storage units to detect compressor degradation 48-72 hours before failure</p>
                            <div className="flex gap-4 text-xs text-gray-500">
                                <span className="flex items-center gap-1"><DollarSign className="w-3 h-3" />$28K sensors</span>
                                <span className="flex items-center gap-1"><Clock className="w-3 h-3" />6 weeks</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                        <span className="px-2.5 py-1 bg-orange-500 text-white text-xs font-semibold rounded-full">High</span>
                        <div className="flex-1">
                            <h4 className="text-sm font-semibold text-gray-900 mb-1">Implement Preventive Maintenance Schedule</h4>
                            <p className="text-sm text-gray-600 mb-2">Enforce quarterly maintenance for all cold storage units; current 4-month gap contributed to Fridge-4 failure</p>
                            <div className="flex gap-4 text-xs text-gray-500">
                                <span className="flex items-center gap-1"><DollarSign className="w-3 h-3" />$18K annual</span>
                                <span className="flex items-center gap-1"><Clock className="w-3 h-3" />2 weeks</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                        <span className="px-2.5 py-1 bg-blue-500 text-white text-xs font-semibold rounded-full">Medium</span>
                        <div className="flex-1">
                            <h4 className="text-sm font-semibold text-gray-900 mb-1">Establish Backup Storage Capacity</h4>
                            <p className="text-sm text-gray-600 mb-2">Maintain 20% empty capacity in redundant fridges to enable rapid inventory transfers during excursions</p>
                            <div className="flex gap-4 text-xs text-gray-500">
                                <span className="flex items-center gap-1"><DollarSign className="w-3 h-3" />$45K fridge</span>
                                <span className="flex items-center gap-1"><Clock className="w-3 h-3" />8 weeks</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                        <span className="px-2.5 py-1 bg-blue-500 text-white text-xs font-semibold rounded-full">Medium</span>
                        <div className="flex-1">
                            <h4 className="text-sm font-semibold text-gray-900 mb-1">Train Night Shift on Excursion Protocols</h4>
                            <p className="text-sm text-gray-600 mb-2">Conduct quarterly drills for temperature excursion response; 62-minute response time was 47 minutes above target</p>
                            <div className="flex gap-4 text-xs text-gray-500">
                                <span className="flex items-center gap-1"><DollarSign className="w-3 h-3" />$2K training</span>
                                <span className="flex items-center gap-1"><Clock className="w-3 h-3" />3 weeks</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

