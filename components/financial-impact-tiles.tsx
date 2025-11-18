import { FaDollarSign, FaClock, FaBolt, FaChartLine } from 'react-icons/fa'

const impactTiles = [
  { label: 'Rental Avoidance', value: '$1.21M', detail: 'saved YTD', metric: '35% ↓ rentals', Icon: FaDollarSign },
  { label: 'Capital Efficiency', value: '$2.8M', detail: 'deferred', metric: 'purchases', Icon: FaChartLine },
  { label: 'Expiration Avoidance', value: '$540k', detail: 'saved', metric: 'waste reduced', Icon: FaClock },
  { label: 'Operational Efficiency', value: '4,120', detail: 'hrs saved', metric: 'staff time', Icon: FaBolt },
]

export function FinancialImpactTiles() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-4 gap-4">
        {impactTiles.map((tile) => (
          <div
            key={tile.label}
            className="bg-card border border-border rounded-xl p-6 hover:border-primary/30 transition-all hover:shadow-lg shadow-sm"
          >
            <div className="flex items-start justify-between mb-4">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                {tile.label}
              </p>
              <tile.Icon className="text-2xl text-primary/70" />
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
      <div className="bg-linear-to-r from-primary/10 to-primary/5 border border-primary/20 rounded-xl p-8 text-center shadow-sm">
        <p className="text-xs font-medium text-primary uppercase tracking-widest mb-2 flex items-center justify-center gap-2">
          <FaBolt className="text-sm" />
          Verified 3-Year Impact
        </p>
        <p className="text-4xl font-bold text-primary">
          $60,000,000
        </p>
        <p className="text-sm text-muted-foreground mt-2">
          Cumulative operational savings and efficiency gains
        </p>
      </div>
    </div>
  )
}
