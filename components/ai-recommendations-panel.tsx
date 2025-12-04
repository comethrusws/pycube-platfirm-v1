'use client';

/**
 * AI Recommendations Panel with Explainability
 * Enhanced with "Why" explanations and next-best-action logic
 * Requirements: R7.1, R7.2 - AI explainability and actionable recommendations
 */

import { useState } from 'react';
import { ArrowRight, Wrench, ChevronDown, ChevronUp, HelpCircle, Target, TrendingUp } from 'lucide-react';

interface Recommendation {
  id: string;
  action: string;
  benefit: string;
  priority: 'high' | 'medium' | 'low';
  icon: 'deploy' | 'repair' | 'optimize';
  why: {
    rootCause: string;
    dataPoints: string[];
    impact: string;
  };
  nextSteps: {
    step: string;
    owner: string;
    timeframe: string;
  }[];
  affectedAssets?: {
    id: string;
    name: string;
    location: string;
  }[];
  potentialSavings: number;
  confidence: number;
}

const recommendations: Recommendation[] = [
  {
    id: 'REC-001',
    action: 'Redeploy 123 underutilized assets from Storage to high-demand units',
    benefit: 'Avoid $1.4M purchase request',
    priority: 'high',
    icon: 'deploy',
    why: {
      rootCause: 'ICU and ED have submitted capital requests for 85 infusion pumps and 38 beds, but 123 similar assets are sitting idle in basement storage with <15% utilization over 60 days.',
      dataPoints: [
        '85 infusion pumps requested by ICU (avg cost: $8,500)',
        '38 beds requested by ED (avg cost: $12,000)',
        '123 matching assets found in Storage B12 with 8-12% utilization',
        'Last movement: 45-67 days ago'
      ],
      impact: 'Redeploying these assets eliminates capital request, saves $1.4M, and improves existing asset ROI from 10% to 75%+ utilization.'
    },
    nextSteps: [
      { step: 'Generate detailed asset list with locations', owner: 'Biomed Team', timeframe: 'Today' },
      { step: 'Coordinate with ICU/ED to schedule delivery', owner: 'Operations Manager', timeframe: '2 days' },
      { step: 'Tag and inspect assets for operational readiness', owner: 'Biomed Technicians', timeframe: '3 days' },
      { step: 'Cancel or defer capital purchase requests', owner: 'CFO / Capital Planning', timeframe: '1 week' }
    ],
    affectedAssets: [
      { id: 'AST-INF-234', name: 'Infusion Pump Model X1000', location: 'Storage B12' },
      { id: 'AST-BED-073', name: 'Hospital Bed - Electric', location: 'Storage B12' },
      { id: 'AST-INF-245', name: 'Infusion Pump Model X2000', location: 'Storage B12' }
    ],
    potentialSavings: 1400000,
    confidence: 94
  },
  {
    id: 'REC-002',
    action: 'Consolidate PAR levels in North Tower (reduce by 18%)',
    benefit: 'Save $480K annually',
    priority: 'high',
    icon: 'optimize',
    why: {
      rootCause: 'North Tower has 22% higher PAR levels than South Tower despite identical patient volume and acuity. This suggests over-stocking driven by historic purchasing patterns, not clinical need.',
      dataPoints: [
        'North Tower PAR: $2.8M inventory value',
        'South Tower PAR: $2.3M for same bed count & case mix',
        'North Tower stockout rate: 0.8% (below 1% target)',
        'Opportunity to reduce by $500K without impacting care'
      ],
      impact: 'Reducing North Tower PAR to match South Tower eliminates $480K in excess inventory, reduces expiration risk, and frees storage space.'
    },
    nextSteps: [
      { step: 'Audit North Tower PAR cabinets to identify excess SKUs', owner: 'Supply Chain Team', timeframe: '5 days' },
      { step: 'Redistribute excess to other units or return to vendor', owner: 'Materials Management', timeframe: '2 weeks' },
      { step: 'Adjust PAR levels in inventory system', owner: 'Supply Chain Director', timeframe: '2 weeks' },
      { step: 'Monitor stockout rates for 30 days to validate', owner: 'Operations', timeframe: 'Ongoing' }
    ],
    potentialSavings: 480000,
    confidence: 88
  },
  {
    id: 'REC-003',
    action: 'Fast-track repair of 28 high-value OR/Lab equipment units',
    benefit: 'Prevent downtime & avoid $650K rentals',
    priority: 'high',
    icon: 'repair',
    why: {
      rootCause: '28 critical assets (surgical lights, anesthesia machines, lab analyzers) have been in "Needs Repair" status for 12-45 days, creating OR schedule delays and forcing expensive equipment rentals.',
      dataPoints: [
        '12 assets awaiting parts (avg 18 days)',
        '8 assets in repair queue (avg 22 days)',
        '8 assets stuck in Biomed backlog (avg 31 days)',
        'OR rental costs: $2,500/day per unit'
      ],
      impact: 'Expediting repairs reduces OR downtime by 85 hours/month, eliminates $54K/month in rental costs, and improves surgical throughput by 12 cases/week.'
    },
    nextSteps: [
      { step: 'Prioritize parts orders for 12 pending assets', owner: 'Biomed Director', timeframe: 'Immediate' },
      { step: 'Assign overtime shifts to clear repair backlog', owner: 'Biomed Manager', timeframe: '1 week' },
      { step: 'Implement vendor escalation for critical parts', owner: 'Procurement', timeframe: '3 days' },
      { step: 'Return repaired assets to OR/Lab rotation', owner: 'Operations', timeframe: '10 days' }
    ],
    affectedAssets: [
      { id: 'AST-SRG-089', name: 'Surgical Light System', location: 'Biomed Shop' },
      { id: 'AST-ANS-045', name: 'Anesthesia Machine', location: 'Biomed Shop' },
      { id: 'AST-LAB-123', name: 'Chemistry Analyzer', location: 'Biomed Shop' }
    ],
    potentialSavings: 650000,
    confidence: 92
  },
  {
    id: 'REC-004',
    action: 'Re-route specimens via Tunnel B to reduce transit time',
    benefit: 'Improve turnaround time (TAT) by 14%',
    priority: 'medium',
    icon: 'optimize',
    why: {
      rootCause: 'Current courier route via Main Elevators adds 12-18 minutes to specimen transit due to elevator wait times during peak hours (7-10am, 2-5pm). Tunnel B route bypasses elevators.',
      dataPoints: [
        'Current avg TAT: 46 minutes (collection to lab)',
        'Elevator wait time: 8-15 minutes during peak',
        'Tunnel B route tested: 32-minute avg TAT',
        '17,850 specimens/day affected'
      ],
      impact: 'Reducing TAT by 14 minutes improves lab throughput, enables faster patient results, and reduces specimen degradation risk for time-sensitive tests.'
    },
    nextSteps: [
      { step: 'Update courier routing protocols and training', owner: 'Lab Operations Manager', timeframe: '3 days' },
      { step: 'Install additional RFID readers in Tunnel B', owner: 'IT / Biomed', timeframe: '1 week' },
      { step: 'Pilot new route with morning shift for 2 weeks', owner: 'Courier Supervisor', timeframe: '2 weeks' },
      { step: 'Roll out to all shifts if validated', owner: 'Lab Director', timeframe: '1 month' }
    ],
    potentialSavings: 0, // Operational improvement, not direct savings
    confidence: 85
  },
];

