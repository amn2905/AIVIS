import { 
  User, 
  InsuranceCompany, 
  Branch, 
  Vehicle, 
  Claim, 
  FraudAlert, 
  DashboardOverviewStats, 
  ActivityLog, 
  NotificationItem 
} from '../types';

export const mockUsers: User[] = [
  {
    id: 'usr-101',
    email: 'alex.vance@aivis-sec.io',
    fullName: 'Alex Vance',
    role: 'SUPER_ADMIN',
    companyId: 'comp-global',
    companyName: 'AIVIS Global Command',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
    status: 'ACTIVE',
    lastActive: 'Just now',
    permissions: ['all:*', 'claims:write', 'audit:read', 'roles:manage', 'companies:manage']
  },
  {
    id: 'usr-102',
    email: 'sarah.chen@metropolitan-ins.com',
    fullName: 'Sarah Chen',
    role: 'FRAUD_ANALYST',
    companyId: 'comp-1',
    companyName: 'Metropolitan Mutual Insurance',
    branchId: 'br-101',
    branchName: 'New York HQ Branch',
    avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=250',
    status: 'ACTIVE',
    lastActive: '5 mins ago',
    permissions: ['claims:read', 'claims:investigate', 'fraud:score', 'audit:read']
  },
  {
    id: 'usr-103',
    email: 'marcus.reid@apex-assurance.com',
    fullName: 'Marcus Reid',
    role: 'CLAIMS_INVESTIGATOR',
    companyId: 'comp-2',
    companyName: 'Apex Vehicle Assurance',
    branchId: 'br-202',
    branchName: 'London Financial Hub',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250',
    status: 'ACTIVE',
    lastActive: '12 mins ago',
    permissions: ['claims:read', 'claims:write', 'evidence:upload']
  },
  {
    id: 'usr-104',
    email: 'elena.rostova@nordic-shield.se',
    fullName: 'Elena Rostova',
    role: 'BRANCH_AUDITOR',
    companyId: 'comp-3',
    companyName: 'Nordic Shield Risk Group',
    branchId: 'br-301',
    branchName: 'Stockholm Central',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250',
    status: 'ACTIVE',
    lastActive: '1 hour ago',
    permissions: ['claims:read', 'audit:read', 'reports:export']
  }
];

export const mockCompanies: InsuranceCompany[] = [
  {
    id: 'comp-1',
    code: 'MMI-US',
    name: 'Metropolitan Mutual Insurance',
    taxId: 'US-884920194',
    country: 'United States',
    headquarters: 'New York, NY',
    activeBranches: 14,
    totalClaimsCount: 1420,
    status: 'ACTIVE',
    contactEmail: 'security@metropolitan-ins.com',
    createdAt: '2024-01-15'
  },
  {
    id: 'comp-2',
    code: 'AVA-UK',
    name: 'Apex Vehicle Assurance',
    taxId: 'GB-992014820',
    country: 'United Kingdom',
    headquarters: 'London, UK',
    activeBranches: 8,
    totalClaimsCount: 890,
    status: 'ACTIVE',
    contactEmail: 'risk@apex-assurance.com',
    createdAt: '2024-03-20'
  },
  {
    id: 'comp-3',
    code: 'NSR-SE',
    name: 'Nordic Shield Risk Group',
    taxId: 'SE-5560124422',
    country: 'Sweden',
    headquarters: 'Stockholm, Sweden',
    activeBranches: 5,
    totalClaimsCount: 450,
    status: 'ACTIVE',
    contactEmail: 'claims@nordic-shield.se',
    createdAt: '2024-06-10'
  }
];

