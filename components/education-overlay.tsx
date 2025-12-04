'use client';

/**
 * Education Overlay Component
 * Embedded training and "How This Works" explanations
 * Requirements: R6.1, R6.2 - Storyboard education layer
 */

import { useState } from 'react';
import { X, BookOpen, Lightbulb, ArrowRight, Wifi, CheckCircle, WifiHigh } from 'lucide-react';

interface EducationTopic {
  id: string;
  title: string;
  category: 'utilization' | 'gateway' | 'workflow' | 'roi';
  icon: any;
  description: string;
  content: {
    sections: {
      heading: string;
      content: string;
      visual?: string;
    }[];
    keyTakeaways: string[];
  };
}

const educationTopics: EducationTopic[] = [
  {
    id: 'understanding-utilization',
    title: 'Understanding Asset Utilization',
    category: 'utilization',
    icon: BookOpen,
    description: 'Learn how we track asset lifecycle and calculate utilization rates',
    content: {
      sections: [
        {
          heading: 'What is Asset Utilization?',
          content: 'Asset utilization measures how much time an asset spends being productively used versus sitting idle. It\'s calculated as (Time in "In Use" status / Total Available Time) × 100.',
        },
        {
          heading: 'The Asset Lifecycle',
          content: 'Assets move through defined states: Clean → In Use → Soiled → Needs Repair → Repaired → Needs Sanitization → Sanitized. Each transition is timestamped and location-tracked via RFID.',
          visual: 'lifecycle-diagram'
        },
        {
          heading: 'Why Location Matters',
          content: 'An asset sitting in basement storage for 45 days has 0% utilization. By tracking location changes, we identify "stuck" assets that can be redeployed to high-demand units, avoiding unnecessary purchases.',
        },
        {
          heading: 'Bottleneck Detection',
          content: 'If an asset spends >4 hours in "Soiled" or >2 days in "Needs Repair", the system flags it as a bottleneck. These patterns reveal process issues (e.g., sanitization backlog, Biomed staffing gaps).',
        }
      ],
      keyTakeaways: [
        'Utilization below 30% suggests redeployment opportunity',
        'Location tracking reveals hidden inventory in storage',
        'Bottlenecks point to process improvements (not more assets)',
        'Typical hospital: 30-40% of assets underutilized = $3-5M trapped capital'
      ]
    }
  },
  {
    id: 'gateway-placement',
    title: 'Gateway Placement: Wi-Fi Carpet vs Highway Toll Booths',
    category: 'gateway',
    icon: Wifi,
    description: 'Why RTLS gateway design differs from Wi-Fi networks',
    content: {
      sections: [
        {
          heading: 'The Wrong Mental Model: Wi-Fi Carpet',
          content: 'Many assume RTLS works like Wi-Fi—blanket every room with signal coverage. This is expensive and unnecessary. RTLS tracks movement, not connectivity.',
        },
        {
          heading: 'The Right Mental Model: Highway Toll Booths',
          content: 'Think of gateways as toll booths on a highway. You don\'t need a toll booth every 10 feet—you place them at strategic choke points (doorways, hallways, elevators) to capture all traffic.',
          visual: 'toll-booth-diagram'
        },
        {
          heading: 'Strategic Placement Zones',
          content: 'Gateways are placed at: (1) Department entry/exit points, (2) Central sterile intake/output, (3) Elevator banks, (4) Loading docks, (5) Biomed shop. This captures 98%+ of asset movements at 1/5th the cost of "Wi-Fi carpet" designs.',
        },
        {
          heading: 'Coverage vs. Visibility',
          content: 'We aim for 95%+ read success at transition points, not 100% room-level coverage. If an asset is "in ICU" and hasn\'t moved for 3 days, pinpointing it to Room 324 vs Room 325 doesn\'t change the action: "It\'s available in ICU."',
        }
      ],
      keyTakeaways: [
        'Choke-point gateways capture 98%+ movements at 20% of blanket Wi-Fi cost',
        'Movement tracking ≠ continuous connectivity',
        'Over-engineering coverage wastes budget without improving decisions',
        'Strategic placement: doorways, not every room'
      ]
    }
  },
  {
    id: 'digitize-analyze-optimize',
    title: '3-Level Flow: Digitize → Analyze → Optimize',
    category: 'workflow',
    icon: ArrowRight,
    description: 'How the platform transforms hospital operations in three stages',
    content: {
      sections: [
        {
          heading: 'Level 1: Digitize',
          content: 'Tag assets, specimens, and supplies with RFID. Deploy gateways at strategic choke points. Capture 95%+ of movements automatically—no manual scanning. This is the foundation: "You can\'t manage what you can\'t see."',
        },
        {
          heading: 'Level 2: Analyze',
          content: 'Once digitized, AI analyzes patterns: Which assets are underutilized? Where are bottlenecks (e.g., assets stuck in repair for 20 days)? Which departments hoard equipment? Where do specimens experience custody breaks?',
        },
        {
          heading: 'Level 3: Optimize',
          content: 'AI translates analysis into actions: "Redeploy 12 beds from Storage to ED → avoid $144K purchase." "Fast-track 8 surgical lights in repair → eliminate $20K/month rentals." This is where $4-6M annual savings materialize.',
          visual: '3-tier-diagram'
        },
        {
          heading: 'The Flywheel Effect',
          content: 'As more workflows digitize, AI insights compound. Specimen tracking + asset location + supply chain data = cross-domain optimizations (e.g., "Lab reagent waste correlates with missing temperature probes in Storage Room B").',
        }
      ],
      keyTakeaways: [
        'Digitize = visibility (95%+ automated tracking)',
        'Analyze = insights (AI finds patterns humans miss)',
        'Optimize = savings (actionable recommendations, not just dashboards)',
        'Platform effect: More domains digitized = exponential insight value'
      ]
    }
  },
  {
    id: 'roi-justification',
    title: 'ROI Justification for Executives',
    category: 'roi',
    icon: CheckCircle,
    description: 'How to explain value to CFOs, CTOs, and Boards',
    content: {
      sections: [
        {
          heading: 'The $4-6M Annual Value Story',
          content: 'Typical 500-bed hospital sees: $1.2M rental avoidance (locating assets in minutes, not hours), $2.8M capital deferral (redeploying underutilized assets), $540K expiration avoidance (supply chain visibility), $1M+ in operational efficiency (faster specimen TAT, reduced staff search time).',
        },
        {
          heading: 'Payback Period: 6-12 Months',
          content: 'RTLS investment: $800K-$1.5M (tags, gateways, software). Year 1 savings: $4-6M. This is a 3-5X first-year ROI, rare in healthcare IT. By Year 2, savings are pure margin improvement.',
        },
        {
          heading: 'Beyond Direct Savings: Risk Mitigation',
          content: 'Chain of custody compliance avoids $500K+ lawsuit risk per specimen error. PM completion prevents Joint Commission findings ($100K+ penalties). Blood bank traceability = zero transfusion errors (priceless for CMO/Quality).',
        },
        {
          heading: 'The Strategic Case',
          content: 'RTLS isn\'t just cost savings—it\'s strategic infrastructure. Enables future initiatives: (1) Predictive maintenance, (2) AI-driven staffing models, (3) Real-time patient flow optimization, (4) Supply chain resilience during shortages.',
        }
      ],
      keyTakeaways: [
        '$4-6M annual savings for 500-bed hospital (8-10X ROI)',
        '6-12 month payback, then pure margin improvement',
        'Risk mitigation: compliance, patient safety, regulatory',
        'Strategic platform for future AI/automation initiatives'
      ]
    }
  },
];

