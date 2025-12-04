'use client'

import { useState } from 'react'
import { User, ChevronDown, CheckCircle2, Target, TrendingUp, Lightbulb } from 'lucide-react'
import { type Persona, getPersonaConfig, getAllPersonas } from '@/lib/demo-mode'

interface PersonaSelectorProps {
    selectedPersona: Persona | null
    onPersonaChange: (persona: Persona) => void
    className?: string
}

/**
 * Persona Selector Component (R6.5)
 * 
 * Allows sales engineers to switch between stakeholder personas during demos
 * Each persona has pre-configured focus areas, talking points, and demo flows
 */
export function PersonaSelector({ selectedPersona, onPersonaChange, className = '' }: PersonaSelectorProps) {
    const [isOpen, setIsOpen] = useState(false)
    const personas = getAllPersonas()
    const currentPersona = selectedPersona ? getPersonaConfig(selectedPersona) : null

    return (
        <div className={`relative ${className}`}>
            {/* Selector Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-3 px-4 py-3 bg-white border border-gray-200 rounded-xl hover:border-indigo-300 hover:shadow-md transition-all w-full"
            >
                <div className="p-2 bg-indigo-100 rounded-lg">
                    <User className="w-5 h-5 text-indigo-600" />
                </div>
                <div className="flex-1 text-left">
                    <div className="text-xs text-gray-500 font-medium uppercase tracking-wider">Demo Persona</div>
                    <div className="text-sm font-semibold text-gray-900">
                        {currentPersona ? currentPersona.title : 'Select Stakeholder'}
                    </div>
                </div>
                <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown */}
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <div 
                        className="fixed inset-0 z-40" 
                        onClick={() => setIsOpen(false)}
                    />
                    
                    {/* Dropdown Panel */}
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-2xl z-50 overflow-hidden">
                        <div className="p-3 bg-gradient-to-r from-indigo-50 to-purple-50 border-b border-gray-200">
                            <div className="text-xs font-semibold text-indigo-900 uppercase tracking-wider">
                                Select Demo Persona
                            </div>
                            <div className="text-xs text-gray-600 mt-1">
                                Customize demo flow and talking points for different stakeholders
                            </div>
                        </div>
                        
                        <div className="max-h-96 overflow-y-auto">
                            {personas.map((persona) => {
                                const isSelected = selectedPersona === persona.id
                                return (
                                    <button
                                        key={persona.id}
                                        onClick={() => {
                                            onPersonaChange(persona.id)
                                            setIsOpen(false)
                                        }}
                                        className={`w-full text-left p-4 border-b border-gray-100 hover:bg-indigo-50 transition-colors ${
                                            isSelected ? 'bg-indigo-50' : ''
                                        }`}
                                    >
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className="text-sm font-semibold text-gray-900">
                                                        {persona.title}
                                                    </span>
                                                    {isSelected && (
                                                        <CheckCircle2 className="w-4 h-4 text-indigo-600" />
                                                    )}
                                                </div>
                                                <div className="text-xs text-gray-600 mb-2">
                                                    {persona.description}
                                                </div>
                                                <div className="flex flex-wrap gap-1">
                                                    {persona.primaryDomains.slice(0, 3).map((domain) => (
                                                        <span 
                                                            key={domain}
                                                            className="text-xs px-2 py-0.5 bg-indigo-100 text-indigo-700 rounded-full"
                                                        >
                                                            {domain}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </button>
                                )
                            })}
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}

interface PersonaInsightsPanelProps {
    persona: Persona
    className?: string
}

/**
 * Persona Insights Panel (R6.5)
 * 
 * Displays real-time demo guidance for selected persona:
 * - Pain points to address
 * - Success metrics to highlight
 * - Talking points for this stakeholder
 * - Recommended demo flow
 */
export function PersonaInsightsPanel({ persona, className = '' }: PersonaInsightsPanelProps) {
    const config = getPersonaConfig(persona)
    const [activeTab, setActiveTab] = useState<'pain' | 'metrics' | 'talking' | 'flow'>('pain')

    return (
        <div className={`bg-gradient-to-br from-indigo-50 to-purple-50 border-2 border-indigo-200 rounded-2xl p-6 ${className}`}>
            {/* Header */}
            <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-indigo-600 rounded-lg">
                    <Lightbulb className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                    <div className="text-sm font-semibold text-indigo-900">Demo Guidance</div>
                    <div className="text-xs text-indigo-600">
                        Tailored for {config.title}
                    </div>
                </div>
            </div>

            {/* Tab Navigation */}
            <div className="flex gap-2 mb-4 border-b border-indigo-200">
                <button
                    onClick={() => setActiveTab('pain')}
                    className={`px-3 py-2 text-xs font-semibold transition-all ${
                        activeTab === 'pain'
                            ? 'text-indigo-700 border-b-2 border-indigo-600'
                            : 'text-gray-600 hover:text-indigo-600'
                    }`}
                >
                    Pain Points
                </button>
                <button
                    onClick={() => setActiveTab('metrics')}
                    className={`px-3 py-2 text-xs font-semibold transition-all ${
                        activeTab === 'metrics'
                            ? 'text-indigo-700 border-b-2 border-indigo-600'
                            : 'text-gray-600 hover:text-indigo-600'
                    }`}
                >
                    Success Metrics
                </button>
                <button
                    onClick={() => setActiveTab('talking')}
                    className={`px-3 py-2 text-xs font-semibold transition-all ${
                        activeTab === 'talking'
                            ? 'text-indigo-700 border-b-2 border-indigo-600'
                            : 'text-gray-600 hover:text-indigo-600'
                    }`}
                >
                    Talking Points
                </button>
                <button
                    onClick={() => setActiveTab('flow')}
                    className={`px-3 py-2 text-xs font-semibold transition-all ${
                        activeTab === 'flow'
                            ? 'text-indigo-700 border-b-2 border-indigo-600'
                            : 'text-gray-600 hover:text-indigo-600'
                    }`}
                >
                    Demo Flow
                </button>
            </div>

            {/* Content */}
            <div className="space-y-2 max-h-64 overflow-y-auto">
                {activeTab === 'pain' && (
                    <>
                        <div className="text-xs font-semibold text-indigo-900 mb-2 flex items-center gap-2">
                            <Target className="w-4 h-4" />
                            What Keeps Them Up at Night
                        </div>
                        {config.painPoints.map((point, idx) => (
                            <div key={idx} className="flex items-start gap-2 p-2 bg-white/60 rounded-lg">
                                <div className="w-5 h-5 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-xs font-semibold shrink-0 mt-0.5">
                                    {idx + 1}
                                </div>
                                <span className="text-xs text-gray-700">{point}</span>
                            </div>
                        ))}
                    </>
                )}

                {activeTab === 'metrics' && (
                    <>
                        <div className="text-xs font-semibold text-indigo-900 mb-2 flex items-center gap-2">
                            <TrendingUp className="w-4 h-4" />
                            How They Measure Success
                        </div>
                        {config.successMetrics.map((metric, idx) => (
                            <div key={idx} className="flex items-start gap-2 p-2 bg-white/60 rounded-lg">
                                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                                <span className="text-xs text-gray-700 font-medium">{metric}</span>
                            </div>
                        ))}
                    </>
                )}

                {activeTab === 'talking' && (
                    <>
                        <div className="text-xs font-semibold text-indigo-900 mb-2">
                            Key Messages for This Stakeholder
                        </div>
                        {config.talkingPoints.map((point, idx) => (
                            <div key={idx} className="p-2 bg-white/60 rounded-lg">
                                <span className="text-xs text-gray-700">{point}</span>
                            </div>
                        ))}
                    </>
                )}

                {activeTab === 'flow' && (
                    <>
                        <div className="text-xs font-semibold text-indigo-900 mb-2">
                            Recommended Demo Sequence
                        </div>
                        {config.demoFlow.map((step, idx) => (
                            <div key={idx} className="flex items-start gap-3 p-2 bg-white/60 rounded-lg">
                                <div className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-bold shrink-0">
                                    {idx + 1}
                                </div>
                                <span className="text-xs text-gray-700">{step.replace(/^\d+\.\s*/, '')}</span>
                            </div>
                        ))}
                    </>
                )}
            </div>
        </div>
    )
}