export const mockBranches: Branch[] = [
  {
    id: 'br-101',
    companyId: 'comp-1',
    companyName: 'Metropolitan Mutual Insurance',
    code: 'NY-HQ',
    name: 'New York HQ Branch',
    city: 'New York',
    state: 'NY',
    country: 'United States',
    investigatorsCount: 18,
    activeClaimsCount: 42,
    status: 'ACTIVE',
    phone: '+1 (212) 555-0199'
  },
  {
    id: 'br-102',
    companyId: 'comp-1',
    companyName: 'Metropolitan Mutual Insurance',
    code: 'LA-WEST',
    name: 'Los Angeles Metro',
    city: 'Los Angeles',
    state: 'CA',
    country: 'United States',
    investigatorsCount: 12,
    activeClaimsCount: 29,
    status: 'ACTIVE',
    phone: '+1 (310) 555-0144'
  },
  {
    id: 'br-202',
    companyId: 'comp-2',
    companyName: 'Apex Vehicle Assurance',
    code: 'LDN-CENTRAL',
    name: 'London Financial Hub',
    city: 'London',
    state: 'Greater London',
    country: 'United Kingdom',
    investigatorsCount: 10,
    activeClaimsCount: 22,
    status: 'ACTIVE',
    phone: '+44 20 7946 0912'
  }
];

export const mockVehicles: Vehicle[] = [
  {
    id: 'veh-901',
    vin: '1G1YC2D75H5104821',
    make: 'Chevrolet',
    model: 'Corvette Stingray',
    year: 2023,
    licensePlate: '7XYZ890',
    registrationState: 'NY',
    category: 'Sedan',
    engineNumber: 'ENG-8829104',
    color: 'Torch Red',
    ownerName: 'Robert Sterling',
    ownerNationalId: 'SSN-***-**-4912',
    stolenCheckStatus: 'FLAGGED',
    riskScore: 89,
    telematics: {
      hardBrakingEvents: 14,
      rapidAccelerationEvents: 22,
      speedingIncidents: 9,
      nighttimeMilesPct: 68,
      lastKnownOdometer: 18450,
      odometerTamperAlert: true
    }
  },
  {
    id: 'veh-902',
    vin: '5YJSA1E28MF984210',
    make: 'Tesla',
    model: 'Model S Plaid',
    year: 2024,
    licensePlate: 'EV-882-99',
    registrationState: 'CA',
    category: 'EV / Hybrid',
    engineNumber: 'DUAL-MOT-9910',
    color: 'Deep Blue Metallic',
    ownerName: 'David K. Miller',
    ownerNationalId: 'SSN-***-**-8120',
    stolenCheckStatus: 'CLEAR',
    riskScore: 94,
    telematics: {
      hardBrakingEvents: 8,
      rapidAccelerationEvents: 31,
      speedingIncidents: 12,
      nighttimeMilesPct: 45,
      lastKnownOdometer: 8200,
      odometerTamperAlert: true
    }
  },
  {
    id: 'veh-903',
    vin: '1FTFW1ED4MFC88921',
    make: 'Ford',
    model: 'F-150 Lightning',
    year: 2023,
    licensePlate: 'TRK-9041',
    registrationState: 'TX',
    category: 'Commercial Truck',
    engineNumber: 'MOT-FORD-3391',
    color: 'Oxford White',
    ownerName: 'Apex Logistics LLC',
    ownerNationalId: 'EIN-82-994102',
    stolenCheckStatus: 'CLEAR',
    riskScore: 42,
    telematics: {
      hardBrakingEvents: 2,
      rapidAccelerationEvents: 1,
      speedingIncidents: 0,
      nighttimeMilesPct: 15,
      lastKnownOdometer: 42300,
      odometerTamperAlert: false
    }
  },
  {
    id: 'veh-904',
    vin: 'WBA53BJ04MCE19283',
    make: 'BMW',
    model: 'X5 xDrive40i',
    year: 2022,
    licensePlate: 'BMW-3301',
    registrationState: 'FL',
    category: 'SUV',
    engineNumber: 'B58B30M1',
    color: 'Phytonic Blue',
    ownerName: 'Victoria Hayes',
    ownerNationalId: 'SSN-***-**-1092',
    stolenCheckStatus: 'CLEAR',
    riskScore: 78,
    telematics: {
      hardBrakingEvents: 6,
      rapidAccelerationEvents: 9,
      speedingIncidents: 4,
      nighttimeMilesPct: 52,
      lastKnownOdometer: 31200,
      odometerTamperAlert: false
    }
  }
];

