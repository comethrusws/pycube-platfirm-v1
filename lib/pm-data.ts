export interface PMTask {
    id: string
    assetId: string
    assetType: string
    assetLocation: string
    taskType: 'calibration' | 'inspection' | 'lubrication' | 'cleaning' | 'testing' | 'battery-replacement'
    taskDescription: string
    dueDate: string
    status: 'pending' | 'in-progress' | 'completed'
    assignedTo: string
    priority: 'critical' | 'high' | 'medium' | 'low'
    timeToLocate?: number // seconds
    locatedAt?: string
    completedAt?: string
    startedAt?: string
    estimatedDuration: number // minutes
}

// Mock PM task data
export const mockPMTasks: PMTask[] = [
    {
        id: 'PM-001',
        assetId: 'VENT-101',
        assetType: 'Ventilator',
        assetLocation: 'ICU Room 405',
        taskType: 'calibration',
        taskDescription: 'Quarterly calibration and pressure test',
        dueDate: '2024-01-15',
        status: 'pending',
        assignedTo: 'Tech 1',
        priority: 'critical',
        estimatedDuration: 45
    },
    {
        id: 'PM-002',
        assetId: 'IP-555',
        assetType: 'Infusion Pump',
        assetLocation: 'ED Storage',
        taskType: 'inspection',
        taskDescription: 'Monthly visual inspection and flow rate test',
        dueDate: '2024-01-14',
        status: 'pending',
        assignedTo: 'Tech 2',
        priority: 'high',
        estimatedDuration: 20
    },
    {
        id: 'PM-003',
        assetId: 'MON-992',
        assetType: 'Patient Monitor',
        assetLocation: 'OR 3',
        taskType: 'testing',
        taskDescription: 'ECG lead test and display calibration',
        dueDate: '2024-01-16',
        status: 'pending',
        assignedTo: 'Tech 1',
        priority: 'high',
        estimatedDuration: 30
    },
    {
        id: 'PM-004',
        assetId: 'DEF-112',
        assetType: 'Defibrillator',
        assetLocation: 'ED Crash Cart 2',
        taskType: 'battery-replacement',
        taskDescription: 'Replace battery and perform discharge test',
        dueDate: '2024-01-12',
        status: 'pending',
        assignedTo: 'Tech 3',
        priority: 'critical',
        estimatedDuration: 25
    },
    {
        id: 'PM-005',
        assetId: 'EKG-331',
        assetType: 'EKG Machine',
        assetLocation: 'Cardiology Clinic',
        taskType: 'cleaning',
        taskDescription: 'Deep cleaning and lead wire inspection',
        dueDate: '2024-01-17',
        status: 'pending',
        assignedTo: 'Tech 2',
        priority: 'medium',
        estimatedDuration: 15
    },
    {
        id: 'PM-006',
        assetId: 'PUMP-872',
        assetType: 'Feeding Pump',
        assetLocation: 'Pediatrics 3N',
        taskType: 'calibration',
        taskDescription: 'Flow rate calibration and alarm test',
        dueDate: '2024-01-18',
        status: 'pending',
        assignedTo: 'Tech 1',
        priority: 'medium',
        estimatedDuration: 30
    },
    {
        id: 'PM-007',
        assetId: 'BED-445',
        assetType: 'Smart Bed',
        assetLocation: 'ICU Room 410',
        taskType: 'inspection',
        taskDescription: 'Scale calibration and motor function test',
        dueDate: '2024-01-19',
        status: 'pending',
        assignedTo: 'Tech 3',
        priority: 'low',
        estimatedDuration: 40
    },
    {
        id: 'PM-008',
        assetId: 'SCD-221',
        assetType: 'SCD Machine',
        assetLocation: 'OR 5',
        taskType: 'testing',
        taskDescription: 'Pressure test and leak check',
        dueDate: '2024-01-13',
        status: 'pending',
        assignedTo: 'Tech 2',
        priority: 'high',
        estimatedDuration: 20
    },
]

// Helper to check if task is overdue
export function isOverdue(dueDate: string): boolean {
    const today = new Date('2024-01-15') // Mock today's date
    const due = new Date(dueDate)
    return due < today
}

