/**
 * ENTERPRISE-SCALE DATA SOURCE
 * Single source of truth for all workflow digitization metrics
 * Scaled for Cleveland Clinic / Baptist Health-sized hospitals
 * (~3,000+ beds, 6M+ annual patients)
 */

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export interface DigitizationTile {
  label: string;
  value: number;
  secondary: string;
  icon: string;
  description: string;
  href: string;
}

export interface Hospital {
  id: number;
  name: string;
  beds: number;
  location: string;
}

export interface BloodInventory {
  id: number;
  name: string;
  bags: number;
  alerts: number;
  tempAlerts: number;
  location: string;
  beds: number;
}

export interface BloodTypeData {
  type: string;
  current: number;
  target: number;
  status: 'healthy' | 'low' | 'critical';
}

export interface TransfusionKPI {
  label: string;
  value: string | number;
  subtitle: string;
  trend?: string;
  status: 'success' | 'warning' | 'danger';
}

export interface DepartmentUsage {
  department: string;
  efficiency: number;
  unitsUsed: number;
  totalAllocated: number;
}

export interface ColdStorageUnit {
  id: number;
  hospital: string;
  freezers: number;
  departments: number;
  bags: number;
  alerts: number;
}

export interface FacilitySpecimen {
  facility: string;
  total: number;
  traceable: number;
  coverage: number;
  breaks: number;
  avgTAT: string;
}

export interface DepartmentSpecimen {
  dept: string;
  total: number;
  traceable: number;
  coverage: number;
  partial: number;
  missing: number;
  delays: number;
  avgTAT: string;
}

export interface SpecimenTypeData {
  type: string;
  total: number;
  traceable: number;
  coverage: number;
  risk: 'low' | 'medium' | 'high';
}

export interface SupplyChainKPI {
  label: string;
  value: string;
  subtitle: string;
  trend: string;
  status: 'success' | 'warning' | 'danger';
}

export interface HighRiskItem {
  id: string;
  name: string;
  category: string;
  status: 'critical' | 'warning' | 'normal';
  daysUntilExpiry: number;
  value: number;
  location: string;
}

export interface VendorIssue {
  id: number;
  vendor: string;
  issue: string;
  severity: 'high' | 'medium' | 'low';
  impact: string;
  reportedDate: string;
}

export interface GatewayData {
  id: string;
  name: string;
  zone: string;
  status: 'online' | 'offline' | 'warning';
  uptime: number;
  lastPing: string;
  tagsInRange: number;
}

export interface ServerData {
  id: string;
  name: string;
  status: 'healthy' | 'warning' | 'critical';
  cpu: number;
  memory: number;
  uptime: string;
}

export interface AssetStatus {
  label: string;
  current: number;
  total: number;
}

// ============================================================================
// TIER 1: DIGITIZATION TILES (Main Dashboard)
// ============================================================================

export const digitizationTiles: DigitizationTile[] = [
  {
    label: 'Biomedical assets',
    value: 99,
    secondary: '5005 Tagged items',
    icon: 'Package',
    description: 'Workflow digitization across all facilities',
    href: '/biomedical-assets',
  },
  {
    label: 'Lab Medicine',
    value: 96,
    secondary: 'last 7 days',
    icon: 'TestTube',
    description: 'Specimen tracking & traceability',
    href: '/lab-medicine',
  },
  {
    label: 'Transfusion Medicine',
    value: 92,
    secondary: 'Blood bank',
    icon: 'Droplet',
    description: 'Blood product lifecycle management',
    href: '/transfusion',
  },
  {
    label: 'Supply chain',
    value: 98.5,
    secondary: 'Tracked items',
    icon: 'Truck',
    description: 'Inventory & procurement workflows',
    href: '/supply-chain',
  },
  {
    label: 'Infra Health',
    value: 96,
    secondary: '98% tag health',
    icon: 'Settings',
    description: 'Gateway & RFID infrastructure status',
    href: '/infra-health',
  },
];

// ============================================================================
// TRANSFUSION MEDICINE DATA (92% Digitized)
// ============================================================================

