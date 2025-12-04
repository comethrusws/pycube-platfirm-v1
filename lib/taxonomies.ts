
/**
 * Standard Taxonomies for Healthcare Operations Platform
 * Single source of truth for status codes, types, and categories.
 */

// ============================================================================
// 1. BIOMEDICAL ASSET LIFECYCLE
// ============================================================================

export enum AssetStatus {
    CLEAN = 'Clean',
    IN_USE = 'In Use',
    SOILED = 'Soiled',
    NEEDS_REPAIR = 'Needs Repair',
    REPAIRED = 'Repaired',
    SANITIZED = 'Sanitized', // Transition state back to Clean
}

export const ASSET_STATUS_FLOW = [
    AssetStatus.CLEAN,
    AssetStatus.IN_USE,
    AssetStatus.SOILED,
    AssetStatus.NEEDS_REPAIR,
    AssetStatus.REPAIRED,
    AssetStatus.SANITIZED,
];

export enum AssetCategory {
    INFUSION_PUMP = 'Infusion Pump',
    VENTILATOR = 'Ventilator',
    PATIENT_MONITOR = 'Patient Monitor',
    WHEELCHAIR = 'Wheelchair',
    BED = 'Hospital Bed',
    SCD_MACHINE = 'SCD Machine', // Sequential Compression Device
    TELEMETRY = 'Telemetry Unit',
}

// ============================================================================
// 2. LOCATIONS & ZONES
// ============================================================================

export enum LocationType {
    CLEAN_UTILITY = 'Clean Utility',
    SOILED_UTILITY = 'Soiled Utility',
    BIOMED_SHOP = 'Biomed Shop',
    PATIENT_ROOM = 'Patient Room',
    HALLWAY = 'Hallway',
    OR = 'Operating Room',
    ED = 'Emergency Department',
    ICU = 'Intensive Care Unit',
    STERILE_PROCESSING = 'Sterile Processing',
    LOADING_DOCK = 'Loading Dock',
}

// ============================================================================
// 3. TRANSFUSION MEDICINE
// ============================================================================

export enum BloodType {
    A_POS = 'A+',
    A_NEG = 'A-',
    B_POS = 'B+',
    B_NEG = 'B-',
    AB_POS = 'AB+',
    AB_NEG = 'AB-',
    O_POS = 'O+',
    O_NEG = 'O-',
}

export enum BloodComponent {
    RBC = 'Red Blood Cells',
    FFP = 'Fresh Frozen Plasma',
    PLATELETS = 'Platelets',
    CRYOPRECIPITATE = 'Cryoprecipitate',
    WHOLE_BLOOD = 'Whole Blood',
}

// ============================================================================
// 4. SUPPLY CHAIN
// ============================================================================

export enum SupplyCategory {
    SURGICAL = 'Surgical Supplies',
    PHARMA = 'Pharmaceuticals',
    IMPLANTS = 'Implants & Devices',
    DIAGNOSTIC = 'Diagnostic Supplies',
    PATIENT_CARE = 'Patient Care Items',
    LAB_REAGENTS = 'Lab Reagents',
}

export enum RiskLevel {
    LOW = 'Low',
    MEDIUM = 'Medium',
    HIGH = 'High',
    CRITICAL = 'Critical',
}

// ============================================================================
// 5. INFRASTRUCTURE
// ============================================================================

export enum GatewayStatus {
    ONLINE = 'Online',
    OFFLINE = 'Offline',
    WARNING = 'Warning',
}

export enum ServerStatus {
    HEALTHY = 'Healthy',
    WARNING = 'Warning',
    CRITICAL = 'Critical',
}
