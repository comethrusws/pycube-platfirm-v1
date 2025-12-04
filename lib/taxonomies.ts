
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

export enum SupplyLocation {
    CENTRAL_STORAGE = 'Central Storage',
    PHARMACY = 'Pharmacy',
    OR_STOCK = 'OR Stock Room',
    FLOOR_STOCK = 'Floor Stock',
    LOADING_DOCK = 'Loading Dock',
    QUARANTINE = 'Quarantine',
    EXPIRED_HOLD = 'Expired Hold',
}

export enum SupplyTransitState {
    RECEIVED = 'Received',
    IN_STORAGE = 'In Storage',
    PICKED = 'Picked',
    IN_TRANSIT = 'In Transit',
    DELIVERED = 'Delivered',
    IN_USE = 'In Use',
    CONSUMED = 'Consumed',
    EXPIRED = 'Expired',
    RECALLED = 'Recalled',
}

export enum UsageEventType {
    ISSUED = 'Issued',
    RETURNED = 'Returned',
    WASTED = 'Wasted',
    EXPIRED = 'Expired',
    DAMAGED = 'Damaged',
    RECALLED = 'Recalled',
    TRANSFERRED = 'Transferred',
}

// ============================================================================
// 5. LAB MEDICINE / SPECIMEN TRACKING
// ============================================================================

export enum SpecimenStatus {
    COLLECTED = 'Collected',
    LABELED = 'Labeled',
    READY_FOR_PICKUP = 'Ready for Pickup',
    PICKED_UP = 'Picked Up',
    IN_TRANSIT = 'In Transit',
    RECEIVED_AT_LAB = 'Received at Lab',
    ACCESSIONED = 'Accessioned',
    IN_ANALYSIS = 'In Analysis',
    ANALYSIS_COMPLETE = 'Analysis Complete',
    RESULTED = 'Resulted',
    ARCHIVED = 'Archived',
}

export const SPECIMEN_WORKFLOW_STAGES = [
    SpecimenStatus.COLLECTED,
    SpecimenStatus.LABELED,
    SpecimenStatus.READY_FOR_PICKUP,
    SpecimenStatus.PICKED_UP,
    SpecimenStatus.IN_TRANSIT,
    SpecimenStatus.RECEIVED_AT_LAB,
    SpecimenStatus.ACCESSIONED,
    SpecimenStatus.IN_ANALYSIS,
    SpecimenStatus.ANALYSIS_COMPLETE,
    SpecimenStatus.RESULTED,
    SpecimenStatus.ARCHIVED,
];

export enum CollectionPoint {
    INPATIENT_FLOOR = 'Inpatient Floor',
    ED = 'Emergency Department',
    OUTPATIENT_CLINIC = 'Outpatient Clinic',
    ICU = 'Intensive Care Unit',
    OR = 'Operating Room',
    DIALYSIS = 'Dialysis Unit',
    ONCOLOGY = 'Oncology Unit',
}

export enum CourierStage {
    AWAITING_PICKUP = 'Awaiting Pickup',
    EN_ROUTE_TO_LAB = 'En Route to Lab',
    DELIVERED_TO_LAB = 'Delivered to Lab',
    DELAYED = 'Delayed',
}

export enum LabProcessingStage {
    RECEIVING = 'Receiving',
    SPECIMEN_PREP = 'Specimen Prep',
    TESTING = 'Testing',
    QUALITY_CHECK = 'Quality Check',
    REPORTING = 'Reporting',
    COMPLETE = 'Complete',
}

// ============================================================================
// 6. INFRASTRUCTURE
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