export const transfusionData = {
  // Tier 2 Summary
  summary: {
    totalBloodBags: 4250, // Enterprise scale: 3,000-5,000 units
    activeAlerts: 48, // Scaled proportionally
    tempAlerts: 24,
    stockAlerts: 12,
    expiryAlerts: 12,
    hospitalCount: 18,
    dailyTransfusions: 320, // 200-400 daily
  },

  // Hospital Network
  hospitals: [
    { id: 1, name: 'Hospital - Detroit', bags: 520, alerts: 5, tempAlerts: 3, location: 'Central', beds: 850 },
    { id: 2, name: 'Hospital West Bloomfield', bags: 480, alerts: 4, tempAlerts: 2, location: 'North', beds: 720 },
    { id: 3, name: 'Hospital Macomb', bags: 445, alerts: 3, tempAlerts: 2, location: 'South', beds: 680 },
    { id: 4, name: 'Hospital Wyandotte', bags: 410, alerts: 6, tempAlerts: 4, location: 'Trauma', beds: 420 },
    { id: 5, name: 'Hospital Troy', bags: 385, alerts: 4, tempAlerts: 2, location: 'Surgical', beds: 380 },
    { id: 6, name: 'Hospital Sterling Heights', bags: 340, alerts: 3, tempAlerts: 1, location: 'Oncology', beds: 320 },
    { id: 7, name: 'St. John Hospital', bags: 315, alerts: 2, tempAlerts: 1, location: 'Cardiac', beds: 280 },
    { id: 8, name: 'Jackson Hospital', bags: 290, alerts: 3, tempAlerts: 2, location: 'Women', beds: 250 },
    { id: 9, name: 'Genesys Hospital', bags: 265, alerts: 2, tempAlerts: 1, location: 'Pediatric', beds: 220 },
    { id: 10, name: 'Warren Hospital', bags: 240, alerts: 4, tempAlerts: 2, location: 'Transplant', beds: 180 },
    { id: 11, name: 'Providence Southfield Hospital', bags: 195, alerts: 2, tempAlerts: 1, location: 'East', beds: 150 },
    { id: 12, name: 'Providence Novi Hospital', bags: 180, alerts: 3, tempAlerts: 2, location: 'West', beds: 140 },
    { id: 13, name: 'Rochester Hospital', bags: 165, alerts: 1, tempAlerts: 0, location: 'Outpatient', beds: 80 },
    { id: 14, name: 'River District Hospital', bags: 145, alerts: 2, tempAlerts: 1, location: 'Rehab', beds: 120 },
    { id: 15, name: 'Madison Heights Hospital', bags: 125, alerts: 1, tempAlerts: 0, location: 'Behavioral', beds: 100 },
    { id: 16, name: 'Madison Heights Hospital', bags: 110, alerts: 1, tempAlerts: 0, location: 'LTC', beds: 90 },
    { id: 17, name: 'Madison Heights Hospital', bags: 95, alerts: 1, tempAlerts: 0, location: 'Regional', beds: 75 },
    { id: 18, name: 'Madison Heights Hospital', bags: 75, alerts: 1, tempAlerts: 0, location: 'Urgent', beds: 45 },
  ] as BloodInventory[],

  // Blood Type Distribution (Total: 4,250 units)
  bloodTypes: [
    { type: 'A+', current: 1275, target: 1200, status: 'healthy' as const },
    { type: 'O+', current: 1105, target: 1100, status: 'healthy' as const },
    { type: 'B+', current: 680, target: 650, status: 'healthy' as const },
    { type: 'AB+', current: 510, target: 500, status: 'healthy' as const },
    { type: 'A-', current: 280, target: 300, status: 'low' as const },
    { type: 'O-', current: 225, target: 250, status: 'low' as const },
    { type: 'B-', current: 115, target: 120, status: 'healthy' as const },
    { type: 'AB-', current: 60, target: 55, status: 'healthy' as const },
  ] as BloodTypeData[],

  // Tier 3: KPI Cards (Scaled for enterprise)
  kpis: [
    {
      label: 'Contamination Prevention',
      value: '186',
      subtitle: 'Active alerts, 420 prevented last month',
      trend: '-12%',
      status: 'warning' as const,
    },
    {
      label: 'Chain of Custody',
      value: '96.2%',
      subtitle: 'Compliance rate, 91.8% traceability',
      trend: '+2.1%',
      status: 'success' as const,
    },
    {
      label: 'Inventory Management',
      value: '4,250',
      subtitle: 'Total units, 97.8% accuracy',
      trend: '+3.5%',
      status: 'success' as const,
    },
    {
      label: 'Cost Efficiency',
      value: '$2.4M',
      subtitle: 'Annual savings, 92% wastage reduction',
      trend: '+8.2%',
      status: 'success' as const,
    },
    {
      label: 'Response Time',
      value: '12 min',
      subtitle: 'Avg emergency response time',
      trend: '-3 min',
      status: 'success' as const,
    },
    {
      label: 'Return Rate',
      value: '2.8%',
      subtitle: 'Unused units returned, 148 missed scans',
      trend: '-1.2%',
      status: 'success' as const,
    },
    {
      label: 'Expiration Alert',
      value: '82',
      subtitle: 'Units expiring in 7 days, 186 total alerts',
      trend: '-15',
      status: 'warning' as const,
    },
    {
      label: 'Department Usage',
      value: '18,450',
      subtitle: 'Units transfused this month, 35 departments',
      trend: '+4.2%',
      status: 'success' as const,
    },
    {
      label: 'Blood Components',
      value: '4,250',
      subtitle: 'Total inventory across 5 component types',
      trend: 'Stable',
      status: 'success' as const,
    },
    {
      label: 'Most Used Component',
      value: 'RBC',
      subtitle: '2,890 units (68% of total usage)',
      trend: '+2.1%',
      status: 'success' as const,
    },
    {
      label: 'Critical Stock Alert',
      value: 'A- Type',
      subtitle: '280 units (below 300 target)',
      trend: '-20 units',
      status: 'warning' as const,
    },
    {
      label: 'Storage Compliance',
      value: '98.5%',
      subtitle: 'Temperature compliance, 48 active monitors',
      trend: '+0.5%',
      status: 'success' as const,
    },
  ] as TransfusionKPI[],

  // Department Usage (35 departments)
  departmentUsage: [
    { department: 'Emergency Department', efficiency: 0.98, unitsUsed: 3850, totalAllocated: 3930 },
    { department: 'Surgical Services', efficiency: 0.96, unitsUsed: 3420, totalAllocated: 3563 },
    { department: 'Trauma Center', efficiency: 0.97, unitsUsed: 2890, totalAllocated: 2979 },
    { department: 'Intensive Care Unit', efficiency: 0.94, unitsUsed: 2340, totalAllocated: 2489 },
    { department: 'Oncology', efficiency: 0.95, unitsUsed: 1820, totalAllocated: 1916 },
    { department: 'Cardiac Surgery', efficiency: 0.93, unitsUsed: 1540, totalAllocated: 1656 },
    { department: 'Transplant Services', efficiency: 0.91, unitsUsed: 1280, totalAllocated: 1407 },
    { department: 'Obstetrics', efficiency: 0.89, unitsUsed: 890, totalAllocated: 1000 },
    { department: 'Orthopedic Surgery', efficiency: 0.87, unitsUsed: 720, totalAllocated: 828 },
    { department: 'Neurosurgery', efficiency: 0.86, unitsUsed: 650, totalAllocated: 756 },
  ] as DepartmentUsage[],

  // Cold Storage (48 facilities with monitoring)
  coldStorage: [
    { id: 1, hospital: 'Main Hospital - Central', freezers: 12, departments: 8, bags: 520, alerts: 5 },
    { id: 2, hospital: 'Main Hospital - North', freezers: 10, departments: 7, bags: 480, alerts: 4 },
    { id: 3, hospital: 'Main Hospital - South', freezers: 9, departments: 6, bags: 445, alerts: 3 },
    { id: 4, hospital: 'Emergency Trauma Center', freezers: 8, departments: 5, bags: 410, alerts: 6 },
    { id: 5, hospital: 'Surgical Pavilion', freezers: 7, departments: 6, bags: 385, alerts: 4 },
    { id: 6, hospital: 'Cancer Treatment Center', freezers: 6, departments: 5, bags: 340, alerts: 3 },
    { id: 7, hospital: 'Cardiac Care Center', freezers: 5, departments: 4, bags: 315, alerts: 2 },
    { id: 8, hospital: 'Women\'s Hospital', freezers: 5, departments: 4, bags: 290, alerts: 3 },
    { id: 9, hospital: 'Children\'s Hospital', freezers: 4, departments: 4, bags: 265, alerts: 2 },
  ] as ColdStorageUnit[],

  // Blood Components Breakdown
  components: [
    { type: 'RBC (Red Blood Cells)', units: 2550, percentage: 60, usage: 'High', priority: 1 },
    { type: 'FFP (Fresh Frozen Plasma)', units: 850, percentage: 20, usage: 'Medium', priority: 2 },
    { type: 'Platelets', units: 510, percentage: 12, usage: 'Medium', priority: 3 },
    { type: 'Cryoprecipitate', units: 255, percentage: 6, usage: 'Low', priority: 4 },
    { type: 'Whole Blood', units: 85, percentage: 2, usage: 'Low', priority: 5 },
  ],
};

