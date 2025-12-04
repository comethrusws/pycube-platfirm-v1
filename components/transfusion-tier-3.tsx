'use client'

import { X, ArrowRight, AlertTriangle, Thermometer, Snowflake, Building2, Droplet, Clock, CheckCircle2, AlertCircle, DollarSign, TrendingUp, Package } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts'

interface TransfusionTier3Props {
    category: string
    onClose: () => void
}

export function TransfusionTier3({ category, onClose }: TransfusionTier3Props) {
    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
                <div className="sticky top-0 bg-white border-b border-gray-200 px-8 py-6 rounded-t-3xl z-10">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-semibold text-gray-900">
                                {category === 'blood-bags' && 'Blood Inventory Management - Critical Stock Optimization'}
                                {category === 'departments' && 'Department Usage Patterns - Demand Forecasting'}
                                {category === 'cold-storage' && 'Cold Chain Compliance - Temperature Excursion Analysis'}
                                {category === 'alerts' && 'Critical Alerts - Chain of Custody Gaps'}
                                {category === 'custody-improvements' && 'Custody Chain Improvements - Quality Achievement Breakdown'}
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
                    {category === 'blood-bags' && <BloodBagsContent />}
                    {category === 'departments' && <DepartmentsContent />}
                    {category === 'cold-storage' && <ColdStorageContent />}
                    {category === 'alerts' && <AlertsContent />}
                    {category === 'custody-improvements' && <CustodyImprovementsContent />}
                </div>
            </div>
        </div>
    )
}

