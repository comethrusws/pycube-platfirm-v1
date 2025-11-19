'use client'

import { useState, useEffect } from 'react'

const alerts = [
  {
    id: 1,
    status: 'normal',
    title: 'Hospital operating normally',
    message: '$4.8M annualized savings identified. 23 high-risk items require attention across OR, Lab & Supply Chain.',
    statusColor: 'bg-blue-500'
  },
  {
    id: 2,
    status: 'warning',
    title: 'Alert: Equipment maintenance required',
    message: '28 high-risk OR/Lab devices need immediate attention. Preventive action recommended to avoid downtime.',
    statusColor: 'bg-orange-500'
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
    statusColor: 'bg-blue-500'
  },
  {
    id: 5,
    status: 'warning',
    title: 'Inventory alert',
    message: '24 RBC units approaching expiration within 48 hours. $540K waste prevention protocols activated.',
    statusColor: 'bg-orange-500'
  }
]

export function AISummaryBanner() {
  const [currentAlertIndex, setCurrentAlertIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true)
      setTimeout(() => {
        setCurrentAlertIndex((prevIndex) => (prevIndex + 1) % alerts.length)
        setIsTransitioning(false)
      }, 300)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const currentAlert = alerts[currentAlertIndex]

  return (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-8 py-6">
        <div
          className={`flex items-start gap-4 transition-all duration-300 ${isTransitioning ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'
            }`}
        >
          {/* Status indicator dot */}
          <div className="flex-shrink-0 mt-1">
            <div className="flex h-8 w-8 rounded-full bg-gray-100 items-center justify-center">
              <div className={`h-3 w-3 rounded-full ${currentAlert.statusColor} transition-colors duration-500`} />
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-baseline gap-3 mb-2">
              <h3 className="text-lg font-semibold text-gray-900">
                {currentAlert.title}
              </h3>
              <div className="flex gap-1.5">
                {alerts.map((_, index) => (
                  <div
                    key={index}
                    className={`h-1.5 rounded-full transition-all duration-300 ${index === currentAlertIndex
                        ? `w-8 ${currentAlert.statusColor}`
                        : 'w-1.5 bg-gray-300'
                      }`}
                  />
                ))}
              </div>
              {/* <div className="ml-auto text-sm font-medium text-gray-400">
                {currentAlertIndex + 1} / {alerts.length}
              </div> */}
              
            </div>
            <p className="text-base text-gray-600 leading-relaxed">
              {currentAlert.message}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