const getIcon = (icon: Recommendation['icon']) => {
  switch (icon) {
    case 'deploy': return ArrowRight;
    case 'repair': return Wrench;
    case 'optimize': return TrendingUp;
  }
};

const getPriorityColor = (priority: Recommendation['priority']) => {
  switch (priority) {
    case 'high': return 'bg-red-100 text-red-700 border-red-300';
    case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-300';
    case 'low': return 'bg-blue-100 text-blue-700 border-blue-300';
  }
};

export function AIRecommendationsPanel() {
  const [expandedRec, setExpandedRec] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedRec(expandedRec === id ? null : id);
  };

  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-semibold text-foreground tracking-tight flex items-center gap-2">
          <Target className="h-6 w-6 text-primary" />
          AI Recommendations to Optimize Operations
        </h2>
        <div className="text-sm text-muted-foreground">
          <span className="font-medium">{recommendations.length}</span> high-impact actions available
        </div>
      </div>
      
      <div className="space-y-4">
        {recommendations.map((rec) => {
          const Icon = getIcon(rec.icon);
          const isExpanded = expandedRec === rec.id;
          
          return (
            <div
              key={rec.id}
              className="border border-gray-200 rounded-2xl hover:border-primary/30 transition-all duration-200 overflow-hidden"
            >
              {/* Main Recommendation Card */}
              <div className="flex items-center justify-between p-6 bg-secondary/20 hover:bg-secondary/30 transition-colors">
                <div className="flex items-start gap-4 flex-1">
                  <Icon className="text-primary mt-1 text-lg shrink-0" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-base font-medium text-foreground">
                        {rec.action}
                      </p>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium border ${getPriorityColor(rec.priority)}`}>
                        {rec.priority}
                      </span>
                      {rec.confidence >= 90 && (
                        <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-green-100 text-green-700">
                          {rec.confidence}% confidence
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      {rec.benefit}
                    </p>
                    {rec.potentialSavings > 0 && (
                      <p className="text-sm font-semibold text-green-600">
                        Potential Annual Savings: ${(rec.potentialSavings / 1000).toFixed(0)}K
                      </p>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center gap-2 ml-6">
                  <button 
                    onClick={() => toggleExpand(rec.id)}
                    className="px-4 py-2 border border-gray-300 hover:bg-gray-50 rounded-lg text-sm font-medium transition-colors flex items-center gap-1"
                  >
                    <HelpCircle className="h-4 w-4" />
                    Why?
                    {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  </button>
                  <button className="px-6 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors whitespace-nowrap shadow-sm">
                    Apply
                  </button>
                </div>
              </div>

              {/* Expanded "Why" Section */}
              {isExpanded && (
                <div className="border-t bg-white p-6 space-y-6">
                  {/* Root Cause Analysis */}
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
                      🔍 Root Cause Analysis
                    </h4>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {rec.why.rootCause}
                    </p>
                  </div>

                  {/* Data Points */}
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
                      📊 Supporting Data
                    </h4>
                    <ul className="space-y-1">
                      {rec.why.dataPoints.map((point, idx) => (
                        <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                          <span className="text-primary mt-0.5">•</span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Impact */}
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
                      💡 Expected Impact
                    </h4>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {rec.why.impact}
                    </p>
                  </div>

                  {/* Affected Assets (if applicable) */}
                  {rec.affectedAssets && rec.affectedAssets.length > 0 && (
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
                        🏥 Affected Assets (Top 3)
                      </h4>
                      <div className="space-y-2">
                        {rec.affectedAssets.map((asset) => (
                          <div key={asset.id} className="flex items-center justify-between text-sm bg-gray-50 p-2 rounded">
                            <span className="font-medium text-gray-900">{asset.name}</span>
                            <span className="text-gray-600">{asset.location}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Next Steps */}
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      ✅ Implementation Plan
                    </h4>
                    <div className="space-y-3">
                      {rec.nextSteps.map((step, idx) => (
                        <div key={idx} className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                          <div className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold shrink-0">
                            {idx + 1}
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">{step.step}</p>
                            <div className="flex items-center gap-4 mt-1 text-xs text-gray-600">
                              <span>Owner: <span className="font-medium">{step.owner}</span></span>
                              <span>Timeline: <span className="font-medium">{step.timeframe}</span></span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