// Blood Bags Content
function BloodBagsContent() {
    const inventoryTrend = [
        { week: 'Week 1', rbc: 118, ffp: 85, platelets: 42, target: 150 },
        { week: 'Week 2', rbc: 98, ffp: 72, platelets: 38, target: 150 },
        { week: 'Week 3', rbc: 76, ffp: 64, platelets: 28, target: 150 },
        { week: 'Week 4', rbc: 62, ffp: 58, platelets: 22, target: 150 },
        { week: 'Week 5', rbc: 48, ffp: 45, platelets: 18, target: 150 },
        { week: 'Week 6', rbc: 22, ffp: 15, platelets: 8, target: 150 },
    ]

    const criticalShortages = [
        { type: 'RBC (O-)', current: 8, min: 45, needed: 37, cost: '$18,500', urgency: 'Critical' },
        { type: 'Platelets (AB+)', current: 2, min: 25, needed: 23, cost: '$34,500', urgency: 'Critical' },
        { type: 'FFP (A-)', current: 4, min: 30, needed: 26, cost: '$13,000', urgency: 'High' },
        { type: 'RBC (B+)', current: 12, min: 40, needed: 28, cost: '$14,000', urgency: 'High' },
        { type: 'Platelets (O+)', current: 3, min: 20, needed: 17, cost: '$25,500', urgency: 'Critical' },
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
                            Blood inventory across 9 hospitals has dropped to <span className="font-semibold">critically low levels</span>, with RBC at 22 units (target: 150), 
                            Platelets at 8 units (target: 50), and FFP at 15 units (target: 80). This represents a <span className="font-semibold">6-week declining trend</span> with 
                            Emergency and Surgery departments facing potential supply shortages. Immediate procurement of <span className="font-semibold">131 units needed</span> at 
                            estimated cost of <span className="font-semibold">$105,500</span>.
                        </p>
                    </div>
                </div>
            </div>

            {/* Root Cause Analysis */}
            <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Root Cause Analysis</h3>
                <div className="grid grid-cols-2 gap-6">
                    {/* Inventory Depletion Trend */}
                    <div className="bg-white rounded-2xl p-6 border border-gray-200">
                        <h4 className="text-sm font-semibold text-gray-900 mb-4">6-Week Inventory Depletion</h4>
                        <ResponsiveContainer width="100%" height={200}>
                            <LineChart data={inventoryTrend}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                                <XAxis dataKey="week" tick={{ fontSize: 11 }} />
                                <YAxis tick={{ fontSize: 11 }} />
                                <Tooltip />
                                <Line type="monotone" dataKey="rbc" name="RBC" stroke="#ef4444" strokeWidth={2} dot={{ r: 4 }} />
                                <Line type="monotone" dataKey="ffp" name="FFP" stroke="#f59e0b" strokeWidth={2} dot={{ r: 4 }} />
                                <Line type="monotone" dataKey="platelets" name="Platelets" stroke="#ec4899" strokeWidth={2} dot={{ r: 4 }} />
                                <Line type="monotone" dataKey="target" name="Min Target" stroke="#10b981" strokeWidth={2} strokeDasharray="5 5" />
                            </LineChart>
                        </ResponsiveContainer>
                        <p className="text-xs text-gray-500 mt-2">Steady depletion without corresponding replenishment indicates procurement process breakdown.</p>
                    </div>

                    {/* Key Findings */}
                    <div className="bg-white rounded-2xl p-6 border border-gray-200">
                        <h4 className="text-sm font-semibold text-gray-900 mb-4">Key Findings</h4>
                        <div className="space-y-3">
                            <div className="flex items-start gap-2">
                                <div className="w-2 h-2 rounded-full bg-red-500 mt-1.5" />
                                <p className="text-sm text-gray-700"><span className="font-semibold">Procurement delays:</span> Average 8-day lag from order to delivery vs. target 3-day turnaround.</p>
                            </div>
                            <div className="flex items-start gap-2">
                                <div className="w-2 h-2 rounded-full bg-red-500 mt-1.5" />
                                <p className="text-sm text-gray-700"><span className="font-semibold">Demand spike:</span> Emergency Dept utilization increased 42% over 4 weeks (seasonal trauma surge).</p>
                            </div>
                            <div className="flex items-start gap-2">
                                <div className="w-2 h-2 rounded-full bg-red-500 mt-1.5" />
                                <p className="text-sm text-gray-700"><span className="font-semibold">Forecasting gap:</span> Current inventory model doesn't account for regional blood drive cancellations.</p>
                            </div>
                            <div className="flex items-start gap-2">
                                <div className="w-2 h-2 rounded-full bg-red-500 mt-1.5" />
                                <p className="text-sm text-gray-700"><span className="font-semibold">Wastage impact:</span> 18 units expired last month due to poor rotation in satellite facilities.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Critical Shortage Details */}
            <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Critical Shortage Breakdown</h3>
                <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="text-left text-xs font-semibold text-gray-600 py-3 px-4">Blood Type</th>
                                <th className="text-center text-xs font-semibold text-gray-600 py-3 px-4">Current Stock</th>
                                <th className="text-center text-xs font-semibold text-gray-600 py-3 px-4">Min Required</th>
                                <th className="text-center text-xs font-semibold text-gray-600 py-3 px-4">Units Needed</th>
                                <th className="text-center text-xs font-semibold text-gray-600 py-3 px-4">Urgency</th>
                                <th className="text-right text-xs font-semibold text-gray-600 py-3 px-4">Procurement Cost</th>
                            </tr>
                        </thead>
                        <tbody>
                            {criticalShortages.map((item, idx) => (
                                <tr key={idx} className="border-t border-gray-100 hover:bg-gray-50">
                                    <td className="text-sm text-gray-900 py-3 px-4 font-medium">{item.type}</td>
                                    <td className="text-sm text-center py-3 px-4">
                                        <span className="font-semibold text-red-600">{item.current}</span>
                                    </td>
                                    <td className="text-sm text-center text-gray-700 py-3 px-4">{item.min}</td>
                                    <td className="text-sm text-center text-gray-900 py-3 px-4 font-semibold">{item.needed}</td>
                                    <td className="text-center py-3 px-4">
                                        <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                                            item.urgency === 'Critical' ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700'
                                        }`}>
                                            {item.urgency}
                                        </span>
                                    </td>
                                    <td className="text-sm text-right text-gray-900 py-3 px-4 font-semibold">{item.cost}</td>
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
                        <div className="text-sm font-medium mb-2 opacity-90">Emergency Procurement Cost</div>
                        <div className="text-4xl font-bold mb-1">$105.5K</div>
                        <div className="text-xs opacity-75">131 units needed immediately</div>
                    </div>
                    <div className="bg-orange-500 rounded-2xl p-6 text-white">
                        <div className="text-sm font-medium mb-2 opacity-90">Wastage Loss (30 days)</div>
                        <div className="text-4xl font-bold mb-1">$12.4K</div>
                        <div className="text-xs opacity-75">18 units expired, poor rotation</div>
                    </div>
                    <div className="bg-emerald-500 rounded-2xl p-6 text-white">
                        <div className="text-sm font-medium mb-2 opacity-90">Potential Annual Savings</div>
                        <div className="text-4xl font-bold mb-1">$280K</div>
                        <div className="text-xs opacity-75">Through improved forecasting</div>
                    </div>
                </div>
            </div>

            {/* Recommended Actions */}
            <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recommended Actions</h3>
                <div className="space-y-3">
                    {[
                        { priority: 'Critical', action: 'Initiate emergency procurement for 37 RBC (O-) and 23 Platelets (AB+) units - 24-hour delivery', impact: '$53K immediate cost', timeline: '24 hours' },
                        { priority: 'Critical', action: 'Activate regional blood bank partnerships for 71 additional units to reach minimum safety stock', impact: '$52.5K cost', timeline: '48 hours' },
                        { priority: 'High', action: 'Implement automated inventory monitoring system with predictive alerts (threshold: 48-hour supply)', impact: 'Prevent future $280K losses', timeline: '2 weeks' },
                        { priority: 'High', action: 'Establish direct courier network with 3 regional blood banks for 24-hour replenishment capability', impact: '$85K annual savings', timeline: '1 month' },
                        { priority: 'Medium', action: 'Deploy FIFO rotation tracking across all 9 satellite facilities to reduce expiration wastage by 80%', impact: '$148K annual savings', timeline: '3 weeks' },
                        { priority: 'Medium', action: 'Integrate seasonal demand forecasting model accounting for trauma patterns and regional blood drives', impact: '$47K buffer reduction', timeline: '6 weeks' },
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

// Departments Content
function DepartmentsContent() {
    const usagePattern = [
        { dept: 'Emergency', week1: 142, week2: 158, week3: 176, week4: 201, forecast: 220 },
        { dept: 'Surgery', week1: 135, week2: 138, week3: 142, week4: 140, forecast: 145 },
        { dept: 'Oncology', week1: 8, week2: 9, week3: 7, week4: 6, forecast: 7 },
        { dept: 'ICU', week1: 4, week2: 5, week3: 3, week4: 2, forecast: 4 },
        { dept: 'Cardiology', week1: 2, week2: 2, week3: 3, week4: 1, forecast: 2 },
    ]

    return (
        <div className="space-y-6">
            {/* Problem Statement */}
            <div className="bg-orange-50 border border-orange-200 rounded-2xl p-6">
                <div className="flex items-start gap-3">
                    <TrendingUp className="w-6 h-6 text-orange-600 mt-1" />
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Problem Statement</h3>
                        <p className="text-sm text-gray-700 leading-relaxed">
                            Emergency Department blood utilization has <span className="font-semibold">surged 42% over 4 weeks</span> (from 142 to 201 units/week) 
                            while forecasting models predicted stable demand. This mismatch creates inventory shortfalls, with Emergency now consuming <span className="font-semibold">58% 
                            of total blood supply</span> vs. historical 35%. Surgery department maintains steady high demand (140 units/week), compounding the supply challenge.
                        </p>
                    </div>
                </div>
            </div>

            {/* Root Cause Analysis */}
            <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Root Cause Analysis</h3>
                <div className="grid grid-cols-2 gap-6">
                    {/* Usage Trend Chart */}
                    <div className="bg-white rounded-2xl p-6 border border-gray-200">
                        <h4 className="text-sm font-semibold text-gray-900 mb-4">Department Usage Trend (4 Weeks)</h4>
                        <ResponsiveContainer width="100%" height={200}>
                            <BarChart data={usagePattern}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                                <XAxis dataKey="dept" tick={{ fontSize: 10 }} />
                                <YAxis tick={{ fontSize: 11 }} />
                                <Tooltip />
                                <Legend wrapperStyle={{ fontSize: '11px' }} />
                                <Bar dataKey="week1" name="Week 1" fill="#3b82f6" />
                                <Bar dataKey="week2" name="Week 2" fill="#8b5cf6" />
                                <Bar dataKey="week3" name="Week 3" fill="#ec4899" />
                                <Bar dataKey="week4" name="Week 4" fill="#ef4444" />
                            </BarChart>
                        </ResponsiveContainer>
                        <p className="text-xs text-gray-500 mt-2">Emergency Dept shows exponential growth while other departments remain stable.</p>
                    </div>

                    {/* Key Findings */}
                    <div className="bg-white rounded-2xl p-6 border border-gray-200">
                        <h4 className="text-sm font-semibold text-gray-900 mb-4">Key Findings</h4>
                        <div className="space-y-3">
                            <div className="flex items-start gap-2">
                                <div className="w-2 h-2 rounded-full bg-orange-500 mt-1.5" />
                                <p className="text-sm text-gray-700"><span className="font-semibold">Seasonal trauma surge:</span> Regional accident rate +38% correlates with ED utilization spike.</p>
                            </div>
                            <div className="flex items-start gap-2">
                                <div className="w-2 h-2 rounded-full bg-orange-500 mt-1.5" />
                                <p className="text-sm text-gray-700"><span className="font-semibold">Forecast model gap:</span> Current algorithm uses 12-month historical average, misses 4-week trends.</p>
                            </div>
                            <div className="flex items-start gap-2">
                                <div className="w-2 h-2 rounded-full bg-orange-500 mt-1.5" />
                                <p className="text-sm text-gray-700"><span className="font-semibold">Cross-dept allocation:</span> No dynamic reallocation from Oncology/ICU low-demand periods.</p>
                            </div>
                            <div className="flex items-start gap-2">
                                <div className="w-2 h-2 rounded-full bg-orange-500 mt-1.5" />
                                <p className="text-sm text-gray-700"><span className="font-semibold">Surgery buffer risk:</span> Stable 140 units/week demand leaves no safety margin for ED spikes.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Financial Impact */}
            <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Financial Impact</h3>
                <div className="grid grid-cols-3 gap-4">
                    <div className="bg-orange-500 rounded-2xl p-6 text-white">
                        <div className="text-sm font-medium mb-2 opacity-90">Forecast Mismatch Cost</div>
                        <div className="text-4xl font-bold mb-1">$84K</div>
                        <div className="text-xs opacity-75">Emergency procurement premiums (6 weeks)</div>
                    </div>
                    <div className="bg-emerald-500 rounded-2xl p-6 text-white">
                        <div className="text-sm font-medium mb-2 opacity-90">Savings via Dynamic Allocation</div>
                        <div className="text-4xl font-bold mb-1">$156K</div>
                        <div className="text-xs opacity-75">Annual predictive model implementation</div>
                    </div>
                    <div className="bg-blue-500 rounded-2xl p-6 text-white">
                        <div className="text-sm font-medium mb-2 opacity-90">Buffer Optimization</div>
                        <div className="text-4xl font-bold mb-1">18%</div>
                        <div className="text-xs opacity-75">Inventory reduction potential</div>
                    </div>
                </div>
            </div>

            {/* Recommended Actions */}
            <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recommended Actions</h3>
                <div className="space-y-3">
                    {[
                        { priority: 'High', action: 'Deploy machine learning forecasting model using 4-week rolling averages and regional trauma data feeds', impact: '$156K annual savings', timeline: '3 weeks' },
                        { priority: 'High', action: 'Implement dynamic cross-department allocation system to redirect from low-demand (Oncology, ICU) to ED surges', impact: '$62K buffer reduction', timeline: '2 weeks' },
                        { priority: 'Medium', action: 'Establish ED-specific safety stock of 50 units RBC and 20 units Platelets for trauma surge periods', impact: '$28K one-time cost', timeline: '1 week' },
                        { priority: 'Medium', action: 'Create automated alert system for ED utilization exceeding 150 units/week (trigger procurement escalation)', impact: 'Prevent $84K overages', timeline: '2 weeks' },
                        { priority: 'Low', action: 'Partner with regional EMS and trauma registries for 48-hour demand forecasting integration', impact: '$45K efficiency gain', timeline: '8 weeks' },
                    ].map((rec, idx) => (
                        <div key={idx} className="bg-white rounded-2xl border border-gray-200 p-4 hover:shadow-md transition-shadow">
                            <div className="flex items-start gap-4">
                                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                                    rec.priority === 'High' ? 'bg-orange-100 text-orange-700' :
                                    rec.priority === 'Medium' ? 'bg-blue-100 text-blue-700' :
                                    'bg-gray-100 text-gray-700'
                                }`}>
                                    {rec.priority} Priority
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

// Cold Storage Content
function ColdStorageContent() {
    const temperatureExcursions = [
        { facility: 'Main Hospital', freezers: 6, excursions: 8, avgDuration: '12 min', impactedUnits: 24, cost: '$18K' },
        { facility: 'Bloomfield', freezers: 4, excursions: 3, avgDuration: '8 min', impactedUnits: 9, cost: '$6.8K' },
        { facility: 'Macomb', freezers: 5, excursions: 12, avgDuration: '18 min', impactedUnits: 35, cost: '$26.3K' },
        { facility: 'St. John', freezers: 5, excursions: 5, avgDuration: '6 min', impactedUnits: 15, cost: '$11.3K' },
        { facility: 'Wyandotte', freezers: 3, excursions: 2, avgDuration: '4 min', impactedUnits: 6, cost: '$4.5K' },
    ]

    return (
        <div className="space-y-6">
            {/* Problem Statement */}
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
                <div className="flex items-start gap-3">
                    <Thermometer className="w-6 h-6 text-blue-600 mt-1" />
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Problem Statement</h3>
                        <p className="text-sm text-gray-700 leading-relaxed">
                            <span className="font-semibold">30 temperature excursions</span> recorded across 5 facilities in the past 30 days, impacting <span className="font-semibold">89 
                            blood product units</span>. Macomb facility accounts for 40% of incidents (12 excursions, 35 units) with average duration of 18 minutes. Total 
                            financial loss: <span className="font-semibold">$66.9K</span>. Cold chain compliance failures create patient safety risks and regulatory exposure 
                            (FDA 21 CFR Part 607).
                        </p>
                    </div>
                </div>
            </div>

            {/* Root Cause Analysis */}
            <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Root Cause Analysis</h3>
                <div className="grid grid-cols-2 gap-6">
                    {/* Excursion Breakdown */}
                    <div className="bg-white rounded-2xl p-6 border border-gray-200">
                        <h4 className="text-sm font-semibold text-gray-900 mb-4">Temperature Excursions by Facility</h4>
                        <ResponsiveContainer width="100%" height={200}>
                            <BarChart data={temperatureExcursions} layout="vertical">
                                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" horizontal={false} />
                                <XAxis type="number" tick={{ fontSize: 11 }} />
                                <YAxis dataKey="facility" type="category" tick={{ fontSize: 10 }} width={80} />
                                <Tooltip />
                                <Bar dataKey="excursions" fill="#3b82f6" radius={[0, 4, 4, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                        <p className="text-xs text-gray-500 mt-2">Macomb facility shows 3x higher incident rate than average.</p>
                    </div>

                    {/* Key Findings */}
                    <div className="bg-white rounded-2xl p-6 border border-gray-200">
                        <h4 className="text-sm font-semibold text-gray-900 mb-4">Key Findings</h4>
                        <div className="space-y-3">
                            <div className="flex items-start gap-2">
                                <div className="w-2 h-2 rounded-full bg-blue-500 mt-1.5" />
                                <p className="text-sm text-gray-700"><span className="font-semibold">Equipment failure:</span> Macomb's Freezer #3 has faulty compressor (18 min avg excursion time).</p>
                            </div>
                            <div className="flex items-start gap-2">
                                <div className="w-2 h-2 rounded-full bg-blue-500 mt-1.5" />
                                <p className="text-sm text-gray-700"><span className="font-semibold">Door protocol violations:</span> 42% of excursions caused by extended freezer door open times.</p>
                            </div>
                            <div className="flex items-start gap-2">
                                <div className="w-2 h-2 rounded-full bg-blue-500 mt-1.5" />
                                <p className="text-sm text-gray-700"><span className="font-semibold">Alert response lag:</span> Average 8-minute delay from alarm to staff intervention.</p>
                            </div>
                            <div className="flex items-start gap-2">
                                <div className="w-2 h-2 rounded-full bg-blue-500 mt-1.5" />
                                <p className="text-sm text-gray-700"><span className="font-semibold">Monitoring gaps:</span> 3 facilities lack real-time IoT temperature sensors with auto-escalation.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Excursion Details */}
            <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Temperature Excursion Impact by Facility</h3>
                <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="text-left text-xs font-semibold text-gray-600 py-3 px-4">Facility</th>
                                <th className="text-center text-xs font-semibold text-gray-600 py-3 px-4">Freezers</th>
                                <th className="text-center text-xs font-semibold text-gray-600 py-3 px-4">Excursions (30d)</th>
                                <th className="text-center text-xs font-semibold text-gray-600 py-3 px-4">Avg Duration</th>
                                <th className="text-center text-xs font-semibold text-gray-600 py-3 px-4">Impacted Units</th>
                                <th className="text-right text-xs font-semibold text-gray-600 py-3 px-4">Financial Loss</th>
                            </tr>
                        </thead>
                        <tbody>
                            {temperatureExcursions.map((exc, idx) => (
                                <tr key={idx} className="border-t border-gray-100 hover:bg-gray-50">
                                    <td className="text-sm text-gray-900 py-3 px-4 font-medium">{exc.facility}</td>
                                    <td className="text-sm text-center text-gray-700 py-3 px-4">{exc.freezers}</td>
                                    <td className="text-sm text-center py-3 px-4">
                                        <span className={`font-semibold ${exc.excursions > 8 ? 'text-red-600' : 'text-orange-600'}`}>
                                            {exc.excursions}
                                        </span>
                                    </td>
                                    <td className="text-sm text-center text-gray-700 py-3 px-4">{exc.avgDuration}</td>
                                    <td className="text-sm text-center text-gray-900 py-3 px-4 font-semibold">{exc.impactedUnits}</td>
                                    <td className="text-sm text-right text-gray-900 py-3 px-4 font-semibold">{exc.cost}</td>
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
                    <div className="bg-blue-500 rounded-2xl p-6 text-white">
                        <div className="text-sm font-medium mb-2 opacity-90">Total Loss (30 days)</div>
                        <div className="text-4xl font-bold mb-1">$66.9K</div>
                        <div className="text-xs opacity-75">89 units impacted by excursions</div>
                    </div>
                    <div className="bg-purple-500 rounded-2xl p-6 text-white">
                        <div className="text-sm font-medium mb-2 opacity-90">Equipment Replacement</div>
                        <div className="text-4xl font-bold mb-1">$45K</div>
                        <div className="text-xs opacity-75">Macomb Freezer #3 + monitoring</div>
                    </div>
                    <div className="bg-emerald-500 rounded-2xl p-6 text-white">
                        <div className="text-sm font-medium mb-2 opacity-90">Annual Prevention Savings</div>
                        <div className="text-4xl font-bold mb-1">$802K</div>
                        <div className="text-xs opacity-75">Through IoT monitoring + protocol</div>
                    </div>
                </div>
            </div>

            {/* Recommended Actions */}
            <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recommended Actions</h3>
                <div className="space-y-3">
                    {[
                        { priority: 'Critical', action: 'Replace Macomb Freezer #3 compressor immediately (accounts for 40% of excursions)', impact: '$45K equipment + $315K annual loss prevention', timeline: '48 hours' },
                        { priority: 'High', action: 'Deploy IoT temperature monitoring sensors with real-time SMS/app alerts across all 23 freezers (5 facilities)', impact: '$802K annual savings', timeline: '2 weeks' },
                        { priority: 'High', action: 'Implement door-open alarm system (audible alert after 30 seconds) + staff training on protocol adherence', impact: '$338K annual savings', timeline: '1 week' },
                        { priority: 'Medium', action: 'Establish 2-minute alert response SLA with automated escalation to supervisors and biomedical engineering', impact: 'Reduce avg response from 8 to 2 minutes', timeline: '1 week' },
                        { priority: 'Medium', action: 'Schedule preventive maintenance audits for all freezers quarterly (vs. current annual schedule)', impact: '$149K annual savings', timeline: '1 month' },
                        { priority: 'Low', action: 'Integrate cold storage monitoring with RTLS for chain of custody documentation (FDA compliance)', impact: 'Regulatory risk mitigation', timeline: '6 weeks' },
                    ].map((rec, idx) => (
                        <div key={idx} className="bg-white rounded-2xl border border-gray-200 p-4 hover:shadow-md transition-shadow">
                            <div className="flex items-start gap-4">
                                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                                    rec.priority === 'Critical' ? 'bg-red-100 text-red-700' :
                                    rec.priority === 'High' ? 'bg-orange-100 text-orange-700' :
                                    rec.priority === 'Medium' ? 'bg-blue-100 text-blue-700' :
                                    'bg-gray-100 text-gray-700'
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

// Alerts Content
function AlertsContent() {
    const custodyGaps = [
        { facility: 'Main Hospital', totalOrders: 3840, gapsDetected: 412, gapRate: '10.7%', avgGapDuration: '45 min', cost: '$28.5K' },
        { facility: 'Bloomfield', totalOrders: 1560, gapsDetected: 89, gapRate: '5.7%', avgGapDuration: '32 min', cost: '$6.2K' },
        { facility: 'Macomb', totalOrders: 2120, gapsDetected: 318, gapRate: '15.0%', avgGapDuration: '62 min', cost: '$22.1K' },
        { facility: 'St. John', totalOrders: 2240, gapsDetected: 156, gapRate: '7.0%', avgGapDuration: '38 min', cost: '$10.8K' },
        { facility: 'Wyandotte', totalOrders: 980, gapsDetected: 42, gapRate: '4.3%', avgGapDuration: '28 min', cost: '$2.9K' },
    ]

    return (
        <div className="space-y-6">
            {/* Problem Statement */}
            <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
                <div className="flex items-start gap-3">
                    <AlertCircle className="w-6 h-6 text-red-600 mt-1" />
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Problem Statement</h3>
                        <p className="text-sm text-gray-700 leading-relaxed">
                            Chain of custody tracking reveals <span className="font-semibold">1,017 documented gaps</span> across 10,740 blood product orders in the past 30 days 
                            (<span className="font-semibold">9.5% gap rate</span>). Macomb facility shows highest incidence at 15.0% (318 gaps) with average 62-minute tracking blackouts. 
                            These gaps create <span className="font-semibold">patient safety risks</span>, regulatory non-compliance exposure, and potential <span className="font-semibold">$70.5K 
                            monthly wastage</span> from unverified blood products.
                        </p>
                    </div>
                </div>
            </div>

            {/* Root Cause Analysis */}
            <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Root Cause Analysis</h3>
                <div className="grid grid-cols-2 gap-6">
                    {/* Gap Rate Chart */}
                    <div className="bg-white rounded-2xl p-6 border border-gray-200">
                        <h4 className="text-sm font-semibold text-gray-900 mb-4">Chain of Custody Gap Rate by Facility</h4>
                        <ResponsiveContainer width="100%" height={200}>
                            <BarChart data={custodyGaps}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                                <XAxis dataKey="facility" tick={{ fontSize: 9 }} />
                                <YAxis tick={{ fontSize: 11 }} />
                                <Tooltip />
                                <Bar dataKey="gapsDetected" fill="#ef4444" radius={[4, 4, 0, 0]}>
                                    {custodyGaps.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={parseFloat(entry.gapRate) > 10 ? '#ef4444' : '#f59e0b'} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                        <p className="text-xs text-gray-500 mt-2">Macomb shows 2.6x higher gap rate than system average (15.0% vs. 5.8%).</p>
                    </div>

                    {/* Key Findings */}
                    <div className="bg-white rounded-2xl p-6 border border-gray-200">
                        <h4 className="text-sm font-semibold text-gray-900 mb-4">Key Findings</h4>
                        <div className="space-y-3">
                            <div className="flex items-start gap-2">
                                <div className="w-2 h-2 rounded-full bg-red-500 mt-1.5" />
                                <p className="text-sm text-gray-700"><span className="font-semibold">RFID coverage gaps:</span> Macomb lacks RFID readers in 4 critical transit zones (OR, ICU corridors).</p>
                            </div>
                            <div className="flex items-start gap-2">
                                <div className="w-2 h-2 rounded-full bg-red-500 mt-1.5" />
                                <p className="text-sm text-gray-700"><span className="font-semibold">Manual handoff failures:</span> 68% of gaps occur during shift changes when barcode scanning is skipped.</p>
                            </div>
                            <div className="flex items-start gap-2">
                                <div className="w-2 h-2 rounded-full bg-red-500 mt-1.5" />
                                <p className="text-sm text-gray-700"><span className="font-semibold">System integration lag:</span> Blood bank EHR doesn't sync with RTLS (30-minute polling delay).</p>
                            </div>
                            <div className="flex items-start gap-2">
                                <div className="w-2 h-2 rounded-full bg-red-500 mt-1.5" />
                                <p className="text-sm text-gray-700"><span className="font-semibold">Staff training deficit:</span> Only 42% of nursing staff trained on custody documentation protocol.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Gap Details */}
            <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Chain of Custody Gaps by Facility (30 Days)</h3>
                <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="text-left text-xs font-semibold text-gray-600 py-3 px-4">Facility</th>
                                <th className="text-center text-xs font-semibold text-gray-600 py-3 px-4">Total Orders</th>
                                <th className="text-center text-xs font-semibold text-gray-600 py-3 px-4">Gaps Detected</th>
                                <th className="text-center text-xs font-semibold text-gray-600 py-3 px-4">Gap Rate</th>
                                <th className="text-center text-xs font-semibold text-gray-600 py-3 px-4">Avg Gap Duration</th>
                                <th className="text-right text-xs font-semibold text-gray-600 py-3 px-4">Monthly Cost Impact</th>
                            </tr>
                        </thead>
                        <tbody>
                            {custodyGaps.map((gap, idx) => (
                                <tr key={idx} className="border-t border-gray-100 hover:bg-gray-50">
                                    <td className="text-sm text-gray-900 py-3 px-4 font-medium">{gap.facility}</td>
                                    <td className="text-sm text-center text-gray-700 py-3 px-4">{gap.totalOrders.toLocaleString()}</td>
                                    <td className="text-sm text-center text-gray-900 py-3 px-4 font-semibold">{gap.gapsDetected}</td>
                                    <td className="text-sm text-center py-3 px-4">
                                        <span className={`font-semibold ${parseFloat(gap.gapRate) > 10 ? 'text-red-600' : 'text-orange-600'}`}>
                                            {gap.gapRate}
                                        </span>
                                    </td>
                                    <td className="text-sm text-center text-gray-700 py-3 px-4">{gap.avgGapDuration}</td>
                                    <td className="text-sm text-right text-gray-900 py-3 px-4 font-semibold">{gap.cost}</td>
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
                        <div className="text-sm font-medium mb-2 opacity-90">Monthly Wastage Cost</div>
                        <div className="text-4xl font-bold mb-1">$70.5K</div>
                        <div className="text-xs opacity-75">1,017 gaps × avg unit cost</div>
                    </div>
                    <div className="bg-orange-500 rounded-2xl p-6 text-white">
                        <div className="text-sm font-medium mb-2 opacity-90">Regulatory Risk Exposure</div>
                        <div className="text-4xl font-bold mb-1">$500K</div>
                        <div className="text-xs opacity-75">Potential FDA penalties + audits</div>
                    </div>
                    <div className="bg-emerald-500 rounded-2xl p-6 text-white">
                        <div className="text-sm font-medium mb-2 opacity-90">Prevention Savings Potential</div>
                        <div className="text-4xl font-bold mb-1">$846K</div>
                        <div className="text-xs opacity-75">Annual via RFID + protocol compliance</div>
                    </div>
                </div>
            </div>

            {/* Recommended Actions */}
            <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recommended Actions</h3>
                <div className="space-y-3">
                    {[
                        { priority: 'Critical', action: 'Install 12 RFID readers in Macomb transit gaps (OR, ICU corridors, blood bank exit points)', impact: '$22.1K monthly savings', timeline: '1 week' },
                        { priority: 'Critical', action: 'Implement mandatory barcode scanning at all handoff points with workflow enforcement (cannot proceed without scan)', impact: '$48K monthly savings', timeline: '2 weeks' },
                        { priority: 'High', action: 'Upgrade blood bank EHR integration to real-time RTLS sync (eliminate 30-minute polling delay)', impact: '$70.5K annual prevention', timeline: '3 weeks' },
                        { priority: 'High', action: 'Deploy chain of custody training program for all nursing staff (target: 95% completion in 4 weeks)', impact: 'Reduce human error by 68%', timeline: '4 weeks' },
                        { priority: 'Medium', action: 'Create automated gap detection alerts sent to charge nurses within 5 minutes of missed scans', impact: '$182K annual savings', timeline: '2 weeks' },
                        { priority: 'Medium', action: 'Establish audit protocol for high-gap facilities (Macomb: weekly, others: monthly) with corrective action plans', impact: 'Reduce gap rate from 9.5% to <3%', timeline: '1 month' },
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

// Custody Improvements Content
function CustodyImprovementsContent() {
    const departmentImprovements = [
        { dept: 'Emergency Department', baseline: 88.4, current: 97.2, improvement: 8.8, criticalBreaks: 0, processChanges: ['RFID reader installation at all entry/exit points', 'Mandatory scanning protocol enforced via workflow'] },
        { dept: 'Operating Room', baseline: 91.2, current: 98.5, improvement: 7.3, criticalBreaks: 0, processChanges: ['Real-time RTLS integration with OR management system', 'Automated handoff verification'] },
        { dept: 'Intensive Care Unit', baseline: 93.1, current: 96.8, improvement: 3.7, criticalBreaks: 0, processChanges: ['Barcode scanning at bedside mandatory', 'Chain of custody training for all ICU nurses'] },
        { dept: 'Blood Bank', baseline: 95.8, current: 99.2, improvement: 3.4, criticalBreaks: 0, processChanges: ['Upgraded EHR integration eliminating 30-min polling delay', 'Automated gap detection alerts'] },
        { dept: 'Oncology', baseline: 89.7, current: 95.8, improvement: 6.1, criticalBreaks: 0, processChanges: ['RFID readers in all corridors', 'Staff training program (98% completion)'] },
        { dept: 'Pediatrics', baseline: 90.5, current: 96.1, improvement: 5.6, criticalBreaks: 0, processChanges: ['Enhanced scanning workflow at all handoff points', 'Pediatric-specific custody protocols'] },
        { dept: 'Labor & Delivery', baseline: 92.3, current: 97.5, improvement: 5.2, criticalBreaks: 0, processChanges: ['RTLS coverage expansion to all L&D rooms', 'Automated alerts for delayed scans'] },
        { dept: 'Cardiology', baseline: 94.1, current: 98.3, improvement: 4.2, criticalBreaks: 0, processChanges: ['Integration with cath lab systems', 'Real-time tracking for emergency procedures'] },
    ]

    const improvementTrend = [
        { month: 'Jan', overall: 91.2, critical: 8, training: 45 },
        { month: 'Feb', overall: 92.5, critical: 6, training: 62 },
        { month: 'Mar', overall: 93.8, critical: 4, training: 78 },
        { month: 'Apr', overall: 95.1, critical: 3, training: 89 },
        { month: 'May', overall: 96.2, critical: 0, training: 98 },
    ]

    const processImprovements = [
        { 
            initiative: 'RFID Reader Expansion', 
            sites: 'Macomb, Wayne County, Dearborn Medical', 
            investment: '$145K',
            impact: 'Reduced tracking gaps by 82% (from 9.5% to 1.7%)',
            roi: '$182K annual savings',
            status: 'Complete'
        },
        { 
            initiative: 'Mandatory Scanning Protocol', 
            sites: 'All 18 facilities', 
            investment: '$0 (policy change)',
            impact: 'Improved compliance from 88.4% to 96.2%',
            roi: '$220K annual savings',
            status: 'Complete'
        },
        { 
            initiative: 'EHR Integration Upgrade', 
            sites: 'All sites with Epic/Cerner', 
            investment: '$68K',
            impact: 'Eliminated 30-min sync delay, real-time custody tracking',
            roi: '$70.5K annual prevention',
            status: 'Complete'
        },
        { 
            initiative: 'Staff Training Program', 
            sites: 'All nursing staff (2,140 employees)', 
            investment: '$32K',
            impact: '98% completion, 68% reduction in human error',
            roi: '$95K annual savings',
            status: 'Complete'
        },
        { 
            initiative: 'Automated Gap Detection', 
            sites: 'All 18 facilities', 
            investment: '$22K',
            impact: 'Average detection time reduced from 4 hours to 5 minutes',
            roi: '$48K annual savings',
            status: 'Complete'
        },
    ]

    const costAvoidance = [
        { category: 'Wasted Units', baseline: '$420K/yr', current: '$68K/yr', savings: '$352K' },
        { category: 'Regulatory Fines', baseline: '$185K/yr', current: '$12K/yr', savings: '$173K' },
        { category: 'Untracked Inventory', baseline: '$96K/yr', current: '$8K/yr', savings: '$88K' },
        { category: 'Emergency Orders', baseline: '$142K/yr', current: '$24K/yr', savings: '$118K' },
    ]

    return (
        <div className="space-y-8">
            {/* Overview Cards */}
            <div className="grid grid-cols-4 gap-4">
                <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-2xl p-6 border border-emerald-200">
                    <CheckCircle2 className="w-8 h-8 text-emerald-600 mb-3" />
                    <div className="text-3xl font-bold text-emerald-900">96.2%</div>
                    <div className="text-sm text-emerald-700 font-medium mt-1">Current Traceability</div>
                    <div className="text-xs text-emerald-600 mt-2">+5.0% from baseline</div>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border border-blue-200">
                    <AlertCircle className="w-8 h-8 text-blue-600 mb-3" />
                    <div className="text-3xl font-bold text-blue-900">0</div>
                    <div className="text-sm text-blue-700 font-medium mt-1">Critical Breaks (30 days)</div>
                    <div className="text-xs text-blue-600 mt-2">Down from 12/month</div>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6 border border-purple-200">
                    <TrendingUp className="w-8 h-8 text-purple-600 mb-3" />
                    <div className="text-3xl font-bold text-purple-900">$731K</div>
                    <div className="text-sm text-purple-700 font-medium mt-1">Annual Cost Avoidance</div>
                    <div className="text-xs text-purple-600 mt-2">From process improvements</div>
                </div>

                <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-6 border border-orange-200">
                    <Package className="w-8 h-8 text-orange-600 mb-3" />
                    <div className="text-3xl font-bold text-orange-900">5</div>
                    <div className="text-sm text-orange-700 font-medium mt-1">Completed Initiatives</div>
                    <div className="text-xs text-orange-600 mt-2">$267K total investment</div>
                </div>
            </div>

            {/* Improvement Trend Chart */}
            <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">5-Month Improvement Trajectory</h3>
                <div className="bg-white rounded-2xl border border-gray-200 p-6">
                    <ResponsiveContainer width="100%" height={280}>
                        <LineChart data={improvementTrend}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                            <XAxis dataKey="month" stroke="#666" style={{ fontSize: '12px' }} />
                            <YAxis yAxisId="left" stroke="#666" style={{ fontSize: '12px' }} label={{ value: 'Traceability %', angle: -90, position: 'insideLeft', style: { fontSize: '12px' } }} />
                            <YAxis yAxisId="right" orientation="right" stroke="#666" style={{ fontSize: '12px' }} label={{ value: 'Critical Breaks', angle: 90, position: 'insideRight', style: { fontSize: '12px' } }} />
                            <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e5e7eb' }} />
                            <Legend wrapperStyle={{ fontSize: '12px' }} />
                            <Line yAxisId="left" type="monotone" dataKey="overall" stroke="#10b981" strokeWidth={3} name="Overall Traceability %" dot={{ fill: '#10b981', r: 5 }} />
                            <Line yAxisId="right" type="monotone" dataKey="critical" stroke="#ef4444" strokeWidth={2} name="Critical Breaks" dot={{ fill: '#ef4444', r: 5 }} />
                            <Line yAxisId="left" type="monotone" dataKey="training" stroke="#8b5cf6" strokeWidth={2} strokeDasharray="5 5" name="Training Completion %" dot={{ fill: '#8b5cf6', r: 4 }} />
                        </LineChart>
                    </ResponsiveContainer>
                    <p className="text-xs text-gray-600 mt-4 text-center">
                        Custody chain improvements correlate with training completion and infrastructure deployment. Zero critical breaks achieved in May.
                    </p>
                </div>
            </div>

            {/* Department-Level Improvements */}
            <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Department-Level Performance Gains</h3>
                <div className="space-y-3">
                    {departmentImprovements.map((dept, idx) => (
                        <div key={idx} className="bg-white rounded-2xl border border-gray-200 p-5 hover:shadow-md transition-shadow">
                            <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-3">
                                    <Building2 className="w-5 h-5 text-gray-600" />
                                    <span className="font-semibold text-gray-900">{dept.dept}</span>
                                    {dept.criticalBreaks === 0 && (
                                        <span className="bg-emerald-100 text-emerald-700 text-xs font-semibold px-2 py-1 rounded-full">
                                            0 Critical Breaks
                                        </span>
                                    )}
                                </div>
                                <div className="text-right">
                                    <div className="text-2xl font-bold text-emerald-600">+{dept.improvement}%</div>
                                    <div className="text-xs text-gray-600">{dept.baseline}% → {dept.current}%</div>
                                </div>
                            </div>
                            <div className="mb-3">
                                <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                                    <span>Baseline</span>
                                    <span>Current Performance</span>
                                </div>
                                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                    <div 
                                        className="h-full bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full transition-all duration-1000"
                                        style={{ width: `${dept.current}%` }}
                                    />
                                </div>
                            </div>
                            <div className="bg-gray-50 rounded-xl p-3">
                                <div className="text-xs font-semibold text-gray-700 mb-2">Process Changes Implemented:</div>
                                <ul className="space-y-1">
                                    {dept.processChanges.map((change, cIdx) => (
                                        <li key={cIdx} className="text-xs text-gray-600 flex items-start gap-2">
                                            <CheckCircle2 className="w-3 h-3 text-emerald-600 mt-0.5 flex-shrink-0" />
                                            <span>{change}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Process Improvement Initiatives */}
            <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Completed Process Improvement Initiatives</h3>
                <div className="space-y-3">
                    {processImprovements.map((initiative, idx) => (
                        <div key={idx} className="bg-white rounded-2xl border border-gray-200 p-5">
                            <div className="flex items-start justify-between mb-3">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <h4 className="font-semibold text-gray-900">{initiative.initiative}</h4>
                                        <span className="bg-emerald-100 text-emerald-700 text-xs font-semibold px-2 py-1 rounded-full">
                                            {initiative.status}
                                        </span>
                                    </div>
                                    <div className="text-sm text-gray-600 mb-2">
                                        <span className="font-medium">Sites:</span> {initiative.sites}
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-lg font-bold text-emerald-600">{initiative.roi}</div>
                                    <div className="text-xs text-gray-600">Annual ROI</div>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4 bg-gray-50 rounded-xl p-4">
                                <div>
                                    <div className="text-xs font-semibold text-gray-700 mb-1">Investment</div>
                                    <div className="text-sm text-gray-900">{initiative.investment}</div>
                                </div>
                                <div>
                                    <div className="text-xs font-semibold text-gray-700 mb-1">Impact</div>
                                    <div className="text-sm text-gray-900">{initiative.impact}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Cost Avoidance Breakdown */}
            <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Annual Cost Avoidance by Category</h3>
                <div className="bg-white rounded-2xl border border-gray-200 p-6">
                    <div className="space-y-4">
                        {costAvoidance.map((item, idx) => (
                            <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                                <div className="flex-1">
                                    <div className="font-semibold text-gray-900 mb-1">{item.category}</div>
                                    <div className="text-sm text-gray-600">
                                        Baseline: <span className="font-medium text-red-600">{item.baseline}</span> → Current: <span className="font-medium text-emerald-600">{item.current}</span>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-2xl font-bold text-emerald-600">{item.savings}</div>
                                    <div className="text-xs text-gray-600">Saved</div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-6 pt-6 border-t border-gray-200 flex items-center justify-between">
                        <div className="text-lg font-semibold text-gray-900">Total Annual Cost Avoidance</div>
                        <div className="text-3xl font-bold text-emerald-600">$731K</div>
                    </div>
                </div>
            </div>

            {/* Key Insights */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border border-blue-200">
                <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    Key Quality Achievement Insights
                </h3>
                <div className="space-y-3">
                    <div className="bg-white rounded-xl p-4">
                        <p className="text-sm text-gray-900 mb-2">
                            <span className="font-semibold">Zero Critical Breaks:</span> Achieved for the first time in 30 days through comprehensive RFID deployment and mandatory scanning protocols across all 18 facilities.
                        </p>
                    </div>
                    <div className="bg-white rounded-xl p-4">
                        <p className="text-sm text-gray-900 mb-2">
                            <span className="font-semibold">Highest Impact Department:</span> Emergency Department showed +8.8% improvement (88.4% → 97.2%) due to targeted RFID installation at all entry/exit points and workflow enforcement.
                        </p>
                    </div>
                    <div className="bg-white rounded-xl p-4">
                        <p className="text-sm text-gray-900 mb-2">
                            <span className="font-semibold">ROI Leader:</span> Mandatory Scanning Protocol delivered $220K annual savings with zero investment, demonstrating high-value policy improvements.
                        </p>
                    </div>
                    <div className="bg-white rounded-xl p-4">
                        <p className="text-sm text-gray-900 mb-2">
                            <span className="font-semibold">Training Correlation:</span> 98% staff training completion directly correlated with 68% reduction in human error and elimination of critical custody breaks.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
