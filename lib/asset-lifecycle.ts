export interface AssetLifecycleEvent {
    status: 'clean' | 'in-use' | 'soiled' | 'needs-repair' | 'repaired' | 'needs-sanitization' | 'sanitized'
    location: string
    timestamp: string
    duration: string
    isBottleneck?: boolean
    bottleneckReason?: string
}

export interface PMHistoryEntry {
    date: string
    taskType: string
    technician: string
    duration: number // minutes
    timeToLocate: number // minutes
    outcome: 'completed' | 'deferred' | 'failed'
    notes?: string
}

export interface LocationHistoryEntry {
    location: string
    arrivedAt: string
    departedAt?: string
    duration: string
    status: string
}

export interface AssetLifecycleData {
    assetId: string
    assetType: string
    assetName: string
    events: AssetLifecycleEvent[]
    totalCycleTime: string
    bottleneckCount: number
    // R2.6 enhancements
    utilizationRate?: number // percentage over last 30 days
    utilizationTrend?: { period: string, rate: number }[]
    pmHistory?: PMHistoryEntry[]
    locationHistory?: LocationHistoryEntry[]
    department?: string
    acquisitionValue?: string
}

// Mock data for demonstration
export const mockAssetLifecycleData: Record<string, AssetLifecycleData> = {
    'IP-492': {
        assetId: 'IP-492',
        assetType: 'Infusion Pump',
        assetName: 'Infusion Pump #IP-492',
        totalCycleTime: '67h 30m',
        bottleneckCount: 1,
        utilizationRate: 12,
        department: 'Emergency Department',
        acquisitionValue: '$8,500',
        utilizationTrend: [
            { period: 'Week 1', rate: 15 },
            { period: 'Week 2', rate: 18 },
            { period: 'Week 3', rate: 10 },
            { period: 'Week 4', rate: 8 },
        ],
        pmHistory: [
            {
                date: '2024-01-10',
                taskType: 'Quarterly Calibration',
                technician: 'Tech 2',
                duration: 35,
                timeToLocate: 18,
                outcome: 'completed',
                notes: 'Found in ED storage, not returned to central supply'
            },
            {
                date: '2023-10-15',
                taskType: 'Flow Rate Test',
                technician: 'Tech 1',
                duration: 25,
                timeToLocate: 22,
                outcome: 'completed',
                notes: 'Located after extended search in West Wing'
            },
            {
                date: '2023-07-12',
                taskType: 'Battery Replacement',
                technician: 'Tech 3',
                duration: 20,
                timeToLocate: 35,
                outcome: 'completed',
                notes: 'Misplaced in overflow storage'
            },
        ],
        locationHistory: [
            { location: 'ED Storage', arrivedAt: '2024-01-05 14:30', duration: '10 days (ongoing)', status: 'idle' },
            { location: 'ICU Room 302', arrivedAt: '2024-01-02 08:00', departedAt: '2024-01-05 14:30', duration: '3d 6h 30m', status: 'in-use' },
            { location: 'Central Sterile', arrivedAt: '2024-01-01 16:00', departedAt: '2024-01-02 08:00', duration: '16h', status: 'clean' },
            { location: 'Biomed Shop', arrivedAt: '2023-12-28 10:00', departedAt: '2024-01-01 16:00', duration: '4d 6h', status: 'repair' },
            { location: 'West Wing Storage', arrivedAt: '2023-12-15 09:00', departedAt: '2023-12-28 10:00', duration: '13d 1h', status: 'idle' },
        ],
        events: [
            { status: 'clean', location: 'Central Sterile', timestamp: '2024-01-15 08:00', duration: '2h', isBottleneck: false },
            { status: 'in-use', location: 'ICU Room 302', timestamp: '2024-01-15 10:00', duration: '48h', isBottleneck: false },
            { status: 'soiled', location: 'ICU Soiled Utility', timestamp: '2024-01-17 10:00', duration: '4h', isBottleneck: true, bottleneckReason: 'Exceeded 2h limit' },
            { status: 'needs-repair', location: 'Biomed Shop', timestamp: '2024-01-17 14:00', duration: '12h', isBottleneck: false },
            { status: 'repaired', location: 'Biomed Shop', timestamp: '2024-01-18 02:00', duration: '1h', isBottleneck: false },
            { status: 'sanitized', location: 'Central Sterile', timestamp: '2024-01-18 03:00', duration: '30m', isBottleneck: false },
        ]
    },
    'WC-234': {
        assetId: 'WC-234',
        assetType: 'Wheelchair',
        assetName: 'Wheelchair #WC-234',
        totalCycleTime: '18h 15m',
        bottleneckCount: 0,
        utilizationRate: 2,
        department: 'Main Hospital Lobby',
        acquisitionValue: '$1,200',
        utilizationTrend: [
            { period: 'Week 1', rate: 5 },
            { period: 'Week 2', rate: 3 },
            { period: 'Week 3', rate: 1 },
            { period: 'Week 4', rate: 0 },
        ],
        pmHistory: [
            {
                date: '2024-01-08',
                taskType: 'Safety Inspection',
                technician: 'Tech 1',
                duration: 15,
                timeToLocate: 8,
                outcome: 'failed',
                notes: 'Wheel damage detected, sent to repair'
            },
            {
                date: '2023-10-22',
                taskType: 'Brake Adjustment',
                technician: 'Tech 2',
                duration: 12,
                timeToLocate: 3,
                outcome: 'completed'
            },
        ],
        locationHistory: [
            { location: 'Lobby Closet', arrivedAt: '2023-12-20 11:00', duration: '26 days (ongoing)', status: 'idle' },
            { location: 'Patient Room 205', arrivedAt: '2023-12-19 14:00', departedAt: '2023-12-20 11:00', duration: '21h', status: 'in-use' },
            { location: 'Equipment Storage', arrivedAt: '2023-12-10 08:00', departedAt: '2023-12-19 14:00', duration: '9d 6h', status: 'idle' },
        ],
        events: [
            { status: 'clean', location: 'Equipment Storage', timestamp: '2024-01-20 06:00', duration: '1h', isBottleneck: false },
            { status: 'in-use', location: 'Patient Room 205', timestamp: '2024-01-20 07:00', duration: '12h', isBottleneck: false },
            { status: 'soiled', location: 'Equipment Utility', timestamp: '2024-01-20 19:00', duration: '1h 30m', isBottleneck: false },
            { status: 'sanitized', location: 'Central Sterile', timestamp: '2024-01-20 20:30', duration: '45m', isBottleneck: false },
            { status: 'clean', location: 'Equipment Storage', timestamp: '2024-01-20 21:15', duration: '3h', isBottleneck: false },
        ]
    },
    'VT-892': {
        assetId: 'VT-892',
        assetType: 'Ventilator',
        assetName: 'Ventilator #VT-892',
        totalCycleTime: '96h 45m',
        bottleneckCount: 2,
        utilizationRate: 28,
        department: 'Cardiology Clinic',
        acquisitionValue: '$45,000',
        utilizationTrend: [
            { period: 'Week 1', rate: 32 },
            { period: 'Week 2', rate: 30 },
            { period: 'Week 3', rate: 25 },
            { period: 'Week 4', rate: 25 },
        ],
        pmHistory: [
            {
                date: '2024-01-12',
                taskType: 'Quarterly Calibration',
                technician: 'Tech 1',
                duration: 45,
                timeToLocate: 2,
                outcome: 'completed',
                notes: 'All parameters within spec'
            },
            {
                date: '2023-11-18',
                taskType: 'Filter Replacement',
                technician: 'Tech 3',
                duration: 30,
                timeToLocate: 5,
                outcome: 'completed'
            },
            {
                date: '2023-08-25',
                taskType: 'Annual Safety Inspection',
                technician: 'Tech 2',
                duration: 60,
                timeToLocate: 1,
                outcome: 'completed',
                notes: 'Passed all safety checks'
            },
        ],
        locationHistory: [
            { location: 'Cardiology Clinic', arrivedAt: '2024-01-08 09:00', duration: '7 days (ongoing)', status: 'idle' },
            { location: 'ICU Room 408', arrivedAt: '2024-01-05 14:00', departedAt: '2024-01-08 09:00', duration: '2d 19h', status: 'in-use' },
            { location: 'Central Sterile', arrivedAt: '2024-01-04 10:00', departedAt: '2024-01-05 14:00', duration: '1d 4h', status: 'clean' },
            { location: 'Biomed Shop', arrivedAt: '2024-01-02 16:00', departedAt: '2024-01-04 10:00', duration: '1d 18h', status: 'repair' },
        ],
        events: [
            { status: 'clean', location: 'Central Sterile', timestamp: '2024-01-10 12:00', duration: '3h', isBottleneck: false },
            { status: 'in-use', location: 'ICU Room 408', timestamp: '2024-01-10 15:00', duration: '72h', isBottleneck: false },
            { status: 'soiled', location: 'ICU Soiled Utility', timestamp: '2024-01-13 15:00', duration: '6h', isBottleneck: true, bottleneckReason: 'Exceeded 2h limit' },
            { status: 'needs-repair', location: 'Biomed Shop', timestamp: '2024-01-13 21:00', duration: '14h', isBottleneck: true, bottleneckReason: 'Delayed parts arrival' },
            { status: 'repaired', location: 'Biomed Shop', timestamp: '2024-01-14 11:00', duration: '1h', isBottleneck: false },
            { status: 'sanitized', location: 'Central Sterile', timestamp: '2024-01-14 12:00', duration: '45m', isBottleneck: false },
        ]
    }
}

// Helper function to get lifecycle data
export function getAssetLifecycleData(assetId: string): AssetLifecycleData | null {
    return mockAssetLifecycleData[assetId] || null
}

// Status display configuration
export const statusConfig = {
    'clean': { label: 'Clean', color: 'bg-emerald-500', icon: '✓' },
    'in-use': { label: 'In Use', color: 'bg-blue-500', icon: '→' },
    'soiled': { label: 'Soiled', color: 'bg-yellow-500', icon: '!' },
    'needs-repair': { label: 'Needs Repair', color: 'bg-red-500', icon: '⚠' },
    'repaired': { label: 'Repaired', color: 'bg-purple-500', icon: '✓' },
    'needs-sanitization': { label: 'Needs Sanitization', color: 'bg-orange-500', icon: '◷' },
    'sanitized': { label: 'Sanitized', color: 'bg-teal-500', icon: '✓' },
}