// ============================================================================
// LAB MEDICINE / SPECIMEN DATA (96% Digitized)
// ============================================================================

export const labMedicineData = {
  // Tier 2 Summary
  summary: {
    digitizationCoverage: 96,
    totalSpecimens7Days: 125000, // Enterprise scale: 15-25K daily
    dailyAverage: 17850,
    fullyTracked: 96,
    gapsPercentage: 4,
    trendImprovement: 2,
    facilityCount: 18,
    departmentCount: 32,
  },

  // Weekly trend data (12 weeks)
  trendData: [
    { week: 'W1', value: 86, specimens: 108000 },
    { week: 'W2', value: 88, specimens: 112000 },
    { week: 'W3', value: 89, specimens: 114500 },
    { week: 'W4', value: 90, specimens: 116000 },
    { week: 'W5', value: 91, specimens: 118500 },
    { week: 'W6', value: 92, specimens: 120000 },
    { week: 'W7', value: 92, specimens: 121000 },
    { week: 'W8', value: 93, specimens: 122500 },
    { week: 'W9', value: 94, specimens: 123500 },
    { week: 'W10', value: 95, specimens: 124000 },
    { week: 'W11', value: 95, specimens: 124500 },
    { week: 'W12', value: 96, specimens: 125000 },
  ],

  // Coverage by Facility (18 major facilities)
  facilities: [
    { facility: 'Main Lab - Central Campus', total: 28500, traceable: 27360, coverage: 96, breaks: 42, avgTAT: '38 min' },
    { facility: 'Main Lab - North Tower', total: 22400, traceable: 21280, coverage: 95, breaks: 38, avgTAT: '41 min' },
    { facility: 'Emergency Department Lab', total: 18200, traceable: 16380, coverage: 90, breaks: 88, avgTAT: '52 min' },
    { facility: 'OR Pathology Lab', total: 14800, traceable: 12580, coverage: 85, breaks: 122, avgTAT: '64 min' },
    { facility: 'ICU Point-of-Care Lab', total: 11200, traceable: 10528, coverage: 94, breaks: 28, avgTAT: '28 min' },
    { facility: 'Oncology Lab', total: 8900, traceable: 8544, coverage: 96, breaks: 18, avgTAT: '44 min' },
    { facility: 'Cardiac Cath Lab', total: 6400, traceable: 6144, coverage: 96, breaks: 12, avgTAT: '35 min' },
    { facility: 'Microbiology Lab', total: 5200, traceable: 4992, coverage: 96, breaks: 8, avgTAT: '48 min' },
    { facility: 'Blood Bank Lab', total: 3800, traceable: 3686, coverage: 97, breaks: 6, avgTAT: '32 min' },
    { facility: 'Outpatient Lab Network', total: 2900, traceable: 2726, coverage: 94, breaks: 14, avgTAT: '55 min' },
    { facility: 'Community Hospital - East Lab', total: 1250, traceable: 1175, coverage: 94, breaks: 8, avgTAT: '46 min' },
    { facility: 'Community Hospital - West Lab', total: 1050, traceable: 987, coverage: 94, breaks: 6, avgTAT: '48 min' },
  ] as FacilitySpecimen[],

  // Coverage by Department (32 departments)
  departments: [
    { dept: 'Central Laboratory', total: 32400, traceable: 31104, coverage: 96, partial: 648, missing: 648, delays: 82, avgTAT: '42 min' },
    { dept: 'Emergency Department', total: 18500, traceable: 15355, coverage: 83, partial: 925, missing: 1220, delays: 245, avgTAT: '58 min' },
    { dept: 'Intensive Care Units', total: 14200, traceable: 13206, coverage: 93, partial: 426, missing: 568, delays: 118, avgTAT: '35 min' },
    { dept: 'Operating Rooms', total: 12800, traceable: 9984, coverage: 78, partial: 1024, missing: 1792, delays: 352, avgTAT: '72 min' },
    { dept: 'Medical/Surgical Floors', total: 11500, traceable: 10810, coverage: 94, partial: 345, missing: 345, delays: 92, avgTAT: '48 min' },
    { dept: 'Oncology', total: 9200, traceable: 8832, coverage: 96, partial: 184, missing: 184, delays: 38, avgTAT: '44 min' },
    { dept: 'Cardiology', total: 6800, traceable: 6528, coverage: 96, partial: 136, missing: 136, delays: 28, avgTAT: '40 min' },
    { dept: 'Pediatrics', total: 5400, traceable: 5184, coverage: 96, partial: 108, missing: 108, delays: 22, avgTAT: '38 min' },
    { dept: 'Obstetrics', total: 4200, traceable: 4032, coverage: 96, partial: 84, missing: 84, delays: 18, avgTAT: '36 min' },
    { dept: 'Outpatient Clinics', total: 3600, traceable: 3456, coverage: 96, partial: 72, missing: 72, delays: 14, avgTAT: '52 min' },
  ] as DepartmentSpecimen[],

  // Coverage by Specimen Type
  specimenTypes: [
    { type: 'Blood Draw', total: 52500, traceable: 47775, coverage: 91, risk: 'medium' as const },
    { type: 'Tissue Biopsy', total: 18750, traceable: 16688, coverage: 89, risk: 'medium' as const },
    { type: 'Pathology Block', total: 15625, traceable: 14688, coverage: 94, risk: 'low' as const },
    { type: 'Frozen Section', total: 12500, traceable: 10875, coverage: 87, risk: 'high' as const },
    { type: 'Urine Sample', total: 11250, traceable: 10463, coverage: 93, risk: 'low' as const },
    { type: 'Microbiology Culture', total: 8125, traceable: 7719, coverage: 95, risk: 'low' as const },
    { type: 'Cytology', total: 6250, traceable: 5938, coverage: 95, risk: 'low' as const },
  ] as SpecimenTypeData[],

  // Custody Breaks (last 30 days)
  custodyBreaks: {
    total: 618,
    byFacility: [
      { facility: 'OR Pathology Lab', breaks: 122 },
      { facility: 'Emergency Department Lab', breaks: 88 },
      { facility: 'Main Lab - Central', breaks: 42 },
      { facility: 'Main Lab - North', breaks: 38 },
      { facility: 'ICU Point-of-Care Lab', breaks: 28 },
    ],
    bySeverity: {
      critical: 48,
      high: 124,
      medium: 246,
      low: 200,
    },
  },

  // Transit Analytics
  transit: {
    avgTransitTime: '46 min',
    courierDelays: 18,
    missedScans: 4,
    totalRoutes: 42,
    onTimePercentage: 82,
  },
};

