/**
 * Feedback Capture System (R6.6)
 * 
 * Long-term improvement loop for demos and product development
 * Captures quotes, reactions, and insights during customer conversations
 */

export type FeedbackType = 'quote' | 'pain-point' | 'objection' | 'feature-request' | 'win' | 'insight'
export type FeedbackSentiment = 'positive' | 'neutral' | 'negative'
export type FeedbackPriority = 'low' | 'medium' | 'high' | 'critical'

export interface FeedbackItem {
  id: string
  timestamp: Date
  type: FeedbackType
  sentiment: FeedbackSentiment
  priority: FeedbackPriority
  content: string
  context: {
    persona?: string // Which stakeholder said it
    customer?: string // Demo customer (Baptist, Cleveland, etc.)
    domain?: string // Which domain they were viewing
    kpi?: string // Specific KPI being discussed
  }
  tags: string[]
  actionable: boolean
  followUp?: string
  createdBy: string // Sales engineer name
}

export interface FeedbackSession {
  id: string
  date: Date
  customer: string
  attendees: Array<{
    name: string
    role: string
    persona: string
  }>
  duration: number // minutes
  feedbackItems: FeedbackItem[]
  outcome: 'won' | 'lost' | 'in-progress' | 'pilot'
  dealValue?: number
  notes: string
}

// In-memory storage (would connect to backend in production)
let feedbackSessions: FeedbackSession[] = []
let currentSession: FeedbackSession | null = null

// Start a new feedback session
export function startFeedbackSession(customer: string, attendees: Array<{ name: string; role: string; persona: string }>): FeedbackSession {
  currentSession = {
    id: `session-${Date.now()}`,
    date: new Date(),
    customer,
    attendees,
    duration: 0,
    feedbackItems: [],
    outcome: 'in-progress',
    notes: ''
  }
  return currentSession
}

// End current session
export function endFeedbackSession(outcome: FeedbackSession['outcome'], dealValue?: number, notes?: string): void {
  if (currentSession) {
    currentSession.outcome = outcome
    currentSession.dealValue = dealValue
    currentSession.notes = notes || ''
    currentSession.duration = Math.round((new Date().getTime() - currentSession.date.getTime()) / 60000)
    feedbackSessions.push(currentSession)
    currentSession = null
  }
}

// Add feedback item to current session
export function addFeedbackItem(item: Omit<FeedbackItem, 'id' | 'timestamp'>): FeedbackItem | null {
  if (!currentSession) return null
  
  const feedbackItem: FeedbackItem = {
    ...item,
    id: `feedback-${Date.now()}`,
    timestamp: new Date()
  }
  
  currentSession.feedbackItems.push(feedbackItem)
  return feedbackItem
}

// Get current session
export function getCurrentSession(): FeedbackSession | null {
  return currentSession
}

// Get all sessions
export function getAllSessions(): FeedbackSession[] {
  return feedbackSessions
}

// Get sessions by customer
export function getSessionsByCustomer(customer: string): FeedbackSession[] {
  return feedbackSessions.filter(s => s.customer === customer)
}

// Get sessions by outcome
export function getSessionsByOutcome(outcome: FeedbackSession['outcome']): FeedbackSession[] {
  return feedbackSessions.filter(s => s.outcome === outcome)
}

// Get all feedback items across sessions
export function getAllFeedbackItems(): FeedbackItem[] {
  return feedbackSessions.flatMap(s => s.feedbackItems)
}

// Get feedback by type
export function getFeedbackByType(type: FeedbackType): FeedbackItem[] {
  return getAllFeedbackItems().filter(f => f.type === type)
}

// Get feedback by priority
export function getFeedbackByPriority(priority: FeedbackPriority): FeedbackItem[] {
  return getAllFeedbackItems().filter(f => f.priority === priority)
}

// Get feedback by domain
export function getFeedbackByDomain(domain: string): FeedbackItem[] {
  return getAllFeedbackItems().filter(f => f.context.domain === domain)
}

// Get actionable feedback
export function getActionableFeedback(): FeedbackItem[] {
  return getAllFeedbackItems().filter(f => f.actionable)
}

// Get feedback statistics
export function getFeedbackStats() {
  const items = getAllFeedbackItems()
  
  return {
    total: items.length,
    byType: {
      quote: items.filter(f => f.type === 'quote').length,
      painPoint: items.filter(f => f.type === 'pain-point').length,
      objection: items.filter(f => f.type === 'objection').length,
      featureRequest: items.filter(f => f.type === 'feature-request').length,
      win: items.filter(f => f.type === 'win').length,
      insight: items.filter(f => f.type === 'insight').length
    },
    bySentiment: {
      positive: items.filter(f => f.sentiment === 'positive').length,
      neutral: items.filter(f => f.sentiment === 'neutral').length,
      negative: items.filter(f => f.sentiment === 'negative').length
    },
    byPriority: {
      low: items.filter(f => f.priority === 'low').length,
      medium: items.filter(f => f.priority === 'medium').length,
      high: items.filter(f => f.priority === 'high').length,
      critical: items.filter(f => f.priority === 'critical').length
    },
    actionable: items.filter(f => f.actionable).length
  }
}

// Export feedback as JSON
export function exportFeedback(): string {
  return JSON.stringify(feedbackSessions, null, 2)
}

// Import feedback from JSON
export function importFeedback(json: string): void {
  try {
    const imported = JSON.parse(json)
    feedbackSessions = imported
  } catch (e) {
    console.error('Failed to import feedback:', e)
  }
}

// Clear all feedback (use with caution)
export function clearAllFeedback(): void {
  feedbackSessions = []
  currentSession = null
}
