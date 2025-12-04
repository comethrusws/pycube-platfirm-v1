export interface AssetLifecycleEvent {
    status: 'clean' | 'in-use' | 'soiled' | 'needs-repair' | 'repaired' | 'needs-sanitization' | 'sanitized'
    location: string
    timestamp: string
    duration: string
    isBottleneck?: boolean
    bottleneckReason?: string
}

export interface AssetLifecycleData {
    assetId: string
    assetType: string
    assetName: string
    events: AssetLifecycleEvent[]
    totalCycleTime: string
    bottleneckCount: number
}

// Mock data for demonstration
export const mockAssetLifecycleData: Record<string, AssetLifecycleData> = {
    'IP-492': {
        assetId: 'IP-492',
        assetType: 'Infusion Pump',
        assetName: 'Infusion Pump #IP-492',
        totalCycleTime: '67h 30m',
        bottleneckCount: 1,
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
