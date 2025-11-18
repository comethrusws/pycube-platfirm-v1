import { ArrowRight, Wrench } from 'lucide-react'

const recommendations = [
  {
    action: 'Redeploy 123 underutilized assets',
    benefit: 'Avoid $1.4M purchase request',
    Icon: ArrowRight,
  },
  {
    action: 'Consolidate PAR levels, North Tower',
    benefit: 'Save $480k',
    Icon: ArrowRight,
  },
  {
    action: 'Repair 28 high-risk OR/Lab equipment',
    benefit: 'Prevent downtime',
    Icon: Wrench,
  },
  {
    action: 'Re-route specimens via Tunnel B',
    benefit: 'Improve TAT by 14%',
    Icon: ArrowRight,
  },
]

export function AIRecommendationsPanel() {
  return (
    <div className="bg-card border border-border rounded-xl p-8 shadow-sm">
      <h2 className="text-lg font-semibold text-foreground mb-6">
        AI Recommendations to Optimize Operations
      </h2>
      
      <div className="space-y-4">
        {recommendations.map((rec, i) => (
          <div
            key={i}
            className="flex items-center justify-between p-5 bg-secondary/50 rounded-xl hover:bg-secondary transition-all group border border-border/50 hover:border-primary/20 hover:shadow-sm"
          >
            <div className="flex items-start gap-3 flex-1">
              <rec.Icon className="text-primary mt-1 text-sm" />
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">
                  {rec.action}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {rec.benefit}
                </p>
              </div>
            </div>
            <button className="ml-4 px-5 py-2.5 bg-primary text-primary-foreground rounded-lg text-xs font-medium hover:bg-primary/90 transition-colors whitespace-nowrap shadow-sm">
              Apply
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
