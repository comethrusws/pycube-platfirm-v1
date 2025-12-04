'use client'

import { useState } from 'react'
import { 
    MessageSquare, TrendingUp, AlertTriangle, Lightbulb, Quote,
    Download, Filter, Search, Calendar, User, Tag, BarChart3
} from 'lucide-react'
import { 
    getAllSessions, 
    getAllFeedbackItems,
    getFeedbackStats,
    getFeedbackByType,
    getFeedbackByPriority,
    getActionableFeedback,
    exportFeedback,
    type FeedbackType,
    type FeedbackPriority
} from '@/lib/feedback-capture'

export default function FeedbackReviewDashboard() {
    const [filterType, setFilterType] = useState<'all' | FeedbackType>('all')
    const [filterPriority, setFilterPriority] = useState<'all' | FeedbackPriority>('all')
    const [searchQuery, setSearchQuery] = useState('')

    const sessions = getAllSessions()
    const allFeedback = getAllFeedbackItems()
    const stats = getFeedbackStats()

    // Apply filters
    let filteredFeedback = allFeedback
    if (filterType !== 'all') {
        filteredFeedback = filteredFeedback.filter(f => f.type === filterType)
    }
    if (filterPriority !== 'all') {
        filteredFeedback = filteredFeedback.filter(f => f.priority === filterPriority)
    }
    if (searchQuery) {
        filteredFeedback = filteredFeedback.filter(f => 
            f.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
            f.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
        )
    }

    const handleExport = () => {
        const data = exportFeedback()
        const blob = new Blob([data], { type: 'application/json' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `feedback-export-${new Date().toISOString().split('T')[0]}.json`
        a.click()
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-8 py-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">Feedback Review</h1>
                            <p className="text-gray-600">Insights from demo sessions and customer conversations</p>
                        </div>
                        <button
                            onClick={handleExport}
                            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
                        >
                            <Download className="w-4 h-4" />
                            Export Data
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-8 py-8">
                {/* Stats Grid */}
                <div className="grid grid-cols-4 gap-6 mb-8">
                    <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
                        <div className="flex items-center justify-between mb-2">
                            <MessageSquare className="w-8 h-8 text-blue-600" />
                            <span className="text-sm text-gray-500">Total</span>
                        </div>
                        <div className="text-3xl font-bold text-gray-900">{stats.total}</div>
                        <div className="text-sm text-gray-600 mt-1">Feedback Items</div>
                    </div>

                    <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
                        <div className="flex items-center justify-between mb-2">
                            <Quote className="w-8 h-8 text-purple-600" />
                            <span className="text-sm text-gray-500">Quotes</span>
                        </div>
                        <div className="text-3xl font-bold text-gray-900">{stats.byType.quote}</div>
                        <div className="text-sm text-gray-600 mt-1">Customer Quotes</div>
                    </div>

                    <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
                        <div className="flex items-center justify-between mb-2">
                            <AlertTriangle className="w-8 h-8 text-red-600" />
                            <span className="text-sm text-gray-500">Pain Points</span>
                        </div>
                        <div className="text-3xl font-bold text-gray-900">{stats.byType.painPoint}</div>
                        <div className="text-sm text-gray-600 mt-1">Identified Pains</div>
                    </div>

                    <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
                        <div className="flex items-center justify-between mb-2">
                            <Lightbulb className="w-8 h-8 text-amber-600" />
                            <span className="text-sm text-gray-500">Actionable</span>
                        </div>
                        <div className="text-3xl font-bold text-gray-900">{stats.actionable}</div>
                        <div className="text-sm text-gray-600 mt-1">Need Follow-up</div>
                    </div>
                </div>

                {/* Filters & Search */}
                <div className="bg-white border-2 border-gray-200 rounded-xl p-6 mb-6">
                    <div className="flex items-center gap-4">
                        {/* Search */}
                        <div className="flex-1">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search feedback by content or tags..."
                                    className="w-full pl-10 pr-4 py-2 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:outline-none"
                                />
                            </div>
                        </div>

                        {/* Type Filter */}
                        <select
                            value={filterType}
                            onChange={(e) => setFilterType(e.target.value as any)}
                            className="px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:outline-none"
                        >
                            <option value="all">All Types</option>
                            <option value="quote">Quotes</option>
                            <option value="pain-point">Pain Points</option>
                            <option value="win">Wins</option>
                            <option value="feature-request">Feature Requests</option>
                            <option value="objection">Objections</option>
                            <option value="insight">Insights</option>
                        </select>

                        {/* Priority Filter */}
                        <select
                            value={filterPriority}
                            onChange={(e) => setFilterPriority(e.target.value as any)}
                            className="px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:outline-none"
                        >
                            <option value="all">All Priorities</option>
                            <option value="critical">Critical</option>
                            <option value="high">High</option>
                            <option value="medium">Medium</option>
                            <option value="low">Low</option>
                        </select>
                    </div>
                </div>

                {/* Feedback List */}
                <div className="bg-white border-2 border-gray-200 rounded-xl overflow-hidden">
                    <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                        <h2 className="text-lg font-bold text-gray-900">
                            Feedback Items ({filteredFeedback.length})
                        </h2>
                    </div>
                    <div className="divide-y divide-gray-200 max-h-[600px] overflow-y-auto">
                        {filteredFeedback.length === 0 ? (
                            <div className="p-12 text-center">
                                <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                                <p className="text-gray-500">No feedback items found</p>
                            </div>
                        ) : (
                            filteredFeedback.map((item) => (
                                <div key={item.id} className="p-6 hover:bg-gray-50 transition-colors">
                                    <div className="flex items-start justify-between mb-3">
                                        <div className="flex items-center gap-3">
                                            {item.type === 'quote' && <Quote className="w-5 h-5 text-purple-600" />}
                                            {item.type === 'pain-point' && <AlertTriangle className="w-5 h-5 text-red-600" />}
                                            {item.type === 'win' && <TrendingUp className="w-5 h-5 text-emerald-600" />}
                                            {item.type === 'feature-request' && <Lightbulb className="w-5 h-5 text-amber-600" />}
                                            {item.type === 'objection' && <AlertTriangle className="w-5 h-5 text-orange-600" />}
                                            {item.type === 'insight' && <Lightbulb className="w-5 h-5 text-indigo-600" />}
                                            <div>
                                                <span className="text-sm font-semibold text-gray-900 capitalize">
                                                    {item.type.replace('-', ' ')}
                                                </span>
                                                <span className="text-xs text-gray-500 ml-2">
                                                    {new Date(item.timestamp).toLocaleString()}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className={`text-xs px-2 py-1 rounded-full font-semibold ${
                                                item.sentiment === 'positive' ? 'bg-emerald-100 text-emerald-700' :
                                                item.sentiment === 'negative' ? 'bg-red-100 text-red-700' :
                                                'bg-gray-100 text-gray-700'
                                            }`}>
                                                {item.sentiment}
                                            </span>
                                            <span className={`text-xs px-2 py-1 rounded-full font-semibold ${
                                                item.priority === 'critical' ? 'bg-red-100 text-red-700' :
                                                item.priority === 'high' ? 'bg-orange-100 text-orange-700' :
                                                item.priority === 'medium' ? 'bg-blue-100 text-blue-700' :
                                                'bg-gray-100 text-gray-700'
                                            }`}>
                                                {item.priority}
                                            </span>
                                        </div>
                                    </div>
                                    <p className="text-gray-700 mb-3">{item.content}</p>
                                    <div className="flex items-center gap-4 text-sm">
                                        {item.context.customer && (
                                            <div className="flex items-center gap-1 text-gray-600">
                                                <Calendar className="w-4 h-4" />
                                                {item.context.customer}
                                            </div>
                                        )}
                                        {item.context.persona && (
                                            <div className="flex items-center gap-1 text-gray-600">
                                                <User className="w-4 h-4" />
                                                {item.context.persona}
                                            </div>
                                        )}
                                        {item.tags.length > 0 && (
                                            <div className="flex items-center gap-2">
                                                <Tag className="w-4 h-4 text-gray-400" />
                                                <div className="flex gap-1">
                                                    {item.tags.map((tag, idx) => (
                                                        <span key={idx} className="text-xs px-2 py-0.5 bg-indigo-100 text-indigo-700 rounded-full">
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
