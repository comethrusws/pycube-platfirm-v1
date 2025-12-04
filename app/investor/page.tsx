'use client'

import { useState } from 'react'
import { 
    Building2, DollarSign, TrendingUp, Users, Zap, Globe, 
    ArrowRight, CheckCircle2, Target, Crown, Sparkles, Map,
    Hospital, Package, TestTube, Activity, Radio
} from 'lucide-react'
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, PieChart, Pie } from 'recharts'

/**
 * Investor Dashboard (R6.7/R6.8)
 * 
 * 10-minute sequence optimized for investor/fundraising conversations
 * Focus: TAM, market opportunity, economic value, traction, roadmap
 * 
 * Sections:
 * 1. Market Opportunity (TAM/SAM/SOM)
 * 2. Economic Value Delivered
 * 3. Crown Jewels (deployed hospitals)
 * 4. Product Roadmap & Vision
 */

interface Section {
    id: number
    title: string
    duration: string
    icon: any
}

const SECTIONS: Section[] = [
    { id: 1, title: 'Market Opportunity', duration: '2 min', icon: Globe },
    { id: 2, title: 'Economic Value', duration: '3 min', icon: DollarSign },
    { id: 3, title: 'Traction & Crown Jewels', duration: '3 min', icon: Crown },
    { id: 4, title: 'Roadmap & Vision', duration: '2 min', icon: Sparkles },
]

export default function InvestorDashboard() {
    const [activeSection, setActiveSection] = useState(1)

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950">
            {/* Header */}
            <div className="border-b border-white/10 bg-black/20 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto px-8 py-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-white mb-2">PyCube Platform</h1>
                            <p className="text-indigo-300 text-lg">Real-Time Intelligence for Hospital Operations</p>
                        </div>
                        <div className="text-right">
                            <div className="text-sm text-indigo-300 mb-1">Series A Target</div>
                            <div className="text-2xl font-bold text-white">$8M</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Section Navigation */}
            <div className="border-b border-white/10 bg-black/10 backdrop-blur-sm sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-8">
                    <div className="flex gap-6">
                        {SECTIONS.map((section) => {
                            const Icon = section.icon
                            const isActive = activeSection === section.id
                            return (
                                <button
                                    key={section.id}
                                    onClick={() => setActiveSection(section.id)}
                                    className={`flex items-center gap-3 px-4 py-4 border-b-2 transition-all ${
                                        isActive 
                                            ? 'border-indigo-400 text-white' 
                                            : 'border-transparent text-indigo-300 hover:text-white'
                                    }`}
                                >
                                    <Icon className="w-5 h-5" />
                                    <div className="text-left">
                                        <div className="text-sm font-semibold">{section.title}</div>
                                        <div className="text-xs text-indigo-400">{section.duration}</div>
                                    </div>
                                </button>
                            )
                        })}
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-7xl mx-auto px-8 py-8">
                {activeSection === 1 && <MarketOpportunity />}
                {activeSection === 2 && <EconomicValue />}
                {activeSection === 3 && <TractionCrownJewels />}
                {activeSection === 4 && <RoadmapVision />}
            </div>

            {/* Footer CTA */}
            <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-indigo-600 to-purple-600 border-t border-indigo-400/30">
                <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
                    <div className="text-white">
                        <div className="text-sm font-medium">Ready to discuss investment?</div>
                        <div className="text-xs text-indigo-100">Schedule a deep-dive with our founding team</div>
                    </div>
                    <button className="px-6 py-3 bg-white text-indigo-600 rounded-lg font-semibold hover:bg-indigo-50 transition-colors flex items-center gap-2">
                        Schedule Call
                        <ArrowRight className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    )
}

