'use client'

import { AlertTriangle, TrendingDown, Clock, DollarSign, ArrowRight, ChevronDown, ChevronUp } from 'lucide-react'
import { useState } from 'react'
import { expiryPolicyData, platformExpiryAlert } from '@/lib/data'

interface InventoryExpiryBannerProps {
  onCategoryClick?: (category: string) => void
}

export function InventoryExpiryBanner({ onCategoryClick }: InventoryExpiryBannerProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className="bg-background rounded-3xl overflow-hidden mb-8">
      {/* Header - Always Visible */}
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-orange-100 rounded-xl">
                <AlertTriangle className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">Inventory Expiration Management</h3>
                <p className="text-sm text-gray-600">Platform-level wastage prevention & expiry tracking</p>
              </div>
            </div>

            {/* Summary Stats */}
            <div className="grid grid-cols-4 gap-4 mt-4">
              <div className="bg-white rounded-xl p-4 border border-orange-100">
                <div className="flex items-center gap-2 mb-1">
                  <Clock className="w-4 h-4 text-orange-600" />
                  <span className="text-xs font-semibold text-gray-500 uppercase">Expiring Soon</span>
                </div>
                <div className="text-2xl font-bold text-orange-600">
                  {platformExpiryAlert.totalUnitsExpiringSoon.toLocaleString()}
                </div>
                <div className="text-xs text-gray-600 mt-1">units across {expiryPolicyData.length} categories</div>
              </div>

              <div className="bg-white rounded-xl p-4 border border-orange-100">
                <div className="flex items-center gap-2 mb-1">
                  <DollarSign className="w-4 h-4 text-red-600" />
                  <span className="text-xs font-semibold text-gray-500 uppercase">Value at Risk</span>
                </div>
                <div className="text-2xl font-bold text-red-600">
                  ${(platformExpiryAlert.totalValueAtRisk / 1000).toFixed(0)}K
                </div>
                <div className="text-xs text-gray-600 mt-1">if not addressed in time</div>
              </div>

              <div className="bg-white rounded-xl p-4 border border-emerald-100">
                <div className="flex items-center gap-2 mb-1">
                  <TrendingDown className="w-4 h-4 text-emerald-600" />
                  <span className="text-xs font-semibold text-gray-500 uppercase">Prevention Active</span>
                </div>
                <div className="text-2xl font-bold text-emerald-600">
                  ${(platformExpiryAlert.totalMonthlyPreventedWastage / 1000).toFixed(0)}K
                </div>
                <div className="text-xs text-gray-600 mt-1">monthly savings from protocols</div>
              </div>

              <div className="bg-white rounded-xl p-4 border border-blue-100">
                <div className="flex items-center gap-2 mb-1">
                  <ArrowRight className="w-4 h-4 text-blue-600" />
                  <span className="text-xs font-semibold text-gray-500 uppercase">Active Protocols</span>
                </div>
                <div className="text-2xl font-bold text-blue-600">
                  {platformExpiryAlert.activeProtocolsCount}
                </div>
                <div className="text-xs text-gray-600 mt-1">automation workflows</div>
              </div>
            </div>
          </div>

          {/* Expand/Collapse Button */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="ml-4 p-2 hover:bg-orange-100 rounded-lg transition-colors"
          >
            {isExpanded ? (
              <ChevronUp className="w-5 h-5 text-gray-600" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-600" />
            )}
          </button>
        </div>
      </div>

      {/* Expanded View - Category Breakdown */}
      {isExpanded && (
        <div className="border-t border-orange-200 bg-white/50 p-6">
          <h4 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wider">Category Breakdown</h4>
          <div className="space-y-3">
            {expiryPolicyData.map((category, idx) => (
              <button
                key={idx}
                onClick={() => onCategoryClick?.(category.category)}
                className="w-full bg-white rounded-xl p-4 border border-gray-200 hover:border-orange-300 hover:shadow-md transition-all text-left group"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h5 className="font-semibold text-gray-900">{category.category}</h5>
                      <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                        category.unitsExpiringSoon > 100 ? 'bg-red-100 text-red-700' :
                        category.unitsExpiringSoon > 50 ? 'bg-orange-100 text-orange-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}>
                        {category.unitsExpiringSoon} units
                      </span>
                      <span className="text-xs text-gray-500">
                        within {category.alertWindowDays} days
                      </span>
                    </div>

                    <div className="grid grid-cols-4 gap-4 text-sm">
                      <div>
                        <div className="text-xs text-gray-500 mb-1">Shelf Life</div>
                        <div className="font-semibold text-gray-900">{category.shelfLifeDays} days</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 mb-1">Wastage Rate</div>
                        <div className="font-semibold text-emerald-600">
                          {category.currentWastagePercent}%
                          <span className="text-xs text-gray-500 ml-1">(was {category.wastageBaselinePercent}%)</span>
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 mb-1">Value at Risk</div>
                        <div className="font-semibold text-red-600">${(category.totalValue / 1000).toFixed(1)}K</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 mb-1">Monthly Savings</div>
                        <div className="font-semibold text-emerald-600">${(category.monthlyPreventedWastage / 1000).toFixed(0)}K</div>
                      </div>
                    </div>

                    <div className="mt-3 pt-3 border-t border-gray-100">
                      <div className="text-xs font-semibold text-gray-700 mb-2">Active Prevention Protocols:</div>
                      <div className="flex flex-wrap gap-2">
                        {category.preventionProtocols.map((protocol, pIdx) => (
                          <span key={pIdx} className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full">
                            {protocol}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-orange-600 transition-colors ml-4 flex-shrink-0 mt-1" />
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
