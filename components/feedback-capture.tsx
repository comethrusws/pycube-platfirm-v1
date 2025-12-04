'use client'

import { useState } from 'react'
import { 
    MessageSquare, Plus, X, Save, CheckCircle2, AlertTriangle, 
    Lightbulb, Quote, MessageCircle, TrendingUp, Tag, Clock, User
} from 'lucide-react'
import { 
    addFeedbackItem, 
    getCurrentSession,
    type FeedbackType, 
    type FeedbackSentiment, 
    type FeedbackPriority 
} from '@/lib/feedback-capture'

interface QuickCaptureButtonProps {
    className?: string
}

/**
 * Quick Capture Button (R6.6)
 * 
 * Floating button for quick feedback capture during demos
 * Minimal, non-intrusive design that doesn't interrupt flow
 */
export function QuickCaptureButton({ className = '' }: QuickCaptureButtonProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [content, setContent] = useState('')
    const [type, setType] = useState<FeedbackType>('quote')
    const [sentiment, setSentiment] = useState<FeedbackSentiment>('neutral')
    const [priority, setPriority] = useState<FeedbackPriority>('medium')
    const [tags, setTags] = useState<string>('')
    const [showSuccess, setShowSuccess] = useState(false)

    const session = getCurrentSession()

    const handleCapture = () => {
        if (!content.trim() || !session) return

        const item = addFeedbackItem({
            type,
            sentiment,
            priority,
            content: content.trim(),
            context: {
                persona: session.attendees[0]?.persona,
                customer: session.customer
            },
            tags: tags.split(',').map(t => t.trim()).filter(Boolean),
            actionable: priority === 'high' || priority === 'critical',
            createdBy: 'Sales Engineer'
        })

        if (item) {
            setContent('')
            setTags('')
            setShowSuccess(true)
            setTimeout(() => {
                setShowSuccess(false)
                setIsOpen(false)
            }, 1500)
        }
    }

    if (!session) return null

    if (!isOpen) {
        return (
            <button
                onClick={() => setIsOpen(true)}
                className={`fixed bottom-24 right-6 z-40 p-3 bg-indigo-600 text-white rounded-full shadow-lg hover:shadow-indigo-500/50 hover:scale-105 transition-all ${className}`}
                title="Quick Capture Feedback"
            >
                <MessageSquare className="w-5 h-5" />
            </button>
        )
    }

    if (showSuccess) {
        return (
            <div className="fixed bottom-24 right-6 z-40 bg-emerald-600 text-white rounded-2xl shadow-xl p-4 flex items-center gap-3 animate-in slide-in-from-bottom duration-300">
                <CheckCircle2 className="w-5 h-5" />
                <span className="font-medium">Captured!</span>
            </div>
        )
    }

    return (
        <div className="fixed bottom-24 right-6 z-40 w-96 bg-white rounded-2xl shadow-2xl border-2 border-indigo-200 overflow-hidden animate-in slide-in-from-bottom duration-300">
            {/* Header */}
            <div className="bg-indigo-600 px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-white" />
                    <h3 className="text-sm font-bold text-white">Quick Capture</h3>
                </div>
                <button
                    onClick={() => setIsOpen(false)}
                    className="p-1 hover:bg-white/20 rounded transition-colors"
                >
                    <X className="w-4 h-4 text-white" />
                </button>
            </div>

            {/* Content */}
            <div className="p-4 space-y-3">
                {/* Type Selector */}
                <div className="flex gap-2 flex-wrap">
                    {[
                        { value: 'quote' as FeedbackType, icon: Quote, label: 'Quote', color: 'text-blue-600' },
                        { value: 'pain-point' as FeedbackType, icon: AlertTriangle, label: 'Pain', color: 'text-red-600' },
                        { value: 'win' as FeedbackType, icon: TrendingUp, label: 'Win', color: 'text-emerald-600' },
                        { value: 'feature-request' as FeedbackType, icon: Lightbulb, label: 'Feature', color: 'text-purple-600' },
                    ].map((t) => {
                        const Icon = t.icon
                        const isSelected = type === t.value
                        return (
                            <button
                                key={t.value}
                                onClick={() => setType(t.value)}
                                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border-2 text-xs font-semibold transition-all ${
                                    isSelected
                                        ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                                        : 'border-gray-200 text-gray-600 hover:border-indigo-300'
                                }`}
                            >
                                <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-indigo-600' : t.color}`} />
                                {t.label}
                            </button>
                        )
                    })}
                </div>

                {/* Content Input */}
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="What did they say or react to?"
                    className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg text-sm focus:border-indigo-500 focus:outline-none resize-none"
                    rows={3}
                />

                {/* Sentiment & Priority */}
                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className="text-xs font-semibold text-gray-700 mb-1 block">Sentiment</label>
                        <select
                            value={sentiment}
                            onChange={(e) => setSentiment(e.target.value as FeedbackSentiment)}
                            className="w-full px-2 py-1.5 border-2 border-gray-200 rounded-lg text-xs focus:border-indigo-500 focus:outline-none"
                        >
                            <option value="positive">👍 Positive</option>
                            <option value="neutral">😐 Neutral</option>
                            <option value="negative">👎 Negative</option>
                        </select>
                    </div>
                    <div>
                        <label className="text-xs font-semibold text-gray-700 mb-1 block">Priority</label>
                        <select
                            value={priority}
                            onChange={(e) => setPriority(e.target.value as FeedbackPriority)}
                            className="w-full px-2 py-1.5 border-2 border-gray-200 rounded-lg text-xs focus:border-indigo-500 focus:outline-none"
                        >
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                            <option value="critical">🔥 Critical</option>
                        </select>
                    </div>
                </div>

                {/* Tags */}
                <div>
                    <label className="text-xs font-semibold text-gray-700 mb-1 block">Tags (comma-separated)</label>
                    <input
                        type="text"
                        value={tags}
                        onChange={(e) => setTags(e.target.value)}
                        placeholder="e.g., pricing, integration, ui"
                        className="w-full px-3 py-1.5 border-2 border-gray-200 rounded-lg text-xs focus:border-indigo-500 focus:outline-none"
                    />
                </div>

                {/* Save Button */}
                <button
                    onClick={handleCapture}
                    disabled={!content.trim()}
                    className="w-full py-2.5 bg-indigo-600 text-white rounded-lg font-semibold text-sm hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
                >
                    <Save className="w-4 h-4" />
                    Capture Feedback
                </button>
            </div>
        </div>
    )
}

