'use client'

import { useState, useEffect } from 'react'
import { Sparkles, X, Send, ChevronDown, ChevronUp } from 'lucide-react'

interface SuggestedQuestion {
  id: string
  question: string
  answer: string
}

const suggestedQuestions: SuggestedQuestion[] = [
  {
    id: 'underutilized-assets',
    question: 'Which assets are underutilized today?',
    answer: `Based on today's data analysis:

**Top Underutilized Assets:**
• Infusion Pumps: 312 units at 42% utilization (target: 75%)
  - 181 pumps idle in storage for >48 hours
  - Estimated cost impact: $1.2M annual waste

• Wheelchairs: 89 units at 38% utilization
  - Primary bottleneck: ED storage overflow
  - 34 units "lost" between departments

• Vital Signs Monitors: 156 units at 51% utilization
  - Post-procedure return delays (avg 4.2 hours)
  - Equipment hoarding in ICU observed

**Recommended Actions:**
1. Redistribute 120 idle infusion pumps from Med/Surg to ED/ICU
2. Implement real-time location alerts for wheelchairs
3. Enforce 2-hour return policy for vital signs monitors

**Financial Impact:**
Optimizing these 3 categories alone could recover $1.8M annually in underutilized capital.`
  },
  {
    id: 'cost-savings',
    question: 'What cost savings have we achieved?',
    answer: `**Cost Savings Analysis - Month to Date:**

**Total Identified Savings: $4.8M (Annualized)**

**Breakdown by Category:**

**1. Asset Utilization Optimization** - $1.8M/year
• Reduced rental equipment needs by 42%
• Redeployed 312 underutilized assets
• Eliminated $148K in unnecessary purchases

**2. Maintenance Efficiency** - $1.2M/year
• Reduced unplanned downtime by 35%
• Time-to-locate decreased from 23 min → 4 min
• Prevented 8 emergency equipment failures ($85K each)

**3. Blood Wastage Prevention** - $940K/year
• Wastage rate: 2.1% (down from 4.3%)
• Early-expiry protocols saved 1,247 units
• Improved crossmatch ratio from 2.8:1 to 1.4:1

**4. Supply Chain Optimization** - $680K/year
• Reduced expired supplies by 67%
• Par level optimization freed $420K in working capital
• Vendor consolidation: 23% cost reduction

**5. Labor Efficiency** - $180K/year
• Equipment search time reduced by 78%
• Biomed staff productivity up 34%
• Reduced emergency courier usage by $15K/month

**Real-Time Impact This Week:**
• Monday: Prevented $12K ventilator emergency rental (found idle unit in storage)
• Tuesday: Avoided $8K in expired surgical supplies (early alert system)
• Wednesday: Redeployed 18 infusion pumps, saved $23K rental costs
• Thursday: Optimized blood crossmatch, reduced 47 unnecessary units
• Today: On track for $9K savings from proactive maintenance

**ROI Metrics:**
• Platform cost: $180K/year
• Savings: $4.8M/year
• ROI: 2,567%
• Payback period: 14 days

**Executive Summary:**
RTLS investment paying for itself 26x over. Primary value drivers: asset visibility (38%), wastage prevention (32%), and maintenance optimization (30%).`
  },
  {
    id: 'specimen-tracking',
    question: 'How is specimen tracking performing?',
    answer: `**Specimen Digitization Performance - Live:**

**Overall Coverage: 97.8%** ✓ (Target: >95%)
• Total specimens today: 2,847 samples
• Fully tracked: 2,784 samples
• Partial tracking: 48 samples
• No tracking: 15 samples (manual lab processes)

**Turnaround Time (TAT) Performance:**

**Blood Bank (RBC/Plasma):**
• Current TAT: 24 minutes (Target: <30 min)
• 94.2% within SLA ✓
• Bottleneck: Crossmatch validation (avg 8 min)

**Lab Medicine (Chemistry/Hematology):**
• Current TAT: 31 minutes (Target: <45 min)
• 96.8% within SLA ✓
• Peak processing: 8-11 AM (312 samples/hour)

**Microbiology:**
• Current TAT: 3.2 hours (Target: <4 hours)
• 89.4% within SLA ⚠️
• Culture prep bottleneck identified

**Chain of Custody Compliance:**
• Chain maintained: 96.2% (Industry best: 98%)
• Breaks detected: 108 instances this week
• Most common: Temperature excursion (transport delay)

**Critical Events (Last 24 Hours):**
• 3 stat specimens expedited (ED trauma)
• 1 specimen nearly lost (caught by RTLS alert)
• 0 wrong patient events (AI validation active)

**Department Breakdown:**
• ED: 847 specimens (99.1% tracking)
• ICU: 412 specimens (98.8% tracking)
• Med/Surg: 1,124 specimens (97.2% tracking)
• Outpatient: 464 specimens (96.1% tracking)

**Quality Metrics:**
• Mislabeled specimens: 2 (caught at first scan)
• Temperature violations: 5 (auto-alerts sent)
• Lost specimens: 0 (100% recovery this month)

**Workflow Insights:**
Average specimen journey:
1. Collection: 0 min
2. Transport to lab: 8.2 min (↓23% from last month)
3. Registration: 2.1 min
4. Processing: 18.4 min
5. Analysis: 12.8 min
6. Results: 2.5 min
Total: 44 minutes (↓18% improvement)

**Cost Impact:**
• Prevented specimen redraws: 47 this week ($8,800 saved)
• Reduced STAT courier usage: $4,200/month
• Improved lab efficiency: 2.3 FTE equivalent capacity gained

**Top Improvement Opportunity:**
Microbiology culture prep - adding 1 gateway between transport and prep station could reduce TAT by 22 minutes and improve SLA compliance to 97%+.`
  },
  {
    id: 'supply-chain',
    question: 'What supply chain issues should I know about?',
    answer: `**Supply Chain Intelligence - Current Status:**

**Critical Inventory Alerts:**

**Expiring in 7 Days:**
• Surgical Supplies: 24 units ($18,400 value at risk)
  - Suture kits: 12 units (OR preference cards)
  - Sterile drapes: 8 units (rarely used sizes)
  - Surgical gloves: 4 boxes (size 9.5 - low demand)

• Lab Reagents: 18 kits ($12,800 value)
  - Chemistry analyzer reagents: 8 kits
  - Blood culture media: 6 bottles
  - Rapid flu test kits: 4 boxes (seasonal drop)

**Action Status:**
✓ 18 items auto-transferred to partner facility (2-day expiry)
⚠️ 6 items flagged for emergency use protocols
⏳ 8 items pending consumption within 48 hours

**Stockout Risk (Next 72 Hours):**
1. **N95 Masks** - Medium Risk
   - Current: 2,847 units (3.2 days supply)
   - Reorder arriving Monday
   - Contingency: Alternative vendor on standby

2. **IV Catheters (22G)** - Low Risk
   - Current: 847 units (4.1 days)
   - High consumption in ED
   - Reorder in transit

3. **Sterile Gloves (Size 7)** - Critical
   - Current: 312 boxes (1.8 days)
   - OR demand spike this week
   - Emergency order placed

**Par Level Optimization:**
Overstocked items (capital recovery opportunity):
• Orthopedic implants: $284K excess inventory
• Specialized surgical kits: $127K (rarely used)
• Legacy equipment supplies: $89K (old models)

**Recommendation: Implement vendor-managed inventory for high-value, low-turnover items. Potential $420K working capital release.**

**Supply Transit Performance:**
• In-Transit Shipments: 47 orders
• On-Time Delivery Rate: 94.2%
• Average Delivery Time: 2.3 days
• Delayed Shipments: 3 (weather-related)

**Compliance Status:**
• Temperature-Controlled Items: 156 units tracked
• Cold Chain Violations: 0 this week ✓
• Expired Items Used: 0 (100% prevention)
• Lot Number Traceability: 99.8%

**Department-Specific Insights:**

**Operating Rooms:**
• Preference card accuracy: 87% (target: 95%)
• Wasted opened supplies: $12K/week
• Prime opportunity: Standardize cardiovascular kits

**Emergency Department:**
• High-turnover items: 67 SKUs
• Stockout events: 2 this month (both resolved <30 min)
• Recommended: Increase par levels for trauma supplies

**ICU:**
• Ventilator supplies: Healthy stock (8.4 days)
• IV pump consumables: Adequate (6.2 days)
• Monitor accessories: Reorder recommended (2.8 days)

**Financial Impact - This Month:**
• Prevented Waste: $47,200
• Avoided Stockouts: $23,800 (estimated procedure delays)
• Optimized Purchasing: $18,400
• Total Value: $89,400

**Strategic Recommendation:**
Deploy RFID tags on high-value surgical kits ($500+). Pilot shows 42% reduction in "lost" inventory and $180K annual savings potential.`
  }
]

