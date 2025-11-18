import { DollarSign, Clock, Zap, TrendingDown } from 'lucide-react'

const impactTiles = [
  { label: 'Rental Avoidance', value: '$1.21M', detail: 'saved YTD', metric: '35% ↓ rentals', Icon: DollarSign },
  { label: 'Capital Efficiency', value: '$2.8M', detail: 'deferred', metric: 'purchases', Icon: TrendingDown },
  { label: 'Expiration Avoidance', value: '$540k', detail: 'saved', metric: 'waste reduced', Icon: Clock },
  { label: 'Operational Efficiency', value: '4,120', detail: 'hrs saved', metric: 'staff time', Icon: Zap },
]

export function FinancialImpactTiles() {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-4 gap-6">
        {impactTiles.map((tile) => (
          <div
            key={tile.label}
            className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md hover:border hover:border-primary/20 transition-all duration-200"
          >
            <div className="flex items-start justify-between mb-5">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                {tile.label}
              </p>
              <tile.Icon className="text-lg text-primary/60" />
            </div>
            <p className="text-3xl font-bold text-foreground mb-2">
              {tile.value}
            </p>
            <p className="text-sm text-muted-foreground mb-3">
              {tile.detail}
            </p>
            <p className="text-sm font-medium text-primary">
              {tile.metric}
            </p>
          </div>
        ))}
      </div>

      {/* Total Impact Summary */}
      <div className="bg-primary/5 border border-primary/10 rounded-2xl p-8 text-center">
        <p className="text-sm font-medium text-primary uppercase tracking-wider mb-3 flex items-center justify-center gap-2">
          <Zap className="text-base" />
          Verified 3-Year Impact
        </p>
        <p className="text-5xl font-bold text-primary mb-3">
          $60,000,000
        </p>
        <p className="text-base text-muted-foreground">
          Cumulative operational savings and efficiency gains
        </p>
      </div>
    </div>
  )
}
