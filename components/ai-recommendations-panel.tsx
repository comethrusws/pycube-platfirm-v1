const recommendations = [
  {
    action: 'Redeploy 123 underutilized assets',
    benefit: 'Avoid $1.4M purchase request',
    icon: '→',
  },
  {
    action: 'Consolidate PAR levels, North Tower',
    benefit: 'Save $480k',
    icon: '≈',
  },
  {
    action: 'Repair 28 high-risk OR/Lab equipment',
    benefit: 'Prevent downtime',
    icon: '🔧',
  },
  {
    action: 'Re-route specimens via Tunnel B',
    benefit: 'Improve TAT by 14%',
    icon: '→',
  },
]

export function AIRecommendationsPanel() {
  return (
    <div className="bg-card border border-border rounded-lg p-8">
      <h2 className="text-lg font-semibold text-foreground mb-6">
        AI Recommendations to Optimize Operations
      </h2>
      
      <div className="space-y-4">
        {recommendations.map((rec, i) => (
          <div
            key={i}
            className="flex items-center justify-between p-4 bg-secondary rounded-lg hover:bg-muted transition-colors group"
          >
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">
                {rec.action}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {rec.benefit}
              </p>
            </div>
            <button className="ml-4 px-4 py-2 bg-primary text-primary-foreground rounded-md text-xs font-medium hover:bg-primary/90 transition-colors whitespace-nowrap">
              Apply
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
