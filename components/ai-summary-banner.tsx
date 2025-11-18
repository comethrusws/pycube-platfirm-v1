'use client'

import { useState, useEffect } from 'react'

const alerts = [
  {
    id: 1,
    status: 'normal',
    message: (
      <>
        <span className="font-semibold">Hospital operating normally.</span> $4.8M annualized savings identified. 
        <span className="font-semibold"> 23 high-risk items</span> require attention across OR, Lab & Supply Chain.
      </>
    ),
    statusColor: 'bg-primary'
  },
  {
    id: 2,
    status: 'warning',
    message: (
      <>
        <span className="font-semibold">Alert: Equipment maintenance required.</span> 28 high-risk OR/Lab devices need immediate attention. 
        <span className="font-semibold"> Preventive action</span> recommended to avoid downtime.
      </>
    ),
    statusColor: 'bg-warning'
  },
  {
    id: 3,
    status: 'success',
    message: (
      <>
        <span className="font-semibold">Optimization complete:</span> 312 underutilized assets successfully redeployed. 
        <span className="font-semibold"> $1.4M purchase request</span> avoided through smart redistribution.
      </>
    ),
    statusColor: 'bg-success'
  },
  {
    id: 4,
    status: 'info',
    message: (
      <>
        <span className="font-semibold">Specimen tracking update:</span> 92% traceability achieved across all departments. 
        <span className="font-semibold"> Zero custody breaks</span> recorded in the past 24 hours.
      </>
    ),
    statusColor: 'bg-primary'
  },
  {
    id: 5,
    status: 'warning',
    message: (
      <>
        <span className="font-semibold">Inventory alert:</span> 24 RBC units approaching expiration within 48 hours. 
        <span className="font-semibold"> $540K waste prevention</span> protocols activated.
      </>
    ),
    statusColor: 'bg-warning'
  }
]

export function AISummaryBanner() {
  const [currentAlertIndex, setCurrentAlertIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAlertIndex((prevIndex) => (prevIndex + 1) % alerts.length)
    }, 4000) // Change every 4 seconds

    return () => clearInterval(interval)
  }, [])

  const currentAlert = alerts[currentAlertIndex]

  return (
    <div className="bg-primary/3 border-b border-border px-8 py-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-start gap-4">
          <div className="flex h-8 w-8 rounded-full bg-primary/10 items-center justify-center shrink-0 mt-0.5">
            <div className={`h-3 w-3 rounded-full transition-colors duration-300 ${currentAlert.statusColor}`} />
          </div>
          <div className="flex-1 min-w-0">
            <p 
              key={currentAlert.id}
              className="text-base text-foreground leading-relaxed transition-opacity duration-300"
            >
              {currentAlert.message}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