// Section 1: Market Opportunity (TAM/SAM/SOM)
function MarketOpportunity() {
    const marketSizeData = [
        { name: 'TAM', value: 50, label: '$50B', color: '#818cf8' },
        { name: 'SAM', value: 8, label: '$8B', color: '#6366f1' },
        { name: 'SOM', value: 0.8, label: '$800M', color: '#4f46e5' },
    ]

    const verticalBreakdown = [
        { vertical: 'Transfusion Medicine', tam: 12, growth: 18, urgency: 'Critical' },
        { vertical: 'Biomedical Assets', tam: 15, growth: 14, urgency: 'High' },
        { vertical: 'Lab Medicine', tam: 18, growth: 16, urgency: 'Critical' },
        { vertical: 'Supply Chain', tam: 8, growth: 12, urgency: 'Medium' },
        { vertical: 'Infrastructure', tam: 5, growth: 10, urgency: 'Low' },
    ]

    return (
        <div className="space-y-8 pb-24">
            {/* Hero Stats */}
            <div className="grid grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-400/30 rounded-2xl p-6 backdrop-blur-sm">
                    <Globe className="w-10 h-10 text-indigo-400 mb-4" />
                    <div className="text-5xl font-bold text-white mb-2">$50B</div>
                    <div className="text-indigo-300 text-lg">Total Addressable Market</div>
                    <div className="text-sm text-indigo-400 mt-2">US Hospital Operations Software</div>
                </div>
                <div className="bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-400/30 rounded-2xl p-6 backdrop-blur-sm">
                    <TrendingUp className="w-10 h-10 text-emerald-400 mb-4" />
                    <div className="text-5xl font-bold text-white mb-2">15.2%</div>
                    <div className="text-emerald-300 text-lg">Market CAGR</div>
                    <div className="text-sm text-emerald-400 mt-2">2024-2030 Growth Rate</div>
                </div>
                <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-400/30 rounded-2xl p-6 backdrop-blur-sm">
                    <Building2 className="w-10 h-10 text-purple-400 mb-4" />
                    <div className="text-5xl font-bold text-white mb-2">6,120</div>
                    <div className="text-purple-300 text-lg">Target Hospitals</div>
                    <div className="text-sm text-purple-400 mt-2">US Hospitals with 200+ beds</div>
                </div>
            </div>

            {/* Market Sizing */}
            <div className="grid grid-cols-2 gap-6">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
                    <h2 className="text-2xl font-bold text-white mb-6">Market Sizing</h2>
                    <div className="space-y-4">
                        {marketSizeData.map((market) => (
                            <div key={market.name} className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <span className="text-white font-semibold">{market.name}</span>
                                    <span className="text-2xl font-bold text-white">{market.label}</span>
                                </div>
                                <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                                    <div 
                                        className="h-full rounded-full transition-all duration-1000"
                                        style={{ 
                                            width: `${(market.value / 50) * 100}%`,
                                            backgroundColor: market.color
                                        }}
                                    />
                                </div>
                                <div className="text-xs text-gray-400">
                                    {market.name === 'TAM' && 'Total Addressable Market: US Hospital Operations'}
                                    {market.name === 'SAM' && 'Serviceable Available Market: 200+ bed hospitals'}
                                    {market.name === 'SOM' && 'Serviceable Obtainable Market: 3-year target'}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
                    <h2 className="text-2xl font-bold text-white mb-6">Vertical Breakdown</h2>
                    <div className="space-y-3">
                        {verticalBreakdown.map((vertical) => (
                            <div key={vertical.vertical} className="bg-white/5 border border-white/10 rounded-xl p-4">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-white font-medium">{vertical.vertical}</span>
                                    <span className={`text-xs px-2 py-1 rounded-full ${
                                        vertical.urgency === 'Critical' ? 'bg-red-500/20 text-red-300' :
                                        vertical.urgency === 'High' ? 'bg-orange-500/20 text-orange-300' :
                                        'bg-blue-500/20 text-blue-300'
                                    }`}>
                                        {vertical.urgency}
                                    </span>
                                </div>
                                <div className="flex items-center gap-4 text-sm">
                                    <div className="text-gray-400">
                                        TAM: <span className="text-white font-semibold">${vertical.tam}B</span>
                                    </div>
                                    <div className="text-gray-400">
                                        Growth: <span className="text-emerald-400 font-semibold">+{vertical.growth}%</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Why Now */}
            <div className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-400/30 rounded-2xl p-8 backdrop-blur-sm">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <Zap className="w-8 h-8 text-amber-400" />
                    Why Now? Market Tailwinds
                </h2>
                <div className="grid grid-cols-3 gap-6">
                    <div className="space-y-2">
                        <div className="text-lg font-semibold text-amber-200">Regulatory Pressure</div>
                        <p className="text-sm text-gray-300">FDA 21 CFR Part 11 compliance for blood product tracking. CMS penalties for custody breaks.</p>
                    </div>
                    <div className="space-y-2">
                        <div className="text-lg font-semibold text-amber-200">Labor Crisis</div>
                        <p className="text-sm text-gray-300">18% nursing shortage driving automation. $4.8M avg annual value from workflow efficiency.</p>
                    </div>
                    <div className="space-y-2">
                        <div className="text-lg font-semibold text-amber-200">Patient Safety</div>
                        <p className="text-sm text-gray-300">Zero wrong-patient incidents with RTLS. 38% reduction in specimen turnaround time.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

// Section 2: Economic Value Delivered
function EconomicValue() {
    const valueDrivers = [
        { category: 'Asset Utilization', annual: 1200, description: 'Reduce capital expenditure by optimizing existing asset fleet', icon: Activity },
        { category: 'Wastage Prevention', annual: 850, description: 'FEFO protocols prevent blood product and supply expiry', icon: Package },
        { category: 'Labor Efficiency', annual: 2100, description: 'Automate manual tracking, reduce search time by 75%', icon: Users },
        { category: 'Compliance Avoidance', annual: 650, description: 'Avoid CMS penalties and regulatory fines', icon: CheckCircle2 },
    ]

    const roiData = [
        { month: 'M1', value: -120, label: 'Implementation' },
        { month: 'M3', value: -80, label: 'Training' },
        { month: 'M6', value: 150, label: 'Early Wins' },
        { month: 'M9', value: 280, label: 'Adoption' },
        { month: 'M12', value: 400, label: 'Full Value' },
        { month: 'M18', value: 600, label: 'Expansion' },
    ]

    return (
        <div className="space-y-8 pb-24">
            {/* Value Proposition */}
            <div className="bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-400/30 rounded-2xl p-8 backdrop-blur-sm">
                <div className="flex items-start justify-between mb-8">
                    <div>
                        <h2 className="text-3xl font-bold text-white mb-2">Economic Value Delivered</h2>
                        <p className="text-emerald-200 text-lg">Average hospital system (5 hospitals, 1,200 beds)</p>
                    </div>
                    <div className="text-right">
                        <div className="text-6xl font-bold text-white mb-2">$4.8M</div>
                        <div className="text-emerald-300 text-xl">Annual Value</div>
                    </div>
                </div>

                <div className="grid grid-cols-4 gap-4">
                    {valueDrivers.map((driver) => {
                        const Icon = driver.icon
                        return (
                            <div key={driver.category} className="bg-white/10 border border-white/20 rounded-xl p-5 backdrop-blur-sm">
                                <Icon className="w-8 h-8 text-emerald-400 mb-3" />
                                <div className="text-2xl font-bold text-white mb-1">
                                    ${(driver.annual / 1000).toFixed(1)}M
                                </div>
                                <div className="text-sm font-semibold text-emerald-200 mb-2">{driver.category}</div>
                                <div className="text-xs text-gray-300">{driver.description}</div>
                            </div>
                        )
                    })}
                </div>
            </div>

            {/* ROI Timeline */}
            <div className="grid grid-cols-2 gap-6">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
                    <h2 className="text-2xl font-bold text-white mb-6">ROI Timeline</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={roiData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
                            <XAxis dataKey="month" tick={{ fill: '#94a3b8' }} />
                            <YAxis tick={{ fill: '#94a3b8' }} />
                            <Tooltip 
                                contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
                                labelStyle={{ color: '#f1f5f9' }}
                            />
                            <Line type="monotone" dataKey="value" stroke="#10b981" strokeWidth={3} dot={{ fill: '#10b981', r: 6 }} />
                        </LineChart>
                    </ResponsiveContainer>
                    <div className="mt-4 p-4 bg-emerald-500/10 border border-emerald-400/30 rounded-lg">
                        <div className="text-sm text-emerald-200">
                            <span className="font-semibold">Breakeven:</span> 4-6 months | <span className="font-semibold">Payback:</span> 8-10 months
                        </div>
                    </div>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
                    <h2 className="text-2xl font-bold text-white mb-6">Customer Economics</h2>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-xl">
                            <div>
                                <div className="text-sm text-gray-400">Average Contract Value (ACV)</div>
                                <div className="text-3xl font-bold text-white">$420K</div>
                            </div>
                            <div className="text-right">
                                <div className="text-sm text-gray-400">Per Hospital</div>
                                <div className="text-xl font-semibold text-indigo-300">$84K</div>
                            </div>
                        </div>
                        <div className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-xl">
                            <div>
                                <div className="text-sm text-gray-400">Customer Lifetime Value (LTV)</div>
                                <div className="text-3xl font-bold text-white">$2.8M</div>
                            </div>
                            <div className="text-right">
                                <div className="text-sm text-gray-400">LTV:CAC Ratio</div>
                                <div className="text-xl font-semibold text-emerald-400">6.2x</div>
                            </div>
                        </div>
                        <div className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-xl">
                            <div>
                                <div className="text-sm text-gray-400">Net Revenue Retention (NRR)</div>
                                <div className="text-3xl font-bold text-white">142%</div>
                            </div>
                            <div className="text-right">
                                <div className="text-sm text-gray-400">Expansion Revenue</div>
                                <div className="text-xl font-semibold text-purple-400">$180K/yr</div>
                            </div>
                        </div>
                        <div className="p-4 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-indigo-400/30 rounded-xl">
                            <div className="text-sm text-indigo-200 mb-2">Expansion Path</div>
                            <div className="text-xs text-gray-300">Start: Transfusion → Add: Biomed Assets → Add: Lab Medicine → Add: Supply Chain</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Competitive Advantage */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
                <h2 className="text-2xl font-bold text-white mb-6">Competitive Positioning</h2>
                <div className="grid grid-cols-3 gap-6">
                    <div className="space-y-3">
                        <div className="text-lg font-semibold text-indigo-300">vs. Legacy RTLS (Stanley, Zebra)</div>
                        <ul className="space-y-2 text-sm text-gray-300">
                            <li className="flex items-start gap-2">
                                <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                                <span>5x lower infrastructure cost ($485 vs $2,400+ gateways)</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                                <span>Domain intelligence built-in (vs generic tracking)</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                                <span>AI-powered insights + automated workflows</span>
                            </li>
                        </ul>
                    </div>
                    <div className="space-y-3">
                        <div className="text-lg font-semibold text-purple-300">vs. Point Solutions</div>
                        <ul className="space-y-2 text-sm text-gray-300">
                            <li className="flex items-start gap-2">
                                <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                                <span>Unified platform (5 domains vs 5 vendors)</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                                <span>Cross-domain insights (e.g., blood → labs)</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                                <span>Single data model + integration layer</span>
                            </li>
                        </ul>
                    </div>
                    <div className="space-y-3">
                        <div className="text-lg font-semibold text-emerald-300">vs. EHR Modules</div>
                        <ul className="space-y-2 text-sm text-gray-300">
                            <li className="flex items-start gap-2">
                                <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                                <span>Real-time tracking (vs batch updates)</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                                <span>Physical + digital workflow automation</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                                <span>Purpose-built UX (vs EHR bolt-on)</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

// Section 3: Traction & Crown Jewels
function TractionCrownJewels() {
    const deployedHospitals = [
        { name: 'Baptist Health', hospitals: 18, beds: 4200, deployment: 'Full Platform', logo: '🏥' },
        { name: 'Cleveland Clinic', hospitals: 6, beds: 1800, deployment: 'Transfusion + Biomed', logo: '🏥' },
        { name: 'Memorial Regional', hospitals: 4, beds: 1100, deployment: 'Transfusion', logo: '🏥' },
    ]

    const tractionMetrics = [
        { label: 'Total Hospitals', value: '28', growth: '+12 QoQ' },
        { label: 'Total Hospital Beds', value: '7,100', growth: '+2,400 QoQ' },
        { label: 'ARR', value: '$3.2M', growth: '+85% YoY' },
        { label: 'Gross Margin', value: '78%', growth: '+5pts YoY' },
    ]

    const domainAdoption = [
        { domain: 'Transfusion Medicine', hospitals: 28, revenue: 45 },
        { domain: 'Biomedical Assets', hospitals: 18, revenue: 28 },
        { domain: 'Lab Medicine', hospitals: 12, revenue: 18 },
        { domain: 'Supply Chain', hospitals: 6, revenue: 9 },
    ]

    return (
        <div className="space-y-8 pb-24">
            {/* Traction Metrics */}
            <div className="grid grid-cols-4 gap-6">
                {tractionMetrics.map((metric) => (
                    <div key={metric.label} className="bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-400/30 rounded-2xl p-6 backdrop-blur-sm">
                        <div className="text-sm text-indigo-300 mb-2">{metric.label}</div>
                        <div className="text-4xl font-bold text-white mb-2">{metric.value}</div>
                        <div className="text-sm text-emerald-400 font-semibold">{metric.growth}</div>
                    </div>
                ))}
            </div>

            {/* Crown Jewels */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-6">
                    <Crown className="w-8 h-8 text-amber-400" />
                    <h2 className="text-2xl font-bold text-white">Crown Jewel Customers</h2>
                </div>
                <div className="space-y-4">
                    {deployedHospitals.map((hospital) => (
                        <div key={hospital.name} className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-400/30 rounded-xl p-6">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="text-5xl">{hospital.logo}</div>
                                    <div>
                                        <div className="text-xl font-bold text-white mb-1">{hospital.name}</div>
                                        <div className="text-sm text-gray-300">
                                            {hospital.hospitals} hospitals • {hospital.beds.toLocaleString()} beds • {hospital.deployment}
                                        </div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-3xl font-bold text-white mb-1">
                                        ${((hospital.hospitals * 84) / 1000).toFixed(1)}M
                                    </div>
                                    <div className="text-sm text-indigo-300">Annual Contract Value</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Domain Adoption */}
            <div className="grid grid-cols-2 gap-6">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
                    <h2 className="text-2xl font-bold text-white mb-6">Domain Adoption</h2>
                    <div className="space-y-4">
                        {domainAdoption.map((domain) => (
                            <div key={domain.domain} className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <span className="text-white font-medium">{domain.domain}</span>
                                    <span className="text-indigo-300">{domain.hospitals} hospitals</span>
                                </div>
                                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                    <div 
                                        className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-1000"
                                        style={{ width: `${(domain.hospitals / 28) * 100}%` }}
                                    />
                                </div>
                                <div className="text-xs text-gray-400">{domain.revenue}% of revenue</div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
                    <h2 className="text-2xl font-bold text-white mb-6">Pipeline & Momentum</h2>
                    <div className="space-y-4">
                        <div className="p-4 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-emerald-400/30 rounded-xl">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-emerald-200 font-semibold">Closed-Won (Q4 2024)</span>
                                <span className="text-2xl font-bold text-white">$1.2M</span>
                            </div>
                            <div className="text-xs text-gray-300">2 new health systems (8 hospitals)</div>
                        </div>
                        <div className="p-4 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 border border-blue-400/30 rounded-xl">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-blue-200 font-semibold">Active Pilots (Q1 2025)</span>
                                <span className="text-2xl font-bold text-white">$2.8M</span>
                            </div>
                            <div className="text-xs text-gray-300">5 health systems (14 hospitals) • 85% win rate</div>
                        </div>
                        <div className="p-4 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-400/30 rounded-xl">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-purple-200 font-semibold">Pipeline (Next 6mo)</span>
                                <span className="text-2xl font-bold text-white">$8.5M</span>
                            </div>
                            <div className="text-xs text-gray-300">12 opportunities • 18 hospitals • 40% probability-weighted</div>
                        </div>
                        <div className="p-4 bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-400/30 rounded-xl">
                            <div className="text-sm text-amber-200 mb-2">
                                <span className="font-semibold">Sales Cycle:</span> 4-6 months | <span className="font-semibold">CAC:</span> $450K | <span className="font-semibold">Win Rate:</span> 85%
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Customer Testimonials */}
            <div className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-400/30 rounded-2xl p-8 backdrop-blur-sm">
                <h2 className="text-2xl font-bold text-white mb-6">Customer Testimonials</h2>
                <div className="grid grid-cols-2 gap-6">
                    <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                        <div className="text-amber-400 mb-3">★★★★★</div>
                        <p className="text-gray-300 italic mb-4">
                            "PyCube reduced our blood product wastage from 6.2% to 2.1% in the first year. That's $4.2M in savings across our system."
                        </p>
                        <div className="text-sm text-indigo-300 font-semibold">Dr. Sarah Chen, Chief Medical Officer</div>
                        <div className="text-xs text-gray-400">Baptist Health System</div>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                        <div className="text-amber-400 mb-3">★★★★★</div>
                        <p className="text-gray-300 italic mb-4">
                            "The ROI was evident within 6 months. We're now tracking 5,005 assets with 75% utilization—used to be 45%."
                        </p>
                        <div className="text-sm text-indigo-300 font-semibold">Michael Torres, Director of Biomed</div>
                        <div className="text-xs text-gray-400">Cleveland Clinic</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

// Section 4: Roadmap & Vision
function RoadmapVision() {
    const roadmapPhases = [
        {
            phase: 'Q1-Q2 2025',
            title: 'Scale Core Domains',
            items: [
                'Expand to 50 hospitals (from 28)',
                'Launch predictive maintenance for biomed assets',
                'Real-time supply chain optimization',
                'Mobile apps for nurses and lab techs'
            ],
            investment: '$2M'
        },
        {
            phase: 'Q3-Q4 2025',
            title: 'AI-Powered Intelligence',
            items: [
                'Generative AI for workflow recommendations',
                'Predictive alerts (expiry, custody breaks, delays)',
                'Natural language query interface',
                'Automated root cause analysis'
            ],
            investment: '$3M'
        },
        {
            phase: '2026',
            title: 'Enterprise Platform',
            items: [
                'Multi-tenant SaaS infrastructure',
                'Enterprise security (SOC 2, HIPAA)',
                'API marketplace for integrations',
                'White-label options for health systems'
            ],
            investment: '$3M'
        },
    ]

    const futureVision = [
        { icon: Hospital, title: 'Digital Twin Hospital', description: 'Real-time simulation of hospital operations for capacity planning' },
        { icon: TestTube, title: 'Genomics Integration', description: 'Track biospecimens from collection to sequencing to storage' },
        { icon: Radio, title: 'IoT Ecosystem', description: 'Integrate medical devices, beds, wheelchairs, and environmental sensors' },
        { icon: Globe, title: 'Global Expansion', description: 'Launch in Europe and APAC markets by 2027' },
    ]

    return (
        <div className="space-y-8 pb-24">
            {/* Vision Statement */}
            <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-400/30 rounded-2xl p-8 backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-4">
                    <Sparkles className="w-10 h-10 text-purple-400" />
                    <h2 className="text-3xl font-bold text-white">Our Vision</h2>
                </div>
                <p className="text-xl text-gray-200 leading-relaxed">
                    Become the <span className="font-bold text-purple-300">operating system for hospital operations</span>—a unified intelligence layer that connects people, assets, and workflows across every domain. From transfusion medicine to supply chain, we're building the real-time nervous system for healthcare.
                </p>
            </div>

            {/* Product Roadmap */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
                <h2 className="text-2xl font-bold text-white mb-6">18-Month Product Roadmap</h2>
                <div className="space-y-6">
                    {roadmapPhases.map((phase, idx) => (
                        <div key={phase.phase} className="flex gap-6">
                            <div className="flex flex-col items-center">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold">
                                    {idx + 1}
                                </div>
                                {idx < roadmapPhases.length - 1 && (
                                    <div className="w-0.5 h-full bg-gradient-to-b from-indigo-500 to-purple-500 mt-2" />
                                )}
                            </div>
                            <div className="flex-1 pb-6">
                                <div className="flex items-center justify-between mb-2">
                                    <div>
                                        <div className="text-sm text-indigo-300 font-semibold">{phase.phase}</div>
                                        <div className="text-xl text-white font-bold">{phase.title}</div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-sm text-gray-400">Investment</div>
                                        <div className="text-xl text-emerald-400 font-bold">{phase.investment}</div>
                                    </div>
                                </div>
                                <ul className="space-y-2 mt-4">
                                    {phase.items.map((item) => (
                                        <li key={item} className="flex items-start gap-2 text-gray-300">
                                            <CheckCircle2 className="w-4 h-4 text-indigo-400 mt-0.5 shrink-0" />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Future Vision Cards */}
            <div className="grid grid-cols-2 gap-6">
                {futureVision.map((vision) => {
                    const Icon = vision.icon
                    return (
                        <div key={vision.title} className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-400/30 rounded-2xl p-6 backdrop-blur-sm">
                            <Icon className="w-10 h-10 text-indigo-400 mb-4" />
                            <h3 className="text-xl font-bold text-white mb-2">{vision.title}</h3>
                            <p className="text-gray-300">{vision.description}</p>
                        </div>
                    )
                })}
            </div>

            {/* Use of Funds */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
                <h2 className="text-2xl font-bold text-white mb-6">Use of Funds: $8M Series A</h2>
                <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-indigo-400/30 rounded-xl">
                            <div>
                                <div className="text-lg font-semibold text-white">Product & Engineering</div>
                                <div className="text-xs text-gray-300">AI team, mobile apps, enterprise platform</div>
                            </div>
                            <div className="text-right">
                                <div className="text-2xl font-bold text-white">$3.5M</div>
                                <div className="text-xs text-indigo-300">44%</div>
                            </div>
                        </div>
                        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-emerald-400/30 rounded-xl">
                            <div>
                                <div className="text-lg font-semibold text-white">Sales & Marketing</div>
                                <div className="text-xs text-gray-300">5 AEs, 2 SEs, demand gen, events</div>
                            </div>
                            <div className="text-right">
                                <div className="text-2xl font-bold text-white">$2.8M</div>
                                <div className="text-xs text-emerald-300">35%</div>
                            </div>
                        </div>
                        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 border border-blue-400/30 rounded-xl">
                            <div>
                                <div className="text-lg font-semibold text-white">Customer Success</div>
                                <div className="text-xs text-gray-300">CSMs, implementation specialists, support</div>
                            </div>
                            <div className="text-right">
                                <div className="text-2xl font-bold text-white">$1.2M</div>
                                <div className="text-xs text-blue-300">15%</div>
                            </div>
                        </div>
                        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-400/30 rounded-xl">
                            <div>
                                <div className="text-lg font-semibold text-white">Operations & G&A</div>
                                <div className="text-xs text-gray-300">Finance, HR, legal, facilities</div>
                            </div>
                            <div className="text-right">
                                <div className="text-2xl font-bold text-white">$500K</div>
                                <div className="text-xs text-purple-300">6%</div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-400/30 rounded-xl p-6">
                        <h3 className="text-xl font-bold text-white mb-4">Projected Outcomes (18 months)</h3>
                        <ul className="space-y-3">
                            <li className="flex items-center justify-between">
                                <span className="text-gray-300">ARR Growth</span>
                                <span className="text-xl font-bold text-white">$3.2M → $12M</span>
                            </li>
                            <li className="flex items-center justify-between">
                                <span className="text-gray-300">Hospital Count</span>
                                <span className="text-xl font-bold text-white">28 → 85</span>
                            </li>
                            <li className="flex items-center justify-between">
                                <span className="text-gray-300">Team Size</span>
                                <span className="text-xl font-bold text-white">18 → 42</span>
                            </li>
                            <li className="flex items-center justify-between">
                                <span className="text-gray-300">Burn Multiple</span>
                                <span className="text-xl font-bold text-emerald-400">1.2x</span>
                            </li>
                        </ul>
                        <div className="mt-6 p-4 bg-white/10 rounded-lg">
                            <div className="text-sm text-gray-300 mb-2">Runway Extension</div>
                            <div className="text-3xl font-bold text-white">24 months</div>
                            <div className="text-xs text-gray-400 mt-1">To Series B ($30M+ ARR)</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
