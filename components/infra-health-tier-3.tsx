'use client'

import { X, Server, HardDrive, Cpu, Network, Database, Shield, AlertTriangle, TrendingUp, TrendingDown } from 'lucide-react'
import { BarChart, Bar, LineChart, Line, AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip as RechartsTooltip, Legend, CartesianGrid } from 'recharts'

interface InfraHealthTier3Props {
    category: string
    onClose: () => void
}

// Storage capacity data by pool
const storageData = [
    { pool: 'PACS Archive', total: 500, used: 425, growth: 12 },
    { pool: 'EMR Database', total: 200, used: 142, growth: 8 },
    { pool: 'Backup Storage', total: 800, used: 520, growth: 15 },
    { pool: 'File Shares', total: 150, used: 89, growth: 5 },
    { pool: 'Test/Dev', total: 100, used: 34, growth: 2 }
]

// Compute utilization by cluster
const computeData = [
    { cluster: 'Production VMs', cpu: 62, memory: 58, vms: 142, idle: 12 },
    { cluster: 'Database Cluster', cpu: 78, memory: 85, vms: 24, idle: 2 },
    { cluster: 'Application Tier', cpu: 45, memory: 52, vms: 86, idle: 18 },
    { cluster: 'Test/Dev', cpu: 28, memory: 31, vms: 54, idle: 28 }
]

// Network performance data (24h)
const networkData = [
    { time: '00:00', throughput: 2.4, jitter: 2.1, packetLoss: 0.02 },
    { time: '04:00', throughput: 1.8, jitter: 1.8, packetLoss: 0.01 },
    { time: '08:00', throughput: 4.2, jitter: 2.8, packetLoss: 0.03 },
    { time: '12:00', throughput: 5.8, jitter: 3.2, packetLoss: 0.04 },
    { time: '16:00', throughput: 5.2, jitter: 2.9, packetLoss: 0.03 },
    { time: '20:00', throughput: 3.5, jitter: 2.3, packetLoss: 0.02 },
]

// Backup job status
const backupData = [
    { job: 'EMR Full Backup', status: 'success', duration: 142, size: 285, lastRun: '2h ago' },
    { job: 'PACS Incremental', status: 'success', duration: 68, size: 512, lastRun: '4h ago' },
    { job: 'Database Archive', status: 'warning', duration: 195, size: 148, lastRun: '6h ago' },
    { job: 'File Server Sync', status: 'success', duration: 45, size: 95, lastRun: '1h ago' },
    { job: 'DR Site Replication', status: 'success', duration: 224, size: 1024, lastRun: '3h ago' }
]

// Patch compliance by asset type
const patchData = [
    { type: 'Windows Servers', total: 245, patched: 218, pending: 27, overdue: 8 },
    { type: 'Linux Servers', total: 128, patched: 115, pending: 13, overdue: 5 },
    { type: 'Network Devices', total: 86, patched: 68, pending: 18, overdue: 12 },
    { type: 'Medical Devices', total: 142, patched: 98, pending: 44, overdue: 22 },
]

// EMR System detailed metrics
const emrMetrics = {
    cpu: [
        { node: 'Node 1', usage: 58, peak: 72 },
        { node: 'Node 2', usage: 62, peak: 78 },
        { node: 'Node 3', usage: 54, peak: 68 },
        { node: 'Node 4', usage: 48, peak: 61 }
    ],
    memory: [
        { time: '00:00', usage: 62 },
        { time: '04:00', usage: 58 },
        { time: '08:00', usage: 74 },
        { time: '12:00', usage: 82 },
        { time: '16:00', usage: 78 },
        { time: '20:00', usage: 68 }
    ],
    errors: [
        { service: 'API Gateway', count: 24, type: 'Timeout' },
        { service: 'Auth Service', count: 12, type: 'Failed Login' },
        { service: 'Reports Engine', count: 8, type: 'Memory Leak' },
        { service: 'Background Jobs', count: 5, type: 'Connection' }
    ]
}