// ============================================================================
// SUPPLY CHAIN DATA (98.5% Digitized)
// ============================================================================

export const supplyChainData = {
  // Tier 2 Summary
  summary: {
    healthScore: 98.5,
    trendChange: 0.5,
    monthlySpend: 18500000, // $18.5M (enterprise scale)
    spendChange: 2.1,
    criticalAvailability: 98.5,
    wastageIndex: 1.5,
    wastageTarget: 1.0,
    totalSKUs: 62000,
    activeVendors: 285,
  },

  // High Risk Items (650 items tracked)
  highRiskItems: [
    { id: 'MED-8821', name: 'Surgical Mesh Implant - Large', category: 'Surgical', status: 'critical' as const, daysUntilExpiry: 4, value: 8500, location: 'OR-Main' },
    { id: 'MED-8822', name: 'Cardiac Stent Set - Premium', category: 'Cardiac', status: 'critical' as const, daysUntilExpiry: 5, value: 12400, location: 'Cath Lab' },
    { id: 'MED-7743', name: 'Orthopedic Plate System', category: 'Orthopedic', status: 'warning' as const, daysUntilExpiry: 12, value: 6800, location: 'OR-Ortho' },
    { id: 'MED-6654', name: 'Neurosurgery Drill Bits', category: 'Neurosurgery', status: 'warning' as const, daysUntilExpiry: 14, value: 4200, location: 'OR-Neuro' },
    { id: 'MED-5565', name: 'Specialty Sutures - 2/0', category: 'Surgical', status: 'warning' as const, daysUntilExpiry: 18, value: 2800, location: 'Central Supply' },
    { id: 'MED-4476', name: 'IV Contrast Agent - 500ml', category: 'Radiology', status: 'normal' as const, daysUntilExpiry: 22, value: 1850, location: 'Radiology' },
  ] as HighRiskItem[],

  // Expiring Items (6,200 units expiring in 30 days)
  expiringItems: {
    total: 6200,
    totalValue: 2850000, // $2.85M
    urgent: 48, // ≤7 days
    urgentValue: 420000,
    byCategory: [
      { category: 'Surgical Supplies', units: 1850, value: 920000 },
      { category: 'Pharmaceuticals', units: 1420, value: 680000 },
      { category: 'Implants & Devices', units: 980, value: 540000 },
      { category: 'Diagnostic Supplies', units: 820, value: 310000 },
      { category: 'Patient Care Items', units: 680, value: 240000 },
      { category: 'Lab Reagents', units: 450, value: 160000 },
    ],
  },

  // Vendor Issues (24 issues this month)
  vendorIssues: [
    { id: 1, vendor: 'MedTech Surgical Supply', issue: 'Late delivery - Critical OR supplies', severity: 'high' as const, impact: '3 surgeries delayed', reportedDate: '2025-11-28' },
    { id: 2, vendor: 'Cardinal Health Pharmaceuticals', issue: 'Wrong items shipped', severity: 'high' as const, impact: '$45K order incorrect', reportedDate: '2025-11-26' },
    { id: 3, vendor: 'Stryker Equipment', issue: 'Quality control failure', severity: 'medium' as const, impact: '8 units returned', reportedDate: '2025-11-24' },
    { id: 4, vendor: 'BD Medical Supplies', issue: 'Partial shipment received', severity: 'medium' as const, impact: '40% of order missing', reportedDate: '2025-11-22' },
    { id: 5, vendor: 'Johnson & Johnson Medical', issue: 'Pricing discrepancy', severity: 'low' as const, impact: '$12K overcharge', reportedDate: '2025-11-20' },
    { id: 6, vendor: 'Medline Industries', issue: 'Packaging damage', severity: 'low' as const, impact: '22 units damaged', reportedDate: '2025-11-18' },
    { id: 7, vendor: 'McKesson Medical', issue: 'Invoice reconciliation issue', severity: 'low' as const, impact: 'Billing dispute', reportedDate: '2025-11-15' },
  ] as VendorIssue[],

  // Temperature Alerts (Cold Chain Monitoring)
  temperatureAlerts: [
    { id: 'FRIDGE-12', location: 'Pharmacy - Main', temp: 6.8, range: '2-6°C', status: 'critical', alertTime: '08:42 AM' },
    { id: 'FREEZER-04', location: 'Blood Bank', temp: -18.5, range: '-20 to -15°C', status: 'warning', alertTime: '09:15 AM' },
    { id: 'FRIDGE-28', location: 'OR Pre-Op', temp: 6.2, range: '2-6°C', status: 'warning', alertTime: '10:30 AM' },
  ],

  // KPI Tabs Data
  kpis: {
    inventory: {
      availability: 98.5,
      daysOnHand: 28,
      fillRate: 96,
      stockouts: 12,
      overstock: 248,
    },
    procurement: {
      cycleTime: 2.8, // days
      onTimeDelivery: 91,
      contractCompliance: 94,
      poAccuracy: 97,
      supplierPerformance: 89,
    },
    cost: {
      wastageYTD: 4200000, // $4.2M
      priceVariance: 3.4,
      leadTime: 4.2, // days
      savingsOpportunity: 2800000, // $2.8M
    },
    coldChain: {
      overallCompliance: 97,
      activeAlerts: 3,
      monitoredUnits: 124,
      temperatureExcursions: 18,
    },
  } as const,
};

