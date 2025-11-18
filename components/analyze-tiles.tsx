import { TrendingUp, AlertTriangle, Circle, Check, Bell, CheckCircle, Clipboard, Settings } from 'lucide-react'

const rowAKpis = [
  { label: 'Utilization', value: '50%', Icon: TrendingUp },
  { label: 'Underutilized Assets', value: '1694', Icon: AlertTriangle },
  { label: 'Idle Critical (>30d)', value: '251', Icon: Circle },
  { label: 'Specimen Violations', value: '0', secondary: 'Today', Icon: Check },
]

const rowBKpis = [
  { label: 'Movement Alerts', value: '8', Icon: Bell },
  { label: 'Inventory Accuracy', value: '95%', Icon: CheckCircle },
  { label: 'High-Risk Assets', value: '400', Icon: AlertTriangle },
  { label: 'Compliance Score', value: '55%', Icon: Clipboard },
]

export function AnalyzeTiles() {
  return (
    <div className="space-y-8">
      {/* KPI Grid Row A */}
      <div className="grid grid-cols-4 gap-6">
        {rowAKpis.map((kpi) => (
          <div
            key={kpi.label}
            className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md hover:border hover:border-primary/20 transition-all duration-200"
          >
            <div className="flex items-start justify-between mb-4">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                {kpi.label}
              </p>
              <kpi.Icon className="text-lg text-primary/60" />
            </div>
            <p className="text-3xl font-bold text-foreground mb-1">
              {kpi.value}
            </p>
            {kpi.secondary && (
              <p className="text-sm text-muted-foreground">{kpi.secondary}</p>
            )}
          </div>
        ))}
      </div>

      {/* KPI Grid Row B */}
      <div className="grid grid-cols-4 gap-6">
        {rowBKpis.map((kpi) => (
          <div
            key={kpi.label}
            className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md hover:border hover:border-primary/20 transition-all duration-200"
          >
            <div className="flex items-start justify-between mb-4">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                {kpi.label}
              </p>
              <kpi.Icon className="text-lg text-primary/60" />
            </div>
            <p className="text-3xl font-bold text-foreground">
              {kpi.value}
            </p>
          </div>
        ))}
      </div>

      {/* Operational Hotspots + Root Causes */}
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 bg-white rounded-2xl p-8 shadow-sm">
          <h3 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-3">
            <TrendingUp className="text-primary text-xl" /> Operational Hotspots Map
          </h3>
          <div className="bg-secondary/30 rounded-2xl h-64 flex items-center justify-center">
            <p className="text-base text-muted-foreground font-medium">Hospital Floorplan - Interactive Heat Map</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-sm">
          <h3 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-3">
            <Settings className="text-primary text-xl" /> Root Causes (AI)
          </h3>
          <div className="space-y-4">
            {[
              'OR3 – idle surgical tables 32 days',
              'Freezer #7 – sensor instability',
              'PAR hoarding in North Tower',
              'Near-expiring RBC (24 units)',
              'Maintenance backlog Clinic A',
            ].map((cause, i) => (
              <div key={i} className="flex gap-3 text-sm">
                <span className="text-primary font-semibold min-w-[20px]">{i + 1}.</span>
                <p className="text-muted-foreground leading-relaxed">{cause}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
