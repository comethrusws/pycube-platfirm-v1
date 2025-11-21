'use client'



const alerts = [
  {
    id: 1,
    status: 'normal',
    title: 'Hospital operating normally',
    message: '$4.8M annualized savings identified. 23 high-risk items require attention across OR, Lab & Supply Chain.',
    statusColor: 'bg-emerald-500'
  },
  {
    id: 2,
    status: 'critical',
    title: 'Critical: Equipment maintenance required',
    message: '28 high-risk OR/Lab devices need immediate attention. Preventive action recommended to avoid downtime.',
    statusColor: 'bg-red-500'
  },
  {
    id: 3,
    status: 'success',
    title: 'Optimization complete',
    message: '312 underutilized assets successfully redeployed. $1.4M purchase request avoided through smart redistribution.',
    statusColor: 'bg-emerald-500'
  },
  {
    id: 4,
    status: 'info',
    title: 'Specimen tracking update',
    message: '92% traceability achieved across all departments. Zero custody breaks recorded in the past 24 hours.',
    statusColor: 'bg-emerald-500'
  },
  {
    id: 5,
    status: 'warning',
    title: 'Inventory alert',
    message: '24 RBC units approaching expiration within 48 hours. $540K waste prevention protocols activated.',
    statusColor: 'bg-yellow-500'
  }
]

export function AISummaryBanner() {
  return (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-8 py-6">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900">System Status Snapshot</h2>
          <p className="text-sm text-gray-500">Real-time overview of hospital operations</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className="flex items-start gap-4 p-4 rounded-xl border border-gray-100 bg-gray-50/50 hover:bg-white hover:shadow-md transition-all duration-200"
            >
              {/* Status indicator dot */}
              <div className="flex-shrink-0 mt-1">
                <div className="flex h-8 w-8 rounded-full bg-white border border-gray-100 items-center justify-center shadow-sm">
                  <div className={`h-3 w-3 rounded-full ${alert.statusColor}`} />
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-semibold text-gray-900">
                    {alert.title}
                  </h3>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {alert.message}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