// Helper function to parse and format the answer text
function formatAnswerText(text: string) {
  const lines = text.split('\n')
  const formatted: React.ReactElement[] = []
  let key = 0

  lines.forEach((line, index) => {
    // Bold headers (lines starting with **)
    if (line.startsWith('**') && line.endsWith('**')) {
      const content = line.replace(/\*\*/g, '')
      formatted.push(
        <h3 key={key++} className="text-base font-bold text-gray-900 mt-4 mb-2">
          {content}
        </h3>
      )
    }
    // Bold inline text (contains ** but not at start/end)
    else if (line.includes('**')) {
      const parts = line.split('**')
      formatted.push(
        <p key={key++} className="text-sm text-gray-700 mb-2">
          {parts.map((part, i) => 
            i % 2 === 1 ? <strong key={i} className="font-semibold text-gray-900">{part}</strong> : part
          )}
        </p>
      )
    }
    // Bullet points
    else if (line.startsWith('• ') || line.startsWith('  - ')) {
      const content = line.replace(/^[•\s-]+/, '')
      const isSubBullet = line.startsWith('  ')
      formatted.push(
        <li key={key++} className={`text-sm text-gray-700 mb-1 ${isSubBullet ? 'ml-6' : 'ml-0'}`}>
          {content}
        </li>
      )
    }
    // Numbered lists
    else if (/^\d+\./.test(line)) {
      const content = line.replace(/^\d+\.\s*/, '')
      formatted.push(
        <li key={key++} className="text-sm text-gray-700 mb-1 ml-4">
          {content}
        </li>
      )
    }
    // Status indicators
    else if (line.includes('✓') || line.includes('⚠️') || line.includes('⏳')) {
      formatted.push(
        <p key={key++} className="text-sm text-gray-700 mb-2 flex items-start gap-2">
          <span>{line}</span>
        </p>
      )
    }
    // Empty lines
    else if (line.trim() === '') {
      formatted.push(<div key={key++} className="h-2" />)
    }
    // Regular text
    else if (line.trim()) {
      formatted.push(
        <p key={key++} className="text-sm text-gray-700 mb-2">
          {line}
        </p>
      )
    }
  })

  return formatted
}

