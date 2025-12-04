/**
 * Canonical taxonomies for all platform domains
 * Ensures consistency across animations, demos, and dashboards
 * Requirement: R5.1, R5.2
 */

// ==================== ASSET DOMAIN ====================

export enum AssetStatus {
  CLEAN = 'Clean',
  IN_USE = 'In Use',
  SOILED = 'Soiled',
  NEEDS_REPAIR = 'Needs Repair',
  IN_REPAIR = 'In Repair',
  REPAIRED = 'Repaired',
  NEEDS_SANITIZATION = 'Needs Sanitization',
  SANITIZED = 'Sanitized',
  READY_FOR_PICKUP = 'Ready for Pick-up',
  IN_TRANSIT = 'In Transit',
  MISSING = 'Missing',
  DECOMMISSIONED = 'Decommissioned'
}

export enum RoomType {
  PATIENT_ROOM = 'Patient Room',
  OPERATING_ROOM = 'Operating Room',
  ICU = 'ICU',
  EMERGENCY_DEPT = 'Emergency Department',
  CLEAN_UTILITY = 'Clean Utility',
  SOILED_UTILITY = 'Soiled Utility',
  CENTRAL_STERILE = 'Central Sterile',
  BIOMED_SHOP = 'Biomed Shop',
  RADIOLOGY = 'Radiology',
  LABORATORY = 'Laboratory',
  PHARMACY = 'Pharmacy',
  STORAGE_BASEMENT = 'Storage Basement',
  LOADING_DOCK = 'Loading Dock',
  HALLWAY = 'Hallway',
  WAREHOUSE = 'Warehouse'
}

export enum AssetCategory {
  SURGICAL_EQUIPMENT = 'Surgical Equipment',
  IMAGING_DEVICES = 'Imaging Devices',
  PATIENT_MONITORS = 'Patient Monitors',
  INFUSION_PUMPS = 'Infusion Pumps',
  BEDS_STRETCHERS = 'Beds & Stretchers',
  WHEELCHAIRS = 'Wheelchairs',
  RESPIRATORY_EQUIPMENT = 'Respiratory Equipment',
  DIAGNOSTIC_TOOLS = 'Diagnostic Tools'
}

// ==================== SPECIMEN DOMAIN ====================

export enum SpecimenType {
  BLOOD_DRAW = 'Blood Draw',
  TISSUE_BIOPSY = 'Tissue Biopsy',
  PATHOLOGY_BLOCK = 'Pathology Block',
  FROZEN_SECTION = 'Frozen Section',
  URINE = 'Urine',
  MICROBIOLOGY = 'Microbiology',
  CYTOLOGY = 'Cytology',
  BONE_MARROW = 'Bone Marrow'
}

export enum SpecimenStage {
  COLLECTION_POINT = 'Collection Point',
  AWAITING_COURIER = 'Awaiting Courier',
  IN_COURIER_TRANSIT = 'In Courier Transit',
  LAB_RECEIVING = 'Lab Receiving',
  LAB_PROCESSING = 'Lab Processing',
  LAB_ANALYSIS = 'Lab Analysis',
  LAB_STORAGE = 'Lab Storage',
  PATHOLOGY_REVIEW = 'Pathology Review',
  COMPLETED = 'Completed',
  DISPOSED = 'Disposed'
}

export enum CustodyBreakSeverity {
  CRITICAL = 'Critical',
  HIGH = 'High',
  MEDIUM = 'Medium',
  LOW = 'Low'
}

// ==================== TRANSFUSION/BLOOD BANK ====================

export enum BloodType {
  A_POSITIVE = 'A+',
  A_NEGATIVE = 'A-',
  B_POSITIVE = 'B+',
  B_NEGATIVE = 'B-',
  AB_POSITIVE = 'AB+',
  AB_NEGATIVE = 'AB-',
  O_POSITIVE = 'O+',
  O_NEGATIVE = 'O-'
}

export enum BloodComponent {
  WHOLE_BLOOD = 'Whole Blood',
  PACKED_RBC = 'Packed RBC',
  PLATELETS = 'Platelets',
  FRESH_FROZEN_PLASMA = 'Fresh Frozen Plasma',
  CRYOPRECIPITATE = 'Cryoprecipitate',
  GRANULOCYTES = 'Granulocytes'
}

export enum BloodUnitStatus {
  IN_INVENTORY = 'In Inventory',
  RESERVED = 'Reserved',
  ISSUED = 'Issued',
  TRANSFUSED = 'Transfused',
  EXPIRED = 'Expired',
  QUARANTINED = 'Quarantined',
  RETURNED = 'Returned',
  WASTED = 'Wasted'
}

// ==================== SUPPLY CHAIN ====================

