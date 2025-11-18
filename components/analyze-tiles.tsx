import { FaChartLine, FaExclamationTriangle, FaCircle, FaCheck, FaBell, FaCheckCircle, FaClipboardList, FaCog } from 'react-icons/fa'

const rowAKpis = [
  { label: 'Utilization', value: '50%', Icon: FaChartLine },
  { label: 'Underutilized Assets', value: '1694', Icon: FaExclamationTriangle },
  { label: 'Idle Critical (>30d)', value: '251', Icon: FaCircle },
  { label: 'Specimen Violations', value: '0', secondary: 'Today', Icon: FaCheck },
]

const rowBKpis = [
  { label: 'Movement Alerts', value: '8', Icon: FaBell },
  { label: 'Inventory Accuracy', value: '95%', Icon: FaCheckCircle },
  { label: 'High-Risk Assets', value: '400', Icon: FaExclamationTriangle },
  { label: 'Compliance Score', value: '55%', Icon: FaClipboardList },
]

export function AnalyzeTiles() {
  return (
    <div className="space-y-6">
      {/* KPI Grid Row A */}
      <div className="grid grid-cols-4 gap-4">
        {rowAKpis.map((kpi) => (
          <div
            key={kpi.label}
            className="bg-card border border-border rounded-xl p-5 hover:border-primary/30 transition-all hover:shadow-lg shadow-sm"
          >
            <div className="flex items-start justify-between mb-3">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                {kpi.label}
              </p>
              <kpi.Icon className="text-lg text-primary/70" />
            </div>
            <p className="text-2xl font-semibold text-foreground">
              {kpi.value}
            </p>
            {kpi.secondary && (
              <p className="text-xs text-muted-foreground mt-1">{kpi.secondary}</p>
            )}
          </div>
        ))}
      </div>

      {/* KPI Grid Row B */}
      <div className="grid grid-cols-4 gap-4">
        {rowBKpis.map((kpi) => (
          <div
            key={kpi.label}
            className="bg-card border border-border rounded-xl p-5 hover:border-primary/30 transition-all hover:shadow-lg shadow-sm"
          >
            <div className="flex items-start justify-between mb-3">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                {kpi.label}
              </p>
              <kpi.Icon className="text-lg text-primary/70" />
            </div>
            <p className="text-2xl font-semibold text-foreground">
              {kpi.value}
            </p>
          </div>
        ))}
      </div>

      {/* Operational Hotspots + Root Causes */}
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2 bg-card border border-border rounded-xl p-6 shadow-sm">
          <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
            <FaChartLine className="text-primary" /> Operational Hotspots Map
          </h3>
          <div className="bg-muted rounded-xl h-64 flex items-center justify-center border border-border/50">
            <p className="text-sm text-muted-foreground">Hospital Floorplan - Interactive Heat Map</p>
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
          <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
            <FaCog className="text-primary" /> Root Causes (AI)
          </h3>
          <div className="space-y-3 text-sm">
            {[
              'OR3 – idle surgical tables 32 days',
              'Freezer #7 – sensor instability',
              'PAR hoarding in North Tower',
              'Near-expiring RBC (24 units)',
              'Maintenance backlog Clinic A',
            ].map((cause, i) => (
              <div key={i} className="flex gap-2 text-xs">
                <span className="text-muted-foreground font-medium">{i + 1}.</span>
                <p className="text-muted-foreground leading-relaxed">{cause}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