export const mockClaims: Claim[] = [
  {
    id: 'clm-8801',
    claimNumber: 'CLM-2026-8801',
    policyNumber: 'POL-9920194',
    companyId: 'comp-1',
    companyName: 'Metropolitan Mutual Insurance',
    branchId: 'br-101',
    branchName: 'New York HQ Branch',
    vehicle: mockVehicles[0],
    incidentDate: '2026-07-28T02:14:00Z',
    reportedDate: '2026-07-28T08:30:00Z',
    incidentLocation: {
      city: 'Brooklyn',
      state: 'NY',
      country: 'United States',
      latitude: 40.6782,
      longitude: -73.9442
    },
    incidentDescription: 'Claimant states vehicle was parked on street overnight and sustained severe rear-end impact during hit-and-run.',
    status: 'FRAUD_SUSPECTED',
    fraudScore: 92,
    riskLevel: 'CRITICAL',
    estimatedLossUsd: 68500,
    assignedInvestigatorId: 'usr-102',
    assignedInvestigatorName: 'Sarah Chen',
    flaggedFactors: [
      'Metadata inconsistency in uploaded collision photo (Location tag mismatch)',
      'Odometer tamper signal detected 2 hours prior to reported incident',
      'Claimant filed 2 similar phantom collision claims in past 18 months',
      'AI Vision Scan detected pre-existing rust on impact zone fracture points'
    ],
    evidence: [
      {
        id: 'ev-1',
        type: 'IMAGE',
        title: 'Rear Bumper Fracture Photo',
        uploadedAt: '2026-07-28T08:45:00Z',
        aiAuthenticityScore: 34,
        notes: 'AI Detection flagged EXIF header edit and thermal gradient mismatch suggesting photo taken 3 weeks prior.'
      },
      {
        id: 'ev-2',
        type: 'TELEMATICS_LOG',
        title: 'CAN-Bus Telematics Dump',
        uploadedAt: '2026-07-28T09:10:00Z',
        aiAuthenticityScore: 98,
        notes: 'Accelerometers registered zero G-force impact events at claimed 02:14 AM timestamp.'
      }
    ],
    timeline: [
      {
        id: 'tl-1',
        timestamp: '2026-07-28T08:30:00Z',
        title: 'Claim Submitted',
        description: 'First notice of loss submitted via mobile portal by policyholder Robert Sterling.',
        actor: 'Robert Sterling (Policyholder)',
        type: 'SYSTEM'
      },
      {
        id: 'tl-2',
        timestamp: '2026-07-28T08:32:00Z',
        title: 'AIVIS Fraud Engine Triggered',
        description: 'Automated AI Risk Score calculated at 92/100. High-risk alert emitted due to telemetry G-force discrepancy.',
        actor: 'AIVIS Neural Engine v4.2',
        type: 'AI_TRIGGER'
      },
      {
        id: 'tl-3',
        timestamp: '2026-07-28T09:15:00Z',
        title: 'Assigned to Senior Analyst',
        description: 'Claim status escalated to FRAUD_SUSPECTED and assigned to Sarah Chen for forensic field dispatch.',
        actor: 'Sarah Chen',
        type: 'STATUS_CHANGE'
      }
    ]
  },
  {
    id: 'clm-8802',
    claimNumber: 'CLM-2026-8802',
    policyNumber: 'POL-8812044',
    companyId: 'comp-1',
    companyName: 'Metropolitan Mutual Insurance',
    branchId: 'br-102',
    branchName: 'Los Angeles Metro',
    vehicle: mockVehicles[1],
    incidentDate: '2026-07-29T23:40:00Z',
    reportedDate: '2026-07-30T06:10:00Z',
    incidentLocation: {
      city: 'Los Angeles',
      state: 'CA',
      country: 'United States',
      latitude: 34.0522,
      longitude: -118.2437
    },
    incidentDescription: 'Vehicle reportedly submerged in flash flood near river bed parking structure.',
    status: 'FIELD_INVESTIGATION',
    fraudScore: 88,
    riskLevel: 'HIGH',
    estimatedLossUsd: 112000,
    assignedInvestigatorId: 'usr-102',
    assignedInvestigatorName: 'Sarah Chen',
    flaggedFactors: [
      'Water sensor log contradicts official municipal rainfall record',
      'Vehicle GPS pinged 45 miles away from claimed flood zone at 23:45 PM',
      'Policy coverage upgraded to comprehensive tier 4 days before incident'
    ],
    evidence: [
      {
        id: 'ev-3',
        type: 'AI_SCAN',
        title: 'Synthetic Flood Pattern Visual Audit',
        uploadedAt: '2026-07-30T07:20:00Z',
        aiAuthenticityScore: 42,
        notes: 'Engine water intake line showed artificial hose injection marks instead of natural immersion sediment.'
      }
    ],
    timeline: [
      {
        id: 'tl-4',
        timestamp: '2026-07-30T06:10:00Z',
        title: 'Total Loss Flood Claim Filed',
        description: 'Policyholder reported total water damage to Tesla Model S Plaid.',
        actor: 'David K. Miller',
        type: 'SYSTEM'
      },
      {
        id: 'tl-5',
        timestamp: '2026-07-30T07:00:00Z',
        title: 'Geofence Anomaly Flagged',
        description: 'Cross-verification with cell tower & satellite pings flagged location mismatch.',
        actor: 'AIVIS Fraud Engine',
        type: 'AI_TRIGGER'
      }
    ]
  },
  {
    id: 'clm-8803',
    claimNumber: 'CLM-2026-8803',
    policyNumber: 'POL-1192044',
    companyId: 'comp-2',
    companyName: 'Apex Vehicle Assurance',
    branchId: 'br-202',
    branchName: 'London Financial Hub',
    vehicle: mockVehicles[3],
    incidentDate: '2026-07-31T14:15:00Z',
    reportedDate: '2026-07-31T16:00:00Z',
    incidentLocation: {
      city: 'London',
      state: 'Greater London',
      country: 'United Kingdom',
      latitude: 51.5074,
      longitude: -0.1278
    },
    incidentDescription: 'Low speed collision at roundabout resulting in side door dent and mirror displacement.',
    status: 'APPROVED',
    fraudScore: 14,
    riskLevel: 'LOW',
    estimatedLossUsd: 4200,
    assignedInvestigatorId: 'usr-103',
    assignedInvestigatorName: 'Marcus Reid',
    flaggedFactors: [],
    evidence: [],
    timeline: [
      {
        id: 'tl-6',
        timestamp: '2026-07-31T16:00:00Z',
        title: 'Claim Created',
        description: 'Verified with Dashcam footage and independent third party statement.',
        actor: 'Marcus Reid',
        type: 'INVESTIGATOR'
      }
    ]
  }
];

