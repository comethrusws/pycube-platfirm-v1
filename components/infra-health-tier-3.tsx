'use client'

import { X, Battery, Signal, TrendingUp, Network, Server, Radio, MapPin, AlertTriangle, Zap, DollarSign, Clock, ArrowRight } from 'lucide-react'
import { BarChart, Bar, LineChart, Line, AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip as RechartsTooltip, Legend, CartesianGrid, Cell } from 'recharts'

interface InfraHealthTier3Props {
    category: string
    onClose: () => void
}

// Tag battery data
const tagBatteryData = [
    { range: '80-100%', count: 6612, color: '#10b981' },
    { range: '50-80%', count: 101, color: '#f59e0b' },
    { range: '20-50%', count: 17, color: '#f97316' },
    { range: '<20%', count: 4, color: '#ef4444' },
]

// Tags needing replacement
const replacementTags = [
    { tagId: 'TAG-2841', asset: 'Infusion Pump #42', location: 'ICU - Bed 8', battery: 18, lastSeen: '2 min ago' },
    { tagId: 'TAG-5123', asset: 'Wheelchair #15', location: 'Emergency Dept', battery: 22, lastSeen: '5 min ago' },
    { tagId: 'TAG-7892', asset: 'Ventilator #8', location: 'OR Wing - Room 3', battery: 15, lastSeen: '1 min ago' },
    { tagId: 'TAG-3456', asset: 'Monitor #24', location: 'Cardiology', battery: 19, lastSeen: '3 min ago' },
]

// Read rate by zone
const readRateByZone = [
    { zone: 'Main Hospital F1', readRate: 99.2, reads24h: 45230, missed: 362 },
    { zone: 'Main Hospital F2', readRate: 97.8, reads24h: 38942, missed: 878 },
    { zone: 'Main Hospital F3', readRate: 99.5, reads24h: 42108, missed: 211 },
    { zone: 'OR Wing', readRate: 99.8, reads24h: 28456, missed: 57 },
    { zone: 'Lab Building', readRate: 98.9, reads24h: 22183, missed: 247 },
    { zone: 'Emergency Dept', readRate: 95.2, reads24h: 31249, missed: 1572 },
]

// Data sync latency trend (24h)
const latencyTrend = [
    { time: '00:00', latency: 1.2 },
    { time: '04:00', latency: 1.1 },
    { time: '08:00', latency: 1.5 },
    { time: '12:00', latency: 1.8 },
    { time: '16:00', latency: 1.6 },
    { time: '20:00', latency: 1.3 },
]

// Network infrastructure health
const networkHealth = [
    { component: 'Core Switch', status: 'healthy', uptime: 99.99, traffic: '2.4 Gbps', errors: 0 },
    { component: 'Access Points (WiFi)', status: 'healthy', uptime: 99.8, coverage: '98%', devices: 245 },
    { component: 'IoT Gateway Network', status: 'healthy', uptime: 99.7, gateways: '54/55', packets: '1.2M/hr' },
    { component: 'Backup Link', status: 'healthy', uptime: 100, bandwidth: '1 Gbps', failover: 'Ready' },
]

// Server metrics
const serverMetrics = [
    { server: 'Asset DB Primary', cpu: 42, memory: 68, disk: 54, status: 'healthy' },
    { server: 'Asset DB Replica', cpu: 38, memory: 65, disk: 54, status: 'healthy' },
    { server: 'Real-time Processor', cpu: 58, memory: 72, disk: 48, status: 'healthy' },
    { server: 'API Gateway', cpu: 35, memory: 52, disk: 45, status: 'healthy' },
]

// Gateway detailed metrics
const gatewayMetrics = {
    zone: 'Emergency Department',
    gateways: [
        { id: 'GW-ED-01', status: 'offline', uptime: 0, coverage: 0, reads24h: 0, lastSeen: '2h ago' },
        { id: 'GW-ED-02', status: 'online', uptime: 100, coverage: 92, reads24h: 8234, lastSeen: 'now' },
        { id: 'GW-ED-03', status: 'online', uptime: 100, coverage: 88, reads24h: 7892, lastSeen: 'now' },
        { id: 'GW-ED-04', status: 'online', uptime: 100, coverage: 91, reads24h: 8456, lastSeen: 'now' },
        { id: 'GW-ED-05', status: 'online', uptime: 100, coverage: 89, reads24h: 6667, lastSeen: 'now' },
    ]
}

