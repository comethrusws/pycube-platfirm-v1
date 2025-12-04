'use client';

/**
 * Hospital Network Map Component
 * Interactive map showing all hospital locations with roll-up KPIs
 * Requirements: R3.5, R3.6 - Network view with site drill-down
 */

import { useState } from 'react';
import { MapPin, Activity, AlertTriangle, CheckCircle, ChevronRight, TrendingUp } from 'lucide-react';
import { transfusionData } from '@/lib/data';

interface HospitalSite {
  id: number;
  name: string;
  location: string;
  beds: number;
  status: 'healthy' | 'warning' | 'critical';
  bloodInventory: number;
  alerts: {
    temperature: number;
    stock: number;
    expiry: number;
  };
  kpis: {
    chainOfCustody: number;
    responseTime: number;
    wastageRate: number;
    inventoryAccuracy: number;
  };
  savings: number;
  coordinates: { x: number; y: number };
}

const hospitalSites: HospitalSite[] = [
  {
    id: 1,
    name: 'Cleveland Clinic Main Campus',
    location: 'Cleveland, OH',
    beds: 1400,
    status: 'healthy',
    bloodInventory: 850,
    alerts: { temperature: 2, stock: 1, expiry: 3 },
    kpis: { chainOfCustody: 98.5, responseTime: 11, wastageRate: 1.8, inventoryAccuracy: 97.2 },
    savings: 580000,
    coordinates: { x: 45, y: 35 }
  },
  {
    id: 2,
    name: 'Cleveland Clinic Fairview',
    location: 'Cleveland, OH',
    beds: 480,
    status: 'healthy',
    bloodInventory: 320,
    alerts: { temperature: 1, stock: 0, expiry: 2 },
    kpis: { chainOfCustody: 97.8, responseTime: 13, wastageRate: 2.1, inventoryAccuracy: 96.8 },
    savings: 185000,
    coordinates: { x: 52, y: 28 }
  },
  {
    id: 3,
    name: 'Cleveland Clinic Hillcrest',
    location: 'Mayfield Heights, OH',
    beds: 425,
    status: 'warning',
    bloodInventory: 280,
    alerts: { temperature: 5, stock: 3, expiry: 4 },
    kpis: { chainOfCustody: 94.2, responseTime: 18, wastageRate: 3.5, inventoryAccuracy: 93.5 },
    savings: 142000,
    coordinates: { x: 58, y: 32 }
  },
  {
    id: 4,
    name: 'Cleveland Clinic Akron General',
    location: 'Akron, OH',
    beds: 550,
    status: 'healthy',
    bloodInventory: 410,
    alerts: { temperature: 1, stock: 1, expiry: 1 },
    kpis: { chainOfCustody: 98.1, responseTime: 12, wastageRate: 1.9, inventoryAccuracy: 97.8 },
    savings: 245000,
    coordinates: { x: 48, y: 55 }
  },
  {
    id: 5,
    name: 'Cleveland Clinic Weston',
    location: 'Weston, FL',
    beds: 325,
    status: 'healthy',
    bloodInventory: 240,
    alerts: { temperature: 0, stock: 0, expiry: 1 },
    kpis: { chainOfCustody: 99.2, responseTime: 10, wastageRate: 1.5, inventoryAccuracy: 98.5 },
    savings: 128000,
    coordinates: { x: 35, y: 85 }
  },
  {
    id: 6,
    name: 'Cleveland Clinic Medina',
    location: 'Medina, OH',
    beds: 285,
    status: 'healthy',
    bloodInventory: 195,
    alerts: { temperature: 1, stock: 2, expiry: 2 },
    kpis: { chainOfCustody: 96.8, responseTime: 14, wastageRate: 2.3, inventoryAccuracy: 95.8 },
    savings: 98000,
    coordinates: { x: 42, y: 48 }
  },
];