interface EducationOverlayProps {
  initialTopic?: string;
  onClose: () => void;
}

export function EducationOverlay({ initialTopic, onClose }: EducationOverlayProps) {
  const [selectedTopic, setSelectedTopic] = useState(
    initialTopic || educationTopics[0].id
  );

  const topic = educationTopics.find(t => t.id === selectedTopic) || educationTopics[0];
  const Icon = topic.icon;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div 
        className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden flex"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sidebar */}
        <div className="w-72 bg-linear-to-br from-blue-50 to-indigo-50 p-6 border-r overflow-y-auto">
          <div className="flex items-center gap-2 mb-6">
            <Lightbulb className="h-6 w-6 text-blue-600" />
            <h2 className="text-lg font-bold text-gray-900">Learn How It Works</h2>
          </div>

          <div className="space-y-2">
            {educationTopics.map((t) => {
              const TopicIcon = t.icon;
              return (
                <button
                  key={t.id}
                  onClick={() => setSelectedTopic(t.id)}
                  className={`w-full text-left p-3 rounded-lg transition-all ${
                    selectedTopic === t.id
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'hover:bg-white/50 text-gray-700'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <TopicIcon className="h-4 w-4" />
                    <span className="font-semibold text-sm">{t.title}</span>
                  </div>
                  <p className={`text-xs ${
                    selectedTopic === t.id ? 'text-blue-100' : 'text-gray-600'
                  }`}>
                    {t.description}
                  </p>
                </button>
              );
            })}
          </div>

          <div className="mt-8 p-4 bg-white/50 rounded-lg">
            <p className="text-xs text-gray-600">
              💡 <strong>Pro Tip:</strong> These training materials can be shared with your internal champions, board members, and new staff.
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b bg-white">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Icon className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">{topic.title}</h3>
                <p className="text-sm text-gray-600">{topic.description}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {topic.content.sections.map((section, idx) => (
              <div key={idx} className="space-y-2">
                <h4 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <span className="flex items-center justify-center w-6 h-6 bg-blue-600 text-white text-xs font-bold rounded-full">
                    {idx + 1}
                  </span>
                  {section.heading}
                </h4>
                <p className="text-gray-700 leading-relaxed ml-8">
                  {section.content}
                </p>

                {/* Visual placeholders */}
                {section.visual === 'lifecycle-diagram' && (
                  <div className="ml-8 mt-4 p-6 bg-linear-to-r from-green-50 to-blue-50 rounded-lg border-2 border-dashed border-blue-300">
                    <div className="flex items-center justify-between text-sm">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center text-white font-bold mb-2">
                          Clean
                        </div>
                        <div className="text-xs text-gray-600">2 hrs</div>
                      </div>
                      <ArrowRight className="text-gray-400" />
                      <div className="text-center">
                        <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold mb-2">
                          In Use
                        </div>
                        <div className="text-xs text-gray-600">8 hrs</div>
                      </div>
                      <ArrowRight className="text-gray-400" />
                      <div className="text-center">
                        <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center text-white font-bold mb-2">
                          Soiled
                        </div>
                        <div className="text-xs text-gray-600">1 hr</div>
                      </div>
                      <ArrowRight className="text-gray-400" />
                      <div className="text-center">
                        <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center text-white font-bold mb-2">
                          Sanitized
                        </div>
                        <div className="text-xs text-gray-600">30 min</div>
                      </div>
                    </div>
                  </div>
                )}

                {section.visual === 'toll-booth-diagram' && (
                  <div className="ml-8 mt-4 p-6 bg-linear-to-r from-purple-50 to-pink-50 rounded-lg border-2 border-dashed border-purple-300">
                    <div className="grid grid-cols-2 gap-6">
                      <div className="text-center">
                        <WifiHigh className="h-12 w-12 mx-auto mb-2 text-red-600" />
                        <div className="font-semibold text-red-700">❌ Wi-Fi Carpet</div>
                        <div className="text-xs text-gray-600 mt-1">Gateways everywhere = $$$</div>
                      </div>
                      <div className="text-center">
                        <Wifi className="h-12 w-12 mx-auto mb-2 text-green-600" />
                        <div className="font-semibold text-green-700">✓ Choke Points</div>
                        <div className="text-xs text-gray-600 mt-1">Strategic placement = 98% coverage</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* Key Takeaways */}
            <div className="mt-8 p-6 bg-green-50 rounded-lg border-2 border-green-200">
              <h4 className="text-lg font-semibold text-green-900 mb-3 flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                Key Takeaways
              </h4>
              <ul className="space-y-2">
                {topic.content.keyTakeaways.map((takeaway, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-green-800">
                    <span className="text-green-600 font-bold mt-0.5">✓</span>
                    <span>{takeaway}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
