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
    title: 'Critical Equipment Failures',
    message: '12 OR ventilators offline - immediate replacement required. CT scanner malfunction in radiology - 18 appointments canceled. Blood bank refrigeration system failure - $240K inventory at risk.'
  },
  {
    id: 2,
    severity: 'critical',
    title: 'Patient Safety Alerts',
    message: '3 medication dispensing errors detected in last 4 hours. Surgical instrument sterilization cycle failed - OR 4 & 5 affected. Emergency generator test failure - backup power compromised.'
  },
  {
    id: 3,
    severity: 'critical',
    title: 'Compliance Violations',
    message: '47 expired pharmaceuticals found in ICU storage. Missing documentation for 23 hazardous waste disposals. Overdue fire safety inspection - 14 days past deadline.'
  },
  // WARNING (Orange) - 2 cards
  {
    id: 4,
    severity: 'warning',
    title: 'Supply Chain Disruptions',
    message: '24 RBC units expiring within 48 hours - $540K waste risk. Critical PPE inventory below 7-day threshold.'
  },
  {
    id: 5,
    severity: 'warning',
    title: 'Capacity Constraints',
    message: 'ICU at 94% capacity - diversion protocols may activate. Lab processing times 40% above benchmark.'
  },
  // SUCCESS (Green) - 3 cards
  {
    id: 6,
    severity: 'success',
    title: 'Asset Optimization Achieved',
    message: '312 underutilized assets redeployed - $1.4M in avoided purchases. OR utilization increased to 87% through smart scheduling. Equipment sharing protocol saved $680K in duplicate orders.'
  },
  {
    id: 7,
    severity: 'success',
    title: 'Quality Metrics Improved',
    message: 'Specimen traceability at 98% - zero custody breaks in 30 days. Surgical site infection rate decreased by 22% this quarter. Patient satisfaction scores increased to 4.7/5.0.'
  },
  {
    id: 8,
    severity: 'success',
    title: 'Cost Savings Identified',
    message: '$4.8M in annualized savings from supply chain optimization. Energy consumption reduced by 18% through smart HVAC controls. Lab reagent waste decreased by 31% via AI-driven inventory management.'
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
