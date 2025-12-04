'use client';

/**
 * PM Worklist View Component
 * Preventive Maintenance task management with asset location tracking
 * Requirements: R2.10, R2.11 - PM workflows with location time metrics
 */

import { useState } from 'react';
import { Clock, MapPin, AlertTriangle, CheckCircle, XCircle, Wrench, Search } from 'lucide-react';
import { PMTask, pmWorklist } from '@/lib/data';
import { PMTaskStatus, PMPriority } from '@/lib/taxonomies';

export function PMWorklistView() {
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedPriority, setSelectedPriority] = useState<string>('all');

  const filteredTasks = pmWorklist.filter(task => {
    if (selectedStatus !== 'all' && task.status !== selectedStatus) return false;
    if (selectedPriority !== 'all' && task.priority !== selectedPriority) return false;
    return true;
  });

  const statusCounts = {
    scheduled: pmWorklist.filter(t => t.status === PMTaskStatus.SCHEDULED).length,
    inProgress: pmWorklist.filter(t => t.status === PMTaskStatus.IN_PROGRESS).length,
    overdue: pmWorklist.filter(t => t.status === PMTaskStatus.OVERDUE).length,
    completed: pmWorklist.filter(t => t.status === PMTaskStatus.COMPLETED).length,
    pendingParts: pmWorklist.filter(t => t.status === PMTaskStatus.PENDING_PARTS).length,
  };

  const getStatusIcon = (status: PMTaskStatus) => {
    switch (status) {
      case PMTaskStatus.COMPLETED:
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case PMTaskStatus.IN_PROGRESS:
        return <Wrench className="h-5 w-5 text-blue-600" />;
      case PMTaskStatus.OVERDUE:
        return <XCircle className="h-5 w-5 text-red-600" />;
      case PMTaskStatus.PENDING_PARTS:
        return <AlertTriangle className="h-5 w-5 text-orange-600" />;
      default:
        return <Clock className="h-5 w-5 text-gray-600" />;
    }
  };

  const getStatusColor = (status: PMTaskStatus) => {
    switch (status) {
      case PMTaskStatus.COMPLETED:
        return 'bg-green-100 text-green-800 border-green-300';
      case PMTaskStatus.IN_PROGRESS:
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case PMTaskStatus.OVERDUE:
        return 'bg-red-100 text-red-800 border-red-300';
      case PMTaskStatus.PENDING_PARTS:
        return 'bg-orange-100 text-orange-800 border-orange-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getPriorityColor = (priority: PMPriority) => {
    switch (priority) {
      case PMPriority.CRITICAL:
        return 'bg-red-600 text-white';
      case PMPriority.URGENT:
        return 'bg-orange-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  // Calculate KPIs
  const avgTimeToLocate = pmWorklist
    .filter(t => t.timeToLocate)
    .reduce((sum, t) => sum + (t.timeToLocate || 0), 0) / 
    pmWorklist.filter(t => t.timeToLocate).length || 0;

  const completionRate = (statusCounts.completed / pmWorklist.length) * 100;
  const overdueCount = statusCounts.overdue;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Preventive Maintenance Worklist</h2>
          <p className="text-sm text-gray-600 mt-1">
            Track PM tasks, locate assets quickly, and monitor completion rates
          </p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2">
          <Search className="h-4 w-4" />
          Send to Handhelds
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200">
          <div className="text-sm text-blue-700 uppercase font-medium">Avg Time to Locate</div>
          <div className="text-3xl font-bold text-blue-900 mt-1">
            {avgTimeToLocate.toFixed(1)} <span className="text-lg">min</span>
          </div>
          <div className="text-xs text-blue-600 mt-1">Target: &lt; 5 minutes</div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg border border-green-200">
          <div className="text-sm text-green-700 uppercase font-medium">Completion Rate</div>
          <div className="text-3xl font-bold text-green-900 mt-1">
            {completionRate.toFixed(0)}%
          </div>
          <div className="text-xs text-green-600 mt-1">
            {statusCounts.completed} / {pmWorklist.length} tasks
          </div>
        </div>

        <div className="bg-gradient-to-br from-red-50 to-red-100 p-4 rounded-lg border border-red-200">
          <div className="text-sm text-red-700 uppercase font-medium">Overdue Tasks</div>
          <div className="text-3xl font-bold text-red-900 mt-1">{overdueCount}</div>
          <div className="text-xs text-red-600 mt-1">Require immediate attention</div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg border border-purple-200">
          <div className="text-sm text-purple-700 uppercase font-medium">In Progress</div>
          <div className="text-3xl font-bold text-purple-900 mt-1">{statusCounts.inProgress}</div>
          <div className="text-xs text-purple-600 mt-1">Currently being worked on</div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-4 items-center bg-gray-50 p-4 rounded-lg border">
        <span className="text-sm font-medium text-gray-700">Filter by:</span>
        
        <select 
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm"
        >
          <option value="all">All Statuses ({pmWorklist.length})</option>
          <option value={PMTaskStatus.SCHEDULED}>Scheduled ({statusCounts.scheduled})</option>
          <option value={PMTaskStatus.IN_PROGRESS}>In Progress ({statusCounts.inProgress})</option>
          <option value={PMTaskStatus.OVERDUE}>Overdue ({statusCounts.overdue})</option>
          <option value={PMTaskStatus.PENDING_PARTS}>Pending Parts ({statusCounts.pendingParts})</option>
        </select>

        <select 
          value={selectedPriority}
          onChange={(e) => setSelectedPriority(e.target.value)}
          className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm"
        >
          <option value="all">All Priorities</option>
          <option value={PMPriority.CRITICAL}>Critical</option>
          <option value={PMPriority.URGENT}>Urgent</option>
          <option value={PMPriority.ROUTINE}>Routine</option>
        </select>

        <div className="ml-auto text-sm text-gray-600">
          Showing {filteredTasks.length} of {pmWorklist.length} tasks
        </div>
      </div>

      {/* Task List */}
      <div className="space-y-3">
        {filteredTasks.map((task) => (
          <div 
            key={task.id} 
            className={`bg-white rounded-lg border p-4 shadow-sm hover:shadow-md transition-shadow ${
              task.status === PMTaskStatus.OVERDUE ? 'border-l-4 border-l-red-500' : ''
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex gap-4 flex-1">
                {/* Status Icon */}
                <div className="mt-1">
                  {getStatusIcon(task.status)}
                </div>

                {/* Task Details */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold text-gray-900">{task.assetName}</h4>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getPriorityColor(task.priority)}`}>
                      {task.priority}
                    </span>
                  </div>

                  <p className="text-sm text-gray-600 mb-2">{task.taskType}</p>

                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      Due: {formatDate(task.dueDate)}
                      {task.overdueDays && (
                        <span className="ml-1 text-red-600 font-medium">
                          ({task.overdueDays} days overdue)
                        </span>
                      )}
                    </span>

                    {task.timeToLocate !== undefined && (
                      <span className="flex items-center gap-1 text-green-600 font-medium">
                        <MapPin className="h-4 w-4" />
                        Located in {task.timeToLocate} min
                      </span>
                    )}

                    {task.technician && (
                      <span className="flex items-center gap-1">
                        <Wrench className="h-4 w-4" />
                        {task.technician}
                      </span>
                    )}
                  </div>

                  {task.notes && (
                    <div className="mt-2 text-sm text-gray-600 italic bg-gray-50 p-2 rounded">
                      {task.notes}
                    </div>
                  )}
                </div>
              </div>

              {/* Status Badge */}
              <div className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(task.status)}`}>
                {task.status}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2 mt-3 pt-3 border-t">
              <button className="text-sm bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded">
                Locate Asset
              </button>
              <button className="text-sm bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded">
                Start Task
              </button>
              <button className="text-sm border border-gray-300 hover:bg-gray-50 text-gray-700 px-3 py-1.5 rounded">
                View Asset History
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredTasks.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <Wrench className="h-12 w-12 mx-auto mb-4 text-gray-300" />
          <p className="text-lg font-medium">No tasks match the selected filters</p>
          <p className="text-sm mt-1">Try adjusting your filter criteria</p>
        </div>
      )}
    </div>
  );
}
