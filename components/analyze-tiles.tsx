const rowAKpis = [
  { label: 'Utilization', value: '50%', icon: '📈' },
  { label: 'Underutilized Assets', value: '1694', icon: '⚠️' },
  { label: 'Idle Critical (>30d)', value: '251', icon: '🔴' },
  { label: 'Specimen Violations', value: '0', secondary: 'Today', icon: '✓' },
]

const rowBKpis = [
  { label: 'Movement Alerts', value: '8', icon: '🚨' },
  { label: 'Inventory Accuracy', value: '95%', icon: '✅' },
  { label: 'High-Risk Assets', value: '400', icon: '⚠️' },
  { label: 'Compliance Score', value: '55%', icon: '📋' },
]

export function AnalyzeTiles() {
  return (
    <div className="space-y-6">
      {/* KPI Grid Row A */}
      <div className="grid grid-cols-4 gap-4">
        {rowAKpis.map((kpi) => (
          <div
            key={kpi.label}
            className="bg-card border border-border rounded-lg p-4 hover:border-primary/30 transition-all"
          >
            <div className="flex items-start justify-between mb-3">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                {kpi.label}
              </p>
              <span className="text-xl">{kpi.icon}</span>
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
            className="bg-card border border-border rounded-lg p-4 hover:border-primary/30 transition-all"
          >
            <div className="flex items-start justify-between mb-3">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                {kpi.label}
              </p>
              <span className="text-xl">{kpi.icon}</span>
            </div>
            <p className="text-2xl font-semibold text-foreground">
              {kpi.value}
            </p>
          </div>
        ))}
      </div>

      {/* Operational Hotspots + Root Causes */}
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2 bg-card border border-border rounded-lg p-6">
          <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
            <span className="text-lg">🔥</span> Operational Hotspots Map
          </h3>
          <div className="bg-muted rounded-lg h-64 flex items-center justify-center">
            <p className="text-sm text-muted-foreground">Hospital Floorplan - Interactive Heat Map</p>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
            <span className="text-lg">🧩</span> Root Causes (AI)
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