// Helper to get days overdue
export function getDaysOverdue(dueDate: string): number {
    const today = new Date('2024-01-15')
    const due = new Date(dueDate)
    const diffTime = today.getTime() - due.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays > 0 ? diffDays : 0
}

// Get PM statistics
export function getPMStats(tasks: PMTask[]) {
    const total = tasks.length
    const pending = tasks.filter(t => t.status === 'pending').length
    const inProgress = tasks.filter(t => t.status === 'in-progress').length
    const completed = tasks.filter(t => t.status === 'completed').length
    const overdue = tasks.filter(t => t.status === 'pending' && isOverdue(t.dueDate)).length
    const critical = tasks.filter(t => t.priority === 'critical').length

    const avgTimeToLocate = tasks
        .filter(t => t.timeToLocate !== undefined)
        .reduce((acc, t) => acc + (t.timeToLocate || 0), 0) / tasks.filter(t => t.timeToLocate).length || 0

    return {
        total,
        pending,
        inProgress,
        completed,
        overdue,
        critical,
        avgTimeToLocate: Math.round(avgTimeToLocate / 60), // convert to minutes
        completionRate: total > 0 ? Math.round((completed / total) * 100) : 0
    }
}

// PM Analytics by Category
export interface PMCategoryStats {
    category: string
    scheduled: number
    completed: number
    overdue: number
    avgTimeToLocate: number // minutes
    completionRate: number
    impactOnUptime: number // percentage
    impactOnUtilization: number // percentage
}

export const pmCategoryStats: PMCategoryStats[] = [
    {
        category: 'Ventilators',
        scheduled: 45,
        completed: 42,
        overdue: 8,
        avgTimeToLocate: 3.2,
        completionRate: 93,
        impactOnUptime: 98.5,
        impactOnUtilization: 82
    },
    {
        category: 'Infusion Pumps',
        scheduled: 128,
        completed: 118,
        overdue: 15,
        avgTimeToLocate: 1.8,
        completionRate: 92,
        impactOnUptime: 97.2,
        impactOnUtilization: 76
    },
    {
        category: 'Patient Monitors',
        scheduled: 95,
        completed: 88,
        overdue: 12,
        avgTimeToLocate: 2.1,
        completionRate: 93,
        impactOnUptime: 96.8,
        impactOnUtilization: 79
    },
    {
        category: 'Surgical Equipment',
        scheduled: 78,
        completed: 70,
        overdue: 18,
        avgTimeToLocate: 5.7,
        completionRate: 90,
        impactOnUptime: 94.2,
        impactOnUtilization: 72
    },
    {
        category: 'Imaging Devices',
        scheduled: 34,
        completed: 28,
        overdue: 12,
        avgTimeToLocate: 8.3,
        completionRate: 82,
        impactOnUptime: 91.5,
        impactOnUtilization: 68
    },
    {
        category: 'Defibrillators',
        scheduled: 52,
        completed: 48,
        overdue: 6,
        avgTimeToLocate: 1.2,
        completionRate: 92,
        impactOnUptime: 99.1,
        impactOnUtilization: 88
    }
]

// Time to Locate Trends (R2.11 KPI)
export const timeToLocateTrend = [
    { month: 'Jul', avgMinutes: 8.5, target: 5 },
    { month: 'Aug', avgMinutes: 7.2, target: 5 },
    { month: 'Sep', avgMinutes: 6.8, target: 5 },
    { month: 'Oct', avgMinutes: 5.9, target: 5 },
    { month: 'Nov', avgMinutes: 4.2, target: 5 },
    { month: 'Dec', avgMinutes: 3.5, target: 5 },
]

// PM Completion Rate Trends (R2.11 KPI)
export const pmCompletionTrend = [
    { month: 'Jul', completionRate: 85, overdue: 42, target: 95 },
    { month: 'Aug', completionRate: 87, overdue: 38, target: 95 },
    { month: 'Sep', completionRate: 89, overdue: 35, target: 95 },
    { month: 'Oct', completionRate: 88, overdue: 48, target: 95 },
    { month: 'Nov', completionRate: 90, overdue: 52, target: 95 },
    { month: 'Dec', completionRate: 89, overdue: 68, target: 95 },
]
