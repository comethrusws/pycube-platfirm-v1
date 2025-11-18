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
    <div className="bg-white rounded-2xl p-8 shadow-sm">
      <h2 className="text-2xl font-semibold text-foreground mb-8 tracking-tight">
        AI Recommendations to Optimize Operations
      </h2>
      
      <div className="space-y-4">
        {recommendations.map((rec, i) => (
          <div
            key={i}
            className="flex items-center justify-between p-6 bg-secondary/20 rounded-2xl hover:bg-secondary/40 hover:border hover:border-primary/20 transition-all duration-200 group"
          >
            <div className="flex items-start gap-4 flex-1">
              <rec.Icon className="text-primary mt-1 text-lg" />
              <div className="flex-1">
                <p className="text-base font-medium text-foreground mb-1">
                  {rec.action}
                </p>
                <p className="text-sm text-muted-foreground">
                  {rec.benefit}
                </p>
              </div>
            </div>
            <button className="ml-6 px-6 py-3 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:bg-primary/90 transition-colors whitespace-nowrap shadow-sm">
              Apply
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