interface FeedbackSessionViewerProps {
    className?: string
}

/**
 * Feedback Session Viewer (R6.6)
 * 
 * View captured feedback from current or past demo sessions
 * Helps product team review and prioritize improvements
 */
export function FeedbackSessionViewer({ className = '' }: FeedbackSessionViewerProps) {
    const session = getCurrentSession()
    const [filter, setFilter] = useState<'all' | FeedbackType>('all')

    if (!session) {
        return (
            <div className={`bg-gray-50 border-2 border-gray-200 rounded-xl p-8 text-center ${className}`}>
                <MessageCircle className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-sm text-gray-600 font-medium">No active demo session</p>
                <p className="text-xs text-gray-500 mt-1">Start a session to capture feedback</p>
            </div>
        )
    }

    const filteredItems = filter === 'all' 
        ? session.feedbackItems 
        : session.feedbackItems.filter(f => f.type === filter)

    return (
        <div className={`bg-white border-2 border-gray-200 rounded-xl overflow-hidden ${className}`}>
            {/* Header */}
            <div className="bg-indigo-600 px-6 py-4">
                <div className="flex items-center justify-between mb-3">
                    <div>
                        <h3 className="text-lg font-bold text-white">Session Feedback</h3>
                        <p className="text-xs text-indigo-100">{session.customer}</p>
                    </div>
                    <div className="text-right">
                        <div className="text-2xl font-bold text-white">{session.feedbackItems.length}</div>
                        <div className="text-xs text-indigo-100">items captured</div>
                    </div>
                </div>

                {/* Filter Tabs */}
                <div className="flex gap-2 overflow-x-auto">
                    {[
                        { value: 'all' as const, label: 'All' },
                        { value: 'quote' as const, label: 'Quotes' },
                        { value: 'pain-point' as const, label: 'Pains' },
                        { value: 'win' as const, label: 'Wins' },
                        { value: 'feature-request' as const, label: 'Features' },
                    ].map((f) => (
                        <button
                            key={f.value}
                            onClick={() => setFilter(f.value)}
                            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                                filter === f.value
                                    ? 'bg-white text-indigo-600'
                                    : 'bg-indigo-500 text-white hover:bg-indigo-400'
                            }`}
                        >
                            {f.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Feedback Items */}
            <div className="max-h-96 overflow-y-auto p-4 space-y-3">
                {filteredItems.length === 0 ? (
                    <div className="text-center py-8">
                        <p className="text-sm text-gray-500">No feedback captured yet</p>
                    </div>
                ) : (
                    filteredItems.map((item) => (
                        <div key={item.id} className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                            <div className="flex items-start justify-between mb-2">
                                <div className="flex items-center gap-2">
                                    {item.type === 'quote' && <Quote className="w-4 h-4 text-blue-600" />}
                                    {item.type === 'pain-point' && <AlertTriangle className="w-4 h-4 text-red-600" />}
                                    {item.type === 'win' && <TrendingUp className="w-4 h-4 text-emerald-600" />}
                                    {item.type === 'feature-request' && <Lightbulb className="w-4 h-4 text-purple-600" />}
                                    <span className="text-xs font-semibold text-gray-700 capitalize">
                                        {item.type.replace('-', ' ')}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                                        item.sentiment === 'positive' ? 'bg-emerald-100 text-emerald-700' :
                                        item.sentiment === 'negative' ? 'bg-red-100 text-red-700' :
                                        'bg-gray-100 text-gray-700'
                                    }`}>
                                        {item.sentiment === 'positive' ? '👍' : item.sentiment === 'negative' ? '👎' : '😐'}
                                    </span>
                                    <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                                        item.priority === 'critical' ? 'bg-red-100 text-red-700' :
                                        item.priority === 'high' ? 'bg-orange-100 text-orange-700' :
                                        item.priority === 'medium' ? 'bg-blue-100 text-blue-700' :
                                        'bg-gray-100 text-gray-700'
                                    }`}>
                                        {item.priority}
                                    </span>
                                </div>
                            </div>
                            <p className="text-sm text-gray-700 mb-2">{item.content}</p>
                            {item.tags.length > 0 && (
                                <div className="flex flex-wrap gap-1">
                                    {item.tags.map((tag, idx) => (
                                        <span key={idx} className="text-xs px-2 py-0.5 bg-indigo-100 text-indigo-700 rounded-full">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            )}
                            <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                                <div className="flex items-center gap-1">
                                    <Clock className="w-3 h-3" />
                                    {new Date(item.timestamp).toLocaleTimeString()}
                                </div>
                                {item.context.persona && (
                                    <div className="flex items-center gap-1">
                                        <User className="w-3 h-3" />
                                        {item.context.persona}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}
