import { Package, TestTube, Droplet, Truck, Settings } from 'lucide-react'
import { digitizationTiles } from '@/lib/data'

const iconMap = {
  Package,
  TestTube,
  Droplet,
  Truck,
  Settings,
}

const tiles = digitizationTiles.map(tile => ({
  ...tile,
  Icon: iconMap[tile.icon as keyof typeof iconMap],
}))

function getStatusColor(value: number) {
  if (value > 98) return 'text-emerald-500'
  if (value >= 95) return 'text-orange-500'
  return 'text-red-500'
}

function getStatusBg(value: number) {
  if (value > 98) return 'bg-emerald-500/10'
  if (value >= 95) return 'bg-orange-500/10'
  return 'bg-red-500/10'
}

function getStatusCategory(value: number) {
  if (value > 98) return 'green'
  if (value >= 95) return 'orange'
  return 'red'
}

function getCardBg(value: number) {
  if (value > 98) return 'bg-emerald-50/80'
  if (value >= 95) return 'bg-orange-50/80'
  return 'bg-red-50/80'
}

interface DigitizationTilesProps {
  onCardClick?: (label: string, secondary?: string) => void
}

export function DigitizationTiles({ onCardClick }: DigitizationTilesProps) {
  const categories = {
    red: tiles.filter(t => getStatusCategory(t.value) === 'red'),
    orange: tiles.filter(t => getStatusCategory(t.value) === 'orange'),
    green: tiles.filter(t => getStatusCategory(t.value) === 'green'),
  }

  const renderTile = (tile: typeof tiles[0]) => {
    const statusColor = getStatusColor(tile.value)
    const statusBg = getStatusBg(tile.value)
    const cardBg = getCardBg(tile.value)

    return (
      <div
        key={tile.label + tile.value}
        onClick={() => onCardClick?.(tile.label, tile.secondary)}
        className={`${cardBg} rounded-3xl p-8 shadow-[0_2px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all duration-300 cursor-pointer border border-gray-100 mb-6 last:mb-0 hover:scale-[1.02]`}
      >
        <div className="flex flex-col h-full justify-between space-y-6">
          <div className="flex items-start justify-between">
            <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">
              {tile.label}
            </p>
            <div className={`p-2 rounded-full ${statusBg}`}>
              <tile.Icon className={`w-5 h-5 ${statusColor}`} />
            </div>
          </div>

          <div>
            <div className="flex items-baseline gap-1">
              <span className={`text-5xl font-medium tracking-tight ${statusColor}`}>
                {tile.value}%
              </span>
            </div>
            {/* R4.1: Status Label */}
            {tile.statusLabel && (
              <p className="text-xs font-bold text-gray-700 mt-2 uppercase tracking-wider">
                {tile.statusLabel}
              </p>
            )}
            {/* R4.1: Denominator */}
            {tile.denominator && (
              <p className="text-sm text-gray-500 mt-1 font-semibold">
                {tile.denominator}
              </p>
            )}
            <p className="text-sm text-gray-400 mt-2 font-medium">
              {tile.secondary}
            </p>
          </div>

          <div className="pt-4 border-t border-gray-50">
            <p className="text-sm text-gray-600 font-medium">
              {tile.description}
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-3 gap-8">
      {/* Green Column */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-4 px-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500" />
          <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">{categories.green.length}</span>
        </div>
        {categories.green.map(renderTile)}
      </div>

      {/* Orange Column */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-4 px-2">
          <div className="w-2 h-2 rounded-full bg-orange-500" />
          <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">{categories.orange.length}</span>
        </div>
        {categories.orange.map(renderTile)}
      </div>

      {/* Red Column */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-4 px-2">
          <div className="w-2 h-2 rounded-full bg-red-500" />
          <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">{categories.red.length}</span>
        </div>
        {categories.red.map(renderTile)}
      </div>
    </div>
  )
}
