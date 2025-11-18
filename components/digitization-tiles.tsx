import { Package, TestTube, BarChart3, Settings, Link } from 'lucide-react'

const tiles = [
  {
    label: 'Asset Digitization',
    value: '74%',
    secondary: '5005/6734',
    description: 'Coverage',
    Icon: Package,
  },
  {
    label: 'Specimen Traceability',
    value: '92%',
    secondary: 'last 7 days',
    description: 'Tracked samples',
    Icon: TestTube,
  },
  {
    label: 'Supply Chain',
    value: '81%',
    secondary: 'tracked items',
    description: 'Visibility',
    Icon: BarChart3,
  },
  {
    label: 'Infra Health',
    value: '96% Online',
    secondary: '98% tag health',
    description: 'Gateway Status',
    Icon: Settings,
  },
  {
    label: 'Integrations',
    value: 'All Green',
    secondary: 'Epic • SAP • HL7',
    description: 'System Status',
    Icon: Link,
  },
]

export function DigitizationTiles() {
  return (
    <div className="grid grid-cols-5 gap-4">
      {tiles.map((tile) => (
        <div
          key={tile.label}
          className="bg-card border border-border rounded-xl p-6 hover:border-primary/30 hover:shadow-lg shadow-sm transition-all cursor-pointer group"
        >
          <div className="space-y-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  {tile.label}
                </p>
              </div>
              <tile.Icon className="text-xl text-primary/70" />
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