export const mockFraudAlerts: FraudAlert[] = [
  {
    id: 'alt-701',
    claimId: 'clm-8801',
    claimNumber: 'CLM-2026-8801',
    severity: 'CRITICAL',
    title: 'Synthetic EXIF Image Manipulation Detected',
    description: 'Photo submitted for claim CLM-2026-8801 shows digital artifact stitching and cloned impact scratch layers.',
    timestamp: '10 mins ago',
    status: 'NEW',
    confidencePct: 96.4
  },
  {
    id: 'alt-702',
    claimId: 'clm-8802',
    claimNumber: 'CLM-2026-8802',
    severity: 'HIGH',
    title: 'CAN-Bus Odometer Rollback Signal',
    description: 'Vehicle telematics history indicates odometer rollback from 24,100 miles down to 8,200 miles.',
    timestamp: '25 mins ago',
    status: 'INVESTIGATING',
    confidencePct: 91.8
  },
  {
    id: 'alt-703',
    claimId: 'clm-8801',
    claimNumber: 'CLM-2026-8801',
    severity: 'HIGH',
    title: 'Phantom Ring Syndicate Correlation',
    description: 'Claimant telephone & IP address matched to flagged organized insurance fraud network #881 (Tri-State Syndicate).',
    timestamp: '1 hour ago',
    status: 'NEW',
    confidencePct: 88.5
  }
];

