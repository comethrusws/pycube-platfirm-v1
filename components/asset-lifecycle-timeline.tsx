'use client';

/**
 * Asset Lifecycle Timeline Component
 * Visual timeline showing asset status transitions with timestamps, locations, and durations
 * Requirements: R2.1, R2.2, R2.3 - Lifecycle story with bottleneck identification
 */

import { Clock, MapPin, AlertCircle } from 'lucide-react';
import { Asset, AssetLifecycleEvent } from '@/lib/data';
import { getStatusColor } from '@/lib/taxonomies';

interface AssetLifecycleTimelineProps {
  asset: Asset;
  showBottlenecks?: boolean;
}

export function AssetLifecycleTimeline({ asset, showBottlenecks = true }: AssetLifecycleTimelineProps) {
  const events = asset.lifecycleEvents.sort((a, b) => 
    new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
  );

  // Identify bottlenecks (>4 hours in one status)
  const bottleneckThreshold = 240; // minutes
  const bottlenecks = showBottlenecks 
    ? events.filter(e => e.duration && e.duration > bottleneckThreshold)
    : [];

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const formatDuration = (minutes?: number) => {
    if (!minutes) return 'Ongoing';
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours < 24) return `${hours}h ${mins}m`;
    const days = Math.floor(hours / 24);
    const remainingHours = hours % 24;
    return `${days}d ${remainingHours}h`;
  };

  const isBottleneck = (event: AssetLifecycleEvent) => {
    return bottlenecks.some(b => b.id === event.id);
  };

  return (
    <div className="space-y-6">
      {/* Asset Header */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-200">
        <h3 className="text-lg font-semibold text-gray-900">{asset.name}</h3>
        <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
          <span className="flex items-center gap-1">
            <MapPin className="h-4 w-4" />
            Current: {asset.currentLocation}
            {asset.roomNumber && ` - ${asset.roomNumber}`}
          </span>
          <span className="flex items-center gap-1">
            Status: <span className={`font-semibold text-${getStatusColor(asset.currentStatus)}-600`}>
              {asset.currentStatus}
            </span>
          </span>
          <span className="flex items-center gap-1">
            Utilization: <span className={`font-semibold ${asset.utilizationRate >= 70 ? 'text-green-600' : asset.utilizationRate >= 50 ? 'text-yellow-600' : 'text-red-600'}`}>
              {asset.utilizationRate}%
            </span>
          </span>
        </div>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200" />

        {/* Events */}
        <div className="space-y-6">
          {events.map((event, index) => {
            const isLast = index === events.length - 1;
            const hasBottleneck = isBottleneck(event);
            
            return (
              <div key={event.id} className="relative pl-20">
                {/* Timeline dot */}
                <div className={`absolute left-6 w-5 h-5 rounded-full border-2 ${
                  hasBottleneck 
                    ? 'bg-red-500 border-red-600 ring-4 ring-red-100' 
                    : isLast 
                    ? `bg-${getStatusColor(event.status)}-500 border-${getStatusColor(event.status)}-600 ring-4 ring-${getStatusColor(event.status)}-100`
                    : `bg-${getStatusColor(event.status)}-400 border-${getStatusColor(event.status)}-500`
                }`} />

                {/* Event card */}
                <div className={`bg-white rounded-lg border p-4 shadow-sm ${
                  hasBottleneck ? 'border-red-300 bg-red-50' : 'border-gray-200'
                }`}>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className={`font-semibold ${
                          hasBottleneck ? 'text-red-900' : 'text-gray-900'
                        }`}>
                          {event.status}
                        </h4>
                        {hasBottleneck && (
                          <span className="flex items-center gap-1 text-xs bg-red-200 text-red-800 px-2 py-0.5 rounded-full">
                            <AlertCircle className="h-3 w-3" />
                            Bottleneck
                          </span>
                        )}
                      </div>
                      
                      <div className="mt-2 space-y-1 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-gray-400" />
                          <span>{formatTimestamp(event.timestamp)}</span>
                          {event.duration && (
                            <span className={`ml-2 font-medium ${
                              hasBottleneck ? 'text-red-700' : 'text-gray-700'
                            }`}>
                              Duration: {formatDuration(event.duration)}
                            </span>
                          )}
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-gray-400" />
                          <span>
                            {event.location}
                            {event.roomNumber && ` - ${event.roomNumber}`}
                          </span>
                        </div>

                        {event.performedBy && (
                          <div className="text-xs text-gray-500">
                            By: {event.performedBy}
                          </div>
                        )}

                        {event.notes && (
                          <div className="text-xs text-gray-500 mt-1 italic">
                            {event.notes}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Duration badge */}
                    {event.duration && (
                      <div className={`text-right ${hasBottleneck ? 'text-red-700' : 'text-gray-500'}`}>
                        <div className="text-2xl font-bold">
                          {event.duration < 60 ? event.duration : Math.round(event.duration / 60)}
                        </div>
                        <div className="text-xs uppercase">
                          {event.duration < 60 ? 'minutes' : 'hours'}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Bottleneck explanation */}
                  {hasBottleneck && (
                    <div className="mt-3 pt-3 border-t border-red-200">
                      <p className="text-sm text-red-800">
                        <strong>⚠️ Bottleneck Detected:</strong> Asset spent{' '}
                        {formatDuration(event.duration)} in "{event.status}" status.
                        {event.status.includes('Repair') && ' Consider expediting repair process or increasing Biomed capacity.'}
                        {event.status.includes('Soiled') && ' May indicate sanitization backlog or staffing issues.'}
                        {event.location.includes('Basement') && ' Asset may be forgotten in storage - consider visibility improvements.'}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Summary Statistics */}
      <div className="grid grid-cols-4 gap-4 pt-4 border-t">
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900">
            {events.length}
          </div>
          <div className="text-xs text-gray-500 uppercase">Status Changes</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900">
            {new Set(events.map(e => e.location)).size}
          </div>
          <div className="text-xs text-gray-500 uppercase">Locations Visited</div>
        </div>
        <div className="text-center">
          <div className={`text-2xl font-bold ${bottlenecks.length > 0 ? 'text-red-600' : 'text-green-600'}`}>
            {bottlenecks.length}
          </div>
          <div className="text-xs text-gray-500 uppercase">Bottlenecks</div>
        </div>
        <div className="text-center">
          <div className={`text-2xl font-bold ${asset.utilizationRate >= 70 ? 'text-green-600' : asset.utilizationRate >= 50 ? 'text-yellow-600' : 'text-red-600'}`}>
            {asset.utilizationRate}%
          </div>
          <div className="text-xs text-gray-500 uppercase">Utilization Rate</div>
        </div>
      </div>
    </div>
  );
}