// ============================================================================
// INFRASTRUCTURE HEALTH DATA (96% Digitized)
// ============================================================================

export const infraHealthData = {
  // Tier 2 Summary
  summary: {
    gatewayUptime: 96,
    gatewaysOnline: 468,
    gatewaysTotal: 485,
    rfidTagHealth: 98,
    tagsActive: 42840,
    tagsTotal: 43714,
    taggingCoverage: 74.3,
    assetsTagged: 42840,
    assetsTotal: 57650,
    realTimeVisibility: 98.5,
    visibleAssets: 42198,
    networkCoverage: 94.5,
  },

  // Gateway Network (485 gateways across campus)
  gateways: [
    { id: 'GW-MAIN-01', name: 'Main Hospital - Lobby', zone: 'Main Entrance', status: 'online' as const, uptime: 99.8, lastPing: '2 sec ago', tagsInRange: 145 },
    { id: 'GW-MAIN-02', name: 'Main Hospital - ER Entry', zone: 'Emergency', status: 'online' as const, uptime: 99.5, lastPing: '1 sec ago', tagsInRange: 198 },
    { id: 'GW-ED-01', name: 'Emergency Dept - Zone 1', zone: 'Emergency', status: 'offline' as const, uptime: 0, lastPing: '2 hours ago', tagsInRange: 0 },
    { id: 'GW-ED-02', name: 'Emergency Dept - Zone 2', zone: 'Emergency', status: 'online' as const, uptime: 98.2, lastPing: '3 sec ago', tagsInRange: 176 },
    { id: 'GW-OR-01', name: 'OR Suite - Level 3', zone: 'Operating Rooms', status: 'online' as const, uptime: 99.9, lastPing: '1 sec ago', tagsInRange: 224 },
    { id: 'GW-OR-02', name: 'OR Suite - Level 4', zone: 'Operating Rooms', status: 'online' as const, uptime: 99.7, lastPing: '2 sec ago', tagsInRange: 212 },
    { id: 'GW-ICU-01', name: 'ICU - North Wing', zone: 'Intensive Care', status: 'online' as const, uptime: 99.6, lastPing: '1 sec ago', tagsInRange: 168 },
    { id: 'GW-ICU-02', name: 'ICU - South Wing', zone: 'Intensive Care', status: 'online' as const, uptime: 99.4, lastPing: '2 sec ago', tagsInRange: 154 },
    { id: 'GW-LAB-01', name: 'Central Lab - Processing', zone: 'Laboratory', status: 'online' as const, uptime: 99.8, lastPing: '1 sec ago', tagsInRange: 189 },
    { id: 'GW-LAB-02', name: 'Central Lab - Storage', zone: 'Laboratory', status: 'online' as const, uptime: 99.5, lastPing: '3 sec ago', tagsInRange: 142 },
  ] as GatewayData[],

  // Tag Battery Status (42,840 active tags)
  tagBatteries: {
    healthy: 39420, // 80-100%
    warning: 2568, // 50-80%
    low: 684, // 20-50%
    critical: 168, // <20%
    needReplacement: 852, // <50%
  },

  // Read Success Rate (24 hours)
  readSuccess: {
    overallRate: 98.6,
    totalReads: 6240000, // 6.24M reads per day
    successfulReads: 6152640,
    missedReads: 87360,
  },

  // Data Sync Latency
  syncLatency: {
    current: 1.2, // seconds
    peak: 1.8,
    average: 1.4,
    target: 2.0,
  },

  // Network Infrastructure
  network: {
    uptime: 99.8,
    bandwidth: 95.2, // % utilization
    latency: 8, // ms
    packetLoss: 0.02, // %
  },

  // Server Health (12 servers)
  servers: [
    { id: 'SRV-DB-01', name: 'Database Primary', status: 'healthy' as const, cpu: 45, memory: 68, uptime: '99.9%' },
    { id: 'SRV-DB-02', name: 'Database Replica', status: 'healthy' as const, cpu: 38, memory: 62, uptime: '99.8%' },
    { id: 'SRV-APP-01', name: 'Application Server 1', status: 'healthy' as const, cpu: 52, memory: 71, uptime: '99.7%' },
    { id: 'SRV-APP-02', name: 'Application Server 2', status: 'healthy' as const, cpu: 48, memory: 69, uptime: '99.9%' },
    { id: 'SRV-API-01', name: 'API Gateway', status: 'healthy' as const, cpu: 42, memory: 58, uptime: '99.9%' },
    { id: 'SRV-CACHE-01', name: 'Cache Server', status: 'healthy' as const, cpu: 28, memory: 84, uptime: '99.8%' },
    { id: 'SRV-QUEUE-01', name: 'Message Queue', status: 'healthy' as const, cpu: 35, memory: 54, uptime: '99.9%' },
    { id: 'SRV-ANALYTICS-01', name: 'Analytics Engine', status: 'healthy' as const, cpu: 64, memory: 76, uptime: '99.6%' },
  ] as ServerData[],

  // Zone Coverage (150+ zones)
  zoneCoverage: [
    { zone: 'Emergency Department', coverage: 80, gateways: 15, reason: '1 gateway offline (GW-ED-01)' },
    { zone: 'Operating Rooms', coverage: 98, gateways: 32, reason: 'Optimal coverage' },
    { zone: 'Intensive Care Units', coverage: 97, gateways: 24, reason: 'Optimal coverage' },
    { zone: 'Patient Floors', coverage: 94, gateways: 85, reason: 'Normal operations' },
    { zone: 'Laboratory Services', coverage: 96, gateways: 18, reason: 'Optimal coverage' },
    { zone: 'Radiology', coverage: 95, gateways: 22, reason: 'Normal operations' },
    { zone: 'Pharmacy', coverage: 98, gateways: 12, reason: 'Optimal coverage' },
    { zone: 'Supply Chain', coverage: 93, gateways: 28, reason: 'Normal operations' },
  ],
};