export function HospitalNetworkMap() {
  const [selectedSiteId, setSelectedSiteId] = useState<number | null>(null);
  const [hoveredSiteId, setHoveredSiteId] = useState<number | null>(null);

  const selectedSite = hospitalSites.find(s => s.id === selectedSiteId);
  const hoveredSite = hospitalSites.find(s => s.id === hoveredSiteId);

  const getStatusColor = (status: HospitalSite['status']) => {
    switch (status) {
      case 'healthy': return 'text-green-600 bg-green-100 border-green-400';
      case 'warning': return 'text-yellow-600 bg-yellow-100 border-yellow-400';
      case 'critical': return 'text-red-600 bg-red-100 border-red-400';
    }
  };

  const getStatusDot = (status: HospitalSite['status']) => {
    switch (status) {
      case 'healthy': return 'bg-green-500';
      case 'warning': return 'bg-yellow-500 animate-pulse';
      case 'critical': return 'bg-red-500 animate-pulse';
    }
  };

  const totalAlerts = hospitalSites.reduce((sum, s) => 
    sum + s.alerts.temperature + s.alerts.stock + s.alerts.expiry, 0
  );
  
  const totalSavings = hospitalSites.reduce((sum, s) => sum + s.savings, 0);
  const avgChainOfCustody = hospitalSites.reduce((sum, s) => sum + s.kpis.chainOfCustody, 0) / hospitalSites.length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <MapPin className="h-7 w-7 text-blue-600" />
            Hospital Network Overview
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            {hospitalSites.length} facilities across the Cleveland Clinic health system
          </p>
        </div>
      </div>

      {/* Network Summary KPIs */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-linear-to-br from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-200">
          <div className="text-sm text-blue-700 uppercase font-medium">Total Facilities</div>
          <div className="text-3xl font-bold text-blue-900 mt-1">{hospitalSites.length}</div>
          <div className="text-xs text-blue-600 mt-1">
            {hospitalSites.filter(s => s.status === 'healthy').length} healthy, {hospitalSites.filter(s => s.status === 'warning').length} warnings
          </div>
        </div>

        <div className="bg-linear-to-br from-purple-50 to-pink-50 p-4 rounded-lg border border-purple-200">
          <div className="text-sm text-purple-700 uppercase font-medium">Total Beds</div>
          <div className="text-3xl font-bold text-purple-900 mt-1">
            {hospitalSites.reduce((sum, s) => sum + s.beds, 0).toLocaleString()}
          </div>
          <div className="text-xs text-purple-600 mt-1">Across all sites</div>
        </div>

        <div className="bg-linear-to-br from-green-50 to-emerald-50 p-4 rounded-lg border border-green-200">
          <div className="text-sm text-green-700 uppercase font-medium">Network Savings</div>
          <div className="text-3xl font-bold text-green-900 mt-1">
            ${(totalSavings / 1000000).toFixed(1)}M
          </div>
          <div className="text-xs text-green-600 mt-1">Year to date</div>
        </div>

        <div className={`bg-linear-to-br p-4 rounded-lg border ${
          totalAlerts > 10 ? 'from-red-50 to-orange-50 border-red-200' : 'from-green-50 to-teal-50 border-green-200'
        }`}>
          <div className={`text-sm uppercase font-medium ${totalAlerts > 10 ? 'text-red-700' : 'text-green-700'}`}>
            Active Alerts
          </div>
          <div className={`text-3xl font-bold mt-1 ${totalAlerts > 10 ? 'text-red-900' : 'text-green-900'}`}>
            {totalAlerts}
          </div>
          <div className={`text-xs mt-1 ${totalAlerts > 10 ? 'text-red-600' : 'text-green-600'}`}>
            Across all facilities
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Map Visualization */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Geographic Distribution</h3>
          
          {/* Simplified map representation */}
          <div className="relative w-full h-96 bg-linear-to-br from-blue-50 to-green-50 rounded-lg border-2 border-gray-300 overflow-hidden">
            {/* Map background grid */}
            <div className="absolute inset-0 opacity-10">
              <svg width="100%" height="100%">
                <defs>
                  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="gray" strokeWidth="0.5"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>
            </div>

            {/* Hospital markers */}
            {hospitalSites.map((site) => (
              <div
                key={site.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                style={{ left: `${site.coordinates.x}%`, top: `${site.coordinates.y}%` }}
                onMouseEnter={() => setHoveredSiteId(site.id)}
                onMouseLeave={() => setHoveredSiteId(null)}
                onClick={() => setSelectedSiteId(site.id)}
              >
                {/* Pulse effect for warnings */}
                {site.status !== 'healthy' && (
                  <div className={`absolute inset-0 rounded-full ${getStatusDot(site.status)} opacity-50 animate-ping`} />
                )}
                
                {/* Marker */}
                <div className={`relative w-8 h-8 rounded-full border-4 ${getStatusDot(site.status)} ${
                  site.id === selectedSiteId ? 'ring-4 ring-blue-300 scale-125' :
                  site.id === hoveredSiteId ? 'scale-110' : ''
                } transition-all shadow-lg`}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white text-xs font-bold">{site.id}</span>
                  </div>
                </div>

                {/* Tooltip on hover */}
                {site.id === hoveredSiteId && (
                  <div className="absolute top-10 left-1/2 transform -translate-x-1/2 bg-white border border-gray-300 rounded-lg shadow-xl p-3 w-48 z-10">
                    <div className="font-semibold text-sm text-gray-900">{site.name}</div>
                    <div className="text-xs text-gray-600 mt-1">{site.location}</div>
                    <div className="flex items-center gap-2 mt-2 text-xs">
                      <span className={`w-2 h-2 rounded-full ${getStatusDot(site.status)}`} />
                      <span className="capitalize">{site.status}</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-4 flex items-center gap-4 text-xs text-gray-600">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span>Healthy ({hospitalSites.filter(s => s.status === 'healthy').length})</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <span>Warning ({hospitalSites.filter(s => s.status === 'warning').length})</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <span>Critical ({hospitalSites.filter(s => s.status === 'critical').length})</span>
            </div>
          </div>
        </div>

        {/* Facility List */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">All Facilities</h3>
          
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {hospitalSites.map((site) => (
              <div
                key={site.id}
                className={`p-3 rounded-lg border cursor-pointer transition-all ${
                  site.id === selectedSiteId 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
                onClick={() => setSelectedSiteId(site.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 flex-1">
                    <div className={`w-3 h-3 rounded-full ${getStatusDot(site.status)}`} />
                    <div className="flex-1">
                      <div className="font-semibold text-sm text-gray-900">{site.name}</div>
                      <div className="text-xs text-gray-600">{site.beds} beds • {site.bloodInventory} units</div>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </div>

                {(site.alerts.temperature + site.alerts.stock + site.alerts.expiry) > 0 && (
                  <div className="flex gap-2 mt-2 text-xs">
                    {site.alerts.temperature > 0 && (
                      <span className="bg-red-100 text-red-700 px-2 py-0.5 rounded">
                        {site.alerts.temperature} temp
                      </span>
                    )}
                    {site.alerts.stock > 0 && (
                      <span className="bg-orange-100 text-orange-700 px-2 py-0.5 rounded">
                        {site.alerts.stock} stock
                      </span>
                    )}
                    {site.alerts.expiry > 0 && (
                      <span className="bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded">
                        {site.alerts.expiry} expiry
                      </span>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Selected Site Details */}
      {selectedSite && (
        <div className="bg-white rounded-lg border-2 border-blue-500 p-6 shadow-lg">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                {selectedSite.name}
                <span className={`text-xs px-3 py-1 rounded-full font-medium ${getStatusColor(selectedSite.status)}`}>
                  {selectedSite.status}
                </span>
              </h3>
              <p className="text-sm text-gray-600 mt-1">{selectedSite.location}</p>
            </div>
            <button 
              onClick={() => setSelectedSiteId(null)}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>

          <div className="grid grid-cols-4 gap-4 mb-6">
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-gray-900">{selectedSite.beds}</div>
              <div className="text-xs text-gray-600 uppercase">Beds</div>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-gray-900">{selectedSite.bloodInventory}</div>
              <div className="text-xs text-gray-600 uppercase">Blood Units</div>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                ${(selectedSite.savings / 1000).toFixed(0)}K
              </div>
              <div className="text-xs text-gray-600 uppercase">YTD Savings</div>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">
                {selectedSite.alerts.temperature + selectedSite.alerts.stock + selectedSite.alerts.expiry}
              </div>
              <div className="text-xs text-gray-600 uppercase">Active Alerts</div>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4">
            <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
              <div className="text-sm text-blue-700 font-medium">Chain of Custody</div>
              <div className="text-2xl font-bold text-blue-900 mt-1">
                {selectedSite.kpis.chainOfCustody}%
              </div>
            </div>
            <div className="p-3 bg-green-50 rounded-lg border border-green-200">
              <div className="text-sm text-green-700 font-medium">Response Time</div>
              <div className="text-2xl font-bold text-green-900 mt-1">
                {selectedSite.kpis.responseTime} <span className="text-sm">min</span>
              </div>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
              <div className="text-sm text-purple-700 font-medium">Wastage Rate</div>
              <div className="text-2xl font-bold text-purple-900 mt-1">
                {selectedSite.kpis.wastageRate}%
              </div>
            </div>
            <div className="p-3 bg-orange-50 rounded-lg border border-orange-200">
              <div className="text-sm text-orange-700 font-medium">Inventory Accuracy</div>
              <div className="text-2xl font-bold text-orange-900 mt-1">
                {selectedSite.kpis.inventoryAccuracy}%
              </div>
            </div>
          </div>

          <div className="mt-4 flex gap-2">
            <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
              View Full Dashboard
            </button>
            <button className="flex-1 border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg">
              Generate Report
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
