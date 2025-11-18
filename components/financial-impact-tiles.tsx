const impactTiles = [
  { label: 'Rental Avoidance', value: '$1.21M', detail: 'saved YTD', metric: '35% ↓ rentals', icon: '💰' },
  { label: 'Capital Efficiency', value: '$2.8M', detail: 'deferred', metric: 'purchases', icon: '📉' },
  { label: 'Expiration Avoidance', value: '$540k', detail: 'saved', metric: 'waste reduced', icon: '⏰' },
  { label: 'Operational Efficiency', value: '4,120', detail: 'hrs saved', metric: 'staff time', icon: '⚡' },
]

export function FinancialImpactTiles() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-4 gap-4">
        {impactTiles.map((tile) => (
          <div
            key={tile.label}
            className="bg-card border border-border rounded-lg p-6 hover:border-accent/30 transition-all"
          >
            <div className="flex items-start justify-between mb-4">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                {tile.label}
              </p>
              <span className="text-3xl">{tile.icon}</span>
            </div>
            <p className="text-3xl font-semibold text-primary mb-1">
              {tile.value}
            </p>
            <p className="text-xs text-muted-foreground mb-3">
              {tile.detail}
            </p>
            <p className="text-xs font-medium text-primary/70">
              {tile.metric}
            </p>
          </div>
        ))}
      </div>

      {/* Total Impact Summary */}
      <div className="bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 rounded-lg p-8 text-center">
        <p className="text-xs font-medium text-primary uppercase tracking-widest mb-2">
          ⭐ Verified 3-Year Impact
        </p>
        <p className="text-4xl font-semibold text-foreground">
          $60,000,000
        </p>
        <p className="text-sm text-muted-foreground mt-2">
          Cumulative operational savings and efficiency gains
        </p>
      </div>
    </div>
  )
}