// ============================================================================
// BIOMEDICAL ASSETS DATA (99% Digitized)
// ============================================================================

export const biomedicalAssetsData = {
  // Tier 2 Summary
  summary: {
    assetsDigitized: 5005,
    pendingDigitization: 1729,
    totalAssets: 6734,
    digitizationPercentage: 74,
    dailyMovements: 420,
  },

  // Status Breakdown (Workflow States)
  statusBreakdown: [
    { label: 'Collected', current: 1240, total: 1350 },
    { label: 'Ready for Pick-up', current: 980, total: 1100 },
    { label: 'Picked-up', current: 1180, total: 1250 },
    { label: 'In Transit', current: 840, total: 950 },
    { label: 'Reached Destination', current: 5005, total: 5500 },
    { label: 'Unknown', current: 185, total: 350 },
  ] as AssetStatus[],

  // Yesterday's Pending (Comparison)
  yesterdayPending: {
    total: 95,
    collected: 42,
    readyForPickup: 28,
    inTransit: 25,
    unknown: 0,
  },

  // Bottom Metrics
  metrics: {
    overallCollected: 1240,
    assetsDigitized: 5005,
    assetsUnknown: 185,
    assetsMissing: 42,
    assetsDamaged: 18,
    maintenanceDue: 156,
    highValueAssets: 980,
  },

  // Asset Categories
  categories: [
    { category: 'Surgical Equipment', count: 1180, digitized: 885, percentage: 75 },
    { category: 'Imaging Devices', count: 420, digitized: 312, percentage: 74 },
    { category: 'Patient Monitors', count: 950, digitized: 702, percentage: 74 },
    { category: 'Infusion Pumps', count: 720, digitized: 536, percentage: 74 },
    { category: 'Ventilators', count: 285, digitized: 208, percentage: 73 },
    { category: 'Beds & Transport', count: 1340, digitized: 998, percentage: 75 },
    { category: 'Lab Equipment', count: 480, digitized: 352, percentage: 73 },
    { category: 'Wheelchairs & Mobility', count: 1359, digitized: 1012, percentage: 74 },
  ],
};