export const mockDashboardStats: DashboardOverviewStats = {
  totalClaims: 2760,
  pendingClaims: 314,
  activeInvestigations: 89,
  fraudAlertsCount: 42,
  totalLossPreventedUsd: 3840000,
  fraudDetectionRatePct: 94.2,
  claimsTrend: [
    { month: 'Feb', totalClaims: 380, fraudDetected: 28, approvedClaims: 320, lossPreventedUsd: 410000 },
    { month: 'Mar', totalClaims: 420, fraudDetected: 35, approvedClaims: 350, lossPreventedUsd: 520000 },
    { month: 'Apr', totalClaims: 390, fraudDetected: 31, approvedClaims: 330, lossPreventedUsd: 460000 },
    { month: 'May', totalClaims: 460, fraudDetected: 44, approvedClaims: 380, lossPreventedUsd: 680000 },
    { month: 'Jun', totalClaims: 510, fraudDetected: 52, approvedClaims: 420, lossPreventedUsd: 820000 },
    { month: 'Jul', totalClaims: 600, fraudDetected: 68, approvedClaims: 490, lossPreventedUsd: 950000 },
  ],
  vehicleCategories: [
    { category: 'Sedan', count: 980, percentage: 35.5, avgFraudScore: 32 },
    { category: 'SUV', count: 740, percentage: 26.8, avgFraudScore: 41 },
    { category: 'Commercial Truck', count: 420, percentage: 15.2, avgFraudScore: 58 },
    { category: 'EV / Hybrid', count: 350, percentage: 12.7, avgFraudScore: 66 },
    { category: 'Heavy Equipment', count: 180, percentage: 6.5, avgFraudScore: 72 },
    { category: 'Motorcycle', count: 90, percentage: 3.3, avgFraudScore: 28 },
  ],
  recentFraudAlerts: mockFraudAlerts,
  recentClaims: mockClaims,
  mapMarkers: [
    { id: 'm-1', locationName: 'New York, USA', country: 'USA', lat: 40.7128, lng: -74.0060, claimCount: 420, highRiskCount: 38 },
    { id: 'm-2', locationName: 'Los Angeles, USA', country: 'USA', lat: 34.0522, lng: -118.2437, claimCount: 310, highRiskCount: 29 },
    { id: 'm-3', locationName: 'London, UK', country: 'UK', lat: 51.5074, lng: -0.1278, claimCount: 280, highRiskCount: 19 },
    { id: 'm-4', locationName: 'Stockholm, Sweden', country: 'Sweden', lat: 59.3293, lng: 18.0686, claimCount: 140, highRiskCount: 8 },
    { id: 'm-5', locationName: 'Tokyo, Japan', country: 'Japan', lat: 35.6762, lng: 139.6503, claimCount: 190, highRiskCount: 11 },
  ],
  liveTimeline: [
    {
      id: 'lt-1',
      timestamp: '2 mins ago',
      title: 'High Fraud Score Computed',
      description: 'CLM-2026-8801 auto-assigned 92/100 Neural Fraud Score',
      actor: 'AIVIS Neural v4.2',
      type: 'AI_TRIGGER'
    },
    {
      id: 'lt-2',
      timestamp: '14 mins ago',
      title: 'Field Investigation Dispatched',
      description: 'Senior Investigator Sarah Chen dispatched to Brooklyn incident site',
      actor: 'Sarah Chen',
      type: 'INVESTIGATOR'
    },
    {
      id: 'lt-3',
      timestamp: '32 mins ago',
      title: 'EXIF Tamper Check Completed',
      description: '3 high-resolution evidence images flagged for digital cloning',
      actor: 'Vision AI Engine',
      type: 'AI_TRIGGER'
    },
    {
      id: 'lt-4',
      timestamp: '1 hour ago',
      title: 'New Branch Onboarded',
      description: 'Stockholm Central branch connected to AIVIS Telematics Ingestion Pipeline',
      actor: 'Alex Vance',
      type: 'SYSTEM'
    }
  ]
};