export enum SupplyLocation {
  CENTRAL_WAREHOUSE = 'Central Warehouse',
  DEPARTMENT_STORAGE = 'Department Storage',
  PAR_LEVEL_CABINET = 'PAR Level Cabinet',
  PHARMACY_STORAGE = 'Pharmacy Storage',
  COLD_STORAGE = 'Cold Storage',
  SECURE_STORAGE = 'Secure Storage',
  IN_TRANSIT_VENDOR = 'In Transit (Vendor)',
  IN_TRANSIT_INTERNAL = 'In Transit (Internal)',
  IN_USE = 'In Use',
  QUARANTINE = 'Quarantine'
}

export enum SupplyCategory {
  PHARMACEUTICALS = 'Pharmaceuticals',
  SURGICAL_SUPPLIES = 'Surgical Supplies',
  PPE = 'Personal Protective Equipment',
  LAB_REAGENTS = 'Lab Reagents',
  IMPLANTS = 'Implants',
  WOUND_CARE = 'Wound Care',
  IV_SOLUTIONS = 'IV Solutions',
  MEDICAL_DEVICES = 'Medical Devices'
}

// ==================== INFRASTRUCTURE ====================

export enum GatewayStatus {
  ONLINE = 'Online',
  OFFLINE = 'Offline',
  DEGRADED = 'Degraded',
  MAINTENANCE = 'Maintenance'
}

export enum TagBatteryStatus {
  HEALTHY = 'Healthy',
  WARNING = 'Warning',
  LOW = 'Low',
  CRITICAL = 'Critical'
}

// ==================== PREVENTIVE MAINTENANCE ====================

export enum PMTaskStatus {
  SCHEDULED = 'Scheduled',
  IN_PROGRESS = 'In Progress',
  COMPLETED = 'Completed',
  OVERDUE = 'Overdue',
  CANCELLED = 'Cancelled',
  PENDING_PARTS = 'Pending Parts'
}

export enum PMPriority {
  ROUTINE = 'Routine',
  URGENT = 'Urgent',
  CRITICAL = 'Critical'
}

// ==================== ALERT TYPES ====================

export enum AlertSeverity {
  CRITICAL = 'Critical',
  WARNING = 'Warning',
  INFO = 'Info',
  SUCCESS = 'Success'
}

export enum AlertType {
  TEMPERATURE = 'Temperature',
  STOCK_LEVEL = 'Stock Level',
  EXPIRY = 'Expiry',
  CUSTODY_BREAK = 'Custody Break',
  GATEWAY_OFFLINE = 'Gateway Offline',
  TAG_BATTERY_LOW = 'Tag Battery Low',
  ASSET_MISSING = 'Asset Missing',
  PM_OVERDUE = 'PM Overdue',
  COMPLIANCE = 'Compliance'
}

// ==================== HELPER FUNCTIONS ====================

export const getStatusColor = (status: string): string => {
  const colorMap: Record<string, string> = {
    // Asset statuses
    [AssetStatus.CLEAN]: 'green',
    [AssetStatus.IN_USE]: 'blue',
    [AssetStatus.SOILED]: 'yellow',
    [AssetStatus.NEEDS_REPAIR]: 'orange',
    [AssetStatus.IN_REPAIR]: 'orange',
    [AssetStatus.REPAIRED]: 'green',
    [AssetStatus.NEEDS_SANITIZATION]: 'yellow',
    [AssetStatus.SANITIZED]: 'green',
    [AssetStatus.MISSING]: 'red',
    
    // PM statuses
    [PMTaskStatus.COMPLETED]: 'green',
    [PMTaskStatus.IN_PROGRESS]: 'blue',
    [PMTaskStatus.SCHEDULED]: 'gray',
    [PMTaskStatus.OVERDUE]: 'red',
    
    // Gateway statuses
    [GatewayStatus.ONLINE]: 'green',
    [GatewayStatus.OFFLINE]: 'red',
    [GatewayStatus.DEGRADED]: 'yellow',
  };
  
  return colorMap[status] || 'gray';
};

export const getSeverityColor = (severity: AlertSeverity | CustodyBreakSeverity): string => {
  // Check which enum type it is and return appropriate color
  if (severity === AlertSeverity.CRITICAL || severity === CustodyBreakSeverity.CRITICAL) {
    return 'red';
  }
  if (severity === AlertSeverity.WARNING) {
    return 'yellow';
  }
  if (severity === AlertSeverity.INFO) {
    return 'blue';
  }
  if (severity === AlertSeverity.SUCCESS) {
    return 'green';
  }
  if (severity === CustodyBreakSeverity.HIGH) {
    return 'orange';
  }
  if (severity === CustodyBreakSeverity.MEDIUM) {
    return 'yellow';
  }
  if (severity === CustodyBreakSeverity.LOW) {
    return 'blue';
  }
  
  return 'gray';
};
