'use client'

type AlertSeverity = 'critical' | 'warning' | 'success'

interface Alert {
  id: number
  severity: AlertSeverity
  title: string
  message: string
}

const alerts: Alert[] = [
  // CRITICAL (Red) - 3 cards
  {
    id: 1,
    severity: 'critical',
    title: 'Equipment Maintenance Required',
    message: '28 high-risk OR/Lab devices need immediate attention. Preventive action recommended to avoid downtime.'
  },
  {
    id: 2,
    severity: 'critical',
    title: 'Blood Supply Alert',
    message: 'O-negative inventory critically low - 12 units remaining. Emergency procurement initiated.'
  },
  {
    id: 3,
    severity: 'critical',
    title: 'Sterilization Failure Detected',
    message: 'Autoclave malfunction in Central Supply - 47 surgical instrument sets affected. OR schedule impact expected.'
  },
  // WARNING (Orange) - 2 cards
  {
    id: 4,
    severity: 'warning',
    title: 'Inventory Expiration Alert',
    message: '24 RBC units approaching expiration within 48 hours. $540K waste prevention protocols activated.'
  },
  {
    id: 5,
    severity: 'warning',
    title: 'High Census Warning',
    message: 'ICU bed capacity at 89% - consider diversion planning for critical admits.'
  },
  // SUCCESS (Green) - 3 cards
  {
    id: 6,
    severity: 'success',
    title: 'Hospital Operating Normally',
    message: '$4.8M annualized savings identified. 23 optimization opportunities flagged across OR, Lab & Supply Chain.'
  },
  {
    id: 7,
    severity: 'success',
    title: 'Asset Optimization Complete',
    message: '312 underutilized assets successfully redeployed. $1.4M purchase request avoided through smart redistribution.'
  },
  {
    id: 8,
    severity: 'success',
    title: 'Quality Milestone Achieved',
    message: '98% specimen traceability across all departments. Zero custody breaks recorded in the past 30 days.'
  }
]

// Severity configuration with light hue backgrounds
const severityConfig = {
  critical: {
    bgColor: 'bg-red-50',
    dotColor: 'bg-red-500',
    borderColor: 'border-red-100'
  },
  warning: {
    bgColor: 'bg-orange-50',
    dotColor: 'bg-orange-500',
    borderColor: 'border-orange-100'
  },
  success: {
    bgColor: 'bg-green-50',
    dotColor: 'bg-green-500',
    borderColor: 'border-green-100'
  }
}

export function AISummaryBanner() {
  // Industry standard order: Red → Orange → Green
  const criticalAlerts = alerts.filter(a => a.severity === 'critical')
  const warningAlerts = alerts.filter(a => a.severity === 'warning')
  const successAlerts = alerts.filter(a => a.severity === 'success')

  return (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-8 py-6">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900">System Status Snapshot</h2>
          <p className="text-sm text-gray-500">Real-time overview of hospital operations</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Critical (Red) */}
          <div className="flex flex-col gap-6">
            {criticalAlerts.map((alert) => (
              <AlertCard key={alert.id} alert={alert} />
            ))}
          </div>

          {/* Middle Column: Warning (Orange) */}
          <div className="flex flex-col gap-6">
            {warningAlerts.map((alert) => (
              <AlertCard key={alert.id} alert={alert} />
            ))}
          </div>

          {/* Right Column: Success (Green) */}
          <div className="flex flex-col gap-6">
            {successAlerts.map((alert) => (
              <AlertCard key={alert.id} alert={alert} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function AlertCard({ alert }: { alert: Alert }) {
  const config = severityConfig[alert.severity]

  return (
    <div
      className={`flex items-start gap-4 p-4 rounded-xl border ${config.borderColor} ${config.bgColor} hover:shadow-md transition-all duration-200`}
    >
      {/* Status indicator dot */}
      <div className="flex-shrink-0 mt-1">
        <div className="flex h-8 w-8 rounded-full bg-white border border-gray-100 items-center justify-center shadow-sm">
          <div className={`h-3 w-3 rounded-full ${config.dotColor}`} />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-semibold text-gray-900 mb-2">
          {alert.title}
        </h3>
        <p className="text-sm text-gray-600 leading-relaxed">
          {alert.message}
        </p>
      </div>
    </div>
  )
}
