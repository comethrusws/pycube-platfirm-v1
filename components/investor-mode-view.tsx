'use client';

/**
 * Investor Mode View Component
 * 10-minute pitch view focused on TAM, economics, and deployment scale
 * Requirements: R6.7, R6.8 - Investor-specific view
 */

import { TrendingUp, Building, DollarSign, Users, Globe, Zap, Target } from 'lucide-react';

interface InvestorMetric {
  label: string;
  value: string;
  subtitle: string;
  icon: any;
  color: string;
}

const investorMetrics: InvestorMetric[] = [
  {
    label: 'Total Addressable Market (TAM)',
    value: '$18.4B',
    subtitle: 'US hospital RTLS & workflow automation market by 2028',
    icon: Globe,
    color: 'blue'
  },
  {
    label: 'Customer Deployment Scale',
    value: '3,200+',
    subtitle: 'Hospital beds under management across 6 health systems',
    icon: Building,
    color: 'purple'
  },
  {
    label: 'Annualized Customer Value',
    value: '$4.8M',
    subtitle: 'Average annual savings per 500-bed hospital (8-10X ROI)',
    icon: DollarSign,
    color: 'green'
  },
  {
    label: 'Platform Penetration',
    value: '5 Domains',
    subtitle: 'Assets, Specimens, Transfusion, Supply Chain, Infrastructure',
    icon: Zap,
    color: 'orange'
  },
  {
    label: 'Go-to-Market Traction',
    value: '12-18 mo',
    subtitle: 'Sales cycle with C-suite, 6-12 month payback',
    icon: Target,
    color: 'red'
  },
  {
    label: 'Platform Stickiness',
    value: '99.2%',
    subtitle: 'Customer retention rate (mission-critical infrastructure)',
    icon: Users,
    color: 'teal'
  }
];

const crownJewelModules = [
  {
    name: 'Digital Asset Management',
    tagline: '$1.2M annual rental avoidance + $2.8M capital deferral',
    coverage: '99% digitized',
    kpis: ['50% → 75% utilization', '251 idle assets identified', '$1.4M purchase requests avoided'],
    icon: '📦'
  },
  {
    name: 'Specimen Tracking',
    tagline: '96% chain of custody compliance, 46-min avg TAT',
    coverage: '125K specimens/week',
    kpis: ['0 custody breaks (30 days)', '618 alerts prevented', 'CAP/CLIA compliant'],
    icon: '🧪'
  },
  {
    name: 'Transfusion Medicine',
    tagline: '$2.4M cost efficiency, 12-min response time',
    coverage: '4,250 blood units tracked',
    kpis: ['98.5% storage compliance', '2.8% return rate', '$540K waste avoided'],
    icon: '🩸'
  },
  {
    name: 'Supply Chain Visibility',
    tagline: '$18.5M monthly spend optimized, 98.5% digitized',
    coverage: '62K SKUs, 285 vendors',
    kpis: ['$4.2M wastage prevented YTD', '97% cold chain compliance', '95% inventory accuracy'],
    icon: '📊'
  }
];

const roadmapMilestones = [
  { quarter: 'Q1 2026', milestone: 'Predictive Maintenance AI rollout to 5 customers' },
  { quarter: 'Q2 2026', milestone: 'Patient Flow Optimization module launch' },
  { quarter: 'Q3 2026', milestone: 'Multi-site Network Analytics (10+ hospital systems)' },
  { quarter: 'Q4 2026', milestone: 'API Marketplace for third-party integrations' }
];