export function InfraHealthTier3({ category, onClose }: InfraHealthTier3Props) {
    const renderContent = () => {
        switch (category) {
            case 'tag-batteries':
                return (
                    <div className="space-y-6">
                        <div className="flex items-center gap-3">
                            <Battery className="w-6 h-6 text-amber-500" />
                            <h3 className="text-xl font-bold text-gray-900">RFID Tag Battery Status</h3>
                        </div>

                        {/* Summary */}
                        <div className="grid grid-cols-4 gap-4">
                            {tagBatteryData.map((range, idx) => (
                                <div key={idx} className="rounded-2xl p-4 border" style={{
                                    backgroundColor: `${range.color}10`,
                                    borderColor: `${range.color}30`
                                }}>
                                    <p className="text-xs font-semibold mb-2" style={{ color: range.color }}>
                                        {range.range} Battery
                                    </p>
                                    <p className="text-2xl font-semibold text-gray-900">{range.count}</p>
                                </div>
                            ))}
                        </div>

                        {/* Battery Distribution Chart */}
                        <div className="bg-white rounded-2xl p-6 border border-gray-100">
                            <h4 className="text-sm font-semibold text-gray-900 mb-4">Battery Level Distribution</h4>
                            <ResponsiveContainer width="100%" height={200}>
                                <BarChart data={tagBatteryData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                    <XAxis dataKey="range" stroke="#9ca3af" style={{ fontSize: '11px' }} />
                                    <YAxis stroke="#9ca3af" style={{ fontSize: '11px' }} />
                                    <RechartsTooltip />
                                    <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                                        {tagBatteryData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>

                        {/* Tags Needing Replacement */}
                        <div className="bg-white rounded-2xl p-6 border border-gray-100">
                            <h4 className="text-sm font-semibold text-gray-900 mb-4">Tags Requiring Immediate Replacement {'(<20%)'}</h4>
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-gray-100">
                                        <th className="text-left py-3 px-2 text-xs font-semibold text-gray-500 uppercase">Tag ID</th>
                                        <th className="text-left py-3 px-2 text-xs font-semibold text-gray-500 uppercase">Asset</th>
                                        <th className="text-left py-3 px-2 text-xs font-semibold text-gray-500 uppercase">Location</th>
                                        <th className="text-right py-3 px-2 text-xs font-semibold text-gray-500 uppercase">Battery</th>
                                        <th className="text-left py-3 px-2 text-xs font-semibold text-gray-500 uppercase">Last Seen</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {replacementTags.map((tag, idx) => (
                                        <tr key={idx} className="border-b border-gray-50 hover:bg-gray-50">
                                            <td className="py-3 px-2 text-sm font-mono text-gray-900">{tag.tagId}</td>
                                            <td className="py-3 px-2 text-sm text-gray-900">{tag.asset}</td>
                                            <td className="py-3 px-2 text-sm text-gray-600">{tag.location}</td>
                                            <td className="py-3 px-2 text-right">
                                                <span className="text-sm font-semibold text-red-600">{tag.battery}%</span>
                                            </td>
                                            <td className="py-3 px-2 text-sm text-gray-500">{tag.lastSeen}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Action Alert */}
                        <div className="bg-red-50 rounded-2xl p-5 border border-red-200">
                            <div className="flex items-start gap-3">
                                <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
                                <div>
                                    <h4 className="text-sm font-semibold text-red-900 mb-2">Immediate Action Required</h4>
                                    <p className="text-sm text-red-800">4 critical assets have tags below 20% battery. Schedule replacement to prevent tracking loss.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )

            case 'read-rate':
                return (
                    <div className="space-y-6">
                        <div className="flex items-center gap-3">
                            <Signal className="w-6 h-6 text-emerald-500" />
                            <h3 className="text-xl font-bold text-gray-900">RFID Read Success Rate by Zone</h3>
                        </div>

                        {/* Summary */}
                        <div className="grid grid-cols-3 gap-4">
                            <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-100">
                                <p className="text-xs font-semibold text-emerald-600 mb-2">Overall Success Rate</p>
                                <p className="text-2xl font-semibold text-gray-900">98.6%</p>
                            </div>
                            <div className="bg-blue-50 rounded-2xl p-4 border border-blue-100">
                                <p className="text-xs font-semibold text-blue-600 mb-2">Total Reads (24h)</p>
                                <p className="text-2xl font-semibold text-gray-900">208.1K</p>
                            </div>
                            <div className="bg-orange-50 rounded-2xl p-4 border border-orange-100">
                                <p className="text-xs font-semibold text-orange-600 mb-2">Missed Reads</p>
                                <p className="text-2xl font-semibold text-gray-900">3,327</p>
                            </div>
                        </div>

                        {/* Zone Performance Table */}
                        <div className="bg-white rounded-2xl p-6 border border-gray-100">
                            <h4 className="text-sm font-semibold text-gray-900 mb-4">Performance by Coverage Zone</h4>
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-gray-100">
                                        <th className="text-left py-3 px-2 text-xs font-semibold text-gray-500 uppercase">Zone</th>
                                        <th className="text-right py-3 px-2 text-xs font-semibold text-gray-500 uppercase">Read Rate</th>
                                        <th className="text-right py-3 px-2 text-xs font-semibold text-gray-500 uppercase">Successful (24h)</th>
                                        <th className="text-right py-3 px-2 text-xs font-semibold text-gray-500 uppercase">Missed</th>
                                        <th className="text-left py-3 px-2 text-xs font-semibold text-gray-500 uppercase">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {readRateByZone.map((zone, idx) => (
                                        <tr key={idx} className="border-b border-gray-50 hover:bg-gray-50">
                                            <td className="py-3 px-2 text-sm font-medium text-gray-900">{zone.zone}</td>
                                            <td className="py-3 px-2 text-right">
                                                <span className={`text-sm font-semibold ${zone.readRate >= 99 ? 'text-emerald-600' : zone.readRate >= 97 ? 'text-blue-600' : 'text-orange-600'}`}>
                                                    {zone.readRate}%
                                                </span>
                                            </td>
                                            <td className="py-3 px-2 text-right text-sm text-gray-600">{zone.reads24h.toLocaleString()}</td>
                                            <td className="py-3 px-2 text-right text-sm text-gray-600">{zone.missed}</td>
                                            <td className="py-3 px-2">
                                                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${zone.readRate >= 99 ? 'bg-emerald-50 text-emerald-700' :
                                                    zone.readRate >= 97 ? 'bg-blue-50 text-blue-700' :
                                                        'bg-orange-50 text-orange-700'
                                                    }`}>
                                                    <div className={`w-1.5 h-1.5 rounded-full ${zone.readRate >= 99 ? 'bg-emerald-500' :
                                                        zone.readRate >= 97 ? 'bg-blue-500' :
                                                            'bg-orange-500'
                                                        }`}></div>
                                                    {zone.readRate >= 99 ? 'Excellent' : zone.readRate >= 97 ? 'Good' : 'Review'}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Insight */}
                        <div className="bg-orange-50 rounded-2xl p-5 border border-orange-200">
                            <div className="flex items-start gap-3">
                                <MapPin className="w-5 h-5 text-orange-600 mt-0.5" />
                                <div>
                                    <h4 className="text-sm font-semibold text-orange-900 mb-2">Coverage Gap Detected</h4>
                                    <p className="text-sm text-orange-800">Emergency Dept has 95.2% read rate vs 98.6% target. One gateway (GW-ED-01) is offline. Dispatch technician.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )

            case 'data-latency':
                return (
                    <div className="space-y-6">
                        <div className="flex items-center gap-3">
                            <TrendingUp className="w-6 h-6 text-blue-500" />
                            <h3 className="text-xl font-bold text-gray-900">Data Synchronization Latency</h3>
                        </div>

                        {/* Summary */}
                        <div className="grid grid-cols-3 gap-4">
                            <div className="bg-blue-50 rounded-2xl p-4 border border-blue-100">
                                <p className="text-xs font-semibold text-blue-600 mb-2">Current Latency</p>
                                <p className="text-2xl font-semibold text-gray-900">1.4s</p>
                            </div>
                            <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-100">
                                <p className="text-xs font-semibold text-emerald-600 mb-2">Peak (24h)</p>
                                <p className="text-2xl font-semibold text-gray-900">1.8s</p>
                            </div>
                            <div className="bg-purple-50 rounded-2xl p-4 border border-purple-100">
                                <p className="text-xs font-semibold text-purple-600 mb-2">Average</p>
                                <p className="text-2xl font-semibold text-gray-900">1.4s</p>
                            </div>
                        </div>

                        {/* Latency Trend */}
                        <div className="bg-white rounded-2xl p-6 border border-gray-100">
                            <h4 className="text-sm font-semibold text-gray-900 mb-4">Latency Trend (24 hours)</h4>
                            <ResponsiveContainer width="100%" height={250}>
                                <LineChart data={latencyTrend}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                    <XAxis dataKey="time" stroke="#9ca3af" style={{ fontSize: '11px' }} />
                                    <YAxis stroke="#9ca3af" style={{ fontSize: '11px' }} domain={[0, 2.5]} />
                                    <RechartsTooltip formatter={(value: number) => `${value}s`} />
                                    <Line type="monotone" dataKey="latency" stroke="#3b82f6" strokeWidth={2} dot={{ fill: '#3b82f6', r: 4 }} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>

                        {/* Performance Note */}
                        <div className="bg-emerald-50 rounded-2xl p-5 border border-emerald-200">
                            <div className="flex items-start gap-3">
                                <Zap className="w-5 h-5 text-emerald-600 mt-0.5" />
                                <div>
                                    <h4 className="text-sm font-semibold text-emerald-900 mb-2">Performance: Excellent</h4>
                                    <p className="text-sm text-emerald-800">Data sync latency is well below 2s target. Real-time asset tracking operating optimally.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )

            case 'network-infra':
                return (
                    <div className="space-y-6">
                        <div className="flex items-center gap-3">
                            <Network className="w-6 h-6 text-purple-500" />
                            <h3 className="text-xl font-bold text-gray-900">Network Infrastructure Status</h3>
                        </div>

                        {/* Component Health */}
                        <div className="bg-white rounded-2xl p-6 border border-gray-100">
                            <h4 className="text-sm font-semibold text-gray-900 mb-4">Network Components</h4>
                            <div className="space-y-4">
                                {networkHealth.map((comp, idx) => (
                                    <div key={idx} className="p-4 bg-gray-50 rounded-xl">
                                        <div className="flex justify-between items-start mb-3">
                                            <div>
                                                <h5 className="text-sm font-semibold text-gray-900">{comp.component}</h5>
                                                <div className="flex items-center gap-4 mt-2 text-xs text-gray-600">
                                                    <span>Uptime: {comp.uptime}%</span>
                                                    {comp.traffic && <span>Traffic: {comp.traffic}</span>}
                                                    {comp.coverage && <span>Coverage: {comp.coverage}</span>}
                                                    {comp.gateways && <span>Gateways: {comp.gateways}</span>}
                                                </div>
                                            </div>
                                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700">
                                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                                                Healthy
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )

            case 'server-health':
                return (
                    <div className="space-y-6">
                        <div className="flex items-center gap-3">
                            <Server className="w-6 h-6 text-indigo-500" />
                            <h3 className="text-xl font-bold text-gray-900">Backend Server Health</h3>
                        </div>

                        {/* Server Metrics */}
                        <div className="bg-white rounded-2xl p-6 border border-gray-100">
                            <h4 className="text-sm font-semibold text-gray-900 mb-4">Server Resource Utilization</h4>
                            <div className="space-y-4">
                                {serverMetrics.map((server, idx) => (
                                    <div key={idx} className="p-4 bg-gray-50 rounded-xl">
                                        <div className="flex justify-between items-center mb-3">
                                            <h5 className="text-sm font-semibold text-gray-900">{server.server}</h5>
                                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700">
                                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                                                Healthy
                                            </span>
                                        </div>
                                        <div className="grid grid-cols-3 gap-4">
                                            <div>
                                                <div className="flex justify-between text-xs mb-1">
                                                    <span className="text-gray-500">CPU</span>
                                                    <span className="font-semibold text-gray-900">{server.cpu}%</span>
                                                </div>
                                                <div className="w-full bg-gray-200 rounded-full h-2">
                                                    <div className="h-2 rounded-full bg-blue-500" style={{ width: `${server.cpu}%` }}></div>
                                                </div>
                                            </div>
                                            <div>
                                                <div className="flex justify-between text-xs mb-1">
                                                    <span className="text-gray-500">Memory</span>
                                                    <span className="font-semibold text-gray-900">{server.memory}%</span>
                                                </div>
                                                <div className="w-full bg-gray-200 rounded-full h-2">
                                                    <div className="h-2 rounded-full bg-purple-500" style={{ width: `${server.memory}%` }}></div>
                                                </div>
                                            </div>
                                            <div>
                                                <div className="flex justify-between text-xs mb-1">
                                                    <span className="text-gray-500">Disk</span>
                                                    <span className="font-semibold text-gray-900">{server.disk}%</span>
                                                </div>
                                                <div className="w-full bg-gray-200 rounded-full h-2">
                                                    <div className="h-2 rounded-full bg-emerald-500" style={{ width: `${server.disk}%` }}></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )

            default:
                // Individual gateway drill-down
                if (category.startsWith('gateway-')) {
                    return (
                        <div className="space-y-6">
                            <div className="flex items-center gap-3">
                                <Radio className="w-6 h-6 text-emerald-500" />
                                <h3 className="text-xl font-bold text-gray-900">{gatewayMetrics.zone} - Gateway Details</h3>
                            </div>

                            {/* Gateway Status Table */}
                            <div className="bg-white rounded-2xl p-6 border border-gray-100">
                                <h4 className="text-sm font-semibold text-gray-900 mb-4">Individual Gateway Performance</h4>
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b border-gray-100">
                                            <th className="text-left py-3 px-2 text-xs font-semibold text-gray-500 uppercase">Gateway ID</th>
                                            <th className="text-left py-3 px-2 text-xs font-semibold text-gray-500 uppercase">Status</th>
                                            <th className="text-right py-3 px-2 text-xs font-semibold text-gray-500 uppercase">Uptime</th>
                                            <th className="text-right py-3 px-2 text-xs font-semibold text-gray-500 uppercase">Coverage</th>
                                            <th className="text-right py-3 px-2 text-xs font-semibold text-gray-500 uppercase">Reads (24h)</th>
                                            <th className="text-left py-3 px-2 text-xs font-semibold text-gray-500 uppercase">Last Seen</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {gatewayMetrics.gateways.map((gw, idx) => (
                                            <tr key={idx} className="border-b border-gray-50 hover:bg-gray-50">
                                                <td className="py-3 px-2 text-sm font-mono text-gray-900">{gw.id}</td>
                                                <td className="py-3 px-2">
                                                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${gw.status === 'online' ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'
                                                        }`}>
                                                        <div className={`w-1.5 h-1.5 rounded-full ${gw.status === 'online' ? 'bg-emerald-500' : 'bg-red-500'}`}></div>
                                                        {gw.status === 'online' ? 'Online' : 'Offline'}
                                                    </span>
                                                </td>
                                                <td className="py-3 px-2 text-right text-sm text-gray-600">{gw.uptime}%</td>
                                                <td className="py-3 px-2 text-right text-sm text-gray-600">{gw.coverage}%</td>
                                                <td className="py-3 px-2 text-right text-sm text-gray-600">{gw.reads24h.toLocaleString()}</td>
                                                <td className="py-3 px-2 text-sm text-gray-500">{gw.lastSeen}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Gateway Alert */}
                            <div className="bg-red-50 rounded-2xl p-5 border border-red-200">
                                <div className="flex items-start gap-3">
                                    <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
                                    <div>
                                        <h4 className="text-sm font-semibold text-red-900 mb-2">Gateway GW-ED-01 Offline</h4>
                                        <p className="text-sm text-red-800">Gateway has been offline for 2 hours. Coverage reduced to 80%. Dispatch technician immediately to restore full zone coverage.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
                return <div>No data available</div>
        }
    }

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-8 animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <h2 className="text-2xl font-bold text-gray-900">Infrastructure Health - Technical Details</h2>
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
