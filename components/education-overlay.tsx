'use client'

import { useState } from 'react'
import { X, ChevronRight, ChevronLeft, BookOpen, Users, Clock } from 'lucide-react'
import { type EducationTopic, getEducationTopicById } from '@/lib/education-content'

interface EducationOverlayProps {
    topicId: string
    isOpen: boolean
    onClose: () => void
}

/**
 * Educational Overlay Component
 * 
 * R6.1: Storyboard-style explanations for training sales engineers and customer champions
 * Shows "How this works" content with slides, diagrams, and key takeaways
 */
export function EducationOverlay({ topicId, isOpen, onClose }: EducationOverlayProps) {
    const [currentSlide, setCurrentSlide] = useState(0)
    const topic = getEducationTopicById(topicId)

    if (!isOpen || !topic) return null

    const slide = topic.slides[currentSlide]
    const isFirstSlide = currentSlide === 0
    const isLastSlide = currentSlide === topic.slides.length - 1

    const handleNext = () => {
        if (!isLastSlide) {
            setCurrentSlide(prev => prev + 1)
        }
    }

    const handlePrevious = () => {
        if (!isFirstSlide) {
            setCurrentSlide(prev => prev - 1)
        }
    }

    const handleClose = () => {
        setCurrentSlide(0)
        onClose()
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            {/* Modal */}
            <div className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom duration-300">
                {/* Header */}
                <div className="bg-gradient-to-r from-neutral-600 to-neutral-500 px-8 py-6 text-white">
                    <div className="flex items-start justify-between">
                        <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                                    <BookOpen className="w-6 h-6" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold">{topic.title}</h2>
                                    <p className="text-indigo-100 text-sm">{topic.subtitle}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-6 mt-4 text-sm">
                                <div className="flex items-center gap-2">
                                    <Users className="w-4 h-4" />
                                    <span className="text-indigo-100">
                                        {topic.audience.map(a => a.replace('-', ' ')).join(', ')}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock className="w-4 h-4" />
                                    <span className="text-indigo-100">{topic.duration}</span>
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={handleClose}
                            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Progress Indicator */}
                    <div className="mt-4 flex gap-2">
                        {topic.slides.map((_, idx) => (
                            <div
                                key={idx}
                                className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                                    idx === currentSlide
                                        ? 'bg-white'
                                        : idx < currentSlide
                                        ? 'bg-white/60'
                                        : 'bg-white/20'
                                }`}
                            />
                        ))}
                    </div>
                </div>

                {/* Content Area */}
                <div className="px-8 py-6 overflow-y-auto max-h-[calc(90vh-240px)]">
                    {/* Slide Title */}
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                        {currentSlide + 1}. {slide.title}
                    </h3>

                    {/* Slide Content */}
                    <p className="text-gray-700 leading-relaxed mb-6">
                        {slide.content}
                    </p>

                    {/* Visual Content */}
                    {slide.visual && (
                        <div className="bg-gray-50 rounded-xl p-6 mb-6 border border-gray-200">
                            {renderVisual(slide.visual)}
                        </div>
                    )}

                    {/* Key Takeaway */}
                    {slide.keyTakeaway && (
                        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border-l-4 border-emerald-500 rounded-lg p-4">
                            <div className="flex items-start gap-3">
                                <div className="p-1.5 bg-emerald-500 rounded-lg mt-0.5">
                                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                                        <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div>
                                    <div className="text-xs font-semibold text-emerald-800 uppercase tracking-wider mb-1">
                                        Key Takeaway
                                    </div>
                                    <p className="text-sm text-emerald-900 font-medium">
                                        {slide.keyTakeaway}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer Navigation */}
                <div className="border-t border-gray-200 px-8 py-4 bg-gray-50 flex items-center justify-between">
                    <button
                        onClick={handlePrevious}
                        disabled={isFirstSlide}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                            isFirstSlide
                                ? 'text-gray-400 cursor-not-allowed'
                                : 'text-gray-700 hover:bg-gray-200'
                        }`}
                    >
                        <ChevronLeft className="w-5 h-5" />
                        Previous
                    </button>

                    <span className="text-sm text-gray-600">
                        Slide {currentSlide + 1} of {topic.slides.length}
                    </span>

                    {!isLastSlide ? (
                        <button
                            onClick={handleNext}
                            className="flex items-center gap-2 px-4 py-2 bg-neutral-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
                        >
                            Next
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    ) : (
                        <button
                            onClick={handleClose}
                            className="px-6 py-2 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors"
                        >
                            Got it!
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}

// Helper function to render different visual types
function renderVisual(visual: { type: 'diagram' | 'animation' | 'checklist' | 'comparison' | 'flow'; data: any }) {
    switch (visual.type) {
        case 'flow':
            return <FlowDiagram data={visual.data} />
        case 'comparison':
            return <ComparisonView data={visual.data} />
        case 'checklist':
            return <ChecklistView data={visual.data} />
        case 'diagram':
            return <DiagramView data={visual.data} />
        default:
            return <div className="text-gray-500 text-sm">Visual type not yet implemented</div>
    }
}

// Flow Diagram Component
function FlowDiagram({ data }: { data: { steps: any[] } }) {
    return (
        <div className="space-y-3">
            {data.steps.map((step: any, idx: number) => (
                <div key={idx} className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                        {idx + 1}
                    </div>
                    <div className="flex-1 bg-white border border-gray-200 rounded-lg p-3">
                        <div className="flex items-center justify-between">
                            <span className="font-medium text-gray-900">{step.label}</span>
                            {step.duration && (
                                <span className="text-sm text-gray-500">{step.duration}</span>
                            )}
                            {step.status && (
                                <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full">
                                    {step.status}
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

// Comparison View Component
function ComparisonView({ data }: { data: { scenarios: any[] } }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.scenarios.map((scenario: any, idx: number) => (
                <div key={idx} className="bg-white border-2 border-gray-200 rounded-xl p-5">
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        {scenario.label}
                    </h4>
                    <div className="space-y-2 text-sm">
                        {Object.entries(scenario).map(([key, value]) => {
                            if (key === 'label') return null
                            return (
                                <div key={key} className="flex justify-between">
                                    <span className="text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1')}:</span>
                                    <span className="font-medium text-gray-900">{value as string}</span>
                                </div>
                            )
                        })}
                    </div>
                </div>
            ))}
        </div>
    )
}

// Checklist View Component
function ChecklistView({ data }: { data: { items: any[] } }) {
    return (
        <div className="space-y-3">
            {data.items.map((item: any, idx: number) => (
                <div key={idx} className="flex items-start gap-3 bg-white border border-gray-200 rounded-lg p-4">
                    <div className="flex-shrink-0 w-6 h-6 bg-emerald-100 text-emerald-600 rounded flex items-center justify-center mt-0.5">
                        {item.checked !== false && (
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                        )}
                    </div>
                    <div className="flex-1">
                        <div className="font-medium text-gray-900">{item.label}</div>
                        {(item.implementation || item.impact || item.priority) && (
                            <div className="mt-1 flex flex-wrap gap-2 text-xs">
                                {item.implementation && (
                                    <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded">
                                        {item.implementation}
                                    </span>
                                )}
                                {item.impact && (
                                    <span className="text-gray-600">{item.impact}</span>
                                )}
                                {item.priority && (
                                    <span className={`px-2 py-1 rounded ${
                                        item.priority === 'High' ? 'bg-red-100 text-red-700' :
                                        item.priority === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                                        'bg-gray-100 text-gray-700'
                                    }`}>
                                        {item.priority}
                                    </span>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    )
}

// Diagram View Component
function DiagramView({ data }: { data: any }) {
    if (data.type === 'metrics') {
        return (
            <div className="grid grid-cols-2 gap-4">
                {data.stats.map((stat: any, idx: number) => (
                    <div key={idx} className="bg-white border border-gray-200 rounded-lg p-4">
                        <div className="text-xs text-gray-500 mb-2">{stat.label}</div>
                        <div className="flex items-baseline gap-3">
                            <div className="text-xl font-semibold text-red-600">{stat.before}</div>
                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                            <div className="text-xl font-semibold text-emerald-600">{stat.after}</div>
                        </div>
                        <div className="text-xs text-emerald-600 font-medium mt-1">
                            {stat.improvement} improvement
                        </div>
                    </div>
                ))}
            </div>
        )
    }

    return <div className="text-gray-500 text-sm">Diagram visualization</div>
}