export function InvestorModeView() {
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-blue-50 p-8 space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-4 py-12">
        <div className="inline-block px-4 py-2 bg-blue-600 text-white rounded-full text-sm font-medium mb-4">
          Healthcare Operations Platform
        </div>
        <h1 className="text-5xl font-bold text-gray-900">
          PYcube Platform
        </h1>
        <p className="text-2xl text-gray-700 max-w-3xl mx-auto">
          AI-powered digital hospital platform delivering $4-6M annual savings per site
        </p>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Transforming hospital operations through real-time asset, specimen, and supply chain digitization
        </p>
      </div>

      {/* Key Investor Metrics */}
      <div className="bg-white rounded-2xl p-8 shadow-lg">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Investment Highlights
        </h2>
        <div className="grid grid-cols-3 gap-6">
          {investorMetrics.map((metric, idx) => {
            const Icon = metric.icon;
            return (
              <div 
                key={idx}
                className={`bg-linear-to-br from-${metric.color}-50 to-${metric.color}-100 p-6 rounded-xl border-2 border-${metric.color}-200`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className={`p-2 bg-${metric.color}-600 rounded-lg`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className={`text-sm font-semibold text-${metric.color}-900 uppercase`}>
                    {metric.label}
                  </h3>
                </div>
                <div className={`text-3xl font-bold text-${metric.color}-900 mb-2`}>
                  {metric.value}
                </div>
                <p className={`text-sm text-${metric.color}-700`}>
                  {metric.subtitle}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Economic Model */}
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <DollarSign className="h-6 w-6 text-green-600" />
            Economic Model (500-bed hospital)
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
              <span className="text-gray-700 font-medium">Rental Avoidance</span>
              <span className="text-2xl font-bold text-green-700">$1.2M</span>
            </div>
            <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
              <span className="text-gray-700 font-medium">Capital Deferral</span>
              <span className="text-2xl font-bold text-green-700">$2.8M</span>
            </div>
            <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
              <span className="text-gray-700 font-medium">Expiration Avoidance</span>
              <span className="text-2xl font-bold text-green-700">$540K</span>
            </div>
            <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
              <span className="text-gray-700 font-medium">Operational Efficiency</span>
              <span className="text-2xl font-bold text-green-700">$1.3M</span>
            </div>
            <div className="flex justify-between items-center p-4 bg-linear-to-r from-green-600 to-emerald-600 rounded-lg text-white">
              <span className="font-bold">Total Annual Value</span>
              <span className="text-3xl font-bold">$5.84M</span>
            </div>
            <div className="text-center pt-4 border-t">
              <div className="text-sm text-gray-600 mb-1">Investment</div>
              <div className="text-xl font-bold text-gray-900">$1.2M</div>
              <div className="text-sm text-green-600 font-semibold mt-2">
                8-10X First-Year ROI | 6-12 Month Payback
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Building className="h-6 w-6 text-purple-600" />
            Deployment Scale & Traction
          </h3>
          <div className="space-y-6">
            <div className="text-center p-6 bg-purple-50 rounded-lg border-2 border-purple-200">
              <div className="text-5xl font-bold text-purple-900">6</div>
              <div className="text-sm text-purple-700 uppercase mt-2">Health Systems</div>
              <div className="text-xs text-purple-600 mt-1">Including Cleveland Clinic, Baptist Health</div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-3xl font-bold text-blue-900">3,200+</div>
                <div className="text-xs text-blue-700 uppercase">Hospital Beds</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-3xl font-bold text-green-900">$28.8M</div>
                <div className="text-xs text-green-700 uppercase">Annual Value Created</div>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <div className="text-3xl font-bold text-orange-900">99.2%</div>
                <div className="text-xs text-orange-700 uppercase">Retention Rate</div>
              </div>
              <div className="text-center p-4 bg-red-50 rounded-lg">
                <div className="text-3xl font-bold text-red-900">12-18</div>
                <div className="text-xs text-red-700 uppercase">Mo. Sales Cycle</div>
              </div>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg border">
              <div className="text-sm font-semibold text-gray-900 mb-2">Pipeline</div>
              <div className="text-xs text-gray-600 space-y-1">
                <div>• 14 active C-suite conversations</div>
                <div>• 8 pilot deployments in progress</div>
                <div>• $42M ARR pipeline (next 18 months)</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Crown Jewel Modules */}
      <div className="bg-white rounded-2xl p-8 shadow-lg">
        <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Platform Crown Jewels
        </h3>
        <div className="grid grid-cols-2 gap-6">
          {crownJewelModules.map((module, idx) => (
            <div key={idx} className="p-6 bg-linear-to-br from-gray-50 to-blue-50 rounded-xl border-2 border-gray-200 hover:border-blue-400 transition-all">
              <div className="flex items-start gap-4 mb-4">
                <div className="text-4xl">{module.icon}</div>
                <div className="flex-1">
                  <h4 className="text-lg font-bold text-gray-900">{module.name}</h4>
                  <p className="text-sm text-gray-700 mt-1">{module.tagline}</p>
                  <p className="text-xs text-blue-600 font-semibold mt-2">{module.coverage}</p>
                </div>
              </div>
              <div className="space-y-1">
                {module.kpis.map((kpi, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-gray-700">
                    <span className="text-green-600">✓</span>
                    <span>{kpi}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Roadmap */}
      <div className="bg-white rounded-2xl p-8 shadow-lg">
        <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Product Roadmap & Expansion
        </h3>
        <div className="grid grid-cols-4 gap-4">
          {roadmapMilestones.map((item, idx) => (
            <div key={idx} className="p-4 bg-linear-to-br from-indigo-50 to-purple-50 rounded-lg border-2 border-indigo-200">
              <div className="text-sm font-bold text-indigo-900 mb-2">{item.quarter}</div>
              <div className="text-xs text-gray-700">{item.milestone}</div>
            </div>
          ))}
        </div>
        <div className="mt-6 p-4 bg-yellow-50 border-2 border-yellow-200 rounded-lg">
          <div className="text-sm font-semibold text-yellow-900 mb-2">Strategic Vision</div>
          <div className="text-xs text-yellow-800">
            Expanding from workflow digitization → AI-driven hospital operating system → 
            marketplace platform for third-party health tech integrations
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-linear-to-r from-blue-600 to-indigo-600 rounded-2xl p-12 text-center text-white shadow-xl">
        <h3 className="text-3xl font-bold mb-4">
          Ready to Transform Hospital Operations
        </h3>
        <p className="text-xl mb-6 opacity-90">
          Join leading health systems in capturing $4-6M annual value per site
        </p>
        <div className="flex gap-4 justify-center">
          <button className="px-8 py-3 bg-white text-blue-600 rounded-lg font-bold hover:bg-gray-100 transition-colors">
            Schedule Demo
          </button>
          <button className="px-8 py-3 border-2 border-white text-white rounded-lg font-bold hover:bg-white/10 transition-colors">
            View Full Deck
          </button>
        </div>
      </div>
    </div>
  );
}
