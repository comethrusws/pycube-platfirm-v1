const tiles = [
  {
    label: 'Asset Digitization',
    value: '74%',
    secondary: '5005/6734',
    description: 'Coverage',
    icon: '📦',
  },
  {
    label: 'Specimen Traceability',
    value: '92%',
    secondary: 'last 7 days',
    description: 'Tracked samples',
    icon: '🧬',
  },
  {
    label: 'Supply Chain',
    value: '81%',
    secondary: 'tracked items',
    description: 'Visibility',
    icon: '📊',
  },
  {
    label: 'Infra Health',
    value: '96% Online',
    secondary: '98% tag health',
    description: 'Gateway Status',
    icon: '🔧',
  },
  {
    label: 'Integrations',
    value: 'All Green',
    secondary: 'Epic • SAP • HL7',
    description: 'System Status',
    icon: '🔗',
  },
]

export function DigitizationTiles() {
  return (
    <div className="grid grid-cols-5 gap-4">
      {tiles.map((tile) => (
        <div
          key={tile.label}
          className="bg-card border border-border rounded-lg p-5 hover:border-primary/30 hover:shadow-sm transition-all cursor-pointer group"
        >
          <div className="space-y-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  {tile.label}
                </p>
              </div>
              <span className="text-2xl">{tile.icon}</span>
            </div>
            
            <div>
              <p className="text-3xl font-semibold text-primary">
                {tile.value}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {tile.secondary}
              </p>
            </div>
            
            <p className="text-xs text-muted-foreground">
              {tile.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}