export function AIAssistantWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [selectedQuestion, setSelectedQuestion] = useState<SuggestedQuestion | null>(null)
  const [inputValue, setInputValue] = useState('')
  const [displayedText, setDisplayedText] = useState('')
  const [isTyping, setIsTyping] = useState(false)

  const handleQuestionClick = (question: SuggestedQuestion) => {
    setSelectedQuestion(question)
    setIsExpanded(true)
    setDisplayedText('')
    setIsTyping(true)
  }

  // Typing animation effect
  useEffect(() => {
    if (selectedQuestion && isTyping) {
      const fullText = selectedQuestion.answer
      let currentIndex = 0
      
      const typingInterval = setInterval(() => {
        if (currentIndex <= fullText.length) {
          setDisplayedText(fullText.slice(0, currentIndex))
          currentIndex += 3 // Speed of typing (characters per interval)
        } else {
          setIsTyping(false)
          clearInterval(typingInterval)
        }
      }, 10) // Interval speed in ms

      return () => clearInterval(typingInterval)
    }
  }, [selectedQuestion, isTyping])

  const handleBack = () => {
    setSelectedQuestion(null)
    setIsExpanded(false)
    setDisplayedText('')
    setIsTyping(false)
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 p-4 bg-gradient-to-r from-sky-600 to-sky-600 text-white rounded-full shadow-2xl hover:shadow-sky-500/50 hover:scale-110 transition-all group"
        title="AI Assistant"
      >
        <Sparkles className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
      </button>
    )
  }

  return (
    <div className={`fixed bottom-6 right-6 z-99 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden transition-all duration-300 ${
      isExpanded ? 'w-[600px] h-[600px]' : 'w-96 h-auto'
    }`}>
      {/* Header */}
      <div className="bg-gradient-to-r from-sky-600 to-sky-600 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">AI Assistant</h3>
            <p className="text-xs text-sky-100">
              {selectedQuestion ? 'Answer' : 'Ask about your data'}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {selectedQuestion && (
            <button
              onClick={handleBack}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <ChevronDown className="w-5 h-5 text-white" />
            </button>
          )}
          <button
            onClick={() => {
              setIsOpen(false)
              setSelectedQuestion(null)
              setIsExpanded(false)
            }}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>

      {/* Content */}
      {!selectedQuestion ? (
        <div className="p-6">          {/* Suggested Questions */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Popular Questions
            </h4>
            {suggestedQuestions.map((q) => (
              <button
                key={q.id}
                onClick={() => handleQuestionClick(q)}
                className="w-full text-left p-4 bg-gray-50 hover:bg-sky-50 border border-gray-200 hover:border-sky-300 rounded-xl transition-all group"
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-white rounded-lg border border-gray-200 group-hover:border-sky-300 transition-colors">
                    <Sparkles className="w-4 h-4 text-sky-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 group-hover:text-sky-700 transition-colors">
                      {q.question}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">Click for detailed analysis</p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Input (Disabled) */}
          <div className="mt-6">
            <div className="relative">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask anything..."
                className="w-full px-4 py-3 pr-12 bg-gray-100 border border-gray-200 rounded-xl text-sm text-gray-400 cursor-pointer"
              />
              <button
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-gray-300 text-gray-500 rounded-lg cursor-pointer"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-6 h-[calc(100%-80px)] overflow-y-auto">
          {/* Question */}
          <div className="mb-4 p-4 bg-sky-50 border border-sky-200 rounded-xl">
            <p className="text-sm font-semibold text-sky-900">
              {selectedQuestion.question}
            </p>
          </div>

          {/* Answer */}
          <div className="space-y-1 px-8">
            {formatAnswerText(displayedText)}
            {isTyping && (
              <span className="inline-block w-1 h-4 bg-sky-600 animate-pulse ml-1" />
            )}
          </div>

          {/* Ask Another Question */}
          {!isTyping && (
            <button
              onClick={handleBack}
              className="mt-6 w-full px-4 py-3 bg-sky-600 text-white font-medium rounded-xl hover:shadow-lg transition-all"
            >
              Ask Another Question
            </button>
          )}
        </div>
      )}
    </div>
  )
}
