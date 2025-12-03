'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

type AlertSeverity = 'critical' | 'warning' | 'success'

interface Alert {
  id: number
  severity: AlertSeverity
  title: string
  metric: string
  message: string
  href?: string
}

const alerts: Alert[] = [
  // CRITICAL (Red) - 3 cards
  {
    id: 1,
    severity: 'critical',
    title: 'Equipment Maintenance',
    metric: '28 Devices',
    message: 'High-risk OR/Lab devices need immediate attention.',
    href: '/maintenance'
  },
  {
    id: 2,
    severity: 'critical',
    title: 'Blood Supply Alert',
    metric: '12 Units',
    message: 'O-negative inventory critically low. Emergency procurement initiated.'
  },
  {
    id: 3,
    severity: 'critical',
    title: 'Sterilization Failure',
    metric: '47 Sets',
    message: 'Autoclave malfunction in Central Supply affecting surgical sets.'
  },
  // WARNING (Orange) - 2 cards
  {
    id: 4,
    severity: 'warning',
    title: 'Inventory Expiration',
    metric: '24 Units',
    message: 'RBC units approaching expiration within 48 hours.'
  },
  {
    id: 5,
    severity: 'warning',
    title: 'High Census Warning',
    metric: '89% Capacity',
    message: 'ICU bed capacity high - consider diversion planning.'
  },
  // SUCCESS (Green) - 3 cards
  {
    id: 6,
    severity: 'success',
    title: 'Hospital Operations',
    metric: '$4.8M Savings',
    message: 'Annualized savings identified across OR, Lab & Supply Chain.',
    href: '/financial-overview'
  },
  {
    id: 7,
    severity: 'success',
    title: 'Asset Optimization',
    metric: '312 Assets',
    message: 'Underutilized assets successfully redeployed.'
  },
  {
    id: 8,
    severity: 'success',
    title: 'Quality Milestone',
    metric: '98% Traceability',
    message: 'Specimen traceability across all departments.'
  }
]

// Severity configuration
const severityConfig = {
  critical: {
    bgColor: 'bg-red-50',
    dotColor: 'bg-red-500',
    borderColor: 'border-red-100',
    textColor: 'text-red-700',
    metricColor: 'text-red-600',
    hoverBorder: 'hover:border-red-200'
  },
  warning: {
    bgColor: 'bg-orange-50',
    dotColor: 'bg-orange-500',
    borderColor: 'border-orange-100',
    textColor: 'text-orange-700',
    metricColor: 'text-orange-600',
    hoverBorder: 'hover:border-orange-200'
  },
  success: {
    bgColor: 'bg-green-50',
    dotColor: 'bg-green-500',
    borderColor: 'border-green-100',
    textColor: 'text-green-700',
    metricColor: 'text-green-600',
    hoverBorder: 'hover:border-green-200'
  }
}

export function AISummaryBanner() {
  const criticalAlerts = alerts.filter(a => a.severity === 'critical')
  const warningAlerts = alerts.filter(a => a.severity === 'warning')
  const successAlerts = alerts.filter(a => a.severity === 'success')

  return (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-8 py-6">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900">Today's Insights</h2>
          <p className="text-sm text-gray-500">Real-time overview of hospital operations</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Critical (Red) */}
          <div className="flex flex-col gap-4">
            {criticalAlerts.map((alert) => (
              <AlertCard key={alert.id} alert={alert} />
            ))}
          </div>

          {/* Middle Column: Warning (Orange) */}
          <div className="flex flex-col gap-4">
            {warningAlerts.map((alert) => (
              <AlertCard key={alert.id} alert={alert} />
            ))}
          </div>

          {/* Right Column: Success (Green) */}
          <div className="flex flex-col gap-4">
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

  const CardContent = () => (
    <>
      {/* Status indicator dot */}
      <div className="flex-shrink-0 mt-1">
        <div className="flex h-8 w-8 rounded-full bg-white border border-gray-100 items-center justify-center shadow-sm">
          <div className={`h-3 w-3 rounded-full ${config.dotColor}`} />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2 mb-1">
          <h3 className="text-sm font-semibold text-gray-900 truncate">
            {alert.title}
          </h3>
          <span className={`text-xs font-bold px-2 py-0.5 rounded-full bg-white/60 ${config.metricColor} border border-black/5`}>
            {alert.metric}
          </span>
        </div>
        <p className="text-sm text-gray-600 leading-relaxed line-clamp-2">
          {alert.message}
        </p>
        {alert.href && (
          <div className={`mt-2 flex items-center text-xs font-medium ${config.textColor} group-hover:underline`}>
            View Analysis <ArrowRight className="ml-1 h-3 w-3" />
          </div>
        )}
      </div>
    </>
  )

  const cardClasses = `flex items-start gap-4 p-4 rounded-xl border ${config.borderColor} ${config.bgColor} ${config.hoverBorder} hover:shadow-md transition-all duration-200 group relative`

  if (alert.href) {
    return (
      <Link href={alert.href} className={cardClasses}>
        <CardContent />
      </Link>
    )
  }

  return (
    <div className={cardClasses}>
      <CardContent />
    </div>
  )
}
