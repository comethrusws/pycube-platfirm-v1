'use client'

import { X, Clock, MapPin, AlertTriangle, CheckCircle2, Play, Calendar, Filter, Download } from 'lucide-react'
import { useState, useEffect } from 'react'
import { PMTask, mockPMTasks, isOverdue, getDaysOverdue } from '@/lib/pm-data'

interface PMWorklistProps {
    isOpen: boolean
    onClose: () => void
}

export function PMWorklist({ isOpen, onClose }: PMWorklistProps) {
    const [tasks, setTasks] = useState<PMTask[]>(mockPMTasks)
    const [filter, setFilter] = useState<'all' | 'overdue' | 'critical'>('all')
    const [selectedTask, setSelectedTask] = useState<PMTask | null>(null)
    const [searchTimer, setSearchTimer] = useState<number>(0)
    const [isSearching, setIsSearching] = useState(false)

    // Timer for asset search
    useEffect(() => {
        let interval: NodeJS.Timeout
        if (isSearching) {
            interval = setInterval(() => {
                setSearchTimer(prev => prev + 1)
            }, 1000)
        }
        return () => clearInterval(interval)
    }, [isSearching])

    const handleStartTask = (task: PMTask) => {
        setSelectedTask(task)
        setIsSearching(true)
        setSearchTimer(0)

        // Update task status
        setTasks(tasks.map(t =>
            t.id === task.id ? { ...t, status: 'in-progress', startedAt: new Date().toISOString() } : t
        ))
    }

    const handleAssetLocated = () => {
        if (selectedTask) {
            setIsSearching(false)
            setTasks(tasks.map(t =>
                t.id === selectedTask.id
                    ? { ...t, timeToLocate: searchTimer, locatedAt: new Date().toISOString() }
                    : t
            ))
        }
    }

    const handleCompleteTask = () => {
        if (selectedTask) {
            setTasks(tasks.map(t =>
                t.id === selectedTask.id
                    ? { ...t, status: 'completed', completedAt: new Date().toISOString() }
                    : t
            ))
            setSelectedTask(null)
            setIsSearching(false)
            setSearchTimer(0)
        }
    }

    const filteredTasks = tasks.filter(task => {
        if (filter === 'overdue') return task.status === 'pending' && isOverdue(task.dueDate)
        if (filter === 'critical') return task.priority === 'critical'
        return true
    })

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${mins}:${secs.toString().padStart(2, '0')}`
    }

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'critical': return 'bg-red-100 text-red-700 border-red-200'
            case 'high': return 'bg-orange-100 text-orange-700 border-orange-200'
            case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200'
            default: return 'bg-blue-100 text-blue-700 border-blue-200'
        }
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <div>
                        <h2 className="text-2xl font-semibold text-gray-900">PM Worklist</h2>
                        <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                            <span>{filteredTasks.filter(t => t.status === 'pending').length} Pending</span>
                            <span>{filteredTasks.filter(t => t.status === 'in-progress').length} In Progress</span>
                            <span className="text-red-600 font-medium">{filteredTasks.filter(t => isOverdue(t.dueDate)).length} Overdue</span>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <X className="w-6 h-6 text-gray-600" />
                    </button>
                </div>

                {/* Filters & Actions */}
                <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-gray-50">
                    <div className="flex items-center gap-2">
                        <Filter className="w-4 h-4 text-gray-400" />
                        <button
                            onClick={() => setFilter('all')}
                            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${filter === 'all' ? 'bg-gray-900 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
                                }`}
                        >
                            All Tasks
                        </button>
                        <button
                            onClick={() => setFilter('overdue')}
                            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${filter === 'overdue' ? 'bg-red-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
                                }`}
                        >
                            Overdue Only
                        </button>
                        <button
                            onClick={() => setFilter('critical')}
                            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${filter === 'critical' ? 'bg-orange-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
                                }`}
                        >
                            Critical
                        </button>
                    </div>
                    <button 
                        onClick={() => {
                            const worklistData = filteredTasks.map(t => ({
                                id: t.id,
                                assetId: t.assetId,
                                type: t.assetType,
                                location: t.assetLocation,
                                task: t.taskDescription,
                                priority: t.priority,
                                dueDate: t.dueDate
                            }))
                            console.log('Exporting to handheld device:', worklistData)
                            alert(`Sending ${filteredTasks.length} tasks to handheld device...`)
                        }}
                        className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-black transition-colors"
                    >
                        <Download className="w-4 h-4" />
                        Send to Handheld
                    </button>
                </div>

                {/* Task List */}
                <div className="flex-1 overflow-y-auto p-4">
                    <div className="space-y-3">
                        {filteredTasks.map(task => (
                            <div
                                key={task.id}
                                className={`bg-white border rounded-2xl p-5 transition-all ${selectedTask?.id === task.id
                                        ? 'border-blue-500 shadow-lg ring-2 ring-blue-100'
                                        : isOverdue(task.dueDate) && task.status === 'pending'
                                            ? 'border-red-200 bg-red-50'
                                            : 'border-gray-200 hover:shadow-md hover:border-gray-300'
                                    }`}
                            >
                                <div className="flex items-start justify-between mb-3">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="text-lg font-semibold text-gray-900">{task.assetId}</span>
                                            <span className={`text-xs font-bold px-2 py-1 rounded-full border ${getPriorityColor(task.priority)}`}>
                                                {task.priority.toUpperCase()}
                                            </span>
                                            {task.status === 'completed' && (
                                                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                                            )}
                                        </div>
                                        <div className="text-sm text-gray-600 mb-1">{task.assetType} • {task.taskType}</div>
                                        <div className="text-sm text-gray-700 font-medium mb-2">{task.taskDescription}</div>

                                        <div className="flex items-center gap-4 text-xs text-gray-500">
                                            <div className="flex items-center gap-1">
                                                <MapPin className="w-3 h-3" />
                                                {task.assetLocation}
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Calendar className="w-3 h-3" />
                                                Due: {task.dueDate}
                                                {isOverdue(task.dueDate) && task.status === 'pending' && (
                                                    <span className="text-red-600 font-bold ml-1">
                                                        ({getDaysOverdue(task.dueDate)}d overdue)
                                                    </span>
                                                )}
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Clock className="w-3 h-3" />
                                                Est. {task.estimatedDuration}min
                                            </div>
                                        </div>

                                        {task.timeToLocate !== undefined && (
                                            <div className="mt-2 text-xs text-emerald-600 font-medium">
                                                ✓ Located in {formatTime(task.timeToLocate)}
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex flex-col gap-2">
                                        {task.status === 'pending' && (
                                            <button
                                                onClick={() => handleStartTask(task)}
                                                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
                                            >
                                                <Play className="w-4 h-4" />
                                                Start Task
                                            </button>
                                        )}
                                        {task.status === 'in-progress' && selectedTask?.id === task.id && (
                                            <>
                                                {isSearching && (
                                                    <button
                                                        onClick={handleAssetLocated}
                                                        className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-medium transition-colors"
                                                    >
                                                        Asset Located
                                                    </button>
                                                )}
                                                {!isSearching && task.timeToLocate !== undefined && (
                                                    <button
                                                        onClick={handleCompleteTask}
                                                        className="px-4 py-2 bg-gray-900 hover:bg-black text-white rounded-lg text-sm font-medium transition-colors"
                                                    >
                                                        Complete Task
                                                    </button>
                                                )}
                                            </>
                                        )}
                                        {task.status === 'completed' && (
                                            <div className="px-4 py-2 bg-emerald-100 text-emerald-700 rounded-lg text-sm font-medium text-center">
                                                Completed
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Search Timer */}
                                {selectedTask?.id === task.id && isSearching && (
                                    <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm font-medium text-gray-700">Searching for asset...</span>
                                            <span className="text-2xl font-bold text-blue-600 tabular-nums">
                                                {formatTime(searchTimer)}
                                            </span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
