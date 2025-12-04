'use client';

/**
 * Underutilized Assets Panel
 * Shows top N underutilized assets with reasons and recommendations
 * Requirements: R2.5, R2.6 - Drill-down with reasons and per-asset views
 */

import { useState } from 'react';
import { TrendingDown, MapPin, DollarSign, Calendar, AlertCircle, ChevronRight } from 'lucide-react';
import { underutilizedAssets, Asset, sampleAssets } from '@/lib/data';
import { AssetCategory } from '@/lib/taxonomies';
import { AssetLifecycleTimeline } from './asset-lifecycle-timeline';

interface UnderutilizedAssetsPanelProps {
  onAssetSelect?: (assetId: string) => void;
}

export function UnderutilizedAssetsPanel({ onAssetSelect }: UnderutilizedAssetsPanelProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedAssetId, setSelectedAssetId] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'utilization' | 'value' | 'idleDays'>('utilization');

  // Get unique categories
  const categories = ['all', ...Array.from(new Set(underutilizedAssets.map(a => a.category)))];

  // Filter and sort
  let filteredAssets = selectedCategory === 'all' 
    ? underutilizedAssets 
    : underutilizedAssets.filter(a => a.category === selectedCategory);

  filteredAssets = [...filteredAssets].sort((a, b) => {
    if (sortBy === 'utilization') return a.utilizationRate - b.utilizationRate;
    if (sortBy === 'value') return b.value - a.value;
    return b.idleDays - a.idleDays;
  });

  // Calculate totals
  const totalTrappedCapital = underutilizedAssets.reduce((sum, a) => sum + a.value, 0);
  const totalPotentialSavings = underutilizedAssets.reduce((sum, a) => sum + a.potentialSavings, 0);

  // Find detailed asset if selected
  const selectedAsset = selectedAssetId 
    ? sampleAssets.find(a => a.id === selectedAssetId) 
    : null;

  const getUtilizationColor = (rate: number) => {
    if (rate < 20) return 'text-red-600 bg-red-100';
    if (rate < 30) return 'text-orange-600 bg-orange-100';
    return 'text-yellow-600 bg-yellow-100';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <TrendingDown className="h-7 w-7 text-orange-600" />
            Underutilized Assets
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Assets with utilization below 30% over the last 30 days
          </p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-linear-to-br from-orange-50 to-red-50 p-4 rounded-lg border border-orange-200">
          <div className="text-sm text-orange-700 uppercase font-medium">Total Assets</div>
          <div className="text-3xl font-bold text-orange-900 mt-1">
            {underutilizedAssets.length}
          </div>
          <div className="text-xs text-orange-600 mt-1">Requiring attention</div>
        </div>

        <div className="bg-linear-to-br from-purple-50 to-indigo-50 p-4 rounded-lg border border-purple-200">
          <div className="text-sm text-purple-700 uppercase font-medium">Trapped Capital</div>
          <div className="text-3xl font-bold text-purple-900 mt-1">
            ${(totalTrappedCapital / 1000).toFixed(0)}K
          </div>
          <div className="text-xs text-purple-600 mt-1">Can be redeployed</div>
        </div>

        <div className="bg-linear-to-br from-green-50 to-emerald-50 p-4 rounded-lg border border-green-200">
          <div className="text-sm text-green-700 uppercase font-medium">Potential Savings</div>
          <div className="text-3xl font-bold text-green-900 mt-1">
            ${(totalPotentialSavings / 1000).toFixed(0)}K
          </div>
          <div className="text-xs text-green-600 mt-1">Annual impact</div>
        </div>
      </div>

      {/* Filters and Sort */}
      <div className="flex gap-4 items-center bg-gray-50 p-4 rounded-lg border">
        <span className="text-sm font-medium text-gray-700">Filter by:</span>
        
        <select 
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm"
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>
              {cat === 'all' ? 'All Categories' : cat}
            </option>
          ))}
        </select>

        <span className="text-sm font-medium text-gray-700 ml-4">Sort by:</span>
        
        <select 
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as any)}
          className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm"
        >
          <option value="utilization">Lowest Utilization</option>
          <option value="value">Highest Value</option>
          <option value="idleDays">Most Idle Days</option>
        </select>

        <div className="ml-auto text-sm text-gray-600">
          Showing {filteredAssets.length} assets
        </div>
      </div>

      {/* Asset List */}
      <div className="space-y-3">
        {filteredAssets.map((asset, index) => (
          <div 
            key={asset.assetId} 
            className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => {
              setSelectedAssetId(asset.assetId);
              onAssetSelect?.(asset.assetId);
            }}
          >
            <div className="flex items-start justify-between">
              <div className="flex gap-4 flex-1">
                {/* Rank Badge */}
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-orange-100 text-orange-700 font-bold text-sm">
                  {index + 1}
                </div>

                {/* Asset Details */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold text-gray-900">{asset.assetName}</h4>
                    <span className="text-xs text-gray-500">({asset.assetId})</span>
                  </div>

                  <div className="flex items-center gap-4 text-sm mb-2">
                    <span className="text-gray-600">{asset.category}</span>
                    <span className="flex items-center gap-1 text-gray-600">
                      <DollarSign className="h-4 w-4" />
                      {asset.value.toLocaleString()}
                    </span>
                    <span className="flex items-center gap-1 text-gray-600">
                      <Calendar className="h-4 w-4" />
                      {asset.idleDays} days idle
                    </span>
                  </div>

                  <div className="flex items-start gap-2 mb-2">
                    <AlertCircle className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0" />
                    <div className="text-sm">
                      <span className="text-gray-700 font-medium">Reason: </span>
                      <span className="text-gray-600">{asset.reason}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <ChevronRight className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <div className="text-sm">
                      <span className="text-green-700 font-medium">Recommendation: </span>
                      <span className="text-green-600">{asset.recommendation}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                    <MapPin className="h-3 w-3" />
                    Last seen: {asset.lastLocation}
                  </div>
                </div>
              </div>

              {/* Utilization & Savings */}
              <div className="text-right space-y-2">
                <div>
                  <div className={`text-2xl font-bold px-3 py-1 rounded-lg ${getUtilizationColor(asset.utilizationRate)}`}>
                    {asset.utilizationRate}%
                  </div>
                  <div className="text-xs text-gray-500 mt-1">Utilization</div>
                </div>
                <div className="pt-2 border-t">
                  <div className="text-lg font-bold text-green-600">
                    ${(asset.potentialSavings / 1000).toFixed(1)}K
                  </div>
                  <div className="text-xs text-gray-500">Annual Savings</div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2 mt-3 pt-3 border-t">
              <button 
                className="text-sm bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedAssetId(asset.assetId);
                }}
              >
                View Lifecycle
              </button>
              <button className="text-sm bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded">
                Locate Asset
              </button>
              <button className="text-sm border border-gray-300 hover:bg-gray-50 text-gray-700 px-3 py-1.5 rounded">
                View PM History
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Asset Lifecycle Detail Modal */}
      {selectedAsset && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-8" onClick={() => setSelectedAssetId(null)}>
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-auto" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-white border-b p-4 flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-900">Asset Lifecycle & Utilization</h3>
              <button 
                onClick={() => setSelectedAssetId(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <div className="p-6">
              <AssetLifecycleTimeline asset={selectedAsset} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