export function InfraHealthTier3({ category, onClose }: InfraHealthTier3Props) {
    const renderContent = () => {
        switch (category) {
            case 'capacity':
                return (
                    <div className="space-y-6">
                        <div className="flex items-center gap-3">
                            <HardDrive className="w-6 h-6 text-purple-500" />
                            <h3 className="text-xl font-bold text-gray-900">Storage Capacity Analysis</h3>
                        </div>

                        {/* Storage Overview Cards */}
                        <div className="grid grid-cols-4 gap-4">
                            <div className="bg-purple-50 rounded-2xl p-4 border border-purple-100">
                                <p className="text-xs font-semibold text-purple-600 mb-2">Total Capacity</p>
                                <p className="text-2xl font-bold text-gray-900">1.75 PB</p>
                            </div>
                            <div className="bg-orange-50 rounded-2xl p-4 border border-orange-100">
                                <p className="text-xs font-semibold text-orange-600 mb-2">Used Storage</p>
                                <p className="text-2xl font-bold text-gray-900">1.19 PB</p>
                            </div>
                            <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-100">
                                <p className="text-xs font-semibold text-emerald-600 mb-2">Available</p>
                                <p className="text-2xl font-bold text-gray-900">560 TB</p>
                            </div>
                            <div className="bg-amber-50 rounded-2xl p-4 border border-amber-100">
                                <p className="text-xs font-semibold text-amber-600 mb-2">Growth Rate</p>
                                <p className="text-2xl font-bold text-gray-900">8.4 TB/mo</p>
                            </div>
                        </div>

                        {/* Storage Pools Table */}
                        <div className="bg-white rounded-2xl p-6 border border-gray-100">
                            <h4 className="text-sm font-semibold text-gray-900 mb-4">Storage Pool Details</h4>
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-gray-100">
                                        <th className="text-left py-3 px-2 text-xs font-semibold text-gray-500 uppercase">Pool Name</th>
                                        <th className="text-right py-3 px-2 text-xs font-semibold text-gray-500 uppercase">Total (TB)</th>
                                        <th className="text-right py-3 px-2 text-xs font-semibold text-gray-500 uppercase">Used (TB)</th>
                                        <th className="text-right py-3 px-2 text-xs font-semibold text-gray-500 uppercase">Utilization</th>
                                        <th className="text-right py-3 px-2 text-xs font-semibold text-gray-500 uppercase">Growth/mo</th>
                                        <th className="text-left py-3 px-2 text-xs font-semibold text-gray-500 uppercase">Forecast Full</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {storageData.map((pool, idx) => {
                                        const utilization = (pool.used / pool.total) * 100
                                        const monthsToFull = Math.floor((pool.total - pool.used) / pool.growth)
                                        return (
                                            <tr key={idx} className="border-b border-gray-50 hover:bg-gray-50">
                                                <td className="py-3 px-2 text-sm font-medium text-gray-900">{pool.pool}</td>
                                                <td className="py-3 px-2 text-right text-sm text-gray-600">{pool.total}</td>
                                                <td className="py-3 px-2 text-right text-sm text-gray-600">{pool.used}</td>
                                                <td className="py-3 px-2 text-right">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <div className="w-16 bg-gray-100 rounded-full h-2">
                                                            <div
                                                                className={`h-2 rounded-full ${utilization > 85 ? 'bg-red-500' : utilization > 70 ? 'bg-orange-500' : 'bg-emerald-500'}`}
                                                                style={{ width: `${utilization}%` }}
                                                            ></div>
                                                        </div>
                                                        <span className={`text-sm font-semibold ${utilization > 85 ? 'text-red-600' : utilization > 70 ? 'text-orange-600' : 'text-emerald-600'}`}>
                                                            {utilization.toFixed(1)}%
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="py-3 px-2 text-right text-sm text-gray-600">{pool.growth} TB</td>
                                                <td className="py-3 px-2 text-sm text-gray-600">
                                                    {monthsToFull > 12 ? '> 12 months' : `${monthsToFull} months`}
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )

            case 'compute':
                return (
                    <div className="space-y-6">
                        <div className="flex items-center gap-3">
                            <Cpu className="w-6 h-6 text-blue-500" />
                            <h3 className="text-xl font-bold text-gray-900">Compute Resource Analysis</h3>
                        </div>

                        {/* Compute Overview */}
                        <div className="grid grid-cols-4 gap-4">
                            <div className="bg-blue-50 rounded-2xl p-4 border border-blue-100">
                                <p className="text-xs font-semibold text-blue-600 mb-2">Total VMs</p>
                                <p className="text-2xl font-bold text-gray-900">306</p>
                            </div>
                            <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-100">
                                <p className="text-xs font-semibold text-emerald-600 mb-2">Active</p>
                                <p className="text-2xl font-bold text-gray-900">246</p>
                            </div>
                            <div className="bg-orange-50 rounded-2xl p-4 border border-orange-100">
                                <p className="text-xs font-semibold text-orange-600 mb-2">Idle/Unutilized</p>
                                <p className="text-2xl font-bold text-gray-900">60</p>
                            </div>
                            <div className="bg-purple-50 rounded-2xl p-4 border border-purple-100">
                                <p className="text-xs font-semibold text-purple-600 mb-2">Avg CPU Usage</p>
                                <p className="text-2xl font-bold text-gray-900">54%</p>
                            </div>
                        </div>

                        {/* Cluster Details */}
                        <div className="bg-white rounded-2xl p-6 border border-gray-100">
                            <h4 className="text-sm font-semibold text-gray-900 mb-4">Cluster Utilization</h4>
                            <div className="space-y-4">
                                {computeData.map((cluster, idx) => (
                                    <div key={idx} className="p-4 bg-gray-50 rounded-xl">
                                        <div className="flex justify-between items-center mb-3">
                                            <h5 className="text-sm font-semibold text-gray-900">{cluster.cluster}</h5>
                                            <div className="flex items-center gap-4 text-xs text-gray-500">
                                                <span>{cluster.vms} VMs</span>
                                                <span className="text-orange-600 font-medium">{cluster.idle} idle</span>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <div className="flex justify-between text-xs mb-1">
                                                    <span className="text-gray-500">CPU Usage</span>
                                                    <span className={`font-semibold ${cluster.cpu > 70 ? 'text-orange-600' : 'text-emerald-600'}`}>{cluster.cpu}%</span>
                                                </div>
                                                <div className="w-full bg-gray-200 rounded-full h-2">
                                                    <div
                                                        className={`h-2 rounded-full ${cluster.cpu > 70 ? 'bg-orange-500' : 'bg-blue-500'}`}
                                                        style={{ width: `${cluster.cpu}%` }}
                                                    ></div>
                                                </div>
                                            </div>
                                            <div>
                                                <div className="flex justify-between text-xs mb-1">
                                                    <span className="text-gray-500">Memory Usage</span>
                                                    <span className={`font-semibold ${cluster.memory > 80 ? 'text-red-600' : cluster.memory > 70 ? 'text-orange-600' : 'text-emerald-600'}`}>{cluster.memory}%</span>
                                                </div>
                                                <div className="w-full bg-gray-200 rounded-full h-2">
                                                    <div
                                                        className={`h-2 rounded-full ${cluster.memory > 80 ? 'bg-red-500' : cluster.memory > 70 ? 'bg-orange-500' : 'bg-emerald-500'}`}
                                                        style={{ width: `${cluster.memory}%` }}
                                                    ></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Optimization Opportunities */}
                        <div className="bg-amber-50 rounded-2xl p-5 border border-amber-200">
                            <div className="flex items-start gap-3">
                                <TrendingDown className="w-5 h-5 text-amber-600 mt-0.5" />
                                <div>
                                    <h4 className="text-sm font-semibold text-amber-900 mb-2">Cost Optimization Opportunity</h4>
                                    <p className="text-sm text-amber-800">60 idle VMs detected. Right-sizing or decommissioning could save $42,000/month in compute costs.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )

            case 'network':
                return (
                    <div className="space-y-6">
                        <div className="flex items-center gap-3">
                            <Network className="w-6 h-6 text-emerald-500" />
                            <h3 className="text-xl font-bold text-gray-900">Network Performance Metrics</h3>
                        </div>

                        {/* Network Stats */}
                        <div className="grid grid-cols-4 gap-4">
                            <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-100">
                                <p className="text-xs font-semibold text-emerald-600 mb-2">Uptime</p>
                                <p className="text-2xl font-bold text-gray-900">99.92%</p>
                            </div>
                            <div className="bg-blue-50 rounded-2xl p-4 border border-blue-100">
                                <p className="text-xs font-semibold text-blue-600 mb-2">Avg Throughput</p>
                                <p className="text-2xl font-bold text-gray-900">3.8 Gbps</p>
                            </div>
                            <div className="bg-amber-50 rounded-2xl p-4 border border-amber-100">
                                <p className="text-xs font-semibold text-amber-600 mb-2">Avg Jitter</p>
                                <p className="text-2xl font-bold text-gray-900">2.5 ms</p>
                            </div>
                            <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-100">
                                <p className="text-xs font-semibold text-emerald-600 mb-2">Packet Loss</p>
                                <p className="text-2xl font-bold text-gray-900">0.025%</p>
                            </div>
                        </div>

                        {/* Network Charts */}
                        <div className="grid grid-cols-2 gap-6">
                            <div className="bg-white rounded-2xl p-6 border border-gray-100">
                                <h4 className="text-sm font-semibold text-gray-900 mb-4">Throughput (24h)</h4>
                                <ResponsiveContainer width="100%" height={200}>
                                    <AreaChart data={networkData}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                        <XAxis dataKey="time" stroke="#9ca3af" style={{ fontSize: '11px' }} />
                                        <YAxis stroke="#9ca3af" style={{ fontSize: '11px' }} />
                                        <RechartsTooltip />
                                        <Area type="monotone" dataKey="throughput" stroke="#10b981" fill="#10b98120" strokeWidth={2} />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>

                            <div className="bg-white rounded-2xl p-6 border border-gray-100">
                                <h4 className="text-sm font-semibold text-gray-900 mb-4">Jitter & Packet Loss</h4>
                                <ResponsiveContainer width="100%" height={200}>
                                    <LineChart data={networkData}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                        <XAxis dataKey="time" stroke="#9ca3af" style={{ fontSize: '11px' }} />
                                        <YAxis stroke="#9ca3af" style={{ fontSize: '11px' }} />
                                        <RechartsTooltip />
                                        <Legend iconType="circle" wrapperStyle={{ fontSize: '11px' }} />
                                        <Line type="monotone" dataKey="jitter" stroke="#f59e0b" strokeWidth={2} name="Jitter (ms)" />
                                        <Line type="monotone" dataKey="packetLoss" stroke="#ef4444" strokeWidth={2} name="Loss (%)" />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* Network Health Alert */}
                        <div className="bg-emerald-50 rounded-2xl p-5 border border-emerald-200">
                            <div className="flex items-start gap-3">
                                <TrendingUp className="w-5 h-5 text-emerald-600 mt-0.5" />
                                <div>
                                    <h4 className="text-sm font-semibold text-emerald-900 mb-2">Network Status: Excellent</h4>
                                    <p className="text-sm text-emerald-800">All network metrics within acceptable thresholds. No congestion or bottlenecks detected.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )

            case 'backup':
                return (
                    <div className="space-y-6">
                        <div className="flex items-center gap-3">
                            <Database className="w-6 h-6 text-amber-500" />
                            <h3 className="text-xl font-bold text-gray-900">Backup & DR Status</h3>
                        </div>

                        {/* Backup Stats */}
                        <div className="grid grid-cols-4 gap-4">
                            <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-100">
                                <p className="text-xs font-semibold text-emerald-600 mb-2">Success Rate</p>
                                <p className="text-2xl font-bold text-gray-900">98.2%</p>
                            </div>
                            <div className="bg-blue-50 rounded-2xl p-4 border border-blue-100">
                                <p className="text-xs font-semibold text-blue-600 mb-2">Total Jobs</p>
                                <p className="text-2xl font-bold text-gray-900">5</p>
                            </div>
                            <div className="bg-amber-50 rounded-2xl p-4 border border-amber-100">
                                <p className="text-xs font-semibold text-amber-600 mb-2">Data Protected</p>
                                <p className="text-2xl font-bold text-gray-900">2.06 TB</p>
                            </div>
                            <div className="bg-purple-50 rounded-2xl p-4 border border-purple-100">
                                <p className="text-xs font-semibold text-purple-600 mb-2">Avg Duration</p>
                                <p className="text-2xl font-bold text-gray-900">135 min</p>
                            </div>
                        </div>

                        {/* Backup Jobs Table */}
                        <div className="bg-white rounded-2xl p-6 border border-gray-100">
                            <h4 className="text-sm font-semibold text-gray-900 mb-4">Recent Backup Jobs</h4>
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-gray-100">
                                        <th className="text-left py-3 px-2 text-xs font-semibold text-gray-500 uppercase">Job Name</th>
                                        <th className="text-left py-3 px-2 text-xs font-semibold text-gray-500 uppercase">Status</th>
                                        <th className="text-right py-3 px-2 text-xs font-semibold text-gray-500 uppercase">Duration</th>
                                        <th className="text-right py-3 px-2 text-xs font-semibold text-gray-500 uppercase">Size (GB)</th>
                                        <th className="text-right py-3 px-2 text-xs font-semibold text-gray-500 uppercase">Last Run</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {backupData.map((job, idx) => (
                                        <tr key={idx} className="border-b border-gray-50 hover:bg-gray-50">
                                            <td className="py-3 px-2 text-sm font-medium text-gray-900">{job.job}</td>
                                            <td className="py-3 px-2">
                                                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${job.status === 'success'
                                                        ? 'bg-emerald-50 text-emerald-700'
                                                        : 'bg-orange-50 text-orange-700'
                                                    }`}>
                                                    <div className={`w-1.5 h-1.5 rounded-full ${job.status === 'success' ? 'bg-emerald-500' : 'bg-orange-500'
                                                        }`}></div>
                                                    {job.status === 'success' ? 'Success' : 'Warning'}
                                                </span>
                                            </td>
                                            <td className="py-3 px-2 text-right text-sm text-gray-600">{job.duration} min</td>
                                            <td className="py-3 px-2 text-right text-sm text-gray-600">{job.size} GB</td>
                                            <td className="py-3 px-2 text-right text-sm text-gray-500">{job.lastRun}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )

            case 'patching':
                return (
                    <div className="space-y-6">
                        <div className="flex items-center gap-3">
                            <Shield className="w-6 h-6 text-orange-500" />
                            <h3 className="text-xl font-bold text-gray-900">Patch Compliance Status</h3>
                        </div>

                        {/* Patch Stats */}
                        <div className="grid grid-cols-4 gap-4">
                            <div className="bg-blue-50 rounded-2xl p-4 border border-blue-100">
                                <p className="text-xs font-semibold text-blue-600 mb-2">Total Assets</p>
                                <p className="text-2xl font-bold text-gray-900">601</p>
                            </div>
                            <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-100">
                                <p className="text-xs font-semibold text-emerald-600 mb-2">Fully Patched</p>
                                <p className="text-2xl font-bold text-gray-900">499</p>
                            </div>
                            <div className="bg-orange-50 rounded-2xl p-4 border border-orange-100">
                                <p className="text-xs font-semibold text-orange-600 mb-2">Pending</p>
                                <p className="text-2xl font-bold text-gray-900">102</p>
                            </div>
                            <div className="bg-red-50 rounded-2xl p-4 border border-red-100">
                                <p className="text-xs font-semibold text-red-600 mb-2">Overdue</p>
                                <p className="text-2xl font-bold text-gray-900">47</p>
                            </div>
                        </div>

                        {/* Patch Compliance by Asset Type */}
                        <div className="bg-white rounded-2xl p-6 border border-gray-100">
                            <h4 className="text-sm font-semibold text-gray-900 mb-4">Compliance by Asset Type</h4>
                            <div className="space-y-4">
                                {patchData.map((asset, idx) => {
                                    const compliance = (asset.patched / asset.total) * 100
                                    return (
                                        <div key={idx} className="p-4 bg-gray-50 rounded-xl">
                                            <div className="flex justify-between items-center mb-3">
                                                <h5 className="text-sm font-semibold text-gray-900">{asset.type}</h5>
                                                <div className="flex items-center gap-4 text-xs">
                                                    <span className="text-gray-500">{asset.total} assets</span>
                                                    <span className={`font-semibold ${compliance >= 90 ? 'text-emerald-600' : compliance >= 75 ? 'text-orange-600' : 'text-red-600'}`}>
                                                        {compliance.toFixed(1)}% compliant
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-3 gap-2 mb-2">
                                                <div className="text-center">
                                                    <p className="text-xs text-gray-500">Patched</p>
                                                    <p className="text-lg font-bold text-emerald-600">{asset.patched}</p>
                                                </div>
                                                <div className="text-center">
                                                    <p className="text-xs text-gray-500">Pending</p>
                                                    <p className="text-lg font-bold text-orange-600">{asset.pending}</p>
                                                </div>
                                                <div className="text-center">
                                                    <p className="text-xs text-gray-500">Overdue</p>
                                                    <p className="text-lg font-bold text-red-600">{asset.overdue}</p>
                                                </div>
                                            </div>
                                            <div className="w-full bg-gray-200 rounded-full h-2">
                                                <div
                                                    className={`h-2 rounded-full ${compliance >= 90 ? 'bg-emerald-500' : compliance >= 75 ? 'bg-orange-500' : 'bg-red-500'}`}
                                                    style={{ width: `${compliance}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>

                        {/* Critical Alert */}
                        <div className="bg-red-50 rounded-2xl p-5 border border-red-200">
                            <div className="flex items-start gap-3">
                                <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
                                <div>
                                    <h4 className="text-sm font-semibold text-red-900 mb-2">Critical Patching Required</h4>
                                    <p className="text-sm text-red-800">47 assets are overdue for critical security patches. Medical devices showing lowest compliance at 69%. Immediate action recommended.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )

            // System-specific views (EMR, LIS, PACS, etc.)
            case 'emr':
            case 'lis':
            case 'pacs':
            case 'his':
                const systemName = category.toUpperCase()
                return (
                    <div className="space-y-6">
                        <div className="flex items-center gap-3">
                            <Server className="w-6 h-6 text-blue-500" />
                            <h3 className="text-xl font-bold text-gray-900">{systemName} System Deep Dive</h3>
                        </div>

                        {/* CPU Usage by Node */}
                        <div className="bg-white rounded-2xl p-6 border border-gray-100">
                            <h4 className="text-sm font-semibold text-gray-900 mb-4">CPU Usage by Node</h4>
                            <ResponsiveContainer width="100%" height={200}>
                                <BarChart data={emrMetrics.cpu}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                    <XAxis dataKey="node" stroke="#9ca3af" style={{ fontSize: '11px' }} />
                                    <YAxis stroke="#9ca3af" style={{ fontSize: '11px' }} />
                                    <RechartsTooltip />
                                    <Legend iconType="square" wrapperStyle={{ fontSize: '11px' }} />
                                    <Bar dataKey="usage" fill="#3b82f6" name="Current" radius={[4, 4, 0, 0]} />
                                    <Bar dataKey="peak" fill="#cbd5e1" name="Peak (24h)" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>

                        {/* Memory Trend */}
                        <div className="bg-white rounded-2xl p-6 border border-gray-100">
                            <h4 className="text-sm font-semibold text-gray-900 mb-4">Memory Usage Trend (24h)</h4>
                            <ResponsiveContainer width="100%" height={200}>
                                <AreaChart data={emrMetrics.memory}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                    <XAxis dataKey="time" stroke="#9ca3af" style={{ fontSize: '11px' }} />
                                    <YAxis stroke="#9ca3af" style={{ fontSize: '11px' }} />
                                    <RechartsTooltip />
                                    <Area type="monotone" dataKey="usage" stroke="#8b5cf6" fill="#8b5cf620" strokeWidth={2} />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>

                        {/* Error Summary */}
                        <div className="bg-white rounded-2xl p-6 border border-gray-100">
                            <h4 className="text-sm font-semibold text-gray-900 mb-4">Service Errors (24h)</h4>
                            <div className="space-y-3">
                                {emrMetrics.errors.map((error, idx) => (
                                    <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">{error.service}</p>
                                            <p className="text-xs text-gray-500">{error.type}</p>
                                        </div>
                                        <span className={`text-lg font-bold ${error.count > 20 ? 'text-red-600' : error.count > 10 ? 'text-orange-600' : 'text-gray-900'}`}>
                                            {error.count}
                                        </span>
                                    </div>
                                ))}
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
                    <h2 className="text-2xl font-bold text-gray-900">Infrastructure Health - Technical Analysis</h2>
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