export const mockActivityLogs: ActivityLog[] = [
  {
    id: 'log-1001',
    userId: 'usr-101',
    userName: 'Alex Vance',
    userRole: 'SUPER_ADMIN',
    action: 'UPDATE_ROLE_PERMISSIONS',
    resource: 'Role: FRAUD_ANALYST',
    resourceId: 'role-2',
    ipAddress: '192.168.1.104',
    timestamp: '2026-08-02T11:45:12Z',
    status: 'SUCCESS',
    details: 'Added evidence:upload and claims:write permissions to Fraud Analyst role.'
  },
  {
    id: 'log-1002',
    userId: 'usr-102',
    userName: 'Sarah Chen',
    userRole: 'FRAUD_ANALYST',
    action: 'ESCALATE_CLAIM',
    resource: 'Claim: CLM-2026-8801',
    resourceId: 'clm-8801',
    ipAddress: '10.0.4.88',
    timestamp: '2026-08-02T10:30:00Z',
    status: 'SUCCESS',
    details: 'Escalated status from SUBMITTED to FRAUD_SUSPECTED due to EXIF anomaly.'
  },
  {
    id: 'log-1003',
    userId: 'usr-103',
    userName: 'Marcus Reid',
    userRole: 'CLAIMS_INVESTIGATOR',
    action: 'UPLOAD_EVIDENCE',
    resource: 'Claim: CLM-2026-8803',
    resourceId: 'clm-8803',
    ipAddress: '82.165.99.12',
    timestamp: '2026-08-02T09:12:44Z',
    status: 'SUCCESS',
    details: 'Uploaded Dashcam video file dashcam_20260731.mp4.'
  },
  {
    id: 'log-1004',
    userId: 'usr-104',
    userName: 'Elena Rostova',
    userRole: 'BRANCH_AUDITOR',
    action: 'EXPORT_AUDIT_REPORT',
    resource: 'Branch: Stockholm Central',
    resourceId: 'br-301',
    ipAddress: '194.218.4.11',
    timestamp: '2026-08-02T08:00:15Z',
    status: 'SUCCESS',
    details: 'Generated monthly compliance PDF export for Q3 Branch Audit.'
  }
];

export const mockNotifications: NotificationItem[] = [
  {
    id: 'notif-1',
    type: 'FRAUD_ALERT',
    title: 'CRITICAL Fraud Alert: CLM-2026-8801',
    message: 'Synthetic image manipulation and telemetry G-force contradiction detected.',
    timestamp: '10 mins ago',
    read: false,
    severity: 'CRITICAL',
    link: '/claims/clm-8801'
  },
  {
    id: 'notif-2',
    type: 'CLAIM_UPDATE',
    title: 'New High Loss Claim Filed',
    message: 'CLM-2026-8802 filed with estimated total loss of $112,000 USD (Tesla Model S Plaid).',
    timestamp: '45 mins ago',
    read: false,
    severity: 'HIGH',
    link: '/claims/clm-8802'
  },
  {
    id: 'notif-3',
    type: 'SYSTEM_SECURITY',
    title: 'Security Audit Log Expiry Notice',
    message: 'System log retention rule executed. 12,400 legacy entries archived to cold storage.',
    timestamp: '2 hours ago',
    read: true,
    severity: 'INFO',
    link: '/activity-logs'
  }
];
